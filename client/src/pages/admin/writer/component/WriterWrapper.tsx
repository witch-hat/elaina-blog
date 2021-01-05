import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface WriterWrapperProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export default (props: WriterWrapperProps) => <Editor {...props} ref={props.forwardedRef} />;
