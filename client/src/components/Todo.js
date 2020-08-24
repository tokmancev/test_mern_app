import React, {Component} from 'react';
import axios from 'axios';

import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {

    state = {
        todos: []
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        axios.get('/api/todos')
            .then(res => {
                if(res.data){
                    this.setState({
                        todos: res.data.map(
                            async el => {
                                const text = await this.getText("recomendation.txt");
                                Object.assign({}, el, {text: "Hi!"});
                            })
                    })
                }
            })
            .catch(err => console.log(err))
    }

    deleteTodo = (id) => {
        axios.delete(`/api/todos/${id}`)
            .then(res => {
                if(res.data){
                    this.getTodos()
                }
            })
            .catch(err => console.log(err))
    }

    getText = async (source, dest) =>
    {
        const file = new File(source);
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)
            alert(text)

            dest = text;
        };
        reader.readAsText(file);
    }

    render() {
        let { todos } = this.state;

        return(
            <div>
                <h1>Reports</h1>
                <Input getTodos={this.getTodos}/>
                <ListTodo todos={todos} editReport={this.deleteTodo} />
            </div>
        )
    }
}

export default Todo;