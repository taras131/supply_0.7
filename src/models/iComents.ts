export interface INewComment {
  text: string
  is_active: boolean
  author_id: number
  machinery_id: number
}

export interface IComment extends INewComment {
  id: number;
  created_date: number;
  updated_date: number;
  rating: number [];
}
