window.__ModuleLoader__.load({
  id: "dsh-workflow-plugin",
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    //#region \0rolldown/runtime.js
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
    var __copyProps = (to, from, except, desc) => {
    	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
    		key = keys[i];
    		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
    			get: ((k) => from[k]).bind(null, key),
    			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    		});
    	}
    	return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
    	value: mod,
    	enumerable: true
    }) : target, mod));
    //#endregion
    let react_jsx_runtime = require("react/jsx-runtime");
    let react = require("react");
    react = __toESM(react, 1);
    require("react-dom");
    require("@deepseek-ai/dsh-api-gateway/client");
    require("@deepseek-ai/dsh-client-ui-layout/client");
    require("@deepseek-ai/dsh-client-ui-sidebar/client");
    require("@deepseek-ai/dsh-client-ui-renderer/client");
    require("@deepseek-ai/dsh-client-ui-commands/client");
    require("@deepseek-ai/dsh-client-ui-conversation/client");
    require("@deepseek-ai/dsh-api-workspace-controller/client");
    //#region ../../node_modules/.pnpm/classcat@5.0.5/node_modules/classcat/index.js
    function cc(names) {
    	if (typeof names === "string" || typeof names === "number") return "" + names;
    	let out = "";
    	if (Array.isArray(names)) {
    		for (let i = 0, tmp; i < names.length; i++) if ((tmp = cc(names[i])) !== "") out += (out && " ") + tmp;
    	} else for (let k in names) if (names[k]) out += (out && " ") + k;
    	return out;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
    var noop = { value: () => {} };
    function dispatch() {
    	for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    		if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    		_[t] = [];
    	}
    	return new Dispatch(_);
    }
    function Dispatch(_) {
    	this._ = _;
    }
    function parseTypenames$1(typenames, types) {
    	return typenames.trim().split(/^|\s+/).map(function(t) {
    		var name = "", i = t.indexOf(".");
    		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    		if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    		return {
    			type: t,
    			name
    		};
    	});
    }
    Dispatch.prototype = dispatch.prototype = {
    	constructor: Dispatch,
    	on: function(typename, callback) {
    		var _ = this._, T = parseTypenames$1(typename + "", _), t, i = -1, n = T.length;
    		if (arguments.length < 2) {
    			while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
    			return;
    		}
    		if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    		while (++i < n) if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
    		else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    		return this;
    	},
    	copy: function() {
    		var copy = {}, _ = this._;
    		for (var t in _) copy[t] = _[t].slice();
    		return new Dispatch(copy);
    	},
    	call: function(type, that) {
    		if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    		for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    	},
    	apply: function(type, that, args) {
    		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    		for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    	}
    };
    function get$1(type, name) {
    	for (var i = 0, n = type.length, c; i < n; ++i) if ((c = type[i]).name === name) return c.value;
    }
    function set$1(type, name, callback) {
    	for (var i = 0, n = type.length; i < n; ++i) if (type[i].name === name) {
    		type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
    		break;
    	}
    	if (callback != null) type.push({
    		name,
    		value: callback
    	});
    	return type;
    }
    var namespaces_default = {
    	svg: "http://www.w3.org/2000/svg",
    	xhtml: "http://www.w3.org/1999/xhtml",
    	xlink: "http://www.w3.org/1999/xlink",
    	xml: "http://www.w3.org/XML/1998/namespace",
    	xmlns: "http://www.w3.org/2000/xmlns/"
    };
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
    function namespace_default(name) {
    	var prefix = name += "", i = prefix.indexOf(":");
    	if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    	return namespaces_default.hasOwnProperty(prefix) ? {
    		space: namespaces_default[prefix],
    		local: name
    	} : name;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
    function creatorInherit(name) {
    	return function() {
    		var document = this.ownerDocument, uri = this.namespaceURI;
    		return uri === "http://www.w3.org/1999/xhtml" && document.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? document.createElement(name) : document.createElementNS(uri, name);
    	};
    }
    function creatorFixed(fullname) {
    	return function() {
    		return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    	};
    }
    function creator_default(name) {
    	var fullname = namespace_default(name);
    	return (fullname.local ? creatorFixed : creatorInherit)(fullname);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
    function none() {}
    function selector_default(selector) {
    	return selector == null ? none : function() {
    		return this.querySelector(selector);
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
    function select_default$2(select) {
    	if (typeof select !== "function") select = selector_default(select);
    	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
    		if ("__data__" in node) subnode.__data__ = node.__data__;
    		subgroup[i] = subnode;
    	}
    	return new Selection$1(subgroups, this._parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
    function array$1(x) {
    	return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
    function empty() {
    	return [];
    }
    function selectorAll_default(selector) {
    	return selector == null ? empty : function() {
    		return this.querySelectorAll(selector);
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
    function arrayAll(select) {
    	return function() {
    		return array$1(select.apply(this, arguments));
    	};
    }
    function selectAll_default$1(select) {
    	if (typeof select === "function") select = arrayAll(select);
    	else select = selectorAll_default(select);
    	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
    		subgroups.push(select.call(node, node.__data__, i, group));
    		parents.push(node);
    	}
    	return new Selection$1(subgroups, parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
    function matcher_default(selector) {
    	return function() {
    		return this.matches(selector);
    	};
    }
    function childMatcher(selector) {
    	return function(node) {
    		return node.matches(selector);
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
    var find = Array.prototype.find;
    function childFind(match) {
    	return function() {
    		return find.call(this.children, match);
    	};
    }
    function childFirst() {
    	return this.firstElementChild;
    }
    function selectChild_default(match) {
    	return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
    var filter = Array.prototype.filter;
    function children() {
    	return Array.from(this.children);
    }
    function childrenFilter(match) {
    	return function() {
    		return filter.call(this.children, match);
    	};
    }
    function selectChildren_default(match) {
    	return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
    function filter_default$1(match) {
    	if (typeof match !== "function") match = matcher_default(match);
    	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    	return new Selection$1(subgroups, this._parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
    function sparse_default(update) {
    	return new Array(update.length);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
    function enter_default() {
    	return new Selection$1(this._enter || this._groups.map(sparse_default), this._parents);
    }
    function EnterNode(parent, datum) {
    	this.ownerDocument = parent.ownerDocument;
    	this.namespaceURI = parent.namespaceURI;
    	this._next = null;
    	this._parent = parent;
    	this.__data__ = datum;
    }
    EnterNode.prototype = {
    	constructor: EnterNode,
    	appendChild: function(child) {
    		return this._parent.insertBefore(child, this._next);
    	},
    	insertBefore: function(child, next) {
    		return this._parent.insertBefore(child, next);
    	},
    	querySelector: function(selector) {
    		return this._parent.querySelector(selector);
    	},
    	querySelectorAll: function(selector) {
    		return this._parent.querySelectorAll(selector);
    	}
    };
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
    function constant_default$3(x) {
    	return function() {
    		return x;
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
    function bindIndex(parent, group, enter, update, exit, data) {
    	var i = 0, node, groupLength = group.length, dataLength = data.length;
    	for (; i < dataLength; ++i) if (node = group[i]) {
    		node.__data__ = data[i];
    		update[i] = node;
    	} else enter[i] = new EnterNode(parent, data[i]);
    	for (; i < groupLength; ++i) if (node = group[i]) exit[i] = node;
    }
    function bindKey(parent, group, enter, update, exit, data, key) {
    	var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    	for (i = 0; i < groupLength; ++i) if (node = group[i]) {
    		keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
    		if (nodeByKeyValue.has(keyValue)) exit[i] = node;
    		else nodeByKeyValue.set(keyValue, node);
    	}
    	for (i = 0; i < dataLength; ++i) {
    		keyValue = key.call(parent, data[i], i, data) + "";
    		if (node = nodeByKeyValue.get(keyValue)) {
    			update[i] = node;
    			node.__data__ = data[i];
    			nodeByKeyValue.delete(keyValue);
    		} else enter[i] = new EnterNode(parent, data[i]);
    	}
    	for (i = 0; i < groupLength; ++i) if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
    }
    function datum(node) {
    	return node.__data__;
    }
    function data_default(value, key) {
    	if (!arguments.length) return Array.from(this, datum);
    	var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    	if (typeof value !== "function") value = constant_default$3(value);
    	for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    		var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength);
    		bind(parent, group, enterGroup, updateGroup, exit[j] = new Array(groupLength), data, key);
    		for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) if (previous = enterGroup[i0]) {
    			if (i0 >= i1) i1 = i0 + 1;
    			while (!(next = updateGroup[i1]) && ++i1 < dataLength);
    			previous._next = next || null;
    		}
    	}
    	update = new Selection$1(update, parents);
    	update._enter = enter;
    	update._exit = exit;
    	return update;
    }
    function arraylike(data) {
    	return typeof data === "object" && "length" in data ? data : Array.from(data);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
    function exit_default() {
    	return new Selection$1(this._exit || this._groups.map(sparse_default), this._parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
    function join_default(onenter, onupdate, onexit) {
    	var enter = this.enter(), update = this, exit = this.exit();
    	if (typeof onenter === "function") {
    		enter = onenter(enter);
    		if (enter) enter = enter.selection();
    	} else enter = enter.append(onenter + "");
    	if (onupdate != null) {
    		update = onupdate(update);
    		if (update) update = update.selection();
    	}
    	if (onexit == null) exit.remove();
    	else onexit(exit);
    	return enter && update ? enter.merge(update).order() : update;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
    function merge_default$1(context) {
    	var selection = context.selection ? context.selection() : context;
    	for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
    	for (; j < m0; ++j) merges[j] = groups0[j];
    	return new Selection$1(merges, this._parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
    function order_default() {
    	for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) if (node = group[i]) {
    		if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
    		next = node;
    	}
    	return this;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
    function sort_default(compare) {
    	if (!compare) compare = ascending;
    	function compareNode(a, b) {
    		return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    	}
    	for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    		for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group[i]) sortgroup[i] = node;
    		sortgroup.sort(compareNode);
    	}
    	return new Selection$1(sortgroups, this._parents).order();
    }
    function ascending(a, b) {
    	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
    function call_default() {
    	var callback = arguments[0];
    	arguments[0] = this;
    	callback.apply(null, arguments);
    	return this;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
    function nodes_default() {
    	return Array.from(this);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
    function node_default() {
    	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
    		var node = group[i];
    		if (node) return node;
    	}
    	return null;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
    function size_default() {
    	let size = 0;
    	for (const node of this) ++size;
    	return size;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
    function empty_default() {
    	return !this.node();
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
    function each_default(callback) {
    	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) callback.call(node, node.__data__, i, group);
    	return this;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
    function attrRemove$1(name) {
    	return function() {
    		this.removeAttribute(name);
    	};
    }
    function attrRemoveNS$1(fullname) {
    	return function() {
    		this.removeAttributeNS(fullname.space, fullname.local);
    	};
    }
    function attrConstant$1(name, value) {
    	return function() {
    		this.setAttribute(name, value);
    	};
    }
    function attrConstantNS$1(fullname, value) {
    	return function() {
    		this.setAttributeNS(fullname.space, fullname.local, value);
    	};
    }
    function attrFunction$1(name, value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		if (v == null) this.removeAttribute(name);
    		else this.setAttribute(name, v);
    	};
    }
    function attrFunctionNS$1(fullname, value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    		else this.setAttributeNS(fullname.space, fullname.local, v);
    	};
    }
    function attr_default$1(name, value) {
    	var fullname = namespace_default(name);
    	if (arguments.length < 2) {
    		var node = this.node();
    		return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    	}
    	return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
    function window_default(node) {
    	return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
    function styleRemove$1(name) {
    	return function() {
    		this.style.removeProperty(name);
    	};
    }
    function styleConstant$1(name, value, priority) {
    	return function() {
    		this.style.setProperty(name, value, priority);
    	};
    }
    function styleFunction$1(name, value, priority) {
    	return function() {
    		var v = value.apply(this, arguments);
    		if (v == null) this.style.removeProperty(name);
    		else this.style.setProperty(name, v, priority);
    	};
    }
    function style_default$2(name, value, priority) {
    	return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
    }
    function styleValue(node, name) {
    	return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
    function propertyRemove(name) {
    	return function() {
    		delete this[name];
    	};
    }
    function propertyConstant(name, value) {
    	return function() {
    		this[name] = value;
    	};
    }
    function propertyFunction(name, value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		if (v == null) delete this[name];
    		else this[name] = v;
    	};
    }
    function property_default(name, value) {
    	return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
    function classArray(string) {
    	return string.trim().split(/^|\s+/);
    }
    function classList(node) {
    	return node.classList || new ClassList(node);
    }
    function ClassList(node) {
    	this._node = node;
    	this._names = classArray(node.getAttribute("class") || "");
    }
    ClassList.prototype = {
    	add: function(name) {
    		if (this._names.indexOf(name) < 0) {
    			this._names.push(name);
    			this._node.setAttribute("class", this._names.join(" "));
    		}
    	},
    	remove: function(name) {
    		var i = this._names.indexOf(name);
    		if (i >= 0) {
    			this._names.splice(i, 1);
    			this._node.setAttribute("class", this._names.join(" "));
    		}
    	},
    	contains: function(name) {
    		return this._names.indexOf(name) >= 0;
    	}
    };
    function classedAdd(node, names) {
    	var list = classList(node), i = -1, n = names.length;
    	while (++i < n) list.add(names[i]);
    }
    function classedRemove(node, names) {
    	var list = classList(node), i = -1, n = names.length;
    	while (++i < n) list.remove(names[i]);
    }
    function classedTrue(names) {
    	return function() {
    		classedAdd(this, names);
    	};
    }
    function classedFalse(names) {
    	return function() {
    		classedRemove(this, names);
    	};
    }
    function classedFunction(names, value) {
    	return function() {
    		(value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    	};
    }
    function classed_default(name, value) {
    	var names = classArray(name + "");
    	if (arguments.length < 2) {
    		var list = classList(this.node()), i = -1, n = names.length;
    		while (++i < n) if (!list.contains(names[i])) return false;
    		return true;
    	}
    	return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
    function textRemove() {
    	this.textContent = "";
    }
    function textConstant$1(value) {
    	return function() {
    		this.textContent = value;
    	};
    }
    function textFunction$1(value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		this.textContent = v == null ? "" : v;
    	};
    }
    function text_default$1(value) {
    	return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
    function htmlRemove() {
    	this.innerHTML = "";
    }
    function htmlConstant(value) {
    	return function() {
    		this.innerHTML = value;
    	};
    }
    function htmlFunction(value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		this.innerHTML = v == null ? "" : v;
    	};
    }
    function html_default(value) {
    	return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
    function raise() {
    	if (this.nextSibling) this.parentNode.appendChild(this);
    }
    function raise_default() {
    	return this.each(raise);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
    function lower() {
    	if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }
    function lower_default() {
    	return this.each(lower);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
    function append_default(name) {
    	var create = typeof name === "function" ? name : creator_default(name);
    	return this.select(function() {
    		return this.appendChild(create.apply(this, arguments));
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
    function constantNull() {
    	return null;
    }
    function insert_default(name, before) {
    	var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    	return this.select(function() {
    		return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
    function remove() {
    	var parent = this.parentNode;
    	if (parent) parent.removeChild(this);
    }
    function remove_default$1() {
    	return this.each(remove);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
    function selection_cloneShallow() {
    	var clone = this.cloneNode(false), parent = this.parentNode;
    	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }
    function selection_cloneDeep() {
    	var clone = this.cloneNode(true), parent = this.parentNode;
    	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }
    function clone_default(deep) {
    	return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
    function datum_default(value) {
    	return arguments.length ? this.property("__data__", value) : this.node().__data__;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
    function contextListener(listener) {
    	return function(event) {
    		listener.call(this, event, this.__data__);
    	};
    }
    function parseTypenames(typenames) {
    	return typenames.trim().split(/^|\s+/).map(function(t) {
    		var name = "", i = t.indexOf(".");
    		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    		return {
    			type: t,
    			name
    		};
    	});
    }
    function onRemove(typename) {
    	return function() {
    		var on = this.__on;
    		if (!on) return;
    		for (var j = 0, i = -1, m = on.length, o; j < m; ++j) if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
    		else on[++i] = o;
    		if (++i) on.length = i;
    		else delete this.__on;
    	};
    }
    function onAdd(typename, value, options) {
    	return function() {
    		var on = this.__on, o, listener = contextListener(value);
    		if (on) {
    			for (var j = 0, m = on.length; j < m; ++j) if ((o = on[j]).type === typename.type && o.name === typename.name) {
    				this.removeEventListener(o.type, o.listener, o.options);
    				this.addEventListener(o.type, o.listener = listener, o.options = options);
    				o.value = value;
    				return;
    			}
    		}
    		this.addEventListener(typename.type, listener, options);
    		o = {
    			type: typename.type,
    			name: typename.name,
    			value,
    			listener,
    			options
    		};
    		if (!on) this.__on = [o];
    		else on.push(o);
    	};
    }
    function on_default$1(typename, value, options) {
    	var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    	if (arguments.length < 2) {
    		var on = this.node().__on;
    		if (on) {
    			for (var j = 0, m = on.length, o; j < m; ++j) for (i = 0, o = on[j]; i < n; ++i) if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
    		}
    		return;
    	}
    	on = value ? onAdd : onRemove;
    	for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    	return this;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
    function dispatchEvent(node, type, params) {
    	var window = window_default(node), event = window.CustomEvent;
    	if (typeof event === "function") event = new event(type, params);
    	else {
    		event = window.document.createEvent("Event");
    		if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    		else event.initEvent(type, false, false);
    	}
    	node.dispatchEvent(event);
    }
    function dispatchConstant(type, params) {
    	return function() {
    		return dispatchEvent(this, type, params);
    	};
    }
    function dispatchFunction(type, params) {
    	return function() {
    		return dispatchEvent(this, type, params.apply(this, arguments));
    	};
    }
    function dispatch_default(type, params) {
    	return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
    function* iterator_default() {
    	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) yield node;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
    var root = [null];
    function Selection$1(groups, parents) {
    	this._groups = groups;
    	this._parents = parents;
    }
    function selection() {
    	return new Selection$1([[document.documentElement]], root);
    }
    function selection_selection() {
    	return this;
    }
    Selection$1.prototype = selection.prototype = {
    	constructor: Selection$1,
    	select: select_default$2,
    	selectAll: selectAll_default$1,
    	selectChild: selectChild_default,
    	selectChildren: selectChildren_default,
    	filter: filter_default$1,
    	data: data_default,
    	enter: enter_default,
    	exit: exit_default,
    	join: join_default,
    	merge: merge_default$1,
    	selection: selection_selection,
    	order: order_default,
    	sort: sort_default,
    	call: call_default,
    	nodes: nodes_default,
    	node: node_default,
    	size: size_default,
    	empty: empty_default,
    	each: each_default,
    	attr: attr_default$1,
    	style: style_default$2,
    	property: property_default,
    	classed: classed_default,
    	text: text_default$1,
    	html: html_default,
    	raise: raise_default,
    	lower: lower_default,
    	append: append_default,
    	insert: insert_default,
    	remove: remove_default$1,
    	clone: clone_default,
    	datum: datum_default,
    	on: on_default$1,
    	dispatch: dispatch_default,
    	[Symbol.iterator]: iterator_default
    };
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
    function select_default$1(selector) {
    	return typeof selector === "string" ? new Selection$1([[document.querySelector(selector)]], [document.documentElement]) : new Selection$1([[selector]], root);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
    function sourceEvent_default(event) {
    	let sourceEvent;
    	while (sourceEvent = event.sourceEvent) event = sourceEvent;
    	return event;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
    function pointer_default(event, node) {
    	event = sourceEvent_default(event);
    	if (node === void 0) node = event.currentTarget;
    	if (node) {
    		var svg = node.ownerSVGElement || node;
    		if (svg.createSVGPoint) {
    			var point = svg.createSVGPoint();
    			point.x = event.clientX, point.y = event.clientY;
    			point = point.matrixTransform(node.getScreenCTM().inverse());
    			return [point.x, point.y];
    		}
    		if (node.getBoundingClientRect) {
    			var rect = node.getBoundingClientRect();
    			return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    		}
    	}
    	return [event.pageX, event.pageY];
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
    const nonpassive = { passive: false };
    const nonpassivecapture = {
    	capture: true,
    	passive: false
    };
    function nopropagation$1(event) {
    	event.stopImmediatePropagation();
    }
    function noevent_default$1(event) {
    	event.preventDefault();
    	event.stopImmediatePropagation();
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
    function nodrag_default(view) {
    	var root = view.document.documentElement, selection = select_default$1(view).on("dragstart.drag", noevent_default$1, nonpassivecapture);
    	if ("onselectstart" in root) selection.on("selectstart.drag", noevent_default$1, nonpassivecapture);
    	else {
    		root.__noselect = root.style.MozUserSelect;
    		root.style.MozUserSelect = "none";
    	}
    }
    function yesdrag(view, noclick) {
    	var root = view.document.documentElement, selection = select_default$1(view).on("dragstart.drag", null);
    	if (noclick) {
    		selection.on("click.drag", noevent_default$1, nonpassivecapture);
    		setTimeout(function() {
    			selection.on("click.drag", null);
    		}, 0);
    	}
    	if ("onselectstart" in root) selection.on("selectstart.drag", null);
    	else {
    		root.style.MozUserSelect = root.__noselect;
    		delete root.__noselect;
    	}
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
    var constant_default$2 = (x) => () => x;
    //#endregion
    //#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
    function DragEvent(type, { sourceEvent, subject, target, identifier, active, x, y, dx, dy, dispatch }) {
    	Object.defineProperties(this, {
    		type: {
    			value: type,
    			enumerable: true,
    			configurable: true
    		},
    		sourceEvent: {
    			value: sourceEvent,
    			enumerable: true,
    			configurable: true
    		},
    		subject: {
    			value: subject,
    			enumerable: true,
    			configurable: true
    		},
    		target: {
    			value: target,
    			enumerable: true,
    			configurable: true
    		},
    		identifier: {
    			value: identifier,
    			enumerable: true,
    			configurable: true
    		},
    		active: {
    			value: active,
    			enumerable: true,
    			configurable: true
    		},
    		x: {
    			value: x,
    			enumerable: true,
    			configurable: true
    		},
    		y: {
    			value: y,
    			enumerable: true,
    			configurable: true
    		},
    		dx: {
    			value: dx,
    			enumerable: true,
    			configurable: true
    		},
    		dy: {
    			value: dy,
    			enumerable: true,
    			configurable: true
    		},
    		_: { value: dispatch }
    	});
    }
    DragEvent.prototype.on = function() {
    	var value = this._.on.apply(this._, arguments);
    	return value === this._ ? this : value;
    };
    //#endregion
    //#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js
    function defaultFilter$1(event) {
    	return !event.ctrlKey && !event.button;
    }
    function defaultContainer() {
    	return this.parentNode;
    }
    function defaultSubject(event, d) {
    	return d == null ? {
    		x: event.x,
    		y: event.y
    	} : d;
    }
    function defaultTouchable$1() {
    	return navigator.maxTouchPoints || "ontouchstart" in this;
    }
    function drag_default() {
    	var filter = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
    	function drag(selection) {
    		selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    	}
    	function mousedowned(event, d) {
    		if (touchending || !filter.call(this, event, d)) return;
    		var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    		if (!gesture) return;
    		select_default$1(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
    		nodrag_default(event.view);
    		nopropagation$1(event);
    		mousemoving = false;
    		mousedownx = event.clientX;
    		mousedowny = event.clientY;
    		gesture("start", event);
    	}
    	function mousemoved(event) {
    		noevent_default$1(event);
    		if (!mousemoving) {
    			var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
    			mousemoving = dx * dx + dy * dy > clickDistance2;
    		}
    		gestures.mouse("drag", event);
    	}
    	function mouseupped(event) {
    		select_default$1(event.view).on("mousemove.drag mouseup.drag", null);
    		yesdrag(event.view, mousemoving);
    		noevent_default$1(event);
    		gestures.mouse("end", event);
    	}
    	function touchstarted(event, d) {
    		if (!filter.call(this, event, d)) return;
    		var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i = 0, gesture;
    		for (; i < n; ++i) if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
    			nopropagation$1(event);
    			gesture("start", event, touches[i]);
    		}
    	}
    	function touchmoved(event) {
    		var touches = event.changedTouches, n = touches.length, i = 0, gesture;
    		for (; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
    			noevent_default$1(event);
    			gesture("drag", event, touches[i]);
    		}
    	}
    	function touchended(event) {
    		var touches = event.changedTouches, n = touches.length, i, gesture;
    		if (touchending) clearTimeout(touchending);
    		touchending = setTimeout(function() {
    			touchending = null;
    		}, 500);
    		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
    			nopropagation$1(event);
    			gesture("end", event, touches[i]);
    		}
    	}
    	function beforestart(that, container, event, d, identifier, touch) {
    		var dispatch = listeners.copy(), p = pointer_default(touch || event, container), dx, dy, s;
    		if ((s = subject.call(that, new DragEvent("beforestart", {
    			sourceEvent: event,
    			target: drag,
    			identifier,
    			active,
    			x: p[0],
    			y: p[1],
    			dx: 0,
    			dy: 0,
    			dispatch
    		}), d)) == null) return;
    		dx = s.x - p[0] || 0;
    		dy = s.y - p[1] || 0;
    		return function gesture(type, event, touch) {
    			var p0 = p, n;
    			switch (type) {
    				case "start":
    					gestures[identifier] = gesture, n = active++;
    					break;
    				case "end": delete gestures[identifier], --active;
    				case "drag": p = pointer_default(touch || event, container), n = active;
    			}
    			dispatch.call(type, that, new DragEvent(type, {
    				sourceEvent: event,
    				subject: s,
    				target: drag,
    				identifier,
    				active: n,
    				x: p[0] + dx,
    				y: p[1] + dy,
    				dx: p[0] - p0[0],
    				dy: p[1] - p0[1],
    				dispatch
    			}), d);
    		};
    	}
    	drag.filter = function(_) {
    		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default$2(!!_), drag) : filter;
    	};
    	drag.container = function(_) {
    		return arguments.length ? (container = typeof _ === "function" ? _ : constant_default$2(_), drag) : container;
    	};
    	drag.subject = function(_) {
    		return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default$2(_), drag) : subject;
    	};
    	drag.touchable = function(_) {
    		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default$2(!!_), drag) : touchable;
    	};
    	drag.on = function() {
    		var value = listeners.on.apply(listeners, arguments);
    		return value === listeners ? drag : value;
    	};
    	drag.clickDistance = function(_) {
    		return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
    	};
    	return drag;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
    function define_default(constructor, factory, prototype) {
    	constructor.prototype = factory.prototype = prototype;
    	prototype.constructor = constructor;
    }
    function extend$1(parent, definition) {
    	var prototype = Object.create(parent.prototype);
    	for (var key in definition) prototype[key] = definition[key];
    	return prototype;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
    function Color() {}
    var darker = .7;
    var brighter = 1 / darker;
    var reI = "\\s*([+-]?\\d+)\\s*";
    var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
    var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
    var reHex = /^#([0-9a-f]{3,8})$/;
    var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
    var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
    var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
    var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
    var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
    var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
    var named = {
    	aliceblue: 15792383,
    	antiquewhite: 16444375,
    	aqua: 65535,
    	aquamarine: 8388564,
    	azure: 15794175,
    	beige: 16119260,
    	bisque: 16770244,
    	black: 0,
    	blanchedalmond: 16772045,
    	blue: 255,
    	blueviolet: 9055202,
    	brown: 10824234,
    	burlywood: 14596231,
    	cadetblue: 6266528,
    	chartreuse: 8388352,
    	chocolate: 13789470,
    	coral: 16744272,
    	cornflowerblue: 6591981,
    	cornsilk: 16775388,
    	crimson: 14423100,
    	cyan: 65535,
    	darkblue: 139,
    	darkcyan: 35723,
    	darkgoldenrod: 12092939,
    	darkgray: 11119017,
    	darkgreen: 25600,
    	darkgrey: 11119017,
    	darkkhaki: 12433259,
    	darkmagenta: 9109643,
    	darkolivegreen: 5597999,
    	darkorange: 16747520,
    	darkorchid: 10040012,
    	darkred: 9109504,
    	darksalmon: 15308410,
    	darkseagreen: 9419919,
    	darkslateblue: 4734347,
    	darkslategray: 3100495,
    	darkslategrey: 3100495,
    	darkturquoise: 52945,
    	darkviolet: 9699539,
    	deeppink: 16716947,
    	deepskyblue: 49151,
    	dimgray: 6908265,
    	dimgrey: 6908265,
    	dodgerblue: 2003199,
    	firebrick: 11674146,
    	floralwhite: 16775920,
    	forestgreen: 2263842,
    	fuchsia: 16711935,
    	gainsboro: 14474460,
    	ghostwhite: 16316671,
    	gold: 16766720,
    	goldenrod: 14329120,
    	gray: 8421504,
    	green: 32768,
    	greenyellow: 11403055,
    	grey: 8421504,
    	honeydew: 15794160,
    	hotpink: 16738740,
    	indianred: 13458524,
    	indigo: 4915330,
    	ivory: 16777200,
    	khaki: 15787660,
    	lavender: 15132410,
    	lavenderblush: 16773365,
    	lawngreen: 8190976,
    	lemonchiffon: 16775885,
    	lightblue: 11393254,
    	lightcoral: 15761536,
    	lightcyan: 14745599,
    	lightgoldenrodyellow: 16448210,
    	lightgray: 13882323,
    	lightgreen: 9498256,
    	lightgrey: 13882323,
    	lightpink: 16758465,
    	lightsalmon: 16752762,
    	lightseagreen: 2142890,
    	lightskyblue: 8900346,
    	lightslategray: 7833753,
    	lightslategrey: 7833753,
    	lightsteelblue: 11584734,
    	lightyellow: 16777184,
    	lime: 65280,
    	limegreen: 3329330,
    	linen: 16445670,
    	magenta: 16711935,
    	maroon: 8388608,
    	mediumaquamarine: 6737322,
    	mediumblue: 205,
    	mediumorchid: 12211667,
    	mediumpurple: 9662683,
    	mediumseagreen: 3978097,
    	mediumslateblue: 8087790,
    	mediumspringgreen: 64154,
    	mediumturquoise: 4772300,
    	mediumvioletred: 13047173,
    	midnightblue: 1644912,
    	mintcream: 16121850,
    	mistyrose: 16770273,
    	moccasin: 16770229,
    	navajowhite: 16768685,
    	navy: 128,
    	oldlace: 16643558,
    	olive: 8421376,
    	olivedrab: 7048739,
    	orange: 16753920,
    	orangered: 16729344,
    	orchid: 14315734,
    	palegoldenrod: 15657130,
    	palegreen: 10025880,
    	paleturquoise: 11529966,
    	palevioletred: 14381203,
    	papayawhip: 16773077,
    	peachpuff: 16767673,
    	peru: 13468991,
    	pink: 16761035,
    	plum: 14524637,
    	powderblue: 11591910,
    	purple: 8388736,
    	rebeccapurple: 6697881,
    	red: 16711680,
    	rosybrown: 12357519,
    	royalblue: 4286945,
    	saddlebrown: 9127187,
    	salmon: 16416882,
    	sandybrown: 16032864,
    	seagreen: 3050327,
    	seashell: 16774638,
    	sienna: 10506797,
    	silver: 12632256,
    	skyblue: 8900331,
    	slateblue: 6970061,
    	slategray: 7372944,
    	slategrey: 7372944,
    	snow: 16775930,
    	springgreen: 65407,
    	steelblue: 4620980,
    	tan: 13808780,
    	teal: 32896,
    	thistle: 14204888,
    	tomato: 16737095,
    	turquoise: 4251856,
    	violet: 15631086,
    	wheat: 16113331,
    	white: 16777215,
    	whitesmoke: 16119285,
    	yellow: 16776960,
    	yellowgreen: 10145074
    };
    define_default(Color, color, {
    	copy(channels) {
    		return Object.assign(new this.constructor(), this, channels);
    	},
    	displayable() {
    		return this.rgb().displayable();
    	},
    	hex: color_formatHex,
    	formatHex: color_formatHex,
    	formatHex8: color_formatHex8,
    	formatHsl: color_formatHsl,
    	formatRgb: color_formatRgb,
    	toString: color_formatRgb
    });
    function color_formatHex() {
    	return this.rgb().formatHex();
    }
    function color_formatHex8() {
    	return this.rgb().formatHex8();
    }
    function color_formatHsl() {
    	return hslConvert(this).formatHsl();
    }
    function color_formatRgb() {
    	return this.rgb().formatRgb();
    }
    function color(format) {
    	var m, l;
    	format = (format + "").trim().toLowerCase();
    	return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
    }
    function rgbn(n) {
    	return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
    }
    function rgba(r, g, b, a) {
    	if (a <= 0) r = g = b = NaN;
    	return new Rgb(r, g, b, a);
    }
    function rgbConvert(o) {
    	if (!(o instanceof Color)) o = color(o);
    	if (!o) return new Rgb();
    	o = o.rgb();
    	return new Rgb(o.r, o.g, o.b, o.opacity);
    }
    function rgb(r, g, b, opacity) {
    	return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }
    function Rgb(r, g, b, opacity) {
    	this.r = +r;
    	this.g = +g;
    	this.b = +b;
    	this.opacity = +opacity;
    }
    define_default(Rgb, rgb, extend$1(Color, {
    	brighter(k) {
    		k = k == null ? brighter : Math.pow(brighter, k);
    		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    	},
    	darker(k) {
    		k = k == null ? darker : Math.pow(darker, k);
    		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    	},
    	rgb() {
    		return this;
    	},
    	clamp() {
    		return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    	},
    	displayable() {
    		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    	},
    	hex: rgb_formatHex,
    	formatHex: rgb_formatHex,
    	formatHex8: rgb_formatHex8,
    	formatRgb: rgb_formatRgb,
    	toString: rgb_formatRgb
    }));
    function rgb_formatHex() {
    	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
    }
    function rgb_formatHex8() {
    	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
    }
    function rgb_formatRgb() {
    	const a = clampa(this.opacity);
    	return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
    }
    function clampa(opacity) {
    	return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
    }
    function clampi(value) {
    	return Math.max(0, Math.min(255, Math.round(value) || 0));
    }
    function hex(value) {
    	value = clampi(value);
    	return (value < 16 ? "0" : "") + value.toString(16);
    }
    function hsla(h, s, l, a) {
    	if (a <= 0) h = s = l = NaN;
    	else if (l <= 0 || l >= 1) h = s = NaN;
    	else if (s <= 0) h = NaN;
    	return new Hsl(h, s, l, a);
    }
    function hslConvert(o) {
    	if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    	if (!(o instanceof Color)) o = color(o);
    	if (!o) return new Hsl();
    	if (o instanceof Hsl) return o;
    	o = o.rgb();
    	var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    	if (s) {
    		if (r === max) h = (g - b) / s + (g < b) * 6;
    		else if (g === max) h = (b - r) / s + 2;
    		else h = (r - g) / s + 4;
    		s /= l < .5 ? max + min : 2 - max - min;
    		h *= 60;
    	} else s = l > 0 && l < 1 ? 0 : h;
    	return new Hsl(h, s, l, o.opacity);
    }
    function hsl(h, s, l, opacity) {
    	return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }
    function Hsl(h, s, l, opacity) {
    	this.h = +h;
    	this.s = +s;
    	this.l = +l;
    	this.opacity = +opacity;
    }
    define_default(Hsl, hsl, extend$1(Color, {
    	brighter(k) {
    		k = k == null ? brighter : Math.pow(brighter, k);
    		return new Hsl(this.h, this.s, this.l * k, this.opacity);
    	},
    	darker(k) {
    		k = k == null ? darker : Math.pow(darker, k);
    		return new Hsl(this.h, this.s, this.l * k, this.opacity);
    	},
    	rgb() {
    		var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < .5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    		return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    	},
    	clamp() {
    		return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    	},
    	displayable() {
    		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    	},
    	formatHsl() {
    		const a = clampa(this.opacity);
    		return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    	}
    }));
    function clamph(value) {
    	value = (value || 0) % 360;
    	return value < 0 ? value + 360 : value;
    }
    function clampt(value) {
    	return Math.max(0, Math.min(1, value || 0));
    }
    function hsl2rgb(h, m1, m2) {
    	return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
    var constant_default$1 = (x) => () => x;
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
    function linear(a, d) {
    	return function(t) {
    		return a + t * d;
    	};
    }
    function exponential(a, b, y) {
    	return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    		return Math.pow(a + t * b, y);
    	};
    }
    function gamma(y) {
    	return (y = +y) === 1 ? nogamma : function(a, b) {
    		return b - a ? exponential(a, b, y) : constant_default$1(isNaN(a) ? b : a);
    	};
    }
    function nogamma(a, b) {
    	var d = b - a;
    	return d ? linear(a, d) : constant_default$1(isNaN(a) ? b : a);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
    var rgb_default = (function rgbGamma(y) {
    	var color = gamma(y);
    	function rgb$1(start, end) {
    		var r = color((start = rgb(start)).r, (end = rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    		return function(t) {
    			start.r = r(t);
    			start.g = g(t);
    			start.b = b(t);
    			start.opacity = opacity(t);
    			return start + "";
    		};
    	}
    	rgb$1.gamma = rgbGamma;
    	return rgb$1;
    })(1);
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/numberArray.js
    function numberArray_default(a, b) {
    	if (!b) b = [];
    	var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    	return function(t) {
    		for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    		return c;
    	};
    }
    function isNumberArray(x) {
    	return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/array.js
    function genericArray(a, b) {
    	var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i = 0;
    	for (; i < na; ++i) x[i] = value_default(a[i], b[i]);
    	for (; i < nb; ++i) c[i] = b[i];
    	return function(t) {
    		for (i = 0; i < na; ++i) c[i] = x[i](t);
    		return c;
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/date.js
    function date_default(a, b) {
    	var d = /* @__PURE__ */ new Date();
    	return a = +a, b = +b, function(t) {
    		return d.setTime(a * (1 - t) + b * t), d;
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
    function number_default(a, b) {
    	return a = +a, b = +b, function(t) {
    		return a * (1 - t) + b * t;
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/object.js
    function object_default(a, b) {
    	var i = {}, c = {}, k;
    	if (a === null || typeof a !== "object") a = {};
    	if (b === null || typeof b !== "object") b = {};
    	for (k in b) if (k in a) i[k] = value_default(a[k], b[k]);
    	else c[k] = b[k];
    	return function(t) {
    		for (k in i) c[k] = i[k](t);
    		return c;
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    var reB = new RegExp(reA.source, "g");
    function zero(b) {
    	return function() {
    		return b;
    	};
    }
    function one(b) {
    	return function(t) {
    		return b(t) + "";
    	};
    }
    function string_default(a, b) {
    	var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    	a = a + "", b = b + "";
    	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    		if ((bs = bm.index) > bi) {
    			bs = b.slice(bi, bs);
    			if (s[i]) s[i] += bs;
    			else s[++i] = bs;
    		}
    		if ((am = am[0]) === (bm = bm[0])) {
    			if (s[i]) s[i] += bm;
    			else s[++i] = bm;
    		} else {
    			s[++i] = null;
    			q.push({
    				i,
    				x: number_default(am, bm)
    			});
    		}
    		bi = reB.lastIndex;
    	}
    	if (bi < b.length) {
    		bs = b.slice(bi);
    		if (s[i]) s[i] += bs;
    		else s[++i] = bs;
    	}
    	return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    		for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    		return s.join("");
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/value.js
    function value_default(a, b) {
    	var t = typeof b, c;
    	return b == null || t === "boolean" ? constant_default$1(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
    var degrees = 180 / Math.PI;
    var identity$2 = {
    	translateX: 0,
    	translateY: 0,
    	rotate: 0,
    	skewX: 0,
    	scaleX: 1,
    	scaleY: 1
    };
    function decompose_default(a, b, c, d, e, f) {
    	var scaleX, scaleY, skewX;
    	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    	return {
    		translateX: e,
    		translateY: f,
    		rotate: Math.atan2(b, a) * degrees,
    		skewX: Math.atan(skewX) * degrees,
    		scaleX,
    		scaleY
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
    var svgNode;
    function parseCss(value) {
    	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    	return m.isIdentity ? identity$2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
    }
    function parseSvg(value) {
    	if (value == null) return identity$2;
    	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    	svgNode.setAttribute("transform", value);
    	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
    	value = value.matrix;
    	return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
    function interpolateTransform(parse, pxComma, pxParen, degParen) {
    	function pop(s) {
    		return s.length ? s.pop() + " " : "";
    	}
    	function translate(xa, ya, xb, yb, s, q) {
    		if (xa !== xb || ya !== yb) {
    			var i = s.push("translate(", null, pxComma, null, pxParen);
    			q.push({
    				i: i - 4,
    				x: number_default(xa, xb)
    			}, {
    				i: i - 2,
    				x: number_default(ya, yb)
    			});
    		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
    	}
    	function rotate(a, b, s, q) {
    		if (a !== b) {
    			if (a - b > 180) b += 360;
    			else if (b - a > 180) a += 360;
    			q.push({
    				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
    				x: number_default(a, b)
    			});
    		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
    	}
    	function skewX(a, b, s, q) {
    		if (a !== b) q.push({
    			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
    			x: number_default(a, b)
    		});
    		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
    	}
    	function scale(xa, ya, xb, yb, s, q) {
    		if (xa !== xb || ya !== yb) {
    			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
    			q.push({
    				i: i - 4,
    				x: number_default(xa, xb)
    			}, {
    				i: i - 2,
    				x: number_default(ya, yb)
    			});
    		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    	}
    	return function(a, b) {
    		var s = [], q = [];
    		a = parse(a), b = parse(b);
    		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    		rotate(a.rotate, b.rotate, s, q);
    		skewX(a.skewX, b.skewX, s, q);
    		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    		a = b = null;
    		return function(t) {
    			var i = -1, n = q.length, o;
    			while (++i < n) s[(o = q[i]).i] = o.x(t);
    			return s.join("");
    		};
    	};
    }
    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
    //#endregion
    //#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/zoom.js
    var epsilon2 = 1e-12;
    function cosh(x) {
    	return ((x = Math.exp(x)) + 1 / x) / 2;
    }
    function sinh(x) {
    	return ((x = Math.exp(x)) - 1 / x) / 2;
    }
    function tanh(x) {
    	return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }
    var zoom_default$1 = (function zoomRho(rho, rho2, rho4) {
    	function zoom(p0, p1) {
    		var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    		if (d2 < epsilon2) {
    			S = Math.log(w1 / w0) / rho;
    			i = function(t) {
    				return [
    					ux0 + t * dx,
    					uy0 + t * dy,
    					w0 * Math.exp(rho * t * S)
    				];
    			};
    		} else {
    			var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
    			S = (Math.log(Math.sqrt(b1 * b1 + 1) - b1) - r0) / rho;
    			i = function(t) {
    				var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
    				return [
    					ux0 + u * dx,
    					uy0 + u * dy,
    					w0 * coshr0 / cosh(rho * s + r0)
    				];
    			};
    		}
    		i.duration = S * 1e3 * rho / Math.SQRT2;
    		return i;
    	}
    	zoom.rho = function(_) {
    		var _1 = Math.max(.001, +_), _2 = _1 * _1;
    		return zoomRho(_1, _2, _2 * _2);
    	};
    	return zoom;
    })(Math.SQRT2, 2, 4);
    //#endregion
    //#region ../../node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
    var frame = 0;
    var timeout = 0;
    var interval = 0;
    var pokeDelay = 1e3;
    var taskHead;
    var taskTail;
    var clockLast = 0;
    var clockNow = 0;
    var clockSkew = 0;
    var clock = typeof performance === "object" && performance.now ? performance : Date;
    var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    	setTimeout(f, 17);
    };
    function now() {
    	return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }
    function clearNow() {
    	clockNow = 0;
    }
    function Timer() {
    	this._call = this._time = this._next = null;
    }
    Timer.prototype = timer.prototype = {
    	constructor: Timer,
    	restart: function(callback, delay, time) {
    		if (typeof callback !== "function") throw new TypeError("callback is not a function");
    		time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    		if (!this._next && taskTail !== this) {
    			if (taskTail) taskTail._next = this;
    			else taskHead = this;
    			taskTail = this;
    		}
    		this._call = callback;
    		this._time = time;
    		sleep();
    	},
    	stop: function() {
    		if (this._call) {
    			this._call = null;
    			this._time = Infinity;
    			sleep();
    		}
    	}
    };
    function timer(callback, delay, time) {
    	var t = new Timer();
    	t.restart(callback, delay, time);
    	return t;
    }
    function timerFlush() {
    	now();
    	++frame;
    	var t = taskHead, e;
    	while (t) {
    		if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    		t = t._next;
    	}
    	--frame;
    }
    function wake() {
    	clockNow = (clockLast = clock.now()) + clockSkew;
    	frame = timeout = 0;
    	try {
    		timerFlush();
    	} finally {
    		frame = 0;
    		nap();
    		clockNow = 0;
    	}
    }
    function poke() {
    	var now = clock.now(), delay = now - clockLast;
    	if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }
    function nap() {
    	var t0, t1 = taskHead, t2, time = Infinity;
    	while (t1) if (t1._call) {
    		if (time > t1._time) time = t1._time;
    		t0 = t1, t1 = t1._next;
    	} else {
    		t2 = t1._next, t1._next = null;
    		t1 = t0 ? t0._next = t2 : taskHead = t2;
    	}
    	taskTail = t0;
    	sleep(time);
    }
    function sleep(time) {
    	if (frame) return;
    	if (timeout) timeout = clearTimeout(timeout);
    	if (time - clockNow > 24) {
    		if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    		if (interval) interval = clearInterval(interval);
    	} else {
    		if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    		frame = 1, setFrame(wake);
    	}
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
    function timeout_default(callback, delay, time) {
    	var t = new Timer();
    	delay = delay == null ? 0 : +delay;
    	t.restart((elapsed) => {
    		t.stop();
    		callback(elapsed + delay);
    	}, delay, time);
    	return t;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];
    function schedule_default(node, name, id, index, group, timing) {
    	var schedules = node.__transition;
    	if (!schedules) node.__transition = {};
    	else if (id in schedules) return;
    	create(node, id, {
    		name,
    		index,
    		group,
    		on: emptyOn,
    		tween: emptyTween,
    		time: timing.time,
    		delay: timing.delay,
    		duration: timing.duration,
    		ease: timing.ease,
    		timer: null,
    		state: 0
    	});
    }
    function init(node, id) {
    	var schedule = get(node, id);
    	if (schedule.state > 0) throw new Error("too late; already scheduled");
    	return schedule;
    }
    function set(node, id) {
    	var schedule = get(node, id);
    	if (schedule.state > 3) throw new Error("too late; already running");
    	return schedule;
    }
    function get(node, id) {
    	var schedule = node.__transition;
    	if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    	return schedule;
    }
    function create(node, id, self) {
    	var schedules = node.__transition, tween;
    	schedules[id] = self;
    	self.timer = timer(schedule, 0, self.time);
    	function schedule(elapsed) {
    		self.state = 1;
    		self.timer.restart(start, self.delay, self.time);
    		if (self.delay <= elapsed) start(elapsed - self.delay);
    	}
    	function start(elapsed) {
    		var i, j, n, o;
    		if (self.state !== 1) return stop();
    		for (i in schedules) {
    			o = schedules[i];
    			if (o.name !== self.name) continue;
    			if (o.state === 3) return timeout_default(start);
    			if (o.state === 4) {
    				o.state = 6;
    				o.timer.stop();
    				o.on.call("interrupt", node, node.__data__, o.index, o.group);
    				delete schedules[i];
    			} else if (+i < id) {
    				o.state = 6;
    				o.timer.stop();
    				o.on.call("cancel", node, node.__data__, o.index, o.group);
    				delete schedules[i];
    			}
    		}
    		timeout_default(function() {
    			if (self.state === 3) {
    				self.state = 4;
    				self.timer.restart(tick, self.delay, self.time);
    				tick(elapsed);
    			}
    		});
    		self.state = 2;
    		self.on.call("start", node, node.__data__, self.index, self.group);
    		if (self.state !== 2) return;
    		self.state = 3;
    		tween = new Array(n = self.tween.length);
    		for (i = 0, j = -1; i < n; ++i) if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
    		tween.length = j + 1;
    	}
    	function tick(elapsed) {
    		var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = 5, 1), i = -1, n = tween.length;
    		while (++i < n) tween[i].call(node, t);
    		if (self.state === 5) {
    			self.on.call("end", node, node.__data__, self.index, self.group);
    			stop();
    		}
    	}
    	function stop() {
    		self.state = 6;
    		self.timer.stop();
    		delete schedules[id];
    		for (var i in schedules) return;
    		delete node.__transition;
    	}
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
    function interrupt_default$1(node, name) {
    	var schedules = node.__transition, schedule, active, empty = true, i;
    	if (!schedules) return;
    	name = name == null ? null : name + "";
    	for (i in schedules) {
    		if ((schedule = schedules[i]).name !== name) {
    			empty = false;
    			continue;
    		}
    		active = schedule.state > 2 && schedule.state < 5;
    		schedule.state = 6;
    		schedule.timer.stop();
    		schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    		delete schedules[i];
    	}
    	if (empty) delete node.__transition;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
    function interrupt_default(name) {
    	return this.each(function() {
    		interrupt_default$1(this, name);
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
    function tweenRemove(id, name) {
    	var tween0, tween1;
    	return function() {
    		var schedule = set(this, id), tween = schedule.tween;
    		if (tween !== tween0) {
    			tween1 = tween0 = tween;
    			for (var i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
    				tween1 = tween1.slice();
    				tween1.splice(i, 1);
    				break;
    			}
    		}
    		schedule.tween = tween1;
    	};
    }
    function tweenFunction(id, name, value) {
    	var tween0, tween1;
    	if (typeof value !== "function") throw new Error();
    	return function() {
    		var schedule = set(this, id), tween = schedule.tween;
    		if (tween !== tween0) {
    			tween1 = (tween0 = tween).slice();
    			for (var t = {
    				name,
    				value
    			}, i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
    				tween1[i] = t;
    				break;
    			}
    			if (i === n) tween1.push(t);
    		}
    		schedule.tween = tween1;
    	};
    }
    function tween_default(name, value) {
    	var id = this._id;
    	name += "";
    	if (arguments.length < 2) {
    		var tween = get(this.node(), id).tween;
    		for (var i = 0, n = tween.length, t; i < n; ++i) if ((t = tween[i]).name === name) return t.value;
    		return null;
    	}
    	return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }
    function tweenValue(transition, name, value) {
    	var id = transition._id;
    	transition.each(function() {
    		var schedule = set(this, id);
    		(schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    	});
    	return function(node) {
    		return get(node, id).value[name];
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
    function interpolate_default(a, b) {
    	var c;
    	return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
    function attrRemove(name) {
    	return function() {
    		this.removeAttribute(name);
    	};
    }
    function attrRemoveNS(fullname) {
    	return function() {
    		this.removeAttributeNS(fullname.space, fullname.local);
    	};
    }
    function attrConstant(name, interpolate, value1) {
    	var string00, string1 = value1 + "", interpolate0;
    	return function() {
    		var string0 = this.getAttribute(name);
    		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    	};
    }
    function attrConstantNS(fullname, interpolate, value1) {
    	var string00, string1 = value1 + "", interpolate0;
    	return function() {
    		var string0 = this.getAttributeNS(fullname.space, fullname.local);
    		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    	};
    }
    function attrFunction(name, interpolate, value) {
    	var string00, string10, interpolate0;
    	return function() {
    		var string0, value1 = value(this), string1;
    		if (value1 == null) return void this.removeAttribute(name);
    		string0 = this.getAttribute(name);
    		string1 = value1 + "";
    		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    	};
    }
    function attrFunctionNS(fullname, interpolate, value) {
    	var string00, string10, interpolate0;
    	return function() {
    		var string0, value1 = value(this), string1;
    		if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    		string0 = this.getAttributeNS(fullname.space, fullname.local);
    		string1 = value1 + "";
    		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    	};
    }
    function attr_default(name, value) {
    	var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
    	return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
    function attrInterpolate(name, i) {
    	return function(t) {
    		this.setAttribute(name, i.call(this, t));
    	};
    }
    function attrInterpolateNS(fullname, i) {
    	return function(t) {
    		this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    	};
    }
    function attrTweenNS(fullname, value) {
    	var t0, i0;
    	function tween() {
    		var i = value.apply(this, arguments);
    		if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    		return t0;
    	}
    	tween._value = value;
    	return tween;
    }
    function attrTween(name, value) {
    	var t0, i0;
    	function tween() {
    		var i = value.apply(this, arguments);
    		if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    		return t0;
    	}
    	tween._value = value;
    	return tween;
    }
    function attrTween_default(name, value) {
    	var key = "attr." + name;
    	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    	if (value == null) return this.tween(key, null);
    	if (typeof value !== "function") throw new Error();
    	var fullname = namespace_default(name);
    	return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
    function delayFunction(id, value) {
    	return function() {
    		init(this, id).delay = +value.apply(this, arguments);
    	};
    }
    function delayConstant(id, value) {
    	return value = +value, function() {
    		init(this, id).delay = value;
    	};
    }
    function delay_default(value) {
    	var id = this._id;
    	return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
    function durationFunction(id, value) {
    	return function() {
    		set(this, id).duration = +value.apply(this, arguments);
    	};
    }
    function durationConstant(id, value) {
    	return value = +value, function() {
    		set(this, id).duration = value;
    	};
    }
    function duration_default(value) {
    	var id = this._id;
    	return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
    function easeConstant(id, value) {
    	if (typeof value !== "function") throw new Error();
    	return function() {
    		set(this, id).ease = value;
    	};
    }
    function ease_default(value) {
    	var id = this._id;
    	return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
    function easeVarying(id, value) {
    	return function() {
    		var v = value.apply(this, arguments);
    		if (typeof v !== "function") throw new Error();
    		set(this, id).ease = v;
    	};
    }
    function easeVarying_default(value) {
    	if (typeof value !== "function") throw new Error();
    	return this.each(easeVarying(this._id, value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
    function filter_default(match) {
    	if (typeof match !== "function") match = matcher_default(match);
    	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    	return new Transition(subgroups, this._parents, this._name, this._id);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
    function merge_default(transition) {
    	if (transition._id !== this._id) throw new Error();
    	for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
    	for (; j < m0; ++j) merges[j] = groups0[j];
    	return new Transition(merges, this._parents, this._name, this._id);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
    function start(name) {
    	return (name + "").trim().split(/^|\s+/).every(function(t) {
    		var i = t.indexOf(".");
    		if (i >= 0) t = t.slice(0, i);
    		return !t || t === "start";
    	});
    }
    function onFunction(id, name, listener) {
    	var on0, on1, sit = start(name) ? init : set;
    	return function() {
    		var schedule = sit(this, id), on = schedule.on;
    		if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    		schedule.on = on1;
    	};
    }
    function on_default(name, listener) {
    	var id = this._id;
    	return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
    function removeFunction(id) {
    	return function() {
    		var parent = this.parentNode;
    		for (var i in this.__transition) if (+i !== id) return;
    		if (parent) parent.removeChild(this);
    	};
    }
    function remove_default() {
    	return this.on("end.remove", removeFunction(this._id));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
    function select_default(select) {
    	var name = this._name, id = this._id;
    	if (typeof select !== "function") select = selector_default(select);
    	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
    		if ("__data__" in node) subnode.__data__ = node.__data__;
    		subgroup[i] = subnode;
    		schedule_default(subgroup[i], name, id, i, subgroup, get(node, id));
    	}
    	return new Transition(subgroups, this._parents, name, id);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
    function selectAll_default(select) {
    	var name = this._name, id = this._id;
    	if (typeof select !== "function") select = selectorAll_default(select);
    	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
    		for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) if (child = children[k]) schedule_default(child, name, id, k, children, inherit);
    		subgroups.push(children);
    		parents.push(node);
    	}
    	return new Transition(subgroups, parents, name, id);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
    var Selection = selection.prototype.constructor;
    function selection_default() {
    	return new Selection(this._groups, this._parents);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
    function styleNull(name, interpolate) {
    	var string00, string10, interpolate0;
    	return function() {
    		var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    	};
    }
    function styleRemove(name) {
    	return function() {
    		this.style.removeProperty(name);
    	};
    }
    function styleConstant(name, interpolate, value1) {
    	var string00, string1 = value1 + "", interpolate0;
    	return function() {
    		var string0 = styleValue(this, name);
    		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    	};
    }
    function styleFunction(name, interpolate, value) {
    	var string00, string10, interpolate0;
    	return function() {
    		var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    		if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    	};
    }
    function styleMaybeRemove(id, name) {
    	var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    	return function() {
    		var schedule = set(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
    		if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    		schedule.on = on1;
    	};
    }
    function style_default$1(name, value, priority) {
    	var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
    	return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
    function styleInterpolate(name, i, priority) {
    	return function(t) {
    		this.style.setProperty(name, i.call(this, t), priority);
    	};
    }
    function styleTween(name, value, priority) {
    	var t, i0;
    	function tween() {
    		var i = value.apply(this, arguments);
    		if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    		return t;
    	}
    	tween._value = value;
    	return tween;
    }
    function styleTween_default(name, value, priority) {
    	var key = "style." + (name += "");
    	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    	if (value == null) return this.tween(key, null);
    	if (typeof value !== "function") throw new Error();
    	return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
    function textConstant(value) {
    	return function() {
    		this.textContent = value;
    	};
    }
    function textFunction(value) {
    	return function() {
    		var value1 = value(this);
    		this.textContent = value1 == null ? "" : value1;
    	};
    }
    function text_default(value) {
    	return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
    function textInterpolate(i) {
    	return function(t) {
    		this.textContent = i.call(this, t);
    	};
    }
    function textTween(value) {
    	var t0, i0;
    	function tween() {
    		var i = value.apply(this, arguments);
    		if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    		return t0;
    	}
    	tween._value = value;
    	return tween;
    }
    function textTween_default(value) {
    	var key = "text";
    	if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    	if (value == null) return this.tween(key, null);
    	if (typeof value !== "function") throw new Error();
    	return this.tween(key, textTween(value));
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
    function transition_default$1() {
    	var name = this._name, id0 = this._id, id1 = newId$1();
    	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
    		var inherit = get(node, id0);
    		schedule_default(node, name, id1, i, group, {
    			time: inherit.time + inherit.delay + inherit.duration,
    			delay: 0,
    			duration: inherit.duration,
    			ease: inherit.ease
    		});
    	}
    	return new Transition(groups, this._parents, name, id1);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
    function end_default() {
    	var on0, on1, that = this, id = that._id, size = that.size();
    	return new Promise(function(resolve, reject) {
    		var cancel = { value: reject }, end = { value: function() {
    			if (--size === 0) resolve();
    		} };
    		that.each(function() {
    			var schedule = set(this, id), on = schedule.on;
    			if (on !== on0) {
    				on1 = (on0 = on).copy();
    				on1._.cancel.push(cancel);
    				on1._.interrupt.push(cancel);
    				on1._.end.push(end);
    			}
    			schedule.on = on1;
    		});
    		if (size === 0) resolve();
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
    var id = 0;
    function Transition(groups, parents, name, id) {
    	this._groups = groups;
    	this._parents = parents;
    	this._name = name;
    	this._id = id;
    }
    function transition(name) {
    	return selection().transition(name);
    }
    function newId$1() {
    	return ++id;
    }
    var selection_prototype = selection.prototype;
    Transition.prototype = transition.prototype = {
    	constructor: Transition,
    	select: select_default,
    	selectAll: selectAll_default,
    	selectChild: selection_prototype.selectChild,
    	selectChildren: selection_prototype.selectChildren,
    	filter: filter_default,
    	merge: merge_default,
    	selection: selection_default,
    	transition: transition_default$1,
    	call: selection_prototype.call,
    	nodes: selection_prototype.nodes,
    	node: selection_prototype.node,
    	size: selection_prototype.size,
    	empty: selection_prototype.empty,
    	each: selection_prototype.each,
    	on: on_default,
    	attr: attr_default,
    	attrTween: attrTween_default,
    	style: style_default$1,
    	styleTween: styleTween_default,
    	text: text_default,
    	textTween: textTween_default,
    	remove: remove_default,
    	tween: tween_default,
    	delay: delay_default,
    	duration: duration_default,
    	ease: ease_default,
    	easeVarying: easeVarying_default,
    	end: end_default,
    	[Symbol.iterator]: selection_prototype[Symbol.iterator]
    };
    //#endregion
    //#region ../../node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
    function cubicInOut(t) {
    	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
    var defaultTiming = {
    	time: null,
    	delay: 0,
    	duration: 250,
    	ease: cubicInOut
    };
    function inherit(node, id) {
    	var timing;
    	while (!(timing = node.__transition) || !(timing = timing[id])) if (!(node = node.parentNode)) throw new Error(`transition ${id} not found`);
    	return timing;
    }
    function transition_default(name) {
    	var id, timing;
    	if (name instanceof Transition) id = name._id, name = name._name;
    	else id = newId$1(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) schedule_default(node, name, id, i, group, timing || inherit(node, id));
    	return new Transition(groups, this._parents, name, id);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js
    selection.prototype.interrupt = interrupt_default;
    selection.prototype.transition = transition_default;
    //#endregion
    //#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
    var constant_default = (x) => () => x;
    //#endregion
    //#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
    function ZoomEvent(type, { sourceEvent, target, transform, dispatch }) {
    	Object.defineProperties(this, {
    		type: {
    			value: type,
    			enumerable: true,
    			configurable: true
    		},
    		sourceEvent: {
    			value: sourceEvent,
    			enumerable: true,
    			configurable: true
    		},
    		target: {
    			value: target,
    			enumerable: true,
    			configurable: true
    		},
    		transform: {
    			value: transform,
    			enumerable: true,
    			configurable: true
    		},
    		_: { value: dispatch }
    	});
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
    function Transform(k, x, y) {
    	this.k = k;
    	this.x = x;
    	this.y = y;
    }
    Transform.prototype = {
    	constructor: Transform,
    	scale: function(k) {
    		return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    	},
    	translate: function(x, y) {
    		return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    	},
    	apply: function(point) {
    		return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    	},
    	applyX: function(x) {
    		return x * this.k + this.x;
    	},
    	applyY: function(y) {
    		return y * this.k + this.y;
    	},
    	invert: function(location) {
    		return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    	},
    	invertX: function(x) {
    		return (x - this.x) / this.k;
    	},
    	invertY: function(y) {
    		return (y - this.y) / this.k;
    	},
    	rescaleX: function(x) {
    		return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    	},
    	rescaleY: function(y) {
    		return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    	},
    	toString: function() {
    		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    	}
    };
    var identity$1 = new Transform(1, 0, 0);
    transform$1.prototype = Transform.prototype;
    function transform$1(node) {
    	while (!node.__zoom) if (!(node = node.parentNode)) return identity$1;
    	return node.__zoom;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
    function nopropagation(event) {
    	event.stopImmediatePropagation();
    }
    function noevent_default(event) {
    	event.preventDefault();
    	event.stopImmediatePropagation();
    }
    //#endregion
    //#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
    function defaultFilter(event) {
    	return (!event.ctrlKey || event.type === "wheel") && !event.button;
    }
    function defaultExtent() {
    	var e = this;
    	if (e instanceof SVGElement) {
    		e = e.ownerSVGElement || e;
    		if (e.hasAttribute("viewBox")) {
    			e = e.viewBox.baseVal;
    			return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    		}
    		return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    	}
    	return [[0, 0], [e.clientWidth, e.clientHeight]];
    }
    function defaultTransform() {
    	return this.__zoom || identity$1;
    }
    function defaultWheelDelta(event) {
    	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * (event.ctrlKey ? 10 : 1);
    }
    function defaultTouchable() {
    	return navigator.maxTouchPoints || "ontouchstart" in this;
    }
    function defaultConstrain(transform, extent, translateExtent) {
    	var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    	return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
    }
    function zoom_default() {
    	var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default$1, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
    	function zoom(selection) {
    		selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    	}
    	zoom.transform = function(collection, transform, point, event) {
    		var selection = collection.selection ? collection.selection() : collection;
    		selection.property("__zoom", defaultTransform);
    		if (collection !== selection) schedule(collection, transform, point, event);
    		else selection.interrupt().each(function() {
    			gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
    		});
    	};
    	zoom.scaleBy = function(selection, k, p, event) {
    		zoom.scaleTo(selection, function() {
    			return this.__zoom.k * (typeof k === "function" ? k.apply(this, arguments) : k);
    		}, p, event);
    	};
    	zoom.scaleTo = function(selection, k, p, event) {
    		zoom.transform(selection, function() {
    			var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
    			return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    		}, p, event);
    	};
    	zoom.translateBy = function(selection, x, y, event) {
    		zoom.transform(selection, function() {
    			return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
    		}, null, event);
    	};
    	zoom.translateTo = function(selection, x, y, p, event) {
    		zoom.transform(selection, function() {
    			var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
    			return constrain(identity$1.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
    		}, p, event);
    	};
    	function scale(transform, k) {
    		k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    		return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
    	}
    	function translate(transform, p0, p1) {
    		var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    		return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
    	}
    	function centroid(extent) {
    		return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    	}
    	function schedule(transition, transform, point, event) {
    		transition.on("start.zoom", function() {
    			gesture(this, arguments).event(event).start();
    		}).on("interrupt.zoom end.zoom", function() {
    			gesture(this, arguments).event(event).end();
    		}).tween("zoom", function() {
    			var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
    			return function(t) {
    				if (t === 1) t = b;
    				else {
    					var l = i(t), k = w / l[2];
    					t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
    				}
    				g.zoom(null, t);
    			};
    		});
    	}
    	function gesture(that, args, clean) {
    		return !clean && that.__zooming || new Gesture(that, args);
    	}
    	function Gesture(that, args) {
    		this.that = that;
    		this.args = args;
    		this.active = 0;
    		this.sourceEvent = null;
    		this.extent = extent.apply(that, args);
    		this.taps = 0;
    	}
    	Gesture.prototype = {
    		event: function(event) {
    			if (event) this.sourceEvent = event;
    			return this;
    		},
    		start: function() {
    			if (++this.active === 1) {
    				this.that.__zooming = this;
    				this.emit("start");
    			}
    			return this;
    		},
    		zoom: function(key, transform) {
    			if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
    			if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
    			if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
    			this.that.__zoom = transform;
    			this.emit("zoom");
    			return this;
    		},
    		end: function() {
    			if (--this.active === 0) {
    				delete this.that.__zooming;
    				this.emit("end");
    			}
    			return this;
    		},
    		emit: function(type) {
    			var d = select_default$1(this.that).datum();
    			listeners.call(type, this.that, new ZoomEvent(type, {
    				sourceEvent: this.sourceEvent,
    				target: zoom,
    				type,
    				transform: this.that.__zoom,
    				dispatch: listeners
    			}), d);
    		}
    	};
    	function wheeled(event, ...args) {
    		if (!filter.apply(this, arguments)) return;
    		var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
    		if (g.wheel) {
    			if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) g.mouse[1] = t.invert(g.mouse[0] = p);
    			clearTimeout(g.wheel);
    		} else if (t.k === k) return;
    		else {
    			g.mouse = [p, t.invert(p)];
    			interrupt_default$1(this);
    			g.start();
    		}
    		noevent_default(event);
    		g.wheel = setTimeout(wheelidled, wheelDelay);
    		g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    		function wheelidled() {
    			g.wheel = null;
    			g.end();
    		}
    	}
    	function mousedowned(event, ...args) {
    		if (touchending || !filter.apply(this, arguments)) return;
    		var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default$1(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    		nodrag_default(event.view);
    		nopropagation(event);
    		g.mouse = [p, this.__zoom.invert(p)];
    		interrupt_default$1(this);
    		g.start();
    		function mousemoved(event) {
    			noevent_default(event);
    			if (!g.moved) {
    				var dx = event.clientX - x0, dy = event.clientY - y0;
    				g.moved = dx * dx + dy * dy > clickDistance2;
    			}
    			g.event(event).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    		}
    		function mouseupped(event) {
    			v.on("mousemove.zoom mouseup.zoom", null);
    			yesdrag(event.view, g.moved);
    			noevent_default(event);
    			g.event(event).end();
    		}
    	}
    	function dblclicked(event, ...args) {
    		if (!filter.apply(this, arguments)) return;
    		var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? .5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    		noevent_default(event);
    		if (duration > 0) select_default$1(this).transition().duration(duration).call(schedule, t1, p0, event);
    		else select_default$1(this).call(zoom.transform, t1, p0, event);
    	}
    	function touchstarted(event, ...args) {
    		if (!filter.apply(this, arguments)) return;
    		var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    		nopropagation(event);
    		for (i = 0; i < n; ++i) {
    			t = touches[i], p = pointer_default(t, this);
    			p = [
    				p,
    				this.__zoom.invert(p),
    				t.identifier
    			];
    			if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
    			else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    		}
    		if (touchstarting) touchstarting = clearTimeout(touchstarting);
    		if (started) {
    			if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
    				touchstarting = null;
    			}, touchDelay);
    			interrupt_default$1(this);
    			g.start();
    		}
    	}
    	function touchmoved(event, ...args) {
    		if (!this.__zooming) return;
    		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    		noevent_default(event);
    		for (i = 0; i < n; ++i) {
    			t = touches[i], p = pointer_default(t, this);
    			if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
    			else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    		}
    		t = g.that.__zoom;
    		if (g.touch1) {
    			var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
    			t = scale(t, Math.sqrt(dp / dl));
    			p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
    			l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    		} else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    		else return;
    		g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    	}
    	function touchended(event, ...args) {
    		if (!this.__zooming) return;
    		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    		nopropagation(event);
    		if (touchending) clearTimeout(touchending);
    		touchending = setTimeout(function() {
    			touchending = null;
    		}, touchDelay);
    		for (i = 0; i < n; ++i) {
    			t = touches[i];
    			if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
    			else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    		}
    		if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    		if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    		else {
    			g.end();
    			if (g.taps === 2) {
    				t = pointer_default(t, this);
    				if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
    					var p = select_default$1(this).on("dblclick.zoom");
    					if (p) p.apply(this, arguments);
    				}
    			}
    		}
    	}
    	zoom.wheelDelta = function(_) {
    		return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default(+_), zoom) : wheelDelta;
    	};
    	zoom.filter = function(_) {
    		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default(!!_), zoom) : filter;
    	};
    	zoom.touchable = function(_) {
    		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default(!!_), zoom) : touchable;
    	};
    	zoom.extent = function(_) {
    		return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    	};
    	zoom.scaleExtent = function(_) {
    		return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    	};
    	zoom.translateExtent = function(_) {
    		return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    	};
    	zoom.constrain = function(_) {
    		return arguments.length ? (constrain = _, zoom) : constrain;
    	};
    	zoom.duration = function(_) {
    		return arguments.length ? (duration = +_, zoom) : duration;
    	};
    	zoom.interpolate = function(_) {
    		return arguments.length ? (interpolate = _, zoom) : interpolate;
    	};
    	zoom.on = function() {
    		var value = listeners.on.apply(listeners, arguments);
    		return value === listeners ? zoom : value;
    	};
    	zoom.clickDistance = function(_) {
    		return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    	};
    	zoom.tapDistance = function(_) {
    		return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    	};
    	return zoom;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/@xyflow+system@0.0.82/node_modules/@xyflow/system/dist/esm/index.js
    const errorMessages = {
    	error001: (lib = "react") => `Seems like you have not used ${lib === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${lib}flow.dev/error#001`,
    	error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    	error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
    	error004: () => "The parent container needs a width and a height to render the graph.",
    	error005: () => "Only child nodes can use a parent extent.",
    	error006: () => "Can't create edge. An edge needs a source and a target.",
    	error007: (id) => `The old edge with id=${id} does not exist.`,
    	error009: (type) => `Marker type "${type}" doesn't exist.`,
    	error008: (handleType, { id, sourceHandle, targetHandle }) => `Couldn't create edge for ${handleType} handle id: "${handleType === "source" ? sourceHandle : targetHandle}", edge id: ${id}.`,
    	error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
    	error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
    	error012: (id) => `Node with id "${id}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
    	error013: (lib = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${lib}/dist/style.css' or base.css to make sure everything is working properly.`,
    	error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
    	error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
    	error016: (id) => `Edge with id "${id}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
    };
    const infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
    const elementSelectionKeys = [
    	"Enter",
    	" ",
    	"Escape"
    ];
    const defaultAriaLabelConfig = {
    	"node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
    	"node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
    	"node.a11yDescription.ariaLiveMessage": ({ direction, x, y }) => `Moved selected node ${direction}. New position, x: ${x}, y: ${y}`,
    	"edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    	"controls.ariaLabel": "Control Panel",
    	"controls.zoomIn.ariaLabel": "Zoom In",
    	"controls.zoomOut.ariaLabel": "Zoom Out",
    	"controls.fitView.ariaLabel": "Fit View",
    	"controls.interactive.ariaLabel": "Toggle Interactivity",
    	"minimap.ariaLabel": "Mini Map",
    	"handle.ariaLabel": "Handle"
    };
    /**
    * The `ConnectionMode` is used to set the mode of connection between nodes.
    * The `Strict` mode is the default one and only allows source to target edges.
    * `Loose` mode allows source to source and target to target edges as well.
    *
    * @public
    */
    var ConnectionMode;
    (function(ConnectionMode) {
    	ConnectionMode["Strict"] = "strict";
    	ConnectionMode["Loose"] = "loose";
    })(ConnectionMode || (ConnectionMode = {}));
    /**
    * This enum is used to set the different modes of panning the viewport when the
    * user scrolls. The `Free` mode allows the user to pan in any direction by scrolling
    * with a device like a trackpad. The `Vertical` and `Horizontal` modes restrict
    * scroll panning to only the vertical or horizontal axis, respectively.
    *
    * @public
    */
    var PanOnScrollMode;
    (function(PanOnScrollMode) {
    	PanOnScrollMode["Free"] = "free";
    	PanOnScrollMode["Vertical"] = "vertical";
    	PanOnScrollMode["Horizontal"] = "horizontal";
    })(PanOnScrollMode || (PanOnScrollMode = {}));
    var SelectionMode;
    (function(SelectionMode) {
    	SelectionMode["Partial"] = "partial";
    	SelectionMode["Full"] = "full";
    })(SelectionMode || (SelectionMode = {}));
    const initialConnection = {
    	inProgress: false,
    	isValid: null,
    	from: null,
    	fromHandle: null,
    	fromPosition: null,
    	fromNode: null,
    	to: null,
    	toHandle: null,
    	toPosition: null,
    	toNode: null,
    	pointer: null
    };
    /**
    * If you set the `connectionLineType` prop on your [`<ReactFlow />`](/api-reference/react-flow#connection-connectionLineType)
    *component, it will dictate the style of connection line rendered when creating
    *new edges.
    *
    * @public
    *
    * @remarks If you choose to render a custom connection line component, this value will be
    *passed to your component as part of its [`ConnectionLineComponentProps`](/api-reference/types/connection-line-component-props).
    */
    var ConnectionLineType;
    (function(ConnectionLineType) {
    	ConnectionLineType["Bezier"] = "default";
    	ConnectionLineType["Straight"] = "straight";
    	ConnectionLineType["Step"] = "step";
    	ConnectionLineType["SmoothStep"] = "smoothstep";
    	ConnectionLineType["SimpleBezier"] = "simplebezier";
    })(ConnectionLineType || (ConnectionLineType = {}));
    /**
    * Edges may optionally have a marker on either end. The MarkerType type enumerates
    * the options available to you when configuring a given marker.
    *
    * @public
    */
    var MarkerType;
    (function(MarkerType) {
    	MarkerType["Arrow"] = "arrow";
    	MarkerType["ArrowClosed"] = "arrowclosed";
    })(MarkerType || (MarkerType = {}));
    /**
    * While [`PanelPosition`](/api-reference/types/panel-position) can be used to place a
    * component in the corners of a container, the `Position` enum is less precise and used
    * primarily in relation to edges and handles.
    *
    * @public
    */
    var Position;
    (function(Position) {
    	Position["Left"] = "left";
    	Position["Top"] = "top";
    	Position["Right"] = "right";
    	Position["Bottom"] = "bottom";
    })(Position || (Position = {}));
    const oppositePosition = {
    	[Position.Left]: Position.Right,
    	[Position.Right]: Position.Left,
    	[Position.Top]: Position.Bottom,
    	[Position.Bottom]: Position.Top
    };
    /**
    * Test whether an object is usable as an Edge
    * @public
    * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
    * @param element - The element to test
    * @returns A boolean indicating whether the element is an Edge
    */
    const isEdgeBase = (element) => !!element && typeof element === "object" && "id" in element && "source" in element && "target" in element;
    /**
    * Test whether an object is usable as a Node
    * @public
    * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
    * @param element - The element to test
    * @returns A boolean indicating whether the element is an Node
    */
    const isNodeBase = (element) => !!element && typeof element === "object" && "id" in element && "position" in element && !("source" in element) && !("target" in element);
    const isInternalNodeBase = (element) => !!element && typeof element === "object" && "id" in element && "internals" in element && !("source" in element) && !("target" in element);
    const getNodePositionWithOrigin = (node, nodeOrigin = [0, 0]) => {
    	const { width, height } = getNodeDimensions(node);
    	const origin = node.origin ?? nodeOrigin;
    	const offsetX = width * origin[0];
    	const offsetY = height * origin[1];
    	return {
    		x: node.position.x - offsetX,
    		y: node.position.y - offsetY
    	};
    };
    /**
    * Returns the bounding box that contains all the given nodes in an array. This can
    * be useful when combined with [`getViewportForBounds`](/api-reference/utils/get-viewport-for-bounds)
    * to calculate the correct transform to fit the given nodes in a viewport.
    * @public
    * @remarks Useful when combined with {@link getViewportForBounds} to calculate the correct transform to fit the given nodes in a viewport.
    * @param nodes - Nodes to calculate the bounds for.
    * @returns Bounding box enclosing all nodes.
    *
    * @remarks This function was previously called `getRectOfNodes`
    *
    * @example
    * ```js
    *import { getNodesBounds } from '@xyflow/react';
    *
    *const nodes = [
    *  {
    *    id: 'a',
    *    position: { x: 0, y: 0 },
    *    data: { label: 'a' },
    *    width: 50,
    *    height: 25,
    *  },
    *  {
    *    id: 'b',
    *    position: { x: 100, y: 100 },
    *    data: { label: 'b' },
    *    width: 50,
    *    height: 25,
    *  },
    *];
    *
    *const bounds = getNodesBounds(nodes);
    *```
    */
    const getNodesBounds = (nodes, params = { nodeOrigin: [0, 0] }) => {
    	if (nodes.length === 0) return {
    		x: 0,
    		y: 0,
    		width: 0,
    		height: 0
    	};
    	let hasNode = false;
    	const box = nodes.reduce((currBox, nodeOrId) => {
    		const isId = typeof nodeOrId === "string";
    		let currentNode = !params.nodeLookup && !isId ? nodeOrId : void 0;
    		if (params.nodeLookup) currentNode = isId ? params.nodeLookup.get(nodeOrId) : !isInternalNodeBase(nodeOrId) ? params.nodeLookup.get(nodeOrId.id) : nodeOrId;
    		if (!currentNode) return currBox;
    		hasNode = true;
    		return getBoundsOfBoxes(currBox, nodeToBox(currentNode, params.nodeOrigin));
    	}, {
    		x: Infinity,
    		y: Infinity,
    		x2: -Infinity,
    		y2: -Infinity
    	});
    	return hasNode ? boxToRect(box) : {
    		x: 0,
    		y: 0,
    		width: 0,
    		height: 0
    	};
    };
    /**
    * Determines a bounding box that contains all given nodes in an array
    * @internal
    */
    const getInternalNodesBounds = (nodeLookup, params = {}) => {
    	let box = {
    		x: Infinity,
    		y: Infinity,
    		x2: -Infinity,
    		y2: -Infinity
    	};
    	let hasVisibleNodes = false;
    	nodeLookup.forEach((node) => {
    		if (params.filter === void 0 || params.filter(node)) {
    			box = getBoundsOfBoxes(box, nodeToBox(node));
    			hasVisibleNodes = true;
    		}
    	});
    	return hasVisibleNodes ? boxToRect(box) : {
    		x: 0,
    		y: 0,
    		width: 0,
    		height: 0
    	};
    };
    const getNodesInside = (nodes, rect, [tx, ty, tScale] = [
    	0,
    	0,
    	1
    ], partially = false, excludeNonSelectableNodes = false) => {
    	const paneX = (rect.x - tx) / tScale;
    	const paneY = (rect.y - ty) / tScale;
    	const paneWidth = rect.width / tScale;
    	const paneHeight = rect.height / tScale;
    	const visibleNodes = [];
    	for (const node of nodes.values()) {
    		const { measured, selectable = true, hidden = false } = node;
    		if (excludeNonSelectableNodes && !selectable || hidden) continue;
    		const width = measured.width ?? node.width ?? node.initialWidth ?? 0;
    		const height = measured.height ?? node.height ?? node.initialHeight ?? 0;
    		const { x, y } = node.internals.positionAbsolute;
    		const overlappingArea = getRectsOverlappingArea(paneX, paneY, paneWidth, paneHeight, x, y, width, height);
    		const area = width * height;
    		const partiallyVisible = partially && overlappingArea > 0;
    		if (!node.internals.handleBounds || partiallyVisible || overlappingArea >= area || node.dragging) visibleNodes.push(node);
    	}
    	return visibleNodes;
    };
    /**
    * This utility filters an array of edges, keeping only those where either the source or target
    * node is present in the given array of nodes.
    * @public
    * @param nodes - Nodes you want to get the connected edges for.
    * @param edges - All edges.
    * @returns Array of edges that connect any of the given nodes with each other.
    *
    * @example
    * ```js
    *import { getConnectedEdges } from '@xyflow/react';
    *
    *const nodes = [
    *  { id: 'a', position: { x: 0, y: 0 } },
    *  { id: 'b', position: { x: 100, y: 0 } },
    *];
    *
    *const edges = [
    *  { id: 'a->c', source: 'a', target: 'c' },
    *  { id: 'c->d', source: 'c', target: 'd' },
    *];
    *
    *const connectedEdges = getConnectedEdges(nodes, edges);
    * // => [{ id: 'a->c', source: 'a', target: 'c' }]
    *```
    */
    const getConnectedEdges = (nodes, edges) => {
    	const nodeIds = /* @__PURE__ */ new Set();
    	nodes.forEach((node) => {
    		nodeIds.add(node.id);
    	});
    	return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
    };
    function getFitViewNodes(nodeLookup, options) {
    	const fitViewNodes = /* @__PURE__ */ new Map();
    	const optionNodeIds = options?.nodes ? new Set(options.nodes.map((node) => node.id)) : null;
    	nodeLookup.forEach((n) => {
    		let isVisible;
    		if (options?.includeHiddenNodes) {
    			const { width, height } = getNodeDimensions(n);
    			isVisible = width > 0 && height > 0;
    		} else isVisible = Boolean(n.measured.width && n.measured.height && !n.hidden);
    		if (isVisible && (!optionNodeIds || optionNodeIds.has(n.id))) fitViewNodes.set(n.id, n);
    	});
    	return fitViewNodes;
    }
    async function fitViewport({ nodes, width, height, panZoom, minZoom, maxZoom }, options) {
    	if (nodes.size === 0) return true;
    	const nodesToFit = getFitViewNodes(nodes, options);
    	const bounds = getInternalNodesBounds(nodesToFit);
    	const viewport = getViewportForBounds(bounds, width, height, options?.minZoom ?? minZoom, options?.maxZoom ?? maxZoom, options?.padding ?? .1);
    	await panZoom.setViewport(viewport, {
    		duration: options?.duration,
    		ease: options?.ease,
    		interpolate: options?.interpolate
    	});
    	return true;
    }
    /**
    * This function calculates the next position of a node, taking into account the node's extent, parent node, and origin.
    *
    * @internal
    * @returns position, positionAbsolute
    */
    function calculateNodePosition({ nodeId, nextPosition, nodeLookup, nodeOrigin = [0, 0], nodeExtent, onError }) {
    	const node = nodeLookup.get(nodeId);
    	const parentNode = node.parentId ? nodeLookup.get(node.parentId) : void 0;
    	const { x: parentX, y: parentY } = parentNode ? parentNode.internals.positionAbsolute : {
    		x: 0,
    		y: 0
    	};
    	const origin = node.origin ?? nodeOrigin;
    	let extent = node.extent || nodeExtent;
    	if (node.extent === "parent" && !node.expandParent) {
    		if (!parentNode) onError?.("005", errorMessages["error005"]());
    		else {
    			const { width: parentWidth, height: parentHeight } = getNodeDimensions(parentNode);
    			if (parentWidth && parentHeight) extent = [[parentX, parentY], [parentX + parentWidth, parentY + parentHeight]];
    		}
    	} else if (parentNode && isCoordinateExtent(node.extent)) extent = [[node.extent[0][0] + parentX, node.extent[0][1] + parentY], [node.extent[1][0] + parentX, node.extent[1][1] + parentY]];
    	const positionAbsolute = isCoordinateExtent(extent) ? clampPosition(nextPosition, extent, node.measured) : nextPosition;
    	if (node.measured.width === void 0 || node.measured.height === void 0) onError?.("015", errorMessages["error015"]());
    	return {
    		position: {
    			x: positionAbsolute.x - parentX + (node.measured.width ?? 0) * origin[0],
    			y: positionAbsolute.y - parentY + (node.measured.height ?? 0) * origin[1]
    		},
    		positionAbsolute
    	};
    }
    /**
    * Pass in nodes & edges to delete, get arrays of nodes and edges that actually can be deleted
    * @internal
    * @param param.nodesToRemove - The nodes to remove
    * @param param.edgesToRemove - The edges to remove
    * @param param.nodes - All nodes
    * @param param.edges - All edges
    * @param param.onBeforeDelete - Callback to check which nodes and edges can be deleted
    * @returns nodes: nodes that can be deleted, edges: edges that can be deleted
    */
    async function getElementsToRemove({ nodesToRemove = [], edgesToRemove = [], nodes, edges, onBeforeDelete }) {
    	const nodeIds = new Set(nodesToRemove.map((node) => node.id));
    	const matchingNodes = [];
    	for (const node of nodes) {
    		if (node.deletable === false) continue;
    		const isIncluded = nodeIds.has(node.id);
    		const parentHit = !isIncluded && node.parentId && matchingNodes.find((n) => n.id === node.parentId);
    		if (isIncluded || parentHit) matchingNodes.push(node);
    	}
    	const edgeIds = new Set(edgesToRemove.map((edge) => edge.id));
    	const deletableEdges = edges.filter((edge) => edge.deletable !== false);
    	const matchingEdges = getConnectedEdges(matchingNodes, deletableEdges);
    	for (const edge of deletableEdges) if (edgeIds.has(edge.id) && !matchingEdges.find((e) => e.id === edge.id)) matchingEdges.push(edge);
    	if (!onBeforeDelete) return {
    		edges: matchingEdges,
    		nodes: matchingNodes
    	};
    	const onBeforeDeleteResult = await onBeforeDelete({
    		nodes: matchingNodes,
    		edges: matchingEdges
    	});
    	if (typeof onBeforeDeleteResult === "boolean") return onBeforeDeleteResult ? {
    		edges: matchingEdges,
    		nodes: matchingNodes
    	} : {
    		edges: [],
    		nodes: []
    	};
    	return onBeforeDeleteResult;
    }
    const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
    const clampPosition = (position = {
    	x: 0,
    	y: 0
    }, extent, dimensions) => ({
    	x: clamp(position.x, extent[0][0], extent[1][0] - (dimensions?.width ?? 0)),
    	y: clamp(position.y, extent[0][1], extent[1][1] - (dimensions?.height ?? 0))
    });
    function clampPositionToParent(childPosition, childDimensions, parent) {
    	const { width: parentWidth, height: parentHeight } = getNodeDimensions(parent);
    	const { x: parentX, y: parentY } = parent.internals.positionAbsolute;
    	return clampPosition(childPosition, [[parentX, parentY], [parentX + parentWidth, parentY + parentHeight]], childDimensions);
    }
    /**
    * Calculates the velocity of panning when the mouse is close to the edge of the canvas
    * @internal
    * @param value - One dimensional poition of the mouse (x or y)
    * @param min - Minimal position on canvas before panning starts
    * @param max - Maximal position on canvas before panning starts
    * @returns - A number between 0 and 1 that represents the velocity of panning
    */
    const calcAutoPanVelocity = (value, min, max) => {
    	if (value < min) return clamp(Math.abs(value - min), 1, min) / min;
    	else if (value > max) return -clamp(Math.abs(value - max), 1, min) / min;
    	return 0;
    };
    const calcAutoPan = (pos, bounds, speed = 15, distance = 40) => {
    	return [calcAutoPanVelocity(pos.x, distance, bounds.width - distance) * speed, calcAutoPanVelocity(pos.y, distance, bounds.height - distance) * speed];
    };
    const getBoundsOfBoxes = (box1, box2) => ({
    	x: Math.min(box1.x, box2.x),
    	y: Math.min(box1.y, box2.y),
    	x2: Math.max(box1.x2, box2.x2),
    	y2: Math.max(box1.y2, box2.y2)
    });
    const rectToBox = ({ x, y, width, height }) => ({
    	x,
    	y,
    	x2: x + width,
    	y2: y + height
    });
    const boxToRect = ({ x, y, x2, y2 }) => ({
    	x,
    	y,
    	width: x2 - x,
    	height: y2 - y
    });
    const nodeToRect = (node, nodeOrigin = [0, 0]) => {
    	const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
    	return {
    		x,
    		y,
    		width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
    		height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0
    	};
    };
    const nodeToBox = (node, nodeOrigin = [0, 0]) => {
    	const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
    	return {
    		x,
    		y,
    		x2: x + (node.measured?.width ?? node.width ?? node.initialWidth ?? 0),
    		y2: y + (node.measured?.height ?? node.height ?? node.initialHeight ?? 0)
    	};
    };
    const getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
    const getRectsOverlappingArea = (aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) => {
    	const xOverlap = Math.max(0, Math.min(aX + aWidth, bX + bWidth) - Math.max(aX, bX));
    	const yOverlap = Math.max(0, Math.min(aY + aHeight, bY + bHeight) - Math.max(aY, bY));
    	return Math.ceil(xOverlap * yOverlap);
    };
    const getOverlappingArea = (rectA, rectB) => getRectsOverlappingArea(rectA.x, rectA.y, rectA.width, rectA.height, rectB.x, rectB.y, rectB.width, rectB.height);
    const isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
    const isNumeric = (n) => !isNaN(n) && isFinite(n);
    const createDevWarn = (lib, helpUrl) => (id, message) => {};
    const snapPosition = (position, snapGrid = [1, 1]) => {
    	return {
    		x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
    		y: snapGrid[1] * Math.round(position.y / snapGrid[1])
    	};
    };
    const pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid = false, snapGrid = [1, 1]) => {
    	const position = {
    		x: (x - tx) / tScale,
    		y: (y - ty) / tScale
    	};
    	return snapToGrid ? snapPosition(position, snapGrid) : position;
    };
    const rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
    	return {
    		x: x * tScale + tx,
    		y: y * tScale + ty
    	};
    };
    /**
    * Parses a single padding value to a number
    * @internal
    * @param padding - Padding to parse
    * @param viewport - Width or height of the viewport
    * @returns The padding in pixels
    */
    function parsePadding(padding, viewport) {
    	if (typeof padding === "number") return Math.floor((viewport - viewport / (1 + padding)) * .5);
    	if (typeof padding === "string" && padding.endsWith("px")) {
    		const paddingValue = parseFloat(padding);
    		if (!Number.isNaN(paddingValue)) return Math.floor(paddingValue);
    	}
    	if (typeof padding === "string" && padding.endsWith("%")) {
    		const paddingValue = parseFloat(padding);
    		if (!Number.isNaN(paddingValue)) return Math.floor(viewport * paddingValue * .01);
    	}
    	console.error(`The padding value "${padding}" is invalid. Please provide a number or a string with a valid unit (px or %).`);
    	return 0;
    }
    /**
    * Parses the paddings to an object with top, right, bottom, left, x and y paddings
    * @internal
    * @param padding - Padding to parse
    * @param width - Width of the viewport
    * @param height - Height of the viewport
    * @returns An object with the paddings in pixels
    */
    function parsePaddings(padding, width, height) {
    	if (typeof padding === "string" || typeof padding === "number") {
    		const paddingY = parsePadding(padding, height);
    		const paddingX = parsePadding(padding, width);
    		return {
    			top: paddingY,
    			right: paddingX,
    			bottom: paddingY,
    			left: paddingX,
    			x: paddingX * 2,
    			y: paddingY * 2
    		};
    	}
    	if (typeof padding === "object") {
    		const top = parsePadding(padding.top ?? padding.y ?? 0, height);
    		const bottom = parsePadding(padding.bottom ?? padding.y ?? 0, height);
    		const left = parsePadding(padding.left ?? padding.x ?? 0, width);
    		const right = parsePadding(padding.right ?? padding.x ?? 0, width);
    		return {
    			top,
    			right,
    			bottom,
    			left,
    			x: left + right,
    			y: top + bottom
    		};
    	}
    	return {
    		top: 0,
    		right: 0,
    		bottom: 0,
    		left: 0,
    		x: 0,
    		y: 0
    	};
    }
    /**
    * Calculates the resulting paddings if the new viewport is applied
    * @internal
    * @param bounds - Bounds to fit inside viewport
    * @param x - X position of the viewport
    * @param y - Y position of the viewport
    * @param zoom - Zoom level of the viewport
    * @param width - Width of the viewport
    * @param height - Height of the viewport
    * @returns An object with the minimum padding required to fit the bounds inside the viewport
    */
    function calculateAppliedPaddings(bounds, x, y, zoom, width, height) {
    	const { x: left, y: top } = rendererPointToPoint(bounds, [
    		x,
    		y,
    		zoom
    	]);
    	const { x: boundRight, y: boundBottom } = rendererPointToPoint({
    		x: bounds.x + bounds.width,
    		y: bounds.y + bounds.height
    	}, [
    		x,
    		y,
    		zoom
    	]);
    	const right = width - boundRight;
    	const bottom = height - boundBottom;
    	return {
    		left: Math.floor(left),
    		top: Math.floor(top),
    		right: Math.floor(right),
    		bottom: Math.floor(bottom)
    	};
    }
    /**
    * Returns a viewport that encloses the given bounds with padding.
    * @public
    * @remarks You can determine bounds of nodes with {@link getNodesBounds} and {@link getBoundsOfRects}
    * @param bounds - Bounds to fit inside viewport.
    * @param width - Width of the viewport.
    * @param height  - Height of the viewport.
    * @param minZoom - Minimum zoom level of the resulting viewport.
    * @param maxZoom - Maximum zoom level of the resulting viewport.
    * @param padding - Padding around the bounds.
    * @returns A transformed {@link Viewport} that encloses the given bounds which you can pass to e.g. {@link setViewport}.
    * @example
    * const { x, y, zoom } = getViewportForBounds(
    * { x: 0, y: 0, width: 100, height: 100},
    * 1200, 800, 0.5, 2);
    */
    const getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding) => {
    	const p = parsePaddings(padding, width, height);
    	const xZoom = (width - p.x) / bounds.width;
    	const yZoom = (height - p.y) / bounds.height;
    	const clampedZoom = clamp(Math.min(xZoom, yZoom), minZoom, maxZoom);
    	const boundsCenterX = bounds.x + bounds.width / 2;
    	const boundsCenterY = bounds.y + bounds.height / 2;
    	const x = width / 2 - boundsCenterX * clampedZoom;
    	const y = height / 2 - boundsCenterY * clampedZoom;
    	const newPadding = calculateAppliedPaddings(bounds, x, y, clampedZoom, width, height);
    	const offset = {
    		left: Math.min(newPadding.left - p.left, 0),
    		top: Math.min(newPadding.top - p.top, 0),
    		right: Math.min(newPadding.right - p.right, 0),
    		bottom: Math.min(newPadding.bottom - p.bottom, 0)
    	};
    	return {
    		x: x - offset.left + offset.right,
    		y: y - offset.top + offset.bottom,
    		zoom: clampedZoom
    	};
    };
    const isMacOs = () => typeof navigator !== "undefined" && navigator?.userAgent?.indexOf("Mac") >= 0;
    function isCoordinateExtent(extent) {
    	return extent !== void 0 && extent !== null && extent !== "parent";
    }
    function getNodeDimensions(node) {
    	return {
    		width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
    		height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0
    	};
    }
    function nodeHasDimensions(node) {
    	return (node.measured?.width ?? node.width ?? node.initialWidth) !== void 0 && (node.measured?.height ?? node.height ?? node.initialHeight) !== void 0;
    }
    /**
    * Convert child position to absolute position
    *
    * @internal
    * @param position
    * @param parentId
    * @param nodeLookup
    * @param nodeOrigin
    * @returns an internal node with an absolute position
    */
    function evaluateAbsolutePosition(position, dimensions = {
    	width: 0,
    	height: 0
    }, parentId, nodeLookup, nodeOrigin) {
    	const positionAbsolute = { ...position };
    	const parent = nodeLookup.get(parentId);
    	if (parent) {
    		const origin = parent.origin || nodeOrigin;
    		positionAbsolute.x += parent.internals.positionAbsolute.x - (dimensions.width ?? 0) * origin[0];
    		positionAbsolute.y += parent.internals.positionAbsolute.y - (dimensions.height ?? 0) * origin[1];
    	}
    	return positionAbsolute;
    }
    function areSetsEqual(a, b) {
    	if (a.size !== b.size) return false;
    	for (const item of a) if (!b.has(item)) return false;
    	return true;
    }
    /**
    * Polyfill for Promise.withResolvers until we can use it in all browsers
    * @internal
    */
    function withResolvers() {
    	let resolve;
    	let reject;
    	return {
    		promise: new Promise((res, rej) => {
    			resolve = res;
    			reject = rej;
    		}),
    		resolve,
    		reject
    	};
    }
    function mergeAriaLabelConfig(partial) {
    	return {
    		...defaultAriaLabelConfig,
    		...partial || {}
    	};
    }
    function getConnectionStatus(isValid) {
    	return isValid === null ? null : isValid ? "valid" : "invalid";
    }
    function getPointerPosition(event, { snapGrid = [0, 0], snapToGrid = false, transform, containerBounds }) {
    	const { x, y } = getEventPosition(event);
    	const pointerPos = pointToRendererPoint({
    		x: x - (containerBounds?.left ?? 0),
    		y: y - (containerBounds?.top ?? 0)
    	}, transform);
    	const { x: xSnapped, y: ySnapped } = snapToGrid ? snapPosition(pointerPos, snapGrid) : pointerPos;
    	return {
    		xSnapped,
    		ySnapped,
    		...pointerPos
    	};
    }
    const getDimensions = (node) => ({
    	width: node.offsetWidth,
    	height: node.offsetHeight
    });
    const getHostForElement = (element) => element?.getRootNode?.() || window?.document;
    const inputTags = [
    	"INPUT",
    	"SELECT",
    	"TEXTAREA"
    ];
    function isInputDOMNode(event) {
    	const target = event.composedPath?.()?.[0] || event.target;
    	if (target?.nodeType !== 1) return false;
    	return inputTags.includes(target.nodeName) || target.hasAttribute("contenteditable") || !!target.closest(".nokey");
    }
    const isMouseEvent = (event) => "clientX" in event;
    const getEventPosition = (event, bounds) => {
    	const isMouse = isMouseEvent(event);
    	const evtX = isMouse ? event.clientX : event.touches?.[0].clientX;
    	const evtY = isMouse ? event.clientY : event.touches?.[0].clientY;
    	return {
    		x: evtX - (bounds?.left ?? 0),
    		y: evtY - (bounds?.top ?? 0)
    	};
    };
    const getHandleBounds = (type, nodeElement, nodeBounds, zoom, nodeId) => {
    	const handles = nodeElement.querySelectorAll(`.${type}`);
    	if (!handles || !handles.length) return null;
    	return Array.from(handles).map((handle) => {
    		const handleBounds = handle.getBoundingClientRect();
    		return {
    			id: handle.getAttribute("data-handleid"),
    			type,
    			nodeId,
    			position: handle.getAttribute("data-handlepos"),
    			x: (handleBounds.left - nodeBounds.left) / zoom,
    			y: (handleBounds.top - nodeBounds.top) / zoom,
    			...getDimensions(handle)
    		};
    	});
    };
    function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY }) {
    	const centerX = sourceX * .125 + sourceControlX * .375 + targetControlX * .375 + targetX * .125;
    	const centerY = sourceY * .125 + sourceControlY * .375 + targetControlY * .375 + targetY * .125;
    	return [
    		centerX,
    		centerY,
    		Math.abs(centerX - sourceX),
    		Math.abs(centerY - sourceY)
    	];
    }
    function calculateControlOffset(distance, curvature) {
    	if (distance >= 0) return .5 * distance;
    	return curvature * 25 * Math.sqrt(-distance);
    }
    function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
    	switch (pos) {
    		case Position.Left: return [x1 - calculateControlOffset(x1 - x2, c), y1];
    		case Position.Right: return [x1 + calculateControlOffset(x2 - x1, c), y1];
    		case Position.Top: return [x1, y1 - calculateControlOffset(y1 - y2, c)];
    		case Position.Bottom: return [x1, y1 + calculateControlOffset(y2 - y1, c)];
    	}
    }
    /**
    * The `getBezierPath` util returns everything you need to render a bezier edge
    *between two nodes.
    * @public
    * @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
    * and `offsetX`, `offsetY` between source handle and label.
    * - `path`: the path to use in an SVG `<path>` element.
    * - `labelX`: the `x` position you can use to render a label for this edge.
    * - `labelY`: the `y` position you can use to render a label for this edge.
    * - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
    * middle of this path.
    * - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
    * middle of this path.
    * @example
    * ```js
    *  const source = { x: 0, y: 20 };
    *  const target = { x: 150, y: 100 };
    *
    *  const [path, labelX, labelY, offsetX, offsetY] = getBezierPath({
    *    sourceX: source.x,
    *    sourceY: source.y,
    *    sourcePosition: Position.Right,
    *    targetX: target.x,
    *    targetY: target.y,
    *    targetPosition: Position.Left,
    *});
    *```
    *
    * @remarks This function returns a tuple (aka a fixed-size array) to make it easier to
    *work with multiple edge paths at once.
    */
    function getBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = .25 }) {
    	const [sourceControlX, sourceControlY] = getControlWithCurvature({
    		pos: sourcePosition,
    		x1: sourceX,
    		y1: sourceY,
    		x2: targetX,
    		y2: targetY,
    		c: curvature
    	});
    	const [targetControlX, targetControlY] = getControlWithCurvature({
    		pos: targetPosition,
    		x1: targetX,
    		y1: targetY,
    		x2: sourceX,
    		y2: sourceY,
    		c: curvature
    	});
    	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    		sourceX,
    		sourceY,
    		targetX,
    		targetY,
    		sourceControlX,
    		sourceControlY,
    		targetControlX,
    		targetControlY
    	});
    	return [
    		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
    		labelX,
    		labelY,
    		offsetX,
    		offsetY
    	];
    }
    function getEdgeCenter({ sourceX, sourceY, targetX, targetY }) {
    	const xOffset = Math.abs(targetX - sourceX) / 2;
    	const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
    	const yOffset = Math.abs(targetY - sourceY) / 2;
    	return [
    		centerX,
    		targetY < sourceY ? targetY + yOffset : targetY - yOffset,
    		xOffset,
    		yOffset
    	];
    }
    /**
    * Returns the z-index for an edge based on the node it connects and whether it is selected.
    * By default, edges are rendered below nodes. This behaviour is different for edges that are
    * connected to nodes with a parent, as they are rendered above the parent node.
    */
    function getElevatedEdgeZIndex({ sourceNode, targetNode, selected = false, zIndex = 0, elevateOnSelect = false, zIndexMode = "basic" }) {
    	if (zIndexMode === "manual") return zIndex;
    	return (elevateOnSelect && selected ? zIndex + 1e3 : zIndex) + Math.max(sourceNode.parentId || elevateOnSelect && sourceNode.selected ? sourceNode.internals.z : 0, targetNode.parentId || elevateOnSelect && targetNode.selected ? targetNode.internals.z : 0);
    }
    function isEdgeVisible({ sourceNode, targetNode, width, height, transform }) {
    	const edgeBox = getBoundsOfBoxes(nodeToBox(sourceNode), nodeToBox(targetNode));
    	if (edgeBox.x === edgeBox.x2) edgeBox.x2 += 1;
    	if (edgeBox.y === edgeBox.y2) edgeBox.y2 += 1;
    	const viewRect = {
    		x: -transform[0] / transform[2],
    		y: -transform[1] / transform[2],
    		width: width / transform[2],
    		height: height / transform[2]
    	};
    	return getOverlappingArea(viewRect, boxToRect(edgeBox)) > 0;
    }
    /**
    * The default edge ID generator function. Generates an ID based on the source, target, and handles.
    * @public
    * @param params - The connection or edge to generate an ID for.
    * @returns The generated edge ID.
    */
    const getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `xy-edge__${source}${sourceHandle || ""}-${target}${targetHandle || ""}`;
    const connectionExists = (edge, edges) => {
    	return edges.some((el) => el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle));
    };
    /**
    * This util is a convenience function to add a new Edge to an array of edges. It also performs some validation to make sure you don't add an invalid edge or duplicate an existing one.
    * @public
    * @param edgeParams - Either an `Edge` or a `Connection` you want to add.
    * @param edges - The array of all current edges.
    * @param options - Optional configuration object.
    * @returns A new array of edges with the new edge added.
    *
    * @remarks If an edge with the same `target` and `source` already exists (and the same
    *`targetHandle` and `sourceHandle` if those are set), then this util won't add
    *a new edge even if the `id` property is different.
    *
    */
    const addEdge$1 = (edgeParams, edges, options = {}) => {
    	if (!edgeParams.source || !edgeParams.target) {
    		options.onError?.("006", errorMessages["error006"]());
    		return edges;
    	}
    	const edgeIdGenerator = options.getEdgeId || getEdgeId;
    	let edge;
    	if (isEdgeBase(edgeParams)) edge = { ...edgeParams };
    	else edge = {
    		...edgeParams,
    		id: edgeIdGenerator(edgeParams)
    	};
    	if (connectionExists(edge, edges)) return edges;
    	if (edge.sourceHandle === null) delete edge.sourceHandle;
    	if (edge.targetHandle === null) delete edge.targetHandle;
    	return edges.concat(edge);
    };
    /**
    * Calculates the straight line path between two points.
    * @public
    * @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
    * and `offsetX`, `offsetY` between source handle and label.
    *
    * - `path`: the path to use in an SVG `<path>` element.
    * - `labelX`: the `x` position you can use to render a label for this edge.
    * - `labelY`: the `y` position you can use to render a label for this edge.
    * - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
    * middle of this path.
    * - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
    * middle of this path.
    * @example
    * ```js
    *  const source = { x: 0, y: 20 };
    *  const target = { x: 150, y: 100 };
    *
    *  const [path, labelX, labelY, offsetX, offsetY] = getStraightPath({
    *    sourceX: source.x,
    *    sourceY: source.y,
    *    sourcePosition: Position.Right,
    *    targetX: target.x,
    *    targetY: target.y,
    *    targetPosition: Position.Left,
    *  });
    * ```
    * @remarks This function returns a tuple (aka a fixed-size array) to make it easier to work with multiple edge paths at once.
    */
    function getStraightPath({ sourceX, sourceY, targetX, targetY }) {
    	const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
    		sourceX,
    		sourceY,
    		targetX,
    		targetY
    	});
    	return [
    		`M ${sourceX},${sourceY}L ${targetX},${targetY}`,
    		labelX,
    		labelY,
    		offsetX,
    		offsetY
    	];
    }
    const handleDirections = {
    	[Position.Left]: {
    		x: -1,
    		y: 0
    	},
    	[Position.Right]: {
    		x: 1,
    		y: 0
    	},
    	[Position.Top]: {
    		x: 0,
    		y: -1
    	},
    	[Position.Bottom]: {
    		x: 0,
    		y: 1
    	}
    };
    const getDirection = ({ source, sourcePosition = Position.Bottom, target }) => {
    	if (sourcePosition === Position.Left || sourcePosition === Position.Right) return source.x < target.x ? {
    		x: 1,
    		y: 0
    	} : {
    		x: -1,
    		y: 0
    	};
    	return source.y < target.y ? {
    		x: 0,
    		y: 1
    	} : {
    		x: 0,
    		y: -1
    	};
    };
    const distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    function getPoints({ source, sourcePosition = Position.Bottom, target, targetPosition = Position.Top, center, offset, stepPosition }) {
    	const sourceDir = handleDirections[sourcePosition];
    	const targetDir = handleDirections[targetPosition];
    	const sourceGapped = {
    		x: source.x + sourceDir.x * offset,
    		y: source.y + sourceDir.y * offset
    	};
    	const targetGapped = {
    		x: target.x + targetDir.x * offset,
    		y: target.y + targetDir.y * offset
    	};
    	const dir = getDirection({
    		source: sourceGapped,
    		sourcePosition,
    		target: targetGapped
    	});
    	const dirAccessor = dir.x !== 0 ? "x" : "y";
    	const currDir = dir[dirAccessor];
    	let points = [];
    	let centerX, centerY;
    	const sourceGapOffset = {
    		x: 0,
    		y: 0
    	};
    	const targetGapOffset = {
    		x: 0,
    		y: 0
    	};
    	const [, , defaultOffsetX, defaultOffsetY] = getEdgeCenter({
    		sourceX: source.x,
    		sourceY: source.y,
    		targetX: target.x,
    		targetY: target.y
    	});
    	if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    		if (dirAccessor === "x") {
    			centerX = center.x ?? sourceGapped.x + (targetGapped.x - sourceGapped.x) * stepPosition;
    			centerY = center.y ?? (sourceGapped.y + targetGapped.y) / 2;
    		} else {
    			centerX = center.x ?? (sourceGapped.x + targetGapped.x) / 2;
    			centerY = center.y ?? sourceGapped.y + (targetGapped.y - sourceGapped.y) * stepPosition;
    		}
    		const verticalSplit = [{
    			x: centerX,
    			y: sourceGapped.y
    		}, {
    			x: centerX,
    			y: targetGapped.y
    		}];
    		const horizontalSplit = [{
    			x: sourceGapped.x,
    			y: centerY
    		}, {
    			x: targetGapped.x,
    			y: centerY
    		}];
    		if (sourceDir[dirAccessor] === currDir) points = dirAccessor === "x" ? verticalSplit : horizontalSplit;
    		else points = dirAccessor === "x" ? horizontalSplit : verticalSplit;
    	} else {
    		const sourceTarget = [{
    			x: sourceGapped.x,
    			y: targetGapped.y
    		}];
    		const targetSource = [{
    			x: targetGapped.x,
    			y: sourceGapped.y
    		}];
    		if (dirAccessor === "x") points = sourceDir.x === currDir ? targetSource : sourceTarget;
    		else points = sourceDir.y === currDir ? sourceTarget : targetSource;
    		if (sourcePosition === targetPosition) {
    			const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
    			if (diff <= offset) {
    				const gapOffset = Math.min(offset - 1, offset - diff);
    				if (sourceDir[dirAccessor] === currDir) sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
    				else targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
    			}
    		}
    		if (sourcePosition !== targetPosition) {
    			const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
    			const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
    			const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
    			const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
    			if (sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo)) points = dirAccessor === "x" ? sourceTarget : targetSource;
    		}
    		const sourceGapPoint = {
    			x: sourceGapped.x + sourceGapOffset.x,
    			y: sourceGapped.y + sourceGapOffset.y
    		};
    		const targetGapPoint = {
    			x: targetGapped.x + targetGapOffset.x,
    			y: targetGapped.y + targetGapOffset.y
    		};
    		if (Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x)) >= Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y))) {
    			centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
    			centerY = points[0].y;
    		} else {
    			centerX = points[0].x;
    			centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
    		}
    	}
    	const gappedSource = {
    		x: sourceGapped.x + sourceGapOffset.x,
    		y: sourceGapped.y + sourceGapOffset.y
    	};
    	const gappedTarget = {
    		x: targetGapped.x + targetGapOffset.x,
    		y: targetGapped.y + targetGapOffset.y
    	};
    	return [
    		[
    			source,
    			...gappedSource.x !== points[0].x || gappedSource.y !== points[0].y ? [gappedSource] : [],
    			...points,
    			...gappedTarget.x !== points[points.length - 1].x || gappedTarget.y !== points[points.length - 1].y ? [gappedTarget] : [],
    			target
    		],
    		centerX,
    		centerY,
    		defaultOffsetX,
    		defaultOffsetY
    	];
    }
    function getBend(a, b, c, size) {
    	const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
    	const { x, y } = b;
    	if (a.x === x && x === c.x || a.y === y && y === c.y) return `L${x} ${y}`;
    	if (a.y === y) {
    		const xDir = a.x < c.x ? -1 : 1;
    		const yDir = a.y < c.y ? 1 : -1;
    		return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
    	}
    	const xDir = a.x < c.x ? 1 : -1;
    	return `L ${x},${y + bendSize * (a.y < c.y ? -1 : 1)}Q ${x},${y} ${x + bendSize * xDir},${y}`;
    }
    /**
    * The `getSmoothStepPath` util returns everything you need to render a stepped path
    * between two nodes. The `borderRadius` property can be used to choose how rounded
    * the corners of those steps are.
    * @public
    * @returns A path string you can use in an SVG, the `labelX` and `labelY` position (center of path)
    * and `offsetX`, `offsetY` between source handle and label.
    *
    * - `path`: the path to use in an SVG `<path>` element.
    * - `labelX`: the `x` position you can use to render a label for this edge.
    * - `labelY`: the `y` position you can use to render a label for this edge.
    * - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
    * middle of this path.
    * - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
    * middle of this path.
    * @example
    * ```js
    *  const source = { x: 0, y: 20 };
    *  const target = { x: 150, y: 100 };
    *
    *  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
    *    sourceX: source.x,
    *    sourceY: source.y,
    *    sourcePosition: Position.Right,
    *    targetX: target.x,
    *    targetY: target.y,
    *    targetPosition: Position.Left,
    *  });
    * ```
    * @remarks This function returns a tuple (aka a fixed-size array) to make it easier to work with multiple edge paths at once.
    */
    function getSmoothStepPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY, offset = 20, stepPosition = .5 }) {
    	const [points, labelX, labelY, offsetX, offsetY] = getPoints({
    		source: {
    			x: sourceX,
    			y: sourceY
    		},
    		sourcePosition,
    		target: {
    			x: targetX,
    			y: targetY
    		},
    		targetPosition,
    		center: {
    			x: centerX,
    			y: centerY
    		},
    		offset,
    		stepPosition
    	});
    	let path = `M${points[0].x} ${points[0].y}`;
    	for (let i = 1; i < points.length - 1; i++) path += getBend(points[i - 1], points[i], points[i + 1], borderRadius);
    	path += `L${points[points.length - 1].x} ${points[points.length - 1].y}`;
    	return [
    		path,
    		labelX,
    		labelY,
    		offsetX,
    		offsetY
    	];
    }
    function isNodeInitialized(node) {
    	return node && !!(node.internals.handleBounds || node.handles?.length) && !!(node.measured.width || node.width || node.initialWidth);
    }
    function getEdgePosition(params) {
    	const { sourceNode, targetNode } = params;
    	if (!isNodeInitialized(sourceNode) || !isNodeInitialized(targetNode)) return null;
    	const sourceHandleBounds = sourceNode.internals.handleBounds || toHandleBounds(sourceNode.handles);
    	const targetHandleBounds = targetNode.internals.handleBounds || toHandleBounds(targetNode.handles);
    	const sourceHandle = getHandle$1(sourceHandleBounds?.source ?? [], params.sourceHandle);
    	const targetHandle = getHandle$1(params.connectionMode === ConnectionMode.Strict ? targetHandleBounds?.target ?? [] : (targetHandleBounds?.target ?? []).concat(targetHandleBounds?.source ?? []), params.targetHandle);
    	if (!sourceHandle || !targetHandle) {
    		params.onError?.("008", errorMessages["error008"](!sourceHandle ? "source" : "target", {
    			id: params.id,
    			sourceHandle: params.sourceHandle,
    			targetHandle: params.targetHandle
    		}));
    		return null;
    	}
    	const sourcePosition = sourceHandle?.position || Position.Bottom;
    	const targetPosition = targetHandle?.position || Position.Top;
    	const source = getHandlePosition(sourceNode, sourceHandle, sourcePosition);
    	const target = getHandlePosition(targetNode, targetHandle, targetPosition);
    	return {
    		sourceX: source.x,
    		sourceY: source.y,
    		targetX: target.x,
    		targetY: target.y,
    		sourcePosition,
    		targetPosition
    	};
    }
    function toHandleBounds(handles) {
    	if (!handles) return null;
    	const source = [];
    	const target = [];
    	for (const handle of handles) {
    		handle.width = handle.width ?? 1;
    		handle.height = handle.height ?? 1;
    		if (handle.type === "source") source.push(handle);
    		else if (handle.type === "target") target.push(handle);
    	}
    	return {
    		source,
    		target
    	};
    }
    function getHandlePosition(node, handle, fallbackPosition = Position.Left, center = false) {
    	const x = (handle?.x ?? 0) + node.internals.positionAbsolute.x;
    	const y = (handle?.y ?? 0) + node.internals.positionAbsolute.y;
    	const { width, height } = handle ?? getNodeDimensions(node);
    	if (center) return {
    		x: x + width / 2,
    		y: y + height / 2
    	};
    	switch (handle?.position ?? fallbackPosition) {
    		case Position.Top: return {
    			x: x + width / 2,
    			y
    		};
    		case Position.Right: return {
    			x: x + width,
    			y: y + height / 2
    		};
    		case Position.Bottom: return {
    			x: x + width / 2,
    			y: y + height
    		};
    		case Position.Left: return {
    			x,
    			y: y + height / 2
    		};
    	}
    }
    function getHandle$1(bounds, handleId) {
    	if (!bounds) return null;
    	return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null;
    }
    function getMarkerId(marker, id) {
    	if (!marker) return "";
    	if (typeof marker === "string") return marker;
    	return `${id ? `${id}__` : ""}${Object.keys(marker).sort().map((key) => `${key}=${marker[key]}`).join("&")}`;
    }
    function createMarkerIds(edges, { id, defaultColor, defaultMarkerStart, defaultMarkerEnd }) {
    	const ids = /* @__PURE__ */ new Set();
    	return edges.reduce((markers, edge) => {
    		[edge.markerStart || defaultMarkerStart, edge.markerEnd || defaultMarkerEnd].forEach((marker) => {
    			if (marker && typeof marker === "object") {
    				const markerId = getMarkerId(marker, id);
    				if (!ids.has(markerId)) {
    					markers.push({
    						id: markerId,
    						color: marker.color || defaultColor,
    						...marker
    					});
    					ids.add(markerId);
    				}
    			}
    		});
    		return markers;
    	}, []).sort((a, b) => a.id.localeCompare(b.id));
    }
    const SELECTED_NODE_Z = 1e3;
    const ROOT_PARENT_Z_INCREMENT = 10;
    const defaultOptions = {
    	nodeOrigin: [0, 0],
    	nodeExtent: infiniteExtent,
    	elevateNodesOnSelect: true,
    	zIndexMode: "basic",
    	defaults: {}
    };
    const adoptUserNodesDefaultOptions = {
    	...defaultOptions,
    	checkEquality: true
    };
    function mergeObjects(base, incoming) {
    	const result = { ...base };
    	for (const key in incoming) if (incoming[key] !== void 0) result[key] = incoming[key];
    	return result;
    }
    function updateAbsolutePositions(nodeLookup, parentLookup, options) {
    	const _options = mergeObjects(defaultOptions, options);
    	for (const node of nodeLookup.values()) if (node.parentId) updateChildNode(node, nodeLookup, parentLookup, _options);
    	else {
    		const positionWithOrigin = getNodePositionWithOrigin(node, _options.nodeOrigin);
    		const extent = isCoordinateExtent(node.extent) ? node.extent : _options.nodeExtent;
    		const clampedPosition = clampPosition(positionWithOrigin, extent, getNodeDimensions(node));
    		node.internals.positionAbsolute = clampedPosition;
    	}
    }
    function parseHandles(userNode, internalNode) {
    	if (!userNode.handles) return !userNode.measured ? void 0 : internalNode?.internals.handleBounds;
    	const source = [];
    	const target = [];
    	for (const handle of userNode.handles) {
    		const handleBounds = {
    			id: handle.id,
    			width: handle.width ?? 1,
    			height: handle.height ?? 1,
    			nodeId: userNode.id,
    			x: handle.x,
    			y: handle.y,
    			position: handle.position,
    			type: handle.type
    		};
    		if (handle.type === "source") source.push(handleBounds);
    		else if (handle.type === "target") target.push(handleBounds);
    	}
    	return {
    		source,
    		target
    	};
    }
    function isManualZIndexMode(zIndexMode) {
    	return zIndexMode === "manual";
    }
    function adoptUserNodes(nodes, nodeLookup, parentLookup, options = {}) {
    	const _options = mergeObjects(adoptUserNodesDefaultOptions, options);
    	const rootParentIndex = { i: 0 };
    	const tmpLookup = new Map(nodeLookup);
    	const selectedNodeZ = _options?.elevateNodesOnSelect && !isManualZIndexMode(_options.zIndexMode) ? SELECTED_NODE_Z : 0;
    	let nodesInitialized = nodes.length > 0;
    	let hasSelectedNodes = false;
    	nodeLookup.clear();
    	parentLookup.clear();
    	for (const userNode of nodes) {
    		let internalNode = tmpLookup.get(userNode.id);
    		if (_options.checkEquality && userNode === internalNode?.internals.userNode) nodeLookup.set(userNode.id, internalNode);
    		else {
    			const positionWithOrigin = getNodePositionWithOrigin(userNode, _options.nodeOrigin);
    			const extent = isCoordinateExtent(userNode.extent) ? userNode.extent : _options.nodeExtent;
    			const clampedPosition = clampPosition(positionWithOrigin, extent, getNodeDimensions(userNode));
    			internalNode = {
    				..._options.defaults,
    				...userNode,
    				measured: {
    					width: userNode.measured?.width,
    					height: userNode.measured?.height
    				},
    				internals: {
    					positionAbsolute: clampedPosition,
    					handleBounds: parseHandles(userNode, internalNode),
    					z: calculateZ(userNode, selectedNodeZ, _options.zIndexMode),
    					userNode
    				}
    			};
    			nodeLookup.set(userNode.id, internalNode);
    		}
    		if ((internalNode.measured === void 0 || internalNode.measured.width === void 0 || internalNode.measured.height === void 0) && !internalNode.hidden) nodesInitialized = false;
    		if (userNode.parentId) updateChildNode(internalNode, nodeLookup, parentLookup, options, rootParentIndex);
    		hasSelectedNodes ||= userNode.selected ?? false;
    	}
    	return {
    		nodesInitialized,
    		hasSelectedNodes
    	};
    }
    function updateParentLookup(node, parentLookup) {
    	if (!node.parentId) return;
    	const childNodes = parentLookup.get(node.parentId);
    	if (childNodes) childNodes.set(node.id, node);
    	else parentLookup.set(node.parentId, /* @__PURE__ */ new Map([[node.id, node]]));
    }
    /**
    * Updates positionAbsolute and zIndex of a child node and the parentLookup.
    */
    function updateChildNode(node, nodeLookup, parentLookup, options, rootParentIndex) {
    	const { elevateNodesOnSelect, nodeOrigin, nodeExtent, zIndexMode } = mergeObjects(defaultOptions, options);
    	const parentId = node.parentId;
    	const parentNode = nodeLookup.get(parentId);
    	if (!parentNode) {
    		console.warn(`Parent node ${parentId} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    		return;
    	}
    	updateParentLookup(node, parentLookup);
    	if (rootParentIndex && !parentNode.parentId && parentNode.internals.rootParentIndex === void 0 && zIndexMode === "auto") {
    		parentNode.internals.rootParentIndex = ++rootParentIndex.i;
    		parentNode.internals.z = parentNode.internals.z + rootParentIndex.i * ROOT_PARENT_Z_INCREMENT;
    	}
    	if (rootParentIndex && parentNode.internals.rootParentIndex !== void 0) rootParentIndex.i = parentNode.internals.rootParentIndex;
    	const { x, y, z } = calculateChildXYZ(node, parentNode, nodeOrigin, nodeExtent, elevateNodesOnSelect && !isManualZIndexMode(zIndexMode) ? SELECTED_NODE_Z : 0, zIndexMode);
    	const { positionAbsolute } = node.internals;
    	const positionChanged = x !== positionAbsolute.x || y !== positionAbsolute.y;
    	if (positionChanged || z !== node.internals.z) nodeLookup.set(node.id, {
    		...node,
    		internals: {
    			...node.internals,
    			positionAbsolute: positionChanged ? {
    				x,
    				y
    			} : positionAbsolute,
    			z
    		}
    	});
    }
    function calculateZ(node, selectedNodeZ, zIndexMode) {
    	const zIndex = isNumeric(node.zIndex) ? node.zIndex : 0;
    	if (isManualZIndexMode(zIndexMode)) return zIndex;
    	return zIndex + (node.selected ? selectedNodeZ : 0);
    }
    function calculateChildXYZ(childNode, parentNode, nodeOrigin, nodeExtent, selectedNodeZ, zIndexMode) {
    	const { x: parentX, y: parentY } = parentNode.internals.positionAbsolute;
    	const childDimensions = getNodeDimensions(childNode);
    	const positionWithOrigin = getNodePositionWithOrigin(childNode, nodeOrigin);
    	const clampedPosition = isCoordinateExtent(childNode.extent) ? clampPosition(positionWithOrigin, childNode.extent, childDimensions) : positionWithOrigin;
    	let absolutePosition = clampPosition({
    		x: parentX + clampedPosition.x,
    		y: parentY + clampedPosition.y
    	}, nodeExtent, childDimensions);
    	if (childNode.extent === "parent") absolutePosition = clampPositionToParent(absolutePosition, childDimensions, parentNode);
    	const childZ = calculateZ(childNode, selectedNodeZ, zIndexMode);
    	const parentZ = parentNode.internals.z ?? 0;
    	return {
    		x: absolutePosition.x,
    		y: absolutePosition.y,
    		z: parentZ >= childZ ? parentZ + 1 : childZ
    	};
    }
    function handleExpandParent(children, nodeLookup, parentLookup, nodeOrigin = [0, 0]) {
    	const changes = [];
    	const parentExpansions = /* @__PURE__ */ new Map();
    	for (const child of children) {
    		const parent = nodeLookup.get(child.parentId);
    		if (!parent) continue;
    		const parentRect = parentExpansions.get(child.parentId)?.expandedRect ?? nodeToRect(parent);
    		const expandedRect = getBoundsOfRects(parentRect, child.rect);
    		parentExpansions.set(child.parentId, {
    			expandedRect,
    			parent
    		});
    	}
    	if (parentExpansions.size > 0) parentExpansions.forEach(({ expandedRect, parent }, parentId) => {
    		const positionAbsolute = parent.internals.positionAbsolute;
    		const dimensions = getNodeDimensions(parent);
    		const origin = parent.origin ?? nodeOrigin;
    		const xChange = expandedRect.x < positionAbsolute.x ? Math.round(Math.abs(positionAbsolute.x - expandedRect.x)) : 0;
    		const yChange = expandedRect.y < positionAbsolute.y ? Math.round(Math.abs(positionAbsolute.y - expandedRect.y)) : 0;
    		const newWidth = Math.max(dimensions.width, Math.round(expandedRect.width));
    		const newHeight = Math.max(dimensions.height, Math.round(expandedRect.height));
    		const widthChange = (newWidth - dimensions.width) * origin[0];
    		const heightChange = (newHeight - dimensions.height) * origin[1];
    		if (xChange > 0 || yChange > 0 || widthChange || heightChange) {
    			changes.push({
    				id: parentId,
    				type: "position",
    				position: {
    					x: parent.position.x - xChange + widthChange,
    					y: parent.position.y - yChange + heightChange
    				}
    			});
    			parentLookup.get(parentId)?.forEach((childNode) => {
    				if (!children.some((child) => child.id === childNode.id)) changes.push({
    					id: childNode.id,
    					type: "position",
    					position: {
    						x: childNode.position.x + xChange,
    						y: childNode.position.y + yChange
    					}
    				});
    			});
    		}
    		if (dimensions.width < expandedRect.width || dimensions.height < expandedRect.height || xChange || yChange) changes.push({
    			id: parentId,
    			type: "dimensions",
    			setAttributes: true,
    			dimensions: {
    				width: newWidth + (xChange ? origin[0] * xChange - widthChange : 0),
    				height: newHeight + (yChange ? origin[1] * yChange - heightChange : 0)
    			}
    		});
    	});
    	return changes;
    }
    function updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, zIndexMode) {
    	const viewportNode = domNode?.querySelector(".xyflow__viewport");
    	let updatedInternals = false;
    	if (!viewportNode) return {
    		changes: [],
    		updatedInternals
    	};
    	const changes = [];
    	const style = window.getComputedStyle(viewportNode);
    	const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform);
    	const parentExpandChildren = [];
    	for (const update of updates.values()) {
    		const node = nodeLookup.get(update.id);
    		if (!node) continue;
    		if (node.hidden) {
    			nodeLookup.set(node.id, {
    				...node,
    				internals: {
    					...node.internals,
    					handleBounds: void 0
    				}
    			});
    			updatedInternals = true;
    			continue;
    		}
    		const dimensions = getDimensions(update.nodeElement);
    		const dimensionChanged = node.measured.width !== dimensions.width || node.measured.height !== dimensions.height;
    		if (!!(dimensions.width && dimensions.height && (dimensionChanged || !node.internals.handleBounds || update.force))) {
    			const nodeBounds = update.nodeElement.getBoundingClientRect();
    			const extent = isCoordinateExtent(node.extent) ? node.extent : nodeExtent;
    			let { positionAbsolute } = node.internals;
    			if (node.parentId && node.extent === "parent") {
    				const parentNode = nodeLookup.get(node.parentId);
    				if (parentNode) positionAbsolute = clampPositionToParent(positionAbsolute, dimensions, parentNode);
    			} else if (extent) positionAbsolute = clampPosition(positionAbsolute, extent, dimensions);
    			const newNode = {
    				...node,
    				measured: dimensions,
    				internals: {
    					...node.internals,
    					positionAbsolute,
    					handleBounds: {
    						source: getHandleBounds("source", update.nodeElement, nodeBounds, zoom, node.id),
    						target: getHandleBounds("target", update.nodeElement, nodeBounds, zoom, node.id)
    					}
    				}
    			};
    			nodeLookup.set(node.id, newNode);
    			if (node.parentId) updateChildNode(newNode, nodeLookup, parentLookup, {
    				nodeOrigin,
    				zIndexMode
    			});
    			updatedInternals = true;
    			if (dimensionChanged) {
    				changes.push({
    					id: node.id,
    					type: "dimensions",
    					dimensions
    				});
    				if (node.expandParent && node.parentId) parentExpandChildren.push({
    					id: node.id,
    					parentId: node.parentId,
    					rect: nodeToRect(newNode, nodeOrigin)
    				});
    			}
    		}
    	}
    	if (parentExpandChildren.length > 0) {
    		const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
    		changes.push(...parentExpandChanges);
    	}
    	return {
    		changes,
    		updatedInternals
    	};
    }
    async function panBy({ delta, panZoom, transform, translateExtent, width, height }) {
    	if (!panZoom || !delta.x && !delta.y) return false;
    	const nextViewport = await panZoom.setViewportConstrained({
    		x: transform[0] + delta.x,
    		y: transform[1] + delta.y,
    		zoom: transform[2]
    	}, [[0, 0], [width, height]], translateExtent);
    	return !!nextViewport && (nextViewport.x !== transform[0] || nextViewport.y !== transform[1] || nextViewport.k !== transform[2]);
    }
    /**
    * this function adds the connection to the connectionLookup
    * at the following keys: nodeId-type-handleId, nodeId-type and nodeId
    * @param type type of the connection
    * @param connection connection that should be added to the lookup
    * @param connectionKey at which key the connection should be added
    * @param connectionLookup reference to the connection lookup
    * @param nodeId nodeId of the connection
    * @param handleId handleId of the connection
    */
    function addConnectionToLookup(type, connection, connectionKey, connectionLookup, nodeId, handleId) {
    	let key = nodeId;
    	const nodeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
    	connectionLookup.set(key, nodeMap.set(connectionKey, connection));
    	key = `${nodeId}-${type}`;
    	const typeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
    	connectionLookup.set(key, typeMap.set(connectionKey, connection));
    	if (handleId) {
    		key = `${nodeId}-${type}-${handleId}`;
    		const handleMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
    		connectionLookup.set(key, handleMap.set(connectionKey, connection));
    	}
    }
    function updateConnectionLookup(connectionLookup, edgeLookup, edges) {
    	connectionLookup.clear();
    	edgeLookup.clear();
    	for (const edge of edges) {
    		const { source: sourceNode, target: targetNode, sourceHandle = null, targetHandle = null } = edge;
    		const connection = {
    			edgeId: edge.id,
    			source: sourceNode,
    			target: targetNode,
    			sourceHandle,
    			targetHandle
    		};
    		const sourceKey = `${sourceNode}-${sourceHandle}--${targetNode}-${targetHandle}`;
    		addConnectionToLookup("source", connection, `${targetNode}-${targetHandle}--${sourceNode}-${sourceHandle}`, connectionLookup, sourceNode, sourceHandle);
    		addConnectionToLookup("target", connection, sourceKey, connectionLookup, targetNode, targetHandle);
    		edgeLookup.set(edge.id, edge);
    	}
    }
    function isParentSelected(node, nodeLookup) {
    	if (!node.parentId) return false;
    	const parentNode = nodeLookup.get(node.parentId);
    	if (!parentNode) return false;
    	if (parentNode.selected) return true;
    	return isParentSelected(parentNode, nodeLookup);
    }
    function hasSelector(target, selector, domNode) {
    	let current = target;
    	do {
    		if (current?.matches?.(selector)) return true;
    		if (current === domNode) return false;
    		current = current?.parentElement;
    	} while (current);
    	return false;
    }
    function getDragItems(nodeLookup, nodesDraggable, mousePos, nodeId) {
    	const dragItems = /* @__PURE__ */ new Map();
    	for (const [id, node] of nodeLookup) if ((node.selected || node.id === nodeId) && (!node.parentId || !isParentSelected(node, nodeLookup)) && (node.draggable || nodesDraggable && typeof node.draggable === "undefined")) {
    		const internalNode = nodeLookup.get(id);
    		if (internalNode) dragItems.set(id, {
    			id,
    			position: internalNode.position || {
    				x: 0,
    				y: 0
    			},
    			distance: {
    				x: mousePos.x - internalNode.internals.positionAbsolute.x,
    				y: mousePos.y - internalNode.internals.positionAbsolute.y
    			},
    			extent: internalNode.extent,
    			parentId: internalNode.parentId,
    			origin: internalNode.origin,
    			expandParent: internalNode.expandParent,
    			internals: { positionAbsolute: internalNode.internals.positionAbsolute || {
    				x: 0,
    				y: 0
    			} },
    			measured: {
    				width: internalNode.measured.width ?? 0,
    				height: internalNode.measured.height ?? 0
    			}
    		});
    	}
    	return dragItems;
    }
    function getEventHandlerParams({ nodeId, dragItems, nodeLookup, dragging = true }) {
    	const nodesFromDragItems = [];
    	for (const [id, dragItem] of dragItems) {
    		const node = nodeLookup.get(id)?.internals.userNode;
    		if (node) nodesFromDragItems.push({
    			...node,
    			position: dragItem.position,
    			dragging
    		});
    	}
    	if (!nodeId) return [nodesFromDragItems[0], nodesFromDragItems];
    	const node = nodeLookup.get(nodeId)?.internals.userNode;
    	return [!node ? nodesFromDragItems[0] : {
    		...node,
    		position: dragItems.get(nodeId)?.position || node.position,
    		dragging
    	}, nodesFromDragItems];
    }
    /**
    * If a selection is being dragged we want to apply the same snap offset to all nodes in the selection.
    * This function calculates the snap offset based on the first node in the selection.
    */
    function calculateSnapOffset({ dragItems, snapGrid, x, y }) {
    	const refDragItem = dragItems.values().next().value;
    	if (!refDragItem) return null;
    	const refPos = {
    		x: x - refDragItem.distance.x,
    		y: y - refDragItem.distance.y
    	};
    	const refPosSnapped = snapPosition(refPos, snapGrid);
    	return {
    		x: refPosSnapped.x - refPos.x,
    		y: refPosSnapped.y - refPos.y
    	};
    }
    function XYDrag({ onNodeMouseDown, getStoreItems, onDragStart, onDrag, onDragStop }) {
    	let lastPos = {
    		x: null,
    		y: null
    	};
    	let autoPanId = 0;
    	let dragItems = /* @__PURE__ */ new Map();
    	let autoPanStarted = false;
    	let mousePosition = {
    		x: 0,
    		y: 0
    	};
    	let containerBounds = null;
    	let dragStarted = false;
    	let d3Selection = null;
    	let abortDrag = false;
    	let nodePositionsChanged = false;
    	let dragEvent = null;
    	function update({ noDragClassName, handleSelector, domNode, isSelectable, nodeId, nodeClickDistance = 0 }) {
    		d3Selection = select_default$1(domNode);
    		function updateNodes({ x, y }) {
    			const { nodeLookup, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onNodeDrag, onSelectionDrag, onError, updateNodePositions } = getStoreItems();
    			lastPos = {
    				x,
    				y
    			};
    			let hasChange = false;
    			const isMultiDrag = dragItems.size > 1;
    			const nodesBox = isMultiDrag && nodeExtent ? rectToBox(getInternalNodesBounds(dragItems)) : null;
    			const multiDragSnapOffset = isMultiDrag && snapToGrid ? calculateSnapOffset({
    				dragItems,
    				snapGrid,
    				x,
    				y
    			}) : null;
    			for (const [id, dragItem] of dragItems) {
    				if (!nodeLookup.has(id)) continue;
    				let nextPosition = {
    					x: x - dragItem.distance.x,
    					y: y - dragItem.distance.y
    				};
    				if (snapToGrid) nextPosition = multiDragSnapOffset ? {
    					x: Math.round(nextPosition.x + multiDragSnapOffset.x),
    					y: Math.round(nextPosition.y + multiDragSnapOffset.y)
    				} : snapPosition(nextPosition, snapGrid);
    				let adjustedNodeExtent = null;
    				if (isMultiDrag && nodeExtent && !dragItem.extent && nodesBox) {
    					const { positionAbsolute } = dragItem.internals;
    					const x1 = positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
    					const x2 = positionAbsolute.x + dragItem.measured.width - nodesBox.x2 + nodeExtent[1][0];
    					const y1 = positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
    					const y2 = positionAbsolute.y + dragItem.measured.height - nodesBox.y2 + nodeExtent[1][1];
    					adjustedNodeExtent = [[x1, y1], [x2, y2]];
    				}
    				const { position, positionAbsolute } = calculateNodePosition({
    					nodeId: id,
    					nextPosition,
    					nodeLookup,
    					nodeExtent: adjustedNodeExtent ? adjustedNodeExtent : nodeExtent,
    					nodeOrigin,
    					onError
    				});
    				hasChange = hasChange || dragItem.position.x !== position.x || dragItem.position.y !== position.y;
    				dragItem.position = position;
    				dragItem.internals.positionAbsolute = positionAbsolute;
    			}
    			nodePositionsChanged = nodePositionsChanged || hasChange;
    			if (!hasChange) return;
    			updateNodePositions(dragItems, true);
    			if (dragEvent && (onDrag || onNodeDrag || !nodeId && onSelectionDrag)) {
    				const [currentNode, currentNodes] = getEventHandlerParams({
    					nodeId,
    					dragItems,
    					nodeLookup
    				});
    				onDrag?.(dragEvent, dragItems, currentNode, currentNodes);
    				onNodeDrag?.(dragEvent, currentNode, currentNodes);
    				if (!nodeId) onSelectionDrag?.(dragEvent, currentNodes);
    			}
    		}
    		async function autoPan() {
    			if (!containerBounds) return;
    			const { transform, panBy, autoPanSpeed, autoPanOnNodeDrag } = getStoreItems();
    			if (!autoPanOnNodeDrag) {
    				autoPanStarted = false;
    				cancelAnimationFrame(autoPanId);
    				return;
    			}
    			const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds, autoPanSpeed);
    			if (xMovement !== 0 || yMovement !== 0) {
    				lastPos.x = (lastPos.x ?? 0) - xMovement / transform[2];
    				lastPos.y = (lastPos.y ?? 0) - yMovement / transform[2];
    				if (await panBy({
    					x: xMovement,
    					y: yMovement
    				})) updateNodes(lastPos);
    			}
    			autoPanId = requestAnimationFrame(autoPan);
    		}
    		function startDrag(event) {
    			const { nodeLookup, multiSelectionActive, nodesDraggable, transform, snapGrid, snapToGrid, selectNodesOnDrag, onNodeDragStart, onSelectionDragStart, unselectNodesAndEdges } = getStoreItems();
    			dragStarted = true;
    			if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
    				if (!nodeLookup.get(nodeId)?.selected) unselectNodesAndEdges();
    			}
    			if (isSelectable && selectNodesOnDrag && nodeId) onNodeMouseDown?.(nodeId);
    			const pointerPos = getPointerPosition(event.sourceEvent, {
    				transform,
    				snapGrid,
    				snapToGrid,
    				containerBounds
    			});
    			lastPos = pointerPos;
    			dragItems = getDragItems(nodeLookup, nodesDraggable, pointerPos, nodeId);
    			if (dragItems.size > 0 && (onDragStart || onNodeDragStart || !nodeId && onSelectionDragStart)) {
    				const [currentNode, currentNodes] = getEventHandlerParams({
    					nodeId,
    					dragItems,
    					nodeLookup
    				});
    				onDragStart?.(event.sourceEvent, dragItems, currentNode, currentNodes);
    				onNodeDragStart?.(event.sourceEvent, currentNode, currentNodes);
    				if (!nodeId) onSelectionDragStart?.(event.sourceEvent, currentNodes);
    			}
    		}
    		const d3DragInstance = drag_default().clickDistance(nodeClickDistance).on("start", (event) => {
    			const { domNode, nodeDragThreshold, transform, snapGrid, snapToGrid } = getStoreItems();
    			containerBounds = domNode?.getBoundingClientRect() || null;
    			abortDrag = false;
    			nodePositionsChanged = false;
    			dragEvent = event.sourceEvent;
    			if (nodeDragThreshold === 0) startDrag(event);
    			lastPos = getPointerPosition(event.sourceEvent, {
    				transform,
    				snapGrid,
    				snapToGrid,
    				containerBounds
    			});
    			mousePosition = getEventPosition(event.sourceEvent, containerBounds);
    		}).on("drag", (event) => {
    			const { autoPanOnNodeDrag, transform, snapGrid, snapToGrid, nodeDragThreshold, nodeLookup } = getStoreItems();
    			const pointerPos = getPointerPosition(event.sourceEvent, {
    				transform,
    				snapGrid,
    				snapToGrid,
    				containerBounds
    			});
    			dragEvent = event.sourceEvent;
    			if (event.sourceEvent.type === "touchmove" && event.sourceEvent.touches.length > 1 || nodeId && !nodeLookup.has(nodeId)) abortDrag = true;
    			if (abortDrag) return;
    			if (!autoPanStarted && autoPanOnNodeDrag && dragStarted) {
    				autoPanStarted = true;
    				autoPan();
    			}
    			if (!dragStarted) {
    				const currentMousePosition = getEventPosition(event.sourceEvent, containerBounds);
    				const x = currentMousePosition.x - mousePosition.x;
    				const y = currentMousePosition.y - mousePosition.y;
    				if (Math.sqrt(x * x + y * y) > nodeDragThreshold) startDrag(event);
    			}
    			if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems && dragStarted) {
    				mousePosition = getEventPosition(event.sourceEvent, containerBounds);
    				updateNodes(pointerPos);
    			}
    		}).on("end", (event) => {
    			if (!dragStarted || abortDrag) {
    				if (abortDrag && dragItems.size > 0) getStoreItems().updateNodePositions(dragItems, false);
    				return;
    			}
    			autoPanStarted = false;
    			dragStarted = false;
    			cancelAnimationFrame(autoPanId);
    			if (dragItems.size > 0) {
    				const { nodeLookup, updateNodePositions, onNodeDragStop, onSelectionDragStop } = getStoreItems();
    				if (nodePositionsChanged) {
    					updateNodePositions(dragItems, false);
    					nodePositionsChanged = false;
    				}
    				if (onDragStop || onNodeDragStop || !nodeId && onSelectionDragStop) {
    					const [currentNode, currentNodes] = getEventHandlerParams({
    						nodeId,
    						dragItems,
    						nodeLookup,
    						dragging: false
    					});
    					onDragStop?.(event.sourceEvent, dragItems, currentNode, currentNodes);
    					onNodeDragStop?.(event.sourceEvent, currentNode, currentNodes);
    					if (!nodeId) onSelectionDragStop?.(event.sourceEvent, currentNodes);
    				}
    			}
    		}).filter((event) => {
    			const target = event.target;
    			return !event.button && (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, domNode)) && (!handleSelector || hasSelector(target, handleSelector, domNode));
    		});
    		d3Selection.call(d3DragInstance);
    	}
    	function destroy() {
    		d3Selection?.on(".drag", null);
    	}
    	return {
    		update,
    		destroy
    	};
    }
    function getNodesWithinDistance(position, nodeLookup, distance) {
    	const nodes = [];
    	const rect = {
    		x: position.x - distance,
    		y: position.y - distance,
    		width: distance * 2,
    		height: distance * 2
    	};
    	for (const node of nodeLookup.values()) if (getOverlappingArea(rect, nodeToRect(node)) > 0) nodes.push(node);
    	return nodes;
    }
    const ADDITIONAL_DISTANCE = 250;
    function getClosestHandle(position, connectionRadius, nodeLookup, fromHandle) {
    	let closestHandles = [];
    	let minDistance = Infinity;
    	const closeNodes = getNodesWithinDistance(position, nodeLookup, connectionRadius + ADDITIONAL_DISTANCE);
    	for (const node of closeNodes) {
    		const allHandles = [...node.internals.handleBounds?.source ?? [], ...node.internals.handleBounds?.target ?? []];
    		for (const handle of allHandles) {
    			if (fromHandle.nodeId === handle.nodeId && fromHandle.type === handle.type && fromHandle.id === handle.id) continue;
    			const { x, y } = getHandlePosition(node, handle, handle.position, true);
    			const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));
    			if (distance > connectionRadius) continue;
    			if (distance < minDistance) {
    				closestHandles = [{
    					...handle,
    					x,
    					y
    				}];
    				minDistance = distance;
    			} else if (distance === minDistance) closestHandles.push({
    				...handle,
    				x,
    				y
    			});
    		}
    	}
    	if (!closestHandles.length) return null;
    	if (closestHandles.length > 1) {
    		const oppositeHandleType = fromHandle.type === "source" ? "target" : "source";
    		return closestHandles.find((handle) => handle.type === oppositeHandleType) ?? closestHandles[0];
    	}
    	return closestHandles[0];
    }
    function getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode, withAbsolutePosition = false) {
    	const node = nodeLookup.get(nodeId);
    	if (!node) return null;
    	const handles = connectionMode === "strict" ? node.internals.handleBounds?.[handleType] : [...node.internals.handleBounds?.source ?? [], ...node.internals.handleBounds?.target ?? []];
    	const handle = (handleId ? handles?.find((h) => h.id === handleId) : handles?.[0]) ?? null;
    	return handle && withAbsolutePosition ? {
    		...handle,
    		...getHandlePosition(node, handle, handle.position, true)
    	} : handle;
    }
    function getHandleType(edgeUpdaterType, handleDomNode) {
    	if (edgeUpdaterType) return edgeUpdaterType;
    	else if (handleDomNode?.classList.contains("target")) return "target";
    	else if (handleDomNode?.classList.contains("source")) return "source";
    	return null;
    }
    function isConnectionValid(isInsideConnectionRadius, isHandleValid) {
    	let isValid = null;
    	if (isHandleValid) isValid = true;
    	else if (isInsideConnectionRadius && !isHandleValid) isValid = false;
    	return isValid;
    }
    const alwaysValid = () => true;
    function onPointerDown(event, { connectionMode, connectionRadius, handleId, nodeId, edgeUpdaterType, isTarget, domNode, nodeLookup, lib, autoPanOnConnect, flowId, panBy, cancelConnection, onConnectStart, onConnect, onConnectEnd, isValidConnection = alwaysValid, onReconnectEnd, updateConnection, getTransform, getFromHandle, autoPanSpeed, dragThreshold = 1, handleDomNode }) {
    	const doc = getHostForElement(event.target);
    	let autoPanId = 0;
    	let closestHandle;
    	const { x, y } = getEventPosition(event);
    	const handleType = getHandleType(edgeUpdaterType, handleDomNode);
    	const containerBounds = domNode?.getBoundingClientRect();
    	let connectionStarted = false;
    	if (!containerBounds || !handleType) return;
    	const fromHandleInternal = getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode);
    	if (!fromHandleInternal) return;
    	let position = getEventPosition(event, containerBounds);
    	let autoPanStarted = false;
    	let connection = null;
    	let isValid = false;
    	let resultHandleDomNode = null;
    	function autoPan() {
    		if (!autoPanOnConnect || !containerBounds) return;
    		const [x, y] = calcAutoPan(position, containerBounds, autoPanSpeed);
    		panBy({
    			x,
    			y
    		});
    		autoPanId = requestAnimationFrame(autoPan);
    	}
    	const fromHandle = {
    		...fromHandleInternal,
    		nodeId,
    		type: handleType,
    		position: fromHandleInternal.position
    	};
    	const fromInternalNode = nodeLookup.get(nodeId);
    	let previousConnection = {
    		inProgress: true,
    		isValid: null,
    		from: getHandlePosition(fromInternalNode, fromHandle, Position.Left, true),
    		fromHandle,
    		fromPosition: fromHandle.position,
    		fromNode: fromInternalNode,
    		to: position,
    		toHandle: null,
    		toPosition: oppositePosition[fromHandle.position],
    		toNode: null,
    		pointer: position
    	};
    	function startConnection() {
    		connectionStarted = true;
    		updateConnection(previousConnection);
    		onConnectStart?.(event, {
    			nodeId,
    			handleId,
    			handleType
    		});
    	}
    	if (dragThreshold === 0) startConnection();
    	function onPointerMove(event) {
    		if (!connectionStarted) {
    			const { x: evtX, y: evtY } = getEventPosition(event);
    			const dx = evtX - x;
    			const dy = evtY - y;
    			if (!(dx * dx + dy * dy > dragThreshold * dragThreshold)) return;
    			startConnection();
    		}
    		if (!getFromHandle() || !fromHandle) {
    			onPointerUp(event);
    			return;
    		}
    		const transform = getTransform();
    		position = getEventPosition(event, containerBounds);
    		closestHandle = getClosestHandle(pointToRendererPoint(position, transform, false, [1, 1]), connectionRadius, nodeLookup, fromHandle);
    		if (!autoPanStarted) {
    			autoPan();
    			autoPanStarted = true;
    		}
    		const result = isValidHandle(event, {
    			handle: closestHandle,
    			connectionMode,
    			fromNodeId: nodeId,
    			fromHandleId: handleId,
    			fromType: isTarget ? "target" : "source",
    			isValidConnection,
    			doc,
    			lib,
    			flowId,
    			nodeLookup
    		});
    		resultHandleDomNode = result.handleDomNode;
    		connection = result.connection;
    		isValid = isConnectionValid(!!closestHandle, result.isValid);
    		const fromInternalNode = nodeLookup.get(nodeId);
    		const from = fromInternalNode ? getHandlePosition(fromInternalNode, fromHandle, Position.Left, true) : previousConnection.from;
    		const newConnection = {
    			...previousConnection,
    			from,
    			isValid,
    			to: result.toHandle && isValid ? rendererPointToPoint({
    				x: result.toHandle.x,
    				y: result.toHandle.y
    			}, transform) : position,
    			toHandle: result.toHandle,
    			toPosition: isValid && result.toHandle ? result.toHandle.position : oppositePosition[fromHandle.position],
    			toNode: result.toHandle ? nodeLookup.get(result.toHandle.nodeId) : null,
    			pointer: position
    		};
    		updateConnection(newConnection);
    		previousConnection = newConnection;
    	}
    	function onPointerUp(event) {
    		if ("touches" in event && event.touches.length > 0) return;
    		if (connectionStarted) {
    			if ((closestHandle || resultHandleDomNode) && connection && isValid) onConnect?.(connection);
    			const { inProgress, ...connectionState } = previousConnection;
    			const finalConnectionState = {
    				...connectionState,
    				toPosition: previousConnection.toHandle ? previousConnection.toPosition : null
    			};
    			onConnectEnd?.(event, finalConnectionState);
    			if (edgeUpdaterType) onReconnectEnd?.(event, finalConnectionState);
    		}
    		cancelConnection();
    		cancelAnimationFrame(autoPanId);
    		autoPanStarted = false;
    		isValid = false;
    		connection = null;
    		resultHandleDomNode = null;
    		doc.removeEventListener("mousemove", onPointerMove);
    		doc.removeEventListener("mouseup", onPointerUp);
    		doc.removeEventListener("touchmove", onPointerMove);
    		doc.removeEventListener("touchend", onPointerUp);
    	}
    	doc.addEventListener("mousemove", onPointerMove);
    	doc.addEventListener("mouseup", onPointerUp);
    	doc.addEventListener("touchmove", onPointerMove);
    	doc.addEventListener("touchend", onPointerUp);
    }
    function isValidHandle(event, { handle, connectionMode, fromNodeId, fromHandleId, fromType, doc, lib, flowId, isValidConnection = alwaysValid, nodeLookup }) {
    	const isTarget = fromType === "target";
    	const handleDomNode = handle ? doc.querySelector(`.${lib}-flow__handle[data-id="${flowId}-${handle?.nodeId}-${handle?.id}-${handle?.type}"]`) : null;
    	const { x, y } = getEventPosition(event);
    	const handleBelow = doc.elementFromPoint(x, y);
    	const handleToCheck = handleBelow?.classList.contains(`${lib}-flow__handle`) ? handleBelow : handleDomNode;
    	const result = {
    		handleDomNode: handleToCheck,
    		isValid: false,
    		connection: null,
    		toHandle: null
    	};
    	if (handleToCheck) {
    		const handleType = getHandleType(void 0, handleToCheck);
    		const handleNodeId = handleToCheck.getAttribute("data-nodeid");
    		const handleId = handleToCheck.getAttribute("data-handleid");
    		const connectable = handleToCheck.classList.contains("connectable");
    		const connectableEnd = handleToCheck.classList.contains("connectableend");
    		if (!handleNodeId || !handleType) return result;
    		const connection = {
    			source: isTarget ? handleNodeId : fromNodeId,
    			sourceHandle: isTarget ? handleId : fromHandleId,
    			target: isTarget ? fromNodeId : handleNodeId,
    			targetHandle: isTarget ? fromHandleId : handleId
    		};
    		result.connection = connection;
    		result.isValid = connectable && connectableEnd && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === "source" || !isTarget && handleType === "target" : handleNodeId !== fromNodeId || handleId !== fromHandleId) && isValidConnection(connection);
    		result.toHandle = getHandle(handleNodeId, handleType, handleId, nodeLookup, connectionMode, true);
    	}
    	return result;
    }
    const XYHandle = {
    	onPointerDown,
    	isValid: isValidHandle
    };
    function XYMinimap({ domNode, panZoom, getTransform, getViewScale }) {
    	const selection = select_default$1(domNode);
    	function update({ translateExtent, width, height, zoomStep = 1, pannable = true, zoomable = true, inversePan = false }) {
    		const zoomHandler = (event) => {
    			if (event.sourceEvent.type !== "wheel" || !panZoom) return;
    			const transform = getTransform();
    			const factor = event.sourceEvent.ctrlKey && isMacOs() ? 10 : 1;
    			const pinchDelta = -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? .05 : event.sourceEvent.deltaMode ? 1 : .002) * zoomStep;
    			const nextZoom = transform[2] * Math.pow(2, pinchDelta * factor);
    			panZoom.scaleTo(nextZoom);
    		};
    		let panStart = [0, 0];
    		const panStartHandler = (event) => {
    			if (event.sourceEvent.type === "mousedown" || event.sourceEvent.type === "touchstart") panStart = [event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX, event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY];
    		};
    		const panHandler = (event) => {
    			const transform = getTransform();
    			if (event.sourceEvent.type !== "mousemove" && event.sourceEvent.type !== "touchmove" || !panZoom) return;
    			const panCurrent = [event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX, event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY];
    			const panDelta = [panCurrent[0] - panStart[0], panCurrent[1] - panStart[1]];
    			panStart = panCurrent;
    			const moveScale = getViewScale() * Math.max(transform[2], Math.log(transform[2])) * (inversePan ? -1 : 1);
    			const position = {
    				x: transform[0] - panDelta[0] * moveScale,
    				y: transform[1] - panDelta[1] * moveScale
    			};
    			const extent = [[0, 0], [width, height]];
    			panZoom.setViewportConstrained({
    				x: position.x,
    				y: position.y,
    				zoom: transform[2]
    			}, extent, translateExtent);
    		};
    		const zoomAndPanHandler = zoom_default().on("start", panStartHandler).on("zoom", pannable ? panHandler : null).on("zoom.wheel", zoomable ? zoomHandler : null);
    		selection.call(zoomAndPanHandler, {});
    	}
    	function destroy() {
    		selection.on("zoom", null);
    	}
    	return {
    		update,
    		destroy,
    		pointer: pointer_default
    	};
    }
    const transformToViewport = (transform) => ({
    	x: transform.x,
    	y: transform.y,
    	zoom: transform.k
    });
    const viewportToTransform = ({ x, y, zoom }) => identity$1.translate(x, y).scale(zoom);
    const isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
    const isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
    const defaultEase = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    const getD3Transition = (selection, duration = 0, ease = defaultEase, onEnd = () => {}) => {
    	const hasDuration = typeof duration === "number" && duration > 0;
    	if (!hasDuration) onEnd();
    	return hasDuration ? selection.transition().duration(duration).ease(ease).on("end", onEnd) : selection;
    };
    const wheelDelta = (event) => {
    	const factor = event.ctrlKey && isMacOs() ? 10 : 1;
    	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * factor;
    };
    function createPanOnScrollHandler({ zoomPanValues, noWheelClassName, d3Selection, d3Zoom, panOnScrollMode, panOnScrollSpeed, zoomOnPinch, onPanZoomStart, onPanZoom, onPanZoomEnd }) {
    	return (event) => {
    		if (isWrappedWithClass(event, noWheelClassName)) {
    			if (event.ctrlKey) event.preventDefault();
    			return false;
    		}
    		event.preventDefault();
    		event.stopImmediatePropagation();
    		const currentZoom = d3Selection.property("__zoom").k || 1;
    		if (event.ctrlKey && zoomOnPinch) {
    			const point = pointer_default(event);
    			const pinchDelta = wheelDelta(event);
    			const zoom = currentZoom * Math.pow(2, pinchDelta);
    			d3Zoom.scaleTo(d3Selection, zoom, point, event);
    			return;
    		}
    		const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
    		let deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
    		let deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
    		if (!isMacOs() && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
    			deltaX = event.deltaY * deltaNormalize;
    			deltaY = 0;
    		}
    		d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, { internal: true });
    		const nextViewport = transformToViewport(d3Selection.property("__zoom"));
    		clearTimeout(zoomPanValues.panScrollTimeout);
    		if (!zoomPanValues.isPanScrolling) {
    			zoomPanValues.isPanScrolling = true;
    			onPanZoomStart?.(event, nextViewport);
    		} else onPanZoom?.(event, nextViewport);
    		zoomPanValues.panScrollTimeout = setTimeout(() => {
    			onPanZoomEnd?.(event, nextViewport);
    			zoomPanValues.isPanScrolling = false;
    		}, 150);
    	};
    }
    function createZoomOnScrollHandler({ noWheelClassName, preventScrolling, d3ZoomHandler }) {
    	return function(event, d) {
    		const isWheel = event.type === "wheel";
    		const preventZoom = !preventScrolling && isWheel && !event.ctrlKey;
    		const hasNoWheelClass = isWrappedWithClass(event, noWheelClassName);
    		if (event.ctrlKey && isWheel && hasNoWheelClass) event.preventDefault();
    		if (preventZoom || hasNoWheelClass) return null;
    		event.preventDefault();
    		d3ZoomHandler.call(this, event, d);
    	};
    }
    function createPanZoomStartHandler({ zoomPanValues, onDraggingChange, onPanZoomStart }) {
    	return (event) => {
    		if (event.sourceEvent?.internal) return;
    		const viewport = transformToViewport(event.transform);
    		zoomPanValues.mouseButton = event.sourceEvent?.button || 0;
    		zoomPanValues.isZoomingOrPanning = true;
    		zoomPanValues.prevViewport = viewport;
    		if (event.sourceEvent?.type === "mousedown") onDraggingChange(true);
    		if (onPanZoomStart) onPanZoomStart?.(event.sourceEvent, viewport);
    	};
    }
    function createPanZoomHandler({ zoomPanValues, panOnDrag, onPaneContextMenu, onTransformChange, onPanZoom }) {
    	return (event) => {
    		zoomPanValues.usedRightMouseButton = !!(onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0));
    		if (!event.sourceEvent?.sync) onTransformChange([
    			event.transform.x,
    			event.transform.y,
    			event.transform.k
    		]);
    		if (onPanZoom && !event.sourceEvent?.internal) onPanZoom?.(event.sourceEvent, transformToViewport(event.transform));
    	};
    }
    function createPanZoomEndHandler({ zoomPanValues, panOnDrag, panOnScroll, onDraggingChange, onPanZoomEnd, onPaneContextMenu }) {
    	return (event) => {
    		if (event.sourceEvent?.internal) return;
    		zoomPanValues.isZoomingOrPanning = false;
    		if (onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0) && !zoomPanValues.usedRightMouseButton && event.sourceEvent) onPaneContextMenu(event.sourceEvent);
    		zoomPanValues.usedRightMouseButton = false;
    		onDraggingChange(false);
    		if (onPanZoomEnd) {
    			const viewport = transformToViewport(event.transform);
    			zoomPanValues.prevViewport = viewport;
    			clearTimeout(zoomPanValues.timerId);
    			zoomPanValues.timerId = setTimeout(() => {
    				onPanZoomEnd?.(event.sourceEvent, viewport);
    			}, panOnScroll ? 150 : 0);
    		}
    	};
    }
    function createFilter({ panActivationKeyPressed, zoomActivationKeyPressed, zoomOnScroll, zoomOnPinch, panOnDrag, panOnScroll, zoomOnDoubleClick, userSelectionActive, noWheelClassName, noPanClassName, lib, connectionInProgress }) {
    	return (event) => {
    		const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
    		const pinchZoom = zoomOnPinch && event.ctrlKey;
    		const isWheelEvent = event.type === "wheel";
    		if (event.button === 1 && event.type === "mousedown" && (isWrappedWithClass(event, `${lib}-flow__node`) || isWrappedWithClass(event, `${lib}-flow__edge`) || isWrappedWithClass(event, `${lib}-flow__selection`) || isWrappedWithClass(event, `${lib}-flow__nodesselection`))) return true;
    		if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false;
    		if (userSelectionActive) return false;
    		if (connectionInProgress && !isWheelEvent) return false;
    		if (isWrappedWithClass(event, noWheelClassName) && isWheelEvent) return false;
    		if (isWrappedWithClass(event, noPanClassName) && (!isWheelEvent || panOnScroll && isWheelEvent && !zoomActivationKeyPressed)) return false;
    		if (!zoomOnPinch && event.ctrlKey && isWheelEvent) return false;
    		if (!zoomOnPinch && event.type === "touchstart" && event.touches?.length > 1) {
    			event.preventDefault();
    			return false;
    		}
    		if (!zoomScroll && !panOnScroll && !pinchZoom && isWheelEvent) return false;
    		if (!panOnDrag && (event.type === "mousedown" || event.type === "touchstart")) return false;
    		if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === "mousedown") return false;
    		const buttonAllowed = Array.isArray(panOnDrag) && panOnDrag.includes(event.button) || !event.button || event.button <= 1;
    		return (!event.ctrlKey || isWheelEvent || panActivationKeyPressed) && buttonAllowed;
    	};
    }
    function XYPanZoom({ domNode, minZoom, maxZoom, translateExtent, viewport, onPanZoom, onPanZoomStart, onPanZoomEnd, onDraggingChange }) {
    	const zoomPanValues = {
    		isZoomingOrPanning: false,
    		usedRightMouseButton: false,
    		prevViewport: {},
    		mouseButton: 0,
    		timerId: void 0,
    		panScrollTimeout: void 0,
    		isPanScrolling: false
    	};
    	const bbox = domNode.getBoundingClientRect();
    	let cachedExtent = [[0, 0], [bbox.width, bbox.height]];
    	(typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) => {
    		const entry = entries[0];
    		if (entry) cachedExtent = [[0, 0], [entry.contentRect.width, entry.contentRect.height]];
    	}) : null)?.observe(domNode);
    	const d3ZoomInstance = zoom_default().extent(() => cachedExtent).scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
    	const d3Selection = select_default$1(domNode).call(d3ZoomInstance);
    	setViewportConstrained({
    		x: viewport.x,
    		y: viewport.y,
    		zoom: clamp(viewport.zoom, minZoom, maxZoom)
    	}, [[0, 0], [bbox.width, bbox.height]], translateExtent);
    	const d3ZoomHandler = d3Selection.on("wheel.zoom");
    	const d3DblClickZoomHandler = d3Selection.on("dblclick.zoom");
    	d3ZoomInstance.wheelDelta(wheelDelta);
    	async function setTransform(transform, options) {
    		if (d3Selection) return new Promise((resolve) => {
    			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value_default : zoom_default$1).transform(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), transform);
    		});
    		return false;
    	}
    	function update({ noWheelClassName, noPanClassName, onPaneContextMenu, userSelectionActive, panOnScroll, panOnDrag, panOnScrollMode, panOnScrollSpeed, preventScrolling, zoomOnPinch, zoomOnScroll, zoomOnDoubleClick, panActivationKeyPressed = false, zoomActivationKeyPressed, lib, onTransformChange, connectionInProgress, paneClickDistance, selectionOnDrag }) {
    		if (userSelectionActive && !zoomPanValues.isZoomingOrPanning) destroy();
    		const isPanOnScroll = panOnScroll && !zoomActivationKeyPressed && !userSelectionActive;
    		d3ZoomInstance.clickDistance(selectionOnDrag ? Infinity : !isNumeric(paneClickDistance) || paneClickDistance < 0 ? 0 : paneClickDistance);
    		const wheelHandler = isPanOnScroll ? createPanOnScrollHandler({
    			zoomPanValues,
    			noWheelClassName,
    			d3Selection,
    			d3Zoom: d3ZoomInstance,
    			panOnScrollMode,
    			panOnScrollSpeed,
    			zoomOnPinch,
    			onPanZoomStart,
    			onPanZoom,
    			onPanZoomEnd
    		}) : createZoomOnScrollHandler({
    			noWheelClassName,
    			preventScrolling,
    			d3ZoomHandler
    		});
    		d3Selection.on("wheel.zoom", wheelHandler, { passive: false });
    		const startHandler = createPanZoomStartHandler({
    			zoomPanValues,
    			onDraggingChange,
    			onPanZoomStart
    		});
    		d3ZoomInstance.on("start", startHandler);
    		const panZoomHandler = createPanZoomHandler({
    			zoomPanValues,
    			panOnDrag,
    			onPaneContextMenu: !!onPaneContextMenu,
    			onPanZoom,
    			onTransformChange
    		});
    		d3ZoomInstance.on("zoom", panZoomHandler);
    		const panZoomEndHandler = createPanZoomEndHandler({
    			zoomPanValues,
    			panOnDrag,
    			panOnScroll,
    			onPaneContextMenu,
    			onPanZoomEnd,
    			onDraggingChange
    		});
    		d3ZoomInstance.on("end", panZoomEndHandler);
    		const filter = createFilter({
    			panActivationKeyPressed,
    			zoomActivationKeyPressed,
    			panOnDrag,
    			zoomOnScroll,
    			panOnScroll,
    			zoomOnDoubleClick,
    			zoomOnPinch,
    			userSelectionActive,
    			noPanClassName,
    			noWheelClassName,
    			lib,
    			connectionInProgress
    		});
    		d3ZoomInstance.filter(filter);
    		if (zoomOnDoubleClick) d3Selection.on("dblclick.zoom", d3DblClickZoomHandler);
    		else d3Selection.on("dblclick.zoom", null);
    	}
    	function destroy() {
    		d3ZoomInstance.on("zoom", null);
    	}
    	async function setViewportConstrained(viewport, extent, translateExtent) {
    		const nextTransform = viewportToTransform(viewport);
    		const contrainedTransform = d3ZoomInstance?.constrain()(nextTransform, extent, translateExtent);
    		if (contrainedTransform) await setTransform(contrainedTransform);
    		return contrainedTransform;
    	}
    	async function setViewport(viewport, options) {
    		const nextTransform = viewportToTransform(viewport);
    		await setTransform(nextTransform, options);
    		return nextTransform;
    	}
    	function syncViewport(viewport) {
    		if (d3Selection) {
    			const nextTransform = viewportToTransform(viewport);
    			const currentTransform = d3Selection.property("__zoom");
    			if (currentTransform.k !== viewport.zoom || currentTransform.x !== viewport.x || currentTransform.y !== viewport.y) d3ZoomInstance?.transform(d3Selection, nextTransform, null, { sync: true });
    		}
    	}
    	function getViewport() {
    		const transform = d3Selection ? transform$1(d3Selection.node()) : {
    			x: 0,
    			y: 0,
    			k: 1
    		};
    		return {
    			x: transform.x,
    			y: transform.y,
    			zoom: transform.k
    		};
    	}
    	async function scaleTo(zoom, options) {
    		if (d3Selection) return new Promise((resolve) => {
    			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value_default : zoom_default$1).scaleTo(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), zoom);
    		});
    		return false;
    	}
    	async function scaleBy(factor, options) {
    		if (d3Selection) return new Promise((resolve) => {
    			d3ZoomInstance?.interpolate(options?.interpolate === "linear" ? value_default : zoom_default$1).scaleBy(getD3Transition(d3Selection, options?.duration, options?.ease, () => resolve(true)), factor);
    		});
    		return false;
    	}
    	function setScaleExtent(scaleExtent) {
    		d3ZoomInstance?.scaleExtent(scaleExtent);
    	}
    	function setTranslateExtent(translateExtent) {
    		d3ZoomInstance?.translateExtent(translateExtent);
    	}
    	function setClickDistance(distance) {
    		const validDistance = !isNumeric(distance) || distance < 0 ? 0 : distance;
    		d3ZoomInstance?.clickDistance(validDistance);
    	}
    	return {
    		update,
    		destroy,
    		setViewport,
    		setViewportConstrained,
    		getViewport,
    		scaleTo,
    		scaleBy,
    		setScaleExtent,
    		setTranslateExtent,
    		syncViewport,
    		setClickDistance
    	};
    }
    /**
    * Used to determine the variant of the resize control
    *
    * @public
    */
    var ResizeControlVariant;
    (function(ResizeControlVariant) {
    	ResizeControlVariant["Line"] = "line";
    	ResizeControlVariant["Handle"] = "handle";
    })(ResizeControlVariant || (ResizeControlVariant = {}));
    /**
    * Get all connecting edges for a given set of nodes
    * @param width - new width of the node
    * @param prevWidth - previous width of the node
    * @param height - new height of the node
    * @param prevHeight - previous height of the node
    * @param affectsX - whether to invert the resize direction for the x axis
    * @param affectsY - whether to invert the resize direction for the y axis
    * @returns array of two numbers representing the direction of the resize for each axis, 0 = no change, 1 = increase, -1 = decrease
    */
    function getResizeDirection({ width, prevWidth, height, prevHeight, affectsX, affectsY }) {
    	const deltaWidth = width - prevWidth;
    	const deltaHeight = height - prevHeight;
    	const direction = [deltaWidth > 0 ? 1 : deltaWidth < 0 ? -1 : 0, deltaHeight > 0 ? 1 : deltaHeight < 0 ? -1 : 0];
    	if (deltaWidth && affectsX) direction[0] = direction[0] * -1;
    	if (deltaHeight && affectsY) direction[1] = direction[1] * -1;
    	return direction;
    }
    /**
    * Parses the control position that is being dragged to dimensions that are being resized
    * @param controlPosition - position of the control that is being dragged
    * @returns isHorizontal, isVertical, affectsX, affectsY,
    */
    function getControlDirection(controlPosition) {
    	return {
    		isHorizontal: controlPosition.includes("right") || controlPosition.includes("left"),
    		isVertical: controlPosition.includes("bottom") || controlPosition.includes("top"),
    		affectsX: controlPosition.includes("left"),
    		affectsY: controlPosition.includes("top")
    	};
    }
    function getLowerExtentClamp(lowerExtent, lowerBound) {
    	return Math.max(0, lowerBound - lowerExtent);
    }
    function getUpperExtentClamp(upperExtent, upperBound) {
    	return Math.max(0, upperExtent - upperBound);
    }
    function getSizeClamp(size, minSize, maxSize) {
    	return Math.max(0, minSize - size, size - maxSize);
    }
    function xor(a, b) {
    	return a ? !b : b;
    }
    /**
    * Calculates new width & height and x & y of node after resize based on pointer position
    * @description - Buckle up, this is a chunky one... If you want to determine the new dimensions of a node after a resize,
    * you have to account for all possible restrictions: min/max width/height of the node, the maximum extent the node is allowed
    * to move in (in this case: resize into) determined by the parent node, the minimal extent determined by child nodes
    * with expandParent or extent: 'parent' set and oh yeah, these things also have to work with keepAspectRatio!
    * The way this is done is by determining how much each of these restricting actually restricts the resize and then applying the
    * strongest restriction. Because the resize affects x, y and width, height and width, height of a opposing side with keepAspectRatio,
    * the resize amount is always kept in distX & distY amount (the distance in mouse movement)
    * Instead of clamping each value, we first calculate the biggest 'clamp' (for the lack of a better name) and then apply it to all values.
    * To complicate things nodeOrigin has to be taken into account as well. This is done by offsetting the nodes as if their origin is [0, 0],
    * then calculating the restrictions as usual
    * @param startValues - starting values of resize
    * @param controlDirection - dimensions affected by the resize
    * @param pointerPosition - the current pointer position corrected for snapping
    * @param boundaries - minimum and maximum dimensions of the node
    * @param keepAspectRatio - prevent changes of asprect ratio
    * @returns x, y, width and height of the node after resize
    */
    function getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, extent, childExtent) {
    	let { affectsX, affectsY } = controlDirection;
    	const { isHorizontal, isVertical } = controlDirection;
    	const isDiagonal = isHorizontal && isVertical;
    	const { xSnapped, ySnapped } = pointerPosition;
    	const { minWidth, maxWidth, minHeight, maxHeight } = boundaries;
    	const { x: startX, y: startY, width: startWidth, height: startHeight, aspectRatio } = startValues;
    	let distX = Math.floor(isHorizontal ? xSnapped - startValues.pointerX : 0);
    	let distY = Math.floor(isVertical ? ySnapped - startValues.pointerY : 0);
    	const newWidth = startWidth + (affectsX ? -distX : distX);
    	const newHeight = startHeight + (affectsY ? -distY : distY);
    	const originOffsetX = -nodeOrigin[0] * startWidth;
    	const originOffsetY = -nodeOrigin[1] * startHeight;
    	let clampX = getSizeClamp(newWidth, minWidth, maxWidth);
    	let clampY = getSizeClamp(newHeight, minHeight, maxHeight);
    	if (extent) {
    		let xExtentClamp = 0;
    		let yExtentClamp = 0;
    		if (affectsX && distX < 0) xExtentClamp = getLowerExtentClamp(startX + distX + originOffsetX, extent[0][0]);
    		else if (!affectsX && distX > 0) xExtentClamp = getUpperExtentClamp(startX + newWidth + originOffsetX, extent[1][0]);
    		if (affectsY && distY < 0) yExtentClamp = getLowerExtentClamp(startY + distY + originOffsetY, extent[0][1]);
    		else if (!affectsY && distY > 0) yExtentClamp = getUpperExtentClamp(startY + newHeight + originOffsetY, extent[1][1]);
    		clampX = Math.max(clampX, xExtentClamp);
    		clampY = Math.max(clampY, yExtentClamp);
    	}
    	if (childExtent) {
    		let xExtentClamp = 0;
    		let yExtentClamp = 0;
    		if (affectsX && distX > 0) xExtentClamp = getUpperExtentClamp(startX + distX, childExtent[0][0]);
    		else if (!affectsX && distX < 0) xExtentClamp = getLowerExtentClamp(startX + newWidth, childExtent[1][0]);
    		if (affectsY && distY > 0) yExtentClamp = getUpperExtentClamp(startY + distY, childExtent[0][1]);
    		else if (!affectsY && distY < 0) yExtentClamp = getLowerExtentClamp(startY + newHeight, childExtent[1][1]);
    		clampX = Math.max(clampX, xExtentClamp);
    		clampY = Math.max(clampY, yExtentClamp);
    	}
    	if (keepAspectRatio) {
    		if (isHorizontal) {
    			const aspectHeightClamp = getSizeClamp(newWidth / aspectRatio, minHeight, maxHeight) * aspectRatio;
    			clampX = Math.max(clampX, aspectHeightClamp);
    			if (extent) {
    				let aspectExtentClamp = 0;
    				if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) aspectExtentClamp = getUpperExtentClamp(startY + originOffsetY + newWidth / aspectRatio, extent[1][1]) * aspectRatio;
    				else aspectExtentClamp = getLowerExtentClamp(startY + originOffsetY + (affectsX ? distX : -distX) / aspectRatio, extent[0][1]) * aspectRatio;
    				clampX = Math.max(clampX, aspectExtentClamp);
    			}
    			if (childExtent) {
    				let aspectExtentClamp = 0;
    				if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) aspectExtentClamp = getLowerExtentClamp(startY + newWidth / aspectRatio, childExtent[1][1]) * aspectRatio;
    				else aspectExtentClamp = getUpperExtentClamp(startY + (affectsX ? distX : -distX) / aspectRatio, childExtent[0][1]) * aspectRatio;
    				clampX = Math.max(clampX, aspectExtentClamp);
    			}
    		}
    		if (isVertical) {
    			const aspectWidthClamp = getSizeClamp(newHeight * aspectRatio, minWidth, maxWidth) / aspectRatio;
    			clampY = Math.max(clampY, aspectWidthClamp);
    			if (extent) {
    				let aspectExtentClamp = 0;
    				if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) aspectExtentClamp = getUpperExtentClamp(startX + newHeight * aspectRatio + originOffsetX, extent[1][0]) / aspectRatio;
    				else aspectExtentClamp = getLowerExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio + originOffsetX, extent[0][0]) / aspectRatio;
    				clampY = Math.max(clampY, aspectExtentClamp);
    			}
    			if (childExtent) {
    				let aspectExtentClamp = 0;
    				if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) aspectExtentClamp = getLowerExtentClamp(startX + newHeight * aspectRatio, childExtent[1][0]) / aspectRatio;
    				else aspectExtentClamp = getUpperExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio, childExtent[0][0]) / aspectRatio;
    				clampY = Math.max(clampY, aspectExtentClamp);
    			}
    		}
    	}
    	distY = distY + (distY < 0 ? clampY : -clampY);
    	distX = distX + (distX < 0 ? clampX : -clampX);
    	if (keepAspectRatio) {
    		if (isDiagonal) {
    			if (newWidth > newHeight * aspectRatio) distY = (xor(affectsX, affectsY) ? -distX : distX) / aspectRatio;
    			else distX = (xor(affectsX, affectsY) ? -distY : distY) * aspectRatio;
    		} else if (isHorizontal) {
    			distY = distX / aspectRatio;
    			affectsY = affectsX;
    		} else {
    			distX = distY * aspectRatio;
    			affectsX = affectsY;
    		}
    	}
    	const x = affectsX ? startX + distX : startX;
    	const y = affectsY ? startY + distY : startY;
    	return {
    		width: startWidth + (affectsX ? -distX : distX),
    		height: startHeight + (affectsY ? -distY : distY),
    		x: nodeOrigin[0] * distX * (!affectsX ? 1 : -1) + x,
    		y: nodeOrigin[1] * distY * (!affectsY ? 1 : -1) + y
    	};
    }
    const initPrevValues$1 = {
    	width: 0,
    	height: 0,
    	x: 0,
    	y: 0
    };
    const initStartValues = {
    	...initPrevValues$1,
    	pointerX: 0,
    	pointerY: 0,
    	aspectRatio: 1
    };
    function nodeToChildExtent(child, parent, nodeOrigin) {
    	const x = parent.position.x + child.position.x;
    	const y = parent.position.y + child.position.y;
    	const width = child.measured.width ?? 0;
    	const height = child.measured.height ?? 0;
    	const originOffsetX = nodeOrigin[0] * width;
    	const originOffsetY = nodeOrigin[1] * height;
    	return [[x - originOffsetX, y - originOffsetY], [x + width - originOffsetX, y + height - originOffsetY]];
    }
    function XYResizer({ domNode, nodeId, getStoreItems, onChange, onEnd }) {
    	const selection = select_default$1(domNode);
    	let params = {
    		controlDirection: getControlDirection("bottom-right"),
    		boundaries: {
    			minWidth: 0,
    			minHeight: 0,
    			maxWidth: Number.MAX_VALUE,
    			maxHeight: Number.MAX_VALUE
    		},
    		resizeDirection: void 0,
    		keepAspectRatio: false
    	};
    	function update({ controlPosition, boundaries, keepAspectRatio, resizeDirection, onResizeStart, onResize, onResizeEnd, shouldResize }) {
    		let prevValues = { ...initPrevValues$1 };
    		let startValues = { ...initStartValues };
    		params = {
    			boundaries,
    			resizeDirection,
    			keepAspectRatio,
    			controlDirection: getControlDirection(controlPosition)
    		};
    		let node = void 0;
    		let containerBounds = null;
    		let childNodes = [];
    		let parentNode = void 0;
    		let nodeExtent = void 0;
    		let childExtent = void 0;
    		let resizeDetected = false;
    		const dragHandler = drag_default().on("start", (event) => {
    			const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin, paneDomNode } = getStoreItems();
    			node = nodeLookup.get(nodeId);
    			if (!node) return;
    			containerBounds = paneDomNode?.getBoundingClientRect() ?? null;
    			const { xSnapped, ySnapped } = getPointerPosition(event.sourceEvent, {
    				transform,
    				snapGrid,
    				snapToGrid,
    				containerBounds
    			});
    			prevValues = {
    				width: node.measured.width ?? 0,
    				height: node.measured.height ?? 0,
    				x: node.position.x ?? 0,
    				y: node.position.y ?? 0
    			};
    			startValues = {
    				...prevValues,
    				pointerX: xSnapped,
    				pointerY: ySnapped,
    				aspectRatio: prevValues.width / prevValues.height
    			};
    			parentNode = void 0;
    			nodeExtent = isCoordinateExtent(node.extent) ? node.extent : void 0;
    			if (node.parentId && (node.extent === "parent" || node.expandParent)) parentNode = nodeLookup.get(node.parentId);
    			if (parentNode && node.extent === "parent") nodeExtent = [[0, 0], [parentNode.measured.width, parentNode.measured.height]];
    			childNodes = [];
    			childExtent = void 0;
    			for (const [childId, child] of nodeLookup) if (child.parentId === nodeId) {
    				childNodes.push({
    					id: childId,
    					position: { ...child.position },
    					extent: child.extent
    				});
    				if (child.extent === "parent" || child.expandParent) {
    					const extent = nodeToChildExtent(child, node, child.origin ?? nodeOrigin);
    					if (childExtent) childExtent = [[Math.min(extent[0][0], childExtent[0][0]), Math.min(extent[0][1], childExtent[0][1])], [Math.max(extent[1][0], childExtent[1][0]), Math.max(extent[1][1], childExtent[1][1])]];
    					else childExtent = extent;
    				}
    			}
    			onResizeStart?.(event, { ...prevValues });
    		}).on("drag", (event) => {
    			const { transform, snapGrid, snapToGrid, nodeOrigin: storeNodeOrigin } = getStoreItems();
    			const pointerPosition = getPointerPosition(event.sourceEvent, {
    				transform,
    				snapGrid,
    				snapToGrid,
    				containerBounds
    			});
    			const childChanges = [];
    			if (!node) return;
    			const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = prevValues;
    			const change = {};
    			const nodeOrigin = node.origin ?? storeNodeOrigin;
    			const { width, height, x, y } = getDimensionsAfterResize(startValues, params.controlDirection, pointerPosition, params.boundaries, params.keepAspectRatio, nodeOrigin, nodeExtent, childExtent);
    			const isWidthChange = width !== prevWidth;
    			const isHeightChange = height !== prevHeight;
    			const isXPosChange = x !== prevX && isWidthChange;
    			const isYPosChange = y !== prevY && isHeightChange;
    			if (!isXPosChange && !isYPosChange && !isWidthChange && !isHeightChange) return;
    			if (isXPosChange || isYPosChange || nodeOrigin[0] === 1 || nodeOrigin[1] === 1) {
    				change.x = isXPosChange ? x : prevValues.x;
    				change.y = isYPosChange ? y : prevValues.y;
    				prevValues.x = change.x;
    				prevValues.y = change.y;
    				if (childNodes.length > 0) {
    					const xChange = x - prevX;
    					const yChange = y - prevY;
    					for (const childNode of childNodes) {
    						childNode.position = {
    							x: childNode.position.x - xChange + nodeOrigin[0] * (width - prevWidth),
    							y: childNode.position.y - yChange + nodeOrigin[1] * (height - prevHeight)
    						};
    						childChanges.push(childNode);
    					}
    				}
    			}
    			if (isWidthChange || isHeightChange) {
    				change.width = isWidthChange && (!params.resizeDirection || params.resizeDirection === "horizontal") ? width : prevValues.width;
    				change.height = isHeightChange && (!params.resizeDirection || params.resizeDirection === "vertical") ? height : prevValues.height;
    				prevValues.width = change.width;
    				prevValues.height = change.height;
    			}
    			if (parentNode && node.expandParent) {
    				const xLimit = nodeOrigin[0] * (change.width ?? 0);
    				if (change.x && change.x < xLimit) {
    					prevValues.x = xLimit;
    					startValues.x = startValues.x - (change.x - xLimit);
    				}
    				const yLimit = nodeOrigin[1] * (change.height ?? 0);
    				if (change.y && change.y < yLimit) {
    					prevValues.y = yLimit;
    					startValues.y = startValues.y - (change.y - yLimit);
    				}
    			}
    			const direction = getResizeDirection({
    				width: prevValues.width,
    				prevWidth,
    				height: prevValues.height,
    				prevHeight,
    				affectsX: params.controlDirection.affectsX,
    				affectsY: params.controlDirection.affectsY
    			});
    			const nextValues = {
    				...prevValues,
    				direction
    			};
    			if (shouldResize?.(event, nextValues) === false) return;
    			resizeDetected = true;
    			onResize?.(event, nextValues);
    			onChange(change, childChanges);
    		}).on("end", (event) => {
    			if (!resizeDetected) return;
    			onResizeEnd?.(event, { ...prevValues });
    			onEnd?.({ ...prevValues });
    			resizeDetected = false;
    		});
    		selection.call(dragHandler);
    	}
    	function destroy() {
    		selection.on(".drag", null);
    	}
    	return {
    		update,
    		destroy
    	};
    }
    //#endregion
    //#region ../../node_modules/.pnpm/use-sync-external-store@1.7.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
    /**
    * @license React
    * use-sync-external-store-shim.production.js
    *
    * Copyright (c) Meta Platforms, Inc. and affiliates.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    */
    var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
    	var React$4 = require("react");
    	function is(x, y) {
    		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    	}
    	var objectIs = "function" === typeof Object.is ? Object.is : is;
    	var useState = React$4.useState;
    	var useEffect = React$4.useEffect;
    	var useLayoutEffect = React$4.useLayoutEffect;
    	var useDebugValue = React$4.useDebugValue;
    	function useSyncExternalStore$2(subscribe, getSnapshot) {
    		var value = getSnapshot(), _useState = useState({ inst: {
    			value,
    			getSnapshot
    		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
    		useLayoutEffect(function() {
    			inst.value = value;
    			inst.getSnapshot = getSnapshot;
    			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    		}, [
    			subscribe,
    			value,
    			getSnapshot
    		]);
    		useEffect(function() {
    			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    			return subscribe(function() {
    				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    			});
    		}, [subscribe]);
    		useDebugValue(value);
    		return value;
    	}
    	function checkIfSnapshotChanged(inst) {
    		var latestGetSnapshot = inst.getSnapshot;
    		inst = inst.value;
    		try {
    			var nextValue = latestGetSnapshot();
    			return !objectIs(inst, nextValue);
    		} catch (error) {
    			return !0;
    		}
    	}
    	function useSyncExternalStore$1(subscribe, getSnapshot) {
    		return getSnapshot();
    	}
    	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    	exports.useSyncExternalStore = void 0 !== React$4.useSyncExternalStore ? React$4.useSyncExternalStore : shim;
    }));
    //#endregion
    //#region ../../node_modules/.pnpm/use-sync-external-store@1.7.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js
    var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = require_use_sync_external_store_shim_production();
    }));
    //#endregion
    //#region ../../node_modules/.pnpm/use-sync-external-store@1.7.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
    /**
    * @license React
    * use-sync-external-store-shim/with-selector.production.js
    *
    * Copyright (c) Meta Platforms, Inc. and affiliates.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    */
    var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
    	var React$3 = require("react");
    	var shim = require_shim();
    	function is(x, y) {
    		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    	}
    	var objectIs = "function" === typeof Object.is ? Object.is : is;
    	var useSyncExternalStore = shim.useSyncExternalStore;
    	var useRef = React$3.useRef;
    	var useEffect = React$3.useEffect;
    	var useMemo = React$3.useMemo;
    	var useDebugValue = React$3.useDebugValue;
    	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
    		var instRef = useRef(null);
    		if (null === instRef.current) {
    			var inst = {
    				hasValue: !1,
    				value: null
    			};
    			instRef.current = inst;
    		} else inst = instRef.current;
    		instRef = useMemo(function() {
    			function memoizedSelector(nextSnapshot) {
    				if (!hasMemo) {
    					hasMemo = !0;
    					memoizedSnapshot = nextSnapshot;
    					nextSnapshot = selector(nextSnapshot);
    					if (void 0 !== isEqual && inst.hasValue) {
    						var currentSelection = inst.value;
    						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
    					}
    					return memoizedSelection = nextSnapshot;
    				}
    				currentSelection = memoizedSelection;
    				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
    				var nextSelection = selector(nextSnapshot);
    				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
    				memoizedSnapshot = nextSnapshot;
    				return memoizedSelection = nextSelection;
    			}
    			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
    			return [function() {
    				return memoizedSelector(getSnapshot());
    			}, null === maybeGetServerSnapshot ? void 0 : function() {
    				return memoizedSelector(maybeGetServerSnapshot());
    			}];
    		}, [
    			getSnapshot,
    			getServerSnapshot,
    			selector,
    			isEqual
    		]);
    		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
    		useEffect(function() {
    			inst.hasValue = !0;
    			inst.value = value;
    		}, [value]);
    		useDebugValue(value);
    		return value;
    	};
    }));
    //#endregion
    //#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.1_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
    var import_with_selector = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = require_with_selector_production();
    })))(), 1);
    const createStoreImpl = (createState) => {
    	let state;
    	const listeners = /* @__PURE__ */ new Set();
    	const setState = (partial, replace) => {
    		const nextState = typeof partial === "function" ? partial(state) : partial;
    		if (!Object.is(nextState, state)) {
    			const previousState = state;
    			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
    			listeners.forEach((listener) => listener(state, previousState));
    		}
    	};
    	const getState = () => state;
    	const getInitialState = () => initialState;
    	const subscribe = (listener) => {
    		listeners.add(listener);
    		return () => listeners.delete(listener);
    	};
    	const destroy = () => {
    		if (({}.env ? "production" : void 0) !== "production") console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
    		listeners.clear();
    	};
    	const api = {
    		setState,
    		getState,
    		getInitialState,
    		subscribe,
    		destroy
    	};
    	const initialState = state = createState(setState, getState, api);
    	return api;
    };
    const createStore$1 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
    //#endregion
    //#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.1_react@18.3.1/node_modules/zustand/esm/traditional.mjs
    const { useDebugValue } = react.default;
    const { useSyncExternalStoreWithSelector } = import_with_selector.default;
    const identity = (arg) => arg;
    function useStoreWithEqualityFn(api, selector = identity, equalityFn) {
    	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
    	useDebugValue(slice);
    	return slice;
    }
    const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
    	const api = createStore$1(createState);
    	const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
    	Object.assign(useBoundStoreWithEqualityFn, api);
    	return useBoundStoreWithEqualityFn;
    };
    const createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
    //#endregion
    //#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.1_react@18.3.1/node_modules/zustand/esm/shallow.mjs
    function shallow$1(objA, objB) {
    	if (Object.is(objA, objB)) return true;
    	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
    	if (objA instanceof Map && objB instanceof Map) {
    		if (objA.size !== objB.size) return false;
    		for (const [key, value] of objA) if (!Object.is(value, objB.get(key))) return false;
    		return true;
    	}
    	if (objA instanceof Set && objB instanceof Set) {
    		if (objA.size !== objB.size) return false;
    		for (const value of objA) if (!objB.has(value)) return false;
    		return true;
    	}
    	const keysA = Object.keys(objA);
    	if (keysA.length !== Object.keys(objB).length) return false;
    	for (const keyA of keysA) if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) return false;
    	return true;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/@xyflow+react@12.11.6_@type_ca0dbc7b9733f00052c763335384622b/node_modules/@xyflow/react/dist/esm/index.js
    const StoreContext = (0, react.createContext)(null);
    const Provider$1 = StoreContext.Provider;
    const zustandErrorMessage = errorMessages["error001"]("react");
    /**
    * This hook can be used to subscribe to internal state changes of the React Flow
    * component. The `useStore` hook is re-exported from the [Zustand](https://github.com/pmndrs/zustand)
    * state management library, so you should check out their docs for more details.
    *
    * @public
    * @param selector - A selector function that returns a slice of the flow's internal state.
    * Extracting or transforming just the state you need is a good practice to avoid unnecessary
    * re-renders.
    * @param equalityFn - A function to compare the previous and next value. This is incredibly useful
    * for preventing unnecessary re-renders. Good sensible defaults are using `Object.is` or importing
    * `zustand/shallow`, but you can be as granular as you like.
    * @returns The selected state slice.
    *
    * @example
    * ```ts
    * const nodes = useStore((state) => state.nodes);
    * ```
    *
    * @remarks This hook should only be used if there is no other way to access the internal
    * state. For many of the common use cases, there are dedicated hooks available
    * such as {@link useReactFlow}, {@link useViewport}, etc.
    */
    function useStore(selector, equalityFn) {
    	const store = (0, react.useContext)(StoreContext);
    	if (store === null) throw new Error(zustandErrorMessage);
    	return useStoreWithEqualityFn(store, selector, equalityFn);
    }
    /**
    * In some cases, you might need to access the store directly. This hook returns the store object which can be used on demand to access the state or dispatch actions.
    *
    * @returns The store object.
    * @example
    * ```ts
    * const store = useStoreApi();
    * ```
    *
    * @remarks This hook should only be used if there is no other way to access the internal
    * state. For many of the common use cases, there are dedicated hooks available
    * such as {@link useReactFlow}, {@link useViewport}, etc.
    */
    function useStoreApi() {
    	const store = (0, react.useContext)(StoreContext);
    	if (store === null) throw new Error(zustandErrorMessage);
    	return (0, react.useMemo)(() => ({
    		getState: store.getState,
    		setState: store.setState,
    		subscribe: store.subscribe
    	}), [store]);
    }
    const style = { display: "none" };
    const ariaLiveStyle = {
    	position: "absolute",
    	width: 1,
    	height: 1,
    	margin: -1,
    	border: 0,
    	padding: 0,
    	overflow: "hidden",
    	clip: "rect(0px, 0px, 0px, 0px)",
    	clipPath: "inset(100%)"
    };
    const ARIA_NODE_DESC_KEY = "react-flow__node-desc";
    const ARIA_EDGE_DESC_KEY = "react-flow__edge-desc";
    const ARIA_LIVE_MESSAGE = "react-flow__aria-live";
    const ariaLiveSelector = (s) => s.ariaLiveMessage;
    const ariaLabelConfigSelector = (s) => s.ariaLabelConfig;
    function AriaLiveMessage({ rfId }) {
    	const ariaLiveMessage = useStore(ariaLiveSelector);
    	return (0, react_jsx_runtime.jsx)("div", {
    		id: `${ARIA_LIVE_MESSAGE}-${rfId}`,
    		"aria-live": "assertive",
    		"aria-atomic": "true",
    		style: ariaLiveStyle,
    		children: ariaLiveMessage
    	});
    }
    function A11yDescriptions({ rfId, disableKeyboardA11y }) {
    	const ariaLabelConfig = useStore(ariaLabelConfigSelector);
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    		(0, react_jsx_runtime.jsx)("div", {
    			id: `${ARIA_NODE_DESC_KEY}-${rfId}`,
    			style,
    			children: disableKeyboardA11y ? ariaLabelConfig["node.a11yDescription.default"] : ariaLabelConfig["node.a11yDescription.keyboardDisabled"]
    		}),
    		(0, react_jsx_runtime.jsx)("div", {
    			id: `${ARIA_EDGE_DESC_KEY}-${rfId}`,
    			style,
    			children: ariaLabelConfig["edge.a11yDescription.default"]
    		}),
    		!disableKeyboardA11y && (0, react_jsx_runtime.jsx)(AriaLiveMessage, { rfId })
    	] });
    }
    /**
    * The `<Panel />` component helps you position content above the viewport.
    * It is used internally by the [`<MiniMap />`](/api-reference/components/minimap)
    * and [`<Controls />`](/api-reference/components/controls) components.
    *
    * @public
    *
    * @example
    * ```jsx
    *import { ReactFlow, Background, Panel } from '@xyflow/react';
    *
    *export default function Flow() {
    *  return (
    *    <ReactFlow nodes={[]} fitView>
    *      <Panel position="top-left">top-left</Panel>
    *      <Panel position="top-center">top-center</Panel>
    *      <Panel position="top-right">top-right</Panel>
    *      <Panel position="bottom-left">bottom-left</Panel>
    *      <Panel position="bottom-center">bottom-center</Panel>
    *      <Panel position="bottom-right">bottom-right</Panel>
    *    </ReactFlow>
    *  );
    *}
    *```
    */
    const Panel = (0, react.forwardRef)(({ position = "top-left", children, className, style, ...rest }, ref) => {
    	const positionClasses = `${position}`.split("-");
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: cc([
    			"react-flow__panel",
    			className,
    			...positionClasses
    		]),
    		style,
    		ref,
    		...rest,
    		children
    	});
    });
    Panel.displayName = "Panel";
    const link = `https://reactflow.dev?utm_source=attribution`;
    /**
    * React Flow is independent and entirely funded by its users.
    * If you hide the attribution, please support our work by subscribing to React Flow Pro: https://reactflow.dev/remove-attribution
    */
    function Attribution({ proOptions, position = "bottom-right" }) {
    	(0, react.useEffect)(() => {}, []);
    	if (proOptions?.hideAttribution) return null;
    	return (0, react_jsx_runtime.jsx)(Panel, {
    		position,
    		className: "react-flow__attribution",
    		"data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${link}`,
    		children: (0, react_jsx_runtime.jsx)("a", {
    			href: link,
    			target: "_blank",
    			rel: "noopener noreferrer",
    			"aria-label": "React Flow attribution",
    			children: "React Flow"
    		})
    	});
    }
    const selector$l = (s) => {
    	const selectedNodes = [];
    	const selectedEdges = [];
    	for (const [, node] of s.nodeLookup) if (node.selected) selectedNodes.push(node.internals.userNode);
    	for (const [, edge] of s.edgeLookup) if (edge.selected) selectedEdges.push(edge);
    	return {
    		selectedNodes,
    		selectedEdges
    	};
    };
    const selectId = (obj) => obj.id;
    function areEqual$1(a, b) {
    	return shallow$1(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) && shallow$1(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId));
    }
    function SelectionListenerInner({ onSelectionChange }) {
    	const store = useStoreApi();
    	const { selectedNodes, selectedEdges } = useStore(selector$l, areEqual$1);
    	(0, react.useEffect)(() => {
    		const params = {
    			nodes: selectedNodes,
    			edges: selectedEdges
    		};
    		onSelectionChange?.(params);
    		store.getState().onSelectionChangeHandlers.forEach((fn) => fn(params));
    	}, [
    		selectedNodes,
    		selectedEdges,
    		onSelectionChange
    	]);
    	return null;
    }
    const changeSelector = (s) => !!s.onSelectionChangeHandlers;
    function SelectionListener({ onSelectionChange }) {
    	const storeHasSelectionChangeHandlers = useStore(changeSelector);
    	if (onSelectionChange || storeHasSelectionChangeHandlers) return (0, react_jsx_runtime.jsx)(SelectionListenerInner, { onSelectionChange });
    	return null;
    }
    const defaultNodeOrigin = [0, 0];
    const defaultViewport = {
    	x: 0,
    	y: 0,
    	zoom: 1
    };
    const fieldsToTrack = [...[
    	"nodes",
    	"edges",
    	"defaultNodes",
    	"defaultEdges",
    	"onConnect",
    	"onConnectStart",
    	"onConnectEnd",
    	"onClickConnectStart",
    	"onClickConnectEnd",
    	"nodesDraggable",
    	"autoPanOnNodeFocus",
    	"nodesConnectable",
    	"nodesFocusable",
    	"edgesFocusable",
    	"edgesReconnectable",
    	"elevateNodesOnSelect",
    	"elevateEdgesOnSelect",
    	"minZoom",
    	"maxZoom",
    	"nodeExtent",
    	"onNodesChange",
    	"onEdgesChange",
    	"elementsSelectable",
    	"connectionMode",
    	"snapGrid",
    	"snapToGrid",
    	"translateExtent",
    	"connectOnClick",
    	"defaultEdgeOptions",
    	"fitView",
    	"fitViewOptions",
    	"onNodesDelete",
    	"onEdgesDelete",
    	"onDelete",
    	"onNodeDrag",
    	"onNodeDragStart",
    	"onNodeDragStop",
    	"onSelectionDrag",
    	"onSelectionDragStart",
    	"onSelectionDragStop",
    	"onMoveStart",
    	"onMove",
    	"onMoveEnd",
    	"noPanClassName",
    	"nodeOrigin",
    	"autoPanOnConnect",
    	"autoPanOnNodeDrag",
    	"onError",
    	"connectionRadius",
    	"isValidConnection",
    	"selectNodesOnDrag",
    	"nodeDragThreshold",
    	"connectionDragThreshold",
    	"onBeforeDelete",
    	"debug",
    	"autoPanSpeed",
    	"ariaLabelConfig",
    	"zIndexMode"
    ], "rfId"];
    const selector$k = (s) => ({
    	setNodes: s.setNodes,
    	setEdges: s.setEdges,
    	setMinZoom: s.setMinZoom,
    	setMaxZoom: s.setMaxZoom,
    	setTranslateExtent: s.setTranslateExtent,
    	setNodeExtent: s.setNodeExtent,
    	reset: s.reset,
    	setDefaultNodesAndEdges: s.setDefaultNodesAndEdges
    });
    const initPrevValues = {
    	translateExtent: infiniteExtent,
    	nodeOrigin: defaultNodeOrigin,
    	minZoom: .5,
    	maxZoom: 2,
    	elementsSelectable: true,
    	noPanClassName: "nopan",
    	rfId: "1"
    };
    function StoreUpdater(props) {
    	const { setNodes, setEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset, setDefaultNodesAndEdges } = useStore(selector$k, shallow$1);
    	const store = useStoreApi();
    	(0, react.useEffect)(() => {
    		setDefaultNodesAndEdges(props.defaultNodes, props.defaultEdges);
    		return () => {
    			previousFields.current = initPrevValues;
    			reset();
    		};
    	}, []);
    	const previousFields = (0, react.useRef)(initPrevValues);
    	(0, react.useEffect)(() => {
    		for (const fieldName of fieldsToTrack) {
    			const fieldValue = props[fieldName];
    			if (fieldValue === previousFields.current[fieldName]) continue;
    			if (typeof props[fieldName] === "undefined") continue;
    			if (fieldName === "nodes") setNodes(fieldValue);
    			else if (fieldName === "edges") setEdges(fieldValue);
    			else if (fieldName === "minZoom") setMinZoom(fieldValue);
    			else if (fieldName === "maxZoom") setMaxZoom(fieldValue);
    			else if (fieldName === "translateExtent") setTranslateExtent(fieldValue);
    			else if (fieldName === "nodeExtent") setNodeExtent(fieldValue);
    			else if (fieldName === "ariaLabelConfig") store.setState({ ariaLabelConfig: mergeAriaLabelConfig(fieldValue) });
    			else if (fieldName === "fitView") store.setState({ fitViewQueued: fieldValue });
    			else if (fieldName === "fitViewOptions") store.setState({ fitViewOptions: fieldValue });
    			else store.setState({ [fieldName]: fieldValue });
    		}
    		previousFields.current = props;
    	}, fieldsToTrack.map((fieldName) => props[fieldName]));
    	return null;
    }
    function getMediaQuery() {
    	if (typeof window === "undefined" || !window.matchMedia) return null;
    	return window.matchMedia("(prefers-color-scheme: dark)");
    }
    /**
    * Hook for receiving the current color mode class 'dark' or 'light'.
    *
    * @internal
    * @param colorMode - The color mode to use ('dark', 'light' or 'system')
    */
    function useColorModeClass(colorMode) {
    	const [colorModeClass, setColorModeClass] = (0, react.useState)(colorMode === "system" ? null : colorMode);
    	(0, react.useEffect)(() => {
    		if (colorMode !== "system") {
    			setColorModeClass(colorMode);
    			return;
    		}
    		const mediaQuery = getMediaQuery();
    		const updateColorModeClass = () => setColorModeClass(mediaQuery?.matches ? "dark" : "light");
    		updateColorModeClass();
    		mediaQuery?.addEventListener("change", updateColorModeClass);
    		return () => {
    			mediaQuery?.removeEventListener("change", updateColorModeClass);
    		};
    	}, [colorMode]);
    	return colorModeClass !== null ? colorModeClass : getMediaQuery()?.matches ? "dark" : "light";
    }
    const defaultDoc = typeof document !== "undefined" ? document : null;
    /**
    * This hook lets you listen for specific key codes and tells you whether they are
    * currently pressed or not.
    *
    * @public
    * @param options - Options
    *
    * @example
    * ```tsx
    *import { useKeyPress } from '@xyflow/react';
    *
    *export default function () {
    *  const spacePressed = useKeyPress('Space');
    *  const cmdAndSPressed = useKeyPress(['Meta+s', 'Strg+s']);
    *
    *  return (
    *    <div>
    *     {spacePressed && <p>Space pressed!</p>}
    *     {cmdAndSPressed && <p>Cmd + S pressed!</p>}
    *    </div>
    *  );
    *}
    *```
    */
    function useKeyPress(keyCode = null, options = {
    	target: defaultDoc,
    	actInsideInputWithModifier: true
    }) {
    	const [keyPressed, setKeyPressed] = (0, react.useState)(false);
    	const modifierPressed = (0, react.useRef)(false);
    	const pressedKeys = (0, react.useRef)(/* @__PURE__ */ new Set([]));
    	const [keyCodes, keysToWatch] = (0, react.useMemo)(() => {
    		if (keyCode !== null) {
    			const keys = (Array.isArray(keyCode) ? keyCode : [keyCode]).filter((kc) => typeof kc === "string").map((kc) => kc.replace(/\+/g, "\n").replace("\n\n", "\n+").split("\n"));
    			return [keys, keys.reduce((res, item) => res.concat(...item), [])];
    		}
    		return [[], []];
    	}, [keyCode]);
    	(0, react.useEffect)(() => {
    		const target = options?.target ?? defaultDoc;
    		const actInsideInputWithModifier = options?.actInsideInputWithModifier ?? true;
    		if (keyCode !== null) {
    			const downHandler = (event) => {
    				modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
    				if ((!modifierPressed.current || modifierPressed.current && !actInsideInputWithModifier) && isInputDOMNode(event)) return false;
    				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
    				pressedKeys.current.add(event[keyOrCode]);
    				if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
    					const target = event.composedPath?.()?.[0] || event.target;
    					const isInteractiveElement = target?.nodeName === "BUTTON" || target?.nodeName === "A";
    					if (options.preventDefault !== false && (modifierPressed.current || !isInteractiveElement)) event.preventDefault();
    					setKeyPressed(true);
    				}
    			};
    			const upHandler = (event) => {
    				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
    				if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
    					setKeyPressed(false);
    					pressedKeys.current.clear();
    				} else pressedKeys.current.delete(event[keyOrCode]);
    				if (event.key === "Meta") pressedKeys.current.clear();
    				modifierPressed.current = false;
    			};
    			const resetHandler = () => {
    				pressedKeys.current.clear();
    				setKeyPressed(false);
    			};
    			target?.addEventListener("keydown", downHandler);
    			target?.addEventListener("keyup", upHandler);
    			window.addEventListener("blur", resetHandler);
    			window.addEventListener("contextmenu", resetHandler);
    			return () => {
    				target?.removeEventListener("keydown", downHandler);
    				target?.removeEventListener("keyup", upHandler);
    				window.removeEventListener("blur", resetHandler);
    				window.removeEventListener("contextmenu", resetHandler);
    			};
    		}
    	}, [keyCode, setKeyPressed]);
    	return keyPressed;
    }
    function isMatchingKey(keyCodes, pressedKeys, isUp) {
    	return keyCodes.filter((keys) => isUp || keys.length === pressedKeys.size).some((keys) => keys.every((k) => pressedKeys.has(k)));
    }
    function useKeyOrCode(eventCode, keysToWatch) {
    	return keysToWatch.includes(eventCode) ? "code" : "key";
    }
    /**
    * Hook for getting viewport helper functions.
    *
    * @internal
    * @returns viewport helper functions
    */
    const useViewportHelper = () => {
    	const store = useStoreApi();
    	return (0, react.useMemo)(() => {
    		return {
    			zoomIn: async (options) => {
    				const { panZoom } = store.getState();
    				return panZoom ? panZoom.scaleBy(1.2, options) : false;
    			},
    			zoomOut: async (options) => {
    				const { panZoom } = store.getState();
    				return panZoom ? panZoom.scaleBy(1 / 1.2, options) : false;
    			},
    			zoomTo: async (zoomLevel, options) => {
    				const { panZoom } = store.getState();
    				return panZoom ? panZoom.scaleTo(zoomLevel, options) : false;
    			},
    			getZoom: () => store.getState().transform[2],
    			setViewport: async (viewport, options) => {
    				const { transform: [tX, tY, tZoom], panZoom } = store.getState();
    				if (!panZoom) return false;
    				await panZoom.setViewport({
    					x: viewport.x ?? tX,
    					y: viewport.y ?? tY,
    					zoom: viewport.zoom ?? tZoom
    				}, options);
    				return true;
    			},
    			getViewport: () => {
    				const [x, y, zoom] = store.getState().transform;
    				return {
    					x,
    					y,
    					zoom
    				};
    			},
    			setCenter: async (x, y, options) => {
    				return store.getState().setCenter(x, y, options);
    			},
    			fitBounds: async (bounds, options) => {
    				const { width, height, minZoom, maxZoom, panZoom } = store.getState();
    				const viewport = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? .1);
    				if (!panZoom) return false;
    				await panZoom.setViewport(viewport, {
    					duration: options?.duration,
    					ease: options?.ease,
    					interpolate: options?.interpolate
    				});
    				return true;
    			},
    			screenToFlowPosition: (clientPosition, options = {}) => {
    				const { transform, snapGrid, snapToGrid, domNode } = store.getState();
    				if (!domNode) return clientPosition;
    				const { x: domX, y: domY } = domNode.getBoundingClientRect();
    				const correctedPosition = {
    					x: clientPosition.x - domX,
    					y: clientPosition.y - domY
    				};
    				const _snapGrid = options.snapGrid ?? snapGrid;
    				const _snapToGrid = options.snapToGrid ?? snapToGrid;
    				return pointToRendererPoint(correctedPosition, transform, _snapToGrid, _snapGrid);
    			},
    			flowToScreenPosition: (flowPosition) => {
    				const { transform, domNode } = store.getState();
    				if (!domNode) return flowPosition;
    				const { x: domX, y: domY } = domNode.getBoundingClientRect();
    				const rendererPosition = rendererPointToPoint(flowPosition, transform);
    				return {
    					x: rendererPosition.x + domX,
    					y: rendererPosition.y + domY
    				};
    			}
    		};
    	}, []);
    };
    function applyChanges(changes, elements) {
    	const updatedElements = [];
    	const changesMap = /* @__PURE__ */ new Map();
    	const addItemChanges = [];
    	for (const change of changes) if (change.type === "add") {
    		addItemChanges.push(change);
    		continue;
    	} else if (change.type === "remove" || change.type === "replace") changesMap.set(change.id, [change]);
    	else {
    		const elementChanges = changesMap.get(change.id);
    		if (elementChanges) elementChanges.push(change);
    		else changesMap.set(change.id, [change]);
    	}
    	for (const element of elements) {
    		const changes = changesMap.get(element.id);
    		if (!changes) {
    			updatedElements.push(element);
    			continue;
    		}
    		if (changes[0].type === "remove") continue;
    		if (changes[0].type === "replace") {
    			updatedElements.push({ ...changes[0].item });
    			continue;
    		}
    		/**
    		* For other types of changes, we want to start with a shallow copy of the
    		* object so React knows this element has changed. Sequential changes will
    		* each _mutate_ this object, so there's only ever one copy.
    		*/
    		const updatedElement = { ...element };
    		for (const change of changes) applyChange(change, updatedElement);
    		updatedElements.push(updatedElement);
    	}
    	if (addItemChanges.length) addItemChanges.forEach((change) => {
    		if (change.index !== void 0) updatedElements.splice(change.index, 0, { ...change.item });
    		else updatedElements.push({ ...change.item });
    	});
    	return updatedElements;
    }
    function applyChange(change, element) {
    	switch (change.type) {
    		case "select":
    			element.selected = change.selected;
    			break;
    		case "position":
    			if (typeof change.position !== "undefined") element.position = change.position;
    			if (typeof change.dragging !== "undefined") element.dragging = change.dragging;
    			break;
    		case "dimensions":
    			if (typeof change.dimensions !== "undefined") {
    				element.measured = { ...change.dimensions };
    				if (change.setAttributes) {
    					if (change.setAttributes === true || change.setAttributes === "width") element.width = change.dimensions.width;
    					if (change.setAttributes === true || change.setAttributes === "height") element.height = change.dimensions.height;
    				}
    			}
    			if (typeof change.resizing === "boolean") element.resizing = change.resizing;
    	}
    }
    /**
    * Drop in function that applies node changes to an array of nodes.
    * @public
    * @param changes - Array of changes to apply.
    * @param nodes - Array of nodes to apply the changes to.
    * @returns Array of updated nodes.
    * @example
    *```tsx
    *import { useState, useCallback } from 'react';
    *import { ReactFlow, applyNodeChanges, type Node, type Edge, type OnNodesChange } from '@xyflow/react';
    *
    *export default function Flow() {
    *  const [nodes, setNodes] = useState<Node[]>([]);
    *  const [edges, setEdges] = useState<Edge[]>([]);
    *  const onNodesChange: OnNodesChange = useCallback(
    *    (changes) => {
    *      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
    *    },
    *    [setNodes],
    *  );
    *
    *  return (
    *    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} />
    *  );
    *}
    *```
    * @remarks Various events on the <ReactFlow /> component can produce an {@link NodeChange}
    * that describes how to update the edges of your flow in some way.
    * If you don't need any custom behaviour, this util can be used to take an array
    * of these changes and apply them to your edges.
    */
    function applyNodeChanges(changes, nodes) {
    	return applyChanges(changes, nodes);
    }
    /**
    * Drop in function that applies edge changes to an array of edges.
    * @public
    * @param changes - Array of changes to apply.
    * @param edges - Array of edge to apply the changes to.
    * @returns Array of updated edges.
    * @example
    * ```tsx
    *import { useState, useCallback } from 'react';
    *import { ReactFlow, applyEdgeChanges } from '@xyflow/react';
    *
    *export default function Flow() {
    *  const [nodes, setNodes] = useState([]);
    *  const [edges, setEdges] = useState([]);
    *  const onEdgesChange = useCallback(
    *    (changes) => {
    *      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    *    },
    *    [setEdges],
    *  );
    *
    *  return (
    *    <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} />
    *  );
    *}
    *```
    * @remarks Various events on the <ReactFlow /> component can produce an {@link EdgeChange}
    * that describes how to update the edges of your flow in some way.
    * If you don't need any custom behaviour, this util can be used to take an array
    * of these changes and apply them to your edges.
    */
    function applyEdgeChanges(changes, edges) {
    	return applyChanges(changes, edges);
    }
    function createSelectionChange(id, selected) {
    	return {
    		id,
    		type: "select",
    		selected
    	};
    }
    function getSelectionChanges(items, selectedIds = /* @__PURE__ */ new Set(), mutateItem = false) {
    	const changes = [];
    	for (const [id, item] of items) {
    		const willBeSelected = selectedIds.has(id);
    		if (!(item.selected === void 0 && !willBeSelected) && item.selected !== willBeSelected) {
    			if (mutateItem) item.selected = willBeSelected;
    			changes.push(createSelectionChange(item.id, willBeSelected));
    		}
    	}
    	return changes;
    }
    function getElementsDiffChanges({ items = [], lookup }) {
    	const changes = [];
    	const itemsLookup = new Map(items.map((item) => [item.id, item]));
    	for (const [index, item] of items.entries()) {
    		const lookupItem = lookup.get(item.id);
    		const storeItem = lookupItem?.internals?.userNode ?? lookupItem;
    		if (storeItem !== void 0 && storeItem !== item) changes.push({
    			id: item.id,
    			item,
    			type: "replace"
    		});
    		if (storeItem === void 0) changes.push({
    			item,
    			type: "add",
    			index
    		});
    	}
    	for (const [id] of lookup) if (itemsLookup.get(id) === void 0) changes.push({
    		id,
    		type: "remove"
    	});
    	return changes;
    }
    function elementToRemoveChange(item) {
    	return {
    		id: item.id,
    		type: "remove"
    	};
    }
    const defaultOnError = createDevWarn("React Flow", "https://reactflow.dev/");
    function addEdge(edgeParams, edges, options = {}) {
    	return addEdge$1(edgeParams, edges, {
    		...options,
    		onError: options.onError ?? defaultOnError
    	});
    }
    /**
    * Test whether an object is usable as an [`Node`](/api-reference/types/node).
    * In TypeScript this is a type guard that will narrow the type of whatever you pass in to
    * [`Node`](/api-reference/types/node) if it returns `true`.
    *
    * @public
    * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
    * @param element - The element to test.
    * @returns Tests whether the provided value can be used as a `Node`. If you're using TypeScript,
    * this function acts as a type guard and will narrow the type of the value to `Node` if it returns
    * `true`.
    *
    * @example
    * ```js
    *import { isNode } from '@xyflow/react';
    *
    *if (isNode(node)) {
    * // ...
    *}
    *```
    */
    const isNode = (element) => isNodeBase(element);
    /**
    * Test whether an object is usable as an [`Edge`](/api-reference/types/edge).
    * In TypeScript this is a type guard that will narrow the type of whatever you pass in to
    * [`Edge`](/api-reference/types/edge) if it returns `true`.
    *
    * @public
    * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
    * @param element - The element to test
    * @returns Tests whether the provided value can be used as an `Edge`. If you're using TypeScript,
    * this function acts as a type guard and will narrow the type of the value to `Edge` if it returns
    * `true`.
    *
    * @example
    * ```js
    *import { isEdge } from '@xyflow/react';
    *
    *if (isEdge(edge)) {
    * // ...
    *}
    *```
    */
    const isEdge = (element) => isEdgeBase(element);
    function fixedForwardRef(render) {
    	return (0, react.forwardRef)(render);
    }
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
    /**
    * This hook returns a queue that can be used to batch updates.
    *
    * @param runQueue - a function that gets called when the queue is flushed
    * @internal
    *
    * @returns a Queue object
    */
    function useQueue(runQueue) {
    	const [serial, setSerial] = (0, react.useState)(BigInt(0));
    	const [queue] = (0, react.useState)(() => createQueue(() => setSerial((n) => n + BigInt(1))));
    	useIsomorphicLayoutEffect(() => {
    		const queueItems = queue.get();
    		if (queueItems.length) {
    			runQueue(queueItems);
    			queue.reset();
    		}
    	}, [serial]);
    	return queue;
    }
    function createQueue(cb) {
    	let queue = [];
    	return {
    		get: () => queue,
    		reset: () => {
    			queue = [];
    		},
    		push: (item) => {
    			queue.push(item);
    			cb();
    		}
    	};
    }
    const BatchContext = (0, react.createContext)(null);
    /**
    * This is a context provider that holds and processes the node and edge update queues
    * that are needed to handle setNodes, addNodes, setEdges and addEdges.
    *
    * @internal
    */
    function BatchProvider({ children }) {
    	const store = useStoreApi();
    	const nodeQueue = useQueue((0, react.useCallback)((queueItems) => {
    		const { nodes = [], setNodes, hasDefaultNodes, onNodesChange, nodeLookup, fitViewQueued, onNodesChangeMiddlewareMap } = store.getState();
    		let next = nodes;
    		for (const payload of queueItems) next = typeof payload === "function" ? payload(next) : payload;
    		let changes = getElementsDiffChanges({
    			items: next,
    			lookup: nodeLookup
    		});
    		for (const middleware of onNodesChangeMiddlewareMap.values()) changes = middleware(changes);
    		if (hasDefaultNodes) setNodes(next);
    		if (changes.length > 0) onNodesChange?.(changes);
    		else if (fitViewQueued) window.requestAnimationFrame(() => {
    			const { fitViewQueued, nodes, setNodes } = store.getState();
    			if (fitViewQueued) setNodes(nodes);
    		});
    	}, []));
    	const edgeQueue = useQueue((0, react.useCallback)((queueItems) => {
    		const { edges = [], setEdges, hasDefaultEdges, onEdgesChange, edgeLookup } = store.getState();
    		let next = edges;
    		for (const payload of queueItems) next = typeof payload === "function" ? payload(next) : payload;
    		if (hasDefaultEdges) setEdges(next);
    		else if (onEdgesChange) onEdgesChange(getElementsDiffChanges({
    			items: next,
    			lookup: edgeLookup
    		}));
    	}, []));
    	const value = (0, react.useMemo)(() => ({
    		nodeQueue,
    		edgeQueue
    	}), []);
    	return (0, react_jsx_runtime.jsx)(BatchContext.Provider, {
    		value,
    		children
    	});
    }
    function useBatchContext() {
    	const batchContext = (0, react.useContext)(BatchContext);
    	if (!batchContext) throw new Error("useBatchContext must be used within a BatchProvider");
    	return batchContext;
    }
    const selector$j = (s) => !!s.panZoom;
    /**
    * This hook returns a ReactFlowInstance that can be used to update nodes and edges, manipulate the viewport, or query the current state of the flow.
    *
    * @public
    * @example
    * ```jsx
    *import { useCallback, useState } from 'react';
    *import { useReactFlow } from '@xyflow/react';
    *
    *export function NodeCounter() {
    *  const reactFlow = useReactFlow();
    *  const [count, setCount] = useState(0);
    *  const countNodes = useCallback(() => {
    *    setCount(reactFlow.getNodes().length);
    *    // you need to pass it as a dependency if you are using it with useEffect or useCallback
    *    // because at the first render, it's not initialized yet and some functions might not work.
    *  }, [reactFlow]);
    *
    *  return (
    *    <div>
    *      <button onClick={countNodes}>Update count</button>
    *      <p>There are {count} nodes in the flow.</p>
    *    </div>
    *  );
    *}
    *```
    */
    function useReactFlow() {
    	const viewportHelper = useViewportHelper();
    	const store = useStoreApi();
    	const batchContext = useBatchContext();
    	const viewportInitialized = useStore(selector$j);
    	const generalHelper = (0, react.useMemo)(() => {
    		const getInternalNode = (id) => store.getState().nodeLookup.get(id);
    		const setNodes = (payload) => {
    			batchContext.nodeQueue.push(payload);
    		};
    		const setEdges = (payload) => {
    			batchContext.edgeQueue.push(payload);
    		};
    		const getNodeRect = (node) => {
    			const { nodeLookup, nodeOrigin } = store.getState();
    			const nodeToUse = isNode(node) ? node : nodeLookup.get(node.id);
    			const position = nodeToUse.parentId ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, nodeLookup, nodeOrigin) : nodeToUse.position;
    			const nodeWithPosition = {
    				...nodeToUse,
    				position,
    				width: nodeToUse.measured?.width ?? nodeToUse.width,
    				height: nodeToUse.measured?.height ?? nodeToUse.height
    			};
    			return nodeToRect(nodeWithPosition);
    		};
    		const updateNode = (id, nodeUpdate, options = { replace: false }) => {
    			setNodes((prevNodes) => prevNodes.map((node) => {
    				if (node.id === id) {
    					const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
    					return options.replace && isNode(nextNode) ? nextNode : {
    						...node,
    						...nextNode
    					};
    				}
    				return node;
    			}));
    		};
    		const updateEdge = (id, edgeUpdate, options = { replace: false }) => {
    			setEdges((prevEdges) => prevEdges.map((edge) => {
    				if (edge.id === id) {
    					const nextEdge = typeof edgeUpdate === "function" ? edgeUpdate(edge) : edgeUpdate;
    					return options.replace && isEdge(nextEdge) ? nextEdge : {
    						...edge,
    						...nextEdge
    					};
    				}
    				return edge;
    			}));
    		};
    		return {
    			getNodes: () => store.getState().nodes.map((n) => ({ ...n })),
    			getNode: (id) => getInternalNode(id)?.internals.userNode,
    			getInternalNode,
    			getEdges: () => {
    				const { edges = [] } = store.getState();
    				return edges.map((e) => ({ ...e }));
    			},
    			getEdge: (id) => store.getState().edgeLookup.get(id),
    			setNodes,
    			setEdges,
    			addNodes: (payload) => {
    				const newNodes = Array.isArray(payload) ? payload : [payload];
    				batchContext.nodeQueue.push((nodes) => [...nodes, ...newNodes]);
    			},
    			addEdges: (payload) => {
    				const newEdges = Array.isArray(payload) ? payload : [payload];
    				batchContext.edgeQueue.push((edges) => [...edges, ...newEdges]);
    			},
    			toObject: () => {
    				const { nodes = [], edges = [], transform } = store.getState();
    				const [x, y, zoom] = transform;
    				return {
    					nodes: nodes.map((n) => ({ ...n })),
    					edges: edges.map((e) => ({ ...e })),
    					viewport: {
    						x,
    						y,
    						zoom
    					}
    				};
    			},
    			deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
    				const { nodes, edges, onNodesDelete, onEdgesDelete, triggerNodeChanges, triggerEdgeChanges, onDelete, onBeforeDelete } = store.getState();
    				const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
    					nodesToRemove,
    					edgesToRemove,
    					nodes,
    					edges,
    					onBeforeDelete
    				});
    				const hasMatchingEdges = matchingEdges.length > 0;
    				const hasMatchingNodes = matchingNodes.length > 0;
    				if (hasMatchingEdges) {
    					const edgeChanges = matchingEdges.map(elementToRemoveChange);
    					onEdgesDelete?.(matchingEdges);
    					triggerEdgeChanges(edgeChanges);
    				}
    				if (hasMatchingNodes) {
    					const nodeChanges = matchingNodes.map(elementToRemoveChange);
    					onNodesDelete?.(matchingNodes);
    					triggerNodeChanges(nodeChanges);
    				}
    				if (hasMatchingNodes || hasMatchingEdges) onDelete?.({
    					nodes: matchingNodes,
    					edges: matchingEdges
    				});
    				return {
    					deletedNodes: matchingNodes,
    					deletedEdges: matchingEdges
    				};
    			},
    			/**
    			* Partial is defined as "the 2 nodes/areas are intersecting partially".
    			* If a is contained in b or b is contained in a, they are both
    			* considered fully intersecting.
    			*/
    			getIntersectingNodes: (nodeOrRect, partially = true, nodes) => {
    				const isRect = isRectObject(nodeOrRect);
    				const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
    				const hasNodesOption = nodes !== void 0;
    				if (!nodeRect) return [];
    				return (nodes || store.getState().nodes).filter((n) => {
    					const internalNode = store.getState().nodeLookup.get(n.id);
    					if (internalNode && !isRect && (n.id === nodeOrRect.id || !internalNode.internals.positionAbsolute)) return false;
    					const currNodeRect = nodeToRect(hasNodesOption ? n : internalNode);
    					const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
    					return partially && overlappingArea > 0 || overlappingArea >= currNodeRect.width * currNodeRect.height || overlappingArea >= nodeRect.width * nodeRect.height;
    				});
    			},
    			isNodeIntersecting: (nodeOrRect, area, partially = true) => {
    				const nodeRect = isRectObject(nodeOrRect) ? nodeOrRect : getNodeRect(nodeOrRect);
    				if (!nodeRect) return false;
    				const overlappingArea = getOverlappingArea(nodeRect, area);
    				return partially && overlappingArea > 0 || overlappingArea >= area.width * area.height || overlappingArea >= nodeRect.width * nodeRect.height;
    			},
    			updateNode,
    			updateNodeData: (id, dataUpdate, options = { replace: false }) => {
    				updateNode(id, (node) => {
    					const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
    					return options.replace ? {
    						...node,
    						data: nextData
    					} : {
    						...node,
    						data: {
    							...node.data,
    							...nextData
    						}
    					};
    				}, options);
    			},
    			updateEdge,
    			updateEdgeData: (id, dataUpdate, options = { replace: false }) => {
    				updateEdge(id, (edge) => {
    					const nextData = typeof dataUpdate === "function" ? dataUpdate(edge) : dataUpdate;
    					return options.replace ? {
    						...edge,
    						data: nextData
    					} : {
    						...edge,
    						data: {
    							...edge.data,
    							...nextData
    						}
    					};
    				}, options);
    			},
    			getNodesBounds: (nodes) => {
    				const { nodeLookup, nodeOrigin } = store.getState();
    				return getNodesBounds(nodes, {
    					nodeLookup,
    					nodeOrigin
    				});
    			},
    			getHandleConnections: ({ type, id, nodeId }) => Array.from(store.getState().connectionLookup.get(`${nodeId}-${type}${id ? `-${id}` : ""}`)?.values() ?? []),
    			getNodeConnections: ({ type, handleId, nodeId }) => Array.from(store.getState().connectionLookup.get(`${nodeId}${type ? handleId ? `-${type}-${handleId}` : `-${type}` : ""}`)?.values() ?? []),
    			fitView: async (options) => {
    				const fitViewResolver = store.getState().fitViewResolver ?? withResolvers();
    				store.setState({
    					fitViewQueued: true,
    					fitViewOptions: options,
    					fitViewResolver
    				});
    				batchContext.nodeQueue.push((nodes) => [...nodes]);
    				return fitViewResolver.promise;
    			}
    		};
    	}, []);
    	return (0, react.useMemo)(() => {
    		return {
    			...generalHelper,
    			...viewportHelper,
    			viewportInitialized
    		};
    	}, [viewportInitialized]);
    }
    const selected = (item) => item.selected;
    const win$1 = typeof window !== "undefined" ? window : void 0;
    /**
    * Hook for handling global key events.
    *
    * @internal
    */
    function useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode }) {
    	const store = useStoreApi();
    	const { deleteElements } = useReactFlow();
    	const deleteKeyPressed = useKeyPress(deleteKeyCode, { actInsideInputWithModifier: false });
    	const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode, { target: win$1 });
    	(0, react.useEffect)(() => {
    		if (deleteKeyPressed) {
    			const { edges, nodes } = store.getState();
    			deleteElements({
    				nodes: nodes.filter(selected),
    				edges: edges.filter(selected)
    			});
    			store.setState({ nodesSelectionActive: false });
    		}
    	}, [deleteKeyPressed]);
    	(0, react.useEffect)(() => {
    		store.setState({ multiSelectionActive: multiSelectionKeyPressed });
    	}, [multiSelectionKeyPressed]);
    }
    /**
    * Hook for handling resize events.
    *
    * @internal
    */
    function useResizeHandler(domNode) {
    	const store = useStoreApi();
    	(0, react.useEffect)(() => {
    		const updateDimensions = () => {
    			if (!domNode.current || !(domNode.current.checkVisibility?.() ?? true)) return false;
    			const size = getDimensions(domNode.current);
    			if (size.height === 0 || size.width === 0) store.getState().onError?.("004", errorMessages["error004"]());
    			store.setState({
    				width: size.width || 500,
    				height: size.height || 500
    			});
    		};
    		if (domNode.current) {
    			updateDimensions();
    			window.addEventListener("resize", updateDimensions);
    			const resizeObserver = new ResizeObserver(() => updateDimensions());
    			resizeObserver.observe(domNode.current);
    			return () => {
    				window.removeEventListener("resize", updateDimensions);
    				if (resizeObserver && domNode.current) resizeObserver.unobserve(domNode.current);
    			};
    		}
    	}, []);
    }
    const containerStyle = {
    	position: "absolute",
    	width: "100%",
    	height: "100%",
    	top: 0,
    	left: 0
    };
    const selector$i = (s) => ({
    	userSelectionActive: s.userSelectionActive,
    	lib: s.lib,
    	connectionInProgress: s.connection.inProgress
    });
    function ZoomPane({ onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panActivationKeyPressed, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children, noWheelClassName, noPanClassName, onViewportChange, isControlledViewport, paneClickDistance, selectionOnDrag }) {
    	const store = useStoreApi();
    	const zoomPane = (0, react.useRef)(null);
    	const { userSelectionActive, lib, connectionInProgress } = useStore(selector$i, shallow$1);
    	const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
    	const panZoom = (0, react.useRef)();
    	useResizeHandler(zoomPane);
    	const onTransformChange = (0, react.useCallback)((transform) => {
    		onViewportChange?.({
    			x: transform[0],
    			y: transform[1],
    			zoom: transform[2]
    		});
    		if (!isControlledViewport) store.setState({ transform });
    	}, [onViewportChange, isControlledViewport]);
    	(0, react.useEffect)(() => {
    		if (zoomPane.current) {
    			panZoom.current = XYPanZoom({
    				domNode: zoomPane.current,
    				minZoom,
    				maxZoom,
    				translateExtent,
    				viewport: defaultViewport,
    				onDraggingChange: (paneDragging) => store.setState((prevState) => prevState.paneDragging === paneDragging ? prevState : { paneDragging }),
    				onPanZoomStart: (event, vp) => {
    					const { onViewportChangeStart, onMoveStart } = store.getState();
    					onMoveStart?.(event, vp);
    					onViewportChangeStart?.(vp);
    				},
    				onPanZoom: (event, vp) => {
    					const { onViewportChange, onMove } = store.getState();
    					onMove?.(event, vp);
    					onViewportChange?.(vp);
    				},
    				onPanZoomEnd: (event, vp) => {
    					const { onViewportChangeEnd, onMoveEnd } = store.getState();
    					onMoveEnd?.(event, vp);
    					onViewportChangeEnd?.(vp);
    				}
    			});
    			const { x, y, zoom } = panZoom.current.getViewport();
    			store.setState({
    				panZoom: panZoom.current,
    				transform: [
    					x,
    					y,
    					zoom
    				],
    				domNode: zoomPane.current.closest(".react-flow")
    			});
    			return () => {
    				panZoom.current?.destroy();
    			};
    		}
    	}, []);
    	(0, react.useEffect)(() => {
    		panZoom.current?.update({
    			onPaneContextMenu,
    			zoomOnScroll,
    			zoomOnPinch,
    			panOnScroll,
    			panActivationKeyPressed,
    			panOnScrollSpeed,
    			panOnScrollMode,
    			zoomOnDoubleClick,
    			panOnDrag,
    			zoomActivationKeyPressed,
    			preventScrolling,
    			noPanClassName,
    			userSelectionActive,
    			noWheelClassName,
    			lib,
    			onTransformChange,
    			connectionInProgress,
    			selectionOnDrag,
    			paneClickDistance
    		});
    	}, [
    		onPaneContextMenu,
    		zoomOnScroll,
    		zoomOnPinch,
    		panOnScroll,
    		panActivationKeyPressed,
    		panOnScrollSpeed,
    		panOnScrollMode,
    		zoomOnDoubleClick,
    		panOnDrag,
    		zoomActivationKeyPressed,
    		preventScrolling,
    		noPanClassName,
    		userSelectionActive,
    		noWheelClassName,
    		lib,
    		onTransformChange,
    		connectionInProgress,
    		selectionOnDrag,
    		paneClickDistance
    	]);
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: "react-flow__renderer",
    		ref: zoomPane,
    		style: containerStyle,
    		children
    	});
    }
    const selector$h = (s) => ({
    	userSelectionActive: s.userSelectionActive,
    	userSelectionRect: s.userSelectionRect
    });
    function UserSelection() {
    	const { userSelectionActive, userSelectionRect } = useStore(selector$h, shallow$1);
    	if (!(userSelectionActive && userSelectionRect)) return null;
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: "react-flow__selection react-flow__container",
    		style: {
    			width: userSelectionRect.width,
    			height: userSelectionRect.height,
    			transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`
    		}
    	});
    }
    const wrapHandler = (handler, containerRef) => {
    	return (event) => {
    		if (event.target !== containerRef.current) return;
    		handler?.(event);
    	};
    };
    const selector$g = (s) => ({
    	userSelectionActive: s.userSelectionActive,
    	elementsSelectable: s.elementsSelectable,
    	dragging: s.paneDragging,
    	panBy: s.panBy,
    	autoPanSpeed: s.autoPanSpeed
    });
    function Pane({ isSelecting, selectionKeyPressed, selectionMode = SelectionMode.Full, panOnDrag, autoPanOnSelection, paneClickDistance, selectionOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children }) {
    	const autoPanId = (0, react.useRef)(0);
    	const store = useStoreApi();
    	const { userSelectionActive, elementsSelectable, dragging, panBy, autoPanSpeed } = useStore(selector$g, shallow$1);
    	const isSelectionEnabled = elementsSelectable && (isSelecting || userSelectionActive);
    	const container = (0, react.useRef)(null);
    	const containerBounds = (0, react.useRef)();
    	const selectedNodeIds = (0, react.useRef)(/* @__PURE__ */ new Set());
    	const selectedEdgeIds = (0, react.useRef)(/* @__PURE__ */ new Set());
    	const connectionEndedOnPane = (0, react.useRef)(false);
    	const selectionInProgress = (0, react.useRef)(false);
    	const position = (0, react.useRef)({
    		x: 0,
    		y: 0
    	});
    	const autoPanStarted = (0, react.useRef)(false);
    	const onClick = (event) => {
    		if (selectionInProgress.current || connectionEndedOnPane.current || store.getState().connection.inProgress) {
    			selectionInProgress.current = false;
    			connectionEndedOnPane.current = false;
    			return;
    		}
    		onPaneClick?.(event);
    		store.getState().resetSelectedElements();
    		store.setState({ nodesSelectionActive: false });
    	};
    	const onContextMenu = (event) => {
    		if (Array.isArray(panOnDrag) && panOnDrag?.includes(2)) {
    			event.preventDefault();
    			return;
    		}
    		onPaneContextMenu?.(event);
    	};
    	const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : void 0;
    	const onClickCapture = (event) => {
    		if (selectionInProgress.current) {
    			event.stopPropagation();
    			selectionInProgress.current = false;
    		}
    	};
    	const onPointerDownCapture = (event) => {
    		if (event.pointerType === "touch" && panOnDrag !== false && !selectionKeyPressed) return;
    		const { domNode, transform } = store.getState();
    		containerBounds.current = domNode?.getBoundingClientRect();
    		if (!containerBounds.current) return;
    		const eventTargetIsContainer = event.target === container.current;
    		if (!eventTargetIsContainer && !!event.target.closest(".nokey") || !isSelecting || !(selectionOnDrag && eventTargetIsContainer || selectionKeyPressed) || event.button !== 0 || !event.isPrimary) return;
    		event.target?.setPointerCapture?.(event.pointerId);
    		selectionInProgress.current = false;
    		const { x, y } = getEventPosition(event.nativeEvent, containerBounds.current);
    		const userSelectionStartPosition = pointToRendererPoint({
    			x,
    			y
    		}, transform);
    		store.setState({ userSelectionRect: {
    			width: 0,
    			height: 0,
    			startX: userSelectionStartPosition.x,
    			startY: userSelectionStartPosition.y,
    			x,
    			y
    		} });
    		if (!eventTargetIsContainer) {
    			event.stopPropagation();
    			event.preventDefault();
    		}
    	};
    	function commitUserSelectionRect(mouseX, mouseY) {
    		const { userSelectionRect } = store.getState();
    		if (!userSelectionRect) return;
    		const { transform, nodeLookup, edgeLookup, connectionLookup, triggerNodeChanges, triggerEdgeChanges, defaultEdgeOptions } = store.getState();
    		const userStartPosition = {
    			x: userSelectionRect.startX,
    			y: userSelectionRect.startY
    		};
    		const { x: screenStartX, y: screenStartY } = rendererPointToPoint(userStartPosition, transform);
    		const nextUserSelectRect = {
    			startX: userStartPosition.x,
    			startY: userStartPosition.y,
    			x: mouseX < screenStartX ? mouseX : screenStartX,
    			y: mouseY < screenStartY ? mouseY : screenStartY,
    			width: Math.abs(mouseX - screenStartX),
    			height: Math.abs(mouseY - screenStartY)
    		};
    		const prevSelectedNodeIds = selectedNodeIds.current;
    		const prevSelectedEdgeIds = selectedEdgeIds.current;
    		selectedNodeIds.current = new Set(getNodesInside(nodeLookup, nextUserSelectRect, transform, selectionMode === SelectionMode.Partial, true).map((node) => node.id));
    		selectedEdgeIds.current = /* @__PURE__ */ new Set();
    		const edgesSelectable = defaultEdgeOptions?.selectable ?? true;
    		for (const nodeId of selectedNodeIds.current) {
    			const connections = connectionLookup.get(nodeId);
    			if (!connections) continue;
    			for (const { edgeId } of connections.values()) {
    				const edge = edgeLookup.get(edgeId);
    				if (edge && (edge.selectable ?? edgesSelectable)) selectedEdgeIds.current.add(edgeId);
    			}
    		}
    		if (!areSetsEqual(prevSelectedNodeIds, selectedNodeIds.current)) triggerNodeChanges(getSelectionChanges(nodeLookup, selectedNodeIds.current, true));
    		if (!areSetsEqual(prevSelectedEdgeIds, selectedEdgeIds.current)) triggerEdgeChanges(getSelectionChanges(edgeLookup, selectedEdgeIds.current));
    		store.setState({
    			userSelectionRect: nextUserSelectRect,
    			userSelectionActive: true,
    			nodesSelectionActive: false
    		});
    	}
    	function autoPan() {
    		if (!autoPanOnSelection || !containerBounds.current) return;
    		const [x, y] = calcAutoPan(position.current, containerBounds.current, autoPanSpeed);
    		panBy({
    			x,
    			y
    		}).then((panned) => {
    			if (!selectionInProgress.current || !panned) {
    				autoPanId.current = requestAnimationFrame(autoPan);
    				return;
    			}
    			const { x: mx, y: my } = position.current;
    			commitUserSelectionRect(mx, my);
    			autoPanId.current = requestAnimationFrame(autoPan);
    		});
    	}
    	const cleanupAutoPan = () => {
    		cancelAnimationFrame(autoPanId.current);
    		autoPanId.current = 0;
    		autoPanStarted.current = false;
    	};
    	(0, react.useEffect)(() => {
    		return () => cleanupAutoPan();
    	}, []);
    	const onPointerMove = (event) => {
    		const { userSelectionRect, transform, resetSelectedElements } = store.getState();
    		if (!containerBounds.current || !userSelectionRect) return;
    		const { x: mouseX, y: mouseY } = getEventPosition(event.nativeEvent, containerBounds.current);
    		position.current = {
    			x: mouseX,
    			y: mouseY
    		};
    		const screenStart = rendererPointToPoint({
    			x: userSelectionRect.startX,
    			y: userSelectionRect.startY
    		}, transform);
    		if (!selectionInProgress.current) {
    			const requiredDistance = selectionKeyPressed ? 0 : paneClickDistance;
    			if (Math.hypot(mouseX - screenStart.x, mouseY - screenStart.y) <= requiredDistance) return;
    			resetSelectedElements();
    			onSelectionStart?.(event);
    		}
    		selectionInProgress.current = true;
    		if (!autoPanStarted.current) {
    			autoPan();
    			autoPanStarted.current = true;
    		}
    		commitUserSelectionRect(mouseX, mouseY);
    	};
    	const onPointerUp = (event) => {
    		if (!isSelectionEnabled) {
    			if (event.target === container.current && store.getState().connection.inProgress) connectionEndedOnPane.current = true;
    			return;
    		}
    		if (event.button !== 0) return;
    		event.target?.releasePointerCapture?.(event.pointerId);
    		if (!userSelectionActive && event.target === container.current && store.getState().userSelectionRect) onClick?.(event);
    		store.setState({
    			userSelectionActive: false,
    			userSelectionRect: null
    		});
    		if (selectionInProgress.current) {
    			onSelectionEnd?.(event);
    			store.setState({ nodesSelectionActive: selectedNodeIds.current.size > 0 });
    		}
    		cleanupAutoPan();
    	};
    	const onPointerCancel = (event) => {
    		event.target?.releasePointerCapture?.(event.pointerId);
    		cleanupAutoPan();
    	};
    	const draggable = panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0);
    	return (0, react_jsx_runtime.jsxs)("div", {
    		className: cc(["react-flow__pane", {
    			draggable,
    			dragging,
    			selection: isSelecting
    		}]),
    		onClick: isSelectionEnabled ? void 0 : wrapHandler(onClick, container),
    		onContextMenu: wrapHandler(onContextMenu, container),
    		onWheel: wrapHandler(onWheel, container),
    		onPointerEnter: isSelectionEnabled ? void 0 : onPaneMouseEnter,
    		onPointerMove: isSelectionEnabled ? onPointerMove : onPaneMouseMove,
    		onPointerUp,
    		onPointerCancel: isSelectionEnabled ? onPointerCancel : void 0,
    		onPointerDownCapture: isSelectionEnabled ? onPointerDownCapture : void 0,
    		onClickCapture: isSelectionEnabled ? onClickCapture : void 0,
    		onPointerLeave: onPaneMouseLeave,
    		ref: container,
    		style: containerStyle,
    		children: [children, (0, react_jsx_runtime.jsx)(UserSelection, {})]
    	});
    }
    function handleNodeClick({ id, store, unselect = false, nodeRef }) {
    	const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeLookup, onError } = store.getState();
    	const node = nodeLookup.get(id);
    	if (!node) {
    		onError?.("012", errorMessages["error012"](id));
    		return;
    	}
    	store.setState({ nodesSelectionActive: false });
    	if (!node.selected) addSelectedNodes([id]);
    	else if (unselect || node.selected && multiSelectionActive) {
    		unselectNodesAndEdges({
    			nodes: [node],
    			edges: []
    		});
    		requestAnimationFrame(() => nodeRef?.current?.blur());
    	}
    }
    /**
    * Hook for calling XYDrag helper from @xyflow/system.
    *
    * @internal
    */
    function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, nodeClickDistance }) {
    	const store = useStoreApi();
    	const [dragging, setDragging] = (0, react.useState)(false);
    	const xyDrag = (0, react.useRef)();
    	(0, react.useEffect)(() => {
    		if (disabled) return;
    		xyDrag.current = XYDrag({
    			getStoreItems: () => store.getState(),
    			onNodeMouseDown: (id) => {
    				handleNodeClick({
    					id,
    					store,
    					nodeRef
    				});
    			},
    			onDragStart: () => {
    				setDragging(true);
    			},
    			onDragStop: () => {
    				setDragging(false);
    			}
    		});
    		return () => {
    			xyDrag.current?.destroy();
    			xyDrag.current = void 0;
    		};
    	}, [
    		disabled,
    		store,
    		nodeRef
    	]);
    	(0, react.useEffect)(() => {
    		if (disabled || !nodeRef.current || !xyDrag.current) return;
    		xyDrag.current.update({
    			noDragClassName,
    			handleSelector,
    			domNode: nodeRef.current,
    			isSelectable,
    			nodeId,
    			nodeClickDistance
    		});
    	}, [
    		noDragClassName,
    		handleSelector,
    		disabled,
    		isSelectable,
    		nodeRef,
    		nodeId,
    		nodeClickDistance
    	]);
    	return dragging;
    }
    const selectedAndDraggable = (nodesDraggable) => (n) => n.selected && (n.draggable || nodesDraggable && typeof n.draggable === "undefined");
    /**
    * Hook for updating node positions by passing a direction and factor
    *
    * @internal
    * @returns function for updating node positions
    */
    function useMoveSelectedNodes() {
    	const store = useStoreApi();
    	return (0, react.useCallback)((params) => {
    		const { nodeExtent, snapToGrid, snapGrid, nodesDraggable, onError, updateNodePositions, nodeLookup, nodeOrigin } = store.getState();
    		const nodeUpdates = /* @__PURE__ */ new Map();
    		const isSelected = selectedAndDraggable(nodesDraggable);
    		const xVelo = snapToGrid ? snapGrid[0] : 5;
    		const yVelo = snapToGrid ? snapGrid[1] : 5;
    		const xDiff = params.direction.x * xVelo * params.factor;
    		const yDiff = params.direction.y * yVelo * params.factor;
    		for (const [, node] of nodeLookup) {
    			if (!isSelected(node)) continue;
    			let nextPosition = {
    				x: node.internals.positionAbsolute.x + xDiff,
    				y: node.internals.positionAbsolute.y + yDiff
    			};
    			if (snapToGrid) nextPosition = snapPosition(nextPosition, snapGrid);
    			const { position, positionAbsolute } = calculateNodePosition({
    				nodeId: node.id,
    				nextPosition,
    				nodeLookup,
    				nodeExtent,
    				nodeOrigin,
    				onError
    			});
    			node.position = position;
    			node.internals.positionAbsolute = positionAbsolute;
    			nodeUpdates.set(node.id, node);
    		}
    		updateNodePositions(nodeUpdates);
    	}, []);
    }
    const NodeIdContext = (0, react.createContext)(null);
    const Provider = NodeIdContext.Provider;
    NodeIdContext.Consumer;
    /**
    * You can use this hook to get the id of the node it is used inside. It is useful
    * if you need the node's id deeper in the render tree but don't want to manually
    * drill down the id as a prop.
    *
    * @public
    * @returns The id for a node in the flow.
    *
    * @example
    *```jsx
    *import { useNodeId } from '@xyflow/react';
    *
    *export default function CustomNode() {
    *  return (
    *    <div>
    *      <span>This node has an id of </span>
    *      <NodeIdDisplay />
    *    </div>
    *  );
    *}
    *
    *function NodeIdDisplay() {
    *  const nodeId = useNodeId();
    *
    *  return <span>{nodeId}</span>;
    *}
    *```
    */
    const useNodeId = () => {
    	return (0, react.useContext)(NodeIdContext);
    };
    const selector$f = (s) => ({
    	connectOnClick: s.connectOnClick,
    	noPanClassName: s.noPanClassName,
    	rfId: s.rfId
    });
    const HandleConfigContext = (0, react.createContext)(null);
    function HandleConfigProvider({ children }) {
    	const config = useStore(selector$f, shallow$1);
    	return (0, react_jsx_runtime.jsx)(HandleConfigContext.Provider, {
    		value: config,
    		children
    	});
    }
    function useHandleConfig() {
    	const config = (0, react.useContext)(HandleConfigContext);
    	if (!config) throw new Error("useHandleConfig must be used within a HandleConfigProvider");
    	return config;
    }
    const idleConnectingState = {
    	connectingFrom: false,
    	connectingTo: false,
    	clickConnecting: false,
    	isPossibleEndHandle: true,
    	connectionInProcess: false,
    	clickConnectionInProcess: false,
    	valid: false
    };
    const connectingSelector = (nodeId, handleId, type) => (state) => {
    	const { connectionClickStartHandle: clickHandle, connectionMode, connection } = state;
    	const { fromHandle, toHandle, isValid } = connection;
    	if (!fromHandle && !clickHandle) return idleConnectingState;
    	const connectingTo = toHandle?.nodeId === nodeId && toHandle?.id === handleId && toHandle?.type === type;
    	return {
    		connectingFrom: fromHandle?.nodeId === nodeId && fromHandle?.id === handleId && fromHandle?.type === type,
    		connectingTo,
    		clickConnecting: clickHandle?.nodeId === nodeId && clickHandle?.id === handleId && clickHandle?.type === type,
    		isPossibleEndHandle: connectionMode === ConnectionMode.Strict ? fromHandle?.type !== type : nodeId !== fromHandle?.nodeId || handleId !== fromHandle?.id,
    		connectionInProcess: !!fromHandle,
    		clickConnectionInProcess: !!clickHandle,
    		valid: connectingTo && isValid
    	};
    };
    function HandleComponent({ type = "source", position = Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id, onConnect, children, className, onMouseDown, onTouchStart, ...rest }, ref) {
    	const handleId = id || null;
    	const isTarget = type === "target";
    	const store = useStoreApi();
    	const nodeId = useNodeId();
    	const { connectOnClick, noPanClassName, rfId } = useHandleConfig();
    	const { connectingFrom, connectingTo, clickConnecting, isPossibleEndHandle, connectionInProcess, clickConnectionInProcess, valid } = useStore(connectingSelector(nodeId, handleId, type), shallow$1);
    	if (!nodeId) store.getState().onError?.("010", errorMessages["error010"]());
    	const onConnectExtended = (params) => {
    		const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
    		const edgeParams = {
    			...defaultEdgeOptions,
    			...params
    		};
    		if (hasDefaultEdges) {
    			const { edges, setEdges, onError } = store.getState();
    			setEdges(addEdge(edgeParams, edges, { onError }));
    		}
    		onConnectAction?.(edgeParams);
    		onConnect?.(edgeParams);
    	};
    	const onPointerDown = (event) => {
    		if (!nodeId) return;
    		const isMouseTriggered = isMouseEvent(event.nativeEvent);
    		if (isConnectableStart && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
    			const currentStore = store.getState();
    			XYHandle.onPointerDown(event.nativeEvent, {
    				handleDomNode: event.currentTarget,
    				autoPanOnConnect: currentStore.autoPanOnConnect,
    				connectionMode: currentStore.connectionMode,
    				connectionRadius: currentStore.connectionRadius,
    				domNode: currentStore.domNode,
    				nodeLookup: currentStore.nodeLookup,
    				lib: currentStore.lib,
    				isTarget,
    				handleId,
    				nodeId,
    				flowId: currentStore.rfId,
    				panBy: currentStore.panBy,
    				cancelConnection: currentStore.cancelConnection,
    				onConnectStart: currentStore.onConnectStart,
    				onConnectEnd: (...args) => store.getState().onConnectEnd?.(...args),
    				updateConnection: currentStore.updateConnection,
    				onConnect: onConnectExtended,
    				isValidConnection: isValidConnection || ((...args) => store.getState().isValidConnection?.(...args) ?? true),
    				getTransform: () => store.getState().transform,
    				getFromHandle: () => store.getState().connection.fromHandle,
    				autoPanSpeed: currentStore.autoPanSpeed,
    				dragThreshold: currentStore.connectionDragThreshold
    			});
    		}
    		if (isMouseTriggered) onMouseDown?.(event);
    		else onTouchStart?.(event);
    	};
    	const onClick = (event) => {
    		const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore, lib, rfId: flowId, nodeLookup, connection: connectionState } = store.getState();
    		if (!nodeId || !connectionClickStartHandle && !isConnectableStart) return;
    		if (!connectionClickStartHandle) {
    			onClickConnectStart?.(event.nativeEvent, {
    				nodeId,
    				handleId,
    				handleType: type
    			});
    			store.setState({ connectionClickStartHandle: {
    				nodeId,
    				type,
    				id: handleId
    			} });
    			return;
    		}
    		const doc = getHostForElement(event.target);
    		const isValidConnectionHandler = isValidConnection || isValidConnectionStore;
    		const { connection, isValid } = XYHandle.isValid(event.nativeEvent, {
    			handle: {
    				nodeId,
    				id: handleId,
    				type
    			},
    			connectionMode,
    			fromNodeId: connectionClickStartHandle.nodeId,
    			fromHandleId: connectionClickStartHandle.id || null,
    			fromType: connectionClickStartHandle.type,
    			isValidConnection: isValidConnectionHandler,
    			flowId,
    			doc,
    			lib,
    			nodeLookup
    		});
    		if (isValid && connection) onConnectExtended(connection);
    		const connectionClone = structuredClone(connectionState);
    		delete connectionClone.inProgress;
    		connectionClone.toPosition = connectionClone.toHandle ? connectionClone.toHandle.position : null;
    		onClickConnectEnd?.(event, connectionClone);
    		store.setState({ connectionClickStartHandle: null });
    	};
    	return (0, react_jsx_runtime.jsx)("div", {
    		"data-handleid": handleId,
    		"data-nodeid": nodeId,
    		"data-handlepos": position,
    		"data-id": `${rfId}-${nodeId}-${handleId}-${type}`,
    		className: cc([
    			"react-flow__handle",
    			`react-flow__handle-${position}`,
    			"nodrag",
    			noPanClassName,
    			className,
    			{
    				source: !isTarget,
    				target: isTarget,
    				connectable: isConnectable,
    				connectablestart: isConnectableStart,
    				connectableend: isConnectableEnd,
    				clickconnecting: clickConnecting,
    				connectingfrom: connectingFrom,
    				connectingto: connectingTo,
    				valid,
    				connectionindicator: isConnectable && (!connectionInProcess || isPossibleEndHandle) && (connectionInProcess || clickConnectionInProcess ? isConnectableEnd : isConnectableStart)
    			}
    		]),
    		onMouseDown: onPointerDown,
    		onTouchStart: onPointerDown,
    		onClick: connectOnClick ? onClick : void 0,
    		ref,
    		...rest,
    		children
    	});
    }
    /**
    * The `<Handle />` component is used in your [custom nodes](/learn/customization/custom-nodes)
    * to define connection points.
    *
    *@public
    *
    *@example
    *
    *```jsx
    *import { Handle, Position } from '@xyflow/react';
    *
    *export function CustomNode({ data }) {
    *  return (
    *    <>
    *      <div style={{ padding: '10px 20px' }}>
    *        {data.label}
    *      </div>
    *
    *      <Handle type="target" position={Position.Left} />
    *      <Handle type="source" position={Position.Right} />
    *    </>
    *  );
    *};
    *```
    */
    const Handle = (0, react.memo)(fixedForwardRef(HandleComponent));
    function InputNode({ data, isConnectable, sourcePosition = Position.Bottom }) {
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [data?.label, (0, react_jsx_runtime.jsx)(Handle, {
    		type: "source",
    		position: sourcePosition,
    		isConnectable
    	})] });
    }
    function DefaultNode({ data, isConnectable, targetPosition = Position.Top, sourcePosition = Position.Bottom }) {
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    		(0, react_jsx_runtime.jsx)(Handle, {
    			type: "target",
    			position: targetPosition,
    			isConnectable
    		}),
    		data?.label,
    		(0, react_jsx_runtime.jsx)(Handle, {
    			type: "source",
    			position: sourcePosition,
    			isConnectable
    		})
    	] });
    }
    function GroupNode() {
    	return null;
    }
    function OutputNode({ data, isConnectable, targetPosition = Position.Top }) {
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(Handle, {
    		type: "target",
    		position: targetPosition,
    		isConnectable
    	}), data?.label] });
    }
    const arrowKeyDiffs = {
    	ArrowUp: {
    		x: 0,
    		y: -1
    	},
    	ArrowDown: {
    		x: 0,
    		y: 1
    	},
    	ArrowLeft: {
    		x: -1,
    		y: 0
    	},
    	ArrowRight: {
    		x: 1,
    		y: 0
    	}
    };
    const builtinNodeTypes = {
    	input: InputNode,
    	default: DefaultNode,
    	output: OutputNode,
    	group: GroupNode
    };
    function getNodeInlineStyleDimensions(node) {
    	if (node.internals.handleBounds === void 0) return {
    		width: node.width ?? node.initialWidth ?? node.style?.width,
    		height: node.height ?? node.initialHeight ?? node.style?.height
    	};
    	return {
    		width: node.width ?? node.style?.width,
    		height: node.height ?? node.style?.height
    	};
    }
    const selector$e = (s) => {
    	const { width, height, x, y } = getInternalNodesBounds(s.nodeLookup, { filter: (node) => !!node.selected });
    	return {
    		width: isNumeric(width) ? width : null,
    		height: isNumeric(height) ? height : null,
    		userSelectionActive: s.userSelectionActive,
    		transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]}) translate(${x}px,${y}px)`
    	};
    };
    function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y }) {
    	const store = useStoreApi();
    	const { width, height, transformString, userSelectionActive } = useStore(selector$e, shallow$1);
    	const moveSelectedNodes = useMoveSelectedNodes();
    	const nodeRef = (0, react.useRef)(null);
    	(0, react.useEffect)(() => {
    		if (!disableKeyboardA11y) nodeRef.current?.focus({ preventScroll: true });
    	}, [disableKeyboardA11y]);
    	const shouldRender = !userSelectionActive && width !== null && height !== null;
    	useDrag({
    		nodeRef,
    		disabled: !shouldRender
    	});
    	if (!shouldRender) return null;
    	const onContextMenu = onSelectionContextMenu ? (event) => {
    		onSelectionContextMenu(event, store.getState().nodes.filter((n) => n.selected));
    	} : void 0;
    	const onKeyDown = (event) => {
    		if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
    			event.preventDefault();
    			moveSelectedNodes({
    				direction: arrowKeyDiffs[event.key],
    				factor: event.shiftKey ? 4 : 1
    			});
    		}
    	};
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: cc([
    			"react-flow__nodesselection",
    			"react-flow__container",
    			noPanClassName
    		]),
    		style: { transform: transformString },
    		children: (0, react_jsx_runtime.jsx)("div", {
    			ref: nodeRef,
    			className: "react-flow__nodesselection-rect",
    			onContextMenu,
    			tabIndex: disableKeyboardA11y ? void 0 : -1,
    			onKeyDown: disableKeyboardA11y ? void 0 : onKeyDown,
    			style: {
    				width,
    				height
    			}
    		})
    	});
    }
    const win = typeof window !== "undefined" ? window : void 0;
    const selector$d = (s) => {
    	return {
    		nodesSelectionActive: s.nodesSelectionActive,
    		userSelectionActive: s.userSelectionActive
    	};
    };
    function FlowRendererComponent({ children, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, paneClickDistance, deleteKeyCode, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, autoPanOnSelection, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y, onViewportChange, isControlledViewport }) {
    	const { nodesSelectionActive, userSelectionActive } = useStore(selector$d, shallow$1);
    	const selectionKeyPressed = useKeyPress(selectionKeyCode, { target: win });
    	const panActivationKeyPressed = useKeyPress(panActivationKeyCode, { target: win });
    	const panOnDrag = panActivationKeyPressed || _panOnDrag;
    	const panOnScroll = panActivationKeyPressed || _panOnScroll;
    	const _selectionOnDrag = selectionOnDrag && panOnDrag !== true;
    	const isSelecting = selectionKeyPressed || userSelectionActive || _selectionOnDrag;
    	useGlobalKeyHandler({
    		deleteKeyCode,
    		multiSelectionKeyCode
    	});
    	return (0, react_jsx_runtime.jsx)(ZoomPane, {
    		onPaneContextMenu,
    		elementsSelectable,
    		zoomOnScroll,
    		zoomOnPinch,
    		panOnScroll,
    		panActivationKeyPressed,
    		panOnScrollSpeed,
    		panOnScrollMode,
    		zoomOnDoubleClick,
    		panOnDrag: !selectionKeyPressed && panOnDrag,
    		defaultViewport,
    		translateExtent,
    		minZoom,
    		maxZoom,
    		zoomActivationKeyCode,
    		preventScrolling,
    		noWheelClassName,
    		noPanClassName,
    		onViewportChange,
    		isControlledViewport,
    		paneClickDistance,
    		selectionOnDrag: _selectionOnDrag,
    		children: (0, react_jsx_runtime.jsxs)(Pane, {
    			onSelectionStart,
    			onSelectionEnd,
    			onPaneClick,
    			onPaneMouseEnter,
    			onPaneMouseMove,
    			onPaneMouseLeave,
    			onPaneContextMenu,
    			onPaneScroll,
    			panOnDrag,
    			autoPanOnSelection,
    			isSelecting: !!isSelecting,
    			selectionMode,
    			selectionKeyPressed,
    			paneClickDistance,
    			selectionOnDrag: _selectionOnDrag,
    			children: [children, nodesSelectionActive && (0, react_jsx_runtime.jsx)(NodesSelection, {
    				onSelectionContextMenu,
    				noPanClassName,
    				disableKeyboardA11y
    			})]
    		})
    	});
    }
    FlowRendererComponent.displayName = "FlowRenderer";
    const FlowRenderer = (0, react.memo)(FlowRendererComponent);
    const selector$c = (onlyRenderVisible) => (s) => {
    	return onlyRenderVisible ? getNodesInside(s.nodeLookup, {
    		x: 0,
    		y: 0,
    		width: s.width,
    		height: s.height
    	}, s.transform, true).map((node) => node.id) : Array.from(s.nodeLookup.keys());
    };
    /**
    * Hook for getting the visible node ids from the store.
    *
    * @internal
    * @param onlyRenderVisible
    * @returns array with visible node ids
    */
    function useVisibleNodeIds(onlyRenderVisible) {
    	return useStore((0, react.useCallback)(selector$c(onlyRenderVisible), [onlyRenderVisible]), shallow$1);
    }
    const selector$b = (s) => s.updateNodeInternals;
    function useResizeObserver() {
    	const updateNodeInternals = useStore(selector$b);
    	const [resizeObserver] = (0, react.useState)(() => {
    		if (typeof ResizeObserver === "undefined") return null;
    		return new ResizeObserver((entries) => {
    			const updates = /* @__PURE__ */ new Map();
    			entries.forEach((entry) => {
    				const id = entry.target.getAttribute("data-id");
    				updates.set(id, {
    					id,
    					nodeElement: entry.target,
    					force: true
    				});
    			});
    			updateNodeInternals(updates);
    		});
    	});
    	(0, react.useEffect)(() => {
    		return () => {
    			resizeObserver?.disconnect();
    		};
    	}, [resizeObserver]);
    	return resizeObserver;
    }
    /**
    * Hook to handle the resize observation + internal updates for the passed node.
    *
    * @internal
    * @returns nodeRef - reference to the node element
    */
    function useNodeObserver({ node, nodeType, hasDimensions, resizeObserver }) {
    	const store = useStoreApi();
    	const nodeRef = (0, react.useRef)(null);
    	const observedNode = (0, react.useRef)(null);
    	const prevSourcePosition = (0, react.useRef)(node.sourcePosition);
    	const prevTargetPosition = (0, react.useRef)(node.targetPosition);
    	const prevType = (0, react.useRef)(nodeType);
    	const isInitialized = hasDimensions && !!node.internals.handleBounds;
    	(0, react.useEffect)(() => {
    		if (nodeRef.current && !node.hidden && (!isInitialized || observedNode.current !== nodeRef.current)) {
    			if (observedNode.current) resizeObserver?.unobserve(observedNode.current);
    			resizeObserver?.observe(nodeRef.current);
    			observedNode.current = nodeRef.current;
    		}
    	}, [isInitialized, node.hidden]);
    	(0, react.useEffect)(() => {
    		return () => {
    			if (observedNode.current) {
    				resizeObserver?.unobserve(observedNode.current);
    				observedNode.current = null;
    			}
    		};
    	}, []);
    	(0, react.useEffect)(() => {
    		if (nodeRef.current) {
    			const typeChanged = prevType.current !== nodeType;
    			const sourcePosChanged = prevSourcePosition.current !== node.sourcePosition;
    			const targetPosChanged = prevTargetPosition.current !== node.targetPosition;
    			if (typeChanged || sourcePosChanged || targetPosChanged) {
    				prevType.current = nodeType;
    				prevSourcePosition.current = node.sourcePosition;
    				prevTargetPosition.current = node.targetPosition;
    				store.getState().updateNodeInternals(/* @__PURE__ */ new Map([[node.id, {
    					id: node.id,
    					nodeElement: nodeRef.current,
    					force: true
    				}]]));
    			}
    		}
    	}, [
    		node.id,
    		nodeType,
    		node.sourcePosition,
    		node.targetPosition
    	]);
    	return nodeRef;
    }
    function NodeWrapper({ id, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, nodesDraggable, elementsSelectable, nodesConnectable, nodesFocusable, resizeObserver, noDragClassName, noPanClassName, disableKeyboardA11y, rfId, nodeTypes, nodeClickDistance, onError }) {
    	const { node, internals, isParent } = useStore((s) => {
    		const node = s.nodeLookup.get(id);
    		const isParent = s.parentLookup.has(id);
    		return {
    			node,
    			internals: node.internals,
    			isParent
    		};
    	}, shallow$1);
    	let nodeType = node.type || "default";
    	let NodeComponent = nodeTypes?.[nodeType] || builtinNodeTypes[nodeType];
    	if (NodeComponent === void 0) {
    		onError?.("003", errorMessages["error003"](nodeType));
    		nodeType = "default";
    		NodeComponent = nodeTypes?.["default"] || builtinNodeTypes.default;
    	}
    	const isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === "undefined");
    	const isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === "undefined");
    	const isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === "undefined");
    	const isFocusable = !!(node.focusable || nodesFocusable && typeof node.focusable === "undefined");
    	const store = useStoreApi();
    	const hasDimensions = nodeHasDimensions(node);
    	const nodeRef = useNodeObserver({
    		node,
    		nodeType,
    		hasDimensions,
    		resizeObserver
    	});
    	const dragging = useDrag({
    		nodeRef,
    		disabled: node.hidden || !isDraggable,
    		noDragClassName,
    		handleSelector: node.dragHandle,
    		nodeId: id,
    		isSelectable,
    		nodeClickDistance
    	});
    	const moveSelectedNodes = useMoveSelectedNodes();
    	if (node.hidden) return null;
    	const nodeDimensions = getNodeDimensions(node);
    	const inlineDimensions = getNodeInlineStyleDimensions(node);
    	const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    	const onMouseEnterHandler = onMouseEnter ? (event) => onMouseEnter(event, { ...internals.userNode }) : void 0;
    	const onMouseMoveHandler = onMouseMove ? (event) => onMouseMove(event, { ...internals.userNode }) : void 0;
    	const onMouseLeaveHandler = onMouseLeave ? (event) => onMouseLeave(event, { ...internals.userNode }) : void 0;
    	const onContextMenuHandler = onContextMenu ? (event) => onContextMenu(event, { ...internals.userNode }) : void 0;
    	const onDoubleClickHandler = onDoubleClick ? (event) => onDoubleClick(event, { ...internals.userNode }) : void 0;
    	const onSelectNodeHandler = (event) => {
    		const { selectNodesOnDrag, nodeDragThreshold } = store.getState();
    		if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) handleNodeClick({
    			id,
    			store,
    			nodeRef
    		});
    		if (onClick) onClick(event, { ...internals.userNode });
    	};
    	const onKeyDown = (event) => {
    		if (isInputDOMNode(event.nativeEvent) || disableKeyboardA11y) return;
    		if (elementSelectionKeys.includes(event.key) && isSelectable) {
    			const unselect = event.key === "Escape";
    			handleNodeClick({
    				id,
    				store,
    				unselect,
    				nodeRef
    			});
    		} else if (isDraggable && node.selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
    			event.preventDefault();
    			const { ariaLabelConfig } = store.getState();
    			store.setState({ ariaLiveMessage: ariaLabelConfig["node.a11yDescription.ariaLiveMessage"]({
    				direction: event.key.replace("Arrow", "").toLowerCase(),
    				x: ~~internals.positionAbsolute.x,
    				y: ~~internals.positionAbsolute.y
    			}) });
    			moveSelectedNodes({
    				direction: arrowKeyDiffs[event.key],
    				factor: event.shiftKey ? 4 : 1
    			});
    		}
    	};
    	const onFocus = () => {
    		if (disableKeyboardA11y || !nodeRef.current?.matches(":focus-visible")) return;
    		const { transform, width, height, autoPanOnNodeFocus, setCenter } = store.getState();
    		if (!autoPanOnNodeFocus) return;
    		if (!(getNodesInside(/* @__PURE__ */ new Map([[id, node]]), {
    			x: 0,
    			y: 0,
    			width,
    			height
    		}, transform, true).length > 0)) setCenter(node.position.x + nodeDimensions.width / 2, node.position.y + nodeDimensions.height / 2, { zoom: transform[2] });
    	};
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: cc([
    			"react-flow__node",
    			`react-flow__node-${nodeType}`,
    			{ [noPanClassName]: isDraggable },
    			node.className,
    			{
    				selected: node.selected,
    				selectable: isSelectable,
    				parent: isParent,
    				draggable: isDraggable,
    				dragging
    			}
    		]),
    		ref: nodeRef,
    		style: {
    			zIndex: internals.z,
    			transform: `translate(${internals.positionAbsolute.x}px,${internals.positionAbsolute.y}px)`,
    			pointerEvents: hasPointerEvents ? "all" : "none",
    			visibility: hasDimensions ? "visible" : "hidden",
    			...node.style,
    			...inlineDimensions
    		},
    		"data-id": id,
    		"data-testid": `rf__node-${id}`,
    		onMouseEnter: onMouseEnterHandler,
    		onMouseMove: onMouseMoveHandler,
    		onMouseLeave: onMouseLeaveHandler,
    		onContextMenu: onContextMenuHandler,
    		onClick: onSelectNodeHandler,
    		onDoubleClick: onDoubleClickHandler,
    		onKeyDown: isFocusable ? onKeyDown : void 0,
    		tabIndex: isFocusable ? 0 : void 0,
    		onFocus: isFocusable ? onFocus : void 0,
    		role: node.ariaRole ?? (isFocusable ? "group" : void 0),
    		"aria-roledescription": "node",
    		"aria-describedby": disableKeyboardA11y ? void 0 : `${ARIA_NODE_DESC_KEY}-${rfId}`,
    		"aria-label": node.ariaLabel,
    		...node.domAttributes,
    		children: (0, react_jsx_runtime.jsx)(Provider, {
    			value: id,
    			children: (0, react_jsx_runtime.jsx)(NodeComponent, {
    				id,
    				data: node.data,
    				type: nodeType,
    				positionAbsoluteX: internals.positionAbsolute.x,
    				positionAbsoluteY: internals.positionAbsolute.y,
    				selected: node.selected ?? false,
    				selectable: isSelectable,
    				draggable: isDraggable,
    				deletable: node.deletable ?? true,
    				isConnectable,
    				sourcePosition: node.sourcePosition,
    				targetPosition: node.targetPosition,
    				dragging,
    				dragHandle: node.dragHandle,
    				zIndex: internals.z,
    				parentId: node.parentId,
    				...nodeDimensions
    			})
    		})
    	});
    }
    var NodeWrapper$1 = (0, react.memo)(NodeWrapper);
    const selector$a = (s) => ({
    	nodesConnectable: s.nodesConnectable,
    	nodesFocusable: s.nodesFocusable,
    	elementsSelectable: s.elementsSelectable,
    	onError: s.onError
    });
    function NodeRendererComponent(props) {
    	const { nodesConnectable, nodesFocusable, elementsSelectable, onError } = useStore(selector$a, shallow$1);
    	const nodeIds = useVisibleNodeIds(props.onlyRenderVisibleElements);
    	const resizeObserver = useResizeObserver();
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: "react-flow__nodes",
    		style: containerStyle,
    		children: nodeIds.map((nodeId) => {
    			return (0, react_jsx_runtime.jsx)(NodeWrapper$1, {
    				id: nodeId,
    				nodeTypes: props.nodeTypes,
    				nodeExtent: props.nodeExtent,
    				onClick: props.onNodeClick,
    				onMouseEnter: props.onNodeMouseEnter,
    				onMouseMove: props.onNodeMouseMove,
    				onMouseLeave: props.onNodeMouseLeave,
    				onContextMenu: props.onNodeContextMenu,
    				onDoubleClick: props.onNodeDoubleClick,
    				noDragClassName: props.noDragClassName,
    				noPanClassName: props.noPanClassName,
    				rfId: props.rfId,
    				disableKeyboardA11y: props.disableKeyboardA11y,
    				resizeObserver,
    				nodesDraggable: props.nodesDraggable ?? true,
    				nodesConnectable,
    				nodesFocusable,
    				elementsSelectable,
    				nodeClickDistance: props.nodeClickDistance,
    				onError
    			}, nodeId);
    		})
    	});
    }
    NodeRendererComponent.displayName = "NodeRenderer";
    const NodeRenderer = (0, react.memo)(NodeRendererComponent);
    /**
    * Hook for getting the visible edge ids from the store.
    *
    * @internal
    * @param onlyRenderVisible
    * @returns array with visible edge ids
    */
    function useVisibleEdgeIds(onlyRenderVisible) {
    	return useStore((0, react.useCallback)((s) => {
    		if (!onlyRenderVisible) return s.edges.map((edge) => edge.id);
    		const visibleEdgeIds = [];
    		if (s.width && s.height) for (const edge of s.edges) {
    			const sourceNode = s.nodeLookup.get(edge.source);
    			const targetNode = s.nodeLookup.get(edge.target);
    			if (sourceNode && targetNode && isEdgeVisible({
    				sourceNode,
    				targetNode,
    				width: s.width,
    				height: s.height,
    				transform: s.transform
    			})) visibleEdgeIds.push(edge.id);
    		}
    		return visibleEdgeIds;
    	}, [onlyRenderVisible]), shallow$1);
    }
    const ArrowSymbol = ({ color = "none", strokeWidth = 1 }) => {
    	const style = {
    		strokeWidth,
    		...color && { stroke: color }
    	};
    	return (0, react_jsx_runtime.jsx)("polyline", {
    		className: "arrow",
    		style,
    		strokeLinecap: "round",
    		fill: "none",
    		strokeLinejoin: "round",
    		points: "-5,-4 0,0 -5,4"
    	});
    };
    const ArrowClosedSymbol = ({ color = "none", strokeWidth = 1 }) => {
    	const style = {
    		strokeWidth,
    		...color && {
    			stroke: color,
    			fill: color
    		}
    	};
    	return (0, react_jsx_runtime.jsx)("polyline", {
    		className: "arrowclosed",
    		style,
    		strokeLinecap: "round",
    		strokeLinejoin: "round",
    		points: "-5,-4 0,0 -5,4 -5,-4"
    	});
    };
    const MarkerSymbols = {
    	[MarkerType.Arrow]: ArrowSymbol,
    	[MarkerType.ArrowClosed]: ArrowClosedSymbol
    };
    function useMarkerSymbol(type) {
    	const store = useStoreApi();
    	return (0, react.useMemo)(() => {
    		if (!Object.prototype.hasOwnProperty.call(MarkerSymbols, type)) {
    			store.getState().onError?.("009", errorMessages["error009"](type));
    			return null;
    		}
    		return MarkerSymbols[type];
    	}, [type]);
    }
    const Marker = ({ id, type, color, width = 12.5, height = 12.5, markerUnits = "strokeWidth", strokeWidth, orient = "auto-start-reverse" }) => {
    	const Symbol = useMarkerSymbol(type);
    	if (!Symbol) return null;
    	return (0, react_jsx_runtime.jsx)("marker", {
    		className: "react-flow__arrowhead",
    		id,
    		markerWidth: `${width}`,
    		markerHeight: `${height}`,
    		viewBox: "-10 -10 20 20",
    		markerUnits,
    		orient,
    		refX: "0",
    		refY: "0",
    		children: (0, react_jsx_runtime.jsx)(Symbol, {
    			color,
    			strokeWidth
    		})
    	});
    };
    const MarkerDefinitions = ({ defaultColor, rfId }) => {
    	const edges = useStore((s) => s.edges);
    	const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    	const markers = (0, react.useMemo)(() => {
    		return createMarkerIds(edges, {
    			id: rfId,
    			defaultColor,
    			defaultMarkerStart: defaultEdgeOptions?.markerStart,
    			defaultMarkerEnd: defaultEdgeOptions?.markerEnd
    		});
    	}, [
    		edges,
    		defaultEdgeOptions,
    		rfId,
    		defaultColor
    	]);
    	if (!markers.length) return null;
    	return (0, react_jsx_runtime.jsx)("svg", {
    		className: "react-flow__marker",
    		"aria-hidden": "true",
    		children: (0, react_jsx_runtime.jsx)("defs", { children: markers.map((marker) => (0, react_jsx_runtime.jsx)(Marker, {
    			id: marker.id,
    			type: marker.type,
    			color: marker.color,
    			width: marker.width,
    			height: marker.height,
    			markerUnits: marker.markerUnits,
    			strokeWidth: marker.strokeWidth,
    			orient: marker.orient
    		}, marker.id)) })
    	});
    };
    MarkerDefinitions.displayName = "MarkerDefinitions";
    var MarkerDefinitions$1 = (0, react.memo)(MarkerDefinitions);
    function EdgeTextComponent({ x, y, label, labelStyle, labelShowBg = true, labelBgStyle, labelBgPadding = [2, 4], labelBgBorderRadius = 2, children, className, ...rest }) {
    	const [edgeTextBbox, setEdgeTextBbox] = (0, react.useState)({
    		x: 1,
    		y: 0,
    		width: 0,
    		height: 0
    	});
    	const edgeTextClasses = cc(["react-flow__edge-textwrapper", className]);
    	const edgeTextRef = (0, react.useRef)(null);
    	(0, react.useEffect)(() => {
    		if (edgeTextRef.current) {
    			const textBbox = edgeTextRef.current.getBBox();
    			setEdgeTextBbox({
    				x: textBbox.x,
    				y: textBbox.y,
    				width: textBbox.width,
    				height: textBbox.height
    			});
    		}
    	}, [label]);
    	if (!label) return null;
    	return (0, react_jsx_runtime.jsxs)("g", {
    		transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`,
    		className: edgeTextClasses,
    		visibility: edgeTextBbox.width ? "visible" : "hidden",
    		...rest,
    		children: [
    			labelShowBg && (0, react_jsx_runtime.jsx)("rect", {
    				width: edgeTextBbox.width + 2 * labelBgPadding[0],
    				x: -labelBgPadding[0],
    				y: -labelBgPadding[1],
    				height: edgeTextBbox.height + 2 * labelBgPadding[1],
    				className: "react-flow__edge-textbg",
    				style: labelBgStyle,
    				rx: labelBgBorderRadius,
    				ry: labelBgBorderRadius
    			}),
    			(0, react_jsx_runtime.jsx)("text", {
    				className: "react-flow__edge-text",
    				y: edgeTextBbox.height / 2,
    				dy: "0.3em",
    				ref: edgeTextRef,
    				style: labelStyle,
    				children: label
    			}),
    			children
    		]
    	});
    }
    EdgeTextComponent.displayName = "EdgeText";
    /**
    * You can use the `<EdgeText />` component as a helper component to display text
    * within your custom edges.
    *
    * @public
    *
    * @example
    * ```jsx
    * import { EdgeText } from '@xyflow/react';
    *
    * export function CustomEdgeLabel({ label }) {
    *   return (
    *     <EdgeText
    *       x={100}
    *       y={100}
    *       label={label}
    *       labelStyle={{ fill: 'white' }}
    *       labelShowBg
    *       labelBgStyle={{ fill: 'red' }}
    *       labelBgPadding={[2, 4]}
    *       labelBgBorderRadius={2}
    *     />
    *   );
    * }
    *```
    */
    const EdgeText = (0, react.memo)(EdgeTextComponent);
    /**
    * The `<BaseEdge />` component gets used internally for all the edges. It can be
    * used inside a custom edge and handles the invisible helper edge and the edge label
    * for you.
    *
    * @public
    * @example
    * ```jsx
    *import { BaseEdge } from '@xyflow/react';
    *
    *export function CustomEdge({ sourceX, sourceY, targetX, targetY, ...props }) {
    *  const [edgePath] = getStraightPath({
    *    sourceX,
    *    sourceY,
    *    targetX,
    *    targetY,
    *  });
    *
    *  return <BaseEdge path={edgePath} {...props} />;
    *}
    *```
    *
    * @remarks If you want to use an edge marker with the [`<BaseEdge />`](/api-reference/components/base-edge) component,
    * you can pass the `markerStart` or `markerEnd` props passed to your custom edge
    * through to the [`<BaseEdge />`](/api-reference/components/base-edge) component.
    * You can see all the props passed to a custom edge by looking at the [`EdgeProps`](/api-reference/types/edge-props) type.
    */
    function BaseEdge({ path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, interactionWidth = 20, ...props }) {
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    		(0, react_jsx_runtime.jsx)("path", {
    			...props,
    			d: path,
    			fill: "none",
    			className: cc(["react-flow__edge-path", props.className])
    		}),
    		interactionWidth ? (0, react_jsx_runtime.jsx)("path", {
    			d: path,
    			fill: "none",
    			strokeOpacity: 0,
    			strokeWidth: interactionWidth,
    			className: "react-flow__edge-interaction"
    		}) : null,
    		label && isNumeric(labelX) && isNumeric(labelY) ? (0, react_jsx_runtime.jsx)(EdgeText, {
    			x: labelX,
    			y: labelY,
    			label,
    			labelStyle,
    			labelShowBg,
    			labelBgStyle,
    			labelBgPadding,
    			labelBgBorderRadius
    		}) : null
    	] });
    }
    function getControl({ pos, x1, y1, x2, y2 }) {
    	if (pos === Position.Left || pos === Position.Right) return [.5 * (x1 + x2), y1];
    	return [x1, .5 * (y1 + y2)];
    }
    /**
    * The `getSimpleBezierPath` util returns everything you need to render a simple
    * bezier edge between two nodes.
    * @public
    * @returns
    * - `path`: the path to use in an SVG `<path>` element.
    * - `labelX`: the `x` position you can use to render a label for this edge.
    * - `labelY`: the `y` position you can use to render a label for this edge.
    * - `offsetX`: the absolute difference between the source `x` position and the `x` position of the
    * middle of this path.
    * - `offsetY`: the absolute difference between the source `y` position and the `y` position of the
    * middle of this path.
    */
    function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top }) {
    	const [sourceControlX, sourceControlY] = getControl({
    		pos: sourcePosition,
    		x1: sourceX,
    		y1: sourceY,
    		x2: targetX,
    		y2: targetY
    	});
    	const [targetControlX, targetControlY] = getControl({
    		pos: targetPosition,
    		x1: targetX,
    		y1: targetY,
    		x2: sourceX,
    		y2: sourceY
    	});
    	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    		sourceX,
    		sourceY,
    		targetX,
    		targetY,
    		sourceControlX,
    		sourceControlY,
    		targetControlX,
    		targetControlY
    	});
    	return [
    		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
    		labelX,
    		labelY,
    		offsetX,
    		offsetY
    	];
    }
    function createSimpleBezierEdge(params) {
    	return (0, react.memo)(({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
    		const [path, labelX, labelY] = getSimpleBezierPath({
    			sourceX,
    			sourceY,
    			sourcePosition,
    			targetX,
    			targetY,
    			targetPosition
    		});
    		const _id = params.isInternal ? void 0 : id;
    		return (0, react_jsx_runtime.jsx)(BaseEdge, {
    			id: _id,
    			path,
    			labelX,
    			labelY,
    			label,
    			labelStyle,
    			labelShowBg,
    			labelBgStyle,
    			labelBgPadding,
    			labelBgBorderRadius,
    			style,
    			markerEnd,
    			markerStart,
    			interactionWidth
    		});
    	});
    }
    const SimpleBezierEdge = createSimpleBezierEdge({ isInternal: false });
    const SimpleBezierEdgeInternal = createSimpleBezierEdge({ isInternal: true });
    SimpleBezierEdge.displayName = "SimpleBezierEdge";
    SimpleBezierEdgeInternal.displayName = "SimpleBezierEdgeInternal";
    function createSmoothStepEdge(params) {
    	return (0, react.memo)(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition = Position.Bottom, targetPosition = Position.Top, markerEnd, markerStart, pathOptions, interactionWidth }) => {
    		const [path, labelX, labelY] = getSmoothStepPath({
    			sourceX,
    			sourceY,
    			sourcePosition,
    			targetX,
    			targetY,
    			targetPosition,
    			borderRadius: pathOptions?.borderRadius,
    			offset: pathOptions?.offset,
    			stepPosition: pathOptions?.stepPosition
    		});
    		const _id = params.isInternal ? void 0 : id;
    		return (0, react_jsx_runtime.jsx)(BaseEdge, {
    			id: _id,
    			path,
    			labelX,
    			labelY,
    			label,
    			labelStyle,
    			labelShowBg,
    			labelBgStyle,
    			labelBgPadding,
    			labelBgBorderRadius,
    			style,
    			markerEnd,
    			markerStart,
    			interactionWidth
    		});
    	});
    }
    /**
    * Component that can be used inside a custom edge to render a smooth step edge.
    *
    * @public
    * @example
    *
    * ```tsx
    * import { SmoothStepEdge } from '@xyflow/react';
    *
    * function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
    *   return (
    *     <SmoothStepEdge
    *       sourceX={sourceX}
    *       sourceY={sourceY}
    *       targetX={targetX}
    *       targetY={targetY}
    *       sourcePosition={sourcePosition}
    *       targetPosition={targetPosition}
    *     />
    *   );
    * }
    * ```
    */
    const SmoothStepEdge = createSmoothStepEdge({ isInternal: false });
    /**
    * @internal
    */
    const SmoothStepEdgeInternal = createSmoothStepEdge({ isInternal: true });
    SmoothStepEdge.displayName = "SmoothStepEdge";
    SmoothStepEdgeInternal.displayName = "SmoothStepEdgeInternal";
    function createStepEdge(params) {
    	return (0, react.memo)(({ id, ...props }) => {
    		const _id = params.isInternal ? void 0 : id;
    		return (0, react_jsx_runtime.jsx)(SmoothStepEdge, {
    			...props,
    			id: _id,
    			pathOptions: (0, react.useMemo)(() => ({
    				borderRadius: 0,
    				offset: props.pathOptions?.offset
    			}), [props.pathOptions?.offset])
    		});
    	});
    }
    /**
    * Component that can be used inside a custom edge to render a step edge.
    *
    * @public
    * @example
    *
    * ```tsx
    * import { StepEdge } from '@xyflow/react';
    *
    * function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
    *   return (
    *     <StepEdge
    *       sourceX={sourceX}
    *       sourceY={sourceY}
    *       targetX={targetX}
    *       targetY={targetY}
    *       sourcePosition={sourcePosition}
    *       targetPosition={targetPosition}
    *     />
    *   );
    * }
    * ```
    */
    const StepEdge = createStepEdge({ isInternal: false });
    /**
    * @internal
    */
    const StepEdgeInternal = createStepEdge({ isInternal: true });
    StepEdge.displayName = "StepEdge";
    StepEdgeInternal.displayName = "StepEdgeInternal";
    function createStraightEdge(params) {
    	return (0, react.memo)(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
    		const [path, labelX, labelY] = getStraightPath({
    			sourceX,
    			sourceY,
    			targetX,
    			targetY
    		});
    		const _id = params.isInternal ? void 0 : id;
    		return (0, react_jsx_runtime.jsx)(BaseEdge, {
    			id: _id,
    			path,
    			labelX,
    			labelY,
    			label,
    			labelStyle,
    			labelShowBg,
    			labelBgStyle,
    			labelBgPadding,
    			labelBgBorderRadius,
    			style,
    			markerEnd,
    			markerStart,
    			interactionWidth
    		});
    	});
    }
    /**
    * Component that can be used inside a custom edge to render a straight line.
    *
    * @public
    * @example
    *
    * ```tsx
    * import { StraightEdge } from '@xyflow/react';
    *
    * function CustomEdge({ sourceX, sourceY, targetX, targetY }) {
    *   return (
    *     <StraightEdge
    *       sourceX={sourceX}
    *       sourceY={sourceY}
    *       targetX={targetX}
    *       targetY={targetY}
    *     />
    *   );
    * }
    * ```
    */
    const StraightEdge = createStraightEdge({ isInternal: false });
    /**
    * @internal
    */
    const StraightEdgeInternal = createStraightEdge({ isInternal: true });
    StraightEdge.displayName = "StraightEdge";
    StraightEdgeInternal.displayName = "StraightEdgeInternal";
    function createBezierEdge(params) {
    	return (0, react.memo)(({ id, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth }) => {
    		const [path, labelX, labelY] = getBezierPath({
    			sourceX,
    			sourceY,
    			sourcePosition,
    			targetX,
    			targetY,
    			targetPosition,
    			curvature: pathOptions?.curvature
    		});
    		const _id = params.isInternal ? void 0 : id;
    		return (0, react_jsx_runtime.jsx)(BaseEdge, {
    			id: _id,
    			path,
    			labelX,
    			labelY,
    			label,
    			labelStyle,
    			labelShowBg,
    			labelBgStyle,
    			labelBgPadding,
    			labelBgBorderRadius,
    			style,
    			markerEnd,
    			markerStart,
    			interactionWidth
    		});
    	});
    }
    /**
    * Component that can be used inside a custom edge to render a bezier curve.
    *
    * @public
    * @example
    *
    * ```tsx
    * import { BezierEdge } from '@xyflow/react';
    *
    * function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
    *   return (
    *     <BezierEdge
    *       sourceX={sourceX}
    *       sourceY={sourceY}
    *       targetX={targetX}
    *       targetY={targetY}
    *       sourcePosition={sourcePosition}
    *       targetPosition={targetPosition}
    *     />
    *   );
    * }
    * ```
    */
    const BezierEdge = createBezierEdge({ isInternal: false });
    /**
    * @internal
    */
    const BezierEdgeInternal = createBezierEdge({ isInternal: true });
    BezierEdge.displayName = "BezierEdge";
    BezierEdgeInternal.displayName = "BezierEdgeInternal";
    const builtinEdgeTypes = {
    	default: BezierEdgeInternal,
    	straight: StraightEdgeInternal,
    	step: StepEdgeInternal,
    	smoothstep: SmoothStepEdgeInternal,
    	simplebezier: SimpleBezierEdgeInternal
    };
    const nullPosition = {
    	sourceX: null,
    	sourceY: null,
    	targetX: null,
    	targetY: null,
    	sourcePosition: null,
    	targetPosition: null,
    	zIndex: void 0
    };
    const shiftX = (x, shift, position) => {
    	if (position === Position.Left) return x - shift;
    	if (position === Position.Right) return x + shift;
    	return x;
    };
    const shiftY = (y, shift, position) => {
    	if (position === Position.Top) return y - shift;
    	if (position === Position.Bottom) return y + shift;
    	return y;
    };
    const EdgeUpdaterClassName = "react-flow__edgeupdater";
    /**
    * @internal
    */
    function EdgeAnchor({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type }) {
    	return (0, react_jsx_runtime.jsx)("circle", {
    		onMouseDown,
    		onMouseEnter,
    		onMouseOut,
    		className: cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`]),
    		cx: shiftX(centerX, radius, position),
    		cy: shiftY(centerY, radius, position),
    		r: radius,
    		stroke: "transparent",
    		fill: "transparent"
    	});
    }
    function EdgeUpdateAnchors({ isReconnectable, reconnectRadius, edge, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, onReconnect, onReconnectStart, onReconnectEnd, setReconnecting, setUpdateHover }) {
    	const store = useStoreApi();
    	const handleEdgeUpdater = (event, oppositeHandle) => {
    		if (event.button !== 0) return;
    		const { autoPanOnConnect, domNode, connectionMode, connectionRadius, lib, onConnectStart, cancelConnection, nodeLookup, rfId: flowId, panBy, updateConnection } = store.getState();
    		const isTarget = oppositeHandle.type === "target";
    		const _onReconnectEnd = (evt, connectionState) => {
    			setReconnecting(false);
    			onReconnectEnd?.(evt, edge, oppositeHandle.type, connectionState);
    		};
    		const onConnectEdge = (connection) => onReconnect?.(edge, connection);
    		const _onConnectStart = (_event, params) => {
    			setReconnecting(true);
    			onReconnectStart?.(event, edge, oppositeHandle.type);
    			onConnectStart?.(_event, params);
    		};
    		XYHandle.onPointerDown(event.nativeEvent, {
    			autoPanOnConnect,
    			connectionMode,
    			connectionRadius,
    			domNode,
    			handleId: oppositeHandle.id,
    			nodeId: oppositeHandle.nodeId,
    			nodeLookup,
    			isTarget,
    			edgeUpdaterType: oppositeHandle.type,
    			lib,
    			flowId,
    			cancelConnection,
    			panBy,
    			isValidConnection: (...args) => store.getState().isValidConnection?.(...args) ?? true,
    			onConnect: onConnectEdge,
    			onConnectStart: _onConnectStart,
    			onConnectEnd: (...args) => store.getState().onConnectEnd?.(...args),
    			onReconnectEnd: _onReconnectEnd,
    			updateConnection,
    			getTransform: () => store.getState().transform,
    			getFromHandle: () => store.getState().connection.fromHandle,
    			dragThreshold: store.getState().connectionDragThreshold,
    			handleDomNode: event.currentTarget
    		});
    	};
    	const onReconnectSourceMouseDown = (event) => handleEdgeUpdater(event, {
    		nodeId: edge.target,
    		id: edge.targetHandle ?? null,
    		type: "target"
    	});
    	const onReconnectTargetMouseDown = (event) => handleEdgeUpdater(event, {
    		nodeId: edge.source,
    		id: edge.sourceHandle ?? null,
    		type: "source"
    	});
    	const onReconnectMouseEnter = () => setUpdateHover(true);
    	const onReconnectMouseOut = () => setUpdateHover(false);
    	return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(isReconnectable === true || isReconnectable === "source") && (0, react_jsx_runtime.jsx)(EdgeAnchor, {
    		position: sourcePosition,
    		centerX: sourceX,
    		centerY: sourceY,
    		radius: reconnectRadius,
    		onMouseDown: onReconnectSourceMouseDown,
    		onMouseEnter: onReconnectMouseEnter,
    		onMouseOut: onReconnectMouseOut,
    		type: "source"
    	}), (isReconnectable === true || isReconnectable === "target") && (0, react_jsx_runtime.jsx)(EdgeAnchor, {
    		position: targetPosition,
    		centerX: targetX,
    		centerY: targetY,
    		radius: reconnectRadius,
    		onMouseDown: onReconnectTargetMouseDown,
    		onMouseEnter: onReconnectMouseEnter,
    		onMouseOut: onReconnectMouseOut,
    		type: "target"
    	})] });
    }
    function EdgeWrapper({ id, edgesFocusable, edgesReconnectable, elementsSelectable, onClick, onDoubleClick, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, rfId, edgeTypes, noPanClassName, onError, disableKeyboardA11y }) {
    	let edge = useStore((s) => s.edgeLookup.get(id));
    	const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    	edge = defaultEdgeOptions ? {
    		...defaultEdgeOptions,
    		...edge
    	} : edge;
    	let edgeType = edge.type || "default";
    	let EdgeComponent = edgeTypes?.[edgeType] || builtinEdgeTypes[edgeType];
    	if (EdgeComponent === void 0) {
    		onError?.("011", errorMessages["error011"](edgeType));
    		edgeType = "default";
    		EdgeComponent = edgeTypes?.["default"] || builtinEdgeTypes.default;
    	}
    	const isFocusable = !!(edge.focusable || edgesFocusable && typeof edge.focusable === "undefined");
    	const isReconnectable = typeof onReconnect !== "undefined" && (edge.reconnectable || edgesReconnectable && typeof edge.reconnectable === "undefined");
    	const isSelectable = !!(edge.selectable || elementsSelectable && typeof edge.selectable === "undefined");
    	const edgeRef = (0, react.useRef)(null);
    	const [updateHover, setUpdateHover] = (0, react.useState)(false);
    	const [reconnecting, setReconnecting] = (0, react.useState)(false);
    	const store = useStoreApi();
    	const { zIndex = edge.zIndex, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = useStore((0, react.useCallback)((store) => {
    		const sourceNode = store.nodeLookup.get(edge.source);
    		const targetNode = store.nodeLookup.get(edge.target);
    		if (!sourceNode || !targetNode) return nullPosition;
    		const edgePosition = getEdgePosition({
    			id,
    			sourceNode,
    			targetNode,
    			sourceHandle: edge.sourceHandle || null,
    			targetHandle: edge.targetHandle || null,
    			connectionMode: store.connectionMode,
    			onError
    		});
    		const zIndex = getElevatedEdgeZIndex({
    			selected: edge.selected,
    			zIndex: edge.zIndex,
    			sourceNode,
    			targetNode,
    			elevateOnSelect: store.elevateEdgesOnSelect,
    			zIndexMode: store.zIndexMode
    		});
    		return {
    			...edgePosition || nullPosition,
    			zIndex
    		};
    	}, [
    		edge.source,
    		edge.target,
    		edge.sourceHandle,
    		edge.targetHandle,
    		edge.selected,
    		edge.zIndex,
    		onError
    	]), shallow$1);
    	const markerStartUrl = (0, react.useMemo)(() => edge.markerStart ? `url('#${getMarkerId(edge.markerStart, rfId)}')` : void 0, [edge.markerStart, rfId]);
    	const markerEndUrl = (0, react.useMemo)(() => edge.markerEnd ? `url('#${getMarkerId(edge.markerEnd, rfId)}')` : void 0, [edge.markerEnd, rfId]);
    	if (edge.hidden || sourceX === null || sourceY === null || targetX === null || targetY === null) return null;
    	const onEdgeClick = (event) => {
    		const { addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
    		if (isSelectable) {
    			store.setState({ nodesSelectionActive: false });
    			if (edge.selected && multiSelectionActive) {
    				unselectNodesAndEdges({
    					nodes: [],
    					edges: [edge]
    				});
    				edgeRef.current?.blur();
    			} else addSelectedEdges([id]);
    		}
    		if (onClick) onClick(event, edge);
    	};
    	const onEdgeDoubleClick = onDoubleClick ? (event) => {
    		onDoubleClick(event, { ...edge });
    	} : void 0;
    	const onEdgeContextMenu = onContextMenu ? (event) => {
    		onContextMenu(event, { ...edge });
    	} : void 0;
    	const onEdgeMouseEnter = onMouseEnter ? (event) => {
    		onMouseEnter(event, { ...edge });
    	} : void 0;
    	const onEdgeMouseMove = onMouseMove ? (event) => {
    		onMouseMove(event, { ...edge });
    	} : void 0;
    	const onEdgeMouseLeave = onMouseLeave ? (event) => {
    		onMouseLeave(event, { ...edge });
    	} : void 0;
    	const onKeyDown = (event) => {
    		if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && isSelectable) {
    			const { unselectNodesAndEdges, addSelectedEdges } = store.getState();
    			if (event.key === "Escape") {
    				edgeRef.current?.blur();
    				unselectNodesAndEdges({ edges: [edge] });
    			} else addSelectedEdges([id]);
    		}
    	};
    	return (0, react_jsx_runtime.jsx)("svg", {
    		style: { zIndex },
    		children: (0, react_jsx_runtime.jsxs)("g", {
    			className: cc([
    				"react-flow__edge",
    				`react-flow__edge-${edgeType}`,
    				edge.className,
    				noPanClassName,
    				{
    					selected: edge.selected,
    					animated: edge.animated,
    					inactive: !isSelectable && !onClick,
    					updating: updateHover,
    					selectable: isSelectable
    				}
    			]),
    			onClick: onEdgeClick,
    			onDoubleClick: onEdgeDoubleClick,
    			onContextMenu: onEdgeContextMenu,
    			onMouseEnter: onEdgeMouseEnter,
    			onMouseMove: onEdgeMouseMove,
    			onMouseLeave: onEdgeMouseLeave,
    			onKeyDown: isFocusable ? onKeyDown : void 0,
    			tabIndex: isFocusable ? 0 : void 0,
    			role: edge.ariaRole ?? (isFocusable ? "group" : "img"),
    			"aria-roledescription": "edge",
    			"data-id": id,
    			"data-testid": `rf__edge-${id}`,
    			"aria-label": edge.ariaLabel === null ? void 0 : edge.ariaLabel || `Edge from ${edge.source} to ${edge.target}`,
    			"aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : void 0,
    			ref: edgeRef,
    			...edge.domAttributes,
    			children: [!reconnecting && (0, react_jsx_runtime.jsx)(EdgeComponent, {
    				id,
    				source: edge.source,
    				target: edge.target,
    				type: edge.type,
    				selected: edge.selected,
    				animated: edge.animated,
    				selectable: isSelectable,
    				deletable: edge.deletable ?? true,
    				label: edge.label,
    				labelStyle: edge.labelStyle,
    				labelShowBg: edge.labelShowBg,
    				labelBgStyle: edge.labelBgStyle,
    				labelBgPadding: edge.labelBgPadding,
    				labelBgBorderRadius: edge.labelBgBorderRadius,
    				sourceX,
    				sourceY,
    				targetX,
    				targetY,
    				sourcePosition,
    				targetPosition,
    				data: edge.data,
    				style: edge.style,
    				sourceHandleId: edge.sourceHandle,
    				targetHandleId: edge.targetHandle,
    				markerStart: markerStartUrl,
    				markerEnd: markerEndUrl,
    				pathOptions: "pathOptions" in edge ? edge.pathOptions : void 0,
    				interactionWidth: edge.interactionWidth
    			}), isReconnectable && (0, react_jsx_runtime.jsx)(EdgeUpdateAnchors, {
    				edge,
    				isReconnectable,
    				reconnectRadius,
    				onReconnect,
    				onReconnectStart,
    				onReconnectEnd,
    				sourceX,
    				sourceY,
    				targetX,
    				targetY,
    				sourcePosition,
    				targetPosition,
    				setUpdateHover,
    				setReconnecting
    			})]
    		})
    	});
    }
    var EdgeWrapper$1 = (0, react.memo)(EdgeWrapper);
    const selector$9 = (s) => ({
    	edgesFocusable: s.edgesFocusable,
    	edgesReconnectable: s.edgesReconnectable,
    	elementsSelectable: s.elementsSelectable,
    	connectionMode: s.connectionMode,
    	onError: s.onError
    });
    function EdgeRendererComponent({ defaultMarkerColor, onlyRenderVisibleElements, rfId, edgeTypes, noPanClassName, onReconnect, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, reconnectRadius, onEdgeDoubleClick, onReconnectStart, onReconnectEnd, disableKeyboardA11y }) {
    	const { edgesFocusable, edgesReconnectable, elementsSelectable, onError } = useStore(selector$9, shallow$1);
    	const edgeIds = useVisibleEdgeIds(onlyRenderVisibleElements);
    	return (0, react_jsx_runtime.jsxs)("div", {
    		className: "react-flow__edges",
    		children: [(0, react_jsx_runtime.jsx)(MarkerDefinitions$1, {
    			defaultColor: defaultMarkerColor,
    			rfId
    		}), edgeIds.map((id) => {
    			return (0, react_jsx_runtime.jsx)(EdgeWrapper$1, {
    				id,
    				edgesFocusable,
    				edgesReconnectable,
    				elementsSelectable,
    				noPanClassName,
    				onReconnect,
    				onContextMenu: onEdgeContextMenu,
    				onMouseEnter: onEdgeMouseEnter,
    				onMouseMove: onEdgeMouseMove,
    				onMouseLeave: onEdgeMouseLeave,
    				onClick: onEdgeClick,
    				reconnectRadius,
    				onDoubleClick: onEdgeDoubleClick,
    				onReconnectStart,
    				onReconnectEnd,
    				rfId,
    				onError,
    				edgeTypes,
    				disableKeyboardA11y
    			}, id);
    		})]
    	});
    }
    EdgeRendererComponent.displayName = "EdgeRenderer";
    const EdgeRenderer = (0, react.memo)(EdgeRendererComponent);
    const toTransformString = (transform) => `translate(${transform[0]}px,${transform[1]}px) scale(${transform[2]})`;
    function Viewport({ children }) {
    	const store = useStoreApi();
    	const viewportRef = (0, react.useRef)(null);
    	const [initialTransform] = (0, react.useState)(() => store.getState().transform);
    	useIsomorphicLayoutEffect(() => {
    		let prevTransform = null;
    		const applyTransform = () => {
    			const transform = store.getState().transform;
    			if (prevTransform && transform[0] === prevTransform[0] && transform[1] === prevTransform[1] && transform[2] === prevTransform[2]) return;
    			prevTransform = transform;
    			if (viewportRef.current) viewportRef.current.style.transform = toTransformString(transform);
    		};
    		applyTransform();
    		return store.subscribe(applyTransform);
    	}, [store]);
    	return (0, react_jsx_runtime.jsx)("div", {
    		ref: viewportRef,
    		className: "react-flow__viewport xyflow__viewport react-flow__container",
    		style: { transform: toTransformString(initialTransform) },
    		children
    	});
    }
    /**
    * Hook for calling onInit handler.
    *
    * @internal
    */
    function useOnInitHandler(onInit) {
    	const rfInstance = useReactFlow();
    	const isInitialized = (0, react.useRef)(false);
    	(0, react.useEffect)(() => {
    		if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
    			setTimeout(() => onInit(rfInstance), 1);
    			isInitialized.current = true;
    		}
    	}, [onInit, rfInstance.viewportInitialized]);
    }
    const selector$8 = (state) => state.panZoom?.syncViewport;
    /**
    * Hook for syncing the viewport with the panzoom instance.
    *
    * @internal
    * @param viewport
    */
    function useViewportSync(viewport) {
    	const syncViewport = useStore(selector$8);
    	const store = useStoreApi();
    	(0, react.useEffect)(() => {
    		if (viewport) {
    			syncViewport?.(viewport);
    			store.setState({ transform: [
    				viewport.x,
    				viewport.y,
    				viewport.zoom
    			] });
    		}
    	}, [viewport, syncViewport]);
    	return null;
    }
    function storeSelector$1(s) {
    	return s.connection.inProgress ? {
    		...s.connection,
    		to: pointToRendererPoint(s.connection.to, s.transform)
    	} : { ...s.connection };
    }
    function getSelector(connectionSelector) {
    	if (connectionSelector) {
    		const combinedSelector = (s) => {
    			return connectionSelector(storeSelector$1(s));
    		};
    		return combinedSelector;
    	}
    	return storeSelector$1;
    }
    /**
    * The `useConnection` hook returns the current connection when there is an active
    * connection interaction. If no connection interaction is active, it returns null
    * for every property. A typical use case for this hook is to colorize handles
    * based on a certain condition (e.g. if the connection is valid or not).
    *
    * @public
    * @param connectionSelector - An optional selector function used to extract a slice of the
    * `ConnectionState` data. Using a selector can prevent component re-renders where data you don't
    * otherwise care about might change. If a selector is not provided, the entire `ConnectionState`
    * object is returned unchanged.
    * @example
    *
    * ```tsx
    *import { useConnection } from '@xyflow/react';
    *
    *function App() {
    *  const connection = useConnection();
    *
    *  return (
    *    <div> {connection ? `Someone is trying to make a connection from ${connection.fromNode} to this one.` : 'There are currently no incoming connections!'}
    *
    *   </div>
    *   );
    * }
    * ```
    *
    * @returns ConnectionState
    */
    function useConnection(connectionSelector) {
    	return useStore(getSelector(connectionSelector), shallow$1);
    }
    const selector$7 = (s) => ({
    	nodesConnectable: s.nodesConnectable,
    	isValid: s.connection.isValid,
    	inProgress: s.connection.inProgress,
    	width: s.width,
    	height: s.height
    });
    function ConnectionLineWrapper({ containerStyle, style, type, component }) {
    	const { nodesConnectable, width, height, isValid, inProgress } = useStore(selector$7, shallow$1);
    	if (!!!(width && nodesConnectable && inProgress)) return null;
    	return (0, react_jsx_runtime.jsx)("svg", {
    		style: containerStyle,
    		width,
    		height,
    		className: "react-flow__connectionline react-flow__container",
    		children: (0, react_jsx_runtime.jsx)("g", {
    			className: cc(["react-flow__connection", getConnectionStatus(isValid)]),
    			children: (0, react_jsx_runtime.jsx)(ConnectionLine, {
    				style,
    				type,
    				CustomComponent: component,
    				isValid
    			})
    		})
    	});
    }
    const ConnectionLine = ({ style, type = ConnectionLineType.Bezier, CustomComponent, isValid }) => {
    	const { inProgress, from, fromNode, fromHandle, fromPosition, to, toNode, toHandle, toPosition, pointer } = useConnection();
    	if (!inProgress) return;
    	if (CustomComponent) return (0, react_jsx_runtime.jsx)(CustomComponent, {
    		connectionLineType: type,
    		connectionLineStyle: style,
    		fromNode,
    		fromHandle,
    		fromX: from.x,
    		fromY: from.y,
    		toX: to.x,
    		toY: to.y,
    		fromPosition,
    		toPosition,
    		connectionStatus: getConnectionStatus(isValid),
    		toNode,
    		toHandle,
    		pointer
    	});
    	let path = "";
    	const pathParams = {
    		sourceX: from.x,
    		sourceY: from.y,
    		sourcePosition: fromPosition,
    		targetX: to.x,
    		targetY: to.y,
    		targetPosition: toPosition
    	};
    	switch (type) {
    		case ConnectionLineType.Bezier:
    			[path] = getBezierPath(pathParams);
    			break;
    		case ConnectionLineType.SimpleBezier:
    			[path] = getSimpleBezierPath(pathParams);
    			break;
    		case ConnectionLineType.Step:
    			[path] = getSmoothStepPath({
    				...pathParams,
    				borderRadius: 0
    			});
    			break;
    		case ConnectionLineType.SmoothStep:
    			[path] = getSmoothStepPath(pathParams);
    			break;
    		default: [path] = getStraightPath(pathParams);
    	}
    	return (0, react_jsx_runtime.jsx)("path", {
    		d: path,
    		fill: "none",
    		className: "react-flow__connection-path",
    		style
    	});
    };
    ConnectionLine.displayName = "ConnectionLine";
    const emptyTypes = {};
    function useNodeOrEdgeTypesWarning(nodeOrEdgeTypes = emptyTypes) {
    	(0, react.useRef)(nodeOrEdgeTypes);
    	useStoreApi();
    	(0, react.useEffect)(() => {}, [nodeOrEdgeTypes]);
    }
    function useStylesLoadedWarning() {
    	useStoreApi();
    	(0, react.useRef)(false);
    	(0, react.useEffect)(() => {}, []);
    }
    function GraphViewComponent({ nodeTypes, edgeTypes, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, autoPanOnSelection, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance, nodeClickDistance, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, noDragClassName, noWheelClassName, noPanClassName, disableKeyboardA11y, nodeExtent, rfId, viewport, onViewportChange, nodesDraggable }) {
    	useNodeOrEdgeTypesWarning(nodeTypes);
    	useNodeOrEdgeTypesWarning(edgeTypes);
    	useStylesLoadedWarning();
    	useOnInitHandler(onInit);
    	useViewportSync(viewport);
    	return (0, react_jsx_runtime.jsx)(FlowRenderer, {
    		onPaneClick,
    		onPaneMouseEnter,
    		onPaneMouseMove,
    		onPaneMouseLeave,
    		onPaneContextMenu,
    		onPaneScroll,
    		paneClickDistance,
    		deleteKeyCode,
    		selectionKeyCode,
    		selectionOnDrag,
    		selectionMode,
    		onSelectionStart,
    		onSelectionEnd,
    		multiSelectionKeyCode,
    		panActivationKeyCode,
    		zoomActivationKeyCode,
    		elementsSelectable,
    		zoomOnScroll,
    		zoomOnPinch,
    		zoomOnDoubleClick,
    		panOnScroll,
    		panOnScrollSpeed,
    		panOnScrollMode,
    		panOnDrag,
    		autoPanOnSelection,
    		defaultViewport,
    		translateExtent,
    		minZoom,
    		maxZoom,
    		onSelectionContextMenu,
    		preventScrolling,
    		noDragClassName,
    		noWheelClassName,
    		noPanClassName,
    		disableKeyboardA11y,
    		onViewportChange,
    		isControlledViewport: !!viewport,
    		children: (0, react_jsx_runtime.jsxs)(Viewport, { children: [
    			(0, react_jsx_runtime.jsx)(EdgeRenderer, {
    				edgeTypes,
    				onEdgeClick,
    				onEdgeDoubleClick,
    				onReconnect,
    				onReconnectStart,
    				onReconnectEnd,
    				onlyRenderVisibleElements,
    				onEdgeContextMenu,
    				onEdgeMouseEnter,
    				onEdgeMouseMove,
    				onEdgeMouseLeave,
    				reconnectRadius,
    				defaultMarkerColor,
    				noPanClassName,
    				disableKeyboardA11y,
    				rfId
    			}),
    			(0, react_jsx_runtime.jsx)(ConnectionLineWrapper, {
    				style: connectionLineStyle,
    				type: connectionLineType,
    				component: connectionLineComponent,
    				containerStyle: connectionLineContainerStyle
    			}),
    			(0, react_jsx_runtime.jsx)("div", { className: "react-flow__edgelabel-renderer" }),
    			(0, react_jsx_runtime.jsx)(NodeRenderer, {
    				nodeTypes,
    				onNodeClick,
    				onNodeDoubleClick,
    				onNodeMouseEnter,
    				onNodeMouseMove,
    				onNodeMouseLeave,
    				onNodeContextMenu,
    				nodeClickDistance,
    				onlyRenderVisibleElements,
    				noPanClassName,
    				noDragClassName,
    				disableKeyboardA11y,
    				nodeExtent,
    				rfId,
    				nodesDraggable
    			}),
    			(0, react_jsx_runtime.jsx)("div", { className: "react-flow__viewport-portal" })
    		] })
    	});
    }
    GraphViewComponent.displayName = "GraphView";
    const GraphView = (0, react.memo)(GraphViewComponent);
    const devWarn = createDevWarn("React Flow", "https://reactflow.dev/");
    const getInitialState = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom = .5, maxZoom = 2, nodeOrigin, nodeExtent, zIndexMode = "basic" } = {}) => {
    	const nodeLookup = /* @__PURE__ */ new Map();
    	const parentLookup = /* @__PURE__ */ new Map();
    	const connectionLookup = /* @__PURE__ */ new Map();
    	const edgeLookup = /* @__PURE__ */ new Map();
    	const storeEdges = defaultEdges ?? edges ?? [];
    	const storeNodes = defaultNodes ?? nodes ?? [];
    	const storeNodeOrigin = nodeOrigin ?? [0, 0];
    	const storeNodeExtent = nodeExtent ?? infiniteExtent;
    	updateConnectionLookup(connectionLookup, edgeLookup, storeEdges);
    	const { nodesInitialized } = adoptUserNodes(storeNodes, nodeLookup, parentLookup, {
    		nodeOrigin: storeNodeOrigin,
    		nodeExtent: storeNodeExtent,
    		zIndexMode
    	});
    	let transform = [
    		0,
    		0,
    		1
    	];
    	if (fitView && width && height) {
    		const bounds = getInternalNodesBounds(nodeLookup, { filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight)) });
    		const { x, y, zoom } = getViewportForBounds(bounds, width, height, minZoom, maxZoom, fitViewOptions?.padding ?? .1);
    		transform = [
    			x,
    			y,
    			zoom
    		];
    	}
    	return {
    		rfId: "1",
    		width: width ?? 0,
    		height: height ?? 0,
    		transform,
    		nodes: storeNodes,
    		nodesInitialized,
    		nodeLookup,
    		parentLookup,
    		edges: storeEdges,
    		edgeLookup,
    		connectionLookup,
    		onNodesChange: null,
    		onEdgesChange: null,
    		hasDefaultNodes: defaultNodes !== void 0,
    		hasDefaultEdges: defaultEdges !== void 0,
    		panZoom: null,
    		minZoom,
    		maxZoom,
    		translateExtent: infiniteExtent,
    		nodeExtent: storeNodeExtent,
    		nodesSelectionActive: false,
    		userSelectionActive: false,
    		userSelectionRect: null,
    		connectionMode: ConnectionMode.Strict,
    		domNode: null,
    		paneDragging: false,
    		noPanClassName: "nopan",
    		nodeOrigin: storeNodeOrigin,
    		nodeDragThreshold: 1,
    		connectionDragThreshold: 1,
    		snapGrid: [15, 15],
    		snapToGrid: false,
    		nodesDraggable: true,
    		nodesConnectable: true,
    		nodesFocusable: true,
    		edgesFocusable: true,
    		edgesReconnectable: true,
    		elementsSelectable: true,
    		elevateNodesOnSelect: true,
    		elevateEdgesOnSelect: true,
    		selectNodesOnDrag: true,
    		multiSelectionActive: false,
    		fitViewQueued: fitView ?? false,
    		fitViewOptions,
    		fitViewResolver: null,
    		connection: { ...initialConnection },
    		connectionClickStartHandle: null,
    		connectOnClick: true,
    		ariaLiveMessage: "",
    		autoPanOnConnect: true,
    		autoPanOnNodeDrag: true,
    		autoPanOnNodeFocus: true,
    		autoPanSpeed: 15,
    		connectionRadius: 20,
    		onError: devWarn,
    		isValidConnection: void 0,
    		onSelectionChangeHandlers: [],
    		lib: "react",
    		debug: false,
    		ariaLabelConfig: defaultAriaLabelConfig,
    		zIndexMode,
    		defaultEdgeOptions: void 0,
    		onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    		onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    		onNodesDelete: void 0,
    		onEdgesDelete: void 0,
    		onDelete: void 0,
    		onBeforeDelete: void 0,
    		onViewportChangeStart: void 0,
    		onViewportChange: void 0,
    		onViewportChangeEnd: void 0,
    		onNodeDragStart: void 0,
    		onNodeDrag: void 0,
    		onNodeDragStop: void 0,
    		onSelectionDragStart: void 0,
    		onSelectionDrag: void 0,
    		onSelectionDragStop: void 0,
    		onMoveStart: void 0,
    		onMove: void 0,
    		onMoveEnd: void 0,
    		onConnect: void 0,
    		onConnectStart: void 0,
    		onConnectEnd: void 0,
    		onClickConnectStart: void 0,
    		onClickConnectEnd: void 0
    	};
    };
    const createStore = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom, maxZoom, nodeOrigin, nodeExtent, zIndexMode }) => createWithEqualityFn((set, get) => {
    	async function resolveFitView() {
    		const { nodeLookup, panZoom, fitViewOptions, fitViewResolver, width, height, minZoom, maxZoom } = get();
    		if (!panZoom) return;
    		await fitViewport({
    			nodes: nodeLookup,
    			width,
    			height,
    			panZoom,
    			minZoom,
    			maxZoom
    		}, fitViewOptions);
    		fitViewResolver?.resolve(true);
    		/**
    		* wait for the fitViewport to resolve before deleting the resolver,
    		* we want to reuse the old resolver if the user calls fitView again in the mean time
    		*/
    		set({ fitViewResolver: null });
    	}
    	return {
    		...getInitialState({
    			nodes,
    			edges,
    			width,
    			height,
    			fitView,
    			fitViewOptions,
    			minZoom,
    			maxZoom,
    			nodeOrigin,
    			nodeExtent,
    			defaultNodes,
    			defaultEdges,
    			zIndexMode
    		}),
    		setNodes: (nodes) => {
    			const { nodeLookup, parentLookup, nodeOrigin, nodeExtent, elevateNodesOnSelect, fitViewQueued, zIndexMode, nodesSelectionActive } = get();
    			const { nodesInitialized, hasSelectedNodes } = adoptUserNodes(nodes, nodeLookup, parentLookup, {
    				nodeOrigin,
    				nodeExtent,
    				elevateNodesOnSelect,
    				checkEquality: true,
    				zIndexMode
    			});
    			const nextNodesSelectionActive = nodesSelectionActive && hasSelectedNodes;
    			if (fitViewQueued && nodesInitialized) {
    				resolveFitView();
    				set({
    					nodes,
    					nodesInitialized,
    					fitViewQueued: false,
    					fitViewOptions: void 0,
    					nodesSelectionActive: nextNodesSelectionActive
    				});
    			} else set({
    				nodes,
    				nodesInitialized,
    				nodesSelectionActive: nextNodesSelectionActive
    			});
    		},
    		setEdges: (edges) => {
    			const { connectionLookup, edgeLookup } = get();
    			updateConnectionLookup(connectionLookup, edgeLookup, edges);
    			set({ edges });
    		},
    		setDefaultNodesAndEdges: (nodes, edges) => {
    			if (nodes) {
    				const { setNodes } = get();
    				setNodes(nodes);
    				set({ hasDefaultNodes: true });
    			}
    			if (edges) {
    				const { setEdges } = get();
    				setEdges(edges);
    				set({ hasDefaultEdges: true });
    			}
    		},
    		updateNodeInternals: (updates) => {
    			const { triggerNodeChanges, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, debug, fitViewQueued, zIndexMode } = get();
    			const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent, zIndexMode);
    			if (!updatedInternals) return;
    			updateAbsolutePositions(nodeLookup, parentLookup, {
    				nodeOrigin,
    				nodeExtent,
    				zIndexMode
    			});
    			if (fitViewQueued) {
    				resolveFitView();
    				set({
    					fitViewQueued: false,
    					fitViewOptions: void 0
    				});
    			} else set({});
    			if (changes?.length > 0) {
    				if (debug) console.log("React Flow: trigger node changes", changes);
    				triggerNodeChanges?.(changes);
    			}
    		},
    		updateNodePositions: (nodeDragItems, dragging = false) => {
    			const parentExpandChildren = [];
    			let changes = [];
    			const { nodeLookup, triggerNodeChanges, connection, updateConnection, onNodesChangeMiddlewareMap } = get();
    			for (const [id, dragItem] of nodeDragItems) {
    				const node = nodeLookup.get(id);
    				const expandParent = !!(node?.expandParent && node?.parentId && dragItem?.position);
    				const change = {
    					id,
    					type: "position",
    					position: expandParent ? {
    						x: Math.max(0, dragItem.position.x),
    						y: Math.max(0, dragItem.position.y)
    					} : dragItem.position,
    					dragging
    				};
    				if (node && connection.inProgress && connection.fromNode.id === node.id) {
    					const updatedFrom = getHandlePosition(node, connection.fromHandle, Position.Left, true);
    					updateConnection({
    						...connection,
    						from: updatedFrom
    					});
    				}
    				if (expandParent && node.parentId) parentExpandChildren.push({
    					id,
    					parentId: node.parentId,
    					rect: {
    						...dragItem.internals.positionAbsolute,
    						width: dragItem.measured.width ?? 0,
    						height: dragItem.measured.height ?? 0
    					}
    				});
    				changes.push(change);
    			}
    			if (parentExpandChildren.length > 0) {
    				const { parentLookup, nodeOrigin } = get();
    				const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
    				changes.push(...parentExpandChanges);
    			}
    			for (const middleware of onNodesChangeMiddlewareMap.values()) changes = middleware(changes);
    			triggerNodeChanges(changes);
    		},
    		triggerNodeChanges: (changes) => {
    			const { onNodesChange, setNodes, nodes, hasDefaultNodes, debug } = get();
    			if (changes?.length) {
    				if (hasDefaultNodes) setNodes(applyNodeChanges(changes, nodes));
    				if (debug) console.log("React Flow: trigger node changes", changes);
    				onNodesChange?.(changes);
    			}
    		},
    		triggerEdgeChanges: (changes) => {
    			const { onEdgesChange, setEdges, edges, hasDefaultEdges, debug } = get();
    			if (changes?.length) {
    				if (hasDefaultEdges) setEdges(applyEdgeChanges(changes, edges));
    				if (debug) console.log("React Flow: trigger edge changes", changes);
    				onEdgesChange?.(changes);
    			}
    		},
    		addSelectedNodes: (selectedNodeIds) => {
    			const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
    			if (multiSelectionActive) {
    				triggerNodeChanges(selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true)));
    				return;
    			}
    			triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set([...selectedNodeIds]), true));
    			triggerEdgeChanges(getSelectionChanges(edgeLookup));
    		},
    		addSelectedEdges: (selectedEdgeIds) => {
    			const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
    			if (multiSelectionActive) {
    				triggerEdgeChanges(selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true)));
    				return;
    			}
    			triggerEdgeChanges(getSelectionChanges(edgeLookup, /* @__PURE__ */ new Set([...selectedEdgeIds])));
    			triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set(), true));
    		},
    		unselectNodesAndEdges: ({ nodes, edges } = {}) => {
    			const { edges: storeEdges, nodes: storeNodes, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
    			const nodesToUnselect = nodes ? nodes : storeNodes;
    			const edgesToUnselect = edges ? edges : storeEdges;
    			const nodeChanges = [];
    			for (const node of nodesToUnselect) {
    				if (!node.selected) continue;
    				const internalNode = nodeLookup.get(node.id);
    				if (internalNode) internalNode.selected = false;
    				nodeChanges.push(createSelectionChange(node.id, false));
    			}
    			const edgeChanges = [];
    			for (const edge of edgesToUnselect) {
    				if (!edge.selected) continue;
    				edgeChanges.push(createSelectionChange(edge.id, false));
    			}
    			triggerNodeChanges(nodeChanges);
    			triggerEdgeChanges(edgeChanges);
    		},
    		setMinZoom: (minZoom) => {
    			const { panZoom, maxZoom } = get();
    			panZoom?.setScaleExtent([minZoom, maxZoom]);
    			set({ minZoom });
    		},
    		setMaxZoom: (maxZoom) => {
    			const { panZoom, minZoom } = get();
    			panZoom?.setScaleExtent([minZoom, maxZoom]);
    			set({ maxZoom });
    		},
    		setTranslateExtent: (translateExtent) => {
    			get().panZoom?.setTranslateExtent(translateExtent);
    			set({ translateExtent });
    		},
    		resetSelectedElements: () => {
    			const { edges, nodes, triggerNodeChanges, triggerEdgeChanges, elementsSelectable } = get();
    			if (!elementsSelectable) return;
    			const nodeChanges = nodes.reduce((res, node) => node.selected ? [...res, createSelectionChange(node.id, false)] : res, []);
    			const edgeChanges = edges.reduce((res, edge) => edge.selected ? [...res, createSelectionChange(edge.id, false)] : res, []);
    			triggerNodeChanges(nodeChanges);
    			triggerEdgeChanges(edgeChanges);
    		},
    		setNodeExtent: (nextNodeExtent) => {
    			const { nodes, nodeLookup, parentLookup, nodeOrigin, elevateNodesOnSelect, nodeExtent, zIndexMode } = get();
    			if (nextNodeExtent[0][0] === nodeExtent[0][0] && nextNodeExtent[0][1] === nodeExtent[0][1] && nextNodeExtent[1][0] === nodeExtent[1][0] && nextNodeExtent[1][1] === nodeExtent[1][1]) return;
    			adoptUserNodes(nodes, nodeLookup, parentLookup, {
    				nodeOrigin,
    				nodeExtent: nextNodeExtent,
    				elevateNodesOnSelect,
    				checkEquality: false,
    				zIndexMode
    			});
    			set({ nodeExtent: nextNodeExtent });
    		},
    		panBy: (delta) => {
    			const { transform, width, height, panZoom, translateExtent } = get();
    			return panBy({
    				delta,
    				panZoom,
    				transform,
    				translateExtent,
    				width,
    				height
    			});
    		},
    		setCenter: async (x, y, options) => {
    			const { width, height, maxZoom, panZoom } = get();
    			if (!panZoom) return false;
    			const nextZoom = typeof options?.zoom !== "undefined" ? options.zoom : maxZoom;
    			await panZoom.setViewport({
    				x: width / 2 - x * nextZoom,
    				y: height / 2 - y * nextZoom,
    				zoom: nextZoom
    			}, {
    				duration: options?.duration,
    				ease: options?.ease,
    				interpolate: options?.interpolate
    			});
    			return true;
    		},
    		cancelConnection: () => {
    			set({ connection: { ...initialConnection } });
    		},
    		updateConnection: (connection) => {
    			set({ connection });
    		},
    		reset: () => set({ ...getInitialState() })
    	};
    }, Object.is);
    /**
    * The `<ReactFlowProvider />` component is a [context provider](https://react.dev/learn/passing-data-deeply-with-context#)
    * that makes it possible to access a flow's internal state outside of the
    * [`<ReactFlow />`](/api-reference/react-flow) component. Many of the hooks we
    * provide rely on this component to work.
    * @public
    *
    * @example
    * ```tsx
    *import { ReactFlow, ReactFlowProvider, useNodes } from '@xyflow/react'
    *
    *export default function Flow() {
    *  return (
    *    <ReactFlowProvider>
    *      <ReactFlow nodes={...} edges={...} />
    *      <Sidebar />
    *    </ReactFlowProvider>
    *  );
    *}
    *
    *function Sidebar() {
    *  // This hook will only work if the component it's used in is a child of a
    *  // <ReactFlowProvider />.
    *  const nodes = useNodes()
    *
    *  return <aside>do something with nodes</aside>;
    *}
    *```
    *
    * @remarks If you're using a router and want your flow's state to persist across routes,
    * it's vital that you place the `<ReactFlowProvider />` component _outside_ of
    * your router. If you have multiple flows on the same page you will need to use a separate
    * `<ReactFlowProvider />` for each flow.
    */
    function ReactFlowProvider({ initialNodes: nodes, initialEdges: edges, defaultNodes, defaultEdges, initialWidth: width, initialHeight: height, initialMinZoom: minZoom, initialMaxZoom: maxZoom, initialFitViewOptions: fitViewOptions, fitView, nodeOrigin, nodeExtent, zIndexMode, children }) {
    	const [store] = (0, react.useState)(() => createStore({
    		nodes,
    		edges,
    		defaultNodes,
    		defaultEdges,
    		width,
    		height,
    		fitView,
    		minZoom,
    		maxZoom,
    		fitViewOptions,
    		nodeOrigin,
    		nodeExtent,
    		zIndexMode
    	}));
    	return (0, react_jsx_runtime.jsx)(Provider$1, {
    		value: store,
    		children: (0, react_jsx_runtime.jsx)(BatchProvider, { children: (0, react_jsx_runtime.jsx)(HandleConfigProvider, { children }) })
    	});
    }
    function Wrapper({ children, nodes, edges, defaultNodes, defaultEdges, width, height, fitView, fitViewOptions, minZoom, maxZoom, nodeOrigin, nodeExtent, zIndexMode }) {
    	if ((0, react.useContext)(StoreContext)) return (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
    	return (0, react_jsx_runtime.jsx)(ReactFlowProvider, {
    		initialNodes: nodes,
    		initialEdges: edges,
    		defaultNodes,
    		defaultEdges,
    		initialWidth: width,
    		initialHeight: height,
    		fitView,
    		initialFitViewOptions: fitViewOptions,
    		initialMinZoom: minZoom,
    		initialMaxZoom: maxZoom,
    		nodeOrigin,
    		nodeExtent,
    		zIndexMode,
    		children
    	});
    }
    const wrapperStyle = {
    	width: "100%",
    	height: "100%",
    	overflow: "hidden",
    	position: "relative",
    	zIndex: 0
    };
    function ReactFlow({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes, edgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, onBeforeDelete, connectionMode, connectionLineType = ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = "Backspace", selectionKeyCode = "Shift", selectionOnDrag = false, selectionMode = SelectionMode.Full, panActivationKeyCode = "Space", multiSelectionKeyCode = isMacOs() ? "Meta" : "Control", zoomActivationKeyCode = isMacOs() ? "Meta" : "Control", snapToGrid, snapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag, nodesDraggable, autoPanOnNodeFocus, nodesConnectable, nodesFocusable, nodeOrigin = defaultNodeOrigin, edgesFocusable, edgesReconnectable, elementsSelectable = true, defaultViewport: defaultViewport$1 = defaultViewport, minZoom = .5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = "#b1b1b7", zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance = 1, nodeClickDistance = 0, children, onReconnect, onReconnectStart, onReconnectEnd, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius = 10, onNodesChange, onEdgesChange, noDragClassName = "nodrag", noWheelClassName = "nowheel", noPanClassName = "nopan", fitView, fitViewOptions, connectOnClick, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect = true, elevateEdgesOnSelect = false, disableKeyboardA11y = false, autoPanOnConnect, autoPanOnNodeDrag, autoPanOnSelection = true, autoPanSpeed, connectionRadius, isValidConnection, onError, style, id, nodeDragThreshold, connectionDragThreshold, viewport, onViewportChange, width, height, colorMode = "light", debug, onScroll, ariaLabelConfig, zIndexMode = "basic", ...rest }, ref) {
    	const rfId = id || "1";
    	const colorModeClassName = useColorModeClass(colorMode);
    	const wrapperOnScroll = (0, react.useCallback)((e) => {
    		e.currentTarget.scrollTo({
    			top: 0,
    			left: 0,
    			behavior: "instant"
    		});
    		onScroll?.(e);
    	}, [onScroll]);
    	return (0, react_jsx_runtime.jsx)("div", {
    		"data-testid": "rf__wrapper",
    		...rest,
    		onScroll: wrapperOnScroll,
    		style: {
    			...style,
    			...wrapperStyle
    		},
    		ref,
    		className: cc([
    			"react-flow",
    			className,
    			colorModeClassName
    		]),
    		id,
    		role: "application",
    		children: (0, react_jsx_runtime.jsxs)(Wrapper, {
    			nodes,
    			edges,
    			width,
    			height,
    			fitView,
    			fitViewOptions,
    			minZoom,
    			maxZoom,
    			nodeOrigin,
    			nodeExtent,
    			zIndexMode,
    			children: [
    				(0, react_jsx_runtime.jsx)(StoreUpdater, {
    					nodes,
    					edges,
    					defaultNodes,
    					defaultEdges,
    					onConnect,
    					onConnectStart,
    					onConnectEnd,
    					onClickConnectStart,
    					onClickConnectEnd,
    					nodesDraggable,
    					autoPanOnNodeFocus,
    					nodesConnectable,
    					nodesFocusable,
    					edgesFocusable,
    					edgesReconnectable,
    					elementsSelectable,
    					elevateNodesOnSelect,
    					elevateEdgesOnSelect,
    					minZoom,
    					maxZoom,
    					nodeExtent,
    					onNodesChange,
    					onEdgesChange,
    					snapToGrid,
    					snapGrid,
    					connectionMode,
    					translateExtent,
    					connectOnClick,
    					defaultEdgeOptions,
    					fitView,
    					fitViewOptions,
    					onNodesDelete,
    					onEdgesDelete,
    					onDelete,
    					onNodeDragStart,
    					onNodeDrag,
    					onNodeDragStop,
    					onSelectionDrag,
    					onSelectionDragStart,
    					onSelectionDragStop,
    					onMove,
    					onMoveStart,
    					onMoveEnd,
    					noPanClassName,
    					nodeOrigin,
    					rfId,
    					autoPanOnConnect,
    					autoPanOnNodeDrag,
    					autoPanSpeed,
    					onError,
    					connectionRadius,
    					isValidConnection,
    					selectNodesOnDrag,
    					nodeDragThreshold,
    					connectionDragThreshold,
    					onBeforeDelete,
    					debug,
    					ariaLabelConfig,
    					zIndexMode
    				}),
    				(0, react_jsx_runtime.jsx)(GraphView, {
    					onInit,
    					onNodeClick,
    					onEdgeClick,
    					onNodeMouseEnter,
    					onNodeMouseMove,
    					onNodeMouseLeave,
    					onNodeContextMenu,
    					onNodeDoubleClick,
    					nodeTypes,
    					edgeTypes,
    					connectionLineType,
    					connectionLineStyle,
    					connectionLineComponent,
    					connectionLineContainerStyle,
    					selectionKeyCode,
    					selectionOnDrag,
    					selectionMode,
    					deleteKeyCode,
    					multiSelectionKeyCode,
    					panActivationKeyCode,
    					zoomActivationKeyCode,
    					onlyRenderVisibleElements,
    					defaultViewport: defaultViewport$1,
    					translateExtent,
    					minZoom,
    					maxZoom,
    					preventScrolling,
    					zoomOnScroll,
    					zoomOnPinch,
    					zoomOnDoubleClick,
    					panOnScroll,
    					panOnScrollSpeed,
    					panOnScrollMode,
    					panOnDrag,
    					autoPanOnSelection,
    					onPaneClick,
    					onPaneMouseEnter,
    					onPaneMouseMove,
    					onPaneMouseLeave,
    					onPaneScroll,
    					onPaneContextMenu,
    					paneClickDistance,
    					nodeClickDistance,
    					onSelectionContextMenu,
    					onSelectionStart,
    					onSelectionEnd,
    					onReconnect,
    					onReconnectStart,
    					onReconnectEnd,
    					onEdgeContextMenu,
    					onEdgeDoubleClick,
    					onEdgeMouseEnter,
    					onEdgeMouseMove,
    					onEdgeMouseLeave,
    					reconnectRadius,
    					defaultMarkerColor,
    					noDragClassName,
    					noWheelClassName,
    					noPanClassName,
    					rfId,
    					disableKeyboardA11y,
    					nodeExtent,
    					viewport,
    					onViewportChange,
    					nodesDraggable
    				}),
    				(0, react_jsx_runtime.jsx)(SelectionListener, { onSelectionChange }),
    				children,
    				(0, react_jsx_runtime.jsx)(Attribution, {
    					proOptions,
    					position: attributionPosition
    				}),
    				(0, react_jsx_runtime.jsx)(A11yDescriptions, {
    					rfId,
    					disableKeyboardA11y
    				})
    			]
    		})
    	});
    }
    /**
    * The `<ReactFlow />` component is the heart of your React Flow application.
    * It renders your nodes and edges and handles user interaction
    *
    * @public
    *
    * @example
    * ```tsx
    *import { ReactFlow } from '@xyflow/react'
    *
    *export default function Flow() {
    *  return (<ReactFlow
    *    nodes={...}
    *    edges={...}
    *    onNodesChange={...}
    *    ...
    *  />);
    *}
    *```
    */
    var index = fixedForwardRef(ReactFlow);
    errorMessages["error014"]();
    function LinePattern({ dimensions, lineWidth, variant, className }) {
    	return (0, react_jsx_runtime.jsx)("path", {
    		strokeWidth: lineWidth,
    		d: `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`,
    		className: cc([
    			"react-flow__background-pattern",
    			variant,
    			className
    		])
    	});
    }
    function DotPattern({ radius, className }) {
    	return (0, react_jsx_runtime.jsx)("circle", {
    		cx: radius,
    		cy: radius,
    		r: radius,
    		className: cc([
    			"react-flow__background-pattern",
    			"dots",
    			className
    		])
    	});
    }
    /**
    * The three variants are exported as an enum for convenience. You can either import
    * the enum and use it like `BackgroundVariant.Lines` or you can use the raw string
    * value directly.
    * @public
    */
    var BackgroundVariant;
    (function(BackgroundVariant) {
    	BackgroundVariant["Lines"] = "lines";
    	BackgroundVariant["Dots"] = "dots";
    	BackgroundVariant["Cross"] = "cross";
    })(BackgroundVariant || (BackgroundVariant = {}));
    const defaultSize = {
    	[BackgroundVariant.Dots]: 1,
    	[BackgroundVariant.Lines]: 1,
    	[BackgroundVariant.Cross]: 6
    };
    const selector$3 = (s) => ({
    	transform: s.transform,
    	patternId: `pattern-${s.rfId}`
    });
    function BackgroundComponent({ id, variant = BackgroundVariant.Dots, gap = 20, size, lineWidth = 1, offset = 0, color, bgColor, style, className, patternClassName }) {
    	const ref = (0, react.useRef)(null);
    	const { transform, patternId } = useStore(selector$3, shallow$1);
    	const patternSize = size || defaultSize[variant];
    	const isDots = variant === BackgroundVariant.Dots;
    	const isCross = variant === BackgroundVariant.Cross;
    	const gapXY = Array.isArray(gap) ? gap : [gap, gap];
    	const scaledGap = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
    	const scaledSize = patternSize * transform[2];
    	const offsetXY = Array.isArray(offset) ? offset : [offset, offset];
    	const patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
    	const scaledOffset = [offsetXY[0] * transform[2] + patternDimensions[0] / 2, offsetXY[1] * transform[2] + patternDimensions[1] / 2];
    	const _patternId = `${patternId}${id ? id : ""}`;
    	return (0, react_jsx_runtime.jsxs)("svg", {
    		className: cc(["react-flow__background", className]),
    		style: {
    			...style,
    			...containerStyle,
    			"--xy-background-color-props": bgColor,
    			"--xy-background-pattern-color-props": color
    		},
    		ref,
    		"data-testid": "rf__background",
    		children: [(0, react_jsx_runtime.jsx)("pattern", {
    			id: _patternId,
    			x: transform[0] % scaledGap[0],
    			y: transform[1] % scaledGap[1],
    			width: scaledGap[0],
    			height: scaledGap[1],
    			patternUnits: "userSpaceOnUse",
    			patternTransform: `translate(-${scaledOffset[0]},-${scaledOffset[1]})`,
    			children: isDots ? (0, react_jsx_runtime.jsx)(DotPattern, {
    				radius: scaledSize / 2,
    				className: patternClassName
    			}) : (0, react_jsx_runtime.jsx)(LinePattern, {
    				dimensions: patternDimensions,
    				lineWidth,
    				variant,
    				className: patternClassName
    			})
    		}), (0, react_jsx_runtime.jsx)("rect", {
    			x: "0",
    			y: "0",
    			width: "100%",
    			height: "100%",
    			fill: `url(#${_patternId})`
    		})]
    	});
    }
    BackgroundComponent.displayName = "Background";
    /**
    * The `<Background />` component makes it convenient to render different types of backgrounds common in node-based UIs. It comes with three variants: lines, dots and cross.
    *
    * @example
    *
    * A simple example of how to use the Background component.
    *
    * ```tsx
    * import { useState } from 'react';
    * import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
    *
    * export default function Flow() {
    *   return (
    *     <ReactFlow defaultNodes={[...]} defaultEdges={[...]}>
    *       <Background color="#ccc" variant={BackgroundVariant.Dots} />
    *     </ReactFlow>
    *   );
    * }
    * ```
    *
    * @example
    *
    * In this example you can see how to combine multiple backgrounds
    *
    * ```tsx
    * import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
    * import '@xyflow/react/dist/style.css';
    *
    * export default function Flow() {
    *   return (
    *     <ReactFlow defaultNodes={[...]} defaultEdges={[...]}>
    *       <Background
    *         id="1"
    *         gap={10}
    *         color="#f1f1f1"
    *         variant={BackgroundVariant.Lines}
    *       />
    *       <Background
    *         id="2"
    *         gap={100}
    *         color="#ccc"
    *         variant={BackgroundVariant.Lines}
    *       />
    *     </ReactFlow>
    *   );
    * }
    * ```
    *
    * @remarks
    *
    * When combining multiple <Background /> components it’s important to give each of them a unique id prop!
    *
    */
    const Background = (0, react.memo)(BackgroundComponent);
    function PlusIcon() {
    	return (0, react_jsx_runtime.jsx)("svg", {
    		xmlns: "http://www.w3.org/2000/svg",
    		viewBox: "0 0 32 32",
    		children: (0, react_jsx_runtime.jsx)("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" })
    	});
    }
    function MinusIcon() {
    	return (0, react_jsx_runtime.jsx)("svg", {
    		xmlns: "http://www.w3.org/2000/svg",
    		viewBox: "0 0 32 5",
    		children: (0, react_jsx_runtime.jsx)("path", { d: "M0 0h32v4.2H0z" })
    	});
    }
    function FitViewIcon() {
    	return (0, react_jsx_runtime.jsx)("svg", {
    		xmlns: "http://www.w3.org/2000/svg",
    		viewBox: "0 0 32 30",
    		children: (0, react_jsx_runtime.jsx)("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" })
    	});
    }
    function LockIcon() {
    	return (0, react_jsx_runtime.jsx)("svg", {
    		xmlns: "http://www.w3.org/2000/svg",
    		viewBox: "0 0 25 32",
    		children: (0, react_jsx_runtime.jsx)("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" })
    	});
    }
    function UnlockIcon() {
    	return (0, react_jsx_runtime.jsx)("svg", {
    		xmlns: "http://www.w3.org/2000/svg",
    		viewBox: "0 0 25 32",
    		children: (0, react_jsx_runtime.jsx)("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" })
    	});
    }
    /**
    * You can add buttons to the control panel by using the `<ControlButton />` component
    * and pass it as a child to the [`<Controls />`](/api-reference/components/controls) component.
    *
    * @public
    * @example
    *```jsx
    *import { MagicWand } from '@radix-ui/react-icons'
    *import { ReactFlow, Controls, ControlButton } from '@xyflow/react'
    *
    *export default function Flow() {
    *  return (
    *    <ReactFlow nodes={[...]} edges={[...]}>
    *      <Controls>
    *        <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
    *          <MagicWand />
    *        </ControlButton>
    *      </Controls>
    *    </ReactFlow>
    *  )
    *}
    *```
    */
    function ControlButton({ children, className, ...rest }) {
    	return (0, react_jsx_runtime.jsx)("button", {
    		type: "button",
    		className: cc(["react-flow__controls-button", className]),
    		...rest,
    		children
    	});
    }
    const selector$2 = (s) => ({
    	isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
    	minZoomReached: s.transform[2] <= s.minZoom,
    	maxZoomReached: s.transform[2] >= s.maxZoom,
    	ariaLabelConfig: s.ariaLabelConfig
    });
    function ControlsComponent({ style, showZoom = true, showFitView = true, showInteractive = true, fitViewOptions, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, children, position = "bottom-left", orientation = "vertical", "aria-label": ariaLabel }) {
    	const store = useStoreApi();
    	const { isInteractive, minZoomReached, maxZoomReached, ariaLabelConfig } = useStore(selector$2, shallow$1);
    	const { zoomIn, zoomOut, fitView } = useReactFlow();
    	const onZoomInHandler = () => {
    		zoomIn();
    		onZoomIn?.();
    	};
    	const onZoomOutHandler = () => {
    		zoomOut();
    		onZoomOut?.();
    	};
    	const onFitViewHandler = () => {
    		fitView(fitViewOptions);
    		onFitView?.();
    	};
    	const onToggleInteractivity = () => {
    		store.setState({
    			nodesDraggable: !isInteractive,
    			nodesConnectable: !isInteractive,
    			elementsSelectable: !isInteractive
    		});
    		onInteractiveChange?.(!isInteractive);
    	};
    	return (0, react_jsx_runtime.jsxs)(Panel, {
    		className: cc([
    			"react-flow__controls",
    			orientation === "horizontal" ? "horizontal" : "vertical",
    			className
    		]),
    		position,
    		style,
    		"data-testid": "rf__controls",
    		"aria-label": ariaLabel ?? ariaLabelConfig["controls.ariaLabel"],
    		children: [
    			showZoom && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(ControlButton, {
    				onClick: onZoomInHandler,
    				className: "react-flow__controls-zoomin",
    				title: ariaLabelConfig["controls.zoomIn.ariaLabel"],
    				"aria-label": ariaLabelConfig["controls.zoomIn.ariaLabel"],
    				disabled: maxZoomReached,
    				children: (0, react_jsx_runtime.jsx)(PlusIcon, {})
    			}), (0, react_jsx_runtime.jsx)(ControlButton, {
    				onClick: onZoomOutHandler,
    				className: "react-flow__controls-zoomout",
    				title: ariaLabelConfig["controls.zoomOut.ariaLabel"],
    				"aria-label": ariaLabelConfig["controls.zoomOut.ariaLabel"],
    				disabled: minZoomReached,
    				children: (0, react_jsx_runtime.jsx)(MinusIcon, {})
    			})] }),
    			showFitView && (0, react_jsx_runtime.jsx)(ControlButton, {
    				className: "react-flow__controls-fitview",
    				onClick: onFitViewHandler,
    				title: ariaLabelConfig["controls.fitView.ariaLabel"],
    				"aria-label": ariaLabelConfig["controls.fitView.ariaLabel"],
    				children: (0, react_jsx_runtime.jsx)(FitViewIcon, {})
    			}),
    			showInteractive && (0, react_jsx_runtime.jsx)(ControlButton, {
    				className: "react-flow__controls-interactive",
    				onClick: onToggleInteractivity,
    				title: ariaLabelConfig["controls.interactive.ariaLabel"],
    				"aria-label": ariaLabelConfig["controls.interactive.ariaLabel"],
    				children: isInteractive ? (0, react_jsx_runtime.jsx)(UnlockIcon, {}) : (0, react_jsx_runtime.jsx)(LockIcon, {})
    			}),
    			children
    		]
    	});
    }
    ControlsComponent.displayName = "Controls";
    /**
    * The `<Controls />` component renders a small panel that contains convenient
    * buttons to zoom in, zoom out, fit the view, and lock the viewport.
    *
    * @public
    * @example
    *```tsx
    *import { ReactFlow, Controls } from '@xyflow/react'
    *
    *export default function Flow() {
    *  return (
    *    <ReactFlow nodes={[...]} edges={[...]}>
    *      <Controls />
    *    </ReactFlow>
    *  )
    *}
    *```
    *
    * @remarks To extend or customise the controls, you can use the [`<ControlButton />`](/api-reference/components/control-button) component
    *
    */
    const Controls = (0, react.memo)(ControlsComponent);
    function MiniMapNodeComponent({ id, x, y, width, height, style, color, strokeColor, strokeWidth, className, borderRadius, shapeRendering, selected, onClick }) {
    	const { background, backgroundColor } = style || {};
    	const fill = color || background || backgroundColor;
    	return (0, react_jsx_runtime.jsx)("rect", {
    		className: cc([
    			"react-flow__minimap-node",
    			{ selected },
    			className
    		]),
    		x,
    		y,
    		rx: borderRadius,
    		ry: borderRadius,
    		width,
    		height,
    		style: {
    			fill,
    			stroke: strokeColor,
    			strokeWidth
    		},
    		shapeRendering,
    		onClick: onClick ? (event) => onClick(event, id) : void 0
    	});
    }
    const MiniMapNode = (0, react.memo)(MiniMapNodeComponent);
    const selectorNodeIds = (s) => s.nodes.map((node) => node.id);
    const getAttrFunction = (func) => func instanceof Function ? func : () => func;
    function MiniMapNodes({ nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent: NodeComponent = MiniMapNode, onClick }) {
    	const nodeIds = useStore(selectorNodeIds, shallow$1);
    	const nodeColorFunc = getAttrFunction(nodeColor);
    	const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
    	const nodeClassNameFunc = getAttrFunction(nodeClassName);
    	const shapeRendering = typeof window === "undefined" || !!window.chrome ? "crispEdges" : "geometricPrecision";
    	return (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: nodeIds.map((nodeId) => (0, react_jsx_runtime.jsx)(NodeComponentWrapper, {
    		id: nodeId,
    		nodeColorFunc,
    		nodeStrokeColorFunc,
    		nodeClassNameFunc,
    		nodeBorderRadius,
    		nodeStrokeWidth,
    		NodeComponent,
    		onClick,
    		shapeRendering
    	}, nodeId)) });
    }
    function NodeComponentWrapperInner({ id, nodeColorFunc, nodeStrokeColorFunc, nodeClassNameFunc, nodeBorderRadius, nodeStrokeWidth, shapeRendering, NodeComponent, onClick }) {
    	const { node, x, y, width, height } = useStore((s) => {
    		const node = s.nodeLookup.get(id);
    		if (!node) return {
    			node: void 0,
    			x: 0,
    			y: 0,
    			width: 0,
    			height: 0
    		};
    		const userNode = node.internals.userNode;
    		const { x, y } = node.internals.positionAbsolute;
    		const { width, height } = getNodeDimensions(userNode);
    		return {
    			node: userNode,
    			x,
    			y,
    			width,
    			height
    		};
    	}, shallow$1);
    	if (!node || node.hidden || !nodeHasDimensions(node)) return null;
    	return (0, react_jsx_runtime.jsx)(NodeComponent, {
    		x,
    		y,
    		width,
    		height,
    		style: node.style,
    		selected: !!node.selected,
    		className: nodeClassNameFunc(node),
    		color: nodeColorFunc(node),
    		borderRadius: nodeBorderRadius,
    		strokeColor: nodeStrokeColorFunc(node),
    		strokeWidth: nodeStrokeWidth,
    		shapeRendering,
    		onClick,
    		id: node.id
    	});
    }
    const NodeComponentWrapper = (0, react.memo)(NodeComponentWrapperInner);
    var MiniMapNodes$1 = (0, react.memo)(MiniMapNodes);
    const defaultWidth = 200;
    const defaultHeight = 150;
    const filterHidden = (node) => !node.hidden;
    const selector$1 = (s) => {
    	const viewBB = {
    		x: -s.transform[0] / s.transform[2],
    		y: -s.transform[1] / s.transform[2],
    		width: s.width / s.transform[2],
    		height: s.height / s.transform[2]
    	};
    	let hasVisibleNode = false;
    	for (const node of s.nodeLookup.values()) if (!node.hidden) {
    		hasVisibleNode = true;
    		break;
    	}
    	return {
    		viewBB,
    		boundingRect: hasVisibleNode ? getBoundsOfRects(getInternalNodesBounds(s.nodeLookup, { filter: filterHidden }), viewBB) : viewBB,
    		rfId: s.rfId,
    		panZoom: s.panZoom,
    		translateExtent: s.translateExtent,
    		flowWidth: s.width,
    		flowHeight: s.height,
    		ariaLabelConfig: s.ariaLabelConfig
    	};
    };
    const rectEqual = (a, b) => a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    const areEqual = (a, b) => rectEqual(a.viewBB, b.viewBB) && rectEqual(a.boundingRect, b.boundingRect) && a.rfId === b.rfId && a.panZoom === b.panZoom && a.translateExtent === b.translateExtent && a.flowWidth === b.flowWidth && a.flowHeight === b.flowHeight && a.ariaLabelConfig === b.ariaLabelConfig;
    const ARIA_LABEL_KEY = "react-flow__minimap-desc";
    function MiniMapComponent({ style, className, nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent, bgColor, maskColor, maskStrokeColor, maskStrokeWidth, position = "bottom-right", onClick, onNodeClick, pannable = false, zoomable = false, ariaLabel, inversePan, zoomStep = 1, offsetScale = 5 }) {
    	const store = useStoreApi();
    	const svg = (0, react.useRef)(null);
    	const { boundingRect, panZoom, viewBB, rfId, translateExtent, flowWidth, flowHeight, ariaLabelConfig } = useStore(selector$1, areEqual);
    	const elementWidth = style?.width ?? defaultWidth;
    	const elementHeight = style?.height ?? defaultHeight;
    	const scaledWidth = boundingRect.width / elementWidth;
    	const scaledHeight = boundingRect.height / elementHeight;
    	const viewScale = Math.max(scaledWidth, scaledHeight);
    	const viewWidth = viewScale * elementWidth;
    	const viewHeight = viewScale * elementHeight;
    	const offset = offsetScale * viewScale;
    	const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
    	const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
    	const width = viewWidth + offset * 2;
    	const height = viewHeight + offset * 2;
    	const labelledBy = `${ARIA_LABEL_KEY}-${rfId}`;
    	const viewScaleRef = (0, react.useRef)(0);
    	const minimapInstance = (0, react.useRef)();
    	viewScaleRef.current = viewScale;
    	(0, react.useEffect)(() => {
    		const currentPanZoom = store.getState().panZoom;
    		if (svg.current && currentPanZoom) {
    			minimapInstance.current = XYMinimap({
    				domNode: svg.current,
    				panZoom: currentPanZoom,
    				getTransform: () => store.getState().transform,
    				getViewScale: () => viewScaleRef.current
    			});
    			return () => {
    				minimapInstance.current?.destroy();
    			};
    		}
    	}, [panZoom]);
    	(0, react.useEffect)(() => {
    		minimapInstance.current?.update({
    			translateExtent,
    			width: flowWidth,
    			height: flowHeight,
    			inversePan,
    			pannable,
    			zoomStep,
    			zoomable
    		});
    	}, [
    		pannable,
    		zoomable,
    		inversePan,
    		zoomStep,
    		translateExtent,
    		flowWidth,
    		flowHeight
    	]);
    	const onSvgClick = onClick ? (event) => {
    		const [x, y] = minimapInstance.current?.pointer(event) || [0, 0];
    		onClick(event, {
    			x,
    			y
    		});
    	} : void 0;
    	const nodeClickHandler = (0, react.useCallback)((event, nodeId) => {
    		const node = store.getState().nodeLookup.get(nodeId).internals.userNode;
    		onNodeClick?.(event, node);
    	}, [onNodeClick]);
    	const onSvgNodeClick = onNodeClick ? nodeClickHandler : void 0;
    	const _ariaLabel = ariaLabel ?? ariaLabelConfig["minimap.ariaLabel"];
    	return (0, react_jsx_runtime.jsx)(Panel, {
    		position,
    		style: {
    			...style,
    			"--xy-minimap-background-color-props": typeof bgColor === "string" ? bgColor : void 0,
    			"--xy-minimap-mask-background-color-props": typeof maskColor === "string" ? maskColor : void 0,
    			"--xy-minimap-mask-stroke-color-props": typeof maskStrokeColor === "string" ? maskStrokeColor : void 0,
    			"--xy-minimap-mask-stroke-width-props": typeof maskStrokeWidth === "number" ? maskStrokeWidth * viewScale : void 0,
    			"--xy-minimap-node-background-color-props": typeof nodeColor === "string" ? nodeColor : void 0,
    			"--xy-minimap-node-stroke-color-props": typeof nodeStrokeColor === "string" ? nodeStrokeColor : void 0,
    			"--xy-minimap-node-stroke-width-props": typeof nodeStrokeWidth === "number" ? nodeStrokeWidth : void 0
    		},
    		className: cc(["react-flow__minimap", className]),
    		"data-testid": "rf__minimap",
    		children: (0, react_jsx_runtime.jsxs)("svg", {
    			width: elementWidth,
    			height: elementHeight,
    			viewBox: `${x} ${y} ${width} ${height}`,
    			className: "react-flow__minimap-svg",
    			role: "img",
    			"aria-labelledby": labelledBy,
    			ref: svg,
    			onClick: onSvgClick,
    			children: [
    				_ariaLabel && (0, react_jsx_runtime.jsx)("title", {
    					id: labelledBy,
    					children: _ariaLabel
    				}),
    				(0, react_jsx_runtime.jsx)(MiniMapNodes$1, {
    					onClick: onSvgNodeClick,
    					nodeColor,
    					nodeStrokeColor,
    					nodeBorderRadius,
    					nodeClassName,
    					nodeStrokeWidth,
    					nodeComponent
    				}),
    				(0, react_jsx_runtime.jsx)("path", {
    					className: "react-flow__minimap-mask",
    					d: `M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
            M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`,
    					fillRule: "evenodd",
    					pointerEvents: "none"
    				})
    			]
    		})
    	});
    }
    MiniMapComponent.displayName = "MiniMap";
    /**
    * The `<MiniMap />` component can be used to render an overview of your flow. It
    * renders each node as an SVG element and visualizes where the current viewport is
    * in relation to the rest of the flow.
    *
    * @public
    * @example
    *
    * ```jsx
    *import { ReactFlow, MiniMap } from '@xyflow/react';
    *
    *export default function Flow() {
    *  return (
    *    <ReactFlow nodes={[...]} edges={[...]}>
    *      <MiniMap nodeStrokeWidth={3} />
    *    </ReactFlow>
    *  );
    *}
    *```
    */
    const MiniMap = (0, react.memo)(MiniMapComponent);
    const scaleSelector = (calculateScale) => (store) => calculateScale ? `${Math.max(1 / store.transform[2], 1)}` : void 0;
    const defaultPositions = {
    	[ResizeControlVariant.Line]: "right",
    	[ResizeControlVariant.Handle]: "bottom-right"
    };
    function ResizeControl({ nodeId, position, variant = ResizeControlVariant.Handle, className, style = void 0, children, color, minWidth = 10, minHeight = 10, maxWidth = Number.MAX_VALUE, maxHeight = Number.MAX_VALUE, keepAspectRatio = false, resizeDirection, autoScale = true, shouldResize, onResizeStart, onResize, onResizeEnd }) {
    	const contextNodeId = useNodeId();
    	const id = typeof nodeId === "string" ? nodeId : contextNodeId;
    	const store = useStoreApi();
    	const resizeControlRef = (0, react.useRef)(null);
    	const isHandleControl = variant === ResizeControlVariant.Handle;
    	const scale = useStore((0, react.useCallback)(scaleSelector(isHandleControl && autoScale), [isHandleControl, autoScale]), shallow$1);
    	const resizer = (0, react.useRef)(null);
    	const controlPosition = position ?? defaultPositions[variant];
    	(0, react.useEffect)(() => {
    		if (!resizeControlRef.current || !id) return;
    		if (!resizer.current) resizer.current = XYResizer({
    			domNode: resizeControlRef.current,
    			nodeId: id,
    			getStoreItems: () => {
    				const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin, domNode } = store.getState();
    				return {
    					nodeLookup,
    					transform,
    					snapGrid,
    					snapToGrid,
    					nodeOrigin,
    					paneDomNode: domNode
    				};
    			},
    			onChange: (change, childChanges) => {
    				const { triggerNodeChanges, nodeLookup, parentLookup, nodeOrigin } = store.getState();
    				const changes = [];
    				const nextPosition = {
    					x: change.x,
    					y: change.y
    				};
    				const node = nodeLookup.get(id);
    				if (node && node.expandParent && node.parentId) {
    					const origin = node.origin ?? nodeOrigin;
    					const width = change.width ?? node.measured.width ?? 0;
    					const height = change.height ?? node.measured.height ?? 0;
    					const parentExpandChanges = handleExpandParent([{
    						id: node.id,
    						parentId: node.parentId,
    						rect: {
    							width,
    							height,
    							...evaluateAbsolutePosition({
    								x: change.x ?? node.position.x,
    								y: change.y ?? node.position.y
    							}, {
    								width,
    								height
    							}, node.parentId, nodeLookup, origin)
    						}
    					}], nodeLookup, parentLookup, nodeOrigin);
    					changes.push(...parentExpandChanges);
    					nextPosition.x = change.x ? Math.max(origin[0] * width, change.x) : void 0;
    					nextPosition.y = change.y ? Math.max(origin[1] * height, change.y) : void 0;
    				}
    				if (nextPosition.x !== void 0 && nextPosition.y !== void 0) {
    					const positionChange = {
    						id,
    						type: "position",
    						position: { ...nextPosition }
    					};
    					changes.push(positionChange);
    				}
    				if (change.width !== void 0 && change.height !== void 0) {
    					const dimensionChange = {
    						id,
    						type: "dimensions",
    						resizing: true,
    						setAttributes: !resizeDirection ? true : resizeDirection === "horizontal" ? "width" : "height",
    						dimensions: {
    							width: change.width,
    							height: change.height
    						}
    					};
    					changes.push(dimensionChange);
    				}
    				for (const childChange of childChanges) {
    					const positionChange = {
    						...childChange,
    						type: "position"
    					};
    					changes.push(positionChange);
    				}
    				triggerNodeChanges(changes);
    			},
    			onEnd: ({ width, height }) => {
    				const dimensionChange = {
    					id,
    					type: "dimensions",
    					resizing: false,
    					dimensions: {
    						width,
    						height
    					}
    				};
    				store.getState().triggerNodeChanges([dimensionChange]);
    			}
    		});
    		resizer.current.update({
    			controlPosition,
    			boundaries: {
    				minWidth,
    				minHeight,
    				maxWidth,
    				maxHeight
    			},
    			keepAspectRatio,
    			resizeDirection,
    			onResizeStart,
    			onResize,
    			onResizeEnd,
    			shouldResize
    		});
    		return () => {
    			resizer.current?.destroy();
    		};
    	}, [
    		controlPosition,
    		minWidth,
    		minHeight,
    		maxWidth,
    		maxHeight,
    		keepAspectRatio,
    		onResizeStart,
    		onResize,
    		onResizeEnd,
    		shouldResize
    	]);
    	const positionClassNames = controlPosition.split("-");
    	return (0, react_jsx_runtime.jsx)("div", {
    		className: cc([
    			"react-flow__resize-control",
    			"nodrag",
    			...positionClassNames,
    			variant,
    			className
    		]),
    		ref: resizeControlRef,
    		style: {
    			...style,
    			scale,
    			...color && { [isHandleControl ? "backgroundColor" : "borderColor"]: color }
    		},
    		children
    	});
    }
    (0, react.memo)(ResizeControl);
    //#endregion
    //#region ../../node_modules/.pnpm/@xyflow+react@12.11.6_@type_ca0dbc7b9733f00052c763335384622b/node_modules/@xyflow/react/dist/style.css?inline
    var style_default = ".react-flow {\n  --xy-edge-stroke-default: #b1b1b7;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #555;\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n  --xy-attribution-background-color-default: #ffffff80;\n  --xy-minimap-background-color-default: #fff;\n  --xy-minimap-mask-background-color-default: #f0f0f099;\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #e2e2e2;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n  --xy-background-color-default: transparent;\n  --xy-background-pattern-dots-color-default: #91919a;\n  --xy-background-pattern-lines-color-default: #eee;\n  --xy-background-pattern-cross-color-default: #e2e2e2;\n  background-color: var(--xy-background-color, var(--xy-background-color-default));\n  --xy-node-color-default: inherit;\n  --xy-node-border-default: 1px solid #1a192b;\n  --xy-node-background-color-default: #fff;\n  --xy-node-group-background-color-default: #f0f0f040;\n  --xy-node-boxshadow-hover-default: 0 1px 4px 1px #00000014;\n  --xy-node-boxshadow-selected-default: 0 0 0 .5px #1a192b;\n  --xy-node-border-radius-default: 3px;\n  --xy-handle-background-color-default: #1a192b;\n  --xy-handle-border-color-default: #fff;\n  --xy-selection-background-color-default: #0059dc14;\n  --xy-selection-border-default: 1px dotted #0059dccc;\n  --xy-controls-button-background-color-default: #fefefe;\n  --xy-controls-button-background-color-hover-default: #f4f4f4;\n  --xy-controls-button-color-default: inherit;\n  --xy-controls-button-color-hover-default: inherit;\n  --xy-controls-button-border-color-default: #eee;\n  --xy-controls-box-shadow-default: 0 0 2px 1px #00000014;\n  --xy-edge-label-background-color-default: #fff;\n  --xy-edge-label-color-default: inherit;\n  --xy-resize-background-color-default: #3367d9;\n  direction: ltr;\n}\n\n.react-flow.dark {\n  --xy-edge-stroke-default: #3e3e3e;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #727272;\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n  --xy-attribution-background-color-default: #96969640;\n  --xy-minimap-background-color-default: #141414;\n  --xy-minimap-mask-background-color-default: #3c3c3c99;\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #2b2b2b;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n  --xy-background-color-default: #141414;\n  --xy-background-pattern-dots-color-default: #555;\n  --xy-background-pattern-lines-color-default: #333;\n  --xy-background-pattern-cross-color-default: #333;\n  --xy-node-color-default: #f8f8f8;\n  --xy-node-border-default: 1px solid #3c3c3c;\n  --xy-node-background-color-default: #1e1e1e;\n  --xy-node-group-background-color-default: #f0f0f040;\n  --xy-node-boxshadow-hover-default: 0 1px 4px 1px #ffffff14;\n  --xy-node-boxshadow-selected-default: 0 0 0 .5px #999;\n  --xy-handle-background-color-default: #bebebe;\n  --xy-handle-border-color-default: #1e1e1e;\n  --xy-selection-background-color-default: #c8c8dc14;\n  --xy-selection-border-default: 1px dotted #c8c8dccc;\n  --xy-controls-button-background-color-default: #2b2b2b;\n  --xy-controls-button-background-color-hover-default: #3e3e3e;\n  --xy-controls-button-color-default: #f8f8f8;\n  --xy-controls-button-color-hover-default: #fff;\n  --xy-controls-button-border-color-default: #5b5b5b;\n  --xy-controls-box-shadow-default: 0 0 2px 1px #00000014;\n  --xy-edge-label-background-color-default: #141414;\n  --xy-edge-label-color-default: #f8f8f8;\n}\n\n.react-flow__background {\n  background-color: var(--xy-background-color-props, var(--xy-background-color, var(--xy-background-color-default)));\n  pointer-events: none;\n  z-index: -1;\n}\n\n.react-flow__container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.react-flow__pane {\n  z-index: 1;\n  touch-action: none;\n}\n\n.react-flow__pane.draggable {\n  cursor: grab;\n}\n\n.react-flow__pane.dragging {\n  cursor: grabbing;\n}\n\n.react-flow__pane.selection {\n  cursor: pointer;\n}\n\n.react-flow__viewport {\n  transform-origin: 0 0;\n  z-index: 2;\n  pointer-events: none;\n}\n\n.react-flow__renderer {\n  z-index: 4;\n}\n\n.react-flow__selection {\n  z-index: 6;\n}\n\n.react-flow__nodesselection-rect:focus, .react-flow__nodesselection-rect:focus-visible {\n  outline: none;\n}\n\n.react-flow__edge-path {\n  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n  stroke-width: var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));\n  fill: none;\n}\n\n.react-flow__connection-path {\n  stroke: var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));\n  stroke-width: var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));\n  fill: none;\n}\n\n.react-flow .react-flow__edges {\n  position: absolute;\n}\n\n.react-flow .react-flow__edges svg {\n  pointer-events: none;\n  position: absolute;\n  overflow: visible;\n}\n\n.react-flow__edge {\n  pointer-events: visibleStroke;\n}\n\n.react-flow__edge.selectable {\n  cursor: pointer;\n}\n\n.react-flow__edge.animated path {\n  stroke-dasharray: 5;\n  animation: .5s linear infinite dashdraw;\n}\n\n.react-flow__edge.animated path.react-flow__edge-interaction {\n  stroke-dasharray: none;\n  animation: none;\n}\n\n.react-flow__edge.inactive {\n  pointer-events: none;\n}\n\n.react-flow__edge.selected, .react-flow__edge:focus, .react-flow__edge:focus-visible {\n  outline: none;\n}\n\n.react-flow__edge.selected .react-flow__edge-path, .react-flow__edge.selectable:focus .react-flow__edge-path, .react-flow__edge.selectable:focus-visible .react-flow__edge-path {\n  stroke: var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default));\n}\n\n.react-flow__edge-textwrapper {\n  pointer-events: all;\n}\n\n.react-flow__edge .react-flow__edge-text {\n  pointer-events: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n\n.react-flow__arrowhead polyline {\n  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n}\n\n.react-flow__arrowhead polyline.arrowclosed {\n  fill: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n}\n\n.react-flow__connection {\n  pointer-events: none;\n}\n\n.react-flow__connection .animated {\n  stroke-dasharray: 5;\n  animation: .5s linear infinite dashdraw;\n}\n\nsvg.react-flow__connectionline {\n  z-index: 1001;\n  position: absolute;\n  overflow: visible;\n}\n\n.react-flow__nodes {\n  pointer-events: none;\n  transform-origin: 0 0;\n}\n\n.react-flow__node {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  pointer-events: all;\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  cursor: default;\n  position: absolute;\n}\n\n.react-flow__node.selectable {\n  cursor: pointer;\n}\n\n.react-flow__node.draggable {\n  cursor: grab;\n  pointer-events: all;\n}\n\n.react-flow__node.draggable.dragging {\n  cursor: grabbing;\n}\n\n.react-flow__nodesselection {\n  z-index: 3;\n  transform-origin: 0 0;\n  pointer-events: none;\n}\n\n.react-flow__nodesselection-rect {\n  pointer-events: all;\n  cursor: grab;\n  position: absolute;\n}\n\n.react-flow__handle {\n  pointer-events: none;\n  background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));\n  border: 1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));\n  border-radius: 100%;\n  width: 6px;\n  min-width: 5px;\n  height: 6px;\n  min-height: 5px;\n  position: absolute;\n}\n\n.react-flow__handle.connectingfrom {\n  pointer-events: all;\n}\n\n.react-flow__handle.connectionindicator {\n  pointer-events: all;\n  cursor: crosshair;\n}\n\n.react-flow__handle-bottom {\n  top: auto;\n  bottom: 0;\n  left: 50%;\n  transform: translate(-50%, 50%);\n}\n\n.react-flow__handle-top {\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.react-flow__handle-left {\n  top: 50%;\n  left: 0;\n  transform: translate(-50%, -50%);\n}\n\n.react-flow__handle-right {\n  top: 50%;\n  right: 0;\n  transform: translate(50%, -50%);\n}\n\n.react-flow__edgeupdater {\n  cursor: move;\n  pointer-events: all;\n}\n\n.react-flow__pane.selection .react-flow__panel {\n  pointer-events: none;\n}\n\n.react-flow__panel {\n  z-index: 5;\n  margin: 15px;\n  position: absolute;\n}\n\n.react-flow__panel.top {\n  top: 0;\n}\n\n.react-flow__panel.bottom {\n  bottom: 0;\n}\n\n.react-flow__panel.top.center, .react-flow__panel.bottom.center {\n  left: 50%;\n  transform: translateX(-15px) translateX(-50%);\n}\n\n.react-flow__panel.left {\n  left: 0;\n}\n\n.react-flow__panel.right {\n  right: 0;\n}\n\n.react-flow__panel.left.center, .react-flow__panel.right.center {\n  top: 50%;\n  transform: translateY(-15px) translateY(-50%);\n}\n\n.react-flow__attribution {\n  background: var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));\n  margin: 0;\n  padding: 2px 3px;\n  font-size: 10px;\n}\n\n.react-flow__attribution a {\n  color: #999;\n  text-decoration: none;\n}\n\n@keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10px;\n  }\n}\n\n.react-flow__edgelabel-renderer {\n  pointer-events: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.react-flow__viewport-portal {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.react-flow__minimap {\n  background: var(--xy-minimap-background-color-props, var(--xy-minimap-background-color, var(--xy-minimap-background-color-default)));\n}\n\n.react-flow__minimap-svg {\n  display: block;\n}\n\n.react-flow__minimap-mask {\n  fill: var(--xy-minimap-mask-background-color-props, var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default)));\n  stroke: var(--xy-minimap-mask-stroke-color-props, var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default)));\n  stroke-width: var(--xy-minimap-mask-stroke-width-props, var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default)));\n}\n\n.react-flow__minimap-node {\n  fill: var(--xy-minimap-node-background-color-props, var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default)));\n  stroke: var(--xy-minimap-node-stroke-color-props, var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default)));\n  stroke-width: var(--xy-minimap-node-stroke-width-props, var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default)));\n}\n\n.react-flow__background-pattern.dots {\n  fill: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default)));\n}\n\n.react-flow__background-pattern.lines {\n  stroke: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default)));\n}\n\n.react-flow__background-pattern.cross {\n  stroke: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default)));\n}\n\n.react-flow__controls {\n  box-shadow: var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default));\n  flex-direction: column;\n  display: flex;\n}\n\n.react-flow__controls.horizontal {\n  flex-direction: row;\n}\n\n.react-flow__controls-button {\n  background: var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));\n  border: none;\n  border-bottom: 1px solid\n      var(--xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)));\n  width: 26px;\n  height: 26px;\n  color: var(--xy-controls-button-color-props, var(--xy-controls-button-color, var(--xy-controls-button-color-default)));\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  justify-content: center;\n  align-items: center;\n  padding: 4px;\n  display: flex;\n}\n\n.react-flow__controls-button svg {\n  fill: currentColor;\n  width: 100%;\n  max-width: 12px;\n  max-height: 12px;\n}\n\n.react-flow__edge.updating .react-flow__edge-path {\n  stroke: #777;\n}\n\n.react-flow__edge-text {\n  font-size: 10px;\n}\n\n.react-flow__node.selectable:focus, .react-flow__node.selectable:focus-visible {\n  outline: none;\n}\n\n.react-flow__node-input, .react-flow__node-default, .react-flow__node-output, .react-flow__node-group {\n  border-radius: var(--xy-node-border-radius, var(--xy-node-border-radius-default));\n  width: 150px;\n  color: var(--xy-node-color, var(--xy-node-color-default));\n  text-align: center;\n  border: var(--xy-node-border, var(--xy-node-border-default));\n  background-color: var(--xy-node-background-color, var(--xy-node-background-color-default));\n  padding: 10px;\n  font-size: 12px;\n}\n\n.react-flow__node-input.selectable:hover, .react-flow__node-default.selectable:hover, .react-flow__node-output.selectable:hover, .react-flow__node-group.selectable:hover {\n  box-shadow: var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default));\n}\n\n.react-flow__node-input.selectable.selected, .react-flow__node-input.selectable:focus, .react-flow__node-input.selectable:focus-visible, .react-flow__node-default.selectable.selected, .react-flow__node-default.selectable:focus, .react-flow__node-default.selectable:focus-visible, .react-flow__node-output.selectable.selected, .react-flow__node-output.selectable:focus, .react-flow__node-output.selectable:focus-visible, .react-flow__node-group.selectable.selected, .react-flow__node-group.selectable:focus, .react-flow__node-group.selectable:focus-visible {\n  box-shadow: var(--xy-node-boxshadow-selected, var(--xy-node-boxshadow-selected-default));\n}\n\n.react-flow__node-group {\n  background-color: var(--xy-node-group-background-color, var(--xy-node-group-background-color-default));\n}\n\n.react-flow__nodesselection-rect, .react-flow__selection {\n  background: var(--xy-selection-background-color, var(--xy-selection-background-color-default));\n  border: var(--xy-selection-border, var(--xy-selection-border-default));\n}\n\n.react-flow__nodesselection-rect:focus, .react-flow__nodesselection-rect:focus-visible, .react-flow__selection:focus, .react-flow__selection:focus-visible {\n  outline: none;\n}\n\n.react-flow__controls-button:hover {\n  background: var(--xy-controls-button-background-color-hover-props, var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default)));\n  color: var(--xy-controls-button-color-hover-props, var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default)));\n}\n\n.react-flow__controls-button:disabled {\n  pointer-events: none;\n}\n\n.react-flow__controls-button:disabled svg {\n  fill-opacity: .4;\n}\n\n.react-flow__controls-button:last-child {\n  border-bottom: none;\n}\n\n.react-flow__controls.horizontal .react-flow__controls-button {\n  border-bottom: none;\n  border-right: 1px solid\n      var(--xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)));\n}\n\n.react-flow__controls.horizontal .react-flow__controls-button:last-child {\n  border-right: none;\n}\n\n.react-flow__resize-control {\n  position: absolute;\n}\n\n.react-flow__resize-control.left, .react-flow__resize-control.right {\n  cursor: ew-resize;\n}\n\n.react-flow__resize-control.top, .react-flow__resize-control.bottom {\n  cursor: ns-resize;\n}\n\n.react-flow__resize-control.top.left, .react-flow__resize-control.bottom.right {\n  cursor: nwse-resize;\n}\n\n.react-flow__resize-control.bottom.left, .react-flow__resize-control.top.right {\n  cursor: nesw-resize;\n}\n\n.react-flow__resize-control.handle {\n  background-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  border: 1px solid #fff;\n  border-radius: 1px;\n  width: 5px;\n  height: 5px;\n  translate: -50% -50%;\n}\n\n.react-flow__resize-control.handle.left {\n  top: 50%;\n  left: 0;\n}\n\n.react-flow__resize-control.handle.right {\n  top: 50%;\n  left: 100%;\n}\n\n.react-flow__resize-control.handle.top {\n  top: 0;\n  left: 50%;\n}\n\n.react-flow__resize-control.handle.bottom {\n  top: 100%;\n  left: 50%;\n}\n\n.react-flow__resize-control.handle.top.left, .react-flow__resize-control.handle.bottom.left {\n  left: 0;\n}\n\n.react-flow__resize-control.handle.top.right, .react-flow__resize-control.handle.bottom.right {\n  left: 100%;\n}\n\n.react-flow__resize-control.line {\n  border-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  border-style: solid;\n  border-width: 0;\n}\n\n.react-flow__resize-control.line.left, .react-flow__resize-control.line.right {\n  width: 1px;\n  height: 100%;\n  top: 0;\n  transform: translate(-50%);\n}\n\n.react-flow__resize-control.line.left {\n  border-left-width: 1px;\n  left: 0;\n}\n\n.react-flow__resize-control.line.right {\n  border-right-width: 1px;\n  left: 100%;\n}\n\n.react-flow__resize-control.line.top, .react-flow__resize-control.line.bottom {\n  width: 100%;\n  height: 1px;\n  left: 0;\n  transform: translate(0, -50%);\n}\n\n.react-flow__resize-control.line.top {\n  border-top-width: 1px;\n  top: 0;\n}\n\n.react-flow__resize-control.line.bottom {\n  border-bottom-width: 1px;\n  top: 100%;\n}\n\n.react-flow__edge-textbg {\n  fill: var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default));\n}\n\n.react-flow__edge-text {\n  fill: var(--xy-edge-label-color, var(--xy-edge-label-color-default));\n}\n";
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
    function getEnumValues(entries) {
    	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
    }
    function joinValues(array, separator = "|") {
    	return array.map((val) => stringifyPrimitive(val)).join(separator);
    }
    function jsonStringifyReplacer(_, value) {
    	if (typeof value === "bigint") return value.toString();
    	return value;
    }
    var Cached = class {
    	constructor(getter) {
    		this._getter = getter;
    		this._value = void 0;
    	}
    	get value() {
    		const getter = this._getter;
    		if (getter !== void 0) {
    			this._value = getter();
    			this._getter = void 0;
    		}
    		return this._value;
    	}
    };
    function cached(getter) {
    	return new Cached(getter);
    }
    function nullish(input) {
    	return input === null || input === void 0;
    }
    function cleanRegex(source) {
    	const start = source.startsWith("^") ? 1 : 0;
    	const end = source.endsWith("$") ? source.length - 1 : source.length;
    	return source.slice(start, end);
    }
    function floatSafeRemainder(val, step) {
    	const ratio = val / step;
    	const roundedRatio = Math.round(ratio);
    	const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
    	if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
    	return ratio - roundedRatio;
    }
    function assignProp(target, prop, value) {
    	Object.defineProperty(target, prop, {
    		value,
    		writable: true,
    		enumerable: true,
    		configurable: true
    	});
    }
    /**
    * Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
    *
    * Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
    */
    function rawShape(def) {
    	const desc = Object.getOwnPropertyDescriptor(def, "shape");
    	return desc?.get ? desc.get.raw : desc?.value;
    }
    function sourceShape(schema) {
    	return rawShape(schema._zod.def) ?? schema._zod.def.shape;
    }
    function deferProp(target, key, getter) {
    	Object.defineProperty(target, key, {
    		get() {
    			const value = getter();
    			assignProp(this, key, value);
    			return value;
    		},
    		enumerable: true,
    		configurable: true
    	});
    }
    function putProp(target, key, value) {
    	if (key in target) assignProp(target, key, value);
    	else target[key] = value;
    }
    /**
    * Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
    *
    * A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
    */
    function mirrorShape(target, source, keys, wrap) {
    	const raw = sourceShape(source);
    	for (const key of keys) {
    		const desc = Object.getOwnPropertyDescriptor(raw, key);
    		if (!desc.enumerable) continue;
    		if (desc.get) deferProp(target, key, () => {
    			const value = source._zod.def.shape[key];
    			return wrap ? wrap(value, key) : value;
    		});
    		else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
    	}
    }
    function mirrorProps(target, source) {
    	for (const key of Reflect.ownKeys(source)) {
    		const desc = Object.getOwnPropertyDescriptor(source, key);
    		if (!desc.enumerable) continue;
    		if (desc.get) deferProp(target, key, () => source[key]);
    		else putProp(target, key, desc.value);
    	}
    }
    function mergeDefs(...defs) {
    	const mergedDescriptors = {};
    	for (const def of defs) {
    		const descriptors = Object.getOwnPropertyDescriptors(def);
    		Object.assign(mergedDescriptors, descriptors);
    	}
    	return Object.defineProperties({}, mergedDescriptors);
    }
    function esc(str) {
    	return JSON.stringify(str);
    }
    function slugify(input) {
    	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
    }
    const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
    function isObject(data) {
    	return typeof data === "object" && data !== null && !Array.isArray(data);
    }
    const allowsEval = /* @__PURE__*/ cached(() => {
    	if (globalConfig.jitless) return false;
    	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
    	try {
    		new Function("");
    		return true;
    	} catch (_) {
    		return false;
    	}
    });
    function isPlainObject(o) {
    	if (isObject(o) === false) return false;
    	const ctor = o.constructor;
    	if (ctor === void 0) return true;
    	if (typeof ctor !== "function") return true;
    	const prot = ctor.prototype;
    	if (isObject(prot) === false) return false;
    	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
    	return true;
    }
    function shallowClone(o) {
    	if (isPlainObject(o)) return { ...o };
    	if (Array.isArray(o)) return [...o];
    	if (o instanceof Map) return new Map(o);
    	if (o instanceof Set) return new Set(o);
    	return o;
    }
    const propertyKeyTypes = /* @__PURE__*/ new Set([
    	"string",
    	"number",
    	"symbol"
    ]);
    function escapeRegex(str) {
    	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function clone(inst, def, params) {
    	const cl = new inst._zod.constr(def ?? inst._zod.def);
    	if (!def || params?.parent) cl._zod.parent = inst;
    	return cl;
    }
    function normalizeParams(_params) {
    	const params = _params;
    	if (!params) return {};
    	if (typeof params === "string") return { error: () => params };
    	if (params?.message !== void 0) {
    		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
    		params.error = params.message;
    	}
    	delete params.message;
    	if (typeof params.error === "string") return {
    		...params,
    		error: () => params.error
    	};
    	return params;
    }
    function stringifyPrimitive(value) {
    	if (typeof value === "bigint") return value.toString() + "n";
    	if (typeof value === "string") return `"${value}"`;
    	return `${value}`;
    }
    function optionalKeys(shape) {
    	return Object.keys(shape).filter((k) => {
    		return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
    	});
    }
    const NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
    	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    	int32: [-2147483648, 2147483647],
    	uint32: [0, 4294967295],
    	float32: [-34028234663852886e22, 34028234663852886e22],
    	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
    }))();
    const BIGINT_FORMAT_RANGES = {
    	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
    	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
    };
    function pick(schema, mask) {
    	const currDef = schema._zod.def;
    	const checks = currDef.checks;
    	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
    	const newShape = {};
    	mirrorShape(newShape, schema, maskedKeys(schema, mask));
    	return clone(schema, mergeDefs(currDef, {
    		shape: newShape,
    		checks: []
    	}));
    }
    function maskedKeys(schema, mask) {
    	const raw = sourceShape(schema);
    	const keys = [];
    	for (const key of Reflect.ownKeys(mask)) {
    		if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
    		if (mask[key]) keys.push(key);
    	}
    	return keys;
    }
    function omit(schema, mask) {
    	const currDef = schema._zod.def;
    	const checks = currDef.checks;
    	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
    	const omitted = new Set(maskedKeys(schema, mask));
    	const newShape = {};
    	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
    	return clone(schema, mergeDefs(currDef, {
    		shape: newShape,
    		checks: []
    	}));
    }
    function extend(schema, shape) {
    	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
    	const checks = schema._zod.def.checks;
    	if (checks && checks.length > 0) {
    		const existingShape = sourceShape(schema);
    		for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
    	}
    	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
    }
    function extended(schema, shape) {
    	const newShape = {};
    	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
    	mirrorProps(newShape, shape);
    	return newShape;
    }
    function safeExtend(schema, shape) {
    	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
    	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
    }
    function merge(a, b) {
    	if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
    	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
    	const newShape = {};
    	mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
    	mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
    	return clone(a, mergeDefs(a._zod.def, {
    		shape: newShape,
    		get catchall() {
    			return b._zod.def.catchall;
    		},
    		checks: b._zod.def.checks ?? []
    	}));
    }
    function partial(Class, schema, mask, name = "partial") {
    	const checks = schema._zod.def.checks;
    	if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
    	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
    	const newShape = {};
    	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
    		type: "optional",
    		innerType: value
    	})));
    	return clone(schema, mergeDefs(schema._zod.def, {
    		shape: newShape,
    		checks: []
    	}));
    }
    function required(Class, schema, mask) {
    	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
    	const newShape = {};
    	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
    		type: "nonoptional",
    		innerType: value
    	}));
    	return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
    }
    function aborted(x, startIndex = 0) {
    	if (x.aborted === true) return true;
    	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
    	return false;
    }
    function explicitlyAborted(x, startIndex = 0) {
    	if (x.aborted === true) return true;
    	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
    	return false;
    }
    function prefixIssues(path, issues) {
    	return issues.map((iss) => {
    		var _a;
    		(_a = iss).path ?? (_a.path = []);
    		iss.path.unshift(path);
    		return iss;
    	});
    }
    function unwrapMessage(message) {
    	return typeof message === "string" ? message : message?.message;
    }
    function attachSchema(issues, start, inst) {
    	var _a;
    	for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
    }
    function finalizeIssue(iss, ctx, config) {
    	var _a;
    	const traits = iss.inst?._zod?.traits;
    	if (traits?.has("$ZodType")) {
    		if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
    		else iss.schema = iss.inst;
    	}
    	const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
    	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
    	const full = {};
    	for (const k of Object.keys(iss)) {
    		if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
    		full[k] = iss[k];
    	}
    	full.path ?? (full.path = []);
    	full.message = message;
    	if (ctx?.reportInput) full.input = iss.input;
    	return full;
    }
    const highSurrogate = /[\uD800-\uDBFF]/;
    function codePointLength(str) {
    	const units = str.length;
    	if (!highSurrogate.test(str)) return units;
    	let count = units;
    	for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
    		count--;
    		i++;
    	}
    	return count;
    }
    function getLengthableOrigin(input) {
    	if (Array.isArray(input)) return "array";
    	if (typeof input === "string") return "string";
    	return "unknown";
    }
    function parsedType(data) {
    	const t = typeof data;
    	switch (t) {
    		case "number": return Number.isNaN(data) ? "nan" : "number";
    		case "object": {
    			if (data === null) return "null";
    			if (Array.isArray(data)) return "array";
    			const obj = data;
    			if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
    		}
    	}
    	return t;
    }
    function issue(...args) {
    	const [iss, input, inst] = args;
    	if (typeof iss === "string") return {
    		message: iss,
    		code: "custom",
    		input,
    		inst
    	};
    	return { ...iss };
    }
    /**
    * Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
    *
    * Call this from a `proto` initializer, which runs once per prototype — never per instance.
    */
    function members(proto, table) {
    	for (const key in table) {
    		const desc = Object.getOwnPropertyDescriptor(table, key);
    		if (desc.get) Object.defineProperty(proto, key, {
    			...desc,
    			enumerable: false
    		});
    		else defineBound(proto, key, desc.value);
    	}
    }
    /** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
    function own(inst, key, value, enumerable = true) {
    	Object.defineProperty(inst, key, {
    		configurable: true,
    		writable: true,
    		enumerable,
    		value
    	});
    	return value;
    }
    /** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
    function hide(inst, key, value) {
    	return own(inst, key, value, false);
    }
    /** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
    function derived(computes, table) {
    	for (const key in computes) {
    		const compute = computes[key];
    		Object.defineProperty(table, key, {
    			configurable: true,
    			enumerable: true,
    			get() {
    				return own(this, key, compute(this));
    			},
    			set(value) {
    				own(this, key, value);
    			}
    		});
    	}
    	return table;
    }
    function defineBound(proto, key, fn) {
    	Object.defineProperty(proto, key, {
    		configurable: true,
    		get() {
    			return this == null ? fn : own(this, key, fn.bind(this));
    		},
    		set(value) {
    			own(this, key, value);
    		}
    	});
    }
    /** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
    function claim(inst, sentinel) {
    	const proto = Object.getPrototypeOf(inst);
    	return sentinel in proto ? void 0 : proto;
    }
    let installing;
    let broke = false;
    const breaker = {
    	configurable: true,
    	get() {
    		broke = true;
    	}
    };
    /**
    * Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
    * constructor, computed from the internals object itself and cached there on
    * first read. One accessor per constructor rather than one per instance.
    */
    function defineLazyInternal(inst, key, compute) {
    	const proto = Object.getPrototypeOf(inst._zod);
    	if (key in proto && installing !== inst._zod) {
    		installing = void 0;
    		return;
    	}
    	installing = inst._zod;
    	Object.defineProperty(proto, key, {
    		configurable: true,
    		get() {
    			Object.defineProperty(this, key, breaker);
    			const outer = broke;
    			broke = false;
    			try {
    				const value = compute(this);
    				if (broke) delete this[key];
    				else Object.defineProperty(this, key, {
    					configurable: true,
    					writable: true,
    					value
    				});
    				broke = broke || outer;
    				return value;
    			} catch (err) {
    				delete this[key];
    				broke = broke || outer;
    				throw err;
    			}
    		},
    		set(value) {
    			Object.defineProperty(this, key, {
    				configurable: true,
    				writable: true,
    				value
    			});
    		}
    	});
    }
    /**
    * Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
    * data property. One accessor per constructor rather than one per instance, because an own accessor
    * puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
    */
    function installLazyProp(inst, key, make, enumerable) {
    	const proto = claim(inst, key);
    	if (!proto) return;
    	Object.defineProperty(proto, key, {
    		configurable: true,
    		get() {
    			const desc = {
    				configurable: true,
    				writable: true,
    				enumerable,
    				value: void 0
    			};
    			Object.defineProperty(this, key, desc);
    			desc.value = make(this);
    			Object.defineProperty(this, key, desc);
    			return desc.value;
    		},
    		set(value) {
    			Object.defineProperty(this, key, {
    				configurable: true,
    				writable: true,
    				enumerable,
    				value
    			});
    		}
    	});
    }
    /** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
    const CONSTANT_CATCH = "~constantCatch";
    /** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
    function constantCatch(value) {
    	const fn = () => value;
    	fn[CONSTANT_CATCH] = true;
    	return fn;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
    var _a$1;
    const _zodDesc = {
    	value: void 0,
    	enumerable: false
    };
    let _E = "captureStackTrace" in Error ? Error : null;
    function newError(Definition) {
    	const E = _E;
    	if (E) {
    		const saved = E.stackTraceLimit;
    		if (typeof saved === "number") {
    			try {
    				E.stackTraceLimit = 0;
    			} catch {
    				_E = null;
    				return new Definition();
    			}
    			try {
    				return new Definition();
    			} finally {
    				E.stackTraceLimit = saved;
    			}
    		}
    	}
    	return new Definition();
    }
    function $constructor(name, initializer, proto, params) {
    	const zodProto = {};
    	function Internals(def) {
    		this.def = def;
    		this.constr = _;
    		this.traits = /* @__PURE__ */ new Set();
    	}
    	Internals.prototype = zodProto;
    	const protoMembers = proto;
    	const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
    	function init(inst, def) {
    		if (!inst._zod) {
    			_zodDesc.value = new Internals(def);
    			try {
    				Object.defineProperty(inst, "_zod", _zodDesc);
    			} finally {
    				_zodDesc.value = void 0;
    			}
    		} else if (inst._zod.traits.has(name)) return;
    		inst._zod.traits.add(name);
    		initializer(inst, def);
    		if (initialized) {
    			const own = Object.getPrototypeOf(inst);
    			const ctorProto = inst._zod.constr.prototype;
    			let up = own;
    			while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
    			const target = up ?? own;
    			if (!initialized.has(target)) {
    				initialized.add(target);
    				members(target, protoMembers);
    			}
    		}
    		const proto = _.prototype;
    		for (const k in proto) {
    			if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
    			if (!(k in inst)) inst[k] = proto[k].bind(inst);
    		}
    	}
    	const Parent = params?.Parent ?? Object;
    	class Definition extends Parent {}
    	Object.defineProperty(Definition, "name", { value: name });
    	function _(def) {
    		const inst = params?.Parent ? newError(Definition) : this;
    		init(inst, def);
    		const deferred = inst._zod.deferred;
    		if (deferred) {
    			for (const fn of deferred) fn();
    			inst._zod.deferred = void 0;
    		}
    		const pp = globalThis.__zod_globalConfig?.postProcessor;
    		if (pp) pp(inst);
    		return inst;
    	}
    	Object.defineProperty(_, "init", { value: init });
    	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
    		if (params?.Parent && inst instanceof params.Parent) return true;
    		return inst?._zod?.traits?.has(name);
    	} });
    	Object.defineProperty(_, "name", { value: name });
    	return _;
    }
    var $ZodAsyncError = class extends Error {
    	constructor() {
    		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    	}
    };
    var $ZodEncodeError = class extends Error {
    	constructor(name) {
    		super(`Encountered unidirectional transform during encode: ${name}`);
    		this.name = "ZodEncodeError";
    	}
    };
    (_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
    const globalConfig = globalThis.__zod_globalConfig;
    function config(newConfig) {
    	if (newConfig) Object.assign(globalConfig, newConfig);
    	return globalConfig;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
    function _getMessage() {
    	const internals = this._zod;
    	internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
    	return internals.message;
    }
    function _setMessage(value) {
    	this._zod.message = value;
    }
    const _messageDesc = {
    	get: _getMessage,
    	set: _setMessage,
    	enumerable: true,
    	configurable: true
    };
    const _issuesDesc = {
    	value: void 0,
    	enumerable: false
    };
    const _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
    const initializer$1 = (inst, def) => {
    	inst.name = "$ZodError";
    	_issuesDesc.value = def;
    	Object.defineProperty(inst, "issues", _issuesDesc);
    	_issuesDesc.value = void 0;
    	Object.defineProperty(inst, "message", _messageDesc);
    	const proto = Object.getPrototypeOf(inst);
    	if (!_installedToString.has(proto)) {
    		_installedToString.add(proto);
    		Object.defineProperty(proto, "toString", {
    			configurable: true,
    			enumerable: false,
    			get() {
    				const value = () => this.message;
    				Object.defineProperty(this, "toString", {
    					value,
    					configurable: true,
    					writable: true
    				});
    				return value;
    			},
    			set(value) {
    				Object.defineProperty(this, "toString", {
    					value,
    					configurable: true,
    					writable: true
    				});
    			}
    		});
    	}
    };
    const $ZodError = $constructor("$ZodError", initializer$1);
    $constructor("$ZodError", initializer$1, void 0, { Parent: Error });
    /** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
    * ("toString", "constructor") would otherwise read through to the prototype, and assigning
    * "__proto__" would hit the setter instead of creating a key. */
    function node(obj, key, make) {
    	if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    		if (key === "__proto__") Object.defineProperty(obj, key, {
    			value: make(),
    			writable: true,
    			enumerable: true,
    			configurable: true
    		});
    		else obj[key] = make();
    	}
    	return obj[key];
    }
    function flattenError(error, mapper = (issue) => issue.message) {
    	const fieldErrors = {};
    	const formErrors = [];
    	for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
    	else formErrors.push(mapper(sub));
    	return {
    		formErrors,
    		fieldErrors
    	};
    }
    function formatError(error, mapper = (issue) => issue.message) {
    	const fieldErrors = { _errors: [] };
    	const processError = (error, path = []) => {
    		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
    		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
    		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
    		else {
    			const fullpath = [...path, ...issue.path];
    			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
    			else {
    				let curr = fieldErrors;
    				let i = 0;
    				while (i < fullpath.length) {
    					const el = fullpath[i];
    					const terminal = i === fullpath.length - 1;
    					if (el === "_errors") {
    						if (terminal) curr._errors.push(mapper(issue));
    						i++;
    						continue;
    					}
    					if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
    						value: { _errors: [] },
    						enumerable: true,
    						writable: true,
    						configurable: true
    					});
    					const node = curr[el];
    					if (terminal) node._errors.push(mapper(issue));
    					curr = node;
    					i++;
    				}
    			}
    		}
    	};
    	processError(error);
    	return fieldErrors;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
    function finalizeParams(callee, params) {
    	return {
    		callee: params?.callee ?? callee,
    		Err: params?.Err
    	};
    }
    const _parse = (_Err) => {
    	const fn = (schema, value, _ctx, _params) => {
    		const ctx = _ctx ? {
    			..._ctx,
    			async: false
    		} : { async: false };
    		const result = schema._zod.run({
    			value,
    			issues: []
    		}, ctx);
    		if (result instanceof Promise) throw new $ZodAsyncError();
    		if (result.issues.length) {
    			const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    			captureStackTrace(e, _params?.callee ?? fn);
    			throw e;
    		}
    		return result.value;
    	};
    	return fn;
    };
    const _parseAsync = (_Err) => {
    	const fn = async (schema, value, _ctx, params) => {
    		const ctx = _ctx ? {
    			..._ctx,
    			async: true
    		} : { async: true };
    		let result = schema._zod.run({
    			value,
    			issues: []
    		}, ctx);
    		if (result instanceof Promise) result = await result;
    		if (result.issues.length) {
    			const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    			captureStackTrace(e, params?.callee ?? fn);
    			throw e;
    		}
    		return result.value;
    	};
    	return fn;
    };
    const _safeParse = (_Err) => (schema, value, _ctx) => {
    	const ctx = _ctx ? {
    		..._ctx,
    		async: false
    	} : { async: false };
    	const result = schema._zod.run({
    		value,
    		issues: []
    	}, ctx);
    	if (result instanceof Promise) throw new $ZodAsyncError();
    	return result.issues.length ? failure(_Err, result.issues, ctx) : {
    		success: true,
    		data: result.value
    	};
    };
    function failure(Err, issues, ctx) {
    	let error;
    	return {
    		success: false,
    		get error() {
    			if (!error) {
    				error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
    				issues = void 0;
    				ctx = void 0;
    			}
    			return error;
    		},
    		set error(e) {
    			error = e;
    			issues = void 0;
    			ctx = void 0;
    		}
    	};
    }
    const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    	const ctx = _ctx ? {
    		..._ctx,
    		async: true
    	} : { async: true };
    	let result = schema._zod.run({
    		value,
    		issues: []
    	}, ctx);
    	if (result instanceof Promise) result = await result;
    	return result.issues.length ? failure(_Err, result.issues, ctx) : {
    		success: true,
    		data: result.value
    	};
    };
    const COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
    const COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
    const validate = ((schema, value, _ctx) => {
    	const validator = schema._zod.bag.validator;
    	if (validator !== void 0) {
    		if (validator(value) !== COMPILE_INVALID) return true;
    		if (validator.definite === true && _ctx === void 0) return false;
    	}
    	return validateFallback(schema, value, _ctx);
    });
    function validateFallback(schema, value, _ctx) {
    	const ctx = _ctx ? {
    		..._ctx,
    		async: false,
    		abortEarly: true
    	} : {
    		async: false,
    		abortEarly: true
    	};
    	const fallbackRun = schema._zod.bag.fallbackRun;
    	let result;
    	if (fallbackRun) {
    		ctx[COMPILE_FALLBACK] = true;
    		result = fallbackRun({
    			value,
    			issues: []
    		}, ctx);
    	} else result = schema._zod.run({
    		value,
    		issues: []
    	}, ctx);
    	if (result instanceof Promise) throw new $ZodAsyncError();
    	return result.issues.length === 0;
    }
    const validateAsync$1 = async (schema, value, _ctx) => {
    	const ctx = _ctx ? {
    		..._ctx,
    		async: true,
    		abortEarly: true
    	} : {
    		async: true,
    		abortEarly: true
    	};
    	let result = schema._zod.run({
    		value,
    		issues: []
    	}, ctx);
    	if (result instanceof Promise) result = await result;
    	return result.issues.length === 0;
    };
    const _encode = (_Err) => {
    	const parse = _parse(_Err);
    	const fn = (schema, value, _ctx, _params) => {
    		const ctx = _ctx ? {
    			..._ctx,
    			direction: "backward"
    		} : { direction: "backward" };
    		return parse(schema, value, ctx, finalizeParams(fn, _params));
    	};
    	return fn;
    };
    const _decode = (_Err) => {
    	const parse = _parse(_Err);
    	const fn = (schema, value, _ctx, _params) => {
    		return parse(schema, value, _ctx, finalizeParams(fn, _params));
    	};
    	return fn;
    };
    const _encodeAsync = (_Err) => {
    	const parseAsync = _parseAsync(_Err);
    	const fn = async (schema, value, _ctx, _params) => {
    		const ctx = _ctx ? {
    			..._ctx,
    			direction: "backward"
    		} : { direction: "backward" };
    		return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
    	};
    	return fn;
    };
    const _decodeAsync = (_Err) => {
    	const parseAsync = _parseAsync(_Err);
    	const fn = async (schema, value, _ctx, _params) => {
    		return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
    	};
    	return fn;
    };
    const _safeEncode = (_Err) => (schema, value, _ctx) => {
    	const ctx = _ctx ? {
    		..._ctx,
    		direction: "backward"
    	} : { direction: "backward" };
    	return _safeParse(_Err)(schema, value, ctx);
    };
    const _safeDecode = (_Err) => (schema, value, _ctx) => {
    	return _safeParse(_Err)(schema, value, _ctx);
    };
    const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
    	const ctx = _ctx ? {
    		..._ctx,
    		direction: "backward"
    	} : { direction: "backward" };
    	return _safeParseAsync(_Err)(schema, value, ctx);
    };
    const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
    	return _safeParseAsync(_Err)(schema, value, _ctx);
    };
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
    /**
    * @deprecated CUID v1 is deprecated by its authors due to information leakage
    * (timestamps embedded in the id). Use {@link cuid2} instead.
    * See https://github.com/paralleldrive/cuid.
    */
    const cuid = /^[cC][0-9a-z]{6,}$/;
    const cuid2 = /^[0-9a-z]+$/;
    const ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
    const xid = /^[0-9a-vA-V]{20}$/;
    const ksuid = /^[A-Za-z0-9]{27}$/;
    const nanoid = /^[a-zA-Z0-9_-]{21}$/;
    function nanoidOfLength(length) {
    	return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
    }
    /** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
    const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
    /** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
    const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
    /** Returns a regex for validating an RFC 9562/4122 UUID.
    *
    * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
    const uuid = (version) => {
    	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
    	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
    };
    /** Practical email validation */
    const email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
    const _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
    function emoji() {
    	return new RegExp(_emoji$1, "u");
    }
    const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
    const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
    const base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
    const httpProtocol = /^https?$/;
    const e164 = /^\+[1-9]\d{6,14}$/;
    const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
    /** Anchors a pattern source. The interpolation lives here rather than at the call site because
    * esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
    * will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
    function anchor(source) {
    	return new RegExp(`^${source}$`);
    }
    const date = /*@__PURE__*/ anchor(dateSource);
    function timeSource(args) {
    	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    }
    function time(args) {
    	return new RegExp(`^${timeSource(args)}$`);
    }
    function datetime(args) {
    	const opts = ["Z"];
    	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    	const qualified = `${timeSource({
    		precision: args.precision,
    		seconds: true
    	})}(?:${opts.join("|")})`;
    	const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
    	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
    }
    const anyString = /^[\s\S]{0,}$/;
    const number$1 = /^-?\d+(?:\.\d+)?$/;
    const boolean$1 = /^(?:true|false)$/i;
    const lowercase = /^[^A-Z]*$/;
    const uppercase = /^[^a-z]*$/;
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/checks.js
    const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
    	var _a;
    	inst._zod ?? (inst._zod = {});
    	inst._zod.def = def;
    	(_a = inst._zod).onattach ?? (_a.onattach = []);
    });
    /** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
    const _whenHasLength = (payload) => {
    	const val = payload.value;
    	return !nullish(val) && val.length !== void 0;
    };
    const numericOriginMap = {
    	number: "number",
    	bigint: "bigint",
    	object: "date"
    };
    const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	const origin = numericOriginMap[typeof def.value];
    	inst._zod.check = (payload) => {
    		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
    		payload.issues.push({
    			origin: numericOriginMap[typeof payload.value] ?? origin,
    			code: "too_big",
    			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
    			input: payload.value,
    			inclusive: def.inclusive,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	const origin = numericOriginMap[typeof def.value];
    	inst._zod.check = (payload) => {
    		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
    		payload.issues.push({
    			origin: numericOriginMap[typeof payload.value] ?? origin,
    			code: "too_small",
    			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
    			input: payload.value,
    			inclusive: def.inclusive,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
    		if (typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
    		payload.issues.push({
    			origin: typeof payload.value,
    			code: "not_multiple_of",
    			divisor: def.value,
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	def.format = def.format || "float64";
    	const isInt = def.format?.includes("int");
    	const origin = isInt ? "int" : "number";
    	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
    	inst._zod.check = (payload) => {
    		const input = payload.value;
    		if (isInt) {
    			if (!Number.isInteger(input)) {
    				payload.issues.push({
    					expected: origin,
    					format: def.format,
    					code: "invalid_type",
    					continue: false,
    					input,
    					inst
    				});
    				return;
    			}
    			if (!Number.isSafeInteger(input)) {
    				if (input > 0) payload.issues.push({
    					input,
    					code: "too_big",
    					maximum: Number.MAX_SAFE_INTEGER,
    					note: "Integers must be within the safe integer range.",
    					inst,
    					origin,
    					inclusive: true,
    					continue: !def.abort
    				});
    				else payload.issues.push({
    					input,
    					code: "too_small",
    					minimum: Number.MIN_SAFE_INTEGER,
    					note: "Integers must be within the safe integer range.",
    					inst,
    					origin,
    					inclusive: true,
    					continue: !def.abort
    				});
    				return;
    			}
    		}
    		if (input < minimum) payload.issues.push({
    			origin: "number",
    			input,
    			code: "too_small",
    			minimum,
    			inclusive: true,
    			inst,
    			continue: !def.abort
    		});
    		if (input > maximum) payload.issues.push({
    			origin: "number",
    			input,
    			code: "too_big",
    			maximum,
    			inclusive: true,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
    	var _a;
    	$ZodCheck.init(inst, def);
    	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    	inst._zod.check = (payload) => {
    		const input = payload.value;
    		const units = input.length;
    		if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
    		const origin = getLengthableOrigin(input);
    		payload.issues.push({
    			origin,
    			code: "too_big",
    			maximum: def.maximum,
    			inclusive: true,
    			input,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
    	var _a;
    	$ZodCheck.init(inst, def);
    	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    	inst._zod.check = (payload) => {
    		const input = payload.value;
    		const units = input.length;
    		if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
    		const origin = getLengthableOrigin(input);
    		payload.issues.push({
    			origin,
    			code: "too_small",
    			minimum: def.minimum,
    			inclusive: true,
    			input,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
    	var _a;
    	$ZodCheck.init(inst, def);
    	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    	inst._zod.check = (payload) => {
    		const input = payload.value;
    		const units = input.length;
    		const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
    		if (length === def.length) return;
    		const origin = getLengthableOrigin(input);
    		const tooBig = length > def.length;
    		payload.issues.push({
    			origin,
    			...tooBig ? {
    				code: "too_big",
    				maximum: def.length
    			} : {
    				code: "too_small",
    				minimum: def.length
    			},
    			inclusive: true,
    			exact: true,
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
    	var _a, _b;
    	$ZodCheck.init(inst, def);
    	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
    		def.pattern.lastIndex = 0;
    		if (def.pattern.test(payload.value)) return;
    		payload.issues.push({
    			origin: "string",
    			code: "invalid_format",
    			format: def.format,
    			input: payload.value,
    			...def.pattern ? { pattern: def.pattern.toString() } : {},
    			inst,
    			continue: !def.abort
    		});
    	});
    	else (_b = inst._zod).check ?? (_b.check = () => {});
    });
    const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
    	$ZodCheckStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		def.pattern.lastIndex = 0;
    		if (def.pattern.test(payload.value)) return;
    		payload.issues.push({
    			origin: "string",
    			code: "invalid_format",
    			format: "regex",
    			input: payload.value,
    			pattern: def.pattern.toString(),
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
    	def.pattern ?? (def.pattern = lowercase);
    	$ZodCheckStringFormat.init(inst, def);
    });
    const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
    	def.pattern ?? (def.pattern = uppercase);
    	$ZodCheckStringFormat.init(inst, def);
    });
    const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	const escapedRegex = escapeRegex(def.includes);
    	def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
    	inst._zod.check = (payload) => {
    		if (payload.value.includes(def.includes, def.position)) return;
    		payload.issues.push({
    			origin: "string",
    			code: "invalid_format",
    			format: "includes",
    			includes: def.includes,
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
    	def.pattern ?? (def.pattern = pattern);
    	inst._zod.check = (payload) => {
    		if (payload.value.startsWith(def.prefix)) return;
    		payload.issues.push({
    			origin: "string",
    			code: "invalid_format",
    			format: "starts_with",
    			prefix: def.prefix,
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
    	def.pattern ?? (def.pattern = pattern);
    	inst._zod.check = (payload) => {
    		if (payload.value.endsWith(def.suffix)) return;
    		payload.issues.push({
    			origin: "string",
    			code: "invalid_format",
    			format: "ends_with",
    			suffix: def.suffix,
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	inst._zod.check = (payload) => {
    		payload.value = def.tx(payload.value);
    	};
    });
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/doc.js
    var Doc = class {
    	constructor(args = [], closed = {}) {
    		this.content = [];
    		this.indent = 0;
    		this.args = args;
    		this.closed = closed;
    	}
    	indented(fn) {
    		this.indent += 1;
    		try {
    			fn(this);
    		} finally {
    			this.indent -= 1;
    		}
    	}
    	write(arg) {
    		if (typeof arg === "function") {
    			arg(this, { execution: "sync" });
    			arg(this, { execution: "async" });
    			return;
    		}
    		const lines = arg.split("\n").filter((x) => x);
    		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    		for (const line of dedented) this.content.push(line);
    	}
    	compile() {
    		const F = Function;
    		const content = this?.content ?? [``];
    		return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
    	}
    };
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/versions.js
    const version = {
    	major: 4,
    	minor: 6,
    	patch: 5
    };
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
    const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
    	var _a;
    	inst ?? (inst = {});
    	inst._zod.def = def;
    	inst._zod.bag = inst._zod.bag || {};
    	inst._zod.version = version;
    	const defChecks = inst._zod.def.checks;
    	const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
    	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
    	if (checks.length === 0) {
    		(_a = inst._zod).deferred ?? (_a.deferred = []);
    		inst._zod.deferred?.push(() => {
    			inst._zod.run = inst._zod.parse;
    		});
    	} else {
    		const runChecks = (payload, checks, ctx) => {
    			if (payload.memo) return payload;
    			let isAborted = aborted(payload);
    			let asyncResult;
    			for (const ch of checks) {
    				if (ch._zod.def.when) {
    					if (explicitlyAborted(payload)) continue;
    					if (!ch._zod.def.when(payload)) continue;
    				} else if (isAborted) continue;
    				const currLen = payload.issues.length;
    				const _ = ch._zod.check(payload);
    				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
    				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
    					await _;
    					if (payload.issues.length === currLen) return;
    					attachSchema(payload.issues, currLen, inst);
    					if (!isAborted) isAborted = aborted(payload, currLen);
    				});
    				else {
    					if (payload.issues.length === currLen) continue;
    					attachSchema(payload.issues, currLen, inst);
    					if (!isAborted) isAborted = aborted(payload, currLen);
    				}
    			}
    			if (asyncResult) return asyncResult.then(() => {
    				return payload;
    			});
    			return payload;
    		};
    		const handleCanaryResult = (canary, payload, ctx) => {
    			if (aborted(canary)) {
    				canary.aborted = true;
    				return canary;
    			}
    			const checkResult = runChecks(payload, checks, ctx);
    			if (checkResult instanceof Promise) {
    				if (ctx.async === false) throw new $ZodAsyncError();
    				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
    			}
    			return inst._zod.parse(checkResult, ctx);
    		};
    		inst._zod.run = (payload, ctx) => {
    			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
    			if (ctx.direction === "backward") {
    				const canary = inst._zod.parse({
    					value: payload.value,
    					issues: []
    				}, {
    					...ctx,
    					skipChecks: true
    				});
    				if (canary instanceof Promise) return canary.then((canary) => {
    					return handleCanaryResult(canary, payload, ctx);
    				});
    				return handleCanaryResult(canary, payload, ctx);
    			}
    			const result = inst._zod.parse(payload, ctx);
    			if (result instanceof Promise) {
    				if (ctx.async === false) throw new $ZodAsyncError();
    				return result.then((result) => runChecks(result, checks, ctx));
    			}
    			return runChecks(result, checks, ctx);
    		};
    	}
    }, {
    	get "~standard"() {
    		return hide(this, "~standard", standardProps(this));
    	},
    	set "~standard"(value) {
    		own(this, "~standard", value);
    	}
    });
    /** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
    const toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
    async function validateAsync(inst, value) {
    	const ctx = { async: true };
    	return toStandardResult(await inst._zod.run({
    		value,
    		issues: []
    	}, ctx), ctx);
    }
    function standardProps(inst) {
    	return {
    		validate: (value) => {
    			const ctx = { async: false };
    			try {
    				const r = inst._zod.run({
    					value,
    					issues: []
    				}, ctx);
    				if (!(r instanceof Promise)) return toStandardResult(r, ctx);
    			} catch (_) {}
    			return validateAsync(inst, value);
    		},
    		vendor: "zod",
    		version: 1
    	};
    }
    const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.pattern = def.pattern ?? anyString;
    	inst._zod.parse = (payload, _) => {
    		if (def.coerce) try {
    			payload.value = String(payload.value);
    		} catch (_) {}
    		if (typeof payload.value === "string") return payload;
    		payload.issues.push({
    			expected: "string",
    			code: "invalid_type",
    			input: payload.value,
    			inst
    		});
    		return payload;
    	};
    });
    const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
    	$ZodCheckStringFormat.init(inst, def);
    	$ZodString.init(inst, def);
    });
    const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
    	def.pattern ?? (def.pattern = guid);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
    	if (def.version) {
    		const v = {
    			v1: 1,
    			v2: 2,
    			v3: 3,
    			v4: 4,
    			v5: 5,
    			v6: 6,
    			v7: 7,
    			v8: 8
    		}[def.version];
    		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
    		def.pattern ?? (def.pattern = uuid(v));
    	} else def.pattern ?? (def.pattern = uuid());
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
    	def.pattern ?? (def.pattern = email);
    	$ZodStringFormat.init(inst, def);
    });
    function canParseURL(input) {
    	try {
    		if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
    		new URL(input);
    		return true;
    	} catch {
    		return false;
    	}
    }
    function validateURL(trimmed, def) {
    	if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
    	return parseURLObject(trimmed, def);
    }
    /** Parses a URL while preserving the non-normalizing HTTP guard. */
    function parseURLObject(trimmed, def) {
    	if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
    	try {
    		if (typeof URL !== "undefined") {
    			const URLStatic = URL;
    			if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
    		}
    		return new URL(trimmed);
    	} catch {
    		return 2;
    	}
    }
    const asciiTabOrNewline = /[\t\n\r]/g;
    /** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
    function stripTabAndNewline(value) {
    	return value.replace(asciiTabOrNewline, "");
    }
    function urlHostnameOk(url, hostname) {
    	hostname.lastIndex = 0;
    	return hostname.test(url.hostname);
    }
    function urlProtocolOk(url, protocol) {
    	protocol.lastIndex = 0;
    	return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
    }
    const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		try {
    			const trimmed = payload.value.trim();
    			const url = validateURL(trimmed, def);
    			if (url === 1) {
    				payload.issues.push({
    					code: "invalid_format",
    					format: "url",
    					note: "Invalid URL format",
    					input: payload.value,
    					inst,
    					continue: !def.abort
    				});
    				return;
    			}
    			if (url === 2) {
    				payload.issues.push({
    					code: "invalid_format",
    					format: "url",
    					input: payload.value,
    					inst,
    					continue: !def.abort
    				});
    				return;
    			}
    			if (url === true) {
    				payload.value = stripTabAndNewline(trimmed);
    				return;
    			}
    			if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
    				code: "invalid_format",
    				format: "url",
    				note: "Invalid hostname",
    				pattern: def.hostname.source,
    				input: payload.value,
    				inst,
    				continue: !def.abort
    			});
    			if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
    				code: "invalid_format",
    				format: "url",
    				note: "Invalid protocol",
    				pattern: def.protocol.source,
    				input: payload.value,
    				inst,
    				continue: !def.abort
    			});
    			payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
    			return;
    		} catch (_) {
    			payload.issues.push({
    				code: "invalid_format",
    				format: "url",
    				input: payload.value,
    				inst,
    				continue: !def.abort
    			});
    		}
    	};
    });
    const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
    	def.pattern ?? (def.pattern = emoji());
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
    	if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
    	def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
    	$ZodStringFormat.init(inst, def);
    });
    /**
    * @deprecated CUID v1 is deprecated by its authors due to information leakage
    * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
    * See https://github.com/paralleldrive/cuid.
    */
    const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
    	def.pattern ?? (def.pattern = cuid);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
    	def.pattern ?? (def.pattern = cuid2);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
    	def.pattern ?? (def.pattern = ulid);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
    	def.pattern ?? (def.pattern = xid);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
    	def.pattern ?? (def.pattern = ksuid);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
    	def.pattern ?? (def.pattern = datetime(def));
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
    	def.pattern ?? (def.pattern = date);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
    	def.pattern ?? (def.pattern = time(def));
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
    	def.pattern ?? (def.pattern = duration);
    	$ZodStringFormat.init(inst, def);
    });
    const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
    	def.pattern ?? (def.pattern = ipv4);
    	$ZodStringFormat.init(inst, def);
    });
    /** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
    const ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
    function isValidIPv6(value) {
    	if (!ipv6Alphabet.test(value)) return false;
    	return canParseURL(`http://[${value}]`);
    }
    const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
    	def.pattern ?? (def.pattern = ipv6);
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (!isValidIPv6(payload.value)) payload.issues.push({
    			code: "invalid_format",
    			format: "ipv6",
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
    	def.pattern ?? (def.pattern = cidrv4);
    	$ZodStringFormat.init(inst, def);
    });
    function isValidCIDRv6(value) {
    	const parts = value.split("/");
    	if (parts.length !== 2) return false;
    	const [address, prefix] = parts;
    	if (!prefix) return false;
    	const prefixNum = Number(prefix);
    	if (`${prefixNum}` !== prefix) return false;
    	if (prefixNum < 0 || prefixNum > 128) return false;
    	return isValidIPv6(address);
    }
    const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
    	def.pattern ?? (def.pattern = cidrv6);
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (!isValidCIDRv6(payload.value)) payload.issues.push({
    			code: "invalid_format",
    			format: "cidrv6",
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    function isValidBase64(data) {
    	if (data === "") return true;
    	if (/\s/.test(data)) return false;
    	if (data.length % 4 !== 0) return false;
    	try {
    		atob(data);
    		return true;
    	} catch {
    		return false;
    	}
    }
    const base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
    const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
    	def.pattern ?? (def.pattern = base64Charset);
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (isValidBase64(payload.value)) return;
    		payload.issues.push({
    			code: "invalid_format",
    			format: "base64",
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const base64urlCharset = /^[A-Za-z0-9_-]*$/;
    function isValidBase64URL(data) {
    	if (!base64urlCharset.test(data)) return false;
    	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
    	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
    }
    const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
    	def.pattern ?? (def.pattern = base64urlCharset);
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (isValidBase64URL(payload.value)) return;
    		payload.issues.push({
    			code: "invalid_format",
    			format: "base64url",
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
    	def.pattern ?? (def.pattern = e164);
    	$ZodStringFormat.init(inst, def);
    });
    function isValidJWT(token, algorithm = null) {
    	try {
    		const tokensParts = token.split(".");
    		if (tokensParts.length !== 3) return false;
    		const [header] = tokensParts;
    		if (!header) return false;
    		const parsedHeader = JSON.parse(atob(header));
    		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
    		if (!parsedHeader.alg) return false;
    		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
    		return true;
    	} catch {
    		return false;
    	}
    }
    const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
    	$ZodStringFormat.init(inst, def);
    	inst._zod.check = (payload) => {
    		if (isValidJWT(payload.value, def.alg)) return;
    		payload.issues.push({
    			code: "invalid_format",
    			format: "jwt",
    			input: payload.value,
    			inst,
    			continue: !def.abort
    		});
    	};
    });
    const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.pattern = number$1;
    	inst._zod.parse = (payload, _ctx) => {
    		if (def.coerce) try {
    			payload.value = Number(payload.value);
    		} catch (_) {}
    		const input = payload.value;
    		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
    		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : void 0 : void 0;
    		payload.issues.push({
    			expected: "number",
    			code: "invalid_type",
    			input,
    			inst,
    			...received ? { received } : {}
    		});
    		return payload;
    	};
    });
    const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
    	$ZodCheckNumberFormat.init(inst, def);
    	$ZodNumber.init(inst, def);
    });
    const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.pattern = boolean$1;
    	inst._zod.parse = (payload, _ctx) => {
    		if (def.coerce) try {
    			payload.value = Boolean(payload.value);
    		} catch (_) {}
    		const input = payload.value;
    		if (typeof input === "boolean") return payload;
    		payload.issues.push({
    			expected: "boolean",
    			code: "invalid_type",
    			input,
    			inst
    		});
    		return payload;
    	};
    });
    const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.parse = (payload) => payload;
    });
    const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.parse = (payload, _ctx) => {
    		payload.issues.push({
    			expected: "never",
    			code: "invalid_type",
    			input: payload.value,
    			inst
    		});
    		return payload;
    	};
    });
    const $ZodVoid = /*@__PURE__*/ $constructor("$ZodVoid", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.parse = (payload, _ctx) => {
    		const input = payload.value;
    		if (typeof input === "undefined") return payload;
    		payload.issues.push({
    			expected: "void",
    			code: "invalid_type",
    			input,
    			inst
    		});
    		return payload;
    	};
    });
    function handleArrayResult(result, final, index) {
    	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
    	final.value[index] = result.value;
    }
    const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
    	$ZodType.init(inst, def);
    	const memo = globalConfig.memoizer;
    	memo?.attach(inst);
    	inst._zod.parse = (payload, ctx) => {
    		const input = payload.value;
    		if (!Array.isArray(input)) {
    			payload.issues.push({
    				expected: "array",
    				code: "invalid_type",
    				input,
    				inst
    			});
    			return payload;
    		}
    		payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
    		const proms = [];
    		const abortEarly = ctx?.abortEarly;
    		for (let i = 0; i < input.length; i++) {
    			const item = input[i];
    			const result = def.element._zod.run({
    				value: item,
    				issues: []
    			}, ctx);
    			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
    			else {
    				handleArrayResult(result, payload, i);
    				if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
    			}
    		}
    		if (proms.length) return Promise.all(proms).then(() => payload);
    		return payload;
    	};
    });
    function handlePropertyResult(result, final, key, input, optin, optout) {
    	const isPresent = key in input;
    	const isOptionalOut = optout === "optional";
    	if (!isPresent && isOptionalOut && optin === "optional") return;
    	if (result.issues.length) {
    		if (optin !== void 0 && isOptionalOut && !isPresent) return;
    		final.issues.push(...prefixIssues(key, result.issues));
    	}
    	if (!isPresent && optin === void 0) {
    		if (!result.issues.length) final.issues.push({
    			code: "invalid_type",
    			expected: "nonoptional",
    			input: void 0,
    			path: [key]
    		});
    		return;
    	}
    	if (result.value === void 0) {
    		if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
    	} else final.value[key] = result.value;
    }
    const NO_SYMBOL_KEYS = [];
    function normalizeDef(def) {
    	const keys = Object.keys(def.shape);
    	const ownSymbols = Object.getOwnPropertySymbols(def.shape);
    	const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
    	const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
    	for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
    	const okeys = optionalKeys(def.shape);
    	return {
    		...def,
    		allKeys,
    		symbolKeys,
    		keySet: new Set(keys),
    		numKeys: keys.length,
    		optionalKeys: new Set(okeys)
    	};
    }
    function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
    	const unrecognized = [];
    	const keySet = def.keySet;
    	const _catchall = def.catchall._zod;
    	const t = _catchall.def.type;
    	const optin = _catchall.optin;
    	const optout = _catchall.optout;
    	let seen = 0;
    	for (const key in input) {
    		if (abortEarly && payload.issues.length !== seen) {
    			if (aborted(payload, seen)) break;
    			seen = payload.issues.length;
    		}
    		if (keySet.has(key)) continue;
    		if (key === "__proto__") {
    			if (t === "never") unrecognized.push(key);
    			continue;
    		}
    		if (t === "never") {
    			unrecognized.push(key);
    			continue;
    		}
    		const r = _catchall.run({
    			value: input[key],
    			issues: []
    		}, ctx);
    		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
    		else handlePropertyResult(r, payload, key, input, optin, optout);
    	}
    	if (unrecognized.length) payload.issues.push({
    		code: "unrecognized_keys",
    		keys: unrecognized,
    		input,
    		inst,
    		continue: true
    	});
    	if (!proms.length) return payload;
    	return Promise.all(proms).then(() => {
    		return payload;
    	});
    }
    const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
    	$ZodType.init(inst, def);
    	const desc = Object.getOwnPropertyDescriptor(def, "shape");
    	const sh = desc?.get ? desc.get.raw : def.shape ?? {};
    	if (sh) {
    		const get = () => {
    			const newSh = { ...sh };
    			Object.defineProperty(def, "shape", { value: newSh });
    			get.raw = newSh;
    			return newSh;
    		};
    		get.raw = sh;
    		Object.defineProperty(def, "shape", { get });
    	}
    	const _normalized = cached(() => normalizeDef(def));
    	defineLazyInternal(inst, "propValues", (zod) => {
    		const shape = zod.def.shape;
    		const propValues = {};
    		for (const key in shape) {
    			const field = shape[key]._zod;
    			if (field.values) {
    				if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
    				for (const v of field.values) propValues[key].add(v);
    				if (field.optin !== void 0) propValues[key].add(void 0);
    			}
    		}
    		return propValues;
    	});
    	const isObject$2 = isObject;
    	const catchall = def.catchall;
    	let value;
    	const memo = globalConfig.memoizer;
    	memo?.attach(inst);
    	inst._zod.parse = (payload, ctx) => {
    		value ?? (value = _normalized.value);
    		const input = payload.value;
    		if (!isObject$2(input)) {
    			payload.issues.push({
    				expected: "object",
    				code: "invalid_type",
    				input,
    				inst
    			});
    			return payload;
    		}
    		payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
    		const proms = [];
    		const shape = value.shape;
    		const abortEarly = ctx?.abortEarly;
    		let seen = payload.issues.length;
    		for (const key of value.allKeys) {
    			if (abortEarly && payload.issues.length !== seen) {
    				if (aborted(payload, seen)) break;
    				seen = payload.issues.length;
    			}
    			if (key === "__proto__") continue;
    			const el = shape[key];
    			const optin = el._zod.optin;
    			const optout = el._zod.optout;
    			const r = el._zod.run({
    				value: input[key],
    				issues: []
    			}, ctx);
    			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
    			else handlePropertyResult(r, payload, key, input, optin, optout);
    		}
    		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
    		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
    	};
    });
    const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
    	$ZodObject.init(inst, def);
    	const superParse = inst._zod.parse;
    	const _normalized = cached(() => normalizeDef(def));
    	const memo = globalConfig.memoizer;
    	const generateFastpass = (shape) => {
    		const normalized = _normalized.value;
    		const syms = normalized.symbolKeys;
    		const doc = new Doc(["payload", "ctx"], {
    			shape,
    			inst,
    			memo,
    			syms
    		});
    		const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    		const prefixStr = (id, k) => `
              let ${id}_ab = false;
              for (let i = 0; i < ${id}.issues.length; i++) {
                const iss = ${id}.issues[i];
                iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
                payload.issues.push(iss);
                if (iss.continue !== true) ${id}_ab = true;
              }
              if (${id}_ab && ctx && ctx.abortEarly) {
                payload.value = newResult;
                return payload;
              }`;
    		doc.write(`const input = payload.value;`);
    		const ids = Object.create(null);
    		let counter = 0;
    		for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
    		doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
    		for (const key of normalized.allKeys) {
    			if (key === "__proto__") continue;
    			const id = ids[key];
    			const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
    			const isPresent = `${k} in input`;
    			const schema = shape[key];
    			const optin = schema?._zod?.optin;
    			const isOptionalIn = optin !== void 0;
    			const isOptionalOut = schema?._zod?.optout === "optional";
    			doc.write(`const ${id} = ${parseStr(k)};`);
    			if (isOptionalIn && isOptionalOut) {
    				const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
    				doc.write(`
            const ${id}_present = ${isPresent};
            if (!${id}.issues.length || ${id}_present) {
              if (${id}.issues.length) {${prefixStr(id, k)}
              }
    
              if (${assign}) {
                newResult[${k}] = ${id}.value;
              }
            }
    
          `);
    			} else if (!isOptionalIn) doc.write(`
            const ${id}_present = ${isPresent};
            if (${id}.issues.length) {${prefixStr(id, k)}
            }
            if (!${id}_present && !${id}.issues.length) {
              payload.issues.push({
                code: "invalid_type",
                expected: "nonoptional",
                input: undefined,
                path: [${k}]
              });
              if (ctx && ctx.abortEarly) {
                payload.value = newResult;
                return payload;
              }
            }
    
            if (${id}_present) {
              newResult[${k}] = ${id}.value;
            }
    
          `);
    			else {
    				doc.write(`
            if (${id}.issues.length) {${prefixStr(id, k)}
            }
          `);
    				if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
    				else doc.write(`
            if (${id}.value !== undefined || ${isPresent}) {
              newResult[${k}] = ${id}.value;
            }
          `);
    			}
    		}
    		doc.write(`payload.value = newResult;`);
    		doc.write(`return payload;`);
    		return doc.compile();
    	};
    	let fastpass;
    	const isObject$1 = isObject;
    	const jit = !globalConfig.jitless;
    	const fastEnabled = jit && allowsEval.value;
    	const catchall = def.catchall;
    	let value;
    	inst._zod.parse = (payload, ctx) => {
    		value ?? (value = _normalized.value);
    		const input = payload.value;
    		if (!isObject$1(input)) {
    			payload.issues.push({
    				expected: "object",
    				code: "invalid_type",
    				input,
    				inst
    			});
    			return payload;
    		}
    		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
    			if (!fastpass) fastpass = generateFastpass(def.shape);
    			payload = fastpass(payload, ctx);
    			if (!catchall) return payload;
    			return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
    		}
    		return superParse(payload, ctx);
    	};
    });
    function handleUnionResults(results, final, inst, ctx) {
    	for (const result of results) if (result.issues.length === 0) {
    		final.value = result.value;
    		return final;
    	}
    	const nonaborted = results.filter((r) => !aborted(r));
    	if (nonaborted.length === 1) {
    		final.value = nonaborted[0].value;
    		return nonaborted[0];
    	}
    	final.issues.push({
    		code: "invalid_union",
    		input: final.value,
    		inst,
    		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    	});
    	return final;
    }
    const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
    	defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
    	defineLazyInternal(inst, "values", (zod) => {
    		if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
    	});
    	defineLazyInternal(inst, "pattern", (zod) => {
    		if (zod.def.options.every((o) => o._zod.pattern)) {
    			const patterns = zod.def.options.map((o) => o._zod.pattern);
    			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    		}
    	});
    	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
    	inst._zod.parse = (payload, ctx) => {
    		if (first) return first(payload, ctx);
    		let async = false;
    		const results = [];
    		for (const option of def.options) {
    			const result = option._zod.run({
    				value: payload.value,
    				issues: []
    			}, ctx);
    			if (result instanceof Promise) {
    				results.push(result);
    				async = true;
    			} else {
    				if (result.issues.length === 0) return result;
    				results.push(result);
    			}
    		}
    		if (!async) return handleUnionResults(results, payload, inst, ctx);
    		return Promise.all(results).then((results) => {
    			return handleUnionResults(results, payload, inst, ctx);
    		});
    	};
    });
    const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.parse = (payload, ctx) => {
    		const input = payload.value;
    		const left = def.left._zod.run({
    			value: input,
    			issues: []
    		}, ctx);
    		const right = def.right._zod.run({
    			value: input,
    			issues: []
    		}, ctx);
    		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
    			return handleIntersectionResults(payload, left, right);
    		});
    		return handleIntersectionResults(payload, left, right);
    	};
    });
    function mergeValues(a, b) {
    	if (a === b) return {
    		valid: true,
    		data: a
    	};
    	if (a instanceof Date && b instanceof Date && +a === +b) return {
    		valid: true,
    		data: a
    	};
    	if (isPlainObject(a) && isPlainObject(b)) {
    		const bKeys = Object.keys(b);
    		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    		const newObj = {
    			...a,
    			...b
    		};
    		if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
    		for (const key of sharedKeys) {
    			if (key === "__proto__") continue;
    			const sharedValue = mergeValues(a[key], b[key]);
    			if (!sharedValue.valid) return {
    				valid: false,
    				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
    			};
    			newObj[key] = sharedValue.data;
    		}
    		return {
    			valid: true,
    			data: newObj
    		};
    	}
    	if (Array.isArray(a) && Array.isArray(b)) {
    		if (a.length !== b.length) return {
    			valid: false,
    			mergeErrorPath: []
    		};
    		const newArray = [];
    		for (let index = 0; index < a.length; index++) {
    			const itemA = a[index];
    			const itemB = b[index];
    			const sharedValue = mergeValues(itemA, itemB);
    			if (!sharedValue.valid) return {
    				valid: false,
    				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
    			};
    			newArray.push(sharedValue.data);
    		}
    		return {
    			valid: true,
    			data: newArray
    		};
    	}
    	return {
    		valid: false,
    		mergeErrorPath: []
    	};
    }
    function handleIntersectionResults(result, left, right) {
    	const unrecKeys = /* @__PURE__ */ new Map();
    	let unrecIssue;
    	const keyIssues = /* @__PURE__ */ new Map();
    	const collect = (iss, side) => {
    		let keys;
    		if (iss.code === "unrecognized_keys" && !iss.path?.length) {
    			unrecIssue ?? (unrecIssue = iss);
    			keys = iss.keys;
    		} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
    			const k = String(iss.path[0]);
    			if (!keyIssues.has(k)) keyIssues.set(k, iss);
    			keys = [k];
    		} else return false;
    		for (const k of keys) {
    			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
    			unrecKeys.get(k)[side] = true;
    		}
    		return true;
    	};
    	for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
    	for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
    	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
    	if (bothKeys.length) {
    		const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    		if (aggregated.length) result.issues.push({
    			...unrecIssue,
    			keys: aggregated
    		});
    		for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
    	}
    	const merged = mergeValues(left.value, right.value);
    	if (!merged.valid) {
    		if (aborted(result)) return result;
    		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
    	}
    	result.value = merged.data;
    	return result;
    }
    const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
    	$ZodType.init(inst, def);
    	const values = getEnumValues(def.entries);
    	const valuesSet = new Set(values);
    	inst._zod.values = valuesSet;
    	defineLazyInternal(inst, "pattern", (zod) => {
    		const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
    		return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
    	});
    	inst._zod.parse = (payload, _ctx) => {
    		const input = payload.value;
    		if (valuesSet.has(input)) return payload;
    		payload.issues.push({
    			code: "invalid_value",
    			values,
    			input,
    			inst
    		});
    		return payload;
    	};
    });
    const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
    	$ZodType.init(inst, def);
    	const values = new Set(def.values);
    	inst._zod.values = values;
    	defineLazyInternal(inst, "pattern", (zod) => {
    		const vals = zod.def.values;
    		return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
    	});
    	inst._zod.parse = (payload, _ctx) => {
    		const input = payload.value;
    		if (values.has(input)) return payload;
    		payload.issues.push({
    			code: "invalid_value",
    			values: def.values,
    			input,
    			inst
    		});
    		return payload;
    	};
    });
    const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.optin = "optional";
    	globalConfig.memoizer?.guard(inst);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
    		const _out = def.transform(payload.value, payload);
    		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
    			payload.value = output;
    			return payload;
    		});
    		if (_out instanceof Promise) throw new $ZodAsyncError();
    		payload.value = _out;
    		return payload;
    	};
    });
    function handleOptionalResult(payload, result) {
    	payload.value = result.issues.length ? void 0 : result.value;
    	return payload;
    }
    const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
    	inst._zod.optout = "optional";
    	defineLazyInternal(inst, "values", (zod) => {
    		const values = zod.def.innerType._zod.values;
    		return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
    	});
    	defineLazyInternal(inst, "pattern", (zod) => {
    		const pattern = zod.def.innerType._zod.pattern;
    		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
    	});
    	inst._zod.parse = (payload, ctx) => {
    		if (payload.value === void 0) {
    			if (def.innerType._zod.optin !== "defaulted") return payload;
    			const result = def.innerType._zod.run({
    				value: payload.value,
    				issues: []
    			}, ctx);
    			if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
    			return handleOptionalResult(payload, result);
    		}
    		return def.innerType._zod.run(payload, ctx);
    	};
    });
    const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
    	$ZodOptional.init(inst, def);
    	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
    	defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
    	inst._zod.parse = (payload, ctx) => {
    		return def.innerType._zod.run(payload, ctx);
    	};
    });
    const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
    	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
    	defineLazyInternal(inst, "pattern", (zod) => {
    		const pattern = zod.def.innerType._zod.pattern;
    		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
    	});
    	defineLazyInternal(inst, "values", (zod) => {
    		return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
    	});
    	inst._zod.parse = (payload, ctx) => {
    		if (payload.value === null) return payload;
    		return def.innerType._zod.run(payload, ctx);
    	};
    });
    const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.optin = "defaulted";
    	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
    		if (payload.value === void 0) {
    			payload.value = def.defaultValue;
    			/**
    			* $ZodDefault returns the default value immediately in forward direction.
    			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
    			return payload;
    		}
    		const result = def.innerType._zod.run(payload, ctx);
    		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
    		return handleDefaultResult(result, def);
    	};
    });
    function handleDefaultResult(payload, def) {
    	if (payload.value === void 0) payload.value = def.defaultValue;
    	return payload;
    }
    const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
    	$ZodType.init(inst, def);
    	inst._zod.optin = "defaulted";
    	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
    		if (payload.value === void 0) payload.value = def.defaultValue;
    		return def.innerType._zod.run(payload, ctx);
    	};
    });
    const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "values", (zod) => {
    		const v = zod.def.innerType._zod.values;
    		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
    	});
    	inst._zod.parse = (payload, ctx) => {
    		const result = def.innerType._zod.run(payload, ctx);
    		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
    		return handleNonOptionalResult(result, inst);
    	};
    });
    function handleNonOptionalResult(payload, inst) {
    	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
    		code: "invalid_type",
    		expected: "nonoptional",
    		input: payload.value,
    		inst
    	});
    	return payload;
    }
    function handleCatchResult(payload, result, def, ctx) {
    	if (!result.issues.length) {
    		payload.value = result.value;
    		if (result.memo) payload.memo = true;
    		return payload;
    	}
    	payload.value = def.catchValue({
    		...result,
    		value: payload.value,
    		error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
    		input: payload.value
    	});
    	return payload;
    }
    const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
    	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
    	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
    		const result = def.innerType._zod.run({
    			value: payload.value,
    			issues: []
    		}, ctx);
    		if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
    		return handleCatchResult(payload, result, def, ctx);
    	};
    });
    const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
    	defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
    	defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") {
    			const right = def.out._zod.run(payload, ctx);
    			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
    			return handlePipeResult(right, def.in, ctx);
    		}
    		const left = def.in._zod.run(payload, ctx);
    		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
    		return handlePipeResult(left, def.out, ctx);
    	};
    });
    function handlePipeResult(left, next, ctx) {
    	if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
    		left.aborted = true;
    		return left;
    	}
    	return next._zod.run({
    		value: left.value,
    		issues: left.issues
    	}, ctx);
    }
    const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
    	$ZodType.init(inst, def);
    	defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
    	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
    	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
    	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
    	inst._zod.parse = (payload, ctx) => {
    		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
    		const result = def.innerType._zod.run(payload, ctx);
    		if (result instanceof Promise) return result.then(handleReadonlyResult);
    		return handleReadonlyResult(result);
    	};
    });
    function handleReadonlyResult(payload) {
    	if (!payload.memo) payload.value = Object.freeze(payload.value);
    	return payload;
    }
    const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
    	$ZodCheck.init(inst, def);
    	$ZodType.init(inst, def);
    	inst._zod.parse = (payload, _) => {
    		return payload;
    	};
    	inst._zod.check = (payload) => {
    		const input = payload.value;
    		const r = def.fn(input);
    		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
    		handleRefineResult(r, payload, input, inst);
    	};
    });
    function handleRefineResult(result, payload, input, inst) {
    	if (!result) {
    		const _iss = {
    			code: "custom",
    			input,
    			inst,
    			path: [...inst._zod.def.path ?? []],
    			continue: !inst._zod.def.abort
    		};
    		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
    		payload.issues.push(issue(_iss));
    	}
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
    var $ZodCyclicError = class extends Error {
    	constructor() {
    		super(`Cannot parse a reference cycle that closes through a transform`);
    		this.name = "ZodCyclicError";
    	}
    };
    /** Keyed off the context object every schema in one parse call already shares. */
    const STATE = "~memo";
    const NO_ISSUES = [];
    function isRef(value) {
    	return value !== null && typeof value === "object";
    }
    function cloneIssues(issues) {
    	return issues.map((iss) => iss.path ? {
    		...iss,
    		path: iss.path.slice()
    	} : { ...iss });
    }
    const recursive = /*@__PURE__*/ new WeakMap();
    /** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
    const NONE = 0;
    const ASSUMED = 1;
    const PROVEN = 2;
    /** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
    function isRecursive(inst, stack, resolve) {
    	const cached = recursive.get(inst);
    	if (cached !== void 0) return cached ? PROVEN : NONE;
    	if (stack.has(inst)) return PROVEN;
    	stack.add(inst);
    	let result = NONE;
    	const check = (child) => {
    		if (result !== PROVEN && child?._zod) {
    			const answer = isRecursive(child, stack, resolve);
    			if (answer > result) result = answer;
    		}
    	};
    	const shape = (sh, spread) => {
    		let answer = NONE;
    		for (const key of Reflect.ownKeys(sh)) {
    			const desc = Object.getOwnPropertyDescriptor(sh, key);
    			if (spread && !desc.enumerable) continue;
    			const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
    			if (child > answer) answer = child;
    		}
    		return answer;
    	};
    	const merge = (answer) => {
    		if (answer > result) result = answer;
    	};
    	const def = inst._zod.def;
    	switch (def.type) {
    		case "object": {
    			const raw = rawShape(def);
    			merge(raw ? shape(raw, true) : ASSUMED);
    			check(def.catchall);
    			break;
    		}
    		case "array":
    			check(def.element);
    			break;
    		case "tuple":
    			for (const el of def.items) check(el);
    			check(def.rest);
    			break;
    		case "record":
    		case "map":
    			check(def.keyType);
    			check(def.valueType);
    			break;
    		case "set":
    			check(def.valueType);
    			break;
    		case "union":
    			for (const el of def.options) check(el);
    			break;
    		case "intersection":
    			check(def.left);
    			check(def.right);
    			break;
    		case "optional":
    		case "nullable":
    		case "default":
    		case "prefault":
    		case "catch":
    		case "readonly":
    		case "nonoptional":
    		case "promise":
    		case "success":
    			check(def.innerType);
    			break;
    		case "pipe":
    			check(def.in);
    			check(def.out);
    			break;
    		case "function":
    			check(def.input);
    			check(def.output);
    			break;
    		case "lazy": {
    			const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
    			merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
    			break;
    		}
    		case "template_literal":
    		case "string":
    		case "number":
    		case "int":
    		case "boolean":
    		case "bigint":
    		case "symbol":
    		case "undefined":
    		case "null":
    		case "void":
    		case "never":
    		case "any":
    		case "unknown":
    		case "date":
    		case "nan":
    		case "enum":
    		case "literal":
    		case "file":
    		case "transform":
    		case "custom": break;
    		default: for (const key in def) {
    			const desc = Object.getOwnPropertyDescriptor(def, key);
    			if (!desc || desc.get) continue;
    			const value = desc.value;
    			if (!value || typeof value !== "object") continue;
    			if (value._zod) check(value);
    			else if (Array.isArray(value)) for (const el of value) check(el);
    		}
    	}
    	stack.delete(inst);
    	return settle(inst, result);
    }
    /** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
    function settle(inst, answer) {
    	if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
    	return answer;
    }
    function bucketFor(state, inst) {
    	let bucket = state.buckets.get(inst);
    	if (!bucket) {
    		bucket = /* @__PURE__ */ new WeakMap();
    		state.buckets.set(inst, bucket);
    	}
    	return bucket;
    }
    let handoff;
    const open = [];
    const memo = {
    	alloc(_inst, payload, empty) {
    		const bucket = handoff;
    		if (!bucket) return empty;
    		handoff = void 0;
    		const entry = {
    			value: empty,
    			issues: null
    		};
    		bucket.set(payload.value, entry);
    		open.push(entry);
    		return empty;
    	},
    	guard(inst) {
    		var _a;
    		(_a = inst._zod).deferred ?? (_a.deferred = []);
    		inst._zod.deferred.push(() => {
    			const base = inst._zod.parse;
    			const wrapped = (payload, ctx) => {
    				if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
    				return base(payload, ctx);
    			};
    			inst._zod.parse = wrapped;
    			if (inst._zod.run === base) inst._zod.run = wrapped;
    		});
    	},
    	attach(inst) {
    		var _a;
    		let isRecursiveInst;
    		let rechecked = false;
    		let lastCtx;
    		let lastBucket;
    		(_a = inst._zod).deferred ?? (_a.deferred = []);
    		inst._zod.deferred.push(() => {
    			const base = inst._zod.parse;
    			const wrapped = (payload, ctx) => {
    				if (isRecursiveInst === void 0) {
    					const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
    					if (walked === NONE) {
    						inst._zod.parse = base;
    						if (inst._zod.run === wrapped) inst._zod.run = base;
    						return base(payload, ctx);
    					}
    					if (walked === PROVEN || rechecked) isRecursiveInst = true;
    					else rechecked = true;
    				}
    				const input = payload.value;
    				if (!isRef(input)) return base(payload, ctx);
    				let state = ctx[STATE];
    				if (!state) {
    					state = {
    						buckets: /* @__PURE__ */ new WeakMap(),
    						backEdges: void 0
    					};
    					ctx[STATE] = state;
    				}
    				let bucket;
    				if (lastCtx === ctx) bucket = lastBucket;
    				else {
    					bucket = bucketFor(state, inst);
    					lastCtx = ctx;
    					lastBucket = bucket;
    				}
    				const hit = bucket.get(input);
    				if (hit) {
    					payload.value = hit.value;
    					if (hit.issues) {
    						if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
    					} else {
    						payload.memo = true;
    						state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
    						state.backEdges.add(hit.value);
    					}
    					return payload;
    				}
    				handoff = bucket;
    				const depth = open.length;
    				const result = base(payload, ctx);
    				handoff = void 0;
    				const entry = open.length > depth ? open.pop() : void 0;
    				if (result instanceof Promise) return result.then((r) => {
    					if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
    					return r;
    				});
    				if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
    				return result;
    			};
    			inst._zod.parse = wrapped;
    			if (inst._zod.run === base) inst._zod.run = wrapped;
    		});
    	}
    };
    /** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
    function memoizer() {
    	return memo;
    }
    /** Whether this value is a node a back-edge resolved to before it finished. */
    function isBackEdge(ctx, value) {
    	const backEdges = ctx[STATE]?.backEdges;
    	return backEdges !== void 0 && isRef(value) && backEdges.has(value);
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
    const error = () => {
    	const Sizable = {
    		string: {
    			unit: "characters",
    			verb: "to have"
    		},
    		file: {
    			unit: "bytes",
    			verb: "to have"
    		},
    		array: {
    			unit: "items",
    			verb: "to have"
    		},
    		set: {
    			unit: "items",
    			verb: "to have"
    		},
    		map: {
    			unit: "entries",
    			verb: "to have"
    		}
    	};
    	function getSizing(origin) {
    		return Sizable[origin] ?? null;
    	}
    	const FormatDictionary = {
    		regex: "input",
    		email: "email address",
    		url: "URL",
    		emoji: "emoji",
    		uuid: "UUID",
    		uuidv4: "UUIDv4",
    		uuidv6: "UUIDv6",
    		nanoid: "nanoid",
    		guid: "GUID",
    		cuid: "cuid",
    		cuid2: "cuid2",
    		ulid: "ULID",
    		xid: "XID",
    		ksuid: "KSUID",
    		datetime: "ISO datetime",
    		date: "ISO date",
    		time: "ISO time",
    		duration: "ISO duration",
    		ipv4: "IPv4 address",
    		ipv6: "IPv6 address",
    		mac: "MAC address",
    		cidrv4: "IPv4 range",
    		cidrv6: "IPv6 range",
    		base64: "base64-encoded string",
    		base64url: "base64url-encoded string",
    		json_string: "JSON string",
    		e164: "E.164 number",
    		currency_code: "currency code",
    		credit_card: "credit card number",
    		iban: "IBAN",
    		jwt: "JWT",
    		template_literal: "input"
    	};
    	const TypeDictionary = { nan: "NaN" };
    	function getTypeName(type, input) {
    		if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
    		return TypeDictionary[type] ?? type;
    	}
    	return (issue) => {
    		switch (issue.code) {
    			case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
    			case "invalid_value":
    				if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
    				return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
    			case "too_big": {
    				const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
    				const sizing = getSizing(issue.origin);
    				if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
    				return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
    			}
    			case "too_small": {
    				const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
    				const sizing = getSizing(issue.origin);
    				if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
    				return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
    			}
    			case "invalid_format": {
    				const _issue = issue;
    				if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
    				if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
    				if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
    				if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
    				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
    			}
    			case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
    			case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
    			case "invalid_key": return `Invalid key in ${issue.origin}`;
    			case "invalid_union":
    				if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
    				if (issue.inclusive === false) return "Invalid input: more than one option matched";
    				return "Invalid input";
    			case "invalid_element": return `Invalid value in ${issue.origin}`;
    			default: return `Invalid input`;
    		}
    	};
    };
    function en_default() {
    	return { localeError: error() };
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
    var _a;
    var $ZodRegistry = class {
    	constructor() {
    		this._map = /* @__PURE__ */ new WeakMap();
    		this._idmap = /* @__PURE__ */ new Map();
    	}
    	add(schema, ..._meta) {
    		const meta = _meta[0];
    		this._map.set(schema, meta);
    		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
    		return this;
    	}
    	clear() {
    		this._map = /* @__PURE__ */ new WeakMap();
    		this._idmap = /* @__PURE__ */ new Map();
    		return this;
    	}
    	remove(schema) {
    		const meta = this._map.get(schema);
    		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
    		this._map.delete(schema);
    		return this;
    	}
    	get(schema) {
    		const p = schema._zod.parent;
    		if (p) {
    			const pm = { ...this.get(p) ?? {} };
    			delete pm.id;
    			const f = {
    				...pm,
    				...this._map.get(schema)
    			};
    			return Object.keys(f).length ? f : void 0;
    		}
    		return this._map.get(schema);
    	}
    	has(schema) {
    		return this._map.has(schema);
    	}
    };
    function registry() {
    	return new $ZodRegistry();
    }
    (_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
    const globalRegistry = globalThis.__zod_globalRegistry;
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
    function snapshotChecks(def) {
    	if (def.checks) def.checks = [...def.checks];
    	return def;
    }
    // @__NO_SIDE_EFFECTS__
    function _string(Class, params) {
    	return new Class(snapshotChecks({
    		type: "string",
    		...normalizeParams(params)
    	}));
    }
    // @__NO_SIDE_EFFECTS__
    function _email(Class, params) {
    	return new Class({
    		type: "string",
    		format: "email",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _guid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "guid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _uuid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "uuid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _uuidv4(Class, params) {
    	return new Class({
    		type: "string",
    		format: "uuid",
    		check: "string_format",
    		abort: false,
    		version: "v4",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _uuidv6(Class, params) {
    	return new Class({
    		type: "string",
    		format: "uuid",
    		check: "string_format",
    		abort: false,
    		version: "v6",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _uuidv7(Class, params) {
    	return new Class({
    		type: "string",
    		format: "uuid",
    		check: "string_format",
    		abort: false,
    		version: "v7",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _url(Class, params) {
    	return new Class({
    		type: "string",
    		format: "url",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _emoji(Class, params) {
    	return new Class({
    		type: "string",
    		format: "emoji",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _nanoid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "nanoid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    /**
    * @deprecated CUID v1 is deprecated by its authors due to information leakage
    * (timestamps embedded in the id). Use {@link _cuid2} instead.
    * See https://github.com/paralleldrive/cuid.
    */
    // @__NO_SIDE_EFFECTS__
    function _cuid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "cuid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _cuid2(Class, params) {
    	return new Class({
    		type: "string",
    		format: "cuid2",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _ulid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "ulid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _xid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "xid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _ksuid(Class, params) {
    	return new Class({
    		type: "string",
    		format: "ksuid",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _ipv4(Class, params) {
    	return new Class({
    		type: "string",
    		format: "ipv4",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _ipv6(Class, params) {
    	return new Class({
    		type: "string",
    		format: "ipv6",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _cidrv4(Class, params) {
    	return new Class({
    		type: "string",
    		format: "cidrv4",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _cidrv6(Class, params) {
    	return new Class({
    		type: "string",
    		format: "cidrv6",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _base64(Class, params) {
    	return new Class({
    		type: "string",
    		format: "base64",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _base64url(Class, params) {
    	return new Class({
    		type: "string",
    		format: "base64url",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _e164(Class, params) {
    	return new Class({
    		type: "string",
    		format: "e164",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _jwt(Class, params) {
    	return new Class({
    		type: "string",
    		format: "jwt",
    		check: "string_format",
    		abort: false,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _isoDateTime(Class, params) {
    	return new Class({
    		type: "string",
    		format: "datetime",
    		check: "string_format",
    		offset: false,
    		local: false,
    		precision: null,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _isoDate(Class, params) {
    	return new Class({
    		type: "string",
    		format: "date",
    		check: "string_format",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _isoTime(Class, params) {
    	return new Class({
    		type: "string",
    		format: "time",
    		check: "string_format",
    		precision: null,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _isoDuration(Class, params) {
    	return new Class({
    		type: "string",
    		format: "duration",
    		check: "string_format",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _number(Class, params) {
    	return new Class(snapshotChecks({
    		type: "number",
    		checks: [],
    		...normalizeParams(params)
    	}));
    }
    // @__NO_SIDE_EFFECTS__
    function _int(Class, params) {
    	return new Class({
    		type: "number",
    		check: "number_format",
    		abort: false,
    		format: "safeint",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _boolean(Class, params) {
    	return new Class({
    		type: "boolean",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _unknown(Class) {
    	return new Class({ type: "unknown" });
    }
    // @__NO_SIDE_EFFECTS__
    function _never(Class, params) {
    	return new Class({
    		type: "never",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _void$1(Class, params) {
    	return new Class({
    		type: "void",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _lt(value, params) {
    	return new $ZodCheckLessThan({
    		check: "less_than",
    		...normalizeParams(params),
    		value,
    		inclusive: false
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _lte(value, params) {
    	return new $ZodCheckLessThan({
    		check: "less_than",
    		...normalizeParams(params),
    		value,
    		inclusive: true
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _gt(value, params) {
    	return new $ZodCheckGreaterThan({
    		check: "greater_than",
    		...normalizeParams(params),
    		value,
    		inclusive: false
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _gte(value, params) {
    	return new $ZodCheckGreaterThan({
    		check: "greater_than",
    		...normalizeParams(params),
    		value,
    		inclusive: true
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _multipleOf(value, params) {
    	return new $ZodCheckMultipleOf({
    		check: "multiple_of",
    		...normalizeParams(params),
    		value
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _maxLength(maximum, params) {
    	return new $ZodCheckMaxLength({
    		check: "max_length",
    		...normalizeParams(params),
    		maximum
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _minLength(minimum, params) {
    	return new $ZodCheckMinLength({
    		check: "min_length",
    		...normalizeParams(params),
    		minimum
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _length(length, params) {
    	return new $ZodCheckLengthEquals({
    		check: "length_equals",
    		...normalizeParams(params),
    		length
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _regex(pattern, params) {
    	return new $ZodCheckRegex({
    		check: "string_format",
    		format: "regex",
    		...normalizeParams(params),
    		pattern
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _lowercase(params) {
    	return new $ZodCheckLowerCase({
    		check: "string_format",
    		format: "lowercase",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _uppercase(params) {
    	return new $ZodCheckUpperCase({
    		check: "string_format",
    		format: "uppercase",
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _includes(includes, params) {
    	return new $ZodCheckIncludes({
    		check: "string_format",
    		format: "includes",
    		...normalizeParams(params),
    		includes
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _startsWith(prefix, params) {
    	return new $ZodCheckStartsWith({
    		check: "string_format",
    		format: "starts_with",
    		...normalizeParams(params),
    		prefix
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _endsWith(suffix, params) {
    	return new $ZodCheckEndsWith({
    		check: "string_format",
    		format: "ends_with",
    		...normalizeParams(params),
    		suffix
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _overwrite(tx) {
    	return new $ZodCheckOverwrite({
    		check: "overwrite",
    		tx
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _normalize(form) {
    	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
    }
    // @__NO_SIDE_EFFECTS__
    function _trim() {
    	return /* @__PURE__ */ _overwrite((input) => input.trim());
    }
    // @__NO_SIDE_EFFECTS__
    function _toLowerCase() {
    	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
    }
    // @__NO_SIDE_EFFECTS__
    function _toUpperCase() {
    	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
    }
    // @__NO_SIDE_EFFECTS__
    function _slugify() {
    	return /* @__PURE__ */ _overwrite((input) => slugify(input));
    }
    // @__NO_SIDE_EFFECTS__
    function _array(Class, element, params) {
    	return new Class({
    		type: "array",
    		element,
    		...normalizeParams(params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _refine(Class, fn, _params) {
    	return new Class({
    		type: "custom",
    		check: "custom",
    		fn,
    		...normalizeParams(_params)
    	});
    }
    // @__NO_SIDE_EFFECTS__
    function _superRefine(fn, params) {
    	const ch = /* @__PURE__ */ _check((payload) => {
    		payload.addIssue = (issue$2) => {
    			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
    			else {
    				const _issue = issue$2;
    				if (_issue.fatal) _issue.continue = false;
    				_issue.code ?? (_issue.code = "custom");
    				if (!("input" in _issue)) _issue.input = payload.value;
    				_issue.inst ?? (_issue.inst = ch);
    				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
    				payload.issues.push(issue(_issue));
    			}
    		};
    		return fn(payload.value, payload);
    	}, params);
    	return ch;
    }
    // @__NO_SIDE_EFFECTS__
    function _check(fn, params) {
    	const ch = new $ZodCheck({
    		check: "custom",
    		...normalizeParams(params)
    	});
    	ch._zod.check = fn;
    	return ch;
    }
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
    function assignProps(target, ...sources) {
    	for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
    	return target;
    }
    function initializeContext(params) {
    	let target = params?.target ?? "draft-2020-12";
    	if (target === "draft-4") target = "draft-04";
    	if (target === "draft-7") target = "draft-07";
    	return {
    		processors: params.processors ?? {},
    		metadataRegistry: params?.metadata ?? globalRegistry,
    		target,
    		unrepresentable: params?.unrepresentable ?? "throw",
    		override: params?.override ?? (() => {}),
    		io: params?.io ?? "output",
    		counter: 0,
    		seen: /* @__PURE__ */ new Map(),
    		sharedDefsExtractedFor: void 0,
    		sharedEmitDoneFor: void 0,
    		cycles: params?.cycles ?? "ref",
    		reused: params?.reused ?? "inline",
    		intersections: [],
    		deferred: [],
    		external: params?.external ?? void 0
    	};
    }
    /**
    * Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
    * `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
    * custom JSON Schema was written into `json`, in which case the caller must not write its own.
    */
    function handleUnrepresentable(schema, ctx, json, params, message) {
    	const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
    		zodSchema: schema,
    		path: params.path,
    		message
    	}) : ctx.unrepresentable;
    	if (result === "any") return false;
    	if (result === void 0 || result === "throw") throw new Error(message);
    	Object.assign(json, result);
    	return true;
    }
    function processSchema(schema, ctx, _params = {
    	path: [],
    	schemaPath: []
    }) {
    	var _a;
    	const def = schema._zod.def;
    	const seen = ctx.seen.get(schema);
    	if (seen) {
    		seen.count++;
    		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
    		return seen.schema;
    	}
    	const result = {
    		schema: {},
    		count: 1,
    		cycle: void 0,
    		path: _params.path
    	};
    	ctx.seen.set(schema, result);
    	ctx.sharedDefsExtractedFor = void 0;
    	ctx.sharedEmitDoneFor = void 0;
    	const overrideSchema = schema._zod.toJSONSchema?.();
    	if (overrideSchema) result.schema = overrideSchema;
    	else {
    		const params = {
    			..._params,
    			schemaPath: [..._params.schemaPath, schema],
    			path: _params.path
    		};
    		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
    		else {
    			const _json = result.schema;
    			const processor = ctx.processors[def.type];
    			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
    			processor(schema, ctx, _json, params);
    		}
    		const parent = schema._zod.parent;
    		if (parent) {
    			if (!result.ref) result.ref = parent;
    			processSchema(parent, ctx, params);
    			ctx.seen.get(parent).isParent = true;
    		}
    	}
    	const meta = ctx.metadataRegistry.get(schema);
    	if (meta) assignProps(result.schema, meta);
    	if (ctx.io === "input" && isTransforming(schema)) {
    		delete result.schema.examples;
    		delete result.schema.default;
    	}
    	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
    	delete result.schema._prefault;
    	return ctx.seen.get(schema).schema;
    }
    function encodeJSONPointerSegment(segment) {
    	return segment.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    function extractDefs(ctx, schema) {
    	const root = ctx.seen.get(schema);
    	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
    	if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
    	const idToSchema = /* @__PURE__ */ new Map();
    	for (const entry of ctx.seen.entries()) {
    		const id = ctx.metadataRegistry.get(entry[0])?.id;
    		if (id) {
    			const existing = idToSchema.get(id);
    			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
    			idToSchema.set(id, entry[0]);
    		}
    	}
    	const makeURI = (entry) => {
    		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    		if (ctx.external) {
    			const externalId = ctx.external.registry.get(entry[0])?.id;
    			const uriGenerator = ctx.external.uri ?? ((id) => id);
    			if (externalId) return { ref: uriGenerator(externalId) };
    			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
    			entry[1].defId = id;
    			return {
    				defId: id,
    				ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
    			};
    		}
    		const uriPrefix = `#`;
    		const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    		if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
    		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    		return {
    			defId,
    			ref: defUriPrefix + encodeJSONPointerSegment(defId)
    		};
    	};
    	const extractToDef = (entry) => {
    		if (entry[1].schema.$ref) return;
    		const seen = entry[1];
    		const { ref, defId } = makeURI(entry);
    		seen.def = { ...seen.schema };
    		if (defId) seen.defId = defId;
    		const schema = seen.schema;
    		for (const key in schema) delete schema[key];
    		schema.$ref = ref;
    	};
    	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
    		const seen = entry[1];
    		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>
    
    Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    	}
    	for (const entry of ctx.seen.entries()) {
    		const seen = entry[1];
    		if (schema === entry[0]) {
    			extractToDef(entry);
    			continue;
    		}
    		if (ctx.external) {
    			const ext = ctx.external.registry.get(entry[0])?.id;
    			if (schema !== entry[0] && ext) {
    				extractToDef(entry);
    				continue;
    			}
    		}
    		if (ctx.metadataRegistry.get(entry[0])?.id) {
    			extractToDef(entry);
    			continue;
    		}
    		if (seen.cycle) {
    			extractToDef(entry);
    			continue;
    		}
    		if (seen.count > 1) {
    			if (ctx.reused === "ref") extractToDef(entry);
    		}
    	}
    	if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
    }
    /** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
    function compactTypeUnion(schema) {
    	const options = schema.anyOf;
    	if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
    	const types = [];
    	for (const option of options) {
    		if (!option || typeof option !== "object") return;
    		compactTypeUnion(option);
    		const keys = Object.keys(option);
    		if (keys.length !== 1 || keys[0] !== "type") return;
    		const type = option.type;
    		for (const member of Array.isArray(type) ? type : [type]) {
    			if (typeof member !== "string") return;
    			if (!types.includes(member)) types.push(member);
    		}
    	}
    	delete schema.anyOf;
    	schema.type = types.length === 1 ? types[0] : types;
    }
    /** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
    * an annotation like `description` — makes a member unfoldable, so a constraint this does not
    * understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
    const FOLDABLE_KEYS = /* @__PURE__ */ new Set([
    	"type",
    	"properties",
    	"required",
    	"additionalProperties"
    ]);
    const UNION_KEYS = ["oneOf", "anyOf"];
    /** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
    function undeclaredConstraint(member) {
    	const extra = member.additionalProperties;
    	if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
    	return Object.keys(extra).length ? extra : null;
    }
    /** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
    function foldObjects(members) {
    	const objects = [];
    	for (const member of members) {
    		if (typeof member !== "object" || member.type !== "object") return null;
    		for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
    		objects.push(member);
    	}
    	const properties = {};
    	const required = /* @__PURE__ */ new Set();
    	for (const object of objects) {
    		for (const key in object.properties) {
    			if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
    			const parts = [];
    			for (const other of objects) {
    				const part = other.properties?.[key] ?? undeclaredConstraint(other);
    				if (part === null || part === void 0) continue;
    				if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
    			}
    			assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
    		}
    		for (const key of object.required ?? []) required.add(key);
    	}
    	const folded = {
    		type: "object",
    		properties
    	};
    	if (required.size) folded.required = [...required];
    	if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
    	else {
    		const constraints = [];
    		for (const object of objects) {
    			const constraint = undeclaredConstraint(object);
    			if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
    		}
    		if (constraints.length === 1) folded.additionalProperties = constraints[0];
    		else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
    	}
    	return folded;
    }
    /** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
    * closed object members reject each other's keys and the schema validates nothing. Zod's parser
    * pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
    * *every* side rejects it — so the emitted schema has to pool them too, and folding the members
    * into one object is the encoding that says so on every target.
    *
    * This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
    * machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
    * keeps its reference and its own closedness rather than being inlined as a stale copy. */
    function foldIntersection(json) {
    	const allOf = json.allOf;
    	if (!Array.isArray(allOf) || allOf.length < 2) return;
    	for (const key of FOLDABLE_KEYS) if (key in json) return;
    	const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
    	let folded = null;
    	if (!unions.length) folded = foldObjects(allOf);
    	else {
    		const union = unions[0];
    		const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
    		if (Object.keys(union).length !== 1) return;
    		const rest = allOf.filter((m) => m !== union);
    		const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
    		if (branches.some((b) => !b)) return;
    		folded = { [keyword]: branches };
    	}
    	if (!folded) return;
    	delete json.allOf;
    	assignProps(json, folded);
    }
    function finalize(ctx, schema) {
    	const root = ctx.seen.get(schema);
    	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
    	const flattenRef = (zodSchema) => {
    		const seen = ctx.seen.get(zodSchema);
    		if (seen.ref === null) return;
    		const schema = seen.def ?? seen.schema;
    		const _cached = { ...schema };
    		const ref = seen.ref;
    		seen.ref = null;
    		if (ref) {
    			flattenRef(ref);
    			const refSeen = ctx.seen.get(ref);
    			const refSchema = refSeen.schema;
    			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
    				schema.allOf = schema.allOf ?? [];
    				schema.allOf.push(refSchema);
    			} else assignProps(schema, refSchema);
    			assignProps(schema, _cached);
    			if (zodSchema._zod.parent === ref) for (const key in schema) {
    				if (key === "$ref" || key === "allOf") continue;
    				if (!(key in _cached)) delete schema[key];
    			}
    			if (refSchema.$ref && refSeen.def) for (const key in schema) {
    				if (key === "$ref" || key === "allOf") continue;
    				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
    			}
    		}
    		const parent = zodSchema._zod.parent;
    		if (parent && parent !== ref) {
    			flattenRef(parent);
    			const parentSeen = ctx.seen.get(parent);
    			if (parentSeen?.schema.$ref) {
    				schema.$ref = parentSeen.schema.$ref;
    				if (parentSeen.def) for (const key in schema) {
    					if (key === "$ref" || key === "allOf") continue;
    					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
    				}
    			}
    		}
    		ctx.override({
    			zodSchema,
    			jsonSchema: schema,
    			path: seen.path ?? []
    		});
    	};
    	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    		for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
    		if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
    		for (const rewrite of ctx.deferred) rewrite();
    		if (ctx.intersections.length) {
    			const carriers = /* @__PURE__ */ new Map();
    			for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
    				const allOf = json?.allOf;
    				if (!Array.isArray(allOf)) continue;
    				const existing = carriers.get(allOf);
    				if (existing) existing.push(json);
    				else carriers.set(allOf, [json]);
    			}
    			for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
    		}
    	}
    	const result = {};
    	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
    	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
    	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
    	else if (ctx.target === "openapi-3.0") {}
    	if (ctx.external?.uri) {
    		const id = ctx.external.registry.get(schema)?.id;
    		if (!id) throw new Error("Schema is missing an `id` property");
    		result.$id = ctx.external.uri(id);
    	}
    	assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
    	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
    	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
    	const defs = ctx.external?.defs ?? {};
    	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
    		const seen = entry[1];
    		if (seen.def && seen.defId) {
    			if (seen.def.id === seen.defId) delete seen.def.id;
    			assignProp(defs, seen.defId, seen.def);
    		}
    	}
    	if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
    	if (ctx.external) {} else if (Object.keys(defs).length > 0) {
    		if (ctx.target === "draft-2020-12") result.$defs = defs;
    		else result.definitions = defs;
    	}
    	try {
    		const finalized = JSON.parse(JSON.stringify(result));
    		Object.defineProperty(finalized, "~standard", {
    			value: {
    				...schema["~standard"],
    				jsonSchema: {
    					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
    					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
    				}
    			},
    			enumerable: false,
    			writable: false
    		});
    		return finalized;
    	} catch (_err) {
    		throw new Error("Error converting schema to JSON.");
    	}
    }
    function isTransforming(_schema, _ctx) {
    	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
    	if (ctx.seen.has(_schema)) return false;
    	ctx.seen.add(_schema);
    	const def = _schema._zod.def;
    	if (def.type === "transform") return true;
    	if (def.type === "array") return isTransforming(def.element, ctx);
    	if (def.type === "set") return isTransforming(def.valueType, ctx);
    	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
    	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
    	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    	if (def.type === "pipe") {
    		if (_schema._zod.traits.has("$ZodCodec")) return true;
    		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    	}
    	if (def.type === "object") {
    		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
    		return false;
    	}
    	if (def.type === "union") {
    		for (const option of def.options) if (isTransforming(option, ctx)) return true;
    		return false;
    	}
    	if (def.type === "tuple") {
    		for (const item of def.items) if (isTransforming(item, ctx)) return true;
    		if (def.rest && isTransforming(def.rest, ctx)) return true;
    		return false;
    	}
    	return false;
    }
    /**
    * Creates a toJSONSchema method for a schema instance.
    * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
    */
    const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
    	const ctx = initializeContext({
    		...params,
    		processors
    	});
    	processSchema(schema, ctx);
    	extractDefs(ctx, schema);
    	return finalize(ctx, schema);
    };
    const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
    	const { libraryOptions, target } = params ?? {};
    	const ctx = initializeContext({
    		...libraryOptions ?? {},
    		target,
    		io,
    		processors
    	});
    	processSchema(schema, ctx);
    	extractDefs(ctx, schema);
    	return finalize(ctx, schema);
    };
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
    const narrowMin = (agg, key, value) => {
    	if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
    };
    const narrowMax = (agg, key, value) => {
    	if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
    };
    const narrowBoth = (agg, value) => {
    	narrowMin(agg, "minimum", value);
    	narrowMax(agg, "maximum", value);
    };
    const addDivisor = (agg, value) => {
    	agg.multipleOf ?? (agg.multipleOf = []);
    	if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
    };
    const addPattern = (agg, pattern) => {
    	agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
    	agg.patterns.add(pattern);
    };
    const intersectMime = (agg, mime) => {
    	agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
    };
    const setFormat = (agg, format) => {
    	agg.format = format;
    	if (format.includes("int")) agg.isInt = true;
    };
    const minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
    const maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
    const formatContributor = (ranges) => (agg, def) => {
    	setFormat(agg, def.format);
    	const [minimum, maximum] = ranges[def.format];
    	narrowMin(agg, "minimum", minimum);
    	narrowMax(agg, "maximum", maximum);
    };
    const contributors = {
    	greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
    	less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
    	multiple_of: (agg, def) => addDivisor(agg, def.value),
    	number_format: formatContributor(NUMBER_FORMAT_RANGES),
    	bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
    	min_length: minContributor,
    	max_length: maxContributor,
    	length_equals: (agg, def) => narrowBoth(agg, def.length),
    	min_size: minContributor,
    	max_size: maxContributor,
    	size_equals: (agg, def) => narrowBoth(agg, def.size),
    	string_format: (agg, def) => {
    		setFormat(agg, def.format);
    		if (def.pattern) addPattern(agg, def.pattern);
    		if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
    		if (def.local || def.precision === -1) agg.laxFormat = true;
    	},
    	mime_type: (agg, def) => intersectMime(agg, def.mime)
    };
    function aggregateChecks(schema) {
    	const agg = {};
    	const def = schema._zod.def;
    	const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
    	for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
    	const bag = schema._zod.bag;
    	if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
    	if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
    	if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
    	if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
    	if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
    	if (bag.format !== void 0) {
    		agg.format ?? (agg.format = bag.format);
    		if (bag.format.includes("int")) agg.isInt = true;
    	}
    	if (bag.mime) intersectMime(agg, bag.mime);
    	for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
    	return agg;
    }
    const formatMap = {
    	guid: "uuid",
    	url: "uri",
    	datetime: "date-time",
    	json_string: "json-string",
    	regex: ""
    };
    const exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
    const exactPattern = (p) => exactPatterns.get(p) ?? p;
    const stringProcessor = (schema, ctx, _json, _params) => {
    	const json = _json;
    	json.type = "string";
    	const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
    	if (typeof minimum === "number") json.minLength = minimum;
    	if (typeof maximum === "number") json.maxLength = maximum;
    	if (format) {
    		json.format = formatMap[format] ?? format;
    		if (json.format === "") delete json.format;
    		if (format === "time" || laxFormat) delete json.format;
    	}
    	if (contentEncoding) json.contentEncoding = contentEncoding;
    	if (patterns && patterns.size > 0) {
    		const patternList = [...patterns].map(exactPattern);
    		if (patternList.length === 1) json.pattern = patternList[0].source;
    		else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
    			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
    			pattern: regex.source
    		}))];
    	}
    };
    const numberProcessor = (schema, ctx, _json, params) => {
    	const json = _json;
    	const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
    	json.type = isInt ? "integer" : "number";
    	const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
    	const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
    	const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
    	if (exMin) {
    		if (legacy) {
    			json.minimum = exclusiveMinimum;
    			json.exclusiveMinimum = true;
    		} else json.exclusiveMinimum = exclusiveMinimum;
    	} else if (typeof minimum === "number") json.minimum = minimum;
    	if (exMax) {
    		if (legacy) {
    			json.maximum = exclusiveMaximum;
    			json.exclusiveMaximum = true;
    		} else json.exclusiveMaximum = exclusiveMaximum;
    	} else if (typeof maximum === "number") json.maximum = maximum;
    	if (multipleOf) {
    		const divisors = /* @__PURE__ */ new Set();
    		for (const divisor of multipleOf) if (Number.isFinite(divisor) && divisor !== 0) divisors.add(Math.abs(divisor));
    		else handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
    		const [first, ...rest] = divisors;
    		if (first !== void 0) json.multipleOf = first;
    		if (rest.length) json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
    	}
    };
    const booleanProcessor = (_schema, _ctx, json, _params) => {
    	json.type = "boolean";
    };
    const voidProcessor = (schema, ctx, json, params) => {
    	handleUnrepresentable(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
    };
    const neverProcessor = (_schema, _ctx, json, _params) => {
    	json.not = {};
    };
    const enumProcessor = (schema, _ctx, json, _params) => {
    	const def = schema._zod.def;
    	const values = getEnumValues(def.entries);
    	if (values.length === 0) {
    		json.not = {};
    		return;
    	}
    	if (values.every((v) => typeof v === "number")) json.type = "number";
    	if (values.every((v) => typeof v === "string")) json.type = "string";
    	json.enum = values;
    };
    const literalProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	if (def.values.length === 0) {
    		json.not = {};
    		return;
    	}
    	const vals = [];
    	for (const val of def.values) if (val === void 0) {
    		if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema")) return;
    	} else if (typeof val === "bigint") {
    		if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema")) return;
    		vals.push(Number(val));
    	} else vals.push(val);
    	if (vals.length === 0) {} else if (vals.length === 1) {
    		const val = vals[0];
    		json.type = val === null ? "null" : typeof val;
    		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
    		else json.const = val;
    	} else {
    		if (vals.every((v) => typeof v === "number")) json.type = "number";
    		if (vals.every((v) => typeof v === "string")) json.type = "string";
    		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
    		if (vals.every((v) => v === null)) json.type = "null";
    		json.enum = vals;
    	}
    };
    const customProcessor = (schema, ctx, json, params) => {
    	handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
    };
    const transformProcessor = (schema, ctx, json, params) => {
    	handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
    };
    const arrayProcessor = (schema, ctx, _json, params) => {
    	const json = _json;
    	const def = schema._zod.def;
    	const { minimum, maximum } = aggregateChecks(schema);
    	if (typeof minimum === "number") json.minItems = minimum;
    	if (typeof maximum === "number") json.maxItems = maximum;
    	json.type = "array";
    	json.items = processSchema(def.element, ctx, {
    		...params,
    		path: [...params.path, "items"]
    	});
    };
    function inputOptin(schema) {
    	const def = schema._zod.def;
    	if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
    	if (def.type === "catch") return inputOptin(def.innerType);
    	return schema._zod.optin;
    }
    const objectProcessor = (schema, ctx, _json, params) => {
    	const json = _json;
    	const def = schema._zod.def;
    	const shape = def.shape;
    	if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
    	json.type = "object";
    	json.properties = {};
    	for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
    		...params,
    		path: [
    			...params.path,
    			"properties",
    			key
    		]
    	}));
    	const requiredKeys = [];
    	for (const key of Object.keys(shape)) {
    		const field = def.shape[key];
    		if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
    	}
    	if (requiredKeys.length > 0) json.required = requiredKeys;
    	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
    	else if (!def.catchall) {
    		if (ctx.io === "output") json.additionalProperties = false;
    	} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
    		...params,
    		path: [...params.path, "additionalProperties"]
    	});
    };
    const unionProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	const isExclusive = def.inclusive === false;
    	const options = def.options.map((x, i) => processSchema(x, ctx, {
    		...params,
    		path: [
    			...params.path,
    			isExclusive ? "oneOf" : "anyOf",
    			i
    		]
    	}));
    	if (isExclusive) json.oneOf = options;
    	else json.anyOf = options;
    };
    const intersectionProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	const a = processSchema(def.left, ctx, {
    		...params,
    		path: [
    			...params.path,
    			"allOf",
    			0
    		]
    	});
    	const b = processSchema(def.right, ctx, {
    		...params,
    		path: [
    			...params.path,
    			"allOf",
    			1
    		]
    	});
    	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
    	const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
    	json.allOf = allOf;
    	ctx.intersections.push(allOf);
    };
    const nullableProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	const inner = processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	if (ctx.target === "openapi-3.0") {
    		seen.ref = def.innerType;
    		json.nullable = true;
    	} else json.anyOf = [inner, { type: "null" }];
    };
    const nonoptionalProcessor = (schema, ctx, _json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    };
    /** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
    * A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
    * unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
    const UNREPRESENTABLE_DEFAULT = Symbol();
    function serializeDefaultValue(value, schema, ctx, json, params) {
    	let unrepresentable = false;
    	const serialized = JSON.stringify(value, (_, val) => {
    		if (typeof val !== "bigint") return val;
    		unrepresentable = true;
    		return null;
    	});
    	if (!unrepresentable) return JSON.parse(serialized);
    	handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
    	return UNREPRESENTABLE_DEFAULT;
    }
    const defaultProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    	if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
    };
    const prefaultProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    	if (ctx.io !== "input") return;
    	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    	if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
    };
    const catchProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    	let catchValue;
    	try {
    		catchValue = def.catchValue(void 0);
    	} catch {
    		handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
    		return;
    	}
    	json.default = catchValue;
    };
    const pipeProcessor = (schema, ctx, _json, params) => {
    	const def = schema._zod.def;
    	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
    	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
    	processSchema(innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = innerType;
    };
    const readonlyProcessor = (schema, ctx, json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    	json.readOnly = true;
    };
    const optionalProcessor = (schema, ctx, _json, params) => {
    	const def = schema._zod.def;
    	processSchema(def.innerType, ctx, params);
    	const seen = ctx.seen.get(schema);
    	seen.ref = def.innerType;
    };
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
    const _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
    function _lazyMethod(proto, key, make) {
    	Object.defineProperty(proto, key, {
    		configurable: true,
    		enumerable: false,
    		get() {
    			const value = make(this);
    			Object.defineProperty(this, key, {
    				value,
    				configurable: true,
    				writable: true
    			});
    			return value;
    		},
    		set(value) {
    			Object.defineProperty(this, key, {
    				value,
    				configurable: true,
    				writable: true
    			});
    		}
    	});
    }
    const initializer = (inst, issues) => {
    	$ZodError.init(inst, issues);
    	inst.name = "ZodError";
    	const proto = Object.getPrototypeOf(inst);
    	if (_installedErrorProtos.has(proto)) return;
    	_installedErrorProtos.add(proto);
    	_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
    	_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
    	_lazyMethod(proto, "addIssue", (self) => (issue) => {
    		self.issues.push(issue);
    		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
    	});
    	_lazyMethod(proto, "addIssues", (self) => (issues) => {
    		self.issues.push(...issues);
    		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
    	});
    	Object.defineProperty(proto, "isEmpty", {
    		configurable: true,
    		enumerable: false,
    		get() {
    			return this.issues.length === 0;
    		}
    	});
    };
    const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, void 0, { Parent: Error });
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/parse.js
    const parse = /* @__PURE__ */ _parse(ZodRealError);
    const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
    const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
    const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
    const encode = /* @__PURE__ */ _encode(ZodRealError);
    const decode = /* @__PURE__ */ _decode(ZodRealError);
    const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
    const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
    const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
    const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
    const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
    const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
    //#endregion
    //#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
    function _ensureDefaultLocale() {
    	if (!globalConfig.localeError) config(en_default());
    }
    function _ensureDefaultMemoizer() {
    	if (!globalConfig.memoizer) config({ memoizer: memoizer() });
    }
    const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
    	_ensureDefaultLocale();
    	$ZodType.init(inst, def);
    	inst.def = def;
    	inst.type = def.type;
    	return inst;
    }, {
    	check(...chks) {
    		const def = this.def;
    		return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
    			check: ch,
    			def: { check: "custom" },
    			onattach: []
    		} } : ch)] }), { parent: true });
    	},
    	with(...chks) {
    		return this.check(...chks);
    	},
    	clone(def, params) {
    		return clone(this, def, params);
    	},
    	brand() {
    		return this;
    	},
    	register(reg, meta) {
    		reg.add(this, meta);
    		return this;
    	},
    	refine(check, params) {
    		return this.check(refine(check, params));
    	},
    	superRefine(refinement, params) {
    		return this.check(superRefine(refinement, params));
    	},
    	overwrite(fn) {
    		return this.check(/* @__PURE__ */ _overwrite(fn));
    	},
    	optional() {
    		return optional(this);
    	},
    	exactOptional() {
    		return exactOptional(this);
    	},
    	nullable() {
    		return nullable(this);
    	},
    	nullish() {
    		return optional(nullable(this));
    	},
    	nonoptional(params) {
    		return nonoptional(this, params);
    	},
    	array() {
    		return array(this);
    	},
    	or(arg) {
    		return union([this, arg]);
    	},
    	and(arg) {
    		return intersection(this, arg);
    	},
    	transform(tx) {
    		return pipe(this, transform(tx));
    	},
    	default(d) {
    		return _default(this, d);
    	},
    	prefault(d) {
    		return prefault(this, d);
    	},
    	catch(params) {
    		return _catch(this, params);
    	},
    	pipe(target) {
    		return pipe(this, target);
    	},
    	readonly() {
    		return readonly(this);
    	},
    	describe(description) {
    		const cl = this.clone();
    		globalRegistry.add(cl, { description });
    		return cl;
    	},
    	meta(...args) {
    		if (args.length === 0) return globalRegistry.get(this);
    		const cl = this.clone();
    		globalRegistry.add(cl, args[0]);
    		return cl;
    	},
    	isOptional() {
    		return this.safeParse(void 0).success;
    	},
    	isNullable() {
    		return this.safeParse(null).success;
    	},
    	apply(fn, ...args) {
    		return args.length === 0 ? fn(this) : fn(this, ...args);
    	},
    	get "~standard"() {
    		return hide(this, "~standard", {
    			...standardProps(this),
    			jsonSchema: {
    				input: createStandardJSONSchemaMethod(this, "input"),
    				output: createStandardJSONSchemaMethod(this, "output")
    			}
    		});
    	},
    	set "~standard"(value) {
    		own(this, "~standard", value);
    	},
    	parse: function _parse(data, params) {
    		return parse(this, data, params, { callee: _parse });
    	},
    	parseAsync: async function _parseAsync(data, params) {
    		return await parseAsync(this, data, params, { callee: _parseAsync });
    	},
    	safeParse(data, params) {
    		return safeParse(this, data, params);
    	},
    	async safeParseAsync(data, params) {
    		return safeParseAsync(this, data, params);
    	},
    	get spa() {
    		return this?.safeParseAsync;
    	},
    	set spa(value) {
    		own(this, "spa", value);
    	},
    	validate(data, params) {
    		return validate(this, data, params);
    	},
    	validateAsync(data, params) {
    		return validateAsync$1(this, data, params);
    	},
    	encode: function _encode(data, params) {
    		return encode(this, data, params, { callee: _encode });
    	},
    	decode: function _decode(data, params) {
    		return decode(this, data, params, { callee: _decode });
    	},
    	encodeAsync: async function _encodeAsync(data, params) {
    		return await encodeAsync(this, data, params, { callee: _encodeAsync });
    	},
    	decodeAsync: async function _decodeAsync(data, params) {
    		return await decodeAsync(this, data, params, { callee: _decodeAsync });
    	},
    	safeEncode(data, params) {
    		return safeEncode(this, data, params);
    	},
    	safeDecode(data, params) {
    		return safeDecode(this, data, params);
    	},
    	async safeEncodeAsync(data, params) {
    		return safeEncodeAsync(this, data, params);
    	},
    	async safeDecodeAsync(data, params) {
    		return safeDecodeAsync(this, data, params);
    	},
    	toJSONSchema(params) {
    		return createToJSONSchemaMethod(this, {})(params);
    	},
    	get description() {
    		return globalRegistry.get(this)?.description;
    	},
    	get _def() {
    		return this._zod.def;
    	}
    });
    /** @internal */
    const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
    	$ZodString.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
    }, /*@__PURE__*/ derived({
    	format: (inst) => aggregateChecks(inst).format ?? null,
    	minLength: (inst) => aggregateChecks(inst).minimum ?? null,
    	maxLength: (inst) => aggregateChecks(inst).maximum ?? null
    }, {
    	regex(...args) {
    		return this.check(/* @__PURE__ */ _regex(...args));
    	},
    	includes(...args) {
    		return this.check(/* @__PURE__ */ _includes(...args));
    	},
    	startsWith(...args) {
    		return this.check(/* @__PURE__ */ _startsWith(...args));
    	},
    	endsWith(...args) {
    		return this.check(/* @__PURE__ */ _endsWith(...args));
    	},
    	min(...args) {
    		return this.check(/* @__PURE__ */ _minLength(...args));
    	},
    	max(...args) {
    		return this.check(/* @__PURE__ */ _maxLength(...args));
    	},
    	length(...args) {
    		return this.check(/* @__PURE__ */ _length(...args));
    	},
    	nonempty(...args) {
    		return this.check(/* @__PURE__ */ _minLength(1, ...args));
    	},
    	lowercase(params) {
    		return this.check(/* @__PURE__ */ _lowercase(params));
    	},
    	uppercase(params) {
    		return this.check(/* @__PURE__ */ _uppercase(params));
    	},
    	trim() {
    		return this.check(/* @__PURE__ */ _trim());
    	},
    	normalize(...args) {
    		return this.check(/* @__PURE__ */ _normalize(...args));
    	},
    	toLowerCase() {
    		return this.check(/* @__PURE__ */ _toLowerCase());
    	},
    	toUpperCase() {
    		return this.check(/* @__PURE__ */ _toUpperCase());
    	},
    	slugify() {
    		return this.check(/* @__PURE__ */ _slugify());
    	}
    }));
    const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
    	$ZodString.init(inst, def);
    	_ZodString.init(inst, def);
    }, {
    	email(params) {
    		return this.check(/* @__PURE__ */ _email(ZodEmail, params));
    	},
    	url(params) {
    		return this.check(/* @__PURE__ */ _url(ZodURL, params));
    	},
    	jwt(params) {
    		return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
    	},
    	emoji(params) {
    		return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
    	},
    	guid(params) {
    		return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
    	},
    	uuid(params) {
    		return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
    	},
    	uuidv4(params) {
    		return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
    	},
    	uuidv6(params) {
    		return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
    	},
    	uuidv7(params) {
    		return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
    	},
    	nanoid(params) {
    		return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
    	},
    	cuid(params) {
    		return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
    	},
    	cuid2(params) {
    		return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
    	},
    	ulid(params) {
    		return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
    	},
    	base64(params) {
    		return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
    	},
    	base64url(params) {
    		return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
    	},
    	xid(params) {
    		return this.check(/* @__PURE__ */ _xid(ZodXID, params));
    	},
    	ksuid(params) {
    		return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
    	},
    	ipv4(params) {
    		return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
    	},
    	ipv6(params) {
    		return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
    	},
    	cidrv4(params) {
    		return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
    	},
    	cidrv6(params) {
    		return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
    	},
    	e164(params) {
    		return this.check(/* @__PURE__ */ _e164(ZodE164, params));
    	},
    	datetime(params) {
    		return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
    	},
    	date(params) {
    		return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
    	},
    	time(params) {
    		return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
    	},
    	duration(params) {
    		return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
    	}
    });
    function string(params) {
    	return /* @__PURE__ */ _string(ZodString, params);
    }
    const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
    	$ZodStringFormat.init(inst, def);
    	_ZodString.init(inst, def);
    });
    const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
    	$ZodISODateTime.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
    	$ZodISODate.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
    	$ZodISOTime.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
    	$ZodISODuration.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
    	$ZodEmail.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
    	$ZodGUID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
    	$ZodUUID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
    	$ZodURL.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
    	$ZodEmoji.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
    	$ZodNanoID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    /**
    * @deprecated CUID v1 is deprecated by its authors due to information leakage
    * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
    * See https://github.com/paralleldrive/cuid.
    */
    const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
    	$ZodCUID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
    	$ZodCUID2.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
    	$ZodULID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
    	$ZodXID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
    	$ZodKSUID.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
    	$ZodIPv4.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
    	$ZodIPv6.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
    	$ZodCIDRv4.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
    	$ZodCIDRv6.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
    	$ZodBase64.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
    	$ZodBase64URL.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
    	$ZodE164.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
    	$ZodJWT.init(inst, def);
    	ZodStringFormat.init(inst, def);
    });
    const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
    	$ZodNumber.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
    	inst.isFinite = true;
    }, /*@__PURE__*/ derived({
    	minValue: (inst) => {
    		const { minimum, exclusiveMinimum } = aggregateChecks(inst);
    		return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
    	},
    	maxValue: (inst) => {
    		const { maximum, exclusiveMaximum } = aggregateChecks(inst);
    		return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
    	},
    	isInt: (inst) => {
    		const { isInt, multipleOf } = aggregateChecks(inst);
    		return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
    	},
    	format: (inst) => aggregateChecks(inst).format ?? null
    }, {
    	gt(value, params) {
    		return this.check(/* @__PURE__ */ _gt(value, params));
    	},
    	gte(value, params) {
    		return this.check(/* @__PURE__ */ _gte(value, params));
    	},
    	min(value, params) {
    		return this.check(/* @__PURE__ */ _gte(value, params));
    	},
    	lt(value, params) {
    		return this.check(/* @__PURE__ */ _lt(value, params));
    	},
    	lte(value, params) {
    		return this.check(/* @__PURE__ */ _lte(value, params));
    	},
    	max(value, params) {
    		return this.check(/* @__PURE__ */ _lte(value, params));
    	},
    	int(params) {
    		return this.check(int(params));
    	},
    	safe(params) {
    		return this.check(int(params));
    	},
    	positive(params) {
    		return this.check(/* @__PURE__ */ _gt(0, params));
    	},
    	nonnegative(params) {
    		return this.check(/* @__PURE__ */ _gte(0, params));
    	},
    	negative(params) {
    		return this.check(/* @__PURE__ */ _lt(0, params));
    	},
    	nonpositive(params) {
    		return this.check(/* @__PURE__ */ _lte(0, params));
    	},
    	multipleOf(value, params) {
    		return this.check(/* @__PURE__ */ _multipleOf(value, params));
    	},
    	step(value, params) {
    		return this.check(/* @__PURE__ */ _multipleOf(value, params));
    	},
    	finite() {
    		return this;
    	}
    }));
    function number(params) {
    	return /* @__PURE__ */ _number(ZodNumber, params);
    }
    const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
    	$ZodNumberFormat.init(inst, def);
    	ZodNumber.init(inst, def);
    });
    function int(params) {
    	return /* @__PURE__ */ _int(ZodNumberFormat, params);
    }
    const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
    	$ZodBoolean.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
    });
    function boolean(params) {
    	return /* @__PURE__ */ _boolean(ZodBoolean, params);
    }
    const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
    	$ZodUnknown.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
    });
    function unknown() {
    	return /* @__PURE__ */ _unknown(ZodUnknown);
    }
    const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
    	$ZodNever.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
    });
    function never(params) {
    	return /* @__PURE__ */ _never(ZodNever, params);
    }
    const ZodVoid = /*@__PURE__*/ $constructor("ZodVoid", (inst, def) => {
    	$ZodVoid.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
    });
    function _void(params) {
    	return /* @__PURE__ */ _void$1(ZodVoid, params);
    }
    const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
    	_ensureDefaultMemoizer();
    	$ZodArray.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
    	inst.element = def.element;
    }, {
    	min(n, params) {
    		return this.check(/* @__PURE__ */ _minLength(n, params));
    	},
    	nonempty(params) {
    		return this.check(/* @__PURE__ */ _minLength(1, params));
    	},
    	max(n, params) {
    		return this.check(/* @__PURE__ */ _maxLength(n, params));
    	},
    	length(n, params) {
    		return this.check(/* @__PURE__ */ _length(n, params));
    	},
    	unwrap() {
    		return this.element;
    	}
    });
    function array(element, params) {
    	return /* @__PURE__ */ _array(ZodArray, element, params);
    }
    const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
    	_ensureDefaultMemoizer();
    	$ZodObjectJIT.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
    	installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
    }, {
    	keyof() {
    		return _enum(Object.keys(this._zod.def.shape));
    	},
    	catchall(catchall) {
    		return this.clone(mergeDefs(this._zod.def, { catchall }));
    	},
    	passthrough() {
    		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
    	},
    	loose() {
    		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
    	},
    	strict() {
    		return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
    	},
    	strip() {
    		return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
    	},
    	extend(incoming) {
    		return extend(this, incoming);
    	},
    	safeExtend(incoming) {
    		return safeExtend(this, incoming);
    	},
    	merge(other) {
    		return merge(this, other);
    	},
    	pick(mask) {
    		return pick(this, mask);
    	},
    	omit(mask) {
    		return omit(this, mask);
    	},
    	partial(...args) {
    		return partial(ZodOptional, this, args[0]);
    	},
    	exactPartial(...args) {
    		return partial(ZodExactOptional, this, args[0], "exactPartial");
    	},
    	required(...args) {
    		return required(ZodNonOptional, this, args[0]);
    	}
    });
    function object(shape, params) {
    	const def = {
    		type: "object",
    		shape: shape ?? {},
    		...normalizeParams(params)
    	};
    	return new ZodObject(def);
    }
    const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
    	$ZodUnion.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
    	inst.options = def.options;
    });
    function union(options, params) {
    	return new ZodUnion({
    		type: "union",
    		options,
    		...normalizeParams(params)
    	});
    }
    const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
    	$ZodIntersection.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
    });
    function intersection(left, right) {
    	return new ZodIntersection({
    		type: "intersection",
    		left,
    		right
    	});
    }
    const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
    	$ZodEnum.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
    	inst.enum = def.entries;
    	inst.options = [...inst._zod.values];
    	const keys = new Set(Object.keys(def.entries));
    	inst.extract = (values, params) => {
    		const newEntries = {};
    		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
    		else throw new Error(`Key ${value} not found in enum`);
    		return new ZodEnum({
    			...def,
    			checks: [],
    			...normalizeParams(params),
    			entries: newEntries
    		});
    	};
    	inst.exclude = (values, params) => {
    		const newEntries = { ...def.entries };
    		for (const value of values) if (keys.has(value)) delete newEntries[value];
    		else throw new Error(`Key ${value} not found in enum`);
    		return new ZodEnum({
    			...def,
    			checks: [],
    			...normalizeParams(params),
    			entries: newEntries
    		});
    	};
    });
    function _enum(values, params) {
    	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    	return new ZodEnum({
    		type: "enum",
    		entries,
    		...normalizeParams(params)
    	});
    }
    const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
    	$ZodLiteral.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
    	inst.values = new Set(def.values);
    	Object.defineProperty(inst, "value", { get() {
    		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
    		return def.values[0];
    	} });
    });
    function literal(value, params) {
    	return new ZodLiteral({
    		type: "literal",
    		values: Array.isArray(value) ? value : [value],
    		...normalizeParams(params)
    	});
    }
    const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
    	_ensureDefaultMemoizer();
    	$ZodTransform.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
    	inst._zod.parse = (payload, _ctx) => {
    		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
    		payload.addIssue = (issue$1) => {
    			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
    			else {
    				const _issue = issue$1;
    				if (_issue.fatal) _issue.continue = false;
    				_issue.code ?? (_issue.code = "custom");
    				if (!("input" in _issue)) _issue.input = payload.value;
    				_issue.inst ?? (_issue.inst = inst);
    				payload.issues.push(issue(_issue));
    			}
    		};
    		const output = def.transform(payload.value, payload);
    		if (output instanceof Promise) return output.then((output) => {
    			payload.value = output;
    			return payload;
    		});
    		payload.value = output;
    		return payload;
    	};
    });
    function transform(fn) {
    	return new ZodTransform({
    		type: "transform",
    		transform: fn
    	});
    }
    const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
    	$ZodOptional.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function optional(innerType) {
    	return new ZodOptional({
    		type: "optional",
    		innerType
    	});
    }
    const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
    	$ZodExactOptional.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function exactOptional(innerType) {
    	return new ZodExactOptional({
    		type: "optional",
    		innerType
    	});
    }
    const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
    	$ZodNullable.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function nullable(innerType) {
    	return new ZodNullable({
    		type: "nullable",
    		innerType
    	});
    }
    const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
    	$ZodDefault.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    	inst.removeDefault = inst.unwrap;
    });
    function _default(innerType, defaultValue) {
    	return new ZodDefault({
    		type: "default",
    		innerType,
    		get defaultValue() {
    			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    		}
    	});
    }
    const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
    	$ZodPrefault.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function prefault(innerType, defaultValue) {
    	return new ZodPrefault({
    		type: "prefault",
    		innerType,
    		get defaultValue() {
    			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    		}
    	});
    }
    const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
    	$ZodNonOptional.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function nonoptional(innerType, params) {
    	return new ZodNonOptional({
    		type: "nonoptional",
    		innerType,
    		...normalizeParams(params)
    	});
    }
    const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
    	$ZodCatch.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    	inst.removeCatch = inst.unwrap;
    });
    function _catch(innerType, catchValue) {
    	return new ZodCatch({
    		type: "catch",
    		innerType,
    		catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
    	});
    }
    const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
    	$ZodPipe.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
    	inst.in = def.in;
    	inst.out = def.out;
    });
    function pipe(in_, out) {
    	return new ZodPipe({
    		type: "pipe",
    		in: in_,
    		out
    	});
    }
    const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
    	$ZodReadonly.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
    	inst.unwrap = () => inst._zod.def.innerType;
    });
    function readonly(innerType) {
    	return new ZodReadonly({
    		type: "readonly",
    		innerType
    	});
    }
    const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
    	$ZodCustom.init(inst, def);
    	ZodType.init(inst, def);
    	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
    });
    function refine(fn, _params = {}) {
    	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
    }
    function superRefine(fn, params) {
    	return /* @__PURE__ */ _superRefine(fn, params);
    }
    //#endregion
    //#region lib/typert.remote-client.js
    let dsh_workflow_plugin_dshWorkflow_action_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_action_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_action_parameter_0$schema$value ??= object({
    	"runId": string().readonly(),
    	"action": union([
    		literal("pause"),
    		literal("resume"),
    		literal("cancel"),
    		literal("recover"),
    		literal("retry"),
    		literal("verify"),
    		literal("accept"),
    		literal("reject"),
    		literal("apply")
    	]).readonly(),
    	"taskId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_action_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_action_result$schema = () => dsh_workflow_plugin_dshWorkflow_action_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_browseDirectories_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_browseDirectories_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_browseDirectories_parameter_0$schema$value ??= object({
    	"path": string().readonly(),
    	"workspaceRoot": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_browseDirectories_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_browseDirectories_result$schema = () => dsh_workflow_plugin_dshWorkflow_browseDirectories_result$schema$value ??= object({
    	"path": string().readonly(),
    	"parentPath": string().readonly().optional(),
    	"directories": array(object({
    		"name": string().readonly(),
    		"path": string().readonly()
    	})).readonly(),
    	"truncated": boolean().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_createOutputDirectory_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_createOutputDirectory_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_createOutputDirectory_parameter_0$schema$value ??= object({
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_createOutputDirectory_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_createOutputDirectory_result$schema = () => dsh_workflow_plugin_dshWorkflow_createOutputDirectory_result$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_generateDraft_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_generateDraft_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_generateDraft_parameter_0$schema$value ??= object({
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"contextNodes": array(union([object({
    		"type": literal("file").readonly(),
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"path": string().readonly(),
    		"position": object({
    			"x": number().readonly(),
    			"y": number().readonly()
    		}).readonly()
    	}), object({
    		"type": literal("prompt").readonly(),
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"text": string().readonly(),
    		"enabled": boolean().readonly(),
    		"position": object({
    			"x": number().readonly(),
    			"y": number().readonly()
    		}).readonly()
    	})])).readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_generateDraft_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_generateDraft_result$schema = () => dsh_workflow_plugin_dshWorkflow_generateDraft_result$schema$value ??= object({
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"model": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_get_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_get_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_get_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_get_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_get_result$schema = () => dsh_workflow_plugin_dshWorkflow_get_result$schema$value ??= object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"schemaVersion": literal(1).readonly(),
    	"revision": number().readonly(),
    	"nodes": array(union([
    		object({
    			"type": literal("task").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"instructions": string().readonly(),
    			"acceptanceCriteria": array(string()).readonly(),
    			"expectedArtifacts": array(string()).readonly(),
    			"expectedContents": array(object({
    				"path": string().readonly(),
    				"text": string().readonly()
    			})).readonly(),
    			"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    			"order": number().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})
    	])).readonly(),
    	"edges": array(union([object({
    		"type": literal("dependency").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	}), object({
    		"type": literal("context").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	})])).readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_getRun_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_getRun_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_getRun_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_getRun_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_getRun_result$schema = () => dsh_workflow_plugin_dshWorkflow_getRun_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_importMarkdown_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_importMarkdown_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_importMarkdown_parameter_0$schema$value ??= object({
    	"text": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_importMarkdown_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_importMarkdown_result$schema = () => dsh_workflow_plugin_dshWorkflow_importMarkdown_result$schema$value ??= object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"schemaVersion": literal(1).readonly(),
    	"revision": number().readonly(),
    	"nodes": array(union([
    		object({
    			"type": literal("task").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"instructions": string().readonly(),
    			"acceptanceCriteria": array(string()).readonly(),
    			"expectedArtifacts": array(string()).readonly(),
    			"expectedContents": array(object({
    				"path": string().readonly(),
    				"text": string().readonly()
    			})).readonly(),
    			"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    			"order": number().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})
    	])).readonly(),
    	"edges": array(union([object({
    		"type": literal("dependency").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	}), object({
    		"type": literal("context").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	})])).readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_list_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_list_result$schema = () => dsh_workflow_plugin_dshWorkflow_list_result$schema$value ??= array(object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"updatedAt": number().readonly(),
    	"taskCount": number().readonly(),
    	"revision": number().readonly()
    }));
    let dsh_workflow_plugin_dshWorkflow_listPendingEditProposals_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_listPendingEditProposals_result$schema = () => dsh_workflow_plugin_dshWorkflow_listPendingEditProposals_result$schema$value ??= array(object({
    	"sessionId": string().readonly(),
    	"proposalId": string().readonly(),
    	"workflowId": string().readonly(),
    	"workflowTitle": string().readonly(),
    	"baseWorkflowRevision": number().readonly(),
    	"revision": number().readonly(),
    	"model": string().readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    }));
    let dsh_workflow_plugin_dshWorkflow_listPendingSessionDrafts_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_listPendingSessionDrafts_result$schema = () => dsh_workflow_plugin_dshWorkflow_listPendingSessionDrafts_result$schema$value ??= array(object({
    	"sessionId": string().readonly(),
    	"draftId": string().readonly(),
    	"commandId": string().readonly(),
    	"workflowTitle": string().readonly(),
    	"revision": number().readonly(),
    	"taskCount": number().readonly(),
    	"model": string().readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    }));
    let dsh_workflow_plugin_dshWorkflow_previewFile_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_previewFile_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_previewFile_parameter_0$schema$value ??= object({
    	"path": string().readonly(),
    	"workspaceDirectory": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_previewFile_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_previewFile_result$schema = () => dsh_workflow_plugin_dshWorkflow_previewFile_result$schema$value ??= object({
    	"path": string().readonly(),
    	"content": string().readonly(),
    	"sha256": string().readonly(),
    	"size": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_removeWorkflow_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_removeWorkflow_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_removeWorkflow_parameter_0$schema$value ??= object({ "workflowId": string().readonly() });
    let dsh_workflow_plugin_dshWorkflow_removeWorkflow_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_removeWorkflow_result$schema = () => dsh_workflow_plugin_dshWorkflow_removeWorkflow_result$schema$value ??= object({ "removed": boolean().readonly() });
    let dsh_workflow_plugin_dshWorkflow_runs_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_runs_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_runs_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_runs_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_runs_result$schema = () => dsh_workflow_plugin_dshWorkflow_runs_result$schema$value ??= array(object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    }));
    let dsh_workflow_plugin_dshWorkflow_save_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_save_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_save_parameter_0$schema$value ??= object({
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"expectedRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_save_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_save_result$schema = () => dsh_workflow_plugin_dshWorkflow_save_result$schema$value ??= object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"schemaVersion": literal(1).readonly(),
    	"revision": number().readonly(),
    	"nodes": array(union([
    		object({
    			"type": literal("task").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"instructions": string().readonly(),
    			"acceptanceCriteria": array(string()).readonly(),
    			"expectedArtifacts": array(string()).readonly(),
    			"expectedContents": array(object({
    				"path": string().readonly(),
    				"text": string().readonly()
    			})).readonly(),
    			"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    			"order": number().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})
    	])).readonly(),
    	"edges": array(union([object({
    		"type": literal("dependency").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	}), object({
    		"type": literal("context").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	})])).readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_1$schema$value ??= object({
    	"action": union([
    		literal("pause"),
    		literal("resume"),
    		literal("cancel"),
    		literal("recover"),
    		literal("retry"),
    		literal("verify"),
    		literal("accept"),
    		literal("reject"),
    		literal("apply")
    	]).readonly(),
    	"runId": string().readonly(),
    	"taskId": string().readonly(),
    	"workflowId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionAction_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAction_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAction_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_1$schema$value ??= object({
    	"workflowId": string().readonly(),
    	"expectedAssociationRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionAssociate_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionAssociate_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionAssociate_result$schema$value ??= object({
    	"sessionId": string().readonly(),
    	"workflowId": string().readonly(),
    	"revision": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_1$schema$value ??= object({
    	"draftId": string().readonly(),
    	"expectedRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_result$schema$value ??= _void();
    let dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_1$schema$value ??= intersection(object({
    	"workflowId": string().readonly(),
    	"baseRevision": number().readonly(),
    	"isDirty": boolean().readonly(),
    	"sequence": number().readonly()
    }), object({ "clientId": string().readonly() }));
    let dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_result$schema$value ??= _void();
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_1$schema$value ??= object({
    	"proposalId": string().readonly(),
    	"expectedRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_result$schema$value ??= object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"schemaVersion": literal(1).readonly(),
    	"revision": number().readonly(),
    	"nodes": array(union([
    		object({
    			"type": literal("task").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"instructions": string().readonly(),
    			"acceptanceCriteria": array(string()).readonly(),
    			"expectedArtifacts": array(string()).readonly(),
    			"expectedContents": array(object({
    				"path": string().readonly(),
    				"text": string().readonly()
    			})).readonly(),
    			"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    			"order": number().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})
    	])).readonly(),
    	"edges": array(union([object({
    		"type": literal("dependency").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	}), object({
    		"type": literal("context").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	})])).readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_1$schema$value ??= object({
    	"proposalId": string().readonly(),
    	"expectedRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_result$schema$value ??= _void();
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_1$schema$value ??= object({
    	"proposalId": string().readonly(),
    	"expectedRevision": number().readonly(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_result$schema$value ??= object({
    	"sessionId": string().readonly(),
    	"proposalId": string().readonly(),
    	"commandId": string().readonly(),
    	"instruction": string().readonly().optional(),
    	"workflowId": string().readonly(),
    	"baseWorkflowRevision": number().readonly(),
    	"baseAssociationRevision": number().readonly(),
    	"baseWorkflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"revision": number().readonly(),
    	"model": string().readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_1$schema$value ??= object({
    	"workflowId": string().readonly(),
    	"request": object({
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"contextNodes": array(union([object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}), object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})])).readonly()
    	}).readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_result$schema$value ??= object({
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"model": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_1$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionGet_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGet_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGet_result$schema$value ??= object({
    	"id": string().readonly(),
    	"title": string().readonly(),
    	"objective": string().readonly(),
    	"workspaceDirectory": string().readonly(),
    	"outputDirectory": string().readonly(),
    	"schemaVersion": literal(1).readonly(),
    	"revision": number().readonly(),
    	"nodes": array(union([
    		object({
    			"type": literal("task").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"instructions": string().readonly(),
    			"acceptanceCriteria": array(string()).readonly(),
    			"expectedArtifacts": array(string()).readonly(),
    			"expectedContents": array(object({
    				"path": string().readonly(),
    				"text": string().readonly()
    			})).readonly(),
    			"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    			"order": number().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("file").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"path": string().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		}),
    		object({
    			"type": literal("prompt").readonly(),
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"text": string().readonly(),
    			"enabled": boolean().readonly(),
    			"position": object({
    				"x": number().readonly(),
    				"y": number().readonly()
    			}).readonly()
    		})
    	])).readonly(),
    	"edges": array(union([object({
    		"type": literal("dependency").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	}), object({
    		"type": literal("context").readonly(),
    		"id": string().readonly(),
    		"source": string().readonly(),
    		"target": string().readonly()
    	})])).readonly(),
    	"createdAt": number().readonly(),
    	"updatedAt": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_1$schema$value ??= object({
    	"runId": string().readonly(),
    	"workflowId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionGetRun_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionGetRun_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionGetRun_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_1$schema$value ??= object({
    	"path": string().readonly(),
    	"workflowId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_result$schema$value ??= object({
    	"path": string().readonly(),
    	"content": string().readonly(),
    	"sha256": string().readonly(),
    	"size": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_1$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionRuns_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionRuns_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionRuns_result$schema$value ??= array(object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    }));
    let dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_1$schema$value ??= object({
    	"expectedAssociationRevision": number().readonly(),
    	"draftId": string().readonly().optional(),
    	"expectedDraftRevision": number().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"expectedRevision": number().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionSave_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionSave_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionSave_result$schema$value ??= object({
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"association": object({
    		"sessionId": string().readonly(),
    		"workflowId": string().readonly(),
    		"revision": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_1$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_1$schema = () => dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_1$schema$value ??= object({
    	"workflowId": string().readonly(),
    	"requestId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionStartRun_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionStartRun_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionStartRun_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    let dsh_workflow_plugin_dshWorkflow_sessionState_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionState_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_sessionState_parameter_0$schema$value ??= string();
    let dsh_workflow_plugin_dshWorkflow_sessionState_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_sessionState_result$schema = () => dsh_workflow_plugin_dshWorkflow_sessionState_result$schema$value ??= object({
    	"association": object({
    		"sessionId": string().readonly(),
    		"workflowId": string().readonly(),
    		"revision": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly().optional(),
    	"associationRevision": number().readonly(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly().optional(),
    	"commandDraft": object({
    		"sessionId": string().readonly(),
    		"draftId": string().readonly(),
    		"commandId": string().readonly(),
    		"revision": number().readonly(),
    		"workflow": object({
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"objective": string().readonly(),
    			"workspaceDirectory": string().readonly(),
    			"outputDirectory": string().readonly(),
    			"schemaVersion": literal(1).readonly(),
    			"revision": number().readonly(),
    			"nodes": array(union([
    				object({
    					"type": literal("task").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"instructions": string().readonly(),
    					"acceptanceCriteria": array(string()).readonly(),
    					"expectedArtifacts": array(string()).readonly(),
    					"expectedContents": array(object({
    						"path": string().readonly(),
    						"text": string().readonly()
    					})).readonly(),
    					"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    					"order": number().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("file").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"path": string().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("prompt").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"text": string().readonly(),
    					"enabled": boolean().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				})
    			])).readonly(),
    			"edges": array(union([object({
    				"type": literal("dependency").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			}), object({
    				"type": literal("context").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			})])).readonly(),
    			"createdAt": number().readonly(),
    			"updatedAt": number().readonly()
    		}).readonly(),
    		"model": string().readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly().optional(),
    	"editProposal": object({
    		"sessionId": string().readonly(),
    		"proposalId": string().readonly(),
    		"commandId": string().readonly(),
    		"instruction": string().readonly().optional(),
    		"workflowId": string().readonly(),
    		"baseWorkflowRevision": number().readonly(),
    		"baseAssociationRevision": number().readonly(),
    		"baseWorkflow": object({
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"objective": string().readonly(),
    			"workspaceDirectory": string().readonly(),
    			"outputDirectory": string().readonly(),
    			"schemaVersion": literal(1).readonly(),
    			"revision": number().readonly(),
    			"nodes": array(union([
    				object({
    					"type": literal("task").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"instructions": string().readonly(),
    					"acceptanceCriteria": array(string()).readonly(),
    					"expectedArtifacts": array(string()).readonly(),
    					"expectedContents": array(object({
    						"path": string().readonly(),
    						"text": string().readonly()
    					})).readonly(),
    					"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    					"order": number().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("file").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"path": string().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("prompt").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"text": string().readonly(),
    					"enabled": boolean().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				})
    			])).readonly(),
    			"edges": array(union([object({
    				"type": literal("dependency").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			}), object({
    				"type": literal("context").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			})])).readonly(),
    			"createdAt": number().readonly(),
    			"updatedAt": number().readonly()
    		}).readonly(),
    		"workflow": object({
    			"id": string().readonly(),
    			"title": string().readonly(),
    			"objective": string().readonly(),
    			"workspaceDirectory": string().readonly(),
    			"outputDirectory": string().readonly(),
    			"schemaVersion": literal(1).readonly(),
    			"revision": number().readonly(),
    			"nodes": array(union([
    				object({
    					"type": literal("task").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"instructions": string().readonly(),
    					"acceptanceCriteria": array(string()).readonly(),
    					"expectedArtifacts": array(string()).readonly(),
    					"expectedContents": array(object({
    						"path": string().readonly(),
    						"text": string().readonly()
    					})).readonly(),
    					"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    					"order": number().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("file").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"path": string().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("prompt").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"text": string().readonly(),
    					"enabled": boolean().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				})
    			])).readonly(),
    			"edges": array(union([object({
    				"type": literal("dependency").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			}), object({
    				"type": literal("context").readonly(),
    				"id": string().readonly(),
    				"source": string().readonly(),
    				"target": string().readonly()
    			})])).readonly(),
    			"createdAt": number().readonly(),
    			"updatedAt": number().readonly()
    		}).readonly(),
    		"revision": number().readonly(),
    		"model": string().readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly().optional(),
    	"editDiff": object({
    		"addedNodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"removedNodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"changedNodes": array(object({
    			"before": union([
    				object({
    					"type": literal("task").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"instructions": string().readonly(),
    					"acceptanceCriteria": array(string()).readonly(),
    					"expectedArtifacts": array(string()).readonly(),
    					"expectedContents": array(object({
    						"path": string().readonly(),
    						"text": string().readonly()
    					})).readonly(),
    					"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    					"order": number().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("file").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"path": string().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("prompt").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"text": string().readonly(),
    					"enabled": boolean().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				})
    			]).readonly(),
    			"after": union([
    				object({
    					"type": literal("task").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"instructions": string().readonly(),
    					"acceptanceCriteria": array(string()).readonly(),
    					"expectedArtifacts": array(string()).readonly(),
    					"expectedContents": array(object({
    						"path": string().readonly(),
    						"text": string().readonly()
    					})).readonly(),
    					"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    					"order": number().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("file").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"path": string().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				}),
    				object({
    					"type": literal("prompt").readonly(),
    					"id": string().readonly(),
    					"title": string().readonly(),
    					"text": string().readonly(),
    					"enabled": boolean().readonly(),
    					"position": object({
    						"x": number().readonly(),
    						"y": number().readonly()
    					}).readonly()
    				})
    			]).readonly()
    		})).readonly(),
    		"addedEdges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"removedEdges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly()
    	}).readonly().optional(),
    	"availableWorkflows": array(object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"updatedAt": number().readonly(),
    		"taskCount": number().readonly(),
    		"revision": number().readonly()
    	})).readonly(),
    	"workspaceDirectory": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_startRun_parameter_0$schema$value;
    const dsh_workflow_plugin_dshWorkflow_startRun_parameter_0$schema = () => dsh_workflow_plugin_dshWorkflow_startRun_parameter_0$schema$value ??= object({
    	"workflowId": string().readonly(),
    	"requestId": string().readonly()
    });
    let dsh_workflow_plugin_dshWorkflow_startRun_result$schema$value;
    const dsh_workflow_plugin_dshWorkflow_startRun_result$schema = () => dsh_workflow_plugin_dshWorkflow_startRun_result$schema$value ??= object({
    	"id": string().readonly(),
    	"requestId": string().readonly(),
    	"workflowId": string().readonly(),
    	"sessionId": string().readonly().optional(),
    	"workflow": object({
    		"id": string().readonly(),
    		"title": string().readonly(),
    		"objective": string().readonly(),
    		"workspaceDirectory": string().readonly(),
    		"outputDirectory": string().readonly(),
    		"schemaVersion": literal(1).readonly(),
    		"revision": number().readonly(),
    		"nodes": array(union([
    			object({
    				"type": literal("task").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"instructions": string().readonly(),
    				"acceptanceCriteria": array(string()).readonly(),
    				"expectedArtifacts": array(string()).readonly(),
    				"expectedContents": array(object({
    					"path": string().readonly(),
    					"text": string().readonly()
    				})).readonly(),
    				"acceptanceMode": union([literal("automatic"), literal("manual")]).readonly(),
    				"order": number().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("file").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"path": string().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			}),
    			object({
    				"type": literal("prompt").readonly(),
    				"id": string().readonly(),
    				"title": string().readonly(),
    				"text": string().readonly(),
    				"enabled": boolean().readonly(),
    				"position": object({
    					"x": number().readonly(),
    					"y": number().readonly()
    				}).readonly()
    			})
    		])).readonly(),
    		"edges": array(union([object({
    			"type": literal("dependency").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		}), object({
    			"type": literal("context").readonly(),
    			"id": string().readonly(),
    			"source": string().readonly(),
    			"target": string().readonly()
    		})])).readonly(),
    		"createdAt": number().readonly(),
    		"updatedAt": number().readonly()
    	}).readonly(),
    	"state": union([
    		literal("queued"),
    		literal("running"),
    		literal("pausing"),
    		literal("stopping"),
    		literal("paused"),
    		literal("verifying"),
    		literal("completed"),
    		literal("needs_review"),
    		literal("failed"),
    		literal("cancelled"),
    		literal("interrupted"),
    		literal("accepted")
    	]).readonly(),
    	"createdAt": number().readonly(),
    	"startedAt": number().readonly(),
    	"endedAt": number().readonly(),
    	"tasks": array(object({
    		"taskId": string().readonly(),
    		"state": union([
    			literal("running"),
    			literal("needs_review"),
    			literal("failed"),
    			literal("pending"),
    			literal("succeeded"),
    			literal("skipped")
    		]).readonly(),
    		"attempts": array(object({
    			"number": number().readonly(),
    			"state": union([
    				literal("running"),
    				literal("needs_review"),
    				literal("failed"),
    				literal("cancelled"),
    				literal("interrupted"),
    				literal("succeeded")
    			]).readonly(),
    			"startedAt": number().readonly(),
    			"endedAt": number().readonly(),
    			"agentId": string().readonly(),
    			"agentParentSessionId": union([literal(null), string()]).readonly().optional(),
    			"toolNames": array(string()).readonly(),
    			"result": string().readonly(),
    			"error": string().readonly(),
    			"acceptanceMethod": union([
    				literal("automatic"),
    				literal("manual"),
    				literal("pending")
    			]).readonly(),
    			"artifactChecks": array(object({
    				"path": string().readonly(),
    				"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    				"exists": boolean().readonly(),
    				"passed": boolean().readonly(),
    				"size": number().readonly(),
    				"error": string().readonly(),
    				"sha256": string().readonly().optional()
    			})).readonly(),
    			"reviewDecision": union([
    				literal(""),
    				literal("accepted"),
    				literal("rejected")
    			]).readonly(),
    			"activity": object({
    				"phase": union([
    					literal("stopping"),
    					literal("starting"),
    					literal("thinking"),
    					literal("tool"),
    					literal("waiting_permission"),
    					literal("checking"),
    					literal("stalled")
    				]).readonly(),
    				"at": number().readonly(),
    				"message": string().readonly(),
    				"toolName": string().readonly().optional(),
    				"approvalId": string().readonly().optional()
    			}).readonly().optional(),
    			"messages": array(object({
    				"at": number().readonly(),
    				"text": string().readonly()
    			})).readonly().optional(),
    			"semanticFingerprint": string().readonly().optional(),
    			"contextHash": string().readonly().optional(),
    			"dependencyHash": string().readonly().optional()
    		})).readonly(),
    		"result": string().readonly(),
    		"reusedFromRunId": string().readonly().optional(),
    		"reusedFromAttemptNumber": number().readonly().optional(),
    		"reusedArtifactChecks": array(object({
    			"path": string().readonly(),
    			"type": union([literal("file_exists"), literal("file_contains")]).readonly(),
    			"exists": boolean().readonly(),
    			"passed": boolean().readonly(),
    			"size": number().readonly(),
    			"error": string().readonly(),
    			"sha256": string().readonly().optional()
    		})).readonly().optional(),
    		"semanticFingerprint": string().readonly().optional(),
    		"contextHash": string().readonly().optional(),
    		"dependencyHash": string().readonly().optional()
    	})).readonly(),
    	"contextSnapshots": array(object({
    		"nodeId": string().readonly(),
    		"title": string().readonly(),
    		"sourcePath": string().readonly(),
    		"sha256": string().readonly(),
    		"content": string().readonly()
    	})).readonly(),
    	"verification": object({
    		"status": union([
    			literal("failed"),
    			literal("pending"),
    			literal("passed"),
    			literal("blocked")
    		]).readonly(),
    		"summary": string().readonly(),
    		"checkedAt": number().readonly(),
    		"agentId": string().readonly(),
    		"toolNames": array(string()).readonly()
    	}).readonly(),
    	"events": array(object({
    		"seq": number().readonly(),
    		"at": number().readonly(),
    		"type": string().readonly(),
    		"taskId": string().readonly(),
    		"message": string().readonly()
    	})).readonly(),
    	"error": string().readonly(),
    	"parentRunId": string().readonly().optional(),
    	"invalidatedTaskIds": array(string()).readonly().optional(),
    	"supersededByRunId": string().readonly().optional()
    });
    const TYPERT_REMOTE = {
    	package: "dsh-workflow-plugin",
    	descriptors: [
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/action",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "action",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#RunActionRequest",
    					create: dsh_workflow_plugin_dshWorkflow_action_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_action_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 135,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/browseDirectories",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "browseDirectories",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#BrowseDirectoriesRequest",
    					create: dsh_workflow_plugin_dshWorkflow_browseDirectories_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#BrowseDirectoriesResult",
    				create: dsh_workflow_plugin_dshWorkflow_browseDirectories_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 117,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/createOutputDirectory",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "createOutputDirectory",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#CreateOutputDirectoryRequest",
    					create: dsh_workflow_plugin_dshWorkflow_createOutputDirectory_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/createOutputDirectory:result",
    				create: dsh_workflow_plugin_dshWorkflow_createOutputDirectory_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 120,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/generateDraft",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "generateDraft",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#DraftRequest",
    					create: dsh_workflow_plugin_dshWorkflow_generateDraft_parameter_0$schema
    				}
    			}],
    			cancellation: { parameter: "signal" },
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#DraftResult",
    				create: dsh_workflow_plugin_dshWorkflow_generateDraft_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 123,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/get",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "get",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "workflowId",
    				wire: "workflowId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/get:workflowId",
    					create: dsh_workflow_plugin_dshWorkflow_get_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowDefinition",
    				create: dsh_workflow_plugin_dshWorkflow_get_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 57,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/getRun",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "getRun",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "runId",
    				wire: "runId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/getRun:runId",
    					create: dsh_workflow_plugin_dshWorkflow_getRun_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_getRun_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 129,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/importMarkdown",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "importMarkdown",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#ImportMarkdownRequest",
    					create: dsh_workflow_plugin_dshWorkflow_importMarkdown_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowDefinition",
    				create: dsh_workflow_plugin_dshWorkflow_importMarkdown_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 111,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/list",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "list",
    			invocation: { kind: "direct" },
    			parameters: [],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/list:result",
    				create: dsh_workflow_plugin_dshWorkflow_list_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 48,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/listPendingEditProposals",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "listPendingEditProposals",
    			invocation: { kind: "direct" },
    			parameters: [],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/listPendingEditProposals:result",
    				create: dsh_workflow_plugin_dshWorkflow_listPendingEditProposals_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 51,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/listPendingSessionDrafts",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "listPendingSessionDrafts",
    			invocation: { kind: "direct" },
    			parameters: [],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/listPendingSessionDrafts:result",
    				create: dsh_workflow_plugin_dshWorkflow_listPendingSessionDrafts_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 54,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/previewFile",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "previewFile",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#PreviewContextFileRequest",
    					create: dsh_workflow_plugin_dshWorkflow_previewFile_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#ContextFilePreview",
    				create: dsh_workflow_plugin_dshWorkflow_previewFile_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 114,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/removeWorkflow",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "removeWorkflow",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#RemoveWorkflowRequest",
    					create: dsh_workflow_plugin_dshWorkflow_removeWorkflow_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#RemoveWorkflowResult",
    				create: dsh_workflow_plugin_dshWorkflow_removeWorkflow_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 108,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/runs",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "runs",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "workflowId",
    				wire: "workflowId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/runs:workflowId",
    					create: dsh_workflow_plugin_dshWorkflow_runs_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/runs:result",
    				create: dsh_workflow_plugin_dshWorkflow_runs_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 126,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/save",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "save",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SaveWorkflowRequest",
    					create: dsh_workflow_plugin_dshWorkflow_save_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowDefinition",
    				create: dsh_workflow_plugin_dshWorkflow_save_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 105,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionAction",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionAction",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionAction:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionRunActionRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionAction_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_sessionAction_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 102,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionAssociate",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionAssociate",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionAssociate:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#AssociateSessionWorkflowRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionAssociate_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowAssociation",
    				create: dsh_workflow_plugin_dshWorkflow_sessionAssociate_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 81,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionDiscardDraft",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionDiscardDraft",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionDiscardDraft:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#DiscardSessionDraftRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionDiscardDraft:result",
    				create: dsh_workflow_plugin_dshWorkflow_sessionDiscardDraft_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 75,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionEditorStatus",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionEditorStatus",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditorStatus:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditorStatus:request",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditorStatus:result",
    				create: dsh_workflow_plugin_dshWorkflow_sessionEditorStatus_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 63,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalApply",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionEditProposalApply",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalApply:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowEditProposalActionRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowDefinition",
    				create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalApply_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 69,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalDiscard",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionEditProposalDiscard",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalDiscard:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowEditProposalActionRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalDiscard:result",
    				create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalDiscard_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 72,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalUpdate",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionEditProposalUpdate",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionEditProposalUpdate:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowEditProposalUpdateRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowEditProposal",
    				create: dsh_workflow_plugin_dshWorkflow_sessionEditProposalUpdate_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 66,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionGenerateDraft",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionGenerateDraft",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionGenerateDraft:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionDraftRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_parameter_1$schema
    				}
    			}],
    			cancellation: { parameter: "signal" },
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#DraftResult",
    				create: dsh_workflow_plugin_dshWorkflow_sessionGenerateDraft_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 96,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionGet",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionGet",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionGet:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_0$schema
    				}
    			}, {
    				name: "workflowId",
    				wire: "workflowId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionGet:workflowId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGet_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowDefinition",
    				create: dsh_workflow_plugin_dshWorkflow_sessionGet_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 78,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionGetRun",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionGetRun",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionGetRun:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionRunTargetRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionGetRun_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_sessionGetRun_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 90,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionPreviewFile",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionPreviewFile",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionPreviewFile:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionPreviewContextFileRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#ContextFilePreview",
    				create: dsh_workflow_plugin_dshWorkflow_sessionPreviewFile_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 93,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionRuns",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionRuns",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionRuns:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_0$schema
    				}
    			}, {
    				name: "workflowId",
    				wire: "workflowId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionRuns:workflowId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionRuns_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionRuns:result",
    				create: dsh_workflow_plugin_dshWorkflow_sessionRuns_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 87,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionSave",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionSave",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionSave:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowSaveRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionSave_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowSaveResult",
    				create: dsh_workflow_plugin_dshWorkflow_sessionSave_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 84,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionStartRun",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionStartRun",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionStartRun:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_0$schema
    				}
    			}, {
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#StartRunRequest",
    					create: dsh_workflow_plugin_dshWorkflow_sessionStartRun_parameter_1$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_sessionStartRun_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 99,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/sessionState",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "sessionState",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "sessionId",
    				wire: "sessionId",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin#dshWorkflow/sessionState:sessionId",
    					create: dsh_workflow_plugin_dshWorkflow_sessionState_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#SessionWorkflowState",
    				create: dsh_workflow_plugin_dshWorkflow_sessionState_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 60,
    				"column": 9
    			}
    		},
    		{
    			id: "dsh-workflow-plugin#dshWorkflow/startRun",
    			service: "dshWorkflow",
    			namespace: "dshWorkflow",
    			method: "startRun",
    			invocation: { kind: "direct" },
    			parameters: [{
    				name: "request",
    				wire: "request",
    				source: "json",
    				codec: {
    					mode: "strict",
    					typeSymbol: "dsh-workflow-plugin/types#StartRunRequest",
    					create: dsh_workflow_plugin_dshWorkflow_startRun_parameter_0$schema
    				}
    			}],
    			result: {
    				mode: "strict",
    				typeSymbol: "dsh-workflow-plugin/types#WorkflowRun",
    				create: dsh_workflow_plugin_dshWorkflow_startRun_result$schema
    			},
    			sourceLocation: {
    				"file": "packages/dsh-workflow-plugin/src/host/remote-contract.ts",
    				"line": 132,
    				"column": 9
    			}
    		}
    	]
    };
    var WorkflowValidationError = class extends Error {
    	code;
    	constructor(code, message) {
    		super(message);
    		this.name = "WorkflowValidationError";
    		this.code = code;
    	}
    };
    function validateWorkflow(workflow) {
    	if (workflow.schemaVersion !== 1) throw new WorkflowValidationError("workflow.schema", "工作流数据版本不受支持。");
    	if (!Number.isInteger(workflow.revision) || workflow.revision < 0) throw new WorkflowValidationError("workflow.revision", "工作流修订号无效。");
    	if (!workflow.id.trim()) throw new WorkflowValidationError("workflow.id", "工作流缺少 ID。");
    	if (!workflow.title.trim()) throw new WorkflowValidationError("workflow.title", "工作流标题不能为空。");
    	if (!workflow.objective.trim()) throw new WorkflowValidationError("workflow.objective", "工作流目标不能为空。");
    	if (!Array.isArray(workflow.nodes) || !Array.isArray(workflow.edges)) throw new WorkflowValidationError("workflow.shape", "工作流节点或连线数据格式无效。");
    	const tasks = workflow.nodes.filter((node) => node.type === "task");
    	const contexts = workflow.nodes.filter((node) => node.type !== "task");
    	if (tasks.length < 1 || tasks.length > 30) throw new WorkflowValidationError("task.limit", `任务数量必须为 1 至 30。`);
    	if (contexts.length > 20) throw new WorkflowValidationError("context.limit", `上下文节点不能超过 20 个。`);
    	const ids = /* @__PURE__ */ new Set();
    	const byId = /* @__PURE__ */ new Map();
    	for (const node of workflow.nodes) {
    		if (!node.id.trim() || ids.has(node.id)) throw new WorkflowValidationError("node.id", `节点 ID 为空或重复：${node.id || "(空)"}`);
    		ids.add(node.id);
    		byId.set(node.id, node);
    		if (!node.title.trim()) throw new WorkflowValidationError("node.title", `节点 ${node.id} 的标题不能为空。`);
    		if (!Number.isFinite(node.position.x) || !Number.isFinite(node.position.y)) throw new WorkflowValidationError("node.position", `节点 ${node.title} 的位置无效。`);
    		if (node.type === "task" && !node.instructions.trim()) throw new WorkflowValidationError("task.instructions", `任务“${node.title}”缺少执行说明。`);
    		if (node.type === "task") {
    			if (!Number.isInteger(node.order) || node.order < 0) throw new WorkflowValidationError("task.order", `任务“${node.title}”的顺序值无效。`);
    			if (!Array.isArray(node.acceptanceCriteria) || node.acceptanceCriteria.length === 0 || !node.acceptanceCriteria.every((item) => typeof item === "string" && item.trim().length > 0)) throw new WorkflowValidationError("task.acceptance", `任务“${node.title}”至少需要一条验收条件。`);
    			if (!Array.isArray(node.expectedArtifacts) || !node.expectedArtifacts.every((item) => typeof item === "string" && isSafeRelativeArtifact(item))) throw new WorkflowValidationError("task.artifacts", `任务“${node.title}”的预期产物必须是工作区内的相对路径。`);
    			if (!Array.isArray(node.expectedContents) || !node.expectedContents.every((item) => typeof item === "object" && item !== null && "path" in item && "text" in item && typeof item.path === "string" && isSafeRelativeArtifact(item.path) && typeof item.text === "string" && item.text.trim().length > 0)) throw new WorkflowValidationError("task.expected-content", `任务“${node.title}”的文件内容核验规则无效。`);
    			if (node.acceptanceMode === "automatic" && node.expectedArtifacts.length + node.expectedContents.length === 0) throw new WorkflowValidationError("task.artifacts", `自动验收任务“${node.title}”至少需要一个文件检查。`);
    			if (node.acceptanceMode !== "automatic" && node.acceptanceMode !== "manual") throw new WorkflowValidationError("task.acceptance-mode", `任务“${node.title}”的验收方式无效。`);
    		}
    		if (node.type === "file" && !node.path.trim()) throw new WorkflowValidationError("file.path", `文件节点“${node.title}”缺少路径。`);
    		if (node.type === "prompt" && !node.text.trim()) throw new WorkflowValidationError("prompt.text", `提示节点“${node.title}”内容不能为空。`);
    		if (node.type === "prompt" && typeof node.enabled !== "boolean") throw new WorkflowValidationError("prompt.enabled", `提示节点“${node.title}”的启用状态无效。`);
    	}
    	const edgeIds = /* @__PURE__ */ new Set();
    	const edgeKeys = /* @__PURE__ */ new Set();
    	const dependencies = /* @__PURE__ */ new Map();
    	for (const edge of workflow.edges) {
    		const source = byId.get(edge.source);
    		const target = byId.get(edge.target);
    		if (!source || !target) throw new WorkflowValidationError("edge.endpoint", `连线 ${edge.id} 引用了不存在的节点。`);
    		if (!edge.id.trim() || edgeIds.has(edge.id)) throw new WorkflowValidationError("edge.id", `连线 ID 为空或重复：${edge.id || "(空)"}`);
    		edgeIds.add(edge.id);
    		if (edge.source === edge.target) throw new WorkflowValidationError("edge.self", "节点不能连接到自身。");
    		if (edge.type === "dependency") {
    			if (source.type !== "task" || target.type !== "task") throw new WorkflowValidationError("edge.type", "依赖连线只能从任务连到任务。");
    			const key = `${edge.type}:${edge.source}:${edge.target}`;
    			if (edgeKeys.has(key)) throw new WorkflowValidationError("edge.duplicate", "不能重复添加同一条连线。");
    			edgeKeys.add(key);
    			dependencies.set(edge.target, [...dependencies.get(edge.target) ?? [], edge.source]);
    		} else {
    			if (source.type === "task" || target.type !== "task") throw new WorkflowValidationError("edge.type", "上下文连线只能从文件或提示节点连到任务。");
    			const key = `${edge.type}:${edge.source}:${edge.target}`;
    			if (edgeKeys.has(key)) throw new WorkflowValidationError("edge.duplicate", "不能重复添加同一条连线。");
    			edgeKeys.add(key);
    		}
    	}
    	assertAcyclic(tasks, dependencies);
    }
    function assertAcyclic(tasks, dependencies) {
    	const visiting = /* @__PURE__ */ new Set();
    	const visited = /* @__PURE__ */ new Set();
    	const visit = (id) => {
    		if (visiting.has(id)) throw new WorkflowValidationError("dependency.cycle", "任务依赖关系包含循环。");
    		if (visited.has(id)) return;
    		visiting.add(id);
    		for (const prerequisite of dependencies.get(id) ?? []) visit(prerequisite);
    		visiting.delete(id);
    		visited.add(id);
    	};
    	for (const task of tasks) visit(task.id);
    }
    function topologicalTasks(workflow) {
    	validateWorkflow(workflow);
    	const byId = /* @__PURE__ */ new Map();
    	const incoming = /* @__PURE__ */ new Map();
    	const next = /* @__PURE__ */ new Map();
    	for (const node of workflow.nodes) if (node.type === "task") {
    		byId.set(node.id, node);
    		incoming.set(node.id, 0);
    	}
    	for (const edge of workflow.edges) if (edge.type === "dependency") {
    		incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1);
    		next.set(edge.source, [...next.get(edge.source) ?? [], edge.target]);
    	}
    	const compareTasks = (left, right) => left.order - right.order || left.id.localeCompare(right.id);
    	const ready = workflow.nodes.filter((node) => node.type === "task" && incoming.get(node.id) === 0).sort(compareTasks).map((node) => node.id);
    	const ordered = [];
    	while (ready.length > 0) {
    		const id = ready.shift();
    		const task = byId.get(id);
    		if (task) ordered.push(task);
    		for (const successor of next.get(id) ?? []) {
    			const remaining = (incoming.get(successor) ?? 0) - 1;
    			incoming.set(successor, remaining);
    			if (remaining === 0) {
    				ready.push(successor);
    				ready.sort((left, right) => compareTasks(byId.get(left), byId.get(right)));
    			}
    		}
    	}
    	if (ordered.length !== byId.size) throw new WorkflowValidationError("dependency.cycle", "任务依赖关系包含循环。");
    	return ordered;
    }
    function isSafeRelativeArtifact(path) {
    	if (!path.trim() || path.includes("\0") || path.startsWith("/") || path.startsWith("\\") || /^[A-Za-z]:/.test(path)) return false;
    	const segments = path.replaceAll("\\", "/").split("/");
    	return segments.every((segment) => segment !== ".." && segment !== "") && segments.some((segment) => segment !== ".");
    }
    //#endregion
    //#region src/domain/workflow-safety.ts
    const TERMINAL_RUN_STATES = /* @__PURE__ */ new Set([
    	"completed",
    	"failed",
    	"cancelled",
    	"accepted"
    ]);
    function hasWorkflowChangesSinceSnapshot(workflow, snapshot) {
    	return Boolean(snapshot && snapshot.id === workflow.id && JSON.stringify(workflow) !== JSON.stringify(snapshot));
    }
    function canGenerateFromInitialPrompt(workflow, snapshot, savedWorkflowId) {
    	return Boolean(!savedWorkflowId && snapshot && snapshot.id === workflow.id && JSON.stringify(workflow.nodes) === JSON.stringify(snapshot.nodes) && JSON.stringify(workflow.edges) === JSON.stringify(snapshot.edges));
    }
    function isWorkflowRunUnfinished(runState) {
    	return runState !== void 0 && !TERMINAL_RUN_STATES.has(runState);
    }
    function getWorkflowProtectionMessage(action, input) {
    	if ((action === "generate" || action === "import-markdown") && isWorkflowRunUnfinished(input.runState)) return action === "generate" ? "当前运行尚未结束，不能重新生成并替换当前工作流或清空运行展示。请先完成或停止当前运行。" : "当前运行尚未结束，不能导入并替换当前工作流或清空运行展示。请先完成或停止当前运行。";
    	if (input.hasUnsavedChanges && !(action === "generate" && input.initialPromptOnlyDraft)) {
    		if (action === "start-run" || action === "apply-run") return "有未保存修改，请先保存。";
    		return action === "generate" ? "有未保存修改，请先保存或撤销后再生成流程草稿。" : "有未保存修改，请先保存或撤销后再导入 Markdown。";
    	}
    	if (action === "generate" && !input.objective?.trim()) return "请先填写整体目标，再生成流程草稿。";
    }
    //#endregion
    //#region src/shared/path-input.ts
    /** Normalize user-entered directory text without changing legal internal spaces. */
    function normalizeDirectoryInput(input) {
    	if (typeof input !== "string") throw new TypeError("目录路径必须是文本。");
    	if (hasControlCharacter(input)) throw new Error("目录路径不能包含换行或控制字符。");
    	let value = input.trim();
    	if (!value) return "";
    	const first = value[0];
    	const last = value[value.length - 1];
    	const startsQuoted = first === "\"";
    	if (startsQuoted || last === "\"") {
    		if (!startsQuoted || first !== last) throw new Error("目录路径的首尾引号不匹配。");
    		value = value.slice(1, -1).trim();
    	}
    	if (hasControlCharacter(value)) throw new Error("目录路径不能包含换行或控制字符。");
    	if (value.includes("\"")) throw new Error("目录路径包含未配对的引号。");
    	return value;
    }
    function hasControlCharacter(value) {
    	return /[\u0000-\u001f\u007f-\u009f]/u.test(value);
    }
    //#endregion
    //#region src/client/edit-summary.ts
    function describeWorkflowNodeChanges(before, after) {
    	const fields = [];
    	if (before.title !== after.title) fields.push(`标题：${before.title} → ${after.title}`);
    	if (before.type === "task" && after.type === "task") {
    		if (before.instructions !== after.instructions) fields.push("任务说明");
    		if (JSON.stringify(before.acceptanceCriteria) !== JSON.stringify(after.acceptanceCriteria)) fields.push("验收条件");
    		if (JSON.stringify(before.expectedArtifacts) !== JSON.stringify(after.expectedArtifacts)) fields.push("预期产物");
    		if (JSON.stringify(before.expectedContents) !== JSON.stringify(after.expectedContents)) fields.push("文件内容检查");
    		if (before.acceptanceMode !== after.acceptanceMode) fields.push("验收方式");
    	}
    	if (before.type === "file" && after.type === "file" && before.path !== after.path) fields.push(`资料路径：${before.path} → ${after.path}`);
    	if (before.type === "prompt" && after.type === "prompt") {
    		if (before.text !== after.text) fields.push("提示词内容");
    		if (before.enabled !== after.enabled) fields.push(`提示词状态：${before.enabled ? "启用" : "停用"} → ${after.enabled ? "启用" : "停用"}`);
    	}
    	if (JSON.stringify(before.position) !== JSON.stringify(after.position)) fields.push(`画布位置：(${before.position.x}, ${before.position.y}) → (${after.position.x}, ${after.position.y})`);
    	return fields;
    }
    //#endregion
    //#region src/client/command-progress.ts
    const statuses = /* @__PURE__ */ new Map();
    const listeners$1 = /* @__PURE__ */ new Map();
    const latestListeners = /* @__PURE__ */ new Set();
    let latestSnapshot;
    function getPowernodeCommandStatus(sessionId) {
    	return statuses.get(sessionId);
    }
    function getLatestPowernodeCommandStatus() {
    	return latestSnapshot;
    }
    function publishPowernodeCommandStatus(sessionId, status) {
    	statuses.delete(sessionId);
    	const snapshot = {
    		...status,
    		...status.message ? { message: status.message.slice(0, 1200) } : {}
    	};
    	statuses.set(sessionId, snapshot);
    	latestSnapshot = {
    		sessionId,
    		status: snapshot
    	};
    	while (statuses.size > 500) statuses.delete(statuses.keys().next().value);
    	for (const listener of listeners$1.get(sessionId) ?? []) listener();
    	for (const listener of latestListeners) listener();
    }
    function subscribePowernodeCommandStatus(sessionId, listener) {
    	const current = listeners$1.get(sessionId) ?? /* @__PURE__ */ new Set();
    	current.add(listener);
    	listeners$1.set(sessionId, current);
    	return () => {
    		current.delete(listener);
    		if (!current.size) listeners$1.delete(sessionId);
    	};
    }
    function subscribeLatestPowernodeCommandStatus(listener) {
    	latestListeners.add(listener);
    	return () => latestListeners.delete(listener);
    }
    function clearPowernodeCommandStatuses() {
    	const sessionIds = [...listeners$1.keys()];
    	statuses.clear();
    	for (const sessionId of sessionIds) for (const listener of listeners$1.get(sessionId) ?? []) listener();
    	latestSnapshot = void 0;
    	for (const listener of latestListeners) listener();
    }
    //#endregion
    //#region src/client/workflow.css?inline
    var workflow_default = ".dsh-wp-root, .dsh-wp-workspace {\n  --wp-surface: var(--dsw-alias-bg-layer-1, var(--dsw-alias-bg-base, #fff));\n  --wp-surface-soft: var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-base, #f7f8fa));\n  --wp-surface-raised: var(--dsw-alias-bg-layer-3, var(--dsw-alias-bg-layer-1, #fff));\n  --wp-text: var(--dsw-alias-label-primary, #20242b);\n  --wp-muted: var(--dsw-alias-label-secondary, #667085);\n  --wp-border: var(--dsw-alias-border-l2, #d9dee7);\n  --wp-accent: var(--dsw-alias-brand-primary, #3478d4);\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  color: var(--wp-text);\n  background: var(--dsw-alias-bg-base, #f6f7f9);\n  color-scheme: light dark;\n  font: 14px/1.5 var(--dsw-font-family, Inter, ui-sans-serif, system-ui, sans-serif);\n  flex-direction: column;\n  gap: 12px;\n  padding: 16px 20px 12px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-session-workspace {\n  flex-direction: column;\n  height: 100%;\n  min-height: 0;\n  display: flex;\n}\n\n.dsh-wp-workspace-navigation {\n  flex-shrink: 0;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  display: flex;\n}\n\n.dsh-wp-workspace-navigation button {\n  cursor: pointer;\n  padding: 6px 10px;\n}\n\n.dsh-wp-workspace-frame {\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  container: dsh-workflow / inline-size;\n}\n\n.dsh-wp-workspace {\n  gap: 0;\n  min-height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n\n.dsh-wp-workspace.has-chat {\n  grid-template-columns: minmax(0, 1fr) minmax(300px, 34%);\n  display: grid;\n}\n\n.dsh-wp-workspace > .dsh-wp-root {\n  min-width: 0;\n}\n\n.dsh-wp-conversation {\n  border-left: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  flex-direction: column;\n  gap: 10px;\n  min-width: 0;\n  min-height: 0;\n  padding: 12px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-conversation > header {\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.dsh-wp-chat-tabs {\n  gap: 4px;\n  display: flex;\n}\n\n.dsh-wp-chat-tabs button, .dsh-wp-task-timeline button {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  color: var(--wp-text);\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 6px 9px;\n}\n\n.dsh-wp-chat-tabs button[aria-pressed=\"true\"], .dsh-wp-task-timeline button.is-selected {\n  outline: 2px solid var(--wp-accent);\n}\n\n.dsh-wp-task-timeline {\n  flex-shrink: 0;\n  gap: 6px;\n  padding: 3px;\n  display: flex;\n  overflow-x: auto;\n}\n\n.dsh-wp-task-timeline button {\n  text-align: left;\n  min-width: 110px;\n}\n\n.dsh-wp-task-timeline span, .dsh-wp-task-timeline small {\n  display: block;\n}\n\n.dsh-wp-native-chat {\n  flex-direction: column;\n  flex: 1;\n  min-height: 320px;\n  display: flex;\n}\n\n.dsh-wp-native-chat > [data-conversation-content] {\n  flex: 1;\n  min-height: 0;\n}\n\n.dsh-wp-native-chat[data-resident-composer=\"true\"] [data-composer-seat], [data-conversation-scroll]:has(.dsh-wp-native-chat.is-task-chat) > [data-composer-seat] {\n  display: none;\n}\n\n.dsh-wp-task-conversation-summary {\n  max-height: 240px;\n  font-size: 13px;\n  overflow: auto;\n}\n\n.dsh-wp-saved-message {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  background: var(--wp-surface-soft);\n  padding: 8px;\n}\n\n.dsh-wp-chat-error {\n  color: #bc3131;\n  overflow-wrap: anywhere;\n}\n\n.dsh-wp-progress {\n  border: 1px solid var(--wp-border, #d9dee7);\n  background: var(--wp-surface, var(--dsw-alias-bg-layer-1, #fff));\n  color: var(--wp-text, var(--dsw-alias-label-primary, #20242b));\n  border-radius: 8px;\n  flex-shrink: 0;\n  padding: 10px 14px;\n}\n\n.dsh-wp-progress-heading {\n  align-items: center;\n  gap: 10px;\n  display: flex;\n}\n\n.dsh-wp-progress-heading > span {\n  margin-left: auto;\n}\n\n.dsh-wp-progress-track {\n  background: var(--wp-border, #d9dee7);\n  border-radius: 4px;\n  height: 6px;\n  margin: 9px 0;\n  overflow: hidden;\n}\n\n.dsh-wp-progress-track > i {\n  background: #23945c;\n  height: 100%;\n  transition: width .18s;\n  display: block;\n}\n\n.dsh-wp-progress-current {\n  color: var(--wp-accent, #3478d4);\n  text-align: left;\n  cursor: pointer;\n  background: none;\n  border: 0;\n  padding: 0;\n}\n\n.dsh-wp-progress p {\n  overflow-wrap: anywhere;\n  margin: 5px 0;\n}\n\n.dsh-wp-progress-legend {\n  color: var(--wp-muted, #667085);\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 6px;\n  font-size: 11px;\n  display: flex;\n}\n\n.dsh-wp-node-status {\n  margin: 6px 0;\n  font-size: 12px;\n  font-weight: 600;\n  display: block;\n}\n\n.dsh-wp-node-task.is-succeeded, .dsh-wp-task-timeline .is-succeeded {\n  background: color-mix(in srgb, #23945c 13%, var(--wp-surface));\n  border-color: #23945c;\n}\n\n.dsh-wp-node-task:is(.is-running, .is-starting, .is-thinking, .is-tool, .is-checking), .dsh-wp-task-timeline button:is(.is-running, .is-starting, .is-thinking, .is-tool, .is-checking) {\n  background: color-mix(in srgb, #3478d4 12%, var(--wp-surface));\n  border-color: #3478d4;\n}\n\n.dsh-wp-node-task:is(.is-waiting_permission, .is-needs_review, .is-stalled, .is-stopping), .dsh-wp-task-timeline button:is(.is-waiting_permission, .is-needs_review, .is-stalled, .is-stopping) {\n  background: color-mix(in srgb, #dba11e 15%, var(--wp-surface));\n  border-color: #ad7800;\n}\n\n.dsh-wp-node-task.is-failed, .dsh-wp-task-timeline .is-failed {\n  background: color-mix(in srgb, #c73a3a 12%, var(--wp-surface));\n  border-color: #c73a3a;\n}\n\n.dsh-wp-node-task:is(.is-cancelled, .is-interrupted, .is-skipped, .is-outdated) {\n  opacity: .7;\n  border-style: dashed;\n}\n\n.dsh-wp-run-dock {\n  width: 100%;\n}\n\n.dsh-wp-run-dock .dsh-wp-progress-legend {\n  display: none;\n}\n\n@container dsh-workflow (width <= 900px) {\n  .dsh-wp-workspace.has-chat {\n    grid-template-rows: 560px 540px;\n    grid-template-columns: minmax(0, 1fr);\n    overflow: auto;\n  }\n\n  .dsh-wp-workspace.has-chat > .dsh-wp-root {\n    height: 560px;\n  }\n\n  .dsh-wp-conversation {\n    border-left: 0;\n    border-top: 1px solid var(--wp-border);\n    min-height: 0;\n  }\n}\n\n.dsh-wp-root[data-theme=\"light\"] {\n  color-scheme: light;\n}\n\n.dsh-wp-root[data-theme=\"dark\"] {\n  color-scheme: dark;\n}\n\n.dsh-wp-root *, .dsh-wp-root :before, .dsh-wp-root :after {\n  box-sizing: border-box;\n}\n\n.dsh-wp-root button, .dsh-wp-root input, .dsh-wp-root textarea, .dsh-wp-root select {\n  font: inherit;\n}\n\n.dsh-wp-root button, .dsh-wp-root select, .dsh-wp-root summary {\n  color: var(--wp-text);\n}\n\n.dsh-wp-root button, .dsh-wp-root select {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  cursor: pointer;\n  border-radius: 8px;\n  min-height: 36px;\n  padding: 7px 11px;\n}\n\n.dsh-wp-root button:hover:not(:disabled), .dsh-wp-root select:hover {\n  border-color: var(--wp-accent);\n  background: var(--dsw-alias-interactive-bg-hover, var(--wp-surface));\n}\n\n.dsh-wp-root button:focus-visible, .dsh-wp-root select:focus-visible, .dsh-wp-root input:focus-visible, .dsh-wp-root textarea:focus-visible, .dsh-wp-root summary:focus-visible {\n  outline: 2px solid var(--wp-accent);\n  outline-offset: 2px;\n}\n\n.dsh-wp-root button:disabled {\n  opacity: .55;\n  cursor: not-allowed;\n}\n\n.dsh-wp-root button.is-primary {\n  border-color: var(--wp-accent);\n  color: var(--dsw-alias-label-primary-foreground, #fff);\n  background: var(--dsw-alias-button-primary-fill, var(--wp-accent));\n}\n\n.dsh-wp-root button.is-primary:hover:not(:disabled) {\n  background: var(--dsw-alias-button-primary-hover, var(--wp-accent));\n}\n\n.dsh-wp-root button.is-danger {\n  color: var(--dsw-alias-state-error-primary, #b42318);\n}\n\n.dsh-wp-header {\n  justify-content: space-between;\n  align-items: center;\n  gap: 18px;\n  min-width: 0;\n  display: flex;\n}\n\n.dsh-wp-header h1 {\n  color: var(--wp-text);\n  margin: 0;\n  font-size: clamp(20px, 2vw, 26px);\n  line-height: 1.2;\n}\n\n.dsh-wp-header p, .dsh-wp-empty, .dsh-wp-footer, .dsh-wp-section-heading p {\n  color: var(--wp-muted);\n  margin: 5px 0 0;\n}\n\n.dsh-wp-title-block {\n  min-width: 180px;\n}\n\n.dsh-wp-back {\n  margin: 0 0 5px;\n  display: block;\n  min-height: 25px !important;\n  color: var(--wp-muted) !important;\n  background: none !important;\n  border: 0 !important;\n  padding: 0 !important;\n}\n\n.dsh-wp-session-nav {\n  align-items: center;\n  gap: 14px;\n  min-height: 24px;\n  display: flex;\n}\n\n.dsh-wp-session-nav .dsh-wp-back {\n  margin: 0;\n}\n\n.dsh-wp-root.is-session-scope .dsh-wp-title-block > .dsh-wp-back {\n  display: none;\n}\n\n.dsh-wp-toolbar, .dsh-wp-home-actions, .dsh-wp-actions-group, .dsh-wp-run-actions {\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.dsh-wp-toolbar {\n  justify-content: flex-end;\n}\n\n.dsh-wp-header-action {\n  margin-left: 4px;\n  border-color: var(--wp-accent) !important;\n  color: var(--wp-accent) !important;\n  font-size: 12px !important;\n}\n\n.dsh-wp-command-progress {\n  color: var(--wp-muted);\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px 10px;\n  margin-left: 4px;\n  font-size: 12px;\n  line-height: 1.45;\n  display: flex;\n}\n\n.dsh-wp-command-progress details {\n  max-width: min(520px, 80vw);\n}\n\n.dsh-wp-command-progress details small {\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n  max-height: 120px;\n  margin-top: 4px;\n  display: block;\n  overflow: auto;\n}\n\n.dsh-wp-toolbar > select {\n  width: clamp(170px, 18vw, 275px);\n}\n\n.dsh-wp-theme-control {\n  color: var(--wp-muted);\n  white-space: nowrap;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  display: inline-flex;\n}\n\n.dsh-wp-theme-control select {\n  min-width: 112px;\n  min-height: 36px;\n  padding: 6px 9px;\n}\n\n.dsh-wp-file-button {\n  border: 1px solid var(--wp-border);\n  min-height: 36px;\n  color: var(--wp-text);\n  background: var(--wp-surface);\n  cursor: pointer;\n  border-radius: 8px;\n  align-items: center;\n  padding: 7px 11px;\n  display: inline-flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.dsh-wp-file-button:hover {\n  border-color: var(--wp-accent);\n  background: var(--dsw-alias-interactive-bg-hover, var(--wp-surface));\n}\n\n.dsh-wp-file-button input {\n  opacity: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  inset: 0;\n}\n\n.dsh-wp-alert {\n  border: 1px solid var(--dsw-alias-state-success-secondary, #b5dfc7);\n  color: var(--dsw-alias-state-success-primary, #236342);\n  background: var(--dsw-alias-state-success-tertiary, #edf8f1);\n  overflow-wrap: anywhere;\n  border-radius: 9px;\n  flex: none;\n  padding: 9px 12px;\n}\n\n.dsh-wp-alert.is-error {\n  border-color: var(--dsw-alias-state-error-secondary, #efc0bc);\n  color: var(--dsw-alias-state-error-primary, #9f2e29);\n  background: var(--dsw-alias-bg-layer-2, #fff3f2);\n}\n\n.dsh-wp-home {\n  overflow: auto;\n}\n\n.dsh-wp-home-actions {\n  justify-content: flex-end;\n}\n\n.dsh-wp-onboarding {\n  grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);\n  align-items: stretch;\n  gap: 18px;\n  display: grid;\n}\n\n.dsh-wp-onboarding-copy, .dsh-wp-node-guide, .dsh-wp-saved-list {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  border-radius: 14px;\n  min-width: 0;\n}\n\n.dsh-wp-onboarding-copy {\n  padding: clamp(18px, 3vw, 30px);\n}\n\n.dsh-wp-eyebrow {\n  color: var(--wp-accent);\n  letter-spacing: .06em;\n  font-size: 12px;\n  font-weight: 650;\n}\n\n.dsh-wp-onboarding-copy h2 {\n  margin: 7px 0 16px;\n  font-size: clamp(19px, 2vw, 24px);\n}\n\n.dsh-wp-onboarding-copy ol {\n  gap: 12px;\n  margin: 0 0 15px;\n  padding-left: 22px;\n  display: grid;\n}\n\n.dsh-wp-onboarding-copy li {\n  padding-left: 3px;\n}\n\n.dsh-wp-onboarding-copy li b, .dsh-wp-onboarding-copy li span {\n  display: block;\n}\n\n.dsh-wp-onboarding-copy li span {\n  color: var(--wp-muted);\n  margin-top: 2px;\n  font-size: 13px;\n}\n\n.dsh-wp-manual-note {\n  border-left: 3px solid var(--wp-accent);\n  color: var(--wp-muted);\n  background: var(--wp-surface-soft);\n  margin: 14px 0;\n  padding: 8px 11px;\n  font-size: 13px;\n}\n\n.dsh-wp-node-guide {\n  flex-direction: column;\n  justify-content: center;\n  gap: 16px;\n  padding: clamp(16px, 2.5vw, 26px);\n  display: flex;\n}\n\n.dsh-wp-node-guide article {\n  align-items: flex-start;\n  gap: 12px;\n  display: flex;\n}\n\n.dsh-wp-node-guide article b {\n  display: block;\n}\n\n.dsh-wp-node-guide article p {\n  color: var(--wp-muted);\n  margin: 3px 0 0;\n  font-size: 13px;\n}\n\n.dsh-wp-guide-symbol {\n  width: 34px;\n  height: 34px;\n  color: var(--wp-accent);\n  background: var(--dsw-alias-interactive-bg-hover, var(--wp-surface-soft));\n  border-radius: 10px;\n  flex: 0 0 34px;\n  place-items: center;\n  font-weight: 700;\n  display: grid;\n}\n\n.dsh-wp-guide-symbol.is-file {\n  color: var(--dsw-alias-state-success-primary, #26845f);\n}\n\n.dsh-wp-guide-symbol.is-prompt {\n  color: var(--dsw-alias-label-tertiary, #7957ad);\n}\n\n.dsh-wp-edge-guide {\n  border-top: 1px solid var(--wp-border);\n  color: var(--wp-muted);\n  gap: 8px;\n  margin-top: 2px;\n  padding-top: 14px;\n  font-size: 12px;\n  display: grid;\n}\n\n.dsh-wp-edge-guide span {\n  align-items: center;\n  gap: 9px;\n  display: flex;\n}\n\n.dsh-wp-edge-guide i {\n  border-top: 2px solid var(--wp-accent);\n  width: 28px;\n  display: inline-block;\n}\n\n.dsh-wp-edge-guide i.is-context {\n  border-color: var(--dsw-alias-label-tertiary, #7957ad);\n  border-top-style: dashed;\n}\n\n.dsh-wp-saved-list {\n  padding: 16px 18px;\n}\n\n.dsh-wp-section-heading {\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  display: flex;\n}\n\n.dsh-wp-section-heading h2 {\n  margin: 0;\n  font-size: 17px;\n}\n\n.dsh-wp-section-heading p {\n  font-size: 12px;\n}\n\n.dsh-wp-section-heading > span {\n  color: var(--wp-muted);\n  font-size: 12px;\n}\n\n.dsh-wp-workflow-list {\n  gap: 7px;\n  display: grid;\n}\n\n.dsh-wp-workflow-row {\n  text-align: left;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n  display: flex;\n  min-height: 60px !important;\n}\n\n.dsh-wp-workflow-row > span:first-child {\n  min-width: 0;\n}\n\n.dsh-wp-workflow-row b, .dsh-wp-workflow-row small {\n  display: block;\n}\n\n.dsh-wp-workflow-row small {\n  max-width: 72ch;\n  color: var(--wp-muted);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-top: 2px;\n  overflow: hidden;\n}\n\n.dsh-wp-workflow-meta {\n  color: var(--wp-muted);\n  flex: none;\n  align-items: center;\n  gap: 14px;\n  font-size: 12px;\n  display: flex;\n}\n\n.dsh-wp-workflow-meta b {\n  color: var(--wp-accent);\n}\n\n.dsh-wp-empty-card {\n  color: var(--wp-muted);\n  background: var(--wp-surface-soft);\n  border-radius: 8px;\n  margin: 0;\n  padding: 16px;\n}\n\n.dsh-wp-settings {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  border-radius: 10px;\n  flex: none;\n}\n\n.dsh-wp-settings > summary {\n  cursor: pointer;\n  align-items: center;\n  gap: 10px;\n  min-height: 42px;\n  padding: 8px 12px;\n  list-style-position: inside;\n  display: flex;\n}\n\n.dsh-wp-settings > summary span {\n  font-weight: 600;\n}\n\n.dsh-wp-settings > summary small {\n  color: var(--wp-muted);\n}\n\n.dsh-wp-settings-grid {\n  border-top: 1px solid var(--wp-border);\n  grid-template-columns: minmax(180px, .75fr) minmax(260px, 1fr) minmax(210px, 1fr);\n  gap: 12px;\n  padding: 14px;\n  display: grid;\n}\n\n.dsh-wp-settings-grid label, .dsh-wp-inspector label {\n  min-width: 0;\n  color: var(--wp-muted);\n  flex-direction: column;\n  gap: 5px;\n  font-size: 12px;\n  display: flex;\n}\n\n.dsh-wp-settings-grid .is-wide {\n  grid-column: span 2;\n}\n\n.dsh-wp-path-field {\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: end;\n  gap: 7px;\n  min-width: 0;\n  display: grid;\n}\n\n.dsh-wp-path-field > label {\n  min-width: 0;\n  color: var(--wp-muted);\n  flex-direction: column;\n  gap: 5px;\n  font-size: 12px;\n  display: flex;\n}\n\n.dsh-wp-path-field > button {\n  white-space: nowrap;\n  align-self: end;\n}\n\n.dsh-wp-path-field.is-wide {\n  grid-column: span 2;\n}\n\n.dsh-wp-path-field.is-wide:has(button:nth-of-type(2)) {\n  grid-template-columns: minmax(0, 1fr) auto auto;\n}\n\n.dsh-wp-path-field.is-wide:has(button:nth-of-type(3)) {\n  grid-template-columns: minmax(0, 1fr) auto auto auto;\n}\n\n.dsh-wp-root input, .dsh-wp-root textarea {\n  border: 1px solid var(--wp-border);\n  width: 100%;\n  min-width: 0;\n  color: var(--wp-text);\n  background: var(--wp-surface);\n  border-radius: 8px;\n  padding: 8px 10px;\n  font-size: 13px;\n  line-height: 1.5;\n  display: block;\n}\n\n.dsh-wp-root textarea {\n  resize: vertical;\n  overflow-wrap: anywhere;\n}\n\n.dsh-wp-folder-backdrop {\n  z-index: 10000;\n  background: #10131b88;\n  place-items: center;\n  padding: 24px;\n  display: grid;\n  position: fixed;\n  inset: 0;\n}\n\n.dsh-wp-folder-dialog {\n  border: 1px solid var(--wp-border);\n  width: min(720px, 96vw);\n  max-height: min(82vh, 760px);\n  color: var(--wp-text);\n  background: var(--wp-surface-raised);\n  border-radius: 14px;\n  flex-direction: column;\n  gap: 12px;\n  padding: 18px;\n  display: flex;\n  box-shadow: 0 18px 60px #0005;\n}\n\n.dsh-wp-folder-dialog > header h2 {\n  margin: 0;\n  font-size: 18px;\n}\n\n.dsh-wp-folder-dialog > header p, .dsh-wp-folder-current {\n  color: var(--wp-muted);\n  overflow-wrap: anywhere;\n  margin: 4px 0 0;\n  font-size: 12px;\n}\n\n.dsh-wp-folder-path {\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 8px;\n  display: grid;\n}\n\n.dsh-wp-folder-path input {\n  font-family: ui-monospace, Consolas, monospace !important;\n}\n\n.dsh-wp-folder-list {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  border-radius: 9px;\n  flex-direction: column;\n  min-height: 150px;\n  padding: 6px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-folder-list > p {\n  color: var(--wp-muted);\n  margin: auto;\n  padding: 16px;\n}\n\n.dsh-wp-folder-list > button {\n  text-align: left;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  display: flex;\n  border: 0 !important;\n}\n\n.dsh-wp-folder-list > button small {\n  color: var(--wp-muted);\n  margin-left: auto;\n}\n\n.dsh-wp-folder-error {\n  color: var(--dsw-alias-state-error-primary, #9f2e29);\n  margin: 0;\n  font-size: 12px;\n}\n\n.dsh-wp-folder-dialog > footer {\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.dsh-wp-folder-dialog > footer > span {\n  flex: 1;\n}\n\n.dsh-wp-actions {\n  color: var(--wp-muted);\n  flex: none;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  font-size: 12px;\n  display: flex;\n}\n\n.dsh-wp-actions-group {\n  justify-content: flex-end;\n}\n\n.dsh-wp-add-menu {\n  position: relative;\n}\n\n.dsh-wp-add-menu > summary {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  cursor: pointer;\n  border-radius: 8px;\n  align-items: center;\n  min-height: 36px;\n  padding: 6px 11px;\n  list-style: none;\n  display: flex;\n}\n\n.dsh-wp-add-menu > summary::-webkit-details-marker {\n  display: none;\n}\n\n.dsh-wp-add-menu[open] > div {\n  z-index: 15;\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface-raised);\n  border-radius: 9px;\n  gap: 4px;\n  min-width: 220px;\n  padding: 6px;\n  display: grid;\n  position: absolute;\n  top: calc(100% + 5px);\n  right: 0;\n  box-shadow: 0 8px 28px #0002;\n}\n\n.dsh-wp-add-menu[open] button {\n  text-align: left;\n  white-space: nowrap;\n  border: 0;\n}\n\n.dsh-wp-workarea {\n  flex: 1 0 400px;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 12px;\n  min-height: 400px;\n  display: grid;\n  position: relative;\n}\n\n.dsh-wp-workarea.has-inspector {\n  grid-template-columns: minmax(0, 1fr) minmax(300px, 355px);\n}\n\n.dsh-wp-canvas, .dsh-wp-inspector {\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  border-radius: 12px;\n  min-width: 0;\n  min-height: 0;\n}\n\n.dsh-wp-canvas {\n  isolation: isolate;\n  position: relative;\n  overflow: hidden;\n}\n\n.dsh-wp-inspector {\n  flex-direction: column;\n  gap: 12px;\n  padding: 12px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-inspector-top {\n  z-index: 2;\n  border-bottom: 1px solid var(--wp-border);\n  background: var(--wp-surface);\n  flex: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: -12px -12px 0;\n  padding: 9px 12px;\n  display: flex;\n  position: sticky;\n  top: -12px;\n}\n\n.dsh-wp-inspector-top button {\n  min-height: 30px;\n  padding: 4px 8px;\n}\n\n.dsh-wp-inspector-section {\n  flex-direction: column;\n  flex: none;\n  gap: 10px;\n  min-width: 0;\n  display: flex;\n}\n\n.dsh-wp-inspector-section + .dsh-wp-inspector-section {\n  border-top: 1px solid var(--wp-border);\n  margin-top: 3px;\n  padding-top: 13px;\n}\n\n.dsh-wp-inspector h2, .dsh-wp-inspector h3 {\n  color: var(--wp-text);\n  margin: 0;\n}\n\n.dsh-wp-inspector h2 {\n  font-size: 16px;\n}\n\n.dsh-wp-inspector h3 {\n  margin-top: 5px;\n  font-size: 13px;\n}\n\n.dsh-wp-type-badge {\n  color: var(--wp-accent);\n  background: var(--dsw-alias-interactive-bg-hover, var(--wp-surface-soft));\n  border-radius: 999px;\n  align-self: flex-start;\n  padding: 3px 9px;\n  font-size: 11px;\n}\n\n.dsh-wp-type-badge.is-file {\n  color: var(--dsw-alias-state-success-primary, #287657);\n}\n\n.dsh-wp-type-badge.is-prompt {\n  color: var(--dsw-alias-label-tertiary, #7957ad);\n}\n\n.dsh-wp-checkbox {\n  align-items: flex-start;\n  line-height: 1.5;\n  flex-direction: row !important;\n  gap: 8px !important;\n  display: flex !important;\n}\n\n.dsh-wp-checkbox input {\n  width: 16px;\n  height: 16px;\n  accent-color: var(--wp-accent);\n  flex: 0 0 16px;\n  margin: 2px 0 0;\n}\n\n.dsh-wp-context-list {\n  flex-direction: column;\n  flex: none;\n  gap: 6px;\n  display: flex;\n}\n\n.dsh-wp-context-list > div {\n  background: var(--wp-surface-soft);\n  border-radius: 8px;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  padding: 5px 7px;\n  display: flex;\n}\n\n.dsh-wp-context-list > div span {\n  overflow-wrap: anywhere;\n  min-width: 0;\n}\n\n.dsh-wp-context-list small {\n  color: var(--wp-muted);\n}\n\n.dsh-wp-preview, .dsh-wp-attempt pre {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  border: 1px solid var(--wp-border);\n  max-width: 100%;\n  max-height: 260px;\n  color: var(--wp-text);\n  background: var(--wp-surface-soft);\n  border-radius: 8px;\n  padding: 9px;\n  font: 11px / 1.5 ui-monospace, monospace;\n  overflow: auto;\n}\n\n.dsh-wp-attempt {\n  border-left: 2px solid var(--wp-border);\n  padding-left: 9px;\n}\n\n.dsh-wp-attempt p {\n  color: var(--wp-muted);\n  overflow-wrap: anywhere;\n  font-size: 11px;\n}\n\n.dsh-wp-run-state {\n  color: var(--wp-accent);\n  background: var(--wp-surface-soft);\n  border-radius: 999px;\n  align-self: flex-start;\n  padding: 4px 9px;\n}\n\n.dsh-wp-run-state.is-completed {\n  color: var(--dsw-alias-state-success-primary, #226548);\n}\n\n.dsh-wp-run-state.is-failed, .dsh-wp-run-state.is-needs_review, .dsh-wp-run-state.is-interrupted {\n  color: var(--dsw-alias-state-error-primary, #9f4b2e);\n}\n\n.dsh-wp-run-error {\n  color: var(--dsw-alias-state-error-primary, #9b3a35);\n  overflow-wrap: anywhere;\n}\n\n.dsh-wp-run details {\n  border-top: 1px solid var(--wp-border);\n  padding-top: 7px;\n}\n\n.dsh-wp-run summary {\n  cursor: pointer;\n}\n\n.dsh-wp-event-list {\n  flex-direction: column;\n  gap: 6px;\n  max-height: 200px;\n  padding-left: 20px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-event-list li {\n  grid-template-columns: auto auto minmax(0, 1fr);\n  gap: 6px;\n  font-size: 11px;\n  display: grid;\n}\n\n.dsh-wp-event-list time {\n  color: var(--wp-muted);\n}\n\n.dsh-wp-verification {\n  background: var(--wp-surface-soft);\n  border-radius: 8px;\n  padding: 9px;\n}\n\n.dsh-wp-verification p, .dsh-wp-verification small {\n  overflow-wrap: anywhere;\n}\n\n.dsh-wp-footer {\n  flex: none;\n  font-size: 11px;\n}\n\n.dsh-wp-sidebar-icon {\n  color: var(--wp-accent);\n  border-radius: 5px;\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.dsh-wp-sidebar-icon:before, .dsh-wp-sidebar-icon:after {\n  z-index: 0;\n  content: \"\";\n  border-top: 1.5px solid;\n  width: 56%;\n  position: absolute;\n  top: 50%;\n  left: 22%;\n  transform: rotate(31deg);\n}\n\n.dsh-wp-sidebar-icon:after {\n  transform: rotate(-31deg);\n}\n\n.dsh-wp-sidebar-icon i {\n  z-index: 1;\n  background: var(--wp-surface);\n  border: 1.5px solid;\n  border-radius: 50%;\n  width: 28%;\n  height: 28%;\n  position: absolute;\n}\n\n.dsh-wp-sidebar-icon i:first-child {\n  top: 5%;\n  left: 36%;\n}\n\n.dsh-wp-sidebar-icon i:nth-child(2) {\n  bottom: 7%;\n  left: 8%;\n}\n\n.dsh-wp-sidebar-icon i:last-child {\n  bottom: 7%;\n  right: 8%;\n}\n\n.dsh-wp-canvas .react-flow {\n  --xy-background-color: var(--dsw-alias-bg-base, #fff);\n  --xy-node-background-color: var(--wp-surface);\n  --xy-node-color: var(--wp-text);\n  --xy-edge-stroke: var(--wp-border);\n  --xy-edge-stroke-selected: var(--wp-accent);\n  --xy-controls-button-background: var(--wp-surface);\n  --xy-controls-button-color: var(--wp-text);\n  --xy-controls-button-border-color: var(--wp-border);\n  --xy-minimap-background-color: var(--wp-surface-soft);\n  --xy-minimap-mask-background-color: color-mix(in srgb, var(--wp-text) 12%, transparent);\n  --xy-minimap-node-background-color: var(--wp-accent);\n  --xy-minimap-node-stroke-color: var(--wp-border);\n  color: var(--wp-text);\n}\n\n.dsh-wp-canvas .react-flow__controls {\n  border: 1px solid var(--wp-border);\n  border-radius: 9px;\n  overflow: hidden;\n  box-shadow: 0 3px 12px #0002;\n}\n\n.dsh-wp-canvas .react-flow__controls-button {\n  border-bottom: 1px solid var(--wp-border);\n  width: 30px;\n  height: 30px;\n}\n\n.dsh-wp-canvas .react-flow__controls-button svg {\n  fill: var(--wp-text);\n}\n\n.dsh-wp-canvas .react-flow__minimap {\n  border: 1px solid var(--wp-border);\n  border-radius: 8px;\n}\n\n.dsh-wp-canvas .react-flow__minimap-mask {\n  fill: var(--dsw-alias-bg-base, #fff);\n  fill-opacity: .72;\n}\n\n.dsh-wp-canvas .react-flow__edge-textbg {\n  fill: var(--wp-surface);\n}\n\n.dsh-wp-canvas .react-flow__edge-text {\n  fill: var(--wp-muted);\n  font-size: 10px;\n}\n\n.dsh-wp-node {\n  border: 1px solid var(--wp-border);\n  width: 236px;\n  min-height: 124px;\n  color: var(--wp-text);\n  background: var(--wp-surface);\n  border-radius: 12px;\n  padding: 12px;\n  position: relative;\n  overflow: visible;\n  box-shadow: 0 4px 16px #00000012;\n}\n\n.dsh-wp-node.is-selected {\n  outline: 2px solid var(--wp-accent);\n  outline-offset: 1px;\n}\n\n.dsh-wp-node strong {\n  color: var(--wp-text);\n  overflow-wrap: anywhere;\n  margin: 4px 0;\n  display: block;\n}\n\n.dsh-wp-node p {\n  color: var(--wp-muted);\n  -webkit-line-clamp: 2;\n  overflow-wrap: anywhere;\n  -webkit-box-orient: vertical;\n  margin: 4px 0 0;\n  font-size: 11px;\n  display: -webkit-box;\n  overflow: hidden;\n}\n\n.dsh-wp-node-kind {\n  color: var(--wp-accent);\n  font-size: 10px;\n}\n\n.dsh-wp-node-file {\n  border-color: var(--dsw-alias-state-success-secondary, #9ed1b7);\n  background: var(--wp-surface-soft);\n}\n\n.dsh-wp-node-prompt {\n  border-color: var(--dsw-alias-label-tertiary, #cbb8ee);\n  background: var(--wp-surface-soft);\n}\n\n.dsh-wp-node-add-wrap {\n  z-index: 2;\n  margin-top: 9px;\n  display: flex;\n  position: relative;\n}\n\n.dsh-wp-node-add {\n  border-color: var(--wp-border) !important;\n  min-height: 28px !important;\n  color: var(--wp-accent) !important;\n  padding: 4px 8px !important;\n  font-size: 11px !important;\n}\n\n.dsh-wp-node-add-menu {\n  z-index: 10;\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface-raised);\n  border-radius: 9px;\n  gap: 3px;\n  min-width: 145px;\n  padding: 5px;\n  display: grid;\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  box-shadow: 0 7px 22px #0003;\n}\n\n.dsh-wp-node-add-menu button {\n  text-align: left;\n  border: 0 !important;\n  min-height: 30px !important;\n}\n\n.dsh-wp-revision-note, .dsh-wp-reused-result {\n  border: 1px solid var(--wp-border);\n  border-left: 3px solid var(--wp-accent);\n  color: var(--wp-muted);\n  background: var(--wp-surface-soft);\n  overflow-wrap: anywhere;\n  border-radius: 8px;\n  margin: 8px 0;\n  padding: 9px 12px;\n  font-size: 12px;\n  line-height: 1.55;\n}\n\n.dsh-wp-command-draft {\n  border: 1px solid var(--wp-border);\n  border-left: 3px solid var(--wp-accent);\n  color: var(--wp-text);\n  background: var(--wp-surface-soft);\n  border-radius: 9px;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin: 8px 0;\n  padding: 11px 13px;\n  display: flex;\n}\n\n.dsh-wp-command-draft p, .dsh-wp-command-draft small {\n  color: var(--wp-muted);\n  overflow-wrap: anywhere;\n  margin: 4px 0 0;\n  font-size: 12px;\n  line-height: 1.5;\n  display: block;\n}\n\n.dsh-wp-command-draft > div:last-child {\n  flex-wrap: wrap;\n  gap: 7px;\n  display: flex;\n}\n\n.dsh-wp-command-draft.is-active {\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n.dsh-wp-command-draft.is-active span {\n  color: var(--wp-muted);\n  font-size: 12px;\n}\n\n.dsh-wp-edit-diff {\n  background: var(--wp-surface);\n  border-radius: 7px;\n  flex-direction: column;\n  gap: 3px;\n  width: 100%;\n  max-height: 180px;\n  padding: 8px 10px;\n  font-size: 12px;\n  display: flex;\n  overflow: auto;\n}\n\n.dsh-wp-edit-diff p {\n  color: var(--wp-text);\n  overflow-wrap: anywhere;\n  margin: 0;\n}\n\n.dsh-wp-node .react-flow__handle {\n  border: 2px solid var(--wp-surface);\n  background: var(--wp-accent);\n  width: 10px;\n  height: 10px;\n}\n\n.dsh-wp-context-menu {\n  z-index: 100;\n  border: 1px solid var(--wp-border);\n  background: var(--wp-surface-raised);\n  border-radius: 9px;\n  min-width: 155px;\n  padding: 5px;\n  position: fixed;\n  box-shadow: 0 7px 24px #0004;\n}\n\n.dsh-wp-context-menu button {\n  text-align: left;\n  border: 0;\n  width: 100%;\n}\n\n@media (width <= 1150px) {\n  .dsh-wp-root {\n    padding: 13px;\n  }\n\n  .dsh-wp-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .dsh-wp-toolbar {\n    justify-content: flex-start;\n  }\n\n  .dsh-wp-workarea.has-inspector {\n    grid-template-columns: minmax(0, 1fr) minmax(285px, 320px);\n  }\n\n  .dsh-wp-settings-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .dsh-wp-settings-grid .is-wide {\n    grid-column: 1 / -1;\n  }\n}\n\n@media (width <= 860px) {\n  .dsh-wp-onboarding {\n    grid-template-columns: 1fr;\n  }\n\n  .dsh-wp-node-guide {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    display: grid;\n  }\n\n  .dsh-wp-edge-guide {\n    grid-column: 1 / -1;\n  }\n\n  .dsh-wp-workarea.has-inspector {\n    min-height: 460px;\n    display: block;\n  }\n\n  .dsh-wp-workarea.has-inspector .dsh-wp-canvas {\n    position: absolute;\n    inset: 0;\n  }\n\n  .dsh-wp-workarea.has-inspector .dsh-wp-inspector {\n    z-index: 8;\n    width: min(390px, 100% - 16px);\n    max-height: calc(100% - 16px);\n    position: absolute;\n    top: 8px;\n    bottom: 8px;\n    right: 8px;\n    box-shadow: 0 8px 28px #0004;\n  }\n}\n\n@media (width <= 620px) {\n  .dsh-wp-root {\n    gap: 10px;\n    padding: 10px;\n  }\n\n  .dsh-wp-toolbar, .dsh-wp-actions, .dsh-wp-home-actions {\n    align-items: stretch;\n  }\n\n  .dsh-wp-toolbar > select {\n    width: 100%;\n  }\n\n  .dsh-wp-theme-control {\n    justify-content: space-between;\n  }\n\n  .dsh-wp-actions {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .dsh-wp-actions-group {\n    justify-content: flex-start;\n  }\n\n  .dsh-wp-settings-grid {\n    grid-template-columns: 1fr;\n    padding: 11px;\n  }\n\n  .dsh-wp-settings-grid .is-wide {\n    grid-column: auto;\n  }\n\n  .dsh-wp-node-guide {\n    grid-template-columns: 1fr;\n  }\n\n  .dsh-wp-edge-guide {\n    grid-column: auto;\n  }\n\n  .dsh-wp-workarea, .dsh-wp-workarea.has-inspector {\n    min-height: 480px;\n  }\n\n  .dsh-wp-workflow-row {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .dsh-wp-workflow-row small {\n    white-space: normal;\n    max-width: 100%;\n  }\n\n  .dsh-wp-command-draft {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n";
    //#endregion
    //#region src/domain/run-progress.ts
    function taskProgressState(task) {
    	if (!task) return "pending";
    	const attempt = task.attempts.at(-1);
    	if (task.state === "running") return attempt?.activity?.phase ?? "running";
    	if (task.state === "pending" && attempt && ["cancelled", "interrupted"].includes(attempt.state)) return attempt.state;
    	return task.state;
    }
    function taskProgressLabel(state) {
    	return {
    		pending: "待执行",
    		running: "执行中",
    		starting: "正在启动",
    		thinking: "模型处理中",
    		tool: "工具执行中",
    		waiting_permission: "等待授权",
    		checking: "检查产物",
    		stalled: "暂未收到新活动",
    		stopping: "正在停止",
    		needs_review: "待人工验收",
    		succeeded: "已完成",
    		failed: "失败",
    		skipped: "依赖未满足",
    		cancelled: "已取消",
    		interrupted: "已中断",
    		outdated: "旧修订结果"
    	}[state] ?? state;
    }
    /** Counts come from the immutable execution graph, never from canvas order. */
    function workflowProgress(run) {
    	const ordered = topologicalTasks(run.workflow);
    	const currentTask = ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === "running") ?? ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === "needs_review") ?? ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === "failed");
    	const recorded = currentTask ? run.tasks.find((task) => task.taskId === currentTask.id) : void 0;
    	const attempt = recorded?.attempts.at(-1);
    	return {
    		total: ordered.length,
    		completed: run.tasks.filter((task) => task.state === "succeeded").length,
    		currentTask,
    		currentIndex: currentTask ? ordered.findIndex((task) => task.id === currentTask.id) + 1 : 0,
    		currentState: recorded?.state,
    		activity: recorded?.state === "running" ? attempt?.activity : void 0,
    		latestActivityAt: Math.max(run.startedAt, ...run.events.map((event) => event.at), ...run.tasks.map((task) => task.attempts.at(-1)?.activity?.at ?? 0))
    	};
    }
    //#endregion
    //#region src/client/workflow-chat.tsx
    function NativeChatView({ renderSlot }) {
    	return renderSlot("conversation.session", { view: "chat" });
    }
    function WorkflowChatScope({ reference, SessionProvider, renderSlot }) {
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionProvider, {
    		session: reference,
    		children: renderSlot("dsh.workflow.chat.body", {})
    	});
    }
    function registerWorkflowChat(ctx) {
    	ctx.slots.registerFactory({
    		name: "dsh.workflow.chat",
    		scope: "root",
    		children: { "dsh.workflow.chat.body": {
    			kind: "single",
    			scope: "session"
    		} }
    	}, WorkflowChatScope);
    	ctx.slots.inject("dsh.workflow.chat.body", () => ctx.slots.register({
    		name: "dsh.workflow.chat.body",
    		registrant: "dsh-workflow-plugin"
    	}, ({ renderFactorySlot }) => renderFactorySlot("conversation.content", {
    		variant: "embedded",
    		phase: "active",
    		hero: false
    	}, { slots: { views: NativeChatView } })));
    }
    function taskSessionTarget(run, attempt) {
    	if (!attempt?.agentId || attempt.activity?.phase === "starting") return void 0;
    	const parent = attempt.agentParentSessionId === void 0 ? run?.sessionId : attempt.agentParentSessionId;
    	return parent ? {
    		parentSessionId: parent,
    		childSessionId: attempt.agentId,
    		mode: "unknown"
    	} : attempt.agentId;
    }
    /** DSH removes disposed Agents from its live client catalog. Refresh the
    * durable catalog before retaining an ordinary execution history again. */
    async function retainWorkflowSession(sessions, target, signal) {
    	signal.throwIfAborted();
    	if (typeof target === "string" && !sessions.list.getSnapshot().byId[target]) await sessions.refresh();
    	signal.throwIfAborted();
    	return sessions.retain(target, {
    		source: "dshWorkflow",
    		signal
    	});
    }
    function NativeSessionChat({ ctx, target, renderFactorySlot }) {
    	const sessionId = typeof target === "string" ? target : target.childSessionId;
    	const parentSessionId = typeof target === "string" ? void 0 : target.parentSessionId;
    	const [reference, setReference] = (0, react.useState)();
    	const [error, setError] = (0, react.useState)("");
    	const [retry, setRetry] = (0, react.useState)(0);
    	(0, react.useEffect)(() => {
    		let current = true;
    		let retained;
    		const controller = new AbortController();
    		setReference(void 0);
    		setError("");
    		(async () => {
    			const exactReference = await retainWorkflowSession(ctx.sessions, parentSessionId ? {
    				parentSessionId,
    				childSessionId: sessionId,
    				mode: "unknown"
    			} : sessionId, controller.signal);
    			if (!current) {
    				exactReference.release();
    				return;
    			}
    			retained = exactReference;
    			await exactReference.ready;
    			if (current) setReference(exactReference);
    		})().catch((cause) => {
    			if (current) setError(cause instanceof Error ? cause.message : String(cause));
    		});
    		return () => {
    			current = false;
    			controller.abort();
    			retained?.release();
    		};
    	}, [
    		ctx,
    		sessionId,
    		parentSessionId,
    		retry
    	]);
    	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-chat-error",
    		role: "alert",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    			"会话暂不可用：",
    			error,
    			"。已保存的节点回复仍显示在执行记录中。"
    		] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    			onClick: () => setRetry((value) => value + 1),
    			children: "重新连接"
    		})]
    	});
    	if (!reference || reference.sessionId !== sessionId) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    		role: "status",
    		children: "正在连接对话…"
    	});
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: renderFactorySlot("dsh.workflow.chat", { reference }) });
    }
    function WorkflowConversation({ ctx, sessionId, run, taskId, taskSelection, onTask, renderFactorySlot, residentComposer }) {
    	const [tab, setTab] = (0, react.useState)("main");
    	const task = run?.tasks.find((entry) => entry.taskId === taskId);
    	const attempt = task?.attempts.at(-1);
    	const node = run?.workflow.nodes.find((entry) => entry.id === taskId);
    	(0, react.useEffect)(() => {
    		if (taskId) setTab("task");
    	}, [taskId, taskSelection]);
    	const target = tab === "main" ? sessionId : taskSessionTarget(run, attempt);
    	const targetKey = typeof target === "string" ? target : target ? `${target.parentSessionId}:${target.childSessionId}` : "";
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
    		className: "dsh-wp-conversation",
    		"aria-label": "工作流对应的实际对话",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "对话与执行" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-chat-tabs",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					"aria-pressed": tab === "main",
    					onClick: () => setTab("main"),
    					children: "主对话"
    				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					"aria-pressed": tab === "task",
    					disabled: !run,
    					onClick: () => setTab("task"),
    					children: "节点执行"
    				})]
    			})] }),
    			run && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-task-timeline",
    				"aria-label": "节点执行顺序",
    				children: topologicalTasks(run.workflow).map((entry) => {
    					const state = taskProgressState(run.tasks.find((item) => item.taskId === entry.id));
    					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						className: `is-${state}${taskId === entry.id && tab === "task" ? " is-selected" : ""}`,
    						onClick: () => {
    							onTask(entry.id);
    							setTab("task");
    						},
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: entry.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: taskProgressLabel(state) })]
    					}, entry.id);
    				})
    			}),
    			tab === "task" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-task-conversation-summary",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: node?.title ?? "选择一个节点查看执行过程" }),
    					attempt && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    						"第 ",
    						attempt.number,
    						" 次尝试 · ",
    						taskProgressLabel(taskProgressState(task))
    					] }),
    					task?.reusedFromRunId && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "此节点复用了已核验的历史结果，没有创建新的执行会话。" }),
    					attempt?.activity && task?.state === "running" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    						role: "status",
    						children: attempt.activity.message
    					}),
    					attempt?.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    						role: "alert",
    						children: attempt.error
    					}),
    					attempt?.messages?.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
    						open: !target,
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
    							"已保存的节点回复（",
    							attempt.messages.length,
    							"）"
    						] }), attempt.messages.map((message, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    							className: "dsh-wp-saved-message",
    							children: message.text
    						}, `${message.at}-${index}`))]
    					}) : task?.result ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    						className: "dsh-wp-saved-message",
    						children: task.result
    					}) : null
    				]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: `dsh-wp-native-chat${tab === "task" && target ? " is-task-chat" : ""}`,
    				"data-resident-composer": residentComposer && tab === "main",
    				children: target && renderFactorySlot ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NativeSessionChat, {
    					ctx,
    					target,
    					renderFactorySlot
    				}, targetKey) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    					className: "dsh-wp-empty",
    					children: tab === "main" ? "在会话的“工作流”入口打开，可在这里查看原有聊天。" : "任务开始后，这里显示该节点的真实回复、工具调用和授权请求。"
    				})
    			})
    		]
    	});
    }
    //#endregion
    //#region src/client/run-sync.ts
    /** Sequential polling with bounded requests and guards against late cross-view replies. */
    function watchRun(options) {
    	let disposed = false;
    	let timer;
    	let requestTimer;
    	let abandon;
    	const poll = async () => {
    		try {
    			const value = await Promise.race([Promise.resolve().then(options.read), new Promise((_, reject) => {
    				abandon = () => reject(/* @__PURE__ */ new Error("状态同步已结束。"));
    				requestTimer = setTimeout(() => reject(/* @__PURE__ */ new Error("运行状态同步超时；正在重新连接。")), options.timeoutMs ?? 8e3);
    			})]);
    			if (!disposed) options.onData(value);
    		} catch (error) {
    			if (!disposed) options.onError(error);
    		} finally {
    			clearTimeout(requestTimer);
    			abandon = void 0;
    			if (!disposed) timer = setTimeout(() => void poll(), options.intervalMs ?? 1e3);
    		}
    	};
    	poll();
    	return () => {
    		disposed = true;
    		clearTimeout(timer);
    		clearTimeout(requestTimer);
    		abandon?.();
    	};
    }
    //#endregion
    //#region src/client/run-progress.tsx
    function RunProgress({ run, syncError = "", onTask, onStop }) {
    	const [now, setNow] = (0, react.useState)(Date.now());
    	const progress = workflowProgress(run);
    	const live = [
    		"queued",
    		"running",
    		"pausing",
    		"paused",
    		"verifying",
    		"stopping"
    	].includes(run.state);
    	(0, react.useEffect)(() => {
    		setNow(Date.now());
    		if (!live) return;
    		const timer = setInterval(() => setNow(Date.now()), 1e3);
    		return () => clearInterval(timer);
    	}, [live, run.id]);
    	const age = Math.max(0, Math.floor(((live ? now : run.endedAt || now) - progress.latestActivityAt) / 1e3));
    	const status = {
    		queued: "等待调度",
    		running: "运行中",
    		pausing: "等待任务边界暂停",
    		paused: "已暂停",
    		verifying: "检查结果",
    		stopping: "正在停止",
    		failed: "运行失败",
    		cancelled: "已停止",
    		interrupted: "已中断",
    		needs_review: "等待验收",
    		accepted: "验收通过",
    		completed: "已完成"
    	}[run.state] ?? run.state;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    		className: `dsh-wp-progress is-${run.state}`,
    		"aria-label": "真实运行进度",
    		"aria-live": "polite",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-progress-heading",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
    						"已完成 ",
    						progress.completed,
    						"/",
    						progress.total,
    						" 个任务"
    					] }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: status }),
    					live && onStop && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						disabled: run.state === "stopping",
    						onClick: onStop,
    						children: run.state === "stopping" ? "正在停止…" : "停止"
    					})
    				]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-progress-track",
    				role: "progressbar",
    				"aria-valuemin": 0,
    				"aria-valuemax": progress.total,
    				"aria-valuenow": progress.completed,
    				"aria-label": "已通过任务验收的数量",
    				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { width: `${progress.total ? progress.completed / progress.total * 100 : 0}%` } })
    			}),
    			progress.currentTask && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    				className: "dsh-wp-progress-current",
    				onClick: () => onTask(progress.currentTask.id),
    				children: [
    					"第 ",
    					progress.currentIndex,
    					" 个任务：",
    					progress.currentTask.title,
    					" → 查看对应对话"
    				]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: syncError || (run.state === "stopping" ? run.error || "正在等待 Agent 退出；后续任务与重试已锁定。" : progress.currentState === "needs_review" ? "当前任务已结束，等待人工验收；请核对产物后点击“通过此任务”。" : progress.activity && live ? progress.activity.message : run.error || status) }),
    			live && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: syncError ? "当前显示的是最后一次已同步的状态。" : `最近真实活动：${age} 秒前${progress.activity ? ` · ${taskProgressLabel(progress.activity.phase)}` : ""}` }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-progress-legend",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "灰：待执行" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "蓝：执行中" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "黄：等待或验收" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "绿：通过" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "红：失败" })
    				]
    			})
    		]
    	});
    }
    //#endregion
    //#region src/client/run-state.ts
    const runs = /* @__PURE__ */ new Map();
    const listeners = /* @__PURE__ */ new Map();
    function latestSessionRun(sessionId) {
    	return runs.get(sessionId);
    }
    function publishSessionRun(sessionId, run) {
    	if (runs.get(sessionId) === run) return;
    	if (run) runs.set(sessionId, run);
    	else runs.delete(sessionId);
    	for (const listener of listeners.get(sessionId) ?? []) listener();
    }
    function subscribeSessionRun(sessionId, listener) {
    	const subscribers = listeners.get(sessionId) ?? /* @__PURE__ */ new Set();
    	subscribers.add(listener);
    	listeners.set(sessionId, subscribers);
    	return () => {
    		subscribers.delete(listener);
    		if (!subscribers.size) listeners.delete(sessionId);
    	};
    }
    function clearSessionRuns() {
    	runs.clear();
    	listeners.clear();
    }
    //#endregion
    //#region src/client/index.tsx
    const PANEL_ID = "dsh-workflow";
    const SESSION_PANEL_ID = "dsh-workflow-session";
    const CONVERSATION_VIEW_ID = "dsh-workflow";
    const DEFAULT_TASKS = [{
    	title: "任务 1",
    	instructions: "写明要做的事情、执行步骤和完成标准。"
    }];
    const name = "dsh-workflow-plugin-client";
    const inject = [
    	"remote",
    	"layout",
    	"slots",
    	"theme",
    	"commandUi",
    	"sessions"
    ];
    let requestedSessionId;
    const requestedTaskIds = /* @__PURE__ */ new Map();
    const requestedSessionListeners = /* @__PURE__ */ new Set();
    const retainedEditorState = /* @__PURE__ */ new Map();
    const sessionDraftListeners = /* @__PURE__ */ new Map();
    const commandSessions = /* @__PURE__ */ new Map();
    const clientId = `client-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const editorStatusSequences = /* @__PURE__ */ new Map();
    const parkedEditors = /* @__PURE__ */ new Map();
    function subscribeRequestedSession(listener) {
    	requestedSessionListeners.add(listener);
    	return () => requestedSessionListeners.delete(listener);
    }
    function getRequestedSession() {
    	return requestedSessionId;
    }
    function subscribeSessionDraft(sessionId, listener) {
    	const listeners = sessionDraftListeners.get(sessionId) ?? /* @__PURE__ */ new Set();
    	listeners.add(listener);
    	sessionDraftListeners.set(sessionId, listeners);
    	return () => {
    		listeners.delete(listener);
    		if (!listeners.size) sessionDraftListeners.delete(sessionId);
    	};
    }
    function notifySessionDraft(sessionId) {
    	for (const listener of sessionDraftListeners.get(sessionId) ?? []) listener();
    }
    function requestSessionPanel(ctx, sessionId, taskId = "") {
    	requestedSessionId = sessionId;
    	requestedTaskIds.set(sessionId, taskId);
    	for (const listener of requestedSessionListeners) listener();
    	ctx.layout.selectPanel(SESSION_PANEL_ID);
    }
    function useRetainedState(scope, name, initial) {
    	const key = `${scope}:${name}`;
    	const [value, setValue] = (0, react.useState)(() => retainedEditorState.has(key) ? retainedEditorState.get(key) : initial());
    	return [value, (0, react.useCallback)((next) => {
    		setValue((previous) => {
    			const value = typeof next === "function" ? next(previous) : next;
    			retainedEditorState.set(key, value);
    			while (retainedEditorState.size > 800) retainedEditorState.delete(retainedEditorState.keys().next().value);
    			return value;
    		});
    	}, [key])];
    }
    async function apply(ctx) {
    	let remoteFailure = "";
    	let workflowRemote;
    	try {
    		await ctx.remote.$mount(TYPERT_REMOTE);
    		await ctx.inject(["remote.dshWorkflow"], async (remoteCtx) => {
    			workflowRemote = remoteCtx.remote.dshWorkflow;
    			if (remoteCtx.get("remote.directoryPicker")) await remoteCtx.inject(["remote.directoryPicker"], (directoryPickerCtx) => {
    				registerWorkflowUI(directoryPickerCtx, workflowRemote, "");
    			});
    			else registerWorkflowUI(remoteCtx, workflowRemote, "");
    		});
    	} catch (cause) {
    		remoteFailure = `DSH Remote 初始化失败：${errorMessage(cause)}`;
    		registerWorkflowUI(ctx, workflowRemote, remoteFailure);
    	}
    }
    function registerWorkflowUI(ctx, remoteApi, remoteFailure) {
    	registerWorkflowChat(ctx);
    	const style = document.createElement("style");
    	style.dataset.dshWorkflowPlugin = "styles";
    	style.textContent = `${style_default}\n${workflow_default}`;
    	document.head.append(style);
    	ctx.effect(() => () => style.remove());
    	ctx.effect(() => {
    		const dispose = ctx.on("session/event", (session, event) => {
    			const payload = event.data;
    			if (event.type === "command/run" && payload.name === "powernode" && payload.commandId) {
    				commandSessions.set(payload.commandId, session.id);
    				const args = event.data.args ?? "";
    				publishPowernodeCommandStatus(session.id, {
    					commandId: payload.commandId,
    					kind: /^\s*edit\b/iu.test(args) ? "proposal" : "draft",
    					phase: "generating"
    				});
    				return;
    			}
    			if (event.type === "command/done" && payload.commandId) {
    				const sessionId = commandSessions.get(payload.commandId);
    				commandSessions.delete(payload.commandId);
    				if (sessionId) {
    					const previous = getPowernodeCommandStatus(sessionId);
    					const text = event.data.text ?? "";
    					const cancelled = payload.kind !== "success" && /取消|aborted|abort/iu.test(text);
    					publishPowernodeCommandStatus(sessionId, {
    						commandId: payload.commandId,
    						kind: previous?.commandId === payload.commandId ? previous.kind : "draft",
    						phase: payload.kind === "success" ? "complete" : cancelled ? "cancelled" : "failed",
    						message: text
    					});
    					if (payload.kind === "success") notifySessionDraft(sessionId);
    				}
    			}
    		});
    		return () => {
    			dispose();
    			commandSessions.clear();
    			clearPowernodeCommandStatuses();
    			clearSessionRuns();
    			requestedTaskIds.clear();
    			sessionDraftListeners.clear();
    		};
    	});
    	ctx.slots.inject("main", () => ctx.slots.register({
    		name: "main",
    		key: PANEL_ID,
    		registrant: "dsh-workflow-plugin"
    	}, ({ renderFactorySlot }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkflowPanel, {
    		ctx,
    		remoteFailure,
    		remoteApi,
    		renderFactorySlot
    	})));
    	ctx.slots.inject("main", () => ctx.slots.register({
    		name: "main",
    		key: SESSION_PANEL_ID,
    		registrant: "dsh-workflow-plugin"
    	}, ({ renderFactorySlot }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionWorkflowPanel, {
    		ctx,
    		remoteFailure,
    		remoteApi,
    		renderFactorySlot
    	})));
    	ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    		name: "sidebar.panellist",
    		id: PANEL_ID,
    		order: 45,
    		label: "工作流",
    		registrant: "dsh-workflow-plugin"
    	}, ({ size }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
    		className: "dsh-wp-sidebar-icon",
    		style: {
    			width: size,
    			height: size
    		},
    		"aria-hidden": "true",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
    		]
    	})));
    	ctx.slots.inject("conversation.view", () => ctx.slots.register({
    		name: "conversation.view",
    		id: CONVERSATION_VIEW_ID,
    		order: 40,
    		label: () => "工作流"
    	}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkflowWorkspaceEntry, {
    		ctx,
    		sessionId: props.sessionId,
    		openView: props.openView
    	}, props.sessionId)));
    	ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
    		name: "conversation.session.header.actions",
    		id: "dsh-workflow-pending-action",
    		order: 70,
    		registrant: "dsh-workflow-plugin"
    	}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PendingWorkflowAction, {
    		remoteApi,
    		sessionId: props.sessionId,
    		selectView: () => requestSessionPanel(ctx, props.sessionId)
    	})));
    	ctx.slots.inject("conversation.header.leading", () => ctx.slots.register({
    		name: "conversation.header.leading",
    		registrant: "dsh-workflow-plugin"
    	}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LatestCommandProgressAction, { onOpen: (sessionId) => requestSessionPanel(ctx, sessionId) })));
    	ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({
    		name: "conversation.input.dock",
    		id: "dsh-workflow-run-progress",
    		order: 30,
    		registrant: "dsh-workflow-plugin"
    	}, ({ sessionId }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionRunDock, {
    		ctx,
    		remoteApi,
    		sessionId
    	})));
    	ctx.effect(() => ctx.commandUi.decorate({
    		name: "powernode",
    		available: () => true,
    		ui: {
    			kind: "action",
    			run: (session) => requestSessionPanel(ctx, session.sessionId)
    		}
    	}));
    }
    function LatestCommandProgressAction({ onOpen }) {
    	const latest = (0, react.useSyncExternalStore)(subscribeLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus);
    	if (!latest) return null;
    	const { status, sessionId } = latest;
    	const label = status.kind === "proposal" ? "编辑建议" : "工作流草稿";
    	if (status.phase === "generating") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
    			"正在生成",
    			label,
    			"…"
    		] })
    	});
    	if (status.phase === "failed" || status.phase === "cancelled") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: status.phase === "cancelled" ? `${label}\u751f\u6210\u5df2\u53d6\u6d88` : `${label}\u751f\u6210\u5931\u8d25` }),
    			status.message && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: "查看命令结果" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: status.message })] }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    				className: "dsh-wp-header-action",
    				onClick: () => onOpen(sessionId),
    				children: "返回命令会话"
    			})
    		]
    	});
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [label, "已生成，归属于命令所在会话"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    			className: "dsh-wp-header-action",
    			onClick: () => onOpen(sessionId),
    			children: status.kind === "proposal" ? "查看编辑建议" : "打开工作流草稿"
    		})]
    	});
    }
    function PendingWorkflowAction({ remoteApi, sessionId, selectView }) {
    	const [kind, setKind] = (0, react.useState)();
    	const [refreshSequence, setRefreshSequence] = (0, react.useState)(0);
    	const [commandStatus, setCommandStatus] = (0, react.useState)(() => getPowernodeCommandStatus(sessionId));
    	(0, react.useEffect)(() => subscribeSessionDraft(sessionId, () => setRefreshSequence((value) => value + 1)), [sessionId]);
    	(0, react.useEffect)(() => {
    		setCommandStatus(getPowernodeCommandStatus(sessionId));
    		return subscribePowernodeCommandStatus(sessionId, () => setCommandStatus(getPowernodeCommandStatus(sessionId)));
    	}, [sessionId]);
    	(0, react.useEffect)(() => {
    		let current = true;
    		if (!remoteApi) return () => {
    			current = false;
    		};
    		remoteApi.sessionState(sessionId).then((result) => {
    			if (!current) return;
    			const state = unwrap(result);
    			setKind(state.editProposal ? "proposal" : state.commandDraft ? "draft" : void 0);
    		}).catch(() => {
    			if (current) setKind(void 0);
    		});
    		return () => {
    			current = false;
    		};
    	}, [
    		remoteApi,
    		refreshSequence,
    		sessionId
    	]);
    	const actionKind = commandStatus?.kind ?? kind;
    	if (commandStatus?.phase === "generating") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
    			"正在生成",
    			actionKind === "proposal" ? "编辑建议" : "工作流草稿",
    			"…"
    		] })
    	});
    	if (commandStatus?.phase === "failed" || commandStatus?.phase === "cancelled") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: commandStatus.phase === "cancelled" ? "工作流生成已取消。" : `${actionKind === "proposal" ? "编辑建议" : "工作流草稿"}生成失败。` }), commandStatus.message && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: "查看命令结果" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: commandStatus.message })] })]
    	});
    	if (commandStatus?.phase === "complete") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-command-progress",
    		role: "status",
    		"aria-live": "polite",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: actionKind === "proposal" ? "编辑建议已生成；原流程尚未修改。" : "工作流草稿已生成；尚未保存或运行。" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    			className: "dsh-wp-header-action",
    			onClick: () => selectView(CONVERSATION_VIEW_ID),
    			children: actionKind === "proposal" ? "查看编辑建议" : "打开工作流草稿"
    		})]
    	});
    	if (!kind) return null;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    		className: "dsh-wp-header-action",
    		onClick: () => selectView(CONVERSATION_VIEW_ID),
    		children: kind === "proposal" ? "查看编辑建议" : "查看工作流草稿"
    	});
    }
    function WorkflowWorkspaceEntry({ ctx, sessionId, openView }) {
    	const open = (0, react.useCallback)(() => {
    		requestSessionPanel(ctx, sessionId);
    		openView("chat", "");
    	}, [
    		ctx,
    		sessionId,
    		openView
    	]);
    	(0, react.useEffect)(open, [open]);
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    		onClick: open,
    		children: "打开工作流与对应对话"
    	});
    }
    function SessionWorkflowPanel({ ctx, remoteFailure, remoteApi, renderFactorySlot }) {
    	const sessionId = (0, react.useSyncExternalStore)(subscribeRequestedSession, getRequestedSession, getRequestedSession);
    	if (!sessionId) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
    		className: "dsh-wp-root dsh-wp-home",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "请在普通会话中使用 /powernode 打开当前会话的工作流。" })]
    	});
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-session-workspace",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
    			className: "dsh-wp-workspace-navigation",
    			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "当前会话的工作流与对话" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    				onClick: () => ctx.layout.selectPanel("conversation"),
    				children: "返回传统对话"
    			})]
    		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkflowPanel, {
    			ctx,
    			remoteFailure,
    			remoteApi,
    			sessionId,
    			surface: "main",
    			renderFactorySlot
    		}, sessionId)]
    	});
    }
    function SessionRunDock({ ctx, remoteApi, sessionId }) {
    	const subscribe = (0, react.useCallback)((listener) => subscribeSessionRun(sessionId, listener), [sessionId]);
    	const snapshot = (0, react.useCallback)(() => latestSessionRun(sessionId), [sessionId]);
    	const run = (0, react.useSyncExternalStore)(subscribe, snapshot, snapshot);
    	const [syncError, setSyncError] = (0, react.useState)("");
    	(0, react.useEffect)(() => {
    		if (!remoteApi) return;
    		let current = true;
    		const before = latestSessionRun(sessionId);
    		(async () => {
    			try {
    				const state = unwrap(await remoteApi.sessionState(sessionId));
    				const runs = state.workflow ? unwrap(await remoteApi.sessionRuns(sessionId, state.workflow.id)) : [];
    				if (current && latestSessionRun(sessionId) === before) publishSessionRun(sessionId, runs[0]);
    			} catch (cause) {
    				if (current) setSyncError(errorMessage(cause));
    			}
    		})();
    		return () => {
    			current = false;
    		};
    	}, [remoteApi, sessionId]);
    	(0, react.useEffect)(() => {
    		if (!remoteApi || !run || ![
    			"queued",
    			"running",
    			"pausing",
    			"paused",
    			"verifying",
    			"stopping"
    		].includes(run.state)) return;
    		const runId = run.id;
    		const workflowId = run.workflowId;
    		return watchRun({
    			read: () => remoteApi.sessionGetRun(sessionId, {
    				workflowId,
    				runId
    			}).then(unwrap),
    			onData: (next) => {
    				if (latestSessionRun(sessionId)?.id === runId && next.id === runId) {
    					publishSessionRun(sessionId, next);
    					setSyncError("");
    				}
    			},
    			onError: (cause) => setSyncError(errorMessage(cause))
    		});
    	}, [
    		remoteApi,
    		run?.id,
    		run?.state,
    		sessionId
    	]);
    	if (!run) return null;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    		className: "dsh-wp-run-dock",
    		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RunProgress, {
    			run,
    			syncError,
    			onTask: (id) => requestSessionPanel(ctx, sessionId, id)
    		})
    	});
    }
    function WorkflowPanel(props) {
    	const [executionRun, setExecutionRun] = (0, react.useState)();
    	const [chatTaskId, setChatTaskId] = (0, react.useState)(() => props.sessionId ? requestedTaskIds.get(props.sessionId) ?? "" : "");
    	const [focusTaskId, setFocusTaskId] = (0, react.useState)(chatTaskId);
    	const [taskSelection, setTaskSelection] = (0, react.useState)(0);
    	const openTask = (0, react.useCallback)((id) => {
    		setChatTaskId(id);
    		setFocusTaskId(id);
    		setTaskSelection((value) => value + 1);
    	}, []);
    	const receiveRun = (0, react.useCallback)((next) => setExecutionRun(next), []);
    	const hasChat = Boolean(props.sessionId || executionRun);
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    		className: "dsh-wp-workspace-frame",
    		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    			className: `dsh-wp-workspace${hasChat ? " has-chat" : ""}`,
    			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkflowEditor, {
    				...props,
    				onExecutionRun: receiveRun,
    				onTaskConversation: openTask,
    				focusTaskId
    			}), hasChat && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkflowConversation, {
    				ctx: props.ctx,
    				sessionId: props.sessionId,
    				run: executionRun,
    				taskId: chatTaskId,
    				taskSelection,
    				onTask: openTask,
    				renderFactorySlot: props.renderFactorySlot,
    				residentComposer: props.surface !== "main" && Boolean(props.sessionId)
    			})]
    		})
    	});
    }
    function WorkflowEditor({ ctx, remoteFailure, remoteApi, sessionId, surface = "conversation", onExecutionRun, onTaskConversation, focusTaskId }) {
    	const remote = remoteApi;
    	const [items, setItems] = (0, react.useState)([]);
    	const [pendingProposals, setPendingProposals] = (0, react.useState)([]);
    	const [pendingDrafts, setPendingDrafts] = (0, react.useState)([]);
    	const scopeKey = sessionId ?? "global";
    	const [workflow, setWorkflow] = useRetainedState(scopeKey, "workflow", () => newWorkflow());
    	const [savedSnapshot, setSavedSnapshot] = useRetainedState(scopeKey, "savedSnapshot", () => void 0);
    	const [nodeMeasurements, setNodeMeasurements] = (0, react.useState)(() => /* @__PURE__ */ new Map());
    	const [editing, setEditing] = useRetainedState(scopeKey, "editing", () => false);
    	const [savedWorkflowId, setSavedWorkflowId] = useRetainedState(scopeKey, "savedWorkflowId", () => "");
    	const [selectedNodeId, setSelectedNodeId] = useRetainedState(scopeKey, "selectedNodeId", () => "");
    	const [inspectorOpen, setInspectorOpen] = useRetainedState(scopeKey, "inspectorOpen", () => false);
    	const [settingsOpen, setSettingsOpen] = useRetainedState(scopeKey, "settingsOpen", () => false);
    	const [nodeMenu, setNodeMenu] = (0, react.useState)();
    	const [flowInstance, setFlowInstance] = (0, react.useState)(null);
    	const [run, setRun] = useRetainedState(scopeKey, "run", () => void 0);
    	const [preview, setPreview] = useRetainedState(scopeKey, "preview", () => void 0);
    	const [error, setError] = useRetainedState(scopeKey, "error", () => remoteFailure);
    	const [notice, setNotice] = useRetainedState(scopeKey, "notice", () => "");
    	const [sessionAssociationRevision, setSessionAssociationRevision] = useRetainedState(scopeKey, "associationRevision", () => 0);
    	const [sessionWorkspaceDirectory, setSessionWorkspaceDirectory] = useRetainedState(scopeKey, "workspaceDirectory", () => "");
    	const [commandDraft, setCommandDraft] = useRetainedState(scopeKey, "commandDraft", () => void 0);
    	const [activeCommandDraftId, setActiveCommandDraftId] = useRetainedState(scopeKey, "activeCommandDraftId", () => "");
    	const [editProposal, setEditProposal] = useRetainedState(scopeKey, "editProposal", () => void 0);
    	const [activeEditProposalId, setActiveEditProposalId] = useRetainedState(scopeKey, "activeEditProposalId", () => "");
    	const [folderPickerTarget, setFolderPickerTarget] = (0, react.useState)();
    	const [folderPickerPath, setFolderPickerPath] = (0, react.useState)("");
    	const [folderPickerParent, setFolderPickerParent] = (0, react.useState)();
    	const [folderPickerDirectories, setFolderPickerDirectories] = (0, react.useState)([]);
    	const [folderPickerRoot, setFolderPickerRoot] = (0, react.useState)();
    	const [folderPickerError, setFolderPickerError] = (0, react.useState)("");
    	const [folderPickerBusy, setFolderPickerBusy] = (0, react.useState)(false);
    	const folderPickerSequence = (0, react.useRef)(0);
    	const folderPickerAbort = (0, react.useRef)(void 0);
    	(0, react.useEffect)(() => () => {
    		folderPickerSequence.current++;
    		folderPickerAbort.current?.abort();
    	}, []);
    	const [hasParkedEditor, setHasParkedEditor] = (0, react.useState)(() => parkedEditors.has(scopeKey));
    	const [busy, setBusy] = (0, react.useState)(Boolean(remoteFailure) || Boolean(sessionId));
    	const [runSyncError, setRunSyncError] = (0, react.useState)("");
    	const [theme, setTheme] = (0, react.useState)(() => ctx.theme.getTheme());
    	const currentRun = run?.workflowId === workflow.id ? run : void 0;
    	const active = currentRun !== void 0 && [
    		"queued",
    		"running",
    		"pausing",
    		"verifying",
    		"stopping"
    	].includes(currentRun.state);
    	(0, react.useEffect)(() => {
    		if (currentRun && !active && notice === "运行快照已保存；任务会按依赖顺序由 DSH Agent 串行处理。") setNotice("");
    	}, [
    		currentRun,
    		active,
    		notice,
    		setNotice
    	]);
    	const runLocked = active || currentRun?.state === "paused";
    	const revisionNeedsApply = Boolean(currentRun && savedWorkflowId === workflow.id && workflow.revision > currentRun.workflow.revision);
    	const selectedNode = workflow.nodes.find((node) => node.id === selectedNodeId);
    	(0, react.useEffect)(() => {
    		onExecutionRun(currentRun);
    	}, [currentRun, onExecutionRun]);
    	(0, react.useEffect)(() => {
    		if (sessionId && currentRun) publishSessionRun(sessionId, currentRun);
    	}, [currentRun, sessionId]);
    	(0, react.useEffect)(() => {
    		if (focusTaskId && workflow.nodes.some((node) => node.id === focusTaskId)) {
    			setSelectedNodeId(focusTaskId);
    			setInspectorOpen(true);
    		}
    	}, [focusTaskId, workflow.nodes]);
    	const taskNodes = workflow.nodes.filter((node) => node.type === "task");
    	const canEdit = !active;
    	const canEditSettings = canEdit && !editProposal;
    	const proposalDiff = editProposal ? buildUiEditDiff(editProposal.baseWorkflow, workflow) : void 0;
    	const hasUnsavedCanvasChanges = hasWorkflowChangesSinceSnapshot(workflow, savedSnapshot);
    	const initialPromptOnlyDraft = canGenerateFromInitialPrompt(workflow, savedSnapshot, savedWorkflowId);
    	const activeEditProposalIdRef = (0, react.useRef)(activeEditProposalId);
    	activeEditProposalIdRef.current = activeEditProposalId;
    	const editorStateRef = (0, react.useRef)({
    		workflow,
    		savedSnapshot,
    		editing,
    		savedWorkflowId,
    		selectedNodeId,
    		inspectorOpen,
    		settingsOpen,
    		run,
    		preview,
    		error,
    		notice
    	});
    	editorStateRef.current = {
    		workflow,
    		savedSnapshot,
    		editing,
    		savedWorkflowId,
    		selectedNodeId,
    		inspectorOpen,
    		settingsOpen,
    		run,
    		preview,
    		error,
    		notice
    	};
    	const runActionInFlight = (0, react.useRef)(false);
    	const browseFolder = (0, react.useCallback)(async (path, workspaceRoot) => {
    		const sequence = ++folderPickerSequence.current;
    		setFolderPickerBusy(true);
    		setFolderPickerError("");
    		try {
    			const result = unwrap(await remote.browseDirectories({
    				path,
    				...workspaceRoot ? { workspaceRoot } : {}
    			}));
    			if (sequence !== folderPickerSequence.current) return;
    			setFolderPickerPath(result.path);
    			setFolderPickerParent(result.parentPath);
    			setFolderPickerDirectories(result.directories);
    			if (result.truncated) setFolderPickerError("此目录下文件夹超过 500 个，仅显示前 500 项。");
    		} catch (cause) {
    			if (sequence === folderPickerSequence.current) setFolderPickerError(errorMessage(cause));
    		} finally {
    			if (sequence === folderPickerSequence.current) setFolderPickerBusy(false);
    		}
    	}, [remote]);
    	const openFolderPicker = (0, react.useCallback)((target) => {
    		let workspaceRoot;
    		try {
    			if (target === "output") {
    				workspaceRoot = normalizeDirectoryInput(workflow.workspaceDirectory);
    				if (!workspaceRoot) throw new Error("请先填写或选择工作区目录。");
    			}
    			const initialPath = target === "output" ? workspaceRoot : normalizeDirectoryInput(workflow.workspaceDirectory) || sessionWorkspaceDirectory;
    			setFolderPickerTarget(target);
    			setFolderPickerRoot(workspaceRoot);
    			setFolderPickerPath(initialPath);
    			setFolderPickerParent(void 0);
    			setFolderPickerDirectories([]);
    			setFolderPickerError("");
    			browseFolder(initialPath, workspaceRoot);
    		} catch (cause) {
    			setError(errorMessage(cause));
    		}
    	}, [
    		browseFolder,
    		sessionWorkspaceDirectory,
    		setError,
    		workflow.workspaceDirectory
    	]);
    	const pickDirectory = (0, react.useCallback)(async (target) => {
    		if (folderPickerAbort.current) return;
    		if (!ctx.get("remote.directoryPicker")) {
    			const message = "DSH 当前未提供系统目录选择服务，可改用“浏览目录”。";
    			setFolderPickerError(message);
    			setError(message);
    			return;
    		}
    		const sequence = ++folderPickerSequence.current;
    		const controller = new AbortController();
    		folderPickerAbort.current = controller;
    		setFolderPickerBusy(true);
    		setBusy(true);
    		setFolderPickerError("");
    		setError("");
    		try {
    			const selected = unwrap(await ctx.remote.directoryPicker.pick(controller.signal));
    			if (sequence !== folderPickerSequence.current) return;
    			if (selected === null) {
    				setNotice(`${target === "workspace" ? "工作区" : "输出目录"}选择已取消，原路径保持不变。`);
    				return;
    			}
    			const path = normalizeDirectoryInput(selected);
    			const workspaceRoot = target === "output" ? normalizeDirectoryInput(workflow.workspaceDirectory) : void 0;
    			unwrap(await remote.browseDirectories({
    				path,
    				...workspaceRoot ? { workspaceRoot } : {}
    			}));
    			if (sequence !== folderPickerSequence.current) return;
    			setWorkflow((current) => target === "workspace" ? {
    				...current,
    				workspaceDirectory: path,
    				outputDirectory: current.outputDirectory || path
    			} : {
    				...current,
    				outputDirectory: path
    			});
    			setNotice(`${target === "workspace" ? "工作区" : "输出目录"}已选择；点击“保存”后才会保存设置。`);
    			setError("");
    		} catch (cause) {
    			if (sequence === folderPickerSequence.current && !controller.signal.aborted) {
    				const message = `系统文件夹选择失败：${errorMessage(cause)} 可改用“浏览目录”。`;
    				setFolderPickerError(message);
    				setError(message);
    			}
    		} finally {
    			if (sequence === folderPickerSequence.current) {
    				setFolderPickerBusy(false);
    				setBusy(false);
    				if (folderPickerAbort.current === controller) folderPickerAbort.current = void 0;
    			}
    		}
    	}, [
    		ctx,
    		remote,
    		setBusy,
    		setError,
    		setNotice,
    		setWorkflow,
    		workflow.workspaceDirectory
    	]);
    	const chooseFolder = (0, react.useCallback)(() => {
    		if (!folderPickerTarget) return;
    		try {
    			const path = normalizeDirectoryInput(folderPickerPath);
    			setWorkflow((current) => folderPickerTarget === "workspace" ? {
    				...current,
    				workspaceDirectory: path
    			} : {
    				...current,
    				outputDirectory: path
    			});
    			setNotice(`${folderPickerTarget === "workspace" ? "工作区" : "输出目录"}已选择；点击“保存”后才会保存设置。`);
    			setError("");
    			folderPickerSequence.current++;
    			setFolderPickerTarget(void 0);
    		} catch (cause) {
    			setFolderPickerError(errorMessage(cause));
    		}
    	}, [
    		folderPickerPath,
    		folderPickerTarget,
    		setError,
    		setNotice,
    		setWorkflow
    	]);
    	const createOutputDirectory = (0, react.useCallback)(async () => {
    		setBusy(true);
    		setError("");
    		try {
    			const workspaceDirectory = normalizeDirectoryInput(workflow.workspaceDirectory);
    			const outputDirectory = normalizeDirectoryInput(workflow.outputDirectory);
    			const created = unwrap(await remote.createOutputDirectory({
    				workspaceDirectory,
    				outputDirectory
    			}));
    			setWorkflow((current) => ({
    				...current,
    				workspaceDirectory,
    				outputDirectory: created
    			}));
    			setNotice(`已按你的明确请求创建输出目录：${created}。设置尚未保存，也没有启动运行。`);
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		remote,
    		setError,
    		setNotice,
    		setWorkflow,
    		workflow.outputDirectory,
    		workflow.workspaceDirectory
    	]);
    	const openCommandDraft = (0, react.useCallback)((draft, preserveCurrent = true) => {
    		const current = editorStateRef.current;
    		if (preserveCurrent && current.workflow.id !== draft.workflow.id) {
    			parkedEditors.set(scopeKey, current);
    			setHasParkedEditor(true);
    		}
    		setWorkflow(draft.workflow);
    		setSavedSnapshot(void 0);
    		setEditProposal(void 0);
    		setActiveEditProposalId("");
    		setEditing(true);
    		setSavedWorkflowId("");
    		setSelectedNodeId(draft.workflow.nodes[0]?.id ?? "");
    		setInspectorOpen(Boolean(draft.workflow.nodes[0]));
    		setSettingsOpen(false);
    		setRun(void 0);
    		setPreview(void 0);
    		setActiveCommandDraftId(draft.draftId);
    		setNotice(`命令 ${draft.commandId} 的草稿已恢复（修订 ${draft.revision}，模型 ${draft.model}）。检查和编辑后点击“保存”建立会话关联。`);
    		setError("");
    	}, [
    		scopeKey,
    		setActiveCommandDraftId,
    		setActiveEditProposalId,
    		setEditProposal,
    		setEditing,
    		setError,
    		setInspectorOpen,
    		setNotice,
    		setPreview,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setSelectedNodeId,
    		setSettingsOpen,
    		setWorkflow
    	]);
    	const openEditProposal = (0, react.useCallback)((proposal) => {
    		const current = editorStateRef.current;
    		if (Boolean(current.savedWorkflowId && current.savedWorkflowId === current.workflow.id && current.savedSnapshot && JSON.stringify(current.workflow) !== JSON.stringify(current.savedSnapshot)) && current.workflow.id === proposal.workflowId) {
    			setError("当前画布还有未保存修改；为保护这些内容，暂不打开编辑建议。请先保存或撤销画布改动。");
    			return;
    		}
    		setWorkflow(proposal.workflow);
    		setSavedSnapshot(proposal.baseWorkflow);
    		setEditing(true);
    		setSavedWorkflowId(proposal.workflowId);
    		setActiveEditProposalId(proposal.proposalId);
    		setEditProposal(proposal);
    		setSelectedNodeId(proposal.workflow.nodes[0]?.id ?? "");
    		setInspectorOpen(Boolean(proposal.workflow.nodes[0]));
    		setSettingsOpen(false);
    		setRun(void 0);
    		setPreview(void 0);
    		setNotice(`编辑建议 ${proposal.proposalId}：依据已保存修订 ${proposal.baseWorkflowRevision}，模型 ${proposal.model}。应用前原流程保持不变。`);
    		setError("");
    	}, [
    		setActiveEditProposalId,
    		setEditProposal,
    		setEditing,
    		setError,
    		setInspectorOpen,
    		setNotice,
    		setPreview,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setSelectedNodeId,
    		setSettingsOpen,
    		setWorkflow
    	]);
    	const restoreParkedEditor = (0, react.useCallback)(() => {
    		const previous = parkedEditors.get(scopeKey);
    		if (!previous) return;
    		setWorkflow(previous.workflow);
    		setSavedSnapshot(previous.savedSnapshot);
    		setEditing(previous.editing);
    		setSavedWorkflowId(previous.savedWorkflowId);
    		setSelectedNodeId(previous.selectedNodeId);
    		setInspectorOpen(previous.inspectorOpen);
    		setSettingsOpen(previous.settingsOpen);
    		setRun(previous.run);
    		setPreview(previous.preview);
    		setError(previous.error);
    		setNotice(previous.notice);
    		setActiveCommandDraftId("");
    		parkedEditors.delete(scopeKey);
    		setHasParkedEditor(false);
    	}, [
    		scopeKey,
    		setActiveCommandDraftId,
    		setEditing,
    		setError,
    		setInspectorOpen,
    		setNotice,
    		setPreview,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setSelectedNodeId,
    		setSettingsOpen,
    		setWorkflow
    	]);
    	const discardCommandDraft = (0, react.useCallback)(async () => {
    		if (!sessionId || !commandDraft || commandDraft.draftId === activeCommandDraftId) return;
    		setBusy(true);
    		setError("");
    		try {
    			unwrap(await remote.sessionDiscardDraft(sessionId, {
    				draftId: commandDraft.draftId,
    				expectedRevision: commandDraft.revision
    			}));
    			setCommandDraft(void 0);
    			setNotice("未保存的命令草稿已丢弃；当前关联流程和运行记录未更改。");
    		} catch (cause) {
    			setError(errorMessage(cause));
    			try {
    				const state = unwrap(await remote.sessionState(sessionId));
    				setCommandDraft(state.commandDraft);
    			} catch {}
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		activeCommandDraftId,
    		commandDraft,
    		remote,
    		sessionId,
    		setCommandDraft,
    		setError,
    		setNotice
    	]);
    	const refreshList = (0, react.useCallback)(async () => {
    		let result;
    		if (sessionId) {
    			const state = unwrap(await remote.sessionState(sessionId));
    			result = state.availableWorkflows;
    			setPendingProposals([]);
    			setPendingDrafts([]);
    			setSessionAssociationRevision(state.associationRevision);
    			setSessionWorkspaceDirectory(state.workspaceDirectory);
    			setCommandDraft(state.commandDraft);
    			setEditProposal(state.editProposal);
    		} else {
    			const [workflows, proposals, drafts] = await Promise.all([
    				remote.list(),
    				remote.listPendingEditProposals(),
    				remote.listPendingSessionDrafts()
    			]);
    			result = unwrap(workflows);
    			setPendingProposals(unwrap(proposals));
    			setPendingDrafts(unwrap(drafts));
    		}
    		setItems(result);
    		return result;
    	}, [
    		remote,
    		sessionId,
    		setCommandDraft,
    		setEditProposal,
    		setSessionAssociationRevision,
    		setSessionWorkspaceDirectory
    	]);
    	(0, react.useEffect)(() => {
    		if (!sessionId || remoteFailure || !remoteApi) return;
    		let current = true;
    		const unsubscribeDraft = subscribeSessionDraft(sessionId, () => {
    			remote.sessionState(sessionId).then((response) => {
    				if (!current) return;
    				const state = unwrap(response);
    				setCommandDraft(state.commandDraft);
    				setEditProposal(state.editProposal);
    				setSessionAssociationRevision(state.associationRevision);
    				setSessionWorkspaceDirectory(state.workspaceDirectory);
    				setItems(state.availableWorkflows);
    				if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) openEditProposal(state.editProposal);
    			}).catch((cause) => {
    				if (current) setError(errorMessage(cause));
    			});
    		});
    		return () => {
    			current = false;
    			unsubscribeDraft();
    		};
    	}, [
    		openEditProposal,
    		remote,
    		remoteApi,
    		remoteFailure,
    		sessionId,
    		setCommandDraft,
    		setEditProposal,
    		setError,
    		setItems,
    		setSessionAssociationRevision,
    		setSessionWorkspaceDirectory
    	]);
    	(0, react.useEffect)(() => {
    		const dispose = ctx.on("theme/change", (next) => setTheme(next));
    		return () => {
    			dispose();
    		};
    	}, [ctx]);
    	(0, react.useEffect)(() => {
    		if (remoteFailure) return;
    		if (!sessionId) {
    			refreshList().catch((cause) => setError(errorMessage(cause)));
    			return;
    		}
    		let current = true;
    		const hadRetainedEditor = retainedEditorState.has(`${scopeKey}:editing`);
    		const retainedSavedId = retainedEditorState.get(`${scopeKey}:savedWorkflowId`);
    		(async () => {
    			setBusy(true);
    			try {
    				const state = unwrap(await remote.sessionState(sessionId));
    				if (!current) return;
    				setItems(state.availableWorkflows);
    				setSessionAssociationRevision(state.associationRevision);
    				setSessionWorkspaceDirectory(state.workspaceDirectory);
    				setCommandDraft(state.commandDraft);
    				setEditProposal(state.editProposal);
    				if (!hadRetainedEditor) {
    					if (state.editProposal) openEditProposal(state.editProposal);
    					else if (state.workflow) {
    						setWorkflow(state.workflow);
    						setSavedSnapshot(state.workflow);
    						setEditing(true);
    						setSavedWorkflowId(state.workflow.id);
    						setSelectedNodeId(state.workflow.nodes[0]?.id ?? "");
    						setInspectorOpen(Boolean(state.workflow.nodes[0]));
    						const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id));
    						if (!current) return;
    						setRun(sessionRuns[0]);
    						setNotice("已打开当前会话关联的工作流。");
    					} else if (state.commandDraft) openCommandDraft(state.commandDraft, false);
    					else {
    						setWorkflow(newWorkflow(state.workspaceDirectory));
    						setSavedWorkflowId("");
    						setEditing(false);
    						setRun(void 0);
    						setNotice(state.association ? "当前会话关联的工作流已失效，请重新选择或新建。" : "当前会话还没有关联工作流。");
    					}
    				} else if (retainedSavedId && state.workflow?.id === retainedSavedId) {
    					if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) openEditProposal(state.editProposal);
    					const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id));
    					if (!current) return;
    					setRun(sessionRuns[0]);
    				} else if (retainedSavedId && !state.workflow) {
    					setWorkflow(newWorkflow(state.workspaceDirectory));
    					setSavedWorkflowId("");
    					setEditing(false);
    					setRun(void 0);
    					setNotice("当前会话关联的工作流已失效，请重新选择或新建。");
    				} else if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) openEditProposal(state.editProposal);
    			} catch (cause) {
    				if (current) setError(errorMessage(cause));
    			} finally {
    				if (current) setBusy(false);
    			}
    		})();
    		return () => {
    			current = false;
    		};
    	}, [
    		ctx,
    		openCommandDraft,
    		openEditProposal,
    		remote,
    		refreshList,
    		remoteFailure,
    		scopeKey,
    		sessionId,
    		setCommandDraft,
    		setEditProposal,
    		setEditing,
    		setError,
    		setInspectorOpen,
    		setItems,
    		setNotice,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setSelectedNodeId,
    		setSessionAssociationRevision,
    		setSessionWorkspaceDirectory,
    		setWorkflow
    	]);
    	(0, react.useEffect)(() => {
    		if (!sessionId || !savedWorkflowId || workflow.id !== savedWorkflowId || !savedSnapshot || remoteFailure) return;
    		const sequence = (editorStatusSequences.get(sessionId) ?? 0) + 1;
    		editorStatusSequences.set(sessionId, sequence);
    		remote.sessionEditorStatus(sessionId, {
    			clientId,
    			sequence,
    			workflowId: savedWorkflowId,
    			baseRevision: savedSnapshot.revision,
    			isDirty: JSON.stringify(workflow) !== JSON.stringify(savedSnapshot)
    		}).catch(() => void 0);
    	}, [
    		remote,
    		remoteFailure,
    		savedSnapshot,
    		savedWorkflowId,
    		sessionId,
    		workflow
    	]);
    	(0, react.useEffect)(() => {
    		if (!nodeMenu) return;
    		const close = (event) => {
    			if (!(event.target instanceof Element) || !event.target.closest(".dsh-wp-context-menu")) setNodeMenu(void 0);
    		};
    		const escape = (event) => {
    			if (event.key === "Escape") setNodeMenu(void 0);
    		};
    		document.addEventListener("pointerdown", close);
    		document.addEventListener("keydown", escape);
    		return () => {
    			document.removeEventListener("pointerdown", close);
    			document.removeEventListener("keydown", escape);
    		};
    	}, [nodeMenu]);
    	(0, react.useEffect)(() => {
    		if (!run || run.workflowId !== workflow.id || ![
    			"queued",
    			"running",
    			"pausing",
    			"paused",
    			"verifying",
    			"stopping",
    			"interrupted",
    			"needs_review"
    		].includes(run.state)) return;
    		const runId = run.id;
    		const workflowId = workflow.id;
    		return watchRun({
    			read: () => (sessionId ? remote.sessionGetRun(sessionId, {
    				workflowId,
    				runId
    			}) : remote.getRun(runId)).then(unwrap),
    			onData: (latest) => {
    				if (latest.id === runId && latest.workflowId === workflowId) {
    					setRun(latest);
    					setRunSyncError("");
    				}
    			},
    			onError: (cause) => setRunSyncError(errorMessage(cause))
    		});
    	}, [
    		remote,
    		run?.id,
    		run?.state,
    		run?.workflowId,
    		sessionId,
    		workflow.id
    	]);
    	const addContextToTask = (0, react.useCallback)((taskId, kind) => {
    		const task = workflow.nodes.find((node) => node.id === taskId && node.type === "task");
    		if (!task || task.type !== "task") return;
    		const id = `${kind}-${newId()}`;
    		const position = [
    			{
    				x: task.position.x + 300,
    				y: task.position.y
    			},
    			{
    				x: task.position.x - 300,
    				y: task.position.y
    			},
    			{
    				x: task.position.x,
    				y: task.position.y + 215
    			},
    			{
    				x: task.position.x,
    				y: task.position.y - 215
    			}
    		].find((candidate) => workflow.nodes.every((other) => {
    			if (other.id === task.id) return true;
    			return Math.abs(candidate.x - other.position.x) >= 276 || Math.abs(candidate.y - other.position.y) >= 210;
    		})) ?? {
    			x: task.position.x + 300,
    			y: task.position.y + workflow.nodes.length * 215
    		};
    		const node = kind === "file" ? {
    			type: "file",
    			id,
    			title: "参考文件",
    			path: "",
    			position
    		} : {
    			type: "prompt",
    			id,
    			title: "补充提示",
    			text: "",
    			enabled: true,
    			position
    		};
    		const edge = {
    			type: "context",
    			id: newId(),
    			source: id,
    			target: task.id
    		};
    		setWorkflow((current) => ({
    			...current,
    			nodes: [...current.nodes, node],
    			edges: [...current.edges, edge]
    		}));
    		setSelectedNodeId(id);
    		setInspectorOpen(true);
    		setNodeMenu(void 0);
    		setPreview(void 0);
    		window.requestAnimationFrame(() => flowInstance?.fitView({
    			nodes: [{ id: task.id }, { id }],
    			padding: .35,
    			duration: 220
    		}));
    	}, [flowInstance, workflow.nodes]);
    	const flowNodes = (0, react.useMemo)(() => workflow.nodes.map((node) => ({
    		...nodeMeasurements.get(node.id),
    		id: node.id,
    		type: node.type,
    		position: {
    			x: node.position.x,
    			y: node.position.y
    		},
    		data: {
    			node,
    			...node.type === "task" ? {
    				state: currentRun && currentRun.workflow.revision !== workflow.revision ? "outdated" : taskProgressState(currentRun?.tasks.find((task) => task.taskId === node.id)),
    				onAddContext: (kind) => addContextToTask(node.id, kind)
    			} : {}
    		},
    		selected: node.id === selectedNodeId
    	})), [
    		addContextToTask,
    		currentRun,
    		nodeMeasurements,
    		selectedNodeId,
    		workflow.nodes,
    		workflow.revision
    	]);
    	const flowEdges = (0, react.useMemo)(() => workflow.edges.map((edge) => ({
    		id: edge.id,
    		source: edge.source,
    		target: edge.target,
    		type: "smoothstep",
    		label: edge.type === "dependency" ? "依赖" : "上下文",
    		markerEnd: { type: MarkerType.ArrowClosed },
    		style: edge.type === "context" ? {
    			stroke: "var(--dsw-alias-label-tertiary)",
    			strokeDasharray: "6 5"
    		} : { stroke: "var(--dsw-alias-brand-primary)" },
    		data: { kind: edge.type }
    	})), [workflow.edges]);
    	const changeWorkflow = (0, react.useCallback)((change) => {
    		setWorkflow((current) => change(current));
    	}, []);
    	const onNodesChange = (0, react.useCallback)((changes) => {
    		const removedIds = new Set(changes.filter((change) => change.type === "remove").map((change) => change.id));
    		const dimensionChanges = changes.filter((change) => change.type === "dimensions");
    		if (removedIds.size > 0 || dimensionChanges.length > 0) setNodeMeasurements((current) => {
    			const next = new Map(current);
    			for (const id of removedIds) next.delete(id);
    			for (const change of dimensionChanges) {
    				if (!change.dimensions) continue;
    				const measurement = {
    					...next.get(change.id) ?? {},
    					measured: { ...change.dimensions }
    				};
    				if (change.setAttributes === true || change.setAttributes === "width") measurement.width = change.dimensions.width;
    				if (change.setAttributes === true || change.setAttributes === "height") measurement.height = change.dimensions.height;
    				next.set(change.id, measurement);
    			}
    			return next;
    		});
    		if (removedIds.has(selectedNodeId)) {
    			setSelectedNodeId("");
    			setInspectorOpen(false);
    			setPreview(void 0);
    		}
    		setWorkflow((current) => {
    			const nextNodes = applyNodeChanges(changes, toFlowNodes(current));
    			const positions = new Map(nextNodes.map((node) => [node.id, node.position]));
    			return {
    				...current,
    				nodes: current.nodes.filter((node) => !removedIds.has(node.id)).map((node) => {
    					const position = positions.get(node.id);
    					return position ? {
    						...node,
    						position
    					} : node;
    				}),
    				edges: removedIds.size > 0 ? current.edges.filter((edge) => !removedIds.has(edge.source) && !removedIds.has(edge.target)) : current.edges
    			};
    		});
    	}, [selectedNodeId]);
    	const onEdgesChange = (0, react.useCallback)((changes) => {
    		setWorkflow((current) => ({
    			...current,
    			edges: fromFlowEdges(applyEdgeChanges(changes, toFlowEdges(current)))
    		}));
    	}, []);
    	const onConnect = (0, react.useCallback)((connection) => {
    		const source = workflow.nodes.find((node) => node.id === connection.source);
    		const target = workflow.nodes.find((node) => node.id === connection.target);
    		if (!source || !target || source.id === target.id || target.type !== "task" || source.type === "task" && target.type !== "task") {
    			setError("连线方向无效：依赖只能连接任务，文件或提示词只能连接到任务。");
    			return;
    		}
    		const type = source.type === "task" ? "dependency" : "context";
    		const edge = {
    			type,
    			id: newId(),
    			source: source.id,
    			target: target.id
    		};
    		if (workflow.edges.some((existing) => existing.type === type && existing.source === source.id && existing.target === target.id)) {
    			setError("这两个节点之间已经有相同类型的连线。");
    			return;
    		}
    		changeWorkflow((current) => ({
    			...current,
    			edges: fromFlowEdges(addEdge({
    				...connection,
    				id: edge.id,
    				data: { kind: type }
    			}, toFlowEdges(current))).map((item) => item.id === edge.id ? edge : item)
    		}));
    	}, [
    		changeWorkflow,
    		workflow.edges,
    		workflow.nodes
    	]);
    	const save = (0, react.useCallback)(async () => {
    		setBusy(true);
    		setError("");
    		try {
    			const normalizedWorkflow = {
    				...workflow,
    				workspaceDirectory: normalizeDirectoryInput(workflow.workspaceDirectory),
    				outputDirectory: normalizeDirectoryInput(workflow.outputDirectory)
    			};
    			setWorkflow(normalizedWorkflow);
    			validateWorkflow(normalizedWorkflow);
    			if (editProposal && activeEditProposalId === editProposal.proposalId) {
    				if (!sessionId || normalizedWorkflow.id !== editProposal.workflowId) throw new Error("当前编辑建议的会话上下文无效，请重新加载。");
    				const updated = unwrap(await remote.sessionEditProposalUpdate(sessionId, {
    					proposalId: editProposal.proposalId,
    					expectedRevision: editProposal.revision,
    					workflow: normalizedWorkflow
    				}));
    				setEditProposal(updated);
    				setWorkflow(updated.workflow);
    				setSavedSnapshot(updated.baseWorkflow);
    				setNotice(`编辑建议已保存为提案修订 ${updated.revision}；原工作流修订 ${updated.baseWorkflowRevision} 尚未改变。点击“应用修改”才会写入新工作流修订。`);
    				return;
    			}
    			const expectedRevision = savedWorkflowId === normalizedWorkflow.id ? normalizedWorkflow.revision : 0;
    			let saved;
    			if (sessionId) {
    				const draftCommit = commandDraft?.draftId === activeCommandDraftId && commandDraft.workflow.id === normalizedWorkflow.id ? {
    					draftId: commandDraft.draftId,
    					expectedDraftRevision: commandDraft.revision
    				} : {};
    				const result = unwrap(await remote.sessionSave(sessionId, {
    					workflow: normalizedWorkflow,
    					expectedRevision,
    					expectedAssociationRevision: sessionAssociationRevision,
    					...draftCommit
    				}));
    				saved = result.workflow;
    				setSessionAssociationRevision(result.association.revision);
    			} else saved = unwrap(await remote.save({
    				workflow: normalizedWorkflow,
    				expectedRevision
    			}));
    			setWorkflow(saved);
    			setSavedSnapshot(saved);
    			setSavedWorkflowId(saved.id);
    			setSettingsOpen(false);
    			setNotice(`已保存（修订 ${saved.revision}）。`);
    			if (commandDraft?.workflow.id === saved.id) {
    				setCommandDraft(void 0);
    				setActiveCommandDraftId("");
    			}
    			if (sessionId) notifySessionDraft(sessionId);
    			await refreshList();
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		activeCommandDraftId,
    		activeEditProposalId,
    		commandDraft,
    		editProposal,
    		refreshList,
    		remote,
    		savedWorkflowId,
    		sessionAssociationRevision,
    		sessionId,
    		setActiveCommandDraftId,
    		setCommandDraft,
    		setEditProposal,
    		setError,
    		setNotice,
    		setSavedSnapshot,
    		setSessionAssociationRevision,
    		setWorkflow,
    		workflow
    	]);
    	const applyEditProposal = (0, react.useCallback)(async () => {
    		if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId) return;
    		if (JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow)) {
    			setError("当前提案画布有未保存修改。先点击“保存建议修改”，再应用。");
    			return;
    		}
    		setBusy(true);
    		setError("");
    		try {
    			const committed = unwrap(await remote.sessionEditProposalApply(sessionId, {
    				proposalId: editProposal.proposalId,
    				expectedRevision: editProposal.revision
    			}));
    			setWorkflow(committed);
    			setSavedSnapshot(committed);
    			setSavedWorkflowId(committed.id);
    			setEditProposal(void 0);
    			setActiveEditProposalId("");
    			setActiveCommandDraftId("");
    			setNotice(`修改已应用：工作流 ${committed.id} 保存为修订 ${committed.revision}。历史运行记录保留，未自动启动新运行。`);
    			notifySessionDraft(sessionId);
    			if (sessionId) {
    				const runs = unwrap(await remote.sessionRuns(sessionId, committed.id));
    				setRun(runs[0]);
    			}
    			await refreshList();
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		activeEditProposalId,
    		editProposal,
    		refreshList,
    		remote,
    		sessionId,
    		setActiveCommandDraftId,
    		setActiveEditProposalId,
    		setEditProposal,
    		setError,
    		setNotice,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setWorkflow,
    		workflow
    	]);
    	const discardEditProposal = (0, react.useCallback)(async () => {
    		if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId) return;
    		setBusy(true);
    		setError("");
    		try {
    			unwrap(await remote.sessionEditProposalDiscard(sessionId, {
    				proposalId: editProposal.proposalId,
    				expectedRevision: editProposal.revision
    			}));
    			setWorkflow(editProposal.baseWorkflow);
    			setSavedSnapshot(editProposal.baseWorkflow);
    			setSavedWorkflowId(editProposal.workflowId);
    			setEditProposal(void 0);
    			setActiveEditProposalId("");
    			const runs = unwrap(await remote.sessionRuns(sessionId, editProposal.workflowId));
    			setRun(runs[0]);
    			setNotice(`编辑建议已放弃。原工作流 ${editProposal.workflowId} 修订 ${editProposal.baseWorkflowRevision} 未修改。`);
    			notifySessionDraft(sessionId);
    			await refreshList();
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		activeEditProposalId,
    		editProposal,
    		refreshList,
    		remote,
    		sessionId,
    		setActiveEditProposalId,
    		setEditProposal,
    		setError,
    		setNotice,
    		setRun,
    		setSavedSnapshot,
    		setSavedWorkflowId,
    		setWorkflow
    	]);
    	const createNew = (0, react.useCallback)(() => {
    		if (hasUnsavedCanvasChanges || editProposal) {
    			setError(editProposal ? "先应用或放弃待处理编辑建议，再新建其他流程。" : "当前画布有未保存修改；请先保存或撤销，再新建流程。");
    			return;
    		}
    		const next = newWorkflow(workflow.workspaceDirectory || sessionWorkspaceDirectory);
    		setWorkflow(next);
    		setSavedSnapshot(next);
    		setEditing(true);
    		setSettingsOpen(true);
    		setSavedWorkflowId("");
    		setSelectedNodeId(next.nodes[0].id);
    		setInspectorOpen(true);
    		setNodeMenu(void 0);
    		setRun(void 0);
    		setEditProposal(void 0);
    		setActiveEditProposalId("");
    		setPreview(void 0);
    		setNotice("手动编辑和保存不需要模型密钥。先填写目标与工作区，再添加资料并完善任务。");
    		setError("");
    	}, [
    		editProposal,
    		hasUnsavedCanvasChanges,
    		sessionWorkspaceDirectory,
    		setActiveEditProposalId,
    		setEditProposal,
    		setError,
    		setSavedSnapshot,
    		workflow.workspaceDirectory
    	]);
    	const selectSaved = (0, react.useCallback)(async (id) => {
    		if (!id) return;
    		if (editProposal) {
    			setError("当前会话有待处理编辑建议；请先应用或放弃，再选择其他工作流。");
    			return;
    		}
    		if (hasUnsavedCanvasChanges) {
    			setError("当前画布有未保存修改；请先保存或撤销，再选择其他工作流。");
    			return;
    		}
    		setBusy(true);
    		try {
    			if (sessionId) {
    				const association = unwrap(await remote.sessionAssociate(sessionId, {
    					workflowId: id,
    					expectedAssociationRevision: sessionAssociationRevision
    				}));
    				setSessionAssociationRevision(association.revision);
    			}
    			const loaded = sessionId ? unwrap(await remote.sessionGet(sessionId, id)) : unwrap(await remote.get(id));
    			setWorkflow(loaded);
    			setSavedSnapshot(loaded);
    			setEditing(true);
    			setSettingsOpen(false);
    			setSavedWorkflowId(loaded.id);
    			setSelectedNodeId(loaded.nodes[0]?.id ?? "");
    			setInspectorOpen(Boolean(loaded.nodes[0]));
    			setNodeMenu(void 0);
    			setRun(void 0);
    			setPreview(void 0);
    			const runs = sessionId ? unwrap(await remote.sessionRuns(sessionId, id)) : unwrap(await remote.runs(id));
    			setRun(runs[0]);
    			setNotice("已加载已保存的工作流。");
    			setError("");
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		editProposal,
    		hasUnsavedCanvasChanges,
    		remote,
    		sessionAssociationRevision,
    		sessionId,
    		setError,
    		setSavedSnapshot,
    		setSessionAssociationRevision,
    		setWorkflow
    	]);
    	const addNode = (0, react.useCallback)((kind) => {
    		const index = workflow.nodes.length;
    		const id = `${kind}-${newId()}`;
    		const position = {
    			x: 90 + index % 3 * 310,
    			y: 80 + Math.floor(index / 3) * 185
    		};
    		const node = kind === "task" ? {
    			type: "task",
    			id,
    			title: "新任务",
    			instructions: "写明目标、步骤和验收条件。",
    			acceptanceCriteria: ["人工核对任务结果和产物。"],
    			expectedArtifacts: [],
    			expectedContents: [],
    			acceptanceMode: "manual",
    			order: workflow.nodes.filter((node) => node.type === "task").length,
    			position
    		} : kind === "file" ? {
    			type: "file",
    			id,
    			title: "参考文件",
    			path: "",
    			position
    		} : {
    			type: "prompt",
    			id,
    			title: "补充提示",
    			text: "",
    			enabled: true,
    			position
    		};
    		changeWorkflow((current) => ({
    			...current,
    			nodes: [...current.nodes, node]
    		}));
    		setSelectedNodeId(id);
    		setInspectorOpen(true);
    		setNodeMenu(void 0);
    		setPreview(void 0);
    	}, [changeWorkflow, workflow.nodes.length]);
    	const updateNode = (0, react.useCallback)((id, update) => {
    		changeWorkflow((current) => ({
    			...current,
    			nodes: current.nodes.map((node) => node.id === id ? update(node) : node)
    		}));
    	}, [changeWorkflow]);
    	const generatePlan = (0, react.useCallback)(async () => {
    		if (editProposal) {
    			setError("先应用或放弃当前编辑建议，再生成其他草稿。");
    			return;
    		}
    		const protectionMessage = getWorkflowProtectionMessage("generate", {
    			hasUnsavedChanges: hasUnsavedCanvasChanges,
    			initialPromptOnlyDraft,
    			runState: currentRun?.state,
    			objective: workflow.objective
    		});
    		if (protectionMessage) {
    			setError(protectionMessage);
    			return;
    		}
    		setBusy(true);
    		setError("");
    		try {
    			const request = {
    				title: workflow.title,
    				objective: workflow.objective,
    				workspaceDirectory: workflow.workspaceDirectory,
    				outputDirectory: workflow.outputDirectory,
    				contextNodes: workflow.nodes.filter((node) => node.type !== "task")
    			};
    			const result = sessionId ? unwrap(await remote.sessionGenerateDraft(sessionId, {
    				workflowId: savedWorkflowId,
    				request
    			}, new AbortController().signal)) : unwrap(await remote.generateDraft(request, new AbortController().signal));
    			setWorkflow(result.workflow);
    			setSavedSnapshot(result.workflow);
    			setEditing(true);
    			setSettingsOpen(false);
    			setSavedWorkflowId("");
    			setRun(void 0);
    			setSelectedNodeId(result.workflow.nodes[0]?.id ?? "");
    			setInspectorOpen(Boolean(result.workflow.nodes[0]));
    			setNotice(`模型 ${result.model} 已生成可编辑草稿，请检查后保存。`);
    		} catch (cause) {
    			setError(`AI 草稿生成失败（如尚未配置模型，请前往 DSH 设置 → Models 添加模型）。${errorMessage(cause)}`);
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		currentRun?.state,
    		editProposal,
    		hasUnsavedCanvasChanges,
    		initialPromptOnlyDraft,
    		remote,
    		savedWorkflowId,
    		sessionId,
    		setError,
    		setSavedSnapshot,
    		setWorkflow,
    		workflow
    	]);
    	const importMarkdown = (0, react.useCallback)(async (file) => {
    		const protectionMessage = getWorkflowProtectionMessage("import-markdown", {
    			hasUnsavedChanges: hasUnsavedCanvasChanges,
    			runState: currentRun?.state
    		});
    		if (protectionMessage) {
    			setError(protectionMessage);
    			return;
    		}
    		setBusy(true);
    		setError("");
    		try {
    			const text = await file.text();
    			const imported = unwrap(await remote.importMarkdown({
    				text,
    				workspaceDirectory: workflow.workspaceDirectory,
    				outputDirectory: workflow.outputDirectory
    			}));
    			setWorkflow(imported);
    			setSavedSnapshot(imported);
    			setEditing(true);
    			setSettingsOpen(false);
    			setSavedWorkflowId(imported.id);
    			setRun(void 0);
    			setSelectedNodeId(imported.nodes[0]?.id ?? "");
    			setInspectorOpen(Boolean(imported.nodes[0]));
    			setNotice("Markdown 已解析并保存；保存后的任务仍可继续编辑。");
    			await refreshList();
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		currentRun?.state,
    		hasUnsavedCanvasChanges,
    		refreshList,
    		remote,
    		setError,
    		setSavedSnapshot,
    		setWorkflow,
    		workflow
    	]);
    	const previewFile = (0, react.useCallback)(async (node) => {
    		setBusy(true);
    		setError("");
    		try {
    			const result = sessionId ? unwrap(await remote.sessionPreviewFile(sessionId, {
    				path: node.path,
    				workflowId: workflow.id
    			})) : unwrap(await remote.previewFile({
    				path: node.path,
    				workspaceDirectory: workflow.workspaceDirectory
    			}));
    			setPreview(result);
    			setNotice(`已读取 UTF-8 文件（SHA-256 ${result.sha256.slice(0, 12)}…）。`);
    		} catch (cause) {
    			setPreview(void 0);
    			setError(errorMessage(cause));
    		} finally {
    			setBusy(false);
    		}
    	}, [
    		remote,
    		sessionId,
    		workflow.id,
    		workflow.workspaceDirectory
    	]);
    	const startRun = (0, react.useCallback)(async () => {
    		const protectionMessage = getWorkflowProtectionMessage("start-run", { hasUnsavedChanges: hasUnsavedCanvasChanges });
    		if (protectionMessage) {
    			setError(protectionMessage);
    			return;
    		}
    		if (editProposal) {
    			setError("当前有待处理编辑建议。请先应用或放弃，再启动工作流运行。");
    			return;
    		}
    		if (!savedWorkflowId || savedWorkflowId !== workflow.id) {
    			setError("先保存当前草稿，再启动运行。");
    			return;
    		}
    		if (runActionInFlight.current) return;
    		runActionInFlight.current = true;
    		setBusy(true);
    		setError("");
    		try {
    			const request = {
    				workflowId: workflow.id,
    				requestId: newId()
    			};
    			const started = sessionId ? unwrap(await remote.sessionStartRun(sessionId, request)) : unwrap(await remote.startRun(request));
    			setRun(started);
    			setInspectorOpen(true);
    			setNotice("运行快照已保存；任务会按依赖顺序由 DSH Agent 串行处理。");
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			runActionInFlight.current = false;
    			setBusy(false);
    		}
    	}, [
    		editProposal,
    		hasUnsavedCanvasChanges,
    		remote,
    		savedWorkflowId,
    		sessionId,
    		setError,
    		workflow.id
    	]);
    	const runAction = (0, react.useCallback)(async (action, taskId = "") => {
    		if (!run || run.workflowId !== workflow.id || runActionInFlight.current) return;
    		if (action === "apply") {
    			const protectionMessage = getWorkflowProtectionMessage("apply-run", { hasUnsavedChanges: hasUnsavedCanvasChanges });
    			if (protectionMessage) {
    				setError(protectionMessage);
    				return;
    			}
    		}
    		runActionInFlight.current = true;
    		setBusy(true);
    		setError("");
    		try {
    			const next = unwrap(await (sessionId ? remote.sessionAction(sessionId, {
    				workflowId: workflow.id,
    				runId: run.id,
    				action,
    				taskId
    			}) : remote.action({
    				runId: run.id,
    				action,
    				taskId
    			})));
    			setRun(next);
    			setNotice(action === "apply" ? `已应用修订 ${next.workflow.revision}；旧运行保留，未受影响且产物核验仍通过的任务会标为复用。` : action === "accept" ? "验收通过已记录。" : action === "reject" ? "驳回决定已记录。" : `已提交“${actionLabel(action)}”操作。`);
    		} catch (cause) {
    			setError(errorMessage(cause));
    		} finally {
    			runActionInFlight.current = false;
    			setBusy(false);
    		}
    	}, [
    		hasUnsavedCanvasChanges,
    		remote,
    		run,
    		sessionId,
    		setError,
    		workflow.id
    	]);
    	const deleteNode = (0, react.useCallback)((nodeId) => {
    		changeWorkflow((current) => ({
    			...current,
    			nodes: current.nodes.filter((node) => node.id !== nodeId),
    			edges: current.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    		}));
    		if (selectedNodeId === nodeId) setSelectedNodeId("");
    		setInspectorOpen(false);
    		setNodeMenu(void 0);
    		setPreview(void 0);
    	}, [changeWorkflow, selectedNodeId]);
    	const returnToList = (0, react.useCallback)(() => {
    		setEditing(false);
    		setInspectorOpen(false);
    		setSelectedNodeId("");
    		setNodeMenu(void 0);
    		setError("");
    		setNotice("");
    		refreshList().catch((cause) => setError(errorMessage(cause)));
    	}, [refreshList]);
    	const linksToSelected = selectedNode?.type === "task" ? workflow.edges.filter((edge) => edge.type === "context" && edge.target === selectedNode.id) : [];
    	const chooseTheme = (value) => ctx.theme.setTheme(value);
    	const themeControl = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
    		className: "dsh-wp-theme-control",
    		children: ["主题", /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
    			"aria-label": "主题",
    			value: theme.preference,
    			onChange: (event) => chooseTheme(event.target.value),
    			children: [
    				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
    					value: "system",
    					children: "跟随系统"
    				}),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
    					value: "light",
    					children: "浅色"
    				}),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
    					value: "dark",
    					children: "深色"
    				})
    			]
    		})]
    	});
    	if (!editing && sessionId) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
    		className: "dsh-wp-root dsh-wp-home",
    		"data-theme": theme.active.colorScheme,
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
    				className: "dsh-wp-header",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "当前会话的工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "这里只显示并编辑当前会话关联的流程。打开界面不会调用模型或启动运行。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-home-actions",
    					children: [
    						surface === "main" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							onClick: () => ctx.layout.selectPanel("conversation"),
    							children: "返回对话"
    						}),
    						themeControl,
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: createNew,
    							disabled: busy,
    							children: "新建工作流"
    						})
    					]
    				})]
    			}),
    			error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-alert is-error",
    				role: "alert",
    				children: error
    			}),
    			notice && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-alert",
    				role: "status",
    				children: notice
    			}),
    			commandDraft && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-command-draft",
    				role: "status",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "本会话有命令草稿待检查" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    						commandDraft.workflow.title,
    						" · 修订 ",
    						commandDraft.revision,
    						" · ",
    						commandDraft.workflow.nodes.filter((node) => node.type === "task").length,
    						" 个任务 · ",
    						commandDraft.model
    					] }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "草稿尚未保存，不会运行，也不会替换当前关联流程。" })
    				] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					className: "is-primary",
    					onClick: () => openCommandDraft(commandDraft, commandDraft.workflow.id !== workflow.id),
    					disabled: busy,
    					children: commandDraft.workflow.id === workflow.id && activeCommandDraftId === commandDraft.draftId ? "继续编辑草稿" : "打开草稿"
    				}), commandDraft.draftId !== activeCommandDraftId && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					className: "is-danger",
    					onClick: () => void discardCommandDraft(),
    					disabled: busy,
    					children: "丢弃草稿"
    				})] })]
    			}),
    			!sessionWorkspaceDirectory && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    				className: "dsh-wp-empty-card",
    				children: "此会话没有可用的工作区目录。新建后请填写一个已存在的绝对路径。"
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-saved-list",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-section-heading",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "选择已有工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "选择后只会将该工作流关联到当前会话。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [items.length, " 项"] })]
    				}), busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    					className: "dsh-wp-empty-card",
    					children: "正在读取当前会话的关联与工作区…"
    				}) : items.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    					className: "dsh-wp-empty-card",
    					children: "还没有已保存的工作流。可以新建一个手动流程，再保存到当前会话。"
    				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    					className: "dsh-wp-workflow-list",
    					children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						className: "dsh-wp-workflow-row",
    						onClick: () => void selectSaved(item.id),
    						disabled: busy,
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: item.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: item.objective || "尚未填写目标" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
    							className: "dsh-wp-workflow-meta",
    							children: [
    								item.taskCount,
    								" 个任务 · 修订 ",
    								item.revision,
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
    									"aria-hidden": "true",
    									children: "关联并打开 →"
    								})
    							]
    						})]
    					}, item.id))
    				})]
    			})
    		]
    	});
    	if (!editing) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
    		className: "dsh-wp-root dsh-wp-home",
    		"data-theme": theme.active.colorScheme,
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
    				className: "dsh-wp-header",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "把目标、资料和任务整理成可编辑的流程，再交给 DSH Agent 执行。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-home-actions",
    					children: [themeControl, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-primary",
    						onClick: createNew,
    						disabled: busy,
    						children: "＋ 新建工作流"
    					})]
    				})]
    			}),
    			error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-alert is-error",
    				role: "alert",
    				children: error
    			}),
    			notice && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-alert",
    				role: "status",
    				children: notice
    			}),
    			pendingDrafts.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-saved-list",
    				"aria-label": "待处理命令草稿恢复入口",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-section-heading",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "待处理命令草稿" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "可从这里恢复尚未发送普通聊天消息的会话草稿；草稿内容仍由原会话 Host 校验，不会自动关联或运行。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [pendingDrafts.length, " 项"] })]
    				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    					className: "dsh-wp-workflow-list",
    					children: pendingDrafts.map((draft) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						className: "dsh-wp-workflow-row",
    						onClick: () => requestSessionPanel(ctx, draft.sessionId),
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: draft.workflowTitle }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
    							"会话 ",
    							draft.sessionId,
    							" · 命令 ",
    							draft.commandId,
    							" · 模型 ",
    							draft.model
    						] })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
    							className: "dsh-wp-workflow-meta",
    							children: [
    								draft.taskCount,
    								" 个任务 · 草稿修订 ",
    								draft.revision,
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
    									"aria-hidden": "true",
    									children: "查看草稿 →"
    								})
    							]
    						})]
    					}, draft.draftId))
    				})]
    			}),
    			pendingProposals.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-saved-list",
    				"aria-label": "待处理编辑建议恢复入口",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-section-heading",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "待处理编辑建议" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "此恢复列表只显示提案索引；点击后按原会话读取提案，不会重新关联、应用或丢弃数据。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [pendingProposals.length, " 项"] })]
    				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    					className: "dsh-wp-workflow-list",
    					children: pendingProposals.map((proposal) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						className: "dsh-wp-workflow-row",
    						onClick: () => requestSessionPanel(ctx, proposal.sessionId),
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: proposal.workflowTitle }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
    							"会话 ",
    							proposal.sessionId,
    							" · 流程 ",
    							proposal.workflowId,
    							" · 模型 ",
    							proposal.model
    						] })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
    							className: "dsh-wp-workflow-meta",
    							children: [
    								"基于修订 ",
    								proposal.baseWorkflowRevision,
    								" · 提案修订 ",
    								proposal.revision,
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
    									"aria-hidden": "true",
    									children: "查看建议 →"
    								})
    							]
    						})]
    					}, proposal.proposalId))
    				})]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-onboarding",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-onboarding-copy",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    							className: "dsh-wp-eyebrow",
    							children: "快速开始"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "从目标开始，逐步搭好工作流" }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("ol", { children: [
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "填写目标与工作区" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "设置要完成什么、参考哪个项目目录、产物写到哪里。" })] }),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "添加资料" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "在任务节点上选择参考文件，或写一段专用提示词。" })] }),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "生成或手动建立任务" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "可手动新增任务；AI 草稿需要先在 DSH 设置 → Models 配置模型。" })] }),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "编辑连线" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "依赖边表示先后顺序；上下文边表示任务要读取的资料。" })] }),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "保存工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "保存后可从已保存列表重新打开，节点位置和连线会保留。" })] }),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "运行并查看结果" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "由 DSH Agent 按依赖顺序处理，再从运行详情查看进度和产物检查。" })] })
    						] }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    							className: "dsh-wp-manual-note",
    							children: "没有模型密钥时，手动编辑、连线和保存仍可使用；只有 AI 生成与 Agent 运行需要已配置的模型。"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: createNew,
    							disabled: busy,
    							children: "新建手动工作流"
    						})
    					]
    				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-node-guide",
    					"aria-label": "工作流节点和连线说明",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    							className: "dsh-wp-guide-symbol is-task",
    							children: "T"
    						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "Task · 执行任务" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "写明做什么、步骤和验收条件。" })] })] }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    							className: "dsh-wp-guide-symbol is-file",
    							children: "F"
    						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "参考文件 · 工作区文件" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "引用工作区内已有的 UTF-8 文件，运行前由 DSH Host 读取。" })] })] }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    							className: "dsh-wp-guide-symbol is-prompt",
    							children: "P"
    						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "提示词 · 补充要求" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "保存文本说明，可选择是否启用。" })] })] }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    							className: "dsh-wp-edge-guide",
    							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "is-dependency" }), "依赖边：任务先后顺序"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "is-context" }), "上下文边：资料流向任务"] })]
    						})
    					]
    				})]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-saved-list",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-section-heading",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "已保存的工作流" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "选择要继续编辑的项目。已有内容和验收样例会保留在这里。" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [items.length, " 项"] })]
    				}), items.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    					className: "dsh-wp-empty-card",
    					children: "还没有已保存的工作流。新建后保存即可在这里重新打开。"
    				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    					className: "dsh-wp-workflow-list",
    					children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						className: "dsh-wp-workflow-row",
    						onClick: () => void selectSaved(item.id),
    						disabled: busy,
    						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: item.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: item.objective || "尚未填写目标" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
    							className: "dsh-wp-workflow-meta",
    							children: [
    								item.taskCount,
    								" 个任务 · 修订 ",
    								item.revision,
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
    									"aria-hidden": "true",
    									children: "打开 →"
    								})
    							]
    						})]
    					}, item.id))
    				})]
    			})
    		]
    	});
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
    		className: `dsh-wp-root${sessionId ? " is-session-scope" : ""}`,
    		"data-theme": theme.active.colorScheme,
    		children: [
    			sessionId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-session-nav",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "dsh-wp-back",
    						onClick: returnToList,
    						children: "← 当前会话"
    					}),
    					surface === "main" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "dsh-wp-back",
    						onClick: () => ctx.layout.selectPanel("conversation"),
    						children: "返回对话"
    					}),
    					hasParkedEditor && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "dsh-wp-back",
    						onClick: restoreParkedEditor,
    						children: "返回先前编辑"
    					})
    				]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
    				className: "dsh-wp-header",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-title-block",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "dsh-wp-back",
    							onClick: returnToList,
    							children: "← 所有工作流"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: workflow.title || "未命名工作流" }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "画布上拖动节点、拖动连线；选中节点后在侧栏编辑。" })
    					]
    				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-toolbar",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
    							"aria-label": "打开已保存的工作流",
    							value: savedWorkflowId,
    							onChange: (event) => void selectSaved(event.target.value),
    							disabled: busy || Boolean(editProposal) || hasUnsavedCanvasChanges,
    							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
    								value: "",
    								children: "当前草稿"
    							}), items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
    								value: item.id,
    								children: [
    									item.title,
    									"（",
    									item.taskCount,
    									" 项）"
    								]
    							}, item.id))]
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							onClick: createNew,
    							disabled: busy || Boolean(editProposal) || hasUnsavedCanvasChanges,
    							children: "新建"
    						}),
    						!sessionId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
    							className: "dsh-wp-file-button",
    							children: ["导入 Markdown", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    								type: "file",
    								accept: ".md,.markdown,text/markdown,text/plain",
    								onChange: (event) => {
    									const file = event.target.files?.[0];
    									if (file) importMarkdown(file);
    									event.currentTarget.value = "";
    								}
    							})]
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							onClick: () => void generatePlan(),
    							disabled: busy || Boolean(editProposal) || !workflow.workspaceDirectory.trim(),
    							children: "AI 生成流程草稿"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: () => void save(),
    							disabled: busy,
    							children: editProposal && activeEditProposalId === editProposal.proposalId ? "保存建议修改" : "保存"
    						}),
    						editProposal && activeEditProposalId === editProposal.proposalId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: () => void applyEditProposal(),
    							disabled: busy || JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow),
    							children: "应用修改"
    						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-danger",
    							onClick: () => void discardEditProposal(),
    							disabled: busy,
    							children: "放弃修改"
    						})] }),
    						themeControl
    					]
    				})]
    			}),
    			(error || notice) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: `dsh-wp-alert${error ? " is-error" : ""}`,
    				role: error ? "alert" : "status",
    				children: error || notice
    			}),
    			editProposal && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-command-draft is-active",
    				role: "status",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
    						"编辑建议 · 基于流程修订 ",
    						editProposal.baseWorkflowRevision,
    						" · 提案修订 ",
    						editProposal.revision
    					] }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
    						"命令 ",
    						editProposal.commandId,
    						" · 流程 ",
    						editProposal.workflowId,
    						" · 模型 ",
    						editProposal.model,
    						"。应用前原流程保持不变；此阶段不会运行工作流。"
    					] }),
    					editProposal.instruction ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: ["本次修改要求：", editProposal.instruction] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "这是 Alpha.11 及更早版本保存的提案，未保留原始修改说明。请逐项人工核对差异；此提案不会自动应用。" }),
    					proposalDiff && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EditProposalDiff, {
    						base: editProposal.baseWorkflow,
    						candidate: workflow,
    						diff: proposalDiff
    					}),
    					JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "画布包含尚未保存的建议修改。先点“保存建议修改”，再应用。" })
    				]
    			}),
    			commandDraft && commandDraft.draftId !== activeCommandDraftId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-command-draft",
    				role: "status",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "本会话另有命令草稿待检查" }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    						commandDraft.workflow.title,
    						" · 修订 ",
    						commandDraft.revision,
    						" · ",
    						commandDraft.model
    					] }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "打开草稿不会覆盖当前编辑；返回按钮可恢复当前页面的编辑内容。" })
    				] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					className: "is-primary",
    					onClick: () => openCommandDraft(commandDraft),
    					disabled: busy,
    					children: "查看命令草稿"
    				})]
    			}),
    			activeCommandDraftId && commandDraft?.draftId === activeCommandDraftId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-command-draft is-active",
    				role: "status",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "命令草稿 · 尚未保存" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "检查节点和连线后点击“保存”建立当前会话关联。此时没有工作流运行记录。" })]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
    				className: "dsh-wp-settings",
    				open: settingsOpen,
    				onToggle: (event) => setSettingsOpen(event.currentTarget.open),
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "工作流设置" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "目标、工作区与输出位置" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-settings-grid",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["工作流名称", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    							value: workflow.title,
    							disabled: !canEditSettings,
    							onChange: (event) => setWorkflow({
    								...workflow,
    								title: event.target.value
    							})
    						})] }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
    							className: "is-wide",
    							children: ["整体目标", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    								rows: 3,
    								value: workflow.objective,
    								disabled: !canEditSettings,
    								onChange: (event) => setWorkflow({
    									...workflow,
    									objective: event.target.value
    								}),
    								placeholder: "请描述项目目标、约束和验收条件。"
    							})]
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    							className: "dsh-wp-path-field is-wide",
    							children: [
    								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["工作区目录", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    									"aria-label": "工作区目录",
    									rows: 2,
    									spellCheck: false,
    									value: workflow.workspaceDirectory,
    									disabled: !canEditSettings,
    									onBlur: (event) => {
    										try {
    											const value = normalizeDirectoryInput(event.target.value);
    											setWorkflow((current) => ({
    												...current,
    												workspaceDirectory: value,
    												outputDirectory: current.outputDirectory || value
    											}));
    											setError("");
    										} catch (cause) {
    											setError(errorMessage(cause));
    										}
    									},
    									onChange: (event) => setWorkflow({
    										...workflow,
    										workspaceDirectory: event.target.value,
    										outputDirectory: workflow.outputDirectory || event.target.value
    									}),
    									placeholder: "填写现有绝对路径，或选择一个文件夹"
    								})] }),
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    									onClick: () => void pickDirectory("workspace"),
    									disabled: !canEditSettings || busy || folderPickerBusy,
    									children: "选择文件夹"
    								}),
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    									onClick: () => openFolderPicker("workspace"),
    									disabled: !canEditSettings || busy || folderPickerBusy,
    									children: "浏览目录"
    								})
    							]
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    							className: "dsh-wp-path-field is-wide",
    							children: [
    								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["输出目录", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    									"aria-label": "输出目录",
    									rows: 2,
    									spellCheck: false,
    									value: workflow.outputDirectory,
    									disabled: !canEditSettings,
    									onBlur: (event) => {
    										try {
    											setWorkflow((current) => ({
    												...current,
    												outputDirectory: normalizeDirectoryInput(event.target.value)
    											}));
    											setError("");
    										} catch (cause) {
    											setError(errorMessage(cause));
    										}
    									},
    									onChange: (event) => setWorkflow({
    										...workflow,
    										outputDirectory: event.target.value
    									}),
    									placeholder: "选择工作区内的现有目录"
    								})] }),
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    									onClick: () => void pickDirectory("output"),
    									disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim(),
    									children: "选择文件夹"
    								}),
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    									onClick: () => openFolderPicker("output"),
    									disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim(),
    									children: "浏览目录"
    								}),
    								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    									onClick: () => void createOutputDirectory(),
    									disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim() || !workflow.outputDirectory.trim(),
    									children: "创建输出目录"
    								})
    							]
    						})
    					]
    				})]
    			}),
    			folderPickerTarget && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: "dsh-wp-folder-backdrop",
    				role: "presentation",
    				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    					className: "dsh-wp-folder-dialog",
    					role: "dialog",
    					"aria-modal": "true",
    					"aria-label": `选择${folderPickerTarget === "workspace" ? "工作区" : "输出"}文件夹`,
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h2", { children: [
    							"选择",
    							folderPickerTarget === "workspace" ? "工作区" : "输出",
    							"文件夹"
    						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "这里只浏览文件夹名称；取消不会更改当前设置。" })] }) }),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    							className: "dsh-wp-folder-path",
    							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    								"aria-label": "当前文件夹路径",
    								value: folderPickerPath,
    								onChange: (event) => setFolderPickerPath(event.target.value),
    								onKeyDown: (event) => {
    									if (event.key === "Enter") browseFolder(folderPickerPath, folderPickerRoot);
    								}
    							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    								onClick: () => void browseFolder(folderPickerPath, folderPickerRoot),
    								disabled: folderPickerBusy,
    								children: "转到"
    							})]
    						}),
    						folderPickerError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    							className: "dsh-wp-folder-error",
    							role: "alert",
    							children: folderPickerError
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
    							className: "dsh-wp-folder-current",
    							children: ["当前位置：", folderPickerPath || "尚未选择"]
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    							className: "dsh-wp-folder-list",
    							"aria-label": "子文件夹",
    							children: folderPickerBusy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "正在读取文件夹…" }) : folderPickerDirectories.length ? folderPickerDirectories.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    								onClick: () => void browseFolder(entry.path, folderPickerRoot),
    								children: [
    									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    										"aria-hidden": "true",
    										children: "📁"
    									}),
    									entry.name,
    									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "打开" })
    								]
    							}, entry.path)) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "此目录下没有可显示的子文件夹。" })
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", { children: [
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    								onClick: () => folderPickerParent && void browseFolder(folderPickerParent, folderPickerRoot),
    								disabled: folderPickerBusy || !folderPickerParent,
    								children: "上一级"
    							}),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    								onClick: () => {
    									folderPickerSequence.current++;
    									setFolderPickerTarget(void 0);
    								},
    								children: "取消"
    							}),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    								className: "is-primary",
    								onClick: chooseFolder,
    								disabled: folderPickerBusy || !folderPickerPath,
    								children: "选择当前文件夹"
    							})
    						] })
    					]
    				})
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
    				className: "dsh-wp-actions",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
    					"节点 ",
    					workflow.nodes.length,
    					"　任务 ",
    					taskNodes.length,
    					"　资料 ",
    					workflow.nodes.length - taskNodes.length,
    					"　修订 ",
    					workflow.revision
    				] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-actions-group",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							onClick: () => addNode("task"),
    							disabled: !canEdit,
    							children: "＋ 任务"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
    							className: "dsh-wp-add-menu",
    							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: "＋ 添加资料" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    								onClick: () => selectedNode?.type === "task" ? addContextToTask(selectedNode.id, "file") : addNode("file"),
    								disabled: !canEdit || Boolean(editProposal),
    								children: ["参考文件", selectedNode?.type === "task" ? "并关联所选任务" : ""]
    							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    								onClick: () => selectedNode?.type === "task" ? addContextToTask(selectedNode.id, "prompt") : addNode("prompt"),
    								disabled: !canEdit || Boolean(editProposal),
    								children: ["提示词", selectedNode?.type === "task" ? "并关联所选任务" : ""]
    							})] })]
    						}),
    						selectedNode && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-danger",
    							onClick: () => deleteNode(selectedNode.id),
    							disabled: !canEdit,
    							children: "删除所选"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    							onClick: () => setInspectorOpen((open) => !open),
    							"aria-expanded": inspectorOpen,
    							children: ["详情 ", inspectorOpen ? "隐藏" : "显示"]
    						}),
    						revisionNeedsApply && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: () => void runAction("apply"),
    							disabled: busy || Boolean(editProposal) || active && currentRun?.state !== "paused",
    							children: "应用修改并运行"
    						}),
    						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							className: "is-primary",
    							onClick: () => void startRun(),
    							disabled: busy || runLocked || !savedWorkflowId || Boolean(editProposal),
    							children: "运行"
    						})
    					]
    				})]
    			}),
    			revisionNeedsApply && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
    				className: "dsh-wp-revision-note",
    				role: "status",
    				children: [
    					"已保存修订 ",
    					workflow.revision,
    					"，当前运行仍使用修订 ",
    					currentRun?.workflow.revision,
    					"。应用后，内容、资料或依赖发生变化的任务及其后继将重新执行；输入和产物均未变化、且磁盘文件复核一致的成功任务会明确标记为复用。旧运行记录继续保留。"
    				]
    			}),
    			currentRun && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RunProgress, {
    				run: currentRun,
    				syncError: runSyncError,
    				onTask: onTaskConversation,
    				onStop: busy ? void 0 : () => void runAction("cancel")
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: `dsh-wp-workarea${inspectorOpen ? " has-inspector" : ""}`,
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-canvas",
    					"aria-label": "工作流画布",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(index, {
    						onInit: (instance) => setFlowInstance(instance),
    						nodes: flowNodes,
    						edges: flowEdges,
    						nodeTypes: NODE_TYPES,
    						onNodesChange,
    						onEdgesChange,
    						onConnect,
    						onNodeClick: (_event, node) => {
    							setSelectedNodeId(node.id);
    							setInspectorOpen(true);
    							setNodeMenu(void 0);
    							setPreview(void 0);
    							if (node.type === "task" && currentRun) onTaskConversation(node.id);
    						},
    						onNodeContextMenu: (event, node) => {
    							event.preventDefault();
    							setSelectedNodeId(node.id);
    							setInspectorOpen(true);
    							setNodeMenu({
    								id: node.id,
    								x: Math.min(event.clientX, window.innerWidth - 190),
    								y: Math.min(event.clientY, window.innerHeight - 90)
    							});
    						},
    						onPaneClick: () => setNodeMenu(void 0),
    						isValidConnection: (connection) => canConnect(workflow, connection),
    						fitView: true,
    						fitViewOptions: { padding: .25 },
    						minZoom: .25,
    						maxZoom: 1.8,
    						deleteKeyCode: canEdit ? ["Backspace", "Delete"] : null,
    						nodesDraggable: true,
    						nodesConnectable: canEdit,
    						elementsSelectable: true,
    						panOnDrag: true,
    						panOnScroll: true,
    						zoomOnScroll: true,
    						children: [
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Background, {
    								gap: 24,
    								size: 1,
    								color: "var(--dsw-alias-border-l2)"
    							}),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(MiniMap, {
    								pannable: true,
    								zoomable: true,
    								nodeColor: (node) => node.type === "task" ? "var(--dsw-alias-brand-primary)" : node.type === "file" ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-label-tertiary)"
    							}),
    							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Controls, { showInteractive: true })
    						]
    					}), nodeMenu && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    						className: "dsh-wp-context-menu",
    						role: "menu",
    						style: {
    							left: nodeMenu.x,
    							top: nodeMenu.y
    						},
    						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    							role: "menuitem",
    							className: "is-danger",
    							onClick: () => deleteNode(nodeMenu.id),
    							children: "删除此节点"
    						})
    					})]
    				}), inspectorOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
    					className: "dsh-wp-inspector",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    							className: "dsh-wp-inspector-top",
    							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: selectedNode ? "节点详情" : "运行详情" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    								"aria-label": "关闭详情",
    								onClick: () => setInspectorOpen(false),
    								children: "收起"
    							})]
    						}),
    						selectedNode ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NodeInspector, {
    							node: selectedNode,
    							canEdit,
    							taskNodes: workflow.nodes,
    							links: linksToSelected,
    							workflow,
    							run: currentRun,
    							preview,
    							onUpdate: (update) => updateNode(selectedNode.id, update),
    							onPreview: () => selectedNode.type === "file" && void previewFile(selectedNode),
    							onLink: (contextId) => changeWorkflow((current) => {
    								if (current.edges.some((edge) => edge.type === "context" && edge.source === contextId && edge.target === selectedNode.id)) return current;
    								return {
    									...current,
    									edges: [...current.edges, {
    										type: "context",
    										id: newId(),
    										source: contextId,
    										target: selectedNode.id
    									}]
    								};
    							}),
    							onUnlink: (contextId) => changeWorkflow((current) => ({
    								...current,
    								edges: current.edges.filter((edge) => !(edge.type === "context" && edge.source === contextId && edge.target === selectedNode.id))
    							}))
    						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    							className: "dsh-wp-empty",
    							children: "选中画布节点后，在这里编辑内容、关联资料并查看运行记录。"
    						}),
    						currentRun && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RunInspector, {
    							run: currentRun,
    							busy,
    							onAction: (action, taskId) => void runAction(action, taskId)
    						})
    					]
    				})]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("footer", {
    				className: "dsh-wp-footer",
    				children: "数据保存在 DSH_HOME。手动编辑无需模型；AI 草稿与 Agent 运行需要 DSH 设置 → Models 中已配置的模型。"
    			})
    		]
    	});
    }
    function NodeInspector(props) {
    	const { node } = props;
    	const currentRunTask = props.run?.tasks.find((task) => task.taskId === node.id);
    	const contexts = props.taskNodes.filter((item) => item.type !== "task");
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-inspector-section",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: `dsh-wp-type-badge is-${node.type}`,
    				children: node.type === "task" ? "任务节点" : node.type === "file" ? "文件节点" : "提示词节点"
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["标题", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    				value: node.title,
    				disabled: !props.canEdit,
    				onChange: (event) => props.onUpdate((current) => ({
    					...current,
    					title: event.target.value
    				}))
    			})] }),
    			node.type === "task" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["任务要求", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    					rows: 5,
    					value: node.instructions,
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "task" ? {
    						...current,
    						instructions: event.target.value
    					} : current)
    				})] }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["验收条件（每行一条）", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    					rows: 3,
    					value: node.acceptanceCriteria.join("\n"),
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "task" ? {
    						...current,
    						acceptanceCriteria: lines(event.target.value)
    					} : current)
    				})] }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["预期产物（相对输出目录，每行一个）", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    					rows: 2,
    					value: node.expectedArtifacts.join("\n"),
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "task" ? {
    						...current,
    						expectedArtifacts: lines(event.target.value)
    					} : current)
    				})] }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["文件内容检查（每行填写“相对路径 + 制表符 + 必须包含的文本”）", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    					rows: 2,
    					value: node.expectedContents.map(({ path, text }) => `${path}\t${text}`).join("\n"),
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "task" ? {
    						...current,
    						expectedContents: parseContentChecks(event.target.value)
    					} : current)
    				})] }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
    					className: "dsh-wp-checkbox",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    						type: "checkbox",
    						checked: node.acceptanceMode === "automatic",
    						disabled: !props.canEdit,
    						onChange: (event) => props.onUpdate((current) => current.type === "task" ? {
    							...current,
    							acceptanceMode: event.target.checked ? "automatic" : "manual"
    						} : current)
    					}), "自动核验预期产物；未勾选时等待人工验收"]
    				})
    			] }),
    			node.type === "file" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["工作区内的绝对文件路径", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    					rows: 2,
    					spellCheck: false,
    					value: node.path,
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "file" ? {
    						...current,
    						path: event.target.value
    					} : current),
    					placeholder: `${props.workflow.workspaceDirectory}\inputs\需求.md`
    				})] }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					onClick: props.onPreview,
    					disabled: !node.path.trim(),
    					children: "预览并校验文件"
    				}),
    				props.preview?.path === node.path && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("pre", {
    					className: "dsh-wp-preview",
    					children: [props.preview.content.slice(0, 12e3), props.preview.content.length > 12e3 ? "\n…（预览截断，运行快照保留完整文件）" : ""]
    				})
    			] }),
    			node.type === "prompt" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["补充要求", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
    				rows: 7,
    				value: node.text,
    				disabled: !props.canEdit,
    				onChange: (event) => props.onUpdate((current) => current.type === "prompt" ? {
    					...current,
    					text: event.target.value
    				} : current)
    			})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
    				className: "dsh-wp-checkbox",
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
    					type: "checkbox",
    					checked: node.enabled,
    					disabled: !props.canEdit,
    					onChange: (event) => props.onUpdate((current) => current.type === "prompt" ? {
    						...current,
    						enabled: event.target.checked
    					} : current)
    				}), "启用此提示词"]
    			})] }),
    			node.type === "task" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "关联上下文" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-context-list",
    				children: [
    					props.links.map((edge) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: props.workflow.nodes.find((item) => item.id === edge.source)?.title ?? edge.source }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						onClick: () => props.onUnlink(edge.source),
    						disabled: !props.canEdit,
    						children: "解除"
    					})] }, edge.id)),
    					contexts.filter((context) => !props.links.some((edge) => edge.source === context.id)).map((context) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
    						onClick: () => props.onLink(context.id),
    						disabled: !props.canEdit,
    						children: ["＋ ", context.title]
    					}, context.id)),
    					contexts.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "还没有文件或提示词节点。可从上方添加，或拖动上下文节点连到任务。" })
    				]
    			})] }),
    			currentRunTask && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
    				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "最近运行" }),
    				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    					"状态：",
    					taskStateLabel(currentRunTask.state),
    					" · 本次尝试：",
    					currentRunTask.attempts.length
    				] }),
    				currentRunTask.reusedFromRunId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
    					className: "dsh-wp-reused-result",
    					children: [
    						"本次复用了运行 ",
    						currentRunTask.reusedFromRunId,
    						" 的第 ",
    						currentRunTask.reusedFromAttemptNumber,
    						" 次成功结果；详细 Agent 记录仍在源运行中。"
    					]
    				}),
    				currentRunTask.attempts.map((attempt) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
    					className: "dsh-wp-attempt",
    					children: [
    						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
    							"第 ",
    							attempt.number,
    							" 次 · ",
    							taskStateLabel(attempt.state)
    						] }),
    						attempt.agentId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: ["DSH 会话：", attempt.agentId] }),
    						attempt.toolNames.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: ["工具：", attempt.toolNames.join("、")] }),
    						attempt.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: attempt.error }),
    						attempt.result && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: attempt.result.slice(0, 5e3) })
    					]
    				}, attempt.number))
    			] })
    		]
    	});
    }
    function buildUiEditDiff(base, candidate) {
    	const beforeNodes = new Map(base.nodes.map((node) => [node.id, node]));
    	const afterNodes = new Map(candidate.nodes.map((node) => [node.id, node]));
    	const beforeEdges = new Map(base.edges.map((edge) => [edge.id, edge]));
    	const afterEdges = new Map(candidate.edges.map((edge) => [edge.id, edge]));
    	return {
    		addedNodes: candidate.nodes.filter((node) => !beforeNodes.has(node.id)),
    		removedNodes: base.nodes.filter((node) => !afterNodes.has(node.id)),
    		changedNodes: candidate.nodes.flatMap((node) => {
    			const before = beforeNodes.get(node.id);
    			return before && JSON.stringify(before) !== JSON.stringify(node) ? [{
    				before,
    				after: node
    			}] : [];
    		}),
    		addedEdges: candidate.edges.filter((edge) => !beforeEdges.has(edge.id)),
    		removedEdges: base.edges.filter((edge) => !afterEdges.has(edge.id))
    	};
    }
    function EditProposalDiff({ base, candidate, diff }) {
    	const name = (id) => candidate.nodes.find((node) => node.id === id)?.title ?? base.nodes.find((node) => node.id === id)?.title ?? id;
    	const edgeText = (edge) => `${name(edge.source)} → ${name(edge.target)}（${edge.type === "dependency" ? "依赖" : "资料上下文"}）`;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-edit-diff",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "待应用差异（按当前候选画布计算）" }),
    			!diff.addedNodes.length && !diff.removedNodes.length && !diff.changedNodes.length && !diff.addedEdges.length && !diff.removedEdges.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "当前没有差异。" }),
    			diff.addedNodes.map((node) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				"＋ 新增",
    				node.type === "task" ? "任务" : node.type === "file" ? "文件" : "提示词",
    				"：",
    				node.title
    			] }, `add-${node.id}`)),
    			diff.removedNodes.map((node) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				"− 删除",
    				node.type === "task" ? "任务" : node.type === "file" ? "文件" : "提示词",
    				"：",
    				node.title,
    				"（相关连线也会移除）"
    			] }, `remove-${node.id}`)),
    			diff.changedNodes.map(({ before, after }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				"✎ 修改“",
    				before.title,
    				"”：",
    				describeWorkflowNodeChanges(before, after).join("、") || "节点属性"
    			] }, `change-${after.id}`)),
    			diff.removedEdges.map((edge) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: ["− 移除连线：", edgeText(edge)] }, `edge-remove-${edge.id}`)),
    			diff.addedEdges.map((edge) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: ["＋ 新增连线：", edgeText(edge)] }, `edge-add-${edge.id}`))
    		]
    	});
    }
    function RunInspector({ run, busy, onAction }) {
    	if (!run) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-inspector-section",
    		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "运行记录" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    			className: "dsh-wp-empty",
    			children: "保存后可以启动串行运行。每个任务使用独立 DSH 会话，失败任务不会自动重试。"
    		})]
    	});
    	const inFlight = [
    		"queued",
    		"running",
    		"pausing",
    		"paused",
    		"verifying",
    		"stopping"
    	].includes(run.state);
    	const failedTask = run.tasks.find((task) => task.state === "failed");
    	const reviewTask = run.tasks.find((task) => task.state === "needs_review");
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: "dsh-wp-inspector-section dsh-wp-run",
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "运行记录" }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
    				className: `dsh-wp-run-state is-${run.state}`,
    				children: runStateLabel(run.state)
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				"本次快照：修订 ",
    				run.workflow.revision,
    				" · Run ",
    				run.id
    			] }),
    			run.parentRunId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				"来源运行：",
    				run.parentRunId,
    				"；复用 ",
    				run.tasks.filter((task) => task.reusedFromRunId).length,
    				" 项，需重新执行 ",
    				run.invalidatedTaskIds?.length ?? 0,
    				" 项。"
    			] }),
    			run.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
    				className: "dsh-wp-run-error",
    				children: run.error
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-run-actions",
    				children: [
    					run.state === "running" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						onClick: () => onAction("pause"),
    						disabled: busy,
    						children: "暂停（当前任务结束后）"
    					}),
    					run.state === "paused" && !reviewTask && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						onClick: () => onAction("resume"),
    						disabled: busy,
    						children: "继续"
    					}),
    					run.state === "interrupted" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-primary",
    						onClick: () => onAction("recover"),
    						disabled: busy,
    						children: "恢复运行"
    					}),
    					run.state === "paused" && reviewTask && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-primary",
    						onClick: () => onAction("accept", reviewTask.taskId),
    						disabled: busy,
    						children: "通过此任务"
    					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-danger",
    						onClick: () => onAction("reject", reviewTask.taskId),
    						disabled: busy,
    						children: "驳回此任务"
    					})] }),
    					inFlight && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-danger",
    						onClick: () => onAction("cancel"),
    						disabled: busy || run.state === "stopping",
    						children: run.state === "stopping" ? "正在停止…" : "停止"
    					}),
    					failedTask && !inFlight && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						onClick: () => onAction("retry", failedTask.taskId),
    						disabled: busy,
    						children: "重试失败任务"
    					}),
    					run.state === "needs_review" && run.tasks.every((task) => task.state === "succeeded") && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						onClick: () => onAction("verify"),
    						disabled: busy,
    						children: "重新检查"
    					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						className: "is-primary",
    						onClick: () => onAction("accept"),
    						disabled: busy,
    						children: "人工验收完成"
    					})] })
    				]
    			}),
    			run.contextSnapshots.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
    				"本次上下文快照（",
    				run.contextSnapshots.length,
    				"）"
    			] }), run.contextSnapshots.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
    				item.title,
    				" · ",
    				item.sha256 || "提示词快照"
    			] }, item.nodeId))] }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
    				"事件日志（",
    				run.events.length,
    				"）"
    			] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
    				className: "dsh-wp-event-list",
    				children: run.events.map((event) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", { children: new Date(event.at).toLocaleTimeString() }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: event.type }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: event.message })
    				] }, event.seq))
    			})] }),
    			run.verification.summary && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-verification",
    				children: [
    					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: ["独立检查：", run.verification.status === "passed" ? "通过" : run.verification.status === "failed" ? "未通过" : "受阻"] }),
    					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: run.verification.summary }),
    					run.verification.toolNames.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: ["实际检查工具：", run.verification.toolNames.join("、")] })
    				]
    			})
    		]
    	});
    }
    function TaskCard({ data, selected }) {
    	const [menuOpen, setMenuOpen] = (0, react.useState)(false);
    	const node = data.node;
    	if (node.type !== "task") return null;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: `dsh-wp-node dsh-wp-node-task is-${data.state ?? "pending"}${selected ? " is-selected" : ""}`,
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle, {
    				type: "target",
    				position: Position.Left,
    				id: "in"
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    				className: "dsh-wp-node-kind",
    				children: "任务 · 执行"
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: node.title }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
    				className: "dsh-wp-node-status",
    				children: taskProgressLabel(data.state ?? "pending")
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: node.instructions }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    				className: "dsh-wp-node-add-wrap nodrag nopan",
    				onPointerDown: (event) => event.stopPropagation(),
    				onClick: (event) => event.stopPropagation(),
    				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    					className: "dsh-wp-node-add",
    					"aria-expanded": menuOpen,
    					onClick: () => setMenuOpen((open) => !open),
    					children: "＋ 添加资料"
    				}), menuOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    					className: "dsh-wp-node-add-menu",
    					role: "menu",
    					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						role: "menuitem",
    						onClick: () => {
    							data.onAddContext?.("file");
    							setMenuOpen(false);
    						},
    						children: "参考文件"
    					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
    						role: "menuitem",
    						onClick: () => {
    							data.onAddContext?.("prompt");
    							setMenuOpen(false);
    						},
    						children: "提示词"
    					})]
    				})]
    			}),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle, {
    				type: "source",
    				position: Position.Right,
    				id: "out"
    			})
    		]
    	});
    }
    function FileCard({ data, selected }) {
    	const node = data.node;
    	if (node.type !== "file") return null;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: `dsh-wp-node dsh-wp-node-file${selected ? " is-selected" : ""}`,
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: ["▤ ", node.title] }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: node.path || "双击选中后填写工作区文件路径" }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle, {
    				type: "source",
    				position: Position.Right,
    				id: "out"
    			})
    		]
    	});
    }
    function PromptCard({ data, selected }) {
    	const node = data.node;
    	if (node.type !== "prompt") return null;
    	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
    		className: `dsh-wp-node dsh-wp-node-prompt${selected ? " is-selected" : ""}`,
    		children: [
    			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: ["✎ ", node.title] }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: node.text || "双击选中后填写补充要求" }),
    			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle, {
    				type: "source",
    				position: Position.Right,
    				id: "out"
    			})
    		]
    	});
    }
    const NODE_TYPES = {
    	task: TaskCard,
    	file: FileCard,
    	prompt: PromptCard
    };
    function newWorkflow(workspaceDirectory = "") {
    	const now = Date.now();
    	const nodes = DEFAULT_TASKS.map((item, index) => ({
    		type: "task",
    		id: `task-${index + 1}`,
    		title: item.title,
    		instructions: item.instructions,
    		acceptanceCriteria: [`人工核对“${item.title}”的执行结果和关联产物。`],
    		expectedArtifacts: [],
    		expectedContents: [],
    		acceptanceMode: "manual",
    		order: index,
    		position: {
    			x: 60 + index * 330,
    			y: 120
    		}
    	}));
    	return {
    		id: newId(),
    		title: "新建工作流",
    		objective: "",
    		workspaceDirectory,
    		outputDirectory: workspaceDirectory,
    		schemaVersion: 1,
    		revision: 0,
    		nodes,
    		edges: [],
    		createdAt: now,
    		updatedAt: now
    	};
    }
    function toFlowNodes(workflow) {
    	return workflow.nodes.map((node) => ({
    		id: node.id,
    		type: node.type,
    		position: { ...node.position },
    		data: { node }
    	}));
    }
    function toFlowEdges(workflow) {
    	return workflow.edges.map((edge) => ({
    		id: edge.id,
    		source: edge.source,
    		target: edge.target,
    		data: { kind: edge.type }
    	}));
    }
    function fromFlowEdges(edges) {
    	const result = [];
    	for (const edge of edges) {
    		if (edge.data?.kind === "dependency") result.push({
    			type: "dependency",
    			id: edge.id,
    			source: edge.source,
    			target: edge.target
    		});
    		if (edge.data?.kind === "context") result.push({
    			type: "context",
    			id: edge.id,
    			source: edge.source,
    			target: edge.target
    		});
    	}
    	return result;
    }
    function canConnect(workflow, connection) {
    	if (!connection.source || !connection.target || connection.source === connection.target) return false;
    	const source = workflow.nodes.find((node) => node.id === connection.source);
    	const target = workflow.nodes.find((node) => node.id === connection.target);
    	if (!source || !target || target.type !== "task") return false;
    	if (source.type === "task" && target.type !== "task") return false;
    	return !workflow.edges.some((edge) => edge.source === source.id && edge.target === target.id && edge.type === (source.type === "task" ? "dependency" : "context"));
    }
    function unwrap(result) {
    	if (!result.ok) throw new Error(result.error.message);
    	return result.value;
    }
    function errorMessage(error) {
    	if (error instanceof Error) return error.message;
    	return String(error);
    }
    function newId() {
    	return globalThis.crypto.randomUUID();
    }
    function actionLabel(action) {
    	return {
    		pause: "暂停",
    		resume: "继续",
    		cancel: "停止",
    		recover: "恢复运行",
    		retry: "重试",
    		verify: "重新检查",
    		accept: "人工验收",
    		reject: "驳回",
    		apply: "应用修订"
    	}[action] ?? action;
    }
    function taskStateLabel(state) {
    	return {
    		pending: "等待中",
    		running: "运行中",
    		needs_review: "待人工验收",
    		succeeded: "已完成",
    		failed: "失败",
    		skipped: "已跳过",
    		cancelled: "已取消",
    		interrupted: "已中断"
    	}[state] ?? state;
    }
    function lines(value) {
    	return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    }
    function parseContentChecks(value) {
    	return value.split(/\r?\n/).map((line) => {
    		const tab = line.indexOf("	");
    		return tab < 1 ? void 0 : {
    			path: line.slice(0, tab).trim(),
    			text: line.slice(tab + 1).trim()
    		};
    	}).filter((check) => Boolean(check?.path && check.text));
    }
    function runStateLabel(state) {
    	return {
    		queued: "排队中",
    		running: "运行中",
    		pausing: "等待任务边界暂停",
    		stopping: "正在停止并清理",
    		paused: "已暂停",
    		verifying: "产物检查中",
    		completed: "检查通过",
    		needs_review: "等待人工验收",
    		failed: "运行失败",
    		cancelled: "已停止",
    		interrupted: "上次运行中断",
    		accepted: "人工验收完成"
    	}[state] ?? state;
    }
    //#endregion
    exports.apply = apply;
    exports.inject = inject;
    exports.name = name;
    
    return module.exports;
  },
});
