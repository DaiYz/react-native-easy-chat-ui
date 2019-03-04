import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image, StyleSheet,
  Text,
  ActivityIndicator, Dimensions
} from 'react-native'
const { width } = Dimensions.get('window')

export default class VoiceMessage extends PureComponent {
  constructor (props) {
    super(props)
    this.playTime = null
    this.state = {
      loading: false,
      progress: 2
    }
  }

  componentWillReceiveProps (next) {
    if (next.pressIndex === next.rowId) {
      this.setState({ loading: next.voiceLoading })
      if (next.voicePlaying) {
        this._play()
      } else {
        this.playTime && clearInterval(this.playTime)
        this.setState({ progress: 2 })
      }
    } else {
      this.setState({ loading: false, progress: 2 })
      this.playTime && clearInterval(this.playTime)
    }
  }

  _play () {
    this.playTime && clearInterval(this.playTime)
    let index = 0
    const { progress } = this.state
    if (progress === 2) index = 2
    this.playTime = setInterval(() => {
      if (index === 2) {
        index = -1
      }
      index += 1
      this.setState({ progress: index })
    }, 400)
  }

  _renderIcon = () => {
    const { isSelf, voiceLeftIcon, voiceRightIcon } = this.props
    const { progress } = this.state
    if (isSelf) {
      if (voiceRightIcon) {
        return voiceRightIcon
      } else {
        return <Image
          source={
            progress === 0
              ? require('../source/image/voiceRightOne.png')
              : progress === 1
                ? require('../source/image/voiceRightTwo.png')
                : require('../source/image/voiceRight.png')
          }
          resizeMode={'cover'}
          style={{
            width: 26, height: 26
          }} />
      }
    } else {
      if (voiceLeftIcon) {
        return voiceLeftIcon
      } else {
        return <Image source={progress === 0 ? require('../source/image/voiceLeftOne.png') : progress === 1 ? require('../source/image/voiceLeftTwo.png') : require('../source/image/voiceLeft.png')} resizeMode={'cover'} style={{
          width: 26, height: 26
        }} />
      }
    }
  }

  componentWillUnmount () {
    this.playTime && clearInterval(this.playTime)
  }

  render () {
    const { message, messageErrorIcon, isSelf, isOpen, reSendMessage, leftMessageBackground, rightMessageBackground, voiceRightLoadingColor, voiceLeftLoadingColor } = this.props
    const { loading } = this.state
    return (
      <View style={[isSelf ? styles.right : styles.left]}>
        <View
          style={
            [
              styles.triangle,
              isSelf
                ? styles.right_triangle
                : styles.left_triangle,
              loading ? { borderColor: isSelf ? voiceRightLoadingColor : voiceLeftLoadingColor } : { borderColor: isSelf ? rightMessageBackground : leftMessageBackground }
            ]}
        />
        <View
          style={{ flexDirection: isSelf ? 'row-reverse' : 'row' }}
          collapsable={false}
          ref={(e) => (this[`item_${this.props.rowId}`] = e)}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isOpen}
            style={
              [styles.voiceArea,
                loading
                  ? {
                    backgroundColor: isSelf
                      ? voiceRightLoadingColor
                      : voiceLeftLoadingColor
                  }
                  : {
                    backgroundColor: isSelf
                      ? rightMessageBackground
                      : leftMessageBackground
                  }
              ]
            }
            onPress={() => {
              this.props.savePressIndex(this.props.rowId)
              this.props.onMessagePress('voice', parseInt(this.props.rowId), message.per.content.uri, message)
            }
            }
            onLongPress={() => {
              this.props.onMessageLongPress(this[`item_${this.props.rowId}`], 'voice', parseInt(this.props.rowId), message.per.content.uri, message)
            }}
          >
            <View style={[{ width: 40 + (message.per.content.length > 1 ? message.per.content.length * 2 : 0) }, { maxWidth: width - 160 }, { flexDirection: isSelf ? 'row-reverse' : 'row' }
            ]}>
              {this._renderIcon()}
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={[{ color: '#aaa', marginBottom: 4 }, isSelf ? { marginRight: 4 } : { marginLeft: 4 }]}>
              {`${message.per.content.length}"`}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          {!isSelf
            ? null
            : message.sendStatus === undefined
              ? null
              : message.sendStatus === 0
                ? <ActivityIndicator />
                : message.sendStatus < 0
                  ? <TouchableOpacity
                    disabled={false}
                    activeOpacity={0.7}
                    onPress={() => {
                      if (message.sendStatus === -2) {
                        reSendMessage(message)
                      }
                    }}>
                    {messageErrorIcon}
                  </TouchableOpacity>
                  : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  right: {
    flexDirection: 'row-reverse'
  },
  left: {
    flexDirection: 'row'
  },
  voiceArea: {
    borderRadius: 12,
    maxWidth: width - 160,
    justifyContent: 'center',
    minHeight: 30
  }
})
