# react-native-easy-chat-ui

[中文文档](./cn/README.md)


[![npm](https://img.shields.io/npm/v/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dm/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dt/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/l/react-native-easy-chat-ui.svg)](https://github.com/DaiYz/react-native-easy-chat-ui/blob/master/LICENSE)

## ScreenShots
<p>
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/1.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/2.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/3.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/4.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/5.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/6.png" width="207" height="448" /></p>

## Installation

* [npm](https://www.npmjs.com/#getting-started): `npm install react-native-easy-chat-ui --save`
* [Yarn](https://yarnpkg.com/): `yarn add react-native-easy-chat-ui`

## Dependency
- Use version `0.2.x` for RN `>= 0.44.0`
- Use version `0.1.x` for RN `< 0.44.0`

## Example

```jsx
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid
} from 'react-native';
import { Header, NavigationActions } from 'react-navigation'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import { ChatScreen } from 'react-native-easy-chat-ui'


class Example extends React.Component {
  state = {
    msg: {
      friend_12345678: {
        messages: [
          {
            id: `${new Date().getTime()}`,
            per: {
              type: 'text',
              content: 'hello world'
            } ,
            targetId: '12345678',
            chatInfo: {
              avatar: require('./app/source/image/avatar.png'),
              id: '12345678'
            },
            renderTime: true,
            sendStatus: 0,
            time: new Date().getTime()
          },
        ],
        inverted: false  // require
      }
    },
    voiceHandle: true,
    currentTime: 0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: ''
  }


  sendMessage = (type, content, isInverted) => {
      console.log(type, content, isInverted, 'msg')
    }
  
  render() {
    return (
      <ChatScreen
        ref={(e) => this.chat = e}
        messageList={this.state.msg}
        isIphoneX={true}
        androidHeaderHeight={androidHeaderHeight}
        sendMessage={this.sendMessage}
      />
    )
  }
}
```

## Advanced example (How to record  voice)

```
cd Demo
yarn
react-native run-ios or react-native run-android
```

## About Message object
```js
{
  friend_12345678: {
    messages: [
      {
        id: `${new Date().getTime()}`,
        per: {
          type: 'text',
          content: 'hello world'
        } ,
        targetId: '12345678',
        chatInfo: {
          avatar: require('./app/source/image/avatar.png'),
          id: '12345678'
        },
        renderTime: true,
        sendStatus: 0,
        time: new Date().getTime()
      }
    ],
    
    inverted: false  // require
  }
}
```
* friend_12345678: `${chatType}_${chatId}`
* id: message id
* per: per message obj
* targetId: The id of the person who sent the message  
* chatInfo: The profile of the person you're chatting with
* renderTime: Whether to render time above message
* sendStatus: 0 ---> sending,  1 ---> sendSuccess,  -1 ---> You are deleted or on the blacklist,   -2 ---> error
* time: moment，messageList sorted by time
* inverted: When messageList exceeds the screen height, set it to true otherwise false (You can change this value when componentWillUnmount or delete message)

## Props

* message

props | default | Info
----- |  ------- | -----
 messageList | {} | Messages to display
 onScroll | () => {} | ListView Props
 onEndReachedThreshold | 0.1 | ListView Props
 chatWindowStyle | undefined | Container style
 sendMessage | (type, content, isInverted) => {} | Callback when sending a message
 reSendMessage | (type, content) => {} | Callback when you want send again
 delMessage | (indexs, isInverted) => {} | Callback when delete message
 avatarStyle | undefined | Style of avatar
 chatId | '123455678' | The id of the person you're chatting with
 chatType | 'friend' | Your relationship with the person you're chatting with
 onMessagePress | (type, index, content) => {} |  Callback when press a message
 onMessageLongPress | (type, index, content) => {} | Callback when longPress a message and usePopView is false
 pressAvatar | (isSelf) => {} |  Callback when press avatar
 isIphoneX | true | Is iphoneX、iphoneXR、iphoneXS or iphoneXS Max?
 androidHeaderHeight | 66 | Android navigation bar height + statusBar height
 userProfile | {id: '88888888', avatar: 'default.png'} | Your own profile
 historyLoading | false | Display an `ActivityIndicator` when loading earlier messages
 loadHistory | () => {} | Callback when loading earlier messages
 renderMessageTime | (time) => {} | Custom time inside above message
 renderErrorMessage | (messageStatus) => {} | Custom a message when the friend relationship is abnormal
 panelSource | [{icon: <Image source={require('../source/image/photo.png')} style={{width: 30, height: 30}}/>,title: '照片',onPress: () => { console.log('takePhoto') }}, {icon: <Image source={require('../source/image/camera.png')} style={{width: 30, height: 30}}/>,title: '拍照',onPress: () => { console.log('takePhoto') }}] | Custom panel source
 renderPanelRow | <TouchableOpacity key={index} style={{width: (width - 30) / 4, height: (width - 30) / 4, justifyContent: 'center', alignItems: 'center', marginBottom: 20}} activeOpacity={0.7} onPress={() => data.onPress()} > <View style={{backgroundColor: '#fff', borderRadius: 8, padding: 15, borderColor: '#ccc', borderWidth: StyleSheet.hairlineWidth}}>{data.icon}</View><Text style={{color: '#7a7a7a', marginTop: 10}}>{data.title}</Text></TouchableOpacity> | Custom a tab icon
 allPanelHeight | 200 | emojiPanel and plusPanel height
 messageErrorIcon | icon element | Custom a icon when message failed to be sent
 leftMessageBackground | '#fffff' | Custom background color on left
 rightMessageBackground | '#a0e75a' | Custom background color on right
 
 * inputBarProps
 
 props | default | Info
 ----- |  ------- | -----
 emojiIcon | icon element | Custom emoticons
 placeholder | '请输入...' | Placeholder when `text` is empty
 keyboardIcon | icon | Custom keyboard icon
 plusIcon | icon element | Custom plus icon
 sendIcon | icon element | Custom send icon
 
 * popViewProps
 
  props | default | Info
  ----- |  ------ | -----
  usePopView | true | Display a popView when longPress a message
  popoverStyle | {backgroundColor: '#333'} | popView style
  renderDelPanel | undefined | Custom any what you want, (isSelect)=> {}
  changeHeaderLeft | () => {} | Custom headerLeft
  setPopItems | (type, index, text) => {let items = [{title: '删除',onPress: () => {that.props.delMessage([index])}},{title: '多选',onPress: () => {that.multipleSelect(index)}}]if (type === 'text') {items = [{title: '复制',onPress: () => Clipboard.setString(text)},{title: '删除',onPress: () => {that.props.delMessage([index])}},{title: '多选', onPress: () => {that.multipleSelect(index)}}]}return items} | Custom PopView
  messageDelIcon | icon element | Custom delete icon
  messageSelectIcon | icon element | Custom selected icon
  renderMessageCheck | undefined | Custom selected icon, (isSelect)=> {}
  
 * voiceProps 
 
  props | default | Info
   ----- |  ------- | -----
   useVoice | true | send voice message
   pressInText | '按住 说话' | Custom pressIn text
   pressOutText | '松开 发送' | Custom pressOut text
   voiceIcon | icon element | Custom voice icon
   voiceLeftIcon | undefined | Custom icon of the message on the left
   voiceRightIcon | undefined |  Custom icon of the message on the right
   voiceErrorIcon | icon element | Custom icon when record error
   voiceErrorText | '说话时间太短' | Custom text when record error
   voiceCancelIcon | icon element | Custom icon when cancel record
   voiceCancelText | '松开手指取消发送' | Custom text when cancel record
   voiceNoteText | '手指上划，取消发送' | Custom text when pressIn record button
   voiceSpeakIcon | icon element | Custom icon when pressIn record button
   audioPath | '' | File path to store voice
   audioOnProgress | () => {} | Callback when recording
   audioOnFinish | () => {} | Callback when finish record
   audioInitPath | () => {} | Callback when init file path
   audioRecord | () => {} | Callback when start record
   audioStopRecord | () => {} | Callback when stop record
   audioPauseRecord | () => {} | Callback when pause record
   audioResumeRecord | () => {} | Callback when resume record
   audioCurrentTime | 0 | audio length
   audioHandle | true | Whether to get a recording handle
   setAudioHandle | () => {} | Callback when get handle or not
   audioHasPermission | false | Whether has permission 
   checkAndroidPermission | () => {} | Callback when check permission on android
   voiceLoading | false | Loading voice or not
   voicePlaying | false | Playing voice or not
   voiceLeftLoadingColor | '#cccccc' | Custom background color on left when load voice
   voiceRightLoadingColor | '#628b42' | Custom background color on right when load voice
   
* bubbleProps

props | default | Info
----- |  ------- | -----
renderTextMessage | undefined | Custom message text, (data) => {}
renderImageMessage | undefined | Custom message image, (data) => {}
renderVoiceMessage | undefined | Custom message voice, (data) => {}
renderVoiceView | undefined | Custom voice container, (data) => {}
renderVideoMessage | undefined | Custom message video, (data) => {}
renderLocationMessage | undefined | Custom message location, (data) => {}
renderShareMessage| undefined | Custom message share, (data) => {}

## Notes for Android
* Make sure you have `android:windowSoftInputMode="adjustResize"` in your `AndroidManifest.xml`:
```xml
android:windowSoftInputMode="adjustResize"
```

## License
* [MIT](LICENSE)



    
   

