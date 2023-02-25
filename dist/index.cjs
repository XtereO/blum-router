"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const x=require("react");function kt(e,t){for(let n in e)t(e[n],n)}function V(e,t){e.forEach(t)}function I(e,t){if(!e)throw Error(t)}function B({node:e=[],from:t,source:n,parent:r=t||n,to:l,target:s,child:a=l||s,scope:m={},meta:y={},family:p={type:"regular"},regional:h}={}){let c=ue(r),d=ue(p.links),o=ue(p.owners),i=[];V(e,f=>f&&D(i,f));let u={id:Bt(),seq:i,next:ue(a),meta:y,scope:m,family:{type:p.type||"crosslink",links:d,owners:o}};return V(d,f=>D(ye(f),u)),V(o,f=>D(ge(f),u)),V(c,f=>D(f.next,u)),h&&W&&je(X(W),[u]),u}function ee(e,t,n){let r,l=P,s=null,a=O;if(e.target&&(t=e.params,n=e.defer,r=e.meta,l="page"in e?e.page:l,e.stack&&(s=e.stack),a=C(e)||a,e=e.target),a&&O&&a!==O&&(O=null),Array.isArray(e))for(let i=0;i<e.length;i++)$("pure",l,T(e[i]),s,t[i],a,r);else $("pure",l,T(e),s,t,a,r);if(n&&!le)return;let m,y,p,h,c,d,o={isRoot:le,currentPage:P,scope:O,isWatch:ce,isPure:fe};le=0;e:for(;h=Ut();){let{idx:i,stack:u,type:f}=h;p=u.node,P=c=u.page,O=C(u),c?d=c.reg:O&&(d=O.reg);let b=!!c,R=!!O,w={fail:0,scope:p.scope};m=y=0;for(let v=i;v<p.seq.length&&!m;v++){let g=p.seq[v];if(g.order){let{priority:S,barrierID:_}=g.order,E=_?c?`${c.fullID}_${_}`:_:0;if(v!==i||f!==S){_?ke.has(E)||(ke.add(E),Te(v,u,S,_)):Te(v,u,S);continue e}_&&ke.delete(E)}switch(g.type){case"mov":{let _,E=g.data;switch(E.from){case re:_=X(u);break;case"a":case"b":_=u[E.from];break;case"value":_=E.store;break;case"store":if(d&&!d[E.store.id])if(b){let A=St(c,E.store.id);u.page=c=A,A?d=A.reg:R?(F(O,E.store,0,1,E.softRead),d=O.reg):d=void 0}else R&&F(O,E.store,0,1,E.softRead);_=ht(d&&d[E.store.id]||E.store)}switch(E.to){case re:u.value=_;break;case"a":case"b":u[E.to]=_;break;case"store":Jt(c,O,p,E.target).current=_}break}case"compute":let S=g.data;if(S.fn){ce=k(p,"op")==="watch",fe=S.pure;let _=S.safe?(0,S.fn)(X(u),w.scope,u):Xt(w,S.fn,u);S.filter?y=!_:u.value=_,ce=o.isWatch,fe=o.isPure}}m=w.fail||y}if(!m){let v=X(u),g=C(u);if(V(p.next,S=>{$("child",c,S,u,v,g)}),g){k(p,"needFxCounter")&&$("child",c,g.fxCount,u,v,g),k(p,"storeChange")&&$("child",c,g.storeChange,u,v,g),k(p,"warnSerialize")&&$("child",c,g.warnSerializeNode,u,v,g);let S=g.additionalLinks[p.id];S&&V(S,_=>{$("child",c,_,u,v,g)})}}}le=o.isRoot,P=o.currentPage,O=C(o)}function xt(e,t){let n,r,l=e;if(t){let s=Dt(t);e.length===0?(n=s.path,r=s.fullName):(n=s.path.concat([e]),r=s.fullName.length===0?e:s.fullName+"/"+e)}else n=e.length===0?[]:[e],r=e;return{shortName:l,fullName:r,path:n}}function Q(e,...t){let n=vt();if(n){let r=n.handlers[e];if(r)return r(n,...t)}}function L(e,t){let n=K({or:t,and:typeof e=="string"?{name:e}:e}),r=(a,...m)=>(ne(!k(r,"derived"),"call of derived event","createEvent"),ne(!fe,"unit call from pure function","operators like sample"),P?((y,p,h,c)=>{let d=P,o=null;if(p)for(o=P;o&&o.template!==p;)o=N(o);rt(o);let i=y.create(h,c);return rt(d),i})(r,l,a,m):r.create(a,m)),l=vt(),s=Object.assign(r,{graphite:B({meta:gt("event",r,n),regional:1}),create:a=>(ee({target:r,params:a,scope:O}),a),watch:a=>yt(r,a),map:a=>xe(r,te,a,[q()]),filter:a=>xe(r,"filter",a.fn?a:a.fn,[q(ze,1)]),filterMap:a=>xe(r,"filterMap",a,[q(),G(m=>!z(m),1)]),prepend(a){let m=L("* → "+r.shortName,{parent:N(r)});return Q("eventPrepend",T(m)),Ge(m,r,[q()],"prepend",a),Zt(r,m),m}});return n!=null&&n.domain&&n.domain.hooks.event(s),s}function Qe(e,t,n,r){return zt(n,t,"first argument"),I(M(r),"second argument should be a function"),ne(!k(e,"derived"),`${t} in derived store`,`${t} in store created via createStore`),V(Array.isArray(n)?n:[n],l=>{e.off(l),pe(e).set(l,_t(wt(l,e,"on",qt,r)))}),e}function _e(e,t){let n=K(t),r=Ft(e),l=L({named:"updates",derived:1});Q("storeBase",r);let s=r.id,a={subscribers:new Map,updates:l,defaultState:e,stateRef:r,getState(){let i,u=r;if(P){let f=P;for(;f&&!f.reg[s];)f=N(f);f&&(i=f)}return!i&&O&&(F(O,r,1),i=O),i&&(u=i.reg[s]),ht(u)},setState:i=>ee({target:a,params:i,defer:1,scope:O}),reset:(...i)=>(V(i,u=>Qe(a,".reset",u,()=>a.defaultState)),a),on:(i,u)=>Qe(a,".on",i,u),off(i){let u=pe(a).get(i);return u&&(u(),pe(a).delete(i)),a},map(i,u){let f,b;j(i)&&(f=i,i=i.fn),ne(z(u),"second argument of store.map","updateFilter");let R=a.getState();z(R)||(b=i(R,u));let w=_e(b,{name:`${a.shortName} → *`,derived:1,and:f}),v=wt(a,w,te,et,i);return Kt(de(w),{type:te,fn:i,from:r}),de(w).noInit=1,Q("storeMap",r,v),w},watch(i,u){if(!u||!$e(i)){let f=yt(a,i);return Q("storeWatch",r,i)||i(a.getState()),f}return I(M(u),"second argument should be a function"),i.watch(f=>u(a.getState(),f))}},m=gt("store",a,n),y=a.defaultConfig.updateFilter;a.graphite=B({scope:{state:r,fn:y},node:[G((i,u,f)=>(f.scope&&!f.scope.reg[r.id]&&(f.b=1),i)),Wt(r),G((i,u,{a:f,b})=>!z(i)&&(i!==f||b),1),y&&q(et,1),Ee({from:re,target:r})],child:l,meta:m,regional:1});let p=k(a,"serialize"),h=k(a,"derived"),c=p==="ignore",d=!p||c?0:p,o=k(a,"sid");return o&&(c||Z(a,"storeChange",1),r.sid=o,d&&(r.meta={...r==null?void 0:r.meta,serialize:d})),o||c||h||Z(a,"warnSerialize",1),I(h||!z(e),"current state can't be undefined, use null instead"),je(a,[l]),n!=null&&n.domain&&n.domain.hooks.store(a),h||(a.reinit=L(),a.reset(a.reinit)),a}function Vt(){let e={};return e.req=new Promise((t,n)=>{e.rs=t,e.rj=n}),e.req.catch(()=>{}),e}function ft(e,t){let n=K(M(e)?{handler:e}:e,t),r=L(M(e)?{handler:e}:e,t),l=T(r);Z(l,"op",r.kind="effect"),r.use=o=>(I(M(o),".use argument should be a function"),h.scope.handler=o,r),r.use.getCurrent=()=>h.scope.handler;let s=r.finally=L({named:"finally",derived:1}),a=r.done=s.filterMap({named:"done",fn({status:o,params:i,result:u}){if(o==="done")return{params:i,result:u}}}),m=r.fail=s.filterMap({named:"fail",fn({status:o,params:i,error:u}){if(o==="fail")return{params:i,error:u}}}),y=r.doneData=a.map({named:"doneData",fn:({result:o})=>o}),p=r.failData=m.map({named:"failData",fn:({error:o})=>o}),h=B({scope:{handlerId:k(l,"sid"),handler:r.defaultConfig.handler||(()=>I(0,`no handler used in ${r.getType()}`))},node:[G((o,i,u)=>{let f=i,b=f.handler;if(C(u)){let R=C(u).handlers[f.handlerId];R&&(b=R)}return o.handler=b,o},0,1),G(({params:o,req:i,handler:u,args:f=[o]},b,R)=>{let w=tr(R),v=at(o,i,1,s,R,w),g=at(o,i,0,s,R,w),[S,_]=er(u,g,f);S&&(j(_)&&M(_.then)?_.then(v,g):v(_))},0,1)],meta:{op:"fx",fx:"runner"}});l.scope.runner=h,D(l.seq,G((o,{runner:i},u)=>{let f=N(u)?{params:o,req:{rs(b){},rj(b){}}}:o;return u.meta||(u.meta={fxID:$t()}),ee({target:i,params:f,defer:1,scope:C(u),meta:u.meta}),f.params},0,1)),r.create=o=>{let i=Vt(),u={params:o,req:i};if(O&&!ce){let f=O;i.req.finally(()=>{Yt(f)}).catch(()=>{})}return ee({target:r,params:u,scope:O}),i.req};let c=r.inFlight=_e(0,{serialize:"ignore"}).on(r,o=>o+1).on(s,o=>o-1).map({fn:o=>o,named:"inFlight"});Z(s,"needFxCounter","dec"),Z(r,"needFxCounter",1);let d=r.pending=c.map({fn:o=>o>0,named:"pending"});return je(r,[s,a,m,y,p,d,c]),n!=null&&n.domain&&n.domain.hooks.effect(r),r}let Mt=typeof Symbol<"u"&&Symbol.observable||"@@observable",te="map",re="stack",T=e=>e.graphite||e,ye=e=>e.family.owners,ge=e=>e.family.links,de=e=>e.stateRef,X=e=>e.value,pe=e=>e.subscribers,N=e=>e.parent,C=e=>e.scope,k=(e,t)=>T(e).meta[t],Z=(e,t,n)=>T(e).meta[t]=n,Dt=e=>e.compositeName,$e=e=>(M(e)||j(e))&&"kind"in e;const ie=e=>t=>$e(t)&&t.kind===e;let Ne=ie("store"),Pt=ie("event"),Xe=ie("effect"),dt=ie("domain"),Tt=ie("scope");var Ct={__proto__:null,unit:$e,store:Ne,event:Pt,effect:Xe,domain:dt,scope:Tt,attached:e=>Xe(e)&&k(e,"attached")==1};let se=(e,t)=>{let n=e.indexOf(t);n!==-1&&e.splice(n,1)},D=(e,t)=>e.push(t),ne=(e,t,n)=>!e&&console.error(`${t} is deprecated${n?`, use ${n} instead`:""}`);const we=()=>{let e=0;return()=>""+ ++e};let It=we(),pt=we(),Bt=we(),$t=we(),W=null,vt=()=>W,Nt=e=>(e&&W&&W.sidRoot&&(e=`${W.sidRoot}|${e}`),e),je=(e,t)=>{let n=T(e);V(t,r=>{let l=T(r);n.family.type!=="domain"&&(l.family.type="crosslink"),D(ye(l),n),D(ge(n),l)})},ue=(e=[])=>(Array.isArray(e)?e:[e]).flat().map(T),j=e=>typeof e=="object"&&e!==null,M=e=>typeof e=="function",z=e=>e===void 0,jt=e=>I(j(e)||M(e),"expect first argument be an object");const Ze=(e,t,n,r)=>I(!(!j(e)&&!M(e)||!("family"in e)&&!("graphite"in e)),`${t}: expect ${n} to be a unit (store, event or effect)${r}`);let zt=(e,t,n)=>{Array.isArray(e)?V(e,(r,l)=>Ze(r,t,`${l} item of ${n}`,"")):Ze(e,t,n," or array of units")},et=(e,{fn:t},{a:n})=>t(e,n),qt=(e,{fn:t},{a:n})=>t(n,e),ze=(e,{fn:t})=>t(e);const mt=(e,t,n,r)=>{let l={id:pt(),type:e,data:t};return n&&(l.order={priority:n},r&&(l.order.barrierID=++Ht)),l};let Ht=0,Ee=({from:e="store",store:t,target:n,to:r=n?"store":re,batch:l,priority:s})=>mt("mov",{from:e,store:t,to:r,target:n},s,l),ae=({fn:e,batch:t,priority:n,safe:r=0,filter:l=0,pure:s=0})=>mt("compute",{fn:e,safe:r,filter:l,pure:s},n,t),qe=({fn:e})=>ae({fn:e,priority:"effect"}),G=(e,t,n)=>ae({fn:e,safe:1,filter:t,priority:n&&"effect"}),Wt=(e,t,n)=>Ee({store:e,to:t?re:"a",priority:n&&"sampler",batch:1}),q=(e=ze,t)=>ae({fn:e,pure:1,filter:t}),Gt={mov:Ee,compute:ae,filter:({fn:e,pure:t})=>ae({fn:e,filter:1,pure:t}),run:qe},Ft=e=>({id:pt(),current:e}),ht=({current:e})=>e,Kt=(e,t)=>{e.before||(e.before=[]),D(e.before,t)},H=null;const He=(e,t)=>{if(!e)return t;if(!t)return e;let n;return(e.v.type===t.v.type&&e.v.id>t.v.id||Ce(e.v.type)>Ce(t.v.type))&&(n=e,e=t,t=n),n=He(e.r,t),e.r=e.l,e.l=n,e},We=[];let tt=0;for(;tt<6;)D(We,{first:null,last:null,size:0}),tt+=1;const Ut=()=>{for(let e=0;e<6;e++){let t=We[e];if(t.size>0){if(e===3||e===4){t.size-=1;let r=H.v;return H=He(H.l,H.r),r}t.size===1&&(t.last=null);let n=t.first;return t.first=n.r,t.size-=1,n.v}}},$=(e,t,n,r,l,s,a)=>Te(0,{a:null,b:null,node:n,parent:r,value:l,page:t,scope:s,meta:a},e),Te=(e,t,n,r=0)=>{let l=Ce(n),s=We[l],a={v:{idx:e,stack:t,type:n,id:r},l:null,r:null};l===3||l===4?H=He(H,a):(s.size===0?s.first=a:s.last.r=a,s.last=a),s.size+=1},Ce=e=>{switch(e){case"child":return 0;case"pure":return 1;case"read":return 2;case"barrier":return 3;case"sampler":return 4;case"effect":return 5;default:return-1}},ke=new Set;let O,le=1,ce=0,fe=0,P=null,Yt=e=>{O=e},rt=e=>{P=e};const St=(e,t)=>{if(e){for(;e&&!e.reg[t];)e=N(e);if(e)return e}return null};let Jt=(e,t,n,r,l)=>{let s=St(e,r.id);return s?s.reg[r.id]:t?(F(t,r,l),t.reg[r.id]):r};const Qt=e=>e;let F=(e,t,n,r,l)=>{var s;let a=e.reg,m=t.sid,y=t==null||(s=t.meta)===null||s===void 0?void 0:s.serialize;if(a[t.id])return;let p={id:t.id,current:t.current,meta:t.meta};if(m&&m in e.sidValuesMap&&!(m in e.sidIdMap))p.current=(e.fromSerialize&&y!=="ignore"&&(y==null?void 0:y.read)||Qt)(e.sidValuesMap[m]);else if(t.before&&!l){let h=0,c=n||!t.noInit||r;V(t.before,d=>{switch(d.type){case te:{let o=d.from;if(o||d.fn){o&&F(e,o,n,r);let i=o&&a[o.id].current;c&&(p.current=d.fn?d.fn(i):i)}break}case"field":h||(h=1,p.current=Array.isArray(p.current)?[...p.current]:{...p.current}),F(e,d.from,n,r),c&&(p.current[d.field]=a[a[d.from.id].id].current)}})}m&&(e.sidIdMap[m]=t.id),a[t.id]=p};const Xt=(e,t,n)=>{try{return t(X(n),e.scope,n)}catch(r){console.error(r),e.fail=1}};let K=(e,t={})=>(j(e)&&(K(e.or,t),kt(e,(n,r)=>{z(n)||r==="or"||r==="and"||(t[r]=n)}),K(e.and,t)),t);const nt=(e,t)=>{se(e.next,t),se(ye(e),t),se(ge(e),t)},Ie=(e,t,n)=>{let r;e.next.length=0,e.seq.length=0,e.scope=null;let l=ge(e);for(;r=l.pop();)nt(r,e),(t||n&&k(e,"op")!=="sample"||r.family.type==="crosslink")&&Ie(r,t,k(r,"op")!=="on"&&n);for(l=ye(e);r=l.pop();)nt(r,e),n&&r.family.type==="crosslink"&&Ie(r,t,k(r,"op")!=="on"&&n)},J=e=>e.clear();let Be=(e,{deep:t}={})=>{let n=0;if(e.ownerSet&&e.ownerSet.delete(e),Ne(e))J(pe(e));else if(dt(e)){n=1;let r=e.history;J(r.events),J(r.effects),J(r.stores),J(r.domains)}Ie(T(e),!!t,n)},_t=e=>{let t=()=>Be(e);return t.unsubscribe=t,t},Ge=(e,t,n,r,l)=>B({node:n,parent:e,child:t,scope:{fn:l},meta:{op:r},family:{owners:[e,t],links:t},regional:1}),yt=(e,t)=>(I(M(t),".watch argument should be a function"),_t(B({scope:{fn:t},node:[qe({fn:ze})],parent:e,meta:{op:"watch"},family:{owners:e},regional:1}))),Zt=(e,t,n="event")=>{N(e)&&N(e).hooks[n](t)},gt=(e,t,n)=>{let r=K(n),l=e==="domain",s=It(),{sid:a=null,named:m=null,domain:y=null,parent:p=y}=r,h=m||r.name||(l?"":s),c=xt(h,p),d={op:t.kind=e,name:t.shortName=h,sid:t.sid=Nt(a),named:m,unitId:t.id=s,serialize:r.serialize,derived:r.derived,config:r};return t.parent=p,t.compositeName=c,t.defaultConfig=r,t.thru=o=>(ne(0,"thru","js pipe"),o(t)),t.getType=()=>c.fullName,!l&&(t.subscribe=o=>(jt(o),t.watch(M(o)?o:i=>o.next&&o.next(i))),t[Mt]=()=>t),d};const xe=(e,t,n,r)=>{let l;j(n)&&(l=n,n=n.fn);let s=L({name:`${e.shortName} → *`,derived:1,and:l});return Ge(e,s,r,t,n),s},wt=(e,t,n,r,l)=>{let s=de(t),a=Ee({store:s,to:"a",priority:"read"});n===te&&(a.data.softRead=1);let m=[a,q(r)];return Q("storeOnMap",s,m,Ne(e)&&de(e)),Ge(e,t,m,n,l)};let er=(e,t,n)=>{try{return[1,e(...n)]}catch(r){return t(r),[0,null]}},tr=e=>{let t=C(e),n={ref:t};return t&&D(t.activeEffects,n),n},at=(e,t,n,r,l,s)=>a=>{s.ref&&se(s.ref.activeEffects,s),ee({target:[r,rr],params:[n?{status:"done",params:e,result:a}:{status:"fail",params:e,error:a},{value:a,fn:n?t.rs:t.rj}],defer:1,page:l.page,scope:s.ref,meta:l.meta})};const rr=B({node:[qe({fn:({fn:e,value:t})=>e(t)})],meta:{op:"fx",fx:"sidechain"}}),nr=ft(()=>{window.isBackFromBrowser=!1,window.history.back()}),Fe=ft(e=>{window.history.pushState(e,"")}),ve=L(),me=L(),he=L(),Se=L(),Et=L(),Ot=L(),ot=L(),ar=_e({activeView:null,activePanel:null,activeModal:null,activePopout:null,isRouteInit:!1,isBackHandled:!0}).on(ve,(e,t)=>({...e,activeView:t})).on(me,(e,t)=>({...e,activePanel:t})).on(he,(e,t)=>({...e,activeModal:t})).on(Se,(e,t)=>({...e,activePopout:t})).on(Ot,e=>({...e,isRouteInit:!0})).on(Et,(e,t)=>({...e,activeView:t.hasOwnProperty("view")?t.view:e.activeView,activePanel:t.hasOwnProperty("panel")?t.panel:e.activePanel,activeModal:t.hasOwnProperty("modal")?t.modal:e.activeModal,activePopout:t.hasOwnProperty("popout")?t.popout:e.activePopout}));function or(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={},ir={get exports(){return it},set exports(e){it=e}},Ve={},oe={},ur={get exports(){return oe},set exports(e){oe=e}},Me={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ut;function lr(){if(ut)return Me;ut=1;var e=x;function t(c,d){return c===d&&(c!==0||1/c===1/d)||c!==c&&d!==d}var n=typeof Object.is=="function"?Object.is:t,r=e.useState,l=e.useEffect,s=e.useLayoutEffect,a=e.useDebugValue;function m(c,d){var o=d(),i=r({inst:{value:o,getSnapshot:d}}),u=i[0].inst,f=i[1];return s(function(){u.value=o,u.getSnapshot=d,y(u)&&f({inst:u})},[c,o,d]),l(function(){return y(u)&&f({inst:u}),c(function(){y(u)&&f({inst:u})})},[c]),a(o),o}function y(c){var d=c.getSnapshot;c=c.value;try{var o=d();return!n(c,o)}catch{return!0}}function p(c,d){return d()}var h=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?p:m;return Me.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:h,Me}var De={};/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lt;function sr(){return lt||(lt=1,process.env.NODE_ENV!=="production"&&function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var e=x,t=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function n(w){{for(var v=arguments.length,g=new Array(v>1?v-1:0),S=1;S<v;S++)g[S-1]=arguments[S];r("error",w,g)}}function r(w,v,g){{var S=t.ReactDebugCurrentFrame,_=S.getStackAddendum();_!==""&&(v+="%s",g=g.concat([_]));var E=g.map(function(A){return String(A)});E.unshift("Warning: "+v),Function.prototype.apply.call(console[w],console,E)}}function l(w,v){return w===v&&(w!==0||1/w===1/v)||w!==w&&v!==v}var s=typeof Object.is=="function"?Object.is:l,a=e.useState,m=e.useEffect,y=e.useLayoutEffect,p=e.useDebugValue,h=!1,c=!1;function d(w,v,g){h||e.startTransition!==void 0&&(h=!0,n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));var S=v();if(!c){var _=v();s(S,_)||(n("The result of getSnapshot should be cached to avoid an infinite loop"),c=!0)}var E=a({inst:{value:S,getSnapshot:v}}),A=E[0].inst,U=E[1];return y(function(){A.value=S,A.getSnapshot=v,o(A)&&U({inst:A})},[w,S,v]),m(function(){o(A)&&U({inst:A});var Oe=function(){o(A)&&U({inst:A})};return w(Oe)},[w]),p(S),S}function o(w){var v=w.getSnapshot,g=w.value;try{var S=v();return!s(g,S)}catch{return!0}}function i(w,v,g){return v()}var u=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",f=!u,b=f?i:d,R=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:b;De.useSyncExternalStore=R,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)}()),De}(function(e){process.env.NODE_ENV==="production"?e.exports=lr():e.exports=sr()})(ur);const cr=or(oe);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var st;function fr(){if(st)return Ve;st=1;var e=x,t=oe;function n(p,h){return p===h&&(p!==0||1/p===1/h)||p!==p&&h!==h}var r=typeof Object.is=="function"?Object.is:n,l=t.useSyncExternalStore,s=e.useRef,a=e.useEffect,m=e.useMemo,y=e.useDebugValue;return Ve.useSyncExternalStoreWithSelector=function(p,h,c,d,o){var i=s(null);if(i.current===null){var u={hasValue:!1,value:null};i.current=u}else u=i.current;i=m(function(){function b(S){if(!R){if(R=!0,w=S,S=d(S),o!==void 0&&u.hasValue){var _=u.value;if(o(_,S))return v=_}return v=S}if(_=v,r(w,S))return _;var E=d(S);return o!==void 0&&o(_,E)?_:(w=S,v=E)}var R=!1,w,v,g=c===void 0?null:c;return[function(){return b(h())},g===null?void 0:function(){return b(g())}]},[h,c,d,o]);var f=l(p,i[0],i[1]);return a(function(){u.hasValue=!0,u.value=f},[f]),y(f),f},Ve}var Pe={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ct;function dr(){return ct||(ct=1,process.env.NODE_ENV!=="production"&&function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var e=x,t=oe;function n(h,c){return h===c&&(h!==0||1/h===1/c)||h!==h&&c!==c}var r=typeof Object.is=="function"?Object.is:n,l=t.useSyncExternalStore,s=e.useRef,a=e.useEffect,m=e.useMemo,y=e.useDebugValue;function p(h,c,d,o,i){var u=s(null),f;u.current===null?(f={hasValue:!1,value:null},u.current=f):f=u.current;var b=m(function(){var g=!1,S,_,E=function(Y){if(!g){g=!0,S=Y;var be=o(Y);if(i!==void 0&&f.hasValue){var Re=f.value;if(i(Re,be))return _=Re,Re}return _=be,be}var Lt=S,Ae=_;if(r(Lt,Y))return Ae;var Le=o(Y);return i!==void 0&&i(Ae,Le)?Ae:(S=Y,_=Le,Le)},A=d===void 0?null:d,U=function(){return E(c())},Oe=A===null?void 0:function(){return E(A())};return[U,Oe]},[c,d,o,i]),R=b[0],w=b[1],v=l(h,R,w);return a(function(){f.hasValue=!0,f.value=v},[v]),y(v),v}Pe.useSyncExternalStoreWithSelector=p,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)}()),Pe}(function(e){process.env.NODE_ENV==="production"?e.exports=fr():e.exports=dr()})(ir);function pr(e,t,n,r){let l=[Gt.run({fn:s=>t(s)})];if(r&&l.unshift(r),n){let s=B({node:l}),a=e.graphite.id,m=n.additionalLinks,y=m[a]||[];return m[a]=y,y.push(s),()=>{let p=y.indexOf(s);p!==-1&&y.splice(p,1),Be(s)}}{let s=B({node:l,parent:[e],family:{owners:e}});return()=>{Be(s)}}}function vr(e,t){Ct.store(e)||Rt("expect useStore argument to be a store");let n=x.useCallback(l=>pr(e,l,t),[e,t]),r=x.useCallback(()=>Sr(e,t),[e,t]);return hr(n,r,r)}function mr(e){let t=x.useContext(_r);return e&&!t&&Rt("No scope found, consider adding <Provider> to app root"),t}function bt(e,t){return vr(e,mr(t==null?void 0:t.forceScope))}let Rt=e=>{throw Error(e)};typeof window<"u"?x.useLayoutEffect:x.useEffect;const{useSyncExternalStore:hr}=cr,Sr=(e,t)=>t?t.getState(e):e.getState(),_r=x.createContext(null),yr=(e,t,n)=>{x.useEffect(()=>{const r=l=>{l instanceof KeyboardEvent&&l.key===n?t(l):n||t(l)};return window.addEventListener(e,r),()=>window.removeEventListener(e,r)},[e,n,t])},Ke=L(),Ue=L(),Ye=L(),Je=L(),gr=_e({virtualView:null,virtualPanel:null,virtualModal:null,virtualPopout:null}).on(Ke,(e,t)=>({...e,virtualView:t})).on(Ue,(e,t)=>({...e,virtualPanel:t})).on(Ye,(e,t)=>({...e,virtualModal:t})).on(Je,(e,t)=>({...e,virtualPopout:t})),wr=(e,...t)=>{const{activeView:n,activePanel:r,activeModal:l,activePopout:s,isRouteInit:a,isBackHandled:m}=At();x.useEffect(()=>{a||(Ke(e.view),Ue(e.panel),e.modal&&Ye(e.modal),e.popout&&Je(e.popout))},[a,e.view,e.panel,e.modal,e.popout]);const{virtualView:y,virtualPanel:p,virtualModal:h,virtualPopout:c}=bt(gr);x.useEffect(()=>{const d=window.history.state??{view:void 0,panel:void 0,modal:void 0,popout:void 0};(a&&m&&(d.view!==y||d.panel!==p||d.modal!==h||d.popout!==c)||!a&&y&&p)&&(ve(y),me(p),he(h),Se(c),Fe({view:y,panel:p,modal:h,popout:c}),a||Ot())},[y,p,h,c,a,m]),yr("popstate",async()=>{a&&(await(async()=>{ot(!1);const{view:o,panel:i,modal:u,popout:f}=window.history.state??{view:void 0,panel:void 0,modal:void 0,popout:void 0};console.log("prevRoutes",o,i,u,f),console.log("storeRoutes",n,r,l,s);for(const b in t)if(!await t[b]({view:n,panel:r,modal:l,popout:s},{view:o,panel:i,modal:u,popout:f}))return;ve(o),me(i),he(u),Se(f),ot(!0)})(),window.isBackFromBrowser=!0)})},At=()=>bt(ar),Er=e=>e,Or=(e,t)=>(n,r)=>["view","panel","modal","popout"].some(s=>n[s]===e&&n[s]!==r[s])&&window.isBackFromBrowser?(t&&t(n,r),Fe(n),!1):!0;exports._setActiveModal=he;exports._setActivePanel=me;exports._setActivePopout=Se;exports._setActiveView=ve;exports.back=nr;exports.createDisableBackBrowserRouteMiddleware=Or;exports.createRouteMiddleware=Er;exports.historyPush=Fe;exports.setActiveModal=Ye;exports.setActivePanel=Ue;exports.setActivePopout=Je;exports.setActiveView=Ke;exports.setRoutes=Et;exports.useInitRouter=wr;exports.useRouter=At;
