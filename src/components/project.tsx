import { ProjectType } from "@/common/types";
import Image from "next/image";

export default function Project( project : { project: ProjectType }) {

    console.log(project)
    return (
        <>
            <div className="bg-gray-100 rounded-xl p-4 shadow-md">
                {project.project.thumbnail && (
                    <div className="rounded-lg overflow-hidden border ">
                        <Image
                            src={project.project.thumbnail}
                            alt={project.project.title}
                            width={500}
                            height={300}
                            className="w-full object-cover"
                        />
                    </div>
                )}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">{project.project.title}</h3>
                    <p className="text-gray-600 mt-2">{project.project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-800"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-3 text-sm text-blue-500">
                        {project.project.liveProjectLink && (
                            <a href={project.project.liveProjectLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Live Demo
                            </a>
                        )}
                        {project.project.githubLink && (
                            <a href={project.project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
