

const mongoose = require('mongoose')

//is funcyion me ham batate hain ki kis tarah se mera server database se connect hone wala hai


async function connctDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("database connected successfully");

  }

  catch (err) {
    console.error("database connection error: ", err)
  }
}

module.exports = connctDB;