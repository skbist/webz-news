import { PostResponseDto } from '../dto/post-response.dto';

export interface PostProvider {
  fetchPosts(
    page: number,
    limit: number,
    search: string,
  ): Promise<{
    posts: Array<PostResponseDto>;
    moreAvailableResults: number;
  }>;
}
