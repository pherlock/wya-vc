import Picker from '../picker';
import TimePanel from "../panel/time";
import TimeRangePanel from "../panel/time-range";

export default {
	mixins: [Picker],
	components: {
		TimePanel,
		TimeRangePanel
	},
	props: {
		type: {
			type: String,
			default: 'time',
			validator: v => /(time|timerange)/.test(v),
		}
	},
	computed: {
		panel() {
			const isRange = this.type === 'timerange';
			return isRange ? 'TimeRangePanel' : 'TimePanel';
		}
	}
};