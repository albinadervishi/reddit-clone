import BaseService from "./BaseService";
import { Comment, PaginationParams } from "../types";

class CommentService extends BaseService {
  getAll = (
    subredditId: string,
    postId: string,
    params?: PaginationParams
  ): Promise<Comment[]> => {
    return this.get(`/subreddits/${subredditId}/posts/${postId}/comments`, {
      params,
    });
  };
}

const commentServiceInstance = new CommentService();

export default commentServiceInstance;
