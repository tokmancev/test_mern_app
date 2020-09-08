import React from 'react';
//import {Document, pdfjs} from 'react-pdf';
//import sample from './sample.pdf';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
//<Document file={sample} onLoadError={(error) => alert('Error while loading document! ' + error.message)} onLoadSuccess={(pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')}/>;
export default ListTodo