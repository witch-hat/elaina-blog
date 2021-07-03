import { GetServerSideProps } from 'next';
import styled from 'styled-components';

interface ServerSideProps {}

interface Props extends ServerSideProps {}

export default function CategoryPage(props: Props) {
  return <div>Category Page</div>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  return {
    props: {}
  };
};
