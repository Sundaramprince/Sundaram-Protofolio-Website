import { SectionWrapper } from "./SectionWrapper";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "motion/react";
import { ReactNode } from "react";

const dsSkillsData = [
  { subject: 'Pandas', A: 90, fullMark: 100 },
  { subject: 'NumPy', A: 85, fullMark: 100 },
  { subject: 'Scikit-learn', A: 80, fullMark: 100 },
  { subject: 'TensorFlow/Keras', A: 75, fullMark: 100 },
  { subject: 'Matplotlib', A: 85, fullMark: 100 },
  { subject: 'Seaborn', A: 80, fullMark: 100 },
];

const programmingData = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript', level: 80 },
  { name: 'Java', level: 70 },
  { name: 'HTML/CSS', level: 85 },
];

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Arsenal" subtitle="Visualizing my proficiency across core programming, data science, and development tools.">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Data Science Radar */}
        <SkillCard title="Data Science & ML">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dsSkillsData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Proficiency" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f0ff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SkillCard>

        {/* Programming Bar Chart */}
        <SkillCard title="Core Programming">
          <div className="h-[300px] w-full mt-4 pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programmingData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#aaa' }} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="level" fill="#8a2be2" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SkillCard>

        {/* Development Tools - List format */}
        <div className="lg:col-span-2">
          <SkillCard title="Tools & Frameworks" className="border-t border-white/10 pt-8 bg-transparent border-0 ring-0 shadow-none -mx-6 px-6">
            <div className="flex flex-wrap gap-3">
              {['Git', 'GitHub', 'Django', 'React', 'Tailwind CSS', 'Framer Motion', 'Plotly', 'Prophet'].map((tool, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={tool}
                  className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-neon-blue/50 hover:text-neon-blue transition-colors cursor-default"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </SkillCard>
        </div>

      </div>
    </SectionWrapper>
  );
}

function SkillCard({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group ${className || ''}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-neon-blue/10 transition-colors pointer-events-none" />
      <h3 className="text-xl font-semibold mb-2 text-white/90">{title}</h3>
      {children}
    </div>
  );
}
