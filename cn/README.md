# react-native-easy-chat-ui

[English version](../README.md)


[![npm](https://img.shields.io/npm/v/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dm/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/dt/react-native-easy-chat-ui.svg)](https://www.npmjs.com/package/react-native-easy-chat-ui)
[![npm](https://img.shields.io/npm/l/react-native-easy-chat-ui.svg)](https://github.com/DaiYz/react-native-easy-chat-ui/blob/master/LICENSE)

## 安装
- RN `>= 0.44.0` 使用   最新版本
- RN `< 0.44.0` 使用  `0.1.7`版本
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

## 详细示例 (如何录制语音)

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
* id: 消息 id
* per: 单独消息内容对象(消息类型和具体内容)
* targetId: 消息谁发的就是谁的用户ID  
* chatInfo: 与你聊天人的资料(id, 头像)
* renderTime: 是否在每一条消息上显示消息时间
* sendStatus: 0 ---> 发送中,  1 ---> 发送成功,  -1 ---> 你被拉黑或者被删除,   -2 ---> 发送失败 (只有发送方为自己的时候才有此条)
* time: 当前时间，消息将由此值来排序
* inverted: 当消息长度超出屏幕高度时为true否则为false(请在在componentWillUnmount生命周期中或者删除消息的时候修改此值)

## 属性

* 消息属性

属性名字 | 默认值  | 描述
----- |  ------- | -----
 messageList | {} | 渲染消息列表
 onScroll | () => {} | 同ListView属性
 onEndReachedThreshold | 0.1 | 同ListView属性
 chatWindowStyle | undefined | 外部容器样式
 sendMessage | (type, content, isInverted) => {} | 发送消息时的回调
 reSendMessage | (type, content) => {} | 重发消息的回调
 delMessage | (indexs, isInverted) => {} | 删除消息的回调
 avatarStyle | undefined | 头像样式
 chatId | '123455678' | 聊天对象的ID
 chatType | 'friend' | 与聊天人的关系
 onMessagePress | (type, index, content, message) => {} | 点击消息的回调
 onMessageLongPress | (type, index, content, message) => {} | 长按消息的回调(usePopView为false时候触发，默认显示一个弹出层)
 pressAvatar | (isSelf) => {} | 点击头像的回调
 isIphoneX | true | 是否是苹果的刘海屏手机
 androidHeaderHeight | 66 | android的导航头高度(加上statusBar高度)
 userProfile | {id: '88888888', avatar: 'default.png'} | 你自己的个人资料
 historyLoading | false | 显示一个loading
 loadHistory | () => {} | 下拉获取历史记录的回调
 renderMessageTime | (time) => {} | 自定义渲染消息上方的时间
 renderErrorMessage | (messageStatus) => {} | 自定义渲染当被拉黑或者被删除的时候显示的提示性消息
 panelSource | [{icon: <Image source={require('../source/image/photo.png')} style={{width: 30, height: 30}}/>,title: '照片',onPress: () => { console.log('takePhoto') }}, {icon: <Image source={require('../source/image/camera.png')} style={{width: 30, height: 30}}/>,title: '拍照',onPress: () => { console.log('takePhoto') }}] | 自定义最右侧面板数据源
 renderPanelRow | <TouchableOpacity key={index} style={{width: (width - 30) / 4, height: (width - 30) / 4, justifyContent: 'center', alignItems: 'center', marginBottom: 20}} activeOpacity={0.7} onPress={() => data.onPress()} > <View style={{backgroundColor: '#fff', borderRadius: 8, padding: 15, borderColor: '#ccc', borderWidth: StyleSheet.hairlineWidth}}>{data.icon}</View><Text style={{color: '#7a7a7a', marginTop: 10}}>{data.title}</Text></TouchableOpacity> | 自定义渲染每个数据源的内容
 allPanelHeight | 200 | 所有键盘下方面板的高度(表情面板，更多面板)
 messageErrorIcon | icon element | 自定义消息发送失败时显示的图标，默认为红色圆形感叹号
 leftMessageBackground | '#fffff' | 自定义左侧消息的背景色
  rightMessageBackground | '#a0e75a' | 自定义右侧消息的背景色
  allPanelAnimateDuration | 100 | 所有面板动画时长
 
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
   voiceSpeakIcon | icon element | 自定义按下语音按钮显示的图标
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
   setAudioHandle | () => {} | 修改是否获取录音具柄的状态
   audioHasPermission | false | 是否有录音权限
   checkAndroidPermission | () => {} | android检查录音权限的回调
   voiceLoading | false | 是否正在加载语音
   voicePlaying | false | 是否正在播放语音
   voiceLeftLoadingColor | '#cccccc' | 自定义语音加载时左侧消息颜色
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
## 关于android 键盘设置
`android:windowSoftInputMode="adjustResize"` in your `AndroidManifest.xml`:
```xml
android:windowSoftInputMode="adjustResize"
```

## 关于ios TextInput无法输入中文
降级到0.52.2版本以下，或者修改原生文件(自己再封装的TextInput无法从根本上解决问题)

## 需要视频或者语音通话可以访问react-native-agora库

* 详情请戳 [react-native-agora](https://github.com/syanbo/react-native-agora)