import { Link } from "react-router-dom";

const AllEvents = (props) => {
    return (
        <div>
            <h1>{props.header}</h1>
            {props.eventsState.isError && <div>Something went wrong ...{props.eventsState.isError}</div>}
            {props.eventsState.isLoading ? (
                <div>Loading...</div>
            ) : (
            <ul className='home-ul'>
                {props.eventsState.events ?
                Object.values(props.eventsState.events).map((event) => (
                        <li key={event.id}>
                            <Link to={`/event/${event.id}`}>
                                <img className='img-preview' 
                                    src={event.url} alt=''/>
                                <div>{event.title}</div>
                                <div>{event.date}</div>
                                <div>{event.time}</div>
                                <div>{event.location}</div>
                            </Link>
                        </li>
                ))
                : null
                }
            </ul>)}
        </div>
    );
}
export default AllEvents;