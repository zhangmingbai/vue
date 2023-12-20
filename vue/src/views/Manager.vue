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
          <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="manager-header-right">
        <el-dropdown placement="bottom">
          <div class="avatar" slot="reference" style="color:#fff;">
            <el-avatar :src="user.avatar" />
            <div style="margin-right: 5px">{{ user.name || '管理员' }}</div>
            <i class="fa fa-angle-down"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/forget')">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/')">返回前台</el-dropdown-item>
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
          <el-menu-item index="/manager/home">
            <i class="fa fa-graduation-cap" style="width: 20px; font-size:20px;color: chartreuse"></i>
            <span slot="title" style="margin-left: 10px">系统首页</span>
          </el-menu-item>
          <el-sub-menu index="info">
            <template #title>
              <i class="fa fa-plus-square" style="width: 24px; font-size:24px;color: chartreuse"></i>
              <span slot="title" style="margin-left: 5px">信息管理</span>
            </template>
            <el-menu-item index="/manager/notice">公告信息</el-menu-item>
            <el-menu-item index="/manager/category">博客分类</el-menu-item>
            <el-menu-item index="/manager/blog">博客信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="user">
            <template #title>
              <i class="fa fa-user" style="width: 24px; font-size:24px;color: chartreuse"></i>
              <span slot="title" style="margin-left: 5px">用户管理</span>
            </template>
            <el-menu-item index="/manager/user">用户信息</el-menu-item>
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
import {logout} from "@/net";
import router from "@/router";
export default {
  name: "Manager",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize')) || {},
    }
  },
  created() {
  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('authorize') || sessionStorage.getItem('authorize'))   // 重新获取下用户的最新信息
    },
    goToPerson() {
        router.push('/manager/UserPerson')
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
