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
        {['[[[', this.props.tweet.user, ']]]', this.props.tweet.translatedText, '_', this.props.tweet.detectedSourceLanguage, '_', this.props.tweet.originalText]}
      </tr>
    )
  }
}

export default TweetsTableRow;