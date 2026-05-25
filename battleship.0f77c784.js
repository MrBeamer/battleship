// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"7wZbQ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9440bf780f77c784";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"2R06K":[function(require,module,exports,__globalThis) {
var _gameControllerJs = require("./GameController.js");
const game = new (0, _gameControllerJs.GameController)();
game.init();

},{"./GameController.js":"IrhHB"}],"IrhHB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameController", ()=>GameController) //Today: add individual ship img for every type, add function that provides corresponding img to ship type when placing the ship on the board, add rework rotation function for ship img, add rework placement function for npc ship placement, fixed dissapearing hit markers adjusted z-index and content:"""; and used the hitmarker as background instead, add setTimeOut to the toggleturn function basically delaying players turn, so that taunt message of npc has enough time to render complelty and is not overlapping with players taunt ===> committed
 //second commit
 // Fixed highlight preview still showing after ship is placed, add remove shipImages method to remove the ships from the field when resetting, fixed when npc destroy player ship that it appears in enemy (npc) space, add setTimeout to won sound so no overallap with last explosion, fixed with new method that bot now only shots on fields if does not have a miss or hit class
 // check getRandomFieldClickNpcTest getRandomFieldClickNpc in the view fight version that works for npc attack and initial npc ship placement
 // fixes needed:
 // fix message not start again typing when reset => maybe set the p tag empty so it needs to render again
 // maybe add selected class to rotate,
 // i need rework resets because now I need to remove ships instead of classes
 // clean up css classes placed and all ships,
 // maybe add a better sunk explosion sound
