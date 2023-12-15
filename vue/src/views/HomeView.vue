<script setup>
import { ref } from 'vue'
const links = ref([
  { href: '/index', label: '首页' },
  { href: '/index/wenzhang', label: '文章' },
  { href: '/index/liuyan', label: '留言板' },
  { href: '/', label: '后台'},
  { href: '/welcome', label: '登录' }
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
@import "@/assets/css/HomeView.css";
</style>
