<script setup>

</script>

<template>
  <div>
    <div class="header-box">
      <p>
        “他说风雨中这点痛算什么，擦干泪不要怕，至少我们还有梦!”
        “我相信我就是我，我相信明天，我相信青春没有地平线。”
      </p>
      <div class="album" style="transform: rotate(30deg) translate(30px,-50px)">
        <img src="./assets/img/h1.jpeg" alt="相册"/>
      </div>
      <div class="album" style="transform: rotate(-30deg) translate(-30px,-40px)">
        <img src="./assets/img/h2.jpeg" alt="相册"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-box {
  width: 100%;
  height: 270px;
  background-image: url("././assets/img/top.jpg");
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
  top: 150px;
  right: 13%;
  cursor: url("././assets/img/a2.png"),pointer;
  width: 175px; height: 175px;
  background: url("././assets/img/hbg.png") no-repeat;
  transition: transform 0.3s linear 0s;
}
.header-box .album img {
  width: 135px;
  height: 120px;
  margin: 20px 0 0 17px
}
</style>
