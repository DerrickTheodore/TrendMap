
import React from 'react';
import MyMapComponent from './MyMapComponent.jsx';


class MyFancyComponent extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      isMarkerShown: false,
    }
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker(){
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick(){
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick.bind(this)}
      />
    )
  }
}

export default MyFancyComponent;
