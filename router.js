const Service = require('./Services');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const keys = require('./credentials.js') 

router.get('/trends-at-with-coords/:lat/:lng', (req, res) => {
    let location = {lat: req.params.lat, long: req.params.lng};
    let geoLoc = location;
    //rate limit 75 per 15min
    Service.Twitter.getCustomApiCall('/trends/closest.json', geoLoc, (err, response, body) => {
      if(err) {
        res.status(500).json(body)
      }
    }
    , (data) => {
        let woeId = JSON.parse(data)[0].woeid;
        //rate limit 75 per 15min
        Service.Twitter.getCustomApiCall('/trends/place.json', {id: woeId}, (err, response, body) => {
          if(err) {
            res.status(500).send(body);
          }
        }
        , (data) => {
          let parsedData = JSON.parse(data)[0];
          let locationFound = parsedData.locations[0].name
          const translatedTrends = [];
          
            for(trend of parsedData.trends) {
              translatedTrends.push(new Promise((resolve, reject) => {
                Service.GoogleTranslate.translate(trend.name, 'en', (err, translation) => {
                  if(err) reject(err)
                  resolve(translation);
                });
              }))
            }
              Promise.all(translatedTrends)
              .then((results) => {
                for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
                 results[resultIdx].detectedSourceLanguage = Service.SupportedLanguages[results[resultIdx].detectedSourceLanguage]
                 results[resultIdx].location = locationFound;
                }
                res.status(200).send(results);
              })
              .catch(err => console.error(err));
            })
        })
  });

router.get('/trends-at/:loc', (req, res) => {
  let location = req.params.loc;
  Service.Coords(location)
  .then((coords) => {
    let geoLoc = {lat: coords.lat, long: coords.lng};
    //rate limit 75 per 15min
    Service.Twitter.getCustomApiCall('/trends/closest.json', geoLoc, (err, response, body) => {
      if(err) {
        res = {response: response, body: body}
        res.set('Access-Control-Allow-Origin', '*')
        res.status(500).json(res)
      }
    }
    , (data) => {
        let woeId = JSON.parse(data)[0].woeid;
        //rate limit 75 per 15min
        Service.Twitter.getCustomApiCall('/trends/place.json', {id: woeId}, (err, response, body) => {
          if(err) {
            res.status(500).send(body);
          }
        }
        , (data) => {
          let parsedData = JSON.parse(data)[0];
          const translatedTrends = [];
          
            for(trend of parsedData.trends) {
              translatedTrends.push(new Promise((resolve, reject) => {
                Service.GoogleTranslate.translate(trend.name, 'en', (err, translation) => {
                  if(err) reject(err)
                  resolve(translation);
                });
              }))
            }
              Promise.all(translatedTrends)
              .then((results) => {
                for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
                 results[resultIdx].detectedSourceLanguage = Service.SupportedLanguages[results[resultIdx].detectedSourceLanguage]
                 results[resultIdx].location = location;
                }
                results.push({geoLoc: geoLoc});
                res.status(200).send(results);
              })
              .catch(err => console.error(err));
            })
        })
      })
  });

  router.get('/tweets-with/:trending_topic/trends_at_with_coords/:lat/:lng/:radius', (req, res) => {
    let trendingTopic = req.params.trending_topic;
    let location = {lat: req.params.lat, lng: req.params.lng, radius: req.params.radius};
  
      let geoPositionWithRadius = {latitude: location.lat, longitude: location.lng, radius: `${location.radius}mi`}
      Service.Twitter.getSearch({q: trendingTopic, result_type: 'popular', geocode: geoPositionWithRadius, count: 25}, 
      (err, response, body) => {
        res.status(500).send(body);
      }, (data) => {
        let tweets = JSON.parse(data);
        const translatedTweets = [];
        const tweetsRetweets = [];
            
        for(tweet of tweets.statuses) {
          translatedTweets.push(new Promise((resolve, reject) => {
            Service.GoogleTranslate.translate(tweet.text, 'en', (err, translation) => {
              if(err) reject(err)
              resolve(translation);
            });
          }))
        }
  
        for(tweet of tweets.statuses) {
          tweetsRetweets.push(new Promise((resolve, reject) => {
              //using App-auth due to liit exceeding with user-auth
              axios.get(`https://api.twitter.com/1.1/statuses/retweets/${tweet.id_str}.json?count=6`, {
                headers: {
                  'Authorization': keys.TWITTER_API_APP_Authorization_header_value || TWITTER_API_APP_Authorization_header_value
                }
              })
              .then((result) => { 
                let retweeters = result.data;
                let retweeterImages = []
                for(retweeter of retweeters) {
                  retweeterImages.push({"profile_image_url": retweeter.user.profile_image_url_https})
                }
                  resolve(retweeterImages);
              })
              .catch(err => reject(err))
            })
          )
        }
  
        Promise.all(translatedTweets)
        .then((results) => {
          Promise.all(tweetsRetweets)
          .then((nextResults) => {
            for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
              results[resultIdx].detectedSourceLanguage = Service.SupportedLanguages[results[resultIdx].detectedSourceLanguage]
              results[resultIdx].retweeters = nextResults[resultIdx];
              results[resultIdx].user = {
                "name": tweets.statuses[resultIdx].user.name,
                "profile_image_url": tweets.statuses[resultIdx].user.profile_image_url_https,
                "location": tweets.statuses[resultIdx].user.location,
                "id_str": tweets.statuses[resultIdx].user.id_str,
                "screen_name": `@${tweets.statuses[resultIdx].user.screen_name}`,
                "verified": tweets.statuses[resultIdx].user.verified,
              }
              var convertedDate = new Date( tweets.statuses[resultIdx].created_at.replace(/\+\d+\s/g, '') ).toLocaleString({locales: "hc"}, {hour12: true, timeZone: "America/New_York"});
              results[resultIdx].created_at = convertedDate;
              results[resultIdx].retweet_count = tweets.statuses[resultIdx].retweet_count;
              results[resultIdx].favorite_count = tweets.statuses[resultIdx].favorite_count;
              results[resultIdx].id_str = tweets.statuses[resultIdx].id_str;
            }
            res.status(200).send(results);
          })
          .catch(err => console.error(err))
        })
        .catch(err => console.error(err));
  
      })
  })

