import React, {Component} from 'react';
import axios from 'axios';

import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {

    state = {
        todos: [],
        selectedId: ""
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        axios.get('/api/todos')
            .then(res => {
                if(res.data){
                    this.setState({
                        todos: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    editReport = (id) => {
        this.setState({
            selectedId: id
        })
    }

    render() {
        let { todos } = this.state;

        return(
            <div>
                <h1>Reports</h1>
                <Input getTodos={this.getTodos} selectedId={this.state.selectedId}/>
                <ListTodo todos={todos} editReport={this.editReport} />
            </div>
        )
    }
}

export default Todo;