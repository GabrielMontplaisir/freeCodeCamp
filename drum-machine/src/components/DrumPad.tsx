import { MouseEventHandler } from "react";

interface Props {
  id: string;
  name: string;
  sound: string;
  power: boolean;
  handleMouseDown: any;
  handleMouseUp: MouseEventHandler;
}

export default function DrumPad({
  id,
  name,
  sound,
  power,
  handleMouseDown,
  handleMouseUp,
}: Props) {
  const pads = document.querySelectorAll(".drum-pad");

  if (!power) {
    pads.forEach((pad) => pad.setAttribute("disabled", ""));
  } else {
    pads.forEach((pad) => pad.removeAttribute("disabled"));
  }

  return (
    <button
      id={name}
      value={id}
      className="drum-pad"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {id.toUpperCase()}
      <audio id={id} src={sound}></audio>
    </button>
  );
}
