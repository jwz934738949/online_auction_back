<template>
  <div>
    <!-- 标题栏 -->
    <div class="header_wrap">
      <!-- 左侧用户头像 -->
      <el-avatar :size="50" :src="avatarUrl" />
      <el-button type="danger" icon="el-icon-close" @click="logout()"
        >退出</el-button
      >
    </div>
    <!-- 页面主体内容 -->
    <div class="main_body">
      <!-- 左侧导航 -->
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-submenu
          :index="item.id + ''"
          v-for="item in navList"
          :key="item.id"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            :index="'/' + item2.path"
            v-for="item2 in item.children"
            :key="item2.id"
            @click="saveNavPath('/' + item2.path)"
            >{{ item2.authName }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <!-- 右侧内容主体区域 -->
      <div class="main_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      // 保存当前的导航路径
      activePath: "/user",
      // 保存所有导航信息
      navList: {
        用户管理: {
          id: 1,
          authName: "用户管理",
          children: {
            管理员管理: {
              id: 11,
              authName: "管理员管理",
              path: "user",
            },
            角色管理: {
              id: 12,
              authName: "角色管理",
              path: "roles",
            },
            管用户管理: {
              id: 13,
              authName: "会员管理",
              path: "vipuser",
            },
          },
        },
        物品管理: {
          id: 2,
          authName: "物品管理",
          children: {
            物品管理: {
              id: 21,
              authName: "物品管理",
              path: "user11",
            },
            分类管理: {
              id: 22,
              authName: "分类管理",
              path: "category",
            }
          },
        },
        交易管理: {
          id: 3,
          authName: "交易管理",
          children: {
            会员管理: {
              id: 31,
              authName: "会员管理",
              path: "user22",
            },
            角色管理: {
              id: 32,
              authName: "角色管理",
              path: "roles22",
            },
            管理员用户管理: {
              id: 33,
              authName: "管理员用户管理",
              path: "vipuser22",
            },
          },
        },
      },
    };
  },
  created() {
    this.avatarUrl = window.sessionStorage.getItem("avatarUrl");
    this.activePath =
      window.sessionStorage.getItem("activePath") || this.activePath;
  },
  destroyed() {
    window.sessionStorage.clear();
  },
  methods: {
    // 退出登录
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 保存当前的路由
    saveNavPath(activePath) {
      this.activePath = activePath;
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
};
</script>

<style lang="less" scoped>
.header_wrap {
  width: 100%;
  height: 65px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #404b4f;
}

.main_body {
  height: calc(100vh - 65px);
  display: flex;
  .el-menu {
    width: 200px;
    height: 100%;
    border: 0;
  }

  .main_content {
    width: 100%;
  }
}
</style>
