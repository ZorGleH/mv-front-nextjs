import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://randomuser.me/api/')
    const users = await res.json()

    // Pass data to the page via props
    return { props: { users } }
  }

const Home = ({ users }) => {
    // this console log appears on the server side, not on the client side!
    console.log(users)
    return (
      <div className="container">
        <Head>
          <title>This is fetch on the server</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Header title="Fetched from the server" />
          { users && users.results.map(( user, index) => 
          <p key={index} className="description">
            {`${user.name.first} ${user.name.last}` } 
          </p>
          ) }
        </main>

        <Footer />
      </div>
    )
}
export default Home
