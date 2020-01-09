import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Animated } from 'react-native'
const { width } = Dimensions.get('window')

export default class PlusPanel extends PureComponent {

  render () {
    const { panelContainerHeight, panelHeight, panelContainerStyle } = this.props
    return (
      <Animated.View
        style={[{
          bottom: panelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [-panelContainerHeight, 0]
          }),
          opacity: panelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          position: 'absolute',
          height: panelContainerHeight,
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
