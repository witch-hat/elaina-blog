import React from "react";
import styled from "styled-components";

import { MDViewer } from "src/components/common/md-viewer/Viewer";

const StyledArticle = styled.article({
  width: "100%",
  marginTop: "2rem",
  fontSize: "1.1rem",
  wordBreak: "keep-all",
});

interface Props {
  article: string;
}

function Article(props: Props) {
  return (
    <StyledArticle id={"styled-article"}>
      <MDViewer content={props.article} />
    </StyledArticle>
  );
}

export const MemoizedArticle = React.memo(Article);
