import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostIntegrationModule } from '../post-integration/post.integration.module';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PostIntegrationModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
