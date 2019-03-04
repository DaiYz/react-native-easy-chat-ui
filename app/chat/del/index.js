import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native'
const { height } = Dimensions.get('window')

export default class DelPanel extends PureComponent {
  constructor (props) {
    super(props)
    const { isIphoneX, iphoneXBottomPadding, delPanelStyle } = props
    this.height = delPanelStyle?.height ? delPanelStyle.height : 54
    this.totalHeight = this.height + (isIphoneX ? iphoneXBottomPadding : 0)
  }

  componentWillReceiveProps (nextProps, prveProps) {
  }

  render () {
    return (
      <Animated.View
        style={[
          { position: 'absolute', bottom: 0, right: 0, left: 0 },
          {
            top: this.props.leftHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [ height, height - this.props.HeaderHeight - this.totalHeight ]
            }),
            opacity: this.props.leftHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]}
        renderToHardwareTextureAndroid
      >
        <View style={[{ paddingBottom: this.props.iphoneXBottomPadding, backgroundColor: '#fff' }, this.props.delPanelStyle]}>
          {
            this.props.renderDelPanel === undefined
              ? <TouchableOpacity
                style={[styles.button, this.props.delPanelButtonStyle, { height: this.height }]}
                activeOpacity={1}
                onPress={() => this.props.delMessage(this.props.messageSelected, this.props.isInverted)}
              >
                {this.props.messageDelIcon}
              </TouchableOpacity>
              : this.props.renderDelPanel(this.props.messageSelected)
          }
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
