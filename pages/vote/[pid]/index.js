import Head from 'next/head'
import {resolve} from 'url'
import {useRouter} from 'next/router'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {api} from '@services/api'

const handleError = (err) => {
  console.warn(err);
  return new Response(JSON.stringify({
    code: 400,
    message: 'Stupid network Error'
  }));
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  const {pid} = context.query
  console.log(pid)
  console.log(context)

  const detailsEndpoint = resolve(
    api.urlServer,
    api.routesServer.getElection.replace(
      new RegExp(":slug", "g"),
      pid
    )
  );
  console.log("Details endpoint", detailsEndpoint)
  const res = await (fetch(detailsEndpoint).catch(handleError));
  // console.log(res)
  if (res.ok) {
    const election = await res.json()
    console.log(election)
    // Pass data to the page via props
    return {props: {election, pid}}
  }
  else {
    return {props: {election: null, pid}};
  }

}

const Election = ({election, pid}) => {
  // this console log appears on the server side, not on the client side!
  console.log(pid)
  console.log(election)
  if (!election) {
    return (<Header title="Could not find this election" />)
  }
  else {
    return (
      <div className="container">
        <Head>
          <title>This is fetch on the server</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="My new title" />
        </Head>

        <main>
          <Header title={` Election pid ${pid}`} />
          <Header title={election.title} />
          {election.candidates.map((candidate, index) =>
            <p key={index} className="description">
              {candidate}
            </p>
          )}
        </main>

        <Footer />
      </div>
    )
  }
}
export default Election
