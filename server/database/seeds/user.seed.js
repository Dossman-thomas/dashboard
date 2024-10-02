import { UserModel } from "../models/index.js";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "Admin@123!",
    role: "admin",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "Manager@123!",
    role: "data manager",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    password: "Employee@123!",
    role: "employee",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    password: "Manager@234!",
    role: "data manager",
  },
  {
    name: "Daniel Garcia",
    email: "daniel@example.com",
    password: "Manager@345!",
    role: "data manager",
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    password: "Manager@456!",
    role: "data manager",
  },
  {
    name: "David Martinez",
    email: "david@example.com",
    password: "Manager@567!",
    role: "data manager",
  },
  {
    name: "Laura Anderson",
    email: "laura@example.com",
    password: "Manager@678!",
    role: "data manager",
  },
  {
    name: "James Moore",
    email: "james@example.com",
    password: "Manager@789!",
    role: "data manager",
  },
  {
    name: "Olivia Taylor",
    email: "olivia@example.com",
    password: "Manager@890!",
    role: "data manager",
  },
  {
    name: "Robert Thomas",
    email: "robert@example.com",
    password: "Manager@901!",
    role: "data manager",
  },
  {
    name: "Sophia Jackson",
    email: "sophia@example.com",
    password: "Manager@012!",
    role: "data manager",
  },
  {
    name: "William White",
    email: "william@example.com",
    password: "Manager@1234!",
    role: "data manager",
  },
  {
    name: "Liam Harris",
    email: "liam@example.com",
    password: "Employee@234!",
    role: "employee",
  },
  {
    name: "Mia Clark",
    email: "mia@example.com",
    password: "Employee@345!",
    role: "employee",
  },
  {
    name: "Noah Lewis",
    email: "noah@example.com",
    password: "Employee@456!",
    role: "employee",
  },
  {
    name: "Isabella Robinson",
    email: "isabella@example.com",
    password: "Employee@567!",
    role: "employee",
  },
  {
    name: "Ethan Walker",
    email: "ethan@example.com",
    password: "Employee@678!",
    role: "employee",
  },
  {
    name: "Ava Young",
    email: "ava@example.com",
    password: "Employee@789!",
    role: "employee",
  },
  {
    name: "James King",
    email: "jamesk@example.com",
    password: "Employee@890!",
    role: "employee",
  },
  {
    name: "Charlotte Scott",
    email: "charlotte@example.com",
    password: "Employee@901!",
    role: "employee",
  },
  {
    name: "Benjamin Wright",
    email: "benjamin@example.com",
    password: "Employee@012!",
    role: "employee",
  },
  {
    name: "Amelia Green",
    email: "amelia@example.com",
    password: "Employee@1234!",
    role: "employee",
  },
  {
    name: "Elijah Adams",
    email: "elijah@example.com",
    password: "Employee@2345!",
    role: "employee",
  },
  {
    name: "Harper Baker",
    email: "harper@example.com",
    password: "Employee@3456!",
    role: "employee",
  },
  {
    name: "Logan Carter",
    email: "logan@example.com",
    password: "Employee@4567!",
    role: "employee",
  },
  {
    name: "Evelyn Mitchell",
    email: "evelyn@example.com",
    password: "Employee@5678!",
    role: "employee",
  },
  {
    name: "Jackson Perez",
    email: "jackson@example.com",
    password: "Employee@6789!",
    role: "employee",
  },
  {
    name: "Harper Nelson",
    email: "harper@example.com",
    password: "Employee@7890!",
    role: "employee",
  },
  {
    name: "Mason Cooper",
    email: "mason@example.com",
    password: "Employee@8901!",
    role: "employee",
  },
  {
    name: "Avery Richardson",
    email: "avery@example.com",
    password: "Employee@9012!",
    role: "employee",
  },
  {
    name: "Alexander Collins",
    email: "alexander@example.com",
    password: "Employee@0123!",
    role: "employee",
  },
  {
    name: "Ella Murphy",
    email: "ella@example.com",
    password: "Employee@12345!",
    role: "employee",
  },
  {
    name: "Henry Ward",
    email: "henry@example.com",
    password: "Employee@23456!",
    role: "employee",
  },
];


// Seed users to the database using the UserModel function
const seedUsers = async () => {
    try {
        await UserModel.bulkCreate(users);
        console.log("Users seeded successfully!");
    } catch (error) {
        console.error("Error seeding users: ", error);
    }
};

// Run the seed function
module.exports = seedUsers; 
