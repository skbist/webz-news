import { Module } from '@nestjs/common';
import { WebzService } from './webz.service';
import { WebzController } from './webz.controller';

@Module({
  controllers: [WebzController],
  providers: [WebzService],
})
export class WebzModule {}
