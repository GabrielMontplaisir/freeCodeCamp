import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import Header from "./Header";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
      <Header id="preview-btn" title="Preview" logo={faMagnifyingGlass} />
      <div
        className="preview-text"
        dangerouslySetInnerHTML={{ __html: purifiedHtml }}
      ></div>
    </section>
  );
}
