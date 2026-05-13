import { useState } from "react";
import Header from "../../components/projects/Header";
import FilterBar from "../../components/projects/FilterBar";
import ProjectGrid from "../../components/projects/ProjectGrid";
import ProjectList from "../../components/projects/ProjectList";

const Projects = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto px-6 py-4 space-y-6">
        {/* Header */}
        <Header />

        {/* Filters */}
        <FilterBar viewMode={viewMode} setViewMode={setViewMode}/>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? <ProjectGrid /> : <ProjectList />}
      </div>
    </div>
  );
};

export default Projects;
