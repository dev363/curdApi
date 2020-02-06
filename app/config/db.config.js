module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Root@123",
  DB: "curdapi",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
