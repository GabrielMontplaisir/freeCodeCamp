import React, { useState, createRef, useEffect } from "react";
import LeftPane from "./LeftPane";

interface Props {
  left: React.ReactElement;
  right: React.ReactElement;
}

const MIN_WIDTH = 300;

export default function SplitPane({ left, right }: Props) {
  const [leftWidth, setLeftWidth] = useState<undefined | number>(MIN_WIDTH);
  const [separatorXPos, setSeparatorXPos] = useState<undefined | number>(
    undefined
  );
  const [dragging, setDragging] = useState(false);
  const splitPaneRef = createRef<HTMLDivElement>();

  const onMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPos(e.clientX);
    setDragging(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setSeparatorXPos(e.touches[0].clientX);
    setDragging(true);
  };

  const onMove = (clientX: number) => {
    if (dragging && leftWidth && separatorXPos) {
      const newLeftWidth = leftWidth + clientX - separatorXPos;
      setSeparatorXPos(clientX);

      if (newLeftWidth < MIN_WIDTH) {
        setLeftWidth(MIN_WIDTH);
        return;
      }

      if (splitPaneRef.current) {
        const splitPaneWidth = splitPaneRef.current.clientWidth;
        if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
          setLeftWidth(splitPaneWidth - MIN_WIDTH);
          return;
        }
      }

      setLeftWidth(newLeftWidth);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    onMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    onMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div className="work-station" ref={splitPaneRef}>
      <LeftPane leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
        {left}
      </LeftPane>
      <div
        className="separator-hitbox"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onMouseUp}
      >
        <div className="separator" />
      </div>
      <div className="right-section">{right}</div>
    </div>
  );
}
