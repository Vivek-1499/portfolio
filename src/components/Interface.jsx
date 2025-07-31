import { motion } from "framer-motion";
import {
  DiCss3Full,
  DiHtml5,
  DiJava,
  DiJavascript,
  DiNodejs,
  DiPython,
  DiReact,
} from "react-icons/di";
import { FaDatabase, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";

const languages = [
  { name: "Java", icon: DiJava },
  { name: "JavaScript", icon: DiJavascript },
  { name: "Python", icon: DiPython },
  { name: "React", icon: DiReact },
  { name: "C++", icon: () => <span className="text-4xl font-bold">C++</span> },
  { name: "HTML", icon: DiHtml5 },
];

const skills = [
  { name: "Node.js", icon: DiNodejs },
  { name: "MongoDB", icon: FaDatabase },
  { name: "Tailwind CSS", icon: DiCss3Full },
  { name: "Figma", icon: FaFigma },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
];
const Section = (props) => {
  const { children, sectionId } = props;

  return (
    <motion.section
    id={sectionId}
      className={`h-screen w-screen p-8  max-w-screen-2xl mx-auto flex flex-col items-start justify-center text-white `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.2,
        },
      }}>
      {children}
    </motion.section>
  );
};

const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen ">
      <AboutSection />
      <SkillSection />
      <Section sectionId="projects">
        <h1 className="text-5xl font-bold text-violet-400 drop-shadow-lg">
          Projects
        </h1>
      </Section>
      <ContactSection />
    </div>
  );
};
const AboutSection = () => {
  return (
    <Section sectionId="about">
      <h1 className="text-6xl font-extrabold leading-tight text-center text-indigo-500 drop-shadow-md">
        Hi, I'm
      </h1>
      <span className="mt-2 text-5xl font-bold italic text-white bg-indigo-900 px-4 py-1 rounded-md shadow-lg">
        Vivek Pandit
      </span>

      <motion.p
        className="text-lg text-gray-300 mt-6 text-center max-w-xl"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}>
        Pursuing <i className="text-indigo-400">B.Tech in IT</i> from{" "}
        <i className="text-indigo-300">K.J. Somaiya College of Engineering</i>,
        passionate about creating immersive full-stack experiences and 3D web
        interfaces.
      </motion.p>

      <motion.button className="mt-12 bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl hover:cursor-pointer"
      initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}>
        Contact Me
      </motion.button>
    </Section>
  );
};

const SkillSection = () => {
  return (
    <Section sectionId="skills">
      <h1 className="text-5xl font-bold text-cyan-400 mb-10 drop-shadow-lg">
        Skills
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-indigo-300">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map(({ name, icon: Icon }, index) => (
              <div
                key={index}
                className="bg-indigo-900/40 backdrop-blur-sm border border-indigo-400 rounded-xl p-4 w-28 h-28 shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center">
                <Icon size={32} className="text-indigo-300 mb-2" />
                <span className="text-xs text-center text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-pink-300">
            Tools & Skills
          </h2>
          <div className="flex flex-wrap gap-4">
            {skills.map(({ name, icon: Icon }, index) => (
              <div
                key={index}
                className="bg-pink-900/40 backdrop-blur-sm border border-pink-400 rounded-xl p-4 w-28 h-28 shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center">
                <Icon size={32} className="text-pink-300 mb-2" />
                <span className="text-xs text-center text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section sectionId="contact">
      <form action="" className="bg-black px-10 py-2 rounded-sm">
        <h2 className="text-3xl font-extrabold text-indigo-800 ">Contact Me</h2>
        <div className="py-2 w-fit">
          <div className="flex flex-col py-2 ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="border-0 focus:border-indigo-950 bg-gray-900 rounded-sm "
            />
          </div>
          <div className="flex flex-col py-2 ">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              className="border-0 focus:border-indigo-950 bg-gray-900 rounded-sm "
            />
          </div>
          <div className="flex flex-col py-2 ">
            <label htmlFor="name">Message</label>
            <textarea
              name=""
              id=""
              className="bg-gray-900 rounded-sm"></textarea>
          </div>
          <button className="mx-auto bg-indigo-950 py-2 px-5 rounded-lg mt-2">
            Send
          </button>
        </div>
      </form>
    </Section>
  );
};
export default Interface;
