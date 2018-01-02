import React from 'react';
import TreadingTable from './TreadingTable.jsx';
import TweetsTable from './TweetsTable.jsx';
import exampleData from '../../exampleData';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingTopics: [],
      tweets: [],
      value: ''
    }
  }

  componentWillMount() {
    axios.get(`http://127.0.0.1:8080/search/trends-at/NYC`)
    .then((results) => {
      this.setState({trendingTopics: results.data})
      let trend = this.state.trendingTopics[0]
      if(trend.originalText[0] === '#') {
        let len = trend.length;
        trend.originalText = trend.originalText.slice(1, len);
      }
      axios.get(`http://127.0.0.1:8080/search/tweets-with/${trend.originalText}/trends_at/${trend.location}`)
      .then((results) => {
        this.setState({tweets: results.data})
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  handleInputChange(e) {
    this.setState({value: e.target.value})
  }

  handleTrendAreaSearch(e) {
    e.preventDefault()
    axios.get(`http://127.0.0.1:8080/search/trends-at/${this.state.value}`)
    .then((results) => {
      this.setState({trendingTopics: results.data})
    })
    .catch(err => console.error(err));
  }

  handleTrendClick(trend) {
    if(trend.originalText[0] === '#') {
      let len = trend.originalText.length;
      trend.originalText = trend.originalText.slice(1, len);
    }
    axios.get(`http://127.0.0.1:8080/search/tweets-with/${trend.originalText}/trends_at/${trend.location}`)
    .then((results) => {
      this.setState({tweets: results.data})
    })
    .catch(err => console.error(err));
  }

  render() {
      if(!(this.state.trendingTopics.length && this.state.tweets.length)) {
        return (
          <h1>Loading...</h1>
        )
      } else {
        return (
          <div>
            <h4>Search trends in area</h4>
            <input type="text" value={this.state.value} onChange={(e) => this.handleInputChange(e)}/>
            <button type="submit" onClick={(e) => this.handleTrendAreaSearch(e)} >search</button>

            <TreadingTable handleTrendClick={this.handleTrendClick.bind(this)} trends={this.state.trendingTopics}/>
          
            <TweetsTable tweets={this.state.tweets} />
          </div>
        )
      }
  }
}

export default App;