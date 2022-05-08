"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table_news = require("./tables/table_news");

Object.keys(_table_news).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _table_news[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table_news[key];
    }
  });
});

var _table_users = require("./tables/table_users");

Object.keys(_table_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _table_users[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table_users[key];
    }
  });
});