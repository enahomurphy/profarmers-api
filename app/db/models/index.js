const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const get = require('lodash/get');

const basename = path.basename(__filename);
const env = require('../../../config');

const config = JSON.parse(get(env, 'db.options', '{}'));
config.url = get(env, 'db.url');

const sequelize = new Sequelize(config.url, { ...config, logging: true });
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
