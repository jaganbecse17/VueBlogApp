<template>
  <div id="app">
    <menu-bar></menu-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue"
export default {
  name: "App",
  components: {
    MenuBar
  },
  mounted(){
    if(!this.$store.state.profile?.userName) {
      this.$store.state.profile.loggedIn=false
      this.$router.push({name:"LoginPage",params:{screen:"Login"}})
    }
  },
watch:{
  "$store.state.profile":{
    handler(data){
      if(!data.userName){
        this.$store.state.profile.loggedIn=false
        // this.$router.push({name:"LoginPage",params:{screen:"Login"}})
      }
    }
  }
}
};
</script>

<style>

*,body{
  padding: 0;
  margin: 0;
}
body{
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #E5E5E5;
  height: 100vh;
}
</style>
