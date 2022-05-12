const { sequelize, DataTypes, Model  } = require('./db');

// define the Song model
class Song extends Model{}
Song.init({
    title: DataTypes.STRING,
    year: DataTypes.NUMBER
},
{
    sequelize,
})
module.exports = {
    Song
};