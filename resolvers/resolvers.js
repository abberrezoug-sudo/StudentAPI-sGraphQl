import Student from "../models/Student.js";
import Course from "../models/Course.js";
export const resolvers = {
  Query: {
    hello: () => "Hello GraphQL 🚀",

    students: async () => {
      try {
        const students = await Student.find();

        return students.map((s) => ({
          id: s._id.toString(),
          name: s.name,
          age: s.age,
          email: s.email,
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
    courses : async ()=>{
      try{
        const courses = await Course.find();
        return courses.map((c)=>{
          return {
            id : c._id.toString(),
            title : c.title,
            description : c.description,
            studentId : c.studentId.toString()
          }
        })
      } catch (error) {
        throw new Error(error.message);
      }
    },
    course: async (_,{id})=>{
      try{
        const course = await Course.findById(id)
        if(!course){
          throw new Error("Course not found")
        }
        return {
          id : course._id.toString(),
          title : course.title,
          description : course.description,
          studentId : course.studentId.toString()
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
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
          {
            name,
            age,
            email,
          },
          {
            new: true,
          }
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
  },
   Student: {
    courses: async (parent) => {
      return await Course.find({ studentId: parent.id });
    },
  },
};
