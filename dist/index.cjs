"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const L=require("react"),C={subscribers:[],historyPush(e){const{view:t,panel:r,modal:n,popout:i}=window.history.state??{view:void 0,panel:void 0,modal:void 0,popout:void 0};console.log("try to push history",this),this.changeState({view:e.hasOwnProperty("view")?e.view:t,panel:e.hasOwnProperty("panel")?e.panel:r,modal:e.hasOwnProperty("modal")?e.modal:n,popout:e.hasOwnProperty("popout")?e.popout:i})},changeState(e){try{window.history.pushState(e,""),this.dispatchChangeStateEvent()}catch(t){console.log("changeState err",t)}},dispatchChangeStateEvent(){this._trigerEvent("changestate",window.history.state)},addEventListener(e,t,r){this.subscribers.push({type:e,callback:t,index:r}),e==="changestate"&&this._trigerEvent("init",!0)},removeEventListener(e){this.subscribers=this.subscribers.filter(t=>t.index!==e)},_trigerEvent(e,t){this.subscribers.forEach(r=>r.type===e&&r.callback(t))}},Ot=e=>{e&&rt(e),window.blumRouter.isBackFromBrowser=!1,window.history.back()},rt=({beforeBackHandledCallback:e,afterBackHandledCallback:t,isDispatchChangeStateEventAfterMiddleware:r,isDispatchChangeStateEventBeforeMiddleware:n})=>{e&&(window.blumRouter.beforeBackHandledCallback=e),t&&(window.blumRouter.afterBackHandledCallback=t),typeof r=="boolean"&&(window.blumRouter.isDispatchChangeStateEventAfterMiddleware=r),typeof n=="boolean"&&(window.blumRouter.isDispatchChangeStateEventBeforeMiddleware=n)},ke=()=>{window.blumRouter={isBackFromBrowser:!0,beforeBackHandledCallback:null,afterBackHandledCallback:null,isDispatchChangeStateEventBeforeMiddleware:!1,isDispatchChangeStateEventAfterMiddleware:!0}},Rt=e=>{C.historyPush({view:e.view,panel:e.panel})},kt=e=>{C.historyPush({panel:e})},At=e=>{C.historyPush({modal:e})},Lt=e=>{C.historyPush({popout:e})};function Bt(e,t){for(let r in e)t(e[r],r)}function B(e,t){e.forEach(t)}function j(e,t){if(!e)throw Error(t)}function T({node:e=[],from:t,source:r,parent:n=t||r,to:i,target:s,child:o=i||s,scope:p={},meta:w={},family:c={type:"regular"},regional:S}={}){let l=ie(n),d=ie(c.links),f=ie(c.owners),a=[];B(e,v=>v&&D(a,v));let u={id:It(),seq:a,next:ie(o),meta:w,scope:p,family:{type:c.type||"crosslink",links:d,owners:f}};return B(d,v=>D(ce(v),u)),B(f,v=>D(fe(v),u)),B(l,v=>D(v.next,u)),S&&z&&ut(J(z),[u]),u}function nt(e,t,r){let n,i=V,s=null,o=b;if(e.target&&(t=e.params,r=e.defer,n=e.meta,i="page"in e?e.page:i,e.stack&&(s=e.stack),o=oe(e)||o,e=e.target),o&&b&&o!==b&&(b=null),Array.isArray(e))for(let a=0;a<e.length;a++)P("pure",i,x(e[a]),s,t[a],o,n);else P("pure",i,x(e),s,t,o,n);if(r&&!ae)return;let p,w,c,S,l,d,f={isRoot:ae,currentPage:V,scope:b,isWatch:ge,isPure:se};ae=0;e:for(;S=qt();){let{idx:a,stack:u,type:v}=S;c=u.node,V=l=u.page,b=oe(u),l?d=l.reg:b&&(d=b.reg);let R=!!l,A=!!b,y={fail:0,scope:c.scope};p=w=0;for(let h=a;h<c.seq.length&&!p;h++){let g=c.seq[h];if(g.order){let{priority:m,barrierID:_}=g.order,E=_?l?`${l.fullID}_${_}`:_:0;if(h!==a||v!==m){_?_e.has(E)||(_e.add(E),Le(h,u,m,_)):Le(h,u,m);continue e}_&&_e.delete(E)}switch(g.type){case"mov":{let _,E=g.data;switch(E.from){case X:_=J(u);break;case"a":case"b":_=u[E.from];break;case"value":_=E.store;break;case"store":if(d&&!d[E.store.id])if(R){let O=ft(l,E.store.id);u.page=l=O,O?d=O.reg:A?(G(b,E.store,0,1,E.softRead),d=b.reg):d=void 0}else A&&G(b,E.store,0,1,E.softRead);_=ct(d&&d[E.store.id]||E.store)}switch(E.to){case X:u.value=_;break;case"a":case"b":u[E.to]=_;break;case"store":Ft(l,b,c,E.target).current=_}break}case"compute":let m=g.data;if(m.fn){ge=k(c,"op")==="watch",se=m.pure;let _=m.safe?(0,m.fn)(J(u),y.scope,u):Jt(y,m.fn,u);m.filter?w=!_:u.value=_,ge=f.isWatch,se=f.isPure}}p=y.fail||w}if(!p){let h=J(u),g=oe(u);if(B(c.next,m=>{P("child",l,m,u,h,g)}),g){k(c,"needFxCounter")&&P("child",l,g.fxCount,u,h,g),k(c,"storeChange")&&P("child",l,g.storeChange,u,h,g),k(c,"warnSerialize")&&P("child",l,g.warnSerializeNode,u,h,g);let m=g.additionalLinks[c.id];m&&B(m,_=>{P("child",l,_,u,h,g)})}}}ae=f.isRoot,V=f.currentPage,b=oe(f)}function Ct(e,t){let r,n,i=e;if(t){let s=Vt(t);e.length===0?(r=s.path,n=s.fullName):(r=s.path.concat([e]),n=s.fullName.length===0?e:s.fullName+"/"+e)}else r=e.length===0?[]:[e],n=e;return{shortName:i,fullName:n,path:r}}function Y(e,...t){let r=st();if(r){let n=r.handlers[e];if(n)return n(r,...t)}}function M(e,t){let r=te({or:t,and:typeof e=="string"?{name:e}:e}),n=(o,...p)=>(Z(!k(n,"derived"),"call of derived event","createEvent"),Z(!se,"unit call from pure function","operators like sample"),V?((w,c,S,l)=>{let d=V,f=null;if(c)for(f=V;f&&f.template!==c;)f=W(f);Fe(f);let a=w.create(S,l);return Fe(d),a})(n,i,o,p):n.create(o,p)),i=st(),s=Object.assign(n,{graphite:T({meta:vt("event",n,r),regional:1}),create:o=>(nt({target:n,params:o,scope:b}),o),watch:o=>pt(n,o),map:o=>ye(n,Q,o,[N()]),filter:o=>ye(n,"filter",o.fn?o:o.fn,[N(Pe,1)]),filterMap:o=>ye(n,"filterMap",o,[N(),Ae(p=>!H(p),1)]),prepend(o){let p=M("* → "+n.shortName,{parent:W(n)});return Y("eventPrepend",x(p)),Ne(p,n,[N()],"prepend",o),Qt(n,p),p}});return r!=null&&r.domain&&r.domain.hooks.event(s),s}function je(e,t,r,n){return $t(r,t,"first argument"),j(I(n),"second argument should be a function"),Z(!k(e,"derived"),`${t} in derived store`,`${t} in store created via createStore`),B(Array.isArray(r)?r:[r],i=>{e.off(i),le(e).set(i,dt(ht(i,e,"on",zt,n)))}),e}function ot(e,t){let r=te(t),n=Kt(e),i=M({named:"updates",derived:1});Y("storeBase",n);let s=n.id,o={subscribers:new Map,updates:i,defaultState:e,stateRef:n,getState(){let a,u=n;if(V){let v=V;for(;v&&!v.reg[s];)v=W(v);v&&(a=v)}return!a&&b&&(G(b,n,1),a=b),a&&(u=a.reg[s]),ct(u)},setState:a=>nt({target:o,params:a,defer:1,scope:b}),reset:(...a)=>(B(a,u=>je(o,".reset",u,()=>o.defaultState)),o),on:(a,u)=>je(o,".on",a,u),off(a){let u=le(o).get(a);return u&&(u(),le(o).delete(a)),o},map(a,u){let v,R;K(a)&&(v=a,a=a.fn),Z(H(u),"second argument of store.map","updateFilter");let A=o.getState();H(A)||(R=a(A,u));let y=ot(R,{name:`${o.shortName} → *`,derived:1,and:v}),h=ht(o,y,Q,Ue,a);return Ut(ue(y),{type:Q,fn:a,from:n}),ue(y).noInit=1,Y("storeMap",n,h),y},watch(a,u){if(!u||!Ve(a)){let v=pt(o,a);return Y("storeWatch",n,a)||a(o.getState()),v}return j(I(u),"second argument should be a function"),a.watch(v=>u(o.getState(),v))}},p=vt("store",o,r),w=o.defaultConfig.updateFilter;o.graphite=T({scope:{state:n,fn:w},node:[Ae((a,u,v)=>(v.scope&&!v.scope.reg[n.id]&&(v.b=1),a)),Wt(n),Ae((a,u,{a:v,b:R})=>!H(a)&&(a!==v||R),1),w&&N(Ue,1),de({from:X,target:n})],child:i,meta:p,regional:1});let c=k(o,"serialize"),S=k(o,"derived"),l=c==="ignore",d=!c||l?0:c,f=k(o,"sid");return f&&(l||We(o,"storeChange",1),n.sid=f,d&&(n.meta={...n==null?void 0:n.meta,serialize:d})),f||l||S||We(o,"warnSerialize",1),j(S||!H(e),"current state can't be undefined, use null instead"),ut(o,[i]),r!=null&&r.domain&&r.domain.hooks.store(o),S||(o.reinit=M(),o.reset(o.reinit)),o}let Mt=typeof Symbol<"u"&&Symbol.observable||"@@observable",Q="map",X="stack",x=e=>e.graphite||e,ce=e=>e.family.owners,fe=e=>e.family.links,ue=e=>e.stateRef,J=e=>e.value,le=e=>e.subscribers,W=e=>e.parent,oe=e=>e.scope,k=(e,t)=>x(e).meta[t],We=(e,t,r)=>x(e).meta[t]=r,Vt=e=>e.compositeName,Ve=e=>(I(e)||K(e))&&"kind"in e;const ne=e=>t=>Ve(t)&&t.kind===e;let xe=ne("store"),xt=ne("event"),Ge=ne("effect"),it=ne("domain"),Dt=ne("scope");var Pt={__proto__:null,unit:Ve,store:xe,event:xt,effect:Ge,domain:it,scope:Dt,attached:e=>Ge(e)&&k(e,"attached")==1};let we=(e,t)=>{let r=e.indexOf(t);r!==-1&&e.splice(r,1)},D=(e,t)=>e.push(t),Z=(e,t,r)=>!e&&console.error(`${t} is deprecated${r?`, use ${r} instead`:""}`);const De=()=>{let e=0;return()=>""+ ++e};let Tt=De(),at=De(),It=De(),z=null,st=()=>z,Ht=e=>(e&&z&&z.sidRoot&&(e=`${z.sidRoot}|${e}`),e),ut=(e,t)=>{let r=x(e);B(t,n=>{let i=x(n);r.family.type!=="domain"&&(i.family.type="crosslink"),D(ce(i),r),D(fe(r),i)})},ie=(e=[])=>(Array.isArray(e)?e:[e]).flat().map(x),K=e=>typeof e=="object"&&e!==null,I=e=>typeof e=="function",H=e=>e===void 0,Nt=e=>j(K(e)||I(e),"expect first argument be an object");const Ke=(e,t,r,n)=>j(!(!K(e)&&!I(e)||!("family"in e)&&!("graphite"in e)),`${t}: expect ${r} to be a unit (store, event or effect)${n}`);let $t=(e,t,r)=>{Array.isArray(e)?B(e,(n,i)=>Ke(n,t,`${i} item of ${r}`,"")):Ke(e,t,r," or array of units")},Ue=(e,{fn:t},{a:r})=>t(e,r),zt=(e,{fn:t},{a:r})=>t(r,e),Pe=(e,{fn:t})=>t(e);const lt=(e,t,r,n)=>{let i={id:at(),type:e,data:t};return r&&(i.order={priority:r},n&&(i.order.barrierID=++jt)),i};let jt=0,de=({from:e="store",store:t,target:r,to:n=r?"store":X,batch:i,priority:s})=>lt("mov",{from:e,store:t,to:n,target:r},s,i),ee=({fn:e,batch:t,priority:r,safe:n=0,filter:i=0,pure:s=0})=>lt("compute",{fn:e,safe:n,filter:i,pure:s},r,t),Te=({fn:e})=>ee({fn:e,priority:"effect"}),Ae=(e,t,r)=>ee({fn:e,safe:1,filter:t,priority:r&&"effect"}),Wt=(e,t,r)=>de({store:e,to:t?X:"a",priority:r&&"sampler",batch:1}),N=(e=Pe,t)=>ee({fn:e,pure:1,filter:t}),Gt={mov:de,compute:ee,filter:({fn:e,pure:t})=>ee({fn:e,filter:1,pure:t}),run:Te},Kt=e=>({id:at(),current:e}),ct=({current:e})=>e,Ut=(e,t)=>{e.before||(e.before=[]),D(e.before,t)},$=null;const Ie=(e,t)=>{if(!e)return t;if(!t)return e;let r;return(e.v.type===t.v.type&&e.v.id>t.v.id||Be(e.v.type)>Be(t.v.type))&&(r=e,e=t,t=r),r=Ie(e.r,t),e.r=e.l,e.l=r,e},He=[];let qe=0;for(;qe<6;)D(He,{first:null,last:null,size:0}),qe+=1;const qt=()=>{for(let e=0;e<6;e++){let t=He[e];if(t.size>0){if(e===3||e===4){t.size-=1;let n=$.v;return $=Ie($.l,$.r),n}t.size===1&&(t.last=null);let r=t.first;return t.first=r.r,t.size-=1,r.v}}},P=(e,t,r,n,i,s,o)=>Le(0,{a:null,b:null,node:r,parent:n,value:i,page:t,scope:s,meta:o},e),Le=(e,t,r,n=0)=>{let i=Be(r),s=He[i],o={v:{idx:e,stack:t,type:r,id:n},l:null,r:null};i===3||i===4?$=Ie($,o):(s.size===0?s.first=o:s.last.r=o,s.last=o),s.size+=1},Be=e=>{switch(e){case"child":return 0;case"pure":return 1;case"read":return 2;case"barrier":return 3;case"sampler":return 4;case"effect":return 5;default:return-1}},_e=new Set;let b,ae=1,ge=0,se=0,V=null,Fe=e=>{V=e};const ft=(e,t)=>{if(e){for(;e&&!e.reg[t];)e=W(e);if(e)return e}return null};let Ft=(e,t,r,n,i)=>{let s=ft(e,n.id);return s?s.reg[n.id]:t?(G(t,n,i),t.reg[n.id]):n};const Yt=e=>e;let G=(e,t,r,n,i)=>{var s;let o=e.reg,p=t.sid,w=t==null||(s=t.meta)===null||s===void 0?void 0:s.serialize;if(o[t.id])return;let c={id:t.id,current:t.current,meta:t.meta};if(p&&p in e.sidValuesMap&&!(p in e.sidIdMap))c.current=(e.fromSerialize&&w!=="ignore"&&(w==null?void 0:w.read)||Yt)(e.sidValuesMap[p]);else if(t.before&&!i){let S=0,l=r||!t.noInit||n;B(t.before,d=>{switch(d.type){case Q:{let f=d.from;if(f||d.fn){f&&G(e,f,r,n);let a=f&&o[f.id].current;l&&(c.current=d.fn?d.fn(a):a)}break}case"field":S||(S=1,c.current=Array.isArray(c.current)?[...c.current]:{...c.current}),G(e,d.from,r,n),l&&(c.current[d.field]=o[o[d.from.id].id].current)}})}p&&(e.sidIdMap[p]=t.id),o[t.id]=c};const Jt=(e,t,r)=>{try{return t(J(r),e.scope,r)}catch(n){console.error(n),e.fail=1}};let te=(e,t={})=>(K(e)&&(te(e.or,t),Bt(e,(r,n)=>{H(r)||n==="or"||n==="and"||(t[n]=r)}),te(e.and,t)),t);const Ye=(e,t)=>{we(e.next,t),we(ce(e),t),we(fe(e),t)},Ce=(e,t,r)=>{let n;e.next.length=0,e.seq.length=0,e.scope=null;let i=fe(e);for(;n=i.pop();)Ye(n,e),(t||r&&k(e,"op")!=="sample"||n.family.type==="crosslink")&&Ce(n,t,k(n,"op")!=="on"&&r);for(i=ce(e);n=i.pop();)Ye(n,e),r&&n.family.type==="crosslink"&&Ce(n,t,k(n,"op")!=="on"&&r)},F=e=>e.clear();let Me=(e,{deep:t}={})=>{let r=0;if(e.ownerSet&&e.ownerSet.delete(e),xe(e))F(le(e));else if(it(e)){r=1;let n=e.history;F(n.events),F(n.effects),F(n.stores),F(n.domains)}Ce(x(e),!!t,r)},dt=e=>{let t=()=>Me(e);return t.unsubscribe=t,t},Ne=(e,t,r,n,i)=>T({node:r,parent:e,child:t,scope:{fn:i},meta:{op:n},family:{owners:[e,t],links:t},regional:1}),pt=(e,t)=>(j(I(t),".watch argument should be a function"),dt(T({scope:{fn:t},node:[Te({fn:Pe})],parent:e,meta:{op:"watch"},family:{owners:e},regional:1}))),Qt=(e,t,r="event")=>{W(e)&&W(e).hooks[r](t)},vt=(e,t,r)=>{let n=te(r),i=e==="domain",s=Tt(),{sid:o=null,named:p=null,domain:w=null,parent:c=w}=n,S=p||n.name||(i?"":s),l=Ct(S,c),d={op:t.kind=e,name:t.shortName=S,sid:t.sid=Ht(o),named:p,unitId:t.id=s,serialize:n.serialize,derived:n.derived,config:n};return t.parent=c,t.compositeName=l,t.defaultConfig=n,t.thru=f=>(Z(0,"thru","js pipe"),f(t)),t.getType=()=>l.fullName,!i&&(t.subscribe=f=>(Nt(f),t.watch(I(f)?f:a=>f.next&&f.next(a))),t[Mt]=()=>t),d};const ye=(e,t,r,n)=>{let i;K(r)&&(i=r,r=r.fn);let s=M({name:`${e.shortName} → *`,derived:1,and:i});return Ne(e,s,n,t,r),s},ht=(e,t,r,n,i)=>{let s=ue(t),o=de({store:s,to:"a",priority:"read"});r===Q&&(o.data.softRead=1);let p=[o,N(n)];return Y("storeOnMap",s,p,xe(e)&&ue(e)),Ne(e,t,p,r,i)};T({node:[Te({fn:({fn:e,value:t})=>e(t)})],meta:{op:"fx",fx:"sidechain"}});const mt=M(),St=M(),wt=M(),$e=M(),ze=M(),_t=M(),Xt=M(),Zt=ot({activeView:null,activePanel:null,activeModal:null,activePopout:null,isRouteInit:!1,isBackHandled:!0}).on(mt,(e,t)=>({...e,activeView:t})).on(St,(e,t)=>({...e,activePanel:t})).on($e,(e,t)=>({...e,activeModal:t})).on(ze,(e,t)=>({...e,activePopout:t})).on(_t,e=>({...e,isRouteInit:!0})).on(wt,(e,{view:t,panel:r})=>({...e,activeView:t,activePanel:r})).on(Xt,(e,t)=>({...e,isBackHandled:t}));function er(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Je={},tr={get exports(){return Je},set exports(e){Je=e}},Ee={},re={},rr={get exports(){return re},set exports(e){re=e}},be={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qe;function nr(){if(Qe)return be;Qe=1;var e=L;function t(l,d){return l===d&&(l!==0||1/l===1/d)||l!==l&&d!==d}var r=typeof Object.is=="function"?Object.is:t,n=e.useState,i=e.useEffect,s=e.useLayoutEffect,o=e.useDebugValue;function p(l,d){var f=d(),a=n({inst:{value:f,getSnapshot:d}}),u=a[0].inst,v=a[1];return s(function(){u.value=f,u.getSnapshot=d,w(u)&&v({inst:u})},[l,f,d]),i(function(){return w(u)&&v({inst:u}),l(function(){w(u)&&v({inst:u})})},[l]),o(f),f}function w(l){var d=l.getSnapshot;l=l.value;try{var f=d();return!r(l,f)}catch{return!0}}function c(l,d){return d()}var S=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?c:p;return be.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:S,be}var Oe={};/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xe;function or(){return Xe||(Xe=1,process.env.NODE_ENV!=="production"&&function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var e=L,t=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function r(y){{for(var h=arguments.length,g=new Array(h>1?h-1:0),m=1;m<h;m++)g[m-1]=arguments[m];n("error",y,g)}}function n(y,h,g){{var m=t.ReactDebugCurrentFrame,_=m.getStackAddendum();_!==""&&(h+="%s",g=g.concat([_]));var E=g.map(function(O){return String(O)});E.unshift("Warning: "+h),Function.prototype.apply.call(console[y],console,E)}}function i(y,h){return y===h&&(y!==0||1/y===1/h)||y!==y&&h!==h}var s=typeof Object.is=="function"?Object.is:i,o=e.useState,p=e.useEffect,w=e.useLayoutEffect,c=e.useDebugValue,S=!1,l=!1;function d(y,h,g){S||e.startTransition!==void 0&&(S=!0,r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));var m=h();if(!l){var _=h();s(m,_)||(r("The result of getSnapshot should be cached to avoid an infinite loop"),l=!0)}var E=o({inst:{value:m,getSnapshot:h}}),O=E[0].inst,U=E[1];return w(function(){O.value=m,O.getSnapshot=h,f(O)&&U({inst:O})},[y,m,h]),p(function(){f(O)&&U({inst:O});var pe=function(){f(O)&&U({inst:O})};return y(pe)},[y]),c(m),m}function f(y){var h=y.getSnapshot,g=y.value;try{var m=h();return!s(g,m)}catch{return!0}}function a(y,h,g){return h()}var u=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",v=!u,R=v?a:d,A=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:R;Oe.useSyncExternalStore=A,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)}()),Oe}(function(e){process.env.NODE_ENV==="production"?e.exports=nr():e.exports=or()})(rr);const ir=er(re);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ze;function ar(){if(Ze)return Ee;Ze=1;var e=L,t=re;function r(c,S){return c===S&&(c!==0||1/c===1/S)||c!==c&&S!==S}var n=typeof Object.is=="function"?Object.is:r,i=t.useSyncExternalStore,s=e.useRef,o=e.useEffect,p=e.useMemo,w=e.useDebugValue;return Ee.useSyncExternalStoreWithSelector=function(c,S,l,d,f){var a=s(null);if(a.current===null){var u={hasValue:!1,value:null};a.current=u}else u=a.current;a=p(function(){function R(m){if(!A){if(A=!0,y=m,m=d(m),f!==void 0&&u.hasValue){var _=u.value;if(f(_,m))return h=_}return h=m}if(_=h,n(y,m))return _;var E=d(m);return f!==void 0&&f(_,E)?_:(y=m,h=E)}var A=!1,y,h,g=l===void 0?null:l;return[function(){return R(S())},g===null?void 0:function(){return R(g())}]},[S,l,d,f]);var v=i(c,a[0],a[1]);return o(function(){u.hasValue=!0,u.value=v},[v]),w(v),v},Ee}var Re={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var et;function sr(){return et||(et=1,process.env.NODE_ENV!=="production"&&function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var e=L,t=re;function r(S,l){return S===l&&(S!==0||1/S===1/l)||S!==S&&l!==l}var n=typeof Object.is=="function"?Object.is:r,i=t.useSyncExternalStore,s=e.useRef,o=e.useEffect,p=e.useMemo,w=e.useDebugValue;function c(S,l,d,f,a){var u=s(null),v;u.current===null?(v={hasValue:!1,value:null},u.current=v):v=u.current;var R=p(function(){var g=!1,m,_,E=function(q){if(!g){g=!0,m=q;var ve=f(q);if(a!==void 0&&v.hasValue){var he=v.value;if(a(he,ve))return _=he,he}return _=ve,ve}var bt=m,me=_;if(n(bt,q))return me;var Se=f(q);return a!==void 0&&a(me,Se)?me:(m=q,_=Se,Se)},O=d===void 0?null:d,U=function(){return E(l())},pe=O===null?void 0:function(){return E(O())};return[U,pe]},[l,d,f,a]),A=R[0],y=R[1],h=i(S,A,y);return o(function(){v.hasValue=!0,v.value=h},[h]),w(h),h}Re.useSyncExternalStoreWithSelector=c,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)}()),Re}(function(e){process.env.NODE_ENV==="production"?e.exports=ar():e.exports=sr()})(tr);function ur(e,t,r,n){let i=[Gt.run({fn:s=>t(s)})];if(n&&i.unshift(n),r){let s=T({node:i}),o=e.graphite.id,p=r.additionalLinks,w=p[o]||[];return p[o]=w,w.push(s),()=>{let c=w.indexOf(s);c!==-1&&w.splice(c,1),Me(s)}}{let s=T({node:i,parent:[e],family:{owners:e}});return()=>{Me(s)}}}function lr(e,t){Pt.store(e)||gt("expect useStore argument to be a store");let r=L.useCallback(i=>ur(e,i,t),[e,t]),n=L.useCallback(()=>pr(e,t),[e,t]);return dr(r,n,n)}function cr(e){let t=L.useContext(vr);return e&&!t&&gt("No scope found, consider adding <Provider> to app root"),t}function fr(e,t){return lr(e,cr(t==null?void 0:t.forceScope))}let gt=e=>{throw Error(e)};typeof window<"u"?L.useLayoutEffect:L.useEffect;const{useSyncExternalStore:dr}=ir,pr=(e,t)=>t?t.getState(e):e.getState(),vr=L.createContext(null),hr=(e,t,r)=>{L.useEffect(()=>{const n=i=>{i instanceof KeyboardEvent&&i.key===r?t(i):r||t(i)};return window.addEventListener(e,n),()=>window.removeEventListener(e,n)},[e,r,t])},tt=(e,t,r,n)=>{L.useEffect(()=>(C.addEventListener(e,t,r),()=>C.removeEventListener(r)),[...n])},mr=(e,...t)=>{const{activeView:r,activePanel:n,activeModal:i,activePopout:s,isRouteInit:o}=yt();tt("init",p=>{console.log("[blum]: initialized",p),o||(ke(),C.historyPush(e))},1,[o]),hr("popstate",async()=>{const p=async()=>{window.blumRouter.isDispatchChangeStateEventBeforeMiddleware&&C.dispatchChangeStateEvent();const{view:w,panel:c,modal:S,popout:l}=window.history.state??{view:void 0,panel:void 0,modal:void 0,popout:void 0};console.log("prevRoutes",w,c,S,l),console.log("storeRoutes",r,n,i,s);for(const d in t)if(!await t[d]({view:r,panel:n,modal:i,popout:s},{view:w,panel:c,modal:S,popout:l}))return;window.blumRouter.isDispatchChangeStateEventAfterMiddleware&&C.dispatchChangeStateEvent()};o&&(window.blumRouter.beforeBackHandledCallback&&window.blumRouter.beforeBackHandledCallback(),await p(),window.blumRouter.isBackFromBrowser=!0,window.blumRouter.afterBackHandledCallback&&window.blumRouter.afterBackHandledCallback(),ke())}),tt("changestate",p=>{if(console.log("[blum]: state changed",p),p){const{view:w,panel:c,modal:S,popout:l}=p;w&&c&&wt({view:w,panel:c}),$e(S),ze(l),o||_t()}},2,[o])},yt=()=>fr(Zt),Sr=e=>e,wr=(e,t)=>Et(e,(r,n)=>{t&&t(r,n),C.historyPush(r)}),Et=(e,t)=>(r,n)=>["view","panel","modal","popout"].some(s=>r[s]===e&&r[s]!==n[s])&&window.blumRouter.isBackFromBrowser?(t&&t(r,n),!1):!0;exports._setActiveModal=$e;exports._setActivePanel=St;exports._setActivePopout=ze;exports._setActiveView=mt;exports.back=Ot;exports.blumRouter=C;exports.createCatchBackBrowserRouteMiddleware=Et;exports.createDisableBackBrowserRouteMiddleware=wr;exports.createRouteMiddleware=Sr;exports.setActiveModal=At;exports.setActivePanel=kt;exports.setActivePopout=Lt;exports.setActiveViewPanel=Rt;exports.setBackHandlerOptions=rt;exports.setDefaultBackHandlerOptions=ke;exports.useInitRouter=mr;exports.useRouter=yt;
