<template>
    <div>
    
        <!-- <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="max"> -->
        <div class="mui-numbox" data-numbox-min='1'>
    
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    
            <input  id="test" class="mui-input-numbox" type="number" value="1" 
                    @change="countChanged" ref="numbox" />
    
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    
        </div>
    
    </div>
</template>

<script>

    import mui from "../../lib/mui/js/mui.min.js";      // 引用组件 

    export default {
        data(){
            return{

            }
        },
        created(){

        },
        methods:{
            countChanged(){                 // 监听 购买数量 改变事件
                // console.log(this.$refs.numbox.value)
                // 将值 传递给父组件
                this.$emit("getcount",parseInt(this.$refs.numbox.value))
            }
        },
        mounted(){
            mui(".mui-numbox").numbox();    // 初始化数字选择框组件
            // console.log(this.max)
        },
        props:["max"],
        watch: {
            // 属性监听
            max: function(newVal, oldVal) {
            // 使用 JS API 设置 numbox 的最大值
            mui(".mui-numbox")
                .numbox()
                .setOption("max", newVal);
            }
        }
    }
</script>

<style lang="less" scoped>
    
</style>