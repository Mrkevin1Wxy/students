<template>
  <div id="personal">
    <div class="headBox">
      <div class="headBox_title">个人中心</div>
    </div>
    <div class="personal_context">
      <div class="context_li">
       <span>姓名：</span> <span>{{personalInfo.name}}</span>
      </div>
      <div class="context_li">
       <span>年龄：</span> <span>{{personalInfo.age}}</span>
      </div>
      <div class="context_li">
         <span>性别：</span>
         <template v-if="personalInfo.sex == '1'">
            <span>男</span>
         </template>
          <template v-if="personalInfo.sex == '2'">
            <span>女</span>
         </template>
         
      </div>
      <div class="context_li">
       <span style="cursor:pointer;">更改密码</span>
      </div>
       <div class="context_li">
       <span>邮箱：</span> <span>{{mailbox}}</span>
      </div>

    </div>
    
  </div>
</template>
<script>
  export default {
    data(){
      return {
        mailbox:'',
        personalInfo:{
          	code:"",
            name:"--",
            age:"--",
            sex:"1",
            diction:"",
            id:"",
            
        }
      }
    },
    created: function () {
       
    },
    methods:{
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
      }   
    },
    mounted:function name(params) {
       this.mailbox = this.getCookie('mailbox')
       if(this.mailbox == ''){
          this.$router.push('/');
       }
        console.log(this.mailbox)
        this.$axios({
                method:'post',
                url:'http://127.0.0.1:500/information',
                data:{
                  "mailbox":this.mailbox,
                }
            }).then((response) =>{          
                console.log(response.data)       //请求成功返回的数据
              if(response.data != ''){
               this.personalInfo = response.data
              }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            }) 
    }
  }
</script>
<style src="./personal.css" scoped>

</style>