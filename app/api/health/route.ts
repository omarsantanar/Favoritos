import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({ service: 'radar-deportivo', version: '0.1.0', operationalMode: 'demonstration', status: 'ok' });
}
