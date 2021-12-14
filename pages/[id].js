import Head from 'next/head';
import Link from 'next/link';
import { getAllIds, getData } from '../lib/data';
import Layout from '../components/layout';
import Header2 from '../components/Header2';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'


// make an instance of getStaticProps to return data for one person
export async function getStaticProps ({params}){

  const itemData = await getData(params.id);
  //retrieve AKA info
//  const akaData = await getAKA(itemData.aka);


  return{
    props: {
      itemData
    },
    revalidate: 60 // seconds before Incremental Static Regeneration
  };
}

// make an instance of getStaticPaths function to get all possible URLs, async

//note the paths variable MUST USE THAT NAME otherwise it won't work
export async function getStaticPaths(){
  const paths = await getAllIds();

  return{
    paths,
    fallback: false
  };
}

// make react component to display details about a person when dynamic route matches
//receives the entire value of itemData (a JSON object from array)
export default function Entry({itemData}){
  const AuthUser = useAuthUser()
  return (
    <Layout>
    <Header2
    email={AuthUser.email} 
    signOut={AuthUser.signOut} />
    <article className="card col-6">
      <div className="card-body">
        <h5 className="card-title">{itemData.post_title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Created: {itemData.post_date}</h6>
        <h6 className="card-subtitle mb-2">By: {itemData.user_login}</h6>

        <p className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />

        



      </div>
    </article>
    </Layout>
  );
}