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
* yarn add @react-native-community/viewpager
* react-native link @react-native-community/viewpager
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
                uri: 'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
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
                uri: 'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
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
          // chatBg: require('../../source/bg.jpg'),
          inverted: false,  // require
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


  sendMessage = (type, content, isInverted) => {
      console.log(type, content, isInverted, 'msg')
    }

  render() {
    return (
      <ChatScreen
        ref={(e) => this.chat = e}
        messageList={this.state.messages}
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

## About Message
```js
{
    messages: [
      {
        id: `${new Date().getTime()}`,
        type: 'text',
        content: 'hello world',
        targetId: '12345678',
        chatInfo: {
          avatar: require('./app/source/image/avatar.png'),
          id: '12345678',
          nickName: 'Test'   // not require
        },
        renderTime: true,
        sendStatus: 0,
        time: new Date().getTime()
      }
    ]
}
```
* id: message id
* about message type: 'text', 'image', 'voice', 'video', 'location', 'share', 'videoCall', 'voiceCall', 'redEnvelope', 'file', 'system'
* targetId: The id of the person who sent the message
* content: see example
* chatInfo: The profile of the person you're chatting with
* renderTime: Whether to render time above message
* sendStatus: 0 ---> sending,  1 ---> sendSuccess,  -1 ---> You are deleted or on the blacklist,   -2 ---> error
* time: moment，messageList sorted by time

## Props

* message

props | default | Info
----- |  ------- | -----
 messageList | [] | Messages to display
 inverted | false |  When messageList exceeds the screen height, set it to true otherwise false (You can change this value when componentWillUnmount or delete message)
 chatBackgroundImage | null | Custom BackgroundImage
 onScroll | () => {} | ListView Props
 onEndReachedThreshold | 0.1 | ListView Props
 chatWindowStyle | undefined | Container style
 sendMessage | (type, content, isInverted) => {} | Callback when sending a message
 reSendMessage | (message) => {} | Callback when you want send again
 delMessage | (indexs, isInverted) => {} | Callback when delete message
 renderAvatar | (message) => {} | Custom avatar view
 avatarStyle | undefined | Style of avatar
 chatId | '123455678' | The id of the person you're chatting with
 chatType | 'friend' | Your relationship with the person you're chatting with
 onMessagePress | (type, index, content) => {} |  Callback when press a message
 onMessageLongPress | (type, index, content) => {} | Callback when longPress a message and usePopView is false
 pressAvatar | (isSelf, targetId) => {} |  Callback when press avatar
 androidHeaderHeight | 66 | Android navigation bar height + statusBar height
 userProfile | {id: '88888888', avatar: 'default.png'} | Your own profile
 showUserName | false | Whether show userName
 loadHistory | () => {} | Callback when loading earlier messages
 renderMessageTime | (time) => {} | Custom time inside above message
 renderChatBg | (bg) => {} | Custom chat background image
 renderErrorMessage | (messageStatus) => {} | Custom a message when the friend relationship is abnormal
 panelSource | [] | Custom panel source
 renderPanelRow | () => {} | Custom a tab icon
 allPanelHeight | 200 | emojiPanel and plusPanel height
 messageErrorIcon | icon element | Custom a icon when message failed to be sent
 leftMessageBackground | '#fffff' | Custom background color on left
 rightMessageBackground | '#a0e75a' | Custom background color on right
 leftMessageTextStyle | undefined | Custom text message style on left
 rightMessageTextStyle | undefined | Custom text message style on right

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
   voiceSpeakIcon | [] | Custom icon when pressIn record button
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
   setAudioHandle | (status) => {} | Callback when get handle or not
   audioHasPermission | false | Whether has permission
   requestAndroidPermission | () => {} | Callback when check permission on android
   checkPermission | () => {} | Callback whether has permission
   voiceLoading | false | Loading voice or not
   voicePlaying | false | Playing voice or not
   voiceLeftLoadingColor | '#cccccc' | Custom background color on left when load voice
   voiceVolume | 0 | Volume (0~10)
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
renderVideoCallMessage| undefined | Custom message video call, (data) => {}
renderVoiceCallMessage| undefined | Custom message voice call, (data) => {}
renderRedEnvelopeMessage| undefined | Custom message red-envelope, (data) => {}
renderFileMessage| undefined | Custom message file, (data) => {}
renderPatMessage| undefined | Custom message pat, (data) => {}
renderCustomMessage| undefined | Custom message custom, (data) => {}
renderSystemMessage| undefined | Custom message system, (data) => {}


## All Props
```js
  propTypes = {
      /* defaultProps */
      messageList: PropTypes.array.isRequired,
      inverted: PropTypes.bool,
      lastReadAt: PropTypes.object,
      chatBackgroundImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      onScroll: PropTypes.func,
      onEndReachedThreshold: PropTypes.number,
      chatWindowStyle: ViewPropTypes.style,
      sendMessage: PropTypes.func,
      renderAvatar: PropTypes.func,
      avatarStyle: ViewPropTypes.style,
      allPanelAnimateDuration: PropTypes.number,
      chatType: PropTypes.oneOf(['friend', 'group']),
      onMessagePress: PropTypes.func,
      onMessageLongPress: PropTypes.func,
      renderMessageTime: PropTypes.func,
      pressAvatar: PropTypes.func,
      renderErrorMessage: PropTypes.func,
      renderChatBg: PropTypes.func,
      reSendMessage: PropTypes.func,
      androidHeaderHeight: PropTypes.number.isRequired,
      iphoneXHeaderPadding: PropTypes.number,
      iphoneXBottomPadding: PropTypes.number,
      showUserName: PropTypes.bool,
      showIsRead: PropTypes.bool,
      showInput: PropTypes.bool,
      isReadStyle: PropTypes.object,
      userProfile: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.isRequired,
        nickName: PropTypes.string
      }),
      panelSource: PropTypes.array,
      renderPanelRow: PropTypes.func,
      panelContainerStyle: ViewPropTypes.style,
      itemContainerStyle: ViewPropTypes.style,
      allPanelHeight: PropTypes.number,
      messageErrorIcon: PropTypes.element,
      loadHistory: PropTypes.func,
      leftMessageBackground: PropTypes.string,
      rightMessageBackground: PropTypes.string,
      leftMessageTextStyle: PropTypes.object,
      rightMessageTextStyle: PropTypes.object,
      renderLoadEarlier: PropTypes.func,
      extraData: PropTypes.any,
      containerBackgroundColor: PropTypes.string,
      showsVerticalScrollIndicator: PropTypes.bool,
      userNameStyle: PropTypes.object,
      panelContainerBackgroundColor: PropTypes.string,
      /* popProps */
      usePopView: PropTypes.bool,
      popoverStyle: ViewPropTypes.style,
      renderDelPanel: PropTypes.func,
      changeHeaderLeft: PropTypes.func,
      setPopItems: PropTypes.func,
      messageDelIcon: PropTypes.element,
      messageSelectIcon: PropTypes.element,
      delMessage: PropTypes.func,
      renderMessageCheck: PropTypes.func,
    
      /* inputBarProps */
      emojiIcon: PropTypes.element,
      placeholder: PropTypes.string,
      keyboardIcon: PropTypes.element,
      plusIcon: PropTypes.element,
      sendIcon: PropTypes.element,
      sendUnableIcon: PropTypes.element,
      inputStyle: ViewPropTypes.style,
      inputOutContainerStyle: ViewPropTypes.style,
      inputContainerStyle: ViewPropTypes.style,
      inputHeightFix: PropTypes.number,
      useEmoji: PropTypes.bool,
      usePlus: PropTypes.bool,
      /* voiceProps */
      useVoice: PropTypes.bool,
      pressInText: PropTypes.string,
      pressOutText: PropTypes.string,
      voiceIcon: PropTypes.element,
      voiceLeftIcon: PropTypes.element,
      voiceRightIcon: PropTypes.element,
      voiceErrorIcon: PropTypes.element,
      voiceCancelIcon: PropTypes.element,
      voiceSpeakIcon: PropTypes.array,
      audioPath: PropTypes.string,
      audioOnProgress: PropTypes.func,
      audioOnFinish: PropTypes.func,
      audioInitPath: PropTypes.func,
      audioRecord: PropTypes.func,
      audioStopRecord: PropTypes.func,
      audioPauseRecord: PropTypes.func,
      audioResumeRecord: PropTypes.func,
      audioCurrentTime: PropTypes.number,
      audioHandle: PropTypes.bool,
      setAudioHandle: PropTypes.func,
      audioHasPermission: PropTypes.bool,
      checkPermission: PropTypes.func,
      requestAndroidPermission: PropTypes.func,
      voiceErrorText: PropTypes.string,
      voiceCancelText: PropTypes.string,
      voiceNoteText: PropTypes.string,
      voiceLoading: PropTypes.bool,
      voicePlaying: PropTypes.bool,
      voiceLeftLoadingColor: PropTypes.string,
      voiceVolume: PropTypes.number,
      voiceRightLoadingColor: PropTypes.string,
      /* bubbleProps */
      renderTextMessage: PropTypes.func,
      renderImageMessage: PropTypes.func,
      renderVoiceMessage: PropTypes.func,
      renderVoiceView: PropTypes.func,
      renderVideoMessage: PropTypes.func,
      renderLocationMessage: PropTypes.func,
      renderShareMessage: PropTypes.func,
      renderVideoCallMessage: PropTypes.func,
      renderVoiceCallMessage: PropTypes.func,
      renderRedEnvelopeMessage: PropTypes.func,
      renderFileMessage: PropTypes.func,
      renderSystemMessage: PropTypes.func,
      renderCustomMessage: PropTypes.func,
      renderPatMessage: PropTypes.func,
      /* delPanelProps */
      delPanelStyle: ViewPropTypes.style,
      delPanelButtonStyle: ViewPropTypes.style,
      flatListProps: PropTypes.object
  }


````

## Notes for Android
* Make sure you have `android:windowSoftInputMode="adjustResize"` in your `AndroidManifest.xml`:
```xml
android:windowSoftInputMode="adjustResize"
```

## Donation
☕️☕️
<p>
<img alt="react-native-easy-chat-ui" src="./screenshots/alipay.jpg" width="200" height="200" />
<img alt="react-native-easy-chat-ui" src="./screenshots/wechatPay.jpg" width="200" height="200" />
</p>

## License
* [MIT](LICENSE)
