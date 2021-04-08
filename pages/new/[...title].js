import Head from 'next/head'

export async function getServerSideProps(context) {
  const {title} = context.query
  return {props: {title}}

}

const ConfirmElection = ({title}) => {
  console.log(title)
  return (
    <div className="container">
      <Head>
        <title>Confirm the created election!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="My new title" />
      </Head>

      <main>
        <h1>{title}</h1>
      </main>

    </div>
  )
}
export default ConfirmElection
