require('dotenv').config()

const connectDB = require('./src/db/db')  // yahan par require kiya aur jo function hamne usme likha tha usko ham yahan par call kar sakte hain



connectDB();



const app = require('./src/app')


app.listen(3000, () => {
  console.log('server is running on port no. 3000');

})