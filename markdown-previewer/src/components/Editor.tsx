export default function Editor({ handleChange, content }: any) {
  return (
    <section className="edit-section">
      <h2 className="header">Editor</h2>
      <textarea id="editor" onChange={handleChange}>
        {content}
      </textarea>
    </section>
  );
}
