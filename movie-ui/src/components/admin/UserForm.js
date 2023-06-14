import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Input} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";
import {movieApi} from "../../services/MovieApi";
import {useNavigate} from "react-router-dom";

function UserForm({close, username}) {
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        role: "",
        avatar: "",
        enabled: false
    });

    const [roles, setRoles] = useState([])
    const [userObj, setUser] = useState({})
    const navigation = useNavigate();

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();

    useEffect(() => {
        const getUser = async () => {
            try {
                const {data: userApi} = await movieApi.getUsers(user, username);
                setForm({...form, ...userApi})
                setUser(userApi)
                const {data: rolesApi} = await movieApi.getRoles(user);
                setRoles(rolesApi)
            } catch (e) {
                console.log(e);
            }
        }

        getUser()
    }, [])

    const handleSubmit = async () => {
        try {
            await movieApi.updateUser(user, username, {...form})
        } catch (e) {
            console.log(e);
        }
        close()
        navigation("/home")
    }

    const handleChange = ({target}) => {
        if (target.name === "enabled") {
            setForm({...form, [target.name]: target.value === "true"})
            return
        }

        setForm({...form, [target.name]: target.value})
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Form.Group widths='equal'>
                    <Form.Input
                        control={Input}
                        label='Username'
                        placeholder='Provide username'
                        onChange={handleChange}
                        name="username"
                        value={form.username}
                    />


                    <Form.Input
                        control={Input}
                        label='Name'
                        placeholder='Provide namee'
                        onChange={handleChange}
                        name="name"
                        value={form.name}
                    />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input
                        control={Input}
                        label='Avatar'
                        placeholder='Provide avatar'
                        onChange={handleChange}
                        name="avatar"
                        value={form.avatar}
                    />
                    <Form.Input
                        control={Input}
                        label='Email'
                        placeholder='Provide email'
                        onChange={handleChange}
                        name="email"
                        value={form.email}
                    />
                </Form.Group>
                <Form.Group grouped>
                    <label>Is enabled</label>
                    <Form.Field
                        label='True'
                        control='input'
                        type='radio'
                        name='enabled'
                        onChange={handleChange}
                        checked={form.enabled}
                        value={true}
                    />
                    <Form.Field
                        label='False'
                        control='input'
                        type='radio'
                        name='enabled'
                        onChange={handleChange}
                        checked={!form.enabled}
                        value={false}
                    />
                </Form.Group>

                <Form.Group inline>
                    <label>Roles</label>
                    {roles.length > 0 &&
                        roles.map(role =>
                            <Form.Field
                                label={role}
                                control='input'
                                type='radio'
                                name='role'
                                onChange={handleChange}
                                checked={form.role === role}
                                value={role}
                            />
                        )
                    }
                </Form.Group>

                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>

    )
}

export default UserForm