function Login() {
    return (
      <section>
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