import { Module } from '@nestjs/common';
import { WebzService } from './webz.service';

@Module({
  controllers: [],
  providers: [WebzService],
})
export class WebzModule {}
