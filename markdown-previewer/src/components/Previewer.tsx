import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  content: string;
}

export default function Previewer({ content }: Props) {
  marked.use({
    breaks: true,
    gfm: true,
  });

  const html = marked.parse(content);
  const purifiedHtml = DOMPurify.sanitize(html);
  return (
    <section className="preview-section" id="preview">
      <h2 className="header">Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: purifiedHtml }}></div>
    </section>
  );
}
