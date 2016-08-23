function Renamer() {}

Renamer.prototype = {};

Renamer.prototype.rename = function(name) {
  return name
    .replace(/(\-+)([a-zA-Z0-1])/g, function(all, dashes, letter) { 
      return letter.toUpperCase(); 
    })
    .replace('.', '');
};

module.exports = Renamer;
