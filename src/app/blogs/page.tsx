import { getBlogs } from './components/BlogList'
import BlogCard from './components/BlogCard'
import { Blog } from '@/types/project'

const Page = async () => {
  const blogs = await getBlogs();

  return (
    <div className='mt-44 max-sm:mt-28 dark:bg-black'>
      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          <div className='w-full px-64 max-[1025px]:px-0 max-[1285px]:px-0 max-sm:px-2 flex flex-col gap-6 items-center mt-4 pb-8 max-sm:overflow-hidden'>
            {blogs.map((blog: Blog, idx: number) => (
              <BlogCard
                key={idx}
                title={blog.title}
                createdAt={blog.createdAt}
                content={blog.content}
                id={blog.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page