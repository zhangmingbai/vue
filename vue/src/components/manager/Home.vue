<template>
  <div>
    <div class="card" style="padding: 15px">
      您好，<span :class="{ 'blue-text': user?.name }">{{ user?.name }}</span> ！欢迎使用本系统
    </div>

    <div style="display: flex; margin: 10px 0">
      <div style="width: 50%;" class="card">
        <div style="margin-bottom: 30px; font-size: 20px; font-weight: bold">公告列表</div>
        <el-timeline reverse>
          <el-timeline-item v-for="item in notices" :key="item.id" :timestamp="item.time">
            <el-popover
                placement="right"
                width="200"
                trigger="hover"
                :content="item.content"
            >
              <template #reference>
                <span>{{ item.title }}</span>
              </template>
            </el-popover>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>

import {get} from "@/net";

export default {
  name: 'Home',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize')),
      notices: [],
    };
  },
  created() {
    get('/notice/selectAll',(data) => {
      this.notices = data
    })
  },
};
</script>

<style scoped>
.blue-text {
  color: blue;
}
</style>
