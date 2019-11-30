<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Basic</h1>353
		<vc-time-picker
			:value="value"
			confirm
			readonly
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
			value: '01:01:00'
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
