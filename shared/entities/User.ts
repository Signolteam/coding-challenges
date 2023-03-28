import { BaseEntity } from "./BaseEntity";

export interface User extends BaseEntity {
  full_name: string;
  email: string;
  company_name: string;
}
