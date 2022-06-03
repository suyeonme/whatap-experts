import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { gql } from '@apollo/client';
import client from '../apollo-client';

export default function Home(props) {
  return (
    <div>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        books {
          title
        }
      }
    `,
  });

  return {
    props: {
      books: data.books,
    },
  };
}
