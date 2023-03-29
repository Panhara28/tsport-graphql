import ContextType from 'src/graphql/ContextType';
import * as aws from 'aws-sdk';

const S3_ENDPOINT = 'sgp1.digitaloceanspaces.com';
const BUCKET = 'panhara';
const SCRECT_KEY = '/1JO6JYP+O7dyip25gb9xDycbsuUHtwBLnkN6QcDYlI';
const ACCESS_KEY = 'R5KZGG336ZITV5C263SZ';

const awsurl = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: awsurl,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SCRECT_KEY,
});

async function singleUpload(_, { file }, ctx: ContextType) {
  const { createReadStream, filename, mimetype } = await file;

  const stream = await createReadStream();

  const newfilename = new Date().getTime().toString() + '.' + filename.split('.')[1];

  const uploadParams = {
    Bucket: BUCKET,
    Key: newfilename,
    ACL: 'public-read',
    Body: stream,
  };

  const upload = (await s3.upload(uploadParams).promise()).Location;

  return {
    filename,
    url: upload,
    fileSize: 0,
    mimetype,
    width: 0,
    height: 0,
  };
}

export const SingleUpload = singleUpload;
