<script>
import {logout} from "@/net";
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "HomeLayout",

  data () {
    return {
      top: '',
      notice: [],
      user: JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize')) || {},
      title: this.$route.query.title
    }
  },
  mounted() {
    this.loadNotice()
  },
  methods: {
    goSearch() {
      location.href = '/front/search?title=' + this.title
    },
    loadNotice() {
      this.$request.get('/notice/selectAll').then(res => {
        this.notice = res.data
        let i = 0
        if (this.notice && this.notice.length) {
          this.top = this.notice[0].content
          setInterval(() => {
            this.top = this.notice[i].content
            i++
            if (i === this.notice.length) {
              i = 0
            }
          }, 2000)
        }
      })
    },
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize')) || {}  // 重新获取下用户的最新信息
    },
    goToManager() {
      if (this.user.role !== 'admin') {
        ElMessage.error('您没有权限访问后台管理系统')
      }else {
        router.push('/manager/home')
      }
    },
    // 退出登录
    userLogout() {
      logout(() => router.push('/welcome')) ;
    },
  }

}
</script>
<template>
  <div class="body">
    <el-container>
      <el-header  style="height: 344px; padding: 0">
        <el-container>
          <el-header class="header">
            <div class="header-box">
              <p>
                “他说风雨中这点痛算什么，擦干泪不要怕，至少我们还有梦!”
                “我相信我就是我，我相信明天，我相信青春没有地平线。”
              </p>
              <div class="album">
                <img src="../assets/img/h1.jpeg" alt="相册"/>
              </div>
              <div class="album">
                <img src="../assets/img/h2.jpeg" alt="相册"/>
              </div>
            </div>
          </el-header>
          <el-main style="height: 94px">
            <div class="front-header">
              <div class="front-header-left">
                <img src="@/assets/img/logo.png" alt="">
                <div class="title">博客论坛平台</div>
              </div>
              <div class="front-header-center">
                <div class="front-header-nav">
                  <el-menu :default-active="$route.path" mode="horizontal" router>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/blog">博客</el-menu-item>
                    <el-menu-item index="">个人中心</el-menu-item>
                    <el-menu-item @click.native="goToManager">后台</el-menu-item>
                  </el-menu>
                </div>
              </div>
              <div style="margin-right: 60px">
                <el-input style="width: 260px; margin-right: 10px" placeholder="请输入关键字搜索"  clearable></el-input>
                <el-button type="success" @click="goSearch">搜 索</el-button>
              </div>
              <div class="front-header-right">
                <div v-if="!user.username">
                  <el-button type="success" @click="$router.push('/welcome')">登录</el-button>
                </div>
                <div v-else>
                  <el-dropdown placement="bottom">
                    <div class="avatar" slot="reference">
                      <el-avatar :src="user.avatar"/>
                      <div style="margin-right: 4px;">{{user.name}}</div>
                      <i class="fa fa-angle-down"></i>
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
            <div class="front-notice">
              <i class="fa fa-bell" style="color: red"></i>
              公告：{{ top }}
            </div>
          </el-main>
        </el-container>
      </el-header>
      <el-main class="section">
        <router-view ref="child" @update:user="updateUser"/>
      </el-main>
      <el-footer>
        <div class="footer">
          <div>京ICP备888888©2024 项目训练营</div>
        </div>
      </el-footer>
    </el-container>
  </div>

</template>

<style scoped>
.body {
  color: #333;
  background: #559664;
}
.header {
  width: 100%;
  height: 250px;
  background: url(../assets/img/top.jpg) center top no-repeat;
}
.header-box {
  margin: 0 auto;
  width: 1050px;
  height: 100%;
}
.header-box p {
  position: relative;
  top: 70px;
  width: 340px;
  color: #fff;
  text-shadow: #1f5a37 1px 1px 1px;
  font-size: 14px;
  line-height: 26px;
}
.header-box .album {
  position: absolute;
  top: 95px;
  right: 13%;
  cursor: url(../assets/img/a2.png),pointer;
  width: 175px;
  height: 175px;
  background: url(../assets/img/hbg.png) no-repeat;
  transition: transform 0.3s linear 0s;
}
.header-box .album img {
  width: 135px;
  height: 120px;
  margin: 20px 0 0 17px
}
.front-header {
  display: flex;
  height: 60px;
  line-height: 60px;
  background: #388648;
}
.front-header-left {
  width: 300px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.front-header-left img, .front-header-dropdown img {
  width: 40px;
  height: 40px;
  border-radius: 50%
}
.front-header-left .title {
  flex: 1;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}
.front-header-center {
  flex: 1;
}
.front-header-right {
  width: 200px;
  padding-right: 40px;
  text-align: right;
  justify-content: flex-end;
}
.front-header-right .avatar {
  line-height: 60px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  color: #fff;
  cursor: default
}
.front-header-right .avatar .el-avatar{
  margin-right: 3px;
}
.front-header-right .avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px
}
.front-header-dropdown {
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
}
.el-main{
  padding: 0;
}
.el-menu {
  background-color: #388648;
}
.el-menu--horizontal.el-menu{
  border: none !important;
  height: 59px;
  justify-content: center;
}
.el-menu--horizontal>.el-menu-item.is-active {
  color: #fff !important;
  background-color: #538c09 !important;
  border-radius: 0 35px;
  height: 59px !important;
  border-bottom: none !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #fff !important;
  background-color: #538c09 !important;
  border-radius: 0 35px;
}
.el-menu--horizontal>.el-menu-item{
  color: #fff;
  border: none !important;
}
.front-notice {
  padding: 5px 150px;
  color: #232222;
  font-size: 18px;
  background-color: #78c488;
}
.section{
  background: rgba(255,255,255,0.7);
  width: 80%;
  margin: 5px auto;
  padding: 15px;
  overflow: hidden;
  border-radius: 15px;
}
.footer{
  width: 350px;
  margin: auto;
  color: #666;
}
</style>
