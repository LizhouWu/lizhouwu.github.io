import VueRouter from 'vue-router'

// 导入对应的路由组件

// 主体 tabtab 切换组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
    // HomeContainer 内部组件
    import NewsList from "./components/news/NewsList.vue"
        import NewInfo from "./components/news/NewInfo.vue"
    import PhotosList from "./components/photos/PhotosList.vue"
        import PhotoInf from "./components/photos/PhotoInf.vue"
    import GoodsList from "./components/goods/GoodsList.vue"
        import GoodsInf from "./components/goods/GoodsInf.vue"
            import GoodsDesc from "./components/goods/GoodsDesc.vue"
            import GoodsComment from "./components/goods/GoodsComment.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopCarContainer from "./components/tabbar/ShopcarContainer.vue"





// 3. 创建路由对象
var router = new VueRouter({
    routes: [ // 配置路由规则
        { path: '/', redirect: '/home' },
        { path: "/home",component: HomeContainer },
            { path: "/home/newslist",component: NewsList },
                { path: "/home/newsinfo/:id",component: NewInfo },
            { path: "/home/photolist",component: PhotosList },
                { path: "/home/photoinfo/:id",component: PhotoInf },
        { path: "/home/goodlist",component: GoodsList },
            { path: "/home/goodsinfo/:id",component: GoodsInf,name: 'goodsinfo' },
                { path: "/home/goodsdesc/:id",component: GoodsDesc, name: 'goodsdesc' },
                { path: "/home/goodscomment/:id",component: GoodsComment, name: 'goodscomment' },
        { path: "/member",  component: MemberContainer },
        { path: "/search",  component: SearchContainer },
        { path: "/shopcar", component: ShopCarContainer },
    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router