(function(e){function t(t){for(var a,c,l=t[0],i=t[1],s=t[2],p=0,u=[];p<l.length;p++)c=l[p],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&u.push(n[c][0]),n[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);f&&f(t);while(u.length)u.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,l=1;l<r.length;l++){var i=r[l];0!==n[i]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},n={app:0},o=[];function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/tissue-blocks/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var f=i;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("label",{attrs:{for:"selected_cell_type"}},[e._v("Sort By: ")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedCellType,expression:"selectedCellType"}],attrs:{id:"selected_cell_type"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedCellType=t.target.multiple?r:r[0]}}},e._l(e.cellNames,(function(t,a){return r("option",{key:a,domProps:{value:t}},[e._v(e._s(t))])})),0),e._v("   "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.orderType,expression:"orderType"}],attrs:{id:"order_type"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.orderType=t.target.multiple?r:r[0]}}},[r("option",{attrs:{selected:"",value:"asc"}},[e._v("Ascending")]),r("option",{attrs:{value:"desc"}},[e._v("Descending")])]),r("br"),r("br"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.barYProp,expression:"barYProp"}],attrs:{type:"radio",id:"raw_count",name:"barYProp",value:"count"},domProps:{checked:e._q(e.barYProp,"count")},on:{change:function(t){e.barYProp="count"}}}),r("label",{attrs:{for:"raw_count"}},[e._v("Raw Count")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.barYProp,expression:"barYProp"}],attrs:{type:"radio",id:"percentage",name:"barYProp",value:"percentage"},domProps:{checked:e._q(e.barYProp,"percentage")},on:{change:function(t){e.barYProp="percentage"}}}),r("label",{attrs:{for:"percentage"}},[e._v("Percentage")]),r("canvas",{ref:"stackedBars",attrs:{width:"1600",height:"1000"}})])},o=[],c=r("3835"),l=r("b85c"),i=r("1da1"),s=r("2909"),f=(r("96cf"),r("99af"),r("4ec9"),r("d3b7"),r("3ca3"),r("ddb0"),r("fb6a"),r("d81d"),r("cb29"),r("4d90"),r("25f0"),r("4de4"),r("4e82"),r("a630"),r("caad"),r("159b"),r("a434"),r("6062"),r("7db0"),r("f1ca")),p=["ASCT+B","Azimuth_L3","K1900174_2","18-162-2-M2","18-142-3-M2","18-312-2-M2","K1900175_1_R1","K1800430_3_R3","K1900019_1_R3","K1900387_1_R1","K1900387_4_R1","K2000094_2_R1","446_B3","K1800364_1","446_B1","KRP460C-1","KRP460P-1","KRP461C-1","KRP462C-1","KRP462P-1"],u=["#db95cd","#c8feba","#ddb1f6","#c2db90","#f8b8f6","#99d99d","#a5a6e4","#e1e294","#3bb7ed","#eda17a","#6efcfa","#ffa498","#2ecdce","#e395ad","#98ffdf","#dd99a2","#87fff1","#ffb1b5","#2ebfb2","#d3a36a","#6bb2ed","#ffe79f","#8dc5ff","#c0b46a","#d5cfff","#80e2b9","#cf9fa8","#beffd4","#cfa19a","#87f0ff","#d2a186","#42bbcc","#ffd2a3","#9ddfff","#fff5b5","#b7d4ff","#e1ffca","#ffd4e4","#6ebb96","#ffd2c1","#71b6c3","#c8a580","#c0fff8","#c8a491","#ddffe6","#bca98f","#d6e8ff","#87b78b","#fdf7ff","#a3b090","#fff8ee","#89b3ba","#f7ffeb","#aeaba5","#9fb0a0"],d="specimen_data/",b={name:"App",data:function(){return{chart:null,colorPalette:[].concat(u),cellMap:new Map,barYProp:"count",selectedCellType:"None",orderType:"asc",cellNames:[]}},computed:{cellCountText:function(){return"count"===this.barYProp?"Cell Count":"Cell Proportion"},ordering:function(){return"None"===this.selectedCellType?Array(p.length).fill().map((function(e,t){return t})).slice(2):this.getOrdering(this.selectedCellType)}},methods:{getRandomColor:function(){return this.colorPalette.length?this.colorPalette.pop():"#".concat(parseInt(Math.random()*Math.pow(16,6)).toString(16).padStart(6,"0"))},getOrdering:function(e){var t=this;return Array.from(this.cellMap.get(e)).sort((function(e,r){return parseFloat(e[t.barYProp]||0)-parseFloat(r[t.barYProp]||0)})).map((function(e){return e.positionId})).filter((function(e){return![0,1].includes(e)}))},reorderDatasets:function(){var e,t=this,r=[0,1].concat("asc"===this.orderType?this.ordering:Array.from(this.ordering).reverse());this.chart.data.datasets.forEach((function(e){var a,n=t.cellMap.get(e.label),o=r.map((function(e){return n[e]}));(a=e.data).splice.apply(a,[0,e.data.length].concat(Object(s["a"])(o.map((function(e){return e[t.barYProp]})))))})),(e=this.chart.data.labels).splice.apply(e,[0,p.length].concat(Object(s["a"])(r.map((function(e){return p[e]})))))}},watch:{barYProp:function(){this.reorderDatasets(),this.chart.options.scales.y.max="percentage"===this.barYProp?100:null,this.chart.options.scales.y.title.text=this.cellCountText,this.chart.update()},ordering:function(){this.reorderDatasets(),this.chart.update()},orderType:function(){this.reorderDatasets(),this.chart.update()}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a,n,o,i,b,h,v,m,y;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.cellMap.clear(),(r=e.colorPalette).splice.apply(r,[0,e.length].concat(u)),n=[],o=new Set,i=Object(l["a"])(p),t.prev=5,i.s();case 7:if((b=i.n()).done){t.next=16;break}return h=b.value,t.next=11,Object(f["a"])("".concat(d).concat(h,".csv"));case 11:v=t.sent,v.forEach((function(e){o.add(e["cell_type"])})),n.push(v);case 14:t.next=7;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](5),i.e(t.t0);case 21:return t.prev=21,i.f(),t.finish(21);case 24:o=Array.from(o).sort(),o.forEach((function(t){var r,a=[],o=Object(l["a"])(n.entries());try{for(o.s();!(r=o.n()).done;){var i=Object(c["a"])(r.value,2),s=i[0],f=i[1],p=f.find((function(e){return e["cell_type"]===t}))||{};p.positionId=s,a.push(p)}}catch(u){o.e(u)}finally{o.f()}e.cellMap.set(t,a)})),(a=e.cellNames).splice.apply(a,[0,e.cellNames.length,"None"].concat(Object(s["a"])(Array.from(e.cellMap.keys())))),m=e.$refs.stackedBars.getContext("2d"),y={type:"bar",data:{labels:[].concat(p),datasets:o.map((function(t){return{label:t,data:e.cellMap.get(t).map((function(t){return t[e.barYProp]})),backgroundColor:e.getRandomColor()}}))},options:{plugins:{title:{display:!0,text:"Cell Type Count Comparison"},legend:{position:"right"}},responsive:!0,scales:{x:{stacked:!0,title:{display:!0,text:"Datasets"}},y:{stacked:!0,title:{display:!0,text:e.cellCountText}}}}},e.chart=new Chart(m,y);case 30:case"end":return t.stop()}}),t,null,[[5,18,21,24]])})))()}},h=b,v=(r("034f"),r("2877")),m=Object(v["a"])(h,n,o,!1,null,null,null),y=m.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(y)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.14deb091.js.map