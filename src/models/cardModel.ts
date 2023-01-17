import { Pool, Keyword } from "../constants/enums";

export type Card = {
	id: number;
	name: string;
	cost: number;
	power: number;
	description: string;
	pool: Pool;
	flavorText: string;
	keyword: Keyword;
};
export const build = (data: any) => {
	const { id, name, cost, power, description, pool, flavorText, keyword } =
		data;
	return {
		id,
		name,
		cost,
		power,
		description,
		pool,
		flavorText,
		keyword,
	} as Card;
};
