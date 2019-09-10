module.exports = (client, error) => {
  client.userLib.sendlog(`Ошибка - ${error.message}\n В файле - ${error.fileName}\n В строке - ${error.lineNumber}`);
};