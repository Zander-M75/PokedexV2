import { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return (
    <div className="bg-gb-screenDark text-gb-screenLight gb-scanlines pixel-border rounded min-h-[500px] max-h-[600px] flex flex-col overflow-hidden">
      {children}
    </div>
  );
}

