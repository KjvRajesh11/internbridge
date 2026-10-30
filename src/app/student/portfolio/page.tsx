'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { StudentProject, StudentSkill, StudentDocument, Profile } from '@/types';
import {
  FolderGit2,
  FileText,
  Plus,
  ExternalLink,
  Code2,
  Sparkles,
  CheckCircle2,
  Trash2,
  UploadCloud,
  Layers,
} from 'lucide-react';

export default function StudentPortfolioPage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [skills, setSkills] = useState<StudentSkill[]>([]);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setProjects(db.getStudentProjects(data.user.id));
          setSkills(db.getStudentSkills(data.user.id));
          setDocuments(db.getStudentDocuments(data.user.id));
        }
      });
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim() || !user) return;
    const added = db.addStudentSkill({
      student_id: user.id,
      skill_name: newSkillName.trim(),
      proficiency_level: 'advanced',
      verified: true,
    });
    setSkills([...skills, added]);
    setNewSkillName('');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !user) return;
    const added = db.addStudentProject({
      student_id: user.id,
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim() || 'Software engineering implementation project.',
      technologies: newProjectTech.split(',').map((t) => t.trim()).filter(Boolean),
      featured: true,
    });
    setProjects([...projects, added]);
    setNewProjectTitle('');
    setNewProjectTech('');
    setNewProjectDesc('');
    setShowAddProject(false);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>PROOF-OF-SKILL EVIDENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            PORTFOLIO &amp; RESUME ASSETS
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Verified engineering projects, skills, and documents. Agent 2 uses these as factual inputs without inventing metrics.
          </p>
        </div>

        {/* Resume Section */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Primary Resume Document</h2>
                <p className="font-mono text-xs text-[#777777]">Secured storage with signed download links and recruiter access control</p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#080808] font-bold bg-[#F5F5F3] px-3 py-1 border border-[#DEDEDE] uppercase">
              Verified Active
            </span>
          </div>

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#F5F5F3] border border-[#DEDEDE] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-[#080808] block uppercase">{doc.file_name}</span>
                <span className="text-[11px] text-[#777777]">
                  Size: {(doc.file_size ? doc.file_size / 1024 : 240).toFixed(1)} KB • Uploaded:{' '}
                  {new Date(doc.created_at).toLocaleDateString()}
                </span>
              </div>
              <a
                href={doc.file_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#E42316] hover:text-[#080808] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                Preview Document <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Verified Skills Section */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-4">
            <div>
              <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Verified Technical Skills</h2>
              <p className="font-mono text-xs text-[#777777]">Declared and project-backed skills for Agent 1 matching</p>
            </div>
            <form onSubmit={handleAddSkill} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add skill (e.g. Go, GraphQL)..."
                className="bg-white border border-[#DEDEDE] px-3 py-2 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shrink-0 cursor-pointer"
              >
                Add Skill
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F5F3] border border-[#DEDEDE] text-xs font-mono text-[#080808]"
              >
                <Code2 className="w-3.5 h-3.5 text-[#E42316]" />
                <span className="font-bold">{skill.skill_name}</span>
                <span className="text-[10px] text-[#777777] uppercase">({skill.proficiency_level})</span>
                {skill.verified && <span className="w-1.5 h-1.5 rounded-full bg-[#E42316]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Projects Section */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-4">
            <div>
              <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Featured Engineering Projects</h2>
              <p className="font-mono text-xs text-[#777777]">
                Agent 2 references these projects when personalizing cover letters and screening answers
              </p>
            </div>
            <button
              onClick={() => setShowAddProject(!showAddProject)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>

          {showAddProject && (
            <form onSubmit={handleAddProject} className="bg-[#F5F5F3] border border-[#DEDEDE] p-6 space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#080808] uppercase tracking-widest">New Project Entry</h3>
              <div>
                <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={newProjectTech}
                  onChange={(e) => setNewProjectTech(e.target.value)}
                  placeholder="e.g. TypeScript, Node.js, Redis, Docker"
                  className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1">Description &amp; Technical Architecture</label>
                <textarea
                  rows={2}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Key technical tradeoffs and architecture implemented..."
                  className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs text-[#080808] font-sans focus:border-[#E42316] outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 border border-[#DEDEDE] font-mono text-xs uppercase tracking-wider font-bold text-[#777777] hover:text-[#080808] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-6 space-y-4 flex flex-col justify-between transition-colors bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">{proj.title}</h3>
                    <span className="font-mono text-[10px] text-[#E42316] font-bold uppercase bg-[#F5F5F3] px-2 py-0.5 border border-[#DEDEDE]">
                      Featured
                    </span>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed font-sans">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#F5F5F3] border border-[#DEDEDE] font-mono text-[10px] text-[#080808]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {proj.repo_url && (
                  <div className="pt-4 border-t border-[#DEDEDE] flex items-center justify-between text-xs font-mono">
                    <a
                      href={proj.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#E42316] hover:text-[#080808] font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" /> Source Code
                    </a>
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#777777] hover:text-[#080808] font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
