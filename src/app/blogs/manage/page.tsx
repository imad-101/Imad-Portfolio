import { Suspense } from 'react'
import BlogManageList from './components/BlogManageList'
import BlogSkeleton from '../components/BlogSkeleton'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

export default async function BlogManagePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="w-full mt-40 max-sm:mt-28 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all your blog posts</p>
      </div>
      
      <Suspense fallback={<BlogSkeleton />}>
        <BlogManageList />
      </Suspense>
    </div>
  )
}
