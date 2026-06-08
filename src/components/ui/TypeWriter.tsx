'use client';

import { useEffect, useState } from 'react';

export default function TypeWriter({
  text,
}: {
  text: string;
}) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="whitespace-pre-line">
      {displayText}
    </div>
  );
}