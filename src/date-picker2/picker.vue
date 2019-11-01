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
import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP, getDayCountOfMonth } from "./util";

const isEmptyArray = val => val.reduce((isEmpty, str) => (isEmpty && !str) || (typeof str === 'string' && str.trim() === ''), true);
export default {
	name: "vc-time-picker",
	components: {
		'vc-input': Input,
		'vc-popover': Popover,
		'vc-dropdown': Dropdown
	},
	filters: {

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
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		format: {
			type: String
		},
		separator: {
			type: String,
			default: '-'
		}
	},
	data() {
		const isRange = this.type.includes('range');
		const emptyArray = isRange ? [null, null] : [null];
		const initialValue = isEmptyArray((isRange ? this.value : [this.value]) || []) ? emptyArray : this.parseDate(this.value);
		console.log(initialValue, '9090');
		
		return {
			timeValue: '',
			internalValue: initialValue
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
			
		},
		parseDate(val) {
			console.log(val);
			
			const isRange = this.type.includes('range');
			const type = this.type;
			const parser = (
				TYPE_VALUE_RESOLVER_MAP[type]
                || TYPE_VALUE_RESOLVER_MAP.default
			).parser;
			const format = this.format || DEFAULT_FORMATS[type];
			// const multipleParser = TYPE_VALUE_RESOLVER_MAP.multiple.parser;
			if (val && type === 'time' && !(val instanceof Date)) {
				val = parser(val, format, this.separator);
			}
			return (isRange || this.multiple) ? (val || []) : [val];
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

</style>