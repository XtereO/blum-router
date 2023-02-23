import T, { useEffect as ke } from "react";
function Ot(e, t) {
  for (let n in e)
    t(e[n], n);
}
function k(e, t) {
  e.forEach(t);
}
function $(e, t) {
  if (!e)
    throw Error(t);
}
function N({ node: e = [], from: t, source: n, parent: r = t || n, to: a, target: u, child: o = a || u, scope: m = {}, meta: y = {}, family: d = { type: "regular" }, regional: S } = {}) {
  let c = ue(r), p = ue(d.links), i = ue(d.owners), l = [];
  k(e, (f) => f && D(l, f));
  let s = { id: Mt(), seq: l, next: ue(o), meta: y, scope: m, family: { type: d.type || "crosslink", links: p, owners: i } };
  return k(p, (f) => D(me(f), s)), k(i, (f) => D(ve(f), s)), k(c, (f) => D(f.next, s)), S && G && Be(X(G), [s]), s;
}
function ee(e, t, n) {
  let r, a = M, u = null, o = O;
  if (e.target && (t = e.params, n = e.defer, r = e.meta, a = "page" in e ? e.page : a, e.stack && (u = e.stack), o = I(e) || o, e = e.target), o && O && o !== O && (O = null), Array.isArray(e))
    for (let l = 0; l < e.length; l++)
      P("pure", a, C(e[l]), u, t[l], o, r);
  else
    P("pure", a, C(e), u, t, o, r);
  if (n && !le)
    return;
  let m, y, d, S, c, p, i = { isRoot: le, currentPage: M, scope: O, isWatch: ce, isPure: fe };
  le = 0;
  e:
    for (; S = Wt(); ) {
      let { idx: l, stack: s, type: f } = S;
      d = s.node, M = c = s.page, O = I(s), c ? p = c.reg : O && (p = O.reg);
      let b = !!c, R = !!O, w = { fail: 0, scope: d.scope };
      m = y = 0;
      for (let v = l; v < d.seq.length && !m; v++) {
        let _ = d.seq[v];
        if (_.order) {
          let { priority: h, barrierID: g } = _.order, E = g ? c ? `${c.fullID}_${g}` : g : 0;
          if (v !== l || f !== h) {
            g ? Oe.has(E) || (Oe.add(E), Ve(v, s, h, g)) : Ve(v, s, h);
            continue e;
          }
          g && Oe.delete(E);
        }
        switch (_.type) {
          case "mov": {
            let g, E = _.data;
            switch (E.from) {
              case re:
                g = X(s);
                break;
              case "a":
              case "b":
                g = s[E.from];
                break;
              case "value":
                g = E.store;
                break;
              case "store":
                if (p && !p[E.store.id])
                  if (b) {
                    let L = ct(c, E.store.id);
                    s.page = c = L, L ? p = L.reg : R ? (F(O, E.store, 0, 1, E.softRead), p = O.reg) : p = void 0;
                  } else
                    R && F(O, E.store, 0, 1, E.softRead);
                g = st(p && p[E.store.id] || E.store);
            }
            switch (E.to) {
              case re:
                s.value = g;
                break;
              case "a":
              case "b":
                s[E.to] = g;
                break;
              case "store":
                Ht(c, O, d, E.target).current = g;
            }
            break;
          }
          case "compute":
            let h = _.data;
            if (h.fn) {
              ce = x(d, "op") === "watch", fe = h.pure;
              let g = h.safe ? (0, h.fn)(X(s), w.scope, s) : Kt(w, h.fn, s);
              h.filter ? y = !g : s.value = g, ce = i.isWatch, fe = i.isPure;
            }
        }
        m = w.fail || y;
      }
      if (!m) {
        let v = X(s), _ = I(s);
        if (k(d.next, (h) => {
          P("child", c, h, s, v, _);
        }), _) {
          x(d, "needFxCounter") && P("child", c, _.fxCount, s, v, _), x(d, "storeChange") && P("child", c, _.storeChange, s, v, _), x(d, "warnSerialize") && P("child", c, _.warnSerializeNode, s, v, _);
          let h = _.additionalLinks[d.id];
          h && k(h, (g) => {
            P("child", c, g, s, v, _);
          });
        }
      }
    }
  le = i.isRoot, M = i.currentPage, O = I(i);
}
function bt(e, t) {
  let n, r, a = e;
  if (t) {
    let u = xt(t);
    e.length === 0 ? (n = u.path, r = u.fullName) : (n = u.path.concat([e]), r = u.fullName.length === 0 ? e : u.fullName + "/" + e);
  } else
    n = e.length === 0 ? [] : [e], r = e;
  return { shortName: a, fullName: r, path: n };
}
function Q(e, ...t) {
  let n = ut();
  if (n) {
    let r = n.handlers[e];
    if (r)
      return r(n, ...t);
  }
}
function A(e, t) {
  let n = K({ or: t, and: typeof e == "string" ? { name: e } : e }), r = (o, ...m) => (ne(!x(r, "derived"), "call of derived event", "createEvent"), ne(!fe, "unit call from pure function", "operators like sample"), M ? ((y, d, S, c) => {
    let p = M, i = null;
    if (d)
      for (i = M; i && i.template !== d; )
        i = B(i);
    Je(i);
    let l = y.create(S, c);
    return Je(p), l;
  })(r, a, o, m) : r.create(o, m)), a = ut(), u = Object.assign(r, { graphite: N({ meta: pt("event", r, n), regional: 1 }), create: (o) => (ee({ target: r, params: o, scope: O }), o), watch: (o) => dt(r, o), map: (o) => be(r, te, o, [q()]), filter: (o) => be(r, "filter", o.fn ? o : o.fn, [q(ze, 1)]), filterMap: (o) => be(r, "filterMap", o, [q(), H((m) => !j(m), 1)]), prepend(o) {
    let m = A("* → " + r.shortName, { parent: B(r) });
    return Q("eventPrepend", C(m)), Ge(m, r, [q()], "prepend", o), Ut(r, m), m;
  } });
  return n != null && n.domain && n.domain.hooks.event(u), u;
}
function He(e, t, n, r) {
  return $t(n, t, "first argument"), $(V(r), "second argument should be a function"), ne(!x(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(n) ? n : [n], (a) => {
    e.off(a), pe(e).set(a, ft(mt(a, e, "on", Nt, r)));
  }), e;
}
function $e(e, t) {
  let n = K(t), r = jt(e), a = A({ named: "updates", derived: 1 });
  Q("storeBase", r);
  let u = r.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: a, defaultState: e, stateRef: r, getState() {
    let l, s = r;
    if (M) {
      let f = M;
      for (; f && !f.reg[u]; )
        f = B(f);
      f && (l = f);
    }
    return !l && O && (F(O, r, 1), l = O), l && (s = l.reg[u]), st(s);
  }, setState: (l) => ee({ target: o, params: l, defer: 1, scope: O }), reset: (...l) => (k(l, (s) => He(o, ".reset", s, () => o.defaultState)), o), on: (l, s) => He(o, ".on", l, s), off(l) {
    let s = pe(o).get(l);
    return s && (s(), pe(o).delete(l)), o;
  }, map(l, s) {
    let f, b;
    z(l) && (f = l, l = l.fn), ne(j(s), "second argument of store.map", "updateFilter");
    let R = o.getState();
    j(R) || (b = l(R, s));
    let w = $e(b, { name: `${o.shortName} → *`, derived: 1, and: f }), v = mt(o, w, te, Ue, l);
    return qt(de(w), { type: te, fn: l, from: r }), de(w).noInit = 1, Q("storeMap", r, v), w;
  }, watch(l, s) {
    if (!s || !Ne(l)) {
      let f = dt(o, l);
      return Q("storeWatch", r, l) || l(o.getState()), f;
    }
    return $(V(s), "second argument should be a function"), l.watch((f) => s(o.getState(), f));
  } }, m = pt("store", o, n), y = o.defaultConfig.updateFilter;
  o.graphite = N({ scope: { state: r, fn: y }, node: [H((l, s, f) => (f.scope && !f.scope.reg[r.id] && (f.b = 1), l)), Bt(r), H((l, s, { a: f, b }) => !j(l) && (l !== f || b), 1), y && q(Ue, 1), Se({ from: re, target: r })], child: a, meta: m, regional: 1 });
  let d = x(o, "serialize"), S = x(o, "derived"), c = d === "ignore", p = !d || c ? 0 : d, i = x(o, "sid");
  return i && (c || Z(o, "storeChange", 1), r.sid = i, p && (r.meta = { ...r == null ? void 0 : r.meta, serialize: p })), i || c || S || Z(o, "warnSerialize", 1), $(S || !j(e), "current state can't be undefined, use null instead"), Be(o, [a]), n != null && n.domain && n.domain.hooks.store(o), S || (o.reinit = A(), o.reset(o.reinit)), o;
}
function Rt() {
  let e = {};
  return e.req = new Promise((t, n) => {
    e.rs = t, e.rj = n;
  }), e.req.catch(() => {
  }), e;
}
function ot(e, t) {
  let n = K(V(e) ? { handler: e } : e, t), r = A(V(e) ? { handler: e } : e, t), a = C(r);
  Z(a, "op", r.kind = "effect"), r.use = (i) => ($(V(i), ".use argument should be a function"), S.scope.handler = i, r), r.use.getCurrent = () => S.scope.handler;
  let u = r.finally = A({ named: "finally", derived: 1 }), o = r.done = u.filterMap({ named: "done", fn({ status: i, params: l, result: s }) {
    if (i === "done")
      return { params: l, result: s };
  } }), m = r.fail = u.filterMap({ named: "fail", fn({ status: i, params: l, error: s }) {
    if (i === "fail")
      return { params: l, error: s };
  } }), y = r.doneData = o.map({ named: "doneData", fn: ({ result: i }) => i }), d = r.failData = m.map({ named: "failData", fn: ({ error: i }) => i }), S = N({ scope: { handlerId: x(a, "sid"), handler: r.defaultConfig.handler || (() => $(0, `no handler used in ${r.getType()}`)) }, node: [H((i, l, s) => {
    let f = l, b = f.handler;
    if (I(s)) {
      let R = I(s).handlers[f.handlerId];
      R && (b = R);
    }
    return i.handler = b, i;
  }, 0, 1), H(({ params: i, req: l, handler: s, args: f = [i] }, b, R) => {
    let w = Jt(R), v = Xe(i, l, 1, u, R, w), _ = Xe(i, l, 0, u, R, w), [h, g] = Yt(s, _, f);
    h && (z(g) && V(g.then) ? g.then(v, _) : v(g));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  a.scope.runner = S, D(a.seq, H((i, { runner: l }, s) => {
    let f = B(s) ? { params: i, req: { rs(b) {
    }, rj(b) {
    } } } : i;
    return s.meta || (s.meta = { fxID: Tt() }), ee({ target: l, params: f, defer: 1, scope: I(s), meta: s.meta }), f.params;
  }, 0, 1)), r.create = (i) => {
    let l = Rt(), s = { params: i, req: l };
    if (O && !ce) {
      let f = O;
      l.req.finally(() => {
        Gt(f);
      }).catch(() => {
      });
    }
    return ee({ target: r, params: s, scope: O }), l.req;
  };
  let c = r.inFlight = $e(0, { serialize: "ignore" }).on(r, (i) => i + 1).on(u, (i) => i - 1).map({ fn: (i) => i, named: "inFlight" });
  Z(u, "needFxCounter", "dec"), Z(r, "needFxCounter", 1);
  let p = r.pending = c.map({ fn: (i) => i > 0, named: "pending" });
  return Be(r, [u, o, m, y, d, p, c]), n != null && n.domain && n.domain.hooks.effect(r), r;
}
let Lt = typeof Symbol < "u" && Symbol.observable || "@@observable", te = "map", re = "stack", C = (e) => e.graphite || e, me = (e) => e.family.owners, ve = (e) => e.family.links, de = (e) => e.stateRef, X = (e) => e.value, pe = (e) => e.subscribers, B = (e) => e.parent, I = (e) => e.scope, x = (e, t) => C(e).meta[t], Z = (e, t, n) => C(e).meta[t] = n, xt = (e) => e.compositeName, Ne = (e) => (V(e) || z(e)) && "kind" in e;
const ie = (e) => (t) => Ne(t) && t.kind === e;
let Pe = ie("store"), At = ie("event"), Fe = ie("effect"), at = ie("domain"), kt = ie("scope");
var Vt = { __proto__: null, unit: Ne, store: Pe, event: At, effect: Fe, domain: at, scope: kt, attached: (e) => Fe(e) && x(e, "attached") == 1 };
let se = (e, t) => {
  let n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}, D = (e, t) => e.push(t), ne = (e, t, n) => !e && console.error(`${t} is deprecated${n ? `, use ${n} instead` : ""}`);
const he = () => {
  let e = 0;
  return () => "" + ++e;
};
let Dt = he(), it = he(), Mt = he(), Tt = he(), G = null, ut = () => G, Ct = (e) => (e && G && G.sidRoot && (e = `${G.sidRoot}|${e}`), e), Be = (e, t) => {
  let n = C(e);
  k(t, (r) => {
    let a = C(r);
    n.family.type !== "domain" && (a.family.type = "crosslink"), D(me(a), n), D(ve(n), a);
  });
}, ue = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(C), z = (e) => typeof e == "object" && e !== null, V = (e) => typeof e == "function", j = (e) => e === void 0, It = (e) => $(z(e) || V(e), "expect first argument be an object");
const Ke = (e, t, n, r) => $(!(!z(e) && !V(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${n} to be a unit (store, event or effect)${r}`);
let $t = (e, t, n) => {
  Array.isArray(e) ? k(e, (r, a) => Ke(r, t, `${a} item of ${n}`, "")) : Ke(e, t, n, " or array of units");
}, Ue = (e, { fn: t }, { a: n }) => t(e, n), Nt = (e, { fn: t }, { a: n }) => t(n, e), ze = (e, { fn: t }) => t(e);
const lt = (e, t, n, r) => {
  let a = { id: it(), type: e, data: t };
  return n && (a.order = { priority: n }, r && (a.order.barrierID = ++Pt)), a;
};
let Pt = 0, Se = ({ from: e = "store", store: t, target: n, to: r = n ? "store" : re, batch: a, priority: u }) => lt("mov", { from: e, store: t, to: r, target: n }, u, a), oe = ({ fn: e, batch: t, priority: n, safe: r = 0, filter: a = 0, pure: u = 0 }) => lt("compute", { fn: e, safe: r, filter: a, pure: u }, n, t), je = ({ fn: e }) => oe({ fn: e, priority: "effect" }), H = (e, t, n) => oe({ fn: e, safe: 1, filter: t, priority: n && "effect" }), Bt = (e, t, n) => Se({ store: e, to: t ? re : "a", priority: n && "sampler", batch: 1 }), q = (e = ze, t) => oe({ fn: e, pure: 1, filter: t }), zt = { mov: Se, compute: oe, filter: ({ fn: e, pure: t }) => oe({ fn: e, filter: 1, pure: t }), run: je }, jt = (e) => ({ id: it(), current: e }), st = ({ current: e }) => e, qt = (e, t) => {
  e.before || (e.before = []), D(e.before, t);
}, W = null;
const qe = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let n;
  return (e.v.type === t.v.type && e.v.id > t.v.id || De(e.v.type) > De(t.v.type)) && (n = e, e = t, t = n), n = qe(e.r, t), e.r = e.l, e.l = n, e;
}, We = [];
let Ye = 0;
for (; Ye < 6; )
  D(We, { first: null, last: null, size: 0 }), Ye += 1;
const Wt = () => {
  for (let e = 0; e < 6; e++) {
    let t = We[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let r = W.v;
        return W = qe(W.l, W.r), r;
      }
      t.size === 1 && (t.last = null);
      let n = t.first;
      return t.first = n.r, t.size -= 1, n.v;
    }
  }
}, P = (e, t, n, r, a, u, o) => Ve(0, { a: null, b: null, node: n, parent: r, value: a, page: t, scope: u, meta: o }, e), Ve = (e, t, n, r = 0) => {
  let a = De(n), u = We[a], o = { v: { idx: e, stack: t, type: n, id: r }, l: null, r: null };
  a === 3 || a === 4 ? W = qe(W, o) : (u.size === 0 ? u.first = o : u.last.r = o, u.last = o), u.size += 1;
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
}, Oe = /* @__PURE__ */ new Set();
let O, le = 1, ce = 0, fe = 0, M = null, Gt = (e) => {
  O = e;
}, Je = (e) => {
  M = e;
};
const ct = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = B(e);
    if (e)
      return e;
  }
  return null;
};
let Ht = (e, t, n, r, a) => {
  let u = ct(e, r.id);
  return u ? u.reg[r.id] : t ? (F(t, r, a), t.reg[r.id]) : r;
};
const Ft = (e) => e;
let F = (e, t, n, r, a) => {
  var u;
  let o = e.reg, m = t.sid, y = t == null || (u = t.meta) === null || u === void 0 ? void 0 : u.serialize;
  if (o[t.id])
    return;
  let d = { id: t.id, current: t.current, meta: t.meta };
  if (m && m in e.sidValuesMap && !(m in e.sidIdMap))
    d.current = (e.fromSerialize && y !== "ignore" && (y == null ? void 0 : y.read) || Ft)(e.sidValuesMap[m]);
  else if (t.before && !a) {
    let S = 0, c = n || !t.noInit || r;
    k(t.before, (p) => {
      switch (p.type) {
        case te: {
          let i = p.from;
          if (i || p.fn) {
            i && F(e, i, n, r);
            let l = i && o[i.id].current;
            c && (d.current = p.fn ? p.fn(l) : l);
          }
          break;
        }
        case "field":
          S || (S = 1, d.current = Array.isArray(d.current) ? [...d.current] : { ...d.current }), F(e, p.from, n, r), c && (d.current[p.field] = o[o[p.from.id].id].current);
      }
    });
  }
  m && (e.sidIdMap[m] = t.id), o[t.id] = d;
};
const Kt = (e, t, n) => {
  try {
    return t(X(n), e.scope, n);
  } catch (r) {
    console.error(r), e.fail = 1;
  }
};
let K = (e, t = {}) => (z(e) && (K(e.or, t), Ot(e, (n, r) => {
  j(n) || r === "or" || r === "and" || (t[r] = n);
}), K(e.and, t)), t);
const Qe = (e, t) => {
  se(e.next, t), se(me(e), t), se(ve(e), t);
}, Me = (e, t, n) => {
  let r;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let a = ve(e);
  for (; r = a.pop(); )
    Qe(r, e), (t || n && x(e, "op") !== "sample" || r.family.type === "crosslink") && Me(r, t, x(r, "op") !== "on" && n);
  for (a = me(e); r = a.pop(); )
    Qe(r, e), n && r.family.type === "crosslink" && Me(r, t, x(r, "op") !== "on" && n);
}, J = (e) => e.clear();
let Te = (e, { deep: t } = {}) => {
  let n = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Pe(e))
    J(pe(e));
  else if (at(e)) {
    n = 1;
    let r = e.history;
    J(r.events), J(r.effects), J(r.stores), J(r.domains);
  }
  Me(C(e), !!t, n);
}, ft = (e) => {
  let t = () => Te(e);
  return t.unsubscribe = t, t;
}, Ge = (e, t, n, r, a) => N({ node: n, parent: e, child: t, scope: { fn: a }, meta: { op: r }, family: { owners: [e, t], links: t }, regional: 1 }), dt = (e, t) => ($(V(t), ".watch argument should be a function"), ft(N({ scope: { fn: t }, node: [je({ fn: ze })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Ut = (e, t, n = "event") => {
  B(e) && B(e).hooks[n](t);
}, pt = (e, t, n) => {
  let r = K(n), a = e === "domain", u = Dt(), { sid: o = null, named: m = null, domain: y = null, parent: d = y } = r, S = m || r.name || (a ? "" : u), c = bt(S, d), p = { op: t.kind = e, name: t.shortName = S, sid: t.sid = Ct(o), named: m, unitId: t.id = u, serialize: r.serialize, derived: r.derived, config: r };
  return t.parent = d, t.compositeName = c, t.defaultConfig = r, t.thru = (i) => (ne(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !a && (t.subscribe = (i) => (It(i), t.watch(V(i) ? i : (l) => i.next && i.next(l))), t[Lt] = () => t), p;
};
const be = (e, t, n, r) => {
  let a;
  z(n) && (a = n, n = n.fn);
  let u = A({ name: `${e.shortName} → *`, derived: 1, and: a });
  return Ge(e, u, r, t, n), u;
}, mt = (e, t, n, r, a) => {
  let u = de(t), o = Se({ store: u, to: "a", priority: "read" });
  n === te && (o.data.softRead = 1);
  let m = [o, q(r)];
  return Q("storeOnMap", u, m, Pe(e) && de(e)), Ge(e, t, m, n, a);
};
let Yt = (e, t, n) => {
  try {
    return [1, e(...n)];
  } catch (r) {
    return t(r), [0, null];
  }
}, Jt = (e) => {
  let t = I(e), n = { ref: t };
  return t && D(t.activeEffects, n), n;
}, Xe = (e, t, n, r, a, u) => (o) => {
  u.ref && se(u.ref.activeEffects, u), ee({ target: [r, Qt], params: [n ? { status: "done", params: e, result: o } : { status: "fail", params: e, error: o }, { value: o, fn: n ? t.rs : t.rj }], defer: 1, page: a.page, scope: u.ref, meta: a.meta });
};
const Qt = N({ node: [je({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), gr = ot(() => {
  window.isBackFromBrowser = !1, window.history.back();
}), vt = ot((e) => {
  window.history.pushState(e, "");
}), Ce = A(), Ie = A(), ht = A(), St = A(), gt = A(), yt = A(), Xt = A(), _t = A(), Zt = $e({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1
}).on(Ce, (e, t) => ({
  ...e,
  activeView: t
})).on(Ie, (e, t) => ({
  ...e,
  activePanel: t
})).on(ht, (e, t) => ({
  ...e,
  activeModal: t
})).on(gt, (e, t) => ({
  ...e,
  activeModal: t
})).on(St, (e, t) => ({
  ...e,
  activePopout: t
})).on(yt, (e, t) => ({
  ...e,
  activePopout: t
})).on(_t, (e) => ({
  ...e,
  isRouteInit: !0
})).on(Xt, (e, t) => ({
  ...e,
  activeView: t.hasOwnProperty("view") ? t.view : e.activeView,
  activePanel: t.hasOwnProperty("panel") ? t.panel : e.activePanel,
  activeModal: t.hasOwnProperty("modal") ? t.modal : e.activeModal,
  activePopout: t.hasOwnProperty("popout") ? t.popout : e.activePopout
}));
function er(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ze = {}, tr = {
  get exports() {
    return Ze;
  },
  set exports(e) {
    Ze = e;
  }
}, Re = {}, ae = {}, rr = {
  get exports() {
    return ae;
  },
  set exports(e) {
    ae = e;
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
var et;
function nr() {
  if (et)
    return Le;
  et = 1;
  var e = T;
  function t(c, p) {
    return c === p && (c !== 0 || 1 / c === 1 / p) || c !== c && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, a = e.useEffect, u = e.useLayoutEffect, o = e.useDebugValue;
  function m(c, p) {
    var i = p(), l = r({ inst: { value: i, getSnapshot: p } }), s = l[0].inst, f = l[1];
    return u(function() {
      s.value = i, s.getSnapshot = p, y(s) && f({ inst: s });
    }, [c, i, p]), a(function() {
      return y(s) && f({ inst: s }), c(function() {
        y(s) && f({ inst: s });
      });
    }, [c]), o(i), i;
  }
  function y(c) {
    var p = c.getSnapshot;
    c = c.value;
    try {
      var i = p();
      return !n(c, i);
    } catch {
      return !0;
    }
  }
  function d(c, p) {
    return p();
  }
  var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? d : m;
  return Le.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S, Le;
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
var tt;
function or() {
  return tt || (tt = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(w) {
      {
        for (var v = arguments.length, _ = new Array(v > 1 ? v - 1 : 0), h = 1; h < v; h++)
          _[h - 1] = arguments[h];
        r("error", w, _);
      }
    }
    function r(w, v, _) {
      {
        var h = t.ReactDebugCurrentFrame, g = h.getStackAddendum();
        g !== "" && (v += "%s", _ = _.concat([g]));
        var E = _.map(function(L) {
          return String(L);
        });
        E.unshift("Warning: " + v), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function a(w, v) {
      return w === v && (w !== 0 || 1 / w === 1 / v) || w !== w && v !== v;
    }
    var u = typeof Object.is == "function" ? Object.is : a, o = e.useState, m = e.useEffect, y = e.useLayoutEffect, d = e.useDebugValue, S = !1, c = !1;
    function p(w, v, _) {
      S || e.startTransition !== void 0 && (S = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var h = v();
      if (!c) {
        var g = v();
        u(h, g) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var E = o({
        inst: {
          value: h,
          getSnapshot: v
        }
      }), L = E[0].inst, U = E[1];
      return y(function() {
        L.value = h, L.getSnapshot = v, i(L) && U({
          inst: L
        });
      }, [w, h, v]), m(function() {
        i(L) && U({
          inst: L
        });
        var ge = function() {
          i(L) && U({
            inst: L
          });
        };
        return w(ge);
      }, [w]), d(h), h;
    }
    function i(w) {
      var v = w.getSnapshot, _ = w.value;
      try {
        var h = v();
        return !u(_, h);
      } catch {
        return !0;
      }
    }
    function l(w, v, _) {
      return v();
    }
    var s = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", f = !s, b = f ? l : p, R = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    xe.useSyncExternalStore = R, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), xe;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = nr() : e.exports = or();
})(rr);
const ar = /* @__PURE__ */ er(ae);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rt;
function ir() {
  if (rt)
    return Re;
  rt = 1;
  var e = T, t = ae;
  function n(d, S) {
    return d === S && (d !== 0 || 1 / d === 1 / S) || d !== d && S !== S;
  }
  var r = typeof Object.is == "function" ? Object.is : n, a = t.useSyncExternalStore, u = e.useRef, o = e.useEffect, m = e.useMemo, y = e.useDebugValue;
  return Re.useSyncExternalStoreWithSelector = function(d, S, c, p, i) {
    var l = u(null);
    if (l.current === null) {
      var s = { hasValue: !1, value: null };
      l.current = s;
    } else
      s = l.current;
    l = m(function() {
      function b(h) {
        if (!R) {
          if (R = !0, w = h, h = p(h), i !== void 0 && s.hasValue) {
            var g = s.value;
            if (i(g, h))
              return v = g;
          }
          return v = h;
        }
        if (g = v, r(w, h))
          return g;
        var E = p(h);
        return i !== void 0 && i(g, E) ? g : (w = h, v = E);
      }
      var R = !1, w, v, _ = c === void 0 ? null : c;
      return [function() {
        return b(S());
      }, _ === null ? void 0 : function() {
        return b(_());
      }];
    }, [S, c, p, i]);
    var f = a(d, l[0], l[1]);
    return o(function() {
      s.hasValue = !0, s.value = f;
    }, [f]), y(f), f;
  }, Re;
}
var Ae = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function ur() {
  return nt || (nt = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = T, t = ae;
    function n(S, c) {
      return S === c && (S !== 0 || 1 / S === 1 / c) || S !== S && c !== c;
    }
    var r = typeof Object.is == "function" ? Object.is : n, a = t.useSyncExternalStore, u = e.useRef, o = e.useEffect, m = e.useMemo, y = e.useDebugValue;
    function d(S, c, p, i, l) {
      var s = u(null), f;
      s.current === null ? (f = {
        hasValue: !1,
        value: null
      }, s.current = f) : f = s.current;
      var b = m(function() {
        var _ = !1, h, g, E = function(Y) {
          if (!_) {
            _ = !0, h = Y;
            var ye = i(Y);
            if (l !== void 0 && f.hasValue) {
              var _e = f.value;
              if (l(_e, ye))
                return g = _e, _e;
            }
            return g = ye, ye;
          }
          var Et = h, we = g;
          if (r(Et, Y))
            return we;
          var Ee = i(Y);
          return l !== void 0 && l(we, Ee) ? we : (h = Y, g = Ee, Ee);
        }, L = p === void 0 ? null : p, U = function() {
          return E(c());
        }, ge = L === null ? void 0 : function() {
          return E(L());
        };
        return [U, ge];
      }, [c, p, i, l]), R = b[0], w = b[1], v = a(S, R, w);
      return o(function() {
        f.hasValue = !0, f.value = v;
      }, [v]), y(v), v;
    }
    Ae.useSyncExternalStoreWithSelector = d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ae;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ir() : e.exports = ur();
})(tr);
function lr(e, t, n, r) {
  let a = [zt.run({ fn: (u) => t(u) })];
  if (r && a.unshift(r), n) {
    let u = N({ node: a }), o = e.graphite.id, m = n.additionalLinks, y = m[o] || [];
    return m[o] = y, y.push(u), () => {
      let d = y.indexOf(u);
      d !== -1 && y.splice(d, 1), Te(u);
    };
  }
  {
    let u = N({ node: a, parent: [e], family: { owners: e } });
    return () => {
      Te(u);
    };
  }
}
function sr(e, t) {
  Vt.store(e) || wt("expect useStore argument to be a store");
  let n = T.useCallback((a) => lr(e, a, t), [e, t]), r = T.useCallback(() => pr(e, t), [e, t]);
  return dr(n, r, r);
}
function cr(e) {
  let t = T.useContext(mr);
  return e && !t && wt("No scope found, consider adding <Provider> to app root"), t;
}
function fr(e, t) {
  return sr(e, cr(t == null ? void 0 : t.forceScope));
}
let wt = (e) => {
  throw Error(e);
};
typeof window < "u" ? T.useLayoutEffect : T.useEffect;
const { useSyncExternalStore: dr } = ar, pr = (e, t) => t ? t.getState(e) : e.getState(), mr = T.createContext(null), vr = (e, t, n) => {
  ke(() => {
    const r = (a) => {
      a instanceof KeyboardEvent && a.key === n ? t(a) : n || t(a);
    };
    return window.addEventListener(e, r), () => window.removeEventListener(e, r);
  }, [e, n, t]);
}, yr = (e, ...t) => {
  const { activeView: n, activePanel: r, activeModal: a, activePopout: u, isRouteInit: o } = hr();
  ke(() => {
    o || (Ce(e.view), Ie(e.panel), e.modal && ht(e.modal), e.popout && St(e.popout), _t());
  }, [o, e.view, e.panel, e.modal, e.popout]), ke(() => {
    const m = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    o && (m.view !== n || m.panel !== r || m.modal !== a || m.popout !== u) && vt({
      view: n,
      panel: r,
      modal: a,
      popout: u
    });
  }, [n, r, a, u, o]), vr("popstate", async () => {
    o && (await (async () => {
      const { view: y, panel: d, modal: S, popout: c } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", y, d, S, c), console.log("storeRoutes", n, r, a, u);
      for (const p in t)
        if (!await t[p]({
          view: n,
          panel: r,
          modal: a,
          popout: u
        }, { view: y, panel: d, modal: S, popout: c }))
          return;
      Ce(y), Ie(d), gt(S), yt(c);
    })(), window.isBackFromBrowser = !0);
  });
}, hr = () => fr(Zt), _r = (e) => e, wr = (e, t) => (n, r) => ["view", "panel", "modal", "popout"].some((u) => n[u] === e && n[u] !== r[u]) && window.isBackFromBrowser ? (t && t(n, r), vt(n), !1) : !0;
export {
  gt as _setActiveModal,
  yt as _setActivePopout,
  gr as back,
  wr as createDisableBackBrowserRouteMiddleware,
  _r as createRouteMiddleware,
  vt as historyPush,
  ht as setActiveModal,
  Ie as setActivePanel,
  St as setActivePopout,
  Ce as setActiveView,
  Xt as setRoutes,
  yr as useInitRouter,
  hr as useRouter
};
