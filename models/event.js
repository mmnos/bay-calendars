module.exports = function (sequelize, DataTypes) {
  let Event = sequelize.define("Event", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    eventTitle : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    }
  });

  Event.associate = function(models) {

    // Event.belongsToMany(models.User, {through: 'user_events', constraints: false});
    Event.belongsTo(models.User);

    Event.belongsTo(models.Request);

    Event.hasMany(models.Invite, {
      // foreignKey: 'invitable_id',
      // constraints: false,
      // scope: {
      //   invitable: 'event'
      // }
    });
  }

  return Event;

};