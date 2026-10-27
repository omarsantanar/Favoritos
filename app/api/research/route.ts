import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({ mode: 'unconfigured', verifiedEvents: [], verifiedLines: [], trendSignals: [], publishedPredictions: [], connectedSources: 0,
    notice: 'No hay proveedores conectados. Los escenarios ficticios no están disponibles mediante esta API de datos reales.' });
}
