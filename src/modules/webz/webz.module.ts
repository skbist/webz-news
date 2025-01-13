import { Module } from '@nestjs/common';
import { WebzService } from './webz.service';

@Module({
  controllers: [],
  providers: [WebzService],
  exports: [WebzService],
})
export class WebzModule {}
