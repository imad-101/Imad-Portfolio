import { getBlog } from '@/lib/getBlog'
import { bricolage_grotesque } from '@/utils/fonts'
import BlogPage from './components/BlogPage'
import BlogHeader from './components/BlogHeader'
import { calculateReadingTime } from '@/utils/blogReadingTime'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

interface PageProps {
    params: {
        blogid: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const blog = await getBlog(params.blogid)

        return {
            title: blog.title,
            description: blog.content.slice(0, 160),
            openGraph: {
                title: blog.title,
                description: blog.content.slice(0, 160),
                type: 'article',
                authors: [blog.author]
            },
        }
    } catch (error) {
        console.warn('Failed to generate metadata for blog:', error)
        return {
            title: 'Blog Post',
            description: 'A blog post from the portfolio'
        }
    }
}

export default async function BlogDetailPage({ params }: PageProps) {
    try {
        const blog = await getBlog(params.blogid)
        const readingTime = calculateReadingTime(blog.content)

        return (
            <article className='w-full mt-40 max-sm:overflow-hidden max-sm:mt-28 max-[1025px]:px-4 max-[1285px]:px-4 max-lg:px-0 max-sm:px-0 flex flex-col gap-10 items-center pb-8'>
                <div className={`${bricolage_grotesque} px-80 max-[1285px]:px-60 max-sm:px-4 max-lg:px-20`}>
                    <h1 className='text-4xl max-sm:text-3xl font-bold mb-6'>
                        {blog.title}
                    </h1>

                    <BlogHeader
                        author={blog.author}
                        createdAt={blog.createdAt.toString()}
                        readingTime={readingTime}
                    />

                    <div className="mt-8">
                        <BlogPage public_id={blog.image_public_id} />
                    </div>

                    <div className='prose lg:prose-xl dark:prose-dark mt-7'>
                        <div className='w-[57vw] max-lg:w-[80vw] max-sm:w-[92vw] !text-base' dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </div>
            </article>
        )
    } catch {
        return (
            <div className='w-full mt-40 flex flex-col items-center pb-8'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-4'>Blog Not Found</h1>
                    <p className='text-gray-600 dark:text-gray-400'>The blog post you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.</p>
                </div>
            </div>
        )
    }
}

export async function generateStaticParams() {
    try {
        // Only try to generate static params if database is available
        if (!process.env.POSTGRES_PRISMA_URL) {
            return []
        }
        
        const blogs = await prisma.blog.findMany({
            select: { id: true },
            take: 20
        })

        return blogs.map((blog: { id: string }) => ({
            blogid: blog.id
        }))
    } catch (error) {
        console.warn('Failed to generate static params for blogs:', error)
        return []
    }
}