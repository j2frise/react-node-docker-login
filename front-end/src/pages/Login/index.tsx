import useAuth from "src/hooks/useAuth";
import styles from "./styles.module.scss";

function Login() {
	const { login, loading } = useAuth();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		login({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.form__group}>
					<label htmlFor="email">Email</label>
					<input name="email" type="text" />
				</div>
				<div className={styles.form__group}>
					<label htmlFor="password">Mot de passe</label>
					<input name="password" type="text" />
				</div>
				<button disabled={loading} type="submit">
					Se connecter
				</button>
			</form>
		</section>
	);
}

export default Login;
