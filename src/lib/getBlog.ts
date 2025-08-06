import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function getBlog(blogId: string) {
    try {
        // Check if database is available
        if (!process.env.POSTGRES_PRISMA_URL) {
            throw new Error('Database not configured')
        }

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            select: {
                id: true,
                title: true,
                content: true,
                author: true,
                createdAt: true,
                image_public_id: true
            }
        })

        if (!blog) {
            notFound()
        }

        return blog
    } catch (error) {
        console.error('Error fetching blog:', error)
        throw new Error('Failed to fetch blog')
    }
}