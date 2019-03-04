import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  ViewPropTypes as RNViewPropTypes,
  PermissionsAndroid,
  ActivityIndicator,
  Platform
} from 'react-native'
// import {AudioRecorder, AudioUtils} from 'react-native-audio'
import PropTypes from 'prop-types'
const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))
const ViewPropTypes = RNViewPropTypes || View.propTypes

const { height } = Dimensions.get('window')

export default class VoiceView extends PureComponent {
  constructor (props) {
    super(props)
    this.timer = null
    this.state = {
      isShow: false,
      opacityValue: new Animated.Value(this.props.opacity),
      progress: new Animated.Value(0),
      currentTime: 0.0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      audioPath: '',
      error: false,
      hasPermission: undefined,
      waiting: true,
      volume: 0
    }
  }

  componentDidMount () {
    this.props.audioInitPath()
    this.props.audioOnProgress()
    this.props.audioOnFinish()
    Platform.OS === 'android' && this.props.checkAndroidPermission()
  }

  componentWillReceiveProps (next) {
    if (!this.state.recording) return undefined
    if (Platform.OS === 'android') {
    } else {
      if (!next.voiceStatus) {
        if (!this.state.recording) return undefined
        this._pause()
      } else {
        if (!this.state.paused) return undefined
        this._resume()
      }
    }
  }

  show () {
    const { hasPermission } = this.props
    this.setState({
      isShow: true
    })
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: this.props.opacity,
        duration: this.props.fadeInDuration
      }
    ).start()
    this._record()
  }

  async close () {
    await this._stop()
    const { hasPermission } = this.state
    let delayTime = 0
    const { audioCurrentTime } = this.props
    if (audioCurrentTime < 1) {
      this.setState({ error: true })
      delayTime = 1000
    }
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => this.delayClose(), delayTime)
    const content = {
      uri: this.props.audioPath,
      length: audioCurrentTime
    }
    if (!this.props.voiceStatus) {
      this.props.audioInitPath()
      setTimeout(() => this.props.changeVoiceStatus(true), 100)
      return undefined
    }
    audioCurrentTime >= 1 && this.props.sendVoice && this.props.sendVoice('voice', content)
    this.props.audioInitPath()
  }

  delayClose () {
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: 0.0,
        duration: this.props.fadeOutDuration
      }
    ).start(() => {
      this.setState({
        isShow: false,
        error: false
      })
      this.props.setAudioHandle(true)
    })
  }

  async _pause () {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!')
      return
    }
    try {
      await this.props.audioPauseRecord()
      this.setState({ paused: true })
    } catch (error) {
      console.log(error)
    }
  }

  async _resume () {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!')
      return
    }
    try {
      await this.props.audioResumeRecord()
      this.setState({ paused: false })
    } catch (error) {
      console.log(error)
    }
  }

  async _stop () {
    if (!this.state.recording) { return undefined }
    this.setState({ stoppedRecording: true, recording: false, paused: false })
    try {
      await this.props.audioStopRecord()
    } catch (error) {
      console.log(error)
    }
  }

  async _record () {
    if (this.state.recording) {
      return
    }
    this.setState({ recording: true, paused: false })
    try {
      await this.props.audioRecord()
    } catch (e) {
      console.log(e)
    }
  }

  _renderContent () {
    const { error } = this.state
    const { errorIcon, voiceStatus, cancelIcon, audioHandle, errorText, voiceCancelText, voiceNoteText, renderVoiceView } = this.props
    if (renderVoiceView === undefined) {
      return (
        error ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 150 }}>
            { errorIcon }
            <Text style={{ color: '#fff', marginTop: 10, textAlign: 'center' }}>{errorText}</Text>
          </View>
        ) : !voiceStatus ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 150 }}>
            {cancelIcon}
            <Text style={{ color: '#fff', marginTop: 10 }}>{voiceCancelText}</Text>
          </View>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {
              audioHandle ? (
                <View style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={'#fff'} size='large' />
                </View>
              ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  {this.props.voiceSpeakIcon}
                  <Text style={{ color: '#fff', textAlign: 'center' }}>{voiceNoteText}</Text>
                </View>
              )
            }
          </View>
        )
      )
    } else {
      return renderVoiceView({ error, voiceStatus, audioHandle })
    }
  }

  render () {
    let pos = (height - 64 - 44 - 200) / 2
    const view = this.state.isShow ? (
      <View style={[styles.container, { top: pos }]} pointerEvents='none'>
        <Animated.View style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}>
          { this._renderContent()}
        </Animated.View>
      </View>
    ) : null
    return view
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})

VoiceView.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  positionValue: PropTypes.number,
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
  sendVoice: PropTypes.func
}

VoiceView.defaultProps = {
  textStyle: styles.text,
  positionValue: 120,
  fadeInDuration: 500,
  fadeOutDuration: 200,
  opacity: 1,
  sendVoice: () => {}
}
