import styled from 'styled-components';

const ContentCategoryContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1000px',
  height: '100%'
});

interface Props {}

export function ContentCategory() {
  return <ContentCategoryContainer>Content Categories</ContentCategoryContainer>;
}
