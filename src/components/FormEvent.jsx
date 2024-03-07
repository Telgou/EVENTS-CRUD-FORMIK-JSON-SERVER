import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { add } from "../services/eventServices";
import { useNavigate } from "react-router-dom";

function FormEvent() {

    const navigate = useNavigate()
    const f = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            nbTickets: 0,
            img: '',
            nbParticipants: 0,
            like:false 
        },
        onSubmit: async (values) => {
            console.log(values)
            await add(values)
            navigate('/events')
        }
    })
    return (<>
        <Form onSubmit={f.handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Title" value={f.values.name} onChange={f.handleChange} />
              
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="text" placeholder="Enter Description" name="description" value={f.values.description} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" name="price" value={f.values.price} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Control type="number" placeholder="Enter Number of Tickets" name="nbTickets" value={f.values.nbTickets} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="img" value={f.values.img} onChange={f.handleChange} />
            </Form.Group>
           
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </> );
}
export default FormEvent;