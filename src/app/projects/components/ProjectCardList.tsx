'use client'

import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Badge } from '@radix-ui/themes';
import { bricolage_grotesque } from '@/utils/fonts';


const ProjectCardList = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <div className='w-full h-fit px-80 max-[1025px]:px-4 max-[1285px]:px-40 max-lg:px-0 max-sm:px-4 flex flex-col items-center mt-4 pb-8'>
      <Title title='My Projects' />

      <div className="flex w-full flex-col gap-4 lg:flex-row mt-4 px-32 max-lg:px-0 max-sm:px-0 flex-wrap items-center ml-14 max-sm:ml-0 max-lg:ml-0 max-[350px]:mr-5 max-[321px]:mr-10">
        {data.slice(0, visibleProjects).map((project: Project, idx: number) => (
          <ProjectCard
            key={idx}
            logo={project.logo}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            link={project.link}
            source={project.source}
          />
        ))}
      </div>
      {visibleProjects < data.length && (
        <Badge color="gray" variant="solid" highContrast onClick={loadMoreProjects} className={`text-xs max-sm:text-[10px] flex items-center text-center dark:hover:bg-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-800 mt-6 ${bricolage_grotesque}`}>
          <span>Load More</span>
          <span className='!ml-[-3px] mt-[1px]'>
            <ChevronDownIcon className='h-3 w-3 dark:!text-black !text-white  shrink-0 text-muted-foreground transition-transform duration-200' />
          </span>
        </Badge>
      )}
    </div>
  )
}

export default ProjectCardList;

const data: Project[] = [
  {
    logo: '/xappylogo.png',
    title: "Xappy.Fun",
    description: "Xappy is a stranger video chat app like omegle for developers, builders, entrepreneurs and tech geeks to connect for fun and networking",
    techStack: ["React", "NextJS", "Tailwind CSS", "WebRTC", "Web Sockets", "Prisma", "Node.js", "Express.js", "Postgre SQL" , "ShadCN","Clerk Auth"],
    link: "https://xappy.fun",
    source: "https://github.com/imad-101/stranger-video-chat-for-devs",
  },
  {
    logo: '/domnest.png',
    title: "DomNest.App",
    description: "DomNest is a platform to manage all your domains and ssl certificates in one place. It provides a user-friendly interface to manage your domains, DNS records, and SSL certificates.",
    techStack: ["React", "NextJS", "Tailwind CSS", "WebRTC", "Web Sockets", "Prisma", "Node.js", "Express.js", "Postgre SQL" , "ShadCN","Clerk Auth"],
    link: "https://Domnest.app",
    source: "https://github.com/imad-101/Domain-Nest",
  },
 
   {
    logo: '/tool-site.png',
    title: "FreeToolNow.Com",
    description: "FreeToolNow is a collection of free tools for developers, designers, and tech enthusiasts. It provides a wide range of tools for various purposes, including code formatting, image optimization, and more.",
    techStack: ["React", "NextJS", "Tailwind CSS", "WebRTC", "Web Sockets", "Prisma", "Node.js", "Express.js", "Postgre SQL" , "ShadCN","Clerk Auth"],
    link: "https://freetoolnow.com",
    source: "https://github.com/imad-101/Tools-Site",
  },
 
   {
    logo: '/merge.png',
    title: "Merge-JSON-Files.Com",
    description: "Merge JSON Files is a collection of JSON related tools and articles. It provides a user-friendly interface to merge, split, and manipulate JSON files.",
    techStack: ["React", "NextJS", "Tailwind CSS", "WebRTC", "Web Sockets", "Prisma", "Node.js", "Express.js", "Postgre SQL" , "ShadCN","Clerk Auth"],
    link: "https://merge-json-files.com",
    source: "https://github.com/imad-101/Merge_JSON-Files/tree/main",
  },
 
 
];
