import React, {Component} from 'react'
import {Navigate, NavLink} from 'react-router-dom'
import {Button, Form, Grid, Message, Modal, Segment} from 'semantic-ui-react'
import AuthContext from '../../context/AuthContext'
import {movieApi} from '../../services/MovieApi'
import {handleLogError, parseJwt} from '../helpers/Helpers'
import AddAvatar from "../helpers/AddAvatar";

class Signup extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    isLoggedIn: false,
    isError: false,
    errorMessage: '',
    modalIsOpen: false,
    verifyEmail: false,
    avatar: ""
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, name, email, avatar } = this.state
    if (!(username && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }

    const user = { username, password, name, email, avatar }
    movieApi.signup(user)
        .then(response => {
          const { accessToken } = response.data
          const data = parseJwt(accessToken)
          const user = { data, accessToken }

          const Auth = this.context
          Auth.userLogin(user)

          this.setState({
            username: '',
            password: '',
            isLoggedIn: true,
            isError: false,
            errorMessage: '',
            verifyEmail: true
          })
        })
        .catch(error => {
          console.log(error)
          handleLogError(error)
          if (error.response && error.response.data) {
            const errorData = error.response.data
            let errorMessage = 'Invalid fields'
            if (errorData.status === 409) {
              errorMessage = errorData.message
            } else if (errorData.status === 400) {
              errorMessage = errorData?.errors[0].defaultMessage
            }
            this.setState({
              isError: true,
              errorMessage
            })
          }else{
            this.setState({verifyEmail: true})
          }
        })
  }

  toggleModalDisplay = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  toggleSave = (avatar) => {
    this.setState({avatar})
    this.toggleModalDisplay()
 }

  render() {
    const { isLoggedIn, isError, errorMessage, modalIsOpen, verifyEmail } = this.state
    console.log(verifyEmail)
    if (isLoggedIn) {
      return <Navigate to='/' />
    } else {
      return (
          <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Input
                      fluid
                      autoFocus
                      name='username'
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      onChange={this.handleInputChange}
                  />
                  <Form.Input
                      fluid
                      name='password'
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={this.handleInputChange}
                  />
                  <Form.Input
                      fluid
                      name='name'
                      icon='address card'
                      iconPosition='left'
                      placeholder='Name'
                      onChange={this.handleInputChange}
                  />
                  <Form.Input
                      fluid
                      name='email'
                      icon='at'
                      iconPosition='left'
                      placeholder='Email'
                      onChange={this.handleInputChange}
                  />
                  <Button primary type="button" onClick={this.toggleModalDisplay} >Add Avatar</Button>
                  <div style={{height:"10px"}}></div>

                  <Modal
                      open={modalIsOpen}
                      onClose={() => this.toggleModalDisplay}
                  >
                    <Modal.Header>
                      Avatar Form
                      <Button type="button" onClick={() => this.setState({modalIsOpen: false})}
                      >Close</Button>
                    </Modal.Header>
                    <Modal.Content>
                      <AddAvatar save={this.toggleSave} close={this.toggleModalDisplay}/>
                    </Modal.Content>
                  </Modal>
                  <Button type="submit" color='purple' fluid size='large' onClick={this.handleSubmit}>Signup</Button>
                </Segment>
              </Form>
              <Message>{`Already have an account? `}
                <a href='/login' color='purple' as={NavLink} to="/login">Login</a>
              </Message>
              {isError && <Message negative>{errorMessage}</Message>}
              {verifyEmail && <Message success>Please verify your email and then login</Message>}
            </Grid.Column>
          </Grid>
      )
    }
  }
}

export default Signup