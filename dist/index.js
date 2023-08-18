import D, { useEffect as Pe } from "react";
const M = {
  subscribers: [],
  historyPush(e, t) {
    const { view: r, panel: n, modal: o, popout: l } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    this.changeState({
      view: e.hasOwnProperty("view") ? e.view : r,
      panel: e.hasOwnProperty("panel") ? e.panel : n,
      modal: e.hasOwnProperty("modal") ? e.modal : o,
      popout: e.hasOwnProperty("popout") ? e.popout : l,
      options: t
    });
  },
  changeState(e) {
    try {
      window.history.pushState({
        view: e == null ? void 0 : e.view,
        panel: e == null ? void 0 : e.panel,
        modal: e == null ? void 0 : e.modal,
        popout: e == null ? void 0 : e.popout
      }, ""), this.dispatchChangeStateEvent(e == null ? void 0 : e.options);
    } catch (t) {
      console.log("changeState err", t);
    }
  },
  dispatchChangeStateEvent(e) {
    this._trigerEvent("changestate", { ...window.history.state, options: e });
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
function Ot(e, t) {
  for (let r in e)
    t(e[r], r);
}
function R(e, t) {
  e.forEach(t);
}
function j(e, t) {
  if (!e)
    throw Error(t);
}
function x({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: l, child: a = o || l, scope: f = {}, meta: y = {}, family: v = { type: "regular" }, regional: p } = {}) {
  let c = ie(n), d = ie(v.links), i = ie(v.owners), u = [];
  R(e, (h) => h && P(u, h));
  let s = { id: Mt(), seq: u, next: ie(a), meta: y, scope: f, family: { type: v.type || "crosslink", links: d, owners: i } };
  return R(d, (h) => P(ce(h), s)), R(i, (h) => P(de(h), s)), R(c, (h) => P(h.next, s)), p && z && lt(Q(z), [s]), s;
}
function rt(e, t, r) {
  let n, o = L, l = null, a = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (l = e.stack), a = ae(e) || a, e = e.target), a && O && a !== O && (O = null), Array.isArray(e))
    for (let u = 0; u < e.length; u++)
      V("pure", o, H(e[u]), l, t[u], a, n);
  else
    V("pure", o, H(e), l, t, a, n);
  if (r && !oe)
    return;
  let f, y, v, p, c, d, i = { isRoot: oe, currentPage: L, scope: O, isWatch: _e, isPure: se };
  oe = 0;
  e:
    for (; p = zt(); ) {
      let { idx: u, stack: s, type: h } = p;
      v = s.node, L = c = s.page, O = ae(s), c ? d = c.reg : O && (d = O.reg);
      let B = !!c, b = !!O, E = { fail: 0, scope: v.scope };
      f = y = 0;
      for (let m = u; m < v.seq.length && !f; m++) {
        let _ = v.seq[m];
        if (_.order) {
          let { priority: S, barrierID: w } = _.order, g = w ? c ? `${c.fullID}_${w}` : w : 0;
          if (m !== u || h !== S) {
            w ? ye.has(g) || (ye.add(g), Ce(m, s, S, w)) : Ce(m, s, S);
            continue e;
          }
          w && ye.delete(g);
        }
        switch (_.type) {
          case "mov": {
            let w, g = _.data;
            switch (g.from) {
              case Z:
                w = Q(s);
                break;
              case "a":
              case "b":
                w = s[g.from];
                break;
              case "value":
                w = g.store;
                break;
              case "store":
                if (d && !d[g.store.id])
                  if (B) {
                    let k = dt(c, g.store.id);
                    s.page = c = k, k ? d = k.reg : b ? (F(O, g.store, 0, 1, g.softRead), d = O.reg) : d = void 0;
                  } else
                    b && F(O, g.store, 0, 1, g.softRead);
                w = ct(d && d[g.store.id] || g.store);
            }
            switch (g.to) {
              case Z:
                s.value = w;
                break;
              case "a":
              case "b":
                s[g.to] = w;
                break;
              case "store":
                jt(c, O, v, g.target).current = w;
            }
            break;
          }
          case "compute":
            let S = _.data;
            if (S.fn) {
              _e = A(v, "op") === "watch", se = S.pure;
              let w = S.safe ? (0, S.fn)(Q(s), E.scope, s) : Ft(E, S.fn, s);
              S.filter ? y = !w : s.value = w, _e = i.isWatch, se = i.isPure;
            }
        }
        f = E.fail || y;
      }
      if (!f) {
        let m = Q(s), _ = ae(s);
        if (R(v.next, (S) => {
          V("child", c, S, s, m, _);
        }), _) {
          A(v, "needFxCounter") && V("child", c, _.fxCount, s, m, _), A(v, "storeChange") && V("child", c, _.storeChange, s, m, _), A(v, "warnSerialize") && V("child", c, _.warnSerializeNode, s, m, _);
          let S = _.additionalLinks[v.id];
          S && R(S, (w) => {
            V("child", c, w, s, m, _);
          });
        }
      }
    }
  oe = i.isRoot, L = i.currentPage, O = ae(i);
}
function bt(e, t) {
  let r, n, o = e;
  if (t) {
    let l = Bt(t);
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
function C(e, t) {
  let r = re({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (a, ...f) => (ee(!A(n, "derived"), "call of derived event", "createEvent"), ee(!se, "unit call from pure function", "operators like sample"), L ? ((y, v, p, c) => {
    let d = L, i = null;
    if (v)
      for (i = L; i && i.template !== v; )
        i = W(i);
    Ye(i);
    let u = y.create(p, c);
    return Ye(d), u;
  })(n, o, a, f) : n.create(a, f)), o = st(), l = Object.assign(n, { graphite: x({ meta: vt(r.actualOp || "event", n, r), regional: 1 }), create: (a) => (rt({ target: n, params: a, scope: O }), a), watch: (a) => pt(n, a), map: (a) => ge(n, X, a, [N()]), filter: (a) => ge(n, "filter", a.fn ? a : a.fn, [N(Ie, 1)]), filterMap: (a) => ge(n, "filterMap", a, [N(), Be((f) => !I(f), 1)]), prepend(a) {
    let f = C("* → " + n.shortName, { parent: W(n) });
    return J("eventPrepend", H(f)), je(f, n, [N()], "prepend", a), Gt(n, f), f;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), Y(l, "id", l.graphite.id), ot(l.graphite), l;
}
function Fe(e, t, r, n) {
  return Pt(r, t, "first argument"), j(T(n), "second argument should be a function"), ee(!A(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), R(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), ue(e).set(o, ft(ht(o, e, "on", Vt, n)));
  }), e;
}
function nt(e, t) {
  let r = re(t), n = Nt(e), o = C({ named: "updates", derived: 1 });
  J("storeBase", n);
  let l = n.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let i, u = n;
    if (L) {
      let s = L;
      for (; s && !s.reg[l]; )
        s = W(s);
      s && (i = s);
    }
    return !i && O && (F(O, n, 1), i = O), i && (u = i.reg[l]), ct(u);
  }, setState: (i) => rt({ target: a, params: i, defer: 1, scope: O }), reset: (...i) => (R(i, (u) => Fe(a, ".reset", u, () => a.defaultState)), a), on: (i, u) => Fe(a, ".on", i, u), off(i) {
    let u = ue(a).get(i);
    return u && (u(), ue(a).delete(i)), a;
  }, map(i, u) {
    let s, h;
    G(i) && (s = i, i = i.fn), ee(I(u), "second argument of store.map", "updateFilter");
    let B = a.getState();
    I(B) || (h = i(B, u));
    let b = nt(h, { name: `${a.shortName} → *`, derived: 1, and: s }), E = ht(a, b, X, Ue, i);
    return $t(le(b), { type: X, fn: i, from: n }), le(b).noInit = 1, J("storeMap", n, E), b;
  }, watch(i, u) {
    if (!u || !Ve(i)) {
      let s = pt(a, i);
      return J("storeWatch", n, i) || i(a.getState()), s;
    }
    return j(T(u), "second argument should be a function"), i.watch((s) => u(a.getState(), s));
  } }, f = vt("store", a, r), y = a.defaultConfig.updateFilter;
  a.graphite = x({ scope: { state: n, fn: y }, node: [Be((i, u, s) => (s.scope && !s.scope.reg[n.id] && (s.b = 1), i)), Tt(n), Be((i, u, { a: s, b: h }) => !I(i) && (i !== s || h), 1), y && N(Ue, 1), fe({ from: Z, target: n })], child: o, meta: { ...f, defaultState: e }, regional: 1 }), Y(a, "id", a.graphite.id), Y(a, "rootStateRefId", l);
  let v = A(a, "serialize"), p = A(a, "derived"), c = v === "ignore", d = A(a, "sid");
  return d && (Y(a, "storeChange", 1), n.sid = d), d || c || p || Y(a, "warnSerialize", 1), j(p || !I(e), "current state can't be undefined, use null instead"), lt(a, [o]), r != null && r.domain && r.domain.hooks.store(a), p || (a.reinit = C({ named: "reinit" }), a.reset(a.reinit)), n.meta = a.graphite.meta, ot(a.graphite), a;
}
let kt = typeof Symbol < "u" && Symbol.observable || "@@observable", X = "map", Z = "stack", H = (e) => e.graphite || e, ce = (e) => e.family.owners, de = (e) => e.family.links, le = (e) => e.stateRef, Q = (e) => e.value, ue = (e) => e.subscribers, W = (e) => e.parent, ae = (e) => e.scope, A = (e, t) => H(e).meta[t], Y = (e, t, r) => H(e).meta[t] = r, Bt = (e) => e.compositeName, Ve = (e) => (T(e) || G(e)) && "kind" in e;
const ne = (e) => (t) => Ve(t) && t.kind === e;
let xe = ne("store"), Ct = ne("event"), Ge = ne("effect"), at = ne("domain"), At = ne("scope");
var Rt = { __proto__: null, unit: Ve, store: xe, event: Ct, effect: Ge, domain: at, scope: At, attached: (e) => Ge(e) && A(e, "attached") == 1 };
let we = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, P = (e, t) => e.push(t), ee = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Te = () => {
  let e = 0;
  return () => "" + ++e;
};
let Lt = Te(), it = Te(), Mt = Te(), z = null, ot = (e) => {
}, st = () => z, Dt = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), lt = (e, t) => {
  let r = H(e);
  R(t, (n) => {
    let o = H(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), P(ce(o), r), P(de(r), o);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(H), G = (e) => typeof e == "object" && e !== null, T = (e) => typeof e == "function", I = (e) => e === void 0, Ht = (e) => j(G(e) || T(e), "expect first argument be an object");
const Ke = (e, t, r, n) => j(!(!G(e) && !T(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Pt = (e, t, r) => {
  Array.isArray(e) ? R(e, (n, o) => Ke(n, t, `${o} item of ${r}`, "")) : Ke(e, t, r, " or array of units");
}, Ue = (e, { fn: t }, { a: r }) => t(e, r), Vt = (e, { fn: t }, { a: r }) => t(r, e), Ie = (e, { fn: t }) => t(e);
const ut = (e, t, r, n) => {
  let o = { id: it(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++xt)), o;
};
let xt = 0, fe = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : Z, batch: o, priority: l }) => ut("mov", { from: e, store: t, to: n, target: r }, l, o), te = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: l = 0 }) => ut("compute", { fn: e, safe: n, filter: o, pure: l }, r, t), Ne = ({ fn: e }) => te({ fn: e, priority: "effect" }), Be = (e, t, r) => te({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Tt = (e, t, r) => fe({ store: e, to: t ? Z : "a", priority: r && "sampler", batch: 1 }), N = (e = Ie, t) => te({ fn: e, pure: 1, filter: t }), It = { mov: fe, compute: te, filter: ({ fn: e, pure: t }) => te({ fn: e, filter: 1, pure: t }), run: Ne }, Nt = (e) => ({ id: it(), current: e }), ct = ({ current: e }) => e, $t = (e, t) => {
  e.before || (e.before = []), P(e.before, t);
}, $ = null;
const $e = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ae(e.v.type) > Ae(t.v.type)) && (r = e, e = t, t = r), r = $e(e.r, t), e.r = e.l, e.l = r, e;
}, ze = [];
let qe = 0;
for (; qe < 6; )
  P(ze, { first: null, last: null, size: 0 }), qe += 1;
const zt = () => {
  for (let e = 0; e < 6; e++) {
    let t = ze[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = $.v;
        return $ = $e($.l, $.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, V = (e, t, r, n, o, l, a) => Ce(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: l, meta: a }, e), Ce = (e, t, r, n = 0) => {
  let o = Ae(r), l = ze[o], a = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? $ = $e($, a) : (l.size === 0 ? l.first = a : l.last.r = a, l.last = a), l.size += 1;
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
let O, oe = 1, _e = 0, se = 0, L = null, Ye = (e) => {
  L = e;
};
const dt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = W(e);
    if (e)
      return e;
  }
  return null;
};
let jt = (e, t, r, n, o) => {
  let l = dt(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, o), t.reg[n.id]) : n;
};
const Wt = (e) => e;
let F = (e, t, r, n, o) => {
  var l;
  let a = e.reg, f = t.sid, y = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize, v = e.fromSerialize && y !== "ignore" && (y == null ? void 0 : y.read) || Wt;
  if (a[t.id])
    return;
  let p = { id: t.id, current: t.current, meta: t.meta };
  if (p.id in e.values.idMap)
    p.current = e.values.idMap[p.id];
  else if (f && f in e.values.sidMap && !(f in e.sidIdMap))
    p.current = v(e.values.sidMap[f]);
  else if (t.before && !o) {
    let c = 0, d = r || !t.noInit || n;
    R(t.before, (i) => {
      switch (i.type) {
        case X: {
          let u = i.from;
          if (u || i.fn) {
            u && F(e, u, r, n);
            let s = u && a[u.id].current;
            d && (p.current = i.fn ? i.fn(s) : s);
          }
          break;
        }
        case "field":
          c || (c = 1, p.current = Array.isArray(p.current) ? [...p.current] : { ...p.current }), F(e, i.from, r, n), d && (p.current[i.field] = a[a[i.from.id].id].current);
      }
    });
  }
  f && (e.sidIdMap[f] = t.id), a[t.id] = p;
};
const Ft = (e, t, r) => {
  try {
    return t(Q(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1, e.failReason = n;
  }
};
let re = (e, t = {}) => (G(e) && (re(e.or, t), Ot(e, (r, n) => {
  I(r) || n === "or" || n === "and" || (t[n] = r);
}), re(e.and, t)), t);
const Je = (e, t) => {
  we(e.next, t), we(ce(e), t), we(de(e), t);
}, Re = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = de(e);
  for (; n = o.pop(); )
    Je(n, e), (t || r && A(e, "op") !== "sample" || n.family.type === "crosslink") && Re(n, t, A(n, "op") !== "on" && r);
  for (o = ce(e); n = o.pop(); )
    Je(n, e), r && n.family.type === "crosslink" && Re(n, t, A(n, "op") !== "on" && r);
}, q = (e) => e.clear();
let Le = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), xe(e))
    q(ue(e));
  else if (at(e)) {
    r = 1;
    let n = e.history;
    q(n.events), q(n.effects), q(n.stores), q(n.domains);
  }
  Re(H(e), !!t, r);
}, ft = (e) => {
  let t = () => Le(e);
  return t.unsubscribe = t, t;
}, je = (e, t, r, n, o) => x({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), pt = (e, t) => (j(T(t), ".watch argument should be a function"), ft(x({ scope: { fn: t }, node: [Ne({ fn: Ie })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Gt = (e, t, r = "event") => {
  W(e) && W(e).hooks[r](t);
}, vt = (e, t, r) => {
  let n = re(r), o = e === "domain", l = Lt(), { sid: a = null, named: f = null, domain: y = null, parent: v = y } = n, p = f || n.name || (o ? "" : l), c = bt(p, v), d = { op: t.kind = e, name: t.shortName = p, sid: t.sid = Dt(a), named: f, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = v, t.compositeName = c, t.defaultConfig = n, t.thru = (i) => (ee(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !o && (t.subscribe = (i) => (Ht(i), t.watch(T(i) ? i : (u) => i.next && i.next(u))), t[kt] = () => t), d;
};
const ge = (e, t, r, n) => {
  let o;
  G(r) && (o = r, r = r.fn);
  let l = C({ name: `${e.shortName} → *`, derived: 1, and: o });
  return je(e, l, n, t, r), l;
}, ht = (e, t, r, n, o) => {
  let l = le(t), a = fe({ store: l, to: "a", priority: "read" });
  r === X && (a.data.softRead = 1);
  let f = [a, N(n)];
  return J("storeOnMap", l, f, xe(e) && le(e)), je(e, t, f, r, o);
};
x({ node: [Ne({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Kt = C(), Ut = C(), mt = C(), St = C(), wt = C(), yt = C(), _t = C(), qt = C(), Me = C(), De = C(), pr = (e) => {
  e && De({ ...e, isBackHandled: !1 }), (!e || !e.hasOwnProperty("isBackFromBrowser")) && De({ isBackFromBrowser: !1 }), window.history.back();
}, vr = (e, t) => {
  M.historyPush({ view: e.view, panel: e.panel }, t);
}, hr = (e, t) => {
  M.historyPush({ panel: e }, t);
}, mr = (e, t) => {
  M.historyPush({ modal: e }, t);
}, Sr = (e, t) => {
  M.historyPush({ popout: e }, t);
}, Yt = nt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  routeOptions: null,
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
})).on(Kt, (e, t) => ({
  ...e,
  activeView: t
})).on(Ut, (e, t) => ({
  ...e,
  activePanel: t
})).on(St, (e, t) => ({
  ...e,
  activeModal: t
})).on(wt, (e, t) => ({
  ...e,
  activePopout: t
})).on(yt, (e, t) => ({
  ...e,
  routeOptions: t
})).on(_t, (e) => ({
  ...e,
  isRouteInit: !0
})).on(mt, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(qt, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Jt(e) {
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
var Qe;
function Qt() {
  if (Qe)
    return Oe;
  Qe = 1;
  var e = D;
  function t(c, d) {
    return c === d && (c !== 0 || 1 / c === 1 / d) || c !== c && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, l = e.useLayoutEffect, a = e.useDebugValue;
  function f(c, d) {
    var i = d(), u = n({ inst: { value: i, getSnapshot: d } }), s = u[0].inst, h = u[1];
    return l(function() {
      s.value = i, s.getSnapshot = d, y(s) && h({ inst: s });
    }, [c, i, d]), o(function() {
      return y(s) && h({ inst: s }), c(function() {
        y(s) && h({ inst: s });
      });
    }, [c]), a(i), i;
  }
  function y(c) {
    var d = c.getSnapshot;
    c = c.value;
    try {
      var i = d();
      return !r(c, i);
    } catch {
      return !0;
    }
  }
  function v(c, d) {
    return d();
  }
  var p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? v : f;
  return Oe.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : p, Oe;
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
var Xe;
function Xt() {
  return Xe || (Xe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = D, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(E) {
      {
        for (var m = arguments.length, _ = new Array(m > 1 ? m - 1 : 0), S = 1; S < m; S++)
          _[S - 1] = arguments[S];
        n("error", E, _);
      }
    }
    function n(E, m, _) {
      {
        var S = t.ReactDebugCurrentFrame, w = S.getStackAddendum();
        w !== "" && (m += "%s", _ = _.concat([w]));
        var g = _.map(function(k) {
          return String(k);
        });
        g.unshift("Warning: " + m), Function.prototype.apply.call(console[E], console, g);
      }
    }
    function o(E, m) {
      return E === m && (E !== 0 || 1 / E === 1 / m) || E !== E && m !== m;
    }
    var l = typeof Object.is == "function" ? Object.is : o, a = e.useState, f = e.useEffect, y = e.useLayoutEffect, v = e.useDebugValue, p = !1, c = !1;
    function d(E, m, _) {
      p || e.startTransition !== void 0 && (p = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var S = m();
      if (!c) {
        var w = m();
        l(S, w) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var g = a({
        inst: {
          value: S,
          getSnapshot: m
        }
      }), k = g[0].inst, K = g[1];
      return y(function() {
        k.value = S, k.getSnapshot = m, i(k) && K({
          inst: k
        });
      }, [E, S, m]), f(function() {
        i(k) && K({
          inst: k
        });
        var pe = function() {
          i(k) && K({
            inst: k
          });
        };
        return E(pe);
      }, [E]), v(S), S;
    }
    function i(E) {
      var m = E.getSnapshot, _ = E.value;
      try {
        var S = m();
        return !l(_, S);
      } catch {
        return !0;
      }
    }
    function u(E, m, _) {
      return m();
    }
    var s = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", h = !s, B = h ? u : d, b = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : B;
    be.useSyncExternalStore = b, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), be;
}
process.env.NODE_ENV === "production" ? He.exports = Qt() : He.exports = Xt();
var We = He.exports;
const Zt = /* @__PURE__ */ Jt(We);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ze;
function er() {
  if (Ze)
    return Ee;
  Ze = 1;
  var e = D, t = We;
  function r(v, p) {
    return v === p && (v !== 0 || 1 / v === 1 / p) || v !== v && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, f = e.useMemo, y = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(v, p, c, d, i) {
    var u = l(null);
    if (u.current === null) {
      var s = { hasValue: !1, value: null };
      u.current = s;
    } else
      s = u.current;
    u = f(function() {
      function B(S) {
        if (!b) {
          if (b = !0, E = S, S = d(S), i !== void 0 && s.hasValue) {
            var w = s.value;
            if (i(w, S))
              return m = w;
          }
          return m = S;
        }
        if (w = m, n(E, S))
          return w;
        var g = d(S);
        return i !== void 0 && i(w, g) ? w : (E = S, m = g);
      }
      var b = !1, E, m, _ = c === void 0 ? null : c;
      return [function() {
        return B(p());
      }, _ === null ? void 0 : function() {
        return B(_());
      }];
    }, [p, c, d, i]);
    var h = o(v, u[0], u[1]);
    return a(function() {
      s.hasValue = !0, s.value = h;
    }, [h]), y(h), h;
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
var et;
function tr() {
  return et || (et = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = D, t = We;
    function r(p, c) {
      return p === c && (p !== 0 || 1 / p === 1 / c) || p !== p && c !== c;
    }
    var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, f = e.useMemo, y = e.useDebugValue;
    function v(p, c, d, i, u) {
      var s = l(null), h;
      s.current === null ? (h = {
        hasValue: !1,
        value: null
      }, s.current = h) : h = s.current;
      var B = f(function() {
        var _ = !1, S, w, g = function(U) {
          if (!_) {
            _ = !0, S = U;
            var ve = i(U);
            if (u !== void 0 && h.hasValue) {
              var he = h.value;
              if (u(he, ve))
                return w = he, he;
            }
            return w = ve, ve;
          }
          var Et = S, me = w;
          if (n(Et, U))
            return me;
          var Se = i(U);
          return u !== void 0 && u(me, Se) ? me : (S = U, w = Se, Se);
        }, k = d === void 0 ? null : d, K = function() {
          return g(c());
        }, pe = k === null ? void 0 : function() {
          return g(k());
        };
        return [K, pe];
      }, [c, d, i, u]), b = B[0], E = B[1], m = o(p, b, E);
      return a(function() {
        h.hasValue = !0, h.value = m;
      }, [m]), y(m), m;
    }
    ke.useSyncExternalStoreWithSelector = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
process.env.NODE_ENV === "production" ? er() : tr();
function rr(e, t, r, n) {
  let o = [It.run({ fn: (l) => t(l) })];
  if (n && o.unshift(n), r) {
    let l = x({ node: o }), a = e.graphite.id, f = r.additionalLinks, y = f[a] || [];
    return f[a] = y, y.push(l), () => {
      let v = y.indexOf(l);
      v !== -1 && y.splice(v, 1), Le(l);
    };
  }
  {
    let l = x({ node: o, parent: [e], family: { owners: e } });
    return () => {
      Le(l);
    };
  }
}
function nr(e, t) {
  Rt.store(e) || gt("expect useStore argument to be a store");
  let r = D.useCallback((o) => rr(e, o, t), [e, t]), n = D.useCallback(() => sr(e, t), [e, t]);
  return or(r, n, n);
}
function ar(e) {
  let t = D.useContext(lr);
  return e && !t && gt("No scope found, consider adding <Provider> to app root"), t;
}
function ir(e, t) {
  return nr(e, ar(t == null ? void 0 : t.forceScope));
}
let gt = (e) => {
  throw Error(e);
};
typeof window < "u" ? D.useLayoutEffect : D.useEffect;
const { useSyncExternalStore: or } = Zt, sr = (e, t) => t ? t.getState(e) : e.getState(), lr = D.createContext(null), ur = (e, t, r) => {
  Pe(() => {
    const n = (o) => {
      o instanceof KeyboardEvent && o.key === r ? t(o) : r || t(o);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, tt = (e, t, r, n) => {
  Pe(() => (M.addEventListener(e, t, r), () => M.removeEventListener(r)), [...n]);
}, wr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: o, activePopout: l, isRouteInit: a, routeOptions: f, isDispatchChangeStateEventBeforeMiddleware: y, isDispatchChangeStateEventAfterMiddleware: v, isBackHandled: p, isBackFromBrowser: c, afterBackHandledCallback: d, beforeBackHandledCallback: i } = cr();
  tt("init", (u) => {
    console.log("[blum]: initialized", u), a || (Me(), M.historyPush(e));
  }, 1, [a]), ur("popstate", async () => {
    const u = async (s, h) => {
      y && M.dispatchChangeStateEvent();
      for (const B in t)
        if (!await t[B](s, h, {
          isBackHandled: p,
          isBackFromBrowser: c,
          isDispatchChangeStateEventAfterMiddleware: v,
          isDispatchChangeStateEventBeforeMiddleware: y,
          beforeBackHandledCallback: i,
          afterBackHandledCallback: d
        }))
          return;
      v && M.dispatchChangeStateEvent();
    };
    if (a) {
      const s = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      }, h = {
        view: r,
        panel: n,
        modal: o,
        popout: l
      };
      console.log("[blum]: prevRoutes", s), console.log("[blum]: storeRoutes", h), i && i(h, s), await u(h, s), Me(), d && d(h, s);
    }
  }), tt("changestate", (u) => {
    if (console.log("[blum]: state changed", u), u) {
      const { view: s, panel: h, modal: B, popout: b } = u;
      s && h && mt({ view: s, panel: h }), St(B), wt(b), yt((u == null ? void 0 : u.options) ?? null), a || _t();
    }
  }, 2, [a]), Pe(() => {
    f && f != null && f.afterSetHandledCallback && f.afterSetHandledCallback();
  }, [f]);
}, cr = () => ir(Yt), yr = (e) => e, _r = (e, t) => dr(e, async (r, n, o) => {
  let l;
  if (t && (l = await t(r, n, o)), M.historyPush(r), typeof l == "boolean")
    return l;
}), dr = (e, t) => async (r, n, o) => {
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
  Ut as _setActivePanel,
  wt as _setActivePopout,
  Kt as _setActiveView,
  pr as back,
  M as blumRouter,
  dr as createCatchBackBrowserRouteMiddleware,
  _r as createDisableBackBrowserRouteMiddleware,
  yr as createRouteMiddleware,
  mr as setActiveModal,
  hr as setActivePanel,
  Sr as setActivePopout,
  vr as setActiveViewPanel,
  wr as useInitRouter,
  cr as useRouter
};
