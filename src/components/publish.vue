<template>
  <div id="publish">
    <div class="headBox">
      <div class="headBox_title">
        论坛详情
      </div>
    </div>
    <div class="publish_info">
      <template>
        <div class="publish_info_title">
          {{publish_info.forum_title}}

        </div>
        <div class='publish_info_context'>
          {{publish_info.forum_message}}
        </div>
       
      </template>
      <template v-for="item in publish_info.invitation_data">
        <div :key="item.index" class="talkList">
          <span>{{item.invitation_name}}说:</span>
           <span>{{item.invitation_message}}</span>
        </div>

      </template>

    </div>
    <div class="talk">
        <el-form :model="talkForm" status-icon :rules="rules" ref="rulesForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="评论内容" prop="checkText">
          <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="talkForm.textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('rulesForm')">提交</el-button>
            
          </el-form-item>
        </el-form>
    </div>
    
  </div>
</template>
<script>

  export default {
    data(){
        var validatePass3 = (rule, value, callback) => {
        if (this.talkForm.textarea === '') {
          callback(new Error('请输入帖子内容'));
        }else {
          callback();
        }
      };
      return {
          publish_id:'',
          userId:'',
          publish_info:'',
          talkForm:{
              textarea:''
          },

          rules: {
        
          checkText:[
               { validator: validatePass3, trigger: 'blur' }
          ]
          
        }
      }
    },
     methods:{
       //提交评论
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
            
               this.posiInfo()

            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
      //发表评论
      posiInfo:function (params) {
         this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:500/forum_comment',
                    data:{
                        publish_id:this.publish_id,
                        id:this.userId,
                        invitation_message:this.talkForm.textarea,
                    }
                }).then((response) =>{   
                  if(response.data.code == 1){
                      this.talkForm.textarea = ''
             
                       this.$refs.rulesForm.resetFields();
                       this.getPublishInfo()
                  }
                      
                    console.log(response.data)       //请求成功返回的数据
                }).catch((error) =>{
                    console.log(error)       //请求失败返回的数据
                }) 
      },
       getPublishInfo:function(params) {
         this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:500/forum_message',
                    data:{
                     	publish_id:this.publish_id,
                    }
                }).then((response) =>{   
                  if(response.data.code == 1){
                    console.log(response.data)
                    this.publish_info =  response.data 
                  }
                         //请求成功返回的数据
                }).catch((error) =>{
                    console.log(error)       //请求失败返回的数据
                }) 
       }
     },
     created() {
     
      },
      watch: {
      
      },
     mounted:function () {
  
      var url = window.location.hash;
      this.publish_id = url.substring(url.lastIndexOf('?')+1, url.length);
      this.getPublishInfo()
      this.userId = this.getCookie("publishId")
      
     }
    
  }
</script>
<style src="./publish.css" scoped>

</style>