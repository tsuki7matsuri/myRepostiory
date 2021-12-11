<template>
  <div id="app">
    <v-menu/>
    <v-table/>
  </div>

</template>

<script>
  import myMenu from '@/page/menu'
  import myTable from '@/page/table'

  export default {
    name: 'App',
    components: {
      'v-menu': myMenu,
      'v-table': myTable
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
