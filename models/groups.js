'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      groups.hasMany(models.todos,{
        foreignKey:'activity_group_id'
      })
    }
  }
  groups.init({
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE,
    deleted_at : DataTypes.DATE,

  },{
    sequelize,
    modelName: 'groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return groups;
};