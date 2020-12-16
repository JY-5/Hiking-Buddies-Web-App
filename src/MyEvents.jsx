import { Link, useLocation } from "react-router-dom";

const MyEvents = (props) => {
    return (
        <div className='my-events'> 
            <h1>{props.header}</h1>
            {props.eventsState.isError && 
                <div>Something went wrong ...{props.eventsState.isError}</div>}

            {props.eventsState.isLoading ? (
                <div>Loading...</div>
            ) : (
            <ul className='my-ul'>
                {props.eventsId ?
                Object.values(props.eventsId).map((eventId) => (
                        <li key={eventId}>
                            <Link to={`/event/${eventId}`}>
                                <img className='img-preview' 
                                    src={props.eventsState.events[eventId].url} alt=''/>
                                <div>{props.eventsState.events[eventId].title}</div>
                                <div>{props.eventsState.events[eventId].date}</div>
                                <div>{props.eventsState.events[eventId].time}</div>
                                <div>{props.eventsState.events[eventId].location}</div>
                            </Link>
                        </li>
                ))
                : null
                }
            </ul>)}
        </div>
    );
}

export default MyEvents