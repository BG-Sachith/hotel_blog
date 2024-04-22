import { User } from '@prisma/client';

export class Audit {
  createdAt: Date;
  modifiedAt: Date;
  modifiedBy: User | any;
  createdBy: User | any;
  createdById: Number;
  modifiedById: Number;

  constructor(data: any) {
    this.createdAt = data?.createdAt ? data?.createdAt : new Date();
    this.modifiedAt = data?.modifiedAt;
    this.modifiedBy = data?.modifiedBy;
    this.createdBy = data?.createdBy;
    this.createdById = data?.createdById;
    this.modifiedById = data?.modifiedById;
  }
}
