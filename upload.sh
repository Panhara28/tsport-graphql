#!/bin/bash
file=src/generated/graph.ts
bucket="learning-space"
resource="/${bucket}/graph-nano.ts"
contentType="text/plain"
dateValue=`TZ=GMT date +"%a, %d %b %Y %H:%M:%S GMT"`
stringToSign="PUT\\n\\n${contentType}\\n${dateValue}\\nx-amz-acl:public-read\\n${resource}"
s3Key="3WSGQFSPQIJNEX62LZXF"
s3Secret="AFn4X1phqU7mbTNfzZ4xXmwpp7s8fjclOMANttvCk8A"
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`
echo "${s3Secret}"
echo "${stringToSign}"
echo "${dateValue}"
echo "${signature}"
curl -v -X PUT -T "${file}" \
  -H "x-amz-acl:public-read" \
  -H "Host: ${bucket}.sgp1.digitaloceanspaces.com" \
  -H "Date: ${dateValue}" \
  -H "Content-Type: ${contentType}" \
  -H "Authorization: AWS ${s3Key}:${signature}" \
  https://${bucket}.sgp1.digitaloceanspaces.com/graph-nano.ts
