import { Link, useLocation } from "react-router-dom";

const SearchResult = (props) => {
    const events = Object.values(props.eventsState.events);
    const results = [];
    for (let event of events) {
        if (event &&
            event.location &&
            (event.title.toLowerCase().indexOf(props.keyword.toLowerCase()) !== -1 ||
             event.location.toLowerCase().indexOf(props.keyword.toLowerCase()) !== -1)) {
            results.push(event);
        }
    }

    return (
        <div>
        <h1>There are {results.length} results about {props.keyword}</h1>
        {!props.eventsState && props.eventsState.error && 
            <div>Something went wrong ...{props.eventsState.error}</div>}

        {props.eventsState.isLoading ? (
            <div>Loading...</div>
        ) : (
        <ul>
            {results ?
            results.map((event) => (
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

export default SearchResult;