import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

class ValidationResult {
	data: any;
	error: any;
}

export const validateAndTransform = async (
	classToConvert: any,
	body: string
) => {
	const result = new ValidationResult();
	result.data = plainToClass(classToConvert, body);
	const errors = await validate(result.data, { skipMissingProperties: false });
	if (errors.length > 0) {
		let errorTexts = Array();
		for (const errorItem of errors) {
			errorTexts = errorTexts.concat(errorItem.constraints);
		}
		result.error = errorTexts;
		return result;
	}
	return result;
};
