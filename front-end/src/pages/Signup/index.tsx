function Signup() {
  return (
    <section>
        <form action="">
            <label htmlFor="lastname">
                Nom
              <input name="lastname" type="text" />  
            </label>
            <label htmlFor="firstname">
                Prenom
              <input name="firstname" type="text" />  
            </label>
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

export default Signup