import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import fs, { createReadStream } from 'fs';
import { join } from 'path-posix';
import config from '../../common/config';

@Injectable()
export default class FilesService {
  getFile(fileName: string): StreamableFile {
    const filePath = join(config.STATIC_FILES_DIR, fileName);
    const isFileExists = fs.existsSync(filePath);

    if (!isFileExists)
      throw new InternalServerErrorException(`File ${fileName} not found.`);

    const fileStream = createReadStream(filePath);

    return new StreamableFile(fileStream);
  }

  async removeFile(fileName: string): Promise<string> {
    const filePath = join(config.STATIC_FILES_DIR, fileName);
    const isFileExists = fs.existsSync(filePath);

    if (!isFileExists)
      throw new InternalServerErrorException(`File ${fileName} not found.`);

    try {
      await fs.promises.rm(filePath);
      return `File "${fileName}" successfully removed from server.`;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
