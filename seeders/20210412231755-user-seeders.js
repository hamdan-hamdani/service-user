"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "hamdan230598@gmail.com",
          mobilePhone: "098888122333",
          password: await bcrypt.hash("password", Number(process.env.SALT_ROUND || 10)),
          role: "admin",
          photo: "http://localhost/picture",
          gender: "L",
          name: "Hamdan",
          dateOfBirth: "2000-09-12",
          deliveryAddress: "Kp.Babakan ",
          favorite: "1",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
