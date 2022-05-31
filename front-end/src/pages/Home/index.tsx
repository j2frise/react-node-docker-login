import useAuth from "src/hooks/useAuth";

function Home() {
    const { user } = useAuth();

  return (
    <section>
        <h1>Bonjour { user.firstname } !</h1>
    </section>
  )
}

export default Home