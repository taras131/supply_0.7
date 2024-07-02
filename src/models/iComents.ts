export interface INewComment {
  authorId: string;
  invoiceId: string;
  text: string;
  dateCreation: number;
}

export interface IComment extends INewComment {
  id: string;
}
