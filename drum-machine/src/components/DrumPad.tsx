import { MouseEventHandler } from "react";

interface Props {
  id: string;
  name: string;
  sound: string;
  power: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export default function DrumPad({
  id,
  name,
  sound,
  power,
  // handleMouseDown,
  // handleMouseUp,
  handleClick,
}: Props) {
  const pads = document.querySelectorAll(".drum-pad");

  !power
    ? pads.forEach((pad) => pad.setAttribute("disabled", ""))
    : pads.forEach((pad) => pad.removeAttribute("disabled"));

  return (
    <button
      id={name}
      value={id}
      className="drum-pad"
      onClick={handleClick}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
    >
      {id.toUpperCase()}
      <audio id={id} src={sound}></audio>
    </button>
  );
}
