import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet, Dimensions
} from 'react-native'
import { changeEmojiText } from './utils'
const { width } = Dimensions.get('window')

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  emoji: new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}')
}
export default class TextMessage extends PureComponent {
  render () {
    const { isSelf, message, messageErrorIcon, views, isOpen, rightMessageBackground, leftMessageBackground, reSendMessage } = this.props
    return (
      <View
        style={[isSelf ? styles.right : styles.left]}
        collapsable={false}
        ref={(e) => (this[`item_${this.props.rowId}`] = e)}
      >
        <View
          style={
            [
              styles.triangle,
              isSelf
                ? styles.right_triangle
                : styles.left_triangle,
              { borderColor: isSelf ? rightMessageBackground : leftMessageBackground }
            ]}
        />
        <TouchableOpacity
          activeOpacity={1}
          disabled={isOpen}
          onLongPress={() => {
            this.props.onMessageLongPress(this[`item_${this.props.rowId}`], 'text', parseInt(this.props.rowId), changeEmojiText(this.props.message.per.content, 'en').join(''), message)
          }}
          onPress={() => {
            this.props.onMessagePress('text', parseInt(this.props.rowId), changeEmojiText(this.props.message.per.content, 'en').join(''), message)
          }}
        >
          <View style={[styles.container, { backgroundColor: isSelf ? rightMessageBackground
            : leftMessageBackground }]}>
            {views}
          </View>
        </TouchableOpacity>
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

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    maxWidth: width - 160,
    minHeight: 20,
    marginLeft: -1
  },

  subEmojiStyle: {
    width: 25,
    height: 25
  },
  triangle: {
    width: 0,
    height: 0,
    zIndex: 999,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 16,
    borderColor: '#fff'
  },
  left_triangle: {
    borderLeftWidth: 0
  },
  right_triangle: {
    borderRightWidth: 0,
    borderColor: '#a0e75a'
  },
  right: {
    flexDirection: 'row-reverse'
  },
  left: {
    flexDirection: 'row'
  }
})
