webpackJsonp([2],{"2VWI":function(e,t,r){var o=r("fiFg");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("8bSs")("0c26e876",o,!0)},E4LH:function(e,t,r){"use strict";t.a=function(e){return/^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/.test(e)}},IDn1:function(e,t,r){var o=r("Alxp")(r("v+Ka"),r("Rv0w"),function(e){r("2VWI")},null,null);e.exports=o.exports},Rv0w:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"model-search text-right",staticStyle:{"margin-bottom":"20px"}},[r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},nativeOn:{click:function(t){e.handleAdd(t)}}},[e._v("新增账号")])],1),e._v(" "),r("GridUnit",{ref:"refGridUnit",attrs:{columns:e.colModels,url:e.url,showPagination:!1,height:e.tableHeight},scopedSlots:e._u([{key:"handle",fn:function(t){return[r("el-button-group",[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},nativeOn:{click:function(r){e.editUserInfo(t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{type:"warning",icon:"el-icon-refresh",size:"small"},nativeOn:{click:function(r){e.resetUserPsw(t.row)}}},[e._v("密码重置")]),e._v(" "),1!==t.row.isAdmin?r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},nativeOn:{click:function(r){e.deleteUser(t.row)}}},[e._v("删除")]):e._e()],1)]}}])}),e._v(" "),r("div",{staticClass:"dialog-info"},[r("el-dialog",{attrs:{title:e.isEdit?"编辑账号":"新增账号",visible:e.layer_showInfo,width:"600px"},on:{"update:visible":function(t){e.layer_showInfo=t},close:e.dialogClose}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,size:"small","status-icon":"",rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"nickName"}},[r("el-input",{model:{value:e.ruleForm.nickName,callback:function(t){e.$set(e.ruleForm,"nickName",e._n(t))},expression:"ruleForm.nickName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[r("el-input",{model:{value:e.ruleForm.mobile,callback:function(t){e.$set(e.ruleForm,"mobile",e._n(t))},expression:"ruleForm.mobile"}})],1),e._v(" "),e.isEdit?e._e():r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),e._v(" "),e.isEdit?e._e():r("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[r("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.layer_showInfo=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleSaveData}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]}},TJ0a:function(e,t,r){(e.exports=r("BkJT")(!1)).push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},ctMr:function(e,t,r){var o=r("TJ0a");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("8bSs")("ffdeb2fc",o,!0)},fiFg:function(e,t,r){(e.exports=r("BkJT")(!1)).push([e.i,"",""])},"v+Ka":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("aA9S"),i=r.n(o),s=(r("ctMr"),{bind:function(e,t){e.addEventListener("click",function(r){var o=i()({},t.value),s=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},o),n=s.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var a=n.getBoundingClientRect(),l=n.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(a.width,a.height)+"px",n.appendChild(l)),s.type){case"center":l.style.top=a.height/2-l.offsetHeight/2+"px",l.style.left=a.width/2-l.offsetWidth/2+"px";break;default:l.style.top=r.pageY-a.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=r.pageX-a.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=s.color,l.className="waves-ripple z-active",!1}},!1)}}),n=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(n)),s.install=n;var a=s,l=r("Vo7i");function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(l.a)("user/delete",e)}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(l.a)("user/add",e)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(l.a)("user/updateUser",e)}var f=r("E4LH"),m=r("U4Ig"),p=r.n(m);t.default={name:"userList",directives:{waves:a},components:{GridUnit:p.a},data:function(){var e=this;return{url:"user/findAll",colModels:[{prop:"nickName",label:"用户名"},{prop:"userName",label:"手机号码",width:180},{prop:"isAdmin",label:"权限角色",render:function(e){return 1===e.isAdmin?"超级管理员":"普通用户"}},{prop:"createTime",label:"创建时间",width:180,filter:"parseTime"},{prop:"modifyTime",label:"修改时间",width:180,filter:"parseTime"},{label:"操作",slotName:"handle",width:270,fixed:"right"}],tableHeight:300,layer_showInfo:!1,isEdit:!1,ruleForm:{nickName:"",mobile:"",password:"",checkPass:""},rules:{password:[{required:!0,trigger:"blur",validator:function(t,r,o){r?r.length<6?o(new Error("密码不能小于6位")):(e.ruleForm.checkPass||e.$refs.ruleForm.validateField("checkPass"),o()):o(new Error("请输入密码"))}}],checkPass:[{required:!0,trigger:"blur",validator:function(t,r,o){r?r!==e.ruleForm.password?o(new Error("两次输入密码不一致!")):o():o(new Error("请再次输入密码"))}}],mobile:[{required:!0,trigger:"blur",validator:function(e,t,r){Object(f.a)(t)?r():r(new Error("请输入正确的手机号"))}}]}}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.$refs.refGridUnit.$el.offsetTop||140,r=document.body.clientHeight-t-5-20;e.tableHeight=r>300?r:300,window.onresize=function(){return r=document.body.clientHeight-t-5-20,void(e.tableHeight=e.tableHeight=r>300?r:300)}})},computed:{},methods:{editUserInfo:function(e){this.layer_showInfo=!0,this.isEdit=!0,this.ruleForm.nickName=e.nickName,this.ruleForm.mobile=e.userName,this.ruleForm.userId=e.userId},handleAdd:function(){this.layer_showInfo=!0,this.isEdit=!1,this.$refs.ruleForm&&this.$refs.ruleForm.clearValidate()},dialogClose:function(){this.ruleForm={},this.$refs.ruleForm.resetFields()},resetUserPsw:function(e){var t=this;this.$confirm("此操作将重置该账号初始密码：123456, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.saveData(d,{userId:e.userId,password:"123456"},1===e.isAdmin?"toLogin":"")}).catch(function(){})},deleteUser:function(e){var t=this;this.$confirm("此操作将永久删除该账号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.saveData(c,{userId:e.userId})}).catch(function(){})},saveData:function(e,t,r){var o=this;e(t).then(function(e){if(o.layer_showInfo=!1,"toLogin"===r)return o.$store.dispatch("LogOut").then(function(){location.reload()}),!1;o.$refs.refGridUnit.searchHandler(),o.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})},handleSaveData:function(){var e=this,t=this.isEdit?d:u;this.$refs.ruleForm.validate(function(r){if(!r)return console.log("error submit!!"),!1;e.saveData(t,{userId:e.ruleForm.userId,nickName:e.ruleForm.nickName,userName:e.ruleForm.mobile,password:e.ruleForm.password})})}}}}});