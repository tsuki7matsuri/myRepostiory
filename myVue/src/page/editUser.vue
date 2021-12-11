<template>
  <div>
    id: {{id}}
    <div class="block">
      <el-avatar :size="50" :src="circleUrl">头像
      </el-avatar>
    </div>
    <br/>
    用户名：
    <el-input v-model="user.username"/>
    密码：
    <el-input v-model="user.password"/>
    性别：
    <el-radio v-model="user.sex" label="男" />
    <el-radio v-model="user.sex" label="女" />
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        id: this.$parent.data.id,
        user: {},
        isShow: true,
        circleUrl: ''
      }
    },
    methods: {
      getUserData() {
        axios.post('http://localhost:8080/editUser', 'id=' + this.id)
          .then((response) => {
            this.user = response.data.data;
            console.log(this.user.sex);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    watch: {
      id () {
        console.log('isShow is change')
        this.getUserData()
      }
    },
    mounted() {
      this.getUserData()
    },
  }

</script>

<style scoped>

</style>
