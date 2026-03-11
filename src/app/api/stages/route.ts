import { NextResponse } from "next/server";
import { fetchStagesFromSheets } from "@/lib/sheets";
import { stages as staticStages } from "@/data/stages";

export async function GET() {
  // Try Google Sheets first
  const sheetStages = await fetchStagesFromSheets();

  if (sheetStages && sheetStages.length > 0) {
    return NextResponse.json({ source: "sheets", stages: sheetStages });
  }

  // Fallback to static data
  return NextResponse.json({ source: "static", stages: staticStages });
}
