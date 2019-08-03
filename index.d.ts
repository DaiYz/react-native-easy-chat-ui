import ChatView from './app/chat/ChatView'
import { ViewStyle } from 'react-native'
import { PureComponent } from 'react'

enum msgType {
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

export interface messagePorpsType {
  id: string
  /**
   * 单独消息内容对象
   */
  per: {
    /**
     * 消息类型
     */
    type: msgType
    /**
     * 消息内容
     */
    content: string
  }
  /**
   * 消息谁发的就是谁的用户ID
   */
  targetId: string
  /**
   * 与你聊天人的资料
   */
  chatInfo: {
    avatar: string | number
    id: string
  }
  /**
   * 是否在每一条消息上显示消息时间
   */
  renderTime: boolean
  sendStatus: 0 | 1 | -1 | -2
  /**
   * 当前时间，消息将由此值来排序，Date.getTime()
   */
  time: string
}

export interface ChatScreenPropsType {
  /**
   * 消息列表
   */
  messageList: {
    any: {
      messages: messagePorpsType[]
      /**
       * 当消息长度超出屏幕高度时为true否则为false
       * (请在在componentWillUnmount生命周期中或者删除消息的时候修改此值)
       */
      inverted: boolean
      chatBg?: string | number
    }
  }
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
  sendMessage: (type: msgType, content: string, isInverted: boolean) => void
  /**
   * 重发消息的回调
   */
  reSendMessage: (type: msgType, content: string) => void
  /**
   * 删除消息的回调
   */
  delMessage: (indexs, isInverted: boolean) => void
  /**
   * 头像样式
   */
  avatarStyle: ViewStyle
  /**
   * 聊天对象的ID
   */
  chatId: string
  /**
   * 与聊天人的关系
   */
  chatType: 'friend'
}

export class ChatScreen extends PureComponent<ChatScreenPropsType, any> {
  static defaultProps: {}
  constructor(): void
  componentDidMount(): void
  componentWillMount(): void
  render(): JSX.Element
}
