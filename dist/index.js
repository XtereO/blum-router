import M, { useEffect as it } from "react";
const Ce = {
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
};
function Ot(e, t) {
  for (let r in e)
    t(e[r], r);
}
function k(e, t) {
  e.forEach(t);
}
function $(e, t) {
  if (!e)
    throw Error(t);
}
function B({ node: e = [], from: t, source: r, parent: n = t || r, to: a, target: l, child: o = a || l, scope: v = {}, meta: _ = {}, family: f = { type: "regular" }, regional: m } = {}) {
  let c = le(n), p = le(f.links), i = le(f.owners), s = [];
  k(e, (d) => d && C(s, d));
  let u = { id: Dt(), seq: s, next: le(o), meta: _, scope: v, family: { type: f.type || "crosslink", links: p, owners: i } };
  return k(p, (d) => C(me(d), u)), k(i, (d) => C(ge(d), u)), k(c, (d) => C(d.next, u)), m && G && Pe(ee(G), [u]), u;
}
function re(e, t, r) {
  let n, a = D, l = null, o = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, a = "page" in e ? e.page : a, e.stack && (l = e.stack), o = I(e) || o, e = e.target), o && O && o !== O && (O = null), Array.isArray(e))
    for (let s = 0; s < e.length; s++)
      N("pure", a, T(e[s]), l, t[s], o, n);
  else
    N("pure", a, T(e), l, t, o, n);
  if (r && !ce)
    return;
  let v, _, f, m, c, p, i = { isRoot: ce, currentPage: D, scope: O, isWatch: de, isPure: pe };
  ce = 0;
  e:
    for (; m = Wt(); ) {
      let { idx: s, stack: u, type: d } = m;
      f = u.node, D = c = u.page, O = I(u), c ? p = c.reg : O && (p = O.reg);
      let b = !!c, L = !!O, w = { fail: 0, scope: f.scope };
      v = _ = 0;
      for (let h = s; h < f.seq.length && !v; h++) {
        let y = f.seq[h];
        if (y.order) {
          let { priority: g, barrierID: S } = y.order, E = S ? c ? `${c.fullID}_${S}` : S : 0;
          if (h !== s || d !== g) {
            S ? Le.has(E) || (Le.add(E), De(h, u, g, S)) : De(h, u, g);
            continue e;
          }
          S && Le.delete(E);
        }
        switch (y.type) {
          case "mov": {
            let S, E = y.data;
            switch (E.from) {
              case oe:
                S = ee(u);
                break;
              case "a":
              case "b":
                S = u[E.from];
                break;
              case "value":
                S = E.store;
                break;
              case "store":
                if (p && !p[E.store.id])
                  if (b) {
                    let R = dt(c, E.store.id);
                    u.page = c = R, R ? p = R.reg : L ? (F(O, E.store, 0, 1, E.softRead), p = O.reg) : p = void 0;
                  } else
                    L && F(O, E.store, 0, 1, E.softRead);
                S = ft(p && p[E.store.id] || E.store);
            }
            switch (E.to) {
              case oe:
                u.value = S;
                break;
              case "a":
              case "b":
                u[E.to] = S;
                break;
              case "store":
                Ht(c, O, f, E.target).current = S;
            }
            break;
          }
          case "compute":
            let g = y.data;
            if (g.fn) {
              de = A(f, "op") === "watch", pe = g.pure;
              let S = g.safe ? (0, g.fn)(ee(u), w.scope, u) : Kt(w, g.fn, u);
              g.filter ? _ = !S : u.value = S, de = i.isWatch, pe = i.isPure;
            }
        }
        v = w.fail || _;
      }
      if (!v) {
        let h = ee(u), y = I(u);
        if (k(f.next, (g) => {
          N("child", c, g, u, h, y);
        }), y) {
          A(f, "needFxCounter") && N("child", c, y.fxCount, u, h, y), A(f, "storeChange") && N("child", c, y.storeChange, u, h, y), A(f, "warnSerialize") && N("child", c, y.warnSerializeNode, u, h, y);
          let g = y.additionalLinks[f.id];
          g && k(g, (S) => {
            N("child", c, S, u, h, y);
          });
        }
      }
    }
  ce = i.isRoot, D = i.currentPage, O = I(i);
}
function bt(e, t) {
  let r, n, a = e;
  if (t) {
    let l = At(t);
    e.length === 0 ? (r = l.path, n = l.fullName) : (r = l.path.concat([e]), n = l.fullName.length === 0 ? e : l.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: a, fullName: n, path: r };
}
function Z(e, ...t) {
  let r = lt();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function x(e, t) {
  let r = K({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (o, ...v) => (ae(!A(n, "derived"), "call of derived event", "createEvent"), ae(!pe, "unit call from pure function", "operators like sample"), D ? ((_, f, m, c) => {
    let p = D, i = null;
    if (f)
      for (i = D; i && i.template !== f; )
        i = P(i);
    Je(i);
    let s = _.create(m, c);
    return Je(p), s;
  })(n, a, o, v) : n.create(o, v)), a = lt(), l = Object.assign(n, { graphite: B({ meta: ht("event", n, r), regional: 1 }), create: (o) => (re({ target: n, params: o, scope: O }), o), watch: (o) => vt(n, o), map: (o) => Re(n, ne, o, [q()]), filter: (o) => Re(n, "filter", o.fn ? o : o.fn, [q(ze, 1)]), filterMap: (o) => Re(n, "filterMap", o, [q(), H((v) => !j(v), 1)]), prepend(o) {
    let v = x("* → " + n.shortName, { parent: P(n) });
    return Z("eventPrepend", T(v)), Ge(v, n, [q()], "prepend", o), Ut(n, v), v;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), l;
}
function He(e, t, r, n) {
  return $t(r, t, "first argument"), $(V(n), "second argument should be a function"), ae(!A(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(r) ? r : [r], (a) => {
    e.off(a), he(e).set(a, pt(mt(a, e, "on", Bt, n)));
  }), e;
}
function $e(e, t) {
  let r = K(t), n = jt(e), a = x({ named: "updates", derived: 1 });
  Z("storeBase", n);
  let l = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: a, defaultState: e, stateRef: n, getState() {
    let s, u = n;
    if (D) {
      let d = D;
      for (; d && !d.reg[l]; )
        d = P(d);
      d && (s = d);
    }
    return !s && O && (F(O, n, 1), s = O), s && (u = s.reg[l]), ft(u);
  }, setState: (s) => re({ target: o, params: s, defer: 1, scope: O }), reset: (...s) => (k(s, (u) => He(o, ".reset", u, () => o.defaultState)), o), on: (s, u) => He(o, ".on", s, u), off(s) {
    let u = he(o).get(s);
    return u && (u(), he(o).delete(s)), o;
  }, map(s, u) {
    let d, b;
    z(s) && (d = s, s = s.fn), ae(j(u), "second argument of store.map", "updateFilter");
    let L = o.getState();
    j(L) || (b = s(L, u));
    let w = $e(b, { name: `${o.shortName} → *`, derived: 1, and: d }), h = mt(o, w, ne, Ue, s);
    return qt(ve(w), { type: ne, fn: s, from: n }), ve(w).noInit = 1, Z("storeMap", n, h), w;
  }, watch(s, u) {
    if (!u || !Be(s)) {
      let d = vt(o, s);
      return Z("storeWatch", n, s) || s(o.getState()), d;
    }
    return $(V(u), "second argument should be a function"), s.watch((d) => u(o.getState(), d));
  } }, v = ht("store", o, r), _ = o.defaultConfig.updateFilter;
  o.graphite = B({ scope: { state: n, fn: _ }, node: [H((s, u, d) => (d.scope && !d.scope.reg[n.id] && (d.b = 1), s)), Pt(n), H((s, u, { a: d, b }) => !j(s) && (s !== d || b), 1), _ && q(Ue, 1), _e({ from: oe, target: n })], child: a, meta: v, regional: 1 });
  let f = A(o, "serialize"), m = A(o, "derived"), c = f === "ignore", p = !f || c ? 0 : f, i = A(o, "sid");
  return i && (c || te(o, "storeChange", 1), n.sid = i, p && (n.meta = { ...n == null ? void 0 : n.meta, serialize: p })), i || c || m || te(o, "warnSerialize", 1), $(m || !j(e), "current state can't be undefined, use null instead"), Pe(o, [a]), r != null && r.domain && r.domain.hooks.store(o), m || (o.reinit = x(), o.reset(o.reinit)), o;
}
function Lt() {
  let e = {};
  return e.req = new Promise((t, r) => {
    e.rs = t, e.rj = r;
  }), e.req.catch(() => {
  }), e;
}
function U(e, t) {
  let r = K(V(e) ? { handler: e } : e, t), n = x(V(e) ? { handler: e } : e, t), a = T(n);
  te(a, "op", n.kind = "effect"), n.use = (i) => ($(V(i), ".use argument should be a function"), m.scope.handler = i, n), n.use.getCurrent = () => m.scope.handler;
  let l = n.finally = x({ named: "finally", derived: 1 }), o = n.done = l.filterMap({ named: "done", fn({ status: i, params: s, result: u }) {
    if (i === "done")
      return { params: s, result: u };
  } }), v = n.fail = l.filterMap({ named: "fail", fn({ status: i, params: s, error: u }) {
    if (i === "fail")
      return { params: s, error: u };
  } }), _ = n.doneData = o.map({ named: "doneData", fn: ({ result: i }) => i }), f = n.failData = v.map({ named: "failData", fn: ({ error: i }) => i }), m = B({ scope: { handlerId: A(a, "sid"), handler: n.defaultConfig.handler || (() => $(0, `no handler used in ${n.getType()}`)) }, node: [H((i, s, u) => {
    let d = s, b = d.handler;
    if (I(u)) {
      let L = I(u).handlers[d.handlerId];
      L && (b = L);
    }
    return i.handler = b, i;
  }, 0, 1), H(({ params: i, req: s, handler: u, args: d = [i] }, b, L) => {
    let w = Jt(L), h = Xe(i, s, 1, l, L, w), y = Xe(i, s, 0, l, L, w), [g, S] = Yt(u, y, d);
    g && (z(S) && V(S.then) ? S.then(h, y) : h(S));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  a.scope.runner = m, C(a.seq, H((i, { runner: s }, u) => {
    let d = P(u) ? { params: i, req: { rs(b) {
    }, rj(b) {
    } } } : i;
    return u.meta || (u.meta = { fxID: Mt() }), re({ target: s, params: d, defer: 1, scope: I(u), meta: u.meta }), d.params;
  }, 0, 1)), n.create = (i) => {
    let s = Lt(), u = { params: i, req: s };
    if (O && !de) {
      let d = O;
      s.req.finally(() => {
        Gt(d);
      }).catch(() => {
      });
    }
    return re({ target: n, params: u, scope: O }), s.req;
  };
  let c = n.inFlight = $e(0, { serialize: "ignore" }).on(n, (i) => i + 1).on(l, (i) => i - 1).map({ fn: (i) => i, named: "inFlight" });
  te(l, "needFxCounter", "dec"), te(n, "needFxCounter", 1);
  let p = n.pending = c.map({ fn: (i) => i > 0, named: "pending" });
  return Pe(n, [l, o, v, _, f, p, c]), r != null && r.domain && r.domain.hooks.effect(n), n;
}
let Rt = typeof Symbol < "u" && Symbol.observable || "@@observable", ne = "map", oe = "stack", T = (e) => e.graphite || e, me = (e) => e.family.owners, ge = (e) => e.family.links, ve = (e) => e.stateRef, ee = (e) => e.value, he = (e) => e.subscribers, P = (e) => e.parent, I = (e) => e.scope, A = (e, t) => T(e).meta[t], te = (e, t, r) => T(e).meta[t] = r, At = (e) => e.compositeName, Be = (e) => (V(e) || z(e)) && "kind" in e;
const ue = (e) => (t) => Be(t) && t.kind === e;
let Ne = ue("store"), xt = ue("event"), Fe = ue("effect"), st = ue("domain"), kt = ue("scope");
var Vt = { __proto__: null, unit: Be, store: Ne, event: xt, effect: Fe, domain: st, scope: kt, attached: (e) => Fe(e) && A(e, "attached") == 1 };
let fe = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, C = (e, t) => e.push(t), ae = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Se = () => {
  let e = 0;
  return () => "" + ++e;
};
let Ct = Se(), ut = Se(), Dt = Se(), Mt = Se(), G = null, lt = () => G, Tt = (e) => (e && G && G.sidRoot && (e = `${G.sidRoot}|${e}`), e), Pe = (e, t) => {
  let r = T(e);
  k(t, (n) => {
    let a = T(n);
    r.family.type !== "domain" && (a.family.type = "crosslink"), C(me(a), r), C(ge(r), a);
  });
}, le = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(T), z = (e) => typeof e == "object" && e !== null, V = (e) => typeof e == "function", j = (e) => e === void 0, It = (e) => $(z(e) || V(e), "expect first argument be an object");
const Ke = (e, t, r, n) => $(!(!z(e) && !V(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let $t = (e, t, r) => {
  Array.isArray(e) ? k(e, (n, a) => Ke(n, t, `${a} item of ${r}`, "")) : Ke(e, t, r, " or array of units");
}, Ue = (e, { fn: t }, { a: r }) => t(e, r), Bt = (e, { fn: t }, { a: r }) => t(r, e), ze = (e, { fn: t }) => t(e);
const ct = (e, t, r, n) => {
  let a = { id: ut(), type: e, data: t };
  return r && (a.order = { priority: r }, n && (a.order.barrierID = ++Nt)), a;
};
let Nt = 0, _e = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : oe, batch: a, priority: l }) => ct("mov", { from: e, store: t, to: n, target: r }, l, a), ie = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: a = 0, pure: l = 0 }) => ct("compute", { fn: e, safe: n, filter: a, pure: l }, r, t), je = ({ fn: e }) => ie({ fn: e, priority: "effect" }), H = (e, t, r) => ie({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Pt = (e, t, r) => _e({ store: e, to: t ? oe : "a", priority: r && "sampler", batch: 1 }), q = (e = ze, t) => ie({ fn: e, pure: 1, filter: t }), zt = { mov: _e, compute: ie, filter: ({ fn: e, pure: t }) => ie({ fn: e, filter: 1, pure: t }), run: je }, jt = (e) => ({ id: ut(), current: e }), ft = ({ current: e }) => e, qt = (e, t) => {
  e.before || (e.before = []), C(e.before, t);
}, W = null;
const qe = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Me(e.v.type) > Me(t.v.type)) && (r = e, e = t, t = r), r = qe(e.r, t), e.r = e.l, e.l = r, e;
}, We = [];
let Ye = 0;
for (; Ye < 6; )
  C(We, { first: null, last: null, size: 0 }), Ye += 1;
const Wt = () => {
  for (let e = 0; e < 6; e++) {
    let t = We[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = W.v;
        return W = qe(W.l, W.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, N = (e, t, r, n, a, l, o) => De(0, { a: null, b: null, node: r, parent: n, value: a, page: t, scope: l, meta: o }, e), De = (e, t, r, n = 0) => {
  let a = Me(r), l = We[a], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  a === 3 || a === 4 ? W = qe(W, o) : (l.size === 0 ? l.first = o : l.last.r = o, l.last = o), l.size += 1;
}, Me = (e) => {
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
}, Le = /* @__PURE__ */ new Set();
let O, ce = 1, de = 0, pe = 0, D = null, Gt = (e) => {
  O = e;
}, Je = (e) => {
  D = e;
};
const dt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = P(e);
    if (e)
      return e;
  }
  return null;
};
let Ht = (e, t, r, n, a) => {
  let l = dt(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, a), t.reg[n.id]) : n;
};
const Ft = (e) => e;
let F = (e, t, r, n, a) => {
  var l;
  let o = e.reg, v = t.sid, _ = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize;
  if (o[t.id])
    return;
  let f = { id: t.id, current: t.current, meta: t.meta };
  if (v && v in e.sidValuesMap && !(v in e.sidIdMap))
    f.current = (e.fromSerialize && _ !== "ignore" && (_ == null ? void 0 : _.read) || Ft)(e.sidValuesMap[v]);
  else if (t.before && !a) {
    let m = 0, c = r || !t.noInit || n;
    k(t.before, (p) => {
      switch (p.type) {
        case ne: {
          let i = p.from;
          if (i || p.fn) {
            i && F(e, i, r, n);
            let s = i && o[i.id].current;
            c && (f.current = p.fn ? p.fn(s) : s);
          }
          break;
        }
        case "field":
          m || (m = 1, f.current = Array.isArray(f.current) ? [...f.current] : { ...f.current }), F(e, p.from, r, n), c && (f.current[p.field] = o[o[p.from.id].id].current);
      }
    });
  }
  v && (e.sidIdMap[v] = t.id), o[t.id] = f;
};
const Kt = (e, t, r) => {
  try {
    return t(ee(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let K = (e, t = {}) => (z(e) && (K(e.or, t), Ot(e, (r, n) => {
  j(r) || n === "or" || n === "and" || (t[n] = r);
}), K(e.and, t)), t);
const Qe = (e, t) => {
  fe(e.next, t), fe(me(e), t), fe(ge(e), t);
}, Te = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let a = ge(e);
  for (; n = a.pop(); )
    Qe(n, e), (t || r && A(e, "op") !== "sample" || n.family.type === "crosslink") && Te(n, t, A(n, "op") !== "on" && r);
  for (a = me(e); n = a.pop(); )
    Qe(n, e), r && n.family.type === "crosslink" && Te(n, t, A(n, "op") !== "on" && r);
}, X = (e) => e.clear();
let Ie = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Ne(e))
    X(he(e));
  else if (st(e)) {
    r = 1;
    let n = e.history;
    X(n.events), X(n.effects), X(n.stores), X(n.domains);
  }
  Te(T(e), !!t, r);
}, pt = (e) => {
  let t = () => Ie(e);
  return t.unsubscribe = t, t;
}, Ge = (e, t, r, n, a) => B({ node: r, parent: e, child: t, scope: { fn: a }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), vt = (e, t) => ($(V(t), ".watch argument should be a function"), pt(B({ scope: { fn: t }, node: [je({ fn: ze })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Ut = (e, t, r = "event") => {
  P(e) && P(e).hooks[r](t);
}, ht = (e, t, r) => {
  let n = K(r), a = e === "domain", l = Ct(), { sid: o = null, named: v = null, domain: _ = null, parent: f = _ } = n, m = v || n.name || (a ? "" : l), c = bt(m, f), p = { op: t.kind = e, name: t.shortName = m, sid: t.sid = Tt(o), named: v, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = f, t.compositeName = c, t.defaultConfig = n, t.thru = (i) => (ae(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !a && (t.subscribe = (i) => (It(i), t.watch(V(i) ? i : (s) => i.next && i.next(s))), t[Rt] = () => t), p;
};
const Re = (e, t, r, n) => {
  let a;
  z(r) && (a = r, r = r.fn);
  let l = x({ name: `${e.shortName} → *`, derived: 1, and: a });
  return Ge(e, l, n, t, r), l;
}, mt = (e, t, r, n, a) => {
  let l = ve(t), o = _e({ store: l, to: "a", priority: "read" });
  r === ne && (o.data.softRead = 1);
  let v = [o, q(n)];
  return Z("storeOnMap", l, v, Ne(e) && ve(e)), Ge(e, t, v, r, a);
};
let Yt = (e, t, r) => {
  try {
    return [1, e(...r)];
  } catch (n) {
    return t(n), [0, null];
  }
}, Jt = (e) => {
  let t = I(e), r = { ref: t };
  return t && C(t.activeEffects, r), r;
}, Xe = (e, t, r, n, a, l) => (o) => {
  l.ref && fe(l.ref.activeEffects, l), re({ target: [n, Qt], params: [r ? { status: "done", params: e, result: o } : { status: "fail", params: e, error: o }, { value: o, fn: r ? t.rs : t.rj }], defer: 1, page: a.page, scope: l.ref, meta: a.meta });
};
const Qt = B({ node: [je({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), Ze = {
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
}, yr = U(() => {
  window.isBackFromBrowser = !1, window.history.back();
}), Y = U((e) => {
  const { view: t, panel: r, modal: n, popout: a } = window.history.state ?? {
    view: void 0,
    panel: void 0,
    modal: void 0,
    popout: void 0
  };
  console.log("try to push history", Ze.subscribers), Ze.changeState({
    view: e.hasOwnProperty("view") ? e.view : t,
    panel: e.hasOwnProperty("panel") ? e.panel : r,
    modal: e.hasOwnProperty("modal") ? e.modal : n,
    popout: e.hasOwnProperty("popout") ? e.popout : a
  });
}), wr = U((e) => {
  Y({ view: e.view, panel: e.panel });
}), Er = U((e) => {
  Y({ panel: e });
}), Or = U((e) => {
  Y({ modal: e });
}), br = U((e) => {
  Y({ popout: e });
}), Xt = x(), Zt = x(), gt = x(), St = x(), _t = x(), yt = x(), er = x(), tr = $e({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Xt, (e, t) => ({
  ...e,
  activeView: t
})).on(Zt, (e, t) => ({
  ...e,
  activePanel: t
})).on(St, (e, t) => ({
  ...e,
  activeModal: t
})).on(_t, (e, t) => ({
  ...e,
  activePopout: t
})).on(yt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(gt, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(er, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function rr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var et = {}, nr = {
  get exports() {
    return et;
  },
  set exports(e) {
    et = e;
  }
}, Ae = {}, se = {}, or = {
  get exports() {
    return se;
  },
  set exports(e) {
    se = e;
  }
}, xe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt;
function ar() {
  if (tt)
    return xe;
  tt = 1;
  var e = M;
  function t(c, p) {
    return c === p && (c !== 0 || 1 / c === 1 / p) || c !== c && p !== p;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, a = e.useEffect, l = e.useLayoutEffect, o = e.useDebugValue;
  function v(c, p) {
    var i = p(), s = n({ inst: { value: i, getSnapshot: p } }), u = s[0].inst, d = s[1];
    return l(function() {
      u.value = i, u.getSnapshot = p, _(u) && d({ inst: u });
    }, [c, i, p]), a(function() {
      return _(u) && d({ inst: u }), c(function() {
        _(u) && d({ inst: u });
      });
    }, [c]), o(i), i;
  }
  function _(c) {
    var p = c.getSnapshot;
    c = c.value;
    try {
      var i = p();
      return !r(c, i);
    } catch {
      return !0;
    }
  }
  function f(c, p) {
    return p();
  }
  var m = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : v;
  return xe.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : m, xe;
}
var ke = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rt;
function ir() {
  return rt || (rt = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var h = arguments.length, y = new Array(h > 1 ? h - 1 : 0), g = 1; g < h; g++)
          y[g - 1] = arguments[g];
        n("error", w, y);
      }
    }
    function n(w, h, y) {
      {
        var g = t.ReactDebugCurrentFrame, S = g.getStackAddendum();
        S !== "" && (h += "%s", y = y.concat([S]));
        var E = y.map(function(R) {
          return String(R);
        });
        E.unshift("Warning: " + h), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function a(w, h) {
      return w === h && (w !== 0 || 1 / w === 1 / h) || w !== w && h !== h;
    }
    var l = typeof Object.is == "function" ? Object.is : a, o = e.useState, v = e.useEffect, _ = e.useLayoutEffect, f = e.useDebugValue, m = !1, c = !1;
    function p(w, h, y) {
      m || e.startTransition !== void 0 && (m = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var g = h();
      if (!c) {
        var S = h();
        l(g, S) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var E = o({
        inst: {
          value: g,
          getSnapshot: h
        }
      }), R = E[0].inst, J = E[1];
      return _(function() {
        R.value = g, R.getSnapshot = h, i(R) && J({
          inst: R
        });
      }, [w, g, h]), v(function() {
        i(R) && J({
          inst: R
        });
        var ye = function() {
          i(R) && J({
            inst: R
          });
        };
        return w(ye);
      }, [w]), f(g), g;
    }
    function i(w) {
      var h = w.getSnapshot, y = w.value;
      try {
        var g = h();
        return !l(y, g);
      } catch {
        return !0;
      }
    }
    function s(w, h, y) {
      return h();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", d = !u, b = d ? s : p, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    ke.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ar() : e.exports = ir();
})(or);
const sr = /* @__PURE__ */ rr(se);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function ur() {
  if (nt)
    return Ae;
  nt = 1;
  var e = M, t = se;
  function r(f, m) {
    return f === m && (f !== 0 || 1 / f === 1 / m) || f !== f && m !== m;
  }
  var n = typeof Object.is == "function" ? Object.is : r, a = t.useSyncExternalStore, l = e.useRef, o = e.useEffect, v = e.useMemo, _ = e.useDebugValue;
  return Ae.useSyncExternalStoreWithSelector = function(f, m, c, p, i) {
    var s = l(null);
    if (s.current === null) {
      var u = { hasValue: !1, value: null };
      s.current = u;
    } else
      u = s.current;
    s = v(function() {
      function b(g) {
        if (!L) {
          if (L = !0, w = g, g = p(g), i !== void 0 && u.hasValue) {
            var S = u.value;
            if (i(S, g))
              return h = S;
          }
          return h = g;
        }
        if (S = h, n(w, g))
          return S;
        var E = p(g);
        return i !== void 0 && i(S, E) ? S : (w = g, h = E);
      }
      var L = !1, w, h, y = c === void 0 ? null : c;
      return [function() {
        return b(m());
      }, y === null ? void 0 : function() {
        return b(y());
      }];
    }, [m, c, p, i]);
    var d = a(f, s[0], s[1]);
    return o(function() {
      u.hasValue = !0, u.value = d;
    }, [d]), _(d), d;
  }, Ae;
}
var Ve = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ot;
function lr() {
  return ot || (ot = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = se;
    function r(m, c) {
      return m === c && (m !== 0 || 1 / m === 1 / c) || m !== m && c !== c;
    }
    var n = typeof Object.is == "function" ? Object.is : r, a = t.useSyncExternalStore, l = e.useRef, o = e.useEffect, v = e.useMemo, _ = e.useDebugValue;
    function f(m, c, p, i, s) {
      var u = l(null), d;
      u.current === null ? (d = {
        hasValue: !1,
        value: null
      }, u.current = d) : d = u.current;
      var b = v(function() {
        var y = !1, g, S, E = function(Q) {
          if (!y) {
            y = !0, g = Q;
            var we = i(Q);
            if (s !== void 0 && d.hasValue) {
              var Ee = d.value;
              if (s(Ee, we))
                return S = Ee, Ee;
            }
            return S = we, we;
          }
          var Et = g, Oe = S;
          if (n(Et, Q))
            return Oe;
          var be = i(Q);
          return s !== void 0 && s(Oe, be) ? Oe : (g = Q, S = be, be);
        }, R = p === void 0 ? null : p, J = function() {
          return E(c());
        }, ye = R === null ? void 0 : function() {
          return E(R());
        };
        return [J, ye];
      }, [c, p, i, s]), L = b[0], w = b[1], h = a(m, L, w);
      return o(function() {
        d.hasValue = !0, d.value = h;
      }, [h]), _(h), h;
    }
    Ve.useSyncExternalStoreWithSelector = f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ve;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ur() : e.exports = lr();
})(nr);
function cr(e, t, r, n) {
  let a = [zt.run({ fn: (l) => t(l) })];
  if (n && a.unshift(n), r) {
    let l = B({ node: a }), o = e.graphite.id, v = r.additionalLinks, _ = v[o] || [];
    return v[o] = _, _.push(l), () => {
      let f = _.indexOf(l);
      f !== -1 && _.splice(f, 1), Ie(l);
    };
  }
  {
    let l = B({ node: a, parent: [e], family: { owners: e } });
    return () => {
      Ie(l);
    };
  }
}
function fr(e, t) {
  Vt.store(e) || wt("expect useStore argument to be a store");
  let r = M.useCallback((a) => cr(e, a, t), [e, t]), n = M.useCallback(() => hr(e, t), [e, t]);
  return vr(r, n, n);
}
function dr(e) {
  let t = M.useContext(mr);
  return e && !t && wt("No scope found, consider adding <Provider> to app root"), t;
}
function pr(e, t) {
  return fr(e, dr(t == null ? void 0 : t.forceScope));
}
let wt = (e) => {
  throw Error(e);
};
typeof window < "u" ? M.useLayoutEffect : M.useEffect;
const { useSyncExternalStore: vr } = sr, hr = (e, t) => t ? t.getState(e) : e.getState(), mr = M.createContext(null), gr = (e, t, r) => {
  it(() => {
    const n = (a) => {
      a instanceof KeyboardEvent && a.key === r ? t(a) : r || t(a);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, at = (e, t, r) => {
  it(() => (Ce.addEventListener(e, t, r), () => Ce.removeEventListener(r)), [e, r, t]);
}, Lr = (e, ...t) => {
  at("init", (v) => {
    console.log("[blum]: initialized", v), o || Y(e);
  }, 1);
  const { activeView: r, activePanel: n, activeModal: a, activePopout: l, isRouteInit: o } = Sr();
  gr("popstate", async () => {
    o && (await (async () => {
      Ce.fireChangeStateEvent();
      const { view: _, panel: f, modal: m, popout: c } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", _, f, m, c), console.log("storeRoutes", r, n, a, l);
      for (const p in t)
        if (!await t[p]({
          view: r,
          panel: n,
          modal: a,
          popout: l
        }, { view: _, panel: f, modal: m, popout: c }))
          return;
    })(), window.isBackFromBrowser = !0);
  }), at("changestate", (v) => {
    if (console.log("[blum]: state changed", v), v) {
      const { view: _, panel: f, modal: m, popout: c } = v;
      _ && f && gt({ view: _, panel: f }), St(m), _t(c), o || yt();
    }
  }, 2);
}, Sr = () => pr(tr), Rr = (e) => e, Ar = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((l) => r[l] === e && r[l] !== n[l]) && window.isBackFromBrowser ? (t && t(r, n), Y(r), !1) : !0;
export {
  St as _setActiveModal,
  Zt as _setActivePanel,
  _t as _setActivePopout,
  Xt as _setActiveView,
  yr as back,
  Ce as blumRouter,
  Ar as createDisableBackBrowserRouteMiddleware,
  Rr as createRouteMiddleware,
  Y as historyPush,
  Or as setActiveModal,
  Er as setActivePanel,
  br as setActivePopout,
  wr as setActiveViewPanel,
  Lr as useInitRouter,
  Sr as useRouter
};
