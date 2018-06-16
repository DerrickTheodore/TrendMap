import React from 'react';
import TrendingTableRowData from './TrendingTableRowData.jsx';
import TrendingTableButton from './TrendingTableButton.jsx';

class TrendingTableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <tr className='trending-table-row'>
        {Object.values(this.props.trend).map((trend, index) => <TrendingTableRowData data={trend} key={index}/>).concat( <TrendingTableButton key={Object.values(this.props.trend).length} handleTrendClick={this.props.handleTrendClick.bind(this)} trend={this.props.trend}/> )}
      </tr>
    )
  }
}

export default TrendingTableRow;