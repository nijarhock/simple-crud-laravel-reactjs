import axios from 'axios';

export const getList = () => {
    console.log(axios.get('http://localhost:8000/api/student'))
    axios.get('http://localhost:8000/api/student')
        .then(res => {
            return res.data;
        })
}

export function addItem(val) {
    axios.post('http://localhost:8000/api/student', { val })
        .then(res => {
            return res.data;
        })
}

export function deleteItem(val) {
    axios.delete('http://localhost:8000/api/student/'+{ val })
        .then(res => {
            return res.data;
        })
}

export function updateItem(val, id) {
    axios.put('http://localhost:8000/api/student/'+{ id }, { val })
        .then(res => {
            return res.data;
        })
}