(function(e){function t(t){for(var n,i,c=t[0],l=t[1],s=t[2],d=0,f=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,c=1;c<r.length;c++){var l=r[c];0!==a[l]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/tissue-blocks/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var u=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("label",{attrs:{for:"source"}},[e._v("Source: ")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedConfig,expression:"selectedConfig"}],attrs:{id:"source"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedConfig=t.target.multiple?r:r[0]},e.loadDataset]}},e._l(e.configOptions,(function(t,n){return r("option",{key:n,domProps:{value:n}},[e._v(e._s(t.label))])})),0),r("br"),r("br"),e.result?r("div",[r("label",{attrs:{for:"selected_cell_type"}},[e._v("Sort By: ")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.sortBy,expression:"sortBy"}],attrs:{id:"selected_cell_type"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sortBy=t.target.multiple?r:r[0]},e.specAndEmbed]}},e._l(e.cellTypes,(function(t,n){return r("option",{key:n,domProps:{value:t}},[e._v(e._s(t))])})),0),e._v("   "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.orderType,expression:"orderType"}],attrs:{id:"order_type"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.orderType=t.target.multiple?r:r[0]},e.specAndEmbed]}},[r("option",{attrs:{selected:""},domProps:{value:e.OrderType.Ascending}},[e._v("Ascending")]),r("option",{domProps:{value:e.OrderType.Descending}},[e._v("Descending")])]),r("br"),r("br"),r("label",{attrs:{for:"group_by"}},[e._v("Group By: ")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.groupBy,expression:"groupBy"}],attrs:{id:"group_by"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.groupBy=t.target.multiple?r:r[0]},e.specAndEmbed]}},e._l(e.groupOptions,(function(t,n){return r("option",{key:n,domProps:{value:t.value}},[e._v(e._s(t.name))])})),0),r("br"),r("br"),r("div",[r("label",[e._v("Y-Axis: ")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.yAxisAttr,expression:"yAxisAttr"}],attrs:{type:"radio",id:"raw_count",name:"yAxisAttr",value:"count"},domProps:{checked:e._q(e.yAxisAttr,"count")},on:{change:[function(t){e.yAxisAttr="count"},e.specAndEmbed]}}),r("label",{attrs:{for:"raw_count"}},[e._v("Raw Count")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.yAxisAttr,expression:"yAxisAttr"}],attrs:{type:"radio",id:"percentage",name:"yAxisAttr",value:"percentage"},domProps:{checked:e._q(e.yAxisAttr,"percentage")},on:{change:[function(t){e.yAxisAttr="percentage"},e.specAndEmbed]}}),r("label",{attrs:{for:"percentage"}},[e._v("Percentage")])])]):r("div",[r("small",{staticStyle:{color:"gray"}},[e._v("Working...")])]),r("div",{attrs:{id:"vis"}})])},o=[],i=r("b85c"),c=r("3835"),l=r("1da1"),s=(r("96cf"),r("d3b7"),r("a434"),r("6062"),r("3ca3"),r("ddb0"),r("4fad"),r("99af"),r("4e82"),r("a630"),r("159b"),r("fb6a"),r("c7cd"),r("aff5"),r("a9e3"),{AzimuthKidney:"Azimuth Kidney",GESkin:"GE Skin",CellarLymphNode:"Cellar Lymph Node"}),u={Ascending:"ascending",Descending:"descending"},d={None:"none",Sex:"sex",Ethnicity:"race",Age:"age",Category:"cat",Exposure:"exp"},f=["#db95cd","#c8feba","#ddb1f6","#c2db90","#f8b8f6","#99d99d","#a5a6e4","#e1e294","#3bb7ed","#eda17a","#6efcfa","#ffa498","#2ecdce","#e395ad","#98ffdf","#dd99a2","#87fff1","#ffb1b5","#2ebfb2","#d3a36a","#6bb2ed","#ffe79f","#8dc5ff","#c0b46a","#d5cfff","#80e2b9","#cf9fa8","#beffd4","#cfa19a","#87f0ff","#d2a186","#42bbcc","#ffd2a3","#9ddfff","#fff5b5","#b7d4ff","#e1ffca","#ffd4e4","#6ebb96","#ffd2c1","#71b6c3","#c8a580","#c0fff8","#c8a491","#ddffe6","#bca98f","#d6e8ff","#87b78b","#fdf7ff","#a3b090","#fff8ee","#89b3ba","#f7ffeb","#aeaba5","#9fb0a0"],p=["#ffe5be","#8ec6f6","#f6b89c","#92f4ff","#ffb9b6","#75d0c5","#c0bbf2","#9bbc8a","#a9a8ce","#bcfeda","#bba5b6","#9ad7b1","#e4e3ff","#b3ad82","#73b5cd","#deffe0","#c2a692","#dffaff","#87b4af","#ffe7ec"],g=[{label:s.AzimuthKidney,basePath:"specimen_data/azimuth_kidney/",datasets:["ASCT+B","Azimuth_L3","K1900174_2","18-162-2-M2","18-142-3-M2","18-312-2-M2","K1900175_1_R1","K1800430_3_R3","K1900019_1_R3","K1900387_1_R1","K1900387_4_R1","K2000094_2_R1","446_B3","K1800364_1","446_B1","KRP460C-1","KRP460P-1","KRP461C-1","KRP462C-1","KRP462P-1"],groupTypes:{Sex:d.Sex,Ethnicity:d.Ethnicity},fixed:2,colorPalette:f},{label:s.GESkin,basePath:"specimen_data/ge_skin/",datasets:["region_12","region_1","region_2","region_3","region_4","region_5","region_7","region_8","region_9","region_10","region_11"],groupTypes:{Sex:d.Sex,Age:d.Age,Category:d.Category,Exposure:d.Exposure},fixed:1,colorPalette:p},{label:s.CellarLymphNode,basePath:"specimen_data/cellar_lymph_node/",datasets:["CODEX_Florida_19-003-lymph-node-R2","CODEX_Florida_20-008-lymphnode10_righthalf"],groupTypes:{},fixed:0,colorPalette:p}],b=r("87e7"),y=r("369b"),m={name:"App",data:function(){return{yAxisAttr:"count",sortBy:"None",orderType:u.Ascending,cellTypes:[],graphData:[],groupBy:d.None,selectedConfig:0,configOptions:g,result:null,OrderType:u}},computed:{yAxisLabel:function(){return"count"===this.yAxisAttr?"Cell Count":"Cell Proportion"}},methods:{getCsv:function(e){return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){Object(y["parse"])(e,{download:!0,delimiter:",",header:!0,dynamicTyping:!0,skipEmptyLines:!0,complete:function(e){t(e.data)},error:r})})));case 1:case"end":return t.stop()}}),t)})))()},loadDataset:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.result&&(e.result.finalize(),e.result=null),e.config=g[e.selectedConfig],e.graphData.splice(0,e.graphData.length),e.cellTypes.splice(0,e.cellTypes.length),e.sortBy="None",e.groupBy=d.None,r=new Set,e.groupOptions=Object.entries(e.config.groupTypes).reduce((function(e,t){var r=Object(c["a"])(t,2),n=r[0],a=r[1];return e.push({name:n,value:a}),e}),[{name:"None",value:d.None}]),n=Object(i["a"])(e.config.datasets.entries()),t.prev=9,o=regeneratorRuntime.mark((function t(){var n,o,i,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=Object(c["a"])(a.value,2),o=n[0],i=n[1],t.next=3,e.getCsv("".concat(e.config.basePath).concat(i,".csv"));case 3:l=t.sent,l.forEach((function(t){t["dataset"]=i,t["index"]=o,r.add(t["cell_type"]),e.graphData.push(t)}));case 5:case"end":return t.stop()}}),t)})),n.s();case 12:if((a=n.n()).done){t.next=16;break}return t.delegateYield(o(),"t0",14);case 14:t.next=12;break;case 16:t.next=21;break;case 18:t.prev=18,t.t1=t["catch"](9),n.e(t.t1);case 21:return t.prev=21,n.f(),t.finish(21);case 24:e.cellTypes=["None"].concat(Array.from(r).sort()),e.specAndEmbed();case 26:case"end":return t.stop()}}),t,null,[[9,18,21,24]])})))()},specAndEmbed:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={$schema:"https://vega.github.io/schema/vega-lite/v4.json",data:{values:e.graphData},width:{step:50},height:650,mark:{type:"bar",tooltip:!0},encoding:{facet:e.groupBy===d.None?null:{field:e.groupBy,type:"ordinal",spacing:10,sort:{field:"order",op:"sum",order:e.orderType}},x:{field:"dataset",title:"Dataset",sort:{field:"order",op:"sum",order:e.orderType},type:"nominal",axis:{labelAngle:-25},spacing:70},y:{field:e.yAxisAttr,aggregate:"sum",title:e.yAxisLabel,scale:{domain:"percentage"===e.yAxisAttr?[0,100]:null}},color:{field:"cell_type",type:"nominal",scale:{domain:e.cellTypes.slice(1),range:Array.from(e.config.colorPalette).reverse().slice(0,e.cellTypes.length-1)},title:"Cell Type",legend:{symbolLimit:100,columns:Math.ceil(e.cellTypes.length/30)}}},title:{text:"Cell Type Count Comparison",anchor:"middle",fontSize:18},transform:[{calculate:"datum.index < ".concat(e.config.fixed," ? \n              ").concat(e.orderType===u.Ascending?0:Number.MAX_SAFE_INTEGER," - datum.index : \n              datum.cell_type == '").concat(e.sortBy,"' ? \n              datum.").concat(e.yAxisAttr," : 0"),as:"order"}],resolve:{scale:{x:"independent"}}},t.next=3,Object(b["a"])("#vis",r);case 3:e.result=t.sent;case 4:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.loadDataset();case 1:case"end":return t.stop()}}),t)})))()}},v=m,_=(r("034f"),r("2877")),h=Object(_["a"])(v,a,o,!1,null,null,null),A=h.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(A)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.d062c49a.js.map