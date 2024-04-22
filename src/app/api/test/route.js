import { NextResponse } from 'next/server';

export async function POST(req, res) {
  console.log('hhhhhhhhhhhhhhhh......................................');
  return NextResponse.json({ hi: 'result' });
}
