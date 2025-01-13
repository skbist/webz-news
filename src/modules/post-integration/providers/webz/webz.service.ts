import { HttpException, Injectable, Logger } from '@nestjs/common';
import { WEBZ_BASE_URL } from '../../../common/constants/api-constants';
import { WebzPostsResponse } from './dto/webz-response.dto';
import axios from 'axios';
import { getError } from '../../../common/utils/error-handler';
import { PostProvider } from '../../interface/post-provder.interface';
import { PostResponseDto } from '../../dto/post-response.dto';

@Injectable()
export class WebzService implements PostProvider {
  readonly apiUrl: string;
  private readonly logger = new Logger(WebzService.name);
  private readonly WEBZ_BASE_URL = WEBZ_BASE_URL;
  private readonly WEBZ_API_TOKEN = process.env.WEBZ_API_TOKEN;

  constructor() {
    this.apiUrl = `${this.WEBZ_BASE_URL}/filterWebContent?token=${this.WEBZ_API_TOKEN}`;
  }

  /**
   * retireves posts section from webz api based on page size and  query params
   * @param {number} page - page of pagination
   * @param {number} pageSize id of an asset
   * @param {string} query search keyowrds
   * @returns {Promise<WebzPostsResponse>} - Response  of webz api
   */
  public async fetchPosts(
    page: number,
    pageSize: number,
    query: string,
  ): Promise<{
    posts: Array<PostResponseDto>;
    moreAvailableResults: number;
  }> {
    if (page <= 0 || pageSize <= 0) {
      throw new HttpException('Invalid pagination parameters', 400);
    }

    const offset: number = page * pageSize + 1;

    try {
      this.logger.log(
        `Calling Webz API to retrieve ${pageSize} posts, starting from offset ${offset}`,
      );

      const postsResponse = await axios.get<WebzPostsResponse>(
        `${this.apiUrl}&from=${offset}&size=${pageSize}&q=${query}`,
      );
      this.logger.log(`Webz posts request completed with succes rsponse`);

      this.logger.log(`Mapping webz response to posts data`);
      const mappedPosts = postsResponse.data.posts.map((post) => ({
        title: post.title,
        url: post.thread.url,
        author: post.author,
        published: new Date(post.published),
        text: post.text,
      }));
      this.logger.log(`Successfully  mapped ${mappedPosts.length} posts`);
      return {
        posts: mappedPosts,
        moreAvailableResults: postsResponse.data.moreResultsAvailable,
      };
    } catch (error) {
      this.logger.error('Error occurred fetching webz posts: ', error);
      const dataError = getError(error);
      throw new HttpException(dataError, dataError.status);
    }
  }
}
