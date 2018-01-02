import React from 'react';

class TweetsTableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <tr>
        {[this.props.tweet.user.name, '--', this.props.tweet.text]}
      </tr>
    )
  }
}

export default TweetsTableRow;