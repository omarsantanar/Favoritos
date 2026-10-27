import { NextResponse } from 'next/server';
import registry from '@/config/dominican-operators.json';
import snapshot from '@/data/dominican-daily-lines.json';
import { buildDailyPublicView } from '@/lib/dominican-lines.mjs';

export const dynamic = 'force-dynamic';

export function GET() {
  const result = buildDailyPublicView(snapshot, registry, new Date());
  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store, max-age=0', 'X-Content-Type-Options': 'nosniff' }
  });
}
