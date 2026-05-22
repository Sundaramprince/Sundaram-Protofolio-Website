import { SectionWrapper } from "./SectionWrapper";
import { Code2, Brain, Shield, Database } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: <Code2 className="text-neon-blue" size={24} />,
    title: "Core Programming",
    desc: "Advanced capabilities in Python for data structures, automation, and backend logic.",
  },
  {
    icon: <Database className="text-neon-purple" size={24} />,
    title: "Data Science",
    desc: "Competent in running data analysis pipelines using specialized libraries like NumPy, Pandas, Matplotlib, and Seaborn.",
  },
  {
    icon: <Brain className="text-neon-blue" size={24} />,
    title: "AI & ML",
    desc: "Building and deploying machine learning models to solve complex real-world problems.",
  },
  {
    icon: <Shield className="text-neon-purple" size={24} />,
    title: "Cybersecurity",
    desc: "Credentials as a Certified Ethical Hacker, ensuring secure application development.",
  },
];

export function About() {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="B.Tech Computer Science student specializing in Data Science and Machine Learning. Passionate about data-driven insights and intelligent systems."
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed glass p-8 rounded-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-[50px] pointer-events-none" />
          
          <p>
            I am a student at the <strong className="text-white">NRI Group of Research & Technology</strong> in Bhopal, pursuing a Bachelor of Technology in Computer Science with a specialization in Data Science and Machine Learning.
          </p>
          <p>
            With a strong foundation in AI, ML, and frontend development, I bridge the gap between complex analytical models and intuitive user interfaces. I have experience creating modern web applications utilizing HTML, CSS, React, alongside robust backend logic in Python and Java.
          </p>
          
          <div className="pt-6 mt-6 border-t border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
              My Strengths
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Analytical Problem Solving', 'Proactive Collaboration', 'Technical Documentation'].map((strength) => (
                 <li key={strength} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded border border-neon-blue/30 flex items-center justify-center bg-neon-blue/5">
                      <div className="w-1.5 h-1.5 rounded-sm bg-neon-blue"></div>
                    </div>
                    {strength}
                 </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="glass p-6 rounded-2xl border border-white/5 transition-colors group"
            >
              <div className="mb-4 p-3 rounded-lg bg-white/5 inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
