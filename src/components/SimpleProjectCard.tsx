"use client"

import { MagicCard } from './ui/magic-card'
import ShineBorder from './ui/shine-border';
import { Link } from '@radix-ui/themes';
import Image from 'next/image';
import { bricolage_grotesque, inter } from '@/utils/fonts';
import { Project } from '@/types/project';
import { useDarkMode } from '@/hooks/useDarkMode';

const SimpleProjectCard = () => {
    const { isDarkMode } = useDarkMode()
    return (
        <>
            {
                data.map((project, idx) => (
                    <MagicCard key={idx} gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`} className='w-[68%] max-lg:w-[45%] max-sm:w-full flex justify-center max-lg:justify-start !bg-transparent cursor-pointer mt-5 rounded-lg dark:shadow-2xl'>
                        <ShineBorder color={["#FF9933", "#FFFFFF", "#138808"]} className='w-full !bg-transparent !pointer-events-none flex max-lg:flex-col max-lg:items-start p-5 md:shadow-xl'>
                            <div className="w-[10vw] max-[1285px]:w-[13vw]">
                                <Link href='#' target='_blank'>
                                    <Image src={project.logo} alt='company-logo' width={50} height={50} className='rounded-full max-lg:h-10 max-lg:w-10' />
                                </Link>
                            </div>
                            <div className="max-lg:mt-3">
                                <h1 className={`text-xl max-lg:text-lg text-black dark:text-white font-bold tracking-tight text-start ${bricolage_grotesque}`}>{project.title}</h1>
                                <p className={`mt-2 text-sm dark:text-[#D1D5DB] ${inter}`}>{project.description}</p>
                            </div>
                        </ShineBorder>
                    </MagicCard>
                ))
            }
        </>

    )
}

export default SimpleProjectCard;


const data: Project[] = [
    
]