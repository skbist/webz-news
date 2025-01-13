import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostIntegrationModule } from './modules/post-integration/post.integration.module';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/db/orm.config';
import appconfig from './config/appconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        ...typeOrmModuleOptions,
        logging: process.env.TYPEORM_LOGGING === 'true',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appconfig],
    }),
    PostIntegrationModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
