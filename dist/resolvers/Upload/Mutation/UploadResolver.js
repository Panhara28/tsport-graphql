"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadResolver = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _streamToBuffer = require("../../../function/streamToBuffer");

var _apolloServer = require("apollo-server");

var _imageSize = _interopRequireDefault(require("image-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UploadResolver = async (_, {
  file
}, ctx) => {
  await ctx.authUser.requireLogin('USER');
  const isUserWrite = await ctx.authUser.user.write;

  if (isUserWrite) {
    var _dimensions, _dimensions2, _dimensions3, _dimensions4;

    const {
      createReadStream,
      filename,
      mimetype
    } = await file;
    const stream = await createReadStream();
    let fileSize = 0;
    stream.on('end', function () {
      fileSize = stream.bytesRead / (1024 * 1024); //Convert to MB

      fileSize = Number(fileSize.toFixed(4));

      if (fileSize > 100) {
        throw new _apolloServer.AuthenticationError('You file is too large!');
      }
    });
    const json = await _requestPromise.default.post({
      url: 'https://s1.moc.gov.kh/upload',
      formData: {
        mocspace: {
          value: await (0, _streamToBuffer.streamToBuffer)(stream),
          options: {
            filename: filename,
            contentType: mimetype
          }
        }
      },
      json: true
    });
    let dimensions;
    const extention = json.filename.split('/')[4].split('.')[1];

    if (extention === 'pdf' || extention === 'docx' || extention === 'csv') {
      console.log('file');
    } else {
      dimensions = (0, _imageSize.default)(stream.path);
    }

    return {
      filename,
      url: json.filename,
      fileSize,
      mimetype,
      width: (_dimensions = dimensions) !== null && _dimensions !== void 0 && _dimensions.width ? (_dimensions2 = dimensions) === null || _dimensions2 === void 0 ? void 0 : _dimensions2.width : 0,
      height: (_dimensions3 = dimensions) !== null && _dimensions3 !== void 0 && _dimensions3.height ? (_dimensions4 = dimensions) === null || _dimensions4 === void 0 ? void 0 : _dimensions4.height : 0
    };
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission!`);
  }
};

exports.UploadResolver = UploadResolver;