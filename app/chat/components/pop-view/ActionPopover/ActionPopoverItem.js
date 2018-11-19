// ActionPopoverItem.js

'use strict'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableOpacity, PixelRatio} from 'react-native'
const pixelSize = (function () {
  let pixelRatio = PixelRatio.get()
  if (pixelRatio >= 3) return 0.333
  else if (pixelRatio >= 2) return 0.5
  else return 1
})()

export default class ActionPopoverItem extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    leftSeparator: PropTypes.bool,
    rightSeparator: PropTypes.bool
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps
  };

  buildProps () {
    let {style, title, leftSeparator, rightSeparator, ...others} = this.props

    style = [{
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderColor: '#fff',
      borderLeftWidth: leftSeparator ? pixelSize : 0,
      borderRightWidth: rightSeparator ? pixelSize : 0
    }].concat(style)

    if ((title || title === '' || title === 0) && !React.isValidElement(title)) {
      let textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#fff',
        fontSize: 14
      }
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>
    }

    this.props = {style, title, leftSeparator, rightSeparator, ...others}
  }

  render () {
    this.buildProps()

    let {title, ...others} = this.props
    return (
      <TouchableOpacity {...others}>
        {title}
      </TouchableOpacity>
    )
  }
}
