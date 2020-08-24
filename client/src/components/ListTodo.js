import React from 'react';

const ListTodo = ({ todos, editReport}) => {
    return (
        <ul>
            {
                todos &&
                todos.length > 0 ?
                    (
                        todos.map(todo => {
                            return (
                                <li key={todo._id} onClick={() => editReport(todo._id)}>
                                    <h2> {todo.studentId} </h2>
                                    <small> {todo.recommendation} </small>
                                </li>
                            )
                        })
                    )
                    :
                    (
                        <li>No todo(s) left</li>
                    )
            }
        </ul>
    )
}

export default ListTodo