import React, { Component } from 'react';
import axios from 'axios';
//import { getList, addItem, deleteItem, updateItem } from './ListFunctions'

class List extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            nama: '',
            editDisabled: false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.getAll()
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getAll = () => {
        axios.get('http://localhost:8000/api/student')
        .then(res => {
            console.log(res.data)
            this.setState({
                nama: '',
                items: [...res.data]
            },
            () => {
                console.log(this.state.items);
            })
        })
        //console.log(getList());
        // getList().then(data => {
        //     console.log(data)
        //     this.setState({
        //         nama: '',
        //         items: [...data]
        //     },
        //     () => {
        //         console.log(this.state.items);
        //     })
        // })
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/student', { nama : this.state.nama } )
            .then(res => {
                console.log(res)
                this.getAll()
            })
        this.setState({
            nama: ''
        })
        // addItem(this.state.name).then(() => {
        //     this.getAll()
        // })
    }

    onUpdate = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/student/'+this.state.id, {nama : this.state.nama})
            .then(res => {
                this.getAll()
            })
        
        this.setState({
            nama: '',
            editDisabled: ''
        })
        this.getAll()
        // updateItem(this.state.nama, this.state.id).then(() => {
        //     this.getAll()
        // })
    }

    onEdit = (itemid, e) => {
        e.preventDefault()
        console.log(itemid)
        var data = [...this.state.items]
        data.forEach((item, index) => {
            if(item.id === itemid) {
                this.setState({
                    id: item.id,
                    nama: item.nama,
                    editDisabled: true
                })
            }
        })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        //deleteItem(val)
        console.log(val)
        axios.delete('http://localhost:8000/api/student/'+ val )
        .then(res => {
            this.getAll()
        })
    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="nama">Nama</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="form-control" id="nama" name="nama" value={this.state.nama || ''} onChange={this.onChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    {!this.state.editDisabled ? (
                        <button type="submit" className="btn btn-success btn-block" onClick={this.onSubmit.bind(this)}>Submit</button>
                    ) : (
                        <button type="submit" className="btn btn-success btn-block" onClick={this.onUpdate.bind(this)}>Update</button>
                    )}
                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item.nama}</td>
                                <td className="text-right">
                                    <button href="" className="btn btn-info mr-1" disabled={this.state.editDisabled} onClick={this.onEdit.bind(this, item.id)}>Edit</button>
                                    <button href="" className="btn btn-danger mr-1" disabled={this.state.editDisabled} onClick={this.onDelete.bind(this, item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List