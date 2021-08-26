import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ContentNavigationButton } from './NavigationButton';

const Container = styled.div({
  width: '100%',
  padding: '.5rem',
  marginBottom: '1rem',
  '@media screen and (max-width: 1380px)': {
    display: 'none',
    opacity: 0
  }
});

const NavigationContainer = styled.div({
  width: '100%',
  padding: '.5rem',
  boxShadow: 'inset 3px 0px #aaaaaa',
  fontSize: '.875rem',
  color: '#777'
});

export interface Heading {
  tag: string;
  text: string;
}

function isHeadingTag(tag: string): boolean {
  if (tag.length !== 2) {
    return false;
  }

  if (!tag.startsWith('H')) {
    return false;
  }

  if (Number(tag.charAt(1)) === NaN) {
    return false;
  }

  return true;
}

export function ContentNavigation() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  function applyHeadings(article: Element) {
    if (article) {
      const tempHeadings: Heading[] = [];
      for (const articleChild of article.children) {
        if (isHeadingTag(articleChild.tagName)) {
          const heading: Heading = {
            tag: articleChild.tagName,
            text: articleChild.textContent!
          };
          tempHeadings.push(heading);
        }
      }
      setHeadings(tempHeadings);
    }
  }

  function scrollToHeadingElement(hash: string) {
    const id = hash.slice(1);
    if (id !== '') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  useEffect(() => {
    const articleContainer = document.getElementById('styled-article');
    applyHeadings(articleContainer?.firstElementChild!);
    scrollToHeadingElement(location.hash);
  }, []);

  if (headings.length === 0) {
    return null;
  } else {
    return (
      <Container>
        <NavigationContainer>
          {headings.map((heading) => {
            return <ContentNavigationButton key={heading.text} heading={heading} />;
          })}
        </NavigationContainer>
      </Container>
    );
  }
}
