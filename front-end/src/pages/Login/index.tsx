import useAuth from "src/hooks/useAuth";

function Login() {

    const { login, loading } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        login({
            email: data.get('email'),
            password: data.get('password'),
        });
    }

    return (
      <section onSubmit={handleSubmit}>
          <form action="">
            <label htmlFor="email">
                Email
              <input name="email" type="email" />  
            </label>
            <label htmlFor="password">
                Mot de passe
              <input name="password" type="password" />  
            </label>
        </form>
      </section>
    )
  }
  
  export default Login