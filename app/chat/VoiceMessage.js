import React, { Component, PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image, StyleSheet,
  Text,
  ActivityIndicator, Dimensions
} from "react-native"
const { height, width } = Dimensions.get('window')

export default class VoiceMessage extends Component{


  render(){
    const { message, messageErrorIcon, isSelf, loading = false, isOpen, reSendMessage } = this.props
    return (
      <View style={[isSelf ? styles.right : styles.left]}>
        <View
          style={
            [
              styles.triangle,
              isSelf
                ? styles.right_triangle
                : styles.left_triangle,
              loading ? {borderColor: isSelf ? '#628b42' : '#ccc'} : {borderColor: isSelf ? '#a0e75a' : '#fff'}
            ]}
        />
        <View style={{flexDirection: isSelf ? 'row-reverse' : 'row'}} ref={(e) => this[`item_${this.props.rowId}`] = e}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isOpen}
            style={
              [styles.voiceArea,
                loading
                  ? {
                    backgroundColor: isSelf
                      ? '#628b42'
                      : '#ccc'
                  }
                  : {
                    backgroundColor: isSelf
                      ? '#a0e75a'
                      : '#fff'
                  }
              ]
            }
            onPress={() => this.props.onMessagePress('voice', parseInt(this.props.rowId), message.per.content.uri)}
            onLongPress={() => {
              this.props.onMessageLongPress(this[`item_${this.props.rowId}`], 'voice', parseInt(this.props.rowId), message.per.content.uri)
            }}
          >
            <View style={[{width: 40 + (message.per.content.length > 1 ? message.per.content.length * 2 : 0), alignItems: isSelf ? 'flex-end' : 'flex-start'}, isSelf ? {alignItems: 'flex-end', right: 5} : {alignItems: 'flex-start', left: 5}, {maxWidth: width - 160}]}>
              {isSelf ? this.props.voiceRightIcon : this.props.voiceLeftIcon}
            </View>
          </TouchableOpacity>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={[{color: '#aaa', marginBottom: 4}, isSelf ? {marginRight: 4} : {marginLeft: 4}]}>
              {`${message.per.content.length}"`}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 10}}>
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
    marginTop: 16,
  },
  left_triangle: {
    borderLeftWidth: 0
  },
  right_triangle: {
    borderRightWidth: 0,
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