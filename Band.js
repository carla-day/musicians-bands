const { sequelize,DataTypes,Model  } = require('./db');

// TODO - define the Band model
class Band extends Model{}
Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING
},
{
    sequelize,
})
module.exports = {
    Band
};