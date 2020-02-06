module.exports = (sequelize, Sequelize) => {
  const Candidates = sequelize.define("candidates", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: {
         args: true,
         msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
         fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
         isEmail: {
             args: true,
             msg: 'The email you entered is invalid or is already in our system.'
         },
         max: {
             args: 254,
             msg: 'The email you entered is invalid or longer than 254 characters.'
         }
      }
    },
    mobile: {
      type: Sequelize.STRING
    },
    password:{
      type: Sequelize.STRING,
      allowNull:false
    },
    status: {
      type:Sequelize.ENUM,
      values: ['1','0'],
      defaultValue:'1'
    }
  });

  return Candidates;
};
