import React, { PureComponent } from 'react'
import { View } from 'react-native'

export default class ViewPagerAndroidContainer extends PureComponent {
  state = {
    width: 0,
    height: 0
  }

  render () {
    return (
      <View style={[this.props.style]} onLayout={this._onLayoutChange}>
        <View style={{ width: this.state.width, height: this.state.height }}>{this.props.children}</View>
      </View>
    )
  }

  _onLayoutChange = (e) => {
    const { width, height } = e.nativeEvent.layout
    this.setState({ width: width, height: height })
  }
}