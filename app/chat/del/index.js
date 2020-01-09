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

  render () {
    const { ImageComponent } = this.props
    return (
      <Animated.View
        style={[
          { position: 'absolute', bottom: 0, right: 0, left: 0 },
          {
            bottom: this.props.leftHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [ -this.totalHeight, 0 ]
            }),
            opacity: this.props.leftHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1]
            })
          }
        ]}
        renderToHardwareTextureAndroid
      >
        <View style={[{ paddingBottom: this.props.isIphoneX ? this.props.iphoneXBottomPadding : 0, backgroundColor: '#fff' }, this.props.delPanelStyle]}>
          {
            this.props.renderDelPanel === undefined
              ? <TouchableOpacity
                style={[styles.button, this.props.delPanelButtonStyle, { height: this.height }]}
                activeOpacity={1}
                onPress={() => this.props.delMessage(this.props.messageSelected, this.props.isInverted)}
              >
                {this.props.messageDelIcon
                  ? this.props.messageDelIcon
                  : <ImageComponent source={require('../../source/image/delete.png')} style={{ width: 22, height: 22 }} />}
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
