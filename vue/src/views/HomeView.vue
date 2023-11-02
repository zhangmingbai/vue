<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleSelect = (index, indexPath) => {
  switch (index) {
    case '1':
      router.push('/index')
      break
    case '2':
      router.push('/文章')
      break
    case '3':
      router.push('/留言')
      break
    case '4':
      router.push('/登录')
      break
    default:
      break
  }
}
</script>

<template>
  <div>
    <div class="body">
        <div class="header-box">
          <p>
            “他说风雨中这点痛算什么，擦干泪不要怕，至少我们还有梦!”
            “我相信我就是我，我相信明天，我相信青春没有地平线。”
          </p>
          <div class="album">
            <img src="./../assets/img/h1.jpeg" alt="相册"/>
          </div>
          <div class="album">
            <img src="./../assets/img/h2.jpeg" alt="相册"/>
          </div>
        </div>
    </div>
    <el-menu class="nav" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">文章</el-menu-item>
      <el-menu-item index="3">留言</el-menu-item>
      <el-menu-item index="4">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.body {
  color: #333;
  background: #559664;
  background-size: 100%;
  font-family: "microsoft yahei",Verdana, Arial, 微软雅黑,serif;
  cursor: url(src/assets/img/a1.png), auto;
}
.header-box {
  width: 100%;
  height: 270px;
  background-image: url("./../assets/img/top.jpg");
}
.header-box p {
  position: relative;
  top: 90px;
  margin-left: 200px;
  width: 340px;
  color: #fff;
  text-shadow: #1f5a37 1px 1px 1px;
  font-size: 14px;
  line-height: 30px;
}
.header-box .album {
  position: absolute;
  top: 120px;
  right: 13%;
  cursor: url("./../assets/img/a2.png"),pointer;
  width: 175px; height: 175px;
  background: url("./../assets/img/hbg.png") no-repeat;
  transition: transform 0.3s linear 0s;
}
.header-box .album img {
  width: 135px;
  height: 120px;
  margin: 20px 0 0 17px
}
.nav {
  background: rgba(56, 134, 72, 1);
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
