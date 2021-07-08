import React from "react";
import "../index.css";

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            {users.map(user => (
                <div className="user" key={user.id}>
                    <h3>{user.name}</h3>
                    {user.role ? <p>{user.role}</p> : <></>}
                    <p>{user.email}</p>

                </div>
            ))}
        </div>
    );
}

export default UserList;