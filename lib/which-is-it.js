"use strict";

module.exports = function whichIsIt(obj, types) {
  for(var i = 0; i < types.length; ++i) {
    if (obj instanceof types[i])
      return types[i];
  }

  return null;
};