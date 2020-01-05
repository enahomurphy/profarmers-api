module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    salutation: {
      allowNull: true,
      type: Sequelize.STRING(4),
    },
    first_name: {
      allowNull: true,
      type: Sequelize.STRING(255),
    },
    last_name: {
      allowNull: true,
      type: Sequelize.STRING(255),
    },
    email: {
      allowNull: true,
      unique: true,
      type: Sequelize.STRING(255),
    },
    bio: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING(255),
    },
    state: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    city: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    country: {
      allowNull: true,
      type: Sequelize.STRING(50),
      defaultValue: 'nigeria',
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING(15),
    },
    occupation: {
      allowNull: true,
      type: Sequelize.STRING(255),
    },
    personal: {
      allowNull: true,
      type: Sequelize.STRING(255),
    },
    verified: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    profile_image: {
      allowNull: true,
      type: Sequelize.STRING(255),
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
