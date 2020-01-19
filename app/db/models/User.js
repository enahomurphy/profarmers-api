const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const { get, pick, toLower } = require('lodash');

class User extends Sequelize.Model {
  validPassword(password) {
    if (!password || !this.password) {
      return false;
    }

    return bcrypt.compareSync(password, this.password);
  }

  toJSON(include = []) {
    return {
      id: this.getDataValue('id').replace(/-/gmi, ''),
      fullName: `${this.firstName || ''} ${this.lastName || ''}`.trim(),
      email: this.email,
      verified: this.verified,
      profileImage: get(this, 'profileImage', ''),
      occupation: get(this, 'occupation', ''),
      personal: get(this, 'personal', ''),
      bio: get(this, 'bio', ''),
      ...pick(this, include),
    };
  }
}

module.exports = (sequelize, dataTypes) => {
  User.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
      },
      salutation: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      firstName: {
        allowNull: true,
        type: dataTypes.STRING,
        field: 'first_name',
        set(val) {
          this.setDataValue('firstName', toLower(val));
        },
      },
      lastName: {
        allowNull: true,
        type: dataTypes.STRING,
        field: 'last_name',
        set(val) {
          this.setDataValue('lastName', toLower(val));
        },
      },
      fullName: {
        type: dataTypes.VIRTUAL,
        defaultValue: '',
        get() {
          const firstName = this.get('firstName');
          const lastName = this.get('lastName');
          return `${firstName} ${lastName}`;
        },
      },
      bio: {
        allowNull: true,
        type: dataTypes.TEXT,
      },
      email: {
        allowNull: false,
        unique: true,
        type: dataTypes.STRING,
        validate: {
          min: 3,
        },
        set(val) {
          this.setDataValue('email', toLower(val));
        },
      },
      phone: {
        allowNull: true,
        unique: true,
        type: dataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: dataTypes.STRING,
        validate: {
          min: 3,
        },
        set(val) {
          this.setDataValue('password', bcrypt.hashSync(val, 8));
        },
      },
      state: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      city: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      country: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      occupation: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      personal: {
        allowNull: true,
        type: dataTypes.TEXT,
      },
      verified: {
        allowNull: true,
        default: false,
        type: dataTypes.BOOLEAN,
      },
      profileImage: {
        allowNull: true,
        type: dataTypes.STRING,
        field: 'profile_image',
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return User;
};
