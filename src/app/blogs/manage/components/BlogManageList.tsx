'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { formatDate } from '@/utils/formatdate'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Trash2, Edit, Plus } from 'lucide-react'

interface Blog {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function BlogManageList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      
      if (data.success) {
        setBlogs(data.message)
      } else {
        toast.error('Failed to fetch blogs')
      }
    } catch (error) {
      toast.error('Error fetching blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    setDeleting(blogId)
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success('Blog deleted successfully')
        setBlogs(blogs.filter(blog => blog.id !== blogId))
      } else {
        toast.error(data.message || 'Failed to delete blog')
      }
    } catch (error) {
      toast.error('Error deleting blog')
    } finally {
      setDeleting(null)
    }
  }

  const handleEdit = (blogId: string) => {
    router.push(`/blogs/edit/${blogId}`)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Blog Posts ({blogs.length})</h2>
        <Button 
          onClick={() => router.push('/blogs/add')}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No blog posts found</p>
          <Button onClick={() => router.push('/blogs/add')}>
            Create your first blog post
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Created: {formatDate(blog.createdAt)}
                  </p>
                  <div 
                    className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(blog.id)}
                    className="flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                    disabled={deleting === blog.id}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    {deleting === blog.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/blogs/${blog.id}`)}
                >
                  View Post
                </Button>
                
                <span className="text-xs text-gray-500">
                  ID: {blog.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
