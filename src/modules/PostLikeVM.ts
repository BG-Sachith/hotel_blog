import { Category, Like } from '@prisma/client';
import { Audit } from './audit';

export class PostLikeVM {
  id: number;
  postId: number;
  createdById: number;
  modifiedById: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: Like | any) {
    // super(data);
    this.id = data?.id;
    this.postId = data?.postId;
    this.createdById = data.createdById;
    this.modifiedById = data.modifiedById;
    this.createdAt = data?.createdAt ? data?.createdAt : new Date();
    this.updatedAt = data?.updatedAt ? data?.updatedAt : new Date();
  }
}
