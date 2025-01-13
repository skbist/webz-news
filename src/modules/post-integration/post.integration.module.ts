import { Module } from '@nestjs/common';
import { WebzService } from './providers/webz/webz.service';

@Module({
  providers: [
    {
      provide: 'PostProvider',
      useClass: WebzService,
    },
  ],
  exports: ['PostProvider'],
})
export class PostIntegrationModule {}
