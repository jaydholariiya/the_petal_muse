import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const VALID_PASSCODES = ['1924', 'admin123', 'jensi1924'];

    if (!passcode || !VALID_PASSCODES.includes(passcode.trim())) {
      return NextResponse.json({
        success: false,
        message: 'Invalid Atelier Passcode. Access denied.',
        data: null,
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Access granted. Welcome to THE PETAL MUSE Atelier Studio.',
      data: {
        authenticated: true,
        role: 'Atelier Director',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Authentication error',
      data: null,
    }, { status: 500 });
  }
}

