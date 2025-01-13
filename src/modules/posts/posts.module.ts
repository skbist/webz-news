import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostIntegrationModule } from '../post-integration/post.integration.module';

@Module({
  imports: [PostIntegrationModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
