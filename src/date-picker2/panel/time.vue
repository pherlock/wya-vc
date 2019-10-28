<template>
	<div class="vc-time-panel">
		<vc-time-spinner
			ref="timeSpinner"
			:hours="1"
			:minutes="2"
			:seconds="3"
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
	props: {
		value: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			date: this.value[0] || initTimeDate()
		};
	},
	computed: {

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
		handleChange(val) {
			console.log(val, '90909');
			
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
