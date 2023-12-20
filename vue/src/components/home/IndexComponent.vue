<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let index = ref(0);
let timer = null;
const start = () => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % 4; // 这里的 4 是图片的数量
  }, 1500); // 1500 是轮播的间隔时间，单位是毫秒
};

const stop = () => {
  clearInterval(timer);
};

onMounted(start);
onUnmounted(stop);
</script>

<template>
    <el-container>
      <el-aside style="width: 320px">
        <div class="blog-sidebar-widget">
          <h2 class="blog-title"><span>CrazyStone</span></h2>
          <img src="../../assets/img/me.jpg" alt="about me" class="blog-entry-img"/>
          <p style="text-align: center">
            Java后台开发
          </p>
          <p style="text-align: center">个人博客小站，主要发表关于Java、Spring、Docker等相关文章</p>
        </div>
        <div class="art">
          <h2 class="art-txt"><i class="fa fa-thumbs-up" style="font-size:24px; color:#559664"></i><span>推荐文章</span> </h2>
          <ul class="art-list">
            <li><a href="#" ><i class="fa fa-circle"></i><span>心有所系 故有所憾</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>纸上的童心</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>轻于荷香</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>听雨</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>假如给我三天光明</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>留在心底的风景</span></a></li>
            <li><a href="#" ><i class="fa fa-circle"></i><span>听春</span></a></li>
          </ul>
        </div>
        <div class="art Label">
          <h2 class="art-txt"><i class="fa fa-leaf" style="font-size:24px; color:#559664"></i><span>热门标签</span></h2>
          <div>
            <a class="btn label" href="#">老人与海</a><a class="btn label" href="#">西游记</a>
            <a class="btn label" href="#">红楼梦</a><a class="btn label" href="#">龙族</a>
            <a class="btn label" href="#">水浒传</a><a class="btn label" href="#">完美世界</a>
            <a class="btn label" href="#">钢铁是怎样炼成的</a><a class="btn label" href="#" >遮天</a>
          </div>
        </div>
      </el-aside>
      <el-container style="width: 740px">
        <el-header style="height: 315px">
          <el-container class="banner" @mouseover="stop" @mouseout="start">
            <el-aside style="width: 125px">
              <ul>
                <li class="li-img" :class="{ curr: index === 0 }" @click="index = 0"><img src="../../assets/img/1.jpeg" alt=""><div class="mask"></div></li>
                <li class="li-img" :class="{ curr: index === 1 }" @click="index = 1"><img src="../../assets/img/17.jpeg" alt=""><div class="mask"></div></li>
                <li class="li-img" :class="{ curr: index === 2 }" @click="index = 2"><img src="../../assets/img/3.jpeg" alt=""><div class="mask"></div></li>
                <li class="li-img" :class="{ curr: index === 3 }" @click="index = 3"><img src="../../assets/img/21.jpeg" alt=""><div class="mask"></div></li>
              </ul>
            </el-aside>
            <el-main>
              <div>
                <a class="a-img-ban" :class="{ 'img-ban-curr': index === 0 }"><img class="img-ban" src="../../assets/img/1.jpeg" alt=""></a>
                <a class="a-img-ban" :class="{ 'img-ban-curr': index === 1 }"><img class="img-ban" src="../../assets/img/17.jpeg" alt=""></a>
                <a class="a-img-ban" :class="{ 'img-ban-curr': index === 2 }"><img class="img-ban" src="../../assets/img/3.jpeg" alt=""></a>
                <a class="a-img-ban" :class="{ 'img-ban-curr': index === 3 }"><img class="img-ban" src="../../assets/img/21.jpeg" alt=""></a>
              </div>
            </el-main>
          </el-container>
        </el-header>
        <el-main style="padding: 28px">
          <div class="art-right">
            <h2 class="art-txt"><i class="fa fa-weibo" style="font-size:24px;color:red"></i><span>最新文章</span></h2>
            <div class="art-model">
              <h3><a href="#" >铜鼎山</a></h3>
              <p class="dateview"><span>发布时间：2022/5/21</span> <span>作者：XXX</span></p>
              <dl class="img-txt">
                <dt>
                  <img src="" alt="铜鼎山" title="铜鼎山">
                </dt>
                <dd>
                  <p class="deatil">　　铜鼎山旅游区（AAAA级旅游景区）集人文、休闲旅游、大众娱乐、健康运动为一体的旅游胜地。</p>
                  <a href="article.html" class="btn  c-fff" >查看全文</a>
                </dd>
              </dl>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<style scoped>
@import "@/assets/css/IndexComponent.css";
</style>