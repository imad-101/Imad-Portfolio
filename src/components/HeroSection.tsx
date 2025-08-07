import Image from "next/image";
import Link from "next/link";
import { RainbowButton } from "./ui/rainbow-button";
import { Link as ScrollLink } from 'react-scroll';
import { bricolage_grotesque, inter } from "@/utils/fonts";

export default function HeroSection() {
    return (
        <div className="w-full flex justify-center  pt-28 dark:bg-black">
            <div className="w-2/3 max-sm:w-full flex flex-col items-center">
                <div>
                    <Image src="/imad.png" alt="Imad Uddin" width={150} height={150}  className="rounded-full"/>
                </div>
                <div className="mt-4 px-32 max-sm:px-4">
                    <h1 className={`!text-[3rem] mt-2 max-sm:!text-[1.6rem] !whitespace-nowrap font-bold tracking-tight text-center ${bricolage_grotesque}`}>
                        Hi, I&apos;m Imad Uddin
                    </h1>
                    <h1 className={`mt-2 max-sm:mt-5 max-sm:px-3 !text-base max-sm:!text-sm text-center !font-normal !tracking-normal inter !leading-6 ${inter}`}>17 yo full-stack developer. I break things, learn fast, and ship full-stack SaaS apps that solve real problems. Deep into code, CS, AI/ML, and anything that pushes limits. Reading keeps me sharp. Still chasing mastery.
                        <br />
                        If you’re working on something real, let’s talk.
                    </h1>
                </div>
                <div className="mt-8 flex gap-4">
                    <Link href="https://cal.com/imad-uddin/15min" target='_blank'>
                        <RainbowButton>
                            Book a meet
                        </RainbowButton>
                    </Link>
                    <RainbowButton>
                        <ScrollLink to="contact-section" activeClass="active" smooth={true} offset={-120} duration={1100}>Get in touch</ScrollLink>
                    </RainbowButton>
                </div>
            </div>
        </div>
    )
}