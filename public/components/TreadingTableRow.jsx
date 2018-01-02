import React from 'react';
import TreadingTableRowData from './TreadingTableRowData.jsx';

class TreadingTableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <tr>
        {Object.values(this.props.trend).map((trend, index) => <TreadingTableRowData data={trend} key={index}/>)}
        <button type="submit" onClick={() => {this.props.handleTrendClick(this.props.trend)}} >tweets?</button>
      </tr>
    )
  }
}

export default TreadingTableRow;