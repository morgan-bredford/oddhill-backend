import { useState, useEffect } from 'react'

function Admin() {

    const [adminParams, setAdminParams] = useState()

    useEffect ( () => {
        if(adminParams) sendQueryParams()
      },[adminParams])

      const sendQueryParams = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8080/admin${adminParams.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminParams)
            })
            const jres = await res.json()
        
            console.log(jres)
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const prepareAdminQuery =  (e,path,table, no_of_values) => {console.log(no_of_values)
        e.preventDefault()
        let columns = []
        let values = []

    for (let i = 0; i < no_of_values; i++) {
        columns[i] = e.target[i].name
        values[i] = e.target[i].value
    }
        console.log(values)
        setAdminParams({
            path, 
            table,
            columns,
            values,
            id: e.target[0].value,
            password: e.target[no_of_values].value
        })
    }

    return (
        <>
        <form className="register_form" onSubmit={(e) => prepareAdminQuery(e,'/add','books',3)}>
            <h3>Add a book</h3>
            <input type='text' name='title'/>&nbsp;title<br />
            <input type='text' name='isbn'/>&nbsp;isbn<br />
            <textarea name='description'></textarea>&nbsp;description<br />
            <input type='text'/>&nbsp;password(admin)<br />
            <button className="btn">
                Add a book
            </button>
        </form>
        <form className="register_form" onSubmit={(e) => prepareAdminQuery(e,'/add','authors',2)}>
            <h3>Add an author</h3>
            <input type='text' name='name'/>&nbsp;name<br />
            <textarea name='biography'></textarea>&nbsp;biography<br />
            <input type='text'/>&nbsp;password(admin)<br />
            <button className="btn">
                Add an author
            </button>
        </form>
        <form className="register_form" onSubmit={(e) => prepareAdminQuery(e,'/delete','books',1)}>
            <h3>Delete a book by id</h3>
            id:<input type='text' name='id' className='input_id'/>
            &nbsp;&nbsp;password:<input type='text'/>
            <button className="btn">
                Delete
            </button>
        </form>
        <form className="register_form" onSubmit={(e) => prepareAdminQuery(e,'/delete','authors',1)}>
            <h3>Delete an author by id</h3>
            id:<input type='text' name='id' className='input_id'/>
            &nbsp;&nbsp;password:<input type='text'/>
            <button className="btn">
                Delete
            </button>
        </form>
        </>
    )
}

export default Admin