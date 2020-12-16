import React from 'react';
import styled from 'styled-components';

const Container = styled.section({
  width: '800px',
  display: 'flex',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 5rem - 40px)',
  '@media screen and (max-width: 1280px)': {
    width: '100%'
  },
  '@media screen and (max-width: 768px)': {
    padding: '.5rem'
  }
});

const Title = styled.header({
  width: '100%',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 768px)': {
    fontSize: '2rem'
  }
});

const Menu = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '2.2rem',
  alignItems: 'center',
  fontSize: '.875rem'
});

const Article = styled.article({
  marginTop: '2rem',
  fontSize: '1.1rem',
  wordBreak: 'keep-all'
});

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  marginRight: '1rem'
});

const MenuButton = styled.div({
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

export default function Content() {
  return (
    <Container>
      <Title>React란 무엇인가</Title>
      <Menu>
        <ContentInfoWrapper>
          <Author>
            <i className='fas fa-user'></i>&nbsp;Elaina
          </Author>
          <span>
            <i className='far fa-clock'></i>&nbsp;2020.12.14 15:38
          </span>
        </ContentInfoWrapper>
        <MenuButton>
          <i className='fas fa-ellipsis-v'></i>
        </MenuButton>
      </Menu>
      <Article>
        여기 마크다운으로 해야함 <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra eros at quam mattis
        imperdiet. Etiam arcu quam, porttitor eget lobortis ac, scelerisque eget sem. Etiam porttitor, odio sed ultrices rhoncus, nunc lorem
        tincidunt dui, sed mattis magna orci vitae metus. Etiam iaculis, dui eget euismod placerat, erat felis fringilla odio, interdum
        laoreet magna lorem ut tellus. Ut scelerisque est aliquet, commodo sapien nec, vestibulum ante. Fusce eros est, porta ac metus
        vitae, dictum luctus erat. Phasellus maximus purus at ante malesuada, a sodales ante varius. Aenean porta augue et felis sagittis
        efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis porta diam, ullamcorper fermentum dolor
        accumsan viverra. Sed egestas ultricies velit vitae sollicitudin. Aenean id sagittis massa. Sed suscipit lorem in euismod faucibus.
        Cras consectetur turpis vitae ante varius placerat eu et quam. Sed tristique tellus efficitur augue interdum, nec aliquet leo
        condimentum. Duis iaculis lectus augue, in molestie metus rutrum sed. Nulla facilisi. Praesent interdum blandit feugiat. Sed non
        nunc sed dui commodo varius eget ut est. In et nunc sollicitudin, commodo lacus lacinia, commodo eros. Curabitur non venenatis
        tellus. Suspendisse potenti. Curabitur vitae dui nunc. Proin nec turpis augue. Fusce lacinia fermentum metus, et facilisis turpis
        tincidunt et. Nullam in ullamcorper felis, sollicitudin interdum tortor. Pellentesque semper tortor suscipit velit rhoncus faucibus.
        Pellentesque pellentesque, ante eget mattis mollis, quam erat ornare felis, ut rhoncus turpis ex sed magna. In at libero rutrum,
        auctor justo non, tempor purus. Nulla sed pretium neque, id dapibus nisi. Vivamus imperdiet condimentum justo. Cras ac euismod
        mauris, sed volutpat ligula. Suspendisse aliquet odio neque. Fusce nisi enim, blandit iaculis turpis nec, eleifend mattis nibh.
        Maecenas maximus maximus turpis, non lobortis diam blandit non. Sed elit tellus, dictum blandit nibh sed, maximus imperdiet odio.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis consectetur odio, eget
        rutrum ex commodo nec. Vestibulum turpis velit, ultrices non nisi id, elementum dignissim sem. Maecenas finibus quam nec elit tempus
        maximus. Morbi vitae laoreet massa, cursus ullamcorper quam. Donec porttitor vulputate felis, eu porta magna accumsan quis. Ut
        vehicula ultrices fringilla. Fusce fringilla feugiat lorem at pharetra. Etiam nec nisi ut dolor condimentum rhoncus. Ut venenatis
        laoreet sem, eu mattis ante ullamcorper tempus. Proin rhoncus nisi nec ipsum scelerisque imperdiet. Aliquam facilisis dignissim sem.
        Maecenas ullamcorper lectus a lectus semper, non iaculis magna lobortis. Quisque laoreet velit malesuada arcu aliquam rhoncus.
        Praesent id lectus dolor. Nullam sed auctor sem. Suspendisse vulputate sapien luctus, pretium nunc eget, finibus arcu. Aliquam
        aliquam, diam vitae finibus gravida, dolor turpis mattis felis, accumsan sollicitudin diam dui vel lectus. Mauris luctus dictum
        magna, a lacinia lectus tempor at. In blandit odio quis euismod iaculis. Etiam efficitur ante nec luctus luctus. Donec eget
        tristique augue. Aliquam faucibus nulla eros, non volutpat nulla accumsan in. Curabitur ut lacinia sapien. Nunc mauris justo,
        venenatis et quam eu, accumsan convallis massa. Suspendisse pulvinar venenatis dui, vel placerat nulla mollis non. Aliquam tortor
        mi, tincidunt sit amet massa sed, gravida mattis neque. Curabitur lacinia lacus et sapien scelerisque pellentesque. Nullam ultricies
        interdum molestie. Duis non est quis purus gravida posuere. Nunc volutpat cursus urna, vel vehicula lacus dapibus id. Vivamus sit
        amet eleifend erat, pretium iaculis metus. Morbi luctus purus eleifend mi tincidunt pharetra quis vel magna. Suspendisse ut
        porttitor est. Ut varius nisl varius lacinia vestibulum. Nam gravida lacus euismod, porttitor tortor ac, sagittis sapien. Curabitur
        suscipit fermentum nibh a porta. Pellentesque sed faucibus metus. Ut dictum quis mi vel aliquet. Fusce id hendrerit est. Morbi
        rhoncus auctor dui. Mauris libero turpis, lacinia quis pretium eget, interdum eu nisi. Morbi bibendum metus massa, a porttitor nunc
        dictum eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ante diam, egestas id urna at, feugiat condimentum eros.
        Nam dapibus metus non eros condimentum tincidunt. Donec a massa ante. Integer tincidunt mi luctus, accumsan erat ut, viverra tellus.
        Aenean diam tellus, volutpat et volutpat sit amet, interdum vel sem. Duis pretium metus tortor, nec euismod lacus iaculis ac.
        Vivamus viverra est eget nibh blandit pretium. Aliquam ut tincidunt quam, id eleifend velit. Curabitur non odio id arcu accumsan
        hendrerit. Etiam aliquet libero est, a dignissim lorem vestibulum in. Nullam facilisis sed ligula ac pellentesque. Etiam non quam
        porta, viverra tellus eget, pulvinar felis. Sed eu libero nec dui condimentum pellentesque in laoreet purus. Aliquam interdum
        facilisis pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In bibendum eros
        sapien, quis imperdiet massa scelerisque quis. Sed tincidunt eget diam in rhoncus. Ut libero velit, sollicitudin at congue sit amet,
        egestas quis nunc. Etiam non lobortis diam. Proin semper metus ac diam fringilla, et accumsan eros rutrum. Morbi sollicitudin
        interdum sem, at accumsan mi placerat non. Cras venenatis porta ex ut sollicitudin. Quisque vestibulum enim eget augue condimentum
        rhoncus. Nam porta iaculis purus, sit amet rutrum nunc tristique ac. Vestibulum dictum, tellus et vestibulum viverra, felis orci
        iaculis massa, in placerat sem nulla eget dui. In tincidunt tempor malesuada. Aenean rhoncus nisl vel nibh porta sollicitudin.
        Curabitur eget diam sapien. Nulla tincidunt lacus ac elit aliquet, auctor condimentum nisi mattis. Curabitur ac ullamcorper enim.
        Donec eu risus imperdiet, cursus elit quis, molestie felis. Nullam a urna non ante tempor efficitur eu at justo.
      </Article>
    </Container>
  );
}
