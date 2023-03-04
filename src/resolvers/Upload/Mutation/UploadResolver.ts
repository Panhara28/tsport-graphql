import ContextType from '../../../graphql/ContextType';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';

async function RestUpload(form: FormData) {
  const res = await fetch(process.env.S1 ? process.env.S1 + '/upload' : 'https://s1.tsportcambodia.com' + '/upload', {
    method: 'POST',
    body: form,
    headers: {
      Authorization: 'Bearer ' + process.env.AUTHORIZATION,
    },
  });

  return await res.json();
}

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

  form.append('mocspace', 'hello');

  const x = await RestUpload(form);
  console.log(x);
  // form.append('mocspace', stream, filename);

  const res = await fetch('https://s2.tsportcambodia.com/upload', {
    method: 'POST',
    body: form,
    headers: {
      Authorization: 'Bearer ' + process.env.AUTHORIZATION,
    },
  });

  const json: any = await res.json();

  let dimensions;

  return {
    filename,
    url: json.filename,
    fileSize: fileSize ? fileSize : 0,
    mimetype,
    width: dimensions?.width ? dimensions?.width : 0,
    height: dimensions?.height ? dimensions?.height : 0,
  };
};