;
var _gameboardJs = require("./Gameboard.js");
var _gameViewJs = require("./GameView.js");
var _shipJs = require("./Ship.js");
var _helperJs = require("./helper.js");
class GameController {
    view = new (0, _gameViewJs.GameView)();
    gameBoard = new (0, _gameboardJs.Gameboard)();
    selectedShip = null;
    selectedShipPosition = null;
    shipPlacementPhase = null;
    shipAxis = "X";
    shipNavigationState = null;
    gamePhase = "preparation";
    playerTurn = true;
    isGameOver = false;
    titleScreenMusic = null;
    constructor(){
        // Title screen start game
        this.view.gameStartBtn.addEventListener("click", (event)=>{
            this.startPreparation(event);
        });
        this.view.arcadeOverlay.addEventListener("click", (event)=>{
            this.insertCoin(event);
        });
        // For hover, preselect phase
        this.view.gameBoard.addEventListener("pointerover", (event)=>this.handlePointeOver(event));
        this.view.gameBoard.addEventListener("pointerout", (event)=>this.handlePointerOut(event));
        // Pick up the ship the drag and drop
        this.view.shipContainer.addEventListener("click", (event)=>this.handleSelectShip(event));
        this.view.gameBoard.addEventListener("click", (event)=>this.handlePlaceShip(event));
        // Game Menu Controls
        this.view.resetBtn.addEventListener("click", (event)=>{
            this.resetShipPlacement(event);
        });
        this.view.rotateBtn.addEventListener("click", (event)=>{
            this.rotateShip(event);
        });
        this.view.startBtn.addEventListener("click", (event)=>{
            this.startGame(event);
        });
        // Battle Phase, get coordinates and compare with ship array of npc
        this.view.gameBoardNpc.addEventListener("click", (event)=>{
            this.shootNpcShip(event);
        });
        this.view.resetGameBtn.addEventListener("click", (event)=>{
            this.resetGame(event);
        });
    }
    checkGameOver() {
        const isNpcFleetSunk = this.gameBoard.fleetNpc.every((ship)=>ship.isSunk());
        const isPlayerFleetSunk = this.gameBoard.fleetPlayer1.every((ship)=>ship.isSunk());
        if (isPlayerFleetSunk) {
            // Renders winner in the GameOver screen
            this.view.renderWinnerAnnouncement("YOU LOSE");
            this.view.renderGameOverMessage("We lost the battle, Captain. Better luck on the next voyage.");
            this.isGameOver = true;
            //Open GameOver Menu
            this.view.dialog.showModal();
            (0, _helperJs.playSound)("game-lost");
        } else if (isNpcFleetSunk) {
            // Renders winner in the GameOver screen
            this.view.renderWinnerAnnouncement("YOU WIN");
            this.view.renderGameOverMessage("Mission accomplished, Captain! You truly are the master of the seas.");
            this.isGameOver = true;
            //Open GameOver Menu
            this.view.dialog.showModal();
            // Delay winning sound so its overlapping with explosion
            setTimeout(()=>{
                (0, _helperJs.playSound)("game-won");
            }, 1300);
        }
    }
    toggleTurn() {
        // Check after every turn, if there is a winner
        this.checkGameOver();
        // Toggles depending on which players turn is
        this.playerTurn = !this.playerTurn;
        return this.playerTurn;
    }
    processAttack(shootingTargetField, targetCoord, fleet) {
        // Saves hit boolean true or false
        let hit = null;
        for (let ship of fleet){
            hit = ship.position.some((coord)=>{
                return coord === targetCoord;
            });
            // If field has ship unit, add hit to the div
            if (hit) {
                this.view.renderBattleMessage(this.playerTurn, "hit");
                (0, _helperJs.playSound)("hit-ship");
                shootingTargetField.classList.add("hit");
                // add here helper function with updates ship that its hit
                const hitShip = fleet.find((ship)=>{
                    return ship.position.includes(targetCoord);
                });
                // Increments hint counter in the ship object
                hitShip.hit();
                // Checks after every hit if ship is sunk
                const isShipSunk = hitShip.isSunk();
                if (isShipSunk) {
                    console.log("ship is sunk");
                    const firstCoord = hitShip.position[0]; // needs to a field
                    const shipType = hitShip.type;
                    const shipAxis = hitShip.axis;
                    const shipLength = hitShip.length;
                    (0, _helperJs.playSound)("sunk-ship");
                    // Make sure sunk ship is only displayed, if player sinks a ship not npc
                    if (this.playerTurn) this.view.displaySunkNpcShip(firstCoord, shipLength, shipAxis, shipType);
                }
                return hit;
            }
        }
        // If field has no ship unit, add miss to the div
        if (!hit) {
            shootingTargetField.classList.add("miss");
            this.view.renderBattleMessage(this.playerTurn, "miss");
            //Play sound if you miss
            (0, _helperJs.playSound)("miss-ship");
        }
        return hit;
    }
    shootNpcShip(event) {
        // Makes sure shooting is not possible when game is over
        if (this.isGameOver) return;
        // Makes sure that player only can shot, when it is his turn
        if (!this.playerTurn) return;
        // delete later
        console.log("player turn");
        const shootingTargetField = event.target.closest(".gameboard-field");
        // Returns if field is undefined, clicked between lines
        if (!shootingTargetField) return;
        // Makes sure if player hit a ship field that it can not be targeted again
        if (shootingTargetField.classList.contains("hit") || shootingTargetField.classList.contains("miss")) return;
        // Gets the coordinate from target
        const targetCoord = shootingTargetField.dataset.coords;
        // shoot the Npc ship
        this.processAttack(shootingTargetField, targetCoord, this.gameBoard.fleetNpc);
        // After player shot, switch to npc
        this.toggleTurn();
        // after switching to npc he can attack, use timeout to have delay between player shot and npc shot
        setTimeout(()=>{
            this.npcAttack();
        }, 2000);
    }
    npcAttack() {
        // Makes sure shooting is not possible when game is over
        if (this.isGameOver) return;
        console.log("npc turn");
        // instead of human clicking on gameField (dataType is html element), this returns a random one
        ////////
        const randomElement = this.view.getRandomFieldClickNpcTest();
        console.log(randomElement);
        ///
        this.processAttack(randomElement.field, randomElement.coord, this.gameBoard.fleetPlayer1);
        // After miss shot, next players turn
        // Text message should not overlap if players turn is delayed it should be fixed
        setTimeout(()=>{
            this.toggleTurn();
        }, 1600);
    // this.toggleTurn();
    }
    /////////////////////////////////////
    initializeNpcShipPlacements() {
        // call the function initializeNpcShipPlacements
        // creates ships, which are substitutes for players html element ships, also reduce complexity
        const npcShipList = [
            new (0, _shipJs.Ship)(5, "dreadnought", "placeholderPosition", "placeholderAxis"),
            new (0, _shipJs.Ship)(4, "cruiser", "placeholderPosition", "placeholderAxis"),
            new (0, _shipJs.Ship)(3, "destroyer", "placeholderPosition", "placeholderAxis"),
            new (0, _shipJs.Ship)(3, "frigate", "placeholderPosition", "placeholderAxis"),
            new (0, _shipJs.Ship)(2, "corvette", "placeholderPosition", "placeholderAxis")
        ];
        // Do this for every ship
        npcShipList.forEach((ship)=>{
            let isOverLapping = true;
            let isOutOfBound = true;
            let randomShipAxis = null;
            let selectedShipCoords = null;
            while(isOverLapping || isOutOfBound){
                // Gets a random coord like A3 , should run only per ship not for every gameField, thats why placed here
                const randomCoord = (0, _helperJs.getRandomCoord)();
                // instead of human clicking on gameField (dataType is html element), this returns a random one
                const randomField = this.view.getRandomFieldClickNpc(randomCoord, this.view.gameBoardNpc);
                const shipLength = ship.length;
                // Calls the helper function to get random Axis
                randomShipAxis = (0, _helperJs.getRandomShipAxis)();
                // console.log(randomField);
                // Gets the position of the ship (coordinates as array)
                selectedShipCoords = this.gameBoard.getTempShipCoords(randomField, shipLength, randomShipAxis);
                // console.log(selectedShipCoords);
                //Set currentFields to the current occupied html elements
                this.view.setTargetFields(selectedShipCoords, this.view.gameBoardNpc);
                // Checks if ship isOverlapping
                isOverLapping = this.view.isOverLapping(this.gameBoard.fleetNpc);
                // Checks if ship outOfBound
                isOutOfBound = this.view.isOutOfBound();
            }
            // I think can removed also because no ship function delete
            // UI - Places ship
            this.view.currentTargetFields.forEach((field)=>{
                if (!field) return;
                // Lookup correct ship class, to color field in the ship color
                const shipTypeClass = (0, _helperJs.lookUpShipType)(ship.type);
                // replace later one with other class, because should be hidden and only visible on hit
                // field.classList.add("placed", shipTypeClass);
                //testing
                field.classList.add("placed");
            });
            // Data: Update ship with coordinates and axis
            ship.position = selectedShipCoords;
            ship.axis = randomShipAxis;
            // Push the updated ship into the fleet array
            this.gameBoard.fleetNpc.push(ship);
        }); // end of ship for each currently
        console.log(this.gameBoard.fleetNpc);
    // console.log(this.view.currentTargetFields);
    }
    /////////////////////////////////////
    startGame() {
        // Game can only start, if all ships are placed
        if (this.gameBoard.fleetPlayer1.length !== 5) return;
        // Render battle phase screen
        this.view.renderBattleScreen();
        // Place the npc ships on the game field
        this.initializeNpcShipPlacements();
        (0, _helperJs.playSound)("menu");
    }
    rotateShip(event) {
        const rotateBtn = event.target.closest(".btn-rotate");
        if (!rotateBtn) return;
        // Makes sure that you picked a ship before you rotate
        if (!this.selectedShip) return;
        this.shipAxis = this.shipAxis === "X" ? "Y" : "X";
        this.selectedShip.dataset.shipDirection = this.shipAxis;
        // Control Sound
        (0, _helperJs.playSound)("menu");
    }
    handleSelectShip(event) {
        const selectedShip = event.target.closest(".ship");
        if (!selectedShip) return;
        // Check if previously a ship selection button, was clicked if so remove the class selected
        if (this.selectedShip?.classList.contains("selected")) this.selectedShip.classList.remove("selected");
        // After removing the class from previously clicked button add it to the current clicked one
        selectedShip.classList.add("selected");
        // Safes the selected ship (html element) temporarily
        this.selectedShip = selectedShip;
        //Play sound on select
        (0, _helperJs.playSound)("select-ship");
    }
    handlePlaceShip(event) {
        const gameField = event.target.closest(".gameboard-field");
        if (!gameField) return;
        // Checks if ship would overlap
        const isOverLapping = this.view.isOverLapping(this.gameBoard.fleetPlayer1);
        if (isOverLapping) return;
        // Check if ship would be outOfBound
        const isOutOfBound = this.view.isOutOfBound();
        if (isOutOfBound) return;
        ///
        const startField = this.view.currentTargetFields[0];
        if (!startField) return;
        const shipLength = this.selectedShip.dataset.shipLength;
        const shipAxis = this.selectedShip.dataset.shipDirection;
        const shipType = this.selectedShip.dataset.shipType;
        // Remove class preview that highlights divs for ship placement
        this.view.clearFieldHighlights();
        // Place ship img on field
        this.view.placeShipImg(startField, shipLength, shipAxis, shipType);
        (0, _helperJs.playSound)("deploy-ship");
        ///
        /// I think i can remove the function below because it adds only classes to color the divs not any coordinates
        // Get currentTargetFields (html elements) and add highlight them permanently
        // this.view.currentTargetFields.forEach((field) => {
        //   if (!field) return;
        //   // Lookup correct ship class, to color field in the ship color
        //   const shipTypeClass = lookUpShipType(this.selectedShip.dataset.shipType);
        //   field.classList.add("placed", shipTypeClass);
        //   playSound("deploy-ship");
        // });
        // If a ship is selected create an ship object and push into the fleetPlayer1 array
        if (!this.selectedShip) return;
        // Based on placed ship, create a new ship object.
        const ship = new (0, _shipJs.Ship)(this.selectedShip.dataset.shipLength, this.selectedShip.dataset.shipType, this.selectedShipPosition, this.shipAxis);
        // Add ship to gameBoard (fleetPlayer1 array) - data
        this.gameBoard.placeShip(ship);
        console.log(this.gameBoard.fleetPlayer1);
        // If ship is placed on the board, disable the ship button, so user can not pick it again
        this.selectedShip.disabled = true;
        //Hide ship unit
        this.view.hideShipUnits(this.selectedShip);
        // After placing ship, remove the selected class from the button
        this.selectedShip.classList.remove("selected");
        // After placing ship, remove selected ship from the temp memory state
        this.selectedShip = null;
        // After placing ship, remove position from the temp memory state
        this.selectedShipPosition = null;
        // After placing ship, remove fields from the temp memory state
        this.view.currentTargetFields = [];
    }
    handlePointeOver(event) {
        //highlight fields only if ship has been picked
        if (!this.selectedShip) return;
        // gets ships placement coordinates
        const gameField = event.target.closest(".gameboard-field");
        if (!gameField) return;
        // Get actual temp ship coords
        const selectedShipCoords = this.gameBoard.getTempShipCoords(gameField, this.selectedShip.dataset.shipLength, this.shipAxis);
        this.selectedShipPosition = selectedShipCoords;
        // Gets the hoovered or locked in html of the fields
        // I think returning targetfields can be removed and maybe rename the function to set instead of get?
        this.view.setTargetFields(selectedShipCoords, this.view.gameBoard);
        // Check if any ships is about to overlap or outOfBound, if so return true
        const isOverLapping = this.view.isOverLapping(this.gameBoard.fleetPlayer1);
        const isOutOfBound = this.view.isOutOfBound();
        // Add class that highlights divs for potential ship placements
        this.view.highlightTargetFields(isOverLapping, isOutOfBound);
    }
    handlePointerOut() {
        // Remove class preview that highlights divs for ship placement
        this.view.clearFieldHighlights();
    }
    ///////////////////////////////////
    insertCoin() {
        //replace this with the helper later
        const playTitleMusic = async ()=>{
            if (!this.titleScreenMusic) {
                this.titleScreenMusic = new Audio(new URL(require("1291868b29034f6d")));
                this.titleScreenMusic.loop = true;
            }
            try {
                await this.titleScreenMusic.play();
            } catch (error) {
                console.warn("Playback failed:", error);
            }
        };
        (0, _helperJs.playSound)("insert-coin");
        setTimeout(()=>{
            playTitleMusic();
        }, 1300);
        this.view.arcadeOverlay.classList.add("hidden");
    }
    init() {
        //Renders the Gameboard with axis, coordinates as Data-Attribute
        this.view.renderGameBoard(this.view.gameBoard);
    }
    resetShipPlacement() {
        this.selectedShip = null;
        this.selectedShipPosition = null;
        this.gameBoard.fleetPlayer1 = [];
        // remove the temp highlighted fields from the temp memory state
        this.view.currentTargetFields = [];
        //Remove disable from all ships
        for (let ship of this.view.shipContainer.children)ship.disabled = false;
        //Remove all placed classes from the gameFields
        this.view.clearShipClasses(this.view.gameBoard);
        // Remove all ship images that have been appended
        this.view.clearShipImgs();
        //Make all ship units visible again
        this.view.showShipUnits();
        //Play sound on reset
        (0, _helperJs.playSound)("menu");
    }
    resetGame() {
        // Resets Placement phase
        this.resetShipPlacement();
        // Resets battle phase npc side
        this.view.clearShipClasses(this.view.gameBoardNpc);
        console.log("reset game");
        //Re render the ship placement screen
        this.view.renderShipPlacementScreen();
        // Reset the npc fleet
        this.gameBoard.fleetNpc = [];
        console.log(this.gameBoard.fleetNpc);
        //Play sound on reset
        const clickSound = new Audio("path/to/sound.mp3");
        clickSound.play();
    }
    startPreparation() {
        // Make sure music is loaded before you can start the game
        if (!this.titleScreenMusic) return;
        this.view.gameFrameCenter.classList.remove("hidden");
        this.view.titleScreen.classList.add("hidden");
        //Type narrator message
        this.view.renderNarratorMessage();
        this.titleScreenMusic.pause();
    }
}

},{"./Gameboard.js":"2AAYy","./GameView.js":"jq6mE","./Ship.js":"4RmjJ","./helper.js":"hs4ye","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","1291868b29034f6d":"jJa3v"}],"2AAYy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Gameboard", ()=>Gameboard);
class Gameboard {
    fleetPlayer1 = [];
    fleetNpc = [];
    constructor(){}
    // gets ships placement coordinates, where you hover over depending on length of the ship 1-3 fields from where the pointer is, switches between X and Y placement
    getTempShipCoords(gameField, shipLength, shipAxis) {
        let tempShipCoords = [];
        let coords = null;
        for(let i = 0; i < shipLength; i++){
            if (shipAxis === "X") {
                let coordX = i + parseInt(gameField.dataset.coordX);
                let coordY = gameField.dataset.coordY;
                // This checks if coordinate is within the gameBoard
                if (coordX > 10) coordX = undefined;
                coords = coordY + coordX;
            } else {
                let coordX = parseInt(gameField.dataset.coordX);
                let coordY = gameField.dataset.coordY;
                // Turns letter into charCode to then increase the code to get next letter from the board, then transform code back to string
                coordY = String.fromCharCode(i + coordY.charCodeAt(0));
                coords = coordY + coordX;
            }
            tempShipCoords.push(coords);
        // console.log(`Coord Y: ${coordY}`);
        // console.log(`Coord X: ${coordX}`);
        }
        return tempShipCoords;
    }
    placeShip(ship) {
        // add later logic if players 1 turn put into fleet1 and vice versa
        this.fleetPlayer1.push(ship);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jq6mE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameView", ()=>GameView);
var _core = require("typewriter-effect/dist/core");
var _coreDefault = parcelHelpers.interopDefault(_core);
var _helperJs = require("./helper.js");
class GameView {
    currentTargetFields = [];
    constructor(){
        this.gameBoard = document.querySelector("#gameboard-player");
        this.gameBoardNpc = document.querySelector("#gameboard-npc");
        this.shipContainer = document.querySelector(".ship-container");
        this.ship = document.querySelector(".ship");
        this.resetBtn = document.querySelector(".btn-reset");
        this.gameMenu = document.querySelector(".game-menu");
        this.rotateBtn = document.querySelector(".btn-rotate");
        this.startBtn = document.querySelector(".btn-start");
        this.gameAxisY = document.querySelector(".game-y-axis-player");
        this.gameAxisX = document.querySelector(".game-x-axis-player");
        this.gameAxisYnpc = document.querySelector(".game-y-axis-npc");
        this.gameAxisXnpc = document.querySelector(".game-x-axis-npc");
        this.gameNarrator = document.querySelector(".game-narrator");
        this.playerNarrator = document.querySelector(".player-narrator");
        this.npcNarrator = document.querySelector(".npc-narrator");
        this.shipUnitContainer = document.querySelector(".ship-unit-container");
        this.narratorMessage = document.querySelector(".narrator-message");
        this.gameBoardFrameNpc = document.querySelector(".gameboard-frame-npc");
        this.gameBoardsContainer = document.querySelector(".gameboards-container");
        this.npcSide = document.querySelector(".npc-side");
        this.playerSideTitle = document.querySelector(".player-side-title");
        this.dialog = document.querySelector("dialog");
        this.resetGameBtn = document.querySelector(".btn-reset-game");
        this.gameOverMessage = document.querySelector(".game-over-message");
        this.winnerAnnouncement = document.querySelector(".announcement-winner");
        this.gameFrameCenter = document.querySelector(".game-frame-center");
        this.gameStartBtn = document.querySelector(".btn-game-start");
        this.titleScreen = document.querySelector(".game-starting-screen");
        this.arcadeOverlay = document.querySelector(".arcade-overlay");
        this.shipSprites = document.getElementsByClassName("ship-sprite");
    }
    hideShipUnits(selectedShip) {
        selectedShip.querySelector(".ship-unit-container").style.visibility = "hidden";
    }
    //delete
    // displaySunkNpcShip(ship, shipTypeClass) {
    //   // position array of cords
    //   console.log(ship);
    //   console.log(ship.position);
    //   ship.position.forEach((coord) => {
    //     for (let field of this.gameBoardNpc.children) {
    //       if (field.dataset.coords == coord) {
    //         field.classList.add("placed", shipTypeClass);
    //       }
    //     }
    //   });
    // }
    // Based on different parameters of selected ship, add the correct ship img on the board
    placeShipImg(startField, shipLength, axis, shipType) {
        const img = document.createElement("img");
        // Look up for the img url
        const shipImg = (0, _helperJs.lookUpShipImg)(shipType);
        img.src = shipImg;
        img.style.position = "absolute";
        img.style.pointerEvents = "none";
        img.style.zIndex = "1";
        img.classList.add("ship-sprite");
        if (axis === "X") {
            img.style.width = `${shipLength * 50}px`;
            img.style.height = "50px";
            img.style.top = "0";
            img.style.left = "0";
        } else {
            // Keep natural width/height, rotate 90deg, reposition
            img.style.width = `${shipLength * 50}px`;
            img.style.height = "50px";
            img.style.transformOrigin = "top left";
            img.style.transform = "rotate(90deg)";
            img.style.top = "0";
            img.style.left = "50px"; // shift right by one cell width to compensate pivot
        }
        startField.style.position = "relative";
        startField.appendChild(img);
    }
    displaySunkNpcShip(firstCoord, shipLength, shipAxis, shipType) {
        for (let field of this.gameBoardNpc.children)if (field.dataset.coords == firstCoord) this.placeShipImg(field, shipLength, shipAxis, shipType);
    }
    renderBattleScreen() {
        //Hide html elements from preparation screen
        this.shipContainer.classList.add("hidden");
        this.gameMenu.classList.add("hidden");
        this.gameNarrator.classList.add("hidden");
        //Renders the Gameboard with coordinates as Data-Attribute
        this.renderGameBoard(this.gameBoardNpc);
        // Remove hidden class from gameBoard-npc
        this.gameBoardFrameNpc.classList.remove("hidden");
        // Remove hidden class from npc-side
        this.npcSide.classList.remove("hidden");
        // Remove hidden class for player title
        this.playerSideTitle.classList.remove("hidden");
        // Remove hidden class for player narrator
        this.playerNarrator.classList.remove("hidden");
        // Remove hidden class for npc narrator
        this.npcNarrator.classList.remove("hidden");
        // Add align-boards to align the boards
        this.gameBoardsContainer.classList.add("align-boards");
        // Add removeStyling to align gameBoards
        this.gameAxisX.classList.add("remove-styling");
        this.gameAxisY.classList.add("add-styling");
    }
    renderShipPlacementScreen() {
        this.shipContainer.classList.remove("hidden");
        this.gameMenu.classList.remove("hidden");
        this.gameNarrator.classList.remove("hidden");
        // Add hidden class from gameBoard-npc
        this.gameBoardFrameNpc.classList.add("hidden");
        // Add hidden class from npc-side
        this.npcSide.classList.add("hidden");
        // Add hidden class for player title
        this.playerSideTitle.classList.add("hidden");
        // Add hidden class for player narrator
        this.playerNarrator.classList.add("hidden");
        // Add hidden class for npc narrator
        this.npcNarrator.classList.add("hidden");
        // Remove align-boards to align the boards
        this.gameBoardsContainer.classList.remove("align-boards");
    }
    showShipUnits() {
        for (let ship of this.shipContainer.children)ship.querySelector(".ship-unit-container").style.visibility = "visible";
    }
    renderWinnerAnnouncement(winner) {
        this.winnerAnnouncement.textContent = winner;
    }
    renderGameOverMessage(message) {
        this.gameOverMessage.textContent = message;
    }
    // i think i can remove this but i need to remove the ships
    clearShipClasses(gameBoard) {
        for (let gameField of gameBoard.children){
            gameField.classList.remove("placed");
            gameField.classList.remove("preview");
            gameField.classList.remove("miss");
            gameField.classList.remove("hit");
        }
    }
    clearShipImgs() {
        [
            ...this.shipSprites
        ].forEach((shipSprite)=>{
            shipSprite.remove();
        });
    }
    renderGameBoard(gameBoard) {
        // Get ID from gameBoard conditionally rendering the axis for npc or player
        const gameBoardId = gameBoard.id;
        //Renders the Y axis of the gameBoard
        const renderAxisY = ()=>{
            console.log(gameBoardId);
            const alphabet = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J"
            ];
            const axisY = gameBoardId === "gameboard-player" ? this.gameAxisY : this.gameAxisYnpc;
            for (let letter of alphabet){
                const htmlElement = `<div class="legend-letters">${letter}</div>`;
                axisY.insertAdjacentHTML("beforeend", htmlElement);
            }
        };
        //Renders the X axis of the gameBoard
        const renderAxisX = ()=>{
            const numbers = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ];
            const axisX = gameBoardId === "gameboard-player" ? this.gameAxisX : this.gameAxisXnpc;
            for (let number of numbers){
                const htmlElement = `<div class="legend-numbers">${number}</div>`;
                axisX.insertAdjacentHTML("beforeend", htmlElement);
            }
        };
        // Calls the functions here because the will not be called anywhere
        renderAxisX();
        renderAxisY();
        // Generates the letters used to create the letters for GameBoard
        const getCoordinatesLetters = (index)=>{
            const letters = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K"
            ];
            let calcIndex = Math.floor((index - 1) / 10);
            return letters[calcIndex];
        };
        // Generates the numbers used to create the numbers for GameBoard
        const getCoordinatesNumbers = (index)=>{
            if (index % 10 === 0) return 10;
            else return index % 10;
        };
        // Injects the created fields into the GameBoard Container
        for(let i = 1; i <= 100; i++)gameBoard.insertAdjacentHTML("beforeend", `<div class="gameboard-field" data-coord-x="${getCoordinatesNumbers(i)}" data-coord-y="${getCoordinatesLetters(i)}" data-coords="${getCoordinatesLetters(i)}${getCoordinatesNumbers(i)}"></div>`);
    }
    // instead of human clicking on gameField (dataType is html element), this returns a random one delete
    // getRandomFieldNpc = () => {
    //   for (const gameField of this.gameBoardNpc.children) {
    //     console.log(gameField);
    //   }
    // };
    renderBattleMessage(playerTurn, action) {
        if (playerTurn) new (0, _coreDefault.default)(".player-narrator-message-battle", {
            strings: action === "hit" ? (0, _helperJs.antiHeroTaunts).hit[(0, _helperJs.getRandomNumber)((0, _helperJs.antiHeroTaunts).hit.length)] : (0, _helperJs.antiHeroTaunts).miss[(0, _helperJs.getRandomNumber)((0, _helperJs.antiHeroTaunts).miss.length)],
            autoStart: true,
            loop: false,
            delay: 20
        });
        else new (0, _coreDefault.default)(".npc-narrator-message-battle", {
            strings: action === "hit" ? (0, _helperJs.villainTaunts).hit[(0, _helperJs.getRandomNumber)((0, _helperJs.villainTaunts).hit.length)] : (0, _helperJs.villainTaunts).miss[(0, _helperJs.getRandomNumber)((0, _helperJs.villainTaunts).miss.length)],
            autoStart: true,
            loop: false,
            delay: 20
        });
    }
    renderNarratorMessage() {
        // const test = new Typewriter(".narrator-message", {
        //   strings: [
        //     "Hi Captain Pengu!",
        //     "Click a ship to select it, click a map tile to place it, and use the Rotate button to change its orientation before placement.",
        //   ],
        //   autoStart: true,
        //   loop: false,
        //   delay: 40,
        // });
        new (0, _coreDefault.default)(".narrator-message", {
            strings: "Captain, click a ship to select it, click a map tile to place it, and use the Rotate button to change its orientation before placement.",
            autoStart: true,
            loop: false,
            delay: 50
        });
    }
    setTargetFields(targetShipCoords, gameBoard) {
        // Searches the correct divs based on ships coordinates
        const targetFields = targetShipCoords.map((coord)=>{
            for (const field of gameBoard.children){
                // console.log(field.dataset.coords);
                if (field.dataset.coords === coord) return field;
            }
        });
        //Updates current fields by hovering over them
        this.currentTargetFields = targetFields;
    }
    isOverLapping(fleet) {
        const checkedFields = this.currentTargetFields.map((field)=>{
            if (!field) return;
            // Checks based on placed ships and there coords if field is occupied already
            return fleet.some((ship)=>ship.position.includes(field.dataset.coords));
        });
        // Checks the if any of the tested fields is not true
        return checkedFields.some((field)=>field === true);
    }
    isOutOfBound() {
        let isOutOfBound = this.currentTargetFields.some((field)=>field === undefined);
        return isOutOfBound;
    }
    highlightTargetFields(isOverLapping, isOutOfBound) {
        this.currentTargetFields.forEach((field)=>{
            if (!field) return;
            if (isOutOfBound) return field.classList.add("outOfBound");
            if (isOverLapping) field.classList.add("overlapping");
            else field.classList.add("preview");
        });
    }
    clearFieldHighlights() {
        this.currentTargetFields.forEach((field)=>{
            if (!field) return;
            field.classList.remove("preview");
            field.classList.remove("overlapping");
            field.classList.remove("outOfBound");
        });
    }
    getRandomFieldClickNpcTest() {
        let miss = true;
        let hit = true;
        let field = null;
        let coord = null;
        while(miss || hit){
            coord = (0, _helperJs.getRandomCoord)();
            field = document.querySelector(`[data-coords="${coord}"]`);
            miss = field.classList.contains("miss");
            hit = field.classList.contains("hit");
        }
        return {
            field,
            coord
        };
    }
    getRandomFieldClickNpc(randomCoord, gameBoard) {
        for (const gameField of gameBoard.children){
            if (gameField.dataset.coords === randomCoord) return gameField;
        }
    }
}

},{"typewriter-effect/dist/core":"a3hd5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./helper.js":"hs4ye"}],"a3hd5":[function(require,module,exports,__globalThis) {
!function(e, t) {
    module.exports = t();
}("undefined" != typeof self ? self : this, ()=>(()=>{
        var e = {
            3146: (e, t, n)=>{
                for(var r = n(3491), o = "undefined" == typeof window ? n.g : window, a = [
                    "moz",
                    "webkit"
                ], i = "AnimationFrame", s = o["request" + i], u = o["cancel" + i] || o["cancelRequest" + i], l = 0; !s && l < a.length; l++)s = o[a[l] + "Request" + i], u = o[a[l] + "Cancel" + i] || o[a[l] + "CancelRequest" + i];
                if (!s || !u) {
                    var c = 0, p = 0, d = [], f = 1e3 / 60;
                    s = function(e) {
                        if (0 === d.length) {
                            var t = r(), n = Math.max(0, f - (t - c));
                            c = n + t, setTimeout(function() {
                                var e = d.slice(0);
                                d.length = 0;
                                for(var t = 0; t < e.length; t++)if (!e[t].cancelled) try {
                                    e[t].callback(c);
                                } catch (e) {
                                    setTimeout(function() {
                                        throw e;
                                    }, 0);
                                }
                            }, Math.round(n));
                        }
                        return d.push({
                            handle: ++p,
                            callback: e,
                            cancelled: !1
                        }), p;
                    }, u = function(e) {
                        for(var t = 0; t < d.length; t++)d[t].handle === e && (d[t].cancelled = !0);
                    };
                }
                e.exports = function(e) {
                    return s.call(o, e);
                }, e.exports.cancel = function() {
                    u.apply(o, arguments);
                }, e.exports.polyfill = function(e) {
                    e || (e = o), e.requestAnimationFrame = s, e.cancelAnimationFrame = u;
                };
            },
            3491: function(e) {
                (function() {
                    var t, n, r, o, a, i;
                    "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function() {
                        return performance.now();
                    } : Date.now ? (e.exports = function() {
                        return Date.now() - r;
                    }, r = Date.now()) : (e.exports = function() {
                        return (new Date).getTime() - r;
                    }, r = (new Date).getTime());
                }).call(this);
            }
        }, t = {};
        function n(r) {
            var o = t[r];
            if (void 0 !== o) return o.exports;
            var a = t[r] = {
                exports: {}
            };
            return e[r].call(a.exports, a, a.exports, n), a.exports;
        }
        n.n = (e)=>{
            var t = e && e.__esModule ? ()=>e.default : ()=>e;
            return n.d(t, {
                a: t
            }), t;
        }, n.d = (e, t)=>{
            for(var r in t)n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            });
        }, n.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        }(), n.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t);
        var r = {};
        return (()=>{
            "use strict";
            n.d(r, {
                default: ()=>C
            });
            var e = n(3146), t = n.n(e);
            const o = function(e) {
                return new RegExp(/<[a-z][\s\S]*>/i).test(e);
            }, a = function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e;
            };
            var i = "TYPE_CHARACTER", s = "REMOVE_CHARACTER", u = "REMOVE_ALL", l = "REMOVE_LAST_VISIBLE_NODE", c = "PAUSE_FOR", p = "CALL_FUNCTION", d = "ADD_HTML_TAG_ELEMENT", f = "CHANGE_DELETE_SPEED", v = "CHANGE_DELAY", h = "CHANGE_CURSOR", m = "PASTE_STRING", y = "HTML_TAG";
            function g(e) {
                return g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                }, g(e);
            }
            function E(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })), n.push.apply(n, r);
                }
                return n;
            }
            function w(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? E(Object(n), !0).forEach(function(t) {
                        S(e, t, n[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : E(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    });
                }
                return e;
            }
            function b(e) {
                return function(e) {
                    if (Array.isArray(e)) return T(e);
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return T(e, t);
                        var n = ({}).toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? T(e, t) : void 0;
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }
            function T(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for(var n = 0, r = Array(t); n < t; n++)r[n] = e[n];
                return r;
            }
            function A(e, t) {
                for(var n = 0; n < t.length; n++){
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, N(r.key), r);
                }
            }
            function S(e, t, n) {
                return (t = N(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function N(e) {
                var t = function(e) {
                    if ("object" != g(e) || !e) return e;
                    var t = e[Symbol.toPrimitive];
                    if (void 0 !== t) {
                        var n = t.call(e, "string");
                        if ("object" != g(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == g(t) ? t : t + "";
            }
            const C = function() {
                function n(r, g) {
                    var E = this;
                    if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, n), S(this, "state", {
                        cursorAnimation: null,
                        lastFrameTime: null,
                        pauseUntil: null,
                        eventQueue: [],
                        eventLoop: null,
                        eventLoopPaused: !1,
                        reverseCalledEvents: [],
                        calledEvents: [],
                        visibleNodes: [],
                        initialOptions: null,
                        elements: {
                            container: null,
                            wrapper: document.createElement("span"),
                            cursor: document.createElement("span")
                        }
                    }), S(this, "options", {
                        strings: null,
                        cursor: "|",
                        delay: "natural",
                        pauseFor: 1500,
                        deleteSpeed: "natural",
                        loop: !1,
                        autoStart: !1,
                        devMode: !1,
                        skipAddStyles: !1,
                        wrapperClassName: "Typewriter__wrapper",
                        cursorClassName: "Typewriter__cursor",
                        stringSplitter: null,
                        onCreateTextNode: null,
                        onRemoveNode: null
                    }), S(this, "setupWrapperElement", function() {
                        E.state.elements.container && (E.state.elements.wrapper.className = E.options.wrapperClassName, E.state.elements.cursor.className = E.options.cursorClassName, E.state.elements.cursor.innerHTML = E.options.cursor, E.state.elements.container.innerHTML = "", E.state.elements.container.appendChild(E.state.elements.wrapper), E.state.elements.container.appendChild(E.state.elements.cursor));
                    }), S(this, "start", function() {
                        return E.state.eventLoopPaused = !1, E.runEventLoop(), E;
                    }), S(this, "pause", function() {
                        return E.state.eventLoopPaused = !0, E;
                    }), S(this, "stop", function() {
                        return E.state.eventLoop && ((0, e.cancel)(E.state.eventLoop), E.state.eventLoop = null), E;
                    }), S(this, "pauseFor", function(e) {
                        return E.addEventToQueue(c, {
                            ms: e
                        }), E;
                    }), S(this, "typeOutAllStrings", function() {
                        return "string" == typeof E.options.strings ? (E.typeString(E.options.strings).pauseFor(E.options.pauseFor), E) : (E.options.strings.forEach(function(e) {
                            E.typeString(e).pauseFor(E.options.pauseFor).deleteAll(E.options.deleteSpeed);
                        }), E);
                    }), S(this, "typeString", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        if (o(e)) return E.typeOutHTMLString(e, t);
                        if (e) {
                            var n = (E.options || {}).stringSplitter, r = "function" == typeof n ? n(e) : e.split("");
                            E.typeCharacters(r, t);
                        }
                        return E;
                    }), S(this, "pasteString", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        return o(e) ? E.typeOutHTMLString(e, t, !0) : (e && E.addEventToQueue(m, {
                            character: e,
                            node: t
                        }), E);
                    }), S(this, "typeOutHTMLString", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = arguments.length > 2 ? arguments[2] : void 0, r = function(e) {
                            var t = document.createElement("div");
                            return t.innerHTML = e, t.childNodes;
                        }(e);
                        if (r.length > 0) for(var o = 0; o < r.length; o++){
                            var a = r[o], i = a.innerHTML;
                            a && 3 !== a.nodeType ? (a.innerHTML = "", E.addEventToQueue(d, {
                                node: a,
                                parentNode: t
                            }), n ? E.pasteString(i, a) : E.typeString(i, a)) : a.textContent && (n ? E.pasteString(a.textContent, t) : E.typeString(a.textContent, t));
                        }
                        return E;
                    }), S(this, "deleteAll", function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "natural";
                        return E.addEventToQueue(u, {
                            speed: e
                        }), E;
                    }), S(this, "changeDeleteSpeed", function(e) {
                        if (!e) throw new Error("Must provide new delete speed");
                        return E.addEventToQueue(f, {
                            speed: e
                        }), E;
                    }), S(this, "changeDelay", function(e) {
                        if (!e) throw new Error("Must provide new delay");
                        return E.addEventToQueue(v, {
                            delay: e
                        }), E;
                    }), S(this, "changeCursor", function(e) {
                        if (!e) throw new Error("Must provide new cursor");
                        return E.addEventToQueue(h, {
                            cursor: e
                        }), E;
                    }), S(this, "deleteChars", function(e) {
                        if (!e) throw new Error("Must provide amount of characters to delete");
                        for(var t = 0; t < e; t++)E.addEventToQueue(s);
                        return E;
                    }), S(this, "callFunction", function(e, t) {
                        if (!e || "function" != typeof e) throw new Error("Callback must be a function");
                        return E.addEventToQueue(p, {
                            cb: e,
                            thisArg: t
                        }), E;
                    }), S(this, "typeCharacters", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
                        return e.forEach(function(e) {
                            E.addEventToQueue(i, {
                                character: e,
                                node: t
                            });
                        }), E;
                    }), S(this, "removeCharacters", function(e) {
                        if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
                        return e.forEach(function() {
                            E.addEventToQueue(s);
                        }), E;
                    }), S(this, "addEventToQueue", function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        return E.addEventToStateProperty(e, t, n, "eventQueue");
                    }), S(this, "addReverseCalledEvent", function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        return E.options.loop ? E.addEventToStateProperty(e, t, n, "reverseCalledEvents") : E;
                    }), S(this, "addEventToStateProperty", function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = arguments.length > 3 ? arguments[3] : void 0, o = {
                            eventName: e,
                            eventArgs: t || {}
                        };
                        return E.state[r] = n ? [
                            o
                        ].concat(b(E.state[r])) : [].concat(b(E.state[r]), [
                            o
                        ]), E;
                    }), S(this, "runEventLoop", function() {
                        E.state.lastFrameTime || (E.state.lastFrameTime = Date.now());
                        var e = Date.now(), n = e - E.state.lastFrameTime;
                        if (!E.state.eventQueue.length) {
                            if (!E.options.loop) return;
                            E.state.eventQueue = b(E.state.calledEvents), E.state.calledEvents = [], E.options = w({}, E.state.initialOptions);
                        }
                        if (E.state.eventLoop = t()(E.runEventLoop), !E.state.eventLoopPaused) {
                            if (E.state.pauseUntil) {
                                if (e < E.state.pauseUntil) return;
                                E.state.pauseUntil = null;
                            }
                            var r, o = b(E.state.eventQueue), g = o.shift();
                            if (!(n <= (r = g.eventName === l || g.eventName === s ? "natural" === E.options.deleteSpeed ? a(40, 80) : E.options.deleteSpeed : "natural" === E.options.delay ? a(120, 160) : E.options.delay))) {
                                var T = g.eventName, A = g.eventArgs;
                                switch(E.logInDevMode({
                                    currentEvent: g,
                                    state: E.state,
                                    delay: r
                                }), T){
                                    case m:
                                    case i:
                                        var S = A.character, N = A.node, C = document.createTextNode(S), _ = C;
                                        E.options.onCreateTextNode && "function" == typeof E.options.onCreateTextNode && (_ = E.options.onCreateTextNode(S, C)), _ && (N ? N.appendChild(_) : E.state.elements.wrapper.appendChild(_)), E.state.visibleNodes = [].concat(b(E.state.visibleNodes), [
                                            {
                                                type: "TEXT_NODE",
                                                character: S,
                                                node: _
                                            }
                                        ]);
                                        break;
                                    case s:
                                        o.unshift({
                                            eventName: l,
                                            eventArgs: {
                                                removingCharacterNode: !0
                                            }
                                        });
                                        break;
                                    case c:
                                        var O = g.eventArgs.ms;
                                        E.state.pauseUntil = Date.now() + parseInt(O);
                                        break;
                                    case p:
                                        var L = g.eventArgs, D = L.cb, M = L.thisArg;
                                        D.call(M, {
                                            elements: E.state.elements
                                        });
                                        break;
                                    case d:
                                        var x = g.eventArgs, P = x.node, j = x.parentNode;
                                        j ? j.appendChild(P) : E.state.elements.wrapper.appendChild(P), E.state.visibleNodes = [].concat(b(E.state.visibleNodes), [
                                            {
                                                type: y,
                                                node: P,
                                                parentNode: j || E.state.elements.wrapper
                                            }
                                        ]);
                                        break;
                                    case u:
                                        var R = E.state.visibleNodes, k = A.speed, Q = [];
                                        k && Q.push({
                                            eventName: f,
                                            eventArgs: {
                                                speed: k,
                                                temp: !0
                                            }
                                        });
                                        for(var F = 0, H = R.length; F < H; F++)Q.push({
                                            eventName: l,
                                            eventArgs: {
                                                removingCharacterNode: !1
                                            }
                                        });
                                        k && Q.push({
                                            eventName: f,
                                            eventArgs: {
                                                speed: E.options.deleteSpeed,
                                                temp: !0
                                            }
                                        }), o.unshift.apply(o, Q);
                                        break;
                                    case l:
                                        var I = g.eventArgs.removingCharacterNode;
                                        if (E.state.visibleNodes.length) {
                                            var U = E.state.visibleNodes.pop(), q = U.type, G = U.node, Y = U.character;
                                            E.options.onRemoveNode && "function" == typeof E.options.onRemoveNode && E.options.onRemoveNode({
                                                node: G,
                                                character: Y
                                            }), G && G.parentNode.removeChild(G), q === y && I && o.unshift({
                                                eventName: l,
                                                eventArgs: {}
                                            });
                                        }
                                        break;
                                    case f:
                                        E.options.deleteSpeed = g.eventArgs.speed;
                                        break;
                                    case v:
                                        E.options.delay = g.eventArgs.delay;
                                        break;
                                    case h:
                                        E.options.cursor = g.eventArgs.cursor, E.state.elements.cursor.innerHTML = g.eventArgs.cursor;
                                }
                                E.options.loop && (g.eventName === l || g.eventArgs && g.eventArgs.temp || (E.state.calledEvents = [].concat(b(E.state.calledEvents), [
                                    g
                                ]))), E.state.eventQueue = o, E.state.lastFrameTime = e;
                            }
                        }
                    }), r) {
                        if ("string" == typeof r) {
                            var T = document.querySelector(r);
                            if (!T) throw new Error("Could not find container element");
                            this.state.elements.container = T;
                        } else this.state.elements.container = r;
                    }
                    g && (this.options = w(w({}, this.options), g)), this.state.initialOptions = w({}, this.options), this.init();
                }
                var r, g;
                return r = n, g = [
                    {
                        key: "init",
                        value: function() {
                            var e, t;
                            this.setupWrapperElement(), this.addEventToQueue(h, {
                                cursor: this.options.cursor
                            }, !0), this.addEventToQueue(u, null, !0), !window || window.___TYPEWRITER_JS_STYLES_ADDED___ || this.options.skipAddStyles || (e = ".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}", (t = document.createElement("style")).appendChild(document.createTextNode(e)), document.head.appendChild(t), window.___TYPEWRITER_JS_STYLES_ADDED___ = !0), !0 === this.options.autoStart && this.options.strings && this.typeOutAllStrings().start();
                        }
                    },
                    {
                        key: "logInDevMode",
                        value: function(e) {
                            this.options.devMode && console.log(e);
                        }
                    }
                ], A(r.prototype, g), Object.defineProperty(r, "prototype", {
                    writable: !1
                }), n;
            }();
        })(), r.default;
    })());

},{}],"hs4ye":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getRandomShipAxis", ()=>getRandomShipAxis);
parcelHelpers.export(exports, "getRandomCoord", ()=>getRandomCoord);
parcelHelpers.export(exports, "lookUpShipType", ()=>lookUpShipType);
parcelHelpers.export(exports, "playSound", ()=>playSound);
parcelHelpers.export(exports, "antiHeroTaunts", ()=>antiHeroTaunts);
parcelHelpers.export(exports, "villainTaunts", ()=>villainTaunts);
parcelHelpers.export(exports, "getRandomNumber", ()=>getRandomNumber);
parcelHelpers.export(exports, "lookUpShipImg", ()=>lookUpShipImg);
const getRandomShipAxis = ()=>{
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 1 ? "X" : "Y";
};
const getRandomNumber = (arrLength)=>{
    return Math.floor(Math.random() * arrLength);
};
const getRandomCoord = ()=>{
    const numbers = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ];
    const letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J"
    ];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomField = randomLetter + randomNumber;
    return randomField;
};
const lookUpShipType = (shipType)=>{
    const lookUp = {
        dreadnought: "ship-unit-dreadnought",
        cruiser: "ship-unit-cruiser",
        destroyer: "ship-unit-destroyer",
        frigate: "ship-unit-frigate",
        corvette: "ship-unit-corvette"
    };
    return lookUp[shipType];
};
const playSound = async (soundName)=>{
    const soundFiles = {
        "deploy-ship": new URL(require("55226e57283c7c94")),
        menu: new URL(require("ade6138b25150ada")),
        "hit-ship": new URL(require("a5d9caae58cb2d5")),
        "miss-ship": new URL(require("a06914ca364b5aaf")),
        "select-ship": new URL(require("5e8fde2def465d04")),
        "sunk-ship": new URL(require("826b4c31e46f129e")),
        "game-won": new URL(require("c1cecd4c0f37ab4")),
        "game-lost": new URL(require("8eaf66dcd240fa47")),
        "insert-coin": new URL(require("864c86315a94b8b6")),
        "title-screen": new URL(require("50c727ed28e46af2"))
    };
    const sound = new Audio(soundFiles[soundName]);
    sound.loop = false;
    sound.volume = 1;
    try {
        await sound.play();
    } catch (err) {
        console.error("Audio playback failed:", err);
    }
};
const villainTaunts = {
    hit: [
        "Your ship is falling apart already!",
        "Pathetic! You never stood a chance!",
        "Direct hit! Feel my wrath!",
        "Your fleet will burn in space!",
        "Another ship bites the dust!",
        "You cannot escape my power!",
        "I will crush your pathetic army!",
        "Your defenses are useless to me!",
        "Muahaha! Your doom has arrived!",
        "I strike fear across the galaxy!",
        "That explosion was beautiful!",
        "Soon all your ships will fall!",
        "You fight like a weakling!",
        "Your end is inevitable!",
        "Feel the fury of my cannons!",
        "One blast closer to your defeat!",
        "Your ship belongs in scrap now!",
        "I enjoy watching you suffer!",
        "The stars themselves fear me!",
        "Another perfect shot by me!"
    ],
    miss: [
        "Hmph! You got lucky this time!",
        "You cannot dodge forever!",
        "Stand still and face destruction!",
        "Next shot will finish you!",
        "Running only delays your doom!",
        "My aim never fails twice!",
        "You are merely postponing defeat!",
        "Enjoy your final moments!",
        "You escaped by pure luck!",
        "Soon your ship will explode!",
        "You cannot hide in space forever!",
        "Your fear makes you predictable!",
        "I will hunt you relentlessly!",
        "The next blast will hit true!",
        "You are nothing before my power!",
        "Even the stars betray you!",
        "Your survival is temporary!",
        "I grow tired of missing!",
        "You will regret resisting me!",
        "No ship escapes my wrath!"
    ]
};
const antiHeroTaunts = {
    hit: [
        "Should\u2019ve stayed out of my way!",
        "That ship won\u2019t fly much longer!",
        "You picked the wrong fight today!",
        "I warned you not to test me!",
        "Another clean shot. Move on.",
        "Your shields are falling fast!",
        "I do what needs to be done!",
        "That had to hurt a little!",
        "You\u2019re losing this battle badly!",
        "I\u2019ve taken down worse than you!",
        "Try harder if you want to live!",
        "That\u2019s what happens when you hesitate!",
        "You\u2019re not escaping this fight!",
        "One more hit should finish you!",
        "Your fleet is breaking apart!",
        "I never miss for long!",
        "You\u2019re making this too easy!",
        "This galaxy has no heroes left!",
        "Looks like your luck ran out!",
        "You should\u2019ve turned back earlier!"
    ],
    miss: [
        "Lucky dodge. Don\u2019t expect another!",
        "Keep moving while you still can!",
        "You almost got hit that time!",
        "I\u2019ll adjust my aim next shot!",
        "You\u2019re surviving on borrowed time!",
        "That was closer than you think!",
        "Don\u2019t get confident yet!",
        "You can\u2019t avoid me forever!",
        "Next blast will land clean!",
        "You\u2019re delaying the inevitable!",
        "I\u2019ve got plenty more shots!",
        "Running won\u2019t save your ship!",
        "You\u2019re tougher than expected!",
        "I\u2019m just getting started here!",
        "That escape won\u2019t happen twice!",
        "Your luck\u2019s about to end!",
        "Fine. Let\u2019s try that again!",
        "You\u2019re forcing me to focus now!",
        "Not bad, but you\u2019re still losing!",
        "Enjoy the calm before the hit!"
    ]
};
const lookUpShipImg = (shipType)=>{
    const lookUp = {
        dreadnought: new URL(require("e8988fbc6589b019")).href,
        cruiser: new URL(require("e175fb1a3b66f55b")).href,
        destroyer: new URL(require("1032c6873aedd87")).href,
        frigate: new URL(require("266a5744227675ba")).href,
        corvette: new URL(require("687a054f0c92d3aa")).href
    };
    return lookUp[shipType];
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","ade6138b25150ada":"44ekP","a5d9caae58cb2d5":"cnHSB","a06914ca364b5aaf":"raIUP","55226e57283c7c94":"kzztk","5e8fde2def465d04":"eKxp6","826b4c31e46f129e":"bR4kj","c1cecd4c0f37ab4":"7O4dg","8eaf66dcd240fa47":"4SNKA","864c86315a94b8b6":"9CQq5","50c727ed28e46af2":"jJa3v","e8988fbc6589b019":"bOD13","e175fb1a3b66f55b":"l6PVl","1032c6873aedd87":"g4v49","266a5744227675ba":"can8Q","687a054f0c92d3aa":"iTpOb"}],"44ekP":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("menu.a5af5bbc.mp3") + "?" + Date.now();

},{}],"cnHSB":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("hit-ship.2642c6f1.mp3") + "?" + Date.now();

},{}],"raIUP":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("miss-ship.a5a3c423.mp3") + "?" + Date.now();

},{}],"kzztk":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("deploy-ship.38fde0ca.mp3") + "?" + Date.now();

},{}],"eKxp6":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("select-ship.797f452b.mp3") + "?" + Date.now();

},{}],"bR4kj":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("sunk-ship.f932bd2f.mp3") + "?" + Date.now();

},{}],"7O4dg":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("game-won.06a34dca.mp3") + "?" + Date.now();

},{}],"4SNKA":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("game-lost.1cf79485.mp3") + "?" + Date.now();

},{}],"9CQq5":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("insert-coin.a59c0261.mp3") + "?" + Date.now();

},{}],"jJa3v":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("title-screen.53eb8538.mp3") + "?" + Date.now();

},{}],"bOD13":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("dreadnought-spaceship.ab9b3165.png") + "?" + Date.now();

},{}],"l6PVl":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("cruiser-spaceship.1b6d3709.png") + "?" + Date.now();

},{}],"g4v49":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("destroyer-spaceship.dde87680.png") + "?" + Date.now();

},{}],"can8Q":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("frigate-spaceship.d4f7c522.png") + "?" + Date.now();

},{}],"iTpOb":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("corvette-spaceship.8fcab734.png") + "?" + Date.now();

},{}],"4RmjJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Ship", ()=>Ship);
class Ship {
    _hits = 0;
    constructor(length, type, position, axis){
        this.length = length;
        this.type = type;
        this.position = position;
        this.axis = axis;
    }
    hit() {
        ++this._hits;
    }
    isSunk() {
        return this._hits >= this.length;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["7wZbQ","2R06K"], "2R06K", "parcelRequireb419", {}, "./", "/")

//# sourceMappingURL=battleship.0f77c784.js.map
