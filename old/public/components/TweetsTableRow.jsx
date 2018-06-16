import React from 'react';
import TweetsTableRowData from './TweetsTableRowData.jsx';

class TweetsTableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <tr>
        {Object.values(this.props.tweet).map((tweet, index) => <TweetsTableRowData data={tweet} key={index}/>)}
      </tr>
    )
  }
}

export default TweetsTableRow;