const formatEdge = document => {
  const cursor = Buffer.from(JSON.stringify({
    id: document.id,
    createdAt: new Date(document.createdAt),
  })).toString('base64');

  return {
    cursor,
    node: document,
  };
};

module.exports = formatEdge;
