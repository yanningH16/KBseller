webpackJsonp([12],{"1kS7":function(t,n){n.f=Object.getOwnPropertySymbols},"8gff":function(t,n,e){"use strict";function i(t){e("e+uG")}Object.defineProperty(n,"__esModule",{value:!0});var a=e("ZmkE"),o=e("ERD7"),s=e("VU/8"),r=i,c=s(a.a,o.a,!1,r,"data-v-f6424c52",null);n.default=c.exports},BO1k:function(t,n,e){t.exports={default:e("fxRn"),__esModule:!0}},Dd8w:function(t,n,e){"use strict";n.__esModule=!0;var i=e("woOf"),a=function(t){return t&&t.__esModule?t:{default:t}}(i);n.default=a.default||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}},ERD7:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"wrap"},[e("div",{staticClass:"content"},[e("h3",[t._v("商家绑定店铺")]),t._v(" "),e("div",{staticClass:"line"}),t._v(" "),e("ul",{staticClass:"content_info"},[e("li",{staticStyle:{"margin-bottom":"20px"}},[e("span",[t._v("所属平台  ")]),t._v(" "),e("el-input",{staticStyle:{width:"384px"},attrs:{disabled:"",placeholder:"请输入内容"},model:{value:t.input8,callback:function(n){t.input8=n},expression:"input8"}})],1),t._v(" "),4!=this.$route.query.number?e("li",{staticClass:"site"},[e("span",[t._v("店铺首页链接  ")]),t._v(" "),e("el-input",{staticStyle:{width:"384px"},attrs:{placeholder:"请输入内容"},model:{value:t.input,callback:function(n){t.input=n},expression:"input"}}),t._v(" "),e("span",{staticClass:"shopInfo",on:{click:t.getShopInfo}},[t._v("读取店铺信息")])],1):t._e(),t._v(" "),e("li",{staticClass:"shopName"},[e("span",[t._v("店铺名称  ")]),t._v(" "),e("el-input",{staticStyle:{width:"384px"},attrs:{placeholder:"请输入内容"},model:{value:t.input1,callback:function(n){t.input1=n},expression:"input1"}})],1),t._v(" "),t._m(0),t._v(" "),e("li",{staticClass:"addAddress"},[e("i",{staticClass:"el-icon-circle-plus",class:{activeColor:t.pull},staticStyle:{color:"rgba(23,159,255,1)",cursor:"pointer"},on:{click:t.add}},[t._v(" 添加发货地址")])]),t._v(" "),t._l(t.addArr,function(n,i){return e("li",{key:i,staticClass:"addContent"},[e("div",[t._v("发货地址:\n          "),e("span",[t._v(t._s(n.itemCode+" "+n.itemCity+" "+n.itemZone))])]),t._v(" "),e("div",{staticStyle:{"margin-top":"10px"}},[t._v("发货人姓名:\n          "),e("span",[t._v(t._s(n.sendName))])]),t._v(" "),e("div",{staticStyle:{"margin-top":"10px"}},[t._v("街道地址:\n          "),e("span",[t._v(t._s(n.jieName))])]),t._v(" "),e("div",{staticStyle:{"margin-top":"10px"}},[t._v("发货电话:\n          "),e("span",[t._v(t._s(n.phone))])]),t._v(" "),e("div",{staticClass:"line"})])}),t._v(" "),e("li",{directives:[{name:"show",rawName:"v-show",value:t.pull,expression:"pull"}],staticClass:"pullDown"},[e("el-form",[e("el-form-item",{attrs:{label:"发货人姓名"}},[e("el-input",{staticStyle:{width:"384px"},model:{value:t.sendName,callback:function(n){t.sendName=n},expression:"sendName"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"发货电话"}},[e("el-input",{staticStyle:{width:"384px"},model:{value:t.phone,callback:function(n){t.phone=n},expression:"phone"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"发货地址"}},[e("el-select",{attrs:{placeholder:"省份"},on:{change:t.provinceChange},model:{value:t.itemCode,callback:function(n){t.itemCode=n},expression:"itemCode"}},t._l(t.provinces,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:t}})})),t._v(" "),e("el-select",{staticStyle:{"margin-left":"12px","margin-right":"12px"},attrs:{placeholder:"市"},on:{change:t.cityChange},model:{value:t.itemCity,callback:function(n){t.itemCity=n},expression:"itemCity"}},t._l(t.city,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:t}})})),t._v(" "),e("el-select",{attrs:{placeholder:"区"},on:{change:t.zoneChange},model:{value:t.itemZone,callback:function(n){t.itemZone=n},expression:"itemZone"}},t._l(t.zone,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:t}})}))],1),t._v(" "),e("el-form-item",{attrs:{label:"详细地址"}},[e("el-input",{staticStyle:{width:"384px"},model:{value:t.jieName,callback:function(n){t.jieName=n},expression:"jieName"}})],1)],1),t._v(" "),e("button",{staticClass:"btn",on:{click:t.save}},[t._v("保存")]),t._v(" "),e("button",{staticClass:"btn",staticStyle:{background:"gray"},on:{click:t.cencel}},[t._v("取消")])],1),t._v(" "),e("li",{staticClass:"clickBtn"},[e("button",{staticClass:" btn",staticStyle:{"margin-bottom":"60px"},on:{click:t.addSure}},[t._v("确认绑定")]),t._v(" "),e("router-link",{attrs:{to:{name:"shopAdminList"}}},[e("button",{staticClass:" btnBlack",staticStyle:{"margin-bottom":"60px"}},[t._v("取消")])])],1)],2)])])},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("li",{staticClass:"addTititle"},[t._v("发货地址\n        "),e("span",[t._v("请真实填写发货地址（与淘宝／京东等渠道后台的发货地址一致），否则无法正常匹配揽件公司")])])}],o={render:i,staticRenderFns:a};n.a=o},NpIQ:function(t,n){n.f={}.propertyIsEnumerable},R4wc:function(t,n,e){var i=e("kM2E");i(i.S+i.F,"Object",{assign:e("To3L")})},To3L:function(t,n,e){"use strict";var i=e("lktj"),a=e("1kS7"),o=e("NpIQ"),s=e("sB3e"),r=e("MU5D"),c=Object.assign;t.exports=!c||e("S82l")(function(){var t={},n={},e=Symbol(),i="abcdefghijklmnopqrst";return t[e]=7,i.split("").forEach(function(t){n[t]=t}),7!=c({},t)[e]||Object.keys(c({},n)).join("")!=i})?function(t,n){for(var e=s(t),c=arguments.length,p=1,d=a.f,A=o.f;c>p;)for(var l,f=r(arguments[p++]),u=d?i(f).concat(d(f)):i(f),m=u.length,h=0;m>h;)A.call(f,l=u[h++])&&(e[l]=f[l]);return e}:c},V3tA:function(t,n,e){e("R4wc"),t.exports=e("FeBl").Object.assign},ZmkE:function(t,n,e){"use strict";var i=e("BO1k"),a=e.n(i),o=e("Dd8w"),s=e.n(o),r=e("SJI6");e.n(r);n.a={name:"shopAdmin",data:function(){return{input8:3===this.$route.query.number?"京东":1===this.$route.query.number?"淘宝":2===this.$route.query.number?"天猫":4===this.$route.query.number?"拼多多":"其它",disable:!1,active:!0,isCanUpload:!1,shopType:[],provinces:[],itemCode:null,city:[],itemCity:null,zone:[],itemZone:null,provincesCode:"",cityCode:"",zoneCode:"",jieName:"",phone:"",sendName:"",input:"",input1:"",value:"",className:"",valueCode:"",addArr:[],saveAddressId:[],haveAdd:!1,pull:!1,shopArd:""}},computed:s()({},Object(r.mapGetters)(["userInfo"])),created:function(){this.Provinces()},methods:s()({getShopInfo:function(){var t=this;if(""===this.input)return this.$message({message:"请正确填写店铺链接,不能为空",type:"warning"}),!1;this.$ajax.post("/api/seller/shopAddress/getShopUrlInfo",{shopUrl:this.input,shopType:this.$route.query.number}).then(function(n){var e=n.data;"200"===e.code?(t.input1=e.data.title,""!==e.data.title&&""!==e.data.wangwangId||t.$message({message:"暂无无法读取店铺信息,请手动填写",type:"warning"})):t.$message({message:n.data.message,type:"warning"})}).catch(function(n){t.$message.error("服务器错误！")})},add:function(){this.pull=!this.pull},cencel:function(){this.pull=!1},save:function(){var t=this;if(""===this.itemCode||""===this.itemCity||""===this.itemZone||""===this.jieName||""===this.phone||""===this.sendName)return this.$message({message:"请正确填写信息",type:"warning"}),!1;this.$ajax.post("/api/seller/shopAddress/addAddress",{sellerAccountId:this.userInfo.sellerAccountId,senderName:this.sendName,senderTelephone:this.phone,province:this.itemCode,provinceCode:this.provincesCode,city:this.itemCity,cityCode:this.cityCode,region:this.itemZone,regionCode:this.zoneCode,address:this.jieName}).then(function(n){var e=n.data;"200"===e.code?(t.$message({message:"添加成功",type:"success"}),t.saveAddressId.push(e.data.shipAddressId)):t.$message({message:e.message,type:"error"})}).catch(function(){t.$message({message:"网络错误,刷新试试",type:"error"})}),this.addArr.push({itemCode:this.itemCode,itemCity:this.itemCity,itemZone:this.itemZone,sendName:this.sendName,jieName:this.jieName,phone:this.phone,pCode:this.provincesCode,cCode:this.cityCode,zCode:this.zoneCode}),this.jieName="",this.phone="",this.pull=!1},addSure:function(){var t=this;if(""===this.input1||0===this.saveAddressId.length)return this.$message({message:"请正确填写所有内容,不能留空哦...",type:"warning"}),!1;this.$ajax.post("/api/seller/shopAddress/addShop",{sellerAccountId:this.userInfo.sellerAccountId,shopType:this.$route.query.number,shopName:this.input1,shopTyeDetail:this.input8,productUrl:this.input,shipAddressIds:this.saveAddressId.join(",")}).then(function(n){"200"===n.data.code?(t.$message({message:"店铺添加成功",type:"success"}),t.$route.query.toBindShop?window.history.go(-1):3===t.$route.query.number?t.$router.push({name:"shopAdminList",query:{activeName:"first"}}):1===t.$route.query.number?t.$router.push({name:"shopAdminList",query:{activeName:"two"}}):2===t.$route.query.number?t.$router.push({name:"shopAdminList",query:{activeName:"three"}}):4===t.$route.query.number?t.$router.push({name:"shopAdminList",query:{activeName:"four"}}):5===t.$route.query.number&&t.$router.push({name:"shopAdminList",query:{activeName:"five"}})):t.$message({message:n.data.message,type:"warning"})}).catch(function(n){t.$message.error("服务器错误！")})},provinceChange:function(){this.getCity(),this.provincesCode=this.itemCode.code,this.itemCode=this.itemCode.name,this.itemCity=null,this.itemZone=null},cityChange:function(){this.getZone(),this.cityCode=this.itemCity.code,this.itemCity=this.itemCity.name,this.itemZone=null},zoneChange:function(){this.zoneCode=this.itemZone.code,this.itemZone=this.itemZone.name},valueChange:function(){this.valueCode=this.value.id,this.className=this.value.className,this.value=this.value.className},Provinces:function(){var t=this;this.$ajax.post("/api/config/location/getProvinceList",{}).then(function(n){var e=n.data;if("200"===e.code){var i=[],o=!0,s=!1,r=void 0;try{for(var c,p=a()(e.data);!(o=(c=p.next()).done);o=!0){var d=c.value,A={id:d.id,name:d.name,code:d.code};i.push(A)}}catch(t){s=!0,r=t}finally{try{!o&&p.return&&p.return()}finally{if(s)throw r}}t.provinces=i}else t.$message({message:n.data.message,type:"warning"})}).catch(function(n){t.$message.error("服务器错误！")})},getCity:function(){var t=this;this.$ajax.post("/api/config/location/getCityListByProvinceCode",{provinceCode:this.itemCode.code}).then(function(n){var e=n.data;if("200"===e.code){var i=[],o=!0,s=!1,r=void 0;try{for(var c,p=a()(e.data);!(o=(c=p.next()).done);o=!0){var d=c.value,A={id:d.id,name:d.name,code:d.code,provinceCode:d.provinceCode};i.push(A)}}catch(t){s=!0,r=t}finally{try{!o&&p.return&&p.return()}finally{if(s)throw r}}t.city=i}else t.$message({message:n.data.message,type:"warning"})}).catch(function(n){t.$message.error("服务器错误！")})},getZone:function(){var t=this;this.$ajax.post("/api/config/location/getAreaListByCityCode",{cityCode:this.itemCity.code}).then(function(n){var e=n.data;if("200"===e.code){var i=[],o=!0,s=!1,r=void 0;try{for(var c,p=a()(e.data);!(o=(c=p.next()).done);o=!0){var d=c.value,A={id:d.id,name:d.name,code:d.code,cityCode:d.cityCode};i.push(A)}}catch(t){s=!0,r=t}finally{try{!o&&p.return&&p.return()}finally{if(s)throw r}}t.zone=i}else t.$message({message:n.data.message,type:"warning"})}).catch(function(n){t.$message.error("服务器错误！")})},remove:function(t){this.addArr.splice(t,1)},cancel:function(){},handSelect:function(t){for(var n=[],e=0;e<t.length;e++){var i={shop:t[e].shipAddressId};n.push(i.shop)}this.saveAddressId=n},selectAll:function(){}},Object(r.mapActions)(["setUserInfo"]))}},"e+uG":function(t,n,e){var i=e("zTMg");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("5dae27de",i,!0)},fxRn:function(t,n,e){e("+tPU"),e("zQR9"),t.exports=e("g8Ux")},g8Ux:function(t,n,e){var i=e("77Pl"),a=e("3fs2");t.exports=e("FeBl").getIterator=function(t){var n=a(t);if("function"!=typeof n)throw TypeError(t+" is not iterable!");return i(n.call(t))}},woOf:function(t,n,e){t.exports={default:e("V3tA"),__esModule:!0}},zTMg:function(t,n,e){n=t.exports=e("FZ+f")(!0),n.push([t.i,".wrap[data-v-f6424c52]{padding:0 20px}.wrap .shop[data-v-f6424c52]{background:#fff;height:36px;line-height:36px;padding-left:20px;font-size:14px;color:#3c3c3c}.wrap .shop .gray[data-v-f6424c52]{color:#898989}.wrap .content[data-v-f6424c52]{background:#fff;margin-top:24px;padding-left:20px;padding-right:20px}.wrap .content h3[data-v-f6424c52]{padding-top:40px;font-size:16px;color:#444}.wrap .content .line[data-v-f6424c52]{height:1px;background:#dedede;margin-top:16px}.wrap .content .content_info[data-v-f6424c52]{margin-top:10px;font-size:14px;color:#444;text-align:center;margin-top:20px;min-width:800px;max-width:1100px}.wrap .content .content_info .site[data-v-f6424c52]{margin-left:154px}.wrap .content .content_info .shopName[data-v-f6424c52]{margin-top:20px}.wrap .content .content_info .addTititle[data-v-f6424c52]{margin-top:20px;margin-left:120px}.wrap .content .content_info .addTititle span[data-v-f6424c52]{color:#ff2933;font-size:12px}.wrap .content .content_info .type[data-v-f6424c52]{margin-top:20px;margin-left:-22px}.wrap .content .content_info .shopInfo[data-v-f6424c52]{display:inline;width:164px;height:36px;border:1px solid #ff3341;color:#ff3341;padding:10px 40px;margin-left:12px;cursor:pointer}.wrap .content .content_info .pic[data-v-f6424c52]{margin-top:20px}.wrap .content .content_info .pic .pic_admin[data-v-f6424c52]{margin-left:-418px;margin-top:13px;display:inherit}.wrap .content .content_info .pic .avatar-uploader[data-v-f6424c52]{border:1px solid #d9d9d9;cursor:pointer;width:180px;height:180px;background:#fafafa;display:inline-block;margin-top:-14px;margin-left:-127px}.wrap .content .content_info .pic .el-icon-plus[data-v-f6424c52]{font-size:48px;line-height:180px}.wrap .content .content_info .addAddress[data-v-f6424c52]{margin-top:25px;margin-left:-50px}.wrap .content .content_info .addAddress em[data-v-f6424c52]{margin-left:200px}.wrap .content .content_info .addAddress .activeColor[data-v-f6424c52]{background:rgba(0,0,0,.1);border-radius:5px}.wrap .content .content_info .accountTab[data-v-f6424c52]{border:1px solid #d9d9d9;width:50%;margin-left:28%;margin-top:20px}.wrap .content .content_info .clickBtn[data-v-f6424c52]{margin-top:50px}.wrap .content .content_info .pullDown[data-v-f6424c52]{width:480px;margin-top:20px;padding:40px;display:inline-block;-webkit-box-shadow:0 1px 5px rgba(0,0,0,.2);box-shadow:0 1px 5px rgba(0,0,0,.2);margin-left:80px}.wrap .content .content_info .person[data-v-f6424c52]{margin-top:32px;margin-left:-80%;font-size:14px;color:#444}.wrap .content .content_info .personInfo[data-v-f6424c52]{margin-top:60px;padding-bottom:60px}.wrap .content .content_info .addContent[data-v-f6424c52]{width:480px;display:inline-block;margin-top:10px;padding:40px;text-align:left}","",{version:3,sources:["D:/Delively/delivery-seller/src/components/storeAdmin/shopAdmin.vue"],names:[],mappings:"AACA,uBACE,cAAuB,CACxB,AACD,6BACE,gBAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CAChB,AACD,mCACE,aAAe,CAChB,AACD,gCACE,gBAAiB,AACjB,gBAAiB,AACjB,kBAAmB,AACnB,kBAAoB,CACrB,AACD,mCACE,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACb,AACD,sCACE,WAAY,AACZ,mBAAoB,AACpB,eAAiB,CAClB,AACD,8CACE,gBAAiB,AACjB,eAAgB,AAChB,WAAY,AACZ,kBAAmB,AACnB,gBAAiB,AACjB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,oDACE,iBAAmB,CACpB,AACD,wDACE,eAAiB,CAClB,AACD,0DACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,+DACE,cAAe,AACf,cAAgB,CACjB,AACD,oDACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,wDACE,eAAgB,AAChB,YAAa,AACb,YAAa,AACb,yBAA0B,AAC1B,cAAe,AACf,kBAAmB,AACnB,iBAAkB,AAClB,cAAgB,CACjB,AACD,mDACE,eAAiB,CAClB,AACD,8DACE,mBAAoB,AACpB,gBAAiB,AACjB,eAAiB,CAClB,AACD,oEACE,yBAA0B,AAC1B,eAAgB,AAChB,YAAa,AACb,aAAc,AACd,mBAAoB,AACpB,qBAAsB,AACtB,iBAAkB,AAClB,kBAAoB,CACrB,AACD,iEACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,0DACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,6DACE,iBAAmB,CACpB,AACD,uEACE,0BAA4B,AAC5B,iBAAmB,CACpB,AACD,0DACE,yBAA0B,AAC1B,UAAW,AACX,gBAAiB,AACjB,eAAiB,CAClB,AACD,wDACE,eAAiB,CAClB,AACD,wDACE,YAAa,AACb,gBAAiB,AACjB,aAAc,AACd,qBAAsB,AACtB,4CAA8C,AACtC,oCAAsC,AAC9C,gBAAkB,CACnB,AACD,sDACE,gBAAiB,AACjB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACb,AACD,0DACE,gBAAiB,AACjB,mBAAqB,CACtB,AACD,0DACE,YAAa,AACb,qBAAsB,AACtB,gBAAiB,AACjB,aAAc,AACd,eAAiB,CAClB",file:"shopAdmin.vue",sourcesContent:["\n.wrap[data-v-f6424c52] {\n  padding: 0 20px 0 20px;\n}\n.wrap .shop[data-v-f6424c52] {\n  background: #fff;\n  height: 36px;\n  line-height: 36px;\n  padding-left: 20px;\n  font-size: 14px;\n  color: #3c3c3c;\n}\n.wrap .shop .gray[data-v-f6424c52] {\n  color: #898989;\n}\n.wrap .content[data-v-f6424c52] {\n  background: #fff;\n  margin-top: 24px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.wrap .content h3[data-v-f6424c52] {\n  padding-top: 40px;\n  font-size: 16px;\n  color: #444;\n}\n.wrap .content .line[data-v-f6424c52] {\n  height: 1px;\n  background: #dedede;\n  margin-top: 16px;\n}\n.wrap .content .content_info[data-v-f6424c52] {\n  margin-top: 10px;\n  font-size: 14px;\n  color: #444;\n  text-align: center;\n  margin-top: 20px;\n  min-width: 800px;\n  max-width: 1100px;\n}\n.wrap .content .content_info .site[data-v-f6424c52] {\n  margin-left: 154px;\n}\n.wrap .content .content_info .shopName[data-v-f6424c52] {\n  margin-top: 20px;\n}\n.wrap .content .content_info .addTititle[data-v-f6424c52] {\n  margin-top: 20px;\n  margin-left: 120px;\n}\n.wrap .content .content_info .addTititle span[data-v-f6424c52] {\n  color: #ff2933;\n  font-size: 12px;\n}\n.wrap .content .content_info .type[data-v-f6424c52] {\n  margin-top: 20px;\n  margin-left: -22px;\n}\n.wrap .content .content_info .shopInfo[data-v-f6424c52] {\n  display: inline;\n  width: 164px;\n  height: 36px;\n  border: 1px solid #ff3341;\n  color: #ff3341;\n  padding: 10px 40px;\n  margin-left: 12px;\n  cursor: pointer;\n}\n.wrap .content .content_info .pic[data-v-f6424c52] {\n  margin-top: 20px;\n}\n.wrap .content .content_info .pic .pic_admin[data-v-f6424c52] {\n  margin-left: -418px;\n  margin-top: 13px;\n  display: inherit;\n}\n.wrap .content .content_info .pic .avatar-uploader[data-v-f6424c52] {\n  border: 1px solid #d9d9d9;\n  cursor: pointer;\n  width: 180px;\n  height: 180px;\n  background: #fafafa;\n  display: inline-block;\n  margin-top: -14px;\n  margin-left: -127px;\n}\n.wrap .content .content_info .pic .el-icon-plus[data-v-f6424c52] {\n  font-size: 48px;\n  line-height: 180px;\n}\n.wrap .content .content_info .addAddress[data-v-f6424c52] {\n  margin-top: 25px;\n  margin-left: -50px;\n}\n.wrap .content .content_info .addAddress em[data-v-f6424c52] {\n  margin-left: 200px;\n}\n.wrap .content .content_info .addAddress .activeColor[data-v-f6424c52] {\n  background: rgba(0,0,0,0.1);\n  border-radius: 5px;\n}\n.wrap .content .content_info .accountTab[data-v-f6424c52] {\n  border: 1px solid #d9d9d9;\n  width: 50%;\n  margin-left: 28%;\n  margin-top: 20px;\n}\n.wrap .content .content_info .clickBtn[data-v-f6424c52] {\n  margin-top: 50px;\n}\n.wrap .content .content_info .pullDown[data-v-f6424c52] {\n  width: 480px;\n  margin-top: 20px;\n  padding: 40px;\n  display: inline-block;\n  -webkit-box-shadow: 0 1px 5px rgba(0,0,0,0.2);\n          box-shadow: 0 1px 5px rgba(0,0,0,0.2);\n  margin-left: 80px;\n}\n.wrap .content .content_info .person[data-v-f6424c52] {\n  margin-top: 32px;\n  margin-left: -80%;\n  font-size: 14px;\n  color: #444;\n}\n.wrap .content .content_info .personInfo[data-v-f6424c52] {\n  margin-top: 60px;\n  padding-bottom: 60px;\n}\n.wrap .content .content_info .addContent[data-v-f6424c52] {\n  width: 480px;\n  display: inline-block;\n  margin-top: 10px;\n  padding: 40px;\n  text-align: left;\n}"],sourceRoot:""}])}});
//# sourceMappingURL=12.62256aee2ecd07eb4d78.js.map