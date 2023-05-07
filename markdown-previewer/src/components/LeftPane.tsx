import { useEffect, createRef, ReactElement, useCallback } from "react";

interface Props {
  leftWidth: number | undefined;
  setLeftWidth: (value: number | undefined) => void;
  children: ReactElement;
  className?: string;
}

export default function LeftPane({ children, leftWidth, setLeftWidth }: Props) {
  const leftRef = createRef<HTMLDivElement>();

  const handleResize = useCallback(() => {
    if (window.innerWidth < 850) {
      setLeftWidth(document.querySelector(".work-station")?.clientWidth);
    }
  }, [setLeftWidth]);

  useEffect(() => {
    if (leftRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current.clientWidth);
        return;
      }

      leftRef.current.style.width = `${leftWidth}px`;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [leftRef, leftWidth, setLeftWidth, handleResize]);

  return (
    <div className="left-section" ref={leftRef}>
      {children}
    </div>
  );
}
