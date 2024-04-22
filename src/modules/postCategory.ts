import { Category } from '@prisma/client';
import { Audit } from './audit';

export class PostCategory extends Audit {
  index: number;
  id: number;
  name: string;
  active: boolean;
  createdById: number;
  modifiedById: number;
  updatedAt: Date;
  constructor(data: Category | any) {
    super(data);
    this.index = data?.index;
    this.id = data?.id;
    this.name = data?.name;
    this.active = data?.active != undefined && data?.active;
    this.createdById = data.createdById;
    this.modifiedById = data.modifiedById;
    this.updatedAt = data.updatedAt;
  }
}
