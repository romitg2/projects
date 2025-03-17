'use client'
import { useState, useEffect } from "react"
import axios from 'axios'
import { ProjectType } from "@/common/types";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/project");
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-lg p-6">
                        {project.thumbnail && (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="object-cover w-full h-64 rounded-t-lg"
                            />
                        )}
                        <h2 className="text-2xl font-bold">{project.title}</h2>
                        <p className="text-lg">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}