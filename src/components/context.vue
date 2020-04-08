<template>
  <div id="context">
    <div style="background-color: #EBEBEB;min-height:900px">
        <div style="width:100%;background-color: #636363; overflow: hidden">
              
        </div>

        <div style="margin-top:5px">
          <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4">
              <div>
                <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
                   <el-menu-item index="1"><i class="el-icon-tickets"></i>欢迎</el-menu-item>
                  <el-menu-item index="2"><i class="el-icon-info"></i>个人中心</el-menu-item>
                  <el-menu-item index="3"><i class="el-icon-menu"></i>课程</el-menu-item>
                  <el-menu-item index="4"><i class="el-icon-mobile-phone"></i>论坛</el-menu-item>
                </el-menu>
              </div>
            </el-col>
         
            <el-col :xs="20" :sm="20" :md="20" :lg="20">
              <!-- <div>
                <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item :key="item.index" v-for="item in breadcrumbItems">{{item}}</el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
                
              </div> -->
             <router-view></router-view>
            </el-col>
          </el-row>
        </div>
      </div>
      
  </div>
 
</template>

<script>
export default {
  name:"context",
  data(){
    return{
        searchCriteria: '',
        breadcrumbItems: ['欢迎'], 
        mailbox:'',
        personalInfo:''
    }
  },
  mounted:function(){
     this.mailbox = this.getCookie('mailbox')
       if(this.mailbox == ''){
          this.$router.push('/');
       }
        //console.log(this.mailbox)
       this.$axios({
                method:'post',
                url:'http://127.0.0.1:500/information',
                data:{
                  "mailbox":this.mailbox,
                }
            }).then((response) =>{          
                //console.log(response.data)       //请求成功返回的数据
                if(response.data !=""){
                  this.personalInfo = response.data
                  console.log(this.personalInfo)
              this.setCookie("publishId",this.personalInfo.id)
                }
                
            
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            }) 
  },
  methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
      getCookie:function (name) {
        var nameEQ = name + '='
        var ca = document.cookie.split(';') // 把cookie分割成组
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i] // 取得字符串
          while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length) // 有的话，从第二位开始取
          }
          if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
          }
        }
        return false
      },
       setCookie:function(name, value, seconds) {
        seconds = seconds || 0;   //seconds有值就直接赋值，
        var expires = "";
        if (seconds != 0 ) {      //设置cookie生存时间
          var date = new Date();
          date.setTime(date.getTime()+(seconds*1000));
          expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
      },
      handleSelect(key, keyPath){
        switch(key){
           case '1':
            this.$router.push('/Context/Welcome');
            this.breadcrumbItems  = ['欢迎']
            break;
          case '2':
            this.$router.push('/Context/Personal');
            this.breadcrumbItems  = ['个人中心']
            break;
          case '3':
            this.$router.push('/Context/Course')
            this.breadcrumbItems  = ['课程']
            break;
          case '4':
            this.$router.push('/Context/Page3')
            this.breadcrumbItems  = ['论坛']
            break;
        }
      },

    },

}
</script>

<style  src="./context.css" scoped>

</style>
