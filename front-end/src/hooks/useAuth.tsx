import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "src/models/user.type";
import * as authServices from "src/services/auth.service";

interface AuthContextType {
	user?: User;
	loading: boolean;
	error?: any;
	login: (params: authServices.LoginType) => void;
	signup: (params: authServices.SignUpType) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const [user, setUser] = useState<User>();
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
	// We are using `react-router` for this example,
	// but feel free to omit this or use the
	// router of your choice.
	const navigate = useNavigate();
	const location = useLocation();

	// If we change page, reset the error state.
	useEffect(() => {
		if (error) setError(null);
	}, [location.pathname]);

	// Check if there is a currently active session
	// when the provider is mounted for the first time.
	//
	// If there is an error, it means there is no session.
	//
	// Finally, just signal the component that the initial load
	// is over.
	useEffect(() => {
        if(!user) {
            authServices
			.getCurrentUser()
			.then((response) => {
				if ("error" in response) {
					setError(response.error);
					return;
				}
				setUser(response);
			})
			.catch((_error) => {})
			.finally(() => setLoadingInitial(false));
        }
		
	}, []);

	// Flags the component loading state and posts the login
	// data to the server.
	//
	// An error means that the email/password combination is
	// not valid.
	//
	// Finally, just signal the component that loading the
	// loading state is over.
	function login(params: authServices.LoginType) {
		setLoading(true);

		authServices
			.login(params)
			.then((response) => {
				if ("error" in response) {
					setError(response.error);
					return;
				}
				localStorage.setItem("token", response.token);
			})
			.then((_) => {
				authServices.getCurrentUser().then((response) => {
					if ("error" in response) {
						setError(response.error);
						return;
					}
					setUser(response);
					navigate("/");
				});
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function signup(params: authServices.SignUpType) {
		authServices.signup(params).then((response) => {
			if ("error" in response) {
				setError(response.error);
				return;
			}
			navigate("/login");
		});
	}

	// Call the logout endpoint and then remove the user
	// from the state.
	function logout() {
		localStorage.removeItem("token");
		setUser(undefined);
	}
	// Make the provider update only when it should.
	// We only want to force re-renders if the user,
	// loading or error states change.
	//
	// Whenever the `value` passed into a provider changes,
	// the whole tree under the provider re-renders, and
	// that can be very costly! Even in this case, where
	// you only get re-renders when logging in and out
	// we want to keep things very performant.
	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			login,
			signup,
			logout,
		}),
		[user, loading, error]
	);

	// We only want to render the underlying app after we
	// assert for the presence of a current user.
	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
	return useContext(AuthContext);
}
