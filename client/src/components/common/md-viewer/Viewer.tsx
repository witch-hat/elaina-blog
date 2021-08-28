import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import styles from "src/styles/markdown-styles.module.css";

interface Props {
  content: string;
}

export function MDViewer(props: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ children }) {
          const text = children.toString();
          return <h1 id={text}>{text}</h1>;
        },
        h2({ children }) {
          const text = children.toString();
          return <h2 id={text}>{text}</h2>;
        },
        h3({ children }) {
          const text = children.toString();
          return <h3 id={text}>{text}</h3>;
        },
        h4({ children }) {
          const text = children.toString();
          return <h4 id={text}>{text}</h4>;
        },
        h5({ children }) {
          const text = children.toString();
          return <h5 id={text}>{text}</h5>;
        },
        h6({ children }) {
          const text = children.toString();
          return <h6 id={text}>{text}</h6>;
        },
        img({ src }) {
          return <img src={src} style={{ width: "100%" }} />;
        },
        code({ className, children }) {
          // Removing "language-" because React-Markdown already added "language-"
          const language = className?.replace("language-", "");
          return (
            <SyntaxHighlighter style={materialDark} language={language}>
              {children[0]}
            </SyntaxHighlighter>
          );
        },
      }}
      className={styles["markdown-body"]}
    >
      {props.content}
    </ReactMarkdown>
  );
}
