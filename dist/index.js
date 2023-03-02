import M, { useEffect as Ze } from "react";
const O = {
  isDispatchChangeStateEventBeforeMiddleware: !1,
  isDispatchChangeStateEventAfterMiddleware: !0,
  beforeBackHandledCallback: null,
  isBackFromBrowser: !0,
  afterBackHandledCallback: null,
  subscribers: [],
  setDefaultBackHandlerOptions() {
    this.setBackHandlerOptions({
      isDispatchChangeStateEventAfterMiddleware: !0,
      isDispatchChangeStateEventBeforeMiddleware: !1,
      beforeBackHandledCallback: null,
      afterBackHandledCallback: null,
      isBackFromBrowser: !0
    });
  },
  setBackHandlerOptions(e) {
    Object.keys(e).forEach((t) => {
      e.hasOwnProperty(t) && (O[t] = e[t]);
    }), e.hasOwnProperty("beforeBackHandledCallback") && (O.beforeBackHandledCallback = e.beforeBackHandledCallback), e.hasOwnProperty("afterBackHandledCallback") && (O.afterBackHandledCallback = e.afterBackHandledCallback), e.hasOwnProperty("isDispatchChangeStateEventAfterMiddleware") && (O.isDispatchChangeStateEventAfterMiddleware = e.isDispatchChangeStateEventAfterMiddleware), e.hasOwnProperty("isDispatchChangeStateEventBeforeMiddleware") && (O.isDispatchChangeStateEventBeforeMiddleware = e.isDispatchChangeStateEventBeforeMiddleware), e.hasOwnProperty("isBackFromBrowser") && (O.isBackFromBrowser = e.isBackFromBrowser);
  },
  historyPush(e) {
    const { view: t, panel: r, modal: n, popout: o } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    console.log("try to push history", this), this.changeState({
      view: e.hasOwnProperty("view") ? e.view : t,
      panel: e.hasOwnProperty("panel") ? e.panel : r,
      modal: e.hasOwnProperty("modal") ? e.modal : n,
      popout: e.hasOwnProperty("popout") ? e.popout : o
    });
  },
  changeState(e) {
    try {
      window.history.pushState(e, ""), this.dispatchChangeStateEvent();
    } catch (t) {
      console.log("changeState err", t);
    }
  },
  dispatchChangeStateEvent() {
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
}, fr = (e) => {
  e && O.setBackHandlerOptions(e), (!e || !e.hasOwnProperty("isBackFromBrowser")) && O.setBackHandlerOptions({ isBackFromBrowser: !1 }), history.back();
}, dr = (e) => {
  O.historyPush({ view: e.view, panel: e.panel });
}, pr = (e) => {
  O.historyPush({ panel: e });
}, vr = (e) => {
  O.historyPush({ modal: e });
}, hr = (e) => {
  O.historyPush({ popout: e });
};
function yt(e, t) {
  for (let r in e)
    t(e[r], r);
}
function L(e, t) {
  e.forEach(t);
}
function j(e, t) {
  if (!e)
    throw Error(t);
}
function P({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: s, child: a = o || s, scope: p = {}, meta: g = {}, family: c = { type: "regular" }, regional: S } = {}) {
  let u = oe(n), d = oe(c.links), f = oe(c.owners), i = [];
  L(e, (v) => v && V(i, v));
  let l = { id: Ct(), seq: i, next: oe(a), meta: g, scope: p, family: { type: c.type || "crosslink", links: d, owners: f } };
  return L(d, (v) => V(ce(v), l)), L(f, (v) => V(fe(v), l)), L(u, (v) => V(v.next, l)), S && z && ot(J(z), [l]), l;
}
function et(e, t, r) {
  let n, o = D, s = null, a = b;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (s = e.stack), a = ae(e) || a, e = e.target), a && b && a !== b && (b = null), Array.isArray(e))
    for (let i = 0; i < e.length; i++)
      H("pure", o, x(e[i]), s, t[i], a, n);
  else
    H("pure", o, x(e), s, t, a, n);
  if (r && !ie)
    return;
  let p, g, c, S, u, d, f = { isRoot: ie, currentPage: D, scope: b, isWatch: _e, isPure: se };
  ie = 0;
  e:
    for (; S = Tt(); ) {
      let { idx: i, stack: l, type: v } = S;
      c = l.node, D = u = l.page, b = ae(l), u ? d = u.reg : b && (d = b.reg);
      let B = !!u, A = !!b, w = { fail: 0, scope: c.scope };
      p = g = 0;
      for (let h = i; h < c.seq.length && !p; h++) {
        let _ = c.seq[h];
        if (_.order) {
          let { priority: m, barrierID: y } = _.order, E = y ? u ? `${u.fullID}_${y}` : y : 0;
          if (h !== i || v !== m) {
            y ? ye.has(E) || (ye.add(E), Ce(h, l, m, y)) : Ce(h, l, m);
            continue e;
          }
          y && ye.delete(E);
        }
        switch (_.type) {
          case "mov": {
            let y, E = _.data;
            switch (E.from) {
              case X:
                y = J(l);
                break;
              case "a":
              case "b":
                y = l[E.from];
                break;
              case "value":
                y = E.store;
                break;
              case "store":
                if (d && !d[E.store.id])
                  if (B) {
                    let k = lt(u, E.store.id);
                    l.page = u = k, k ? d = k.reg : A ? (G(b, E.store, 0, 1, E.softRead), d = b.reg) : d = void 0;
                  } else
                    A && G(b, E.store, 0, 1, E.softRead);
                y = st(d && d[E.store.id] || E.store);
            }
            switch (E.to) {
              case X:
                l.value = y;
                break;
              case "a":
              case "b":
                l[E.to] = y;
                break;
              case "store":
                It(u, b, c, E.target).current = y;
            }
            break;
          }
          case "compute":
            let m = _.data;
            if (m.fn) {
              _e = C(c, "op") === "watch", se = m.pure;
              let y = m.safe ? (0, m.fn)(J(l), w.scope, l) : $t(w, m.fn, l);
              m.filter ? g = !y : l.value = y, _e = f.isWatch, se = f.isPure;
            }
        }
        p = w.fail || g;
      }
      if (!p) {
        let h = J(l), _ = ae(l);
        if (L(c.next, (m) => {
          H("child", u, m, l, h, _);
        }), _) {
          C(c, "needFxCounter") && H("child", u, _.fxCount, l, h, _), C(c, "storeChange") && H("child", u, _.storeChange, l, h, _), C(c, "warnSerialize") && H("child", u, _.warnSerializeNode, l, h, _);
          let m = _.additionalLinks[c.id];
          m && L(m, (y) => {
            H("child", u, y, l, h, _);
          });
        }
      }
    }
  ie = f.isRoot, D = f.currentPage, b = ae(f);
}
function _t(e, t) {
  let r, n, o = e;
  if (t) {
    let s = Et(t);
    e.length === 0 ? (r = s.path, n = s.fullName) : (r = s.path.concat([e]), n = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: o, fullName: n, path: r };
}
function Y(e, ...t) {
  let r = at();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function R(e, t) {
  let r = te({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (a, ...p) => (Z(!C(n, "derived"), "call of derived event", "createEvent"), Z(!se, "unit call from pure function", "operators like sample"), D ? ((g, c, S, u) => {
    let d = D, f = null;
    if (c)
      for (f = D; f && f.template !== c; )
        f = W(f);
    Fe(f);
    let i = g.create(S, u);
    return Fe(d), i;
  })(n, o, a, p) : n.create(a, p)), o = at(), s = Object.assign(n, { graphite: P({ meta: ft("event", n, r), regional: 1 }), create: (a) => (et({ target: n, params: a, scope: b }), a), watch: (a) => ct(n, a), map: (a) => we(n, Q, a, [N()]), filter: (a) => we(n, "filter", a.fn ? a : a.fn, [N(Ve, 1)]), filterMap: (a) => we(n, "filterMap", a, [N(), Be((p) => !I(p), 1)]), prepend(a) {
    let p = R("* → " + n.shortName, { parent: W(n) });
    return Y("eventPrepend", x(p)), Ie(p, n, [N()], "prepend", a), zt(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(s), s;
}
function Ne(e, t, r, n) {
  return Rt(r, t, "first argument"), j(T(n), "second argument should be a function"), Z(!C(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), L(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), ue(e).set(o, ut(dt(o, e, "on", Dt, n)));
  }), e;
}
function tt(e, t) {
  let r = te(t), n = Ht(e), o = R({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let s = n.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let i, l = n;
    if (D) {
      let v = D;
      for (; v && !v.reg[s]; )
        v = W(v);
      v && (i = v);
    }
    return !i && b && (G(b, n, 1), i = b), i && (l = i.reg[s]), st(l);
  }, setState: (i) => et({ target: a, params: i, defer: 1, scope: b }), reset: (...i) => (L(i, (l) => Ne(a, ".reset", l, () => a.defaultState)), a), on: (i, l) => Ne(a, ".on", i, l), off(i) {
    let l = ue(a).get(i);
    return l && (l(), ue(a).delete(i)), a;
  }, map(i, l) {
    let v, B;
    F(i) && (v = i, i = i.fn), Z(I(l), "second argument of store.map", "updateFilter");
    let A = a.getState();
    I(A) || (B = i(A, l));
    let w = tt(B, { name: `${a.shortName} → *`, derived: 1, and: v }), h = dt(a, w, Q, We, i);
    return Pt(le(w), { type: Q, fn: i, from: n }), le(w).noInit = 1, Y("storeMap", n, h), w;
  }, watch(i, l) {
    if (!l || !De(i)) {
      let v = ct(a, i);
      return Y("storeWatch", n, i) || i(a.getState()), v;
    }
    return j(T(l), "second argument should be a function"), i.watch((v) => l(a.getState(), v));
  } }, p = ft("store", a, r), g = a.defaultConfig.updateFilter;
  a.graphite = P({ scope: { state: n, fn: g }, node: [Be((i, l, v) => (v.scope && !v.scope.reg[n.id] && (v.b = 1), i)), xt(n), Be((i, l, { a: v, b: B }) => !I(i) && (i !== v || B), 1), g && N(We, 1), de({ from: X, target: n })], child: o, meta: p, regional: 1 });
  let c = C(a, "serialize"), S = C(a, "derived"), u = c === "ignore", d = !c || u ? 0 : c, f = C(a, "sid");
  return f && (u || $e(a, "storeChange", 1), n.sid = f, d && (n.meta = { ...n == null ? void 0 : n.meta, serialize: d })), f || u || S || $e(a, "warnSerialize", 1), j(S || !I(e), "current state can't be undefined, use null instead"), ot(a, [o]), r != null && r.domain && r.domain.hooks.store(a), S || (a.reinit = R(), a.reset(a.reinit)), a;
}
let wt = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", x = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, le = (e) => e.stateRef, J = (e) => e.value, ue = (e) => e.subscribers, W = (e) => e.parent, ae = (e) => e.scope, C = (e, t) => x(e).meta[t], $e = (e, t, r) => x(e).meta[t] = r, Et = (e) => e.compositeName, De = (e) => (T(e) || F(e)) && "kind" in e;
const ne = (e) => (t) => De(t) && t.kind === e;
let Me = ne("store"), Ot = ne("event"), ze = ne("effect"), rt = ne("domain"), bt = ne("scope");
var kt = { __proto__: null, unit: De, store: Me, event: Ot, effect: ze, domain: rt, scope: bt, attached: (e) => ze(e) && C(e, "attached") == 1 };
let ge = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, V = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const xe = () => {
  let e = 0;
  return () => "" + ++e;
};
let Bt = xe(), nt = xe(), Ct = xe(), z = null, at = () => z, At = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), ot = (e, t) => {
  let r = x(e);
  L(t, (n) => {
    let o = x(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), V(ce(o), r), V(fe(r), o);
  });
}, oe = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(x), F = (e) => typeof e == "object" && e !== null, T = (e) => typeof e == "function", I = (e) => e === void 0, Lt = (e) => j(F(e) || T(e), "expect first argument be an object");
const je = (e, t, r, n) => j(!(!F(e) && !T(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Rt = (e, t, r) => {
  Array.isArray(e) ? L(e, (n, o) => je(n, t, `${o} item of ${r}`, "")) : je(e, t, r, " or array of units");
}, We = (e, { fn: t }, { a: r }) => t(e, r), Dt = (e, { fn: t }, { a: r }) => t(r, e), Ve = (e, { fn: t }) => t(e);
const it = (e, t, r, n) => {
  let o = { id: nt(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++Mt)), o;
};
let Mt = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: o, priority: s }) => it("mov", { from: e, store: t, to: n, target: r }, s, o), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: s = 0 }) => it("compute", { fn: e, safe: n, filter: o, pure: s }, r, t), He = ({ fn: e }) => ee({ fn: e, priority: "effect" }), Be = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), xt = (e, t, r) => de({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), N = (e = Ve, t) => ee({ fn: e, pure: 1, filter: t }), Vt = { mov: de, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: He }, Ht = (e) => ({ id: nt(), current: e }), st = ({ current: e }) => e, Pt = (e, t) => {
  e.before || (e.before = []), V(e.before, t);
}, $ = null;
const Pe = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ae(e.v.type) > Ae(t.v.type)) && (r = e, e = t, t = r), r = Pe(e.r, t), e.r = e.l, e.l = r, e;
}, Te = [];
let Ge = 0;
for (; Ge < 6; )
  V(Te, { first: null, last: null, size: 0 }), Ge += 1;
const Tt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Te[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = $.v;
        return $ = Pe($.l, $.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, H = (e, t, r, n, o, s, a) => Ce(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: s, meta: a }, e), Ce = (e, t, r, n = 0) => {
  let o = Ae(r), s = Te[o], a = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? $ = Pe($, a) : (s.size === 0 ? s.first = a : s.last.r = a, s.last = a), s.size += 1;
}, Ae = (e) => {
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
}, ye = /* @__PURE__ */ new Set();
let b, ie = 1, _e = 0, se = 0, D = null, Fe = (e) => {
  D = e;
};
const lt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = W(e);
    if (e)
      return e;
  }
  return null;
};
let It = (e, t, r, n, o) => {
  let s = lt(e, n.id);
  return s ? s.reg[n.id] : t ? (G(t, n, o), t.reg[n.id]) : n;
};
const Nt = (e) => e;
let G = (e, t, r, n, o) => {
  var s;
  let a = e.reg, p = t.sid, g = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (a[t.id])
    return;
  let c = { id: t.id, current: t.current, meta: t.meta };
  if (p && p in e.sidValuesMap && !(p in e.sidIdMap))
    c.current = (e.fromSerialize && g !== "ignore" && (g == null ? void 0 : g.read) || Nt)(e.sidValuesMap[p]);
  else if (t.before && !o) {
    let S = 0, u = r || !t.noInit || n;
    L(t.before, (d) => {
      switch (d.type) {
        case Q: {
          let f = d.from;
          if (f || d.fn) {
            f && G(e, f, r, n);
            let i = f && a[f.id].current;
            u && (c.current = d.fn ? d.fn(i) : i);
          }
          break;
        }
        case "field":
          S || (S = 1, c.current = Array.isArray(c.current) ? [...c.current] : { ...c.current }), G(e, d.from, r, n), u && (c.current[d.field] = a[a[d.from.id].id].current);
      }
    });
  }
  p && (e.sidIdMap[p] = t.id), a[t.id] = c;
};
const $t = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (F(e) && (te(e.or, t), yt(e, (r, n) => {
  I(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const Ke = (e, t) => {
  ge(e.next, t), ge(ce(e), t), ge(fe(e), t);
}, Le = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = fe(e);
  for (; n = o.pop(); )
    Ke(n, e), (t || r && C(e, "op") !== "sample" || n.family.type === "crosslink") && Le(n, t, C(n, "op") !== "on" && r);
  for (o = ce(e); n = o.pop(); )
    Ke(n, e), r && n.family.type === "crosslink" && Le(n, t, C(n, "op") !== "on" && r);
}, q = (e) => e.clear();
let Re = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Me(e))
    q(ue(e));
  else if (rt(e)) {
    r = 1;
    let n = e.history;
    q(n.events), q(n.effects), q(n.stores), q(n.domains);
  }
  Le(x(e), !!t, r);
}, ut = (e) => {
  let t = () => Re(e);
  return t.unsubscribe = t, t;
}, Ie = (e, t, r, n, o) => P({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), ct = (e, t) => (j(T(t), ".watch argument should be a function"), ut(P({ scope: { fn: t }, node: [He({ fn: Ve })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), zt = (e, t, r = "event") => {
  W(e) && W(e).hooks[r](t);
}, ft = (e, t, r) => {
  let n = te(r), o = e === "domain", s = Bt(), { sid: a = null, named: p = null, domain: g = null, parent: c = g } = n, S = p || n.name || (o ? "" : s), u = _t(S, c), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = At(a), named: p, unitId: t.id = s, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = c, t.compositeName = u, t.defaultConfig = n, t.thru = (f) => (Z(0, "thru", "js pipe"), f(t)), t.getType = () => u.fullName, !o && (t.subscribe = (f) => (Lt(f), t.watch(T(f) ? f : (i) => f.next && f.next(i))), t[wt] = () => t), d;
};
const we = (e, t, r, n) => {
  let o;
  F(r) && (o = r, r = r.fn);
  let s = R({ name: `${e.shortName} → *`, derived: 1, and: o });
  return Ie(e, s, n, t, r), s;
}, dt = (e, t, r, n, o) => {
  let s = le(t), a = de({ store: s, to: "a", priority: "read" });
  r === Q && (a.data.softRead = 1);
  let p = [a, N(n)];
  return Y("storeOnMap", s, p, Me(e) && le(e)), Ie(e, t, p, r, o);
};
P({ node: [He({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const jt = R(), Wt = R(), pt = R(), vt = R(), ht = R(), mt = R(), Gt = R(), Ft = tt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(jt, (e, t) => ({
  ...e,
  activeView: t
})).on(Wt, (e, t) => ({
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
})).on(Gt, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Kt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ue = {}, Ut = {
  get exports() {
    return Ue;
  },
  set exports(e) {
    Ue = e;
  }
}, Ee = {}, re = {}, qt = {
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
var qe;
function Yt() {
  if (qe)
    return Oe;
  qe = 1;
  var e = M;
  function t(u, d) {
    return u === d && (u !== 0 || 1 / u === 1 / d) || u !== u && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, s = e.useLayoutEffect, a = e.useDebugValue;
  function p(u, d) {
    var f = d(), i = n({ inst: { value: f, getSnapshot: d } }), l = i[0].inst, v = i[1];
    return s(function() {
      l.value = f, l.getSnapshot = d, g(l) && v({ inst: l });
    }, [u, f, d]), o(function() {
      return g(l) && v({ inst: l }), u(function() {
        g(l) && v({ inst: l });
      });
    }, [u]), a(f), f;
  }
  function g(u) {
    var d = u.getSnapshot;
    u = u.value;
    try {
      var f = d();
      return !r(u, f);
    } catch {
      return !0;
    }
  }
  function c(u, d) {
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
    var e = M, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var h = arguments.length, _ = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
          _[m - 1] = arguments[m];
        n("error", w, _);
      }
    }
    function n(w, h, _) {
      {
        var m = t.ReactDebugCurrentFrame, y = m.getStackAddendum();
        y !== "" && (h += "%s", _ = _.concat([y]));
        var E = _.map(function(k) {
          return String(k);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function o(w, h) {
      return w === h && (w !== 0 || 1 / w === 1 / h) || w !== w && h !== h;
    }
    var s = typeof Object.is == "function" ? Object.is : o, a = e.useState, p = e.useEffect, g = e.useLayoutEffect, c = e.useDebugValue, S = !1, u = !1;
    function d(w, h, _) {
      S || e.startTransition !== void 0 && (S = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = h();
      if (!u) {
        var y = h();
        s(m, y) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), u = !0);
      }
      var E = a({
        inst: {
          value: m,
          getSnapshot: h
        }
      }), k = E[0].inst, K = E[1];
      return g(function() {
        k.value = m, k.getSnapshot = h, f(k) && K({
          inst: k
        });
      }, [w, m, h]), p(function() {
        f(k) && K({
          inst: k
        });
        var pe = function() {
          f(k) && K({
            inst: k
          });
        };
        return w(pe);
      }, [w]), c(m), m;
    }
    function f(w) {
      var h = w.getSnapshot, _ = w.value;
      try {
        var m = h();
        return !s(_, m);
      } catch {
        return !0;
      }
    }
    function i(w, h, _) {
      return h();
    }
    var l = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", v = !l, B = v ? i : d, A = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : B;
    be.useSyncExternalStore = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), be;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Yt() : e.exports = Jt();
})(qt);
const Qt = /* @__PURE__ */ Kt(re);
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
  var e = M, t = re;
  function r(c, S) {
    return c === S && (c !== 0 || 1 / c === 1 / S) || c !== c && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, s = e.useRef, a = e.useEffect, p = e.useMemo, g = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(c, S, u, d, f) {
    var i = s(null);
    if (i.current === null) {
      var l = { hasValue: !1, value: null };
      i.current = l;
    } else
      l = i.current;
    i = p(function() {
      function B(m) {
        if (!A) {
          if (A = !0, w = m, m = d(m), f !== void 0 && l.hasValue) {
            var y = l.value;
            if (f(y, m))
              return h = y;
          }
          return h = m;
        }
        if (y = h, n(w, m))
          return y;
        var E = d(m);
        return f !== void 0 && f(y, E) ? y : (w = m, h = E);
      }
      var A = !1, w, h, _ = u === void 0 ? null : u;
      return [function() {
        return B(S());
      }, _ === null ? void 0 : function() {
        return B(_());
      }];
    }, [S, u, d, f]);
    var v = o(c, i[0], i[1]);
    return a(function() {
      l.hasValue = !0, l.value = v;
    }, [v]), g(v), v;
  }, Ee;
}
var ke = {};
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
    var e = M, t = re;
    function r(S, u) {
      return S === u && (S !== 0 || 1 / S === 1 / u) || S !== S && u !== u;
    }
    var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, s = e.useRef, a = e.useEffect, p = e.useMemo, g = e.useDebugValue;
    function c(S, u, d, f, i) {
      var l = s(null), v;
      l.current === null ? (v = {
        hasValue: !1,
        value: null
      }, l.current = v) : v = l.current;
      var B = p(function() {
        var _ = !1, m, y, E = function(U) {
          if (!_) {
            _ = !0, m = U;
            var ve = f(U);
            if (i !== void 0 && v.hasValue) {
              var he = v.value;
              if (i(he, ve))
                return y = he, he;
            }
            return y = ve, ve;
          }
          var gt = m, me = y;
          if (n(gt, U))
            return me;
          var Se = f(U);
          return i !== void 0 && i(me, Se) ? me : (m = U, y = Se, Se);
        }, k = d === void 0 ? null : d, K = function() {
          return E(u());
        }, pe = k === null ? void 0 : function() {
          return E(k());
        };
        return [K, pe];
      }, [u, d, f, i]), A = B[0], w = B[1], h = o(S, A, w);
      return a(function() {
        v.hasValue = !0, v.value = h;
      }, [h]), g(h), h;
    }
    ke.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Xt() : e.exports = Zt();
})(Ut);
function er(e, t, r, n) {
  let o = [Vt.run({ fn: (s) => t(s) })];
  if (n && o.unshift(n), r) {
    let s = P({ node: o }), a = e.graphite.id, p = r.additionalLinks, g = p[a] || [];
    return p[a] = g, g.push(s), () => {
      let c = g.indexOf(s);
      c !== -1 && g.splice(c, 1), Re(s);
    };
  }
  {
    let s = P({ node: o, parent: [e], family: { owners: e } });
    return () => {
      Re(s);
    };
  }
}
function tr(e, t) {
  kt.store(e) || St("expect useStore argument to be a store");
  let r = M.useCallback((o) => er(e, o, t), [e, t]), n = M.useCallback(() => or(e, t), [e, t]);
  return ar(r, n, n);
}
function rr(e) {
  let t = M.useContext(ir);
  return e && !t && St("No scope found, consider adding <Provider> to app root"), t;
}
function nr(e, t) {
  return tr(e, rr(t == null ? void 0 : t.forceScope));
}
let St = (e) => {
  throw Error(e);
};
typeof window < "u" ? M.useLayoutEffect : M.useEffect;
const { useSyncExternalStore: ar } = Qt, or = (e, t) => t ? t.getState(e) : e.getState(), ir = M.createContext(null), sr = (e, t, r) => {
  Ze(() => {
    const n = (o) => {
      o instanceof KeyboardEvent && o.key === r ? t(o) : r || t(o);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, Xe = (e, t, r, n) => {
  Ze(() => (O.addEventListener(e, t, r), () => O.removeEventListener(r)), [...n]);
}, mr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: o, activePopout: s, isRouteInit: a } = lr();
  Xe("init", (p) => {
    console.log("[blum]: initialized", p), a || (O.setDefaultBackHandlerOptions(), O.historyPush(e));
  }, 1, [a]), sr("popstate", async () => {
    const p = async () => {
      O.isDispatchChangeStateEventBeforeMiddleware && O.dispatchChangeStateEvent();
      const { view: g, panel: c, modal: S, popout: u } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", g, c, S, u), console.log("storeRoutes", r, n, o, s);
      for (const d in t)
        if (!await t[d]({
          view: r,
          panel: n,
          modal: o,
          popout: s
        }, { view: g, panel: c, modal: S, popout: u }))
          return;
      O.isDispatchChangeStateEventAfterMiddleware && O.dispatchChangeStateEvent();
    };
    a && (O.beforeBackHandledCallback && O.beforeBackHandledCallback(), await p(), O.isBackFromBrowser = !0, O.afterBackHandledCallback && O.afterBackHandledCallback(), O.setDefaultBackHandlerOptions());
  }), Xe("changestate", (p) => {
    if (console.log("[blum]: state changed", p), p) {
      const { view: g, panel: c, modal: S, popout: u } = p;
      g && c && pt({ view: g, panel: c }), vt(S), ht(u), a || mt();
    }
  }, 2, [a]);
}, lr = () => nr(Ft), Sr = (e) => e, gr = (e, t) => ur(e, (r, n) => {
  t && t(r, n), O.historyPush(r);
}), ur = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((s) => r[s] === e && r[s] !== n[s]) && O.isBackFromBrowser ? (t && t(r, n), !1) : !0;
export {
  vt as _setActiveModal,
  Wt as _setActivePanel,
  ht as _setActivePopout,
  jt as _setActiveView,
  fr as back,
  O as blumRouter,
  ur as createCatchBackBrowserRouteMiddleware,
  gr as createDisableBackBrowserRouteMiddleware,
  Sr as createRouteMiddleware,
  vr as setActiveModal,
  pr as setActivePanel,
  hr as setActivePopout,
  dr as setActiveViewPanel,
  mr as useInitRouter,
  lr as useRouter
};
