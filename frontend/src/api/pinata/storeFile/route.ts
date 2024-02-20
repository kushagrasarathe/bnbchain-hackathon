const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import formidable from "formidable";

const saveFile = async (body: any) => {
  try {
    const readableStreamForFile = fs.createReadStream("./yourfile.png");
    const options = {
      pinataMetadata: {
        name: "",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const response = await pinata.pinFileToIPFS(readableStreamForFile, options);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log(req.formData);
    // const form = new formidable.IncomingForm();

    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     console.error("Error parsing form:", err);
    //     res.status(500).json({ error: "Internal Server Error" });
    //     return;
    //   }

    //   const filePath = files.file.path;
    //   const fileStream = fs.createReadStream(filePath);

    //   // Process the file or pass it as a readable stream to another function

    //   res.status(200).json({ message: "File uploaded successfully" });
    // });
    return new Response("File uploaded successfully", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Server Error", { status: 500 });
  }
}
