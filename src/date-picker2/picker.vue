<template>
	<div class="vc-time-picker">
		<vc-popover
			v-model="isOpen"
			:portal-class-name="['is-padding-none']"
			trigger="click"
			placement="bottom"
			@click.native="handleDropStop"
		>
			<vc-input
				:value="timeValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				clearable
				@change="handleChange"
				@focus="handleFocus"
				@click.native="handleFocus"
				@blur="handleBlur"
				@enter="handleEnter"
				@keydown="handleKeydown"
			/>
			<template #content>
				<component
					ref="pickerPanel"
					:is="panel"
					:type="type"
					:value="internalValue"
					:confirm="isConfirm"
					:selection-mode="selectionMode"
					@pick="handlePick"
					@pick-success="handlePickSuccess"
					@pick-clear="handleClear"
				/>
			</template>
		</vc-popover>
	</div>
</template>
<script>
import Extends from "../extends";
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
	mixins: [...Extends.mixins(['emitter'])],
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
		},
		separator: {
			type: String,
			default: '-'
		},
		readonly: {
			type: Boolean,
			default: false
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
		publicVModelValue() {
			const isRange = this.type.includes('range');
			let val = this.internalValue.map(date => (date instanceof Date ? new Date(date) : (date || '')));
			if (this.type.match(/^time/)) val = val.map(this.formatDate);
			return isRange ? val : val[0];
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
		 publicVModelValue(now, before) {
			const newValue = JSON.stringify(now);
			const oldValue = JSON.stringify(before);
			const shouldEmitInput = newValue !== oldValue || typeof now !== typeof before;
			if (shouldEmitInput) this.$emit('input', now); // to update v-model
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
		},
		handleBlur() {
			
		},
		handleEnter() {

		},
		handleDropStop() {
			
		},
		handleKeydown() {
			console.log(3333);
			
		},
		emitChange(type) {
			this.$nextTick(() => {
				this.$emit('change', this.publicStringValue, type);
				this.dispatch('vc-form-item', 'form-change', this.publicStringValue);
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
			console.log(445454);
			
			if (val && type === 'time' && !(val instanceof Date)) {
				val = parser(val, format, this.separator);
			} else if (isRange) {
				if (!val) {
					val = [null, null];
				} else if (typeof val === 'string') {
					val = parser(val, format, this.separator);
				} else if (type === 'timerange') {
					val = parser(val, format, this.separator).map(v => v || '');
				} else {
					const [start, end] = val;
					if (start instanceof Date && end instanceof Date) {
						val = val.map(date => new Date(date));
					} else if (typeof start === 'string' && typeof end === 'string') {
						val = parser(val.join(this.separator), format, this.separator);
					} else if (!start || !end) {
						val = [null, null];
					}
				}
			}
			return (isRange || this.multiple) ? (val || []) : [val];
		},
		formatDate(value) {
			const format = DEFAULT_FORMATS[this.type];
			const { formatter } = (
				TYPE_VALUE_RESOLVER_MAP[this.type]
                        || TYPE_VALUE_RESOLVER_MAP.default
			);
			return formatter(value, this.format || format, this.separator);
		},
		handlePick(dates, visible = false, type) {
			dates = this.parseDate(dates);
			this.internalValue = Array.isArray(dates) ? dates : [dates];
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
			this.isOpen = false;
			this.$emit('ok');
		},
		handleClear() {
			this.internalValue = [];
			this.isOpen = false;
			this.$emit('clear');
		},
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

</style>