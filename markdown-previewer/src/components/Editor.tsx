import { ChangeEventHandler } from "react";
import Header from "./Header";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
interface Props {
  handleChange: ChangeEventHandler;
  content: string;
}

export default function Editor({ handleChange, content }: Props) {
  return (
    <section className="edit-section">
      <Header id="editor-btn" title="Editor" logo={faPenToSquare} />
      <textarea
        id="editor"
        onChange={handleChange}
        defaultValue={content}
      ></textarea>
    </section>
  );
}
