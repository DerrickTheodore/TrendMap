import React from 'react';
// import TweetsTableRowData from './TweetsTableRowData.jsx';

class Tweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      lang: 'Original',
      tweet_text: this.props.data.originalText
    }
  }

  render() {
    return (
      <div className='tweet'>
        <div className='tweet-div'>
          <div className='tweet-image-div'>
            <img src={this.props.data.user.profile_image_url} alt="" className='tweet-image'/>
              <p className='tweet-user-name'>{this.props.data.user.name}</p>
              <p className='tweet-user-screen-name'>{this.props.data.user.screen_name}</p>
              {this.props.data.user.verified ? <div><img className='tweet-user-verified-image' src={"https://about.twitter.com/etc/designs/about-twitter/public/icons-svg/verified2.svg"} /></div> : <div></div>}
          </div>
            <div className='tweet-translate-button'>
              <button type="submit" onClick={() => {

                this.setState({clicked: !this.state.clicked});
                this.state.clicked ? this.setState({tweet_text: this.props.data[`translatedText`]}, () => { this.setState({lang: 'Translated'})}) : this.setState({tweet_text: this.props.data[`originalText`]}, () => { this.setState({lang: 'Original'}) })
              }}> {this.state.lang} </button>
            </div>
          <div className='tweet-text-div'>
            <p className='tweet-text'>
              {this.state.tweet_text}
            </p>
          </div>
          <div className='tweet-footer'>
            <br className='tweet-line-break'/>
              <div className='tweet-counter-div'>
                  <div className='tweet-retweet-div'>
                    <p className='tweet-retweet-text'>
                      RETWEETS
                    </p>
                      <p className='tweet-retweet-counter'>{this.props.data.retweet_count}</p>
                  </div>
                  <div className='tweet-like-div'>  
                    <p className='tweet-like-text'>
                      LIKES
                    </p>
                      <p className='tweet-like-counter'>{this.props.data.favorite_count}</p>
                  </div>
              </div>    
                <div className='tweet-retweeter-list'>
                  {this.props.data.retweeters.map((retweeter, index) => <img className='tweet-retweeter-image' src={retweeter.profile_image_url} alt=""/>)}
                </div>
            <br className='tweet-line-break' />
              <p className='tweet-timestamp'>
                {this.props.data.created_at}
              </p>    
          </div>
        </div>
      </div>
    )
  }
}

export default Tweet;