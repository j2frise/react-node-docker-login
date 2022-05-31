import useAuth from "src/hooks/useAuth"

function Signup() {

    const { signup, loading } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        signup({
            email: data.get('email'),
            password: data.get('password'),
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
        });
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
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
                <button disabled={loading} type="submit">S'inscrire</button>
            </form>
        </section>
    )
}

export default Signup