module.exports = {
  db: {
    url: process.env.DATABASE_URL,
    options: process.env.DATABASE_OPTIONS,
  },
  secret: process.env.SECRET,
};
