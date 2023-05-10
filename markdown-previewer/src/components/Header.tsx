import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { BaseSyntheticEvent, useRef, useState } from "react";

interface Props {
  title: string;
  logo: IconDefinition;
  id: string;
}

export default function Header({ title, logo, id }: Props) {
  const leftMax = useRef(false);
  const [leftWidth, setLeftWidth] = useState<string>();
  function handleClick(e: BaseSyntheticEvent) {
    const leftSection = document.querySelector<HTMLElement>(".left-section");
    const rightSection = document.querySelector(".right-section");
    const separator = document.querySelector(".separator-hitbox");
    const editor = document.getElementById("editor");

    if (e.target.id === "editor-btn") {
      leftMax.current = !leftMax.current;
      separator?.classList.toggle("hidden");
      rightSection?.classList.toggle("hidden");
    } else if (e.target.id === "preview-btn") {
      separator?.classList.toggle("hidden");
      leftSection?.classList.toggle("hidden");
    }

    if (leftMax.current) {
      setLeftWidth(leftSection?.style.width);
      if (leftSection) {
        leftSection.style.width = "100%";
        if (editor && window.innerWidth < 850) editor.style.height = "90vh";
      }
    } else {
      if (leftSection) {
        leftSection.style.width = `${leftWidth}`;
        if (editor && window.innerWidth < 850) editor.style.height = "20vh";
      }
    }
  }

  return (
    <div className="header">
      <FontAwesomeIcon icon={logo} />
      <h2 className="section-title">{title}</h2>
      <button id={id} className="expand-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faExpand} />
      </button>
    </div>
  );
}
