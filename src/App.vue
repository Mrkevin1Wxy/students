<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      
    }

  },
  methods:{
    
    // toHome:function () {
    //   this.$router.push({path:"/"})
    // },
    // toCloth:function () {
    //   this.$router.push({path:"/Cloth"})   
    // },
    // toAbout:function () {
    //   this.$router.push({path:"/About"})
    // }
  }
}
</script>

<style>
  @import "./App.css"
</style>
