const API = require('./controllers');
const getCoords = require('city-to-coords');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const googleTranslate = require('google-translate')("AIzaSyDyIzM6KoAiHoX3PlqkLMU_KWQbRwkjyKs");
let supportedLanguages = {}; 
googleTranslate.getSupportedLanguages('en', (err, languageCodes) => {
  for(languageCode of languageCodes) {
    supportedLanguages[languageCode.language] = languageCode.name
  }
})

router.get('/trends-at/:loc', (req, res) => {
  let location = req.params.loc;
  getCoords(location)
  .then((coords) => {
    let geoLoc = {lat: coords.lat, long: coords.lng};

    API.Twitter.getCustomApiCall('/trends/closest.json', geoLoc, (err, response, body) => {
      if(err) {
        res = {response: response, body: body}
        res.status(500).json(res)
      }
    }
    , (data) => {
        let woeId = JSON.parse(data)[0].woeid;

        API.Twitter.getCustomApiCall('/trends/place.json', {id: woeId}, (err, response, body) => {
          if(err) {
            let responseMsg = {response: response, body: body};
            res.status(500).send(body);
          }
        }
        , (data) => {
          let parsedData = JSON.parse(data)[0];
          const translatedTrends = [];
          
            for(trend of parsedData.trends) {
              translatedTrends.push(new Promise((resolve, reject) => {
                googleTranslate.translate(trend.name, 'en', (err, translation) => {
                  if(err) reject(err)
                  resolve(translation);
                });
              }))
            }
              Promise.all(translatedTrends)
              .then((results) => {
                for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
                 results[resultIdx].detectedSourceLanguage = supportedLanguages[results[resultIdx].detectedSourceLanguage]
                 results[resultIdx].location = location;
                }
                res.status(200).send(results);
              })
              .catch(err => console.error(err));
            })
        })
      })
  });

router.get('/tweets-with/:trending_topic/trends_at/:location', (req, res) => {
  let trendingTopic = req.params.trending_topic;
  let location = req.params.location;

  getCoords(location)
  .then((coords) => {
    let geoPositionWithRadius = {latitude: coords.lat, longitude: coords.lng, radius: '500mi'}
    API.Twitter.getSearch({q: trendingTopic, result_type: 'popular', geocode: geoPositionWithRadius, count: 25}, 
    (err, response, body) => {
      res.status(500).send(body);
    }, (data) => {
      let tweets = JSON.parse(data);
      const translatedTweets = [];
          
            for(tweet of tweets.statuses) {
              translatedTweets.push(new Promise((resolve, reject) => {
                googleTranslate.translate(tweet.text, 'en', (err, translation) => {
                  if(err) reject(err)
                  resolve(translation);
                });
              }))
            }
              Promise.all(translatedTweets)
              .then((results) => {
                for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
                 results[resultIdx].detectedSourceLanguage = supportedLanguages[results[resultIdx].detectedSourceLanguage]
                 results[resultIdx].user = tweets.statuses[resultIdx].user.name;
                }
                res.status(200).send(results);
              })
              .catch(err => console.error(err));
    })
  })
})

module.exports = router;