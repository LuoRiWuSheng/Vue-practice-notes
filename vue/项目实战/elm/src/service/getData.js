import fetch from "../config/fetch"
//import {getStore} from "../config/mUtil"

/**
 * 获取首页的默认地址
 */
export const cityGuss = ()=> fetch("/v1/cities", {
    type: "guess"
})

/**
 * 获取首页热门城市
 */
export const hotCities = () => fetch("/v1/cities", {
    type: "hot"
})

/**
 * 获取首页所有城市
 */
export const groupCity = ()=> fetch("/v1/cities", {
    type: "group"
})

/**
 * 获取当前所在城市
 */
export const currentCity = number => fetch("/v1/cities/"+number)

/**
 * 获取搜索地址
 */
export const searchPlace = (cityid, value)=> fetch("/v1/pois", {
    type: "search",
    city_id: cityid,
    keyword: value
})
