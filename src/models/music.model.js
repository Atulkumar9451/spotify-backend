const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true

  }
})



//is line ka matalab hai ham ek mongoDB me ek collection create karenge jiska naam music hoga aur use banane ke liye musicSchema ek model hai usase create karenge
const musicModel = mongoose.model("musics", musicSchema)

module.exports = musicModel;