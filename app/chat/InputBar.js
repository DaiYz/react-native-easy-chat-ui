import React, { Component } from 'react'
import {
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Text, Dimensions
} from 'react-native'

const { height, width } = Dimensions.get('window')

export default class InputBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.createPanResponder()
  }

  createPanResponder () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: (e, gestureState) => this.onPanResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState) => this.onPanResponderMove(e, gestureState),
      onPanResponderTerminationRequest: (e, gestureState) => false,
      onPanResponderRelease: (e, gestureState) => this.onPanResponderRelease(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true
    })
  }

  onPanResponderGrant (e, gestureState) {
    const {showVoice, voiceStart} = this.props
    if (showVoice) {
      voiceStart()
    }
  }
  onPanResponderMove (e, gestureState) {
    const {showVoice, voiceStatus, changeVoiceStatus} = this.props
    if (showVoice) {
      if (Math.abs(e.nativeEvent.locationY) > 60) {
        if (!voiceStatus) return undefined
        changeVoiceStatus(false)
      } else {
        if (voiceStatus) return undefined
        changeVoiceStatus(true)
      }
    }
  }
  onPanResponderRelease (e, gestureState) {
    const {showVoice, voiceEnd} = this.props
    if (showVoice) {
      voiceEnd()
    }
  }



  render () {
    const {
      messageContent,
      onSubmitEditing = () => {},
      textChange = () => {}, onMethodChange = () => {}, onContentSizeChange = () => {},
      showVoice,
      xHeight,
      isVoiceEnd,
      useVoice,
      inputChangeSize, placeholder, pressInText, pressOutText, isShowPanel, isPanelShow, paddingHeight, onFocus, isEmojiShow, isIphoneX
    } = this.props
    const enabled = (() => {
      if (Platform.OS === 'android') {
        if (isPanelShow) {
          return true
        }
        if (isEmojiShow) {
          return true
        }
        return false
      } else {
        return false
      }
    })()
    return (
      <Animated.View style={[
        styles.commentBar,
        Platform.OS === 'ios'
          ? {paddingBottom: isIphoneX ? xHeight : 0}
          : {
            paddingBottom: paddingHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 240]
            })
          }
      ]}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 10}}>
          {
            useVoice ? <View style={{ height: 34, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>
              <TouchableOpacity onPress={onMethodChange} activeOpacity={0.7}>
                {showVoice ? this.props.keyboardIcon : this.props.voiceIcon}
              </TouchableOpacity>
            </View> : null
          }
          <View style={{marginHorizontal: 8, borderRadius: 18, borderColor: '#ccc', width: (width - 30 - 64 - 16 - (useVoice ? 30 : 0)), borderWidth: StyleSheet.hairlineWidth}}
          >
            {showVoice
              ? <View
                style={{borderRadius: 18, backgroundColor: isVoiceEnd ? '#bbb' : '#f5f5f5'}}
                {...this.panResponder.panHandlers}
              >
                <View style={[{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 35, borderRadius: 18}]}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#555'}}>{isVoiceEnd ? `${pressOutText}` : `${pressInText}`}</Text>
                </View>
              </View>
              : <TouchableOpacity
                disabled={!enabled}
                activeOpacity={1}
                onPress={() => {
                  onFocus()
                }}
              >
                <TextInput
                  ref={e => this.input = e}
                  multiline
                  blurOnSubmit={false}
                  editable={!enabled}
                  placeholder={placeholder}
                  placeholderTextColor={'#5f5d70'}
                  onContentSizeChange={onContentSizeChange}
                  underlineColorAndroid='transparent'
                  onChangeText={textChange}
                  value={messageContent}
                  style={[ styles.commentBar__input, {height: Math.max(35, inputChangeSize), paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 8 : 0} ]}
                />
              </TouchableOpacity>
            }
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.showEmoji()}
            >
              {this.props.isEmojiShow ? this.props.keyboardIcon : this.props.emojiIcon}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {
                  if (messageContent.trim().length > 0) {
                    onSubmitEditing('text', messageContent)
                  } else {
                    isShowPanel(!isPanelShow)
                  }
                }
              }
              activeOpacity={0.7} >
             {messageContent.trim().length ? this.props.sendIcon : this.props.plusIcon}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
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
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    maxWidth: width - 160,
    flexWrap: 'wrap',
    minHeight: 20,
    marginLeft: -1
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
    borderWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 12
  },
  left_triangle: {
    borderLeftWidth: 0
  },
  right_triangle: {
    borderRightWidth: 0
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#45e2be',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 2
  }
})
