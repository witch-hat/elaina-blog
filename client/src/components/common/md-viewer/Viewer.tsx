// import { Viewer } from '@toast-ui/react-editor';
// import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from 'src/styles/markdown-styles.module.css';

interface Props {
  content: string;
}

export function MDViewer(props: Props) {
  return (
    <ReactMarkdown
      // @ts-ignore
      remarkPlugins={[remarkGfm]}
      components={{
        img({ src }) {
          return <img src={src} style={{ width: '100%' }} />;
        },
        code({ className, children }) {
          // Removing "language-" because React-Markdown already added "language-"
          const language = className?.replace('language-', '');
          return (
            <SyntaxHighlighter style={materialDark} language={language}>
              {children[0]}
            </SyntaxHighlighter>
          );
        }
      }}
      className={styles['markdown-body']}
    >
      {props.content}
    </ReactMarkdown>
  );
}
