import React, {Component} from 'react'
import {Button, Container, Divider, Form, Grid, Segment} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";

class AddAvatar extends Component {
    static contextType = AuthContext

    state = {
        avatar: '',
        imageLoading: false
    }

    handleSuffle = () => {
        this.setState({imageLoading: true})
        const avatar = "user" + Math.floor(Math.random() * 1000) + 1
        this.setState({avatar})
    }

    handleImageLoad = () => {
        this.setState({imageLoading: false})
    }

    handleSave = () => {
        this.props.save(this.state.avatar)
    }


    render() {
        const {avatar, imageLoading} = this.state
        const avatarURL = "https://api.dicebear.com/6.x/avataaars/svg?seed=";

        const avatarImage =
            <img src={`${avatarURL}${avatar}`} onLoad={this.handleImageLoad} alt='user-avatar'/>

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
                                <Button type="button" fluid onClick={this.handleSuffle} color='blue'
                                        disabled={imageLoading}>Shuffle</Button>
                                <Divider/>
                                <Button.Group fluid>
                                    <Button type="button" onClick={this.props.close}>Cancel</Button>
                                    <Button.Or/>
                                    <Button type="button" onClick={this.handleSave} positive>Save</Button>
                                </Button.Group>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default AddAvatar