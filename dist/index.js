import T, { useEffect as Ve } from "react";
function At(e, t) {
  for (let n in e)
    t(e[n], n);
}
function k(e, t) {
  e.forEach(t);
}
function P(e, t) {
  if (!e)
    throw Error(t);
}
function $({ node: e = [], from: t, source: n, parent: r = t || n, to: u, target: s, child: a = u || s, scope: m = {}, meta: g = {}, family: p = { type: "regular" }, regional: S } = {}) {
  let c = le(r), d = le(p.links), o = le(p.owners), i = [];
  k(e, (f) => f && M(i, f));
  let l = { id: Pt(), seq: i, next: le(a), meta: g, scope: m, family: { type: p.type || "crosslink", links: d, owners: o } };
  return k(d, (f) => M(me(f), l)), k(o, (f) => M(he(f), l)), k(c, (f) => M(f.next, l)), S && W && je(X(W), [l]), l;
}
function ee(e, t, n) {
  let r, u = D, s = null, a = O;
  if (e.target && (t = e.params, n = e.defer, r = e.meta, u = "page" in e ? e.page : u, e.stack && (s = e.stack), a = I(e) || a, e = e.target), a && O && a !== O && (O = null), Array.isArray(e))
    for (let i = 0; i < e.length; i++)
      B("pure", u, C(e[i]), s, t[i], a, r);
  else
    B("pure", u, C(e), s, t, a, r);
  if (n && !ue)
    return;
  let m, g, p, S, c, d, o = { isRoot: ue, currentPage: D, scope: O, isWatch: ce, isPure: fe };
  ue = 0;
  e:
    for (; S = Kt(); ) {
      let { idx: i, stack: l, type: f } = S;
      p = l.node, D = c = l.page, O = I(l), c ? d = c.reg : O && (d = O.reg);
      let b = !!c, R = !!O, w = { fail: 0, scope: p.scope };
      m = g = 0;
      for (let v = i; v < p.seq.length && !m; v++) {
        let y = p.seq[v];
        if (y.order) {
          let { priority: h, barrierID: _ } = y.order, E = _ ? c ? `${c.fullID}_${_}` : _ : 0;
          if (v !== i || f !== h) {
            _ ? be.has(E) || (be.add(E), Me(v, l, h, _)) : Me(v, l, h);
            continue e;
          }
          _ && be.delete(E);
        }
        switch (y.type) {
          case "mov": {
            let _, E = y.data;
            switch (E.from) {
              case re:
                _ = X(l);
                break;
              case "a":
              case "b":
                _ = l[E.from];
                break;
              case "value":
                _ = E.store;
                break;
              case "store":
                if (d && !d[E.store.id])
                  if (b) {
                    let L = pt(c, E.store.id);
                    l.page = c = L, L ? d = L.reg : R ? (F(O, E.store, 0, 1, E.softRead), d = O.reg) : d = void 0;
                  } else
                    R && F(O, E.store, 0, 1, E.softRead);
                _ = dt(d && d[E.store.id] || E.store);
            }
            switch (E.to) {
              case re:
                l.value = _;
                break;
              case "a":
              case "b":
                l[E.to] = _;
                break;
              case "store":
                Yt(c, O, p, E.target).current = _;
            }
            break;
          }
          case "compute":
            let h = y.data;
            if (h.fn) {
              ce = x(p, "op") === "watch", fe = h.pure;
              let _ = h.safe ? (0, h.fn)(X(l), w.scope, l) : Qt(w, h.fn, l);
              h.filter ? g = !_ : l.value = _, ce = o.isWatch, fe = o.isPure;
            }
        }
        m = w.fail || g;
      }
      if (!m) {
        let v = X(l), y = I(l);
        if (k(p.next, (h) => {
          B("child", c, h, l, v, y);
        }), y) {
          x(p, "needFxCounter") && B("child", c, y.fxCount, l, v, y), x(p, "storeChange") && B("child", c, y.storeChange, l, v, y), x(p, "warnSerialize") && B("child", c, y.warnSerializeNode, l, v, y);
          let h = y.additionalLinks[p.id];
          h && k(h, (_) => {
            B("child", c, _, l, v, y);
          });
        }
      }
    }
  ue = o.isRoot, D = o.currentPage, O = I(o);
}
function xt(e, t) {
  let n, r, u = e;
  if (t) {
    let s = Mt(t);
    e.length === 0 ? (n = s.path, r = s.fullName) : (n = s.path.concat([e]), r = s.fullName.length === 0 ? e : s.fullName + "/" + e);
  } else
    n = e.length === 0 ? [] : [e], r = e;
  return { shortName: u, fullName: r, path: n };
}
function Q(e, ...t) {
  let n = ct();
  if (n) {
    let r = n.handlers[e];
    if (r)
      return r(n, ...t);
  }
}
function A(e, t) {
  let n = K({ or: t, and: typeof e == "string" ? { name: e } : e }), r = (a, ...m) => (ne(!x(r, "derived"), "call of derived event", "createEvent"), ne(!fe, "unit call from pure function", "operators like sample"), D ? ((g, p, S, c) => {
    let d = D, o = null;
    if (p)
      for (o = D; o && o.template !== p; )
        o = N(o);
    Xe(o);
    let i = g.create(S, c);
    return Xe(d), i;
  })(r, u, a, m) : r.create(a, m)), u = ct(), s = Object.assign(r, { graphite: $({ meta: ht("event", r, n), regional: 1 }), create: (a) => (ee({ target: r, params: a, scope: O }), a), watch: (a) => mt(r, a), map: (a) => Re(r, te, a, [q()]), filter: (a) => Re(r, "filter", a.fn ? a : a.fn, [q(qe, 1)]), filterMap: (a) => Re(r, "filterMap", a, [q(), G((m) => !j(m), 1)]), prepend(a) {
    let m = A("* → " + r.shortName, { parent: N(r) });
    return Q("eventPrepend", C(m)), Fe(m, r, [q()], "prepend", a), Xt(r, m), m;
  } });
  return n != null && n.domain && n.domain.hooks.event(s), s;
}
function Ke(e, t, n, r) {
  return zt(n, t, "first argument"), P(V(r), "second argument should be a function"), ne(!x(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(n) ? n : [n], (u) => {
    e.off(u), pe(e).set(u, vt(St(u, e, "on", jt, r)));
  }), e;
}
function ve(e, t) {
  let n = K(t), r = Gt(e), u = A({ named: "updates", derived: 1 });
  Q("storeBase", r);
  let s = r.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: u, defaultState: e, stateRef: r, getState() {
    let i, l = r;
    if (D) {
      let f = D;
      for (; f && !f.reg[s]; )
        f = N(f);
      f && (i = f);
    }
    return !i && O && (F(O, r, 1), i = O), i && (l = i.reg[s]), dt(l);
  }, setState: (i) => ee({ target: a, params: i, defer: 1, scope: O }), reset: (...i) => (k(i, (l) => Ke(a, ".reset", l, () => a.defaultState)), a), on: (i, l) => Ke(a, ".on", i, l), off(i) {
    let l = pe(a).get(i);
    return l && (l(), pe(a).delete(i)), a;
  }, map(i, l) {
    let f, b;
    z(i) && (f = i, i = i.fn), ne(j(l), "second argument of store.map", "updateFilter");
    let R = a.getState();
    j(R) || (b = i(R, l));
    let w = ve(b, { name: `${a.shortName} → *`, derived: 1, and: f }), v = St(a, w, te, Je, i);
    return Ft(de(w), { type: te, fn: i, from: r }), de(w).noInit = 1, Q("storeMap", r, v), w;
  }, watch(i, l) {
    if (!l || !Ne(i)) {
      let f = mt(a, i);
      return Q("storeWatch", r, i) || i(a.getState()), f;
    }
    return P(V(l), "second argument should be a function"), i.watch((f) => l(a.getState(), f));
  } }, m = ht("store", a, n), g = a.defaultConfig.updateFilter;
  a.graphite = $({ scope: { state: r, fn: g }, node: [G((i, l, f) => (f.scope && !f.scope.reg[r.id] && (f.b = 1), i)), Ht(r), G((i, l, { a: f, b }) => !j(i) && (i !== f || b), 1), g && q(Je, 1), _e({ from: re, target: r })], child: u, meta: m, regional: 1 });
  let p = x(a, "serialize"), S = x(a, "derived"), c = p === "ignore", d = !p || c ? 0 : p, o = x(a, "sid");
  return o && (c || Z(a, "storeChange", 1), r.sid = o, d && (r.meta = { ...r == null ? void 0 : r.meta, serialize: d })), o || c || S || Z(a, "warnSerialize", 1), P(S || !j(e), "current state can't be undefined, use null instead"), je(a, [u]), n != null && n.domain && n.domain.hooks.store(a), S || (a.reinit = A(), a.reset(a.reinit)), a;
}
function kt() {
  let e = {};
  return e.req = new Promise((t, n) => {
    e.rs = t, e.rj = n;
  }), e.req.catch(() => {
  }), e;
}
function lt(e, t) {
  let n = K(V(e) ? { handler: e } : e, t), r = A(V(e) ? { handler: e } : e, t), u = C(r);
  Z(u, "op", r.kind = "effect"), r.use = (o) => (P(V(o), ".use argument should be a function"), S.scope.handler = o, r), r.use.getCurrent = () => S.scope.handler;
  let s = r.finally = A({ named: "finally", derived: 1 }), a = r.done = s.filterMap({ named: "done", fn({ status: o, params: i, result: l }) {
    if (o === "done")
      return { params: i, result: l };
  } }), m = r.fail = s.filterMap({ named: "fail", fn({ status: o, params: i, error: l }) {
    if (o === "fail")
      return { params: i, error: l };
  } }), g = r.doneData = a.map({ named: "doneData", fn: ({ result: o }) => o }), p = r.failData = m.map({ named: "failData", fn: ({ error: o }) => o }), S = $({ scope: { handlerId: x(u, "sid"), handler: r.defaultConfig.handler || (() => P(0, `no handler used in ${r.getType()}`)) }, node: [G((o, i, l) => {
    let f = i, b = f.handler;
    if (I(l)) {
      let R = I(l).handlers[f.handlerId];
      R && (b = R);
    }
    return o.handler = b, o;
  }, 0, 1), G(({ params: o, req: i, handler: l, args: f = [o] }, b, R) => {
    let w = er(R), v = et(o, i, 1, s, R, w), y = et(o, i, 0, s, R, w), [h, _] = Zt(l, y, f);
    h && (z(_) && V(_.then) ? _.then(v, y) : v(_));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  u.scope.runner = S, M(u.seq, G((o, { runner: i }, l) => {
    let f = N(l) ? { params: o, req: { rs(b) {
    }, rj(b) {
    } } } : o;
    return l.meta || (l.meta = { fxID: $t() }), ee({ target: i, params: f, defer: 1, scope: I(l), meta: l.meta }), f.params;
  }, 0, 1)), r.create = (o) => {
    let i = kt(), l = { params: o, req: i };
    if (O && !ce) {
      let f = O;
      i.req.finally(() => {
        Ut(f);
      }).catch(() => {
      });
    }
    return ee({ target: r, params: l, scope: O }), i.req;
  };
  let c = r.inFlight = ve(0, { serialize: "ignore" }).on(r, (o) => o + 1).on(s, (o) => o - 1).map({ fn: (o) => o, named: "inFlight" });
  Z(s, "needFxCounter", "dec"), Z(r, "needFxCounter", 1);
  let d = r.pending = c.map({ fn: (o) => o > 0, named: "pending" });
  return je(r, [s, a, m, g, p, d, c]), n != null && n.domain && n.domain.hooks.effect(r), r;
}
let Vt = typeof Symbol < "u" && Symbol.observable || "@@observable", te = "map", re = "stack", C = (e) => e.graphite || e, me = (e) => e.family.owners, he = (e) => e.family.links, de = (e) => e.stateRef, X = (e) => e.value, pe = (e) => e.subscribers, N = (e) => e.parent, I = (e) => e.scope, x = (e, t) => C(e).meta[t], Z = (e, t, n) => C(e).meta[t] = n, Mt = (e) => e.compositeName, Ne = (e) => (V(e) || z(e)) && "kind" in e;
const ie = (e) => (t) => Ne(t) && t.kind === e;
let ze = ie("store"), Dt = ie("event"), Ue = ie("effect"), ut = ie("domain"), Tt = ie("scope");
var Ct = { __proto__: null, unit: Ne, store: ze, event: Dt, effect: Ue, domain: ut, scope: Tt, attached: (e) => Ue(e) && x(e, "attached") == 1 };
let se = (e, t) => {
  let n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}, M = (e, t) => e.push(t), ne = (e, t, n) => !e && console.error(`${t} is deprecated${n ? `, use ${n} instead` : ""}`);
const Se = () => {
  let e = 0;
  return () => "" + ++e;
};
let It = Se(), st = Se(), Pt = Se(), $t = Se(), W = null, ct = () => W, Bt = (e) => (e && W && W.sidRoot && (e = `${W.sidRoot}|${e}`), e), je = (e, t) => {
  let n = C(e);
  k(t, (r) => {
    let u = C(r);
    n.family.type !== "domain" && (u.family.type = "crosslink"), M(me(u), n), M(he(n), u);
  });
}, le = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(C), z = (e) => typeof e == "object" && e !== null, V = (e) => typeof e == "function", j = (e) => e === void 0, Nt = (e) => P(z(e) || V(e), "expect first argument be an object");
const Ye = (e, t, n, r) => P(!(!z(e) && !V(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${n} to be a unit (store, event or effect)${r}`);
let zt = (e, t, n) => {
  Array.isArray(e) ? k(e, (r, u) => Ye(r, t, `${u} item of ${n}`, "")) : Ye(e, t, n, " or array of units");
}, Je = (e, { fn: t }, { a: n }) => t(e, n), jt = (e, { fn: t }, { a: n }) => t(n, e), qe = (e, { fn: t }) => t(e);
const ft = (e, t, n, r) => {
  let u = { id: st(), type: e, data: t };
  return n && (u.order = { priority: n }, r && (u.order.barrierID = ++qt)), u;
};
let qt = 0, _e = ({ from: e = "store", store: t, target: n, to: r = n ? "store" : re, batch: u, priority: s }) => ft("mov", { from: e, store: t, to: r, target: n }, s, u), ae = ({ fn: e, batch: t, priority: n, safe: r = 0, filter: u = 0, pure: s = 0 }) => ft("compute", { fn: e, safe: r, filter: u, pure: s }, n, t), He = ({ fn: e }) => ae({ fn: e, priority: "effect" }), G = (e, t, n) => ae({ fn: e, safe: 1, filter: t, priority: n && "effect" }), Ht = (e, t, n) => _e({ store: e, to: t ? re : "a", priority: n && "sampler", batch: 1 }), q = (e = qe, t) => ae({ fn: e, pure: 1, filter: t }), Wt = { mov: _e, compute: ae, filter: ({ fn: e, pure: t }) => ae({ fn: e, filter: 1, pure: t }), run: He }, Gt = (e) => ({ id: st(), current: e }), dt = ({ current: e }) => e, Ft = (e, t) => {
  e.before || (e.before = []), M(e.before, t);
}, H = null;
const We = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let n;
  return (e.v.type === t.v.type && e.v.id > t.v.id || De(e.v.type) > De(t.v.type)) && (n = e, e = t, t = n), n = We(e.r, t), e.r = e.l, e.l = n, e;
}, Ge = [];
let Qe = 0;
for (; Qe < 6; )
  M(Ge, { first: null, last: null, size: 0 }), Qe += 1;
const Kt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Ge[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let r = H.v;
        return H = We(H.l, H.r), r;
      }
      t.size === 1 && (t.last = null);
      let n = t.first;
      return t.first = n.r, t.size -= 1, n.v;
    }
  }
}, B = (e, t, n, r, u, s, a) => Me(0, { a: null, b: null, node: n, parent: r, value: u, page: t, scope: s, meta: a }, e), Me = (e, t, n, r = 0) => {
  let u = De(n), s = Ge[u], a = { v: { idx: e, stack: t, type: n, id: r }, l: null, r: null };
  u === 3 || u === 4 ? H = We(H, a) : (s.size === 0 ? s.first = a : s.last.r = a, s.last = a), s.size += 1;
}, De = (e) => {
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
}, be = /* @__PURE__ */ new Set();
let O, ue = 1, ce = 0, fe = 0, D = null, Ut = (e) => {
  O = e;
}, Xe = (e) => {
  D = e;
};
const pt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = N(e);
    if (e)
      return e;
  }
  return null;
};
let Yt = (e, t, n, r, u) => {
  let s = pt(e, r.id);
  return s ? s.reg[r.id] : t ? (F(t, r, u), t.reg[r.id]) : r;
};
const Jt = (e) => e;
let F = (e, t, n, r, u) => {
  var s;
  let a = e.reg, m = t.sid, g = t == null || (s = t.meta) === null || s === void 0 ? void 0 : s.serialize;
  if (a[t.id])
    return;
  let p = { id: t.id, current: t.current, meta: t.meta };
  if (m && m in e.sidValuesMap && !(m in e.sidIdMap))
    p.current = (e.fromSerialize && g !== "ignore" && (g == null ? void 0 : g.read) || Jt)(e.sidValuesMap[m]);
  else if (t.before && !u) {
    let S = 0, c = n || !t.noInit || r;
    k(t.before, (d) => {
      switch (d.type) {
        case te: {
          let o = d.from;
          if (o || d.fn) {
            o && F(e, o, n, r);
            let i = o && a[o.id].current;
            c && (p.current = d.fn ? d.fn(i) : i);
          }
          break;
        }
        case "field":
          S || (S = 1, p.current = Array.isArray(p.current) ? [...p.current] : { ...p.current }), F(e, d.from, n, r), c && (p.current[d.field] = a[a[d.from.id].id].current);
      }
    });
  }
  m && (e.sidIdMap[m] = t.id), a[t.id] = p;
};
const Qt = (e, t, n) => {
  try {
    return t(X(n), e.scope, n);
  } catch (r) {
    console.error(r), e.fail = 1;
  }
};
let K = (e, t = {}) => (z(e) && (K(e.or, t), At(e, (n, r) => {
  j(n) || r === "or" || r === "and" || (t[r] = n);
}), K(e.and, t)), t);
const Ze = (e, t) => {
  se(e.next, t), se(me(e), t), se(he(e), t);
}, Te = (e, t, n) => {
  let r;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let u = he(e);
  for (; r = u.pop(); )
    Ze(r, e), (t || n && x(e, "op") !== "sample" || r.family.type === "crosslink") && Te(r, t, x(r, "op") !== "on" && n);
  for (u = me(e); r = u.pop(); )
    Ze(r, e), n && r.family.type === "crosslink" && Te(r, t, x(r, "op") !== "on" && n);
}, J = (e) => e.clear();
let Ce = (e, { deep: t } = {}) => {
  let n = 0;
  if (e.ownerSet && e.ownerSet.delete(e), ze(e))
    J(pe(e));
  else if (ut(e)) {
    n = 1;
    let r = e.history;
    J(r.events), J(r.effects), J(r.stores), J(r.domains);
  }
  Te(C(e), !!t, n);
}, vt = (e) => {
  let t = () => Ce(e);
  return t.unsubscribe = t, t;
}, Fe = (e, t, n, r, u) => $({ node: n, parent: e, child: t, scope: { fn: u }, meta: { op: r }, family: { owners: [e, t], links: t }, regional: 1 }), mt = (e, t) => (P(V(t), ".watch argument should be a function"), vt($({ scope: { fn: t }, node: [He({ fn: qe })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Xt = (e, t, n = "event") => {
  N(e) && N(e).hooks[n](t);
}, ht = (e, t, n) => {
  let r = K(n), u = e === "domain", s = It(), { sid: a = null, named: m = null, domain: g = null, parent: p = g } = r, S = m || r.name || (u ? "" : s), c = xt(S, p), d = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Bt(a), named: m, unitId: t.id = s, serialize: r.serialize, derived: r.derived, config: r };
  return t.parent = p, t.compositeName = c, t.defaultConfig = r, t.thru = (o) => (ne(0, "thru", "js pipe"), o(t)), t.getType = () => c.fullName, !u && (t.subscribe = (o) => (Nt(o), t.watch(V(o) ? o : (i) => o.next && o.next(i))), t[Vt] = () => t), d;
};
const Re = (e, t, n, r) => {
  let u;
  z(n) && (u = n, n = n.fn);
  let s = A({ name: `${e.shortName} → *`, derived: 1, and: u });
  return Fe(e, s, r, t, n), s;
}, St = (e, t, n, r, u) => {
  let s = de(t), a = _e({ store: s, to: "a", priority: "read" });
  n === te && (a.data.softRead = 1);
  let m = [a, q(r)];
  return Q("storeOnMap", s, m, ze(e) && de(e)), Fe(e, t, m, n, u);
};
let Zt = (e, t, n) => {
  try {
    return [1, e(...n)];
  } catch (r) {
    return t(r), [0, null];
  }
}, er = (e) => {
  let t = I(e), n = { ref: t };
  return t && M(t.activeEffects, n), n;
}, et = (e, t, n, r, u, s) => (a) => {
  s.ref && se(s.ref.activeEffects, s), ee({ target: [r, tr], params: [n ? { status: "done", params: e, result: a } : { status: "fail", params: e, error: a }, { value: a, fn: n ? t.rs : t.rj }], defer: 1, page: u.page, scope: s.ref, meta: u.meta });
};
const tr = $({ node: [He({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), Er = lt(() => {
  window.isBackFromBrowser = !1, window.history.back();
}), _t = lt((e) => {
  window.history.pushState(e, "");
}), Ie = A(), Pe = A(), $e = A(), Be = A(), rr = A(), gt = A(), tt = A(), nr = ve({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Ie, (e, t) => ({
  ...e,
  activeView: t
})).on(Pe, (e, t) => ({
  ...e,
  activePanel: t
})).on($e, (e, t) => ({
  ...e,
  activeModal: t
})).on(Be, (e, t) => ({
  ...e,
  activePopout: t
})).on(gt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(rr, (e, t) => ({
  ...e,
  activeView: t.hasOwnProperty("view") ? t.view : e.activeView,
  activePanel: t.hasOwnProperty("panel") ? t.panel : e.activePanel,
  activeModal: t.hasOwnProperty("modal") ? t.modal : e.activeModal,
  activePopout: t.hasOwnProperty("popout") ? t.popout : e.activePopout
}));
function ar(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rt = {}, or = {
  get exports() {
    return rt;
  },
  set exports(e) {
    rt = e;
  }
}, Le = {}, oe = {}, ir = {
  get exports() {
    return oe;
  },
  set exports(e) {
    oe = e;
  }
}, Ae = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function lr() {
  if (nt)
    return Ae;
  nt = 1;
  var e = T;
  function t(c, d) {
    return c === d && (c !== 0 || 1 / c === 1 / d) || c !== c && d !== d;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, u = e.useEffect, s = e.useLayoutEffect, a = e.useDebugValue;
  function m(c, d) {
    var o = d(), i = r({ inst: { value: o, getSnapshot: d } }), l = i[0].inst, f = i[1];
    return s(function() {
      l.value = o, l.getSnapshot = d, g(l) && f({ inst: l });
    }, [c, o, d]), u(function() {
      return g(l) && f({ inst: l }), c(function() {
        g(l) && f({ inst: l });
      });
    }, [c]), a(o), o;
  }
  function g(c) {
    var d = c.getSnapshot;
    c = c.value;
    try {
      var o = d();
      return !n(c, o);
    } catch {
      return !0;
    }
  }
  function p(c, d) {
    return d();
  }
  var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : m;
  return Ae.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S, Ae;
}
var xe = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function ur() {
  return at || (at = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(w) {
      {
        for (var v = arguments.length, y = new Array(v > 1 ? v - 1 : 0), h = 1; h < v; h++)
          y[h - 1] = arguments[h];
        r("error", w, y);
      }
    }
    function r(w, v, y) {
      {
        var h = t.ReactDebugCurrentFrame, _ = h.getStackAddendum();
        _ !== "" && (v += "%s", y = y.concat([_]));
        var E = y.map(function(L) {
          return String(L);
        });
        E.unshift("Warning: " + v), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function u(w, v) {
      return w === v && (w !== 0 || 1 / w === 1 / v) || w !== w && v !== v;
    }
    var s = typeof Object.is == "function" ? Object.is : u, a = e.useState, m = e.useEffect, g = e.useLayoutEffect, p = e.useDebugValue, S = !1, c = !1;
    function d(w, v, y) {
      S || e.startTransition !== void 0 && (S = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var h = v();
      if (!c) {
        var _ = v();
        s(h, _) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var E = a({
        inst: {
          value: h,
          getSnapshot: v
        }
      }), L = E[0].inst, U = E[1];
      return g(function() {
        L.value = h, L.getSnapshot = v, o(L) && U({
          inst: L
        });
      }, [w, h, v]), m(function() {
        o(L) && U({
          inst: L
        });
        var ge = function() {
          o(L) && U({
            inst: L
          });
        };
        return w(ge);
      }, [w]), p(h), h;
    }
    function o(w) {
      var v = w.getSnapshot, y = w.value;
      try {
        var h = v();
        return !s(y, h);
      } catch {
        return !0;
      }
    }
    function i(w, v, y) {
      return v();
    }
    var l = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", f = !l, b = f ? i : d, R = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    xe.useSyncExternalStore = R, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), xe;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = lr() : e.exports = ur();
})(ir);
const sr = /* @__PURE__ */ ar(oe);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ot;
function cr() {
  if (ot)
    return Le;
  ot = 1;
  var e = T, t = oe;
  function n(p, S) {
    return p === S && (p !== 0 || 1 / p === 1 / S) || p !== p && S !== S;
  }
  var r = typeof Object.is == "function" ? Object.is : n, u = t.useSyncExternalStore, s = e.useRef, a = e.useEffect, m = e.useMemo, g = e.useDebugValue;
  return Le.useSyncExternalStoreWithSelector = function(p, S, c, d, o) {
    var i = s(null);
    if (i.current === null) {
      var l = { hasValue: !1, value: null };
      i.current = l;
    } else
      l = i.current;
    i = m(function() {
      function b(h) {
        if (!R) {
          if (R = !0, w = h, h = d(h), o !== void 0 && l.hasValue) {
            var _ = l.value;
            if (o(_, h))
              return v = _;
          }
          return v = h;
        }
        if (_ = v, r(w, h))
          return _;
        var E = d(h);
        return o !== void 0 && o(_, E) ? _ : (w = h, v = E);
      }
      var R = !1, w, v, y = c === void 0 ? null : c;
      return [function() {
        return b(S());
      }, y === null ? void 0 : function() {
        return b(y());
      }];
    }, [S, c, d, o]);
    var f = u(p, i[0], i[1]);
    return a(function() {
      l.hasValue = !0, l.value = f;
    }, [f]), g(f), f;
  }, Le;
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
var it;
function fr() {
  return it || (it = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = oe;
    function n(S, c) {
      return S === c && (S !== 0 || 1 / S === 1 / c) || S !== S && c !== c;
    }
    var r = typeof Object.is == "function" ? Object.is : n, u = t.useSyncExternalStore, s = e.useRef, a = e.useEffect, m = e.useMemo, g = e.useDebugValue;
    function p(S, c, d, o, i) {
      var l = s(null), f;
      l.current === null ? (f = {
        hasValue: !1,
        value: null
      }, l.current = f) : f = l.current;
      var b = m(function() {
        var y = !1, h, _, E = function(Y) {
          if (!y) {
            y = !0, h = Y;
            var ye = o(Y);
            if (i !== void 0 && f.hasValue) {
              var we = f.value;
              if (i(we, ye))
                return _ = we, we;
            }
            return _ = ye, ye;
          }
          var Lt = h, Ee = _;
          if (r(Lt, Y))
            return Ee;
          var Oe = o(Y);
          return i !== void 0 && i(Ee, Oe) ? Ee : (h = Y, _ = Oe, Oe);
        }, L = d === void 0 ? null : d, U = function() {
          return E(c());
        }, ge = L === null ? void 0 : function() {
          return E(L());
        };
        return [U, ge];
      }, [c, d, o, i]), R = b[0], w = b[1], v = u(S, R, w);
      return a(function() {
        f.hasValue = !0, f.value = v;
      }, [v]), g(v), v;
    }
    ke.useSyncExternalStoreWithSelector = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = cr() : e.exports = fr();
})(or);
function dr(e, t, n, r) {
  let u = [Wt.run({ fn: (s) => t(s) })];
  if (r && u.unshift(r), n) {
    let s = $({ node: u }), a = e.graphite.id, m = n.additionalLinks, g = m[a] || [];
    return m[a] = g, g.push(s), () => {
      let p = g.indexOf(s);
      p !== -1 && g.splice(p, 1), Ce(s);
    };
  }
  {
    let s = $({ node: u, parent: [e], family: { owners: e } });
    return () => {
      Ce(s);
    };
  }
}
function pr(e, t) {
  Ct.store(e) || wt("expect useStore argument to be a store");
  let n = T.useCallback((u) => dr(e, u, t), [e, t]), r = T.useCallback(() => hr(e, t), [e, t]);
  return mr(n, r, r);
}
function vr(e) {
  let t = T.useContext(Sr);
  return e && !t && wt("No scope found, consider adding <Provider> to app root"), t;
}
function yt(e, t) {
  return pr(e, vr(t == null ? void 0 : t.forceScope));
}
let wt = (e) => {
  throw Error(e);
};
typeof window < "u" ? T.useLayoutEffect : T.useEffect;
const { useSyncExternalStore: mr } = sr, hr = (e, t) => t ? t.getState(e) : e.getState(), Sr = T.createContext(null), _r = (e, t, n) => {
  Ve(() => {
    const r = (u) => {
      u instanceof KeyboardEvent && u.key === n ? t(u) : n || t(u);
    };
    return window.addEventListener(e, r), () => window.removeEventListener(e, r);
  }, [e, n, t]);
}, Et = A(), Ot = A(), bt = A(), Rt = A(), gr = ve({
  virtualView: null,
  virtualPanel: null,
  virtualModal: null,
  virtualPopout: null
}).on(Et, (e, t) => ({
  ...e,
  virtualView: t
})).on(Ot, (e, t) => ({
  ...e,
  virtualPanel: t
})).on(bt, (e, t) => ({
  ...e,
  virtualModal: t
})).on(Rt, (e, t) => ({
  ...e,
  virtualPopout: t
})), Or = (e, ...t) => {
  const { activeView: n, activePanel: r, activeModal: u, activePopout: s, isRouteInit: a, isBackHandled: m } = yr();
  Ve(() => {
    a || (Et(e.view), Ot(e.panel), e.modal && bt(e.modal), e.popout && Rt(e.popout), gt());
  }, [a, e.view, e.panel, e.modal, e.popout]);
  const { virtualView: g, virtualPanel: p, virtualModal: S, virtualPopout: c } = yt(gr);
  Ve(() => {
    const d = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    a && m && (d.view !== g || d.panel !== p || d.modal !== S || d.popout !== c) && (Ie(g), Pe(p), $e(S), Be(c), _t({
      view: n,
      panel: r,
      modal: u,
      popout: s
    }));
  }, [
    g,
    p,
    S,
    c,
    a,
    m
  ]), _r("popstate", async () => {
    a && (await (async () => {
      tt(!1);
      const { view: o, panel: i, modal: l, popout: f } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", o, i, l, f), console.log("storeRoutes", n, r, u, s);
      for (const b in t)
        if (!await t[b]({
          view: n,
          panel: r,
          modal: u,
          popout: s
        }, { view: o, panel: i, modal: l, popout: f }))
          return;
      Ie(o), Pe(i), $e(l), Be(f), tt(!0);
    })(), window.isBackFromBrowser = !0);
  });
}, yr = () => yt(nr), br = (e) => e, Rr = (e, t) => (n, r) => ["view", "panel", "modal", "popout"].some((s) => n[s] === e && n[s] !== r[s]) && window.isBackFromBrowser ? (t && t(n, r), _t(n), !1) : !0;
export {
  $e as _setActiveModal,
  Pe as _setActivePanel,
  Be as _setActivePopout,
  Ie as _setActiveView,
  Er as back,
  Rr as createDisableBackBrowserRouteMiddleware,
  br as createRouteMiddleware,
  _t as historyPush,
  bt as setActiveModal,
  Ot as setActivePanel,
  Rt as setActivePopout,
  Et as setActiveView,
  rr as setRoutes,
  Or as useInitRouter,
  yr as useRouter
};
