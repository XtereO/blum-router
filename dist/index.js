import M, { useEffect as tt } from "react";
const D = {
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
function _t(e, t) {
  for (let r in e)
    t(e[r], r);
}
function L(e, t) {
  e.forEach(t);
}
function W(e, t) {
  if (!e)
    throw Error(t);
}
function P({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: l, child: a = o || l, scope: h = {}, meta: y = {}, family: d = { type: "regular" }, regional: S } = {}) {
  let u = oe(n), f = oe(d.links), c = oe(d.owners), i = [];
  L(e, (p) => p && H(i, p));
  let s = { id: Lt(), seq: i, next: oe(a), meta: y, scope: h, family: { type: d.type || "crosslink", links: f, owners: c } };
  return L(f, (p) => H(ce(p), s)), L(c, (p) => H(fe(p), s)), L(u, (p) => H(p.next, s)), S && z && st(J(z), [s]), s;
}
function rt(e, t, r) {
  let n, o = R, l = null, a = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (l = e.stack), a = ae(e) || a, e = e.target), a && O && a !== O && (O = null), Array.isArray(e))
    for (let i = 0; i < e.length; i++)
      V("pure", o, x(e[i]), l, t[i], a, n);
  else
    V("pure", o, x(e), l, t, a, n);
  if (r && !ie)
    return;
  let h, y, d, S, u, f, c = { isRoot: ie, currentPage: R, scope: O, isWatch: we, isPure: se };
  ie = 0;
  e:
    for (; S = Nt(); ) {
      let { idx: i, stack: s, type: p } = S;
      d = s.node, R = u = s.page, O = ae(s), u ? f = u.reg : O && (f = O.reg);
      let b = !!u, A = !!O, _ = { fail: 0, scope: d.scope };
      h = y = 0;
      for (let v = i; v < d.seq.length && !h; v++) {
        let w = d.seq[v];
        if (w.order) {
          let { priority: m, barrierID: g } = w.order, E = g ? u ? `${u.fullID}_${g}` : g : 0;
          if (v !== i || p !== m) {
            g ? ye.has(E) || (ye.add(E), Ce(v, s, m, g)) : Ce(v, s, m);
            continue e;
          }
          g && ye.delete(E);
        }
        switch (w.type) {
          case "mov": {
            let g, E = w.data;
            switch (E.from) {
              case X:
                g = J(s);
                break;
              case "a":
              case "b":
                g = s[E.from];
                break;
              case "value":
                g = E.store;
                break;
              case "store":
                if (f && !f[E.store.id])
                  if (b) {
                    let k = ct(u, E.store.id);
                    s.page = u = k, k ? f = k.reg : A ? (F(O, E.store, 0, 1, E.softRead), f = O.reg) : f = void 0;
                  } else
                    A && F(O, E.store, 0, 1, E.softRead);
                g = ut(f && f[E.store.id] || E.store);
            }
            switch (E.to) {
              case X:
                s.value = g;
                break;
              case "a":
              case "b":
                s[E.to] = g;
                break;
              case "store":
                $t(u, O, d, E.target).current = g;
            }
            break;
          }
          case "compute":
            let m = w.data;
            if (m.fn) {
              we = B(d, "op") === "watch", se = m.pure;
              let g = m.safe ? (0, m.fn)(J(s), _.scope, s) : Wt(_, m.fn, s);
              m.filter ? y = !g : s.value = g, we = c.isWatch, se = c.isPure;
            }
        }
        h = _.fail || y;
      }
      if (!h) {
        let v = J(s), w = ae(s);
        if (L(d.next, (m) => {
          V("child", u, m, s, v, w);
        }), w) {
          B(d, "needFxCounter") && V("child", u, w.fxCount, s, v, w), B(d, "storeChange") && V("child", u, w.storeChange, s, v, w), B(d, "warnSerialize") && V("child", u, w.warnSerializeNode, s, v, w);
          let m = w.additionalLinks[d.id];
          m && L(m, (g) => {
            V("child", u, g, s, v, w);
          });
        }
      }
    }
  ie = c.isRoot, R = c.currentPage, O = ae(c);
}
function Et(e, t) {
  let r, n, o = e;
  if (t) {
    let l = bt(t);
    e.length === 0 ? (r = l.path, n = l.fullName) : (r = l.path.concat([e]), n = l.fullName.length === 0 ? e : l.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: o, fullName: n, path: r };
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
  let r = te({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (a, ...h) => (Z(!B(n, "derived"), "call of derived event", "createEvent"), Z(!se, "unit call from pure function", "operators like sample"), R ? ((y, d, S, u) => {
    let f = R, c = null;
    if (d)
      for (c = R; c && c.template !== d; )
        c = j(c);
    Ue(c);
    let i = y.create(S, u);
    return Ue(f), i;
  })(n, o, a, h) : n.create(a, h)), o = it(), l = Object.assign(n, { graphite: P({ meta: pt("event", n, r), regional: 1 }), create: (a) => (rt({ target: n, params: a, scope: O }), a), watch: (a) => dt(n, a), map: (a) => _e(n, Q, a, [N()]), filter: (a) => _e(n, "filter", a.fn ? a : a.fn, [N(Pe, 1)]), filterMap: (a) => _e(n, "filterMap", a, [N(), Be((h) => !I(h), 1)]), prepend(a) {
    let h = C("* → " + n.shortName, { parent: j(n) });
    return Y("eventPrepend", x(h)), $e(h, n, [N()], "prepend", a), jt(n, h), h;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), l;
}
function ze(e, t, r, n) {
  return Mt(r, t, "first argument"), W(T(n), "second argument should be a function"), Z(!B(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), L(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), ue(e).set(o, ft(vt(o, e, "on", xt, n)));
  }), e;
}
function nt(e, t) {
  let r = te(t), n = Tt(e), o = C({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let l = n.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let i, s = n;
    if (R) {
      let p = R;
      for (; p && !p.reg[l]; )
        p = j(p);
      p && (i = p);
    }
    return !i && O && (F(O, n, 1), i = O), i && (s = i.reg[l]), ut(s);
  }, setState: (i) => rt({ target: a, params: i, defer: 1, scope: O }), reset: (...i) => (L(i, (s) => ze(a, ".reset", s, () => a.defaultState)), a), on: (i, s) => ze(a, ".on", i, s), off(i) {
    let s = ue(a).get(i);
    return s && (s(), ue(a).delete(i)), a;
  }, map(i, s) {
    let p, b;
    G(i) && (p = i, i = i.fn), Z(I(s), "second argument of store.map", "updateFilter");
    let A = a.getState();
    I(A) || (b = i(A, s));
    let _ = nt(b, { name: `${a.shortName} → *`, derived: 1, and: p }), v = vt(a, _, Q, Ge, i);
    return It(le(_), { type: Q, fn: i, from: n }), le(_).noInit = 1, Y("storeMap", n, v), _;
  }, watch(i, s) {
    if (!s || !xe(i)) {
      let p = dt(a, i);
      return Y("storeWatch", n, i) || i(a.getState()), p;
    }
    return W(T(s), "second argument should be a function"), i.watch((p) => s(a.getState(), p));
  } }, h = pt("store", a, r), y = a.defaultConfig.updateFilter;
  a.graphite = P({ scope: { state: n, fn: y }, node: [Be((i, s, p) => (p.scope && !p.scope.reg[n.id] && (p.b = 1), i)), Vt(n), Be((i, s, { a: p, b }) => !I(i) && (i !== p || b), 1), y && N(Ge, 1), de({ from: X, target: n })], child: o, meta: h, regional: 1 });
  let d = B(a, "serialize"), S = B(a, "derived"), u = d === "ignore", f = !d || u ? 0 : d, c = B(a, "sid");
  return c && (u || We(a, "storeChange", 1), n.sid = c, f && (n.meta = { ...n == null ? void 0 : n.meta, serialize: f })), c || u || S || We(a, "warnSerialize", 1), W(S || !I(e), "current state can't be undefined, use null instead"), st(a, [o]), r != null && r.domain && r.domain.hooks.store(a), S || (a.reinit = C(), a.reset(a.reinit)), a;
}
let Ot = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", x = (e) => e.graphite || e, ce = (e) => e.family.owners, fe = (e) => e.family.links, le = (e) => e.stateRef, J = (e) => e.value, ue = (e) => e.subscribers, j = (e) => e.parent, ae = (e) => e.scope, B = (e, t) => x(e).meta[t], We = (e, t, r) => x(e).meta[t] = r, bt = (e) => e.compositeName, xe = (e) => (T(e) || G(e)) && "kind" in e;
const ne = (e) => (t) => xe(t) && t.kind === e;
let He = ne("store"), kt = ne("event"), je = ne("effect"), at = ne("domain"), Bt = ne("scope");
var Ct = { __proto__: null, unit: xe, store: He, event: kt, effect: je, domain: at, scope: Bt, attached: (e) => je(e) && B(e, "attached") == 1 };
let ge = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, H = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Ve = () => {
  let e = 0;
  return () => "" + ++e;
};
let At = Ve(), ot = Ve(), Lt = Ve(), z = null, it = () => z, Rt = (e) => (e && z && z.sidRoot && (e = `${z.sidRoot}|${e}`), e), st = (e, t) => {
  let r = x(e);
  L(t, (n) => {
    let o = x(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), H(ce(o), r), H(fe(r), o);
  });
}, oe = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(x), G = (e) => typeof e == "object" && e !== null, T = (e) => typeof e == "function", I = (e) => e === void 0, Dt = (e) => W(G(e) || T(e), "expect first argument be an object");
const Fe = (e, t, r, n) => W(!(!G(e) && !T(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Mt = (e, t, r) => {
  Array.isArray(e) ? L(e, (n, o) => Fe(n, t, `${o} item of ${r}`, "")) : Fe(e, t, r, " or array of units");
}, Ge = (e, { fn: t }, { a: r }) => t(e, r), xt = (e, { fn: t }, { a: r }) => t(r, e), Pe = (e, { fn: t }) => t(e);
const lt = (e, t, r, n) => {
  let o = { id: ot(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++Ht)), o;
};
let Ht = 0, de = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: o, priority: l }) => lt("mov", { from: e, store: t, to: n, target: r }, l, o), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: l = 0 }) => lt("compute", { fn: e, safe: n, filter: o, pure: l }, r, t), Te = ({ fn: e }) => ee({ fn: e, priority: "effect" }), Be = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Vt = (e, t, r) => de({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), N = (e = Pe, t) => ee({ fn: e, pure: 1, filter: t }), Pt = { mov: de, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: Te }, Tt = (e) => ({ id: ot(), current: e }), ut = ({ current: e }) => e, It = (e, t) => {
  e.before || (e.before = []), H(e.before, t);
}, $ = null;
const Ie = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ae(e.v.type) > Ae(t.v.type)) && (r = e, e = t, t = r), r = Ie(e.r, t), e.r = e.l, e.l = r, e;
}, Ne = [];
let Ke = 0;
for (; Ke < 6; )
  H(Ne, { first: null, last: null, size: 0 }), Ke += 1;
const Nt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Ne[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = $.v;
        return $ = Ie($.l, $.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, V = (e, t, r, n, o, l, a) => Ce(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: l, meta: a }, e), Ce = (e, t, r, n = 0) => {
  let o = Ae(r), l = Ne[o], a = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? $ = Ie($, a) : (l.size === 0 ? l.first = a : l.last.r = a, l.last = a), l.size += 1;
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
let O, ie = 1, we = 0, se = 0, R = null, Ue = (e) => {
  R = e;
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
let $t = (e, t, r, n, o) => {
  let l = ct(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, o), t.reg[n.id]) : n;
};
const zt = (e) => e;
let F = (e, t, r, n, o) => {
  var l;
  let a = e.reg, h = t.sid, y = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize;
  if (a[t.id])
    return;
  let d = { id: t.id, current: t.current, meta: t.meta };
  if (h && h in e.sidValuesMap && !(h in e.sidIdMap))
    d.current = (e.fromSerialize && y !== "ignore" && (y == null ? void 0 : y.read) || zt)(e.sidValuesMap[h]);
  else if (t.before && !o) {
    let S = 0, u = r || !t.noInit || n;
    L(t.before, (f) => {
      switch (f.type) {
        case Q: {
          let c = f.from;
          if (c || f.fn) {
            c && F(e, c, r, n);
            let i = c && a[c.id].current;
            u && (d.current = f.fn ? f.fn(i) : i);
          }
          break;
        }
        case "field":
          S || (S = 1, d.current = Array.isArray(d.current) ? [...d.current] : { ...d.current }), F(e, f.from, r, n), u && (d.current[f.field] = a[a[f.from.id].id].current);
      }
    });
  }
  h && (e.sidIdMap[h] = t.id), a[t.id] = d;
};
const Wt = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (G(e) && (te(e.or, t), _t(e, (r, n) => {
  I(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const qe = (e, t) => {
  ge(e.next, t), ge(ce(e), t), ge(fe(e), t);
}, Le = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = fe(e);
  for (; n = o.pop(); )
    qe(n, e), (t || r && B(e, "op") !== "sample" || n.family.type === "crosslink") && Le(n, t, B(n, "op") !== "on" && r);
  for (o = ce(e); n = o.pop(); )
    qe(n, e), r && n.family.type === "crosslink" && Le(n, t, B(n, "op") !== "on" && r);
}, q = (e) => e.clear();
let Re = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), He(e))
    q(ue(e));
  else if (at(e)) {
    r = 1;
    let n = e.history;
    q(n.events), q(n.effects), q(n.stores), q(n.domains);
  }
  Le(x(e), !!t, r);
}, ft = (e) => {
  let t = () => Re(e);
  return t.unsubscribe = t, t;
}, $e = (e, t, r, n, o) => P({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), dt = (e, t) => (W(T(t), ".watch argument should be a function"), ft(P({ scope: { fn: t }, node: [Te({ fn: Pe })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), jt = (e, t, r = "event") => {
  j(e) && j(e).hooks[r](t);
}, pt = (e, t, r) => {
  let n = te(r), o = e === "domain", l = At(), { sid: a = null, named: h = null, domain: y = null, parent: d = y } = n, S = h || n.name || (o ? "" : l), u = Et(S, d), f = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Rt(a), named: h, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = d, t.compositeName = u, t.defaultConfig = n, t.thru = (c) => (Z(0, "thru", "js pipe"), c(t)), t.getType = () => u.fullName, !o && (t.subscribe = (c) => (Dt(c), t.watch(T(c) ? c : (i) => c.next && c.next(i))), t[Ot] = () => t), f;
};
const _e = (e, t, r, n) => {
  let o;
  G(r) && (o = r, r = r.fn);
  let l = C({ name: `${e.shortName} → *`, derived: 1, and: o });
  return $e(e, l, n, t, r), l;
}, vt = (e, t, r, n, o) => {
  let l = le(t), a = de({ store: l, to: "a", priority: "read" });
  r === Q && (a.data.softRead = 1);
  let h = [a, N(n)];
  return Y("storeOnMap", l, h, He(e) && le(e)), $e(e, t, h, r, o);
};
P({ node: [Te({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Ft = C(), Gt = C(), ht = C(), mt = C(), St = C(), gt = C(), Kt = C(), De = C(), Me = C(), pr = (e) => {
  e && Me({ ...e, isBackHandled: !1 }), (!e || !e.hasOwnProperty("isBackFromBrowser")) && Me({ isBackFromBrowser: !1 }), window.history.back();
}, vr = (e) => {
  D.historyPush({ view: e.view, panel: e.panel });
}, hr = (e) => {
  D.historyPush({ panel: e });
}, mr = (e) => {
  D.historyPush({ modal: e });
}, Sr = (e) => {
  D.historyPush({ popout: e });
}, Ut = nt({
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
}).on(De, (e) => ({
  ...e,
  isDispatchChangeStateEventBeforeMiddleware: !1,
  isDispatchChangeStateEventAfterMiddleware: !0,
  beforeBackHandledCallback: null,
  afterBackHandledCallback: null,
  isBackFromBrowser: !0,
  isBackHandled: !0
})).on(Me, (e, t) => ({
  ...e,
  isBackHandled: t.hasOwnProperty("isBackHandled") ? t.isBackHandled : e.isBackHandled,
  isBackFromBrowser: t.hasOwnProperty("isBackFromBrowser") ? t.isBackFromBrowser : e.isBackFromBrowser,
  isDispatchChangeStateEventBeforeMiddleware: t.hasOwnProperty("isDispatchChangeStateEventBeforeMiddleware") ? t.isDispatchChangeStateEventBeforeMiddleware : e.isDispatchChangeStateEventBeforeMiddleware,
  isDispatchChangeStateEventAfterMiddleware: t.hasOwnProperty("isDispatchChangeStateEventAfterMiddleware") ? t.isDispatchChangeStateEventAfterMiddleware : e.isDispatchChangeStateEventAfterMiddleware,
  beforeBackHandledCallback: t.hasOwnProperty("beforeBackHandledCallback") ? t.beforeBackHandledCallback : e.beforeBackHandledCallback,
  afterBackHandledCallback: t.hasOwnProperty("afterBackHandledCallback") ? t.afterBackHandledCallback : e.afterBackHandledCallback
})).on(Ft, (e, t) => ({
  ...e,
  activeView: t
})).on(Gt, (e, t) => ({
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
})).on(Kt, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function qt(e) {
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
  var e = M;
  function t(u, f) {
    return u === f && (u !== 0 || 1 / u === 1 / f) || u !== u && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, l = e.useLayoutEffect, a = e.useDebugValue;
  function h(u, f) {
    var c = f(), i = n({ inst: { value: c, getSnapshot: f } }), s = i[0].inst, p = i[1];
    return l(function() {
      s.value = c, s.getSnapshot = f, y(s) && p({ inst: s });
    }, [u, c, f]), o(function() {
      return y(s) && p({ inst: s }), u(function() {
        y(s) && p({ inst: s });
      });
    }, [u]), a(c), c;
  }
  function y(u) {
    var f = u.getSnapshot;
    u = u.value;
    try {
      var c = f();
      return !r(u, c);
    } catch {
      return !0;
    }
  }
  function d(u, f) {
    return f();
  }
  var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? d : h;
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
    var e = M, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(_) {
      {
        for (var v = arguments.length, w = new Array(v > 1 ? v - 1 : 0), m = 1; m < v; m++)
          w[m - 1] = arguments[m];
        n("error", _, w);
      }
    }
    function n(_, v, w) {
      {
        var m = t.ReactDebugCurrentFrame, g = m.getStackAddendum();
        g !== "" && (v += "%s", w = w.concat([g]));
        var E = w.map(function(k) {
          return String(k);
        });
        E.unshift("Warning: " + v), Function.prototype.apply.call(console[_], console, E);
      }
    }
    function o(_, v) {
      return _ === v && (_ !== 0 || 1 / _ === 1 / v) || _ !== _ && v !== v;
    }
    var l = typeof Object.is == "function" ? Object.is : o, a = e.useState, h = e.useEffect, y = e.useLayoutEffect, d = e.useDebugValue, S = !1, u = !1;
    function f(_, v, w) {
      S || e.startTransition !== void 0 && (S = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = v();
      if (!u) {
        var g = v();
        l(m, g) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), u = !0);
      }
      var E = a({
        inst: {
          value: m,
          getSnapshot: v
        }
      }), k = E[0].inst, K = E[1];
      return y(function() {
        k.value = m, k.getSnapshot = v, c(k) && K({
          inst: k
        });
      }, [_, m, v]), h(function() {
        c(k) && K({
          inst: k
        });
        var pe = function() {
          c(k) && K({
            inst: k
          });
        };
        return _(pe);
      }, [_]), d(m), m;
    }
    function c(_) {
      var v = _.getSnapshot, w = _.value;
      try {
        var m = v();
        return !l(w, m);
      } catch {
        return !0;
      }
    }
    function i(_, v, w) {
      return v();
    }
    var s = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", p = !s, b = p ? i : f, A = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    be.useSyncExternalStore = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), be;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Qt() : e.exports = Xt();
})(Jt);
const Zt = /* @__PURE__ */ qt(re);
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
  var e = M, t = re;
  function r(d, S) {
    return d === S && (d !== 0 || 1 / d === 1 / S) || d !== d && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, h = e.useMemo, y = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(d, S, u, f, c) {
    var i = l(null);
    if (i.current === null) {
      var s = { hasValue: !1, value: null };
      i.current = s;
    } else
      s = i.current;
    i = h(function() {
      function b(m) {
        if (!A) {
          if (A = !0, _ = m, m = f(m), c !== void 0 && s.hasValue) {
            var g = s.value;
            if (c(g, m))
              return v = g;
          }
          return v = m;
        }
        if (g = v, n(_, m))
          return g;
        var E = f(m);
        return c !== void 0 && c(g, E) ? g : (_ = m, v = E);
      }
      var A = !1, _, v, w = u === void 0 ? null : u;
      return [function() {
        return b(S());
      }, w === null ? void 0 : function() {
        return b(w());
      }];
    }, [S, u, f, c]);
    var p = o(d, i[0], i[1]);
    return a(function() {
      s.hasValue = !0, s.value = p;
    }, [p]), y(p), p;
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
function tr() {
  return Ze || (Ze = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = re;
    function r(S, u) {
      return S === u && (S !== 0 || 1 / S === 1 / u) || S !== S && u !== u;
    }
    var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, h = e.useMemo, y = e.useDebugValue;
    function d(S, u, f, c, i) {
      var s = l(null), p;
      s.current === null ? (p = {
        hasValue: !1,
        value: null
      }, s.current = p) : p = s.current;
      var b = h(function() {
        var w = !1, m, g, E = function(U) {
          if (!w) {
            w = !0, m = U;
            var ve = c(U);
            if (i !== void 0 && p.hasValue) {
              var he = p.value;
              if (i(he, ve))
                return g = he, he;
            }
            return g = ve, ve;
          }
          var wt = m, me = g;
          if (n(wt, U))
            return me;
          var Se = c(U);
          return i !== void 0 && i(me, Se) ? me : (m = U, g = Se, Se);
        }, k = f === void 0 ? null : f, K = function() {
          return E(u());
        }, pe = k === null ? void 0 : function() {
          return E(k());
        };
        return [K, pe];
      }, [u, f, c, i]), A = b[0], _ = b[1], v = o(S, A, _);
      return a(function() {
        p.hasValue = !0, p.value = v;
      }, [v]), y(v), v;
    }
    ke.useSyncExternalStoreWithSelector = d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = er() : e.exports = tr();
})(Yt);
function rr(e, t, r, n) {
  let o = [Pt.run({ fn: (l) => t(l) })];
  if (n && o.unshift(n), r) {
    let l = P({ node: o }), a = e.graphite.id, h = r.additionalLinks, y = h[a] || [];
    return h[a] = y, y.push(l), () => {
      let d = y.indexOf(l);
      d !== -1 && y.splice(d, 1), Re(l);
    };
  }
  {
    let l = P({ node: o, parent: [e], family: { owners: e } });
    return () => {
      Re(l);
    };
  }
}
function nr(e, t) {
  Ct.store(e) || yt("expect useStore argument to be a store");
  let r = M.useCallback((o) => rr(e, o, t), [e, t]), n = M.useCallback(() => sr(e, t), [e, t]);
  return ir(r, n, n);
}
function ar(e) {
  let t = M.useContext(lr);
  return e && !t && yt("No scope found, consider adding <Provider> to app root"), t;
}
function or(e, t) {
  return nr(e, ar(t == null ? void 0 : t.forceScope));
}
let yt = (e) => {
  throw Error(e);
};
typeof window < "u" ? M.useLayoutEffect : M.useEffect;
const { useSyncExternalStore: ir } = Zt, sr = (e, t) => t ? t.getState(e) : e.getState(), lr = M.createContext(null), ur = (e, t, r) => {
  tt(() => {
    const n = (o) => {
      o instanceof KeyboardEvent && o.key === r ? t(o) : r || t(o);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, et = (e, t, r, n) => {
  tt(() => (D.addEventListener(e, t, r), () => D.removeEventListener(r)), [...n]);
}, gr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: o, activePopout: l, isRouteInit: a, isDispatchChangeStateEventBeforeMiddleware: h, isDispatchChangeStateEventAfterMiddleware: y, isBackHandled: d, isBackFromBrowser: S, afterBackHandledCallback: u, beforeBackHandledCallback: f } = cr();
  et("init", (c) => {
    console.log("[blum]: initialized", c), a || (De(), D.historyPush(e));
  }, 1, [a]), ur("popstate", async () => {
    const c = async (i, s) => {
      h && D.dispatchChangeStateEvent();
      for (const p in t)
        if (!await t[p](i, s, {
          isBackHandled: d,
          isBackFromBrowser: S,
          isDispatchChangeStateEventAfterMiddleware: y,
          isDispatchChangeStateEventBeforeMiddleware: h,
          beforeBackHandledCallback: f,
          afterBackHandledCallback: u
        }))
          return;
      y && D.dispatchChangeStateEvent();
    };
    if (a) {
      const i = window.history.state ?? {
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
      console.log("[blum]: prevRoutes", i), console.log("[blum]: storeRoutes", s), f && f(s, i), await c(s, i), De(), u && u(s, i);
    }
  }), et("changestate", (c) => {
    if (console.log("[blum]: state changed", c), c) {
      const { view: i, panel: s, modal: p, popout: b } = c;
      i && s && ht({ view: i, panel: s }), mt(p), St(b), a || gt();
    }
  }, 2, [a]);
}, cr = () => or(Ut), yr = (e) => e, wr = (e, t) => fr(e, async (r, n, o) => {
  let l;
  if (t && (l = await t(r, n, o)), D.historyPush(r), typeof l == "boolean")
    return l;
}), fr = (e, t) => async (r, n, o) => {
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
  mt as _setActiveModal,
  Gt as _setActivePanel,
  St as _setActivePopout,
  Ft as _setActiveView,
  pr as back,
  D as blumRouter,
  fr as createCatchBackBrowserRouteMiddleware,
  wr as createDisableBackBrowserRouteMiddleware,
  yr as createRouteMiddleware,
  mr as setActiveModal,
  hr as setActivePanel,
  Sr as setActivePopout,
  vr as setActiveViewPanel,
  gr as useInitRouter,
  cr as useRouter
};
