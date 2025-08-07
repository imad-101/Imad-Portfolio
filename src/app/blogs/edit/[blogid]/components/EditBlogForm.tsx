'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import BlogEditor from '../../../add/components/BlogEditor'
import Image from 'next/image'

interface Blog {
  id: string
  title: string
  content: string
  image_public_id?: string
  createdAt: Date | string
}

interface EditBlogFormProps {
  blog: Blog
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  const [title, setTitle] = useState(blog.title)
  const [content, setContent] = useState(blog.content)
  const [imagePublicId, setImagePublicId] = useState(blog.image_public_id || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'your_upload_preset') // You'll need to set this in Cloudinary

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.public_id) {
        setImagePublicId(data.public_id)
        toast.success('Image uploaded successfully')
      }
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          image_public_id: imagePublicId
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Blog updated successfully!')
        router.push('/blogs/manage')
      } else {
        toast.error(data.message || 'Failed to update blog')
      }
    } catch {
      toast.error('An error occurred while updating the blog')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Blog Title *
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Featured Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
          
          {imagePublicId && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Current featured image:</p>
              <Image
                src={`https://res.cloudinary.com/your_cloud_name/image/upload/c_fill,w_300,h_200/${imagePublicId}`}
                alt="Featured image preview"
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Blog Content *
          </label>
          <BlogEditor setContent={setContent} initialContent={content} />
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading || isUploading}
            className="flex-1"
          >
            {isLoading ? 'Updating...' : 'Update Blog Post'}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
