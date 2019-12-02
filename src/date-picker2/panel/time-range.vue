<template>
	<div class="vc-time-range-panel">
		<div class="vc-time-range-panel__box">
			<vc-time-spinner
				ref="timeSpinner"
				:hours="value[0] && dateStart.getHours()"
				:minutes="value[0] && dateStart.getMinutes()"
				:seconds="value[0] && dateStart.getSeconds()"
				title="开始时间"
				type="timerange"
				@change="handleStartChange"
			/>
			<div class="vc-time-range-panel__box-line"/>
			<vc-time-spinner
				ref="timeSpinner"
				:hours="value[1] && dateEnd.getHours()"
				:minutes="value[1] && dateEnd.getMinutes()"
				:seconds="value[1] && dateEnd.getSeconds()"
				type="timerange"
				title="结束时间"
				@change="handleEndChange"
			/>
		</div>
		<div v-if="confirm" class="vc-time-range-panel__confirm">
			<vc-button size="small" @click="handleClear">清空</vc-button>
			<vc-button size="small" type="primary" @click="handleOk">确定</vc-button>
		</div>
	</div>
</template>

<script>
import TimeSpinner from "../base/time-spinner";
import Button from "../../button/index";
import { initTimeDate } from "../util";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export default {
	name: 'vc-time-range-panel',
	components: {
		'vc-time-spinner': TimeSpinner,
		'vc-button': Button
	},
	filters: {
		
	},
	props: {
		value: {
			type: Array,
			required: true,
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
		const [dateStart, dateEnd] = this.value.slice();
		console.log(dateStart, dateEnd);
		
		return {
			date: this.value[0] || initTimeDate(),
			dateStart: dateStart || initTimeDate(),
			dateEnd: dateEnd || initTimeDate()
		};
	},
	computed: {
	},
	watch: {
		 value(dates) {
			const [dateStart, dateEnd] = dates.slice();
			this.dateStart = dateStart || initTimeDate();
			this.dateEnd = dateEnd || initTimeDate();
			console.log(this.dateStart);
			console.log(this.dateEnd);
		}
	},
	created() {
		
	},
	methods: {
		handleChange(start, end, emit = true) {
			const dateStart = new Date(this.dateStart);
			let dateEnd = new Date(this.dateEnd);
			// 设置开始时间
			Object.keys(start).forEach(type => {
				dateStart[`set${capitalize(type)}`](start[type]);
			});
			// 设置结束时间
			Object.keys(end).forEach(type => {
				dateEnd[`set${capitalize(type)}`](end[type]);
			});
			// 结束时间必须大于开始时间
			if (dateEnd < dateStart) dateEnd = dateStart;
			if (emit) this.$emit('pick', [dateStart, dateEnd], 'time');
		},
		handleStartChange(date) {
			this.handleChange(date, {});
		},
		handleEndChange(date) {
			this.handleChange({}, date);
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

@include block(vc-time-range-panel) {
	@include element(box) {
		display: flex;
		&-line {
			width: 2px;
			background: #e8eaec;
		}
	}
	@include element(confirm) {
		border-top: 1px solid #e8eaec;
		padding: 8px;
		text-align: right;
	}
}
</style>
