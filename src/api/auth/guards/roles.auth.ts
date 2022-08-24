import { SetMetadata } from "@nestjs/common";
import { Role } from "src/share/common/role";
//import { Role } from "../users/users.entity"

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);