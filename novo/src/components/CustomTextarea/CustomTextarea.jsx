import { useState } from "react";
import { Editor, Gutter } from "./CustomTextareaStyle";

// eslint-disable-next-line react/prop-types
function CustomTextarea({ onChange }) {
  const [lineNumbers, setLineNumbers] = useState(1);

  function update(e) {
    const { value } = e.target;
    let lineBreaks = value.match(/\n/gi) || [];
    console.log(lineBreaks);
    setLineNumbers(lineBreaks.length + 1);
    onChange(value);
  }

  return (
    <Editor>
      <Gutter>
        {[...Array(lineNumbers)].map((line, idx) => {
          return <span key={`line-${idx}`}>{idx + 1}</span>;
        })}
      </Gutter>
      <textarea onChange={update} />
    </Editor>
  );
}

export default CustomTextarea;

