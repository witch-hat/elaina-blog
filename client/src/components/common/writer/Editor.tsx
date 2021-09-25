import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'react-markdown-editor-lite/lib/index.css';

import styles from 'src/styles/markdown-styles.module.css';

const ReactMd = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });

export interface EditorProps {
  value: string;
  handleChange: (text: string) => void;
}

export function Editor(props: EditorProps) {
  return (
    <ReactMd
      defaultValue={props.value}
      onChange={(e) => props.handleChange(e.text)}
      style={{ height: '100%' }}
      renderHTML={(text) => (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
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
          {text}
        </ReactMarkdown>
      )}
    />
  );
}
