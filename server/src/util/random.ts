import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export namespace random {
  export function getFileName(fileName: string): string {
    const extensionName = extname(fileName);
    const randomFileName = `${uuid().replace(/-/gi, '')}${extensionName}`;
    return randomFileName;
  }
}
