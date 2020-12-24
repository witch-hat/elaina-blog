import ReactMarkdown from 'react-markdown';
import { render } from 'react-dom';

export default function Writer() {
  const source = `# 제목`;

  return (
    <div>
      <ReactMarkdown children={source} />
    </div>
  );
}
