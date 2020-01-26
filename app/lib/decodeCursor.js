module.exports = cursor => {
  const buff = Buffer.from(cursor, 'base64');
  const cursorData = buff.toString('ascii');

  return JSON.parse(cursorData);
};
