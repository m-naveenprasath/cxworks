import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon: "CX" monogram in the brand accent. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        borderRadius: 14,
        color: '#40C8E0',
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -1,
      }}
    >
      CX
    </div>,
    size,
  );
}
