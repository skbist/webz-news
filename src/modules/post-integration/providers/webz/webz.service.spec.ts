import { Test, TestingModule } from '@nestjs/testing';
import { WebzService } from './webz.service';
import axios from 'axios';
import { getError } from '../../../common/utils/error-handler';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
jest.mock('../../../common/utils/error-handler');

describe('WebzService', () => {
  let service: WebzService;

  const WEBZ_API_TOKEN = 'mock-token';

  beforeEach(async () => {
    process.env.WEBZ_API_TOKEN = WEBZ_API_TOKEN;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebzService,
        {
          provide: 'Logger',
          useValue: { error: jest.fn() }, // Mock the 'error' method
        },
      ],
    }).compile();

    service = module.get<WebzService>(WebzService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchPosts', () => {
    const mockWebzResponse = {
      data: {
        posts: [
          {
            title: 'Sample Title',
            thread: { url: 'https://example.com' },
            author: 'Author Name',
            published: '2025-01-06T16:04:00.000+02:00',
            text: 'Sample post content',
          },
        ],
        moreResultsAvailable: 10,
      },
    };

    const page = 1;
    const pageSize = 10;
    const query = 'test';

    it('should fetch posts successfully', async () => {
      (axios.get as jest.Mock).mockResolvedValue(mockWebzResponse);

      const result = await service.fetchPosts(page, pageSize, query);

      expect(result).toEqual({
        posts: [
          {
            title: 'Sample Title',
            url: 'https://example.com',
            author: 'Author Name',
            published: new Date('2025-01-06T16:04:00.000+02:00'),
            text: 'Sample post content',
          },
        ],
        moreAvailableResults: 10,
      });

      const offset = page * pageSize + 1;
      expect(axios.get).toHaveBeenCalledWith(
        `${service.apiUrl}&from=${offset}&size=${pageSize}&q=${query}`,
      );
    });

    it('should throw HttpException when axios request fails', async () => {
      const mockError = new Error('Request failed');
      (axios.get as jest.Mock).mockRejectedValue(mockError);

      const mockDataError = { status: 500, message: 'Internal Server Error' };
      (getError as jest.Mock).mockReturnValue(mockDataError);

      const page = 1;
      const pageSize = 10;
      const query = 'test';

      await expect(service.fetchPosts(page, pageSize, query)).rejects.toThrow(
        HttpException,
      );

      expect(getError).toHaveBeenCalledWith(mockError);
    });

    it('should handle empty query parameter gracefully', async () => {
      const emptyQuery = '';
      (axios.get as jest.Mock).mockResolvedValue(mockWebzResponse);

      const result = await service.fetchPosts(page, pageSize, emptyQuery);

      expect(result).toEqual({
        posts: [
          {
            title: 'Sample Title',
            url: 'https://example.com',
            author: 'Author Name',
            published: new Date('2025-01-06T16:04:00.000+02:00'),
            text: 'Sample post content',
          },
        ],
        moreAvailableResults: 10,
      });

      const offset = page * pageSize + 1;
      expect(axios.get).toHaveBeenCalledWith(
        `${service.apiUrl}&from=${offset}&size=${pageSize}&q=${emptyQuery}`,
      );
    });

    it('should handle invalid page or pageSize gracefully', async () => {
      const invalidPage = -1;
      const invalidPageSize = 0;

      await expect(
        service.fetchPosts(invalidPage, invalidPageSize, query),
      ).rejects.toThrow(HttpException);

      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
