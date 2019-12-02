<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Basic</h1>353
		<vc-time-picker
			:value="value"
			confirm
			readonly
			format="HH时mm分ss秒"
			@ok="handleOk"
			@change="handleChange"
		/>
		<vc-time-picker
			:value="value2"
			type="timerange"
			confirm
			readonly
			format="HH时mm分ss秒"
			@change="handleChange"
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
			value: '01:01:00',
			value2: ['09:41:00', '12:00:00']
		};
	},
	computed: {
		
	},
	methods: {
		handleOk() {

		},
		handleChange(val) {
			console.log(val);
		}
	}
};
</script>
