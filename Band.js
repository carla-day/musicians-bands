const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Band;
Band = sequelize.define('Bands',{
    name:Sequelize.STRING,
    genre: Sequelize.STRING
})
module.exports = {
    Band
};