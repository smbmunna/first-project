import Joi from 'joi';
import validator from 'validator';

const nameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const capitalStr = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== capitalStr) {
        return helpers.error('any.invalid', {
          message: `${value} is not in Capitalized format`,
        });
      }
      return value;
    }, 'Capitalized validation'),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!validator.isAlpha(value)) {
        return helpers.error('any.invalid', {
          message: `${value} is not a valid LastName`,
        });
      }
      return value;
    }, 'Alpha validation'),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string(),
  motherContactNo: Joi.string().required(),
});

// Local Guardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Student schema (Main Schema)
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: nameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!validator.isEmail(value)) {
        return helpers.error('any.invalid', {
          message: `${value} is not valid email`,
        });
      }
      return value;
    }, 'Email validation'),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
