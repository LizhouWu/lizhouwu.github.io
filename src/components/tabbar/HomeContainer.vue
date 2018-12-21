<template>
    <div class="home-container">
        <!-- 轮播图区域 -->
        <!--<mt-swipe :auto="4000" :lunbotuList="lunbotuList">-->
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe> -->
        <swiper :lunbotuList="lunbotuList"></swiper>

        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <!--<span class="mui-icon mui-icon-home"></span>-->
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <!--<span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>-->
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodlist">
                <!--<span class="mui-icon mui-icon-chatbubble"></span>-->
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="../">
                <!--<span class="mui-icon mui-icon-location"></span>-->
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="../">
                <!--<span class="mui-icon mui-icon-search"></span>-->
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="../">
                <!--<span class="mui-icon mui-icon-phone"></span>-->
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    import swiper from "../subcomponents/swiper.vue"

    export default{
        components:{
            "swiper":swiper,
        },
        data(){
            return{
                lunbotuList:[
                    {
                        src: "https://img10.360buyimg.com/cms/jfs/t29182/218/573245212/452452/125d02b2/5bf77976N10f59664.jpg!q90"
                    },
                    {   
                        src: "https://img10.360buyimg.com/cms/jfs/t26032/246/2665261562/609073/9764468f/5bec064dNd6bd163c.jpg!q90"
                    },
                    {   
                        src: "https://img10.360buyimg.com/cms/jfs/t27196/251/966130491/876134/ae780dae/5bbde082N7a45b91d.jpg!q90"
                    },
                ]
            }
        },
        created(){
            // this.getLunbotu()
            
        },
        methods:{
            getLunbotu() {
                // 获取轮播图数据的方法
                this.$http.get("/api/getlunbo").then( result => {
                    // console.log(result.body);
                    if (result.body.status === 0) {
                        // 成功了
                        this.lunbotuList = result.body.message;
                    } else {
                        // 失败的
                        Toast("加载轮播图失败。。。");
                    }
                });
            }
        },
        mounted(){
           
        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            background-color: #ccc;

        }
    }

    ul.mui-table-view.mui-grid-view.mui-grid-9 {
        background: #fff;
        border: none;
        img{
            width: 60px;
            height: 60px;
            display: inline-block;
        }
    }

</style>