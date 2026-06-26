import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Course from "../models/Course.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

export const resolvers = {
  Query: {
    hello: () => "Hello GraphQL",

    students: async () => {
      try {
        const students = await Student.find();

        return students.map((student) => ({
          id: student._id.toString(),
          name: student.name,
          age: student.age,
          email: student.email,
        }));
      } catch (error) {
        throw new Error(error.message);
      }
    },

    student: async (_, { id }) => {
      try {
        const student = await Student.findById(id);

        if (!student) {
          throw new Error("Student not found");
        }

        return {
          id: student._id.toString(),
          name: student.name,
          age: student.age,
          email: student.email,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    courses: async () => {
      try {
        const courses = await Course.find();

        return courses.map((course) => ({
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          studentId: course.studentId.toString(),
        }));
      } catch (error) {
        throw new Error(error.message);
      }
    },

    course: async (_, { id }) => {
      try {
        const course = await Course.findById(id);

        if (!course) {
          throw new Error("Course not found");
        }

        return {
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          studentId: course.studentId.toString(),
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    users: async () => {
      try {
        const users = await User.find();

        return users.map((user) => ({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }));
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createStudent: async (_, args) => {
      try {
        const student = new Student(args);
        await student.save();

        return {
          id: student._id.toString(),
          name: student.name,
          age: student.age,
          email: student.email,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateStudent: async (_, { id, name, age, email }) => {
      try {
        const student = await Student.findByIdAndUpdate(
          id,
          { name, age, email },
          { new: true }
        );

        if (!student) {
          throw new Error("Student not found");
        }

        return {
          id: student._id.toString(),
          name: student.name,
          age: student.age,
          email: student.email,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteStudent: async (_, { id }) => {
      try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
          throw new Error("Student not found");
        }

        return {
          id: student._id.toString(),
          name: student.name,
          age: student.age,
          email: student.email,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    createCourse: async (_, args) => {
      try {
        const course = new Course(args);
        await course.save();

        return {
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          studentId: course.studentId.toString(),
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateCourse: async (_, { id, title, description, studentId }) => {
      try {
        const course = await Course.findByIdAndUpdate(
          id,
          { title, description, studentId },
          { new: true }
        );

        if (!course) {
          throw new Error("Course not found");
        }

        return {
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          studentId: course.studentId.toString(),
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteCourse: async (_, { id }) => {
      try {
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
          throw new Error("Course not found");
        }

        return {
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          studentId: course.studentId.toString(),
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    register: async (_, { name, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        const token = jwt.sign({ id: user._id.toString() }, "mySecretKey", {
          expiresIn: "1d",
        });

        return {
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Student: {
    courses: async (parent) => {
      return Course.find({ studentId: parent.id });
    },
  },
};
