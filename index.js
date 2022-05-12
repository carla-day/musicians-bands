const { sequelize, DataTypes, Model  } = require('./db');
const {Band} = require('./Band')
const {Musician} = require('./Musician')
const{Song} = require('./Song')

Musician.belongsTo(Band);
Band.hasMany(Musician); 
Band.belongsToMany(Song, {through: 'title'});
Song.belongsToMany(Band, {through: 'title'});
module.exports = {
    Band,
    Musician,
    Song
};
