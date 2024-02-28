import LogOn from './login/LogOn';
import SignUp from './signup/SignUp';

const Authentication = () => {
	return (
		<>
			<p>Please follow the Authentication Instructions</p>
			<LogOn />
			<SignUp />
		</>
	);
};

export default Authentication;
