
module.exports = (sequelize, DataTypes) => {
  const UserConnection = sequelize.define('UserConnection', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    connected_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    disconnected_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data_used: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    device_info: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  return UserConnection;
};
