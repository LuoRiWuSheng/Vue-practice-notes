import Cookies from 'js-cookie'

// 注意，token有一个坑，我们操作的token都是基于根目录去种的，不能根据你自己当前在哪个目录下去种
// 因为根据当前的目录去种token会存在很多限制问题，最下层的路由中的cookie，不能被父级路由获取到

// 自定义token的键名
const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
