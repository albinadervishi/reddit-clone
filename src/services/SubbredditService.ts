import BaseService from "./BaseService";
import { Subreddit, PaginationParams } from "../types";

class SubredditService extends BaseService {
  getAll = (params?: PaginationParams): Promise<Subreddit[]> => {
    return this.get("/subreddits", { params });
  };

  getById = (id: string): Promise<Subreddit> => {
    return this.get(`/subreddits/${id}`);
  };
}

const subredditServiceInstance = new SubredditService();

export default subredditServiceInstance;
