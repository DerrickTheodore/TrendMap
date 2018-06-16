import axios from 'axios';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header.jsx';
import TrendingTable from './TrendingTable.jsx';
import TweetsList from './TweetsList.jsx';
import trendsExampleData from '../../trendsExampleData.js';
import tweetDummyData from '../../tweetExampleDate.js';
import Auth from './Auth.jsx';
import Favorites from './Favorites.jsx';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingTopics: [],
      tweets: [],
      clickedTrendingTopic: '',
      coords: {
        lat: 0,
        lng: 0
      },
      radius: 100,
    }
    this.handleTrendClick = this.handleTrendClick.bind(this);
    this.fetchTrends = this.fetchTrends.bind(this)
    this.handleTrendAreaSearch = this.handleTrendAreaSearch.bind(this)
  }

  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  componentWillMount() {
    this.getPosition()
  //   .then(result => {
  //     this.setState({ coords: {lat: result.coords.latitude, lng: result.coords.longitude} }, () => {
  //     axios.get(`http://127.0.0.1:8080/search/trends-at-with-coords/${this.state.coords.lat}/${this.state.coords.lng}`)
  //     .then((results) => {
  //       let data = results.data.slice(0, -1)
  //       this.setState({trendingTopics: data}, () => {
  //       let trend = this.state.trendingTopics[0]
  //       if(trend.originalText[0] === '#') {
  //         let len = trend.length;
  //         trend.originalText = trend.originalText.slice(1, len);
  //       }
  //       axios.get(`http://127.0.0.1:8080/search/tweets-with/${trend.originalText}/trends_at_with_coords/${this.state.coords.lat}/${this.state.coords.lng}/${this.state.radius}`)
  //       .then((results) => {
  //         this.setState({tweets: results.data, clickedTrendingTopic: `#${trend.originalText}`})
  //       })
  //       .catch(err => console.error(err));
  //     })
  //   }).catch(err => console.error(err));
  //   })
  // })
  // .catch(err => console.error(err));
    this.setState({trendingTopics: trendsExampleData.trends_at}, () => {
        let trend = this.state.trendingTopics[0]
        if(trend.originalText[0] === '#') {
          let len = trend.length;
          trend.originalText = trend.originalText.slice(1, len);
        }
        this.setState({tweets: tweetDummyData.tweets, clickedTrendingTopic: `#${trend.originalText}`})
    })
  }

  handleInputChange(e) {
    this.setState({value: e.target.value})
  }

  handleTrendAreaSearch(value, e) {
    e.preventDefault()
    axios.get(`http://127.0.0.1:8080/search/trends-at/${value}`)
    .then((results) => {
      let data = results.data.slice(0, -1)
      let geo = results.data.slice(-1)[0].geoLoc
      this.setState({trendingTopics: data, coords: {lat: geo.lat, lng: geo.long}}, () => {
      })
    })
    .catch(err => console.error(err));
  }

  onZoomChanged(mapProps, map) {
    var google = mapProps.google;
    var bounds = map.getBounds();
    var center = map.getCenter();
    if (bounds && center) {
      var ne = bounds.getNorthEast();
      // Calculate radius (in meters).
      var radiusInMiles = google.maps.geometry.spherical.computeDistanceBetween(center, ne) * 0.00062137;
      // mi =m * 0.00062137
      this.setState({radius: radiusInMiles.toFixed()})
    }
  }

  fetchTrends(mapProps, map, e) {
    let clickedLatAndLngObj = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    this.setState({coords: clickedLatAndLngObj}, () => {
      axios.get(`http://127.0.0.1:8080/search/trends-at-with-coords/${clickedLatAndLngObj.lat}/${clickedLatAndLngObj.lng}`)
      .then((results) => {
        let trends = results.data.
        this.setState({trendingTopics: trends})
      })
      .catch(err => console.error(err))
    })
  }

  handleTrendClick(trend, e) {
    e.preventDefault();
    if(trend.originalText[0] === '#') {
      let len = trend.originalText.length;
      trend.originalText = trend.originalText.slice(1, len);
    }
      axios.get(`http://127.0.0.1:8080/search/tweets-with/${trend.originalText}/trends_at_with_coords/${this.state.coords.lat}/${this.state.coords.lng}/${this.state.radius}`)
      .then((results) => {
        this.setState({tweets: results.data, clickedTrendingTopic: `#${trend.originalText}`})
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path='/' component={
            () => <TrendingTable 
              trends={this.state.trendingTopics}
              //Bug fix: map refreshes when button clicked
              //bind causing map refresh?
              handleTrendClick={this.handleTrendClick}
              fetchTrends={this.fetchTrends}
              handleTrendAreaSearch={this.handleTrendAreaSearch}
              onZoomChanged={this.onMapPositionChanged}
              coords={this.state.coords}
            />
          }/>
          <Route exact path='/auth' component={
            () => <Auth />
          }/>
          <Route exact path='/tweets' component={
            () => <TweetsList 
              tweets={this.state.tweets}
              clickedTrendingTopic={this.state.clickedTrendingTopic}
            />
          }/>
          <Route exact path='/favorties' component={
            () => <Favorites />
          }/>
        </Switch>
      </main>  
    )
  }
}

export default App;