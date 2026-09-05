const mongoose = require("mongoose");

const connectToDB = async () => {
  try {

    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connect To DB Successfully");
  } catch (error) {
    console.error("❌ DB CONNECTION ERROR");
    console.error(error);

    throw error;
  }
};

export default connectToDB;

// const mongoose = require('mongoose')

// const connectToDB = async () => {
//     try {
//         if(mongoose.connections[0].readyState){
//             return true;
//         } else {
//             await mongoose.connect(process.env.MONGO_URL);
//             console.log("Connect To DB Successfully :))");
            
//         }
//     } catch (err) {
//         console.log('DB Connection has error ->', err);
        
//     }
// }

// export default connectToDB;