import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostProvider } from '../post-integration/interface/post-provder.interface';
import { QueryPostDto } from './dto/query-post.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/constants/api-constants';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;
  let postProvider: PostProvider;

  beforeEach(async () => {
    const mockPostRepository = {
      save: jest.fn(),
    };

    const mockPostProvider = {
      fetchPosts: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: 'PostProvider',
          useValue: mockPostProvider,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    postProvider = module.get<PostProvider>('PostProvider');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPosts', () => {
    it('should fetch posts, save them, and return the result', async () => {
      const queryPostDto: QueryPostDto = {
        search: 'test',
        pagination: { page: 1, limit: 10 },
      };

      const mockPostResponse = {
        posts: [
          {
            title: 'Default Test Post',
            url: 'https://wsj.com',
            author: 'Simon Widmer',
            published: new Date('2025-01-06T17:07:23.871+02:00'),
            text: 'some sample text',
          },
        ],
        moreAvailableResults: 10, // Indicates more results are available
      };

      const mockSavedPosts = [
        {
          id: '1', // Simulates a saved post with an ID
          title: 'Default Test Post',
          url: 'https://wsj.com',
          author: 'Simon Widmer',
          published: new Date('2025-01-06T17:07:23.871+02:00'),
          text: 'some sample text',
          updatedAt: new Date('2025-01-06T17:07:23.871+02:00'),
          createdAt: new Date('2025-01-06T17:07:23.871+02:00'),
        },
      ];

      jest
        .spyOn(postProvider, 'fetchPosts')
        .mockResolvedValue(mockPostResponse);

      jest.spyOn(postRepository, 'save').mockResolvedValue(mockSavedPosts[0]);

      const result = await service.getPosts(queryPostDto);

      expect(postProvider.fetchPosts).toHaveBeenCalledWith(1, 10, 'test');
      expect(postRepository.save).toHaveBeenCalledWith(mockPostResponse.posts);
      expect(result).toEqual({
        count: 1,
        posts: mockSavedPosts[0],
        moreRemaining: 10,
      });
    });
    it('should use default pagination values if none are provided', async () => {
      const queryPostDto: QueryPostDto = {
        search: 'test',
        pagination: {}, // No pagination provided
      };

      const mockPostResponse = {
        posts: [
          {
            title: 'Default Test Post',
            url: 'https://wsj.com',
            author: 'Simon Widmer',
            published: new Date('2025-01-06T17:07:23.871+02:00'),
            text: 'some sample text',
          },
        ],
        moreAvailableResults: 10, // Indicates more results are available
      };

      const mockSavedPosts = [
        {
          id: '1',
          title: 'Default Test Post',
          url: 'https://wsj.com',
          author: 'Simon Widmer',
          published: new Date('2025-01-06T17:07:23.871+02:00'),
          text: 'some sample text',
          updatedAt: new Date(),
          createdAt: new Date(),
          moreRemaining: 10, // Add this property
        },
      ];

      // Mock the fetchPosts method of postProvider
      jest
        .spyOn(postProvider, 'fetchPosts')
        .mockResolvedValue(mockPostResponse);

      // Mock the save method of postRepository
      jest.spyOn(postRepository, 'save').mockResolvedValue(mockSavedPosts[0]);

      // Call the service method
      const result = await service.getPosts(queryPostDto);

      // Verify fetchPosts was called with default pagination values
      expect(postProvider.fetchPosts).toHaveBeenCalledWith(
        DEFAULT_PAGE,
        DEFAULT_PAGE_SIZE,
        'test', // Search query
      );

      // Verify save was called with posts from fetchPosts
      expect(postRepository.save).toHaveBeenCalledWith(mockPostResponse.posts);

      // Verify the result (adjusted for structure)
      expect(result).toEqual({
        count: 1,
        posts: mockSavedPosts[0],
        moreRemaining: 10,
      });
    });
    it('should return empty result when no posts are retrieved', async () => {
      const queryPostDto: QueryPostDto = {
        search: 'test',
        pagination: { page: 1, limit: 10 },
      };

      const mockEmptyPostResponse = {
        posts: [],
        moreAvailableResults: 0,
      };

      jest
        .spyOn(postProvider, 'fetchPosts')
        .mockResolvedValue(mockEmptyPostResponse);

      const result = await service.getPosts(queryPostDto);

      expect(result).toEqual({
        count: 0,
        posts: [],
        moreRemaining: 0,
      });
    });

    it('should throw an error if postProvider.fetchPosts fails', async () => {
      const queryPostDto: QueryPostDto = {
        search: 'test',
        pagination: { page: 1, limit: 10 },
      };

      jest
        .spyOn(postProvider, 'fetchPosts')
        .mockRejectedValue(new Error('Fetch error'));

      await expect(service.getPosts(queryPostDto)).rejects.toThrow(
        'Fetch error',
      );
      expect(postProvider.fetchPosts).toHaveBeenCalledWith(1, 10, 'test');
      expect(postRepository.save).not.toHaveBeenCalled();
    });
  });
});
