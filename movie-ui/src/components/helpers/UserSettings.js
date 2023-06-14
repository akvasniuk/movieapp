import React, {Component} from 'react'
import {movieApi} from "../../services/MovieApi";
import {handleLogError} from './Helpers'
import {Container, Form, Segment, Button, Divider, Grid} from 'semantic-ui-react'
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function myParams(UserSettings) {
    return props => <UserSettings navHook={useNavigate()} locationHook={useLocation()}/>
}

class UserSettings extends Component {
    static contextType = AuthContext

    state = {
        username: '',
        avatar: '',
        originalAvatar: '',
        imageLoading: false
    }

    async componentDidMount() {
        try {
            const Auth = this.context
            const user = Auth.getUser()
            const response = await movieApi.getUsers(user, user.data.preferred_username)
            const {username, avatar} = response.data

            this.setState({username, avatar, originalAvatar: avatar})
        } catch (error) {
            handleLogError(error)
        }
    }

    handleSuffle = () => {
        this.setState({imageLoading: true})
        const {username} = this.state
        const avatar = username + Math.floor(Math.random() * 1000) + 1
        this.setState({avatar})
    }

    handleCancel = () => {
        this.props.navHook("/home")
    }

    handleSave = async () => {
        const {avatar} = this.state

        try {
            const Auth = this.context
            const user = Auth.getUser()
            await movieApi.saveUserAvatar(user, this.state.username, {avatar})

            this.props.navHook("/home")
        } catch (error) {
            handleLogError(error)
        }
    }

    handleImageLoad = () => {
        this.setState({imageLoading: false})
    }


    render() {
        const {avatar, imageLoading} = this.state
        const avatarURL = "https://api.dicebear.com/6.x/avataaars/svg?seed=";

        const avatarImage = !avatar ? <></> : <img src={`${avatarURL}${avatar}`} onLoad={this.handleImageLoad} alt='user-avatar' />

        return (
            <Container>
                <Grid centered>
                    <Grid.Row>
                        <Segment style={{width: '330px'}}>
                            <Form>
                                <strong>Avatar</strong>
                                <div style={{height: 300}}>
                                    {avatarImage}
                                </div>
                                <Divider/>
                                <Button fluid onClick={this.handleSuffle} color='blue'
                                        disabled={imageLoading}>Shuffle</Button>
                                <Divider/>
                                <Button.Group fluid>
                                    <Button onClick={this.handleCancel}>Cancel</Button>
                                    <Button.Or/>
                                    <Button onClick={this.handleSave} positive>Save</Button>
                                </Button.Group>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default myParams(UserSettings)