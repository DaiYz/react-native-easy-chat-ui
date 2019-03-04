import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image, StyleSheet, ActivityIndicator
} from 'react-native'
export default class ImageMessage extends PureComponent {
  render () {
    const { message, messageErrorIcon, isSelf, isOpen, reSendMessage } = this.props
    return (
      <View style={[isSelf ? styles.right : styles.left]}>
        <TouchableOpacity
          ref={e => (this[`item_${this.props.rowId}`] = e)}
          activeOpacity={1}
          collapsable={false}
          disabled={isOpen}
          onPress={() => this.props.onMessagePress('image', parseInt(this.props.rowId), message.per.content.uri, message)}
          style={{ backgroundColor: 'transparent', padding: 5, borderRadius: 5 }}
          onLongPress={() => {
            this.props.onMessageLongPress(this[`item_${this.props.rowId}`], 'image', parseInt(this.props.rowId), message.per.content.uri, message)
          }} >
          <View style={{ maxHeight: 300, overflow: 'hidden', borderRadius: 5 }}>
            <Image source={{ uri: message.per.content.uri }} style={[{ width: 100, height: message.per.content.height / (message.per.content.width / 100), borderRadius: 5 }]} />
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
  right: {
    flexDirection: 'row-reverse'
  },
  left: {
    flexDirection: 'row'
  }
})
