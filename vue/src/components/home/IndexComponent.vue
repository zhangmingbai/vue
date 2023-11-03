<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let index = ref(0);
let timer = null;

const start = () => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % 4; // 这里的 4 是图片的数量
  }, 3000); // 3000 是轮播的间隔时间，单位是毫秒
};

const stop = () => {
  clearInterval(timer);
};

onMounted(start);
onUnmounted(stop);
</script>

<template>
  <div class="banner-box clearfix">
    <div class="banner r" @mouseover="stop" @mouseout="start">
      <div>
        <a class="a-img-ban" :class="{ 'img-ban-curr': index === 0 }"><img class="img-ban" src="../../assets/img/1.jpeg" alt=""></a>
        <a class="a-img-ban" :class="{ 'img-ban-curr': index === 1 }"><img class="img-ban" src="../../assets/img/17.jpeg" alt=""></a>
        <a class="a-img-ban" :class="{ 'img-ban-curr': index === 2 }"><img class="img-ban" src="../../assets/img/3.jpeg" alt=""></a>
        <a class="a-img-ban" :class="{ 'img-ban-curr': index === 3 }"><img class="img-ban" src="../../assets/img/21.jpeg" alt=""></a>
      </div>
      <ul class="r">
        <li class="li-img" :class="{ curr: index === 0 }" @click="index = 0"><img src="../../assets/img/1.jpeg" alt=""><div class="mask"></div></li>
        <li class="li-img" :class="{ curr: index === 1 }" @click="index = 1"><img src="../../assets/img/17.jpeg" alt=""><div class="mask"></div></li>
        <li class="li-img" :class="{ curr: index === 2 }" @click="index = 2"><img src="../../assets/img/3.jpeg" alt=""><div class="mask"></div></li>
        <li class="li-img" :class="{ curr: index === 3 }" @click="index = 3"><img src="../../assets/img/21.jpeg" alt=""><div class="mask"></div></li>
      </ul>
    </div>
    <div class="art l">
      <h2 class="art-txt"><em class="iconfont icon-zan "></em> <span>推荐文章</span> </h2>
      <ul class="art-list">
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>心有所系 故有所憾</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>纸上的童心</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>轻于荷香</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>听雨</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>假如给我三天光明</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>留在心底的风景</span></a></li>
        <li><a href="#" ><em class="iconfont icon-dian "></em><span>听春</span></a></li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
ul,ol,li{ list-style: none; }
img,span,a,dt{ display: inline-block; }
a{ text-decoration: none; color: #333; cursor: url(../../assets/img/a2.png),pointer;}
h2{ font-size: 16px; }
.l{ float: left; }
.r{ float: right; }
.clearfix{ zoom: 1; }
.clearfix:before, .clearfix:after{ content: ""; display: block; clear: both; }
.banner { position: relative; width: 680px; height: 300px; }
.banner .a-img-ban { position: absolute; top: 0; left: 0; z-index: 9; width: 540px; height: 295px; -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0); filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0); opacity: 0; transition: opacity 0.5s linear 0s; }
.banner .a-img-ban .img-ban { position: absolute; width: 540px; height: 295px; border-radius: 10px; z-index: 9; }
.banner .img-ban-curr { -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100); filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100); opacity: 1; z-index: 10; }
.banner ul { width: 125px; }
.banner ul li { padding: 4.85%; margin-bottom: 5.5%; background: #e7e7e7; cursor: url(../../assets/img/a2.png),pointer; width: 90%; height: 57px; border-radius: 10px; transition: background-color 0.3s linear 0s; }
.banner ul li .mask{ position: relative; top: -61px; display: none; width: 101%; height: 101%; background-color: rgba(85,150,100,0.5); border-radius: 5px; }
.banner ul li.curr { background-color: #79d48b; }
.banner ul li img { width: 100%; height: 100%; border-radius: 5px; }
.art { width: 320px; }
.art-txt { margin-bottom: 10px; padding-bottom: 5px; line-height: 30px; font-size: 16px; border-bottom: 2px solid #226039; }
.art-list li { height: 33px; line-height: 33px; font-size: 13px; border-bottom: 1px solid #eee; }
.art-list li a:hover { font-weight: bold; color: #559664; }
.art-list em { float: left; width: 25px; line-height: 35px; }
.art-list span { float: left; width: 290px; font-size: 14px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
article { padding-top: 10px; }
</style>