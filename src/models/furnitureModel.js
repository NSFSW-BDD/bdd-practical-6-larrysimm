const pool = require("../services/db");

var furnitureModel = {
  getAllFurnitures: (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM furniture;
    `;
    pool.query(SQLSTATMENT, callback);
  },
  getFurnitureById: (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM furniture
    WHERE fid = ?;
    `;
    const VALUES = [data.fid];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  createNewFurniture: (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO furniture (name, description, price, quantity, catid)
    VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.catid,
    ];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  updateFurnitureById: (data, callback) => {
    const SQLSTATMENT = `
    UPDATE furniture
    SET name = ?, description = ?, price = ?, quantity = ?, catid = ?
    WHERE fid = ?;
    `;
    const VALUES = [
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.catid,
      data.fid,
    ];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  deleteFurnitureById: (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM furniture
    WHERE fid = ?;
    `;
    const VALUES = [data.fid];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
  getFurnituresByCategoryId: (categoryId, callback) => {
    const SQLSTATMENT = `
    SELECT f.fid, f.name, f.description, f.price, f.quantity, f.catid, c.name AS catName
    FROM furniture f
    JOIN category c ON f.catid = c.catid
    WHERE f.catid = ?;
    `;
    const VALUES = [categoryId];
    pool.query(SQLSTATMENT, VALUES, callback);
  },
};

module.exports = furnitureModel;
