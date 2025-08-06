"use client"
import { aboutMeData } from "@/utils/constant";
import Title from "./ui/Title";
import {  inter } from "@/utils/fonts";

const AboutMe = () => {
    return (
        <div className="w-2/3 max-sm:w-full max-lg:w-full h-fit flex flex-col items-center px-4">
            <Title title="About Me" />
            
            <div className="mt-8 w-full max-w-4xl text-left">
             

                {/* Full Bio */}
                <div className="mb-6">
                    <div className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line ${inter}`}>
                        {aboutMeData.fullBio}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
