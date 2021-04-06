import Head from 'next/head'
import {resolve} from 'url'
import {useRouter} from 'next/router'
import Header from '@components/Header'
import Footer from '@components/Footer'

const context = {
  //  urlServer: process.env.REACT_APP_SERVER_URL,
  //  feedbackForm: process.env.REACT_APP_FEEDBACK_FORM,
  urlServer: "https://demo.mieuxvoter.fr",
  routesServer: {
    setElection: "election/",
    getElection: "election/get/:slug/",
    getResultsElection: "election/results/:slug",
    voteElection: "election/vote/"
  }
};


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
  const getElection = "election/results/:slug"
  const urlServer = "https://demo.mieuxvoter.fr/api/"

  const detailsEndpoint = resolve(
    // context.urlServer,
    urlServer,
    // context.routesServer.getElection.replace(
    getElection.replace(
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
  return (
    <div className="container">
      <Head>
        <title>This is fetch on the server</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="My new title" />
      </Head>

      <main>
        <Header title={` Election pid ${pid}`} />
        <Header title="Fetched from the server" />
        {election && election.map((candidate, index) =>
          <p key={index} className="description">
            {candidate.name}
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}
export default Election
