<template>
  <div id="course"> 
    <div class='headBox'>
      <div class="headBox_title">
        课程
      </div>
    </div>
    <div class="course_context">
      <el-table :data="curriculum" :stripe="true" id="curriculumTable">
        <el-table-column   label="课程名称" align="center"  header-align="center" min-width="100" >
							<template slot-scope="scope">
									<span >{{scope.row.curriculum_name}}</span>
							</template>
				</el-table-column>
         <el-table-column   label="学习人数" align="center"  header-align="center" min-width="100" >
							<template slot-scope="scope" >
									<span >{{scope.row.curriculum_num}}</span>
							</template>
				</el-table-column>
        <el-table-column  v-if="personalInfo.diction == '2'|| personalInfo.diction =='3'" label="查看学生" align="center"  header-align="center" min-width="100" >
					
           <template slot-scope="scope">
                   <span style="cursor:pointer;" @click="toStudents(scope.row.curriculum_id,personalInfo.diction)">查看学生</span>
							</template>
				</el-table-column>
        <el-table-column  v-if="personalInfo.diction == '2'" label="创建作业" align="center"  header-align="center" min-width="100" >
          <template slot-scope="scope">
                   <span style="cursor:pointer;" @click="toBulidHomework(scope.row.curriculum_id)">去创建</span>
							</template>
				</el-table-column>
         <el-table-column  v-if="personalInfo.diction == '2'" label="创建考试" align="center"  header-align="center" min-width="100" >
             <template slot-scope="scope">
              <span style="cursor:pointer;" @click="toBulidTest(scope.row.curriculum_id)">去创建</span>
              </template>
      	</el-table-column>
         <el-table-column  v-if="personalInfo.diction == '1'" label="老师" align="center"  header-align="center" min-width="100" >
            <template slot-scope="scope" >
									<span >{{scope.row.teache_name}}</span>
							</template>
				</el-table-column>
         <el-table-column  v-if="personalInfo.diction == '1'" label="成绩" align="center"  header-align="center" min-width="100" >
           
              <template slot-scope="scope" >
									<span >{{scope.row.score}}</span>
							</template>
				</el-table-column>
        
      </el-table>
    </div>
    <el-dialog title="创建作业" :visible.sync="homeworkDialogVisible"  width="30%" class="homeworkDialog">
      <el-form :model="homeForm" status-icon :rules="rules" ref="ssForm" label-width="40px" class="demo-ruleForm">
          <el-form-item label="分数" prop="checkText">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入作业内容"
                v-model="homeForm.textareaInfo">
              </el-input>
          </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="homeworkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="homeworkAssign('ssForm')">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog title="创建考试" :visible.sync="testDialogVisible"  width="30%" class="testDialog">
        <el-form :model="testForm" status-icon :rules="rules2" ref="ss2Form" label-width="40px" class="demo-ruleForm">
          <el-form-item label="考试" prop="checkText2">
             <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入考试内容"
              v-model="testForm.textareaTest">
            </el-input>
          </el-form-item>
        
      </el-form>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="testDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="testAssign('ss2Form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name:'course',
    data(){
       var validatePass2 = (rule, value, callback) => {
        if (this.testForm.textareaTest === '') {
          callback(new Error('请输入考试内容'));
        }else {
          callback();
        }
      };
       var validatePass3 = (rule, value, callback) => {
        if (this.homeForm.textareaInfo === '') {
          callback(new Error('请输入作业内容'));
        }else {
          callback();
        }
      };
      return {
        mailbox:'',
        personalInfo:{
          	code:"",
            name:"--",
            age:"--",
            sex:"--",
            diction:3,//1:学生 2:老师 3:助教
            id:"", 
        },//个人信息
        curriculum:[
            {code:"",
            curriculum_name:'',//课程名称
            curriculum_num:'',//学习人数,
            curriculum_id:'',//课程id 
            score:"",//分数
            teache_name:"",},//老师名称}   
          
        ],//课程
        userCode:'',
        homeworkDialogVisible:false,
        testDialogVisible:false,
        homeForm:{
          textareaInfo:'',//布置作业
        },
        testForm:{
          textareaTest:'',//布置考试
        },
        
        rules:{
        
          checkText:[
               { validator: validatePass3, trigger: 'blur' }
          ]
         
        },
        rules2:{
            checkText2:[
               { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    create:function(){
      _self = this
    } , 
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
      toStudents:function(item,id){
          console.log(item,id)
          var path = '/#/Students'+"?"+"id="+item +"&"+"diction="+id
          console.log(path)
            let routeData = this.$router.resolve({
              path: path,
            });
         
           window.open(routeData.location.hash,"_blank");
      },
      //获取课程
      getCurriculum:function(){
        this.$axios({
                method:'post',
                url:'http://127.0.0.1:500/curriculum',
                data:{
                  "diction":this.personalInfo.diction+'',
          	      "id":this.personalInfo.id
                }
            }).then((response) =>{   
              //console.log(this.personalInfo.diction,this.personalInfo.id)       
                console.log(response.data)       //请求成功返回的数据
                   if(response.data.curriculum_message.length > 0){
                    this.curriculum = response.data.curriculum_message
                       
                   }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            }) 
      },
      toBulidHomework:function(scope) {
        console.log(scope)
        this.homeworkDialogVisible = true
      },
      toBulidTest:function (scope) {
        console.log(scope)
        this.testDialogVisible = true
      },
      homeworkAssign:function (formName) {
        
          this.$refs[formName].validate((valid) => {
            if (valid) {
              
              this.homeworkDialogVisible = false
              this.homeForm.textareaInfo = ''
              this.$refs.ssForm.resetFields();
              
               
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        
      },
      testAssign:function (formName) {
        
        
          this.$refs[formName].validate((valid) => {
            if (valid) {
              
             this.testDialogVisible = false
              this.testForm.textareaTest = ''
              this.$refs.ss2Form.resetFields();
              
               
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      }
    },
    mounted:function name(params) {
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
                  this.$nextTick(function(){
                    //console.log(this)
                    this.getCurriculum()
                  })
                }
                
            
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            }) 
    }

  }
</script>
<style src="./course.css" scoped>

</style>