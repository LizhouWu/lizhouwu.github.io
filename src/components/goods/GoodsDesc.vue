<template>
    <div class="goodsDesc-container">
        <h3>{{ title }}</h3>
        <div class="goodsDesc-content" v-html="content"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: "【移动4G版】Apple iPhone XR (A2107) 128GB 白色 移动联通电信4G手机 双卡双待",
                content: "<p>双面玻璃的回归显然是苹果iPhone8|8 Plus" +
                "相对于以前所有改变里面最容易引起关注的，毕竟这是一个看脸的时代。不过看脸的同时，还是要看点实力的。" +
                "其实，让拍照体验继续向专业靠拢是其不太容易被发现的隐藏亮点</p>"+"<img src='https://article-fd.zol-img.com.cn/t_s640x2000/g5/M00/0C/09/ChMkJlnE7MSITIPxAASfYBh2JVcAAgtSgG7C3QABJ94471.jpg' alt=''>",

                goodsDescList:[

                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    .goodsDesc-container{
        padding: 5px;
        h3{
            border-bottom: 1px solid #ccc;
            font-size: 16px;
            padding-bottom: 10px;
            line-height: 28px;
            text-align: center;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .goodsDesc-content{
            img{
                width: 100%;
            }
        }
    }
</style>