import React, {useContext, useState} from 'react'
import {Button, Form, Icon, Input, Modal} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";
import {movieApi} from "../../services/MovieApi";
import {handleLogError} from "../helpers/Helpers";

function GenreForm() {
    const [modalIsOpen, setModal] = useState(false);
    const [form, setForm] = useState({});

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();


    const toggleModalDisplay = () => {
        setModal(!modalIsOpen);
    }

    const handleSubmit = () => {
        movieApi.saveGenre(user, {...form})
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setModal(false);
                window.location.reload()
            })
    }

    const handleChange = ({target}) => {
        setForm({...form, [target.name]: target.value})
    }

    return (
        <div>
            <Modal
                open={modalIsOpen}
                onClose={() => toggleModalDisplay}
            >
                <Modal.Header>
                    Genre Form
                    <Button onClick={() => setModal(false)}
                    >Close</Button>
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            required
                            control={Input}
                            label='Genre name'
                            placeholder='Provide genre name'
                            onChange={handleChange}
                            name="name"
                        />
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>

            <Button type={"button"} icon labelPosition='right' onClick={toggleModalDisplay}>
                Create Genre<Icon name='add'/>
            </Button>
        </div>

    )
}

export default GenreForm