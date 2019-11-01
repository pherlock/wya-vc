<template>
	<div class="vc-time-panel">
		<vc-time-spinner
			ref="timeSpinner"
			:hours="timeSlots[0]"
			:minutes="timeSlots[1]"
			:seconds="timeSlots[2]"
			@change="handleChange"
		/>
		<div class="vc-time-panel__confirm">
			<vc-button @click="handleCancel">取消</vc-button>
			<vc-button type="primary" @click="handleOk">确定</vc-button>
		</div>
	</div>
</template>

<script>
import TimeSpinner from "../base/time-spinner";
import Button from "../../button/index";
import { initTimeDate } from "../util";

export default {
	name: 'vc-time-panel',
	components: {
		'vc-time-spinner': TimeSpinner,
		'vc-button': Button
	},
	filters: {
		capitalize(str) {
			return str[0].toUpperCase() + str.slice(1);
		}
	},
	props: {
		value: {
			type: Array,
			required: true
		},
		format: {
			type: String,
			default: 'HH:mm:ss'
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
		value() {
			let newVal = date[0] || initTimeDate();
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
				newDate[`set${this.capitalize(type)}`](date[type]);
			});
			console.log(newDate);
			
			if (emit) this.$emit('pick', newDate, 'time');
		},
		handleCancel() {

		},
		handleOk(date, emit = true) {

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
