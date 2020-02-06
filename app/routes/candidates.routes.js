
module.exports = app => {
  const candidates = require("../controllers/candidates.controller.js");
  const tutorials = require("../controllers/tutorial.controller.js");
  const _ = require("../config/config.js");
  const {validateToken}= require('../midelwares/JWT')

  var router = require("express").Router();

  router.post("/", candidates.signUp);   // Sign Up new candidate
  router.post("/login", candidates.signIn); // Sign In new candidate
  router.get("/",validateToken, candidates.profile); // Get Candidate Profile


  app.use(`${_.API_V}/candidates`, router);
};
