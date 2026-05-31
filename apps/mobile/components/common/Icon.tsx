import React from 'react';
import Svg, { Path, Circle, Rect, G, Line, Polyline } from 'react-native-svg';

export type IconName =
  | 'logo'
  | 'shield'
  | 'qr'
  | 'home'
  | 'file-text'
  | 'user'
  | 'chevron-right'
  | 'plus'
  | 'calendar'
  | 'flask'
  | 'stethoscope'
  | 'pill'
  | 'syringe'
  | 'clipboard'
  | 'bell'
  | 'search'
  | 'eye'
  | 'eye-off'
  | 'log-out'
  | 'copy'
  | 'check'
  | 'info'
  | 'lock'
  | 'smartphone'
  | 'settings'
  | 'activity'
  | 'heart'
  | 'x'
  | 'arrow-right'
  | 'chevron-left'
  | 'mail';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, color = '#2D2A26', strokeWidth = 1.5 }: IconProps) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (name) {
    case 'logo':
      return (
        <Svg {...props}>
          <Path d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347" />
          <Path d="M12 2v10.892" />
          <Path d="M4.26 10.147L12 2l7.74 8.147" />
        </Svg>
      );
    case 'shield':
      return (
        <Svg {...props}>
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
      );
    case 'qr':
      return (
        <Svg {...props}>
          <Rect x="3" y="3" width="7" height="7" rx="1" />
          <Rect x="14" y="3" width="7" height="7" rx="1" />
          <Rect x="3" y="14" width="7" height="7" rx="1" />
          <Rect x="14" y="14" width="7" height="7" rx="1" />
        </Svg>
      );
    case 'home':
      return (
        <Svg {...props}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
      );
    case 'file-text':
      return (
        <Svg {...props}>
          <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <Polyline points="14 2 14 8 20 8" />
          <Line x1="16" y1="13" x2="8" y2="13" />
          <Line x1="16" y1="17" x2="8" y2="17" />
          <Polyline points="10 9 9 9 8 9" />
        </Svg>
      );
    case 'user':
      return (
        <Svg {...props}>
          <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg {...props}>
          <Path d="M9 18l6-6-6-6" />
        </Svg>
      );
    case 'plus':
      return (
        <Svg {...props}>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg {...props}>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Line x1="16" y1="2" x2="16" y2="6" />
          <Line x1="8" y1="2" x2="8" y2="6" />
          <Line x1="3" y1="10" x2="21" y2="10" />
        </Svg>
      );
    case 'flask':
      return (
        <Svg {...props}>
          <Path d="M10 2v7.31M14 2v7.31M8.5 2h7M14.5 9.3a5.5 5.5 0 11-9 0l2.5-7.3h4z" />
        </Svg>
      );
    case 'stethoscope':
      return (
        <Svg {...props}>
          <Path d="M4.5 12.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <Path d="M8 9v3.5a4.5 4.5 0 004.5 4.5h0a4.5 4.5 0 004.5-4.5V9" />
          <Path d="M17 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        </Svg>
      );
    case 'pill':
      return (
        <Svg {...props}>
          <Path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z" />
          <Line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
        </Svg>
      );
    case 'syringe':
      return (
        <Svg {...props}>
          <Path d="M18 2l4 4M16.5 3.5l3 3M11 9l-7 7-3-3 7-7M7 13l3 3M4.5 15.5L2 18l4 4 2.5-2.5" />
        </Svg>
      );
    case 'clipboard':
      return (
        <Svg {...props}>
          <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg {...props}>
          <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 01-3.46 0" />
        </Svg>
      );
    case 'search':
      return (
        <Svg {...props}>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Svg>
      );
    case 'eye':
      return (
        <Svg {...props}>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Circle cx="12" cy="12" r="3" />
        </Svg>
      );
    case 'eye-off':
      return (
        <Svg {...props}>
          <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <Line x1="1" y1="1" x2="23" y2="23" />
        </Svg>
      );
    case 'log-out':
      return (
        <Svg {...props}>
          <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <Polyline points="16 17 21 12 16 7" />
          <Line x1="21" y1="12" x2="9" y2="12" />
        </Svg>
      );
    case 'copy':
      return (
        <Svg {...props}>
          <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </Svg>
      );
    case 'check':
      return (
        <Svg {...props}>
          <Polyline points="20 6 9 17 4 12" />
        </Svg>
      );
    case 'info':
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="10" />
          <Line x1="12" y1="16" x2="12" y2="12" />
          <Line x1="12" y1="8" x2="12.01" y2="8" />
        </Svg>
      );
    case 'lock':
      return (
        <Svg {...props}>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <Path d="M7 11V7a5 5 0 0110 0v4" />
        </Svg>
      );
    case 'smartphone':
      return (
        <Svg {...props}>
          <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <Line x1="12" y1="18" x2="12.01" y2="18" />
        </Svg>
      );
    case 'settings':
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.17 15H4a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 005.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 0010.2 4.8V4.5a2 2 0 014 0v.09a1.65 1.65 0 001.51 1 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9h.09a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </Svg>
      );
    case 'activity':
      return (
        <Svg {...props}>
          <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </Svg>
      );
    case 'heart':
      return (
        <Svg {...props}>
          <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </Svg>
      );
    case 'x':
      return (
        <Svg {...props}>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );
    case 'arrow-right':
      return (
        <Svg {...props}>
          <Line x1="5" y1="12" x2="19" y2="12" />
          <Polyline points="12 5 19 12 12 19" />
        </Svg>
      );
    case 'chevron-left':
      return (
        <Svg {...props}>
          <Path d="M15 18l-6-6 6-6" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg {...props}>
          <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <Polyline points="22,6 12,13 2,6" />
        </Svg>
      );
    default:
      return null;
  }
}
