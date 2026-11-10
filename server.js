require('dotenv').config()

const connectDB = require('./src/db/db')  // yahan par require kiya aur jo function hamne usme likha tha usko ham yahan par call kar sakte hain



connectDB();



const app = require('./src/app')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server is running on port no. 3000');

})
