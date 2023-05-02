interface Props {
  content: string;
  author: string;
}

export default function Quote({ content, author }: Props) {
  return (
    <blockquote className="quote-container">
      <p id="text">{content}</p>
      <figcaption id="author"> -- {author}</figcaption>
    </blockquote>
  );
}
