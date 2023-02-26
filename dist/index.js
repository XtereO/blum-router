import C, { useEffect as tt } from "react";
const Re = {
  subscribers: [],
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
}, ze = {
  subscribers: [],
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
}, dr = () => {
  window.isBackFromBrowser = !1, window.history.back();
}, H = (e) => {
  const { view: t, panel: r, modal: n, popout: i } = window.history.state ?? {
    view: void 0,
    panel: void 0,
    modal: void 0,
    popout: void 0
  };
  console.log("try to push history", ze.subscribers), ze.changeState({
    view: e.hasOwnProperty("view") ? e.view : t,
    panel: e.hasOwnProperty("panel") ? e.panel : r,
    modal: e.hasOwnProperty("modal") ? e.modal : n,
    popout: e.hasOwnProperty("popout") ? e.popout : i
  });
}, pr = (e) => {
  H({ view: e.view, panel: e.panel });
}, vr = (e) => {
  H({ panel: e });
}, hr = (e) => {
  H({ modal: e });
}, mr = (e) => {
  H({ popout: e });
};
function wt(e, t) {
  for (let r in e)
    t(e[r], r);
}
function k(e, t) {
  e.forEach(t);
}
function W(e, t) {
  if (!e)
    throw Error(t);
}
function I({ node: e = [], from: t, source: r, parent: n = t || r, to: i, target: s, child: o = i || s, scope: p = {}, meta: g = {}, family: c = { type: "regular" }, regional: S } = {}) {
  let l = ie(n), d = ie(c.links), f = ie(c.owners), a = [];
  k(e, (v) => v && D(a, v));
  let u = { id: xt(), seq: a, next: ie(o), meta: g, scope: p, family: { type: c.type || "crosslink", links: d, owners: f } };
  return k(d, (v) => D(ce(v), u)), k(f, (v) => D(fe(v), u)), k(l, (v) => D(v.next, u)), S && z && st(J(z), [u]), u;
}
function rt(e, t, r) {
  let n, i = V, s = null, o = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, i = "page" in e ? e.page : i, e.stack && (s = e.stack), o = oe(e) || o, e = e.target), o && O && o !== O && (O = null), Array.isArray(e))
    for (let a = 0; a < e.length; a++)
      M("pure", i, T(e[a]), s, t[a], o, n);
  else
    M("pure", i, T(e), s, t, o, n);
  if (r && !ae)
    return;
  let p, g, c, S, l, d, f = { isRoot: ae, currentPage: V, scope: O, isWatch: ye, isPure: se };
  ae = 0;
  e:
    for (; S = Pt(); ) {
      let { idx: a, stack: u, type: v } = S;
      c = u.node, V = l = u.page, O = oe(u), l ? d = l.reg : O && (d = O.reg);
      let L = !!l, A = !!O, w = { fail: 0, scope: c.scope };
      p = g = 0;
      for (let h = a; h < c.seq.length && !p; h++) {
        let y = c.seq[h];
        if (y.order) {
          let { priority: m, barrierID: _ } = y.order, E = _ ? l ? `${l.fullID}_${_}` : _ : 0;
          if (h !== a || v !== m) {
            _ ? _e.has(E) || (_e.add(E), ke(h, u, m, _)) : ke(h, u, m);
            continue e;
          }
          _ && _e.delete(E);
        }
        switch (y.type) {
          case "mov": {
            let _, E = y.data;
            switch (E.from) {
              case X:
                _ = J(u);
                break;
              case "a":
              case "b":
                _ = u[E.from];
                break;
              case "value":
                _ = E.store;
                break;
              case "store":
                if (d && !d[E.store.id])
                  if (L) {
                    let b = ct(l, E.store.id);
                    u.page = l = b, b ? d = b.reg : A ? (G(O, E.store, 0, 1, E.softRead), d = O.reg) : d = void 0;
                  } else
                    A && G(O, E.store, 0, 1, E.softRead);
                _ = lt(d && d[E.store.id] || E.store);
            }
            switch (E.to) {
              case X:
                u.value = _;
                break;
              case "a":
              case "b":
                u[E.to] = _;
                break;
              case "store":
                zt(l, O, c, E.target).current = _;
            }
            break;
          }
          case "compute":
            let m = y.data;
            if (m.fn) {
              ye = R(c, "op") === "watch", se = m.pure;
              let _ = m.safe ? (0, m.fn)(J(u), w.scope, u) : jt(w, m.fn, u);
              m.filter ? g = !_ : u.value = _, ye = f.isWatch, se = f.isPure;
            }
        }
        p = w.fail || g;
      }
      if (!p) {
        let h = J(u), y = oe(u);
        if (k(c.next, (m) => {
          M("child", l, m, u, h, y);
        }), y) {
          R(c, "needFxCounter") && M("child", l, y.fxCount, u, h, y), R(c, "storeChange") && M("child", l, y.storeChange, u, h, y), R(c, "warnSerialize") && M("child", l, y.warnSerializeNode, u, h, y);
          let m = y.additionalLinks[c.id];
          m && k(m, (_) => {
            M("child", l, _, u, h, y);
          });
        }
      }
    }
  ae = f.isRoot, V = f.currentPage, O = oe(f);
}
function Et(e, t) {
  let r, n, i = e;
  if (t) {
    let s = bt(t);
    e.length === 0 ? (r = s.path, n = s.fullName) : (r = s.path.concat([e]), n = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: i, fullName: n, path: r };
}
function Y(e, ...t) {
  let r = at();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function x(e, t) {
  let r = te({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (o, ...p) => (Z(!R(n, "derived"), "call of derived event", "createEvent"), Z(!se, "unit call from pure function", "operators like sample"), V ? ((g, c, S, l) => {
    let d = V, f = null;
    if (c)
      for (f = V; f && f.template !== c; )
        f = j(f);
    qe(f);
    let a = g.create(S, l);
    return qe(d), a;
  })(n, i, o, p) : n.create(o, p)), i = at(), s = Object.assign(n, { graphite: I({ meta: pt("event", n, r), regional: 1 }), create: (o) => (rt({ target: n, params: o, scope: O }), o), watch: (o) => dt(n, o), map: (o) => we(n, Q, o, [$()]), filter: (o) => we(n, "filter", o.fn ? o : o.fn, [$(Ie, 1)]), filterMap: (o) => we(n, "filterMap", o, [$(), Ae((p) => !N(p), 1)]), prepend(o) {
    let p = x("* → " + n.shortName, { parent: j(n) });
    return Y("eventPrepend", T(p)), Pe(p, n, [$()], "prepend", o), Gt(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(s), s;
}
function We(e, t, r, n) {
  return Tt(r, t, "first argument"), W(B(n), "second argument should be a function"), Z(!R(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(r) ? r : [r], (i) => {
    e.off(i), le(e).set(i, ft(vt(i, e, "on", Dt, n)));
  }), e;
}
function nt(e, t) {
  let r = te(t), n = Nt(e), i = x({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let s = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: i, defaultState: e, stateRef: n, getState() {
    let a, u = n;
    if (V) {
      let v = V;
      for (; v && !v.reg[s]; )
        v = j(v);
      v && (a = v);
    }
    return !a && O && (G(O, n, 1), a = O), a && (u = a.reg[s]), lt(u);
  }, setState: (a) => rt({ target: o, params: a, defer: 1, scope: O }), reset: (...a) => (k(a, (u) => We(o, ".reset", u, () => o.defaultState)), o), on: (a, u) => We(o, ".on", a, u), off(a) {
    let u = le(o).get(a);
    return u && (u(), le(o).delete(a)), o;
  }, map(a, u) {
    let v, L;
    K(a) && (v = a, a = a.fn), Z(N(u), "second argument of store.map", "updateFilter");
    let A = o.getState();
    N(A) || (L = a(A, u));
    let w = nt(L, { name: `${o.shortName} → *`, derived: 1, and: v }), h = vt(o, w, Q, Ke, a);
    return $t(ue(w), { type: Q, fn: a, from: n }), ue(w).noInit = 1, Y("storeMap", n, h), w;
  }, watch(a, u) {
    if (!u || !Te(a)) {
      let v = dt(o, a);
      return Y("storeWatch", n, a) || a(o.getState()), v;
    }
    return W(B(u), "second argument should be a function"), a.watch((v) => u(o.getState(), v));
  } }, p = pt("store", o, r), g = o.defaultConfig.updateFilter;
  o.graphite = I({ scope: { state: n, fn: g }, node: [Ae((a, u, v) => (v.scope && !v.scope.reg[n.id] && (v.b = 1), a)), It(n), Ae((a, u, { a: v, b: L }) => !N(a) && (a !== v || L), 1), g && $(Ke, 1), de({ from: X, target: n })], child: i, meta: p, regional: 1 });
  let c = R(o, "serialize"), S = R(o, "derived"), l = c === "ignore", d = !c || l ? 0 : c, f = R(o, "sid");
  return f && (l || je(o, "storeChange", 1), n.sid = f, d && (n.meta = { ...n == null ? void 0 : n.meta, serialize: d })), f || l || S || je(o, "warnSerialize", 1), W(S || !N(e), "current state can't be undefined, use null instead"), st(o, [i]), r != null && r.domain && r.domain.hooks.store(o), S || (o.reinit = x(), o.reset(o.reinit)), o;
}
let Ot = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", T = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, ue = (e) => e.stateRef, J = (e) => e.value, le = (e) => e.subscribers, j = (e) => e.parent, oe = (e) => e.scope, R = (e, t) => T(e).meta[t], je = (e, t, r) => T(e).meta[t] = r, bt = (e) => e.compositeName, Te = (e) => (B(e) || K(e)) && "kind" in e;
const ne = (e) => (t) => Te(t) && t.kind === e;
let De = ne("store"), Lt = ne("event"), Ge = ne("effect"), ot = ne("domain"), Rt = ne("scope");
var At = { __proto__: null, unit: Te, store: De, event: Lt, effect: Ge, domain: ot, scope: Rt, attached: (e) => Ge(e) && R(e, "attached") == 1 };
let ge = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, D = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Me = () => {
  let e = 0;
  return () => "" + ++e;
};
let kt = Me(), it = Me(), xt = Me(), z = null, at = () => z, Vt = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), st = (e, t) => {
  let r = T(e);
  k(t, (n) => {
    let i = T(n);
    r.family.type !== "domain" && (i.family.type = "crosslink"), D(ce(i), r), D(fe(r), i);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(T), K = (e) => typeof e == "object" && e !== null, B = (e) => typeof e == "function", N = (e) => e === void 0, Ct = (e) => W(K(e) || B(e), "expect first argument be an object");
const He = (e, t, r, n) => W(!(!K(e) && !B(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Tt = (e, t, r) => {
  Array.isArray(e) ? k(e, (n, i) => He(n, t, `${i} item of ${r}`, "")) : He(e, t, r, " or array of units");
}, Ke = (e, { fn: t }, { a: r }) => t(e, r), Dt = (e, { fn: t }, { a: r }) => t(r, e), Ie = (e, { fn: t }) => t(e);
const ut = (e, t, r, n) => {
  let i = { id: it(), type: e, data: t };
  return r && (i.order = { priority: r }, n && (i.order.barrierID = ++Mt)), i;
};
let Mt = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: i, priority: s }) => ut("mov", { from: e, store: t, to: n, target: r }, s, i), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: i = 0, pure: s = 0 }) => ut("compute", { fn: e, safe: n, filter: i, pure: s }, r, t), Be = ({ fn: e }) => ee({ fn: e, priority: "effect" }), Ae = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), It = (e, t, r) => de({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), $ = (e = Ie, t) => ee({ fn: e, pure: 1, filter: t }), Bt = { mov: de, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: Be }, Nt = (e) => ({ id: it(), current: e }), lt = ({ current: e }) => e, $t = (e, t) => {
  e.before || (e.before = []), D(e.before, t);
}, P = null;
const Ne = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || xe(e.v.type) > xe(t.v.type)) && (r = e, e = t, t = r), r = Ne(e.r, t), e.r = e.l, e.l = r, e;
}, $e = [];
let Ue = 0;
for (; Ue < 6; )
  D($e, { first: null, last: null, size: 0 }), Ue += 1;
const Pt = () => {
  for (let e = 0; e < 6; e++) {
    let t = $e[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = P.v;
        return P = Ne(P.l, P.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, M = (e, t, r, n, i, s, o) => ke(0, { a: null, b: null, node: r, parent: n, value: i, page: t, scope: s, meta: o }, e), ke = (e, t, r, n = 0) => {
  let i = xe(r), s = $e[i], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  i === 3 || i === 4 ? P = Ne(P, o) : (s.size === 0 ? s.first = o : s.last.r = o, s.last = o), s.size += 1;
}, xe = (e) => {
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
}, _e = /* @__PURE__ */ new Set();
let O, ae = 1, ye = 0, se = 0, V = null, qe = (e) => {
  V = e;
};
const ct = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = j(e);
    if (e)
      return e;
  }
  return null;
};
let zt = (e, t, r, n, i) => {
  let s = ct(e, n.id);
  return s ? s.reg[n.id] : t ? (G(t, n, i), t.reg[n.id]) : n;
};
const Wt = (e) => e;
let G = (e, t, r, n, i) => {
  var s;
  let o = e.reg, p = t.sid, g = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (o[t.id])
    return;
  let c = { id: t.id, current: t.current, meta: t.meta };
  if (p && p in e.sidValuesMap && !(p in e.sidIdMap))
    c.current = (e.fromSerialize && g !== "ignore" && (g == null ? void 0 : g.read) || Wt)(e.sidValuesMap[p]);
  else if (t.before && !i) {
    let S = 0, l = r || !t.noInit || n;
    k(t.before, (d) => {
      switch (d.type) {
        case Q: {
          let f = d.from;
          if (f || d.fn) {
            f && G(e, f, r, n);
            let a = f && o[f.id].current;
            l && (c.current = d.fn ? d.fn(a) : a);
          }
          break;
        }
        case "field":
          S || (S = 1, c.current = Array.isArray(c.current) ? [...c.current] : { ...c.current }), G(e, d.from, r, n), l && (c.current[d.field] = o[o[d.from.id].id].current);
      }
    });
  }
  p && (e.sidIdMap[p] = t.id), o[t.id] = c;
};
const jt = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (K(e) && (te(e.or, t), wt(e, (r, n) => {
  N(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const Fe = (e, t) => {
  ge(e.next, t), ge(ce(e), t), ge(fe(e), t);
}, Ve = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let i = fe(e);
  for (; n = i.pop(); )
    Fe(n, e), (t || r && R(e, "op") !== "sample" || n.family.type === "crosslink") && Ve(n, t, R(n, "op") !== "on" && r);
  for (i = ce(e); n = i.pop(); )
    Fe(n, e), r && n.family.type === "crosslink" && Ve(n, t, R(n, "op") !== "on" && r);
}, F = (e) => e.clear();
let Ce = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), De(e))
    F(le(e));
  else if (ot(e)) {
    r = 1;
    let n = e.history;
    F(n.events), F(n.effects), F(n.stores), F(n.domains);
  }
  Ve(T(e), !!t, r);
}, ft = (e) => {
  let t = () => Ce(e);
  return t.unsubscribe = t, t;
}, Pe = (e, t, r, n, i) => I({ node: r, parent: e, child: t, scope: { fn: i }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), dt = (e, t) => (W(B(t), ".watch argument should be a function"), ft(I({ scope: { fn: t }, node: [Be({ fn: Ie })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Gt = (e, t, r = "event") => {
  j(e) && j(e).hooks[r](t);
}, pt = (e, t, r) => {
  let n = te(r), i = e === "domain", s = kt(), { sid: o = null, named: p = null, domain: g = null, parent: c = g } = n, S = p || n.name || (i ? "" : s), l = Et(S, c), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Vt(o), named: p, unitId: t.id = s, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = c, t.compositeName = l, t.defaultConfig = n, t.thru = (f) => (Z(0, "thru", "js pipe"), f(t)), t.getType = () => l.fullName, !i && (t.subscribe = (f) => (Ct(f), t.watch(B(f) ? f : (a) => f.next && f.next(a))), t[Ot] = () => t), d;
};
const we = (e, t, r, n) => {
  let i;
  K(r) && (i = r, r = r.fn);
  let s = x({ name: `${e.shortName} → *`, derived: 1, and: i });
  return Pe(e, s, n, t, r), s;
}, vt = (e, t, r, n, i) => {
  let s = ue(t), o = de({ store: s, to: "a", priority: "read" });
  r === Q && (o.data.softRead = 1);
  let p = [o, $(n)];
  return Y("storeOnMap", s, p, De(e) && ue(e)), Pe(e, t, p, r, i);
};
I({ node: [Be({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Ht = x(), Kt = x(), ht = x(), mt = x(), St = x(), gt = x(), Ut = x(), qt = nt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Ht, (e, t) => ({
  ...e,
  activeView: t
})).on(Kt, (e, t) => ({
  ...e,
  activePanel: t
})).on(mt, (e, t) => ({
  ...e,
  activeModal: t
})).on(St, (e, t) => ({
  ...e,
  activePopout: t
})).on(gt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(ht, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(Ut, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Ft(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = {}, Yt = {
  get exports() {
    return Ye;
  },
  set exports(e) {
    Ye = e;
  }
}, Ee = {}, re = {}, Jt = {
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
var Je;
function Qt() {
  if (Je)
    return Oe;
  Je = 1;
  var e = C;
  function t(l, d) {
    return l === d && (l !== 0 || 1 / l === 1 / d) || l !== l && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, i = e.useEffect, s = e.useLayoutEffect, o = e.useDebugValue;
  function p(l, d) {
    var f = d(), a = n({ inst: { value: f, getSnapshot: d } }), u = a[0].inst, v = a[1];
    return s(function() {
      u.value = f, u.getSnapshot = d, g(u) && v({ inst: u });
    }, [l, f, d]), i(function() {
      return g(u) && v({ inst: u }), l(function() {
        g(u) && v({ inst: u });
      });
    }, [l]), o(f), f;
  }
  function g(l) {
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
var Qe;
function Xt() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = C, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var h = arguments.length, y = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
          y[m - 1] = arguments[m];
        n("error", w, y);
      }
    }
    function n(w, h, y) {
      {
        var m = t.ReactDebugCurrentFrame, _ = m.getStackAddendum();
        _ !== "" && (h += "%s", y = y.concat([_]));
        var E = y.map(function(b) {
          return String(b);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function i(w, h) {
      return w === h && (w !== 0 || 1 / w === 1 / h) || w !== w && h !== h;
    }
    var s = typeof Object.is == "function" ? Object.is : i, o = e.useState, p = e.useEffect, g = e.useLayoutEffect, c = e.useDebugValue, S = !1, l = !1;
    function d(w, h, y) {
      S || e.startTransition !== void 0 && (S = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = h();
      if (!l) {
        var _ = h();
        s(m, _) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), l = !0);
      }
      var E = o({
        inst: {
          value: m,
          getSnapshot: h
        }
      }), b = E[0].inst, U = E[1];
      return g(function() {
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
  process.env.NODE_ENV === "production" ? e.exports = Qt() : e.exports = Xt();
})(Jt);
const Zt = /* @__PURE__ */ Ft(re);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xe;
function er() {
  if (Xe)
    return Ee;
  Xe = 1;
  var e = C, t = re;
  function r(c, S) {
    return c === S && (c !== 0 || 1 / c === 1 / S) || c !== c && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, g = e.useDebugValue;
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
            var _ = u.value;
            if (f(_, m))
              return h = _;
          }
          return h = m;
        }
        if (_ = h, n(w, m))
          return _;
        var E = d(m);
        return f !== void 0 && f(_, E) ? _ : (w = m, h = E);
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
    }, [v]), g(v), v;
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
var Ze;
function tr() {
  return Ze || (Ze = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = C, t = re;
    function r(S, l) {
      return S === l && (S !== 0 || 1 / S === 1 / l) || S !== S && l !== l;
    }
    var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, g = e.useDebugValue;
    function c(S, l, d, f, a) {
      var u = s(null), v;
      u.current === null ? (v = {
        hasValue: !1,
        value: null
      }, u.current = v) : v = u.current;
      var L = p(function() {
        var y = !1, m, _, E = function(q) {
          if (!y) {
            y = !0, m = q;
            var ve = f(q);
            if (a !== void 0 && v.hasValue) {
              var he = v.value;
              if (a(he, ve))
                return _ = he, he;
            }
            return _ = ve, ve;
          }
          var yt = m, me = _;
          if (n(yt, q))
            return me;
          var Se = f(q);
          return a !== void 0 && a(me, Se) ? me : (m = q, _ = Se, Se);
        }, b = d === void 0 ? null : d, U = function() {
          return E(l());
        }, pe = b === null ? void 0 : function() {
          return E(b());
        };
        return [U, pe];
      }, [l, d, f, a]), A = L[0], w = L[1], h = i(S, A, w);
      return o(function() {
        v.hasValue = !0, v.value = h;
      }, [h]), g(h), h;
    }
    Le.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Le;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = er() : e.exports = tr();
})(Yt);
function rr(e, t, r, n) {
  let i = [Bt.run({ fn: (s) => t(s) })];
  if (n && i.unshift(n), r) {
    let s = I({ node: i }), o = e.graphite.id, p = r.additionalLinks, g = p[o] || [];
    return p[o] = g, g.push(s), () => {
      let c = g.indexOf(s);
      c !== -1 && g.splice(c, 1), Ce(s);
    };
  }
  {
    let s = I({ node: i, parent: [e], family: { owners: e } });
    return () => {
      Ce(s);
    };
  }
}
function nr(e, t) {
  At.store(e) || _t("expect useStore argument to be a store");
  let r = C.useCallback((i) => rr(e, i, t), [e, t]), n = C.useCallback(() => sr(e, t), [e, t]);
  return ar(r, n, n);
}
function or(e) {
  let t = C.useContext(ur);
  return e && !t && _t("No scope found, consider adding <Provider> to app root"), t;
}
function ir(e, t) {
  return nr(e, or(t == null ? void 0 : t.forceScope));
}
let _t = (e) => {
  throw Error(e);
};
typeof window < "u" ? C.useLayoutEffect : C.useEffect;
const { useSyncExternalStore: ar } = Zt, sr = (e, t) => t ? t.getState(e) : e.getState(), ur = C.createContext(null), lr = (e, t, r) => {
  tt(() => {
    const n = (i) => {
      i instanceof KeyboardEvent && i.key === r ? t(i) : r || t(i);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, et = (e, t, r) => {
  tt(() => (Re.addEventListener(e, t, r), () => Re.removeEventListener(r)), [e, r, t]);
}, Sr = (e, ...t) => {
  et("init", (p) => {
    console.log("[blum]: initialized", p), o || H(e);
  }, 1);
  const { activeView: r, activePanel: n, activeModal: i, activePopout: s, isRouteInit: o } = cr();
  lr("popstate", async () => {
    o && (await (async () => {
      Re.fireChangeStateEvent();
      const { view: g, panel: c, modal: S, popout: l } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", g, c, S, l), console.log("storeRoutes", r, n, i, s);
      for (const d in t)
        if (!await t[d]({
          view: r,
          panel: n,
          modal: i,
          popout: s
        }, { view: g, panel: c, modal: S, popout: l }))
          return;
    })(), window.isBackFromBrowser = !0);
  }), et("changestate", (p) => {
    if (console.log("[blum]: state changed", p), p) {
      const { view: g, panel: c, modal: S, popout: l } = p;
      g && c && ht({ view: g, panel: c }), mt(S), St(l), o || gt();
    }
  }, 2);
}, cr = () => ir(qt), gr = (e) => e, _r = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((s) => r[s] === e && r[s] !== n[s]) && window.isBackFromBrowser ? (t && t(r, n), H(r), !1) : !0;
export {
  mt as _setActiveModal,
  Kt as _setActivePanel,
  St as _setActivePopout,
  Ht as _setActiveView,
  dr as back,
  Re as blumRouter,
  _r as createDisableBackBrowserRouteMiddleware,
  gr as createRouteMiddleware,
  H as historyPush,
  hr as setActiveModal,
  vr as setActivePanel,
  mr as setActivePopout,
  pr as setActiveViewPanel,
  Sr as useInitRouter,
  cr as useRouter
};
