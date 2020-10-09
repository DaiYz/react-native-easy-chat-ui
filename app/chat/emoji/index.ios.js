import React, { PureComponent } from 'react'
import { View, ScrollView, StyleSheet, Platform, Dimensions, Animated, TouchableOpacity } from 'react-native'
import ViewPagerAndroidContainer from '../components/android-container'
import ViewPagerAndroid from '@react-native-community/viewpager'
import Control from './control'
import { EMOJIS_DATA, DEFAULT_EMOJI } from '../../source/emojis'
const { width, height } = Dimensions.get('window')

export default class EmojiPanel extends PureComponent {
  constructor (props) {
    super(props)
    const { allPanelHeight, isIphoneX, iphoneXBottomPadding } = props
    this.totalHeight = allPanelHeight + (isIphoneX ? iphoneXBottomPadding : 0)
    this.state = {
      pageIndex: 0
    }
    this.total = 0
  }

  switchComponent (e) {
    if (Platform.OS === 'ios') {
      const { x } = e.nativeEvent.contentOffset
      const cardIndex = Math.round(x / width)
      if (x >= width / 2 && x < width / 2 + 10) this.scroll.scrollTo({ x: width * cardIndex, y: 0, animated: true })
      this.setState({ pageIndex: cardIndex })
    } else {
      const { position, offset } = e.nativeEvent
      if (offset === 0) {
        this.setState({ pageIndex: position })
      }
    }
  }

  render () {
    const { panelContainerHeight, ImageComponent } = this.props
    const ContainerComponent = Platform.select({ ios: ScrollView, android: ViewPagerAndroid })
    this.total = 0
    return (
      <Animated.View style={[styles.container, {
        position: 'absolute',
        height: panelContainerHeight,
        backgroundColor: '#f5f5f5',
        bottom: this.props.emojiHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [-panelContainerHeight, 0]
        }),
        opacity: this.props.emojiHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
      }]}
      >
        <ViewPagerAndroidContainer style={{ height: panelContainerHeight, width }}>
          {/* 视图容器 */}
          <ContainerComponent
            ref={e => { this.scroll = e }}
            onScroll={(e) => this.switchComponent(e)}
            onPageScroll={(e) => this.switchComponent(e)}
            horizontal
            style={{ flex: 1 }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
          >
            {
              DEFAULT_EMOJI.map((item, index) => {
                this.total += 1
                return <View key={index} style={{ width, flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, marginTop: 18 }}>
                  {
                    item.map((list, i) =>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={i}
                        style={{ width: (width - 40) / 8, height: 45, justifyContent: 'center', alignItems: 'center', paddingTop: 15, paddingHorizontal: 20 }}
                        onPress={() => {
                          this.props.onPress(list.value)
                        }}
                      >
                        <ImageComponent
                          source={list.value === '/{del}' ? require('../../source/emojis/ic_emoji_del.png') : EMOJIS_DATA[list.value]}
                          resizeMode='contain' style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    )
                  }
                </View>
              }
              )
            }
          </ContainerComponent>
          <View style={{ height: 40 }}>
            <Control index={this.state.pageIndex} total={this.total} />
          </View>
          {/* <View style={{height: 40, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center'}}> */}
          {/* <View style={{width: 40, height: 40, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', padding: 5}}> */}
          {/* /!*<Image source={defaultEmoji.default} style={{flex: 1}} resizeMode={'contain'} />*!/ */}
          {/* </View> */}
          {/* </View> */}
        </ViewPagerAndroidContainer>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    overflow: 'hidden'
  }
})
