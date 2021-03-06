!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define("frentreprise", [], t)
      : "object" == typeof exports
        ? (exports.frentreprise = t())
        : (e.frentreprise = t());
})(global, function() {
  return (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) ||
          Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
          });
      }),
      (r.r = function(e) {
        Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      (r.w = {}),
      r((r.s = 61))
    );
  })([
    function(e, t, r) {
      "use strict";
      var n = r(15),
        o = r(39),
        a = Object.prototype.toString;
      function s(e) {
        return "[object Array]" === a.call(e);
      }
      function i(e) {
        return null !== e && "object" == typeof e;
      }
      function u(e) {
        return "[object Function]" === a.call(e);
      }
      function c(e, t) {
        if (null !== e && void 0 !== e)
          if (("object" != typeof e && (e = [e]), s(e)))
            for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e);
          else
            for (var o in e)
              Object.prototype.hasOwnProperty.call(e, o) &&
                t.call(null, e[o], o, e);
      }
      e.exports = {
        isArray: s,
        isArrayBuffer: function(e) {
          return "[object ArrayBuffer]" === a.call(e);
        },
        isBuffer: o,
        isFormData: function(e) {
          return "undefined" != typeof FormData && e instanceof FormData;
        },
        isArrayBufferView: function(e) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && e.buffer instanceof ArrayBuffer;
        },
        isString: function(e) {
          return "string" == typeof e;
        },
        isNumber: function(e) {
          return "number" == typeof e;
        },
        isObject: i,
        isUndefined: function(e) {
          return void 0 === e;
        },
        isDate: function(e) {
          return "[object Date]" === a.call(e);
        },
        isFile: function(e) {
          return "[object File]" === a.call(e);
        },
        isBlob: function(e) {
          return "[object Blob]" === a.call(e);
        },
        isFunction: u,
        isStream: function(e) {
          return i(e) && u(e.pipe);
        },
        isURLSearchParams: function(e) {
          return (
            "undefined" != typeof URLSearchParams &&
            e instanceof URLSearchParams
          );
        },
        isStandardBrowserEnv: function() {
          return (
            ("undefined" == typeof navigator ||
              "ReactNative" !== navigator.product) &&
            "undefined" != typeof window &&
            "undefined" != typeof document
          );
        },
        forEach: c,
        merge: function e() {
          var t = {};
          function r(r, n) {
            "object" == typeof t[n] && "object" == typeof r
              ? (t[n] = e(t[n], r))
              : (t[n] = r);
          }
          for (var n = 0, o = arguments.length; n < o; n++) c(arguments[n], r);
          return t;
        },
        deepMerge: function e() {
          var t = {};
          function r(r, n) {
            "object" == typeof t[n] && "object" == typeof r
              ? (t[n] = e(t[n], r))
              : (t[n] = "object" == typeof r ? e({}, r) : r);
          }
          for (var n = 0, o = arguments.length; n < o; n++) c(arguments[n], r);
          return t;
        },
        extend: function(e, t, r) {
          return (
            c(t, function(t, o) {
              e[o] = r && "function" == typeof t ? n(t, r) : t;
            }),
            e
          );
        },
        trim: function(e) {
          return e.replace(/^\s*/, "").replace(/\s*$/, "");
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var n, o;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          convertDate: e => (
            e > 1e11 && (e /= 1e3), (e && new Date(1e3 * e)) || void 0
          ),
          getCleanAddress: e =>
            `\n    ${e.numero_voie || ""} ${e.type_voie || ""} ${e.nom_voie ||
              ""}\n    ${e.complement_adresse || ""} ${e.code_postal ||
              ""}\n    ${e.localite || ""}\n    `
              .trim()
              .split("\n")
              .map(e => e.trim())
              .join("\n"),
          requestAPI: ((o = function*(e, t, r, n) {
            const o = {};
            try {
              const a = yield e.get(t, r);
              a && a.data && (yield Promise.resolve(n(o, a.data)));
            } catch (e) {
              if (e && "request" in e) {
                let { message: t, request: r, response: n, config: o } = e;
                "object" != typeof o && (r = {}),
                  "object" != typeof r && (r = {}),
                  "object" != typeof r.res && (r.res = {}),
                  "object" != typeof n && (n = {}),
                  n.data || (n.data = "(no data)");
                let { responseUrl: a } = r.res;
                a =
                  a || r._currentUrl || "object" == typeof r._currentRequest
                    ? `${("" + (o.baseURL || "")).replace(
                        /^(https?:\/\/[^\/]*).*$/i,
                        "$1"
                      )}${r._currentRequest && r._currentRequest.path}`
                    : "unknown";
                const s =
                    "object" == typeof n.data
                      ? JSON.stringify(n.data, !0, 2)
                      : n.data,
                  i = JSON.stringify(o.proxy || !1, !0, 2);
                console.error(
                  `\n--\n⚠️  ${t}\n${a}\nProxy: ${i}\n--\n${s}\n--\n`.trim()
                );
              } else console.error(e);
            }
            return o;
          }),
          (n = function() {
            var e = o.apply(this, arguments);
            return new Promise(function(t, r) {
              return (function n(o, a) {
                try {
                  var s = e[o](a),
                    i = s.value;
                } catch (e) {
                  return void r(e);
                }
                if (!s.done)
                  return Promise.resolve(i).then(
                    function(e) {
                      n("next", e);
                    },
                    function(e) {
                      n("throw", e);
                    }
                  );
                t(i);
              })("next");
            });
          }),
          function(e, t, r, o) {
            return n.apply(this, arguments);
          })
        });
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(4);
      Object.keys(n).forEach(function(e) {
        "default" !== e &&
          "__esModule" !== e &&
          Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
              return n[e];
            }
          });
      }),
        (t.cleanObject = function(e) {
          return (
            Object.keys(e || {}).forEach(t => {
              (null !== e[t] && void 0 !== e[t]) || delete e[t];
            }),
            e
          );
        });
    },
    function(e, t, r) {
      "use strict";
      var n = r(11);
      e.exports = function(e, t, r, o, a) {
        var s = new Error(e);
        return n(s, t, r, o, a);
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.validateSIREN = function(e, t = !1) {
          if (!/^[0-9]{9}$/.test(e)) return !1;
          if (!t) return !0;
          return (
            e.split("").reduce((e, t, r) => {
              t = +t;
              const n = r % 2 == 0;
              return n ? e + t : e + ((t *= 2) > 9 ? t - 9 : t);
            }, 0) %
              10 ==
            0
          );
        }),
        (t.validateSIRET = function(e, t = !1) {
          if (!/^[0-9]{14}$/.test(e)) return !1;
          if (!t) return !0;
          return (
            e.split("").reduce((e, t, r) => {
              t = +t;
              const n = r % 2 != 0;
              return n ? e + t : e + ((t *= 2) > 9 ? t - 9 : t);
            }, 0) %
              10 ==
            0
          );
        });
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        };
      const o = Symbol("_importData"),
        a = Symbol("_data");
      t.default = class {
        constructor(e = {}) {
          this[o](e, !0);
        }
        updateData(e) {
          this[o](e);
        }
        replaceData(e) {
          this[o](e, !0);
        }
        [o](e, t = !1) {
          "object" == typeof e && (this[a] = n({}, !0 === t ? {} : this[a], e)),
            Object.keys(this[a]).forEach(e => {
              this.hasOwnProperty(e) ||
                Object.defineProperty(this, e, { get: () => this[a][e] });
            }, this);
        }
      };
      t._protected = { _importData: o };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Etablissement = t.Entreprise = void 0);
      var n = r(18);
      Object.defineProperty(t, "Entreprise", {
        enumerable: !0,
        get: function() {
          return s(n).default;
        }
      });
      var o = r(17);
      Object.defineProperty(t, "Etablissement", {
        enumerable: !0,
        get: function() {
          return s(o).default;
        }
      });
      var a = s(n);
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = a.default;
    },
    function(e, t, r) {
      "use strict";
      function n(e) {
        this.message = e;
      }
      (n.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "");
      }),
        (n.prototype.__CANCEL__ = !0),
        (e.exports = n);
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = function(e, t) {
        t = t || {};
        var r = {};
        return (
          n.forEach(["url", "method", "params", "data"], function(e) {
            void 0 !== t[e] && (r[e] = t[e]);
          }),
          n.forEach(["headers", "auth", "proxy"], function(o) {
            n.isObject(t[o])
              ? (r[o] = n.deepMerge(e[o], t[o]))
              : void 0 !== t[o]
                ? (r[o] = t[o])
                : n.isObject(e[o])
                  ? (r[o] = n.deepMerge(e[o]))
                  : void 0 !== e[o] && (r[o] = e[o]);
          }),
          n.forEach(
            [
              "baseURL",
              "transformRequest",
              "transformResponse",
              "paramsSerializer",
              "timeout",
              "withCredentials",
              "adapter",
              "responseType",
              "xsrfCookieName",
              "xsrfHeaderName",
              "onUploadProgress",
              "onDownloadProgress",
              "maxContentLength",
              "validateStatus",
              "maxRedirects",
              "httpAgent",
              "httpsAgent",
              "cancelToken",
              "socketPath"
            ],
            function(n) {
              void 0 !== t[n]
                ? (r[n] = t[n])
                : void 0 !== e[n] && (r[n] = e[n]);
            }
          ),
          r
        );
      };
    },
    function(e, t) {
      e.exports = require("follow-redirects");
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      function o(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      e.exports = function(e, t, r) {
        if (!t) return e;
        var a;
        if (r) a = r(t);
        else if (n.isURLSearchParams(t)) a = t.toString();
        else {
          var s = [];
          n.forEach(t, function(e, t) {
            null !== e &&
              void 0 !== e &&
              (n.isArray(e) ? (t += "[]") : (e = [e]),
              n.forEach(e, function(e) {
                n.isDate(e)
                  ? (e = e.toISOString())
                  : n.isObject(e) && (e = JSON.stringify(e)),
                  s.push(o(t) + "=" + o(e));
              }));
          }),
            (a = s.join("&"));
        }
        return a && (e += (-1 === e.indexOf("?") ? "?" : "&") + a), e;
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e, t, r, n, o) {
        return (
          (e.config = t),
          r && (e.code = r),
          (e.request = n),
          (e.response = o),
          e
        );
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(3);
      e.exports = function(e, t, r) {
        var o = r.config.validateStatus;
        r.status && o && !o(r.status)
          ? t(
              n(
                "Request failed with status code " + r.status,
                r.config,
                null,
                r.request,
                r
              )
            )
          : e(r);
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(34),
        a = { "Content-Type": "application/x-www-form-urlencoded" };
      function s(e, t) {
        !n.isUndefined(e) &&
          n.isUndefined(e["Content-Type"]) &&
          (e["Content-Type"] = t);
      }
      var i,
        u = {
          adapter: ("undefined" != typeof process &&
          "[object process]" === Object.prototype.toString.call(process)
            ? (i = r(33))
            : "undefined" != typeof XMLHttpRequest && (i = r(27)),
          i),
          transformRequest: [
            function(e, t) {
              return (
                o(t, "Content-Type"),
                n.isFormData(e) ||
                n.isArrayBuffer(e) ||
                n.isBuffer(e) ||
                n.isStream(e) ||
                n.isFile(e) ||
                n.isBlob(e)
                  ? e
                  : n.isArrayBufferView(e)
                    ? e.buffer
                    : n.isURLSearchParams(e)
                      ? (s(
                          t,
                          "application/x-www-form-urlencoded;charset=utf-8"
                        ),
                        e.toString())
                      : n.isObject(e)
                        ? (s(t, "application/json;charset=utf-8"),
                          JSON.stringify(e))
                        : e
              );
            }
          ],
          transformResponse: [
            function(e) {
              if ("string" == typeof e)
                try {
                  e = JSON.parse(e);
                } catch (e) {}
              return e;
            }
          ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          validateStatus: function(e) {
            return e >= 200 && e < 300;
          }
        };
      (u.headers = { common: { Accept: "application/json, text/plain, */*" } }),
        n.forEach(["delete", "get", "head"], function(e) {
          u.headers[e] = {};
        }),
        n.forEach(["post", "put", "patch"], function(e) {
          u.headers[e] = n.merge(a);
        }),
        (e.exports = u);
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e) {
        return !(!e || !e.__CANCEL__);
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e, t) {
        return function() {
          for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n];
          return e.apply(t, r);
        };
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(56),
        a = (n = o) && n.__esModule ? n : { default: n };
      function s(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(o, a) {
              try {
                var s = t[o](a),
                  i = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(i).then(
                  function(e) {
                    n("next", e);
                  },
                  function(e) {
                    n("throw", e);
                  }
                );
              e(i);
            })("next");
          });
        };
      }
      t.default = class {
        getSIRET() {
          return s(function*() {
            throw new a.default();
          })();
        }
        getSIREN() {
          return s(function*() {
            throw new a.default();
          })();
        }
        search() {
          return s(function*() {
            throw new a.default();
          })();
        }
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        a = r(5),
        s = (n = a) && n.__esModule ? n : { default: n },
        i = r(2);
      const u = Symbol("_entreprise");
      t.default = class extends s.default {
        constructor(e, t) {
          super(), (this[u] = t), this.replaceData(e);
        }
        [a._protected._importData](e) {
          if (this[u]) {
            const t = e && e._etData;
            t &&
              "object" == typeof t &&
              (this[u].updateData((0, i.cleanObject)(t)),
              this[u].updateData({
                _dataSources: o({}, this[u]._dataSources, e._dataSources)
              }),
              delete e._etData);
          }
          super[a._protected._importData](e);
        }
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(5),
        o = u(n),
        a = u(r(6)),
        s = r(4),
        i = r(2);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const c = Symbol("_ets"),
        f = Symbol("_etsModel");
      t.default = class extends o.default {
        constructor(e, t = a.default) {
          super(), (this[c] = []), (this[f] = t), this.replaceData(e);
        }
        [n._protected._importData](e, t) {
          const r = e && e._ets;
          r &&
            (Array.isArray(r) || (r = [r]),
            r.forEach(e => {
              e &&
                "object" == typeof e &&
                (0, s.validateSIRET)(e.siret) &&
                this.getEtablissement(e.siret).updateData(
                  (0, i.cleanObject)(e)
                );
            }),
            delete e._ets),
            super[n._protected._importData](e, t);
        }
        get etablissements() {
          return this[c];
        }
        hasEtablissement(e) {
          return !!this.getEtablissement(e, !1);
        }
        getEtablissement(e, t = !0) {
          return (
            this[c].find(t => t.siret === e) ||
            (t &&
              this[c].push(new this[f]({ siret: e }, this)) &&
              this.getEtablissement(e)) ||
            null
          );
        }
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e) {
        return function(t) {
          return e.apply(null, t);
        };
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(7);
      function o(e) {
        if ("function" != typeof e)
          throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) {
          t = e;
        });
        var r = this;
        e(function(e) {
          r.reason || ((r.reason = new n(e)), t(r.reason));
        });
      }
      (o.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason;
      }),
        (o.source = function() {
          var e;
          return {
            token: new o(function(t) {
              e = t;
            }),
            cancel: e
          };
        }),
        (e.exports = o);
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.isStandardBrowserEnv()
        ? {
            write: function(e, t, r, o, a, s) {
              var i = [];
              i.push(e + "=" + encodeURIComponent(t)),
                n.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()),
                n.isString(o) && i.push("path=" + o),
                n.isString(a) && i.push("domain=" + a),
                !0 === s && i.push("secure"),
                (document.cookie = i.join("; "));
            },
            read: function(e) {
              var t = document.cookie.match(
                new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
              );
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function(e) {
              this.write(e, "", Date.now() - 864e5);
            }
          }
        : {
            write: function() {},
            read: function() {
              return null;
            },
            remove: function() {}
          };
    },
    function(e, t, r) {
      "use strict";
      var n =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      function o() {
        this.message = "String contains an invalid character";
      }
      (o.prototype = new Error()),
        (o.prototype.code = 5),
        (o.prototype.name = "InvalidCharacterError"),
        (e.exports = function(e) {
          for (
            var t, r, a = String(e), s = "", i = 0, u = n;
            a.charAt(0 | i) || ((u = "="), i % 1);
            s += u.charAt(63 & (t >> (8 - (i % 1) * 8)))
          ) {
            if ((r = a.charCodeAt((i += 0.75))) > 255) throw new o();
            t = (t << 8) | r;
          }
          return s;
        });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.isStandardBrowserEnv()
        ? (function() {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              r = document.createElement("a");
            function o(e) {
              var n = e;
              return (
                t && (r.setAttribute("href", n), (n = r.href)),
                r.setAttribute("href", n),
                {
                  href: r.href,
                  protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                  host: r.host,
                  search: r.search ? r.search.replace(/^\?/, "") : "",
                  hash: r.hash ? r.hash.replace(/^#/, "") : "",
                  hostname: r.hostname,
                  port: r.port,
                  pathname:
                    "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                }
              );
            }
            return (
              (e = o(window.location.href)),
              function(t) {
                var r = n.isString(t) ? o(t) : t;
                return r.protocol === e.protocol && r.host === e.host;
              }
            );
          })()
        : function() {
            return !0;
          };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent"
        ];
      e.exports = function(e) {
        var t,
          r,
          a,
          s = {};
        return e
          ? (n.forEach(e.split("\n"), function(e) {
              if (
                ((a = e.indexOf(":")),
                (t = n.trim(e.substr(0, a)).toLowerCase()),
                (r = n.trim(e.substr(a + 1))),
                t)
              ) {
                if (s[t] && o.indexOf(t) >= 0) return;
                s[t] =
                  "set-cookie" === t
                    ? (s[t] ? s[t] : []).concat([r])
                    : s[t] ? s[t] + ", " + r : r;
              }
            }),
            s)
          : s;
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(12),
        a = r(10),
        s = r(26),
        i = r(25),
        u = r(3),
        c =
          ("undefined" != typeof window &&
            window.btoa &&
            window.btoa.bind(window)) ||
          r(24);
      e.exports = function(e) {
        return new Promise(function(t, f) {
          var l = e.data,
            d = e.headers;
          n.isFormData(l) && delete d["Content-Type"];
          var p = new XMLHttpRequest(),
            h = "onreadystatechange",
            m = !1;
          if (
            ("undefined" == typeof window ||
              !window.XDomainRequest ||
              "withCredentials" in p ||
              i(e.url) ||
              ((p = new window.XDomainRequest()),
              (h = "onload"),
              (m = !0),
              (p.onprogress = function() {}),
              (p.ontimeout = function() {})),
            e.auth)
          ) {
            var v = e.auth.username || "",
              y = e.auth.password || "";
            d.Authorization = "Basic " + c(v + ":" + y);
          }
          if (
            (p.open(
              e.method.toUpperCase(),
              a(e.url, e.params, e.paramsSerializer),
              !0
            ),
            (p.timeout = e.timeout),
            (p[h] = function() {
              if (
                p &&
                (4 === p.readyState || m) &&
                (0 !== p.status ||
                  (p.responseURL && 0 === p.responseURL.indexOf("file:")))
              ) {
                var r =
                    "getAllResponseHeaders" in p
                      ? s(p.getAllResponseHeaders())
                      : null,
                  n = {
                    data:
                      e.responseType && "text" !== e.responseType
                        ? p.response
                        : p.responseText,
                    status: 1223 === p.status ? 204 : p.status,
                    statusText: 1223 === p.status ? "No Content" : p.statusText,
                    headers: r,
                    config: e,
                    request: p
                  };
                o(t, f, n), (p = null);
              }
            }),
            (p.onabort = function() {
              p && (f(u("Request aborted", e, "ECONNABORTED", p)), (p = null));
            }),
            (p.onerror = function() {
              f(u("Network Error", e, null, p)), (p = null);
            }),
            (p.ontimeout = function() {
              f(
                u(
                  "timeout of " + e.timeout + "ms exceeded",
                  e,
                  "ECONNABORTED",
                  p
                )
              ),
                (p = null);
            }),
            n.isStandardBrowserEnv())
          ) {
            var _ = r(23),
              g =
                (e.withCredentials || i(e.url)) && e.xsrfCookieName
                  ? _.read(e.xsrfCookieName)
                  : void 0;
            g && (d[e.xsrfHeaderName] = g);
          }
          if (
            ("setRequestHeader" in p &&
              n.forEach(d, function(e, t) {
                void 0 === l && "content-type" === t.toLowerCase()
                  ? delete d[t]
                  : p.setRequestHeader(t, e);
              }),
            e.withCredentials && (p.withCredentials = !0),
            e.responseType)
          )
            try {
              p.responseType = e.responseType;
            } catch (t) {
              if ("json" !== e.responseType) throw t;
            }
          "function" == typeof e.onDownloadProgress &&
            p.addEventListener("progress", e.onDownloadProgress),
            "function" == typeof e.onUploadProgress &&
              p.upload &&
              p.upload.addEventListener("progress", e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function(e) {
                p && (p.abort(), f(e), (p = null));
              }),
            void 0 === l && (l = null),
            p.send(l);
        });
      };
    },
    function(e) {
      e.exports = {
        name: "axios",
        version: "0.18.0",
        description: "Promise based HTTP client for the browser and node.js",
        main: "index.js",
        scripts: {
          test: "grunt test && bundlesize",
          start: "node ./sandbox/server.js",
          build: "NODE_ENV=production grunt build",
          preversion: "npm test",
          version:
            "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
          postversion: "git push && git push --tags",
          examples: "node ./examples/server.js",
          coveralls:
            "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
          fix: "eslint --fix lib/**/*.js"
        },
        repository: { type: "git", url: "https://github.com/axios/axios.git" },
        keywords: ["xhr", "http", "ajax", "promise", "node"],
        author: "Matt Zabriskie",
        license: "MIT",
        bugs: { url: "https://github.com/axios/axios/issues" },
        homepage: "https://github.com/axios/axios",
        devDependencies: {
          bundlesize: "^0.17.0",
          coveralls: "^3.0.0",
          "es6-promise": "^4.2.4",
          grunt: "^1.0.2",
          "grunt-banner": "^0.6.0",
          "grunt-cli": "^1.2.0",
          "grunt-contrib-clean": "^1.1.0",
          "grunt-contrib-nodeunit": "^1.0.0",
          "grunt-contrib-watch": "^1.0.0",
          "grunt-eslint": "^20.1.0",
          "grunt-karma": "^2.0.0",
          "grunt-ts": "^6.0.0-beta.19",
          "grunt-webpack": "^1.0.18",
          "istanbul-instrumenter-loader": "^1.0.0",
          "jasmine-core": "^2.4.1",
          karma: "^1.3.0",
          "karma-chrome-launcher": "^2.2.0",
          "karma-coverage": "^1.1.1",
          "karma-firefox-launcher": "^1.1.0",
          "karma-jasmine": "^1.1.1",
          "karma-jasmine-ajax": "^0.1.13",
          "karma-opera-launcher": "^1.0.0",
          "karma-safari-launcher": "^1.0.0",
          "karma-sauce-launcher": "^1.2.0",
          "karma-sinon": "^1.0.5",
          "karma-sourcemap-loader": "^0.3.7",
          "karma-webpack": "^1.7.0",
          "load-grunt-tasks": "^3.5.2",
          minimist: "^1.2.0",
          sinon: "^4.5.0",
          webpack: "^1.13.1",
          "webpack-dev-server": "^1.14.1",
          "url-search-params": "^0.10.0",
          typescript: "^2.8.1"
        },
        browser: { "./lib/adapters/http.js": "./lib/adapters/xhr.js" },
        typings: "./index.d.ts",
        dependencies: { "follow-redirects": "^1.4.1", "is-buffer": "^2.0.2" },
        bundlesize: [{ path: "./dist/axios.min.js", threshold: "5kB" }]
      };
    },
    function(e, t) {
      e.exports = require("zlib");
    },
    function(e, t) {
      e.exports = require("url");
    },
    function(e, t) {
      e.exports = require("https");
    },
    function(e, t) {
      e.exports = require("http");
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(12),
        a = r(10),
        s = r(32),
        i = r(31),
        u = r(9).http,
        c = r(9).https,
        f = r(30),
        l = r(29),
        d = r(28),
        p = r(3),
        h = r(11);
      e.exports = function(e) {
        return new Promise(function(t, r) {
          var m,
            v = function(e) {
              clearTimeout(m), t(e);
            },
            y = function(e) {
              clearTimeout(m), r(e);
            },
            _ = e.data,
            g = e.headers;
          if (
            (g["User-Agent"] ||
              g["user-agent"] ||
              (g["User-Agent"] = "axios/" + d.version),
            _ && !n.isStream(_))
          ) {
            if (Buffer.isBuffer(_));
            else if (n.isArrayBuffer(_)) _ = new Buffer(new Uint8Array(_));
            else {
              if (!n.isString(_))
                return y(
                  p(
                    "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
                    e
                  )
                );
              _ = new Buffer(_, "utf-8");
            }
            g["Content-Length"] = _.length;
          }
          var b = void 0;
          e.auth &&
            (b = (e.auth.username || "") + ":" + (e.auth.password || ""));
          var x = f.parse(e.url),
            w = x.protocol || "http:";
          if (!b && x.auth) {
            var j = x.auth.split(":");
            b = (j[0] || "") + ":" + (j[1] || "");
          }
          b && delete g.Authorization;
          var S = "https:" === w,
            P = S ? e.httpsAgent : e.httpAgent,
            E = {
              path: a(x.path, e.params, e.paramsSerializer).replace(/^\?/, ""),
              method: e.method,
              headers: g,
              agent: P,
              auth: b
            };
          e.socketPath
            ? (E.socketPath = e.socketPath)
            : ((E.hostname = x.hostname), (E.port = x.port));
          var O,
            A = e.proxy;
          if (!A && !1 !== A) {
            var D = w.slice(0, -1) + "_proxy",
              R = process.env[D] || process.env[D.toUpperCase()];
            if (R) {
              var M = f.parse(R);
              if (((A = { host: M.hostname, port: M.port }), M.auth)) {
                var k = M.auth.split(":");
                A.auth = { username: k[0], password: k[1] };
              }
            }
          }
          if (
            A &&
            ((E.hostname = A.host),
            (E.host = A.host),
            (E.headers.host = x.hostname + (x.port ? ":" + x.port : "")),
            (E.port = A.port),
            (E.path =
              w + "//" + x.hostname + (x.port ? ":" + x.port : "") + E.path),
            A.auth)
          ) {
            var q = new Buffer(
              A.auth.username + ":" + A.auth.password,
              "utf8"
            ).toString("base64");
            E.headers["Proxy-Authorization"] = "Basic " + q;
          }
          e.transport
            ? (O = e.transport)
            : 0 === e.maxRedirects
              ? (O = S ? i : s)
              : (e.maxRedirects && (E.maxRedirects = e.maxRedirects),
                (O = S ? c : u)),
            e.maxContentLength &&
              e.maxContentLength > -1 &&
              (E.maxBodyLength = e.maxContentLength);
          var C = O.request(E, function(t) {
            if (!C.aborted) {
              var r = t;
              switch (t.headers["content-encoding"]) {
                case "gzip":
                case "compress":
                case "deflate":
                  (r = r.pipe(l.createUnzip())),
                    delete t.headers["content-encoding"];
              }
              var n = t.req || C,
                a = {
                  status: t.statusCode,
                  statusText: t.statusMessage,
                  headers: t.headers,
                  config: e,
                  request: n
                };
              if ("stream" === e.responseType) (a.data = r), o(v, y, a);
              else {
                var s = [];
                r.on("data", function(t) {
                  s.push(t),
                    e.maxContentLength > -1 &&
                      Buffer.concat(s).length > e.maxContentLength &&
                      y(
                        p(
                          "maxContentLength size of " +
                            e.maxContentLength +
                            " exceeded",
                          e,
                          null,
                          n
                        )
                      );
                }),
                  r.on("error", function(t) {
                    C.aborted || y(h(t, e, null, n));
                  }),
                  r.on("end", function() {
                    var t = Buffer.concat(s);
                    "arraybuffer" !== e.responseType &&
                      (t = t.toString(e.responseEncoding)),
                      (a.data = t),
                      o(v, y, a);
                  });
              }
            }
          });
          C.on("error", function(t) {
            C.aborted || y(h(t, e, null, C));
          }),
            e.timeout &&
              (m = setTimeout(function() {
                C.abort(),
                  y(
                    p(
                      "timeout of " + e.timeout + "ms exceeded",
                      e,
                      "ECONNABORTED",
                      C
                    )
                  );
              }, e.timeout)),
            e.cancelToken &&
              e.cancelToken.promise.then(function(e) {
                C.aborted || (C.abort(), y(e));
              }),
            n.isStream(_)
              ? _.on("error", function(t) {
                  y(h(t, e, null, C));
                }).pipe(C)
              : C.end(_);
        });
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = function(e, t) {
        n.forEach(e, function(r, n) {
          n !== t &&
            n.toUpperCase() === t.toUpperCase() &&
            ((e[t] = r), delete e[n]);
        });
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = function(e, t, r) {
        return (
          n.forEach(r, function(r) {
            e = r(e, t);
          }),
          e
        );
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(35),
        a = r(14),
        s = r(13),
        i = r(22),
        u = r(21);
      function c(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
      }
      e.exports = function(e) {
        return (
          c(e),
          e.baseURL && !i(e.url) && (e.url = u(e.baseURL, e.url)),
          (e.headers = e.headers || {}),
          (e.data = o(e.data, e.headers, e.transformRequest)),
          (e.headers = n.merge(
            e.headers.common || {},
            e.headers[e.method] || {},
            e.headers || {}
          )),
          n.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function(t) {
              delete e.headers[t];
            }
          ),
          (e.adapter || s.adapter)(e).then(
            function(t) {
              return (
                c(e), (t.data = o(t.data, t.headers, e.transformResponse)), t
              );
            },
            function(t) {
              return (
                a(t) ||
                  (c(e),
                  t &&
                    t.response &&
                    (t.response.data = o(
                      t.response.data,
                      t.response.headers,
                      e.transformResponse
                    ))),
                Promise.reject(t)
              );
            }
          )
        );
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      function o() {
        this.handlers = [];
      }
      (o.prototype.use = function(e, t) {
        return (
          this.handlers.push({ fulfilled: e, rejected: t }),
          this.handlers.length - 1
        );
      }),
        (o.prototype.eject = function(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }),
        (o.prototype.forEach = function(e) {
          n.forEach(this.handlers, function(t) {
            null !== t && e(t);
          });
        }),
        (e.exports = o);
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(37),
        a = r(36),
        s = r(8);
      function i(e) {
        (this.defaults = e),
          (this.interceptors = { request: new o(), response: new o() });
      }
      (i.prototype.request = function(e) {
        "string" == typeof e
          ? ((e = arguments[1] || {}).url = arguments[0])
          : (e = e || {}),
          ((e = s(this.defaults, e)).method = e.method
            ? e.method.toLowerCase()
            : "get");
        var t = [a, void 0],
          r = Promise.resolve(e);
        for (
          this.interceptors.request.forEach(function(e) {
            t.unshift(e.fulfilled, e.rejected);
          }),
            this.interceptors.response.forEach(function(e) {
              t.push(e.fulfilled, e.rejected);
            });
          t.length;

        )
          r = r.then(t.shift(), t.shift());
        return r;
      }),
        n.forEach(["delete", "get", "head", "options"], function(e) {
          i.prototype[e] = function(t, r) {
            return this.request(n.merge(r || {}, { method: e, url: t }));
          };
        }),
        n.forEach(["post", "put", "patch"], function(e) {
          i.prototype[e] = function(t, r, o) {
            return this.request(
              n.merge(o || {}, { method: e, url: t, data: r })
            );
          };
        }),
        (e.exports = i);
    },
    function(e, t) {
      e.exports = require("is-buffer");
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        o = r(15),
        a = r(38),
        s = r(8);
      function i(e) {
        var t = new a(e),
          r = o(a.prototype.request, t);
        return n.extend(r, a.prototype, t), n.extend(r, t), r;
      }
      var u = i(r(13));
      (u.Axios = a),
        (u.create = function(e) {
          return i(s(u.defaults, e));
        }),
        (u.Cancel = r(7)),
        (u.CancelToken = r(20)),
        (u.isCancel = r(14)),
        (u.all = function(e) {
          return Promise.all(e);
        }),
        (u.spread = r(19)),
        (e.exports = u),
        (e.exports.default = u);
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(40);
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `attestations_sociales_acoss/${e}`,
          r,
          function(e, t) {
            t &&
              t.url &&
              "string" == typeof t.url &&
              t.url.length &&
              (e.attestation_acoss = t.url);
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `attestations_fiscales_dgfip/${e}`,
          r,
          function(e, t) {
            t &&
              t.url &&
              "string" == typeof t.url &&
              t.url.length &&
              (e.attestation_dgfip = t.url);
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(t, `entreprises/${e}`, r, function(
          e,
          t
        ) {
          if (t && t.entreprise) {
            const r = t.entreprise;
            ["categorie_entreprise"].forEach(function(t) {
              e[t] = r[t];
            }),
              r.tranche_effectif_salarie_entreprise &&
                "object" == typeof r.tranche_effectif_salarie_entreprise &&
                ((e.annee_tranche_effectif =
                  +r.tranche_effectif_salarie_entreprise.date_reference ||
                  void 0),
                (e.tranche_effectif =
                  r.tranche_effectif_salarie_entreprise.intitule || void 0)),
              Array.isArray(r.mandataires_sociaux) &&
                ((e.mandataires_sociaux = []),
                r.mandataires_sociaux.forEach(function(t) {
                  e.mandataires_sociaux.push({
                    nom: t.nom,
                    prenom: t.prenom,
                    fonction: t.fonction,
                    raison_sociale: t.raison_sociale
                  });
                }));
          }
        });
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `entreprises_legacy/${e}`,
          r,
          function(e, t) {
            if (t && t.entreprise) {
              const r = t.entreprise;
              [
                "siren",
                "raison_sociale",
                "nombre_etablissements_actifs",
                "nom_commercial",
                "nom",
                "prenom",
                "siret_siege_social"
              ].forEach(function(t) {
                "boolean" == typeof r[t]
                  ? (e[t] = r[t])
                  : (e[t] = r[t] || void 0);
              }),
                (e.categorie_juridique = r.forme_juridique),
                (e.date_de_creation = a.default.convertDate(r.date_creation)),
                (e.date_de_radiation = a.default.convertDate(r.date_radiation)),
                (r.etat_administratif &&
                  "object" == typeof r.etat_administratif) ||
                  (r.etat_administratif = {}),
                (e.etat_entreprise = {
                  label: r.etat_administratif.value || "N/A",
                  date: a.default.convertDate(
                    r.etat_administratif.date_mise_a_jour
                  )
                });
            }
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = i(r(45)),
        o = i(r(44)),
        a = i(r(43)),
        s = i(r(42));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = {
        getLegacy: n.default,
        getEntreprise: o.default,
        attestation_dgfip: a.default,
        attestation_acoss: s.default
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      function s(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(o, a) {
              try {
                var s = t[o](a),
                  i = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(i).then(
                  function(e) {
                    n("next", e);
                  },
                  function(e) {
                    n("throw", e);
                  }
                );
              e(i);
            })("next");
          });
        };
      }
      const i = ((u = s(function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `documents_associations/${e}`,
          r,
          ((n = s(function*(e, t) {
            if (t.documents && Array.isArray(t.documents)) {
              const r = t.documents.reduce(
                function(e, t) {
                  return (
                    ("Statuts" === t.type &&
                      +t.timestamp > +e.timestamp &&
                      t) ||
                    e
                  );
                },
                { timestamp: 0 }
              );
              e.document_association = r;
            }
          })),
          function(e, t) {
            return n.apply(this, arguments);
          })
        );
        var n;
      })),
      function(e, t, r) {
        return u.apply(this, arguments);
      });
      var u;
      t.default = i;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `etablissements/${e}/successeur`,
          r,
          function(e, t) {
            if (t && t.successeur) {
              const r = t.successeur;
              r &&
                (e.successeur = {
                  siret: r.successeur_siret,
                  date_transfert: a.default.convertDate(
                    r.successeur_date_etablissement
                  )
                });
            }
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `etablissements/${e}/predecesseur`,
          r,
          function(e, t) {
            if (t && t.predecesseur) {
              const r = t.predecesseur;
              r &&
                (e.predecesseur = {
                  siret: r.predecesseur_siret,
                  date_transfert: a.default.convertDate(
                    r.predecesseur_date_etablissement
                  )
                });
            }
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      function s(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(o, a) {
              try {
                var s = t[o](a),
                  i = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(i).then(
                  function(e) {
                    n("next", e);
                  },
                  function(e) {
                    n("throw", e);
                  }
                );
              e(i);
            })("next");
          });
        };
      }
      const i = ((u = s(function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `associations/${e}`,
          r,
          ((n = s(function*(e, t) {
            t.association &&
              "object" == typeof t.association &&
              t.association.etat &&
              t.association.id &&
              (e.association = t.association);
          })),
          function(e, t) {
            return n.apply(this, arguments);
          })
        );
        var n;
      })),
      function(e, t, r) {
        return u.apply(this, arguments);
      });
      var u;
      t.default = i;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `attestations_agefiph/${e}`,
          r,
          function(e, t) {
            e.agefiph_derniere_annee_conformite_connue =
              t.derniere_annee_de_conformite_connue || null;
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(t, `exercices/${e}`, r, function(
          e,
          t
        ) {
          t &&
            Array.isArray(t.exercices) &&
            ((e.donnees_ecofi = {}),
            t.exercices.forEach(function(t) {
              e.donnees_ecofi[
                a.default
                  .convertDate(t.date_fin_exercice_timestamp)
                  .toISOString()
              ] =
                +t.ca || null;
            }));
        });
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(t, `etablissements/${e}`, r, function(
          e,
          t
        ) {
          if (t && t.etablissement) {
            const r = t.etablissement;
            [].forEach(function(t) {
              e[t] = r[t];
            }),
              (e.date_creation = a.default.convertDate(
                r.date_creation_etablissement
              )),
              r.adresse &&
                "object" == typeof r.adresse &&
                ((e.adresse = a.default.getCleanAddress(r.adresse)),
                (e.adresse_components = r.adresse),
                (e.departement =
                  "string" == typeof r.adresse.code_insee_localite &&
                  r.adresse.code_insee_localite.length > 1 &&
                  r.adresse.code_insee_localite.substr(0, 2))),
              (e.code_region =
                (r.region_implantation && +r.region_implantation.code) || 0),
              (e.region =
                (r.region_implantation && r.region_implantation.value) ||
                void 0),
              (e.activite =
                r.naf && r.libelle_naf ? `${r.naf} - ${r.libelle_naf}` : null),
              (e.etablissement_employeur =
                +r.tranche_effectif_salarie_etablissement.a > 0),
              (e.tranche_effectif_insee =
                r.tranche_effectif_salarie_etablissement.intitule),
              (e.annee_tranche_effectif_insee =
                +r.tranche_effectif_salarie_etablissement.date_reference ||
                void 0);
          }
        });
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = r(1),
        a = (n = o) && n.__esModule ? n : { default: n };
      const s = ((u = function*(e, t, r) {
        return yield a.default.requestAPI(
          t,
          `etablissements_legacy/${e}`,
          r,
          function(e, t) {
            if (t && t.etablissement) {
              const r = t.etablissement;
              [
                "siret",
                "siege_social",
                "enseigne",
                "nom_commercial",
                "nom",
                "prenom",
                "siret_siege_social"
              ].forEach(function(t) {
                "boolean" == typeof r[t]
                  ? (e[t] = r[t])
                  : (e[t] = r[t] || void 0);
              }),
                (r.etat_administratif &&
                  "object" == typeof r.etat_administratif) ||
                  (r.etat_administratif = {}),
                (e.etat_etablissement = {
                  label: r.etat_administratif_etablissement.value || "N/A",
                  date: a.default.convertDate(
                    r.etat_administratif_etablissement.date_mise_a_jour
                  )
                });
            }
          }
        );
      }),
      (i = function() {
        var e = u.apply(this, arguments);
        return new Promise(function(t, r) {
          return (function n(o, a) {
            try {
              var s = e[o](a),
                i = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(i).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            t(i);
          })("next");
        });
      }),
      function(e, t, r) {
        return i.apply(this, arguments);
      });
      var i, u;
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = l(r(54)),
        o = l(r(53)),
        a = l(r(52)),
        s = l(r(51)),
        i = l(r(50)),
        u = l(r(49)),
        c = l(r(48)),
        f = l(r(47));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = {
        getLegacy: n.default,
        getEtablissement: o.default,
        exercices: a.default,
        agefiph: s.default,
        association: i.default,
        predecesseur: u.default,
        successeur: c.default,
        document_association: f.default
      };
    },
    function(e, t, r) {
      "use strict";
      function n(e) {
        const t = new Error().stack.split("\n")[2].replace(" at ", "");
        (this.message = `The method ${t} isn't implemented.`),
          e && (this.message += ` Message: "${e}".`);
        let r = this.message;
        for (; r.indexOf("  ") > -1; ) r = r.replace("  ", " ");
        this.message = r;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (n.prototype = Object.create(Error.prototype, {
          constructor: { value: n },
          name: { value: "NotImplementedError" },
          stack: {
            get: function() {
              return new Error().stack;
            }
          }
        })),
        (t.default = n);
    },
    function(e, t) {
      e.exports = require("tunnel");
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        o = c(r(57)),
        a = c(r(16)),
        s = c(r(55)),
        i = c(r(46)),
        u = c(r(41));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function f(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(o, a) {
              try {
                var s = t[o](a),
                  i = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(i).then(
                  function(e) {
                    n("next", e);
                  },
                  function(e) {
                    n("throw", e);
                  }
                );
              e(i);
            })("next");
          });
        };
      }
      const l = {
        axios: Symbol("_axios"),
        requestAPIs: Symbol("_requestAPIs")
      };
      t.default = class extends a.default {
        constructor(e, t = {}) {
          super(),
            (this.token = null),
            (this[l.axios] = u.default.create({ baseURL: e, timeout: 3e4 })),
            (this.axiosConfig = t);
        }
        getSIRET(e) {
          var t = this;
          return f(function*() {
            return yield t[l.requestAPIs](
              e,
              s.default.getLegacy,
              s.default.getEtablissement,
              s.default.agefiph,
              s.default.exercices,
              s.default.association,
              s.default.predecesseur,
              s.default.successeur,
              s.default.document_association
            );
          })();
        }
        getSIREN(e) {
          var t = this;
          return f(function*() {
            return yield t[l.requestAPIs](
              e,
              i.default.getLegacy,
              i.default.getEntreprise,
              i.default.attestation_acoss,
              i.default.attestation_dgfip
            );
          })();
        }
        search() {
          return f(function*() {
            return !1;
          })();
        }
        [l.requestAPIs](e, ...t) {
          var r = this;
          return f(function*() {
            let a = {};
            const s = n({}, r.axiosConfig, {
              params: {
                token: r.token,
                context: "Tiers",
                recipient: "Direccte Occitanie",
                object: "FCEE - Direccte Occitanie"
              }
            });
            if (s.proxy && !0 === s.proxy.tunnel) {
              const e = { proxy: {} };
              s.proxy.host && (e.proxy.host = s.proxy.host),
                s.proxy.host && (e.proxy.port = s.proxy.port),
                s.proxy.auth &&
                  (e.proxy.proxyAuth = `${s.proxy.auth.username || ""}:${s.proxy
                    .auth.password || ""}`),
                (s.proxy = !1),
                (s.httpsAgent = o.default.httpsOverHttp(e));
            }
            const i = (Array.isArray(t) ? t : [t])
              .filter(function(e) {
                return "function" == typeof e;
              })
              .map(function(t) {
                return t(e, r[l.axios], s);
              });
            return (
              yield Promise.all(i).then(function(e) {
                Object.assign(a, ...e);
              }),
              a
            );
          })();
        }
      };
    },
    function(e, t, r) {
      "use strict";
      function n(e) {
        this.message = `Invalid SIRET or SIREN. ${e}`;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (n.prototype = Object.create(Error.prototype, {
          constructor: { value: n },
          name: { value: "InvalidIdentifierError" },
          stack: {
            get: function() {
              return new Error().stack;
            }
          }
        })),
        (t.default = n);
    },
    function(e, t, r) {
      "use strict";
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        o = f(r(59)),
        a = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        })(r(4)),
        s = f(r(58)),
        i = f(r(16)),
        u = r(6),
        c = r(2);
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(o, a) {
              try {
                var s = t[o](a),
                  i = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(i).then(
                  function(e) {
                    n("next", e);
                  },
                  function(e) {
                    n("throw", e);
                  }
                );
              e(i);
            })("next");
          });
        };
      }
      const d = {
        dataSources: Symbol("_dataSources"),
        compareDataSource: Symbol("_compareDataSource"),
        askDataSource: Symbol("_askDataSource")
      };
      (e.exports = new class {
        constructor() {
          (this.EntrepriseModel = u.Entreprise),
            (this.EtablissementModel = u.Etablissement),
            (this[d.dataSources] = []),
            this.addDataSource({
              name: "ApiGouv",
              priority: 100,
              source: new s.default("https://entreprise.api.gouv.fr:443/v2/")
            });
        }
        getEntreprise(e) {
          var t = this;
          return l(function*() {
            e += "";
            const r = a.validateSIREN(e),
              s = a.validateSIRET(e);
            if (!r && !s) throw new o.default(e);
            const i = r ? e : e.substr(0, 9),
              u = new t.EntrepriseModel(
                { _dataSources: {} },
                t.EtablissementModel
              );
            yield t[d.askDataSource]("getSIREN", i, function(e) {
              console.log(
                `Using response from dataSource named ${
                  e.source.name
                } with priority : ${e.source.priority}`
              ),
                u.updateData(
                  n({}, e.data, {
                    _dataSources: n({}, u._dataSources, { [e.source.name]: !0 })
                  })
                );
            });
            const c = s ? e : "" + u.siret_siege_social,
              f = Object.keys({ [c]: !0, [u.siret_siege_social]: !0 });
            return (
              yield Promise.all(
                f.map(function(e) {
                  if (a.validateSIRET(e))
                    return t[d.askDataSource]("getSIRET", e, function(t) {
                      console.log(
                        `Using response from dataSource named ${
                          t.source.name
                        } with priority : ${t.source.priority}`
                      );
                      const r = u.getEtablissement(e);
                      r.updateData(
                        n({}, t.data, {
                          _dataSources: n({}, r._dataSources, {
                            [t.source.name]: !0
                          })
                        })
                      );
                    });
                })
              ),
              u
            );
          })();
        }
        search(e) {
          var t = this;
          return l(function*() {
            const r = {};
            let o = !1;
            yield t[d.askDataSource]("search", e, function(e) {
              const s = e.data;
              !1 === s
                ? console.log(
                    `Source named ${
                      e.source.name
                    } doesn't support search. (it returned false)`
                  )
                : Array.isArray(s)
                  ? (console.log(
                      `Using response from dataSource named ${
                        e.source.name
                      } with priority : ${e.source.priority}`
                    ),
                    s.forEach(function(o) {
                      const s =
                          (a.validateSIREN(o.siren) && o.siren) ||
                          o.siret.substr(0, 9),
                        i = a.validateSIRET(o.siret) && o.siret;
                      a.validateSIREN(s) &&
                        (r[s] ||
                          (r[s] = new t.EntrepriseModel(
                            { siren: s, _dataSources: {} },
                            t.EtablissementModel
                          )),
                        i
                          ? r[s]
                              .getEtablissement(i)
                              .updateData(
                                n({}, (0, c.cleanObject)(o), {
                                  _dataSources: n(
                                    {},
                                    r[s].getEtablissement(i)._dataSources,
                                    { [e.source.name]: !0 }
                                  )
                                })
                              )
                          : r[s].updateData((0, c.cleanObject)(o)));
                    }))
                  : ("object" == typeof s &&
                      s.hasOwnProperty("error") &&
                      !0 === s.error &&
                      (o = !0),
                    console.error(
                      `Source named ${
                        e.source.name
                      } returned invalid data for search, array expected. Received:`,
                      s
                    ));
            });
            let s = Object.values(r);
            return !(!s.length && o) && s;
          })();
        }
        getDataSources() {
          return [...this[d.dataSources]].sort(this[d.compareDataSource]);
        }
        getDataSource(e) {
          return this[d.dataSources].find(t => t.name === e);
        }
        addDataSource(e) {
          this[d.dataSources].includes(e) || this[d.dataSources].push(e);
        }
        removeDataSource(e) {
          this[d.dataSources].slice(this[d.dataSources].indexOf(e), 1);
        }
        [d.compareDataSource](e, t) {
          return (e = +(e && e.priority)) > (t = +(t && t.priority))
            ? 1
            : e < t ? -1 : 0;
        }
        [d.askDataSource](e, t, r = e => e) {
          return Promise.all(
            this.getDataSources().map(
              r => (
                console.log(
                  `Asking [${e}] to dataSource named ${
                    r.name
                  } with request : ${JSON.stringify(t)}`
                ),
                r.source[e](t).then(n => {
                  const o = (0, c.cleanObject)(n);
                  return (
                    console.log(
                      `Got response for [${e}] from dataSource named ${
                        r.name
                      } about request : ${JSON.stringify(t)}`
                    ),
                    Promise.resolve({ source: r, data: o })
                  );
                })
              )
            )
          ).then(e => {
            e
              .sort(
                (e, t) =>
                  (e.source && t.source && this[d.compareDataSource](e, t)) || 0
              )
              .map(r);
          });
        }
      }()),
        (e.exports.Entreprise = u.Entreprise),
        (e.exports.Etablissement = u.Etablissement),
        (e.exports.DataSource = i.default),
        (e.exports.isSIRET = a.validateSIRET),
        (e.exports.isSIREN = a.validateSIREN);
    },
    function(e, t, r) {
      e.exports = r(60);
    }
  ]);
});
