const fs = require("fs");

fs.readFile("./src/prisma/cardList.json", "utf8", (err, data) => {
	if (err) throw err;
	let cardList = JSON.parse(data);
	cardList = cardList.map(card => {
		const newCard = {
			name: card.name,
			cost: card.cost,
			power: card.power,
			description: card.description,
			pool: "",
			flavorText: "",
			keyword: "",
		};
		console.log(newCard);
		return newCard;
	});
	fs.writeFile("./src/prisma/cardList.json", JSON.stringify(cardList), err => {
		if (err) throw err;
		console.log("The file has been saved!");
	});
});
