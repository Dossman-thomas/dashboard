import { seedUsers } from "./user.seed.js";
import { sequelize } from "../../config/index.js";

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedUsers();

    console.log("Database seeded successfully");

    process.exit(0); // Exit the process after seeding the database
  } catch (error) {
    console.error("Seeding database failed", error);
  }
};

seedDatabase();