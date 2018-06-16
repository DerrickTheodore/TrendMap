let error = (err, response, body) => {
  console.log(`ERROR ${err}`);
};
let success = (data) => {
  console.log(`Data ${data}`, data);
};

let config = {
  "consumerKey": "sXH4Xuu3CcrlwOzhbGW3GKXBC",
  "consumerSecret": "NpVUnHQPBhjrfA7FSZ7Dqqy4tpsqHGr2TT0gIrsYtx28T0BOAR",
  "accessToken": "76345688-HjJdb0K53mrY9Xb1n5ja54lPvuCJJkpV1PUBugrwT",
  "accessTokenSecret": "s3ZTVjA6egwqFPKW3EfMDyDnNkItp2ruhma2DZXuNieDi",
}

const Twitter = require('twitter-node-client').Twitter;


const twitter = new Twitter(config);

module.exports.Twitter = twitter;

