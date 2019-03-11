const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: String,
  size: Number,
  url: String,
  deletehash: String,
});

const dirSchema = new mongoose.Schema({
	name: String,
	guildId: String,
	images: { type: [imageSchema], default: [] },
});

let dirModel;
try {
  dirModel = mongoose.model('Directory');
} catch (error) {
  dirModel = mongoose.model('Directory', dirSchema);
}
export default dirModel;

