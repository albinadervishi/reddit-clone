export interface Subreddit {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  handle: string;
  admin: string;
}

export interface Post {
  id: string;
  subredditId: string;
  title: string;
  body: string;
  user: string;
  createdAt: string;
  downvotes: number;
  upvotes: number;
  image: string;
}

export interface Comment {
  id: string;
  postId: string;
  body: string;
  name: string;
  createdAt: string;
  votes?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  order?: "asc" | "desc";
}
