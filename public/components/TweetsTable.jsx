import React from 'react';
import TweetsTableRow from './TweetsTableRow.jsx';

class TweetsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.tweets.map(tweet => <TweetsTableRow tweet={tweet} key={tweet.id}/>)}
        </tbody>
      </table>
    )
  }
}

export default TweetsTable;