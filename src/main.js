// 入口文件
import Vue from "vue"

// 导入路由的包
import VueRouter from "vue-router"
Vue.use(VueRouter);

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 注册 使用 vuex
import Vuex from "vuex" // cnpm i vuex -S
Vue.use(Vuex)

// 先获取 本地存储中的数据，如果没有则为空数组
var car = JSON.parse(localStorage.getItem("car") || "[]");

var store = new Vuex.Store({ // 生成 仓库存储对象
    state: { // 类似 data
        // 获取 state 内数据    this.$store.state.数据名
        car: car, // 购物车中的商品数据

    },
    mutations: { // 类似 motheds
        // 获取 mutations 内数据    this.$store.commit(方法名称,传递唯一的参数)
        addToCar(state, goodsinfo) { // 将 addToShopCar 的商品信息 保存至仓库中
            var flag = false // 设置开关
            // 判断购物内是否有 该商品
            // 有，更新数量
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true
                    return true
                }
            })

            // 没有,添加到购物车
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 将购物车内的数据 保存到 localstore 中 ,F12 application可查看
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        // 购物车
        updataGoodInf(state, goodsinfo) { // 点击购物车页面 - + 修改商品的数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                  item.count = parseInt(goodsinfo.count)
                  return true
                }
              })

            // 将购物车内的数据 保存到 localstore 中 ,F12 application可查看
            // localStorage.setItem("car", JSON.stringify(state.car))

        },
        removeFormCar(state,id) { // 删除订单
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info) {
            state.car.some( item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                  }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // 之负责提供数据
        // 获取 getters 内数据    this.$store.getters
        getAllCount(state) { // 购物车小标
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },

        getGoodsCount(state) {      // 产品数量
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {   // 产品是否被选中
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,   // 数量总计
                amount: 0   // 价格总计
            }
            state.car.forEach(item => {
                if(item.selected) {
                    o.count  += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
            
        }
    }

})

// 设置api全局配置
Vue.http.options.root = "http://vue.studyit.io"
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 时间格式化插件
import moment from "moment"
// 全局过滤器 cnpm i moment -S
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 导入路由 router.js
import router from "./router.js"

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 导入mint-ui
/*import { Header, Swipe ,SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)      // fixed 固定顶部
Vue.component(Swipe.name, Swipe)        // swiper
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);*/

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装 图片预览插件    npm i vue-preview -S
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)

// 导入 App 组件
import app from "./App.vue"

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,
    store

})