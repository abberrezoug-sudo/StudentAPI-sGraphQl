import Student from "../models/Student.js";

export const resolvers = {
  Query: {
    hello: () => "Hello GraphQL 🚀",

    students: async () => {
      const students = await Student.find();

      return students.map(s => ({
        id: s._id.toString(),
        name: s.name,
        age: s.age,
        email: s.email
      }));
    }
  },

  Mutation: {
    createStudent: async (_, args) => {
      const student = new Student({
        name: args.name,
        age: args.age,
        email: args.email
      });

      await student.save();

      return {
        id: student._id.toString(),
        name: student.name,
        age: student.age,
        email: student.email
      };
    }
  }
};
