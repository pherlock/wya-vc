import CreateCustomer from "../create-customer/index";

export const MonthHeader = CreateCustomer({
	month: Number,
	year: Number,
	monthNames: Array,
	lang: String
});
export const WeekHeader = CreateCustomer({
	weekNames: Array,
	lang: String
});
export const DateItem = CreateCustomer({
	date: Object,
	curDateStr: String
});


export const defaultRenderDate = (h, { date, curDateStr }) => {
	return <span class={date.date === curDateStr ? "is-selected" : ""}>{date.day}</span>;
};
export const defaultRenderMonth = (h, { month, year, lang, monthNames }) => {
	return (
		<div class="vc-calendar__month">
			<div>
				{monthNames[month][lang]} &nbsp;&nbsp;&nbsp;&nbsp;
				{year}
			</div>
		</div>
	);
};
export const defaultRenderWeek = (h, { weekNames, lang }) => {
	return (
		<div class="vc-calendar__week">
			{
				weekNames.map((item, index) => {
					return <span key={index}>{item[lang]}</span>;
				})
			}
		</div>
	);
};