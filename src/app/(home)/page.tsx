import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Education from "@/components/Education"
// import AboutMe from "@/components/AboutMe"
import Contact from "@/components/Contact"
import HomeRouteBlogs from "@/components/HomeRouteBlogs"
import InitialLanding from "./components/InitialLanding"

export default function Home() {
  return (
    <div className="max-[350px]:overflow-hidden mt-8 max-sm:mt-0">
      <InitialLanding />

      <div className="w-full flex justify-center mt-12">
        <HomeRouteBlogs />
      </div>

      <div className="w-full flex justify-center mt-8">
        <Experience />
      </div>

      {/* <div className="w-full flex justify-center mt-12">
        <AboutMe />
      </div> */}

      <div className="w-full flex justify-center mt-12">
        <Skills />
      </div>

      <div className="w-full flex justify-center mt-12">
        <Education />
      </div>

      <div className="w-full flex justify-center mt-8" id="contact-section">
        <Contact />
      </div>
    </div>
  )
}
