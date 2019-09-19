import React from "react";

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            {users.map(user => (
                <div className="user">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>

                </div>
            ))}
        </div>
    );
}

export default UserList;