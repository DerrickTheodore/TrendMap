import React from 'react';
import TreadingTableRow from './TreadingTableRow.jsx';
import TreadingTableRowHead from './TreadingTableRowHead.jsx';

class TreadingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            {Object.keys(this.props.trends[0]).map((header, index) => <TreadingTableRowHead key={index} header={header} />)}
          </tr>
            {this.props.trends.map((trend, index) => <TreadingTableRow handleTrendClick={this.props.handleTrendClick.bind(this)} key={index} trend={trend} />)} 
        </tbody>
      </table>
    )
  }
}

export default TreadingTable;