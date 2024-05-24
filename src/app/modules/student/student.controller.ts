import { Request, Response } from 'express';
import { StudentServices } from './student.service';

import { z } from 'zod';
import StudentValidationSchema from './student.validation';

//import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating schema validation using joi

    //will receive the data sent by client
    const { student: studentData } = req.body;

    //--------------------------------Joi-------------------------------------------------
    //schema validation using joi
    //const { error, value } = studentValidationSchema.validate(studentData);
    //console.log(error, value);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }
    //--------------------------------zod-------------------------------------------------
    //Schema validation using Zod
    const zodParsedData = StudentValidationSchema.parse(studentData);

    //Will call service function with the received data
    const result = await StudentServices.createStudentIntoDB(zodParsedData); //sending validated data to DB

    //send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

//Get all Students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student retreived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

//Get single Student by id
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'One Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

//Delete student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
