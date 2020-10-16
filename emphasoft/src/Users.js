import React from 'react'


const Users = ({ id, username, first_name, last_name }) => {
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
            </tr>
        </>
    )
}

export default Users