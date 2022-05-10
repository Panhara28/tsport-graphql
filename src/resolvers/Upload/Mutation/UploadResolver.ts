import ContextType from '../../../graphql/ContextType';
import request from 'request-promise';
import { streamToBuffer } from '../../../function/streamToBuffer';
import { AuthenticationError } from 'apollo-server';
import sizeOf from 'image-size';

export const UploadResolver = async (_, { file }, ctx: ContextType) => {
  await ctx.authUser.requireLogin('USER');
  const isUserWrite = await ctx.authUser.user.write;

  if (isUserWrite) {
    const { createReadStream, filename, mimetype } = await file;
    const stream = await createReadStream();
    let fileSize = 0;

    stream.on('end', function() {
      fileSize = stream.bytesRead / (1024 * 1024); //Convert to MB
      fileSize = Number(fileSize.toFixed(4));

      if (fileSize > 100) {
        throw new AuthenticationError('You file is too large!');
      }
    });

    const json = await request.post({
      url: 'https://s2.moc.gov.kh/upload',
      formData: {
        mocspace: {
          value: await streamToBuffer(stream),
          options: {
            filename: filename,
            contentType: mimetype,
          },
        },
      },
      json: true,
    });
    let dimensions;
    const extention = json.filename.split('/')[4].split('.')[1];

    if (extention === 'pdf' || extention === 'docx' || extention === 'csv') {
      console.log('file');
    } else {
      dimensions = sizeOf(stream.path);
    }

    return {
      filename,
      url: json.filename,
      fileSize,
      mimetype,
      width: dimensions?.width ? dimensions?.width : 0,
      height: dimensions?.height ? dimensions?.height : 0,
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};