import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import FilesService from './file.service';
import FilesController from './file.controller';
import FilesControllerFastify from './file.controller.fastify';
import config from '../../common/config';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
        destination: (_, file, cb) => {
          cb(null, config.STATIC_FILES_DIR);
        },
      }),
    }),
  ],
  controllers: [
    config.USE_FASTIFY === 'true' ? FilesControllerFastify : FilesController,
  ],
  providers: [FilesService],
})
export default class FilesModule {}
