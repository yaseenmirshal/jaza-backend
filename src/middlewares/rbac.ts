import { Request, Response, NextFunction } from "express";
import roleModel from "../models/role-schema";
import createError from "http-errors";

// Middleware to check permissions based on userType only
export const checkPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userType: string = req.body.userType; // Get user type from request body

        // Ensure userType is present in the request
        if (!userType) {
            throw new createError[403]("User Type is missing");
        }

        // Fetch all roles along with their associated permissions
        const rolesWithPermissions = await roleModel.aggregate([
            { 
                $lookup: {
                    from: "permissions", // Name of the permission collection
                    localField: "permissionIds", // Field in role schema that contains permission references
                    foreignField: "_id", // Field in the permission schema
                    as: "permissions" // The name of the field that will contain the matched permissions
                }
            }
        ]);

        // Filter roles that match the userType in the permissions
        const matchedRole = rolesWithPermissions.find((role: any) => 
            role.permissions.some((permission: any) => permission.module.includes(userType))
        );

        // If no role matches the userType, throw an error
        if (!matchedRole) {
            throw new createError[403]("No role with the given user type has permissions");
        }

        const permissions = matchedRole.permissions;

        // Check permissions based on HTTP method and userType
        const hasPermission = (permissionType: string) => 
            permissions.some((perm: any) => perm.module.includes(userType) && perm[permissionType] === true);

        // Check permissions based on the request method (GET, POST, PUT, DELETE)
        switch (req.method) {
            case "GET":
                if (!hasPermission("roleRead")) {
                    throw new createError[403]("You do not have permission to read data");
                }
                break;

            case "POST":
                if (!hasPermission("roleCreate")) {
                    throw new createError[403]("You do not have permission to create data");
                }
                break;

            case "PUT":
                if (!hasPermission("roleUpdate")) {
                    throw new createError[403]("You do not have permission to update data");
                }
                break;

            case "DELETE":
                if (!hasPermission("roleDelete")) {
                    throw new createError[403]("You do not have permission to delete data");
                }
                break;

            default:
                throw new createError[405]("Invalid request method");
        }

        // If permissions are valid, proceed to the next middleware
        next();
    } catch (error) {
        next(error);
    }
};
