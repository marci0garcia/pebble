import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some sample customers
  const customers = await prisma.customer.createMany({
    data: [
      {
        id: 'customer-1',
        name: 'John Doe',
        email: 'john@example.com',
        image_url: '/customers/john-doe.png'
      },
      {
        id: 'customer-2',
        name: 'Jane Smith', 
        email: 'jane@example.com',
        image_url: '/customers/jane-smith.png'
      },
      {
        id: 'customer-3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        image_url: '/customers/mike-johnson.png'
      }
    ]
  });

  // Create some sample invoices
  const invoices = await prisma.invoice.createMany({
    data: [
      {
        customer_id: 'customer-1',
        amount: 15795, // $157.95 in cents
        date: new Date('2023-12-06'),
        status: 'PENDING'
      },
      {
        customer_id: 'customer-2', 
        amount: 20348, // $203.48 in cents
        date: new Date('2023-11-14'),
        status: 'PAID'
      },
      {
        customer_id: 'customer-3',
        amount: 3040, // $30.40 in cents
        date: new Date('2023-10-29'),
        status: 'PENDING'
      }
    ]
  });

  // Create revenue data
  const revenue = await prisma.revenue.createMany({
    data: [
      { month: 'Jan', revenue: 2000000 }, // $20,000 in cents
      { month: 'Feb', revenue: 1800000 }, // $18,000 in cents
      { month: 'Mar', revenue: 2200000 }, // $22,000 in cents
      { month: 'Apr', revenue: 2500000 }, // $25,000 in cents
      { month: 'May', revenue: 2300000 }, // $23,000 in cents
      { month: 'Jun', revenue: 3200000 }, // $32,000 in cents
      { month: 'Jul', revenue: 3500000 }, // $35,000 in cents
      { month: 'Aug', revenue: 3700000 }, // $37,000 in cents
      { month: 'Sep', revenue: 2500000 }, // $25,000 in cents
      { month: 'Oct', revenue: 2800000 }, // $28,000 in cents
      { month: 'Nov', revenue: 3000000 }, // $30,000 in cents
      { month: 'Dec', revenue: 4800000 }, // $48,000 in cents
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });