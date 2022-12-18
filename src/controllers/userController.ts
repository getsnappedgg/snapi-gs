const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
import { prisma } from "../index";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: any, res: any) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	// Check if user exists
	const userExists = await prisma.user.findUnique({
		where: { email },
	});

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const passSalt = 10;
	const salt = await bcrypt.genSalt(passSalt);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await prisma.user.create({
		data: {
			name,
			email,
			passSalt,
			passHash: hashedPassword,
		},
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});
const loginUser = asyncHandler(async (req: any, res: any) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await prisma.user.findUnique({ where: { email } });

	if (user && (await bcrypt.compare(password, user.passHash))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

const deleteUser = asyncHandler(async (req: any, res: any) => {
	const { id } = req.params;
	const user = await prisma.user.delete({
		where: {
			id,
		},
	});
	res.json(user);
});


const getMe = asyncHandler(async (req: any, res: any) => {
	// res.send(await prisma.user.findUnique.findByToken(req.headers.authorization));
	console.log(req.headers);
	res.status(200).json(req.user);
});

const generateToken = (id: number) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
	deleteUser
};
