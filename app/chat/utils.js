import moment from 'moment'
import {Dimensions, Platform} from 'react-native'
import { EMOJIS_ZH, invertKeyValues } from '../source/emojis'
const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024
const IPADPRO11_WIDTH = 834
const IPADPRO11_HEIGHT = 1194
const IPADPRO129_HEIGHT = 1024
const IPADPRO129_WIDTH = 1366

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')

const getCurrentTime = (time = 0) => {
  const nowTime = new Date() // 当前日前对象
  const myyear = nowTime.getFullYear() // 当前年份
  const myday = nowTime.getDay() // 当前星期
  const delay = moment().diff(moment(time).toArray().slice(0, 3), 'days') // 时间差
  const old = new Date(parseInt(time)) // 目标日期对象
  const oldyear = old.getFullYear() // 目标年份
  const oldm = old.getMonth() + 1 // 目标月份
  const oldd = old.getDate() // 目标日期
  const oldday = old.getDay() // 目标星期
  const oldh = old.getHours() // 目标时
  const oldmin = old.getMinutes() < 10 ? `0${old.getMinutes()}` : old.getMinutes() // 目标分
  // 时间在一天之内只返回时分
  if (delay == 0) {
    return `${oldh}:${oldmin}`
  }
  // 时间在两天之内的
  if (delay == 1) {
    return `昨天 ${oldh}:${oldmin}`
  }

  // 当前星期内
  if (delay > 1 && myday > oldday && delay < 7) {
    let xingqi
    switch (oldday) {
      case 0:
        xingqi = `星期日`
        break
      case 1:
        xingqi = `星期一`
        break
      case 2:
        xingqi = `星期二`
        break
      case 3:
        xingqi = `星期三`
        break
      case 4:
        xingqi = `星期四`
        break
      case 5:
        xingqi = `星期五`
        break
      case 6:
        xingqi = `星期六`
        break
    }
    return `${xingqi} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday === oldday && oldyear === myyear) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday === oldday && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday < oldday && oldyear === myyear) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday > oldday && oldyear === myyear && delay > 7) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday > oldday && delay >= 7 && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`
  }

  if (delay > 1 && myday < oldday && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`
  }
}

const _matchContentString = (textContent, data, reg, type) => {
  if (textContent.length === 0) return

  // 匹配得到index并放入数组中
  let currentTextLength = textContent.length

  let emojiIndex = textContent.search(reg)

  let checkIndexArray = []

  // 若匹配不到，则直接返回一个全文本
  if (emojiIndex === -1) {
    data.push(textContent.substring(0, currentTextLength))
  } else {
    if (emojiIndex !== -1) {
      checkIndexArray.push(emojiIndex)
    }

    // 取index最小者
    let minIndex = Math.min(...checkIndexArray)

    // 将0-index部分返回文本
    data.push(textContent.substring(0, minIndex))

    // 将index部分作分别处理
    _matchEmojiString(textContent.substring(minIndex), data, reg, type)
  }
}

const _matchEmojiString = (emojiStr, data, reg, type) => {
  let castStr = emojiStr.match(reg)
  let emojiLength = castStr[0].length
  let emotoinsCode = EMOJIS_ZH
  if (type === 'zh') {
    emotoinsCode = invertKeyValues(EMOJIS_ZH)
  }
  if(emotoinsCode[castStr[0]]){
    data.push(emotoinsCode[castStr[0]])
  }else {
    return data.push(emojiStr)
  }
  _matchContentString(emojiStr.substring(emojiLength), data, reg, type)
}

const changeEmojiText = (textContent, type = 'zh') => {
  let data = []
  let emojiReg = null
  if (type === 'zh') {
    emojiReg = new RegExp('\\[[^\\]]+\\]', 'g')
  } else {
    emojiReg = new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}', 'g')
  }
  _matchContentString(textContent, data, emojiReg, type)
  return data
}

const isIPhoneX = () => {
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
}
export {
  getCurrentTime,
  changeEmojiText,
  isIPhoneX
}
