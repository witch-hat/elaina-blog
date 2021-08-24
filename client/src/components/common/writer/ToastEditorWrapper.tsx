import React from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';

import { ForwardedEditorProps } from './ToastEditor';

const Editor = dynamic<ForwardedEditorProps>(() => import('./ToastEditor'), { ssr: false });

export const ForwardedToastEditor = React.forwardRef<EditorType, EditorProps>((props, forwardedRef) => (
  <Editor {...props} forwardedRef={forwardedRef as React.MutableRefObject<EditorType>} />
));

ForwardedToastEditor.displayName = 'ForwardedToastEditor';
