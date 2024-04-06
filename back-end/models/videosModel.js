const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema(
  {
    videoURLs: {
      type: [String],
      select: false,
    },
    videosTitle: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Videos = mongoose.model("Videos", videosSchema);
module.exports = Videos;
