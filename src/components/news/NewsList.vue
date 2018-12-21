<template>
    <div>
        <!--<h3>这是 NewsList 组件</h3>-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time | dateFormat }}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>


    </div>
</template>

<script>
    /**
     * 解决webpack 打包 严格模式的问题
     * https://github.com/genify/babel-plugin-transform-remove-strict-mode
     * 1. $ npm install babel-plugin-transform-remove-strict-mode
     * .babelrc
             {
                "plugins": ["transform-remove-strict-mode"]
            }
     */
    import { Toast } from "mint-ui";

    export default {
        data() {
            return {
                newslist: [         // 新闻列表
                    {
                        id:1,
                        img_url:"https://images.gitee.com/uploads/23/2659423_lizhou_live.png?1545042676",
                        title:"新闻标题1",
                        add_time: "2018-12-18T04:05:34.000Z",
                        click:5

                    },
                    {
                        id:2,
                        img_url:"https://images.gitee.com/uploads/23/2659423_lizhou_live.png?1545042676",
                        title:"新闻标题2",
                        add_time: "2018-12-18T04:06:34.000Z",
                        click:6

                    }
                ]
            };
        },
        created() {
            this.getNewsList();
        },
        methods: {
            getNewsList() {
                // 获取新闻列表
                this.$http.get("api/getnewslist").then(result => {
                    if (result.body.status === 0) {
                        // 如果没有失败，应该把数据保存到 data 上
                        this.newslist = result.body.message;
                    } else {
                        Toast("获取新闻列表失败！");
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .mui-table-view{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            display: flex;
            justify-content: space-between;
        }
    }
</style>