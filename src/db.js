const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_MONGOOSE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Mongoose connect successfully')
  }catch(err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}

module.exports = { connect };