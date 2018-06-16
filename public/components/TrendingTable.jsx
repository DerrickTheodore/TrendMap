import React from 'react';
import TrendingTableRow from './TrendingTableRow.jsx';
import TrendingTableRowHead from './TrendingTableRowHead.jsx';
import TrendingTableMap from './TrendingTableMap.jsx';
import TrendingTableCounter from './TrendingTableCounter.jsx';

class TrendingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    if(!this.props.trends.length) {
      return (
        <div className='loader'>

        </div>
      )
    } else {
      return (
        <div>
          <div className="lt
          lt-xs-x-1
          lt-xs-y-0
          lt-xs-w-1
          lt-xs-h-1
          lt-sm-x-0
          lt-sm-y-0
          lt-sm-w-2
          lt-sm-h-1
          lt-md-x-0
          lt-md-y-0
          lt-md-w-2
          lt-md-h-1
          lt-lg-x-0
          lt-lg-y-0
          lt-lg-w-3
          lt-lg-h-1">
            <div className="lt-body">
              <table className="trending-table-header-table">
                <tbody>
                  <tr>
                    <form 
                      className="trending-table-search"  
                      action=""
                      onSubmit={(e) => {this.props.handleTrendAreaSearch(this.state.value, e)}}
                    >
                      <font className="trending-table-search-font" >Location:</font>
                      <input className="trending-table-search-input" onChange={(e) => {this.setState({value: e.target.value})}} type="text" name="go" value={this.state.value}/>
                    </form>
                  </tr>
                  <tr>
                    {Object.keys(this.props.trends[0]).map((header, index) => <TrendingTableRowHead key={index} header={header} />).concat( <TrendingTableCounter amtOfTrends={this.props.trends.length} key={Object.values(this.props.trends[0]).length}/>)}
                  </tr>
                </tbody>
              </table>  
              <div className="trending-table-wrapper">
              <table className="trending-table">
                <tbody>
                    {this.props.trends.map((trend, index) => <TrendingTableRow handleTrendClick={this.props.handleTrendClick} key={index} trend={trend} />)} 
                </tbody>
              </table>
            </div>
            </div>
          </div>
            <div className="div_map">
              <TrendingTableMap onMapPositionChanged={this.props.onMapPositionChanged} fetchTrends={this.props.fetchTrends} coords={this.props.coords} zoom={this.props.zoom}/>
            </div>
        </div>
      )
    }
  }
}

export default TrendingTable;