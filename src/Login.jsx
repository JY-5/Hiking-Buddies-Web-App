import { useState } from 'react';
import { createSession } from './services';
import { withRouter } from 'react-router';

const Login = (props) => {
    // We store the name-in-progress locally in this component state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const login = () => {
        setIsPending(true);
        createSession({ username, password })
        .then( (user) => {
            setStatus('');
            setIsPending(false);
            props.onLogin(user);
            props.history.goBack();
        })
        .catch( err => {
            setStatus(err.error);
            setIsPending(false);
        });
    };
    
    return (
        <div className="login-page">
            <div className='login-second'>
                <div className="login-input">
                    {props.prompt && <div>{props.prompt}</div>}
                    <label className="name-label" htmlFor="name">Username
                    </label>
                    <input className="name-input" id="name"
                            disabled={isPending} onChange={onChangeUsername} 
                            type="text" required/>
                    <label className="password-label" htmlFor="password">Password 
                    </label>
                    <input className="password-input" id="password"
                            disabled={isPending} onChange={onChangePassword} 
                            type="text" required/>
                    { status && <div className="status">{status}</div>}
                </div>
                <button onClick={login} disabled={isPending}>
                    { isPending ? "..." : "Login"}</button>
            </div>
        </div>
    );
};

export default withRouter(Login);