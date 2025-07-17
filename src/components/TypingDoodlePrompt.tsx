import { useState, useEffect } from 'react';

const DoodleArrow = ({ color = 'currentColor' }: { color?: string }) => (
  <svg
    width="60"
    height="80"
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-bounce"
  >
    <path
      d="M30 5 C20 25, 20 45, 30 65 M30 65 L20 55 M30 65 L40 55"
      stroke={color}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TypingDoodlePrompt = ({ isDark }: { isDark: boolean }) => {
  const fullText = 'Try this cool feature!!';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(i => i + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const closeTimer = setTimeout(() => {
        setVisible(false);
      }, 5000); // hide 5 seconds after typing finishes
      return () => clearTimeout(closeTimer);
    }
  }, [index]);

  const color = isDark ? '#f97316' : '#f97316'; // Tailwind orange-500

  if (!visible) return null;

  return (
    <div className="fixed bottom-32 right-4 z-50 pointer-events-none">
      <div className="flex items-center gap-3 flex-row-reverse">
        <DoodleArrow color={color} />
        <span
          className="text-2xl font-bold font-handwriting text-orange-500 whitespace-nowrap"
          style={{ fontFamily: '"Shadows Into Light", cursive' }}
        >
          {displayedText}
          {index < fullText.length && <span className="animate-pulse">|</span>}
        </span>
      </div>
    </div>
  );
};

export default TypingDoodlePrompt;
