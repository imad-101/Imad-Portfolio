import { MagicCard } from './ui/magic-card'
import ShineBorder from './ui/shine-border';
import { bricolage_grotesque, inter } from '@/utils/fonts';
import { Badge, Link } from '@radix-ui/themes';
import Image from 'next/image';
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons';
import { Project } from '@/types/project';
import { useDarkMode } from '@/hooks/useDarkMode';

const MaxProjectCard = () => {
    const { isDarkMode } = useDarkMode()
    return (
        <>
            {
                data.map((project, idx) => (
                    <MagicCard key={idx} gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`} className='w-[68%] h-fit max-lg:w-[45%] max-sm:w-full flex justify-center max-lg:justify-start !bg-transparent cursor-pointer rounded-lg dark:shadow-2xl'>
                        <ShineBorder color={["#FF9933", "#FFFFFF", "#138808"]} className='w-[44.5vw] max-[1285px]:w-full max-sm:w-full h-full !bg-transparent !pointer-events-none flex items-center max-lg:flex-col max-lg:items-start pl-2 pr-5 py-5 max-sm:py-5 md:shadow-xl space-x-4'>

                            <div className="w-[5vw] max-[1285px]:w-[13vw]">
                                <Link href={project.link} target='_blank'>
                                    <Image src='/portfolio-logo.jpg' alt='company-logo' width={55} height={55} className='rounded-full border border-black max-lg:h-10 max-lg:w-10' />
                                </Link>
                            </div>
                            <div>
                                <div className="max-lg:mt-3">
                                    <Link href={project.link ? project.link : project.source} target='_blank' underline='none'>
                                        <h1 className={`text-xl max-lg:text-lg text-black dark:text-white font-bold tracking-tight text-start ${bricolage_grotesque}`}>{project.title}</h1>
                                    </Link>
                                    <p className={`mt-1 text-sm dark:text-[#D1D5DB] ${inter}`}>{project.description}</p>
                                </div>

                                <div className="flex gap-1 mt-3 flex-wrap !pointer-events-auto">
                                    {
                                        project.techStack?.map((tech, idx) => (
                                            <Badge key={idx} color="gray" variant="outline" highContrast className={`text-[10px] dark:hover:!bg-white hover:!bg-black hover:!text-white dark:hover:!text-black !pointer-events-auto ${bricolage_grotesque}`}>
                                                {tech}
                                            </Badge>
                                        ))
                                    }
                                </div>
                                <div className='mt-3 !pointer-events-auto flex gap-1'>
                                    {
                                        project.link && (
                                            <Link href={project.link} target='_blank'>
                                                <Badge color="gray" variant="solid" highContrast className={`text-[10px] py-[3px] dark:hover:bg-gray-300 ${bricolage_grotesque}`}>
                                                    <GlobeIcon width={11} height={11} /> Website
                                                </Badge>
                                            </Link>
                                        )
                                    }

                                    <Link href={project.source} target='_blank'>
                                        <Badge color="gray" variant="solid" highContrast className={`text-[10px] py-[3px] dark:hover:bg-gray-300 ${bricolage_grotesque}`}>
                                            <GitHubLogoIcon width={11} height={11} /> Source
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                        </ShineBorder>
                    </MagicCard>
                ))
            }

        </>
    )
}

export default MaxProjectCard;

const data: Project[] = [
    {
        logo: '/portfolio-logo.jpg',
        title: "Portfolio",
        description: "A portfolio crafted and developed by me, showcasing my skills, projects, and passion for web development in a sleek, user-friendly design.",
        techStack: ["NextJS", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "TipTap Editor", "Resend", "Cloudinary", "Zod", "framer-motion", "Radix UI", "Magic UI", "Tailwind CSS"],
        link: "https://fardeenmansoori.vercel.app/",
        source: "https://github.com/Fardeen26/portfolio",
    }
];