import React from 'react';
import TreadingTable from './TreadingTable.jsx';
import TweetsTable from './TweetsTable.jsx';
import exampleData from '../../exampleData';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingTopics: exampleData.trends_at,
      tweets: exampleData.tweets_at.statuses
    }
  }

  render() {
    return (
      <div>
        <TreadingTable  trends={this.state.trendingTopics}/>
        <br/>
        <TweetsTable tweets={this.state.tweets} />
      </div>
      
    )
  }
}

export default App;