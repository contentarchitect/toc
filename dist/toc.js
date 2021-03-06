(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@contentarchitect/editor')) :
	typeof define === 'function' && define.amd ? define(['@contentarchitect/editor'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Toc = factory(global.ContentArchitect));
}(this, (function (editor) { 'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	const TreeItem = {
		props: {
			item: Object
		},
	};

	TreeItem.components = {
		TreeItem
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	const __vue_script__ = TreeItem;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("li", [
	    _c("a", {
	      attrs: { href: "#" + _vm.item.anchorId },
	      domProps: { innerHTML: _vm._s(_vm.item.content) }
	    }),
	    _vm._v(" "),
	    _vm.item.children.length
	      ? _c(
	          "ul",
	          _vm._l(_vm.item.children, function(child, index) {
	            return _c("TreeItem", { key: index, attrs: { item: child } })
	          }),
	          1
	        )
	      : _vm._e()
	  ])
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	function serialize (list) {
		let res = {
			level: 0,
			parent: null,
			children: []
		};

		const newList = [];

		list.forEach((head, ind) => {
			const header = { ...head, children: [], parent: null };
			newList.push(header);

			let prevHeader = newList[ind-1];

			if (ind == 0) {
				header.parent = res;
				res.children.push(header);
			} else {
				if (header.level < prevHeader.level) {
					while (prevHeader.parent && prevHeader.parent.level >= header.level) {
						prevHeader = prevHeader.parent;
					}
					header.parent = prevHeader.parent;
					prevHeader.parent.children.push(header);
				} else if (header.level > prevHeader.level) {
					header.parent = prevHeader;
					prevHeader.children.push(header);
				} else if (header.level == prevHeader.level) {
					header.parent = prevHeader.parent;
					header.parent.children.push(header);
				}
			}
		});

		return res;
	}

	function treeToHTML (tree) {
		if (Array.isArray(tree)) {
			return `<ul>${tree.map(item => treeToHTML(item)).join("")}</ul>`
		} else {
			var list = 	tree.children.length 
				? `<ul>${tree.children.map(child => treeToHTML(child)).join("")}</ul>`
				: "";

			return `<li>
			<a href="#${tree.anchorId}">${tree.content}</a>
			${list}
		</li>`
		}
	}

	//

	var script = {
		components: {
			TreeItem: __vue_component__
		},
		props: ['value'],
		inject: ['slottedBlocks'],
		data () {
			return {
				tree: null,
			}
		},
		watch: {
			slottedBlocks: {
				immediate: true,
				deep: true,
				handler () {
					const headers = this.slottedBlocks.filter(block => block.constructor.name === "Header");
					this.tree = serialize(headers);
				}
			}
		}
	};

	/* script */
	const __vue_script__$1 = script;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "ul",
	    _vm._l(_vm.tree.children, function(item) {
	      return _c("TreeItem", { key: item.id, attrs: { item: item } })
	    }),
	    1
	  )
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var icon = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","height":"24","width":"24"}},[_c('path',{attrs:{"d":"M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"}}),_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}})]) } };

	class Toc extends editor.Block {
		static get viewComponent () {
			return __vue_component__$1;
		}

		static get icon () {
			return icon;
		}

		static defaultData () {
			return {
				tree: null
			}
		}

		toHTML (blocks) {
			const headers = blocks.filter(block => block.constructor.name == "Header");
			return treeToHTML(serialize(headers).children)
		}

		static serializeFromHTML (doc) {
			return {}
		}
	}

	return Toc;

})));
