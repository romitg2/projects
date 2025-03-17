import { NextRequest, NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validation";
import Project from "@/models/project";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    console.log(json);
    const validatedData = ProjectSchema.parse(json);

    if(!validatedData) {
      return NextResponse.json({ error: "Invalid data parsing error" }, { status: 400 });
    }

    const newProject = new Project({
      ...validatedData,
      dateCreated: new Date()
    });

    console.log("-----------------");
    const response = await newProject.save();
    console.log(response);
    console.log("-----------------");

    return NextResponse.json(newProject, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
