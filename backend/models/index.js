
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Server = require('./Server')(sequelize, Sequelize);
db.Payment = require('./Payment')(sequelize, Sequelize);
db.Reward = require('./Reward')(sequelize, Sequelize);
db.Admin = require('./Admin')(sequelize, Sequelize);
db.OneConnectConfig = require('./OneConnectConfig')(sequelize, Sequelize);
db.AdConfig = require('./AdConfig')(sequelize, Sequelize);
db.Notification = require('./Notification')(sequelize, Sequelize);
db.SupportTicket = require('./SupportTicket')(sequelize, Sequelize);
db.BlogPost = require('./BlogPost')(sequelize, Sequelize);
db.UserConnection = require('./UserConnection')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Payment);
db.Payment.belongsTo(db.User);

db.User.hasMany(db.Reward);
db.Reward.belongsTo(db.User);

db.User.hasMany(db.SupportTicket);
db.SupportTicket.belongsTo(db.User);

db.User.hasMany(db.UserConnection);
db.UserConnection.belongsTo(db.User);

db.Server.hasMany(db.UserConnection);
db.UserConnection.belongsTo(db.Server);

module.exports = db;
