<template>
  <div class="manager-container">
    <!-- 头部 -->
    <div class="manager-header">
      <div class="manager-header-left">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="title">后台管理系统</div>
      </div>

      <div class="manager-header-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="manager-header-right">
        <el-dropdown placement="bottom">
          <div class="avatar" slot="reference">
            <el-avatar :src="user.avatar" />
            <div>{{ user.name || '管理员' }}</div>
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 主体 -->
    <div class="manager-main">
      <!-- 侧边栏 -->
      <div class="manager-main-left">
        <el-menu :default-openeds="['info', 'user']" router style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-sub-menu index="info">
            <template #title>
              <el-icon><House /></el-icon>
              <span slot="title">信息管理</span>
            </template>
              <el-menu-item index="/notice">公告信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="user">
            <template #title>
              <el-icon><House /></el-icon>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/user">用户信息</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <!-- 数据表格 -->
      <div class="manager-main-right">
        <router-view @update:user="updateUser" />
      </div>
    </div>
  </div>
</template>

<script>
import {House,CaretBottom} from '@element-plus/icons-vue';
import {ElMessage} from "element-plus";
import {logout} from "@/net";
import router from "@/router";
export default {
  name: "Manager",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize')),
    }
  },
  created() {
    if (this.user.role !== 'admin') {
       ElMessage.error('你没有权限访问该页面')
       router.push('/index')
    }
  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize'))   // 重新获取下用户的最新信息
    },
    goToPerson() {
        router.push('/UserPerson')
    },
    userLogout() {
      logout(() => router.push('/welcome')) ;
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/manager.css";
</style>
