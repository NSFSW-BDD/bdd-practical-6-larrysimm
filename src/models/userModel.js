const pool = require("../services/db");

var userModel = {
  getUsers: (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user;
    `;

    pool.query(SQLSTATMENT, callback);
  },
  getUserById: (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user
    WHERE userid = ?;
    `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  createNewUser: (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO user (username, email,role, password)
    VALUES (?,?,?,?);
    `;
    const VALUES = [data.username, data.email, data.role, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  updateUserById: (data, callback) => {
    const SQLSTATMENT = `
    UPDATE user
    SET username=?, email=?, role=?, password=?
    WHERE userid=?;
    `;
    const VALUES = [
      data.username,
      data.email,
      data.role,
      data.password,
      data.userid,
    ];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  deleteUserById: (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM user
    WHERE userid = ?
  `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  loginUser: (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user
    WHERE email = ?
    `;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  checkUsernameOrEmailExist: (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user
    WHERE username = ? OR email = ?;
    `;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  registerUser: (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO user (username, email, role, password)
    VALUES (?,?,?,?);
    `;
    const VALUES = [data.username, data.email, data.role, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
};

module.exports = userModel;
