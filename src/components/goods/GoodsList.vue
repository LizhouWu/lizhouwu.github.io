<template>
    <div>
        <!--<h3>goodslist 组件</h3>-->
        <div class="goodsList-container">
            <router-link :to=" '/home/goodsinfo/' + item.id"  class="goods-item" v-for="(item,index) in goodslist" :key="item.id">
                <div class="item-img">
                    <a href="#">
                        <img :src="item.img_url" alt="">
                    </a>
                </div>
                <div class="goods-content">
                    <div class="goods-title">{{ item.title }}</div>
                    <div class="goods-pri">
                        <span class="current-pri">￥ {{ item.current_pri }}</span>
                        <span class="old-pri">￥ {{ item.old_pri }}</span>
                    </div>
                    <div class="goods-inf">
                        <span class="goods-hot">{{ item.status }}</span>
                        <span class="remain">剩 {{ item.remain }} 件</span>
                    </div>
                </div>
            </router-link>

            <!-- 第二种通过js location.href -->
            <!--<div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{ item.title }}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </div>-->

            <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                goodslist:[
                    {
                        id: 30,
                        title:"华为（HUAWEI）荣耀6 Plus 八核CPU 安卓手机 移动4G联通2G 白色 3+16G 本店上新不可错过哦！",
                        zhaiyao:"4.7寸",
                        click: 5,
                        img_url:"https://img14.360buyimg.com/n7/jfs/t13594/161/2542762482/304233/a3a66451/5a436599Nc3affe23.jpg",
                        current_pri: 2500,
                        old_pri: 2700,
                        status: "热卖中",
                        remain: 58
                    },
                    {
                        id: 31,
                        title:"Apple iPhone 6s Plus (A1699) 128G 玫瑰金色 移动联通电信4G",
                        zhaiyao:" 4.7寸",
                        click: 5,
                        img_url:"https://img14.360buyimg.com/n7/jfs/t1750/64/1543556998/95929/2dd7e965/55f0e824Neac4417f.jpg",
                        current_pri: 2600,
                        old_pri: 2800,
                        status: "热卖中",
                        remain: 59
                    },
                    {
                        id: 32,
                        title:"小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待",
                        zhaiyao:" 4.7寸",
                        click: 5,
                        img_url:"https://img13.360buyimg.com/n7/jfs/t19912/33/927199229/297549/8c269ff0/5b0fca0fN8d5600df.jpg",
                        current_pri: 2700,
                        old_pri: 2900,
                        status: "热卖中",
                        remain: 60
                    },
                   
                ],
                pageindex:1,
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                // 获取商品列表
                this.$http
                    .get("api/getgoods?pageindex=" + this.pageindex)
                    .then(result => {
                        if (result.body.status === 0) {
                            // this.goodslist = result.body.message;
                            this.goodslist = this.goodslist.concat(result.body.message);
                        }
                    });
            },
            getMore() {
                this.pageindex++;
                this.getGoodsList();
            },
            goDetail(id) {
                // 使用JS的形式进行路由导航

                // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
                // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
                // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

                console.log(this);
                // 1. 最简单的
                // this.$router.push("/home/goodsinfo/" + id);
                // 2. 传递对象
                // this.$router.push({ path: "/home/goodsinfo/" + id });
                // 3. 传递命名的路由
                this.$router.push({ name: "goodsinfo", params: { id } });
            }
        }
    }
</script>

<style lang="less" scoped>
    .goodsList-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:6px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin-bottom: 6px;
            .item-img{
                a{
                    display: inline-block;
                    img{
                        width: 80%;
                        display: flex;
                        margin: 8px auto;
                    }
                }
            }
            .goods-content{
                padding: 0 5px;
                .goods-title{
                    font-weight: bold;
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    height: 2.5em;
                }
                .goods-pri{
                    /*font-size: 0;*/
                    margin: 3px 0;
                    .current-pri{
                        font-size: 14px;
                        color: red;
                        padding-right: 10px;
                        font-weight: 700;
                    }
                    .old-pri{
                        font-size: 14px;
                        color: #646464;
                        text-decoration: line-through;
                    }
                }
                .goods-inf{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-bottom: 6px;
                    .goods-hot{}
                    .remain{}
                }
            }
        }
    }
</style>