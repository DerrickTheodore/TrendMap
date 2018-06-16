import React from 'react';
import TweetslistEntry from './TweetsListEntry.jsx';
// import TweetsTableRowHead from './TweetsTableRowHead.jsx';



class TweetsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <div className="lt
      lt-xs-x-1
      lt-xs-y-0
      lt-xs-w-1
      lt-xs-h-2
      lt-sm-x-0
      lt-sm-y-0
      lt-sm-w-2
      lt-sm-h-2
      lt-md-x-0
      lt-md-y-0
      lt-md-w-3
      lt-md-h-2
      lt-lg-x-0
      lt-lg-y-0
      lt-lg-w-4
      lt-lg-h-2">
        <div className="lt-body">
          <h1 className="hash-header"> {this.props.clickedTrendingTopic}</h1>
          <div className="tweet-list-wrapper">
            <div className="tweet-list"> 
                {/* {Object.keys(this.props.tweets[0]).map((header, index) => <TweetsTableRowHead key={index} header={header}/>)} */}
                {this.props.tweets.map((tweet, index) => <TweetslistEntry tweet={tweet} key={index}/>)}
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

export default TweetsList;