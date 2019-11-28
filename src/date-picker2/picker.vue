<template>
	<div class="vc-time-picker">
		<vc-dropdown
			v-model="isOpen"
			trigger="click"
			placement="bottom"
			@click.native="handleDropStop"
		>
			<vc-input
				:value="timeValue"
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
					:selection-mode="selectionMode"
					@pick="onPick"
					@pick-success="handlePickSuccess"
					@pick-clear="handleClear"
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

const extractTime = date => {
	if (!date) return [0, 0, 0];
	return [
		date.getHours(), date.getMinutes(), date.getSeconds()
	];
};

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
		
		return {
			internalValue: initialValue,
			focusedDate: initialValue[0] || new Date(),
			selectionMode: this.onSelectionModeChange(this.type),
			isOpen: false
		};
	},
	computed: {
		isConfirm() {
			return this.confirm || this.type === 'datetime' || this.type === 'datetimerange' || this.multiple;
		},
		timeValue() {
			return this.formatDate(this.internalValue);
		},
		publicStringValue() {
			const { formatDate, publicVModelValue, type } = this;
			if (type.match(/^time/)) return publicVModelValue;
			if (this.multiple) return formatDate(publicVModelValue);
			return Array.isArray(publicVModelValue) ? publicVModelValue.map(formatDate) : formatDate(publicVModelValue);
		},

	},
	watch: {
		value(val) {
			this.internalValue = this.parseDate(val);
		},
	},
	mounted() {
	},
	methods: {
		onSelectionModeChange(type) {
			if (type.match(/^date/)) type = 'date';
			this.selectionMode = /(year|month|date|time)/.test(type) && type;
			return this.selectionMode;
		},
		handleChange() {

		},
		handleFocus() {
			console.log('focus');
			
		},
		handleBlur() {
			console.log('blur');
		},
		handleEnter() {

		},
		handleDropStop() {
			
		},
		emitChange(type) {
			this.$nextTick(() => {
				this.$emit('change', this.publicStringValue, type);
				this.dispatch('FormItem', 'form-change', this.publicStringValue);
			});
		},
		parseDate(val) {
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
		},
		formatDate(value) {
			const format = DEFAULT_FORMATS[this.type];
			if (this.multiple) {
				const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
				return formatter(value, this.format || format, this.separator);
			} else {
				const { formatter } = (
					TYPE_VALUE_RESOLVER_MAP[this.type]
                        || TYPE_VALUE_RESOLVER_MAP.default
				);
				return formatter(value, this.format || format, this.separator);
			}
		},
		onPick(dates, visible = false, type) {
			if (this.multiple) {
				console.log(2222);
				
			} else {
				dates = this.parseDate(dates);
				this.internalValue = Array.isArray(dates) ? dates : [dates];
				console.log(this.internalValue, '00000');
				
			}
			 if (this.internalValue[0]) this.focusedDate = this.internalValue[0];
			this.focusedTime = {
				...this.focusedTime,
				time: this.internalValue.map(extractTime)
			};
			if (!this.isConfirm) this.onSelectionModeChange(this.type); // reset the selectionMode
			if (!this.isConfirm) this.visible = visible;
			this.emitChange(type);
		},
		handlePickSuccess() {
			console.log(4444);
			
			this.isOpen = false;
			this.$emit('ok');
		},
		handleClear() {
			this.internalValue = [];
			this.isOpen = false;
			this.$emit('clear');
		},
		// 没搞懂这个方法有什么作用
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.name;
				}
			}
			if (parent) {
				parent.$emit(...[eventName].concat(params));
			}
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

</style>