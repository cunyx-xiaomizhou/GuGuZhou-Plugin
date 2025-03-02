import axios from 'axios'

export async function isAbroad () {
  const urls = [
    'https://blog.cloudflare.com/cdn-cgi/trace',
    'https://developers.cloudflare.com/cdn-cgi/trace'
  ]

  try {
    const response = await Promise.any(urls.map(url =>
      axios.get(url).then(res => {
        if (!res.ok) {
          logger.error(`HTTP 错误: ${res.status}`)
          return false
        }
        return res.text()
      })
    ))

    const traceMap = Object.fromEntries(
      response.split('\n').filter(line => line).map(line => line.split('='))
    )
    return traceMap.loc !== 'CN'
  } catch (error) {
    logger.warn(`获取 IP 所在地区出错: ${error.message}`)
    return false
  }
}


/**
 *
 * @param {string} user - 用户的id
 * @returns 用户的头像地址
 */
export async function getAvatarUrl (e, user) {
  if (!user) {
    throw new Error('user 号不能为空')
  }

  try {
    if (e.isGroup) {
      const group = Bot.pickGroup(e.group_id)
      const member = await group.pickMember(user)
      return await member.getAvatarUrl()
    } else if (e.isPrivate) {
      const friend = Bot.pickFriend(user)
      return await friend.getAvatarUrl()
    }
  } catch (err) {
  }

  /** 最后的兜底 */
  return `https://q1.qlogo.cn/g?b=qq&s=640&nk=${user}`
}


/**
   * 获取用户昵称
   * @param {object} e - 消息事件对象
   * @param {string} user - 用户的id
   * @returns {Promise<string>} - 返回用户昵称，群事件优先获取群昵称，然后才是用户昵称，若获取失败则返回 "未知"
   */
export async function getNickname (e, user) {
  if (!user || !e) return '未知'

  try {
    if (e.isGroup) {
      const group = Bot[e.self_id].pickGroup(e.group_id)
      const member = group.pickMember(user)
      const memberInfo = await member.getInfo()
      return memberInfo.card || memberInfo.nickname
    } else if (e.isPrivate) {
      const friend = Bot[e.self_id].pickFriend(user)
      const friendInfo = await friend.getInfo()
      return friendInfo.nickname
    }
  } catch {
    return '未知'
  }
}




