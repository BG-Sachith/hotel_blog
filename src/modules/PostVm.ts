import { TagVM } from './TagVM';

export class PostVM {
  id: number;
  title: string;
  summary: string; //due to small card
  image: any;
  active: boolean = true;
  published: boolean = false;
  language: string = 'en';
  postContentId: number;

  postContent: any = { ...new PostContentVM({}) };
  category: any;
  categoryId: number;
  tags: any[] | TagVM[] = [];
  comments: any[] = [];
  likes: any[] = [];

  createdById: number;
  modifiedById: number;

  createdAt: Date;
  updatedAt: Date;

  publishAt: any;
  publicUrl: string;

  numberOfLikes: number;
  numberOfComments: number;
  numberOfViews: number;

  constructor(data: any) {
    // super(data);
    this.id = data?.id;
    this.title = data?.title;
    this.summary = data?.summary;

    this.image = data?.image;
    this.active = data?.active ?? data?.active;
    this.published = data?.published ?? data?.published;
    this.language = data?.language ? data.language : 'en';
    this.postContentId = data?.postContentId;

    this.postContent = data?.postContent
      ? data?.postContent
      : { ...new PostContentVM({}) };
    this.category = data?.category ? data?.category : {};
    this.categoryId = data?.categoryId;
    this.tags = data?.tag ? data?.tag : [];
    this.comments = data?.comments ? data?.comments : [];
    this.likes = data?.likes ? data?.likes : [];

    this.createdById = data?.createdById;
    this.modifiedById = data?.modifiedById;

    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;

    this.publishAt = data?.publishAt;
    this.publicUrl = data?.publicUrl;

    this.numberOfLikes = data?.numberOfLikes;
    this.numberOfComments = data?.numberOfComments;
    this.numberOfViews = data?.numberOfViews;
  }
  public setImage(image: string) {
    this.image = image;
  }
}

export class PostContentVM {
  id: number;
  language: string = 'en';
  content: string = ''; //due to small card
  postId: number;
  constructor(data: any) {
    this.id = data?.id;
    this.language = data?.language ?? 'en';
    this.content = data?.content ?? '';
    this.postId = data?.postId;
  }
}

export class PostDTO {
  id: number;
  title: string;
  summary: string; //due to small card
  image: any;
  active: boolean = true;
  published: boolean = false;
  language: string = 'en';

  categoryId: number;

  createdById: number;
  modifiedById: number;

  createdAt: Date;
  updatedAt: Date;

  publishAt: any;
  publicUrl: string;

  constructor(data: any) {
    // super(data);
    this.id = data?.id;
    this.title = data?.title;
    this.summary = data?.summary;

    this.image = data?.image;
    this.active = data?.active ?? data?.active;
    this.published = data?.published ?? data?.published;
    this.language = data?.language ? data.language : 'en';

    this.categoryId = data?.categoryId;

    this.createdById = data?.createdById;
    this.modifiedById = data?.modifiedById;

    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;

    this.publishAt = data?.publishAt;
    this.publicUrl = data?.publicUrl;
  }
}
