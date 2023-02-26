import M, { useEffect as $e } from "react";
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
    this.subscribers.push({ type: e, callback: t, index: r });
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
function k(e, t) {
  e.forEach(t);
}
function $(e, t) {
  if (!e)
    throw Error(t);
}
function B({ node: e = [], from: t, source: r, parent: n = t || r, to: a, target: l, child: o = a || l, scope: v = {}, meta: y = {}, family: f = { type: "regular" }, regional: h } = {}) {
  let c = le(n), p = le(f.links), i = le(f.owners), s = [];
  k(e, (d) => d && C(s, d));
  let u = { id: Ct(), seq: s, next: le(o), meta: y, scope: v, family: { type: f.type || "crosslink", links: p, owners: i } };
  return k(p, (d) => C(he(d), u)), k(i, (d) => C(ge(d), u)), k(c, (d) => C(d.next, u)), h && G && ze(ee(G), [u]), u;
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
  let v, y, f, h, c, p, i = { isRoot: ce, currentPage: D, scope: O, isWatch: de, isPure: pe };
  ce = 0;
  e:
    for (; h = qt(); ) {
      let { idx: s, stack: u, type: d } = h;
      f = u.node, D = c = u.page, O = I(u), c ? p = c.reg : O && (p = O.reg);
      let b = !!c, L = !!O, w = { fail: 0, scope: f.scope };
      v = y = 0;
      for (let m = s; m < f.seq.length && !v; m++) {
        let _ = f.seq[m];
        if (_.order) {
          let { priority: g, barrierID: S } = _.order, E = S ? c ? `${c.fullID}_${S}` : S : 0;
          if (m !== s || d !== g) {
            S ? Le.has(E) || (Le.add(E), De(m, u, g, S)) : De(m, u, g);
            continue e;
          }
          S && Le.delete(E);
        }
        switch (_.type) {
          case "mov": {
            let S, E = _.data;
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
                    let R = ft(c, E.store.id);
                    u.page = c = R, R ? p = R.reg : L ? (F(O, E.store, 0, 1, E.softRead), p = O.reg) : p = void 0;
                  } else
                    L && F(O, E.store, 0, 1, E.softRead);
                S = ct(p && p[E.store.id] || E.store);
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
                Gt(c, O, f, E.target).current = S;
            }
            break;
          }
          case "compute":
            let g = _.data;
            if (g.fn) {
              de = A(f, "op") === "watch", pe = g.pure;
              let S = g.safe ? (0, g.fn)(ee(u), w.scope, u) : Ft(w, g.fn, u);
              g.filter ? y = !S : u.value = S, de = i.isWatch, pe = i.isPure;
            }
        }
        v = w.fail || y;
      }
      if (!v) {
        let m = ee(u), _ = I(u);
        if (k(f.next, (g) => {
          N("child", c, g, u, m, _);
        }), _) {
          A(f, "needFxCounter") && N("child", c, _.fxCount, u, m, _), A(f, "storeChange") && N("child", c, _.storeChange, u, m, _), A(f, "warnSerialize") && N("child", c, _.warnSerializeNode, u, m, _);
          let g = _.additionalLinks[f.id];
          g && k(g, (S) => {
            N("child", c, S, u, m, _);
          });
        }
      }
    }
  ce = i.isRoot, D = i.currentPage, O = I(i);
}
function Ot(e, t) {
  let r, n, a = e;
  if (t) {
    let l = Rt(t);
    e.length === 0 ? (r = l.path, n = l.fullName) : (r = l.path.concat([e]), n = l.fullName.length === 0 ? e : l.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: a, fullName: n, path: r };
}
function Z(e, ...t) {
  let r = ut();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function x(e, t) {
  let r = K({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (o, ...v) => (ae(!A(n, "derived"), "call of derived event", "createEvent"), ae(!pe, "unit call from pure function", "operators like sample"), D ? ((y, f, h, c) => {
    let p = D, i = null;
    if (f)
      for (i = D; i && i.template !== f; )
        i = P(i);
    Qe(i);
    let s = y.create(h, c);
    return Qe(p), s;
  })(n, a, o, v) : n.create(o, v)), a = ut(), l = Object.assign(n, { graphite: B({ meta: vt("event", n, r), regional: 1 }), create: (o) => (re({ target: n, params: o, scope: O }), o), watch: (o) => pt(n, o), map: (o) => Re(n, ne, o, [q()]), filter: (o) => Re(n, "filter", o.fn ? o : o.fn, [q(je, 1)]), filterMap: (o) => Re(n, "filterMap", o, [q(), H((v) => !j(v), 1)]), prepend(o) {
    let v = x("* → " + n.shortName, { parent: P(n) });
    return Z("eventPrepend", T(v)), He(v, n, [q()], "prepend", o), Kt(n, v), v;
  } });
  return r != null && r.domain && r.domain.hooks.event(l), l;
}
function Fe(e, t, r, n) {
  return It(r, t, "first argument"), $(V(n), "second argument should be a function"), ae(!A(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), k(Array.isArray(r) ? r : [r], (a) => {
    e.off(a), me(e).set(a, dt(mt(a, e, "on", $t, n)));
  }), e;
}
function Be(e, t) {
  let r = K(t), n = zt(e), a = x({ named: "updates", derived: 1 });
  Z("storeBase", n);
  let l = n.id, o = { subscribers: /* @__PURE__ */ new Map(), updates: a, defaultState: e, stateRef: n, getState() {
    let s, u = n;
    if (D) {
      let d = D;
      for (; d && !d.reg[l]; )
        d = P(d);
      d && (s = d);
    }
    return !s && O && (F(O, n, 1), s = O), s && (u = s.reg[l]), ct(u);
  }, setState: (s) => re({ target: o, params: s, defer: 1, scope: O }), reset: (...s) => (k(s, (u) => Fe(o, ".reset", u, () => o.defaultState)), o), on: (s, u) => Fe(o, ".on", s, u), off(s) {
    let u = me(o).get(s);
    return u && (u(), me(o).delete(s)), o;
  }, map(s, u) {
    let d, b;
    z(s) && (d = s, s = s.fn), ae(j(u), "second argument of store.map", "updateFilter");
    let L = o.getState();
    j(L) || (b = s(L, u));
    let w = Be(b, { name: `${o.shortName} → *`, derived: 1, and: d }), m = mt(o, w, ne, Ye, s);
    return jt(ve(w), { type: ne, fn: s, from: n }), ve(w).noInit = 1, Z("storeMap", n, m), w;
  }, watch(s, u) {
    if (!u || !Ne(s)) {
      let d = pt(o, s);
      return Z("storeWatch", n, s) || s(o.getState()), d;
    }
    return $(V(u), "second argument should be a function"), s.watch((d) => u(o.getState(), d));
  } }, v = vt("store", o, r), y = o.defaultConfig.updateFilter;
  o.graphite = B({ scope: { state: n, fn: y }, node: [H((s, u, d) => (d.scope && !d.scope.reg[n.id] && (d.b = 1), s)), Nt(n), H((s, u, { a: d, b }) => !j(s) && (s !== d || b), 1), y && q(Ye, 1), ye({ from: oe, target: n })], child: a, meta: v, regional: 1 });
  let f = A(o, "serialize"), h = A(o, "derived"), c = f === "ignore", p = !f || c ? 0 : f, i = A(o, "sid");
  return i && (c || te(o, "storeChange", 1), n.sid = i, p && (n.meta = { ...n == null ? void 0 : n.meta, serialize: p })), i || c || h || te(o, "warnSerialize", 1), $(h || !j(e), "current state can't be undefined, use null instead"), ze(o, [a]), r != null && r.domain && r.domain.hooks.store(o), h || (o.reinit = x(), o.reset(o.reinit)), o;
}
function bt() {
  let e = {};
  return e.req = new Promise((t, r) => {
    e.rs = t, e.rj = r;
  }), e.req.catch(() => {
  }), e;
}
function U(e, t) {
  let r = K(V(e) ? { handler: e } : e, t), n = x(V(e) ? { handler: e } : e, t), a = T(n);
  te(a, "op", n.kind = "effect"), n.use = (i) => ($(V(i), ".use argument should be a function"), h.scope.handler = i, n), n.use.getCurrent = () => h.scope.handler;
  let l = n.finally = x({ named: "finally", derived: 1 }), o = n.done = l.filterMap({ named: "done", fn({ status: i, params: s, result: u }) {
    if (i === "done")
      return { params: s, result: u };
  } }), v = n.fail = l.filterMap({ named: "fail", fn({ status: i, params: s, error: u }) {
    if (i === "fail")
      return { params: s, error: u };
  } }), y = n.doneData = o.map({ named: "doneData", fn: ({ result: i }) => i }), f = n.failData = v.map({ named: "failData", fn: ({ error: i }) => i }), h = B({ scope: { handlerId: A(a, "sid"), handler: n.defaultConfig.handler || (() => $(0, `no handler used in ${n.getType()}`)) }, node: [H((i, s, u) => {
    let d = s, b = d.handler;
    if (I(u)) {
      let L = I(u).handlers[d.handlerId];
      L && (b = L);
    }
    return i.handler = b, i;
  }, 0, 1), H(({ params: i, req: s, handler: u, args: d = [i] }, b, L) => {
    let w = Yt(L), m = Ze(i, s, 1, l, L, w), _ = Ze(i, s, 0, l, L, w), [g, S] = Ut(u, _, d);
    g && (z(S) && V(S.then) ? S.then(m, _) : m(S));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  a.scope.runner = h, C(a.seq, H((i, { runner: s }, u) => {
    let d = P(u) ? { params: i, req: { rs(b) {
    }, rj(b) {
    } } } : i;
    return u.meta || (u.meta = { fxID: Dt() }), re({ target: s, params: d, defer: 1, scope: I(u), meta: u.meta }), d.params;
  }, 0, 1)), n.create = (i) => {
    let s = bt(), u = { params: i, req: s };
    if (O && !de) {
      let d = O;
      s.req.finally(() => {
        Wt(d);
      }).catch(() => {
      });
    }
    return re({ target: n, params: u, scope: O }), s.req;
  };
  let c = n.inFlight = Be(0, { serialize: "ignore" }).on(n, (i) => i + 1).on(l, (i) => i - 1).map({ fn: (i) => i, named: "inFlight" });
  te(l, "needFxCounter", "dec"), te(n, "needFxCounter", 1);
  let p = n.pending = c.map({ fn: (i) => i > 0, named: "pending" });
  return ze(n, [l, o, v, y, f, p, c]), r != null && r.domain && r.domain.hooks.effect(n), n;
}
let Lt = typeof Symbol < "u" && Symbol.observable || "@@observable", ne = "map", oe = "stack", T = (e) => e.graphite || e, he = (e) => e.family.owners, ge = (e) => e.family.links, ve = (e) => e.stateRef, ee = (e) => e.value, me = (e) => e.subscribers, P = (e) => e.parent, I = (e) => e.scope, A = (e, t) => T(e).meta[t], te = (e, t, r) => T(e).meta[t] = r, Rt = (e) => e.compositeName, Ne = (e) => (V(e) || z(e)) && "kind" in e;
const ue = (e) => (t) => Ne(t) && t.kind === e;
let Pe = ue("store"), At = ue("event"), Ke = ue("effect"), it = ue("domain"), xt = ue("scope");
var kt = { __proto__: null, unit: Ne, store: Pe, event: At, effect: Ke, domain: it, scope: xt, attached: (e) => Ke(e) && A(e, "attached") == 1 };
let fe = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, C = (e, t) => e.push(t), ae = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const Se = () => {
  let e = 0;
  return () => "" + ++e;
};
let Vt = Se(), st = Se(), Ct = Se(), Dt = Se(), G = null, ut = () => G, Mt = (e) => (e && G && G.sidRoot && (e = `${G.sidRoot}|${e}`), e), ze = (e, t) => {
  let r = T(e);
  k(t, (n) => {
    let a = T(n);
    r.family.type !== "domain" && (a.family.type = "crosslink"), C(he(a), r), C(ge(r), a);
  });
}, le = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(T), z = (e) => typeof e == "object" && e !== null, V = (e) => typeof e == "function", j = (e) => e === void 0, Tt = (e) => $(z(e) || V(e), "expect first argument be an object");
const Ue = (e, t, r, n) => $(!(!z(e) && !V(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let It = (e, t, r) => {
  Array.isArray(e) ? k(e, (n, a) => Ue(n, t, `${a} item of ${r}`, "")) : Ue(e, t, r, " or array of units");
}, Ye = (e, { fn: t }, { a: r }) => t(e, r), $t = (e, { fn: t }, { a: r }) => t(r, e), je = (e, { fn: t }) => t(e);
const lt = (e, t, r, n) => {
  let a = { id: st(), type: e, data: t };
  return r && (a.order = { priority: r }, n && (a.order.barrierID = ++Bt)), a;
};
let Bt = 0, ye = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : oe, batch: a, priority: l }) => lt("mov", { from: e, store: t, to: n, target: r }, l, a), ie = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: a = 0, pure: l = 0 }) => lt("compute", { fn: e, safe: n, filter: a, pure: l }, r, t), qe = ({ fn: e }) => ie({ fn: e, priority: "effect" }), H = (e, t, r) => ie({ fn: e, safe: 1, filter: t, priority: r && "effect" }), Nt = (e, t, r) => ye({ store: e, to: t ? oe : "a", priority: r && "sampler", batch: 1 }), q = (e = je, t) => ie({ fn: e, pure: 1, filter: t }), Pt = { mov: ye, compute: ie, filter: ({ fn: e, pure: t }) => ie({ fn: e, filter: 1, pure: t }), run: qe }, zt = (e) => ({ id: st(), current: e }), ct = ({ current: e }) => e, jt = (e, t) => {
  e.before || (e.before = []), C(e.before, t);
}, W = null;
const We = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Me(e.v.type) > Me(t.v.type)) && (r = e, e = t, t = r), r = We(e.r, t), e.r = e.l, e.l = r, e;
}, Ge = [];
let Je = 0;
for (; Je < 6; )
  C(Ge, { first: null, last: null, size: 0 }), Je += 1;
const qt = () => {
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
}, N = (e, t, r, n, a, l, o) => De(0, { a: null, b: null, node: r, parent: n, value: a, page: t, scope: l, meta: o }, e), De = (e, t, r, n = 0) => {
  let a = Me(r), l = Ge[a], o = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  a === 3 || a === 4 ? W = We(W, o) : (l.size === 0 ? l.first = o : l.last.r = o, l.last = o), l.size += 1;
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
let O, ce = 1, de = 0, pe = 0, D = null, Wt = (e) => {
  O = e;
}, Qe = (e) => {
  D = e;
};
const ft = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = P(e);
    if (e)
      return e;
  }
  return null;
};
let Gt = (e, t, r, n, a) => {
  let l = ft(e, n.id);
  return l ? l.reg[n.id] : t ? (F(t, n, a), t.reg[n.id]) : n;
};
const Ht = (e) => e;
let F = (e, t, r, n, a) => {
  var l;
  let o = e.reg, v = t.sid, y = t == null || (l = t.meta) === null || l === void 0 ? void 0 : l.serialize;
  if (o[t.id])
    return;
  let f = { id: t.id, current: t.current, meta: t.meta };
  if (v && v in e.sidValuesMap && !(v in e.sidIdMap))
    f.current = (e.fromSerialize && y !== "ignore" && (y == null ? void 0 : y.read) || Ht)(e.sidValuesMap[v]);
  else if (t.before && !a) {
    let h = 0, c = r || !t.noInit || n;
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
          h || (h = 1, f.current = Array.isArray(f.current) ? [...f.current] : { ...f.current }), F(e, p.from, r, n), c && (f.current[p.field] = o[o[p.from.id].id].current);
      }
    });
  }
  v && (e.sidIdMap[v] = t.id), o[t.id] = f;
};
const Ft = (e, t, r) => {
  try {
    return t(ee(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let K = (e, t = {}) => (z(e) && (K(e.or, t), Et(e, (r, n) => {
  j(r) || n === "or" || n === "and" || (t[n] = r);
}), K(e.and, t)), t);
const Xe = (e, t) => {
  fe(e.next, t), fe(he(e), t), fe(ge(e), t);
}, Te = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let a = ge(e);
  for (; n = a.pop(); )
    Xe(n, e), (t || r && A(e, "op") !== "sample" || n.family.type === "crosslink") && Te(n, t, A(n, "op") !== "on" && r);
  for (a = he(e); n = a.pop(); )
    Xe(n, e), r && n.family.type === "crosslink" && Te(n, t, A(n, "op") !== "on" && r);
}, X = (e) => e.clear();
let Ie = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), Pe(e))
    X(me(e));
  else if (it(e)) {
    r = 1;
    let n = e.history;
    X(n.events), X(n.effects), X(n.stores), X(n.domains);
  }
  Te(T(e), !!t, r);
}, dt = (e) => {
  let t = () => Ie(e);
  return t.unsubscribe = t, t;
}, He = (e, t, r, n, a) => B({ node: r, parent: e, child: t, scope: { fn: a }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), pt = (e, t) => ($(V(t), ".watch argument should be a function"), dt(B({ scope: { fn: t }, node: [qe({ fn: je })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), Kt = (e, t, r = "event") => {
  P(e) && P(e).hooks[r](t);
}, vt = (e, t, r) => {
  let n = K(r), a = e === "domain", l = Vt(), { sid: o = null, named: v = null, domain: y = null, parent: f = y } = n, h = v || n.name || (a ? "" : l), c = Ot(h, f), p = { op: t.kind = e, name: t.shortName = h, sid: t.sid = Mt(o), named: v, unitId: t.id = l, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = f, t.compositeName = c, t.defaultConfig = n, t.thru = (i) => (ae(0, "thru", "js pipe"), i(t)), t.getType = () => c.fullName, !a && (t.subscribe = (i) => (Tt(i), t.watch(V(i) ? i : (s) => i.next && i.next(s))), t[Lt] = () => t), p;
};
const Re = (e, t, r, n) => {
  let a;
  z(r) && (a = r, r = r.fn);
  let l = x({ name: `${e.shortName} → *`, derived: 1, and: a });
  return He(e, l, n, t, r), l;
}, mt = (e, t, r, n, a) => {
  let l = ve(t), o = ye({ store: l, to: "a", priority: "read" });
  r === ne && (o.data.softRead = 1);
  let v = [o, q(n)];
  return Z("storeOnMap", l, v, Pe(e) && ve(e)), He(e, t, v, r, a);
};
let Ut = (e, t, r) => {
  try {
    return [1, e(...r)];
  } catch (n) {
    return t(n), [0, null];
  }
}, Yt = (e) => {
  let t = I(e), r = { ref: t };
  return t && C(t.activeEffects, r), r;
}, Ze = (e, t, r, n, a, l) => (o) => {
  l.ref && fe(l.ref.activeEffects, l), re({ target: [n, Jt], params: [r ? { status: "done", params: e, result: o } : { status: "fail", params: e, error: o }, { value: o, fn: r ? t.rs : t.rj }], defer: 1, page: a.page, scope: l.ref, meta: a.meta });
};
const Jt = B({ node: [qe({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), et = {
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
    this.subscribers.push({ type: e, callback: t, index: r });
  },
  removeEventListener(e) {
    this.subscribers = this.subscribers.filter((t) => t.index !== e);
  },
  _trigerEvent(e, t) {
    this.subscribers.forEach((r) => r.type === e && r.callback(t));
  }
}, _r = U(() => {
  window.isBackFromBrowser = !1, window.history.back();
}), Y = U((e) => {
  const { view: t, panel: r, modal: n, popout: a } = window.history.state ?? {
    view: void 0,
    panel: void 0,
    modal: void 0,
    popout: void 0
  };
  console.log("try to push history", et.subscribers), et.changeState({
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
}), Qt = x(), Xt = x(), ht = x(), gt = x(), St = x(), yt = x(), Zt = x(), er = Be({
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
})).on(gt, (e, t) => ({
  ...e,
  activeModal: t
})).on(St, (e, t) => ({
  ...e,
  activePopout: t
})).on(yt, (e) => ({
  ...e,
  isRouteInit: !0
})).on(ht, (e, { view: t, panel: r }) => ({
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
var tt = {}, rr = {
  get exports() {
    return tt;
  },
  set exports(e) {
    tt = e;
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
var rt;
function or() {
  if (rt)
    return xe;
  rt = 1;
  var e = M;
  function t(c, p) {
    return c === p && (c !== 0 || 1 / c === 1 / p) || c !== c && p !== p;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, a = e.useEffect, l = e.useLayoutEffect, o = e.useDebugValue;
  function v(c, p) {
    var i = p(), s = n({ inst: { value: i, getSnapshot: p } }), u = s[0].inst, d = s[1];
    return l(function() {
      u.value = i, u.getSnapshot = p, y(u) && d({ inst: u });
    }, [c, i, p]), a(function() {
      return y(u) && d({ inst: u }), c(function() {
        y(u) && d({ inst: u });
      });
    }, [c]), o(i), i;
  }
  function y(c) {
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
var nt;
function ar() {
  return nt || (nt = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = M, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var m = arguments.length, _ = new Array(m > 1 ? m - 1 : 0), g = 1; g < m; g++)
          _[g - 1] = arguments[g];
        n("error", w, _);
      }
    }
    function n(w, m, _) {
      {
        var g = t.ReactDebugCurrentFrame, S = g.getStackAddendum();
        S !== "" && (m += "%s", _ = _.concat([S]));
        var E = _.map(function(R) {
          return String(R);
        });
        E.unshift("Warning: " + m), Function.prototype.apply.call(console[w], console, E);
      }
    }
    function a(w, m) {
      return w === m && (w !== 0 || 1 / w === 1 / m) || w !== w && m !== m;
    }
    var l = typeof Object.is == "function" ? Object.is : a, o = e.useState, v = e.useEffect, y = e.useLayoutEffect, f = e.useDebugValue, h = !1, c = !1;
    function p(w, m, _) {
      h || e.startTransition !== void 0 && (h = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var g = m();
      if (!c) {
        var S = m();
        l(g, S) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var E = o({
        inst: {
          value: g,
          getSnapshot: m
        }
      }), R = E[0].inst, J = E[1];
      return y(function() {
        R.value = g, R.getSnapshot = m, i(R) && J({
          inst: R
        });
      }, [w, g, m]), v(function() {
        i(R) && J({
          inst: R
        });
        var _e = function() {
          i(R) && J({
            inst: R
          });
        };
        return w(_e);
      }, [w]), f(g), g;
    }
    function i(w) {
      var m = w.getSnapshot, _ = w.value;
      try {
        var g = m();
        return !l(_, g);
      } catch {
        return !0;
      }
    }
    function s(w, m, _) {
      return m();
    }
    var u = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", d = !u, b = d ? s : p, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b;
    ke.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ke;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = or() : e.exports = ar();
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
var ot;
function sr() {
  if (ot)
    return Ae;
  ot = 1;
  var e = M, t = se;
  function r(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : r, a = t.useSyncExternalStore, l = e.useRef, o = e.useEffect, v = e.useMemo, y = e.useDebugValue;
  return Ae.useSyncExternalStoreWithSelector = function(f, h, c, p, i) {
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
              return m = S;
          }
          return m = g;
        }
        if (S = m, n(w, g))
          return S;
        var E = p(g);
        return i !== void 0 && i(S, E) ? S : (w = g, m = E);
      }
      var L = !1, w, m, _ = c === void 0 ? null : c;
      return [function() {
        return b(h());
      }, _ === null ? void 0 : function() {
        return b(_());
      }];
    }, [h, c, p, i]);
    var d = a(f, s[0], s[1]);
    return o(function() {
      u.hasValue = !0, u.value = d;
    }, [d]), y(d), d;
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
    var n = typeof Object.is == "function" ? Object.is : r, a = t.useSyncExternalStore, l = e.useRef, o = e.useEffect, v = e.useMemo, y = e.useDebugValue;
    function f(h, c, p, i, s) {
      var u = l(null), d;
      u.current === null ? (d = {
        hasValue: !1,
        value: null
      }, u.current = d) : d = u.current;
      var b = v(function() {
        var _ = !1, g, S, E = function(Q) {
          if (!_) {
            _ = !0, g = Q;
            var we = i(Q);
            if (s !== void 0 && d.hasValue) {
              var Ee = d.value;
              if (s(Ee, we))
                return S = Ee, Ee;
            }
            return S = we, we;
          }
          var wt = g, Oe = S;
          if (n(wt, Q))
            return Oe;
          var be = i(Q);
          return s !== void 0 && s(Oe, be) ? Oe : (g = Q, S = be, be);
        }, R = p === void 0 ? null : p, J = function() {
          return E(c());
        }, _e = R === null ? void 0 : function() {
          return E(R());
        };
        return [J, _e];
      }, [c, p, i, s]), L = b[0], w = b[1], m = a(h, L, w);
      return o(function() {
        d.hasValue = !0, d.value = m;
      }, [m]), y(m), m;
    }
    Ve.useSyncExternalStoreWithSelector = f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ve;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = sr() : e.exports = ur();
})(rr);
function lr(e, t, r, n) {
  let a = [Pt.run({ fn: (l) => t(l) })];
  if (n && a.unshift(n), r) {
    let l = B({ node: a }), o = e.graphite.id, v = r.additionalLinks, y = v[o] || [];
    return v[o] = y, y.push(l), () => {
      let f = y.indexOf(l);
      f !== -1 && y.splice(f, 1), Ie(l);
    };
  }
  {
    let l = B({ node: a, parent: [e], family: { owners: e } });
    return () => {
      Ie(l);
    };
  }
}
function cr(e, t) {
  kt.store(e) || _t("expect useStore argument to be a store");
  let r = M.useCallback((a) => lr(e, a, t), [e, t]), n = M.useCallback(() => vr(e, t), [e, t]);
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
const { useSyncExternalStore: pr } = ir, vr = (e, t) => t ? t.getState(e) : e.getState(), mr = M.createContext(null), hr = (e, t, r) => {
  $e(() => {
    const n = (a) => {
      a instanceof KeyboardEvent && a.key === r ? t(a) : r || t(a);
    };
    return window.addEventListener(e, n), () => window.removeEventListener(e, n);
  }, [e, r, t]);
}, gr = (e, t, r) => {
  $e(() => (Ce.addEventListener(e, t, r), () => Ce.removeEventListener(r)), [e, r, t]);
}, Lr = (e, ...t) => {
  gr("changestate", (v) => {
    if (console.log("[blum]: state changed", v), v) {
      const { view: y, panel: f, modal: h, popout: c } = v;
      y && f && ht({ view: y, panel: f }), gt(h), St(c), o || yt();
    }
  }, 1);
  const { activeView: r, activePanel: n, activeModal: a, activePopout: l, isRouteInit: o } = Sr();
  $e(() => {
    o || Y(e);
  }, [o, e]), hr("popstate", async () => {
    o && (await (async () => {
      Ce.fireChangeStateEvent();
      const { view: y, panel: f, modal: h, popout: c } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", y, f, h, c), console.log("storeRoutes", r, n, a, l);
      for (const p in t)
        if (!await t[p]({
          view: r,
          panel: n,
          modal: a,
          popout: l
        }, { view: y, panel: f, modal: h, popout: c }))
          return;
    })(), window.isBackFromBrowser = !0);
  });
}, Sr = () => dr(er), Rr = (e) => e, Ar = (e, t) => (r, n) => ["view", "panel", "modal", "popout"].some((l) => r[l] === e && r[l] !== n[l]) && window.isBackFromBrowser ? (t && t(r, n), Y(r), !1) : !0;
export {
  gt as _setActiveModal,
  Xt as _setActivePanel,
  St as _setActivePopout,
  Qt as _setActiveView,
  _r as back,
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
