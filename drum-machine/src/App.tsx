import { useState, useEffect, BaseSyntheticEvent, useRef } from "react";
import DrumPad from "./components/DrumPad";
import { capitalize, replaceHyphen } from "./components/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const soundFolder = "../src/assets/sounds/";
const drumPadArray = [
  { id: "q", name: "heater-1", sound: `${soundFolder}heater-1.mp3` },
  { id: "w", name: "heater-2", sound: `${soundFolder}heater-2.mp3` },
  { id: "e", name: "heater-3", sound: `${soundFolder}heater-3.mp3` },
  { id: "a", name: "heater-4", sound: `${soundFolder}heater-4.mp3` },
  { id: "s", name: "clap", sound: `${soundFolder}clap.mp3` },
  { id: "d", name: "open-hh", sound: `${soundFolder}open-hh.mp3` },
  { id: "z", name: "kick-n-hat", sound: `${soundFolder}kick-n-hat.mp3` },
  { id: "x", name: "kick", sound: `${soundFolder}kick.mp3` },
  { id: "c", name: "closed-hh", sound: `${soundFolder}closed-hh.mp3` },
];

export default function App() {
  const [power, setPower] = useState(true);
  const [currentSound, setCurrentSound] = useState("");
  const [playing, setPlaying] = useState(false);
  let audioVolume = useRef(50);

  function handlePower() {
    setPower(!power);
    !power ? setCurrentSound("Hello!") : setCurrentSound("Goodbye!");
    setTimeout(() => {
      setCurrentSound("");
    }, 1000);
  }

  function handleKeyUp() {
    document.querySelectorAll(".drum-pad").forEach((pad) => {
      pad.classList.remove("active");
    });
    setPlaying(false);
    if (playing) {
      setTimeout(() => {
        setCurrentSound("");
      }, 100);
    }
  }

  function handleKeyDown(e: { key: string }) {
    if (e.key === "p") {
      handlePower();
    }
    handleMouseDown(e);
  }

  function handleChange(e: BaseSyntheticEvent) {
    if (power) {
      audioVolume.current = parseInt(e.target.value);
      setPlaying(true);
      setCurrentSound(`Volume: ${audioVolume.current}`);
    }
  }

  function handleMouseDown(e: { key: string; target?: { value: string } }) {
    const value = e.key ?? (e.target as HTMLButtonElement).value;
    const padKey = drumPadArray.find(({ id }) => value === id);
    if (power && value === padKey?.id) {
      setPlaying(true);
      const audio = document.getElementById(value) as HTMLMediaElement;
      audio.volume = audioVolume.current / 100 || 0;
      document.querySelector(`[value=${value}]`)?.classList.add("active");
      if (padKey) setCurrentSound(capitalize(replaceHyphen(padKey.name)));
      if (audio) audio.play();
    }
  }

  if (!power) {
    document.getElementById("volume")?.setAttribute("disabled", "");
  } else {
    document.getElementById("volume")?.removeAttribute("disabled");
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <section className="top-panel">
        <button
          className="pwrBtn"
          onClick={handlePower}
          style={{
            backgroundColor: power ? "green" : "black",
            boxShadow: power ? "0 0 25px 5px green" : "",
          }}
        ></button>
        <div
          id="display"
          style={{ borderColor: power ? "hsl(50, 99%, 49%)" : "black" }}
        >
          {currentSound}
        </div>
      </section>
      <section className="volume-panel">
        <FontAwesomeIcon icon={faVolumeLow} />
        <input
          id="volume"
          name="volume"
          type="range"
          min={0}
          max={100}
          defaultValue={audioVolume.current}
          onChange={handleChange}
        />
        <FontAwesomeIcon icon={faVolumeHigh} />
      </section>
      <section className="control-panel">
        {drumPadArray.map(({ id, name, sound }, i) => (
          <DrumPad
            key={i}
            id={id}
            name={name}
            sound={sound}
            power={power}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleKeyUp}
          />
        ))}
      </section>
    </>
  );
}
