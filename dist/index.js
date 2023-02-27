import T, { useEffect as Ze } from "react";
const C = {
  subscribers: [],
  historyPush(e) {
    const { view: t, panel: r, modal: n, popout: i } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    console.log("try to push history", this), this.changeState({
      view: e.hasOwnProperty("view") ? e.view : t,
      panel: e.hasOwnProperty("panel") ? e.panel : r,
      modal: e.hasOwnProperty("modal") ? e.modal : n,
      popout: e.hasOwnProperty("popout") ? e.popout : i
    });
  },
  changeState(e) {
    try {
      window.history.pushState(e, ""), this.fireChangeStateEvent();
    } catch (t) {
      console.log("changeState err", t);
    }
  },
  fireChangeStateEvent() {
    this._trigerEvent("changestate", window.history.state);
  },
  addEventListener(e, t, r) {
    this.subscribers.push({ type: e, callback: t, index: r }), e === "changestate" && this._trigerEvent("init", !0);
  },
  removeEventListener(e) {
    this.subscribers = this.subscribers.filter((t) => t.index !== e);
  },
  _trigerEvent(e, t) {
    this.subscribers.forEach((r) => r.type === e && r.callback(t));
  }
}, cr = () => {
  window.isBackFromBrowser = !1, window.history.back();
}, fr = (e) => {
  C.historyPush({ view: e.view, panel: e.panel });
}, dr = (e) => {
  C.historyPush({ panel: e });
}, pr = (e) => {
  C.historyPush({ modal: e });
}, vr = (e) => {
  C.historyPush({ popout: e });
};
function gt(e, t) {
  for (let r in e)
    t(e[r], r);
}
function k(e, t) {
  e.forEach(t);
}
function j(e, t) {
  if (!e)
    throw Error(t);
}
function I({ node: e = [], from: t, source: r, parent: n = t || r, to: i, target: s, child: o = i || s, scope: p = {}, meta: _ = {}, family: c = { type: "regular" }, regional: S } = {}) {
  let l = ie(n), d = ie(c.links), f = ie(c.owners), a = [];
  k(e, (v) => v && M(a, v));
  let u = { id: At(), seq: a, next: ie(o), meta: _, scope: p, family: { type: c.type || "crosslink", links: d, owners: f } };
  return k(d, (v) => M(ce(v), u)), k(f, (v) => M(fe(v), u)), k(l, (v) => M(v.next, u)), S && W && it(J(W), [u]), u;
}
function et(e, t, r) {
  let n, i = V, s = null, o = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, i = "page" in e ? e.page : i, e.stack && (s = e.stack), o = oe(e) || o, e = e.target), o && O && o !== O && (O = null), Array.isArray(e))
    for (let a = 0; a < e.length; a++)
      P("pure", i, D(e[a]), s, t[a], o, n);
  else
    P("pure", i, D(e), s, t, o, n);
  if (r && !ae)
    return;
  let p, _, c, S, l, d, f = { isRoot: ae, currentPage: V, scope: O, isWatch: ye, isPure: se };
  ae = 0;
  e:
    for (; S = Bt(); ) {
      let { idx: a, stack: u, type: v } = S;
      c = u.node, V = l = u.page, O = oe(u), l ? d = l.reg : O && (d = O.reg);
      let L = !!l, A = !!O, w = { fail: 0, scope: c.scope };
      p = _ = 0;
      for (let h = a; h < c.seq.length && !p; h++) {
        let y = c.seq[h];
        if (y.order) {
          let { priority: m, barrierID: g } = y.order, E = g ? l ? `${l.fullID}_${g}` : g : 0;
          if (h !== a || v !== m) {
            g ? ge.has(E) || (ge.add(E), Ae(h, u, m, g)) : Ae(h, u, m);
            continue e;
          }
          g && ge.delete(E);
        }
        switch (y.type) {
          case "mov": {
            let g, E = y.data;
            switch (E.from) {
              case X:
                g = J(u);
                break;
              case "a":
              case "b":
                g = u[E.from];
                break;
              case "value":
                g = E.store;
                break;
              case "store":
                if (d && !d[E.store.id])
                  if (L) {
                    let b = ut(l, E.store.id);
                    u.page = l = b, b ? d = b.reg : A ? (H(O, E.store, 0, 1, E.softRead), d = O.reg) : d = void 0;
                  } else
                    A && H(O, E.store, 0, 1, E.softRead);
                g = st(d && d[E.store.id] || E.store);
            }
            switch (E.to) {
              case X:
                u.value = g;
                break;
              case "a":
              case "b":
                u[E.to] = g;
                break;
              case "store":
                Nt(l, O, c, E.target).current = g;
            }
            break;
          }
          case "compute":
            let m = y.data;
            if (m.fn) {
              ye = R(c, "op") === "watch", se = m.pure;
              let g = m.safe ? (0, m.fn)(J(u), w.scope, u) : zt(w, m.fn, u);
              m.filter ? _ = !g : u.value = g, ye = f.isWatch, se = f.isPure;
            }
        }
        p = w.fail || _;
      }
      if (!p) {
        let h = J(u), y = oe(u);
        if (k(c.next, (m) => {
          P("child", l, m, u, h, y);
        }), y) {
          R(c, "needFxCounter") && P("child", l, y.fxCount, u, h, y), R(c, "storeChange") && P("child", l, y.storeChange, u, h, y), R(c, "warnSerialize") && P("child", l, y.warnSerializeNode, u, h, y);
          let m = y.additionalLinks[c.id];
          m && k(m, (g) => {
            P("child", l, g, u, h, y);
          });
        }
      }
    }
  ae = f.isRoot, V = f.currentPage, O = oe(f);
}
function yt(e, t) {
  let r, n, i = e;
  if (t) {
    let s = Et(t);
    e.length === 0 ? (r = s.path, n = s.fullName) : (r = s.path.concat([e]), n = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: i, fullName: n, path: r };
}
function Y(e, ...t) {
  let r = ot();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function x(e, t) {
  let r = te({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (o, ...p) => (Z(!R(n, "derived"), "call of derived event", "createEvent"), Z(!se, "unit call from pure function", "operators like sample"), V ? ((_, c, S, l) => {
    let d = V, f = null;
    if (c)
      for (f = V; f && f.template !== c; )
        f = G(f);
    Ke(f);
    let a = _.create(S, l);
    return Ke(d), a;
  })(n, i, o, p) : n.create(o, p)), i = ot(), s = Object.assign(n, { graphite: I({ meta: ft("event", n, r), regional: 1 }), create: (o) => (et({ target: n, params: o, scope: O }), o), watch: (o) => ct(n, o), map: (o) => we(n, Q, o, [$()]), filter: (o) => we(n, "filter", o.fn ? o : o.fn, [$(Me, 1)]), filterMap: (o) => we(n, "filterMap", o, [$(), Re((p) => !N(p), 1)]), prepend(o) {
    let p = x("* → " + n.shortName, { parent: G(n) });
    return Y("eventPrepend", D(p)), Ne(p, n, [$()], "prepend", o), Wt(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(s), s;
}
function $e(e, t, r, n) {
  return Vt(r, t, "first argument"), j(B(n), "second argument should be a function"), Z(!R(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(r) ? r : [r], (i) => {
    e.off(i), le(e).set(i, lt(dt(i, e, "on", Tt, n)));
  }), e;
}
function tt(e, t) {
  let r = te(t), n = Pt(e), i = x({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let s = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: i, defaultState: e, stateRef: n, getState() {
    let a, u = n;
    if (V) {
      let v = V;
      for (; v && !v.reg[s]; )
        v = G(v);
      v && (a = v);
    }
    return !a && O && (H(O, n, 1), a = O), a && (u = a.reg[s]), st(u);
  }, setState: (a) => et({ target: o, params: a, defer: 1, scope: O }), reset: (...a) => (k(a, (u) => $e(o, ".reset", u, () => o.defaultState)), o), on: (a, u) => $e(o, ".on", a, u), off(a) {
    let u = le(o).get(a);
    return u && (u(), le(o).delete(a)), o;
  }, map(a, u) {
    let v, L;
    K(a) && (v = a, a = a.fn), Z(N(u), "second argument of store.map", "updateFilter");
    let A = o.getState();
    N(A) || (L = a(A, u));
    let w = tt(L, { name: `${o.shortName} → *`, derived: 1, and: v }), h = dt(o, w, Q, Ge, a);
    return It(ue(w), { type: Q, fn: a, from: n }), ue(w).noInit = 1, Y("storeMap", n, h), w;
  }, watch(a, u) {
    if (!u || !Te(a)) {
      let v = ct(o, a);
      return Y("storeWatch", n, a) || a(o.getState()), v;
    }
    return j(B(u), "second argument should be a function"), a.watch((v) => u(o.getState(), v));
  } }, p = ft("store", o, r), _ = o.defaultConfig.updateFilter;
  o.graphite = I({ scope: { state: n, fn: _ }, node: [Re((a, u, v) => (v.scope && !v.scope.reg[n.id] && (v.b = 1), a)), Dt(n), Re((a, u, { a: v, b: L }) => !N(a) && (a !== v || L), 1), _ && $(Ge, 1), de({ from: X, target: n })], child: i, meta: p, regional: 1 });
  let c = R(o, "serialize"), S = R(o, "derived"), l = c === "ignore", d = !c || l ? 0 : c, f = R(o, "sid");
  return f && (l || ze(o, "storeChange", 1), n.sid = f, d && (n.meta = { ...n == null ? void 0 : n.meta, serialize: d })), f || l || S || ze(o, "warnSerialize", 1), j(S || !N(e), "current state can't be undefined, use null instead"), it(o, [i]), r != null && r.domain && r.domain.hooks.store(o), S || (o.reinit = x(), o.reset(o.reinit)), o;
}
let wt = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", D = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, ue = (e) => e.stateRef, J = (e) => e.value, le = (e) => e.subscribers, G = (e) => e.parent, oe = (e) => e.scope, R = (e, t) => D(e).meta[t], ze = (e, t, r) => D(e).meta[t] = r, Et = (e) => e.compositeName, Te = (e) => (B(e) || K(e)) && "kind" in e;
const ne = (e) => (t) => Te(t) && t.kind === e;
let Ce = ne("store"), Ot = ne("event"), We = ne("effect"), rt = ne("domain"), bt = ne("scope");
var Lt = { __proto__: null, unit: Te, store: Ce, event: Ot, effect: We, domain: rt, scope: bt, attached: (e) => We(e) && R(e, "attached") == 1 };
let _e = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, M = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const De = () => {
  let e = 0;
  return () => "" + ++e;
};
let Rt = De(), nt = De(), At = De(), W = null, ot = () => W, kt = (e) => (e && W && W.sidRoot && (e = `${W.sidRoot}|${e}`), e), it = (e, t) => {
  let r = D(e);
  k(t, (n) => {
    let i = D(n);
    r.family.type !== "domain" && (i.family.type = "crosslink"), M(ce(i), r), M(fe(r), i);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(D), K = (e) => typeof e == "object" && e !== null, B = (e) => typeof e == "function", N = (e) => e === void 0, xt = (e) => j(K(e) || B(e), "expect first argument be an object");
const je = (e, t, r, n) => j(!(!K(e) && !B(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Vt = (e, t, r) => {
  Array.isArray(e) ? k(e, (n, i) => je(n, t, `${i} item of ${r}`, "")) : je(e, t, r, " or array of units");
}, Ge = (e, { fn: t }, { a: r }) => t(e, r), Tt = (e, { fn: t }, { a: r }) => t(r, e), Me = (e, { fn: t }) => t(e);
const at = (e, t, r, n) => {
  let i = { id: nt(), type: e, data: t };
  return r && (i.order = { priority: r }, n && (i.order.barrierID = ++Ct)), i;
};
let Ct = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: i, priority: s }) => at("mov", { from: e, store: t, to: n, target: r }, s, i), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: i = 0, pure: s = 0 }) => at("compute", { fn: e, safe: n, filter: i, pure: s }, r, t), Pe = ({ fn: e }) => ee({ fn: e, priority: "effect" }), Re = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Dt = (e, t, r) => de({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), $ = (e = Me, t) => ee({ fn: e, pure: 1, filter: t }), Mt = { mov: de, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: Pe }, Pt = (e) => ({ id: nt(), current: e }), st = ({ current: e }) => e, It = (e, t) => {
  e.before || (e.before = []), M(e.before, t);
}, z = null;
const Ie = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || ke(e.v.type) > ke(t.v.type)) && (r = e, e = t, t = r), r = Ie(e.r, t), e.r = e.l, e.l = r, e;
}, Be = [];
let He = 0;
for (; He < 6; )
  M(Be, { first: null, last: null, size: 0 }), He += 1;
const Bt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Be[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = z.v;
        return z = Ie(z.l, z.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, P = (e, t, r, n, i, s, o) => Ae(0, { a: null, b: null, node: r, parent: n, value: i, page: t, scope: s, meta: o }, e), Ae = (e, t, r, n = 0) => {
  let i = ke(r), s = Be[i], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  i === 3 || i === 4 ? z = Ie(z, o) : (s.size === 0 ? s.first = o : s.last.r = o, s.last = o), s.size += 1;
}, ke = (e) => {
  switch (e) {
    case "child":
      return 0;
    case "pure":
      return 1;
    case "read":
      return 2;
    case "barrier":
      return 3;
    case "sampler":
      return 4;
    case "effect":
      return 5;
    default:
      return -1;
  }
}, ge = /* @__PURE__ */ new Set();
let O, ae = 1, ye = 0, se = 0, V = null, Ke = (e) => {
  V = e;
};
const ut = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = G(e);
    if (e)
      return e;
  }
  return null;
};
let Nt = (e, t, r, n, i) => {
  let s = ut(e, n.id);
  return s ? s.reg[n.id] : t ? (H(t, n, i), t.reg[n.id]) : n;
};
const $t = (e) => e;
let H = (e, t, r, n, i) => {
  var s;
  let o = e.reg, p = t.sid, _ = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (o[t.id])
    return;
  let c = { id: t.id, current: t.current, meta: t.meta };
  if (p && p in e.sidValuesMap && !(p in e.sidIdMap))
    c.current = (e.fromSerialize && _ !== "ignore" && (_ == null ? void 0 : _.read) || $t)(e.sidValuesMap[p]);
  else if (t.before && !i) {
    let S = 0, l = r || !t.noInit || n;
    k(t.before, (d) => {
      switch (d.type) {
        case Q: {
          let f = d.from;
          if (f || d.fn) {
            f && H(e, f, r, n);
            let a = f && o[f.id].current;
            l && (c.current = d.fn ? d.fn(a) : a);
          }
          break;
        }
        case "field":
          S || (S = 1, c.current = Array.isArray(c.current) ? [...c.current] : { ...c.current }), H(e, d.from, r, n), l && (c.current[d.field] = o[o[d.from.id].id].current);
      }
    });
  }
  p && (e.sidIdMap[p] = t.id), o[t.id] = c;
};
const zt = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (K(e) && (te(e.or, t), gt(e, (r, n) => {
  N(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const Ue = (e, t) => {
  _e(e.next, t), _e(ce(e), t), _e(fe(e), t);
}, xe = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let i = fe(e);
  for (; n = i.pop(); )
    Ue(n, e), (t || r && R(e, "op") !== "sample" || n.family.type === "crosslink") && xe(n, t, R(n, "op") !== "on" && r);
  for (i = ce(e); n = i.pop(); )
    Ue(n, e), r && n.family.type === "crosslink" && xe(n, t, R(n, "op") !== "on" && r);
}, F = (e) => e.clear();
let Ve = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Ce(e))
    F(le(e));
  else if (rt(e)) {
    r = 1;
    let n = e.history;
    F(n.events), F(n.effects), F(n.stores), F(n.domains);
  }
  xe(D(e), !!t, r);
}, lt = (e) => {
  let t = () => Ve(e);
  return t.unsubscribe = t, t;
}, Ne = (e, t, r, n, i) => I({ node: r, parent: e, child: t, scope: { fn: i }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), ct = (e, t) => (j(B(t), ".watch argument should be a function"), lt(I({ scope: { fn: t }, node: [Pe({ fn: Me })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Wt = (e, t, r = "event") => {
  G(e) && G(e).hooks[r](t);
}, ft = (e, t, r) => {
  let n = te(r), i = e === "domain", s = Rt(), { sid: o = null, named: p = null, domain: _ = null, parent: c = _ } = n, S = p || n.name || (i ? "" : s), l = yt(S, c), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = kt(o), named: p, unitId: t.id = s, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = c, t.compositeName = l, t.defaultConfig = n, t.thru = (f) => (Z(0, "thru", "js pipe"), f(t)), t.getType = () => l.fullName, !i && (t.subscribe = (f) => (xt(f), t.watch(B(f) ? f : (a) => f.next && f.next(a))), t[wt] = () => t), d;
};
const we = (e, t, r, n) => {
  let i;
  K(r) && (i = r, r = r.fn);
  let s = x({ name: `${e.shortName} → *`, derived: 1, and: i });
  return Ne(e, s, n, t, r), s;
}, dt = (e, t, r, n, i) => {
  let s = ue(t), o = de({ store: s, to: "a", priority: "read" });
  r === Q && (o.data.softRead = 1);
  let p = [o, $(n)];
  return Y("storeOnMap", s, p, Ce(e) && ue(e)), Ne(e, t, p, r, i);
};
I({ node: [Pe({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const jt = x(), Gt = x(), pt = x(), vt = x(), ht = x(), mt = x(), Ht = x(), Kt = tt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(jt, (e, t) => ({
  ...e,
  activeView: t
})).on(Gt, (e, t) => ({
  ...e,
  activePanel: t
})).on(vt, (e, t) => ({
  ...e,
  activeModal: t
})).on(ht, (e, t) => ({
  ...e,
  activePopout: t
})).on(mt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(pt, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(Ht, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Ut(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qe = {}, qt = {
  get exports() {
    return qe;
  },
  set exports(e) {
    qe = e;
  }
}, Ee = {}, re = {}, Ft = {
  get exports() {
    return re;
  },
  set exports(e) {
    re = e;
  }
}, Oe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Yt() {
  if (Fe)
    return Oe;
  Fe = 1;
  var e = T;
  function t(l, d) {
    return l === d && (l !== 0 || 1 / l === 1 / d) || l !== l && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, i = e.useEffect, s = e.useLayoutEffect, o = e.useDebugValue;
  function p(l, d) {
    var f = d(), a = n({ inst: { value: f, getSnapshot: d } }), u = a[0].inst, v = a[1];
    return s(function() {
      u.value = f, u.getSnapshot = d, _(u) && v({ inst: u });
    }, [l, f, d]), i(function() {
      return _(u) && v({ inst: u }), l(function() {
        _(u) && v({ inst: u });
      });
    }, [l]), o(f), f;
  }
  function _(l) {
    var d = l.getSnapshot;
    l = l.value;
    try {
      var f = d();
      return !r(l, f);
    } catch {
      return !0;
    }
  }
  function c(l, d) {
    return d();
  }
  var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? c : p;
  return Oe.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S, Oe;
}
var be = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function Jt() {
  return Ye || (Ye = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var h = arguments.length, y = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
          y[m - 1] = arguments[m];
        n("error", w, y);
      }
    }
    function n(w, h, y) {
      {
        var m = t.ReactDebugCurrentFrame, g = m.getStackAddendum();
        g !== "" && (h += "%s", y = y.concat([g]));
        var E = y.map(function(b) {
          return String(b);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function i(w, h) {
      return w === h && (w !== 0 || 1 / w === 1 / h) || w !== w && h !== h;
    }
    var s = typeof Object.is == "function" ? Object.is : i, o = e.useState, p = e.useEffect, _ = e.useLayoutEffect, c = e.useDebugValue, S = !1, l = !1;
    function d(w, h, y) {
      S || e.startTransition !== void 0 && (S = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = h();
      if (!l) {
        var g = h();
        s(m, g) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), l = !0);
      }
      var E = o({
        inst: {
          value: m,
          getSnapshot: h
        }
      }), b = E[0].inst, U = E[1];
      return _(function() {
        b.value = m, b.getSnapshot = h, f(b) && U({
          inst: b
        });
      }, [w, m, h]), p(function() {
        f(b) && U({
          inst: b
        });
        var pe = function() {
          f(b) && U({
            inst: b
          });
        };
        return w(pe);
      }, [w]), c(m), m;
    }
    function f(w) {
      var h = w.getSnapshot, y = w.value;
      try {
        var m = h();
        return !s(y, m);
      } catch {
        return !0;
      }
    }
    function a(w, h, y) {
      return h();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", v = !u, L = v ? a : d, A = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : L;
    be.useSyncExternalStore = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), be;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Yt() : e.exports = Jt();
})(Ft);
const Qt = /* @__PURE__ */ Ut(re);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Je;
function Xt() {
  if (Je)
    return Ee;
  Je = 1;
  var e = T, t = re;
  function r(c, S) {
    return c === S && (c !== 0 || 1 / c === 1 / S) || c !== c && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, _ = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(c, S, l, d, f) {
    var a = s(null);
    if (a.current === null) {
      var u = { hasValue: !1, value: null };
      a.current = u;
    } else
      u = a.current;
    a = p(function() {
      function L(m) {
        if (!A) {
          if (A = !0, w = m, m = d(m), f !== void 0 && u.hasValue) {
            var g = u.value;
            if (f(g, m))
              return h = g;
          }
          return h = m;
        }
        if (g = h, n(w, m))
          return g;
        var E = d(m);
        return f !== void 0 && f(g, E) ? g : (w = m, h = E);
      }
      var A = !1, w, h, y = l === void 0 ? null : l;
      return [function() {
        return L(S());
      }, y === null ? void 0 : function() {
        return L(y());
      }];
    }, [S, l, d, f]);
    var v = i(c, a[0], a[1]);
    return o(function() {
      u.hasValue = !0, u.value = v;
    }, [v]), _(v), v;
  }, Ee;
}
var Le = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qe;
function Zt() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = re;
    function r(S, l) {
      return S === l && (S !== 0 || 1 / S === 1 / l) || S !== S && l !== l;
    }
    var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, _ = e.useDebugValue;
    function c(S, l, d, f, a) {
      var u = s(null), v;
      u.current === null ? (v = {
        hasValue: !1,
        value: null
      }, u.current = v) : v = u.current;
      var L = p(function() {
        var y = !1, m, g, E = function(q) {
          if (!y) {
            y = !0, m = q;
            var ve = f(q);
            if (a !== void 0 && v.hasValue) {
              var he = v.value;
              if (a(he, ve))
                return g = he, he;
            }
            return g = ve, ve;
          }
          var _t = m, me = g;
          if (n(_t, q))
            return me;
          var Se = f(q);
          return a !== void 0 && a(me, Se) ? me : (m = q, g = Se, Se);
        }, b = d === void 0 ? null : d, U = function() {
          return E(l());
        }, pe = b === null ? void 0 : function() {
          return E(b());
        };
        return [U, pe];
      }, [l, d, f, a]), A = L[0], w = L[1], h = i(S, A, w);
      return o(function() {
        v.hasValue = !0, v.value = h;
      }, [h]), _(h), h;
    }
    Le.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Le;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Xt() : e.exports = Zt();
})(qt);
function er(e, t, r, n) {
  let i = [Mt.run({ fn: (s) => t(s) })];
  if (n && i.unshift(n), r) {
    let s = I({ node: i }), o = e.graphite.id, p = r.additionalLinks, _ = p[o] || [];
    return p[o] = _, _.push(s), () => {
      let c = _.indexOf(s);
      c !== -1 && _.splice(c, 1), Ve(s);
    };
  }
  {
    let s = I({ node: i, parent: [e], family: { owners: e } });
    return () => {
      Ve(s);
    };
  }
}
function tr(e, t) {
  Lt.store(e) || St("expect useStore argument to be a store");
  let r = T.useCallback((i) => er(e, i, t), [e, t]), n = T.useCallback(() => ir(e, t), [e, t]);
  return or(r, n, n);
}
function rr(e) {
  let t = T.useContext(ar);
  return e && !t && St("No scope found, consider adding <Provider> to app root"), t;
}
function nr(e, t) {
  return tr(e, rr(t == null ? void 0 : t.forceScope));
}
let St = (e) => {
  throw Error(e);
};
typeof window < "u" ? T.useLayoutEffect : T.useEffect;
const { useSyncExternalStore: or } = Qt, ir = (e, t) => t ? t.getState(e) : e.getState(), ar = T.createContext(null), sr = (e, t, r) => {
  Ze(() => {
    const n = (i) => {
      i instanceof KeyboardEvent && i.key === r ? t(i) : r || t(i);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, Xe = (e, t, r, n) => {
  Ze(() => (C.addEventListener(e, t, r), () => C.removeEventListener(r)), [...n]);
}, hr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: i, activePopout: s, isRouteInit: o } = ur();
  Xe("init", (p) => {
    console.log("[blum]: initialized", p), o || C.historyPush(e);
  }, 1, [o]), sr("popstate", async () => {
    o && (await (async () => {
      C.fireChangeStateEvent();
      const { view: _, panel: c, modal: S, popout: l } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", _, c, S, l), console.log("storeRoutes", r, n, i, s);
      for (const d in t)
        if (!await t[d]({
          view: r,
          panel: n,
          modal: i,
          popout: s
        }, { view: _, panel: c, modal: S, popout: l }))
          return;
    })(), window.isBackFromBrowser = !0);
  }), Xe("changestate", (p) => {
    if (console.log("[blum]: state changed", p), p) {
      const { view: _, panel: c, modal: S, popout: l } = p;
      _ && c && pt({ view: _, panel: c }), vt(S), ht(l), o || mt();
    }
  }, 2, [o]);
}, ur = () => nr(Kt), mr = (e) => e, Sr = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((s) => r[s] === e && r[s] !== n[s]) && window.isBackFromBrowser ? (t && t(r, n), C.historyPush(r), !1) : !0;
export {
  vt as _setActiveModal,
  Gt as _setActivePanel,
  ht as _setActivePopout,
  jt as _setActiveView,
  cr as back,
  C as blumRouter,
  Sr as createDisableBackBrowserRouteMiddleware,
  mr as createRouteMiddleware,
  pr as setActiveModal,
  dr as setActivePanel,
  vr as setActivePopout,
  fr as setActiveViewPanel,
  hr as useInitRouter,
  ur as useRouter
};
