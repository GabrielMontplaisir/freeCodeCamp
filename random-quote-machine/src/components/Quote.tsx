// Declaring the type of Props going into quote.
interface Props {
  content: string;
  author: string;
}

// Grabbing the "content" & "author" from the fetched quote data.
export default function Quote({ content, author }: Props) {
  return (
    <blockquote className="quote-container">
      <p id="text">{content}</p>
      <figcaption id="author"> -- {author}</figcaption>
    </blockquote>
  );
}
