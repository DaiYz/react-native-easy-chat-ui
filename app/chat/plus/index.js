import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Animated } from 'react-native'
const { width, height } = Dimensions.get('window')

export default class PlusPanel extends PureComponent {
  constructor (props) {
    super(props)
    const { allPanelHeight, isIphoneX, iphoneXBottomPadding } = props
    this.totalHeight = allPanelHeight + (isIphoneX ? iphoneXBottomPadding : 0)
  }

  componentWillReceiveProps (nextProps, prveProps) {
  }

  render () {
    const { HeaderHeight, panelHeight, panelContainerStyle } = this.props
    return (
      <Animated.View
        style={[{
          top: panelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [height, height - HeaderHeight - this.totalHeight]
          }),
          opacity: panelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          position: 'absolute',
          height: this.totalHeight,
          width
        }
        ]}
        renderToHardwareTextureAndroid
      >
        <View style={[styles.container, panelContainerStyle]}>
          {this.props.panelSource.map((item, index) =>
            this.props.renderPanelRow(item, index))
          }
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
