'use client'

import { MagicCard } from '@/components/ui/magic-card'
import ShineBorder from '@/components/ui/shine-border'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Project } from '@/types/project'
import { bricolage_grotesque, inter } from '@/utils/fonts'
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons'
import { Badge, Link } from '@radix-ui/themes'
import Image from 'next/image'

const ProjectCard = (props: Project) => {
    const { isDarkMode } = useDarkMode()
    return (
        <MagicCard className="cursor-pointer rounded-lg dark:shadow-2xl w-[45%] max-sm:w-full h-[280px] border-none !bg-transparent" gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`}>
            <ShineBorder className={`border h-full w-full relative rounded-lg flex flex-col justify-center items-start md:shadow-xl !bg-transparent !pointer-events-none`} color={["#FF9933", "#FFFFFF", "#138808"]}>

                <div className='px-3'>
                    <Image src={props.logo} alt='project-logo' width={25} height={25} />
                </div>
                <div className="px-3 mt-3 !pointer-events-auto">
                    <Link href={props.link ? props.link : props.source} target='_blank' underline='none'>
                        <h1 className={`text-lg text-black dark:text-white font-bold tracking-tight text-start whitespace-nowrap ${bricolage_grotesque}`}>{props.title}</h1>
                    </Link>
                    <p className={`mt-2 text-xs dark:text-[#D1D5DB] line-clamp-3 ${inter}`}>{props.description}</p>
                </div>
                <div className="flex gap-1 px-3 mt-3 flex-wrap !pointer-events-auto">
                    {
                        props.techStack?.map((tech, idx) => (
                            <Badge key={idx} color="gray" variant="outline" highContrast className={`text-[9px] dark:hover:!bg-white hover:!bg-black hover:!text-white dark:hover:!text-black !pointer-events-auto ${bricolage_grotesque}`}>
                                {tech}
                            </Badge>
                        ))
                    }
                  
                </div>
                <div className='px-3 mt-2 !pointer-events-auto flex gap-1'>
                    {
                        props.link && (
                            <Link href={props.link} target='_blank'>
                                <Badge color="gray" variant="solid" highContrast className={`text-[9px] py-[2px] dark:hover:bg-gray-300 ${bricolage_grotesque}`}>
                                    <GlobeIcon width={10} height={10} /> Website
                                </Badge>
                            </Link>
                        )
                    }

                    <Link href={props.source} target='_blank'>
                        <Badge color="gray" variant="solid" highContrast className={`text-[9px] py-[2px] dark:hover:bg-gray-300 ${bricolage_grotesque}`}>
                            <GitHubLogoIcon width={10} height={10} /> Source
                        </Badge>
                    </Link>
                </div>
            </ShineBorder>
        </MagicCard>
    )
}

export default ProjectCard
