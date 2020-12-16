import { useEffect, useState } from "react";
import AllEvents from "./AllEvents";
import MyEvents from "./MyEvents";

const Home = (props) => {
    return (
        <div className='home'>
            <div>
                <AllEvents header="All events" eventsState={props.eventsState}/>
            </div>
            <div>
                <MyEvents 
                    header="I'm going" 
                    eventsId={props.userState.user ? props.userState.user.events : null} 
                    eventsState={props.eventsState}
                    error={props.userState.error} 
                    isLoading={props.userState.isLoading}/>
                <MyEvents 
                    header="I'm holding" 
                    eventsId={props.userState.user ? props.userState.user.host : null}
                    eventsState={props.eventsState}
                    error={props.userState.error} 
                    isLoading={props.userState.isLoading}/>
            </div>
        </div>
    );
  };

  export default Home;
  