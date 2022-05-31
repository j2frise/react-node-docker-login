import { ReactNode, FC } from "react"
import { Link, Outlet } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import styles from "./styles.module.scss";

interface BaseLayoutProps {
    children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {

    const { user, logout } = useAuth();

  return (
    <div className={styles.layout_base}>
        <header>
            <h1>Mon super site</h1>
            <nav className={styles.nav}>
                <ul className={styles.nav__list}>
                    {
                        !user ? (
                            <>
                            <li><Link to="/login">Me connecter</Link></li>
                            <li><Link to="/signup">M'inscrire</Link></li>
                            </>
                        ) : <li><button onClick={logout}>Se déconnecter</button></li>
                    }
                </ul>
            </nav>
        </header>
        <main>{ children || <Outlet/> }</main>
        <footer>Mon footer</footer>
    </div>
  )
}

export default BaseLayout