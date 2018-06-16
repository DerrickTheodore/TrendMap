import React from 'react';

const TrendingTableButton = (props) => (
  <td className='trending-table-data'>
    <button className='trending-table-row-button' type="submit" onClick={(e) => {e.preventDefault(); props.handleTrendClick(props.trend, e)}} ><img className='trending-table-row-button-image' src="https://vignette.wikia.nocookie.net/logopedia/images/e/eb/Twitter_bird_favicon.svg/revision/latest/scale-to-width-down/640?cb=20130409130510" alt=""/></button>
  </td>
)

export default TrendingTableButton;