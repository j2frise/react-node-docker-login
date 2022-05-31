import useAuth from "src/hooks/useAuth";
import styles from "./styles.module.scss";

function Signup() {
	const { signup, loading } = useAuth();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		signup({
			email: data.get("email"),
			password: data.get("password"),
			firstname: data.get("firstname"),
			lastname: data.get("lastname"),
		});
	};

	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.form__group}>
					<label htmlFor="lastname">Nom</label>
					<input name="lastname" type="text" />
				</div>
				<div className={styles.form__group}>
					<label htmlFor="firstname">Prenom</label>
					<input name="firstname" type="text" />
				</div>

				<div className={styles.form__group}>
					<label htmlFor="email">Email</label>
					<input name="email" type="email" />
				</div>

				<div className={styles.form__group}>
					<label htmlFor="password">Mot de passe</label>
					<input name="password" type="password" />
				</div>

				<button disabled={loading} type="submit">
					S'inscrire
				</button>
			</form>
		</section>
	);
}

export default Signup;
