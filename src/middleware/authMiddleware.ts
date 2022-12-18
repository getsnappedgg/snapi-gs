const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
import { prisma } from "../index";

export const protect = asyncHandler(async (req: any, res: any, next: any) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token
			req.user = await prisma.user.findUnique({
				where: { id: decoded.id },
			});
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("Not authorized");
		}
	}
});

export const isAdmin = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		console.log(req.user);
		if (req.user.role != "ADMIN") {
			res.status(401);
			throw new Error("Not authorized");
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error("Not authorized");
	}
});

// export const isAdmin = (req: any, res: any, next: any) => {

// };

module.exports = {
	protect,
	isAdmin,
};
