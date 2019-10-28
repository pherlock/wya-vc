<template>
	<div class="vc-time-picker">
		<vc-dropdown
			trigger="click"
			placement="bottom"
			@click.native="handleDropStop"
		>
			<vc-input
				v-model="timeValue"
				:placeholder="placeholder"
				:disabled="disabled"
				clearable
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
				@enter="handleEnter"
			/>
			<template #list>
				<component
					ref="pickerPanel"
					:is="panel"
					:type="type"
					:value="internalValue"
					:confirm="isConfirm"
				/>
			</template>
		</vc-dropdown>
	</div>
</template>
<script>
import Input from "../input/index";
import Popover from "../popover/index";
import Dropdown from "../dropdown/index";

export default {
	name: "vc-time-picker",
	components: {
		'vc-input': Input,
		'vc-popover': Popover,
		'vc-dropdown': Dropdown
	},
	props: {
		placeholder: {
			type: String,
			default: '选择日期'
		},
		type: {
			type: String,
			validator: v => /(time|timerange)/.test(v),
			default: 'time'
		},
		value: {
			type: [Array, String, Date]
		},
		confirm: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		format: {
			type: String
		}
	},
	data() {
		return {
			timeValue: '',
			internalValue: ''
		};
	},
	computed: {
		isConfirm() {
			return false;
		}
	},
	mounted() {
		console.log(this.panel);
		
	},
	methods: {
		handleChange() {

		},
		handleFocus() {

		},
		handleBlur() {

		},
		handleEnter() {

		},
		handleDropStop() {
			
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

</style>