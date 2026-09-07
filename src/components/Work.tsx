import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "AI-House Rental Finder",
    category: "Full-Stack AI Platform",
    tools: "Developed a full-stack AI-powered house rental platform enabling users to search and filter rental properties through a responsive web interface. Integrated OpenAI API for personalized house recommendations and built RESTful APIs with FastAPI, SQLAlchemy, and SQLite.",
    tech: "Next.js, React, TypeScript, FastAPI, Python, SQLite, SQLAlchemy, OpenAI API, SWR",
    image: "/images/ai-house-rental.png",
    alt: "AI House Rental Finder screenshot"
  },
  {
    title: "Nexcart – AI E-Commerce Platform",
    category: "Full-Stack Web & AI Application",
    tools: "Developed a full-stack AI-powered e-commerce platform with secure NextAuth authentication, product catalog, shopping cart, and checkout. Integrated an AI shopping assistant and RESTful APIs using Next.js and Prisma.",
    tech: "Next.js, TypeScript, Prisma, SQLite, NextAuth.js, AI Assistant",
    image: "/images/nexcart.png",
    alt: "Nexcart AI E-commerce platform screenshot"
  }
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p>{project.tools}</p>
                <h4 style={{ marginTop: "20px" }}>Tech Stack</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage image={project.image} alt={project.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
