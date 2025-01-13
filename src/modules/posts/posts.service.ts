import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/constants/api-constants';
import { PostProvider } from '../post-integration/interface/post-provder.interface';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject('PostProvider') private readonly postProvider: PostProvider,
  ) {}

  /**
   * retireves posts section from webz api based on page size and  query params
   * @param {QueryPostDto} queryPostDto - query params with pagination details and search query
   * @returns {Promise<{number, Posts[], number}>} - aggregated data of fetch posts, counts and remaining posts
   */
  async getPosts(queryPostDto: QueryPostDto) {
    const { search, pagination } = queryPostDto;
    const { page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE } = pagination;

    this.logger.log(
      `Calling provider to fetch posts: "${search}", page: ${page}, limit: ${limit}`,
    );

    const postResponse = await this.postProvider.fetchPosts(
      page,
      limit,
      search,
    );
    if (!postResponse || !postResponse.posts?.length) {
      this.logger.warn('No posts retrieved from the provider');
      return {
        count: 0,
        posts: [],
        moreRemaining: 0,
      };
    }

    this.logger.warn('Saving posts to the database...');
    const savedPosts = await this.postRepository.save(postResponse.posts);
    this.logger.log(
      `Successfully saved ${savedPosts.length} posts to the database.`,
    );

    return {
      count: postResponse.posts.length,
      posts: savedPosts,
      moreRemaining: postResponse.moreAvailableResults,
    };
  }
}
