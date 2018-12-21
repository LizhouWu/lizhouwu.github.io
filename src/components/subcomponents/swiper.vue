<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.src" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["lunbotuList"]
    }

</script>

<style lang="less" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            background-color: #ccc;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
</style>