const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const Branch = sequelize.define('Branch', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
}, {
  validate: {
    bothCoordsOrNone() {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  },
});

const Guest = sequelize.define('Guest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
}, {

});

const Meal = sequelize.define('Meal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
}, {

});

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  branch_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: 'id',
    }
  },
  meal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Meal,
      key: 'id',
    }
  },
  onDemand: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeStart: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timeEnd: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {

});

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  guest_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Guest,
      key: 'id',
    }
  },
  session_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Session,
      key: 'id',
    }
  },
  reserveDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {

});


// (async () => {
//   await sequelize.sync();
// })();

exports.Branch = Branch;
exports.Guest = Guest;
exports.Meal = Meal;
exports.Session = Session;
exports.Reservation = Reservation;