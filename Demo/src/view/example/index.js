import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView, PermissionsAndroid, TouchableOpacity
} from 'react-native';
import { Header, NavigationActions } from 'react-navigation'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import { ChatScreen } from 'react-native-easy-chat-ui'


export default class Example extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '聊天'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      msg: {
        friend_12345678: {
          messages: [
            {
              id: `1`,
              per: {
                type: 'text',
                content: 'hello world'
              } ,
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../source/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542006036549'
            },
            {
              id: `2`,
              per: {
                type: 'text',
                content: 'hi/{se}'
              } ,
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../source/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542106036549'
            },
            {
              id: `3`,
              per: {
                type: 'image',
                content: {
                  uri: 'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
                  width: 100,
                  height: 80,
                }
              } ,
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../source/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: false,
              sendStatus: 0,
              time: '1542106037000'
            },
            {
              id: `4`,
              per: {
                type: 'text',
                content: '你好/{weixiao}'
              } ,
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../source/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: -2,
              time: '1542177036549'
            },
            {
              id: `5`,
              per: {
                type: 'voice',
                content: {
                  uri: 'http://music.163.com/song/media/outer/url?id=27965522.mp3',
                  length: 10
                }
              } ,
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../source/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 1,
              time: '1542260667161'
            },
            {
              id: `6`,
              per: {
                type: 'voice',
                content: {
                  uri: 'http://music.163.com/song/media/outer/url?id=27965522.mp3',
                  length: 30
                }
              } ,
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../source/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542264667161'
            },
          ],
          chatBg: require('../../source/bg.jpg'),  // {uri: 'http: //XXXXXX.jpg'}
          inverted: false  // require
        }
      },
      voiceHandle: true,
      currentTime: 0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: '',
      voicePlaying: false,
      voiceLoading: false
    }
    this.sound = null
    this.activeVoiceId = -1
  }

  audioProgress = () => {
    AudioRecorder.onProgress = (data) => {
      if (data.currentTime === 0) {
        this.setState((prevState) => ({ currentTime: Math.floor(prevState.currentTime + 0.25) }))
      } else {
        this.setState({ currentTime: Math.floor(data.currentTime) })
      }
      this._setVoiceHandel(false)
      this.setState({volume: Math.floor(data.currentMetering) })
    }
  }

  audioFinish = () => {
    AudioRecorder.onFinished = (data) => this._finishRecording(data.status === 'OK', data.audioFileURL)
  }



  checkDir = async() => {
    if (!await RNFS.exists(`${AudioUtils.DocumentDirectoryPath}/voice/`)) {
      RNFS.mkdir(`${AudioUtils.DocumentDirectoryPath}/voice/`)
    }
  }

  initPath = async() => {
    await this.checkDir()
    const nowPath = `${AudioUtils.DocumentDirectoryPath}/voice/voice${Date.now()}.aac`
    this.setState({ audioPath: nowPath, currentTime: 0 })
    this.prepareRecordingPath(nowPath)
  }

  prepareRecordingPath (audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'aac',
      OutputFormat: 'aac_adts',
      AudioEncodingBitRate: 32000,
      MeteringEnabled: true,
    })
  }

  _record = async() => {
    try {
      await AudioRecorder.startRecording()
    } catch (error) {
      console.log(error)
    }
  }

  _stop = async() => {
    try {
      await AudioRecorder.stopRecording()
      if (Platform.OS === 'android') {
        this._finishRecording(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  _setVoiceHandel = (status) => {
    this.setState({voiceHandle: status})
  }

  _pause = async() => {
    try{
      await AudioRecorder.pauseRecording() // Android 由于API问题无法使用此方法
    }catch (e) {
      console.log(e)
    }
  }

  _resume = async() => {
    try{
      await AudioRecorder.resumeRecording() // Android 由于API问题无法使用此方法
    }catch (e) {
      console.log(e)
    }
  }

  _finishRecording (didSucceed, filePath) {
    console.log(filePath)
    this.setState({ finished: didSucceed })
  }

  _requestAndroidPermission = async() => {
    try {
      const rationale = {
        'title': '麦克风权限',
        'message': '需要权限录制语音.'
      }
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      this.setState({ hasPermission: granted === PermissionsAndroid.RESULTS.GRANTED })
    } catch (e) {
      console.log(e)
    }
  }

  onPress = (type, index, content) => {
    if (type === 'voice') {
      const {voicePlaying} = this.state
      if (voicePlaying) {
        if (index === this.activeVoiceId) {
          this.stopSound()
        } else {
          this.stopSound(true)
          this.playSound(content, index)
        }
      } else {
        if (index !== this.activeVoiceId) {
          this.stopSound(true)
        }
        this.playSound(content, index)
      }
    }
  }

  playSound = (url, index) => {
    this.activeVoiceId = index
    if (this.sound === null) {
      this.setState({voiceLoading: true})
      this.sound = new Sound(url, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          this.setState({voiceLoading: false})
          this.sound = null
          return;
        }
        this.setState({voiceLoading: false})
        this.setState({voicePlaying: true})
        this.sound.play((success) => {
          if (success) {
            this.setState({voicePlaying: false})
            console.log('successfully finished playing');
          } else {
            this.setState({voicePlaying: false})
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    } else {
      this.setState({voicePlaying: true})
      this.sound.play((success) => {
        if (success) {
          this.setState({voicePlaying: false})
          console.log('successfully finished playing');
        } else {
          this.setState({voicePlaying: false})
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  stopSound = (remove = false) => {
    this.sound && this.sound.stop()
    this.setState({voicePlaying: false})
    if (remove) {
      this.sound = null
    }
  }

  receive = () => {
    const { msg } = this.state
    const newMsg = Object.assign({}, msg)
    newMsg['friend_12345678'].messages.push(
      {
        id: `${new Date().getTime()}`,
        per: {
          type: 'text',
          content: '收到一条消息' + new Date().getTime()
        },
        targetId: '12345678',
        chatInfo: {
          avatar: require('../../source/avatar.png'),
          id: '88886666'
        },
        renderTime: true,
        sendStatus: 1,
        time: `${new Date().getTime()}`
      })
    this.setState({ msg: newMsg })
  }

  sendMessage = (type, content, isInverted) => {
    const { msg } = this.state
    const newMsg = Object.assign({}, msg)
    newMsg['friend_12345678'].messages.push(
      {
        id: `${new Date().getTime()}`,
        per: {
          type,
          content
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../../source/avatar.png'),
          id: '12345678'
        },
        renderTime: true,
        sendStatus: 1,
        time: `${new Date().getTime()}`
      })
    this.setState({ msg: newMsg })
  }

  render() {
    let statusHeight = StatusBar.currentHeight || 0
    let androidHeaderHeight = statusHeight + Header.HEIGHT
    const {voiceLoading, voicePlaying} = this.state
    return (
      <View style={styles.container}>
        <ChatScreen
          ref={(e) => this.chat = e}
          messageList={this.state.msg}
          sendMessage={this.sendMessage}
          androidHeaderHeight={androidHeaderHeight}
          onMessagePress={this.onPress}
          audioPath={this.state.audioPath}
          audioHasPermission={this.state.hasPermission}
          checkPermission={AudioRecorder.requestAuthorization}
          requestAndroidPermission={this._requestAndroidPermission}
          audioOnProgress={this.audioProgress}
          audioOnFinish={this.audioFinish}
          audioInitPath={this.initPath}
          audioRecord={this._record}
          audioStopRecord={this._stop}
          audioPauseRecord={this._pause}
          audioResumeRecord={this._resume}
          audioCurrentTime={this.state.currentTime}
          audioHandle={this.state.voiceHandle}
          setAudioHandle={this._setVoiceHandel}
          voiceLoading={voiceLoading}
          voicePlaying={voicePlaying}
        />
        <TouchableOpacity
          onPress={() => this.receive()}
          style={{width: 60,
            height: 60, borderRadius: 30,
            position: 'absolute', top: 200, right: 0, backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: '#fff'}}>
            模拟收消息
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
