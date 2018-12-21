<template>
    <div class="comment-container">
        <!--<h3>这是 comment 评论组件</h3>-->
        <h3>发表评论{{$route.params.id}}</h3>
        <textarea maxlength="120" placeholder="请输入评论的内容,不超过120个字" v-model="msg"></textarea>
        <!--<input type="button" value="发表评论">-->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <!--<ul>-->
            <!--<li>-->
                <!--<div class="userInf">-->
                    <!--<span>第一楼</span>-->
                    <!--<span>用户:匿名用户</span>-->
                    <!--<span>发表时间:</span>-->
                <!--</div>-->
            <!--</li>-->
        <!--</ul>-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.user_name">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>

        </div>

        <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    export default {
        data() {
            return {
                comments: [
                    {
                        user_name: "匿名用户1",
                        add_time: "2018-12-18T04:05:34.000Z",
                        content: "还不错"
                    },
                    {
                        user_name: "匿名用户2",
                        add_time: "2018-12-18T04:05:34.000Z",
                        content: "挺好"
                    },
                    {
                        user_name: "匿名用户3",
                        add_time: "2018-12-18T04:05:34.000Z",
                        content: "点赞"
                    },
                    {
                        user_name: "匿名用户4",
                        add_time: "2018-12-18T04:05:34.000Z",
                        content: "挺好的"
                    },
                    {
                        user_name: "匿名用户5",
                        add_time: "2018-12-18T04:05:34.000Z",
                        content: "好"
                    },
                ],
                pageindex:1,
                msg:"",         // 评论内容
            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                // 获取评论
                this.$http
                    .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                    .then(result => {
                        if (result.body.status === 0) {
                            // this.comments = result.body.message;
                            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                            this.comments = this.comments.concat(result.body.message);
                        } else {
                            Toast("获取评论失败！");
                        }
                    });
            },
            getMore() {
                // 加载更多
                this.pageIndex++;
                this.getComments();
            },
            postComment() {     // 发表评论
                // 校验是否为空内容
                if (this.msg.trim().length === 0) {
                    return Toast("评论内容不能为空！");
                }

                // 发表评论
                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
                this.$http
                    .post("api/postcomment/" + this.$route.params.id, {
                        content: this.msg.trim()
                    })
                    .then(function(result) {
                        if (result.body.status === 0) {
                            // 1. 拼接出一个评论对象
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = "";
                        }
                    });
            }
        },
        props:["id"]
    }
</script>

<style lang="scss" scoped>
    .comment-container{
        margin-top: 20px;
        padding: 5px;
        h3{
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            color: red;
        }
        textarea{
            font-size: 14px;
        }
        .cmt-list{
            margin: 10px 0;
            font-size: 12px;
            line-height: 30px;
            .cmt-title{
                background-color: #ccc;
                padding-left: 5px;
            }
            .cmt-body{
                text-indent: 1rem;
            }
        }
    }
</style>