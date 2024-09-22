import express from "express";
import { trycatch } from "../utils/try-catch";
import { createARole, deleteARole, getARole, getRoles, updateARole } from "../controllers/admin/role";
import { createAPermission, deleteAPermission, getAPermission, getPermissions, updateAPermission } from "../controllers/admin/permission";

const router = express.Router();

//  admin permission routes

router.route("/permissions")
  .post(trycatch(createAPermission))
  .get(trycatch(getPermissions));

router.route("/permissions/:id")
  .get(trycatch(getAPermission))
  .put(trycatch(updateAPermission))
  .delete(trycatch(deleteAPermission));


//  admin roles routes
router.route("/roles")
  .post(trycatch(createARole))
  .get(trycatch(getRoles));

router.route("/roles/:id")
  .get(trycatch(getARole))
  .put(trycatch(updateARole))
  .delete(trycatch(deleteARole));



export default router;
