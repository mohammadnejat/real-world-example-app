import { AuthorModel } from './article.model';

export interface CommentsModel {
  comments: CommentModel[];
}
export interface CommentModel {
  comment: CommentModel;
}

export interface CommentModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorModel;
}

export interface CommentPayloadModel {
  comment: {
    body: string;
  };
}
