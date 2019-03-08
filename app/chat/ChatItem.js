import React, { PureComponent } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet, Dimensions
} from 'react-native'
import TextMessage from './TextMessage'
import ImageMessage from './ImageMessage'
import VoiceMessage from './VoiceMessage'
import { EMOJIS_DATA } from '../source/emojis'
const { width } = Dimensions.get('window')

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  emoji: new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}')
}

export default class ChatItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isSelect: false
    }
  }

  componentDidMount () {
    // this.subscription = DeviceEventEmitter.addListener('INIT_PROGRESS', () => this.setState({progress: 2}))
  }

  componentWillUnmount () {
    // this.subscription && this.subscription.remove()
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isOpen) {
      this.setState({ isSelect: false })
    } else {
      if (nextProps.currentIndex === parseInt(nextProps.rowId) && this.props.currentIndex !== parseInt(nextProps.rowId)) {
        this.setState({ isSelect: true })
      }
    }
  }

  _select = () => {
    this.setState({ isSelect: !this.state.isSelect })
  }

  changeLoading = (status) => {
    this.setState({ loading: status })
  }

  _matchContentString (textContent, views) {
    // 匹配得到index并放入数组中
    if (textContent.length === 0) return
    let emojiIndex = textContent.search(PATTERNS.emoji)

    let checkIndexArray = []

    // 若匹配不到，则直接返回一个全文本
    if (emojiIndex === -1) {
      views.push(<Text key={'emptyTextView' + (Math.random() * 100)}>{textContent}</Text>)
    } else {
      if (emojiIndex !== -1) {
        checkIndexArray.push(emojiIndex)
      }
      // 取index最小者
      let minIndex = Math.min(...checkIndexArray)
      // 将0-index部分返回文本
      views.push(<Text key={'firstTextView' + (Math.random() * 100)}>{textContent.substring(0, minIndex)}</Text>)

      // 将index部分作分别处理
      this._matchEmojiString(textContent.substring(minIndex), views)
    }
  }

  _matchEmojiString (emojiStr, views) {
    let castStr = emojiStr.match(PATTERNS.emoji)
    let emojiLength = castStr[0].length

    let emojiImg = EMOJIS_DATA[castStr[0]]

    if (emojiImg) {
      views.push(<Image key={emojiStr} style={styles.subEmojiStyle} resizeMethod={'auto'} source={emojiImg} />)
    }
    this._matchContentString(emojiStr.substring(emojiLength), views)
  }

  _getActualText (textContent) {
    let views = []
    this._matchContentString(textContent, views)
    return views
  }

  _renderContent= (isSelf) => {
    const { message, isOpen, messageErrorIcon, reSendMessage, rowId } = this.props
    const { loading } = this.state
    const msg = message.per
    switch (msg.type) {
      case 'text':
        if (this.props.renderTextMessage === undefined) {
          return (
            <TextMessage
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              reSendMessage={reSendMessage}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              views={this._getActualText(message.per.content)}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
            />
          )
        } else {
          return this.props.renderTextMessage({ isOpen, isSelf, message, views: this._getActualText(message.per.content), index: parseInt(rowId) })
        }
      case 'image':
        if (this.props.renderImageMessage === undefined) {
          return (
            <ImageMessage
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              reSendMessage={reSendMessage}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
            />
          )
        } else {
          return this.props.renderImageMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'voice':
        if (this.props.renderVoiceMessage === undefined) {
          return (
            <VoiceMessage
              reSendMessage={reSendMessage}
              loading={loading}
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
              voiceLeftIcon={this.props.voiceLeftIcon}
              voiceRightIcon={this.props.voiceRightIcon}
              voiceLoading={this.props.voiceLoading}
              voicePlaying={this.props.voicePlaying}
              savePressIndex={this.props.savePressIndex}
              pressIndex={this.props.pressIndex}
              voiceLeftLoadingColor={this.props.voiceLeftLoadingColor}
              voiceRightLoadingColor={this.props.voiceRightLoadingColor}
            />
          )
        } else {
          return this.props.renderVoiceMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'video' :
        if (this.props.renderVideoMessage === undefined) {
          return null
        } else {
          return this.props.renderVideoMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'location':
        if (this.props.renderLocationMessage === undefined) {
          return null
        } else {
          return this.props.renderLocationMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'share':
        if (this.props.renderShareMessage === undefined) {
          return null
        } else {
          return this.props.renderShareMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
    }
  }

  renderCheck = () => {
    if (this.props.renderMessageCheck === undefined) {
      if (this.state.isSelect) {
        return (
          <View style={styles.check}>
            {this.props.messageSelectIcon}
          </View>
        )
      } else {
        return <View style={styles.unCheck} />
      }
    } else {
      return this.props.renderMessageCheck(this.state.isSelect)
    }
  }

  render () {
    const { user = {}, message, isOpen, selectMultiple, avatarStyle = {}, rowId } = this.props
    const isSelf = user.id === message.targetId
    const Element = isOpen ? TouchableWithoutFeedback : View
    return (
      <View>
        <Element
          onPress={() => {
            this.setState({ isSelect: !this.state.isSelect })
            selectMultiple(!this.state.isSelect, parseInt(rowId), message)
          }}
        >
          <View>
            <TouchableOpacity activeOpacity={1}>
              {
                message.renderTime ? this.props.renderMessageTime(message.time) : null
              }
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.closeAll()}
              disabled={isOpen}
              activeOpacity={1}
              style={[styles.chat, isSelf ? styles.right : styles.left]} ref={(e) => (this.content = e)}
            >
              {
                !isSelf && isOpen &&
                  <View>
                    {this.renderCheck()}
                  </View>
              }
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={isOpen}
                onPress={() => this.props.onPressAvatar(isSelf)}
              >
                <Image
                  source={isSelf ? user.avatar : message.chatInfo.avatar}
                  style={[styles.avatar, avatarStyle]} />
              </TouchableOpacity>
              {this._renderContent(isSelf)}
              {
                isSelf && isOpen &&
                  <View
                    style={{ flex: 1 }}
                  >
                    {this.renderCheck()}
                  </View>
              }
            </TouchableOpacity>

            {
              this.props.renderErrorMessage(message.sendStatus)
            }
          </View>
        </Element>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  commentBar: {
    width: width,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  subEmojiStyle: {
    width: 25,
    height: 25
  },
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 20
    // backgroundColor: '#f9f9f9'
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.8
  },
  chat: {
    paddingHorizontal: 10,
    paddingVertical: 14
  },
  right: {
    flexDirection: 'row-reverse'
  },
  left: {
    flexDirection: 'row'
  },
  txtArea: {

  },
  voiceArea: {
    borderRadius: 12,
    maxWidth: width - 160,
    justifyContent: 'center',
    minHeight: 30
  },
  avatar: {
    marginHorizontal: 8,
    borderRadius: 24,
    width: 48,
    height: 48
  },
  triangle: {
    width: 0,
    height: 0,
    zIndex: 999,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 16
  },
  left_triangle: {
    borderLeftWidth: 0
  },
  right_triangle: {
    borderRightWidth: 0
  },
  check: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderRadius: 10,
    borderColor: '#9c9c9c',
    marginTop: 14
  }
})
