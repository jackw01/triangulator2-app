(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{144:function(e,t,a){var n=a(18),r=a(19);function i(e){return e*e*e*(e*(6*e-15)+10)}function o(e,t,a){return t+e*(a-t)}function s(e,t,a,n){var r=15&e,i=r<8?t:a,o=r<4?a:12===r||14===r?t:n;return(0===(1&r)?i:-i)+(0===(2&r)?o:-o)}e.exports=function(){"use strict";function e(t){n(this,e),this.permutation=[];for(var a=0;a<256;a++)this.permutation.push(a);for(var r=256;r>0;r--){var i=Math.floor(t()*r),o=this.permutation[r-1];this.permutation[r-1]=this.permutation[i],this.permutation[i]=o}for(var s=0;s<256;s++)this.permutation.push(this.permutation[s])}return r(e,[{key:"noise",value:function(e,t,a){var n=255&Math.floor(e),r=255&Math.floor(t),l=255&Math.floor(a),c=e-Math.floor(e),u=t-Math.floor(t),d=a-Math.floor(a),h=i(c),p=i(u),m=i(d),g=this.permutation[n]+r,f=this.permutation[g]+l,v=this.permutation[g+1]+l,E=this.permutation[n+1]+r,S=this.permutation[E]+l,b=this.permutation[E+1]+l;return o(m,o(p,o(h,s(this.permutation[f],c,u,d),s(this.permutation[S],c-1,u,d)),o(h,s(this.permutation[v],c,u-1,d),s(this.permutation[b],c-1,u-1,d))),o(p,o(h,s(this.permutation[f+1],c,u,d-1),s(this.permutation[S+1],c-1,u,d-1)),o(h,s(this.permutation[v+1],c,u-1,d-1),s(this.permutation[b+1],c-1,u-1,d-1))))+.5}}]),e}()},223:function(e,t,a){var n={"./bmp":224,"./bmp.js":224,"./dds":225,"./dds.js":225,"./gif":226,"./gif.js":226,"./jpg":227,"./jpg.js":227,"./png":228,"./png.js":228,"./psd":229,"./psd.js":229,"./svg":230,"./svg.js":230,"./tiff":231,"./tiff.js":231,"./webp":232,"./webp.js":232};function r(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=223},243:function(e,t){e.exports=function(e,t,a,n){var r=a*a,i=3*r,o=a*Math.SQRT1_2,s=Math.ceil(e/o),l=Math.ceil(t/o),c=new Array(s*l),u=[],d=0,h=0;function p(e,t){var a=Math.floor(e/o),n=Math.floor(t/o),i=Math.max(a-2,0),u=Math.max(n-2,0),d=Math.min(a+3,s),h=Math.min(n+3,l);for(n=u;n<h;++n){var p=n*s;for(a=i;a<d;++a)if(c[p+a]){var m=c[p+a][0]-e,g=c[p+a][1]-t;if(m*m+g*g<r)return!1}}return!0}function m(e,t){var a=[e,t];return u.push(a),c[s*Math.floor(t/o)+Math.floor(e/o)]=a,h++,d++,a}return function(){if(!h)return m(n()*e,n()*t);for(;d;){for(var a=Math.floor(n()*d),o=0;o<30;++o){var s=2*Math.PI*n(),l=Math.sqrt(n()*i+r),c=u[a][0]+l*Math.cos(s),g=u[a][1]+l*Math.sin(s);if(c>=0&&c<e&&g>=0&&g<t&&p(c,g))return m(c,g)}u[a]=u[--d],u.length=d}return!1}}},248:function(e,t,a){e.exports=a(573)},253:function(e,t,a){},423:function(e,t,a){"use strict";a.r(t);var n=a(42),r=a(142),i=a.n(r),o=a(240),s=a(241),l=a.n(s),c=a(242),u=a.n(c),d=a(143),h=a.n(d),p=a(243),m=a.n(p),g=a(144),f=a.n(g);function v(e,t,a,n,r){return(e-t)*(r-n)/(a-t)+n}var E=Math.random,S=new f.a(E),b={pointCache:[],lastPointOptionsHash:"",GridMode:{Square:1,Triangle:2,Poisson:3,Override:4},ColorFunction:{Horizontal:function(e,t){return e},Vertical:function(e,t){return t},DiagonalFromLeft:function(e,t){return(e+t)/2},DiagonalFromRight:function(e,t){return(1-e+t)/2},RadialFromCenter:function(e,t){return Math.hypot(e-.5,t-.5)*Math.sqrt(2)*1.1},RadialFromBottom:function(e,t){return Math.hypot(e-.5,t-1.5)-.5},FromEdges:function(e,t){return.3*function(e,t){return 2*Math.min(Math.min(e,1-e),Math.min(t,1-t))}(e,t)+.7*(1-Math.hypot(e-.5,t-.5)*Math.sqrt(2))},Noise:function(e,t){return function(a,n){return S.noise(a*e,n*t,0)}}},GradientFunction:{Random:function(e,t,a){var r=Math.floor(3*E()),i=e[(r+1+Math.floor(2*E()))%3],o=[i[0]-e[r][0],i[1]-e[r][1]],s=Math.sign(o[0]*o[1]),l=o.map(function(e){return Math.abs(e)});return{gradientVector:l=l.map(function(e){return e/Math.max.apply(Math,Object(n.a)(l))}),gradientDirection:s}}},generate:function(e){var t=e||{isBrowser:!1,svgInput:!1,forceSVGSize:!0,seed:Math.random(),width:1920,height:1080,gridMode:this.GridMode.Poisson,gridOverridde:!1,cellSize:100,cellRandomness:.3,color:this.ColorFunction.DiagonalFromLeft,colorScaleInvert:!1,colorPalette:["#efee69","#21313e"],colorRandomness:0,quantizeSteps:0,colorOverride:!1,useGradient:!1,gradient:this.GradientFunction.Random,gradientNegativeFactor:.03,gradientPositiveFactor:.03,strokeColor:!1,strokeWidth:!1},r=t.isBrowser?h.a:h()(a(432));E=i()("".concat(t.seed)),S=new f.a(E);var s=[],c=[],d=l()([t.seed,t.width,t.height,t.gridMode,t.gridOverride,t.cellSize,t.cellRandomness]);if(d!==this.lastPointOptionsHash){this.lastPointOptionsHash=d;var p=t.cellRandomness*t.cellSize;if(t.gridMode===b.GridMode.Square)for(var g=-100;g<t.height+100+t.cellSize;g+=t.cellSize)for(var M=-100;M<t.width+100+t.cellSize;M+=t.cellSize)s.push([M+Math.floor(E()*(2*p+1))-p,g+Math.floor(E()*(2*p+1))-p]);else if(t.gridMode===b.GridMode.Triangle)for(var C=0,y=-100;y<t.width+100+t.cellSize;y+=t.cellSize){for(var z=t.cellSize/Math.sqrt(3)*(C%2)-100;z<t.height+100+t.cellSize;z+=t.cellSize)s.push([y+Math.floor(E()*(2*p+1))-p,z+Math.floor(E()*(2*p+1))-p]);C++}else if(t.gridMode===b.GridMode.Poisson)for(var w=m()(1.5*t.width,1.5*t.height,t.cellSize,E),N=w();N;)s.push([N[0]-.25*t.width,N[1]-.25*t.height]),N=w();else t.gridMode===b.GridMode.Override&&s.push.apply(s,Object(n.a)(t.gridOverride));for(var O=o.a.from(s),G=0;G<O.triangles.length;G+=3)c.push([s[O.triangles[G]],s[O.triangles[G+1]],s[O.triangles[G+2]]]);this.pointCache=c}else c=this.pointCache;var F=u.a.scale(t.colorPalette).mode("hcl"),k=r(t.svgInput);return t.forceSVGSize&&k.size(t.width,t.height),E=i()("".concat(t.seed)),c.forEach(function(e){var a,r=v(e.reduce(function(e,t){return e+t[0]},0)/3,0,t.width,0,1),i=v(e.reduce(function(e,t){return e+t[1]},0)/3,0,t.height,0,1);if(t.colorOverride)a=t.colorOverride(r,i);else{var o=t.color(r,i)+(E()-.5)*t.colorRandomness;if(t.quantizeSteps&&(o=Math.round(o*t.quantizeSteps)/(t.quantizeSteps-1)),t.colorScaleInvert&&(o=1-o),t.useGradient){var s,l=t.gradient(e,r,i),c=l.gradientVector,u=l.gradientDirection;a=(s=k.gradient("linear",function(e){e.at(0,F(o-t.gradientNegativeFactor*u).hex()),e.at(1,F(o+t.gradientPositiveFactor*u).hex())}).from(0,0)).to.apply(s,Object(n.a)(c))}else a=F(o).hex()}k.polygon(e.map(function(e){return e.join(",")}).join(" ")).fill(a).stroke({color:t.strokeColor||a,width:t.strokeWidth||1})}),k.svg()}};t.default=b},43:function(e,t,a){a(421)({presets:["@babel/preset-env"]}),e.exports=a(423).default},431:function(e,t){},449:function(e,t){},451:function(e,t){},573:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(233),o=a.n(i),s=(a(253),a(140)),l=a.n(s),c=a(246),u=a(234),d=a(42),h=a(89),p=a(63),m=a(247),g=a(235),f=a(90),v=a(245),E=a(236),S=a.n(E),b=a(575),M=a(576),C=a(577),y=a(578),z=a(579),w=a(580),N=a(581),O=a(582),G=a(583),F=a(237),k=a(238),j=a.n(k),P=a(239),x=a.n(P),R=a(141),I=a.n(R),V=a(43),H=a.n(V),q=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(m.a)(this,Object(g.a)(t).call(this,e))).state={svgNeedsUpdating:!0,svgSizeCSS:{width:"",height:""},svgWidth:3840,svgHeight:2400,svgString:"",options:{isBrowser:!0,seed:4,width:3840,height:2400,gridMode:H.a.GridMode.Poisson,gridOverride:!1,cellSize:150,cellRandomness:.2,colorOverride:!1,color:H.a.ColorFunction.RadialFromBottom,colorScaleInvert:!1,colorPalette:["#e7a71d","#dc433e","#9e084b","#41062f"],colorRandomness:.15,quantizeSteps:0,useGradient:!0,gradient:H.a.GradientFunction.Random,gradientNegativeFactor:.03,gradientPositiveFactor:.03,strokeColor:!1,strokeWidth:1}},a.allColorFunctions=Object(d.a)(Object.entries(H.a.ColorFunction).map(function(e){return e[1]})),a.allGradientFunctions=Object(d.a)(Object.entries(H.a.GradientFunction).map(function(e){return e[1]})),a.inputHandler=S.a.debounce(a.handleOptionChange,150).bind(Object(f.a)(a)),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(e,t,n){var r=a.toDataURL(t,n).split(",")[1];setTimeout(function(){for(var a=atob(r),n=a.length,i=new Uint8Array(n),o=0;o<n;o++)i[o]=a.charCodeAt(o);e(new Blob([i],{type:t||"image/png"}))})}}),a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"handleOptionChange",value:function(e){var t={svgNeedsUpdating:!0,options:this.state.options};"color"===e.id?t.options[e.id]=this.allColorFunctions[parseInt(e.value,10)]:"gradient"===e.id?t.options[e.id]=this.allGradientFunctions[parseInt(e.value,10)]:1===e.step?t.options[e.id]=parseInt(e.value,10):t.options[e.id]=parseFloat(e.value),this.setState(t)}},{key:"handleToggle",value:function(e){var t=this;return function(a){console.log(a.target);var n={svgNeedsUpdating:!0,options:t.state.options};n.options[a.target.id]=e,t.setState(n)}}},{key:"handleChangeColorStops",value:function(e){var t=this;return function(){var a=t.state.options.colorPalette.length+e;if(a>0&&a<=20){var n={svgNeedsUpdating:!0,options:t.state.options};n.options.colorPalette=j.a.scale(t.state.options.colorPalette).mode("lch").colors(a),t.setState(n)}}}},{key:"handleColorChange",value:function(e){var t=this;return function(a){console.log(a,e);var n={svgNeedsUpdating:!0,options:t.state.options};n.options.colorPalette[e]=a.hex,t.setState(n)}}},{key:"generateSVG",value:function(){var e=Object(u.a)(l.a.mark(function e(t){var a,n,r,i,o,s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this.state,n=a.svgNeedsUpdating,r=a.options,!n||!t){e.next=10;break}return e.next=4,this.setState({svgNeedsUpdating:!1});case 4:t.innerHTML="",i=H.a.generate(Object(c.a)({svgInput:t,forceSVGSize:!1},r)),o=document.getElementById("image-container").clientWidth/document.getElementById("image-container").clientHeight,s={width:"",height:""},r.width/r.height>o?s.width="100%":s.height="100%",this.setState({svgSizeCSS:s,svgWidth:r.width,svgHeight:r.height,svgString:i});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"saveImage",value:function(){x()("canvas",this.state.svgString),document.getElementById("canvas").toBlob(function(e){I()(e,"tri2-".concat((new Date).toISOString(),".png"))})}},{key:"saveSVG",value:function(){var e=new Blob([this.state.svgString]);I()(e,"tri2-".concat((new Date).toISOString(),".svg"))}},{key:"render",value:function(){var e=this;return r.a.createElement(b.a,{className:"main h-100"},r.a.createElement(M.a,{className:"h-100"},r.a.createElement(C.a,{xs:"8",lg:"9",className:"image-container",id:"image-container"},r.a.createElement("svg",{id:"image",style:this.state.svgSizeCSS,viewBox:"0 0 ".concat(this.state.svgWidth," ").concat(this.state.svgHeight),ref:this.generateSVG.bind(this)})),r.a.createElement(C.a,{xs:"4",lg:"3",className:"controls-container"},r.a.createElement(y.a,{className:"controls-form"},r.a.createElement("h1",{className:"header-light header-stylized-text"},"triangulator2"),r.a.createElement("small",null,"\xa9 2019 ",r.a.createElement("a",{href:"https://jackw01.github.io"},"jackw01"),". ",r.a.createElement("a",{href:"https://github.com/jackw01/triangulator2-app"},"View on Github")),r.a.createElement("hr",null),r.a.createElement(z.a,{className:"spacer-top"},r.a.createElement(w.a,{className:"input-group-label",for:"seed"},"Seed:"),r.a.createElement(N.a,{id:"seed",className:"w-100",bsSize:"sm",type:"number",step:"1",defaultValue:this.state.options.seed,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"resolution"},"Resolution:"),r.a.createElement(N.a,{id:"width",bsSize:"sm",type:"number",step:"1",min:"0",max:"8192",defaultValue:this.state.options.width,onChange:function(t){return e.inputHandler(t.target)}}),"\xa0x\xa0",r.a.createElement(N.a,{id:"height",bsSize:"sm",type:"number",step:"1",min:"0",max:"8192",defaultValue:this.state.options.height,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"gridMode"},"Grid Mode:"),r.a.createElement(N.a,{id:"gridMode",bsSize:"sm",type:"select",defaultValue:this.state.options.gridMode,onChange:function(t){return e.handleOptionChange(t.target)}},r.a.createElement("option",{value:"1"},"Square"),r.a.createElement("option",{value:"2"},"Triangle"),r.a.createElement("option",{value:"3"},"Poisson"),r.a.createElement("option",{value:"4"},"Override"))),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"cellSize"},"Cell Size:"),r.a.createElement("input",{id:"cellSize",type:"range",step:"1",min:"80",max:"512",defaultValue:this.state.options.cellSize,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"cellRandomness"},"Cell Randomness:"),r.a.createElement("input",{id:"cellRandomness",type:"range",step:"0.001",min:"0",max:"1",defaultValue:this.state.options.cellRandomness,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement("hr",null),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"color"},"Color Mode:"),r.a.createElement(N.a,{id:"color",bsSize:"sm",type:"select",defaultValue:5,onChange:function(t){return e.handleOptionChange(t.target)}},this.allColorFunctions.map(function(e,t){return r.a.createElement("option",{value:t},e.name)})),r.a.createElement(O.a,{size:"sm",className:"spacer-top"},r.a.createElement(G.a,{id:"colorScaleInvert",color:"secondary",onClick:this.handleToggle(!1).bind(this),active:!this.state.options.colorScaleInvert},"Default"),r.a.createElement(G.a,{id:"colorScaleInvert",color:"secondary",onClick:this.handleToggle(!0).bind(this),active:this.state.options.colorScaleInvert},"Invert"))),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"colorRandomness"},"Color Randomness:"),r.a.createElement("input",{id:"colorRandomness",type:"range",step:"0.001",min:"0",max:"1",defaultValue:this.state.options.colorRandomness,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement(z.a,{className:"color-picker-container"},r.a.createElement(w.a,{className:"input-group-label",for:"colorPalette"},"Color Palette:"),r.a.createElement(G.a,{id:"colorPaletteDecrease",size:"sm",color:"secondary",onClick:this.handleChangeColorStops(-1).bind(this)},"Remove Color"),"\xa0",r.a.createElement(G.a,{id:"colorPaletteIncrease",size:"sm",color:"secondary",onClick:this.handleChangeColorStops(1).bind(this)},"Add Color"),this.state.options.colorPalette.map(function(t,a){return r.a.createElement(F.ChromePicker,{color:t,disableAlpha:!0,onChangeComplete:e.handleColorChange(a).bind(e)})})),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"quantizeSteps"},"Color Quantization Levels:"),r.a.createElement("input",{id:"quantizeSteps",type:"range",step:"1",min:"0",max:"10",defaultValue:this.state.options.quantizeSteps,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement("hr",null),r.a.createElement(z.a,null,r.a.createElement(w.a,{className:"input-group-label",for:"useGradient"},"Generate Gradients:"),r.a.createElement(O.a,{size:"sm"},r.a.createElement(G.a,{id:"useGradient",color:"secondary",onClick:this.handleToggle(!0).bind(this),active:this.state.options.useGradient},"On"),r.a.createElement(G.a,{id:"useGradient",color:"secondary",onClick:this.handleToggle(!1).bind(this),active:!this.state.options.useGradient},"Off"))),r.a.createElement(z.a,{className:this.state.options.useGradient?"":"hidden"},r.a.createElement(w.a,{className:"input-group-label",for:"gradient"},"Gradient Mode:"),r.a.createElement(N.a,{id:"gradient",bsSize:"sm",type:"select",defaultValue:5,onChange:function(t){return e.handleOptionChange(t.target)}},this.allGradientFunctions.map(function(e,t){return r.a.createElement("option",{value:t},e.name)}))),r.a.createElement(z.a,{className:this.state.options.useGradient?"":"hidden"},r.a.createElement(w.a,{className:"input-group-label",for:"gradientNegativeFactor"},"Gradient Negative Factor:"),r.a.createElement("input",{id:"gradientNegativeFactor",type:"range",step:"0.001",min:"0",max:"0.1",defaultValue:this.state.options.gradientNegativeFactor,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement(z.a,{className:this.state.options.useGradient?"":"hidden"},r.a.createElement(w.a,{className:"input-group-label",for:"gradientPositiveFactor"},"Gradient Positive Factor:"),r.a.createElement("input",{id:"gradientPositiveFactor",type:"range",step:"0.001",min:"0",max:"0.1",defaultValue:this.state.options.gradientPositiveFactor,onChange:function(t){return e.inputHandler(t.target)}})),r.a.createElement("hr",null),r.a.createElement(z.a,{className:"color-picker-container"},r.a.createElement(G.a,{size:"lg",color:"primary",onClick:this.saveImage.bind(this)},"Save Image"),r.a.createElement("br",null),r.a.createElement(G.a,{className:"spacer-top",size:"lg",color:"secondary",onClick:this.saveSVG.bind(this)},"Save SVG"))))),r.a.createElement("canvas",{id:"canvas",className:"hidden",width:this.state.svgWidth,height:this.state.svgHeight}))}}]),t}(n.Component);o.a.render(r.a.createElement(q,null),document.getElementById("root"))}},[[248,1,2]]]);
//# sourceMappingURL=main.985c09dd.chunk.js.map