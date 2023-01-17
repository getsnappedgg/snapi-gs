const fs = require("fs");

fs.readFile("./src/prisma/locationList.json", "utf8", (err, data) => {
	if (err) throw err;
	let locationList = JSON.parse(data);
    locationList = locationList.map(location => {
		const newLocation = {
			name: locationName,
			description: location["Effect"],
		};
		console.log(newLocation);
		return newLocation;
	});
	fs.writeFile(
		"./src/prisma/locationList.json",
		JSON.stringify(locationList),
		err => {
			if (err) throw err;
			console.log("The file has been saved!");
		}
	);
});
