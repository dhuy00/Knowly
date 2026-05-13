import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // USERS
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@gmail.com",
    },

    update: {},

    create: {
      username: "admin",
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const john = await prisma.user.upsert({
    where: {
      email: "john@gmail.com",
    },

    update: {},

    create: {
      username: "john",
      email: "john@gmail.com",
      password: "123456",
    },
  });

  const anna = await prisma.user.upsert({
    where: {
      email: "anna@gmail.com",
    },

    update: {},

    create: {
      username: "anna",
      email: "anna@gmail.com",
      password: "123456",
    },
  });

  console.log("✅ Users seeded");

  // PROJECT 1
  const knowly = await prisma.project.upsert({
    where: {
      key: "KNOW",
    },

    update: {},

    create: {
      name: "Knowly Workspace",
      key: "KNOW",
      description: "Task management platform",
      status: "active",
      color: "#3B82F6",
      icon: "🚀",

      ownerId: admin.id,

      members: {
        create: [
          {
            userId: admin.id,
            role: "OWNER",
          },

          {
            userId: john.id,
            role: "ADMIN",
          },

          {
            userId: anna.id,
            role: "MEMBER",
          },
        ],
      },
    },

    include: {
      members: true,
    },
  });

  // PROJECT 2
  const crm = await prisma.project.upsert({
    where: {
      key: "CRM",
    },

    update: {},

    create: {
      name: "CRM System",
      key: "CRM",
      description: "Customer relationship management",
      status: "active",
      color: "#10B981",
      icon: "📊",

      ownerId: john.id,

      members: {
        create: [
          {
            userId: john.id,
            role: "OWNER",
          },

          {
            userId: admin.id,
            role: "ADMIN",
          },
        ],
      },
    },

    include: {
      members: true,
    },
  });

  console.log("✅ Projects seeded");

  // TASKS
  await prisma.task.createMany({
    data: [
      {
        projectId: knowly.id,
        title: "Design Login UI",
        description: "Responsive login page",
        status: "TODO",
        priority: "HIGH",
        taskType: "FEATURE",

        assigneeId: john.id,
        reporterId: admin.id,

        progress: 20,
      },

      {
        projectId: knowly.id,
        title: "Fix Navbar Bug",
        description: "Navbar breaks on mobile",
        status: "IN_PROGRESS",
        priority: "CRITICAL",
        taskType: "BUG",

        assigneeId: anna.id,
        reporterId: admin.id,

        progress: 60,
      },

      {
        projectId: crm.id,
        title: "Build Customer Dashboard",
        description: "Analytics dashboard",
        status: "TODO",
        priority: "MEDIUM",
        taskType: "FEATURE",

        assigneeId: admin.id,
        reporterId: john.id,

        progress: 0,
      },
    ],
  });

  console.log("✅ Tasks seeded");

  console.log("🎉 Seed completed");
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });