module.exports = function(params) {
  Object.assign(params, {
    style: require("!!to-string!css!sass!./template.scss")
  });
  return require('./template.hbs')(params);
};
