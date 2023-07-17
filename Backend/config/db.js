const mongoose = require('mongoose');

const connectdb = async() => {
    try{
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
      });
      console.log("Connection sucessfull");
    } 
    catch(error){
       console.log(`Error :${error.message}`);
       process.exit();
    }
}

module.exports = connectdb;