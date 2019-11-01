<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Basic</h1>353
		<vc-time-picker
			:value="value"
		/>
	</div>
</template>
<script>
import Timepicker from '../../time-picer2';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-time-picker': Timepicker,
	},
	data() {
		return {
			value: '09:41:00'
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
