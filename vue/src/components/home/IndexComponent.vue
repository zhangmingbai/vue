<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let index = ref(0);
let timer = null;
const start = () => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % 4; // 这里的 4 是图片的数量
  }, 2500); // 2500 是轮播的间隔时间，单位是毫秒
};

const stop = () => {
  clearInterval(timer);
};

onMounted(start);
onUnmounted(stop);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="width: 320px">
        <div class="blog-sidebar-widget">
          <h2 class="blog-title"><span>CrazyStone</span></h2>
          <img src="../../assets/img/me.jpg" alt="about me" class="blog-entry-img"/>
          <p>
            Java后台开发
          </p>
          <p>个人博客小站，主要发表关于Java、Spring、Docker等相关文章</p>
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
        <el-header style="height: 315px; padding: 10px">
          <div class="banner" @mouseover="stop" @mouseout="start">
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
        </el-header>
        <el-main style="padding: 30px">
          <div class="art-right">
            <h2 class="art-txt"><i class="fa fa-weibo" style="font-size:24px;color:red"></i><span>最新文章</span></h2>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  background: rgba(255,255,255,0.7);
  margin: 35px auto;
  padding: 15px;
  width: 1050px;
  border-radius: 15px;
  z-index: 1;
}
ul,li { list-style: none; }
img,span,a { display: inline-block; }
.r{ float: right;}
.fa {position: absolute; margin-top: 10px;}
.fa-circle {position: absolute; margin-top: 12px; font-size: 10px}
.blog-sidebar-widget {padding:0 2rem;border: 2px solid #5596647F;}
.blog-title {margin-top: -7px;text-align: center;}
.blog-title span {background-color: #E7E7E7FF;padding: 0 1.5rem;}
.blog-entry-img {max-width: 100%;margin-left: 12px}
p {margin-top: 8px;text-align: center;}
.art {padding-top: 15px;}
.art-txt span {margin-left: 2vw;margin-top: 8px}
.art-txt { margin-bottom: 10px; padding-bottom: 5px; line-height: 30px; font-size: 16px; border-bottom: 2px solid #226039; }
.art-list li {height: 33px; line-height: 33px; font-size: 13px; border-bottom: 1px solid #eee; }
.art-list li a:hover { font-weight: bold; color: #559664; }
.art-list span {margin-left: 3vw;font-size: 14px; overflow: hidden;text-overflow: ellipsis;}
.Label .label {margin: 8px;border: 2px solid #c1c1c1;}
.Label .btn {margin-top: 10px;padding: 6px 10px;font-size: 12px;text-align: center;border-radius: 5px;}
.Label .label:hover {color: #FFFFFF; background-color: #559664; }
.banner { position: relative;}
.banner .a-img-ban {
  position: absolute;
  top: 0;
  left: 12px;
  z-index: 9;
  width: 540px;
  height: 315px;
  opacity: 0;
  transition: opacity 0.5s linear 0s;
}
.banner .a-img-ban .img-ban {
  position: absolute;
  width: 540px;
  height: 315px;
  border-radius: 10px;
}
.banner .img-ban-curr {
  opacity: 1; z-index: 10; }
.banner ul { width: 125px; }
.banner ul li {
  padding: 4.85%;
  margin-bottom: 10.5%;
  background: #e7e7e7;
  cursor: url(../../assets/img/a2.png),pointer;
  width: 90%;
  height: 57px;
  border-radius: 10px;
  transition: background-color 0.3s linear 0s; }
.banner ul li .mask{
  position: relative;
  top: -61px;
  display: none;
  width: 101%;
  height: 101%;
  background-color: rgba(85,150,100,0.5);
  border-radius: 5px;
}
.banner ul li.curr { background-color: #79d48b; }
.banner ul li img { width: 100%; height: 100%; border-radius: 5px; }

</style>