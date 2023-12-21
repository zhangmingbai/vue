<template>
  <div class="main-content">
    <div style="display: flex; grid-gap: 10px">

      <div style="flex: 1">
        <div class="card" style="padding: 30px; margin-bottom: 10px">
          <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px">{{ blog.title }}</div>
          <div style="color: #666; margin-bottom: 20px">
            <span style="margin-right: 20px"><i class="fa fa-user"/> {{ blog.userName }}</span>
            <span style="margin-right: 20px"><i class="fa fa-calendar"/> {{ blog.date }}</span>
            <span style="margin-right: 20px"><i class="fa fa-eye"/>  {{ blog.readCount }}</span>
            <span>
              <el-tag v-for="item in tagsArr" :key="item" type="primary" style="margin-right:5px">{{ item }}</el-tag>
            </span>
          </div>

          <div class="w-e-text">
            <div v-html="blog.content"></div>
          </div>
        </div>
        <div class="card" style="text-align: center; font-size: 20px; color: #666; margin-bottom: 10px">
          <span style="margin-right: 20px; cursor: pointer" @click="setLikes" :class="{'active': blog.userLike}"><i class="fa fa-thumbs-o-up"></i> {{ blog.likesCount }}</span>
          <span style=" cursor: pointer" @click="setCollect" :class="{'active': blog.userCollect}"><i class="fa fa-star-o"></i> {{ blog.collectCount }}</span>
        </div>
        <div class="card">

        </div>
      </div>

      <div style="width: 260px">
        <div class="card" style="margin-bottom: 10px">
          <div style="display: flex; align-items: center; grid-gap: 10px; margin-bottom: 10px">
            <img :src="blog.account?.avatar" alt="" style="width: 50px; height: 50px; border-radius: 50%">
            <div style="flex: 1;">
              <div style="font-weight: bold; margin-bottom: 5px">{{ blog.account?.name }}</div>
              <div style="color: #666; font-size: 13px" class="line2">{{ blog.account?.info }}</div>
            </div>
          </div>

          <div style="display: flex">
            <div style="flex: 1; text-align: center">
              <div style="margin-bottom: 5px">文章</div>
              <div style="color: #888">10</div>
            </div>
            <div style="flex: 1; text-align: center">
              <div style="margin-bottom: 5px">点赞</div>
              <div style="color: #888">10</div>
            </div>
            <div style="flex: 1; text-align: center">
              <div style="margin-bottom: 5px">收藏</div>
              <div style="color: #888">10</div>
            </div>
          </div>
        </div>

        <div class="card" style="margin-bottom: 10px">
          <div style="font-weight: bold; font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid #ddd; margin-bottom: 10px">相关推荐</div>

          <div>
            <div style="margin-bottom: 15px" v-for="item in recommendList" :key="item.id">
              <div style="margin-bottom: 5px" class="line2">{{item.title}}</div>
              <div style="color: #888">
                <span>阅读</span> <span>{{item.readCount}}</span>
                <span style="margin-left: 10px">点赞</span> <span>{{item.likesCount}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="display: flex; grid-gap: 10px; ">
            <div style="flex: 1; line-height: 25px">
              找对属于你的学习圈子
              扫码学习精品项目
            </div>
            <img src="@/assets/img/广告.png" alt="" style="width: 50px; height: 50px; border-radius: 5px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
export default {
  name: "BlogDetail",
  data() {
    return {
      blogId: this.$route.query.blogId,
      blog: {},
      tagsArr: [],
      recommendList: [],
      user: JSON.parse(localStorage.getItem("authorize") || sessionStorage.getItem("authorize")),
    }
  },
  created() {
    this.load()
  },
  methods: {
    setLikes() {
      this.$request.post('/likes/set' , {fid: this.blogId, userId: this.user.id, module: '博客'}).then(res => {
        if (res.code === 200) {
          ElMessage.success('操作成功')
          this.load() // 重新加载数据
        }
      })
    },
    setCollect() {
      this.$request.post('/collect/set' , {fid: this.blogId, userId: this.user.id, module: '博客'}).then(res => {
        if (res.code === 200) {
          ElMessage.success('操作成功')
          this.load() // 重新加载数据
        }
      })
    },
    load() {
      this.$request.get('/blog/selectById/' + this.blogId,).then(res => {
        this.blog = res.data || {}
        console.log(res.data)
        this.tagsArr = JSON.parse(this.blog.tags || '[]')
      })

      this.$request.get('/blog/selectRecommend/' + this.blogId,).then(res => {
        this.recommendList = res.data || []
      })
    }
  }
}
</script>

<style>
.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 20px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}
p {
  line-height: 30px
}
.line2{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.active{
  color: orangered !important
}
</style>