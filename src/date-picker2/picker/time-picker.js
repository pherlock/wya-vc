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
			validator: v => /(time|timerange)/.test(v),
			default: 'time'
		}
	},
	computed: {
		panel() {
			const isRange = this.type === 'timerange';
			return isRange ? 'TimeRangePanel' : 'TimePanel';
		}
	}
};