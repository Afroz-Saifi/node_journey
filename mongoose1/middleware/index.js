const fs = require("fs");

const logsUpdater = (file) => {
  return (req, res, next) => {
    fs.appendFile(
      file,
      `${Date()} Method: ${req.method} Url: ${req.url}\n`,
      (err) => {
        next();
      }
    );
  };
};

module.exports = { logsUpdater };
