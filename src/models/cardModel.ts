import { Keyword, Source } from "../constants/enums";
/*
model Card {
  id          Int               @id @default(autoincrement())
  name        String
  cost        Int
  power       Int
  description String
  source      Source?           @relation(fields: [sourceId], references: [id])
  sourceId    String?
  keywords    KeywordsOnCards[]
  s3Key       String
  s3Bucket    String
  decks       Deck[]

*/
export type Card = {
	id: number;
	name: string;
	cost: number;
	power: number;
	description: string;
	source: string;
	keywords: string[];
};
export const build = (data: any): Partial<Card> => {
	const { id, name, cost, power, description, sourceId, keywords } = data;
	return {
		id,
		name,
		cost,
		power,
		description,
		source: sourceId,
		keywords,
	};
};
