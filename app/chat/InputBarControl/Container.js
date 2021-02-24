import React, { PureComponent } from 'react'
import {
  Platform,
  View,
  Animated, StyleSheet, Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')

class Container extends PureComponent {
  render () {
    const { inputOutContainerStyle, isIphoneX, xHeight, inputContainerStyle, children, setInputHeight } = this.props
    return (
      <Animated.View
        style={[
          styles.commentBar,
          inputOutContainerStyle,
          Platform.OS === 'ios'
            ? { paddingBottom: isIphoneX ? xHeight : 0 }
            : {}
        ]}
        onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
      >
        <View style={[{
          flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 10
        }, inputContainerStyle]}
        >
          {children}
        </View>
      </Animated.View>
    )
  }
}

export default Container

const styles = StyleSheet.create({
  commentBar: {
    width: width,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
