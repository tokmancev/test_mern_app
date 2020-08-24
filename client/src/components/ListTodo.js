import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import sample from './sample.pdf';

//https://github.com/wojtekmaj/react-pdf#standard-browserify-and-others
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//<Document  file={sample} />

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
                                    {todo.text}
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