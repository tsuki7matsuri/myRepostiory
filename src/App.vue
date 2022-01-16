<template>
  <div id="app">
    <TopContainer />
    <BHeader />
    <BContent />
  </div>
</template>

<script>
import BHeader  from '@/components/header/BHeader';
import TopContainer from '@/components/header/TopContainer';
import BContent from "@/components/contentTop/BContent";

export default {
  name: 'App',
  components: {
    BHeader,
    TopContainer,
    BContent,
  }
}
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
