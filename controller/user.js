const { User } = require("../models");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUND));
    const data = { ...req.body, password: hashPassword };
    const createUser = await User.create(data);

    const newUser = {
      id: createUser.id,
      email: createUser.email,
      mobile_phone: createUser.mobile_phone,
      role: createUser.role,
      photo: createUser.photo,
      gender: createUser.gender,
      name: createUser.name,
      date_of_birth: createUser.date_of_birth,
      delivery_address: createUser.delivery_address,
      favorite: createUser.favorite,
    };
    return res.json({
      success: true,
      message: "Success register",
      result: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;

    if (email) {
      const userByEmail = await User.findOne({ where: { email } });
      if (!userByEmail) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }
      const isPasswordValid = await bcrypt.compare(req.body.password, userByEmail.password);

      if (!isPasswordValid) {
        return (
          res.status(400),
          json({
            success: false,
            message: "Password not valid",
          })
        );
      }

      return res.json({
        success: true,
        result: {
          id: userByEmail.id,
          email: userByEmail.email,
          mobile_phone: userByEmail.mobile_phone,
          role: userByEmail.role,
          photo: userByEmail.photo,
          gender: userByEmail.gender,
          name: userByEmail.name,
          date_of_birth: userByEmail.date_of_birth,
          delivery_address: userByEmail.delivery_address,
          favorite: userByEmail.favorite,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email cant be empty",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userById = await User.findByPk(id);

    if (!userById) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userByEmail = await User.findOne({ where: { email: req.body.email } });
    if (userByEmail && Number(userByEmail.id) !== Number(id)) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    let updateData = req.body;
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUND));
      updateData.password = hashPassword;
    }

    await userById.update(updateData);
    res.json({
      success: true,
      message: "Success update profile",
      result: {
        id: userById.id,
        email: userById.email,
        mobile_phone: userById.mobile_phone,
        role: userById.role,
        photo: userById.photo,
        gender: userById.gender,
        name: userById.name,
        date_of_birth: userById.date_of_birth,
        delivery_address: userById.delivery_address,
        favorite: userById.favorite,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      success: true,
      message: "User found",
      result: {
        id: user.id,
        email: user.email,
        mobile_phone: user.mobile_phone,
        role: user.role,
        photo: user.photo,
        gender: user.gender,
        name: user.name,
        date_of_birth: user.date_of_birth,
        delivery_address: user.delivery_address,
        favorite: user.favorite,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserAll = async (req, res) => {
  try {
    const user = await User.findAll();

    return res.json({
      success: true,
      result: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await User.destroy({ where: { id: req.params.id } });
    return res.json({
      success: true,
      message: "delete user success",
      result: {
        id: user.id,
        email: user.email,
        mobile_phone: user.mobile_phone,
        role: user.role,
        photo: user.photo,
        gender: user.gender,
        name: user.name,
        date_of_birth: user.date_of_birth,
        delivery_address: user.delivery_address,
        favorite: user.favorite,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
