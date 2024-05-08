const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-complete','root','nodecomplete',{ 
    dialect:'mysql',
    host:'localhost',
});


// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports=sequelize;