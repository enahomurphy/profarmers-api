module.exports = ids => {
  const connections = [];
  for (let i = 0; i < ids.length; i += 1) {
    for (let y = 0; y < ids.length - 1; y += 1) {
      connections.push({
        connector_id: ids[i],
        user_id: ids[y + 1],
      });
    }
  }

  return connections;
};
