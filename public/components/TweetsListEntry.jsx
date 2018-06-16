import React from 'react';
import Tweet from './Tweet.jsx';

class TweetsListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <div>
        <Tweet data={this.props.tweet}/>
      </div>
    )
  }
}

export default TweetsListEntry;