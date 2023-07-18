const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
  kind: {
    type: String,
    required: true
  },
  etag: {
    type: String,
    required: true
  },
  nextPageToken: {
    type: String,
    required: true
  },
  regionCode: {
    type: String,
    required: true
  },
  pageInfo: {
    totalResults: {
      type: Number,
      required: true
    },
    resultsPerPage: {
      type: Number,
      required: true
    }
  },
  items: [
    {
      kind: {
        type: String,
        required: true
      },
      etag: {
        type: String,
        required: true
      },
      idyoutube: {
        kind: {
          type: String,
          required: true
        },
        channelId: String,
        videoId: String
      }
    }
  ]
});

const Youtube = mongoose.model('Youtube', youtubeSchema);

module.exports = Youtube;