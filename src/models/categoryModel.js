const pool = require("../services/db");

var categoryModel = {
  getAllCategories: (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM category;
    `;
    pool.query(SQLSTATMENT, callback);
  },
  getCategoryById: (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM category
    WHERE catid = ?;
    `;
    const VALUES = [data.catid];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  createNewCategory: (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO category (name, description)
    VALUES (?, ?);
    `;
    const VALUES = [data.name, data.description];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  updateCategoryById: (data, callback) => {
    const SQLSTATMENT = `
    UPDATE category
    SET name = ?, description = ?
    WHERE catid = ?;
    `;
    const VALUES = [data.name, data.description, data.catid];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  deleteCategoryById: (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM category
    WHERE catid = ?;
    `;
    const VALUES = [data.catid];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
};

module.exports = categoryModel;
