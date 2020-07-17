# react-native-easy-chat-ui

[English version](../README.md)


[![npm](https://img.shields.io/npm/v/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dm/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dt/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/l/react-native-easy-chat-ui.svg)](https://github.com/DaiYz/react-native-easy-chat-ui/blob/master/LICENSE)

## 安装
- RN `>= 0.44.0` 使用   最新版本
- RN `< 0.44.0` 使用  `0.1.x`版本
* yarn add @react-native-community/viewpager
* react-native link @react-native-community/viewpager
* [npm](https://www.npmjs.com/#getting-started): `npm install react-native-easy-chat-ui --save`
* [Yarn](https://yarnpkg.com/): `yarn add react-native-easy-chat-ui`





## 截图
<p>
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/1.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/2.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/3.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/4.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/5.png" width="207" height="448" />
<img alt="react-native-easy-chat-ui" src="https://raw.githubusercontent.com/DaiYz/react-native-easy-chat-ui/master/screenshots/6.png" width="207" height="448" /></p>

## 示例

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
        androidHeaderHeight={androidHeaderHeight}
        sendMessage={this.sendMessage}
      />
    )
  }
}
```

## 详细示例 (如何录制语音)

```
cd Demo
yarn
react-native run-ios or react-native run-android
```

## About Message object
```js
{
  messages: [
    {
      id: `${new Date().getTime()}`,
      type: 'text',
      content: 'hello world'
      targetId: '12345678',
      chatInfo: {
        avatar: require('./app/source/image/avatar.png'),
        id: '12345678'
      },
      renderTime: true,
      sendStatus: 0,
      time: new Date().getTime()
    },
  ]
}
```
* id: 消息 id
* type: 消息类型 'text', 'image', 'voice', 'video', 'location', 'share', 'videoCall', 'voiceCall', 'redEnvelope', 'file', 'system'
* conent: 消息内容
* targetId: 消息谁发的就是谁的用户ID
* chatInfo: 与你聊天人的资料(id, 头像, 昵称)
* renderTime: 是否在每一条消息上显示消息时间
* sendStatus: 0 ---> 发送中,  1 ---> 发送成功,  -1 ---> 你被拉黑或者被删除,   -2 ---> 发送失败 (只有发送方为自己的时候才有此条)
* time: 当前时间，消息将由此值来排序

## 属性

* 消息属性

属性名字 | 默认值  | 描述
----- |  ------- | -----
 messageList | [] | 渲染消息列表
  inverted | false |  是否倒置
  chatBackgroundImage | null | 聊天背景图片
 onScroll | () => {} | 同ListView属性
 onEndReachedThreshold | 0.1 | 同ListView属性
 chatWindowStyle | undefined | 外部容器样式
 sendMessage | (type, content, isInverted) => {} | 发送消息时的回调
 reSendMessage | (message) => {} | 重发消息的回调
 delMessage | (indexs, isInverted) => {} | 删除消息的回调
 renderAvatar | undefined | 自定义头像组件
 avatarStyle | undefined | 头像样式, renderAvatar 为 undefined 时有效
 chatId | '123455678' | 聊天对象的ID
 chatType | 'friend' | 与聊天人的关系
 onMessagePress | (type, index, content, message) => {} | 点击消息的回调
 onMessageLongPress | (type, index, content, message) => {} | 长按消息的回调(usePopView为false时候触发，默认显示一个弹出层)
 pressAvatar | (isSelf, targetId) => {} | 点击头像的回调
 androidHeaderHeight | 66 | android的导航头高度(加上statusBar高度)
 userProfile | {id: '88888888', avatar: 'default.png'} | 你自己的个人资料
 loadHistory | () => {} | 下拉获取历史记录的回调
 renderMessageTime | (time) => {} | 自定义渲染消息上方的时间
 renderChatBg | (bg) => {} | 自定义当前聊天背景
 renderErrorMessage | (messageStatus) => {} | 自定义渲染当被拉黑或者被删除的时候显示的提示性消息
 panelSource | [] | 自定义最右侧面板数据源
 renderPanelRow | () => {} | 自定义渲染每个数据源的内容
 allPanelHeight | 200 | 所有键盘下方面板的高度(表情面板，更多面板)
 messageErrorIcon | icon element | 自定义消息发送失败时显示的图标，默认为红色圆形感叹号
 leftMessageBackground | '#fffff' | 自定义左侧消息的背景色
  rightMessageBackground | '#a0e75a' | 自定义右侧消息的背景色
  allPanelAnimateDuration | 100 | 所有面板动画时长
  leftMessageTextStyle | undefined | 自定义左侧文本消息文字样式
  rightMessageTextStyle | undefined | 自定义右侧文本消息文字样式
 * 输入组件属性

 属性名字 | 默认值 | 描述
 ----- |  ------- | -----
 emojiIcon | icon element | 自定义最下方的表情图标
 placeholder | '请输入...' | Placeholder
 keyboardIcon | icon | 自定义最下方的键盘图标
 plusIcon | icon element | 自定义最下方的加号图标
 sendIcon | icon element | 自定义最下方的发送图标
 sendUnableIcon | icon element | 自定义未能发送消息时的发送图标
 useEmoji | true | 是否启用表情
 usePlus | true | 是否启用更多
 inputStyle | undefined | 输入框样式

 * 弹出层属性

  属性名字 | 默认值 | 描述
  ----- |  ------- | -----
  usePopView | true | 长按消息是否显示一个弹出层
  popoverStyle | {backgroundColor: '#333'} | 弹出层样式
  changeHeaderLeft | () => {} | 点击多选之后可以使用此方法改变导航条左上角文字实现关闭多选功能
  setPopItems | (type, index, text) => {let items = [{title: '删除',onPress: () => {that.props.delMessage([index])}},{title: '多选',onPress: () => {that.multipleSelect(index)}}]if (type === 'text') {items = [{title: '复制',onPress: () => Clipboard.setString(text)},{title: '删除',onPress: () => {that.props.delMessage([index])}},{title: '多选', onPress: () => {that.multipleSelect(index)}}]}return items} | 自定义弹出层的每一个item
 messageDelIcon | icon element | 自定义底部删除按钮的图标
 renderDelPanel | undefined | 自定义底部删除面板, (isSelect)=> {}
 messageSelectIcon | icon element | 自定义消息选中时的图标
 renderMessageCheck | undefined | 自定义渲染消息选中和未选中的样式, (isSelect)=> {}

 * 语音属性

  属性名字 | 默认值 | 描述
   ----- |  ------- | -----
   useVoice | true | 是否使用语音
   pressInText | '按住 说话' | 自定义切换到语音，按钮显示的文字
   pressOutText | '松开 发送' | 自定义按下语音按钮，按钮显示的文字
   voiceIcon | icon element | 自定义输入框左侧的语音图标
   voiceLeftIcon | icon element | 自定义左侧语音消息的图标
   voiceRightIcon | icon element | 自定义右侧语音消息的图标
   voiceErrorIcon | icon element | 自定义录音发生错误的图标
   voiceErrorText | '说话时间太短' | 自定义录音发生错误的提示文字
   voiceCancelIcon | icon element | 自定义取消录音的图标
   voiceCancelText | '松开手指取消发送' | 自定义取消录音的提示文字
   voiceNoteText | '手指上划，取消发送' | 自定义按下语音按钮显示的文字
   voiceSpeakIcon | [] | 自定义按下语音按钮显示的图标(多个)
   audioPath | '' | 语音的存储路径
   audioOnProgress | () => {} | 录制语音中的回调
   audioOnFinish | () => {} | 录制语音结束的回调
   audioInitPath | () => {} | 初始化语音路径的回调
   audioRecord | () => {} | 开始录音的回调
   audioStopRecord | () => {} | 停止录音的回调
   audioPauseRecord | () => {} | 暂停录音的回调
   audioResumeRecord | () => {} | 重制录音的回调
   audioCurrentTime | 0 | 语音的长度
   audioHandle | true | 是否获取到录音的具柄
   setAudioHandle | (status) => {} | 修改是否获取录音具柄的状态
   audioHasPermission | false | 是否有录音权限
   requestAndroidPermission | () => {} | android检查录音权限的回调
   checkPermission | () => {} | 检查是否已获得录音权限
   voiceLoading | false | 是否正在加载语音
   voicePlaying | false | 是否正在播放语音
   voiceLeftLoadingColor | '#cccccc' | 自定义语音加载时左侧消息颜色
   voiceVolume | 0 | 音量,取值[0 ~ 10]
   voiceRightLoadingColor | '#628b42' | 自定义语音加载时右侧消息颜色
* 聊天气泡属性

属性名字 | 默认值 | 描述
----- |  ------- | -----
renderTextMessage | undefined | 自定义渲染文本消息, (data) => {}
renderImageMessage | undefined | 自定义渲染图片消息, (data) => {}
renderVoiceMessage | undefined | 自定义渲染语音消息, (data) => {}
renderVoiceView | undefined | 自定义渲染语音外部容器, (data) => {}
renderVideoMessage | undefined | 自定义视频消息, (data) => {}
renderLocationMessage | undefined | 自定义定位消息, (data) => {}
renderShareMessage| undefined | 自定义分享消息, (data) => {}
renderVideoCallMessage| undefined | 自定义视频聊天消息, (data) => {}
renderVoiceCallMessage| undefined | 自定义语音聊天信息, (data) => {}
renderRedEnvelopeMessage| undefined | 自定义红包信息 (data) => {}
renderFileMessage| undefined | 自定义文件信息, (data) => {}
renderPatMessage| undefined | 自定义拍一拍消息, (data) => {}
renderCustomMessage| undefined | 自定义消息, (data) => {}
renderSystemMessage| undefined | 自定义系统消息, (data) => {}

## 所有属性

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


```


## 关于android 键盘设置
`android:windowSoftInputMode="adjustResize"` in your `AndroidManifest.xml`:
```xml
android:windowSoftInputMode="adjustResize"
```

## 关于ios TextInput无法输入中文（RN 0.53～0.55版本）
降级到0.52.2版本以下或者升级到最新版，或者修改原生文件(自己再封装的TextInput无法从根本上解决问题)

## 捐赠
☕️☕️
<p>
<img alt="react-native-easy-chat-ui" src="../screenshots/alipay.jpg" width="200" height="200" />
<img alt="react-native-easy-chat-ui" src="../screenshots/wechatPay.jpg" width="200" height="200" />
</p>

## 需要视频或者语音通话可以访问react-native-agora库
* 详情请戳 [react-native-agora](https://github.com/syanbo/react-native-agora)
