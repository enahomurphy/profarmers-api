module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    last_name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: true,
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    state: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    city: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    country: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'nigeria',
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    occupation: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    personal: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    verified: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    profile_image: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
};
