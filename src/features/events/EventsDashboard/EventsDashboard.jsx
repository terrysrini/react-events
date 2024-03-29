import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
const eventsFromdashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];

class EventsDashboard extends Component {
    state = {
        events : eventsFromdashboard,
        isOpen : false,
        selectedEvent: null
    }
    handleClickForm=()=>{
        this.setState(({isOpen})=>({
            isOpen: !isOpen
        }));
    }
    handleSelectedEvent  = (event,evt)=>{
        evt.preventDefault();
        console.log(event)
        this.setState({
            selectedEvent:event,
            isOpen:true
        });

    }
    handleUpdateEvent = (updatedevent)=>{
        this.setState(({events})=>({
        events: events.map((event)=>{
        if(updatedevent.id === event.id ){
        return {...updatedevent}
        }
        else{
            return event;
        }
        }),
        isOpen:false,
        selectedEvent:null
        }
        ))
    
    }
    handleCreateEvent=(newEvent)=>{
        newEvent.id =cuid();
        newEvent.hostPhotoURL='/public/assets/user.png';
        this.setState(({events})=>({
            events: [...events,newEvent],
            isOpen : false
        }));

    }
    render() {
        const {events, isOpen,selectedEvent} = this.state;
        return(
            <div>
               <Grid>
                   <Grid.Column width={10}>
                   <EventList events={events}  selectEvent={this.handleSelectedEvent}/>
                   </Grid.Column>
                   <Grid.Column width={6}>
                   <Button onClick={this.handleClickForm.bind(this)} positive content="Create Event"/><br/><br/>
                   {isOpen && <EventForm updateEvent={this.handleUpdateEvent} key={selectedEvent ? selectedEvent.id : 0} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} cancelFormOpen={this.handleClickForm.bind(this)}/>}
                   </Grid.Column>
               </Grid> 
            </div>
        )
    }
}
export default EventsDashboard;