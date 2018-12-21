<template>
    <div class="photoInf-container">

        <!-- 标题 -->
        <h3 class="title">{{ title }}</h3>
        <div class="subtitle">
            <span>发表时间:{{ add_time | dateFormat }}</span>
            <span>点击:{{ click }}</span>
        </div>

        <!-- 缩略图展示区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list"
                 :src="item.src" height="100"
                 @click="$preview.open(index, list)"
                 :key="item.src">
        </div>

        <!-- 内容区域 -->
        <div class="photoInf-content" v-html="content"></div>

        <!-- 评论组件 -->
        <div class="comment-content">
            <cmt-box :id="this.id"></cmt-box>
        </div>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment.vue"
    export default {
        components:{
            "cmt-box": comment
        },
        data(){
            return {
                id: this.$route.params.id,
                title: "一缕安静的阳光",
                add_time: "2018-12-18T04:05:34.000Z",
                click:5,
                img_url:"https://images.gitee.com/uploads/23/2659423_lizhou_live.png?1545042676",
                content:"行走在岁月的小巷，听风，读雨，夜色空寂，一切烟云，皆会慢慢散去，光阴眷顾，你我默默相依，慢慢老去，红尘若可安好，便可不悲不喜，不离不弃，情真意切，绵绵无期",

                photoinfo: {}, // 图片详情
                list: [], // 缩略图的数组
            }
        },
        created(){
            this.getPhotoInfo()
            this.getThumbs()
        },
        methods: {
            getPhotoInfo() {
                // 获取图片的详情
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoinfo = result.body.message[0];
                    }
                });
            },
            getThumbs() {
                // 获取缩略图
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .photoInf-container{
        padding: 0 4px;
        margin-top: 15px;
        font-size: 14px;
        .title{
            text-align: center;
            font-size: 16px;
            color: red;
            line-height: 40px;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
            padding: 0 20px 5px;
            color: #26a2ff;
        }
        .photoInf-content{
            margin: 10px 0;
        }
    }
</style>