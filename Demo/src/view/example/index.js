import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity, Dimensions
} from 'react-native';
import { Header, NavigationActions } from 'react-navigation'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import FastImage from 'react-native-fast-image'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import Material from 'react-native-vector-icons/MaterialIcons'
import { ChatScreen } from 'react-native-easy-chat-ui'
const { width, height } = Dimensions.get('window')
export default class Example extends Component {
  static navigationOptions = ({ navigation }) => {
    let option = {
      headerTitle: '聊天'
    }
    if(navigation.state.params && navigation.state.params.hasOwnProperty('headerLeft')){
      option.headerLeft = navigation.state.params.headerLeft
    }
    return option
  }
  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      messages: [
        {
          id: `1`,
          type: 'text',
          content: 'hello world',
          targetId: '12345678',
          chatInfo: {
            avatar: require('../../source/defaultAvatar.png'),
            id: '12345678',
            nickName: 'Test'
          },
          renderTime: true,
          sendStatus: 0,
          time: '1542006036549'
        },
        {
          id: `2`,
          type: 'text',
          content: 'hi/{se}',
          targetId: '12345678',
          chatInfo: {
            avatar: require('../../source/defaultAvatar.png'),
            id: '12345678',
            nickName: 'Test'
          },
          renderTime: true,
          sendStatus: 0,
          time: '1542106036549'
        },
        {
          id: `3`,
          type: 'image',
          content: {
            uri: 'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
            width: 100,
            height: 80,
          } ,
          targetId: '12345678',
          chatInfo: {
            avatar: require('../../source/defaultAvatar.png'),
            id: '12345678',
            nickName: 'Test'
          },
          renderTime: false,
          sendStatus: 0,
          time: '1542106037000'
        },
        {
          id: `4`,
          type: 'text',
          content: '你好/{weixiao}',
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
          type: 'voice',
          content: {
            uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
            length: 10
          },
          targetId: '12345678',
          chatInfo: {
            avatar: require('../../source/defaultAvatar.png'),
            id: '12345678',
            nickName: 'Test'
          },
          renderTime: true,
          sendStatus: 1,
          time: '1542260667161'
        },
        {
          id: `6`,
          type: 'voice',
          content: {
            uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
            length: 30
          },
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
      chatBg: require('../../source/bg.jpg'),
      inverted: false,  // require
      voiceHandle: true,
      currentTime: 0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: '',
      voicePlaying: false,
      voiceLoading: false,
      voiceVolume: 0,
      panelSource: [
        {
          icon: <FastImage source={require('../../source/photo.png')} style={{ width: 30, height: 30 }} />,
          title: '照片',
        }, {
          icon: <FastImage source={require('../../source/camera.png')} style={{ width: 30, height: 30 }} />,
          title: '拍照'
        }
      ]
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
      this.random()
    }
  }

  audioFinish = () => {
    AudioRecorder.onFinished = (data) => this._finishRecording(data.status === 'OK', data.audioFileURL)
  }

  random = () => {
    if (this.timer) return
    console.log('start')
    this.timer = setInterval(()=> {
      const num =  Math.floor(Math.random() * 10)
      this.setState({
        voiceVolume: num
      })
    }, 500)
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
      this.timer && clearInterval(this.timer)
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
        title: '麦克风权限',
        message: '需要权限录制语音.',
        buttonPositive: '确定',
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
    const { messages } = this.state
    const newMsg = [...messages]
    newMsg.push(
      {
        id: `${new Date().getTime()}`,
        type: 'text',
        content: '收到一条消息' + new Date().getTime(),
        targetId: '12345678',
        chatInfo: {
          avatar: require('../../source/avatar.png'),
          id: '88886666',
          nickName: 'Test'
        },
        renderTime: true,
        sendStatus: 1,
        time: `${new Date().getTime()}`
      })
    this.setState({ messages: newMsg })
  }

  sendMessage = (type, content, isInverted) => {
    const { messages } = this.state
    const newMsg = [...messages]
    newMsg.push(
      {
        id: `${new Date().getTime()}`,
        type,
        content,
        targetId: '88886666',
        chatInfo: {
          avatar: require('../../source/avatar.png'),
          id: '12345678',
          nickName: 'Test'
        },
        renderTime: true,
        sendStatus: 1,
        time: `${new Date().getTime()}`
      })
    this.setState({ messages: newMsg })
  }


  changeHeaderLeft = () => {
    /* example */
    this.props.navigation.setParams({
      headerLeft: (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ top: 1, width: 54, paddingLeft: 12, justifyContent: 'center', alignItems: 'flex-start' }}
          onPress={() => {
            this.props.navigation.setParams({
              headerLeft: (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ top: 1, width: 54, paddingLeft: 8, justifyContent: 'center', alignItems: 'flex-start' }}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Material name={'keyboard-arrow-left'} size={30} color={'#000'} />
                </TouchableOpacity>
              )
            })
            this.chat._closeMultipleSelect && this.chat._closeMultipleSelect()
          }
          }
        >
          <Text style={{fontSize: 15, fontWeight: '600'}}>取消</Text>
        </TouchableOpacity>
      )
    })
  }

  renderPanelRow = (data, index) =>
    <TouchableOpacity
      key={index}
      style={{ width: (width - 30) / 4,
        height: (width - 30) / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20 }}
      activeOpacity={0.7}
      onPress={() => console.log('press')}
    >
      <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 15, borderColor: '#ccc', borderWidth: StyleSheet.hairlineWidth }}>
        {data.icon}
      </View>
      <Text style={{ color: '#7a7a7a', marginTop: 10 }}>{data.title}</Text>
    </TouchableOpacity>

  render() {
    let statusHeight = StatusBar.currentHeight || 0
    let androidHeaderHeight = statusHeight + Header.HEIGHT
    const {voiceLoading, voicePlaying, messages, chatBg, inverted, voiceVolume, panelSource} = this.state
    return (
      <View style={styles.container}>
        <ChatScreen
          ref={(e) => this.chat = e}
          CustomImageComponent={FastImage}
          messageList={messages}
          panelSource={panelSource}
          renderPanelRow={this.renderPanelRow}
          inverted={inverted}
          chatBackgroundImage={chatBg}
          sendMessage={this.sendMessage}
          androidHeaderHeight={androidHeaderHeight}
          onMessagePress={this.onPress}
          changeHeaderLeft={this.changeHeaderLeft}
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
          voiceVolume={voiceVolume}
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
