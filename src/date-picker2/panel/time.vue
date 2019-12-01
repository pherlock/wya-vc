<template>
	<div class="vc-time-panel">
		<vc-time-spinner
			ref="timeSpinner"
			:hours="timeSlots[0]"
			:minutes="timeSlots[1]"
			:seconds="timeSlots[2]"
			@change="handleChange"
		/>
		<div v-if="confirm" class="vc-time-panel__confirm">
			<vc-button @click="handleClear">清空</vc-button>
			<vc-button type="primary" @click="handleOk">确定</vc-button>
		</div>
	</div>
</template>

<script>
import TimeSpinner from "../base/time-spinner";
import Button from "../../button/index";
import { initTimeDate } from "../util";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export default {
	name: 'vc-time-panel',
	components: {
		'vc-time-spinner': TimeSpinner,
		'vc-button': Button
	},
	props: {
		value: {
			type: Array,
			required: true
		},
		format: {
			type: String,
			default: 'HH:mm:ss'
		},
		confirm: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			date: this.value[0] || initTimeDate()
		};
	},
	computed: {
		timeSlots() {
			if (!this.value[0]) return [];
			return ['getHours', 'getMinutes', 'getSeconds'].map(slot => this.date[slot]());
		}
	},
	watch: {
		value(res) {
			// 可能需要修改
			let newVal = res[0] || this.date[0] || initTimeDate();
			newVal = new Date(newVal);
			this.date = newVal;
		}
	},
	created() {
		
	},
	methods: {
		handleChange(date, emit = true) {
			const newDate = new Date(this.date);
			Object.keys(date).forEach(type => {
				newDate[`set${capitalize(type)}`](date[type]);
			});
			if (emit) this.$emit('pick', newDate, 'time');
		},
		handleClear() {
			this.$emit('pick-clear');
		},
		handleOk(date, emit = true) {
			this.$emit('pick-success');
		}
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

@include block(vc-time-panel) {
	@include element(confirm) {
		border-top: 1px solid #e8eaec;
		padding: 8px;
		text-align: right;
	}
}
</style>
