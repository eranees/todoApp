import * as bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const verifyPassword = async (password, hash) => {
	const isMatch = await bcrypt.compare(password, hash);
	return isMatch;
};
