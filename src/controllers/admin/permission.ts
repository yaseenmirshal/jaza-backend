import { Request, Response } from "express";
import { ValidationError } from "joi";
import Permission from "../../models/permission-schema";
import { permissionCreateBodyJ, permissionEditBodyJ } from "../../utils/joi/admin/permission";
import createError from "http-errors";



 interface PermissionData {
    title: string;
    module: string | string[];
    roleCreate?: boolean;
    roleUpdate?: boolean;
    roleDelete?: boolean;
    roleRead?: boolean
}

 interface UpdatePermissionData {
    title?: string;
    module?: string | string[];
    roleCreate?: boolean;
    roleUpdate?: boolean;
    roleDelete?: boolean;
    roleRead?: boolean;
}


// Create Permission
export const createAPermission = async (req: Request, res: Response): Promise<Response> => {
    const { error, value: data } = permissionCreateBodyJ.validate(req.body) as { value: PermissionData; error: ValidationError };
    
    // Check for validation errors
    if (error) {
        return res.status(400).json({
            status: "Error",
            message: error.details[0].message
        });
    }

    // Create new permission document and save it
    const permissionCreate = new Permission(data);
    await permissionCreate.save();

    return res.status(201).json({
        status: "OK",
        message: "Permission created successfully",
        data: permissionCreate
    });
};

// Get all Permissions
export const getPermissions = async (req: Request, res: Response): Promise<Response> => {
    const allPermissions = await Permission.find();

    return res.status(200).json({
        status: "OK",
        message: "Permissions retrieved successfully",
        data: allPermissions
    });
};

// Get one Permission by ID
export const getAPermission = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const permission = await Permission.findById(id);

    if (!permission) {
        throw new createError.NotFound("Permission not found");
    }

    return res.status(200).json({
        status: "OK",
        message: "Permission found",
        data: permission
    });
};

// Update Permission by ID
export const updateAPermission = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const { error, value: data } = permissionEditBodyJ.validate(req.body) as { value: UpdatePermissionData; error: ValidationError };

    // Check for validation errors
    if (error) {
        return res.status(400).json({
            status: "Error",
            message: error.details[0].message
        });
    }

    // Prepare update object, combining the array update and other field updates
    const updateData: any = { ...data }; // Clone the data object

    // Handle array update separately using $addToSet to avoid duplicates
    if (data.module) {
        updateData.$addToSet = { module: { $each: Array.isArray(data.module) ? data.module : [data.module] } };
        delete updateData.module; // Remove the module field from direct update, handled via $addToSet
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedPermission) {
        return res.status(404).json({
            status: "Error",
            message: "Permission not found"
        });
    }

    return res.status(200).json({
        status: "OK",
        message: "Permission updated successfully",
        data: updatedPermission
    });
};


// Delete Permission by ID
export const deleteAPermission = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const deletePermission = await Permission.findByIdAndDelete(id);

    if (!deletePermission) {
        throw new createError.NotFound("Permission not found");
    }

    return res.status(200).json({
        status: "OK",
        message: "Permission deleted successfully",
        data: deletePermission
    });
};
