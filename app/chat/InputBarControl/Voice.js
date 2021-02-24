import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'

class Voice extends PureComponent {
  _renderContent = () => {
    const { showVoice, ImageComponent, keyboardIcon, voiceIcon } = this.props
    if (showVoice) {
      return keyboardIcon || <ImageComponent source={require('../../source/image/keyboard.png')} style={{ width: 30, height: 30 }} />
    } else {
      return voiceIcon || <ImageComponent source={require('../../source/image/voice.png')} style={{ width: 30, height: 30 }} />
    }
  }

  render () {
    const {
      inputHeightFix,
      onMethodChange
    } = this.props
    return (
      <View style={{ height: 35 + inputHeightFix, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>
        <TouchableOpacity onPress={onMethodChange} activeOpacity={0.7}>
          {this._renderContent()}
        </TouchableOpacity>
      </View>
    )
  }
}

export default Voice
