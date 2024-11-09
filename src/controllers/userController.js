const model = require("../models/userModel");

var userController = {
  getAllUser: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving all users:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving users data. Please try again later.",
        });
      } else res.status(200).json(results);
    };

    model.getUsers(callback);
  },
  getUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    console.log(data);

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving user by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving the user. Please check the ID and try again.",
        });
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(200).json(results[0]);
      }
    };

    model.getUserById(data, callback);
  },
  createNewUser: (req, res, next) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({
          message:
            "An error occurred while creating the user. Please ensure all required fields are valid.",
        });
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    };

    model.createNewUser(data, callback);
  },
  updateUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updating user by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while updating the user. Please check the provided data.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send();
      }
    };

    model.updateUserById(data, callback);
  },
  deleteUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error deleting user by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while deleting the user. Please check the ID and try again.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send();
      }
    };

    model.deleteUserById(data, callback);
  },
  loginUser: (req, res, next) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error Login:", error);

        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          //no match

          res.status(404).json({
            message: "email/password wrong",
          });
        } else {
          //match email and password

          res.locals.userid = results[0].userid; //saves userid from database in res.locals for use in jwt payload

          res.locals.role = results[0].role; //saves role from database in res.locals for use in jwt payload

          next(); //call next middleware to issue token
        }
      }
    };

    model.loginUser(data, callback);
  },
};

module.exports = userController;
