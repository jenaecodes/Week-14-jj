import React from 'react'
import Link from 'next/link';
import Layout from '../components/layout';


import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../components/Header'
import Styles from '../styles/Home.module.css';
import Header2 from '../components/Header2'
import { getSortedList } from '../lib/data';
//import Layout from '../components/layout';

export async function getStaticProps(){
  const allData = await getSortedList();
  return{
    props: {
      allData
    },
    revalidate: 60 // seconds before Incremental Static Regeneration
  }
}

export default function Home({ allData }) {
  const AuthUser = useAuthUser()

  return (

    <Layout home>
    <Header2
    email={AuthUser.email} 
    signOut={AuthUser.signOut} />

      <h3>Hi Everyone! I'm Jennifer.</h3>
      <p>
        Welcome to My App! Sign-in to choose from the options above! Thank you :)
      </p>

    <h1>
    My Posts Below:
    </h1>
    <div className="list-group col-6">
      {allData.map(({ id, name }) => (
        <Link key={id} href={`/${id}`}>
          {/*<a className="list-group-item list-group-item-action"> {name} </a>*/}
          <a className="btn-group btn btn-primary"> {name} </a>

        </Link>
      ))}
    </div>
  </Layout>



);
}