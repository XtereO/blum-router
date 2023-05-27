import D, { useEffect as tt } from "react";
const M = {
  subscribers: [],
  historyPush(e) {
    const { view: t, panel: r, modal: n, popout: o } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    this.changeState({
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
};
function Et(e, t) {
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
function x({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: l, child: a = o || l, scope: p = {}, meta: y = {}, family: v = { type: "regular" }, regional: d } = {}) {
  let c = ie(n), f = ie(v.links), i = ie(v.owners), u = [];
  L(e, (S) => S && P(u, S));
  let s = { id: Rt(), seq: u, next: ie(a), meta: y, scope: p, family: { type: v.type || "crosslink", links: f, owners: i } };
  return L(f, (S) => P(ce(S), s)), L(i, (S) => P(fe(S), s)), L(c, (S) => P(S.next, s)), d && z && lt(Q(z), [s]), s;
}
function rt(e, t, r) {
  let n, o = R, l = null, a = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (l = e.stack), a = ae(e) || a, e = e.target), a && O && a !== O && (O = null), Array.isArray(e))
    for (let u = 0; u < e.length; u++)
      V("pure", o, H(e[u]), l, t[u], a, n);
  else
    V("pure", o, H(e), l, t, a, n);
  if (r && !oe)
    return;
  let p, y, v, d, c, f, i = { isRoot: oe, currentPage: R, scope: O, isWatch: we, isPure: se };
  oe = 0;
  e:
    for (; d = $t(); ) {
      let { idx: u, stack: s, type: S } = d;
      v = s.node, R = c = s.page, O = ae(s), c ? f = c.reg : O && (f = O.reg);
      let k = !!c, B = !!O, E = { fail: 0, scope: v.scope };
      p = y = 0;
      for (let h = u; h < v.seq.length && !p; h++) {
        let w = v.seq[h];
        if (w.order) {
          let { priority: m, barrierID: g } = w.order, _ = g ? c ? `${c.fullID}_${g}` : g : 0;
          if (h !== u || S !== m) {
            g ? ye.has(_) || (ye.add(_), Ce(h, s, m, g)) : Ce(h, s, m);
            continue e;
          }
          g && ye.delete(_);
        }
        switch (w.type) {
          case "mov": {
            let g, _ = w.data;
            switch (_.from) {
              case Z:
                g = Q(s);
                break;
              case "a":
              case "b":
                g = s[_.from];
                break;
              case "value":
                g = _.store;
                break;
              case "store":
                if (f && !f[_.store.id])
                  if (k) {
                    let b = ft(c, _.store.id);
                    s.page = c = b, b ? f = b.reg : B ? (F(O, _.store, 0, 1, _.softRead), f = O.reg) : f = void 0;
                  } else
                    B && F(O, _.store, 0, 1, _.softRead);
                g = ct(f && f[_.store.id] || _.store);
            }
            switch (_.to) {
              case Z:
                s.value = g;
                break;
              case "a":
              case "b":
                s[_.to] = g;
                break;
              case "store":
                zt(c, O, v, _.target).current = g;
            }
            break;
          }
          case "compute":
            let m = w.data;
            if (m.fn) {
              we = C(v, "op") === "watch", se = m.pure;
              let g = m.safe ? (0, m.fn)(Q(s), E.scope, s) : Wt(E, m.fn, s);
              m.filter ? y = !g : s.value = g, we = i.isWatch, se = i.isPure;
            }
        }
        p = E.fail || y;
      }
      if (!p) {
        let h = Q(s), w = ae(s);
        if (L(v.next, (m) => {
          V("child", c, m, s, h, w);
        }), w) {
          C(v, "needFxCounter") && V("child", c, w.fxCount, s, h, w), C(v, "storeChange") && V("child", c, w.storeChange, s, h, w), C(v, "warnSerialize") && V("child", c, w.warnSerializeNode, s, h, w);
          let m = w.additionalLinks[v.id];
          m && L(m, (g) => {
            V("child", c, g, s, h, w);
          });
        }
      }
    }
  oe = i.isRoot, R = i.currentPage, O = ae(i);
}
function Ot(e, t) {
  let r, n, o = e;
  if (t) {
    let l = kt(t);
    e.length === 0 ? (r = l.path, n = l.fullName) : (r = l.path.concat([e]), n = l.fullName.length === 0 ? e : l.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: o, fullName: n, path: r };
}
function J(e, ...t) {
  let r = st();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function A(e, t) {
  let r = re({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (a, ...p) => (ee(!C(n, "derived"), "call of derived event", "createEvent"), ee(!se, "unit call from pure function", "operators like sample"), R ? ((y, v, d, c) => {
    let f = R, i = null;
    if (v)
      for (i = R; i && i.template !== v; )
        i = W(i);
    qe(i);
    let u = y.create(d, c);
    return qe(f), u;
  })(n, o, a, p) : n.create(a, p)), o = st(), l = Object.assign(n, { graphite: x({ meta: vt(r.actualOp || "event", n, r), regional: 1 }), create: (a) => (rt({ target: n, params: a, scope: O }), a), watch: (a) => pt(n, a), map: (a) => _e(n, X, a, [N()]), filter: (a) => _e(n, "filter", a.fn ? a : a.fn, [N(Te, 1)]), filterMap: (a) => _e(n, "filterMap", a, [N(), Be((p) => !I(p), 1)]), prepend(a) {
    let p = A("* → " + n.shortName, { parent: W(n) });
    return J("eventPrepend", H(p)), ze(p, n, [N()], "prepend", a), Ft(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), Y(l, "id", l.graphite.id), ot(l.graphite), l;
}
function We(e, t, r, n) {
  return Ht(r, t, "first argument"), j(T(n), "second argument should be a function"), ee(!C(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), L(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), ue(e).set(o, dt(ht(o, e, "on", Pt, n)));
  }), e;
}
function nt(e, t) {
  let r = re(t), n = It(e), o = A({ named: "updates", derived: 1 });
  J("storeBase", n);
  let l = n.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let i, u = n;
    if (R) {
      let s = R;
      for (; s && !s.reg[l]; )
        s = W(s);
      s && (i = s);
    }
    return !i && O && (F(O, n, 1), i = O), i && (u = i.reg[l]), ct(u);
  }, setState: (i) => rt({ target: a, params: i, defer: 1, scope: O }), reset: (...i) => (L(i, (u) => We(a, ".reset", u, () => a.defaultState)), a), on: (i, u) => We(a, ".on", i, u), off(i) {
    let u = ue(a).get(i);
    return u && (u(), ue(a).delete(i)), a;
  }, map(i, u) {
    let s, S;
    G(i) && (s = i, i = i.fn), ee(I(u), "second argument of store.map", "updateFilter");
    let k = a.getState();
    I(k) || (S = i(k, u));
    let B = nt(S, { name: `${a.shortName} → *`, derived: 1, and: s }), E = ht(a, B, X, Ke, i);
    return Nt(le(B), { type: X, fn: i, from: n }), le(B).noInit = 1, J("storeMap", n, E), B;
  }, watch(i, u) {
    if (!u || !Pe(i)) {
      let s = pt(a, i);
      return J("storeWatch", n, i) || i(a.getState()), s;
    }
    return j(T(u), "second argument should be a function"), i.watch((s) => u(a.getState(), s));
  } }, p = vt("store", a, r), y = a.defaultConfig.updateFilter;
  a.graphite = x({ scope: { state: n, fn: y }, node: [Be((i, u, s) => (s.scope && !s.scope.reg[n.id] && (s.b = 1), i)), xt(n), Be((i, u, { a: s, b: S }) => !I(i) && (i !== s || S), 1), y && N(Ke, 1), de({ from: Z, target: n })], child: o, meta: { ...p, defaultState: e }, regional: 1 }), Y(a, "id", a.graphite.id), Y(a, "rootStateRefId", l);
  let v = C(a, "serialize"), d = C(a, "derived"), c = v === "ignore", f = C(a, "sid");
  return f && (Y(a, "storeChange", 1), n.sid = f), f || c || d || Y(a, "warnSerialize", 1), j(d || !I(e), "current state can't be undefined, use null instead"), lt(a, [o]), r != null && r.domain && r.domain.hooks.store(a), d || (a.reinit = A({ named: "reinit" }), a.reset(a.reinit)), n.meta = a.graphite.meta, ot(a.graphite), a;
}
let bt = typeof Symbol < "u" && Symbol.observable || "@@observable", X = "map", Z = "stack", H = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, le = (e) => e.stateRef, Q = (e) => e.value, ue = (e) => e.subscribers, W = (e) => e.parent, ae = (e) => e.scope, C = (e, t) => H(e).meta[t], Y = (e, t, r) => H(e).meta[t] = r, kt = (e) => e.compositeName, Pe = (e) => (T(e) || G(e)) && "kind" in e;
const ne = (e) => (t) => Pe(t) && t.kind === e;
let Ve = ne("store"), Bt = ne("event"), Fe = ne("effect"), at = ne("domain"), Ct = ne("scope");
var At = { __proto__: null, unit: Pe, store: Ve, event: Bt, effect: Fe, domain: at, scope: Ct, attached: (e) => Fe(e) && C(e, "attached") == 1 };
let ge = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, P = (e, t) => e.push(t), ee = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const xe = () => {
  let e = 0;
  return () => "" + ++e;
};
let Lt = xe(), it = xe(), Rt = xe(), z = null, ot = (e) => {
}, st = () => z, Mt = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), lt = (e, t) => {
  let r = H(e);
  L(t, (n) => {
    let o = H(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), P(ce(o), r), P(fe(r), o);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(H), G = (e) => typeof e == "object" && e !== null, T = (e) => typeof e == "function", I = (e) => e === void 0, Dt = (e) => j(G(e) || T(e), "expect first argument be an object");
const Ge = (e, t, r, n) => j(!(!G(e) && !T(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Ht = (e, t, r) => {
  Array.isArray(e) ? L(e, (n, o) => Ge(n, t, `${o} item of ${r}`, "")) : Ge(e, t, r, " or array of units");
}, Ke = (e, { fn: t }, { a: r }) => t(e, r), Pt = (e, { fn: t }, { a: r }) => t(r, e), Te = (e, { fn: t }) => t(e);
const ut = (e, t, r, n) => {
  let o = { id: it(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++Vt)), o;
};
let Vt = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : Z, batch: o, priority: l }) => ut("mov", { from: e, store: t, to: n, target: r }, l, o), te = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: l = 0 }) => ut("compute", { fn: e, safe: n, filter: o, pure: l }, r, t), Ie = ({ fn: e }) => te({ fn: e, priority: "effect" }), Be = (e, t, r) => te({ fn: e, safe: 1, filter: t, priority: r && "effect" }), xt = (e, t, r) => de({ store: e, to: t ? Z : "a", priority: r && "sampler", batch: 1 }), N = (e = Te, t) => te({ fn: e, pure: 1, filter: t }), Tt = { mov: de, compute: te, filter: ({ fn: e, pure: t }) => te({ fn: e, filter: 1, pure: t }), run: Ie }, It = (e) => ({ id: it(), current: e }), ct = ({ current: e }) => e, Nt = (e, t) => {
  e.before || (e.before = []), P(e.before, t);
}, $ = null;
const Ne = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ae(e.v.type) > Ae(t.v.type)) && (r = e, e = t, t = r), r = Ne(e.r, t), e.r = e.l, e.l = r, e;
}, $e = [];
let Ue = 0;
for (; Ue < 6; )
  P($e, { first: null, last: null, size: 0 }), Ue += 1;
const $t = () => {
  for (let e = 0; e < 6; e++) {
    let t = $e[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = $.v;
        return $ = Ne($.l, $.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, V = (e, t, r, n, o, l, a) => Ce(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: l, meta: a }, e), Ce = (e, t, r, n = 0) => {
  let o = Ae(r), l = $e[o], a = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? $ = Ne($, a) : (l.size === 0 ? l.first = a : l.last.r = a, l.last = a), l.size += 1;
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
let O, oe = 1, we = 0, se = 0, R = null, qe = (e) => {
  R = e;
};
const ft = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = W(e);
    if (e)
      return e;
  }
  return null;
};
let zt = (e, t, r, n, o) => {
  let l = ft(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, o), t.reg[n.id]) : n;
};
const jt = (e) => e;
let F = (e, t, r, n, o) => {
  var l;
  let a = e.reg, p = t.sid, y = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize, v = e.fromSerialize && y !== "ignore" && (y == null ? void 0 : y.read) || jt;
  if (a[t.id])
    return;
  let d = { id: t.id, current: t.current, meta: t.meta };
  if (d.id in e.values.idMap)
    d.current = e.values.idMap[d.id];
  else if (p && p in e.values.sidMap && !(p in e.sidIdMap))
    d.current = v(e.values.sidMap[p]);
  else if (t.before && !o) {
    let c = 0, f = r || !t.noInit || n;
    L(t.before, (i) => {
      switch (i.type) {
        case X: {
          let u = i.from;
          if (u || i.fn) {
            u && F(e, u, r, n);
            let s = u && a[u.id].current;
            f && (d.current = i.fn ? i.fn(s) : s);
          }
          break;
        }
        case "field":
          c || (c = 1, d.current = Array.isArray(d.current) ? [...d.current] : { ...d.current }), F(e, i.from, r, n), f && (d.current[i.field] = a[a[i.from.id].id].current);
      }
    });
  }
  p && (e.sidIdMap[p] = t.id), a[t.id] = d;
};
const Wt = (e, t, r) => {
  try {
    return t(Q(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1, e.failReason = n;
  }
};
let re = (e, t = {}) => (G(e) && (re(e.or, t), Et(e, (r, n) => {
  I(r) || n === "or" || n === "and" || (t[n] = r);
}), re(e.and, t)), t);
const Ye = (e, t) => {
  ge(e.next, t), ge(ce(e), t), ge(fe(e), t);
}, Le = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = fe(e);
  for (; n = o.pop(); )
    Ye(n, e), (t || r && C(e, "op") !== "sample" || n.family.type === "crosslink") && Le(n, t, C(n, "op") !== "on" && r);
  for (o = ce(e); n = o.pop(); )
    Ye(n, e), r && n.family.type === "crosslink" && Le(n, t, C(n, "op") !== "on" && r);
}, q = (e) => e.clear();
let Re = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Ve(e))
    q(ue(e));
  else if (at(e)) {
    r = 1;
    let n = e.history;
    q(n.events), q(n.effects), q(n.stores), q(n.domains);
  }
  Le(H(e), !!t, r);
}, dt = (e) => {
  let t = () => Re(e);
  return t.unsubscribe = t, t;
}, ze = (e, t, r, n, o) => x({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), pt = (e, t) => (j(T(t), ".watch argument should be a function"), dt(x({ scope: { fn: t }, node: [Ie({ fn: Te })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Ft = (e, t, r = "event") => {
  W(e) && W(e).hooks[r](t);
}, vt = (e, t, r) => {
  let n = re(r), o = e === "domain", l = Lt(), { sid: a = null, named: p = null, domain: y = null, parent: v = y } = n, d = p || n.name || (o ? "" : l), c = Ot(d, v), f = { op: t.kind = e, name: t.shortName = d, sid: t.sid = Mt(a), named: p, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = v, t.compositeName = c, t.defaultConfig = n, t.thru = (i) => (ee(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !o && (t.subscribe = (i) => (Dt(i), t.watch(T(i) ? i : (u) => i.next && i.next(u))), t[bt] = () => t), f;
};
const _e = (e, t, r, n) => {
  let o;
  G(r) && (o = r, r = r.fn);
  let l = A({ name: `${e.shortName} → *`, derived: 1, and: o });
  return ze(e, l, n, t, r), l;
}, ht = (e, t, r, n, o) => {
  let l = le(t), a = de({ store: l, to: "a", priority: "read" });
  r === X && (a.data.softRead = 1);
  let p = [a, N(n)];
  return J("storeOnMap", l, p, Ve(e) && le(e)), ze(e, t, p, r, o);
};
x({ node: [Ie({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Gt = A(), Kt = A(), mt = A(), St = A(), gt = A(), yt = A(), Ut = A(), Me = A(), De = A(), dr = (e) => {
  e && De({ ...e, isBackHandled: !1 }), (!e || !e.hasOwnProperty("isBackFromBrowser")) && De({ isBackFromBrowser: !1 }), window.history.back();
}, pr = (e) => {
  M.historyPush({ view: e.view, panel: e.panel });
}, vr = (e) => {
  M.historyPush({ panel: e });
}, hr = (e) => {
  M.historyPush({ modal: e });
}, mr = (e) => {
  M.historyPush({ popout: e });
}, qt = nt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0,
  isDispatchChangeStateEventBeforeMiddleware: !1,
  isDispatchChangeStateEventAfterMiddleware: !0,
  beforeBackHandledCallback: null,
  afterBackHandledCallback: null,
  isBackFromBrowser: !0
}).on(Me, (e) => ({
  ...e,
  isDispatchChangeStateEventBeforeMiddleware: !1,
  isDispatchChangeStateEventAfterMiddleware: !0,
  beforeBackHandledCallback: null,
  afterBackHandledCallback: null,
  isBackFromBrowser: !0,
  isBackHandled: !0
})).on(De, (e, t) => ({
  ...e,
  isBackHandled: t.hasOwnProperty("isBackHandled") ? t.isBackHandled : e.isBackHandled,
  isBackFromBrowser: t.hasOwnProperty("isBackFromBrowser") ? t.isBackFromBrowser : e.isBackFromBrowser,
  isDispatchChangeStateEventBeforeMiddleware: t.hasOwnProperty("isDispatchChangeStateEventBeforeMiddleware") ? t.isDispatchChangeStateEventBeforeMiddleware : e.isDispatchChangeStateEventBeforeMiddleware,
  isDispatchChangeStateEventAfterMiddleware: t.hasOwnProperty("isDispatchChangeStateEventAfterMiddleware") ? t.isDispatchChangeStateEventAfterMiddleware : e.isDispatchChangeStateEventAfterMiddleware,
  beforeBackHandledCallback: t.hasOwnProperty("beforeBackHandledCallback") ? t.beforeBackHandledCallback : e.beforeBackHandledCallback,
  afterBackHandledCallback: t.hasOwnProperty("afterBackHandledCallback") ? t.afterBackHandledCallback : e.afterBackHandledCallback
})).on(Gt, (e, t) => ({
  ...e,
  activeView: t
})).on(Kt, (e, t) => ({
  ...e,
  activePanel: t
})).on(St, (e, t) => ({
  ...e,
  activeModal: t
})).on(gt, (e, t) => ({
  ...e,
  activePopout: t
})).on(yt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(mt, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(Ut, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Yt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ee = {}, He = { exports: {} }, Oe = {};
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
function Jt() {
  if (Je)
    return Oe;
  Je = 1;
  var e = D;
  function t(c, f) {
    return c === f && (c !== 0 || 1 / c === 1 / f) || c !== c && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, l = e.useLayoutEffect, a = e.useDebugValue;
  function p(c, f) {
    var i = f(), u = n({ inst: { value: i, getSnapshot: f } }), s = u[0].inst, S = u[1];
    return l(function() {
      s.value = i, s.getSnapshot = f, y(s) && S({ inst: s });
    }, [c, i, f]), o(function() {
      return y(s) && S({ inst: s }), c(function() {
        y(s) && S({ inst: s });
      });
    }, [c]), a(i), i;
  }
  function y(c) {
    var f = c.getSnapshot;
    c = c.value;
    try {
      var i = f();
      return !r(c, i);
    } catch {
      return !0;
    }
  }
  function v(c, f) {
    return f();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? v : p;
  return Oe.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, Oe;
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
function Qt() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = D, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(E) {
      {
        for (var h = arguments.length, w = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
          w[m - 1] = arguments[m];
        n("error", E, w);
      }
    }
    function n(E, h, w) {
      {
        var m = t.ReactDebugCurrentFrame, g = m.getStackAddendum();
        g !== "" && (h += "%s", w = w.concat([g]));
        var _ = w.map(function(b) {
          return String(b);
        });
        _.unshift("Warning: " + h), Function.prototype.apply.call(console[E], console, _);
      }
    }
    function o(E, h) {
      return E === h && (E !== 0 || 1 / E === 1 / h) || E !== E && h !== h;
    }
    var l = typeof Object.is == "function" ? Object.is : o, a = e.useState, p = e.useEffect, y = e.useLayoutEffect, v = e.useDebugValue, d = !1, c = !1;
    function f(E, h, w) {
      d || e.startTransition !== void 0 && (d = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = h();
      if (!c) {
        var g = h();
        l(m, g) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var _ = a({
        inst: {
          value: m,
          getSnapshot: h
        }
      }), b = _[0].inst, K = _[1];
      return y(function() {
        b.value = m, b.getSnapshot = h, i(b) && K({
          inst: b
        });
      }, [E, m, h]), p(function() {
        i(b) && K({
          inst: b
        });
        var pe = function() {
          i(b) && K({
            inst: b
          });
        };
        return E(pe);
      }, [E]), v(m), m;
    }
    function i(E) {
      var h = E.getSnapshot, w = E.value;
      try {
        var m = h();
        return !l(w, m);
      } catch {
        return !0;
      }
    }
    function u(E, h, w) {
      return h();
    }
    var s = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", S = !s, k = S ? u : f, B = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : k;
    be.useSyncExternalStore = B, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), be;
}
process.env.NODE_ENV === "production" ? He.exports = Jt() : He.exports = Qt();
var je = He.exports;
const Xt = /* @__PURE__ */ Yt(je);
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
function Zt() {
  if (Xe)
    return Ee;
  Xe = 1;
  var e = D, t = je;
  function r(v, d) {
    return v === d && (v !== 0 || 1 / v === 1 / d) || v !== v && d !== d;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, p = e.useMemo, y = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(v, d, c, f, i) {
    var u = l(null);
    if (u.current === null) {
      var s = { hasValue: !1, value: null };
      u.current = s;
    } else
      s = u.current;
    u = p(function() {
      function k(m) {
        if (!B) {
          if (B = !0, E = m, m = f(m), i !== void 0 && s.hasValue) {
            var g = s.value;
            if (i(g, m))
              return h = g;
          }
          return h = m;
        }
        if (g = h, n(E, m))
          return g;
        var _ = f(m);
        return i !== void 0 && i(g, _) ? g : (E = m, h = _);
      }
      var B = !1, E, h, w = c === void 0 ? null : c;
      return [function() {
        return k(d());
      }, w === null ? void 0 : function() {
        return k(w());
      }];
    }, [d, c, f, i]);
    var S = o(v, u[0], u[1]);
    return a(function() {
      s.hasValue = !0, s.value = S;
    }, [S]), y(S), S;
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
var Ze;
function er() {
  return Ze || (Ze = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = D, t = je;
    function r(d, c) {
      return d === c && (d !== 0 || 1 / d === 1 / c) || d !== d && c !== c;
    }
    var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, p = e.useMemo, y = e.useDebugValue;
    function v(d, c, f, i, u) {
      var s = l(null), S;
      s.current === null ? (S = {
        hasValue: !1,
        value: null
      }, s.current = S) : S = s.current;
      var k = p(function() {
        var w = !1, m, g, _ = function(U) {
          if (!w) {
            w = !0, m = U;
            var ve = i(U);
            if (u !== void 0 && S.hasValue) {
              var he = S.value;
              if (u(he, ve))
                return g = he, he;
            }
            return g = ve, ve;
          }
          var _t = m, me = g;
          if (n(_t, U))
            return me;
          var Se = i(U);
          return u !== void 0 && u(me, Se) ? me : (m = U, g = Se, Se);
        }, b = f === void 0 ? null : f, K = function() {
          return _(c());
        }, pe = b === null ? void 0 : function() {
          return _(b());
        };
        return [K, pe];
      }, [c, f, i, u]), B = k[0], E = k[1], h = o(d, B, E);
      return a(function() {
        S.hasValue = !0, S.value = h;
      }, [h]), y(h), h;
    }
    ke.useSyncExternalStoreWithSelector = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
process.env.NODE_ENV === "production" ? Zt() : er();
function tr(e, t, r, n) {
  let o = [Tt.run({ fn: (l) => t(l) })];
  if (n && o.unshift(n), r) {
    let l = x({ node: o }), a = e.graphite.id, p = r.additionalLinks, y = p[a] || [];
    return p[a] = y, y.push(l), () => {
      let v = y.indexOf(l);
      v !== -1 && y.splice(v, 1), Re(l);
    };
  }
  {
    let l = x({ node: o, parent: [e], family: { owners: e } });
    return () => {
      Re(l);
    };
  }
}
function rr(e, t) {
  At.store(e) || wt("expect useStore argument to be a store");
  let r = D.useCallback((o) => tr(e, o, t), [e, t]), n = D.useCallback(() => or(e, t), [e, t]);
  return ir(r, n, n);
}
function nr(e) {
  let t = D.useContext(sr);
  return e && !t && wt("No scope found, consider adding <Provider> to app root"), t;
}
function ar(e, t) {
  return rr(e, nr(t == null ? void 0 : t.forceScope));
}
let wt = (e) => {
  throw Error(e);
};
typeof window < "u" ? D.useLayoutEffect : D.useEffect;
const { useSyncExternalStore: ir } = Xt, or = (e, t) => t ? t.getState(e) : e.getState(), sr = D.createContext(null), lr = (e, t, r) => {
  tt(() => {
    const n = (o) => {
      o instanceof KeyboardEvent && o.key === r ? t(o) : r || t(o);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, et = (e, t, r, n) => {
  tt(() => (M.addEventListener(e, t, r), () => M.removeEventListener(r)), [...n]);
}, Sr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: o, activePopout: l, isRouteInit: a, isDispatchChangeStateEventBeforeMiddleware: p, isDispatchChangeStateEventAfterMiddleware: y, isBackHandled: v, isBackFromBrowser: d, afterBackHandledCallback: c, beforeBackHandledCallback: f } = ur();
  et("init", (i) => {
    console.log("[blum]: initialized", i), a || (Me(), M.historyPush(e));
  }, 1, [a]), lr("popstate", async () => {
    const i = async (u, s) => {
      p && M.dispatchChangeStateEvent();
      for (const S in t)
        if (!await t[S](u, s, {
          isBackHandled: v,
          isBackFromBrowser: d,
          isDispatchChangeStateEventAfterMiddleware: y,
          isDispatchChangeStateEventBeforeMiddleware: p,
          beforeBackHandledCallback: f,
          afterBackHandledCallback: c
        }))
          return;
      y && M.dispatchChangeStateEvent();
    };
    if (a) {
      const u = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      }, s = {
        view: r,
        panel: n,
        modal: o,
        popout: l
      };
      console.log("[blum]: prevRoutes", u), console.log("[blum]: storeRoutes", s), f && f(s, u), await i(s, u), Me(), c && c(s, u);
    }
  }), et("changestate", (i) => {
    if (console.log("[blum]: state changed", i), i) {
      const { view: u, panel: s, modal: S, popout: k } = i;
      u && s && mt({ view: u, panel: s }), St(S), gt(k), a || yt();
    }
  }, 2, [a]);
}, ur = () => ar(qt), gr = (e) => e, yr = (e, t) => cr(e, async (r, n, o) => {
  let l;
  if (t && (l = await t(r, n, o)), M.historyPush(r), typeof l == "boolean")
    return l;
}), cr = (e, t) => async (r, n, o) => {
  if (["view", "panel", "modal", "popout"].some((a) => r[a] === e && r[a] !== n[a]) && o.isBackFromBrowser) {
    if (t) {
      const a = await t(r, n, o);
      if (typeof a == "boolean")
        return a;
    }
    return !1;
  }
  return !0;
};
export {
  St as _setActiveModal,
  Kt as _setActivePanel,
  gt as _setActivePopout,
  Gt as _setActiveView,
  dr as back,
  M as blumRouter,
  cr as createCatchBackBrowserRouteMiddleware,
  yr as createDisableBackBrowserRouteMiddleware,
  gr as createRouteMiddleware,
  hr as setActiveModal,
  vr as setActivePanel,
  mr as setActivePopout,
  pr as setActiveViewPanel,
  Sr as useInitRouter,
  ur as useRouter
};
