import { gql } from 'apollo-server-express';
import { ContextType } from '../types/context';
import path from 'path';
import fs from 'fs';
import { random } from '../util/random';
import { FileModel } from '../model/file';

export const fileTypeDef = gql`
  type File {
    filename: String
    mimetype: String
    encoding: String
    path: String
  }

  extend type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

export const fileResolver = {
  Mutation: {
    async uploadFile(_: any, args: any, context: ContextType) {
      // // user verify
      // if (!context.user.login) {
      //   return null;
      // }

      const { filename, mimetype, encoding, createReadStream } = await args.file;
      try {
        const stream = createReadStream();
        const fileName = random.getFileName(filename);

        const clientPath = path.join(path.dirname(fs.realpathSync(__dirname)), '../../client');
        const filePathName = path.join(clientPath, `/public/images/${fileName}`);
        await stream.pipe(fs.createWriteStream(filePathName));

        const result = {
          filename,
          mimetype,
          encoding,
          path: `http://localhost:3000/images/${fileName}`
        };

        FileModel.create(result);

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
