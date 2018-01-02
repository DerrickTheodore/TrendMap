import React from 'react';
import TweetsTableRow from './TweetsTableRow.jsx';
import TweetsTableRowHead from './TweetsTableRowHead.jsx';



class TweetsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <div>
      <h1>{this.props.clickedTrendingTopic}</h1>
      <table>
        <tbody>
          {Object.keys(this.props.tweets[0]).map((header, index) => <TweetsTableRowHead key={index} header={header}/>)}
          {this.props.tweets.map((tweet, index) => <TweetsTableRow tweet={tweet} key={index}/>)}
        </tbody>
      </table>
      </div>
    )
  }
}

export default TweetsTable;