import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
export default class Control extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,
    dot: PropTypes.element,
    activeDot: PropTypes.element
  };

  static defaultProps = {
    ...View.defaultProps
  };

  renderDot (dotIndex) {
    let { dot, carousel } = this.props
    if (React.isValidElement(dot)) {
      dot = React.cloneElement(dot, { key: dotIndex, onPress: () => carousel && carousel.scrollToPage(dotIndex) })
      return dot
    }
    return (
      <View
        key={dotIndex}
        style={{
          backgroundColor: '#ddd',
          marginLeft: 6,
          width: 6,
          height: 6,
          borderRadius: 6 / 2
        }}
      />
    )
  }

  renderActiveDot (dotIndex) {
    let { activeDot } = this.props
    if (React.isValidElement(activeDot)) {
      activeDot = React.cloneElement(activeDot, { key: dotIndex })
      return activeDot
    }
    return (
      <View
        key={dotIndex}
        style={{
          backgroundColor: '#aaa',
          width: 8,
          marginLeft: 6,
          height: 8,
          borderRadius: 8 / 2
        }}
      />
    )
  }

  renderDots () {
    let { index, total } = this.props
    let dots = []
    for (let i = 0; i < total; ++i) {
      if (i === index) dots.push(this.renderActiveDot(i))
      else dots.push(this.renderDot(i))
    }
    return dots
  }

  render () {
    let { style, index, total, ...others } = this.props
    return (
      <View style={[styles.container, style]} pointerEvents='box-none'>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderDots()}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 8,
    padding: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
