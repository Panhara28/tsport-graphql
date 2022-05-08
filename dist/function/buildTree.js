"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTree = buildTree;

function buildTree(data, id) {
  const hash = {
    0: {
      id: 0,
      name: 'data',
      children: []
    }
  }; // Create all the hash

  for (const item of data) {
    const node = {
      id: item === null || item === void 0 ? void 0 : item.id,
      name: item === null || item === void 0 ? void 0 : item.name,
      children: []
    };
    hash[item.id] = node;
  } // Attach all the children


  for (const item of data) {
    if (item.parent_id) {
      if (hash[item.parent_id]) {
        hash[item.parent_id].children.push(hash[item.id]);
      }
    } else {
      hash[0].children.push(hash[item.id]);
    }
  } // buildPath("", hash[0].children);


  if (id) {
    return hash[id];
  }

  return hash[0];
}