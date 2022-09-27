'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todos.belongsTo(models.groups,{
        foreignKey:'activity_group_id'
      })
    }
  }
  todos.init({
    activity_group_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE,
    deleted_at : DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'todos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return todos;
};