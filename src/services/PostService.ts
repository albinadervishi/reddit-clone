import BaseService from "./BaseService";
import { Post, PaginationParams } from "../types";

class PostService extends BaseService {
  getAll = (
    subredditId: string,
    params?: PaginationParams
  ): Promise<Post[]> => {
    return this.get(`/subreddits/${subredditId}/posts`, { params });
  };

  getById = (subredditId: string, postId: string): Promise<Post> => {
    return this.get(`/subreddits/${subredditId}/posts/${postId}`);
  };
}

const postServiceInstance = new PostService();

export default postServiceInstance;