router.get('/tweets-with/:trending_topic/trends_at/:location', (req, res) => {
  let trendingTopic = req.params.trending_topic;
  let location = req.params.location;

  Service.Coords(location)
  .then((coords) => {
    let geoPositionWithRadius = {latitude: coords.lat, longitude: coords.lng, radius: '500mi'}
    Service.Twitter.getSearch({q: trendingTopic, result_type: 'popular', geocode: geoPositionWithRadius, count: 25}, 
    (err, response, body) => {
      res.status(500).send(body);
    }, (data) => {
      let tweets = JSON.parse(data);
      const translatedTweets = [];
      const tweetsRetweets = [];
          
      for(tweet of tweets.statuses) {
        translatedTweets.push(new Promise((resolve, reject) => {
          Service.GoogleTranslate.translate(tweet.text, 'en', (err, translation) => {
            if(err) reject(err)
            resolve(translation);
          });
        }))
      }

      for(tweet of tweets.statuses) {
        tweetsRetweets.push(new Promise((resolve, reject) => {
            //using App-auth due to liit exceedding with user-auth
            axios.get(`https://api.twitter.com/1.1/statuses/retweets/${tweet.id_str}.json?count=6`, {
              headers: {
                'Authorization': keys.TWITTER_API_APP_Authorization_header_value || TWITTER_API_APP_Authorization_header_value
              }
            })
            .then((result) => { 
              let retweeters = result.data;
              let retweeterImages = []
              for(retweeter of retweeters) {
                retweeterImages.push({"profile_image_url": retweeter.user.profile_image_url_https})
              }
                resolve(retweeterImages);
            })
            .catch(err => reject(err))
          })
        )
      }

      Promise.all(translatedTweets)
      .then((results) => {
        Promise.all(tweetsRetweets)
        .then((nextResults) => {
          for(let resultIdx=0; resultIdx < results.length; resultIdx++) {
            results[resultIdx].detectedSourceLanguage = Service.SupportedLanguages[results[resultIdx].detectedSourceLanguage]
            results[resultIdx].retweeters = nextResults[resultIdx];
            results[resultIdx].user = {
              "name": tweets.statuses[resultIdx].user.name,
              "profile_image_url": tweets.statuses[resultIdx].user.profile_image_url_https,
              "location": tweets.statuses[resultIdx].user.location,
              "id_str": tweets.statuses[resultIdx].user.id_str,
              "screen_name": `@${tweets.statuses[resultIdx].user.screen_name}`,
              "verified": tweets.statuses[resultIdx].user.verified,
            }
            var convertedDate = new Date( tweets.statuses[resultIdx].created_at.replace(/\+\d+\s/g, '') ).toLocaleString({locales: "hc"}, {hour12: true, timeZone: "America/New_York"});
            results[resultIdx].created_at = convertedDate;
            results[resultIdx].retweet_count = tweets.statuses[resultIdx].retweet_count;
            results[resultIdx].favorite_count = tweets.statuses[resultIdx].favorite_count;
            results[resultIdx].id_str = tweets.statuses[resultIdx].id_str;
          }
          res.status(200).send(results);
        })
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err));

    })
  })
})

module.exports = router;