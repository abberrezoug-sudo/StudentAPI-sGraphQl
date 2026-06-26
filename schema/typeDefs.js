export const typeDefs = `
  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Student {
    id: ID!
    name: String!
    age: Int!
    email: String!
    courses: [Course]
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
    course(id: ID!): Course
    users: [User]
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

    register(
      name: String!
      email: String!
      password: String!
    ): User

    login(
      email: String!
      password: String!
    ): AuthPayload
  }
`;
