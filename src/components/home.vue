<template>
  <div id="home">
    <div class="headBox">
      <div class="headBox_title">教务管理系统</div>
    </div>
    <div class="login">
        <div class="loginBox">
            <div class="loginboxhead">
               请输入账号密码
            </div>
            <div class="inputBox">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号" prop="pass">
                  <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                </el-form-item>
              </el-form>


            </div>
            
        </div>
    </div>
  
  </div> 

</template>

<script>
export default {
  name: 'home',
  data () {
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
    return {
      ruleForm:{
          pass: '',
          checkPass: '',
      },
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
    }
  },
  methods:{
    toContext:function() {
        this.$router.push({path:"/Context"})  
      
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { 
               
        
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:500/login',
                data:{
                  "mailbox":this.ruleForm.pass,
                	"password":this.ruleForm.checkPass
                }
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)  
                if(response.data.code == 1){
                     this.setCookie("mailbox",this.ruleForm.pass)
                    this.$router.push({path:"/Context/Welcome"}) 
                }else if(response.data.code == 2){
                  alert("账号或密码错误！")
                }     //请求成功返回的数据
            }).catch((error) =>{
                console.log(error.request)       //请求失败返回的数据
            })


        } else {
          
            return false;
          }
        });
      },
  }
}
</script>
<style src="./home.css" scoped>

</style>

