const fs = require("fs");
const request = require("request");

const baseUrl = "https://static.marvelsnap.pro/cards/";
const folder = "src/images/cards/";

let url, fileName;

fs.readFile("./src/prisma/cardList.json", "utf8", (err, data) => {
	if (err) throw err;
	let cardList = JSON.parse(data);
	cardList = cardList.map(card => {
		const newWord = card.card
			.replace(/\b[a-z]/g, char => char.toUpperCase())
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(/'/g, "");
		console.log(newWord);
		// const upperCaseWord = location.name.replace(/\b[a-z]/g, char =>
		// 	char.toUpperCase()
		// );
		// const noSpacesWord = upperCaseWord.replace(/\s/g, "");
		url = encodeURI(baseUrl + newWord + ".webp");
		fileName = newWord + ".webp";
		console.log(fileName);
		request(url)
			.pipe(fs.createWriteStream(`${folder}${fileName}`))
			.on("close", () => console.log(`Saved ${fileName}`));
	});
});
