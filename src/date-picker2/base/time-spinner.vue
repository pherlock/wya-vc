<template>
	<div class="vc-time-picker-spinner">
		<div v-if="type === 'timerange'" class="vc-time-picker-spinner__title">{{ title }}</div>
		<div class="vc-time-picker-spinner__cells">
			<div class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in hourArray" 
						:key="item.val" 
						:class="{'is-selected' : item.selected}"
						class="vc-time-picker-spinner__list-cell"
						@click="handleClick('hours', item)"
					>
						{{ item.val | formatTime }}
					</li>
				</ul>
			</div>
			<div class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in minuteArray" 
						:key="item.val" 
						:class="{'is-selected' : item.selected}"
						class="vc-time-picker-spinner__list-cell"
						@click="handleClick('minutes', item)"
					>
						{{ item.val | formatTime }}
					</li>
				</ul>
			</div>
			<div class="vc-time-picker-spinner__list">
				<ul class="vc-time-picker-spinner__list-ul">
					<li 
						v-for="item in secondArray" 
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
		},
		minutes: {
			type: [Number, String],
		},
		seconds: {
			type: [Number, String],
		},
	},
	data() {
		return {
		};
	},
	computed: {
		hourArray() {
			let hour = [];
			for (let i = 0; i < 24; i++) {
				let oHour = {
					val: i,
					selected: false
				};
				if (this.hours == i) oHour.selected = true;
				hour.push(oHour);
			}
			return hour;
		},
		minuteArray() {
			let minute = [];
			for (let i = 0; i < 60; i++) {
				let oMinute = {
					val: i,
					selected: false
				};
				if (this.minutes == i) oMinute.selected = true;
				minute.push(oMinute);
			}
			return minute;
		},
		secondArray() {
			let second = [];
			for (let i = 0; i < 60; i++) {
				let oSecond = {
					val: i,
					selected: false
				};
				if (this.seconds == i) oSecond.selected = true;
				second.push(oSecond);
			}
			return second;
		}
	},
	watch: {
		// 检测时分秒，把对应的列移到指定位置
		hours(val) {

		},
		minutes(val) {

		},
		seconds(val) {

		}
	},
	methods: {
		handleClick(type, item) {
			let data = {
				[type]: item.val
			};
			this.$emit('change', data);
		},
	}
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