import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { remove } from "../services/eventServices"; // Import the remove function from eventServices
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Event(props) {
    const [event, setEvent] = useState(props.event);
    const src = event.nbTickets === 0 ? " images/sold_out.png" : `../images/${event.img}`;
    const msg = event.like ? "Dislike" : "Like";
    const navigate = useNavigate(); // Initialize useNavigate


    const handleLike = useCallback(() => {
        setEvent({ ...event, like: !event.like });
    }, [event.like]);

    const handleDelete = async () => {
        try {
            await remove(event.id); 
            //window.location.reload(); // Reload the page

            props.fetchEvents()
            if (props.onDelete) {
                props.onDelete(event.id);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleUpdate = () => {
        navigate(`/events/modify/${event.id}`);
    };

    return (
        <Card>
            <Card.Img variant="top" src={src} height={250} />
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                    Price: {event.price}
                </Card.Text>
                <Card.Text>
                    Number of tickets: {event.nbTickets}
                </Card.Text>
                <Card.Text>
                    Number of participants: {event.nbParticipants}
                </Card.Text>
                <Button variant="primary" onClick={handleLike}>{msg}</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button> 
                <Button variant="info" onClick={handleUpdate}>Update</Button>
                <Button variant="primary" onClick={() => props.Buy(event)} disabled={event.nbTickets === 0}>Book an event</Button>
            </Card.Body>
        </Card>
    );
}

export default Event;
