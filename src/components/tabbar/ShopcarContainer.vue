<template>
    <div class="shopCar-container">
        <!-- 商品列表 -->
        <div class="goods-container">
            <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="icon">
                            <mt-switch 
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
                            </mt-switch>
                        </div>

                        <!-- <img src="../../images/kyle.jpg" alt style="width:50px;height:50px"> -->
                        <img :src="item.thumb_path" style="width:50px;height:50px">

                        <div class="shopInf">
                            <div class="name">{{ item.title }}</div>

                            <div class="content">
                                <span class="new_price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- <span class="del" @click="remove(item.id,index)">删除{{ $store.getters.getGoodsCount[item.id] }}</span> -->
                                <span class="del" @click="remove(item.id,index)">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 結算 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>

                        <p>
                            已勾选商品
                            <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>
                            件， 总价
                            <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}元</span>
                        </p>
                    </div>

                    <mt-button type="danger" size="small">去结算</mt-button>
                    <!-- <span>{{ $store.getters.getGoodsSelected }}</span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_number.vue";

export default {
    components: {
        numbox
    },

    data() {
        return {
            goodslist: [
                {
                    cou: 1,
                    id: 30,
                    title:
                        "华为（HUAWEI）荣耀6 Plus 八核CPU 安卓手机 移动4G联通2G 白色 3+16G 本店上新不可错过哦！",
                    sell_price: 2159,
                    thumb_path:
                        "https://img14.360buyimg.com/n7/jfs/t13594/161/2542762482/304233/a3a66451/5a436599Nc3affe23.jpg",
                    selected: true
                },
                {
                    cou: 1,
                    id: 31,
                    title:
                        "Apple iPhone 6s Plus (A1699) 128G 玫瑰金色 移动联通电信4G",
                    sell_price: 4500,
                    thumb_path:
                        "https://img14.360buyimg.com/n7/jfs/t1750/64/1543556998/95929/2dd7e965/55f0e824Neac4417f.jpg",
                    selected: false

                },
                {
                    cou: 1,
                    id: 32,
                    title:
                        "小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待 ",
                    sell_price: 2159,
                    thumb_path:
                        "https://img13.360buyimg.com/n7/jfs/t19912/33/927199229/297549/8c269ff0/5b0fca0fN8d5600df.jpg",
                    selected: true
                }
            ]
        };
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {    // 获取产品列表数据
            // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if (idArr.length <= 0) {
                return;
            }
            // 获取购物车商品列表
            this.$http
                .get("api/goods/getshopcarlist/" + idArr.join(","))
                .then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    }
                });
        },
        remove(id,index){       // 点击删除事件
            this.goodslist.splice(index,1);             // 删除 goodslist 内的商品订单
            this.$store.commit("removeFormCar",id);     // 删除 vuex 内购物车中的商品订单
        },
        selectedChanged(id,value) {     // 产品选中状态
            // 点击切换 选中 同步到 vuex中
            // console.log(id +"-----"+ value)
            this.$store.commit("updateGoodsSelected",{id,selected:value})
        }
    }
};
</script>

<style lang="scss" scoped>
.shopCar-container {
    .mui-card-content-inner {
        display: flex;

        flex-direction: row;

        align-items: center;

        img {
            margin: 0 5px;
        }

        .shopInf {
            .name {
                font-weight: 700;
                margin-bottom: 10px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .content {
                display: flex;

                flex-direction: row;

                .new_price {
                    color: red;

                    margin-right: 5px;
                }

                .del {
                    color: cornflowerblue;

                    margin-left: 5px;
                }
            }
        }
    }
}
.jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
}
</style>