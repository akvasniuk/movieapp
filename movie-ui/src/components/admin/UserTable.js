import React, {useState} from 'react'
import {Button, Form, Input, Modal, Table} from 'semantic-ui-react'
import UserForm from "./UserForm";
import {connect} from "react-redux";
import {saveUsername} from "../../store/actions/userActions";

function UserTable({ users, userUsernameSearch, handleInputChange, handleDeleteUser, handleSearchUser,username, saveUsername }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (userName) => {
        setIsOpen(!isOpen)
        saveUsername(userName)
    }

  let userList
  if (users.length === 0) {
    userList = (
      <Table.Row key='no-user'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
      </Table.Row>
    )
  } else {
    userList = users.map(user => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              disabled={user.username === 'admin'}
              onClick={() => handleDeleteUser(user.username)}
            />
              <Button
                  circular
                  color='orange'
                  size='small'
                  icon='edit'
                  onClick={() => toggleModal(user.username)}
              />
              <Modal
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
              >
                  <Modal.Header>
                      User Form
                      <Button onClick={() => setIsOpen(false)}
                      >Close</Button>
                  </Modal.Header>
                  <Modal.Content>
                      <UserForm close={toggleModal} username={username}/>
                  </Modal.Content>
              </Modal>

          </Table.Cell>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Form onSubmit={handleSearchUser}>
        <Input
          action={{ icon: 'search' }}
          name='userUsernameSearch'
          placeholder='Search by Username'
          value={userUsernameSearch}
          onChange={handleInputChange}
        />
      </Form>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell width={3}>Username</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </>
  )
}

const mapStateToProps = (store) => {
    return {
        username: store.username
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsername: (username) => dispatch(saveUsername(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)