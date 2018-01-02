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
      </tr>
    )
  }
}

export default TreadingTableRow;