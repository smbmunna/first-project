import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //---------------------------static------------------------------------
  //check if user or student exists already
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already Exists');
  }

  const result = await Student.create(studentData); //Built in static method

  //----------------------------Instance-----------------------------------
  //Built in instance method
  //const student = new Student(studentData); //Creating student instance using Student Model

  //Using our custom instance method isUserExists
  //if (await student.isUserExists(studentData.id)) {
  //throw new Error('User already Exists');
  //}

  //const result = await student.save(); //Built in instance method provided by Mongoose

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  //using aggregate
  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
