import { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { ProjectWorkbench } from './components/ProjectWorkbench';
import { AboutSection } from './components/AboutSection';
import { GitHubActivity } from './components/GitHubActivity';
import { ContactConsole } from './components/ContactConsole';
import { Footer } from './components/Footer';

export function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('tales-of-everwood');

  const scrollToProjects = (projectId?: string) => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-100 flex flex-col justify-between selection:bg-[#f3e600] selection:text-black">
      <div>
        {/* Navigation Bar */}
        <HeaderNav />

        {/* Hero Section */}
        <HeroSection onScrollToWorkbench={scrollToProjects} />

        {/* Featured Projects (Detailed Workbench & Card Grid) */}
        <ProjectWorkbench externalProjectId={selectedProjectId} />

        {/* About & Technical Skills Section */}
        <AboutSection />

        {/* GitHub Code Repositories */}
        <GitHubActivity />

        {/* Contact Section */}
        <ContactConsole />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
