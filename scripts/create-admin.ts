import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  const email = 'admin@portfolio.com'
  const password = 'admin123' // Change this to a secure password
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)
  
  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        hashedPassword,
        name: 'Admin User'
      },
    })
    
    console.log('✅ Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('User ID:', admin.id)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
