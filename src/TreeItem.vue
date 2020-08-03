<template>
	<li>
		<a :href="`#${item.anchorId}`" v-html="item.content"></a>
		<ul v-if="item.children.length">
			<TreeItem
				v-for="(child, index) in item.children"
				:key="index"
				:item="child"
			/>
		</ul>
	</li>
</template>

<script>
const TreeItem = {
	props: {
		item: Object
	},
}

TreeItem.components = {
	TreeItem
}

export default TreeItem
</script>