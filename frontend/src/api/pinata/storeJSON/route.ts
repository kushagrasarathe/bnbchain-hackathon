const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const saveJSON = async (body: any) => {
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
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const response = await saveJSON(body);
    return new Response(response, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Server Error", { status: 500 });
  }
}
