import {RECORD_ADDRESS, ADD_CART, RECORD_CART, SAVE_GEOHASH} from "./mutation-types"
//import {setStore, getStore} from "../config/mUtil"

const mutations = {
    // 记录当前的经纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude
        state.longitude = longitude
    },
    // 保存经纬度geohash
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash
    }

}

export default mutations