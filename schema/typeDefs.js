export const typeDefs = `
  type Student {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }
type Course {
    id: ID!
    title: String!
    description: String!
   studentId: ID!
  }
  type Query {
    hello: String
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!) : Course

  }

  type Mutation {
    createStudent(
      name: String!
      age: Int!
      email: String!
    ): Student

    updateStudent(
      id: ID!
      name: String
      age: Int
      email: String
    ): Student
    deleteStudent(id: ID!): Student
    createCourse(
      title: String!
      description: String!
      studentId: ID!
    ): Course
    updateCourse(
      id: ID!
      title: String
      description: String
      studentId: ID
    ): Course
    deleteCourse(id: ID!): Course
  }
`;
