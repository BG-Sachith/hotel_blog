export class PostContent {
  id: String | any;
  language: String = 'en';
  content: String;
  postId: String | any;

  constructor(data: any) {
    this.id = data?.id;
    this.language = data?.language ? data?.language : 'en';
    this.content = data?.content;
    this.postId = data?.postId;
  }
}
