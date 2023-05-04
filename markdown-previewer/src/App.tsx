import { useState } from "react";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";

const preview = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
Here's some inline code, between 2 backticks:\`<div></div>\`
And here is a code block:

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\` 

You can also make text **bold**, _italic_, or **_both_**! You can even ~~cross stuff out~~.

You can create hyperlinks as follows: [link](https://www.freecodecamp.org).
You can also create:
> Block Quotes!

Need to create a table? No problem!

Header | Another Header | Yet Another Header
------------ | ------------- | -------------
Some content | More content | Even more content
Here | Here too | Here again!

- You can create leveled lists;
  - Just tab to add another level;
     - Tab again to create a third;
        - And a fourth.

1. Create numbered lists by adding a number in front.
1. Even if you type 1. multiple times, it will continue incrementing the numbers.
1. This should be number 3.
    1. Just like unordered lists, you can add sublevels, which will reset the numbers.
        - Mix it up with unordered and ordered lists!

Finally, you can add some images by adding an exclamation point to your "link".
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

Enjoy using this Markdown Previewer!
`;

export default function App() {
  const [mark, setMark] = useState(preview);

  const handleChange = (event: any) => {
    setMark(event.target.value);
  };

  return (
    <main>
      <h1 className="title">Markdown Previewer</h1>
      <div className="work-station">
        <Editor handleChange={handleChange} content={preview} />
        <Previewer content={mark} />
      </div>
    </main>
  );
}
