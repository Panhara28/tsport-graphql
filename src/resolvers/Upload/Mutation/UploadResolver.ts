import ContextType from '../../../graphql/ContextType';
import request from 'request-promise';
import { streamToBuffer } from '../../../function/streamToBuffer';
import { AuthenticationError } from 'apollo-server';

export const UploadResolver = async (_, { file }, ctx: ContextType) => {
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
    url: 'https://s1.moc.gov.kh/upload',
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

  return {
    filename,
    url: json.filename,
  };
};
