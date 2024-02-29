'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.query = async function() {
  const statement = await db.Sequelize.prototype.query.apply(this, arguments);
  try {
    return statement
  } catch (err) {
    if (err instanceof Sequelize.ConnectionError || err instanceof genericPoolErrors.TimeoutError) {
      failedDbConnectionCounter.inc({name: err.name, code: err.original?.code, message: err.parent?.message});
    } else if (err instanceof Sequelize.TimeoutError) {
      dbQueryTimeoutCounter.inc({name: err.name, code: err.original?.code, message: err.parent?.message});
    }
    return statement
  }
};

module.exports = db;
