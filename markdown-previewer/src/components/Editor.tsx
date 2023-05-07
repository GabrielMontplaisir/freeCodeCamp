import { ChangeEventHandler } from "react";
interface Props {
  handleChange: ChangeEventHandler;
  content: string;
}

export default function Editor({ handleChange, content }: Props) {
  return (
    <section className="edit-section">
      <h2 className="header">Editor</h2>
      <textarea
        id="editor"
        onChange={handleChange}
        defaultValue={content}
      ></textarea>
    </section>
  );
}
