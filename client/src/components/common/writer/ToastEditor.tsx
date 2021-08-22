import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

export interface ForwardedEditorProps extends EditorProps {
  forwardedRef: React.MutableRefObject<Editor>;
}

export default function ToastEditor(props: ForwardedEditorProps) {
  return <Editor {...props} ref={props.forwardedRef} />;
}
