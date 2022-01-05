<template>
  <div>
    <v-menu/>
    <router-view></router-view>
  </div>
</template>

<script>
  import myMenu from '@/page/menu'
  import userTable from '@/page/userTable'
  import productTable from '@/page/productTable'

  export default {
    name: "Home",
    data(){
      return {
        comName: 'v-userTable',
        id: 0
    }
    },
    components: {
      'v-menu': myMenu,
      'v-userTable': userTable,
      'v-productTable': productTable,
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
