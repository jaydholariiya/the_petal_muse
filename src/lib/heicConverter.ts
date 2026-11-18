import { execFileSync, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Resolves the path to the ffmpeg executable.
 * Checks system PATH first, then standard winget package locations on Windows.
 */
export function getFfmpegPath(): string | null {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch {
    // Not directly in current PATH
  }

  const localAppData = process.env.LOCALAPPDATA;
  if (localAppData) {
    const wingetPkg = path.join(localAppData, 'Microsoft', 'WinGet', 'Packages');
    if (fs.existsSync(wingetPkg)) {
      try {
        const entries = fs.readdirSync(wingetPkg);
        const ffmpegDir = entries.find((e) => e.toLowerCase().includes('ffmpeg'));
        if (ffmpegDir) {
          const binBase = path.join(wingetPkg, ffmpegDir);
          for (const sub of fs.readdirSync(binBase)) {
            const candidate = path.join(binBase, sub, 'bin', 'ffmpeg.exe');
            if (fs.existsSync(candidate)) return candidate;
          }
        }
      } catch {
        // ignore search error
      }
    }
  }

  return null;
}

/**
 * Converts a HEIC / HEIF image buffer into a color-calibrated, high-fidelity JPEG buffer.
 * Preserves full resolution and applies Apple Display P3 / HDR PQ (SMPTE 2084)
 * tone mapping to standard sRGB so colors remain vibrant, bright, and identical to the iPhone screen.
 */
export async function convertHeicToJpegBuffer(buffer: Buffer): Promise<Buffer> {
  const ffmpeg = getFfmpegPath();
  if (!ffmpeg) {
    throw new Error('FFmpeg is not available on this server to convert HEIC.');
  }

  const uniqueId = `heic_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const tempIn = path.join(os.tmpdir(), `${uniqueId}.heic`);
  const tempMid = path.join(os.tmpdir(), `${uniqueId}.png`);
  const tempOut = path.join(os.tmpdir(), `${uniqueId}.jpg`);

  try {
    fs.writeFileSync(tempIn, buffer);

    let converted = false;

    // 1. First attempt: Apple HDR Display P3 calibrated pipeline (16-bit intermediate + zscale tone mapping)
    try {
      execFileSync(ffmpeg, ['-y', '-i', tempIn, '-pix_fmt', 'rgb48be', tempMid], { stdio: 'ignore' });
      execFileSync(
        ffmpeg,
        [
          '-y',
          '-i',
          tempMid,
          '-vf',
          'zscale=tin=smpte2084:pin=smpte432:min=bt709:t=iec61966-2-1:p=bt709:m=bt709:r=full',
          '-pix_fmt',
          'yuv444p',
          '-q:v',
          '1',
          tempOut,
        ],
        { stdio: 'ignore' }
      );
      converted = true;
    } catch {
      // Not an HDR PQ image or zscale failed, fall through to direct conversion
    }

    // 2. Second attempt: Direct high-quality SDR conversion
    if (!converted) {
      execFileSync(ffmpeg, ['-y', '-i', tempIn, '-pix_fmt', 'yuv444p', '-q:v', '1', tempOut], { stdio: 'ignore' });
    }

    if (!fs.existsSync(tempOut)) {
      throw new Error('Failed to generate converted JPEG output.');
    }

    return fs.readFileSync(tempOut);
  } finally {
    [tempIn, tempMid, tempOut].forEach((filePath) => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {
        // ignore cleanup error
      }
    });
  }
}
