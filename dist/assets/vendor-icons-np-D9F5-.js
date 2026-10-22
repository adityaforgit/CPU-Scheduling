var Ge=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function be(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var V={exports:{}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w=Symbol.for("react.element"),ge=Symbol.for("react.portal"),Me=Symbol.for("react.fragment"),Ce=Symbol.for("react.strict_mode"),xe=Symbol.for("react.profiler"),ze=Symbol.for("react.provider"),Se=Symbol.for("react.context"),$e=Symbol.for("react.forward_ref"),je=Symbol.for("react.suspense"),De=Symbol.for("react.memo"),Ee=Symbol.for("react.lazy"),P=Symbol.iterator;function Re(e){return e===null||typeof e!="object"?null:(e=P&&e[P]||e["@@iterator"],typeof e=="function"?e:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},W=Object.assign,B={};function _(e,t,o){this.props=e,this.context=t,this.refs=B,this.updater=o||T}_.prototype.isReactComponent={};_.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function H(){}H.prototype=_.prototype;function R(e,t,o){this.props=e,this.context=t,this.refs=B,this.updater=o||T}var A=R.prototype=new H;A.constructor=R;W(A,_.prototype);A.isPureReactComponent=!0;var I=Array.isArray,F=Object.prototype.hasOwnProperty,L={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,o){var n,s={},i=null,u=null;if(t!=null)for(n in t.ref!==void 0&&(u=t.ref),t.key!==void 0&&(i=""+t.key),t)F.call(t,n)&&!U.hasOwnProperty(n)&&(s[n]=t[n]);var c=arguments.length-2;if(c===1)s.children=o;else if(1<c){for(var a=Array(c),d=0;d<c;d++)a[d]=arguments[d+2];s.children=a}if(e&&e.defaultProps)for(n in c=e.defaultProps,c)s[n]===void 0&&(s[n]=c[n]);return{$$typeof:w,type:e,key:i,ref:u,props:s,_owner:L.current}}function Ae(e,t){return{$$typeof:w,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function N(e){return typeof e=="object"&&e!==null&&e.$$typeof===w}function Le(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var O=/\/+/g;function j(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Le(""+e.key):t.toString(36)}function x(e,t,o,n,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var u=!1;if(e===null)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case w:case ge:u=!0}}if(u)return u=e,s=s(u),e=n===""?"."+j(u,0):n,I(s)?(o="",e!=null&&(o=e.replace(O,"$&/")+"/"),x(s,t,o,"",function(d){return d})):s!=null&&(N(s)&&(s=Ae(s,o+(!s.key||u&&u.key===s.key?"":(""+s.key).replace(O,"$&/")+"/")+e)),t.push(s)),1;if(u=0,n=n===""?".":n+":",I(e))for(var c=0;c<e.length;c++){i=e[c];var a=n+j(i,c);u+=x(i,t,o,a,s)}else if(a=Re(e),typeof a=="function")for(e=a.call(e),c=0;!(i=e.next()).done;)i=i.value,a=n+j(i,c++),u+=x(i,t,o,a,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return u}function C(e,t,o){if(e==null)return e;var n=[],s=0;return x(e,n,"","",function(i){return t.call(o,i,s++)}),n}function Ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(o){(e._status===0||e._status===-1)&&(e._status=1,e._result=o)},function(o){(e._status===0||e._status===-1)&&(e._status=2,e._result=o)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var f={current:null},z={transition:null},Pe={ReactCurrentDispatcher:f,ReactCurrentBatchConfig:z,ReactCurrentOwner:L};function G(){throw Error("act(...) is not supported in production builds of React.")}r.Children={map:C,forEach:function(e,t,o){C(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return C(e,function(){t++}),t},toArray:function(e){return C(e,function(t){return t})||[]},only:function(e){if(!N(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};r.Component=_;r.Fragment=Me;r.Profiler=xe;r.PureComponent=R;r.StrictMode=Ce;r.Suspense=je;r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pe;r.act=G;r.cloneElement=function(e,t,o){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=W({},e.props),s=e.key,i=e.ref,u=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,u=L.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(a in t)F.call(t,a)&&!U.hasOwnProperty(a)&&(n[a]=t[a]===void 0&&c!==void 0?c[a]:t[a])}var a=arguments.length-2;if(a===1)n.children=o;else if(1<a){c=Array(a);for(var d=0;d<a;d++)c[d]=arguments[d+2];n.children=c}return{$$typeof:w,type:e.type,key:s,ref:i,props:n,_owner:u}};r.createContext=function(e){return e={$$typeof:Se,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ze,_context:e},e.Consumer=e};r.createElement=q;r.createFactory=function(e){var t=q.bind(null,e);return t.type=e,t};r.createRef=function(){return{current:null}};r.forwardRef=function(e){return{$$typeof:$e,render:e}};r.isValidElement=N;r.lazy=function(e){return{$$typeof:Ee,_payload:{_status:-1,_result:e},_init:Ne}};r.memo=function(e,t){return{$$typeof:De,type:e,compare:t===void 0?null:t}};r.startTransition=function(e){var t=z.transition;z.transition={};try{e()}finally{z.transition=t}};r.unstable_act=G;r.useCallback=function(e,t){return f.current.useCallback(e,t)};r.useContext=function(e){return f.current.useContext(e)};r.useDebugValue=function(){};r.useDeferredValue=function(e){return f.current.useDeferredValue(e)};r.useEffect=function(e,t){return f.current.useEffect(e,t)};r.useId=function(){return f.current.useId()};r.useImperativeHandle=function(e,t,o){return f.current.useImperativeHandle(e,t,o)};r.useInsertionEffect=function(e,t){return f.current.useInsertionEffect(e,t)};r.useLayoutEffect=function(e,t){return f.current.useLayoutEffect(e,t)};r.useMemo=function(e,t){return f.current.useMemo(e,t)};r.useReducer=function(e,t,o){return f.current.useReducer(e,t,o)};r.useRef=function(e){return f.current.useRef(e)};r.useState=function(e){return f.current.useState(e)};r.useSyncExternalStore=function(e,t,o){return f.current.useSyncExternalStore(e,t,o)};r.useTransition=function(){return f.current.useTransition()};r.version="18.3.1";V.exports=r;var p=V.exports;const Ke=be(p);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=e=>e==null?void 0:e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Oe(e,t,o=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Ie(e),size:24,node:t,...o.length>0?{aliases:o}:{}}}/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=e=>{let t="",o=!1;for(const n of e){if(n==="-"||n==="_"||n<=" "){o=t.length>0;continue}t.length===0?t+=n.toLowerCase():t+=o?n.toUpperCase():n,o=!1}return t};/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=e=>{const t=Ve(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(...e)=>e.filter((t,o,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function D(e){return e!=null}function We(e,t={}){var b,v;const o=t.attributeNames??{},n=h=>o[h]??h,s=e.size??e.width??y.width,i=e.size??e.height??y.height,u=((b=e.aliases)==null?void 0:b.filter(h=>typeof h=="string"&&h.trim()!=="").map(h=>`lucide-${h}`))??[],c=[...e.name?[`lucide-${e.name}`]:[],...u],a=((v=t.className)==null?void 0:v.split(" ").filter(Boolean))??[],d=t.includeDefaultClasses===!1?E(...a):E("lucide",...c,...a),S=t.absoluteStrokeWidth?Number(t.strokeWidth??y["stroke-width"])*Number(e.size??e.width??y.width)/Number(t.size??t.width??y.width):t.strokeWidth??y["stroke-width"];return["svg",{...Object.entries(y).reduce((h,[k,m])=>(h[n(k)]=m,h),{}),..."color"in t&&t.color&&{[n("stroke")]:t.color},..."size"in t&&D(t.size)&&{[n("width")]:t.size,[n("height")]:t.size},..."width"in t&&D(t.width)&&{[n("width")]:t.width},..."height"in t&&D(t.height)&&{[n("height")]:t.height},[n("stroke-width")]:S,...d&&{[n("class")]:d},[n("viewBox")]:`0 0 ${s} ${i}`,...t.hasA11yProp===!1?{[n("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(h=>{const[k,m,g]=h,M=t.nonScalingStroke?{[n("vector-effect")]:"non-scaling-stroke",...m}:m;return g?[k,M,g]:[k,M]})]}/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Be(e,t={}){return We(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Fe=p.createContext({}),Ue=()=>p.useContext(Fe),qe=p.forwardRef(({color:e,size:t,width:o,height:n,strokeWidth:s,absoluteStrokeWidth:i,nonScalingStroke:u,className:c="",children:a,iconNode:d=[],icon:S={node:d,aliases:[],size:24},...$},b)=>{const{size:v=24,strokeWidth:h=2,absoluteStrokeWidth:k=!1,nonScalingStroke:m=!1,color:g="currentColor",className:M=""}=Ue()??{},ye=!!a||He($),[ke,me,_e=[]]=Be(S,{color:e??g,width:o??t??v,height:n??t??v,strokeWidth:s??h,absoluteStrokeWidth:i??k,nonScalingStroke:u??m,className:E(M,c),hasA11yProp:ye,attributes:$});return p.createElement(ke,{ref:b,...me},[..._e.map(([ve,we])=>p.createElement(ve,we)),...Array.isArray(a)?a:[a]])});/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function l(e,t=[],o=[]){const n=typeof e=="string"?Oe(e,t,o):e,s=p.forwardRef(({className:i,...u},c)=>p.createElement(qe,{ref:c,icon:n,className:i,...u}));return n.name&&(s.displayName=Te(n.name)),s}/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};K.node;const Xe=l(K);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X={name:"chart-no-axes-column",size:24,node:[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],aliases:["bar-chart-2"]};X.node;const Je=l(X);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};J.node;const Qe=l(J);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};Q.node;const Ye=l(Q);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Y.node;const Ze=l(Y);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};Z.node;const et=l(Z);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};ee.node;const tt=l(ee);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};te.node;const nt=l(te);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};ne.node;const ot=l(ne);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};oe.node;const rt=l(oe);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re={name:"info",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]};re.node;const st=l(re);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"list",size:24,node:[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]]};se.node;const at=l(se);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};ae.node;const it=l(ae);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};ie.node;const ct=l(ie);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};ce.node;const ut=l(ce);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};ue.node;const lt=l(ue);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"settings",size:24,node:[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};le.node;const dt=l(le);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};de.node;const ft=l(de);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};fe.node;const ht=l(fe);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"trending-up",size:24,node:[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]};he.node;const pt=l(he);/**
 * @license lucide-react v1.61.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};pe.node;const yt=l(pe);export{Xe as B,nt as C,ot as D,rt as F,st as I,at as L,it as P,Ke as R,dt as S,ht as T,yt as X,ut as a,et as b,Ge as c,Ye as d,ct as e,pt as f,be as g,lt as h,Je as i,Ze as j,ft as k,Qe as l,tt as m,p as r};
