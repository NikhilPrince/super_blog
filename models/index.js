const Users = require('./Users');
const Animals = require('./Animals');
const Adoptable = require('./Adoptable');

Users.hasMany(Adoptable, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE'   
});
Adoptable.belongsTo(Users, {
    foreignKey:'user_id'
});
Animals.belongsTo(Adoptable, {
    foreignKey: 'animal_id',
    as: 'type'
});

module.exports = {Users, Animals, Adoptable}