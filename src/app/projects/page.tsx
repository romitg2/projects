'use client'
import { useState, useEffect } from "react"
import axios from 'axios'
import { ProjectType } from "@/common/types";
import Project from "@/components/project";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectType[] | null>(null);
    const [columns, setColumns] = useState<number>(4);

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
            <div>
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-4">Set columns:</h1>
                    <input
                        type="number"
                        value={columns}
                        onChange={(e) => setColumns(Number(e.target.value))}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} className="grid grid-cols-1 gap-6 mx-4 md:grid-cols-2 lg:grid-cols-2">
                {projects?.map((project: ProjectType) => (
                    <Project key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}