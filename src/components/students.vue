<template>
  <div id="students">
    <div class="headBox">
      <div class="headBox_title">
        课程学生
      </div>
    </div>
    <div class="students_list">
      <template v-if="stu_meaages.length > 0">
        <template v-for="item in stu_meaages">
          <div :key="item.index">
            <div class="student_index">{{item.stu_id}}</div>
            <div class="student_name">{{item.sut_name}}</div>
            <div class="student_score" @click="toScore(item.stu_id)">去打分</div>

          </div>

        </template>
        </template>
        <template v-if="stu_meaages ==''">
          <div>没有学生</div>
        </template>
    </div>
 
    <el-dialog
      title="请打分"
      :visible.sync="scoreDialogVisible"
      width="30%">
      <el-form :model="talkForm" status-icon :rules="rules" ref="rulesForm" label-width="40px" class="demo-ruleForm">
          <el-form-item label="分数" prop="checkText">
            <el-input placeholder="请输入分数" v-model="talkForm.textarea"></el-input>
          </el-form-item>
          <el-form-item>
           
            
          </el-form-item>
        </el-form>



      <span slot="footer" class="dialog-footer">
        <el-button @click="scoreDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="submitForm('rulesForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    data(){
        var validatePass3 = (rule, value, callback) => {
        if (this.talkForm.textarea === '') {
          callback(new Error('请输入分数'));
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
         
        },
         postInfo:{},
         stu_meaages:[],
         scoreDialogVisible:false,
         stu_id:'',
         

      }
    },
     methods:{
       //确定打分
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log("dafenle ")
               this.postScore()
              this.scoreDialogVisible = false
              this.talkForm.textarea = ''
                this.$refs.rulesForm.resetFields();
               
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //打分
      postScore:function (params) {
          this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:500/point_student',
                    data:{
                      "stu_id":this.stu_id,
                      "curriculum_id":this.postInfo.id,
                      "score_num":this.talkForm.textarea
                    }
                }).then((response) =>{   
                   console.log(response.data)
                  if(response.data.code == 1){
                   
                  }
                         //请求成功返回的数据
                }).catch((error) =>{
                    console.log(error)       //请求失败返回的数据
                }) 
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
      //查看学生
      searchStudent:function (params) {
        this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:500/see_student',
                    data:{
                      diction:this.postInfo.diction,
	                    curriculum_id:this.postInfo.id,
                    }
                }).then((response) =>{   
                  console.log(response.data)
                  if(response.data.code == 1){
                    
                    this.stu_meaages = response.data.stu_meaages
               
                  }
                         //请求成功返回的数据
                }).catch((error) =>{
                    console.log(error)       //请求失败返回的数据
                }) 
      },
      //去打分
      toScore:function (params) {
        this.scoreDialogVisible = true
        this.stu_id = params
        console.log(this.stu_id,this.postInfo.id)
      }
  
  
     },
     created() {
     
      },
      watch: {
      
      },
     mounted:function () {
       var url = window.location.hash;
       var info = url.substring(url.lastIndexOf('?')+1, url.length);
        console.log(info)
        var obj = {};
        //如果字符串里面存在?
       
          //从url的索引1开始提取字符串
          var str = info.substring(0);
          //如果存在&符号，则再以&符号进行分割
          var arr = str.split("&");
          //遍历数组
          for(var i=0; i<arr.length; i++){
            
            obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
          }
        this.postInfo = obj
        console.log(this.postInfo);

        this.searchStudent()
     }
    
  }
</script>
<style src="./students.css" scoped>

</style>