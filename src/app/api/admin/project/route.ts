// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validation";
import Project from "@/models/project";
import dynamoose from "@/lib/connection";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    console.log(json);
    const validatedData = ProjectSchema.parse(json);

    const newProject = new Project({
      ...validatedData,
      dateCreated: new Date()
    });

    const response = await newProject.save();
    console.log(response);

    return NextResponse.json(newProject, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  const projects = await Project.scan().exec();
  return NextResponse.json(projects, { status: 200 });
}
