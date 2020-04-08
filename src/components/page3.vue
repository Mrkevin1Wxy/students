

<template>
 

  <div id="forum">
    <div class="headBox">
      <div class="headBox_title">论坛</div>
    </div>
    <div class="forum_context">
      <ul>
      <template v-for="item in publish">
          <li :key="item.index" @click="sendId(item)">
              <div class="publish_name">{{item.publish_name}}</div>
              <div class="publish_id">{{item.publish_id}}</div>
               <div class="publish_title">{{item.publish_title}}</div>
               <template v-if="item.publish_msg.length > 10">
                 <div class="publish_msg">{{item.publish_msg.slice(0,10)  + "......"}}</div>
              </template> 
               <template v-if="item.publish_msg.length < 10">
                 <div class="publish_msg">{{item.publish_msg}}</div>
              </template> 
              
          </li>
     
      </template>
      </ul>
    </div>
    <div class="upPublish">
      <el-form :model="publishForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="帖子名称" prop="pass">
          <el-input type="text" v-model="publishForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="帖子标题" prop="checkPass">
          <el-input type="text" v-model="publishForm.title" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="帖子信息" prop="checkText">
         <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="publishForm.textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          
        </el-form-item>
      </el-form>

    </div>
    
  </div>
</template>
<script>
  
  export default {
    data(){

      var validatePass = (rule, value, callback) => {
        if (this.publishForm.name === '') {
          callback(new Error('请输入帖子名称'));
        } else {
        
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.publishForm.title === '') {
          callback(new Error('请输入帖子标题'));
        }else {
          callback();
        }
      };
        var validatePass3 = (rule, value, callback) => {
        if (this.publishForm.textarea === '') {
          callback(new Error('请输入帖子内容'));
        }else {
          callback();
        }
      };
      return {
        publish:[
          
        ],
        mailbox:'',
        publishForm:{
          name:'',
          title:'',
          textarea:''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkText:[
               { validator: validatePass3, trigger: 'blur' }
          ]
          
        }
  
      }
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
              },
              //获取帖子
        getPulish:function(){
          this.$axios({
                          method:'get',
                          url:'http://127.0.0.1:500/forum',
                          data:{
                            
                          }
                      }).then((response) =>{          
                          //console.log(response.data)       //请求成功返回的数据
                          if(response.data !=""){
                          // console.log(response.data)
                          this.publish = response.data.forum_data
                          }
                          
                      
                      }).catch((error) =>{
                          console.log(error)       //请求失败返回的数据
                      }) 
        }   ,   
          //发帖
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.publishForm)
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:500/publish_forum',
                    data:{
                      publish_name:this.publishForm.name,
                      publish_title:this.publishForm.title,
                      publish_message:this.publishForm.textarea
                    }
                }).then((response) =>{   
                  if(response.data.code == 1){
                    this.getPulish()  
                  }
                      
                    console.log(response.data)       //请求成功返回的数据
                }).catch((error) =>{
                    console.log(error)       //请求失败返回的数据
                }) 

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

        sendId:function(item) {
        
          const params = { id: item };
            let routeData = this.$router.resolve({
              path: '/#/Publish'+"?"+item.publish_id,
              query: params,
              params:{id:item}
            });
         
           window.open(routeData.location.hash,"_blank");
         
              }      
     },
     mounted:function (params) {
       this.mailbox = this.getCookie('mailbox')
        if(this.mailbox == ''){
          this.$router.push('/');
       }
       this.getPulish()
       
     }
    
  }
</script>
<style src="./page3.css" scoped>

</style>
