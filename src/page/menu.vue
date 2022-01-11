<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <router-link to="/home/user">
          <el-menu-item index="2-1">选项1</el-menu-item>
        </router-link>
        <router-link to="/home/product">
          <el-menu-item index="2-2">选项2</el-menu-item>
        </router-link>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-menu-item class="noHover" style="text-align: right; width: 1250px"></el-menu-item>
      <el-menu-item class="noHover" style="text-align: right">
        <el-button @click="logout" circle class="el-button--danger">登出</el-button>
      </el-menu-item>
      <el-menu-item index="">
        <v-drawer/>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import axios from 'axios';
  import drawer from '@/page/drawer'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    components: {
      'v-drawer': drawer
    },
    methods: {
      logout() {
        axios.post('/springboot/logout')
          .then(res => {
            this.$message.error(`登出。。。`);
            setInterval(
              () => {
                this.$router.push('/login')
              },
              2000
            )

          })
        //this.$router.push('/login');
      },
      handleSelect() {
      },
      toUserTable() {
        this.$parent.comName = 'v-userTable';
      },
      toProductTable() {
        this.$parent.comName = 'v-productTable';
      }
    },
    mounted() {
      //this.$router.push('/home/user');
    }
  }

</script>
<style scoped>
  .menu {
    top: 0px;
  }
  .noHover:hover {
  }
</style>
