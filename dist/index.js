import V, { useEffect as et } from "react";
const x = {
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
}, pr = (e) => {
  e && gt(e), window.blumRouter.isBackFromBrowser = !1, window.history.back();
}, gt = ({ beforeBackHandledCallback: e, afterBackHandledCallback: t, isDispatchChangeStateEventAfterMiddleware: r, isDispatchChangeStateEventBeforeMiddleware: n }) => {
  e && (window.blumRouter.beforeBackHandledCallback = e), t && (window.blumRouter.afterBackHandledCallback = t), typeof r == "boolean" && (window.blumRouter.isDispatchChangeStateEventAfterMiddleware = r), typeof n == "boolean" && (window.blumRouter.isDispatchChangeStateEventBeforeMiddleware = n);
}, $e = () => {
  window.blumRouter = {
    isBackFromBrowser: !0,
    beforeBackHandledCallback: null,
    afterBackHandledCallback: null,
    isDispatchChangeStateEventBeforeMiddleware: !1,
    isDispatchChangeStateEventAfterMiddleware: !0
  };
}, vr = (e) => {
  x.historyPush({ view: e.view, panel: e.panel });
}, hr = (e) => {
  x.historyPush({ panel: e });
}, mr = (e) => {
  x.historyPush({ modal: e });
}, Sr = (e) => {
  x.historyPush({ popout: e });
};
function yt(e, t) {
  for (let r in e)
    t(e[r], r);
}
function A(e, t) {
  e.forEach(t);
}
function W(e, t) {
  if (!e)
    throw Error(t);
}
function P({ node: e = [], from: t, source: r, parent: n = t || r, to: i, target: s, child: o = i || s, scope: p = {}, meta: w = {}, family: c = { type: "regular" }, regional: S } = {}) {
  let l = ie(n), d = ie(c.links), f = ie(c.owners), a = [];
  A(e, (v) => v && M(a, v));
  let u = { id: Ct(), seq: a, next: ie(o), meta: w, scope: p, family: { type: c.type || "crosslink", links: d, owners: f } };
  return A(d, (v) => M(ce(v), u)), A(f, (v) => M(fe(v), u)), A(l, (v) => M(v.next, u)), S && z && at(J(z), [u]), u;
}
function tt(e, t, r) {
  let n, i = B, s = null, o = b;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, i = "page" in e ? e.page : i, e.stack && (s = e.stack), o = oe(e) || o, e = e.target), o && b && o !== b && (b = null), Array.isArray(e))
    for (let a = 0; a < e.length; a++)
      T("pure", i, D(e[a]), s, t[a], o, n);
  else
    T("pure", i, D(e), s, t, o, n);
  if (r && !ae)
    return;
  let p, w, c, S, l, d, f = { isRoot: ae, currentPage: B, scope: b, isWatch: ge, isPure: se };
  ae = 0;
  e:
    for (; S = $t(); ) {
      let { idx: a, stack: u, type: v } = S;
      c = u.node, B = l = u.page, b = oe(u), l ? d = l.reg : b && (d = b.reg);
      let R = !!l, L = !!b, y = { fail: 0, scope: c.scope };
      p = w = 0;
      for (let h = a; h < c.seq.length && !p; h++) {
        let g = c.seq[h];
        if (g.order) {
          let { priority: m, barrierID: _ } = g.order, E = _ ? l ? `${l.fullID}_${_}` : _ : 0;
          if (h !== a || v !== m) {
            _ ? _e.has(E) || (_e.add(E), Le(h, u, m, _)) : Le(h, u, m);
            continue e;
          }
          _ && _e.delete(E);
        }
        switch (g.type) {
          case "mov": {
            let _, E = g.data;
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
                  if (R) {
                    let O = lt(l, E.store.id);
                    u.page = l = O, O ? d = O.reg : L ? (G(b, E.store, 0, 1, E.softRead), d = b.reg) : d = void 0;
                  } else
                    L && G(b, E.store, 0, 1, E.softRead);
                _ = ut(d && d[E.store.id] || E.store);
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
                Ht(l, b, c, E.target).current = _;
            }
            break;
          }
          case "compute":
            let m = g.data;
            if (m.fn) {
              ge = k(c, "op") === "watch", se = m.pure;
              let _ = m.safe ? (0, m.fn)(J(u), y.scope, u) : Wt(y, m.fn, u);
              m.filter ? w = !_ : u.value = _, ge = f.isWatch, se = f.isPure;
            }
        }
        p = y.fail || w;
      }
      if (!p) {
        let h = J(u), g = oe(u);
        if (A(c.next, (m) => {
          T("child", l, m, u, h, g);
        }), g) {
          k(c, "needFxCounter") && T("child", l, g.fxCount, u, h, g), k(c, "storeChange") && T("child", l, g.storeChange, u, h, g), k(c, "warnSerialize") && T("child", l, g.warnSerializeNode, u, h, g);
          let m = g.additionalLinks[c.id];
          m && A(m, (_) => {
            T("child", l, _, u, h, g);
          });
        }
      }
    }
  ae = f.isRoot, B = f.currentPage, b = oe(f);
}
function Et(e, t) {
  let r, n, i = e;
  if (t) {
    let s = Ot(t);
    e.length === 0 ? (r = s.path, n = s.fullName) : (r = s.path.concat([e]), n = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: i, fullName: n, path: r };
}
function Y(e, ...t) {
  let r = it();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function C(e, t) {
  let r = te({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (o, ...p) => (Z(!k(n, "derived"), "call of derived event", "createEvent"), Z(!se, "unit call from pure function", "operators like sample"), B ? ((w, c, S, l) => {
    let d = B, f = null;
    if (c)
      for (f = B; f && f.template !== c; )
        f = j(f);
    Ue(f);
    let a = w.create(S, l);
    return Ue(d), a;
  })(n, i, o, p) : n.create(o, p)), i = it(), s = Object.assign(n, { graphite: P({ meta: dt("event", n, r), regional: 1 }), create: (o) => (tt({ target: n, params: o, scope: b }), o), watch: (o) => ft(n, o), map: (o) => ye(n, Q, o, [$()]), filter: (o) => ye(n, "filter", o.fn ? o : o.fn, [$(Me, 1)]), filterMap: (o) => ye(n, "filterMap", o, [$(), ke((p) => !N(p), 1)]), prepend(o) {
    let p = C("* → " + n.shortName, { parent: j(n) });
    return Y("eventPrepend", D(p)), Ne(p, n, [$()], "prepend", o), jt(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(s), s;
}
function He(e, t, r, n) {
  return Vt(r, t, "first argument"), W(I(n), "second argument should be a function"), Z(!k(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), A(Array.isArray(r) ? r : [r], (i) => {
    e.off(i), le(e).set(i, ct(pt(i, e, "on", Dt, n)));
  }), e;
}
function rt(e, t) {
  let r = te(t), n = It(e), i = C({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let s = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: i, defaultState: e, stateRef: n, getState() {
    let a, u = n;
    if (B) {
      let v = B;
      for (; v && !v.reg[s]; )
        v = j(v);
      v && (a = v);
    }
    return !a && b && (G(b, n, 1), a = b), a && (u = a.reg[s]), ut(u);
  }, setState: (a) => tt({ target: o, params: a, defer: 1, scope: b }), reset: (...a) => (A(a, (u) => He(o, ".reset", u, () => o.defaultState)), o), on: (a, u) => He(o, ".on", a, u), off(a) {
    let u = le(o).get(a);
    return u && (u(), le(o).delete(a)), o;
  }, map(a, u) {
    let v, R;
    K(a) && (v = a, a = a.fn), Z(N(u), "second argument of store.map", "updateFilter");
    let L = o.getState();
    N(L) || (R = a(L, u));
    let y = rt(R, { name: `${o.shortName} → *`, derived: 1, and: v }), h = pt(o, y, Q, Ge, a);
    return Nt(ue(y), { type: Q, fn: a, from: n }), ue(y).noInit = 1, Y("storeMap", n, h), y;
  }, watch(a, u) {
    if (!u || !xe(a)) {
      let v = ft(o, a);
      return Y("storeWatch", n, a) || a(o.getState()), v;
    }
    return W(I(u), "second argument should be a function"), a.watch((v) => u(o.getState(), v));
  } }, p = dt("store", o, r), w = o.defaultConfig.updateFilter;
  o.graphite = P({ scope: { state: n, fn: w }, node: [ke((a, u, v) => (v.scope && !v.scope.reg[n.id] && (v.b = 1), a)), Tt(n), ke((a, u, { a: v, b: R }) => !N(a) && (a !== v || R), 1), w && $(Ge, 1), de({ from: X, target: n })], child: i, meta: p, regional: 1 });
  let c = k(o, "serialize"), S = k(o, "derived"), l = c === "ignore", d = !c || l ? 0 : c, f = k(o, "sid");
  return f && (l || ze(o, "storeChange", 1), n.sid = f, d && (n.meta = { ...n == null ? void 0 : n.meta, serialize: d })), f || l || S || ze(o, "warnSerialize", 1), W(S || !N(e), "current state can't be undefined, use null instead"), at(o, [i]), r != null && r.domain && r.domain.hooks.store(o), S || (o.reinit = C(), o.reset(o.reinit)), o;
}
let bt = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", D = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, ue = (e) => e.stateRef, J = (e) => e.value, le = (e) => e.subscribers, j = (e) => e.parent, oe = (e) => e.scope, k = (e, t) => D(e).meta[t], ze = (e, t, r) => D(e).meta[t] = r, Ot = (e) => e.compositeName, xe = (e) => (I(e) || K(e)) && "kind" in e;
const ne = (e) => (t) => xe(t) && t.kind === e;
let Ve = ne("store"), Rt = ne("event"), We = ne("effect"), nt = ne("domain"), kt = ne("scope");
var Lt = { __proto__: null, unit: xe, store: Ve, event: Rt, effect: We, domain: nt, scope: kt, attached: (e) => We(e) && k(e, "attached") == 1 };
let we = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, M = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const De = () => {
  let e = 0;
  return () => "" + ++e;
};
let At = De(), ot = De(), Ct = De(), z = null, it = () => z, Bt = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), at = (e, t) => {
  let r = D(e);
  A(t, (n) => {
    let i = D(n);
    r.family.type !== "domain" && (i.family.type = "crosslink"), M(ce(i), r), M(fe(r), i);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(D), K = (e) => typeof e == "object" && e !== null, I = (e) => typeof e == "function", N = (e) => e === void 0, xt = (e) => W(K(e) || I(e), "expect first argument be an object");
const je = (e, t, r, n) => W(!(!K(e) && !I(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Vt = (e, t, r) => {
  Array.isArray(e) ? A(e, (n, i) => je(n, t, `${i} item of ${r}`, "")) : je(e, t, r, " or array of units");
}, Ge = (e, { fn: t }, { a: r }) => t(e, r), Dt = (e, { fn: t }, { a: r }) => t(r, e), Me = (e, { fn: t }) => t(e);
const st = (e, t, r, n) => {
  let i = { id: ot(), type: e, data: t };
  return r && (i.order = { priority: r }, n && (i.order.barrierID = ++Mt)), i;
};
let Mt = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: i, priority: s }) => st("mov", { from: e, store: t, to: n, target: r }, s, i), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: i = 0, pure: s = 0 }) => st("compute", { fn: e, safe: n, filter: i, pure: s }, r, t), Te = ({ fn: e }) => ee({ fn: e, priority: "effect" }), ke = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Tt = (e, t, r) => de({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), $ = (e = Me, t) => ee({ fn: e, pure: 1, filter: t }), Pt = { mov: de, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: Te }, It = (e) => ({ id: ot(), current: e }), ut = ({ current: e }) => e, Nt = (e, t) => {
  e.before || (e.before = []), M(e.before, t);
}, H = null;
const Pe = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ae(e.v.type) > Ae(t.v.type)) && (r = e, e = t, t = r), r = Pe(e.r, t), e.r = e.l, e.l = r, e;
}, Ie = [];
let Ke = 0;
for (; Ke < 6; )
  M(Ie, { first: null, last: null, size: 0 }), Ke += 1;
const $t = () => {
  for (let e = 0; e < 6; e++) {
    let t = Ie[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = H.v;
        return H = Pe(H.l, H.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, T = (e, t, r, n, i, s, o) => Le(0, { a: null, b: null, node: r, parent: n, value: i, page: t, scope: s, meta: o }, e), Le = (e, t, r, n = 0) => {
  let i = Ae(r), s = Ie[i], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  i === 3 || i === 4 ? H = Pe(H, o) : (s.size === 0 ? s.first = o : s.last.r = o, s.last = o), s.size += 1;
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
}, _e = /* @__PURE__ */ new Set();
let b, ae = 1, ge = 0, se = 0, B = null, Ue = (e) => {
  B = e;
};
const lt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = j(e);
    if (e)
      return e;
  }
  return null;
};
let Ht = (e, t, r, n, i) => {
  let s = lt(e, n.id);
  return s ? s.reg[n.id] : t ? (G(t, n, i), t.reg[n.id]) : n;
};
const zt = (e) => e;
let G = (e, t, r, n, i) => {
  var s;
  let o = e.reg, p = t.sid, w = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (o[t.id])
    return;
  let c = { id: t.id, current: t.current, meta: t.meta };
  if (p && p in e.sidValuesMap && !(p in e.sidIdMap))
    c.current = (e.fromSerialize && w !== "ignore" && (w == null ? void 0 : w.read) || zt)(e.sidValuesMap[p]);
  else if (t.before && !i) {
    let S = 0, l = r || !t.noInit || n;
    A(t.before, (d) => {
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
const Wt = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (K(e) && (te(e.or, t), yt(e, (r, n) => {
  N(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const qe = (e, t) => {
  we(e.next, t), we(ce(e), t), we(fe(e), t);
}, Ce = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let i = fe(e);
  for (; n = i.pop(); )
    qe(n, e), (t || r && k(e, "op") !== "sample" || n.family.type === "crosslink") && Ce(n, t, k(n, "op") !== "on" && r);
  for (i = ce(e); n = i.pop(); )
    qe(n, e), r && n.family.type === "crosslink" && Ce(n, t, k(n, "op") !== "on" && r);
}, F = (e) => e.clear();
let Be = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Ve(e))
    F(le(e));
  else if (nt(e)) {
    r = 1;
    let n = e.history;
    F(n.events), F(n.effects), F(n.stores), F(n.domains);
  }
  Ce(D(e), !!t, r);
}, ct = (e) => {
  let t = () => Be(e);
  return t.unsubscribe = t, t;
}, Ne = (e, t, r, n, i) => P({ node: r, parent: e, child: t, scope: { fn: i }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), ft = (e, t) => (W(I(t), ".watch argument should be a function"), ct(P({ scope: { fn: t }, node: [Te({ fn: Me })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), jt = (e, t, r = "event") => {
  j(e) && j(e).hooks[r](t);
}, dt = (e, t, r) => {
  let n = te(r), i = e === "domain", s = At(), { sid: o = null, named: p = null, domain: w = null, parent: c = w } = n, S = p || n.name || (i ? "" : s), l = Et(S, c), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Bt(o), named: p, unitId: t.id = s, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = c, t.compositeName = l, t.defaultConfig = n, t.thru = (f) => (Z(0, "thru", "js pipe"), f(t)), t.getType = () => l.fullName, !i && (t.subscribe = (f) => (xt(f), t.watch(I(f) ? f : (a) => f.next && f.next(a))), t[bt] = () => t), d;
};
const ye = (e, t, r, n) => {
  let i;
  K(r) && (i = r, r = r.fn);
  let s = C({ name: `${e.shortName} → *`, derived: 1, and: i });
  return Ne(e, s, n, t, r), s;
}, pt = (e, t, r, n, i) => {
  let s = ue(t), o = de({ store: s, to: "a", priority: "read" });
  r === Q && (o.data.softRead = 1);
  let p = [o, $(n)];
  return Y("storeOnMap", s, p, Ve(e) && ue(e)), Ne(e, t, p, r, i);
};
P({ node: [Te({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Gt = C(), Kt = C(), vt = C(), ht = C(), mt = C(), St = C(), Ut = C(), qt = rt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Gt, (e, t) => ({
  ...e,
  activeView: t
})).on(Kt, (e, t) => ({
  ...e,
  activePanel: t
})).on(ht, (e, t) => ({
  ...e,
  activeModal: t
})).on(mt, (e, t) => ({
  ...e,
  activePopout: t
})).on(St, (e) => ({
  ...e,
  isRouteInit: !0
})).on(vt, (e, { view: t, panel: r }) => ({
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
var Fe = {}, Yt = {
  get exports() {
    return Fe;
  },
  set exports(e) {
    Fe = e;
  }
}, Ee = {}, re = {}, Jt = {
  get exports() {
    return re;
  },
  set exports(e) {
    re = e;
  }
}, be = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function Qt() {
  if (Ye)
    return be;
  Ye = 1;
  var e = V;
  function t(l, d) {
    return l === d && (l !== 0 || 1 / l === 1 / d) || l !== l && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, i = e.useEffect, s = e.useLayoutEffect, o = e.useDebugValue;
  function p(l, d) {
    var f = d(), a = n({ inst: { value: f, getSnapshot: d } }), u = a[0].inst, v = a[1];
    return s(function() {
      u.value = f, u.getSnapshot = d, w(u) && v({ inst: u });
    }, [l, f, d]), i(function() {
      return w(u) && v({ inst: u }), l(function() {
        w(u) && v({ inst: u });
      });
    }, [l]), o(f), f;
  }
  function w(l) {
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
  return be.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S, be;
}
var Oe = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Je;
function Xt() {
  return Je || (Je = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = V, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(y) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
          g[m - 1] = arguments[m];
        n("error", y, g);
      }
    }
    function n(y, h, g) {
      {
        var m = t.ReactDebugCurrentFrame, _ = m.getStackAddendum();
        _ !== "" && (h += "%s", g = g.concat([_]));
        var E = g.map(function(O) {
          return String(O);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[y], console, E);
      }
    }
    function i(y, h) {
      return y === h && (y !== 0 || 1 / y === 1 / h) || y !== y && h !== h;
    }
    var s = typeof Object.is == "function" ? Object.is : i, o = e.useState, p = e.useEffect, w = e.useLayoutEffect, c = e.useDebugValue, S = !1, l = !1;
    function d(y, h, g) {
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
      }), O = E[0].inst, U = E[1];
      return w(function() {
        O.value = m, O.getSnapshot = h, f(O) && U({
          inst: O
        });
      }, [y, m, h]), p(function() {
        f(O) && U({
          inst: O
        });
        var pe = function() {
          f(O) && U({
            inst: O
          });
        };
        return y(pe);
      }, [y]), c(m), m;
    }
    function f(y) {
      var h = y.getSnapshot, g = y.value;
      try {
        var m = h();
        return !s(g, m);
      } catch {
        return !0;
      }
    }
    function a(y, h, g) {
      return h();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", v = !u, R = v ? a : d, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : R;
    Oe.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Oe;
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
var Qe;
function er() {
  if (Qe)
    return Ee;
  Qe = 1;
  var e = V, t = re;
  function r(c, S) {
    return c === S && (c !== 0 || 1 / c === 1 / S) || c !== c && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, w = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(c, S, l, d, f) {
    var a = s(null);
    if (a.current === null) {
      var u = { hasValue: !1, value: null };
      a.current = u;
    } else
      u = a.current;
    a = p(function() {
      function R(m) {
        if (!L) {
          if (L = !0, y = m, m = d(m), f !== void 0 && u.hasValue) {
            var _ = u.value;
            if (f(_, m))
              return h = _;
          }
          return h = m;
        }
        if (_ = h, n(y, m))
          return _;
        var E = d(m);
        return f !== void 0 && f(_, E) ? _ : (y = m, h = E);
      }
      var L = !1, y, h, g = l === void 0 ? null : l;
      return [function() {
        return R(S());
      }, g === null ? void 0 : function() {
        return R(g());
      }];
    }, [S, l, d, f]);
    var v = i(c, a[0], a[1]);
    return o(function() {
      u.hasValue = !0, u.value = v;
    }, [v]), w(v), v;
  }, Ee;
}
var Re = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xe;
function tr() {
  return Xe || (Xe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = V, t = re;
    function r(S, l) {
      return S === l && (S !== 0 || 1 / S === 1 / l) || S !== S && l !== l;
    }
    var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, w = e.useDebugValue;
    function c(S, l, d, f, a) {
      var u = s(null), v;
      u.current === null ? (v = {
        hasValue: !1,
        value: null
      }, u.current = v) : v = u.current;
      var R = p(function() {
        var g = !1, m, _, E = function(q) {
          if (!g) {
            g = !0, m = q;
            var ve = f(q);
            if (a !== void 0 && v.hasValue) {
              var he = v.value;
              if (a(he, ve))
                return _ = he, he;
            }
            return _ = ve, ve;
          }
          var _t = m, me = _;
          if (n(_t, q))
            return me;
          var Se = f(q);
          return a !== void 0 && a(me, Se) ? me : (m = q, _ = Se, Se);
        }, O = d === void 0 ? null : d, U = function() {
          return E(l());
        }, pe = O === null ? void 0 : function() {
          return E(O());
        };
        return [U, pe];
      }, [l, d, f, a]), L = R[0], y = R[1], h = i(S, L, y);
      return o(function() {
        v.hasValue = !0, v.value = h;
      }, [h]), w(h), h;
    }
    Re.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Re;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = er() : e.exports = tr();
})(Yt);
function rr(e, t, r, n) {
  let i = [Pt.run({ fn: (s) => t(s) })];
  if (n && i.unshift(n), r) {
    let s = P({ node: i }), o = e.graphite.id, p = r.additionalLinks, w = p[o] || [];
    return p[o] = w, w.push(s), () => {
      let c = w.indexOf(s);
      c !== -1 && w.splice(c, 1), Be(s);
    };
  }
  {
    let s = P({ node: i, parent: [e], family: { owners: e } });
    return () => {
      Be(s);
    };
  }
}
function nr(e, t) {
  Lt.store(e) || wt("expect useStore argument to be a store");
  let r = V.useCallback((i) => rr(e, i, t), [e, t]), n = V.useCallback(() => sr(e, t), [e, t]);
  return ar(r, n, n);
}
function or(e) {
  let t = V.useContext(ur);
  return e && !t && wt("No scope found, consider adding <Provider> to app root"), t;
}
function ir(e, t) {
  return nr(e, or(t == null ? void 0 : t.forceScope));
}
let wt = (e) => {
  throw Error(e);
};
typeof window < "u" ? V.useLayoutEffect : V.useEffect;
const { useSyncExternalStore: ar } = Zt, sr = (e, t) => t ? t.getState(e) : e.getState(), ur = V.createContext(null), lr = (e, t, r) => {
  et(() => {
    const n = (i) => {
      i instanceof KeyboardEvent && i.key === r ? t(i) : r || t(i);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, Ze = (e, t, r, n) => {
  et(() => (x.addEventListener(e, t, r), () => x.removeEventListener(r)), [...n]);
}, wr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: i, activePopout: s, isRouteInit: o } = cr();
  Ze("init", (p) => {
    console.log("[blum]: initialized", p), o || ($e(), x.historyPush(e));
  }, 1, [o]), lr("popstate", async () => {
    const p = async () => {
      window.blumRouter.isDispatchChangeStateEventBeforeMiddleware && x.dispatchChangeStateEvent();
      const { view: w, panel: c, modal: S, popout: l } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", w, c, S, l), console.log("storeRoutes", r, n, i, s);
      for (const d in t)
        if (!await t[d]({
          view: r,
          panel: n,
          modal: i,
          popout: s
        }, { view: w, panel: c, modal: S, popout: l }))
          return;
      window.blumRouter.isDispatchChangeStateEventAfterMiddleware && x.dispatchChangeStateEvent();
    };
    o && (window.blumRouter.beforeBackHandledCallback && window.blumRouter.beforeBackHandledCallback(), await p(), window.blumRouter.isBackFromBrowser = !0, window.blumRouter.afterBackHandledCallback && window.blumRouter.afterBackHandledCallback(), $e());
  }), Ze("changestate", (p) => {
    if (console.log("[blum]: state changed", p), p) {
      const { view: w, panel: c, modal: S, popout: l } = p;
      w && c && vt({ view: w, panel: c }), ht(S), mt(l), o || St();
    }
  }, 2, [o]);
}, cr = () => ir(qt), _r = (e) => e, gr = (e, t) => fr(e, (r, n) => {
  t && t(r, n), x.historyPush(r);
}), fr = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((s) => r[s] === e && r[s] !== n[s]) && window.blumRouter.isBackFromBrowser ? (t && t(r, n), !1) : !0;
export {
  ht as _setActiveModal,
  Kt as _setActivePanel,
  mt as _setActivePopout,
  Gt as _setActiveView,
  pr as back,
  x as blumRouter,
  fr as createCatchBackBrowserRouteMiddleware,
  gr as createDisableBackBrowserRouteMiddleware,
  _r as createRouteMiddleware,
  mr as setActiveModal,
  hr as setActivePanel,
  Sr as setActivePopout,
  vr as setActiveViewPanel,
  gt as setBackHandlerOptions,
  $e as setDefaultBackHandlerOptions,
  wr as useInitRouter,
  cr as useRouter
};
