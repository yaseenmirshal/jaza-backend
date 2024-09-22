import { Request, Response } from "express";
import { ValidationError } from "joi";
import createError from "http-errors";
import { roleCreateBodyJ, roleEditBodyJ } from "../../utils/joi/admin/role";
import roleModel from "../../models/role-schema";

interface RoleData {
    title: string;
    permissionIds: string | string[];
}

interface UpdateRoleData {
    title?: string;
    permissionIds?: string | string[];
}

// Create Role
export const createARole = async (req: Request, res: Response): Promise<Response> => {
    const { error, value: data } = roleCreateBodyJ.validate(req.body) as { value: RoleData; error: ValidationError };

    if (error) {
        return res.status(400).json({
            status: "Error",
            message: error.details[0].message
        });
    }

    const permissionIdsArray = Array.isArray(data.permissionIds) ? data.permissionIds : [data.permissionIds];

    // Ensure unique permission IDs
    const uniquePermissionIds = Array.from(new Set(permissionIdsArray));

    const roleCreate = new roleModel({
        ...data,
        permissionIds: uniquePermissionIds,
    });
    
    await roleCreate.save();

    return res.status(201).json({
        status: "OK",
        message: "Role created successfully",
        data: roleCreate
    });
};

// Get all Roles
export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    const allRoles = await roleModel.find().populate("permissionIds");

    return res.status(200).json({
        status: "OK",
        message: "Roles retrieved successfully",
        data: allRoles
    });
};

// Get one Role by ID
export const getARole = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const role = await roleModel.findById(id).populate("permissionIds");

    if (!role) {
        throw new createError.NotFound("Role not found");
    }

    return res.status(200).json({
        status: "OK",
        message: "Role found",
        data: role
    });
};

// Update Role by ID
export const updateARole = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const { error, value: data } = roleEditBodyJ.validate(req.body) as { value: UpdateRoleData; error: ValidationError };

    if (error) {
        return res.status(400).json({
            status: "Error",
            message: error.details[0].message
        });
    }

    const existingRole = await roleModel.findById(id);

    if (!existingRole) {
        throw new createError.NotFound("Role not found");
    }

    // Merge existing and new permission IDs, ensuring uniqueness
    const mergedPermissionIds = Array.from(new Set([
        ...existingRole.permissionIds,
        ...(Array.isArray(data.permissionIds) ? data.permissionIds : [data.permissionIds])
    ]));

    const updatedRole = await roleModel.findByIdAndUpdate(
        id,
        { ...data, permissionIds: mergedPermissionIds },
        { new: true, runValidators: true }
    ).populate("permissionIds");

    return res.status(200).json({
        status: "OK",
        message: "Role updated successfully",
        data: updatedRole
    });
};

// Delete Role by ID
export const deleteARole = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const deleteRole = await roleModel.findByIdAndDelete(id);

    if (!deleteRole) {
        throw new createError.NotFound("Role not found");
    }

    return res.status(200).json({
        status: "OK",
        message: "Role deleted successfully",
        data: deleteRole
    });
};
