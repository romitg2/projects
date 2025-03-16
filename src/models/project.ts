// src/models/Project.ts
import dynamoose from "@/lib/connection";

const projectSchema = new dynamoose!.Schema({
  id: {
    type: String,
    hashKey: true,
    default: () => require("crypto").randomUUID(),
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  techStack: {
    type: Array,
    schema: [String],
  },
  buildBlogLink: String,
  worksBlogLink: String,
  liveProjectLink: String,
  githubLink: String,
});

// Optionally, you can specify the generic type here for better type inference
const Project = dynamoose!.model("Project", projectSchema);

export default Project;
