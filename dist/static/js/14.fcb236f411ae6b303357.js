webpackJsonp([14],{"VZ/Q":function(t,e,a){var n=a("xGFq");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("8bSs")("353a41c6",n,!0)},jSAi:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-container"},[a("el-form",{attrs:{inline:!0,model:t.formOptions,size:"small"}},[a("el-form-item",[a("el-select",{staticStyle:{width:"100px"},model:{value:t.formOptions.timeType,callback:function(e){t.$set(t.formOptions,"timeType",e)},expression:"formOptions.timeType"}},[a("el-option",{attrs:{label:"日",value:1}}),t._v(" "),a("el-option",{attrs:{label:"月",value:2}})],1)],1),t._v(" "),1===t.formOptions.timeType?a("el-form-item",[a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:t.dateChange},model:{value:t.formOptions.timeValue,callback:function(e){t.$set(t.formOptions,"timeValue",e)},expression:"formOptions.timeValue"}})],1):a("el-form-item",[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"month",align:"right",placeholder:"开始月份","value-format":"yyyy-MM"},on:{change:t.startChange},model:{value:t.formOptions.startMonth,callback:function(e){t.$set(t.formOptions,"startMonth",e)},expression:"formOptions.startMonth"}}),t._v(" "),a("span",{staticClass:"text-center"},[t._v(" -- ")]),t._v(" "),a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"month",align:"right",placeholder:"结束月份","value-format":"yyyy-MM"},on:{change:t.endChange},model:{value:t.formOptions.endMonth,callback:function(e){t.$set(t.formOptions,"endMonth",e)},expression:"formOptions.endMonth"}})],1),t._v(" "),a("el-form-item",[a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"组织"},model:{value:t.formOptions.organizationId,callback:function(e){t.$set(t.formOptions,"organizationId",e)},expression:"formOptions.organizationId"}},t._l(t.orgList,function(t){return a("el-option",{key:t.organizationId,attrs:{label:t.organizationName,value:t.organizationId}})}))],1),t._v(" "),a("el-form-item",[a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"城市"},model:{value:t.formOptions.cityId,callback:function(e){t.$set(t.formOptions,"cityId",e)},expression:"formOptions.cityId"}},t._l(t.cityList,function(t){return a("el-option",{key:t.cityId,attrs:{label:t.cityName,value:t.cityId}})}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleSearch}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-upload"},on:{click:t.handleExport}},[t._v("导出")])],1)],1),t._v(" "),a("GridUnit",{ref:"refGridUnit",attrs:{columns:t.colModels,url:t.url,formOptions:t.params,height:t.tableHeight,"show-summary":"",showPagination:!1}})],1)},staticRenderFns:[]}},kW7y:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("IHPB"),i=a.n(n),o=a("U4Ig"),r=a.n(o),s=a("0xDb"),l=a("53J+");e.default={name:"data_contract",components:{GridUnit:r.a},filters:{},data:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth(),n=t.getDate();return{tableHeight:300,cityList:[],orgList:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},formOptions:{timeType:1,timeValue:[Object(s.b)(new Date(e,a,n),"{y}-{m}-{d}"),Object(s.b)(new Date(e,a,n),"{y}-{m}-{d}")],startMonth:"",endMonth:"",organizationId:"",cityId:""},params:{startDateStr:"",endDateStr:"",cityId:"",organizationId:""},colModels:[{prop:"organizationName",label:"组织",sortable:!0},{prop:"createTime",label:"时间",width:120,filter:"parseTime",sortable:!0},{prop:"contractAmount",label:"电子合同份数",sortable:!0}],url:"/tongji/data/queryLeaseContract"}},created:function(){var t=Object(s.a)(this.formOptions);this.params.timeType=t.timeType,this.params.startDateStr=t.timeValue[0],this.params.endDateStr=t.timeValue[1],this.getCityList(),this.getOrgsList()},mounted:function(){var t=this;this.$nextTick(function(){var e=t.$refs.refGridUnit.$el.offsetTop||140,a=document.body.clientHeight-e-5-20;t.tableHeight=a>300?a:300,window.onresize=function(){return a=document.body.clientHeight-e-5-20,void(t.tableHeight=t.tableHeight=a>300?a:300)}})},computed:{},methods:{handleSearch:function(){this.params.timeType=this.formOptions.timeType,this.params.cityId=this.formOptions.cityId,this.params.organizationId=this.formOptions.organizationId,this.$refs.refGridUnit.searchHandler()},dateChange:function(t){this.params.startDateStr=t[0],this.params.endDateStr=t[1]},startChange:function(t){this.params.startDateStr=t},endChange:function(t){this.params.endDateStr=t},getCityList:function(){var t=this;Object(l.h)().then(function(e){t.cityList=e.dataObject})},getOrgsList:function(){var t=this;Object(l.i)().then(function(e){t.orgList=e.dataObject})},handleExport:function(){var t=this;this.downloadLoading=!0,Object(l.a)(this.params).then(function(e){e.dataObject.map(function(t,e){t.index=1*e+1}),Promise.all([a.e(17),a.e(18)]).then(function(){var n=a("zWO4").export_json_to_excel,o=t.colModels.map(function(t){return t.label}),r=t.colModels.map(function(t){return t.prop}),s=t.formatJson(["index"].concat(i()(r)),e.dataObject||[]);n(["序号"].concat(i()(o)),s,"合同数据"+t.params.startDateStr+" - "+t.params.endDateStr,"合同数据"+t.params.startDateStr+" - "+t.params.endDateStr),t.downloadLoading=!1}.bind(null,a)).catch(a.oe)})},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},xGFq:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,"",""])},"y/L8":function(t,e,a){var n=a("Alxp")(a("kW7y"),a("jSAi"),function(t){a("VZ/Q")},null,null);t.exports=n.exports}});