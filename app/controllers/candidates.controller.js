const db = require("../models");
const Candidates = db.candidates;
const Op = db.Sequelize.Op;
var bcrypt = require('bcrypt');
const JWT= require("../midelwares/JWT.js");
const _ = require("../config/config.js");


// SignUp Candidate
exports.signUp = (req, res) => {
  const body= req.body
  let keys= Object.keys(body)
  let requiredKeys=['name','email','mobile','password']
  let diff = requiredKeys.filter(x => !keys.includes(x));
  if(Array.isArray(diff) && diff.length){
    res.status(400).send({
        message: `${diff.join()} can not be empty`
      });
      return;
  }

  let Bpass= bcrypt.hashSync(body.password, _.BCRYPT_SALT_ROUNDS);

  const candidate={
    name:body.name,
    email:body.email,
    mobile:body.mobile,
    password:Bpass
  }

  // Save Tutorial in the database
  Candidates.create(candidate)
    .then(data => {
      let user= data.dataValues;
      delete(user.password)
      res.send({message:'User registered successfully', data:user});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


// Login Candidate
exports.signIn = (req, res) => {
  const body= req.body
  let keys= Object.keys(body)
  let requiredKeys=['email','password']
  let diff = requiredKeys.filter(x => !keys.includes(x));
  if(Array.isArray(diff) && diff.length){
    res.status(400).send({
        message: `${diff.join()} can not be empty`
      });
      return;
  }

  let Bpass= bcrypt.hashSync(body.password, _.BCRYPT_SALT_ROUNDS);

  const candidate={
    email:body.email
  }

  Candidates.findOne(candidate)
  .then(user=>{
      bcrypt.compare(body.password, user.dataValues.password, function(err, response) {
        if(response==false){
          res.status(401).send({message:'Password not valid.'});
          return;
        }
        let data= user.dataValues
        delete(data.password)
        const token= JWT.sign(data)
        data.token= token;
        res.send({message:'User login successfully', data:data});
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Get user Profile
exports.profile=(req, res)=>{
  Candidates.findOne({id:req.decoded.id})
  .then(user=>{
    res.send({message:'User profile found', data:user})
  })
  .catch(err=>{
    res.status(400).send({message:'User profile not found'})
  })
}
