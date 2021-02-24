import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions
} from 'react-native'
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler'
const { height } = Dimensions.get('window')
class VoiceButton extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      state: State.UNDETERMINED
    }
  }

  _onPanState = (e) => {
    const { showVoice, voiceEnd } = this.props
    if (e.state === State.END) {
      // 结束
      if (showVoice) {
        voiceEnd()
      }
    }
  }

  _onPan = (e) => {
    const { inputHeight, changeVoiceStatus, audioHasPermission } = this.props
    const compare = height - inputHeight
    if (!audioHasPermission && Platform.OS === 'android') return null
    if (e.absoluteY < compare) {
      changeVoiceStatus(false)
    } else {
      changeVoiceStatus(true)
    }
  }

  _onTab = (e) => {
    const { showVoice, voiceStart, voiceEnd } = this.props
    if (e.state === State.BEGAN) {
      if (showVoice) {
        voiceStart()
      }
    }
    if (e.state === State.END) {
      // 结束
      if (showVoice) {
        voiceEnd()
      }
    }
  }

  render () {
    const { isVoiceEnd, inputHeightFix, pressOutText, pressInText } = this.props
    return (
      <PanGestureHandler onGestureEvent={(e) => this._onPan(e.nativeEvent)} onHandlerStateChange={(e) => this._onPanState(e.nativeEvent)}>
        <TapGestureHandler
          onHandlerStateChange={(e) => this._onTab(e.nativeEvent)}
        >
          <View style={{ borderRadius: 18, backgroundColor: isVoiceEnd ? '#bbb' : '#f5f5f5' }}>
            <View style={[styles.container, { height: 35 + inputHeightFix }]}>
              <Text style={styles.text}>{isVoiceEnd ? `${pressOutText}` : `${pressInText}`}</Text>
            </View>
          </View>
        </TapGestureHandler>
      </PanGestureHandler>
    )
  }
}

export default VoiceButton

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555'
  }
})
