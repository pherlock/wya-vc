<template>
	<div class="vc-time-picker-spinner">
		<div v-if="type === 'timerange'" class="vc-time-picker-spinner__title">{{ title }}</div>
		<div class="vc-time-picker-spinner__cells">
			<div ref="hours" class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in hoursArray" 
						:key="item.val" 
						:class="{'is-selected' : item.selected}"
						class="vc-time-picker-spinner__list-cell"
						@click="handleClick('hours', item)"
					>
						{{ item.val | formatTime }}
					</li>
				</ul>
			</div>
			<div ref="minutes" class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in minutesArray" 
						:key="item.val" 
						:class="{'is-selected' : item.selected}"
						class="vc-time-picker-spinner__list-cell"
						@click="handleClick('minutes', item)"
					>
						{{ item.val | formatTime }}
					</li>
				</ul>
			</div>
			<div ref="seconds" class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in secondsArray" 
						:key="item.val" 
						:class="{'is-selected' : item.selected}"
						class="vc-time-picker-spinner__list-cell"
						@click="handleClick('seconds', item)"
					>
						{{ item.val | formatTime }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { scrollTop, firstUpperCase } from "../util";

const timeParts = ['hours', 'minutes', 'seconds'];
export default {
	name: "vc-time-picker-spinner",
	components: {
	},
	filters: {
		formatTime(item) {
			return item < 10 ? '0' + item : item;
		}
	},
	props: {
		type: String,
		title: String,
		hours: {
			type: [Number, String],
			default: null
		},
		minutes: {
			type: [Number, String],
			default: null
		},
		seconds: {
			type: [Number, String],
			default: null
		},
	},
	data() {
		return {
			compiled: false,
			focusedColumn: -1, // which column inside the picker
			focusedTime: [0, 0, 0] // the values array into [hh, mm, ss]

		};
	},
	computed: {
		hoursArray() {
			let hour = [];
			const focusedHour = this.focusedColumn === 0 && this.focusedTime[0];
			for (let i = 0; i < 24; i++) {
				let oHour = {
					val: i,
					selected: false
				};
				hour.focused = i === focusedHour;
				if (this.hours == i) oHour.selected = true;
				hour.push(oHour);
			}
			return hour;
		},
		minutesArray() {
			let minute = [];
			const focusedMinute = this.focusedColumn === 1 && this.focusedTime[1];
			for (let i = 0; i < 60; i++) {
				let oMinute = {
					val: i,
					selected: false
				};
				minute.focused = i === focusedMinute;
				if (this.minutes == i) oMinute.selected = true;
				minute.push(oMinute);
			}
			return minute;
		},
		secondsArray() {
			let second = [];
			const focusedMinute = this.focusedColumn === 2 && this.focusedTime[2];
			for (let i = 0; i < 60; i++) {
				let oSecond = {
					val: i,
					selected: false
				};
				second.focused = i === focusedMinute;
				if (this.seconds == i) oSecond.selected = true;
				second.push(oSecond);
			}
			return second;
		},
	},
	watch: {
		// 检测时分秒，把对应的列移到指定位置
		hours(val) {
			if (!this.compiled) return;
			this.scroll('hours', this.hoursArray.findIndex(obj => obj.val == val));
		},
		minutes(val) {
			if (!this.compiled) return;
			this.scroll('minutes', this.minutesArray.findIndex(obj => obj.val == val));
		},
		seconds(val) {
			if (!this.compiled) return;
			this.scroll('seconds', this.secondsArray.findIndex(obj => obj.val == val));
		},
		focusedTime(updated, old) {
			timeParts.forEach((part, i) => {
				if (updated[i] === old[i] || typeof updated[i] === 'undefined') return;
				const valueIndex = this[`${part}Array`].findIndex(obj => obj.text === updated[i]);
				this.scroll(part, valueIndex);
			});
		}

	},
	mounted() {
		this.$nextTick(() => this.compiled = true);
	},
	methods: {
		handleClick(type, item) {
			let data = {
				[type]: item.val
			};
			this.$emit('change', data);
		},
		scroll(type, index) {
			const from = this.$refs[type].scrollTop;
			const to = 24 * this.getScrollIndex(type, index);
			scrollTop(this.$refs[type], from, to, 500);
		},
		getScrollIndex(type, index) {
			const Type = firstUpperCase(type);
			// const disabled = this[`disabled${Type}`];
			// if (disabled.length && this.hideDisabledOptions) {
			// 	let _count = 0;
			// 	disabled.forEach(item => (item <= index ? _count++ : ''));
			// 	index -= _count;
			// }
			return index;
		},
		updateFocusedTime(col, time) {
			this.focusedColumn = col;
			this.focusedTime = time.slice();
		}
	},
};
</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vc-time-picker-spinner) {
	ul,li {
		list-style: none;
	}
	font-size: 14px;
	@include element(title) {
		height: 32px;
		line-height: 32px;
		text-align: center;
		border-bottom: 1px solid #e8eaec;
	}
	@include element(cells) {
		display: flex;
	}
	@include element(list) {
		width: 56px;
		max-height: 144px;
		overflow: auto;
		border-right: 1px solid #e8eaec;
		&:last-child {
			border-right: none;
		}
		&-ul {
			padding-bottom: 120px; 
		}
		&-cell {
			height: 24px;
			line-height: 24px;
			padding-left: 16px;
			@include when(selected) {
				background: #f3f3f3;
			}
			&:hover {
				background: #f3f3f3;
				cursor: pointer;
			}
		}
	}
}
</style>