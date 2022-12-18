export type User = {
	id: number;
	name: string;
	email: string;
	// decks: Deck[]
	// role: Role
	/*
    id       Int    @id @default(autoincrement())
  name     String
  email    String
  passSalt Int
  passHash String
  decks    Deck[]
  role     Role   @default(USER)
 */
};
export const build = (data: any) => {
	const { id, name, email } = data;
	return {
		id,
		name,
		email,
	} as User;
};
