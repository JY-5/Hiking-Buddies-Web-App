import { useEffect, useState } from "react";
import { signUp, cancelSignup } from "./services";
import { useParams, useHistory, useLocation } from "react-router-dom";

const Event = (props) => {
    const signupState = props.event && props.event.participants && props.username &&
                        props.event.participants[props.username] ? true : false;
    const [isSignedUp, setIsSignedUp] = useState(signupState);
    const [status, setStatus] = useState('');
    const [signupPending, setSignupPending] = useState(false);
    const [cancelPending, setCancelPending] = useState(false);

    let {id} = useParams();
    let history = useHistory();
    let location = useLocation();

    const handleSignUp = () => {
        setSignupPending(true);
        signUp(props.username, id)
        .then( () => {
            setSignupPending(false);
            setIsSignedUp(true);
            setStatus('You signed up successfully!');
            props.reload();
          }) 
        .catch((err) => {
            setStatus(err.error);
            setSignupPending(false);
        })
    }

    const handleCancel = () => {
        setCancelPending(true);
        cancelSignup(props.username, id)
        .then( () => {
            setStatus('');
            setCancelPending(false);
            setIsSignedUp(false);
            setStatus('You have canceled!');
            props.reload();
          }) 
        .catch((err) => {
            setStatus(err.error);
            setCancelPending(false);
        })
    }

    if(!props.event) {
        return null;
    }
    const participants = Object.values(props.event.participants);
    const participantsNumber = participants.length;

    return (
    <div className='event-page'>
        <div className='event-main'>
            <div>
                <h1>{props.event.title}</h1>
                <img className='img-preview' src={props.event.url} alt=''/>
                <div>
                    <h2>Date: </h2>
                    <p>{props.event.date}</p>
                </div>        
                <div>
                    <h2>Time: </h2>
                    <p>{props.event.time}</p>
                </div>
                <div>
                    <h2>Location: </h2>
                    <p>{props.event.location}</p>
                </div>
                <div>
                    <h2>Organizer: </h2>
                    <p>{props.event.organizer}</p>
                </div>
                <div>
                    <h2>About the destination: </h2>
                    <p>{props.event.destiIntro}</p>
                </div>        
                <div>
                    <h2>About the event: </h2>
                    <p>{props.event.eventIntro}</p>
                </div>        
                <div>
                    <h2>What to Bring: </h2>
                    <p>{props.event.equipment}</p>
                </div>        
                <div>
                    <h2>Notes: </h2>
                    <p>{props.event.notes}</p>
                </div>
            </div>
        </div>
        <div className="event-side">
            <div className='sign-up'>
                {isSignedUp ? 
                    <button onClick={handleCancel}>{ cancelPending ? "..." : "Cancel"}</button>
                    : <button onClick={handleSignUp}>{ signupPending ? "..." : "Sign Up"}</button>}
                { status && <div className="signupStatus">{status}</div>}
            </div>
            <div className='participants'>
                <div>Participants: {participantsNumber}</div>
                <ul>
                    {participants.map(username => (
                        <li key={username}>
                            {username}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    )
}
export default Event;
