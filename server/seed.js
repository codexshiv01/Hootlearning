import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const plainPassword = 'password123'; // The user can change this later

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username }
  });

  if (existingAdmin) {
    console.log(`Admin '${username}' already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword
    }
  });

  console.log(`Successfully created admin user: '${username}' with password '${plainPassword}'`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
