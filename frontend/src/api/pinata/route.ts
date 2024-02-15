const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const saveFile = async (body: any) => {
  try {
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
    const response = await pinata.pinJSONToIPFS(body, options);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.body;

    const response = await saveFile(body);
    return new Response(response.IpfsHash, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Server Error", { status: 500 });
  }
}
