# Elaina-Blog Coding Style Guide Book

## Workspace

- 꼭! VS Code의 Workspace에서 작업해주세요.
- `elaina-blog.code-workspace`에서 `Open Workspace` 버튼 클릭

## ESLint(Client)

- 정상적으로 컴파일 되더라도, ESlint 에러가 뜰 수 있습니다...
- ESLint에러가 뜨면 빌드(`yarn build`)가 되지 않으니 나중에 쉽게 빌드하기 위해 에러를 없애주세요

## Naming Convention

- Folder: kebab-case (`folder-name`).. Maybe??
- React Components Filename(`.tsx`): PascalCase (`HelloWorld.tsx`)
- Files(**NOT react component**): kebab-case (`file-name.json`)
- Styled Components, React Components: PascalCase (소문자로 시작 시 compile error)
- Variables, Functions: camelCase (`count`, `setCount`)
- Interface, Enum: PascalCase

## Variables & Functions

- 변수는 명사형사용, 해당 변수의 범위 또는 파일 안에서 모호하지 않게. 모호할 바에는 긴 이름이 낫다는 내 의견...
  - `count`: What Count??...🤔
  - `likeCount`: Good!
- 변수명에 타입 굳이 명시X

  - `postList: post[] = client.query(GET_POSTS)`: Hmm...
  - `posts: post[] = client.query(GET_POSTS)`: GOOD!

- `boolean` 타입의 경우 `is` 로 시작하는게 좋을 것 같음(자연스러운 코드 흐름 파악)

  ```ts
    const [isModalVisible, setIsModalVisible] = useState(false);
    ...

    if (isModalVisible) {
      return ...
    }
  ```

- 함수는 동사로 시작하는게 좋음(`doSomething`)
- `function` 키워드로 할 수 있으면 `function`을 사용하고, `useCallback` 등 React Hooks를 사용할 땐 `const` 허용
  - `function displayCount() {}`
  - `const displayCount = useCallback(() => {}, [])`

## Components

- 리액트 모듈은 자동으로 Nextjs에서 import함. 컴포넌트 내에서 React를 사용하지 않는다면 굳이 `import React from 'react'`를 하지 않아도 됩니다.

- 컴포넌트 개요

```tsx
imports...

styled components...

global variables..

interface Props {...}

export funciton Components(props: Props) {
  variables...

  functions...

  return (
    styled components...
  )
}

// if file is index.tsx
export const getServerSideProps () {}
```

- import 순서

```ts
import React from 'react'; // 외부 모듈(ex. React, next, styled-components 등등)
// 한줄 공백
import { BorderBox } from 'src/components'; // 절대경로 파일
// 한줄 공백
import { Item } from './item'; // 상대경로 파일
// 한줄 공백
```

- Variables, Functions Ordering in Component

```tsx
export function Component() {
  const a = 1; // Local variables
  // 한줄 공백
  const [count, setCount] = useState(0); // React state, ref
  // 한줄 공백
  const client = useApollo(); // GraphQL queries
  const [writePost] = client.query();
  // 한줄 공백
  useEffect(() => {}, []); // useEffect hook, local variables using state, ref, queries
  // 한줄 공백
  // functions, handling functions, useCallback, useMemo hooks
  function displayHello() {
    console.log('Hello!');
  }

  return <div></div>;
}
```

## CSS(styled-components)

- CSS Properties Ordering

```
Layout Properties (position, float, clear, display)
Box Model Properties (width, height, margin, padding)
Visual Properties (color, background, border, box-shadow)
Typography Properties (font-size, font-family, text-align, text-transform)
Misc Properties (cursor, overflow, z-index)
```

## TypeScript

- Promise

  - `async` 함수 내부에서 `await` 키워드를 한번에 여러번 사용하는 것은 페이지 로딩 속도에 악영향을 줌.
  - ex)

    ```ts
    const profileQueryResult = await apolloClient.query({ query: GET_PROFILE });
    const categoryQueryResult = await apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS });
    const categoryLatestPostQueryResult = await apolloClient.query({ query: GET_LASTEST_POSTS });
    const aboutQueryResult = await apolloClient.query({ query: GET_ABOUT });
    ```

  - Improves: **`Promise.all()` 메소드 사용**
  - 함수인자로, `Promise`를 반환하는 애들로 이루어진 배열을 준다.
  - 반환값도 순차적으로 배열로 들어감. ES6에 나온 배열 할당 문법 사용하면 편리!
  - ex)

  ```ts
  const [profileQueryResult, categoryQueryResult, categoryLatestPostQueryResult, aboutQueryResult, latestPostsQueryResult] =
    await Promise.all([
      apolloClient.query({ query: GET_PROFILE }),
      apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS }),
      apolloClient.query({ query: GET_LATEST_POSTS_PER_CATEGORY }),
      apolloClient.query({ query: GET_ABOUT }),
      apolloClient.query({
        query: GET_LATEST_POSTS,
        variables: {
          page: 1
        }
      })
    ]);
  ```

## Next.js

- How to use `getServerSideProps` with TypeScript

```tsx
interface ServerSideProps {
  server-side-props: types
}
// extends ServerSideProps
// if needed, extends AppCommonProps too...
interface Props extends ServerSideProps {
  other-react-props: types
}

function Component(props: Props) {....}
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  ...
  return {
    props: {
      //ServerSideProps type in here
    }
  }
}
```

## GraphQL

## DB
