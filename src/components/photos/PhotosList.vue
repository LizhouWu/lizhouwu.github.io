<template>
    <div>
        <!--<h3> PhotoList </h3>-->
        <!-- 顶部滚动条 -->
        <!--<div id="slider" class="mui-slider mui-fullscreen">-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--<a class="mui-control-item mui-active" v-for="(item,index) in cates">{{ item.title }}</a>-->
                    <a :class="['mui-control-item', item.id == 10 ? 'mui-active' : '']"
                       v-for="item in cates" :key="item.title"
                        @tap="getPhotoListByCateId(item.id)">{{ item.title }}
                    </a>
                    <!--@click="getPhotoListByCateId(item.id)">{{ item.title }}</a>-->
                </div>
            </div>

        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // mui.js放在此处会导致 tabbar 切换失败
    import mui from "../../lib/mui/js/mui.min.js";   // 顶部scrollbar

    export default {
        data(){
            return{
                cates:[
                    { title: "全部",id:10},
                    { title: "分类1",id:11},
                    { title: "分类2",id:12},
                    { title: "分类3",id:13},
                    { title: "分类4",id:14},
                    { title: "分类5",id:15},
                    { title: "分类6",id:16},
                    { title: "分类7",id:17},
                ],
                list:[
                    {
                        id: 50,
                        title: "一缕安静的阳光",
                        img_url:"https://images.gitee.com/uploads/23/2659423_lizhou_live.png?1545042676",
                        zhaiyao:"行走在岁月的小巷，听风，读雨，夜色空寂，一切烟云，皆会慢慢散去，光阴眷顾，你我默默相依，慢慢老去，红尘若可安好，便可不悲不喜，不离不弃，情真意切，绵绵无期"
                    },
                    {
                        id: 51,
                        title: "安静的阳光",
                        img_url:"https://images.gitee.com/uploads/23/2659423_lizhou_live.png?1545042676",
                        zhaiyao:"皆会慢慢散去，光阴眷顾，你我默默相依，慢慢老去，红尘若可安好，便可不悲不喜，不离不弃，情真意切，绵绵无期"
                    }
                ]
            }
        },
        created(){
            this.getAllCategory()
            this.getPhotoListByCateId(10)
        },
        methods:{
            // 获取全部的分类
            getAllCategory() {
                // 获取所有的图片分类
                this.$http.get("api/getimgcategory").then(result => {
                    if (result.body.status === 0) {
                        // 手动拼接出一个最完整的 分类列表
                        result.body.message.unshift({ title: "全部", id: 0 });
                        this.cates = result.body.message;
                    }
                });
            },
            getPhotoListByCateId(cateId) {
                // 根据 分类Id，获取图片列表
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    }
                });
            }
        },
        mounted() { // 组件DOM结构渲染后才会执行该函数
            // 初始化滑动
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style lang="scss" scoped>
    /**
        Unable to preventDefault inside passive event listener due to target being treated as passive. See <
     */
    * {
        touch-action: pan-y;
    }
    img[lazy="loaded"]{
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>