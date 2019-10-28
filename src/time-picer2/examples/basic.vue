<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Basic</h1>353
		<vc-time-picker/>
	</div>
</template>
<script>
import TimePicker from '../time-picker';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-time-picker': TimePicker,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
