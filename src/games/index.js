var req = require.context('./', true, /\.yml/i);

module.exports = [];

req.keys().forEach(function(key){
    module.exports.push(req(key));
});
