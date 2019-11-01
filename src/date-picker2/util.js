import dateUtil from '../utils/date';

export const initTimeDate = () => {
	const date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	return date;
};

export const formatDate = function (date, format) {
	date = toDate(date);
	if (!date) return '';
	return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function (string, format) {
	return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const DEFAULT_FORMATS = {
	date: 'yyyy-MM-dd',
	month: 'yyyy-MM',
	year: 'yyyy',
	datetime: 'yyyy-MM-dd HH:mm:ss',
	time: 'HH:mm:ss',
	timerange: 'HH:mm:ss',
	daterange: 'yyyy-MM-dd',
	datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

const RANGE_FORMATTER = function (params) {
	
};

const RANGE_PARSER = function (params) {
	
};

const DATE_PARSER = function (text, format) {
	return parseDate(text, format);
};

const DATE_FORMATTER = function (params) {
	
};

export const TYPE_VALUE_RESOLVER_MAP = {
	default: {
		formatter(value) {
			if (!value) return '';
			return '' + value;
		},
		parser(text) {
			if (text === undefined || text === '') return null;
			return text;
		},
	},
	timerange: {
		formatter: RANGE_FORMATTER,
		parser: RANGE_PARSER
	},
	time: {
		formatter: DATE_FORMATTER,
		parser: DATE_PARSER
	}
};