import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
    try {

        // Parse request body
        const { fileName, fileType } = await req.json();
        if (!fileName || !fileType) {
            return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 });
        }

        console.log(fileName, fileType);
        console.log(process.env.AWS_S3_BUCKET_NAME);
        console.log(process.env.AWS_REGION);
        console.log(process.env.AWS_ACCESS_KEY_ID);
        console.log(process.env.AWS_SECRET_ACCESS_KEY);

        // Generate pre-signed URL
        const { url, key } = await getPresignedUrl(fileName, fileType);
        console.log("-------- url -------", url);
        console.log("-------- key -------", key);

        return NextResponse.json({ url, key }); // `key` is the path stored in DynamoDB later
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}