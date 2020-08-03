import { Block } from "@contentarchitect/core"
import view from "./view.vue"
import { serialize, treeToHTML } from "./serialize"
import icon from "./icon.svg"

export default class Toc extends Block {
	static get viewComponent () {
		return view;
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
		const headers = blocks.filter(block => block.constructor.name == "Header")
		return treeToHTML(serialize(headers).children)
	}

	static serializeFromHTML (doc) {
		return {}
	}
}