const keys = require('./credentials.js') 
const Twitter = require('twitter-node-client').Twitter;
const googleTranslate = require('google-translate')(keys.GOOGLE_API_translate);
const getCoords = require('city-to-coords');


let config = {
  "consumerKey": keys.TWITTER_API_consumerKey,
  "consumerSecret": keys.TWITTER_API_consumerSecret,
  "accessToken": keys.TWITTER_API_accessToken,
  "accessTokenSecret": keys.TWITTER_API_accessTokenSecret,
}

const twitter = new Twitter(config);

let supportedLanguages = {}; 

googleTranslate.getSupportedLanguages('en', (err, languageCodes) => {
  if(err) console.error(err);
  for(languageCode of languageCodes) {
    supportedLanguages[languageCode.language] = languageCode.name
  }
})


module.exports = {
  Twitter: twitter,
  GoogleTranslate: googleTranslate,
  SupportedLanguages: supportedLanguages,
  Coords: getCoords
}




