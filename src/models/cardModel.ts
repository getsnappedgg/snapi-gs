import {Source, Keyword } from "../constants/enums";

export type Card = {
	id: number;
	name: string;
	cost: number;
	power: number;
	description: string;
	source: Source;
	keyword: Keyword;
};
export const build = (data: any) => {
	const { id, name, cost, power, description, source, keyword } =
		data;
	return {
		id,
		name,
		cost,
		power,
		description,
		source,
		keyword,
	} as Card;
};
