function ba(t, r) {
  for (let o in t)
    r(t[o], o);
}
function ue(t, r) {
  t.forEach(r);
}
function he(t, r) {
  if (!t)
    throw Error(r);
}
function _e({ node: t = [], from: r, source: o, parent: a = r || o, to: f, target: p, child: l = f || p, scope: R = {}, meta: D = {}, family: g = { type: "regular" }, regional: C } = {}) {
  let h = st(a), E = st(g.links), c = st(g.owners), d = [];
  ue(t, (_) => _ && ce(d, _));
  let v = { id: Pa(), seq: d, next: st(l), meta: D, scope: R, family: { type: g.type || "crosslink", links: E, owners: c } };
  return ue(E, (_) => ce(mt(_), v)), ue(c, (_) => ce(yt(_), v)), ue(h, (_) => ce(_.next, v)), C && Pe && Ht(Fe(Pe), [v]), v;
}
function Be(t, r, o) {
  let a, f = fe, p = null, l = G;
  if (t.target && (r = t.params, o = t.defer, a = t.meta, f = "page" in t ? t.page : f, t.stack && (p = t.stack), l = ye(t) || l, t = t.target), l && G && l !== G && (G = null), Array.isArray(t))
    for (let d = 0; d < t.length; d++)
      Ee("pure", f, de(t[d]), p, r[d], l, a);
  else
    Ee("pure", f, de(t), p, r, l, a);
  if (o && !lt)
    return;
  let R, D, g, C, h, E, c = { isRoot: lt, currentPage: fe, scope: G, isWatch: ft, isPure: dt };
  lt = 0;
  e:
    for (; C = Wa(); ) {
      let { idx: d, stack: v, type: _ } = C;
      g = v.node, fe = h = v.page, G = ye(v), h ? E = h.reg : G && (E = G.reg);
      let W = !!h, F = !!G, L = { fail: 0, scope: g.scope };
      R = D = 0;
      for (let w = d; w < g.seq.length && !R; w++) {
        let O = g.seq[w];
        if (O.order) {
          let { priority: S, barrierID: T } = O.order, x = T ? h ? `${h.fullID}_${T}` : T : 0;
          if (w !== d || _ !== S) {
            T ? Lt.has(x) || (Lt.add(x), Vt(w, v, S, T)) : Vt(w, v, S);
            continue e;
          }
          T && Lt.delete(x);
        }
        switch (O.type) {
          case "mov": {
            let T, x = O.data;
            switch (x.from) {
              case qe:
                T = Fe(v);
                break;
              case "a":
              case "b":
                T = v[x.from];
                break;
              case "value":
                T = x.store;
                break;
              case "store":
                if (E && !E[x.store.id])
                  if (W) {
                    let K = tn(h, x.store.id);
                    v.page = h = K, K ? E = K.reg : F ? (Le(G, x.store, 0, 1, x.softRead), E = G.reg) : E = void 0;
                  } else
                    F && Le(G, x.store, 0, 1, x.softRead);
                T = en(E && E[x.store.id] || x.store);
            }
            switch (x.to) {
              case qe:
                v.value = T;
                break;
              case "a":
              case "b":
                v[x.to] = T;
                break;
              case "store":
                Ba(h, G, g, x.target).current = T;
            }
            break;
          }
          case "compute":
            let S = O.data;
            if (S.fn) {
              ft = te(g, "op") === "watch", dt = S.pure;
              let T = S.safe ? (0, S.fn)(Fe(v), L.scope, v) : qa(L, S.fn, v);
              S.filter ? D = !T : v.value = T, ft = c.isWatch, dt = c.isPure;
            }
        }
        R = L.fail || D;
      }
      if (!R) {
        let w = Fe(v), O = ye(v);
        if (ue(g.next, (S) => {
          Ee("child", h, S, v, w, O);
        }), O) {
          te(g, "needFxCounter") && Ee("child", h, O.fxCount, v, w, O), te(g, "storeChange") && Ee("child", h, O.storeChange, v, w, O), te(g, "warnSerialize") && Ee("child", h, O.warnSerializeNode, v, w, O);
          let S = O.additionalLinks[g.id];
          S && ue(S, (T) => {
            Ee("child", h, T, v, w, O);
          });
        }
      }
    }
  lt = c.isRoot, fe = c.currentPage, G = ye(c);
}
function Ea(t, r) {
  let o, a, f = t;
  if (r) {
    let p = Oa(r);
    t.length === 0 ? (o = p.path, a = p.fullName) : (o = p.path.concat([t]), a = p.fullName.length === 0 ? t : p.fullName + "/" + t);
  } else
    o = t.length === 0 ? [] : [t], a = t;
  return { shortName: f, fullName: a, path: o };
}
function Ne(t, ...r) {
  let o = Xr();
  if (o) {
    let a = o.handlers[t];
    if (a)
      return a(o, ...r);
  }
}
function ae(t, r) {
  let o = je({ or: r, and: typeof t == "string" ? { name: t } : t }), a = (l, ...R) => (Ye(!te(a, "derived"), "call of derived event", "createEvent"), Ye(!dt, "unit call from pure function", "operators like sample"), fe ? ((D, g, C, h) => {
    let E = fe, c = null;
    if (g)
      for (c = fe; c && c.template !== g; )
        c = Se(c);
    Fr(c);
    let d = D.create(C, h);
    return Fr(E), d;
  })(a, f, l, R) : a.create(l, R)), f = Xr(), p = Object.assign(a, { graphite: _e({ meta: an("event", a, o), regional: 1 }), create: (l) => (Be({ target: a, params: l, scope: G }), l), watch: (l) => nn(a, l), map: (l) => jt(a, ze, l, [Te()]), filter: (l) => jt(a, "filter", l.fn ? l : l.fn, [Te(Gt, 1)]), filterMap: (l) => jt(a, "filterMap", l, [Te(), De((R) => !ke(R), 1)]), prepend(l) {
    let R = ae("* → " + a.shortName, { parent: Se(a) });
    return Ne("eventPrepend", de(R)), Xt(R, a, [Te()], "prepend", l), Ya(a, R), R;
  } });
  return o != null && o.domain && o.domain.hooks.event(p), p;
}
function Ir(t, r, o, a) {
  return xa(o, r, "first argument"), he(ie(a), "second argument should be a function"), Ye(!te(t, "derived"), `${r} in derived store`, `${r} in store created via createStore`), ue(Array.isArray(o) ? o : [o], (f) => {
    t.off(f), vt(t).set(f, rn(on(f, t, "on", Ia, a)));
  }), t;
}
function zt(t, r) {
  let o = je(r), a = Na(t), f = ae({ named: "updates", derived: 1 });
  Ne("storeBase", a);
  let p = a.id, l = { subscribers: /* @__PURE__ */ new Map(), updates: f, defaultState: t, stateRef: a, getState() {
    let d, v = a;
    if (fe) {
      let _ = fe;
      for (; _ && !_.reg[p]; )
        _ = Se(_);
      _ && (d = _);
    }
    return !d && G && (Le(G, a, 1), d = G), d && (v = d.reg[p]), en(v);
  }, setState: (d) => Be({ target: l, params: d, defer: 1, scope: G }), reset: (...d) => (ue(d, (v) => Ir(l, ".reset", v, () => l.defaultState)), l), on: (d, v) => Ir(l, ".on", d, v), off(d) {
    let v = vt(l).get(d);
    return v && (v(), vt(l).delete(d)), l;
  }, map(d, v) {
    let _, W;
    we(d) && (_ = d, d = d.fn), Ye(ke(v), "second argument of store.map", "updateFilter");
    let F = l.getState();
    ke(F) || (W = d(F, v));
    let L = zt(W, { name: `${l.shortName} → *`, derived: 1, and: _ }), w = on(l, L, ze, Vr, d);
    return Fa(pt(L), { type: ze, fn: d, from: a }), pt(L).noInit = 1, Ne("storeMap", a, w), L;
  }, watch(d, v) {
    if (!v || !qt(d)) {
      let _ = nn(l, d);
      return Ne("storeWatch", a, d) || d(l.getState()), _;
    }
    return he(ie(v), "second argument should be a function"), d.watch((_) => v(l.getState(), _));
  } }, R = an("store", l, o), D = l.defaultConfig.updateFilter;
  l.graphite = _e({ scope: { state: a, fn: D }, node: [De((d, v, _) => (_.scope && !_.scope.reg[a.id] && (_.b = 1), d)), Ma(a), De((d, v, { a: _, b: W }) => !ke(d) && (d !== _ || W), 1), D && Te(Vr, 1), _t({ from: qe, target: a })], child: f, meta: R, regional: 1 });
  let g = te(l, "serialize"), C = te(l, "derived"), h = g === "ignore", E = !g || h ? 0 : g, c = te(l, "sid");
  return c && (h || We(l, "storeChange", 1), a.sid = c, E && (a.meta = { ...a == null ? void 0 : a.meta, serialize: E })), c || h || C || We(l, "warnSerialize", 1), he(C || !ke(t), "current state can't be undefined, use null instead"), Ht(l, [f]), o != null && o.domain && o.domain.hooks.store(l), C || (l.reinit = ae(), l.reset(l.reinit)), l;
}
function Sa() {
  let t = {};
  return t.req = new Promise((r, o) => {
    t.rs = r, t.rj = o;
  }), t.req.catch(() => {
  }), t;
}
function wa(t, r) {
  let o = je(ie(t) ? { handler: t } : t, r), a = ae(ie(t) ? { handler: t } : t, r), f = de(a);
  We(f, "op", a.kind = "effect"), a.use = (c) => (he(ie(c), ".use argument should be a function"), C.scope.handler = c, a), a.use.getCurrent = () => C.scope.handler;
  let p = a.finally = ae({ named: "finally", derived: 1 }), l = a.done = p.filterMap({ named: "done", fn({ status: c, params: d, result: v }) {
    if (c === "done")
      return { params: d, result: v };
  } }), R = a.fail = p.filterMap({ named: "fail", fn({ status: c, params: d, error: v }) {
    if (c === "fail")
      return { params: d, error: v };
  } }), D = a.doneData = l.map({ named: "doneData", fn: ({ result: c }) => c }), g = a.failData = R.map({ named: "failData", fn: ({ error: c }) => c }), C = _e({ scope: { handlerId: te(f, "sid"), handler: a.defaultConfig.handler || (() => he(0, `no handler used in ${a.getType()}`)) }, node: [De((c, d, v) => {
    let _ = d, W = _.handler;
    if (ye(v)) {
      let F = ye(v).handlers[_.handlerId];
      F && (W = F);
    }
    return c.handler = W, c;
  }, 0, 1), De(({ params: c, req: d, handler: v, args: _ = [c] }, W, F) => {
    let L = Ga(F), w = Ur(c, d, 1, p, F, L), O = Ur(c, d, 0, p, F, L), [S, T] = Ha(v, O, _);
    S && (we(T) && ie(T.then) ? T.then(w, O) : w(T));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  f.scope.runner = C, ce(f.seq, De((c, { runner: d }, v) => {
    let _ = Se(v) ? { params: c, req: { rs(W) {
    }, rj(W) {
    } } } : c;
    return v.meta || (v.meta = { fxID: Da() }), Be({ target: d, params: _, defer: 1, scope: ye(v), meta: v.meta }), _.params;
  }, 0, 1)), a.create = (c) => {
    let d = Sa(), v = { params: c, req: d };
    if (G && !ft) {
      let _ = G;
      d.req.finally(() => {
        Ua(_);
      }).catch(() => {
      });
    }
    return Be({ target: a, params: v, scope: G }), d.req;
  };
  let h = a.inFlight = zt(0, { serialize: "ignore" }).on(a, (c) => c + 1).on(p, (c) => c - 1).map({ fn: (c) => c, named: "inFlight" });
  We(p, "needFxCounter", "dec"), We(a, "needFxCounter", 1);
  let E = a.pending = h.map({ fn: (c) => c > 0, named: "pending" });
  return Ht(a, [p, l, R, D, g, E, h]), o != null && o.domain && o.domain.hooks.effect(a), a;
}
let Ra = typeof Symbol < "u" && Symbol.observable || "@@observable", ze = "map", qe = "stack", de = (t) => t.graphite || t, mt = (t) => t.family.owners, yt = (t) => t.family.links, pt = (t) => t.stateRef, Fe = (t) => t.value, vt = (t) => t.subscribers, Se = (t) => t.parent, ye = (t) => t.scope, te = (t, r) => de(t).meta[r], We = (t, r, o) => de(t).meta[r] = o, Oa = (t) => t.compositeName, qt = (t) => (ie(t) || we(t)) && "kind" in t;
const Ke = (t) => (r) => qt(r) && r.kind === t;
let Yt = Ke("store"), Ca = Ke("event"), $r = Ke("effect"), Qr = Ke("domain"), ka = Ke("scope");
var Ta = { __proto__: null, unit: qt, store: Yt, event: Ca, effect: $r, domain: Qr, scope: ka, attached: (t) => $r(t) && te(t, "attached") == 1 };
let ct = (t, r) => {
  let o = t.indexOf(r);
  o !== -1 && t.splice(o, 1);
}, ce = (t, r) => t.push(r), Ye = (t, r, o) => !t && console.error(`${r} is deprecated${o ? `, use ${o} instead` : ""}`);
const ht = () => {
  let t = 0;
  return () => "" + ++t;
};
let Aa = ht(), Jr = ht(), Pa = ht(), Da = ht(), Pe = null, Xr = () => Pe, La = (t) => (t && Pe && Pe.sidRoot && (t = `${Pe.sidRoot}|${t}`), t), Ht = (t, r) => {
  let o = de(t);
  ue(r, (a) => {
    let f = de(a);
    o.family.type !== "domain" && (f.family.type = "crosslink"), ce(mt(f), o), ce(yt(o), f);
  });
}, st = (t = []) => (Array.isArray(t) ? t : [t]).flat().map(de), we = (t) => typeof t == "object" && t !== null, ie = (t) => typeof t == "function", ke = (t) => t === void 0, ja = (t) => he(we(t) || ie(t), "expect first argument be an object");
const Mr = (t, r, o, a) => he(!(!we(t) && !ie(t) || !("family" in t) && !("graphite" in t)), `${r}: expect ${o} to be a unit (store, event or effect)${a}`);
let xa = (t, r, o) => {
  Array.isArray(t) ? ue(t, (a, f) => Mr(a, r, `${f} item of ${o}`, "")) : Mr(t, r, o, " or array of units");
}, Vr = (t, { fn: r }, { a: o }) => r(t, o), Ia = (t, { fn: r }, { a: o }) => r(o, t), Gt = (t, { fn: r }) => r(t);
const Zr = (t, r, o, a) => {
  let f = { id: Jr(), type: t, data: r };
  return o && (f.order = { priority: o }, a && (f.order.barrierID = ++$a)), f;
};
let $a = 0, _t = ({ from: t = "store", store: r, target: o, to: a = o ? "store" : qe, batch: f, priority: p }) => Zr("mov", { from: t, store: r, to: a, target: o }, p, f), He = ({ fn: t, batch: r, priority: o, safe: a = 0, filter: f = 0, pure: p = 0 }) => Zr("compute", { fn: t, safe: a, filter: f, pure: p }, o, r), Kt = ({ fn: t }) => He({ fn: t, priority: "effect" }), De = (t, r, o) => He({ fn: t, safe: 1, filter: r, priority: o && "effect" }), Ma = (t, r, o) => _t({ store: t, to: r ? qe : "a", priority: o && "sampler", batch: 1 }), Te = (t = Gt, r) => He({ fn: t, pure: 1, filter: r }), Va = { mov: _t, compute: He, filter: ({ fn: t, pure: r }) => He({ fn: t, filter: 1, pure: r }), run: Kt }, Na = (t) => ({ id: Jr(), current: t }), en = ({ current: t }) => t, Fa = (t, r) => {
  t.before || (t.before = []), ce(t.before, r);
}, Ae = null;
const Qt = (t, r) => {
  if (!t)
    return r;
  if (!r)
    return t;
  let o;
  return (t.v.type === r.v.type && t.v.id > r.v.id || Nt(t.v.type) > Nt(r.v.type)) && (o = t, t = r, r = o), o = Qt(t.r, r), t.r = t.l, t.l = o, t;
}, Jt = [];
let Nr = 0;
for (; Nr < 6; )
  ce(Jt, { first: null, last: null, size: 0 }), Nr += 1;
const Wa = () => {
  for (let t = 0; t < 6; t++) {
    let r = Jt[t];
    if (r.size > 0) {
      if (t === 3 || t === 4) {
        r.size -= 1;
        let a = Ae.v;
        return Ae = Qt(Ae.l, Ae.r), a;
      }
      r.size === 1 && (r.last = null);
      let o = r.first;
      return r.first = o.r, r.size -= 1, o.v;
    }
  }
}, Ee = (t, r, o, a, f, p, l) => Vt(0, { a: null, b: null, node: o, parent: a, value: f, page: r, scope: p, meta: l }, t), Vt = (t, r, o, a = 0) => {
  let f = Nt(o), p = Jt[f], l = { v: { idx: t, stack: r, type: o, id: a }, l: null, r: null };
  f === 3 || f === 4 ? Ae = Qt(Ae, l) : (p.size === 0 ? p.first = l : p.last.r = l, p.last = l), p.size += 1;
}, Nt = (t) => {
  switch (t) {
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
}, Lt = /* @__PURE__ */ new Set();
let G, lt = 1, ft = 0, dt = 0, fe = null, Ua = (t) => {
  G = t;
}, Fr = (t) => {
  fe = t;
};
const tn = (t, r) => {
  if (t) {
    for (; t && !t.reg[r]; )
      t = Se(t);
    if (t)
      return t;
  }
  return null;
};
let Ba = (t, r, o, a, f) => {
  let p = tn(t, a.id);
  return p ? p.reg[a.id] : r ? (Le(r, a, f), r.reg[a.id]) : a;
};
const za = (t) => t;
let Le = (t, r, o, a, f) => {
  var p;
  let l = t.reg, R = r.sid, D = r == null || (p = r.meta) === null || p === void 0 ? void 0 : p.serialize;
  if (l[r.id])
    return;
  let g = { id: r.id, current: r.current, meta: r.meta };
  if (R && R in t.sidValuesMap && !(R in t.sidIdMap))
    g.current = (t.fromSerialize && D !== "ignore" && (D == null ? void 0 : D.read) || za)(t.sidValuesMap[R]);
  else if (r.before && !f) {
    let C = 0, h = o || !r.noInit || a;
    ue(r.before, (E) => {
      switch (E.type) {
        case ze: {
          let c = E.from;
          if (c || E.fn) {
            c && Le(t, c, o, a);
            let d = c && l[c.id].current;
            h && (g.current = E.fn ? E.fn(d) : d);
          }
          break;
        }
        case "field":
          C || (C = 1, g.current = Array.isArray(g.current) ? [...g.current] : { ...g.current }), Le(t, E.from, o, a), h && (g.current[E.field] = l[l[E.from.id].id].current);
      }
    });
  }
  R && (t.sidIdMap[R] = r.id), l[r.id] = g;
};
const qa = (t, r, o) => {
  try {
    return r(Fe(o), t.scope, o);
  } catch (a) {
    console.error(a), t.fail = 1;
  }
};
let je = (t, r = {}) => (we(t) && (je(t.or, r), ba(t, (o, a) => {
  ke(o) || a === "or" || a === "and" || (r[a] = o);
}), je(t.and, r)), r);
const Wr = (t, r) => {
  ct(t.next, r), ct(mt(t), r), ct(yt(t), r);
}, Ft = (t, r, o) => {
  let a;
  t.next.length = 0, t.seq.length = 0, t.scope = null;
  let f = yt(t);
  for (; a = f.pop(); )
    Wr(a, t), (r || o && te(t, "op") !== "sample" || a.family.type === "crosslink") && Ft(a, r, te(a, "op") !== "on" && o);
  for (f = mt(t); a = f.pop(); )
    Wr(a, t), o && a.family.type === "crosslink" && Ft(a, r, te(a, "op") !== "on" && o);
}, Ve = (t) => t.clear();
let Wt = (t, { deep: r } = {}) => {
  let o = 0;
  if (t.ownerSet && t.ownerSet.delete(t), Yt(t))
    Ve(vt(t));
  else if (Qr(t)) {
    o = 1;
    let a = t.history;
    Ve(a.events), Ve(a.effects), Ve(a.stores), Ve(a.domains);
  }
  Ft(de(t), !!r, o);
}, rn = (t) => {
  let r = () => Wt(t);
  return r.unsubscribe = r, r;
}, Xt = (t, r, o, a, f) => _e({ node: o, parent: t, child: r, scope: { fn: f }, meta: { op: a }, family: { owners: [t, r], links: r }, regional: 1 }), nn = (t, r) => (he(ie(r), ".watch argument should be a function"), rn(_e({ scope: { fn: r }, node: [Kt({ fn: Gt })], parent: t, meta: { op: "watch" }, family: { owners: t }, regional: 1 }))), Ya = (t, r, o = "event") => {
  Se(t) && Se(t).hooks[o](r);
}, an = (t, r, o) => {
  let a = je(o), f = t === "domain", p = Aa(), { sid: l = null, named: R = null, domain: D = null, parent: g = D } = a, C = R || a.name || (f ? "" : p), h = Ea(C, g), E = { op: r.kind = t, name: r.shortName = C, sid: r.sid = La(l), named: R, unitId: r.id = p, serialize: a.serialize, derived: a.derived, config: a };
  return r.parent = g, r.compositeName = h, r.defaultConfig = a, r.thru = (c) => (Ye(0, "thru", "js pipe"), c(r)), r.getType = () => h.fullName, !f && (r.subscribe = (c) => (ja(c), r.watch(ie(c) ? c : (d) => c.next && c.next(d))), r[Ra] = () => r), E;
};
const jt = (t, r, o, a) => {
  let f;
  we(o) && (f = o, o = o.fn);
  let p = ae({ name: `${t.shortName} → *`, derived: 1, and: f });
  return Xt(t, p, a, r, o), p;
}, on = (t, r, o, a, f) => {
  let p = pt(r), l = _t({ store: p, to: "a", priority: "read" });
  o === ze && (l.data.softRead = 1);
  let R = [l, Te(a)];
  return Ne("storeOnMap", p, R, Yt(t) && pt(t)), Xt(t, r, R, o, f);
};
let Ha = (t, r, o) => {
  try {
    return [1, t(...o)];
  } catch (a) {
    return r(a), [0, null];
  }
}, Ga = (t) => {
  let r = ye(t), o = { ref: r };
  return r && ce(r.activeEffects, o), o;
}, Ur = (t, r, o, a, f, p) => (l) => {
  p.ref && ct(p.ref.activeEffects, p), Be({ target: [a, Ka], params: [o ? { status: "done", params: t, result: l } : { status: "fail", params: t, error: l }, { value: l, fn: o ? r.rs : r.rj }], defer: 1, page: f.page, scope: p.ref, meta: f.meta });
};
const Ka = _e({ node: [Kt({ fn: ({ fn: t, value: r }) => t(r) })], meta: { op: "fx", fx: "sidechain" } }), _o = wa(() => {
  window.isBackFromBrowser = !1, window.history.back();
}), Ut = ae(), Bt = ae(), un = ae(), sn = ae(), ln = ae(), cn = ae(), Qa = zt({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null
}).on(Ut, (t, r) => ({
  ...t,
  activeView: r
})).on(Bt, (t, r) => ({
  ...t,
  activePanel: r
})).on(un, (t, r) => ({
  ...t,
  activeModal: r
})).on(ln, (t, r) => ({
  ...t,
  activeModal: r
})).on(sn, (t, r) => ({
  ...t,
  activePopout: r
})).on(cn, (t, r) => ({
  ...t,
  activePopout: r
}));
function fn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var pe = {}, Ja = {
  get exports() {
    return pe;
  },
  set exports(t) {
    pe = t;
  }
}, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Br;
function Xa() {
  if (Br)
    return I;
  Br = 1;
  var t = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), l = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), h = Symbol.iterator;
  function E(u) {
    return u === null || typeof u != "object" ? null : (u = h && u[h] || u["@@iterator"], typeof u == "function" ? u : null);
  }
  var c = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, d = Object.assign, v = {};
  function _(u, y, j) {
    this.props = u, this.context = y, this.refs = v, this.updater = j || c;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(u, y) {
    if (typeof u != "object" && typeof u != "function" && u != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, u, y, "setState");
  }, _.prototype.forceUpdate = function(u) {
    this.updater.enqueueForceUpdate(this, u, "forceUpdate");
  };
  function W() {
  }
  W.prototype = _.prototype;
  function F(u, y, j) {
    this.props = u, this.context = y, this.refs = v, this.updater = j || c;
  }
  var L = F.prototype = new W();
  L.constructor = F, d(L, _.prototype), L.isPureReactComponent = !0;
  var w = Array.isArray, O = Object.prototype.hasOwnProperty, S = { current: null }, T = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(u, y, j) {
    var V, $ = {}, U = null, Q = null;
    if (y != null)
      for (V in y.ref !== void 0 && (Q = y.ref), y.key !== void 0 && (U = "" + y.key), y)
        O.call(y, V) && !T.hasOwnProperty(V) && ($[V] = y[V]);
    var B = arguments.length - 2;
    if (B === 1)
      $.children = j;
    else if (1 < B) {
      for (var z = Array(B), Z = 0; Z < B; Z++)
        z[Z] = arguments[Z + 2];
      $.children = z;
    }
    if (u && u.defaultProps)
      for (V in B = u.defaultProps, B)
        $[V] === void 0 && ($[V] = B[V]);
    return { $$typeof: t, type: u, key: U, ref: Q, props: $, _owner: S.current };
  }
  function K(u, y) {
    return { $$typeof: t, type: u.type, key: y, ref: u.ref, props: u.props, _owner: u._owner };
  }
  function oe(u) {
    return typeof u == "object" && u !== null && u.$$typeof === t;
  }
  function ge(u) {
    var y = { "=": "=0", ":": "=2" };
    return "$" + u.replace(/[=:]/g, function(j) {
      return y[j];
    });
  }
  var se = /\/+/g;
  function ve(u, y) {
    return typeof u == "object" && u !== null && u.key != null ? ge("" + u.key) : y.toString(36);
  }
  function le(u, y, j, V, $) {
    var U = typeof u;
    (U === "undefined" || U === "boolean") && (u = null);
    var Q = !1;
    if (u === null)
      Q = !0;
    else
      switch (U) {
        case "string":
        case "number":
          Q = !0;
          break;
        case "object":
          switch (u.$$typeof) {
            case t:
            case r:
              Q = !0;
          }
      }
    if (Q)
      return Q = u, $ = $(Q), u = V === "" ? "." + ve(Q, 0) : V, w($) ? (j = "", u != null && (j = u.replace(se, "$&/") + "/"), le($, y, j, "", function(Z) {
        return Z;
      })) : $ != null && (oe($) && ($ = K($, j + (!$.key || Q && Q.key === $.key ? "" : ("" + $.key).replace(se, "$&/") + "/") + u)), y.push($)), 1;
    if (Q = 0, V = V === "" ? "." : V + ":", w(u))
      for (var B = 0; B < u.length; B++) {
        U = u[B];
        var z = V + ve(U, B);
        Q += le(U, y, j, z, $);
      }
    else if (z = E(u), typeof z == "function")
      for (u = z.call(u), B = 0; !(U = u.next()).done; )
        U = U.value, z = V + ve(U, B++), Q += le(U, y, j, z, $);
    else if (U === "object")
      throw y = String(u), Error("Objects are not valid as a React child (found: " + (y === "[object Object]" ? "object with keys {" + Object.keys(u).join(", ") + "}" : y) + "). If you meant to render a collection of children, use an array instead.");
    return Q;
  }
  function re(u, y, j) {
    if (u == null)
      return u;
    var V = [], $ = 0;
    return le(u, V, "", "", function(U) {
      return y.call(j, U, $++);
    }), V;
  }
  function ne(u) {
    if (u._status === -1) {
      var y = u._result;
      y = y(), y.then(function(j) {
        (u._status === 0 || u._status === -1) && (u._status = 1, u._result = j);
      }, function(j) {
        (u._status === 0 || u._status === -1) && (u._status = 2, u._result = j);
      }), u._status === -1 && (u._status = 0, u._result = y);
    }
    if (u._status === 1)
      return u._result.default;
    throw u._result;
  }
  var k = { current: null }, be = { transition: null }, Qe = { ReactCurrentDispatcher: k, ReactCurrentBatchConfig: be, ReactCurrentOwner: S };
  return I.Children = { map: re, forEach: function(u, y, j) {
    re(u, function() {
      y.apply(this, arguments);
    }, j);
  }, count: function(u) {
    var y = 0;
    return re(u, function() {
      y++;
    }), y;
  }, toArray: function(u) {
    return re(u, function(y) {
      return y;
    }) || [];
  }, only: function(u) {
    if (!oe(u))
      throw Error("React.Children.only expected to receive a single React element child.");
    return u;
  } }, I.Component = _, I.Fragment = o, I.Profiler = f, I.PureComponent = F, I.StrictMode = a, I.Suspense = D, I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qe, I.cloneElement = function(u, y, j) {
    if (u == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + u + ".");
    var V = d({}, u.props), $ = u.key, U = u.ref, Q = u._owner;
    if (y != null) {
      if (y.ref !== void 0 && (U = y.ref, Q = S.current), y.key !== void 0 && ($ = "" + y.key), u.type && u.type.defaultProps)
        var B = u.type.defaultProps;
      for (z in y)
        O.call(y, z) && !T.hasOwnProperty(z) && (V[z] = y[z] === void 0 && B !== void 0 ? B[z] : y[z]);
    }
    var z = arguments.length - 2;
    if (z === 1)
      V.children = j;
    else if (1 < z) {
      B = Array(z);
      for (var Z = 0; Z < z; Z++)
        B[Z] = arguments[Z + 2];
      V.children = B;
    }
    return { $$typeof: t, type: u.type, key: $, ref: U, props: V, _owner: Q };
  }, I.createContext = function(u) {
    return u = { $$typeof: l, _currentValue: u, _currentValue2: u, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, u.Provider = { $$typeof: p, _context: u }, u.Consumer = u;
  }, I.createElement = x, I.createFactory = function(u) {
    var y = x.bind(null, u);
    return y.type = u, y;
  }, I.createRef = function() {
    return { current: null };
  }, I.forwardRef = function(u) {
    return { $$typeof: R, render: u };
  }, I.isValidElement = oe, I.lazy = function(u) {
    return { $$typeof: C, _payload: { _status: -1, _result: u }, _init: ne };
  }, I.memo = function(u, y) {
    return { $$typeof: g, type: u, compare: y === void 0 ? null : y };
  }, I.startTransition = function(u) {
    var y = be.transition;
    be.transition = {};
    try {
      u();
    } finally {
      be.transition = y;
    }
  }, I.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, I.useCallback = function(u, y) {
    return k.current.useCallback(u, y);
  }, I.useContext = function(u) {
    return k.current.useContext(u);
  }, I.useDebugValue = function() {
  }, I.useDeferredValue = function(u) {
    return k.current.useDeferredValue(u);
  }, I.useEffect = function(u, y) {
    return k.current.useEffect(u, y);
  }, I.useId = function() {
    return k.current.useId();
  }, I.useImperativeHandle = function(u, y, j) {
    return k.current.useImperativeHandle(u, y, j);
  }, I.useInsertionEffect = function(u, y) {
    return k.current.useInsertionEffect(u, y);
  }, I.useLayoutEffect = function(u, y) {
    return k.current.useLayoutEffect(u, y);
  }, I.useMemo = function(u, y) {
    return k.current.useMemo(u, y);
  }, I.useReducer = function(u, y, j) {
    return k.current.useReducer(u, y, j);
  }, I.useRef = function(u) {
    return k.current.useRef(u);
  }, I.useState = function(u) {
    return k.current.useState(u);
  }, I.useSyncExternalStore = function(u, y, j) {
    return k.current.useSyncExternalStore(u, y, j);
  }, I.useTransition = function() {
    return k.current.useTransition();
  }, I.version = "18.2.0", I;
}
var Ue = {}, Za = {
  get exports() {
    return Ue;
  },
  set exports(t) {
    Ue = t;
  }
};
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zr;
function eo() {
  return zr || (zr = 1, function(t, r) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var o = "18.2.0", a = Symbol.for("react.element"), f = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), g = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), _ = Symbol.iterator, W = "@@iterator";
      function F(e) {
        if (e === null || typeof e != "object")
          return null;
        var n = _ && e[_] || e[W];
        return typeof n == "function" ? n : null;
      }
      var L = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, w = {
        transition: null
      }, O = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, S = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, T = {}, x = null;
      function K(e) {
        x = e;
      }
      T.setExtraStackFrame = function(e) {
        x = e;
      }, T.getCurrentStack = null, T.getStackAddendum = function() {
        var e = "";
        x && (e += x);
        var n = T.getCurrentStack;
        return n && (e += n() || ""), e;
      };
      var oe = !1, ge = !1, se = !1, ve = !1, le = !1, re = {
        ReactCurrentDispatcher: L,
        ReactCurrentBatchConfig: w,
        ReactCurrentOwner: S
      };
      re.ReactDebugCurrentFrame = T, re.ReactCurrentActQueue = O;
      function ne(e) {
        {
          for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
            i[s - 1] = arguments[s];
          be("warn", e, i);
        }
      }
      function k(e) {
        {
          for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
            i[s - 1] = arguments[s];
          be("error", e, i);
        }
      }
      function be(e, n, i) {
        {
          var s = re.ReactDebugCurrentFrame, m = s.getStackAddendum();
          m !== "" && (n += "%s", i = i.concat([m]));
          var A = i.map(function(b) {
            return String(b);
          });
          A.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, A);
        }
      }
      var Qe = {};
      function u(e, n) {
        {
          var i = e.constructor, s = i && (i.displayName || i.name) || "ReactClass", m = s + "." + n;
          if (Qe[m])
            return;
          k("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", n, s), Qe[m] = !0;
        }
      }
      var y = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, n, i) {
          u(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, n, i, s) {
          u(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, n, i, s) {
          u(e, "setState");
        }
      }, j = Object.assign, V = {};
      Object.freeze(V);
      function $(e, n, i) {
        this.props = e, this.context = n, this.refs = V, this.updater = i || y;
      }
      $.prototype.isReactComponent = {}, $.prototype.setState = function(e, n) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, n, "setState");
      }, $.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var U = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Q = function(e, n) {
          Object.defineProperty($.prototype, e, {
            get: function() {
              ne("%s(...) is deprecated in plain JavaScript React classes. %s", n[0], n[1]);
            }
          });
        };
        for (var B in U)
          U.hasOwnProperty(B) && Q(B, U[B]);
      }
      function z() {
      }
      z.prototype = $.prototype;
      function Z(e, n, i) {
        this.props = e, this.context = n, this.refs = V, this.updater = i || y;
      }
      var gt = Z.prototype = new z();
      gt.constructor = Z, j(gt, $.prototype), gt.isPureReactComponent = !0;
      function pn() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var vn = Array.isArray;
      function Je(e) {
        return vn(e);
      }
      function mn(e) {
        {
          var n = typeof Symbol == "function" && Symbol.toStringTag, i = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return i;
        }
      }
      function yn(e) {
        try {
          return Zt(e), !1;
        } catch {
          return !0;
        }
      }
      function Zt(e) {
        return "" + e;
      }
      function Xe(e) {
        if (yn(e))
          return k("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", mn(e)), Zt(e);
      }
      function hn(e, n, i) {
        var s = e.displayName;
        if (s)
          return s;
        var m = n.displayName || n.name || "";
        return m !== "" ? i + "(" + m + ")" : i;
      }
      function er(e) {
        return e.displayName || "Context";
      }
      function me(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && k("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case p:
            return "Fragment";
          case f:
            return "Portal";
          case R:
            return "Profiler";
          case l:
            return "StrictMode";
          case h:
            return "Suspense";
          case E:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case g:
              var n = e;
              return er(n) + ".Consumer";
            case D:
              var i = e;
              return er(i._context) + ".Provider";
            case C:
              return hn(e, e.render, "ForwardRef");
            case c:
              var s = e.displayName || null;
              return s !== null ? s : me(e.type) || "Memo";
            case d: {
              var m = e, A = m._payload, b = m._init;
              try {
                return me(b(A));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Ie = Object.prototype.hasOwnProperty, tr = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, rr, nr, bt;
      bt = {};
      function ar(e) {
        if (Ie.call(e, "ref")) {
          var n = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (n && n.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function or(e) {
        if (Ie.call(e, "key")) {
          var n = Object.getOwnPropertyDescriptor(e, "key").get;
          if (n && n.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function _n(e, n) {
        var i = function() {
          rr || (rr = !0, k("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
      function gn(e, n) {
        var i = function() {
          nr || (nr = !0, k("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
      function bn(e) {
        if (typeof e.ref == "string" && S.current && e.__self && S.current.stateNode !== e.__self) {
          var n = me(S.current.type);
          bt[n] || (k('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', n, e.ref), bt[n] = !0);
        }
      }
      var Et = function(e, n, i, s, m, A, b) {
        var P = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: a,
          // Built-in properties that belong on the element
          type: e,
          key: n,
          ref: i,
          props: b,
          // Record the component responsible for creating this element.
          _owner: A
        };
        return P._store = {}, Object.defineProperty(P._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(P, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: s
        }), Object.defineProperty(P, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: m
        }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
      };
      function En(e, n, i) {
        var s, m = {}, A = null, b = null, P = null, M = null;
        if (n != null) {
          ar(n) && (b = n.ref, bn(n)), or(n) && (Xe(n.key), A = "" + n.key), P = n.__self === void 0 ? null : n.__self, M = n.__source === void 0 ? null : n.__source;
          for (s in n)
            Ie.call(n, s) && !tr.hasOwnProperty(s) && (m[s] = n[s]);
        }
        var N = arguments.length - 2;
        if (N === 1)
          m.children = i;
        else if (N > 1) {
          for (var q = Array(N), Y = 0; Y < N; Y++)
            q[Y] = arguments[Y + 2];
          Object.freeze && Object.freeze(q), m.children = q;
        }
        if (e && e.defaultProps) {
          var H = e.defaultProps;
          for (s in H)
            m[s] === void 0 && (m[s] = H[s]);
        }
        if (A || b) {
          var J = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          A && _n(m, J), b && gn(m, J);
        }
        return Et(e, A, b, P, M, S.current, m);
      }
      function Sn(e, n) {
        var i = Et(e.type, n, e.ref, e._self, e._source, e._owner, e.props);
        return i;
      }
      function wn(e, n, i) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var s, m = j({}, e.props), A = e.key, b = e.ref, P = e._self, M = e._source, N = e._owner;
        if (n != null) {
          ar(n) && (b = n.ref, N = S.current), or(n) && (Xe(n.key), A = "" + n.key);
          var q;
          e.type && e.type.defaultProps && (q = e.type.defaultProps);
          for (s in n)
            Ie.call(n, s) && !tr.hasOwnProperty(s) && (n[s] === void 0 && q !== void 0 ? m[s] = q[s] : m[s] = n[s]);
        }
        var Y = arguments.length - 2;
        if (Y === 1)
          m.children = i;
        else if (Y > 1) {
          for (var H = Array(Y), J = 0; J < Y; J++)
            H[J] = arguments[J + 2];
          m.children = H;
        }
        return Et(e.type, A, b, P, M, N, m);
      }
      function Re(e) {
        return typeof e == "object" && e !== null && e.$$typeof === a;
      }
      var ur = ".", Rn = ":";
      function On(e) {
        var n = /[=:]/g, i = {
          "=": "=0",
          ":": "=2"
        }, s = e.replace(n, function(m) {
          return i[m];
        });
        return "$" + s;
      }
      var ir = !1, Cn = /\/+/g;
      function sr(e) {
        return e.replace(Cn, "$&/");
      }
      function St(e, n) {
        return typeof e == "object" && e !== null && e.key != null ? (Xe(e.key), On("" + e.key)) : n.toString(36);
      }
      function Ze(e, n, i, s, m) {
        var A = typeof e;
        (A === "undefined" || A === "boolean") && (e = null);
        var b = !1;
        if (e === null)
          b = !0;
        else
          switch (A) {
            case "string":
            case "number":
              b = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case a:
                case f:
                  b = !0;
              }
          }
        if (b) {
          var P = e, M = m(P), N = s === "" ? ur + St(P, 0) : s;
          if (Je(M)) {
            var q = "";
            N != null && (q = sr(N) + "/"), Ze(M, n, q, "", function(ga) {
              return ga;
            });
          } else
            M != null && (Re(M) && (M.key && (!P || P.key !== M.key) && Xe(M.key), M = Sn(
              M,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              i + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (M.key && (!P || P.key !== M.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                sr("" + M.key) + "/"
              ) : "") + N
            )), n.push(M));
          return 1;
        }
        var Y, H, J = 0, X = s === "" ? ur : s + Rn;
        if (Je(e))
          for (var it = 0; it < e.length; it++)
            Y = e[it], H = X + St(Y, it), J += Ze(Y, n, i, H, m);
        else {
          var Dt = F(e);
          if (typeof Dt == "function") {
            var Lr = e;
            Dt === Lr.entries && (ir || ne("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ir = !0);
            for (var ha = Dt.call(Lr), jr, _a = 0; !(jr = ha.next()).done; )
              Y = jr.value, H = X + St(Y, _a++), J += Ze(Y, n, i, H, m);
          } else if (A === "object") {
            var xr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (xr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : xr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return J;
      }
      function et(e, n, i) {
        if (e == null)
          return e;
        var s = [], m = 0;
        return Ze(e, s, "", "", function(A) {
          return n.call(i, A, m++);
        }), s;
      }
      function kn(e) {
        var n = 0;
        return et(e, function() {
          n++;
        }), n;
      }
      function Tn(e, n, i) {
        et(e, function() {
          n.apply(this, arguments);
        }, i);
      }
      function An(e) {
        return et(e, function(n) {
          return n;
        }) || [];
      }
      function Pn(e) {
        if (!Re(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function Dn(e) {
        var n = {
          $$typeof: g,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        n.Provider = {
          $$typeof: D,
          _context: n
        };
        var i = !1, s = !1, m = !1;
        {
          var A = {
            $$typeof: g,
            _context: n
          };
          Object.defineProperties(A, {
            Provider: {
              get: function() {
                return s || (s = !0, k("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), n.Provider;
              },
              set: function(b) {
                n.Provider = b;
              }
            },
            _currentValue: {
              get: function() {
                return n._currentValue;
              },
              set: function(b) {
                n._currentValue = b;
              }
            },
            _currentValue2: {
              get: function() {
                return n._currentValue2;
              },
              set: function(b) {
                n._currentValue2 = b;
              }
            },
            _threadCount: {
              get: function() {
                return n._threadCount;
              },
              set: function(b) {
                n._threadCount = b;
              }
            },
            Consumer: {
              get: function() {
                return i || (i = !0, k("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), n.Consumer;
              }
            },
            displayName: {
              get: function() {
                return n.displayName;
              },
              set: function(b) {
                m || (ne("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", b), m = !0);
              }
            }
          }), n.Consumer = A;
        }
        return n._currentRenderer = null, n._currentRenderer2 = null, n;
      }
      var $e = -1, wt = 0, lr = 1, Ln = 2;
      function jn(e) {
        if (e._status === $e) {
          var n = e._result, i = n();
          if (i.then(function(A) {
            if (e._status === wt || e._status === $e) {
              var b = e;
              b._status = lr, b._result = A;
            }
          }, function(A) {
            if (e._status === wt || e._status === $e) {
              var b = e;
              b._status = Ln, b._result = A;
            }
          }), e._status === $e) {
            var s = e;
            s._status = wt, s._result = i;
          }
        }
        if (e._status === lr) {
          var m = e._result;
          return m === void 0 && k(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, m), "default" in m || k(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, m), m.default;
        } else
          throw e._result;
      }
      function xn(e) {
        var n = {
          // We use these fields to store the result.
          _status: $e,
          _result: e
        }, i = {
          $$typeof: d,
          _payload: n,
          _init: jn
        };
        {
          var s, m;
          Object.defineProperties(i, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return s;
              },
              set: function(A) {
                k("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), s = A, Object.defineProperty(i, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return m;
              },
              set: function(A) {
                k("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), m = A, Object.defineProperty(i, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return i;
      }
      function In(e) {
        e != null && e.$$typeof === c ? k("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? k("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && k("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && k("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var n = {
          $$typeof: C,
          render: e
        };
        {
          var i;
          Object.defineProperty(n, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return i;
            },
            set: function(s) {
              i = s, !e.name && !e.displayName && (e.displayName = s);
            }
          });
        }
        return n;
      }
      var cr;
      cr = Symbol.for("react.module.reference");
      function fr(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === p || e === R || le || e === l || e === h || e === E || ve || e === v || oe || ge || se || typeof e == "object" && e !== null && (e.$$typeof === d || e.$$typeof === c || e.$$typeof === D || e.$$typeof === g || e.$$typeof === C || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === cr || e.getModuleId !== void 0));
      }
      function $n(e, n) {
        fr(e) || k("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var i = {
          $$typeof: c,
          type: e,
          compare: n === void 0 ? null : n
        };
        {
          var s;
          Object.defineProperty(i, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return s;
            },
            set: function(m) {
              s = m, !e.name && !e.displayName && (e.displayName = m);
            }
          });
        }
        return i;
      }
      function ee() {
        var e = L.current;
        return e === null && k(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function Mn(e) {
        var n = ee();
        if (e._context !== void 0) {
          var i = e._context;
          i.Consumer === e ? k("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : i.Provider === e && k("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return n.useContext(e);
      }
      function Vn(e) {
        var n = ee();
        return n.useState(e);
      }
      function Nn(e, n, i) {
        var s = ee();
        return s.useReducer(e, n, i);
      }
      function Fn(e) {
        var n = ee();
        return n.useRef(e);
      }
      function Wn(e, n) {
        var i = ee();
        return i.useEffect(e, n);
      }
      function Un(e, n) {
        var i = ee();
        return i.useInsertionEffect(e, n);
      }
      function Bn(e, n) {
        var i = ee();
        return i.useLayoutEffect(e, n);
      }
      function zn(e, n) {
        var i = ee();
        return i.useCallback(e, n);
      }
      function qn(e, n) {
        var i = ee();
        return i.useMemo(e, n);
      }
      function Yn(e, n, i) {
        var s = ee();
        return s.useImperativeHandle(e, n, i);
      }
      function Hn(e, n) {
        {
          var i = ee();
          return i.useDebugValue(e, n);
        }
      }
      function Gn() {
        var e = ee();
        return e.useTransition();
      }
      function Kn(e) {
        var n = ee();
        return n.useDeferredValue(e);
      }
      function Qn() {
        var e = ee();
        return e.useId();
      }
      function Jn(e, n, i) {
        var s = ee();
        return s.useSyncExternalStore(e, n, i);
      }
      var Me = 0, dr, pr, vr, mr, yr, hr, _r;
      function gr() {
      }
      gr.__reactDisabledLog = !0;
      function Xn() {
        {
          if (Me === 0) {
            dr = console.log, pr = console.info, vr = console.warn, mr = console.error, yr = console.group, hr = console.groupCollapsed, _r = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: gr,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          Me++;
        }
      }
      function Zn() {
        {
          if (Me--, Me === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: j({}, e, {
                value: dr
              }),
              info: j({}, e, {
                value: pr
              }),
              warn: j({}, e, {
                value: vr
              }),
              error: j({}, e, {
                value: mr
              }),
              group: j({}, e, {
                value: yr
              }),
              groupCollapsed: j({}, e, {
                value: hr
              }),
              groupEnd: j({}, e, {
                value: _r
              })
            });
          }
          Me < 0 && k("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Rt = re.ReactCurrentDispatcher, Ot;
      function tt(e, n, i) {
        {
          if (Ot === void 0)
            try {
              throw Error();
            } catch (m) {
              var s = m.stack.trim().match(/\n( *(at )?)/);
              Ot = s && s[1] || "";
            }
          return `
` + Ot + e;
        }
      }
      var Ct = !1, rt;
      {
        var ea = typeof WeakMap == "function" ? WeakMap : Map;
        rt = new ea();
      }
      function br(e, n) {
        if (!e || Ct)
          return "";
        {
          var i = rt.get(e);
          if (i !== void 0)
            return i;
        }
        var s;
        Ct = !0;
        var m = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var A;
        A = Rt.current, Rt.current = null, Xn();
        try {
          if (n) {
            var b = function() {
              throw Error();
            };
            if (Object.defineProperty(b.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (X) {
                s = X;
              }
              Reflect.construct(e, [], b);
            } else {
              try {
                b.call();
              } catch (X) {
                s = X;
              }
              e.call(b.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (X) {
              s = X;
            }
            e();
          }
        } catch (X) {
          if (X && s && typeof X.stack == "string") {
            for (var P = X.stack.split(`
`), M = s.stack.split(`
`), N = P.length - 1, q = M.length - 1; N >= 1 && q >= 0 && P[N] !== M[q]; )
              q--;
            for (; N >= 1 && q >= 0; N--, q--)
              if (P[N] !== M[q]) {
                if (N !== 1 || q !== 1)
                  do
                    if (N--, q--, q < 0 || P[N] !== M[q]) {
                      var Y = `
` + P[N].replace(" at new ", " at ");
                      return e.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", e.displayName)), typeof e == "function" && rt.set(e, Y), Y;
                    }
                  while (N >= 1 && q >= 0);
                break;
              }
          }
        } finally {
          Ct = !1, Rt.current = A, Zn(), Error.prepareStackTrace = m;
        }
        var H = e ? e.displayName || e.name : "", J = H ? tt(H) : "";
        return typeof e == "function" && rt.set(e, J), J;
      }
      function ta(e, n, i) {
        return br(e, !1);
      }
      function ra(e) {
        var n = e.prototype;
        return !!(n && n.isReactComponent);
      }
      function nt(e, n, i) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return br(e, ra(e));
        if (typeof e == "string")
          return tt(e);
        switch (e) {
          case h:
            return tt("Suspense");
          case E:
            return tt("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case C:
              return ta(e.render);
            case c:
              return nt(e.type, n, i);
            case d: {
              var s = e, m = s._payload, A = s._init;
              try {
                return nt(A(m), n, i);
              } catch {
              }
            }
          }
        return "";
      }
      var Er = {}, Sr = re.ReactDebugCurrentFrame;
      function at(e) {
        if (e) {
          var n = e._owner, i = nt(e.type, e._source, n ? n.type : null);
          Sr.setExtraStackFrame(i);
        } else
          Sr.setExtraStackFrame(null);
      }
      function na(e, n, i, s, m) {
        {
          var A = Function.call.bind(Ie);
          for (var b in e)
            if (A(e, b)) {
              var P = void 0;
              try {
                if (typeof e[b] != "function") {
                  var M = Error((s || "React class") + ": " + i + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw M.name = "Invariant Violation", M;
                }
                P = e[b](n, b, s, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (N) {
                P = N;
              }
              P && !(P instanceof Error) && (at(m), k("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", i, b, typeof P), at(null)), P instanceof Error && !(P.message in Er) && (Er[P.message] = !0, at(m), k("Failed %s type: %s", i, P.message), at(null));
            }
        }
      }
      function Oe(e) {
        if (e) {
          var n = e._owner, i = nt(e.type, e._source, n ? n.type : null);
          K(i);
        } else
          K(null);
      }
      var kt;
      kt = !1;
      function wr() {
        if (S.current) {
          var e = me(S.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function aa(e) {
        if (e !== void 0) {
          var n = e.fileName.replace(/^.*[\\\/]/, ""), i = e.lineNumber;
          return `

Check your code at ` + n + ":" + i + ".";
        }
        return "";
      }
      function oa(e) {
        return e != null ? aa(e.__source) : "";
      }
      var Rr = {};
      function ua(e) {
        var n = wr();
        if (!n) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (n = `

Check the top-level render call using <` + i + ">.");
        }
        return n;
      }
      function Or(e, n) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var i = ua(n);
          if (!Rr[i]) {
            Rr[i] = !0;
            var s = "";
            e && e._owner && e._owner !== S.current && (s = " It was passed a child from " + me(e._owner.type) + "."), Oe(e), k('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, s), Oe(null);
          }
        }
      }
      function Cr(e, n) {
        if (typeof e == "object") {
          if (Je(e))
            for (var i = 0; i < e.length; i++) {
              var s = e[i];
              Re(s) && Or(s, n);
            }
          else if (Re(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var m = F(e);
            if (typeof m == "function" && m !== e.entries)
              for (var A = m.call(e), b; !(b = A.next()).done; )
                Re(b.value) && Or(b.value, n);
          }
        }
      }
      function kr(e) {
        {
          var n = e.type;
          if (n == null || typeof n == "string")
            return;
          var i;
          if (typeof n == "function")
            i = n.propTypes;
          else if (typeof n == "object" && (n.$$typeof === C || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          n.$$typeof === c))
            i = n.propTypes;
          else
            return;
          if (i) {
            var s = me(n);
            na(i, e.props, "prop", s, e);
          } else if (n.PropTypes !== void 0 && !kt) {
            kt = !0;
            var m = me(n);
            k("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", m || "Unknown");
          }
          typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && k("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function ia(e) {
        {
          for (var n = Object.keys(e.props), i = 0; i < n.length; i++) {
            var s = n[i];
            if (s !== "children" && s !== "key") {
              Oe(e), k("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), Oe(null);
              break;
            }
          }
          e.ref !== null && (Oe(e), k("Invalid attribute `ref` supplied to `React.Fragment`."), Oe(null));
        }
      }
      function Tr(e, n, i) {
        var s = fr(e);
        if (!s) {
          var m = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var A = oa(n);
          A ? m += A : m += wr();
          var b;
          e === null ? b = "null" : Je(e) ? b = "array" : e !== void 0 && e.$$typeof === a ? (b = "<" + (me(e.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : b = typeof e, k("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", b, m);
        }
        var P = En.apply(this, arguments);
        if (P == null)
          return P;
        if (s)
          for (var M = 2; M < arguments.length; M++)
            Cr(arguments[M], e);
        return e === p ? ia(P) : kr(P), P;
      }
      var Ar = !1;
      function sa(e) {
        var n = Tr.bind(null, e);
        return n.type = e, Ar || (Ar = !0, ne("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(n, "type", {
          enumerable: !1,
          get: function() {
            return ne("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), n;
      }
      function la(e, n, i) {
        for (var s = wn.apply(this, arguments), m = 2; m < arguments.length; m++)
          Cr(arguments[m], s.type);
        return kr(s), s;
      }
      function ca(e, n) {
        var i = w.transition;
        w.transition = {};
        var s = w.transition;
        w.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (w.transition = i, i === null && s._updatedFibers) {
            var m = s._updatedFibers.size;
            m > 10 && ne("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
          }
        }
      }
      var Pr = !1, ot = null;
      function fa(e) {
        if (ot === null)
          try {
            var n = ("require" + Math.random()).slice(0, 7), i = t && t[n];
            ot = i.call(t, "timers").setImmediate;
          } catch {
            ot = function(m) {
              Pr === !1 && (Pr = !0, typeof MessageChannel > "u" && k("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var A = new MessageChannel();
              A.port1.onmessage = m, A.port2.postMessage(void 0);
            };
          }
        return ot(e);
      }
      var Ce = 0, Dr = !1;
      function da(e) {
        {
          var n = Ce;
          Ce++, O.current === null && (O.current = []);
          var i = O.isBatchingLegacy, s;
          try {
            if (O.isBatchingLegacy = !0, s = e(), !i && O.didScheduleLegacyUpdate) {
              var m = O.current;
              m !== null && (O.didScheduleLegacyUpdate = !1, Pt(m));
            }
          } catch (H) {
            throw ut(n), H;
          } finally {
            O.isBatchingLegacy = i;
          }
          if (s !== null && typeof s == "object" && typeof s.then == "function") {
            var A = s, b = !1, P = {
              then: function(H, J) {
                b = !0, A.then(function(X) {
                  ut(n), Ce === 0 ? Tt(X, H, J) : H(X);
                }, function(X) {
                  ut(n), J(X);
                });
              }
            };
            return !Dr && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              b || (Dr = !0, k("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), P;
          } else {
            var M = s;
            if (ut(n), Ce === 0) {
              var N = O.current;
              N !== null && (Pt(N), O.current = null);
              var q = {
                then: function(H, J) {
                  O.current === null ? (O.current = [], Tt(M, H, J)) : H(M);
                }
              };
              return q;
            } else {
              var Y = {
                then: function(H, J) {
                  H(M);
                }
              };
              return Y;
            }
          }
        }
      }
      function ut(e) {
        e !== Ce - 1 && k("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ce = e;
      }
      function Tt(e, n, i) {
        {
          var s = O.current;
          if (s !== null)
            try {
              Pt(s), fa(function() {
                s.length === 0 ? (O.current = null, n(e)) : Tt(e, n, i);
              });
            } catch (m) {
              i(m);
            }
          else
            n(e);
        }
      }
      var At = !1;
      function Pt(e) {
        if (!At) {
          At = !0;
          var n = 0;
          try {
            for (; n < e.length; n++) {
              var i = e[n];
              do
                i = i(!0);
              while (i !== null);
            }
            e.length = 0;
          } catch (s) {
            throw e = e.slice(n + 1), s;
          } finally {
            At = !1;
          }
        }
      }
      var pa = Tr, va = la, ma = sa, ya = {
        map: et,
        forEach: Tn,
        count: kn,
        toArray: An,
        only: Pn
      };
      r.Children = ya, r.Component = $, r.Fragment = p, r.Profiler = R, r.PureComponent = Z, r.StrictMode = l, r.Suspense = h, r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = re, r.cloneElement = va, r.createContext = Dn, r.createElement = pa, r.createFactory = ma, r.createRef = pn, r.forwardRef = In, r.isValidElement = Re, r.lazy = xn, r.memo = $n, r.startTransition = ca, r.unstable_act = da, r.useCallback = zn, r.useContext = Mn, r.useDebugValue = Hn, r.useDeferredValue = Kn, r.useEffect = Wn, r.useId = Qn, r.useImperativeHandle = Yn, r.useInsertionEffect = Un, r.useLayoutEffect = Bn, r.useMemo = qn, r.useReducer = Nn, r.useRef = Fn, r.useState = Vn, r.useSyncExternalStore = Jn, r.useTransition = Gn, r.version = o, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Za, Ue)), Ue;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = Xa() : t.exports = eo();
})(Ja);
const xe = /* @__PURE__ */ fn(pe);
var qr = {}, to = {
  get exports() {
    return qr;
  },
  set exports(t) {
    qr = t;
  }
}, xt = {}, Ge = {}, ro = {
  get exports() {
    return Ge;
  },
  set exports(t) {
    Ge = t;
  }
}, It = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yr;
function no() {
  if (Yr)
    return It;
  Yr = 1;
  var t = pe;
  function r(h, E) {
    return h === E && (h !== 0 || 1 / h === 1 / E) || h !== h && E !== E;
  }
  var o = typeof Object.is == "function" ? Object.is : r, a = t.useState, f = t.useEffect, p = t.useLayoutEffect, l = t.useDebugValue;
  function R(h, E) {
    var c = E(), d = a({ inst: { value: c, getSnapshot: E } }), v = d[0].inst, _ = d[1];
    return p(function() {
      v.value = c, v.getSnapshot = E, D(v) && _({ inst: v });
    }, [h, c, E]), f(function() {
      return D(v) && _({ inst: v }), h(function() {
        D(v) && _({ inst: v });
      });
    }, [h]), l(c), c;
  }
  function D(h) {
    var E = h.getSnapshot;
    h = h.value;
    try {
      var c = E();
      return !o(h, c);
    } catch {
      return !0;
    }
  }
  function g(h, E) {
    return E();
  }
  var C = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : R;
  return It.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : C, It;
}
var $t = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hr;
function ao() {
  return Hr || (Hr = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = pe, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function o(L) {
      {
        for (var w = arguments.length, O = new Array(w > 1 ? w - 1 : 0), S = 1; S < w; S++)
          O[S - 1] = arguments[S];
        a("error", L, O);
      }
    }
    function a(L, w, O) {
      {
        var S = r.ReactDebugCurrentFrame, T = S.getStackAddendum();
        T !== "" && (w += "%s", O = O.concat([T]));
        var x = O.map(function(K) {
          return String(K);
        });
        x.unshift("Warning: " + w), Function.prototype.apply.call(console[L], console, x);
      }
    }
    function f(L, w) {
      return L === w && (L !== 0 || 1 / L === 1 / w) || L !== L && w !== w;
    }
    var p = typeof Object.is == "function" ? Object.is : f, l = t.useState, R = t.useEffect, D = t.useLayoutEffect, g = t.useDebugValue, C = !1, h = !1;
    function E(L, w, O) {
      C || t.startTransition !== void 0 && (C = !0, o("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var S = w();
      if (!h) {
        var T = w();
        p(S, T) || (o("The result of getSnapshot should be cached to avoid an infinite loop"), h = !0);
      }
      var x = l({
        inst: {
          value: S,
          getSnapshot: w
        }
      }), K = x[0].inst, oe = x[1];
      return D(function() {
        K.value = S, K.getSnapshot = w, c(K) && oe({
          inst: K
        });
      }, [L, S, w]), R(function() {
        c(K) && oe({
          inst: K
        });
        var ge = function() {
          c(K) && oe({
            inst: K
          });
        };
        return L(ge);
      }, [L]), g(S), S;
    }
    function c(L) {
      var w = L.getSnapshot, O = L.value;
      try {
        var S = w();
        return !p(O, S);
      } catch {
        return !0;
      }
    }
    function d(L, w, O) {
      return w();
    }
    var v = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _ = !v, W = _ ? d : E, F = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : W;
    $t.useSyncExternalStore = F, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), $t;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = no() : t.exports = ao();
})(ro);
const oo = /* @__PURE__ */ fn(Ge);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gr;
function uo() {
  if (Gr)
    return xt;
  Gr = 1;
  var t = pe, r = Ge;
  function o(g, C) {
    return g === C && (g !== 0 || 1 / g === 1 / C) || g !== g && C !== C;
  }
  var a = typeof Object.is == "function" ? Object.is : o, f = r.useSyncExternalStore, p = t.useRef, l = t.useEffect, R = t.useMemo, D = t.useDebugValue;
  return xt.useSyncExternalStoreWithSelector = function(g, C, h, E, c) {
    var d = p(null);
    if (d.current === null) {
      var v = { hasValue: !1, value: null };
      d.current = v;
    } else
      v = d.current;
    d = R(function() {
      function W(S) {
        if (!F) {
          if (F = !0, L = S, S = E(S), c !== void 0 && v.hasValue) {
            var T = v.value;
            if (c(T, S))
              return w = T;
          }
          return w = S;
        }
        if (T = w, a(L, S))
          return T;
        var x = E(S);
        return c !== void 0 && c(T, x) ? T : (L = S, w = x);
      }
      var F = !1, L, w, O = h === void 0 ? null : h;
      return [function() {
        return W(C());
      }, O === null ? void 0 : function() {
        return W(O());
      }];
    }, [C, h, E, c]);
    var _ = f(g, d[0], d[1]);
    return l(function() {
      v.hasValue = !0, v.value = _;
    }, [_]), D(_), _;
  }, xt;
}
var Mt = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kr;
function io() {
  return Kr || (Kr = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = pe, r = Ge;
    function o(C, h) {
      return C === h && (C !== 0 || 1 / C === 1 / h) || C !== C && h !== h;
    }
    var a = typeof Object.is == "function" ? Object.is : o, f = r.useSyncExternalStore, p = t.useRef, l = t.useEffect, R = t.useMemo, D = t.useDebugValue;
    function g(C, h, E, c, d) {
      var v = p(null), _;
      v.current === null ? (_ = {
        hasValue: !1,
        value: null
      }, v.current = _) : _ = v.current;
      var W = R(function() {
        var O = !1, S, T, x = function(se) {
          if (!O) {
            O = !0, S = se;
            var ve = c(se);
            if (d !== void 0 && _.hasValue) {
              var le = _.value;
              if (d(le, ve))
                return T = le, le;
            }
            return T = ve, ve;
          }
          var re = S, ne = T;
          if (a(re, se))
            return ne;
          var k = c(se);
          return d !== void 0 && d(ne, k) ? ne : (S = se, T = k, k);
        }, K = E === void 0 ? null : E, oe = function() {
          return x(h());
        }, ge = K === null ? void 0 : function() {
          return x(K());
        };
        return [oe, ge];
      }, [h, E, c, d]), F = W[0], L = W[1], w = f(C, F, L);
      return l(function() {
        _.hasValue = !0, _.value = w;
      }, [w]), D(w), w;
    }
    Mt.useSyncExternalStoreWithSelector = g, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Mt;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = uo() : t.exports = io();
})(to);
function so(t, r, o, a) {
  let f = [Va.run({ fn: (p) => r(p) })];
  if (a && f.unshift(a), o) {
    let p = _e({ node: f }), l = t.graphite.id, R = o.additionalLinks, D = R[l] || [];
    return R[l] = D, D.push(p), () => {
      let g = D.indexOf(p);
      g !== -1 && D.splice(g, 1), Wt(p);
    };
  }
  {
    let p = _e({ node: f, parent: [t], family: { owners: t } });
    return () => {
      Wt(p);
    };
  }
}
function lo(t, r) {
  Ta.store(t) || dn("expect useStore argument to be a store");
  let o = xe.useCallback((f) => so(t, f, r), [t, r]), a = xe.useCallback(() => vo(t, r), [t, r]);
  return po(o, a, a);
}
function co(t) {
  let r = xe.useContext(mo);
  return t && !r && dn("No scope found, consider adding <Provider> to app root"), r;
}
function fo(t, r) {
  return lo(t, co(r == null ? void 0 : r.forceScope));
}
let dn = (t) => {
  throw Error(t);
};
typeof window < "u" ? xe.useLayoutEffect : xe.useEffect;
const { useSyncExternalStore: po } = oo, vo = (t, r) => r ? r.getState(t) : t.getState(), mo = xe.createContext(null), yo = (t, r, o) => {
  pe.useEffect(() => {
    const a = (f) => {
      f instanceof KeyboardEvent && f.key === o ? r(f) : o || r(f);
    };
    return window.addEventListener(t, a), () => window.removeEventListener(t, a);
  }, [t, o, r]);
}, go = (t, ...r) => {
  const { activeView: o, activePanel: a, activeModal: f, activePopout: p } = ho();
  pe.useEffect(() => {
    Ut(t.view), Bt(t.panel), t.modal && un(t.modal), t.popout && sn(t.popout);
  }, [t.view, t.panel, t.modal, t.popout]), pe.useEffect(() => {
    const l = window.history.state ?? {
      view: void 0,
      panel: void 0,
      modal: void 0,
      popout: void 0
    };
    (l.view !== o || l.panel !== a || l.modal !== f || l.popout !== p) && window.history.pushState({
      view: o,
      panel: a,
      modal: f,
      popout: p
    }, "");
  }, [o, a, f, p]), yo("popstate", async () => {
    await (async () => {
      const { view: R, panel: D, modal: g, popout: C } = window.history.state ?? {
        view: void 0,
        panel: void 0,
        modal: void 0,
        popout: void 0
      };
      console.log("prevRoutes", R, D, g, C), console.log("storeRoutes", o, a, f, p);
      for (const h in r)
        if (!await r[h]({
          view: o,
          panel: a,
          modal: f,
          popout: p
        }, { view: R, panel: D, modal: g, popout: C }))
          return;
      Ut(R), Bt(D), ln(g), cn(C);
    })(), window.isBackFromBrowser = !0;
  });
}, ho = () => fo(Qa), bo = (t) => t, Eo = (t, r) => (o, a) => ["view", "panel", "modal", "popout"].some((p) => o[p] === t && o[p] !== a[p]) && window.isBackFromBrowser ? (r && r(o, a), window.history.pushState(o, ""), !1) : !0;
export {
  _o as back,
  Eo as createDisableBackBrowserRouteMiddleware,
  bo as createRouteMiddleware,
  un as setActiveModal,
  Bt as setActivePanel,
  sn as setActivePopout,
  Ut as setActiveView,
  go as useInitRouter,
  ho as useRouter
};
