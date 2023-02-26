import P, { useEffect as tt } from "react";
const M = {
  subscribers: [],
  back() {
    window.isBackFromBrowser = !1, window.history.back();
  },
  historyPush(e) {
    const { view: t, panel: r, modal: n, popout: i } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    console.log("try to push history", this.subscribers), this.changeState({
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
}, rt = M.historyPush.bind(M), pr = M.back.bind(M), ue = {
  subscribers: [],
  back() {
    window.isBackFromBrowser = !1, window.history.back();
  },
  historyPush(e) {
    const { view: t, panel: r, modal: n, popout: i } = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    console.log("try to push history", this.subscribers), this.changeState({
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
}, fe = ue.historyPush.bind(ue);
ue.back.bind(ue);
const vr = (e) => {
  fe({ view: e.view, panel: e.panel });
}, hr = (e) => {
  fe({ panel: e });
}, mr = (e) => {
  fe({ modal: e });
}, Sr = (e) => {
  fe({ popout: e });
};
function Et(e, t) {
  for (let r in e)
    t(e[r], r);
}
function A(e, t) {
  e.forEach(t);
}
function j(e, t) {
  if (!e)
    throw Error(t);
}
function B({ node: e = [], from: t, source: r, parent: n = t || r, to: i, target: s, child: o = i || s, scope: p = {}, meta: g = {}, family: c = { type: "regular" }, regional: S } = {}) {
  let l = ie(n), d = ie(c.links), f = ie(c.owners), a = [];
  A(e, (v) => v && T(a, v));
  let u = { id: Vt(), seq: a, next: ie(o), meta: g, scope: p, family: { type: c.type || "crosslink", links: d, owners: f } };
  return A(d, (v) => T(de(v), u)), A(f, (v) => T(pe(v), u)), A(l, (v) => T(v.next, u)), S && W && ut(J(W), [u]), u;
}
function nt(e, t, r) {
  let n, i = V, s = null, o = b;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, i = "page" in e ? e.page : i, e.stack && (s = e.stack), o = oe(e) || o, e = e.target), o && b && o !== b && (b = null), Array.isArray(e))
    for (let a = 0; a < e.length; a++)
      D("pure", i, C(e[a]), s, t[a], o, n);
  else
    D("pure", i, C(e), s, t, o, n);
  if (r && !ae)
    return;
  let p, g, c, S, l, d, f = { isRoot: ae, currentPage: V, scope: b, isWatch: Ee, isPure: se };
  ae = 0;
  e:
    for (; S = zt(); ) {
      let { idx: a, stack: u, type: v } = S;
      c = u.node, V = l = u.page, b = oe(u), l ? d = l.reg : b && (d = b.reg);
      let L = !!l, k = !!b, w = { fail: 0, scope: c.scope };
      p = g = 0;
      for (let h = a; h < c.seq.length && !p; h++) {
        let _ = c.seq[h];
        if (_.order) {
          let { priority: m, barrierID: y } = _.order, E = y ? l ? `${l.fullID}_${y}` : y : 0;
          if (h !== a || v !== m) {
            y ? we.has(E) || (we.add(E), xe(h, u, m, y)) : xe(h, u, m);
            continue e;
          }
          y && we.delete(E);
        }
        switch (_.type) {
          case "mov": {
            let y, E = _.data;
            switch (E.from) {
              case X:
                y = J(u);
                break;
              case "a":
              case "b":
                y = u[E.from];
                break;
              case "value":
                y = E.store;
                break;
              case "store":
                if (d && !d[E.store.id])
                  if (L) {
                    let O = ft(l, E.store.id);
                    u.page = l = O, O ? d = O.reg : k ? (H(b, E.store, 0, 1, E.softRead), d = b.reg) : d = void 0;
                  } else
                    k && H(b, E.store, 0, 1, E.softRead);
                y = ct(d && d[E.store.id] || E.store);
            }
            switch (E.to) {
              case X:
                u.value = y;
                break;
              case "a":
              case "b":
                u[E.to] = y;
                break;
              case "store":
                Wt(l, b, c, E.target).current = y;
            }
            break;
          }
          case "compute":
            let m = _.data;
            if (m.fn) {
              Ee = R(c, "op") === "watch", se = m.pure;
              let y = m.safe ? (0, m.fn)(J(u), w.scope, u) : Gt(w, m.fn, u);
              m.filter ? g = !y : u.value = y, Ee = f.isWatch, se = f.isPure;
            }
        }
        p = w.fail || g;
      }
      if (!p) {
        let h = J(u), _ = oe(u);
        if (A(c.next, (m) => {
          D("child", l, m, u, h, _);
        }), _) {
          R(c, "needFxCounter") && D("child", l, _.fxCount, u, h, _), R(c, "storeChange") && D("child", l, _.storeChange, u, h, _), R(c, "warnSerialize") && D("child", l, _.warnSerializeNode, u, h, _);
          let m = _.additionalLinks[c.id];
          m && A(m, (y) => {
            D("child", l, y, u, h, _);
          });
        }
      }
    }
  ae = f.isRoot, V = f.currentPage, b = oe(f);
}
function bt(e, t) {
  let r, n, i = e;
  if (t) {
    let s = Lt(t);
    e.length === 0 ? (r = s.path, n = s.fullName) : (r = s.path.concat([e]), n = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: i, fullName: n, path: r };
}
function Y(e, ...t) {
  let r = st();
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
        f = G(f);
    qe(f);
    let a = g.create(S, l);
    return qe(d), a;
  })(n, i, o, p) : n.create(o, p)), i = st(), s = Object.assign(n, { graphite: B({ meta: vt("event", n, r), regional: 1 }), create: (o) => (nt({ target: n, params: o, scope: b }), o), watch: (o) => pt(n, o), map: (o) => be(n, Q, o, [N()]), filter: (o) => be(n, "filter", o.fn ? o : o.fn, [N(Be, 1)]), filterMap: (o) => be(n, "filterMap", o, [N(), Ae((p) => !$(p), 1)]), prepend(o) {
    let p = x("* → " + n.shortName, { parent: G(n) });
    return Y("eventPrepend", C(p)), ze(p, n, [N()], "prepend", o), Ht(n, p), p;
  } });
  return r != null && r.domain && r.domain.hooks.event(s), s;
}
function We(e, t, r, n) {
  return Tt(r, t, "first argument"), j(I(n), "second argument should be a function"), Z(!R(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), A(Array.isArray(r) ? r : [r], (i) => {
    e.off(i), ce(e).set(i, dt(ht(i, e, "on", Dt, n)));
  }), e;
}
function ot(e, t) {
  let r = te(t), n = $t(e), i = x({ named: "updates", derived: 1 });
  Y("storeBase", n);
  let s = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: i, defaultState: e, stateRef: n, getState() {
    let a, u = n;
    if (V) {
      let v = V;
      for (; v && !v.reg[s]; )
        v = G(v);
      v && (a = v);
    }
    return !a && b && (H(b, n, 1), a = b), a && (u = a.reg[s]), ct(u);
  }, setState: (a) => nt({ target: o, params: a, defer: 1, scope: b }), reset: (...a) => (A(a, (u) => We(o, ".reset", u, () => o.defaultState)), o), on: (a, u) => We(o, ".on", a, u), off(a) {
    let u = ce(o).get(a);
    return u && (u(), ce(o).delete(a)), o;
  }, map(a, u) {
    let v, L;
    K(a) && (v = a, a = a.fn), Z($(u), "second argument of store.map", "updateFilter");
    let k = o.getState();
    $(k) || (L = a(k, u));
    let w = ot(L, { name: `${o.shortName} → *`, derived: 1, and: v }), h = ht(o, w, Q, Ke, a);
    return Nt(le(w), { type: Q, fn: a, from: n }), le(w).noInit = 1, Y("storeMap", n, h), w;
  }, watch(a, u) {
    if (!u || !Te(a)) {
      let v = pt(o, a);
      return Y("storeWatch", n, a) || a(o.getState()), v;
    }
    return j(I(u), "second argument should be a function"), a.watch((v) => u(o.getState(), v));
  } }, p = vt("store", o, r), g = o.defaultConfig.updateFilter;
  o.graphite = B({ scope: { state: n, fn: g }, node: [Ae((a, u, v) => (v.scope && !v.scope.reg[n.id] && (v.b = 1), a)), Bt(n), Ae((a, u, { a: v, b: L }) => !$(a) && (a !== v || L), 1), g && N(Ke, 1), ve({ from: X, target: n })], child: i, meta: p, regional: 1 });
  let c = R(o, "serialize"), S = R(o, "derived"), l = c === "ignore", d = !c || l ? 0 : c, f = R(o, "sid");
  return f && (l || je(o, "storeChange", 1), n.sid = f, d && (n.meta = { ...n == null ? void 0 : n.meta, serialize: d })), f || l || S || je(o, "warnSerialize", 1), j(S || !$(e), "current state can't be undefined, use null instead"), ut(o, [i]), r != null && r.domain && r.domain.hooks.store(o), S || (o.reinit = x(), o.reset(o.reinit)), o;
}
let Ot = typeof Symbol < "u" && Symbol.observable || "@@observable", Q = "map", X = "stack", C = (e) => e.graphite || e, de = (e) => e.family.owners, pe = (e) => e.family.links, le = (e) => e.stateRef, J = (e) => e.value, ce = (e) => e.subscribers, G = (e) => e.parent, oe = (e) => e.scope, R = (e, t) => C(e).meta[t], je = (e, t, r) => C(e).meta[t] = r, Lt = (e) => e.compositeName, Te = (e) => (I(e) || K(e)) && "kind" in e;
const ne = (e) => (t) => Te(t) && t.kind === e;
let De = ne("store"), Rt = ne("event"), Ge = ne("effect"), it = ne("domain"), kt = ne("scope");
var At = { __proto__: null, unit: Te, store: De, event: Rt, effect: Ge, domain: it, scope: kt, attached: (e) => Ge(e) && R(e, "attached") == 1 };
let _e = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, T = (e, t) => e.push(t), Z = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Me = () => {
  let e = 0;
  return () => "" + ++e;
};
let xt = Me(), at = Me(), Vt = Me(), W = null, st = () => W, Pt = (e) => (e && W && W.sidRoot && (e = `${W.sidRoot}|${e}`), e), ut = (e, t) => {
  let r = C(e);
  A(t, (n) => {
    let i = C(n);
    r.family.type !== "domain" && (i.family.type = "crosslink"), T(de(i), r), T(pe(r), i);
  });
}, ie = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(C), K = (e) => typeof e == "object" && e !== null, I = (e) => typeof e == "function", $ = (e) => e === void 0, Ct = (e) => j(K(e) || I(e), "expect first argument be an object");
const He = (e, t, r, n) => j(!(!K(e) && !I(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Tt = (e, t, r) => {
  Array.isArray(e) ? A(e, (n, i) => He(n, t, `${i} item of ${r}`, "")) : He(e, t, r, " or array of units");
}, Ke = (e, { fn: t }, { a: r }) => t(e, r), Dt = (e, { fn: t }, { a: r }) => t(r, e), Be = (e, { fn: t }) => t(e);
const lt = (e, t, r, n) => {
  let i = { id: at(), type: e, data: t };
  return r && (i.order = { priority: r }, n && (i.order.barrierID = ++Mt)), i;
};
let Mt = 0, ve = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : X, batch: i, priority: s }) => lt("mov", { from: e, store: t, to: n, target: r }, s, i), ee = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: i = 0, pure: s = 0 }) => lt("compute", { fn: e, safe: n, filter: i, pure: s }, r, t), Ie = ({ fn: e }) => ee({ fn: e, priority: "effect" }), Ae = (e, t, r) => ee({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Bt = (e, t, r) => ve({ store: e, to: t ? X : "a", priority: r && "sampler", batch: 1 }), N = (e = Be, t) => ee({ fn: e, pure: 1, filter: t }), It = { mov: ve, compute: ee, filter: ({ fn: e, pure: t }) => ee({ fn: e, filter: 1, pure: t }), run: Ie }, $t = (e) => ({ id: at(), current: e }), ct = ({ current: e }) => e, Nt = (e, t) => {
  e.before || (e.before = []), T(e.before, t);
}, z = null;
const $e = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ve(e.v.type) > Ve(t.v.type)) && (r = e, e = t, t = r), r = $e(e.r, t), e.r = e.l, e.l = r, e;
}, Ne = [];
let Ue = 0;
for (; Ue < 6; )
  T(Ne, { first: null, last: null, size: 0 }), Ue += 1;
const zt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Ne[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = z.v;
        return z = $e(z.l, z.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, D = (e, t, r, n, i, s, o) => xe(0, { a: null, b: null, node: r, parent: n, value: i, page: t, scope: s, meta: o }, e), xe = (e, t, r, n = 0) => {
  let i = Ve(r), s = Ne[i], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  i === 3 || i === 4 ? z = $e(z, o) : (s.size === 0 ? s.first = o : s.last.r = o, s.last = o), s.size += 1;
}, Ve = (e) => {
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
}, we = /* @__PURE__ */ new Set();
let b, ae = 1, Ee = 0, se = 0, V = null, qe = (e) => {
  V = e;
};
const ft = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = G(e);
    if (e)
      return e;
  }
  return null;
};
let Wt = (e, t, r, n, i) => {
  let s = ft(e, n.id);
  return s ? s.reg[n.id] : t ? (H(t, n, i), t.reg[n.id]) : n;
};
const jt = (e) => e;
let H = (e, t, r, n, i) => {
  var s;
  let o = e.reg, p = t.sid, g = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (o[t.id])
    return;
  let c = { id: t.id, current: t.current, meta: t.meta };
  if (p && p in e.sidValuesMap && !(p in e.sidIdMap))
    c.current = (e.fromSerialize && g !== "ignore" && (g == null ? void 0 : g.read) || jt)(e.sidValuesMap[p]);
  else if (t.before && !i) {
    let S = 0, l = r || !t.noInit || n;
    A(t.before, (d) => {
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
const Gt = (e, t, r) => {
  try {
    return t(J(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let te = (e, t = {}) => (K(e) && (te(e.or, t), Et(e, (r, n) => {
  $(r) || n === "or" || n === "and" || (t[n] = r);
}), te(e.and, t)), t);
const Fe = (e, t) => {
  _e(e.next, t), _e(de(e), t), _e(pe(e), t);
}, Pe = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let i = pe(e);
  for (; n = i.pop(); )
    Fe(n, e), (t || r && R(e, "op") !== "sample" || n.family.type === "crosslink") && Pe(n, t, R(n, "op") !== "on" && r);
  for (i = de(e); n = i.pop(); )
    Fe(n, e), r && n.family.type === "crosslink" && Pe(n, t, R(n, "op") !== "on" && r);
}, F = (e) => e.clear();
let Ce = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), De(e))
    F(ce(e));
  else if (it(e)) {
    r = 1;
    let n = e.history;
    F(n.events), F(n.effects), F(n.stores), F(n.domains);
  }
  Pe(C(e), !!t, r);
}, dt = (e) => {
  let t = () => Ce(e);
  return t.unsubscribe = t, t;
}, ze = (e, t, r, n, i) => B({ node: r, parent: e, child: t, scope: { fn: i }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), pt = (e, t) => (j(I(t), ".watch argument should be a function"), dt(B({ scope: { fn: t }, node: [Ie({ fn: Be })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Ht = (e, t, r = "event") => {
  G(e) && G(e).hooks[r](t);
}, vt = (e, t, r) => {
  let n = te(r), i = e === "domain", s = xt(), { sid: o = null, named: p = null, domain: g = null, parent: c = g } = n, S = p || n.name || (i ? "" : s), l = bt(S, c), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Pt(o), named: p, unitId: t.id = s, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = c, t.compositeName = l, t.defaultConfig = n, t.thru = (f) => (Z(0, "thru", "js pipe"), f(t)), t.getType = () => l.fullName, !i && (t.subscribe = (f) => (Ct(f), t.watch(I(f) ? f : (a) => f.next && f.next(a))), t[Ot] = () => t), d;
};
const be = (e, t, r, n) => {
  let i;
  K(r) && (i = r, r = r.fn);
  let s = x({ name: `${e.shortName} → *`, derived: 1, and: i });
  return ze(e, s, n, t, r), s;
}, ht = (e, t, r, n, i) => {
  let s = le(t), o = ve({ store: s, to: "a", priority: "read" });
  r === Q && (o.data.softRead = 1);
  let p = [o, N(n)];
  return Y("storeOnMap", s, p, De(e) && le(e)), ze(e, t, p, r, i);
};
B({ node: [Ie({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } });
const Kt = x(), Ut = x(), mt = x(), St = x(), gt = x(), yt = x(), qt = x(), Ft = ot({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Kt, (e, t) => ({
  ...e,
  activeView: t
})).on(Ut, (e, t) => ({
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
})).on(qt, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function Yt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = {}, Jt = {
  get exports() {
    return Ye;
  },
  set exports(e) {
    Ye = e;
  }
}, Oe = {}, re = {}, Qt = {
  get exports() {
    return re;
  },
  set exports(e) {
    re = e;
  }
}, Le = {};
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
function Xt() {
  if (Je)
    return Le;
  Je = 1;
  var e = P;
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
  return Le.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S, Le;
}
var Re = {};
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
function Zt() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = P, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
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
        var E = _.map(function(O) {
          return String(O);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function i(w, h) {
      return w === h && (w !== 0 || 1 / w === 1 / h) || w !== w && h !== h;
    }
    var s = typeof Object.is == "function" ? Object.is : i, o = e.useState, p = e.useEffect, g = e.useLayoutEffect, c = e.useDebugValue, S = !1, l = !1;
    function d(w, h, _) {
      S || e.startTransition !== void 0 && (S = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var m = h();
      if (!l) {
        var y = h();
        s(m, y) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), l = !0);
      }
      var E = o({
        inst: {
          value: m,
          getSnapshot: h
        }
      }), O = E[0].inst, U = E[1];
      return g(function() {
        O.value = m, O.getSnapshot = h, f(O) && U({
          inst: O
        });
      }, [w, m, h]), p(function() {
        f(O) && U({
          inst: O
        });
        var he = function() {
          f(O) && U({
            inst: O
          });
        };
        return w(he);
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
    function a(w, h, _) {
      return h();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", v = !u, L = v ? a : d, k = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : L;
    Re.useSyncExternalStore = k, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Re;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Xt() : e.exports = Zt();
})(Qt);
const er = /* @__PURE__ */ Yt(re);
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
function tr() {
  if (Xe)
    return Oe;
  Xe = 1;
  var e = P, t = re;
  function r(c, S) {
    return c === S && (c !== 0 || 1 / c === 1 / S) || c !== c && S !== S;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, p = e.useMemo, g = e.useDebugValue;
  return Oe.useSyncExternalStoreWithSelector = function(c, S, l, d, f) {
    var a = s(null);
    if (a.current === null) {
      var u = { hasValue: !1, value: null };
      a.current = u;
    } else
      u = a.current;
    a = p(function() {
      function L(m) {
        if (!k) {
          if (k = !0, w = m, m = d(m), f !== void 0 && u.hasValue) {
            var y = u.value;
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
      var k = !1, w, h, _ = l === void 0 ? null : l;
      return [function() {
        return L(S());
      }, _ === null ? void 0 : function() {
        return L(_());
      }];
    }, [S, l, d, f]);
    var v = i(c, a[0], a[1]);
    return o(function() {
      u.hasValue = !0, u.value = v;
    }, [v]), g(v), v;
  }, Oe;
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
function rr() {
  return Ze || (Ze = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = P, t = re;
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
        var _ = !1, m, y, E = function(q) {
          if (!_) {
            _ = !0, m = q;
            var me = f(q);
            if (a !== void 0 && v.hasValue) {
              var Se = v.value;
              if (a(Se, me))
                return y = Se, Se;
            }
            return y = me, me;
          }
          var wt = m, ge = y;
          if (n(wt, q))
            return ge;
          var ye = f(q);
          return a !== void 0 && a(ge, ye) ? ge : (m = q, y = ye, ye);
        }, O = d === void 0 ? null : d, U = function() {
          return E(l());
        }, he = O === null ? void 0 : function() {
          return E(O());
        };
        return [U, he];
      }, [l, d, f, a]), k = L[0], w = L[1], h = i(S, k, w);
      return o(function() {
        v.hasValue = !0, v.value = h;
      }, [h]), g(h), h;
    }
    ke.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = tr() : e.exports = rr();
})(Jt);
function nr(e, t, r, n) {
  let i = [It.run({ fn: (s) => t(s) })];
  if (n && i.unshift(n), r) {
    let s = B({ node: i }), o = e.graphite.id, p = r.additionalLinks, g = p[o] || [];
    return p[o] = g, g.push(s), () => {
      let c = g.indexOf(s);
      c !== -1 && g.splice(c, 1), Ce(s);
    };
  }
  {
    let s = B({ node: i, parent: [e], family: { owners: e } });
    return () => {
      Ce(s);
    };
  }
}
function or(e, t) {
  At.store(e) || _t("expect useStore argument to be a store");
  let r = P.useCallback((i) => nr(e, i, t), [e, t]), n = P.useCallback(() => ur(e, t), [e, t]);
  return sr(r, n, n);
}
function ir(e) {
  let t = P.useContext(lr);
  return e && !t && _t("No scope found, consider adding <Provider> to app root"), t;
}
function ar(e, t) {
  return or(e, ir(t == null ? void 0 : t.forceScope));
}
let _t = (e) => {
  throw Error(e);
};
typeof window < "u" ? P.useLayoutEffect : P.useEffect;
const { useSyncExternalStore: sr } = er, ur = (e, t) => t ? t.getState(e) : e.getState(), lr = P.createContext(null), cr = (e, t, r) => {
  tt(() => {
    const n = (i) => {
      i instanceof KeyboardEvent && i.key === r ? t(i) : r || t(i);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, et = (e, t, r) => {
  tt(() => (M.addEventListener(e, t, r), () => M.removeEventListener(r)), [e, r, t]);
}, gr = (e, ...t) => {
  et("init", (p) => {
    console.log("[blum]: initialized", p), o || rt(e);
  }, 1);
  const { activeView: r, activePanel: n, activeModal: i, activePopout: s, isRouteInit: o } = fr();
  cr("popstate", async () => {
    o && (await (async () => {
      M.fireChangeStateEvent();
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
      g && c && mt({ view: g, panel: c }), St(S), gt(l), o || yt();
    }
  }, 2);
}, fr = () => ar(Ft), yr = (e) => e, _r = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((s) => r[s] === e && r[s] !== n[s]) && window.isBackFromBrowser ? (t && t(r, n), rt(r), !1) : !0;
export {
  St as _setActiveModal,
  Ut as _setActivePanel,
  gt as _setActivePopout,
  Kt as _setActiveView,
  pr as back,
  M as blumRouter,
  _r as createDisableBackBrowserRouteMiddleware,
  yr as createRouteMiddleware,
  rt as historyPush,
  mr as setActiveModal,
  hr as setActivePanel,
  Sr as setActivePopout,
  vr as setActiveViewPanel,
  gr as useInitRouter,
  fr as useRouter
};
