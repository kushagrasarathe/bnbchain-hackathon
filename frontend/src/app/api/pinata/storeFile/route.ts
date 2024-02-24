const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import formidable from "formidable";
import { Readable } from "stream";

const saveFile = async (fileBuffer: ArrayBuffer) => {
  try {
    const fileStream = new Readable();
    fileStream.push(Buffer.from(fileBuffer));
    fileStream.push(null);
    // const readableStreamForFile = fs.createReadStream("./yourfile.png");
    const options = {
      pinataMetadata: {
        name: "File",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const response = await pinata.pinFileToIPFS(fileStream, options);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const fileBuffer = await req.arrayBuffer();
    console.log(fileBuffer);

    const response = await saveFile(fileBuffer);
    return new Response(JSON.stringify(response), { status: 200 });
    // console.log(req.formData);
    // const form = new formidable.IncomingForm();

    // const fileBuffer = req.arrayBuffer;
    // console.log(fileStream);

    // form.parse(req.formData, async (err, fields, files) => {
    //   if (err) {
    //     console.error("Error parsing form:", err);
    //     return new Response("Error parsing form", { status: 500 });
    //     return;
    //   }

    //   const fileBuffer = await fs.promises.readFile(files.file.path);

    //   // const fileStream = fs.createReadStream(filePath);
    //   const fileStream = new Readable();
    //   fileStream.push(fileBuffer);
    //   fileStream.push(null);

    //   // Process the file or pass it as a readable stream to another function

    //   return new Response("File uploaded successfully", { status: 200 });
    // });
    return new Response("File uploaded successfully", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Server Error", { status: 500 });
  }
}
