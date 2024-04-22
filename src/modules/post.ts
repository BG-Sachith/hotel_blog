import { ObjectId } from 'mongodb';
import { Audit } from './audit';
import { PostContent } from './postCont';
import { PostTag } from './postTag';

export class Post extends Audit {
  id: Number;
  title: string;
  summary: string; //due to small card
  category: any;
  tag: any[] | PostTag[] = [];
  image: any = '';
  numberOfLikes: Number;
  numberOfComments: Number;
  numberOfViews: Number;
  comments: Comment[] = [];
  likes: any[] = [];
  postContents: any[] = []; //array due to lng
  isPublish: boolean;
  publishAt: any;
  publicUrl: string;

  constructor(data: any) {
    super(data);
    this.id = data?.id;
    this.title = data?.title;
    this.summary = data?.summary;
    this.category = data?.category;
    this.tag = data?.tag;
    // if (data?.tag && data.tag.length > 0) {
    //   this.tag = data.tag.map((c: any) => new PostTag(c));
    // }
    this.image = data?.image;
    this.numberOfLikes = data?.numberOfLikes;
    this.numberOfComments = data?.numberOfComments;

    if (data?.comments && data.comments.length > 0) {
      this.comments = data.comments.map((c: any) => new Comment(c));
    }
    if (data?.likes && data.likes.length > 0) {
      this.likes = data.likes;
    }
    if (data?.postContents && data.postContents.length > 0) {
      this.postContents = data.postContents.map((p: any) => new PostContent(p));
    } else {
      this.postContents = [new PostContent({})];
    }
    // this.postContents = data.postContents;
    this.numberOfViews = data?.numberOfViews;
    this.isPublish = data?.isPublish != undefined && data?.isPublish;
    this.publishAt = data?.publishAt;
    this.publicUrl = data?.publicUrl;
  }
  public setImage(image: string) {
    this.image = image;
  }
}

export class Comment extends Audit {
  id: number;
  message: string;
  postId: ObjectId;
  hide: Boolean = true;
  constructor(data: any) {
    super(data);
    this.id = data?.id;
    this.message = data?.message;
    this.postId = data?.postId;
    this.hide = data?.hide;
  }
}

export class PostLike extends Audit {
  id: number;
  isLike: Boolean;
  constructor(data: any) {
    super(data);
    this.id = data?.id;
    this.isLike = data?.isLike;
  }
}
