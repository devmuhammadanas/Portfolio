'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export type TypeWriterSegment = {
  text: string;
  className?: string;
  prefix?: ReactNode;
  wrapperClassName?: string;
};

export default function TypeWriter({
  text,
  speed = 12,
  onProgress,
}: {
  text: string | TypeWriterSegment[];
  speed?: number;
  onProgress?: () => void;
}) {
  const segments = typeof text === 'string' ? [{ text }] : text;
  const fullText = segments.map((segment) => segment.text).join('');
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (!fullText.length) return;

    const timer = setInterval(() => {
      setVisibleLength((currentLength) => {
        const nextLength = Math.min(currentLength + 1, fullText.length);
        onProgress?.();

        if (nextLength >= fullText.length) {
          clearInterval(timer);
        }

        return nextLength;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [fullText, onProgress, speed]);

  const visibleSegments = segments.map((segment, index) => {
    const previousLength = segments
      .slice(0, index)
      .reduce((total, currentSegment) => total + currentSegment.text.length, 0);
    const segmentLength = Math.max(
      Math.min(visibleLength - previousLength, segment.text.length),
      0
    );

    return {
      ...segment,
      text: segment.text.slice(0, segmentLength),
    };
  });

  return (
    <div className="whitespace-pre-line">
      {visibleSegments.map((segment, index) => {
        if (!segment.text) return null;

        return (
          segment.prefix || segment.wrapperClassName ? (
            <span key={index} className={segment.wrapperClassName}>
              {segment.prefix}
              <span className={segment.className}>{segment.text}</span>
            </span>
          ) : (
            <span key={index} className={segment.className}>
              {segment.text}
            </span>
          )
        );
      })}
      {visibleLength < fullText.length && (
        <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-white/60" />
      )}
    </div>
  );
}
