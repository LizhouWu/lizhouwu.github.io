<template>
    <div class="goodsInf-container">
        <!-- 小球动画 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ballFlag" class="ball" ref="ball"></div>
        </transition>

        <!-- 产品轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :id="id" :lunbotuList="lunbotu"></swiper>
                </div>
            </div>
        </div>

        <!-- 产品信息 -->
        <div class="mui-card">
            <div class="mui-card-header">
                <h3 class="title">{{ goodsInf.title }}</h3>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        市场价：
                        <span class="old-price">￥{{ goodsInf.old_price }}</span>
                        销售价：
                        <span class="new-price">￥{{ goodsInf.new_price }}</span>
                    </div>
                    <div class="num">
                        <!-- 
                            getSelectedCount为父组件内的方法  
                            getcount 为子组件的方法

                            父向子传值  

                            子向父传值  - 通过事件传递 this.emit("getcount",值)
                        -->
                        购买数量：
                        <goodsinfoNumber
                            @getcount="getSelectedCount"
                            :max="goodsInf.shop_inventory"
                        ></goodsinfoNumber>
                    </div>
                    <div>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <!-- 
                            加入购物车
                            点击 加入购物车 ，获取 子组件 goodsinfoNumber 内的 number
                            将获取到的子组件红num 传递给 父组件 购物车
                        -->
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 产品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">
                <h3 class="title">商品参数</h3>
            </div>

            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="item">商品货号：{{ goodsInf.item_num }}</div>
                    <div class="item">库存情况：{{ goodsInf.shop_inventory }}件</div>
                    <div class="item">上架时间：{{ goodsInf.up_time | dateFormat}}</div>
                </div>
            </div>

            <div class="mui-card-footer">
                <mt-button
                    type="primary"
                    class="mt-item"
                    size="large"
                    @click="goDesc(id)"
                    plain
                >图文介绍</mt-button>
                <mt-button
                    type="danger"
                    class="mt-item"
                    size="large"
                    @click="goComment(id)"
                    plain
                >商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue"; // 引用公共组件 swiper
import goodsinfoNumber from "../subcomponents/goodsinfo_number.vue"; // 引用公共组件 number

export default {
    components: {
        swiper: swiper,
        goodsinfoNumber: goodsinfoNumber
    },
    data() {
        return {
            id: this.$route.params.id,
            ballFlag: false, // 设置小球的显示和隐藏,，默认隐藏
            lunbotu: [
                // 轮播图数组
                {
                    src: "https://img10.360buyimg.com/cms/jfs/t29182/218/573245212/452452/125d02b2/5bf77976N10f59664.jpg!q90"
                },
                {   
                    src: "https://img10.360buyimg.com/cms/jfs/t26032/246/2665261562/609073/9764468f/5bec064dNd6bd163c.jpg!q90"
                },
                {   
                    src: "https://img10.360buyimg.com/cms/jfs/t27196/251/966130491/876134/ae780dae/5bbde082N7a45b91d.jpg!q90"
                },
            ],
            goodsInf: {
                // 商品信息
                title: "iphone5s",
                old_price: 3000,
                new_price: 1500,
                item_num: "123",
                shop_inventory: 60,
                up_time: "2018-12-18T04:05:34.000Z",
                selected: false
            },
            selectedCount: 1 // 子组件默认数值为 1
        };
    },
    created() {},
    methods: {
        getGoodsInfo() {    // 获取商品的信息
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if (result.body.status === 0) {
                    this.goodsinfo = result.body.message[0];
                }
            });
        },
        goDesc(id) {
            this.$router.push({ name: "goodsdesc", params: { id } });
        },
        goComment(id) {
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag;

            // 点击加入 购物车 获取商品对象
            var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsInf.new_price,
                selected: true
            };
            // 将数据添加到 仓库中
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit("addToCar", goodsinfo);
        },
        // 小球半场动画 start
        beforeEnter(el) {
            //
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth; // 设置任意 offset 属性 (否则小球不会出现动画)

            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        // 小球半场动画 end
        getSelectedCount(count) {
            // 获取 子组件num 的数量
            this.selectedCount = count;
            console.log(this.selectedCount);
        }
    }
};
</script>

<style lang="less" scoped>
.goodsInf-container {
    background-color: #f2f2f2;
    padding-top: 1px;
    .mui-card {
        .title {
            font-size: 16px;
        }
        .mui-card-content-inner {
            .price {
                line-height: 30px;
                color: #646464;
                .old-price {
                    text-decoration: line-through;
                    padding-right: 10px;
                }
                .new-price {
                    color: red;
                    font-weight: 700;
                }
            }
            .num {
                display: flex;
                flex-direction: row;
                line-height: 36px;
                color: #646464;
                margin-bottom: 10px;
            }
            .item {
                line-height: 30px;
                color: #646464;
            }
        }
        .mui-card-footer {
            display: block;
            .mt-item {
                margin-bottom: 10px;
            }
        }
    }
    .ball {
        // 小球动画
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}

.mint-swipe {
    height: 200px;

    .mint-swipe-item {
        background-color: #ccc;
    }
}
</style>