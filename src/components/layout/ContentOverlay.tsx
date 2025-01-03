import { useState } from 'react'

const sections = [
  {
    id: 'about',
    title: 'About',
    content: 'I am a software engineer specializing in MLOps and full-stack development.',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    content: 'Here are some of my recent projects...',
  },
  {
    id: 'blog',
    title: 'Blog',
    content: 'Latest thoughts and insights...',
  },
]

export default function ContentOverlay() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Navigation */}
      <nav className="fixed top-8 left-8 pointer-events-auto">
        <ul className="flex flex-col gap-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`text-white px-4 py-2 rounded-lg transition-all
                  ${
                    activeSection === section.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'hover:bg-white/10'
                  }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Panel */}
      <div className="fixed top-8 left-48 max-w-xl pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg text-white">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`transition-opacity duration-300 
                ${activeSection === section.id ? 'opacity-100' : 'opacity-0 hidden'}`}
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 