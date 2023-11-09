<script setup>
import { ref } from 'vue'
const links = ref([
  { href: '/', label: '首页' },
  { href: '/wenzhang', label: '文章' },
  { href: '/liuyan', label: '留言板' },
  { href: '/background', label: '后台'},
  { href: '', label: '登录' }
])
</script>
<template>
  <div class="body">
    <header>
      <div class="header-box">
        <p>
          “他说风雨中这点痛算什么，擦干泪不要怕，至少我们还有梦!”
          “我相信我就是我，我相信明天，我相信青春没有地平线。”
        </p>
        <div class="album r">
          <img src="../assets/img/h1.jpeg" alt="相册"/>
        </div>
        <div class="album r">
          <img src="../assets/img/h2.jpeg" alt="相册"/>
        </div>
      </div>
    </header>
    <nav class="nav">
      <div class="title l">个人博客小站</div>
      <ul>
        <li v-for="link in links" :key="link.href">
          <router-link :to="link.href">{{ link.label }}</router-link>
        </li>
      </ul>
    </nav>
    <section>
      <router-view/>
    </section>
    <footer class="clearfix">
      <p>111</p>
    </footer>
  </div>

</template>

<style scoped>
.body {color: #333;background: #559664;background-size: 100%;}
ul,li{ list-style: none; }
img,span,a,dt{ display: inline-block; }
a{ text-decoration: none; color: #333; cursor: url(../assets/img/a2.png),pointer;}
h1,h2,h3{ font-size: 16px; }
.l{ float: left; }
.r{ float: right; }
.clearfix{ zoom: 1; }
.clearfix:before, .clearfix:after{ content: ""; display: block; clear: both; }
header { width: 100%; height: 250px; background: url(../assets/img/top.jpg) center top no-repeat; }
.header-box { margin: 0 auto; width: 1050px; height: 100%; }
.header-box p { position: relative; top: 70px; width: 340px; color: #fff; text-shadow: #1f5a37 1px 1px 1px; font-size: 14px; line-height: 26px; }
.header-box .album { position: absolute; top: 120px; right: 13%; cursor: url(../assets/img/a2.png),pointer; width: 175px; height: 175px; background: url(../assets/img/hbg.png) no-repeat; transition: transform 0.3s linear 0s; }
.header-box .album img { width: 135px; height: 120px; margin: 20px 0 0 17px }
/*导航*/
.nav { display: inline-block; background: rgba(56, 134, 72, 1); width: 100%; height: 40px; }
.nav .title { margin: -40px 0 0 15%; color: #FFF; font-size: 32px; -webkit-box-reflect: below 0 -webkit-gradient(linear, 0 0, 0 100%, from(transparent), to(white)); }
.nav ul {margin: 0 auto; width: 600px; height: 50px; font-size: 16px; }
.nav ul li { float: left; margin: -8px 15px 0 25px; padding: 2px 0; height: 50px; line-height: 50px; }
.nav ul li a { color: #fff; padding: 0 15px; }
.nav ul li a:hover { background-color: #538c09; border-radius: 0 30px; transition: background-color 0.3s linear 0s; }
section {
  background: rgba(255,255,255,0.7);
  margin: 35px auto;
  padding: 15px;
  width: 1050px;
  overflow: hidden;
  border-radius: 15px;
}
/*底部*/
footer { overflow: hidden; margin-top: 66px; width: 100%; height: 80px; color: #222; background: #226039; font-size: 14px; line-height: 80px; text-align: center; }
</style>
