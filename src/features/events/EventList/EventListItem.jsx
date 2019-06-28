import React, { Component } from 'react'
import { Segment, Item, Button, Icon, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

 class EventListItem extends Component {
    render() {
      const {event} = this.props;
        return (
            <div style={{'margin':'10px 0px'}}>
                     <Segment.Group>
                        <Segment>
                          <Item.Group>
                            <Item>
                              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                              <Item.Content>
                                <Item.Header as="a">{event.title}</Item.Header>
                                <Item.Description>
                                 <a>{event.hostedBy}</a>
                                </Item.Description>
                              </Item.Content>
                            </Item>
                          </Item.Group>
                        </Segment>
                        <Segment>
                          <span>
                            <Icon name="clock" /> {event.date} |
                            <Icon name="marker" /> {event.venue}
                          </span>
                        </Segment>
                        <Segment secondary>
                          <List horizontal>
                          {event.attendees.map((attend) => (
                          <EventListAttendee key={attend.id} attendee={attend}/>
                          ))}
                          </List>
                        </Segment>
                        <Segment clearing>
                        <span>{event.description}</span>
                          <Button as="a" color="teal" floated="right" content="View" />
                        </Segment>
                      </Segment.Group>
                      
            </div>
        )
    }
}
export default EventListItem;
