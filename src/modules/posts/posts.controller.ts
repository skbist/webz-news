import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { QueryPostDto } from './dto/query-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query() queryPostsDto: QueryPostDto) {
    return await this.postsService.getPosts(queryPostsDto);
  }
}
