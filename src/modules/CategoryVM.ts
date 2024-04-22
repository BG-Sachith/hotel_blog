import { Category } from '@prisma/client';
import { Audit } from './audit';

export class CategoryVM {
  id: number;
  name: string;
  active: boolean;
  createdById: number;
  modifiedById: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: Category | any) {
    // super(data);
    this.id = data?.id;
    this.name = data?.name;
    this.active = data?.active != undefined && data?.active;
    this.createdById = data.createdById;
    this.modifiedById = data.modifiedById;
    this.createdAt = data?.createdAt ? data?.createdAt : new Date();
    this.updatedAt = data?.updatedAt ? data?.updatedAt : new Date();
  }
}
