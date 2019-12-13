import ChatView from './app/chat/ChatView'
import { EMOJIS_DATA } from './app/source/emojis/index'
import { ViewStyle } from 'react-native'
import { PureComponent } from 'react'

export interface VoiceContentPropsType {
  uri: string
  length: number
}

export interface ImageContentPropsType {
  uri: string
  width: number
  height: number
}

export interface VideoContentPropsType {
  uri: string
  poster: string
  width: number
  height: number
}

export enum MsgType {
  text = 'text',
  image = 'image',
  voice = 'voice',
  video = 'video',
  location = 'location',
  share = 'share',
  videoCall = 'videoCall',
  voiceCall = 'voiceCall',
  redEnvelope = 'redEnvelope',
  file = 'file',
  system = 'system',
}

/**
 * 单独消息内容对象
 */
export interface MessagePorpsType {
  id: string
  /**
   * 消息类型
   */
  type: MsgType | string
  /**
   * 消息内容
   */
  content: string | VoiceContentPropsType | ImageContentPropsType | VideoContentPropsType

  /**
   * 消息谁发的就是谁的用户ID
   */
  targetId: string
  /**
   * 与你聊天人的资料
   */
  chatInfo: {
    avatar: string | number
    id: string,
    nickName?: string
  }
  /**
   * 是否在每一条消息上显示消息时间
   */
  renderTime: boolean
  sendStatus: 0 | 1 | -1 | -2 | number
  /**
   * 当前时间，消息将由此值来排序，Date.getTime()
   */
  time: string
}
// 消息属性
export interface ChatScreenPropsType {
  /**
   * 消息列表
   */
  messageList: MessagePorpsType[]
  /**
   * 会话最后被阅读的时间
   */
  lastReadAt: Date
  /**
   * 是否列表倒置
   */
  inverted: boolean
  /**
   * 聊天背景
   */
  chatBackgroundImage?: string | number
  /**
   * 同FlatList属性
   */
  onScroll?: () => void
  /**
   * 同FlatList属性
   */
  onEndReachedThreshold?: number
  /**
   * 外部容器样式
   */
  chatWindowStyle?: ViewStyle
  /**
   * 发送消息时的回调
   */
  sendMessage: (type: MsgType, content: string, isInverted: boolean) => void
  /**
   * 重发消息的回调
   */
  reSendMessage?: (message: MessagePorpsType) => void
  /**
   * 删除消息的回调
   */
  delMessage?: (indexs, isInverted: boolean) => void
  renderAvatar?: (message: MessagePorpsType) => JSX.Element
  /**
   * 头像样式
   */
  avatarStyle?: ViewStyle
  /**
   * 聊天对象的ID
   */
  chatId?: string
  /**
   * 与聊天人的关系
   */
  chatType?: 'friend' | 'group'
  /**
   * 点击消息的回调
   */
  onMessagePress?: (type: MsgType, index: number, content: string | object, message: MessagePorpsType) => void
  /**
   * 长按消息的回调(usePopView为false时候触发，默认显示一个弹出层)
   */
  onMessageLongPress?: (type: MsgType, index: number, content: string | object, message: MessagePorpsType) => void
  /**
   * 点击头像的回调
   */
  pressAvatar?: (isSelf: boolean, targetId: string) => void
  /**
   * 	android的导航头高度(加上statusBar高度)
   */
  androidHeaderHeight: number
  /**
   * 你自己的个人资料
   */
  userProfile?: { id: string; avatar: string | number }
  /**
   * 显示一个loading
   */
  renderLoadEarlier?: () => JSX.Element
  /**
   * 下拉获取历史记录的回调
   */
  loadHistory?: () => void
  /**
   * 是否显示用户昵称
   */
  showUserName?: boolean
  /**
   * 自定义渲染消息上方的时间
   */
  renderMessageTime?: (time: string) => JSX.Element
  /**
   * 自定义当前聊天背景
   */
  renderChatBg?: (bg: number | string) => JSX.Element
  /**
   * 	自定义渲染当被拉黑或者被删除的时候显示的提示性消息
   */
  renderErrorMessage?: (messageStatus: 0 | 1 | -1 | -2) => JSX.Element
  /**
   * 自定义最右侧面板数据源
   */
  panelSource?: []
  /**
   * 自定义渲染每个数据源的内容
   */
  renderPanelRow?: any
  /**
   * 所有键盘下方面板的高度(表情面板，更多面板)
   */
  allPanelHeight?: number
  /**
   * 	自定义消息发送失败时显示的图标，默认为红色圆形感叹号
   */
  messageErrorIcon?: any
  /**
   * 自定义左侧消息的背景色
   */
  leftMessageBackground?: string
  /**
   * 自定义右侧消息的背景色
   */
  rightMessageBackground?: string
  /**
   * 	所有面板动画时长
   */
  allPanelAnimateDuration?: number
  // 输入组件属性
  /**
   * 自定义最下方的表情图标
   */
  emojiIcon?: any
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 自定义最下方的键盘图标
   */
  keyboardIcon?: any
  /**
   * 自定义最下方的加号图标
   */
  plusIcon?: any
  /**
   * 自定义最下方的发送图标
   */
  sendIcon?: any
  /**
   * 自定义未能发送消息时的发送图标
   */
  sendUnableIcon?: any
  /**
   * 是否启用表情
   */
  useEmoji?: boolean
  /**
   * 是否启用更多
   */
  usePlus?: boolean
  /**
   * 输入框样式
   */
  inputStyle?: ViewStyle
  // 弹出层属性
  /**
   * 长按消息是否显示一个弹出层
   */
  usePopView?: boolean
  /**
   * 弹出层样式
   */
  popoverStyle?: ViewStyle
  /**
   * 	点击多选之后可以使用此方法改变导航条左上角文字实现关闭多选功能
   */
  changeHeaderLeft?: () => void
  /**
   * 自定义弹出层的每一个item
   */
  setPopItems?: any
  /**
   * 自定义底部删除按钮的图标
   */
  messageDelIcon?: any
  /**
   * 自定义底部删除面板
   */
  renderDelPanel?: (isSelect: boolean) => JSX.Element
  /**
   * 自定义消息选中时的图标
   */
  messageSelectIcon?: any
  /**
   * 自定义渲染消息选中和未选中的样式
   */
  renderMessageCheck?: (isSelect: boolean) => JSX.Element
  // 语音属性
  /**
   * 是否使用语音
   */
  useVoice?: boolean
  /**
   * 自定义切换到语音，按钮显示的文字
   */
  pressInText?: string
  /**
   * 自定义按下语音按钮，按钮显示的文字
   */
  pressOutText?: string
  /**
   * 自定义输入框左侧的语音图标
   */
  voiceIcon?: any
  /**
   * 自定义左侧语音消息的图标
   */
  voiceLeftIcon?: any
  /**
   * 自定义右侧语音消息的图标
   */
  voiceRightIcon?: any
  /**
   * 自定义录音发生错误的图标
   */
  voiceErrorIcon?: any
  /**
   * 自定义录音发生错误的提示文字
   */
  voiceErrorText?: string
  /**
   * 自定义取消录音的图标
   */
  voiceCancelIcon?: any
  /**
   * 自定义取消录音的提示文字
   */
  voiceCancelText?: string
  /**
   * 自定义按下语音按钮显示的文字
   */
  voiceNoteText?: string
  /**
   * 自定义按下语音按钮显示的图标
   */
  voiceSpeakIcon?: any
  /**
   * 语音的存储路径
   */
  audioPath?: string
  /**
   * 录制语音中的回调
   */
  audioOnProgress?: () => void
  /**
   * 	录制语音结束的回调
   */
  audioOnFinish?: () => void
  /**
   * 初始化语音路径的回调
   */
  audioInitPath?: () => void
  /**
   * 开始录音的回调
   */
  audioRecord?: () => void
  /**
   * 停止录音的回调
   */
  audioStopRecord?: () => void
  /**
   * 暂停录音的回调
   */
  audioPauseRecord?: () => void
  /**
   * 重置录音的回调
   */
  audioResumeRecord?: () => void
  /**
   * 语音的长度
   */
  audioCurrentTime?: number
  /**
   * 是否获取到录音的句柄
   */
  audioHandle?: boolean
  /**
   * 修改是否获取录音句柄的状态
   */
  setAudioHandle?: (status: boolean) => void
  /**
   * 是否有录音权限
   */
  audioHasPermission?: boolean
  /**
   * android检查录音权限的回调
   */
  requestAndroidPermission?: () => void
  /**
   * 检查是否已获得录音权限
   */
  checkPermission?: () => void
  /**
   * 是否正在加载语音
   */
  voiceLoading?: boolean
  /**
   * 是否正在播放语音
   */
  voicePlaying?: boolean
  /**
   * 自定义语音加载时左侧消息颜色
   */
  voiceLeftLoadingColor?: string
  /**
   * 自定义语音加载时右侧消息颜色
   */
  voiceRightLoadingColor?: string
  // 聊天气泡属性
  /**
   * 	自定义渲染文本消息
   */
  renderTextMessage?: (data: any) => JSX.Element
  /**
   * 自定义渲染图片消息
   */
  renderImageMessage?: (data: any) => JSX.Element
  /**
   * 自定义渲染语音消息
   */
  renderVoiceMessage?: (data: any) => JSX.Element
  /**
   * 自定义渲染语音外部容器
   */
  renderVoiceView?: (data: any) => JSX.Element
  /**
   * 自定义渲染视频消息
   */
  renderVideoMessage?: (data: any) => JSX.Element
  /**
   * 自定义定位消息
   */
  renderLocationMessage?: (data: any) => JSX.Element
  /**
   * 自定义分享消息
   */
  renderShareMessage?: (data: any) => JSX.Element
  /**
   * 自定义视频聊天信息
   */
  renderVideoCallMessage?: (data: any) => JSX.Element
  /**
   * 自定义语音聊天信息
   */
  renderVoiceCallMessage?: (data: any) => JSX.Element
  /**
   * 自定义红包信息
   */
  renderRedEnvelopeMessage?: (data: any) => JSX.Element
  /**
   * 自定义文件信息
   */
  renderFileMessage?: (data: any) => JSX.Element
  /**
   * 自定义系统消息
   */
  renderSystemMessage?: (data: any) => JSX.Element
}

export class ChatScreen extends PureComponent<ChatScreenPropsType, any> {
  static defaultProps: {}
  constructor()
  componentDidMount(): void
  componentWillMount(): void
  render(): JSX.Element
}

export const EMOJIS_DATA
