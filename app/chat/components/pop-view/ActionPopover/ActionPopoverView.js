// ActionPopoverView.js

'use strict'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Overlay from '../Overlay/Overlay'
import ActionPopoverItem from './ActionPopoverItem'

export default class ActionPopoverView extends Overlay.PopoverView {
  static propTypes = {
    ...Overlay.PopoverView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      onPress: PropTypes.func
    })).isRequired
  };

  static defaultProps = {
    ...Overlay.PopoverView.defaultProps,
    direction: 'up',
    align: 'center',
    showArrow: true
  };

  static Item = ActionPopoverItem;

  onItemPress (item) {
    this.close(false)
    item.onPress && item.onPress()
  }

  buildProps () {
    let {popoverStyle, directionInsets, items, children, ...others} = this.props

    popoverStyle = [{
      backgroundColor: 'rgba(90, 74, 124, 0.9)',
      paddingVertical: 0,
      paddingHorizontal: 4,
      borderRadius: 8,
      flexDirection: 'row'
    }].concat(popoverStyle)

    if (!directionInsets && directionInsets !== 0) {
      directionInsets = 4
    }

    children = []
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i]
      children.push(
        <this.constructor.Item
          key={'item' + i}
          title={item.title}
          leftSeparator={i !== 0}
          onPress={() => this.onItemPress(item)}
        />
      )
    }

    this.props = {popoverStyle, directionInsets, items, children, ...others}

    super.buildProps()
  }
}
