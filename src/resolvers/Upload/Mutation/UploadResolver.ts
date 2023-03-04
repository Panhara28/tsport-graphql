import ContextType from '../../../graphql/ContextType';
import sizeOf from 'image-size';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const UploadResolver = async (_, { file }, ctx: ContextType) => {
  // await ctx.authUser.requireLogin('USER');
  // const isUserWrite = await ctx.authUser.user.write;
  const { createReadStream, filename, mimetype } = await file;

  const stream = await createReadStream();

  let fileSize = 0;

  stream.on('end', function() {
    fileSize = stream.bytesRead / (1024 * 1024); //Convert to MB
    fileSize = Number(fileSize.toFixed(4));
  });

  const form = new FormData();

  form.append('mocspace', stream, filename);

  const res = await fetch(process.env.S1 ? process.env.S1 + '/upload' : 'https://s1.tsportcambodia.com' + '/upload', {
    method: 'POST',
    body: form,
    headers: {
      Authorization: 'Bearer ' + process.env.AUTHORIZATION,
    },
  });

  const json: any = await res.json();

  let dimensions;
  const extention = json.filename.split('/')[4].split('.')[1];

  if (extention === 'pdf' || extention === 'docx' || extention === 'csv') {
    // console.log('file');
  } else {
    // console.log(stream);
    // dimensions = sizeOf(file);
  }

  return {
    filename,
    url: json.filename,
    fileSize: fileSize ? fileSize : 0,
    mimetype,
    width: dimensions?.width ? dimensions?.width : 0,
    height: dimensions?.height ? dimensions?.height : 0,
  };
};
