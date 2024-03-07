import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../services/eventServices";

export default function UpdateEvent() {
  const navigate = useNavigate();
  const param = useParams();
  const [event, setEvent] = useState({
    id: param.id,
    name: "",
    price: 0,
    img: "",
    nbTickets: 0,
    nbParticipants: 0,
    description: "",
  });
  const { name, price, nbTickets, nbParticipants, description } = event;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEventFunction();
  }, []);

  const getEventFunction = async () => {
    const response = await getEvent(param.id);
    setEvent(response.data);
  };

  const onValueChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onFileHandle = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.files[0].name });
  };

  const updateEventFunction = async () => {
    setIsLoading(true);
    const res = await updateEvent(param.id, event);
    if (res.status === 200) {
      setIsLoading(false);
      navigate("/events");
    }
  };

  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <h2>Modify "{name}" Event</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => onValueChange(e)}
              name="name"
              value={name}
              type="text"
              placeholder="Enter a Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description "
              onChange={(e) => onValueChange(e)}
              name="description"
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => onValueChange(e)}
              name="price"
              value={price}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => onValueChange(e)}
              name="nbTickets"
              value={nbTickets}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Participants</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => onValueChange(e)}
              name="nbParticipants"
              value={nbParticipants}
            />
          </Form.Group>
          <Form.Group className="mb-3" style={{ display: 'none' }}>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => onFileHandle(e)}
              name="img"
            />
          </Form.Group>
          <Button variant="primary" onClick={() => updateEventFunction()}>
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <> Update the event</>
            )}
          </Button>
          <Button onClick={() => navigate("/events")} variant="secondary">
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
}
