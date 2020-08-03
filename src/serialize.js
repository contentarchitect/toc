export function serialize (list) {
	let res = {
		level: 0,
		parent: null,
		children: []
	};

	const newList = []

	list.forEach((head, ind) => {
		const header = { ...head, children: [], parent: null }
		newList.push(header)

		let prevHeader = newList[ind-1]

		if (ind == 0) {
			header.parent = res;
			res.children.push(header)
		} else {
			if (header.level < prevHeader.level) {
				while (prevHeader.parent && prevHeader.parent.level >= header.level) {
					prevHeader = prevHeader.parent
				}
				header.parent = prevHeader.parent
				prevHeader.parent.children.push(header)
			} else if (header.level > prevHeader.level) {
				header.parent = prevHeader
				prevHeader.children.push(header)
			} else if (header.level == prevHeader.level) {
				header.parent = prevHeader.parent
				header.parent.children.push(header)
			}
		}
	});

	return res;
}

export function treeToHTML (tree) {
	if (Array.isArray(tree)) {
		return `<ul>${tree.map(item => treeToHTML(item)).join("")}</ul>`
	} else {
		var list = 	tree.children.length 
			? `<ul>${tree.children.map(child => treeToHTML(child)).join("")}</ul>`
			: ""

		return `<li>
			<a href="#${tree.anchorId}">${tree.content}</a>
			${list}
		</li>`
	}
}