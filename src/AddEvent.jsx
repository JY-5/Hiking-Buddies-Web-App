import { useState } from "react";
import {addEvent} from './services';
import { useHistory } from "react-router-dom";

const AddEvent = (props) => {
    const[event, setActivity] = useState({title: '', id: '', organizer: '', 
        location: '', date: '', time: '', url: '', destiIntro: '', eventIntro: '',
        equipment: '', notes: '', participants: {}});
    const [status, setStatus] = useState('');
    const [isPending, setIsPending] = useState(false);
    let history = useHistory();

    const add = () => {
        event.organizer = props.username;
        event.participants[props.username] = props.username;
        addEvent(event)
        .then( (event) => {
            setStatus('');
            setIsPending(false);
            props.reload();
            history.push("/");
        })
        .catch( err => {
            setStatus(err.error);
            setIsPending(false);
        });
    }

    return (
        <div className='add-page'>
            <h1>Add a new event</h1>
            <label htmlFor="title">Title*: </label>
            <input type='text' id="title"
                onChange={e => setActivity({...event, title: e.target.value})} 
                value={event.title} required disabled={isPending}/>
            <label htmlFor="location">Location*: </label>
            <input type='text' id="location"
                onChange={e => setActivity({...event, location: e.target.value})} 
                value={event.location} required disabled={isPending}/>
            <label htmlFor="date">Date*: </label>
            <input type='date' id="date"
                onChange={e => setActivity({...event, date: e.target.value})} 
                value={event.date} required disabled={isPending}/>
            <label htmlFor="time">Time*: </label>
            <input type='time' id="time"
                onChange={e => setActivity({...event, time: e.target.value})} 
                value={event.time} required disabled={isPending}/>
            <label htmlFor="url">Image URL: </label>
            <input type='text' id="url"
                onChange={e => setActivity({...event, url: e.target.value})} 
                value={event.url} required disabled={isPending}/>
            <label htmlFor="desti">About the destination: </label>
            <textarea type='text' id="desti" className="desti-intro"
                onChange={e => setActivity({...event, destiIntro: e.target.value})} 
                value={event.destiIntro} disabled={isPending}/>
            <label htmlFor="intro">About the event: </label>
            <textarea  id="intro" className="event-intro"
                onChange={e => setActivity({...event, eventIntro: e.target.value})} 
                value={event.eventIntro} disabled={isPending}/>
            <label htmlFor="bring">What to Bring: </label>
            <textarea type='text' id="bring" className="equipment"
                onChange={e => setActivity({...event, equipment: e.target.value})} 
                value={event.equipment} required disabled={isPending}/>
            <label htmlFor="notes">Notes: </label>
            <textarea type='text' id="notes" className="notes"
                onChange={e => setActivity({...event, notes: e.target.value})} 
                value={event.notes} disabled={isPending}/>
            <button onClick={add} disabled={isPending}>{ isPending ? "..." : "Add"}</button>
            { status && <div className="status">{status}</div>}
        </div>
    );
};
export default AddEvent;