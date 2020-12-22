import styled from 'styled-components';

import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.section({});

export default function About() {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MainPageLayout>
      <div>About</div>
    </MainPageLayout>
  );
}
