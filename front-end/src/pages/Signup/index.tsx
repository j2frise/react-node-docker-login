function Signup() {
  return (
    <section>
        <form action="">
            <label htmlFor="firstname">
                Firstname
              <input name="firstname" type="text" />  
            </label>
            <label htmlFor="lastname">
                Lastname
              <input name="lastname" type="text" />  
            </label>
            <label htmlFor="email">
                Email
              <input name="email" type="email" />  
            </label>
            <label htmlFor="password">
                Password
              <input name="password" type="password" />  
            </label>
        </form>
    </section>
  )
}

export default Signup