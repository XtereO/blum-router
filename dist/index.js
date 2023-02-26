import M, { useEffect as $e } from "react";
function wt(e, t) {
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
function B({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: l, child: a = o || l, scope: v = {}, meta: _ = {}, family: f = { type: "regular" }, regional: h } = {}) {
  let c = le(n), p = le(f.links), i = le(f.owners), s = [];
  k(e, (d) => d && C(s, d));
  let u = { id: Vt(), seq: s, next: le(a), meta: _, scope: v, family: { type: f.type || "crosslink", links: p, owners: i } };
  return k(p, (d) => C(he(d), u)), k(i, (d) => C(Se(d), u)), k(c, (d) => C(d.next, u)), h && G && ze(ee(G), [u]), u;
}
function re(e, t, r) {
  let n, o = D, l = null, a = O;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (l = e.stack), a = I(e) || a, e = e.target), a && O && a !== O && (O = null), Array.isArray(e))
    for (let s = 0; s < e.length; s++)
      N("pure", o, T(e[s]), l, t[s], a, n);
  else
    N("pure", o, T(e), l, t, a, n);
  if (r && !ce)
    return;
  let v, _, f, h, c, p, i = { isRoot: ce, currentPage: D, scope: O, isWatch: de, isPure: pe };
  ce = 0;
  e:
    for (; h = jt(); ) {
      let { idx: s, stack: u, type: d } = h;
      f = u.node, D = c = u.page, O = I(u), c ? p = c.reg : O && (p = O.reg);
      let b = !!c, L = !!O, w = { fail: 0, scope: f.scope };
      v = _ = 0;
      for (let m = s; m < f.seq.length && !v; m++) {
        let y = f.seq[m];
        if (y.order) {
          let { priority: S, barrierID: g } = y.order, E = g ? c ? `${c.fullID}_${g}` : g : 0;
          if (m !== s || d !== S) {
            g ? Le.has(E) || (Le.add(E), Ce(m, u, S, g)) : Ce(m, u, S);
            continue e;
          }
          g && Le.delete(E);
        }
        switch (y.type) {
          case "mov": {
            let g, E = y.data;
            switch (E.from) {
              case ae:
                g = ee(u);
                break;
              case "a":
              case "b":
                g = u[E.from];
                break;
              case "value":
                g = E.store;
                break;
              case "store":
                if (p && !p[E.store.id])
                  if (b) {
                    let R = ct(c, E.store.id);
                    u.page = c = R, R ? p = R.reg : L ? (F(O, E.store, 0, 1, E.softRead), p = O.reg) : p = void 0;
                  } else
                    L && F(O, E.store, 0, 1, E.softRead);
                g = lt(p && p[E.store.id] || E.store);
            }
            switch (E.to) {
              case ae:
                u.value = g;
                break;
              case "a":
              case "b":
                u[E.to] = g;
                break;
              case "store":
                Wt(c, O, f, E.target).current = g;
            }
            break;
          }
          case "compute":
            let S = y.data;
            if (S.fn) {
              de = A(f, "op") === "watch", pe = S.pure;
              let g = S.safe ? (0, S.fn)(ee(u), w.scope, u) : Ht(w, S.fn, u);
              S.filter ? _ = !g : u.value = g, de = i.isWatch, pe = i.isPure;
            }
        }
        v = w.fail || _;
      }
      if (!v) {
        let m = ee(u), y = I(u);
        if (k(f.next, (S) => {
          N("child", c, S, u, m, y);
        }), y) {
          A(f, "needFxCounter") && N("child", c, y.fxCount, u, m, y), A(f, "storeChange") && N("child", c, y.storeChange, u, m, y), A(f, "warnSerialize") && N("child", c, y.warnSerializeNode, u, m, y);
          let S = y.additionalLinks[f.id];
          S && k(S, (g) => {
            N("child", c, g, u, m, y);
          });
        }
      }
    }
  ce = i.isRoot, D = i.currentPage, O = I(i);
}
function Et(e, t) {
  let r, n, o = e;
  if (t) {
    let l = Lt(t);
    e.length === 0 ? (r = l.path, n = l.fullName) : (r = l.path.concat([e]), n = l.fullName.length === 0 ? e : l.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: o, fullName: n, path: r };
}
function Z(e, ...t) {
  let r = st();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function x(e, t) {
  let r = K({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (a, ...v) => (oe(!A(n, "derived"), "call of derived event", "createEvent"), oe(!pe, "unit call from pure function", "operators like sample"), D ? ((_, f, h, c) => {
    let p = D, i = null;
    if (f)
      for (i = D; i && i.template !== f; )
        i = P(i);
    Qe(i);
    let s = _.create(h, c);
    return Qe(p), s;
  })(n, o, a, v) : n.create(a, v)), o = st(), l = Object.assign(n, { graphite: B({ meta: pt("event", n, r), regional: 1 }), create: (a) => (re({ target: n, params: a, scope: O }), a), watch: (a) => dt(n, a), map: (a) => Re(n, ne, a, [q()]), filter: (a) => Re(n, "filter", a.fn ? a : a.fn, [q(je, 1)]), filterMap: (a) => Re(n, "filterMap", a, [q(), H((v) => !j(v), 1)]), prepend(a) {
    let v = x("* → " + n.shortName, { parent: P(n) });
    return Z("eventPrepend", T(v)), He(v, n, [q()], "prepend", a), Ft(n, v), v;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), l;
}
function Fe(e, t, r, n) {
  return Tt(r, t, "first argument"), $(V(n), "second argument should be a function"), oe(!A(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), me(e).set(o, ft(vt(o, e, "on", It, n)));
  }), e;
}
function Be(e, t) {
  let r = K(t), n = Pt(e), o = x({ named: "updates", derived: 1 });
  Z("storeBase", n);
  let l = n.id, a = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let s, u = n;
    if (D) {
      let d = D;
      for (; d && !d.reg[l]; )
        d = P(d);
      d && (s = d);
    }
    return !s && O && (F(O, n, 1), s = O), s && (u = s.reg[l]), lt(u);
  }, setState: (s) => re({ target: a, params: s, defer: 1, scope: O }), reset: (...s) => (k(s, (u) => Fe(a, ".reset", u, () => a.defaultState)), a), on: (s, u) => Fe(a, ".on", s, u), off(s) {
    let u = me(a).get(s);
    return u && (u(), me(a).delete(s)), a;
  }, map(s, u) {
    let d, b;
    z(s) && (d = s, s = s.fn), oe(j(u), "second argument of store.map", "updateFilter");
    let L = a.getState();
    j(L) || (b = s(L, u));
    let w = Be(b, { name: `${a.shortName} → *`, derived: 1, and: d }), m = vt(a, w, ne, Ye, s);
    return zt(ve(w), { type: ne, fn: s, from: n }), ve(w).noInit = 1, Z("storeMap", n, m), w;
  }, watch(s, u) {
    if (!u || !Ne(s)) {
      let d = dt(a, s);
      return Z("storeWatch", n, s) || s(a.getState()), d;
    }
    return $(V(u), "second argument should be a function"), s.watch((d) => u(a.getState(), d));
  } }, v = pt("store", a, r), _ = a.defaultConfig.updateFilter;
  a.graphite = B({ scope: { state: n, fn: _ }, node: [H((s, u, d) => (d.scope && !d.scope.reg[n.id] && (d.b = 1), s)), Bt(n), H((s, u, { a: d, b }) => !j(s) && (s !== d || b), 1), _ && q(Ye, 1), _e({ from: ae, target: n })], child: o, meta: v, regional: 1 });
  let f = A(a, "serialize"), h = A(a, "derived"), c = f === "ignore", p = !f || c ? 0 : f, i = A(a, "sid");
  return i && (c || te(a, "storeChange", 1), n.sid = i, p && (n.meta = { ...n == null ? void 0 : n.meta, serialize: p })), i || c || h || te(a, "warnSerialize", 1), $(h || !j(e), "current state can't be undefined, use null instead"), ze(a, [o]), r != null && r.domain && r.domain.hooks.store(a), h || (a.reinit = x(), a.reset(a.reinit)), a;
}
function Ot() {
  let e = {};
  return e.req = new Promise((t, r) => {
    e.rs = t, e.rj = r;
  }), e.req.catch(() => {
  }), e;
}
function U(e, t) {
  let r = K(V(e) ? { handler: e } : e, t), n = x(V(e) ? { handler: e } : e, t), o = T(n);
  te(o, "op", n.kind = "effect"), n.use = (i) => ($(V(i), ".use argument should be a function"), h.scope.handler = i, n), n.use.getCurrent = () => h.scope.handler;
  let l = n.finally = x({ named: "finally", derived: 1 }), a = n.done = l.filterMap({ named: "done", fn({ status: i, params: s, result: u }) {
    if (i === "done")
      return { params: s, result: u };
  } }), v = n.fail = l.filterMap({ named: "fail", fn({ status: i, params: s, error: u }) {
    if (i === "fail")
      return { params: s, error: u };
  } }), _ = n.doneData = a.map({ named: "doneData", fn: ({ result: i }) => i }), f = n.failData = v.map({ named: "failData", fn: ({ error: i }) => i }), h = B({ scope: { handlerId: A(o, "sid"), handler: n.defaultConfig.handler || (() => $(0, `no handler used in ${n.getType()}`)) }, node: [H((i, s, u) => {
    let d = s, b = d.handler;
    if (I(u)) {
      let L = I(u).handlers[d.handlerId];
      L && (b = L);
    }
    return i.handler = b, i;
  }, 0, 1), H(({ params: i, req: s, handler: u, args: d = [i] }, b, L) => {
    let w = Ut(L), m = Ze(i, s, 1, l, L, w), y = Ze(i, s, 0, l, L, w), [S, g] = Kt(u, y, d);
    S && (z(g) && V(g.then) ? g.then(m, y) : m(g));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  o.scope.runner = h, C(o.seq, H((i, { runner: s }, u) => {
    let d = P(u) ? { params: i, req: { rs(b) {
    }, rj(b) {
    } } } : i;
    return u.meta || (u.meta = { fxID: Ct() }), re({ target: s, params: d, defer: 1, scope: I(u), meta: u.meta }), d.params;
  }, 0, 1)), n.create = (i) => {
    let s = Ot(), u = { params: i, req: s };
    if (O && !de) {
      let d = O;
      s.req.finally(() => {
        qt(d);
      }).catch(() => {
      });
    }
    return re({ target: n, params: u, scope: O }), s.req;
  };
  let c = n.inFlight = Be(0, { serialize: "ignore" }).on(n, (i) => i + 1).on(l, (i) => i - 1).map({ fn: (i) => i, named: "inFlight" });
  te(l, "needFxCounter", "dec"), te(n, "needFxCounter", 1);
  let p = n.pending = c.map({ fn: (i) => i > 0, named: "pending" });
  return ze(n, [l, a, v, _, f, p, c]), r != null && r.domain && r.domain.hooks.effect(n), n;
}
let bt = typeof Symbol < "u" && Symbol.observable || "@@observable", ne = "map", ae = "stack", T = (e) => e.graphite || e, he = (e) => e.family.owners, Se = (e) => e.family.links, ve = (e) => e.stateRef, ee = (e) => e.value, me = (e) => e.subscribers, P = (e) => e.parent, I = (e) => e.scope, A = (e, t) => T(e).meta[t], te = (e, t, r) => T(e).meta[t] = r, Lt = (e) => e.compositeName, Ne = (e) => (V(e) || z(e)) && "kind" in e;
const ue = (e) => (t) => Ne(t) && t.kind === e;
let Pe = ue("store"), Rt = ue("event"), Ke = ue("effect"), ot = ue("domain"), At = ue("scope");
var xt = { __proto__: null, unit: Ne, store: Pe, event: Rt, effect: Ke, domain: ot, scope: At, attached: (e) => Ke(e) && A(e, "attached") == 1 };
let fe = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, C = (e, t) => e.push(t), oe = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const ge = () => {
  let e = 0;
  return () => "" + ++e;
};
let kt = ge(), it = ge(), Vt = ge(), Ct = ge(), G = null, st = () => G, Dt = (e) => (e && G && G.sidRoot && (e = `${G.sidRoot}|${e}`), e), ze = (e, t) => {
  let r = T(e);
  k(t, (n) => {
    let o = T(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), C(he(o), r), C(Se(r), o);
  });
}, le = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(T), z = (e) => typeof e == "object" && e !== null, V = (e) => typeof e == "function", j = (e) => e === void 0, Mt = (e) => $(z(e) || V(e), "expect first argument be an object");
const Ue = (e, t, r, n) => $(!(!z(e) && !V(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let Tt = (e, t, r) => {
  Array.isArray(e) ? k(e, (n, o) => Ue(n, t, `${o} item of ${r}`, "")) : Ue(e, t, r, " or array of units");
}, Ye = (e, { fn: t }, { a: r }) => t(e, r), It = (e, { fn: t }, { a: r }) => t(r, e), je = (e, { fn: t }) => t(e);
const ut = (e, t, r, n) => {
  let o = { id: it(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++$t)), o;
};
let $t = 0, _e = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : ae, batch: o, priority: l }) => ut("mov", { from: e, store: t, to: n, target: r }, l, o), ie = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: l = 0 }) => ut("compute", { fn: e, safe: n, filter: o, pure: l }, r, t), qe = ({ fn: e }) => ie({ fn: e, priority: "effect" }), H = (e, t, r) => ie({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Bt = (e, t, r) => _e({ store: e, to: t ? ae : "a", priority: r && "sampler", batch: 1 }), q = (e = je, t) => ie({ fn: e, pure: 1, filter: t }), Nt = { mov: _e, compute: ie, filter: ({ fn: e, pure: t }) => ie({ fn: e, filter: 1, pure: t }), run: qe }, Pt = (e) => ({ id: it(), current: e }), lt = ({ current: e }) => e, zt = (e, t) => {
  e.before || (e.before = []), C(e.before, t);
}, W = null;
const We = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || De(e.v.type) > De(t.v.type)) && (r = e, e = t, t = r), r = We(e.r, t), e.r = e.l, e.l = r, e;
}, Ge = [];
let Je = 0;
for (; Je < 6; )
  C(Ge, { first: null, last: null, size: 0 }), Je += 1;
const jt = () => {
  for (let e = 0; e < 6; e++) {
    let t = Ge[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = W.v;
        return W = We(W.l, W.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, N = (e, t, r, n, o, l, a) => Ce(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: l, meta: a }, e), Ce = (e, t, r, n = 0) => {
  let o = De(r), l = Ge[o], a = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? W = We(W, a) : (l.size === 0 ? l.first = a : l.last.r = a, l.last = a), l.size += 1;
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
}, Le = /* @__PURE__ */ new Set();
let O, ce = 1, de = 0, pe = 0, D = null, qt = (e) => {
  O = e;
}, Qe = (e) => {
  D = e;
};
const ct = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = P(e);
    if (e)
      return e;
  }
  return null;
};
let Wt = (e, t, r, n, o) => {
  let l = ct(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, o), t.reg[n.id]) : n;
};
const Gt = (e) => e;
let F = (e, t, r, n, o) => {
  var l;
  let a = e.reg, v = t.sid, _ = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize;
  if (a[t.id])
    return;
  let f = { id: t.id, current: t.current, meta: t.meta };
  if (v && v in e.sidValuesMap && !(v in e.sidIdMap))
    f.current = (e.fromSerialize && _ !== "ignore" && (_ == null ? void 0 : _.read) || Gt)(e.sidValuesMap[v]);
  else if (t.before && !o) {
    let h = 0, c = r || !t.noInit || n;
    k(t.before, (p) => {
      switch (p.type) {
        case ne: {
          let i = p.from;
          if (i || p.fn) {
            i && F(e, i, r, n);
            let s = i && a[i.id].current;
            c && (f.current = p.fn ? p.fn(s) : s);
          }
          break;
        }
        case "field":
          h || (h = 1, f.current = Array.isArray(f.current) ? [...f.current] : { ...f.current }), F(e, p.from, r, n), c && (f.current[p.field] = a[a[p.from.id].id].current);
      }
    });
  }
  v && (e.sidIdMap[v] = t.id), a[t.id] = f;
};
const Ht = (e, t, r) => {
  try {
    return t(ee(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let K = (e, t = {}) => (z(e) && (K(e.or, t), wt(e, (r, n) => {
  j(r) || n === "or" || n === "and" || (t[n] = r);
}), K(e.and, t)), t);
const Xe = (e, t) => {
  fe(e.next, t), fe(he(e), t), fe(Se(e), t);
}, Me = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = Se(e);
  for (; n = o.pop(); )
    Xe(n, e), (t || r && A(e, "op") !== "sample" || n.family.type === "crosslink") && Me(n, t, A(n, "op") !== "on" && r);
  for (o = he(e); n = o.pop(); )
    Xe(n, e), r && n.family.type === "crosslink" && Me(n, t, A(n, "op") !== "on" && r);
}, X = (e) => e.clear();
let Te = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Pe(e))
    X(me(e));
  else if (ot(e)) {
    r = 1;
    let n = e.history;
    X(n.events), X(n.effects), X(n.stores), X(n.domains);
  }
  Me(T(e), !!t, r);
}, ft = (e) => {
  let t = () => Te(e);
  return t.unsubscribe = t, t;
}, He = (e, t, r, n, o) => B({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), dt = (e, t) => ($(V(t), ".watch argument should be a function"), ft(B({ scope: { fn: t }, node: [qe({ fn: je })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Ft = (e, t, r = "event") => {
  P(e) && P(e).hooks[r](t);
}, pt = (e, t, r) => {
  let n = K(r), o = e === "domain", l = kt(), { sid: a = null, named: v = null, domain: _ = null, parent: f = _ } = n, h = v || n.name || (o ? "" : l), c = Et(h, f), p = { op: t.kind = e, name: t.shortName = h, sid: t.sid = Dt(a), named: v, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = f, t.compositeName = c, t.defaultConfig = n, t.thru = (i) => (oe(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !o && (t.subscribe = (i) => (Mt(i), t.watch(V(i) ? i : (s) => i.next && i.next(s))), t[bt] = () => t), p;
};
const Re = (e, t, r, n) => {
  let o;
  z(r) && (o = r, r = r.fn);
  let l = x({ name: `${e.shortName} → *`, derived: 1, and: o });
  return He(e, l, n, t, r), l;
}, vt = (e, t, r, n, o) => {
  let l = ve(t), a = _e({ store: l, to: "a", priority: "read" });
  r === ne && (a.data.softRead = 1);
  let v = [a, q(n)];
  return Z("storeOnMap", l, v, Pe(e) && ve(e)), He(e, t, v, r, o);
};
let Kt = (e, t, r) => {
  try {
    return [1, e(...r)];
  } catch (n) {
    return t(n), [0, null];
  }
}, Ut = (e) => {
  let t = I(e), r = { ref: t };
  return t && C(t.activeEffects, r), r;
}, Ze = (e, t, r, n, o, l) => (a) => {
  l.ref && fe(l.ref.activeEffects, l), re({ target: [n, Yt], params: [r ? { status: "done", params: e, result: a } : { status: "fail", params: e, error: a }, { value: a, fn: r ? t.rs : t.rj }], defer: 1, page: o.page, scope: l.ref, meta: o.meta });
};
const Yt = B({ node: [qe({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), Jt = {
  subscribers: [],
  changeState(e) {
    window.history.pushState(e, ""), this.fireChangeStateEvent();
  },
  fireChangeStateEvent() {
    this._trigerEvent("changestate", window.history.state);
  },
  addEventListener(e, t, r) {
    this.subscribers.push({ type: e, callback: t, index: r });
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
  const { view: t, panel: r, modal: n, popout: o } = window.history.state ?? {
    view: void 0,
    panel: void 0,
    modal: void 0,
    popout: void 0
  };
  Jt.changeState({
    view: e.hasOwnProperty("view") ? e.view : t,
    panel: e.hasOwnProperty("panel") ? e.panel : r,
    modal: e.hasOwnProperty("modal") ? e.modal : n,
    popout: e.hasOwnProperty("popout") ? e.popout : o
  });
}), wr = U((e) => {
  Y({ view: e.view, panel: e.panel });
}), Er = U((e) => {
  Y({ panel: e });
}), Or = U((e) => {
  Y({ modal: e });
}), br = U((e) => {
  Y({ popout: e });
}), Qt = x(), Xt = x(), mt = x(), ht = x(), St = x(), gt = x(), Zt = x(), er = Be({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: !1,
  isBackHandled: !0
}).on(Qt, (e, t) => ({
  ...e,
  activeView: t
})).on(Xt, (e, t) => ({
  ...e,
  activePanel: t
})).on(ht, (e, t) => ({
  ...e,
  activeModal: t
})).on(St, (e, t) => ({
  ...e,
  activePopout: t
})).on(gt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(mt, (e, { view: t, panel: r }) => ({
  ...e,
  activeView: t,
  activePanel: r
})).on(Zt, (e, t) => ({
  ...e,
  isBackHandled: t
}));
function tr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var et = {}, rr = {
  get exports() {
    return et;
  },
  set exports(e) {
    et = e;
  }
}, Ae = {}, se = {}, nr = {
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
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, l = e.useLayoutEffect, a = e.useDebugValue;
  function v(c, p) {
    var i = p(), s = n({ inst: { value: i, getSnapshot: p } }), u = s[0].inst, d = s[1];
    return l(function() {
      u.value = i, u.getSnapshot = p, _(u) && d({ inst: u });
    }, [c, i, p]), o(function() {
      return _(u) && d({ inst: u }), c(function() {
        _(u) && d({ inst: u });
      });
    }, [c]), a(i), i;
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
  var h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : v;
  return xe.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : h, xe;
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
function or() {
  return rt || (rt = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var m = arguments.length, y = new Array(m > 1 ? m - 1 : 0), S = 1; S < m; S++)
          y[S - 1] = arguments[S];
        n("error", w, y);
      }
    }
    function n(w, m, y) {
      {
        var S = t.ReactDebugCurrentFrame, g = S.getStackAddendum();
        g !== "" && (m += "%s", y = y.concat([g]));
        var E = y.map(function(R) {
          return String(R);
        });
        E.unshift("Warning: " + m), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function o(w, m) {
      return w === m && (w !== 0 || 1 / w === 1 / m) || w !== w && m !== m;
    }
    var l = typeof Object.is == "function" ? Object.is : o, a = e.useState, v = e.useEffect, _ = e.useLayoutEffect, f = e.useDebugValue, h = !1, c = !1;
    function p(w, m, y) {
      h || e.startTransition !== void 0 && (h = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var S = m();
      if (!c) {
        var g = m();
        l(S, g) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var E = a({
        inst: {
          value: S,
          getSnapshot: m
        }
      }), R = E[0].inst, J = E[1];
      return _(function() {
        R.value = S, R.getSnapshot = m, i(R) && J({
          inst: R
        });
      }, [w, S, m]), v(function() {
        i(R) && J({
          inst: R
        });
        var ye = function() {
          i(R) && J({
            inst: R
          });
        };
        return w(ye);
      }, [w]), f(S), S;
    }
    function i(w) {
      var m = w.getSnapshot, y = w.value;
      try {
        var S = m();
        return !l(y, S);
      } catch {
        return !0;
      }
    }
    function s(w, m, y) {
      return m();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", d = !u, b = d ? s : p, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    ke.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ar() : e.exports = or();
})(nr);
const ir = /* @__PURE__ */ tr(se);
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
function sr() {
  if (nt)
    return Ae;
  nt = 1;
  var e = M, t = se;
  function r(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, v = e.useMemo, _ = e.useDebugValue;
  return Ae.useSyncExternalStoreWithSelector = function(f, h, c, p, i) {
    var s = l(null);
    if (s.current === null) {
      var u = { hasValue: !1, value: null };
      s.current = u;
    } else
      u = s.current;
    s = v(function() {
      function b(S) {
        if (!L) {
          if (L = !0, w = S, S = p(S), i !== void 0 && u.hasValue) {
            var g = u.value;
            if (i(g, S))
              return m = g;
          }
          return m = S;
        }
        if (g = m, n(w, S))
          return g;
        var E = p(S);
        return i !== void 0 && i(g, E) ? g : (w = S, m = E);
      }
      var L = !1, w, m, y = c === void 0 ? null : c;
      return [function() {
        return b(h());
      }, y === null ? void 0 : function() {
        return b(y());
      }];
    }, [h, c, p, i]);
    var d = o(f, s[0], s[1]);
    return a(function() {
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
var at;
function ur() {
  return at || (at = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = se;
    function r(h, c) {
      return h === c && (h !== 0 || 1 / h === 1 / c) || h !== h && c !== c;
    }
    var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, l = e.useRef, a = e.useEffect, v = e.useMemo, _ = e.useDebugValue;
    function f(h, c, p, i, s) {
      var u = l(null), d;
      u.current === null ? (d = {
        hasValue: !1,
        value: null
      }, u.current = d) : d = u.current;
      var b = v(function() {
        var y = !1, S, g, E = function(Q) {
          if (!y) {
            y = !0, S = Q;
            var we = i(Q);
            if (s !== void 0 && d.hasValue) {
              var Ee = d.value;
              if (s(Ee, we))
                return g = Ee, Ee;
            }
            return g = we, we;
          }
          var yt = S, Oe = g;
          if (n(yt, Q))
            return Oe;
          var be = i(Q);
          return s !== void 0 && s(Oe, be) ? Oe : (S = Q, g = be, be);
        }, R = p === void 0 ? null : p, J = function() {
          return E(c());
        }, ye = R === null ? void 0 : function() {
          return E(R());
        };
        return [J, ye];
      }, [c, p, i, s]), L = b[0], w = b[1], m = o(h, L, w);
      return a(function() {
        d.hasValue = !0, d.value = m;
      }, [m]), _(m), m;
    }
    Ve.useSyncExternalStoreWithSelector = f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ve;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = sr() : e.exports = ur();
})(rr);
function lr(e, t, r, n) {
  let o = [Nt.run({ fn: (l) => t(l) })];
  if (n && o.unshift(n), r) {
    let l = B({ node: o }), a = e.graphite.id, v = r.additionalLinks, _ = v[a] || [];
    return v[a] = _, _.push(l), () => {
      let f = _.indexOf(l);
      f !== -1 && _.splice(f, 1), Te(l);
    };
  }
  {
    let l = B({ node: o, parent: [e], family: { owners: e } });
    return () => {
      Te(l);
    };
  }
}
function cr(e, t) {
  xt.store(e) || _t("expect useStore argument to be a store");
  let r = M.useCallback((o) => lr(e, o, t), [e, t]), n = M.useCallback(() => vr(e, t), [e, t]);
  return pr(r, n, n);
}
function fr(e) {
  let t = M.useContext(mr);
  return e && !t && _t("No scope found, consider adding <Provider> to app root"), t;
}
function dr(e, t) {
  return cr(e, fr(t == null ? void 0 : t.forceScope));
}
let _t = (e) => {
  throw Error(e);
};
typeof window < "u" ? M.useLayoutEffect : M.useEffect;
const { useSyncExternalStore: pr } = ir, vr = (e, t) => t ? t.getState(e) : e.getState(), mr = M.createContext(null), Ie = {
  subscribers: [],
  changeState(e) {
    window.history.pushState(e, ""), this.fireChangeStateEvent();
  },
  fireChangeStateEvent() {
    this._trigerEvent("changestate", window.history.state);
  },
  addEventListener(e, t, r) {
    this.subscribers.push({ type: e, callback: t, index: r });
  },
  removeEventListener(e) {
    this.subscribers = this.subscribers.filter((t) => t.index !== e);
  },
  _trigerEvent(e, t) {
    this.subscribers.forEach((r) => r.type === e && r.callback(t));
  }
}, hr = (e, t, r) => {
  $e(() => {
    const n = (o) => {
      o instanceof KeyboardEvent && o.key === r ? t(o) : r || t(o);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, Sr = (e, t, r) => {
  $e(() => (Ie.addEventListener(e, t, r), () => Ie.removeEventListener(r)), [e, r, t]);
}, Lr = (e, ...t) => {
  const { activeView: r, activePanel: n, activeModal: o, activePopout: l, isRouteInit: a } = gr();
  $e(() => {
    a || (Y(e), gt());
  }, [a, e]), hr("popstate", async () => {
    a && (await (async () => {
      Ie.fireChangeStateEvent();
      const { view: _, panel: f, modal: h, popout: c } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", _, f, h, c), console.log("storeRoutes", r, n, o, l);
      for (const p in t)
        if (!await t[p]({
          view: r,
          panel: n,
          modal: o,
          popout: l
        }, { view: _, panel: f, modal: h, popout: c }))
          return;
    })(), window.isBackFromBrowser = !0);
  }), Sr("changestate", (v) => {
    if (console.log("[blum]: state changed", v), v) {
      const { view: _, panel: f, modal: h, popout: c } = v;
      _ && f && mt({ view: _, panel: f }), ht(h), St(c);
    }
  }, 1);
}, gr = () => dr(er), Rr = (e) => e, Ar = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((l) => r[l] === e && r[l] !== n[l]) && window.isBackFromBrowser ? (t && t(r, n), Y(r), !1) : !0;
export {
  ht as _setActiveModal,
  Xt as _setActivePanel,
  St as _setActivePopout,
  Qt as _setActiveView,
  yr as back,
  Ar as createDisableBackBrowserRouteMiddleware,
  Rr as createRouteMiddleware,
  Y as historyPush,
  Or as setActiveModal,
  Er as setActivePanel,
  br as setActivePopout,
  wr as setActiveViewPanel,
  Lr as useInitRouter,
  gr as useRouter
};
