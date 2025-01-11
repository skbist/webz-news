import { Test, TestingModule } from '@nestjs/testing';
import { WebzService } from './webz.service';
import axios from 'axios';
import { getError } from '../common/utils/error-handler';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
jest.mock('../common/utils/error-handler');
// describe('WebzService', () => {
//   let service: WebzService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [WebzService],
//     }).compile();

//     service = module.get<WebzService>(WebzService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

describe('WebzService - fetchPosts', () => {
  let service: WebzService;
  let loggerSpy: { error: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebzService,
        {
          provide: 'Logger',
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WebzService>(WebzService);
    loggerSpy = module.get('Logger');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch posts successfully', async () => {
    const mockResponse = { data: { posts: [] } }; // Replace with actual response structure
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const page = 1;
    const pageSize = 10;
    const query = 'test';

    const result = await service.fetchPosts(page, pageSize, query);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      `${service.apiUrl}&from=${page * pageSize + 1}&size=${pageSize}&q=${query}`,
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
    expect(loggerSpy.error).toHaveBeenCalledWith(
      'Error occurred fetching congress members: ',
      mockError,
    );
  });

  // it('should handle invalid page or pageSize gracefully', async () => {
  //   const invalidPage = -1;
  //   const invalidPageSize = 0;
  //   const query = 'test';

  //   await expect(
  //     service.fetchPosts(invalidPage, invalidPageSize, query),
  //   ).rejects.toThrow(HttpException);
  //   expect(axios.get).not.toHaveBeenCalled();
  // });

  it('should handle empty query parameter gracefully', async () => {
    const page = 1;
    const pageSize = 10;
    const query = '';

    const mockResponse = { data: { posts: [] } }; // Replace with actual response structure
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.fetchPosts(page, pageSize, query);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      `${service.apiUrl}&from=${page * pageSize + 1}&size=${pageSize}&q=${query}`,
    );
  });
});
