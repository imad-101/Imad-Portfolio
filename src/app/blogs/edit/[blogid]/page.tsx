import { Suspense } from 'react'
import EditBlogForm from './components/EditBlogForm'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import { getBlog } from '@/lib/getBlog'

interface PageProps {
  params: {
    blogid: string
  }
}

export default async function EditBlogPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  try {
    const blog = await getBlog(params.blogid)
    
    return (
      <div className="w-full mt-40 max-sm:mt-28 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
          <p className="text-gray-600 dark:text-gray-400">Update your blog post content</p>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <EditBlogForm blog={blog} />
        </Suspense>
      </div>
    )
  } catch (error) {
    return (
      <div className="w-full mt-40 max-sm:mt-28 px-4 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The blog post you're trying to edit doesn't exist.</p>
        </div>
      </div>
    )
  }
}
