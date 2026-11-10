

//<-----midlewae hamesha app file me hi hogi ex. app.use(midlware())----->



const express = require('express')  //require for data get in req.body


const cookieParser = require('cookie-parser')  //for set data on cookie

const authRoutes = require('./routes/auth.routes');

const musicRoutes = require('./routes/music.routes');
const multer = require('multer');

const app = express();

const cors = require('cors')

//middleware use karoge tabhi wo sab upar ka kaam ho payega

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const allowedOrigins = ["https://atulkumar9451-spotify-clone.vercel.app/"]

app.use(cors({
  origin: function (origin, callBack) {
    if (!origin || allowedOrigins.includes(origin)) {
      callBack(null, true)
    } else {
      callBack(new Error("Not allowed by CORS"))
    }
  },

  credentials: true
}))



app.use('/api/auth', authRoutes)

app.use('/api/music', musicRoutes)


module.exports = app;




