import { HttpException, Injectable, Logger } from '@nestjs/common';
import { WEBZ_BASE_URL } from '../common/constants/api-constants';
import { WebzPostsResponse } from './dto/post-response.dto';
import axios from 'axios';
import { getError } from '../common/utils/error-handler';

@Injectable()
export class WebzService {
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
  ): Promise<WebzPostsResponse> {
    const offset: number = page * pageSize + 1;
    try {
      const postsResponse = await axios.get<WebzPostsResponse>(
        `${this.apiUrl}&from=${offset}&size=${pageSize}&q=${query}`,
      );
      return postsResponse.data;
    } catch (error) {
      this.logger.error('Error occurred fetching webz posts: ', error);
      const dataError = getError(error);
      throw new HttpException(dataError, dataError.status);
    }
  }
}
