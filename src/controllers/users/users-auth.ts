import {Request , Response} from "express"
import usersJoi from "../../utils/joi/users/usersjoi"
import Users from "../../models/users-schema"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



export const users_registers = async (req :Request , res : Response):Promise<Response> =>{
    // validate user data
    const {error , value} = usersJoi.validate(req.body)
    // if error throw the error
    if (error) {
        throw new Error (error.details[0].message)
      }
   // find user already register user
   const user = await Users.findOne({email : value.email})
   //if the already registerd
   if(user) {
    return res.status(400).json({message : "Email Already Registerd"})
   }
   // if not registerd hash password using bcrypt
   const hash_password = bcrypt.hashSync(value.password,10)
   // creating new user
   const create_user = new Users({
    name : value.name,
    email:value.email,
    password:hash_password,
    phone:value.phone
   })
   await create_user.save()

   const accesstoken = jwt.sign({id:create_user._id,name : create_user.name ,email: create_user.email},process.env.ACCESS_TOKEN_KEY as string, {expiresIn: "1h"})

   const refresh_token = jwt.sign({id:create_user._id,name : create_user.name ,email: create_user.email},process.env.REFRESH_TOKEN_KEY as string , {expiresIn : "30d"})
    return res.status(201).json({message : "Register Successfully", accesstoken, refresh_token})
}




export const users_logins = async (req : Request , res : Response): Promise<Response>=>{
    // get data from req body
    const {email , password} = req.body
    // find user from database using email
    const user = await Users.findOne({email})
    // if not found user 
    if(!user){
        return res.status(400).json({message : "User Not Found"})
    }
    // if find user is blocked
    if(user.isPermission){
        return res.status(400).json({message : "Your Blocked"})
    }
    // check the password is same
    const valid_password : boolean = bcrypt.compareSync(password ,user.password)
    // if the password is wrong 
    if(!valid_password){
        return res.status(400).json({message : "Password Is Wrong"})
    }
    // create access token
    const accesstoken = jwt.sign({id:user._id,name : user.name ,email: user.email},process.env.ACCESS_TOKEN_KEY as string, {expiresIn: "1h"})
    // create refresh token
   const refresh_token = jwt.sign({id:user._id,name : user.name ,email: user.email},process.env.REFRESH_TOKEN_KEY as string , {expiresIn : "30d"})
   // passing response user
    return res.status(201).json({message : "Login Successfully", accesstoken, refresh_token})
}