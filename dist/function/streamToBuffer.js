"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamToBuffer = streamToBuffer;

async function streamToBuffer(stream) {
  const convertStreamPromise = new Promise(resolve => {
    const data = [];
    stream.on('data', function (chunk) {
      data.push(chunk);
    });
    stream.on('end', function () {
      resolve(data);
    });
  });
  const data = await convertStreamPromise;
  const buffer = Buffer.concat(data);
  return buffer;
}