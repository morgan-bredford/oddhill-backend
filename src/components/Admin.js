import { useState, useEffect } from 'react'

function Admin() {
    const [adminParams, setAdminParams] = useState()

    //Skickar ett nytt adminkommando till servern när parametrarna uppdateras
    useEffect ( () => {
        //Koll att parametrarna inte är undefined innan kommandot skickas
        if(adminParams) sendAdminCommandParams()
      },[adminParams])

      //Kommandot skickas till servern
      const sendAdminCommandParams = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8080/admin${adminParams.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminParams)
            })
            const jres = await res.json()
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const prepareAdminCommand =  (e,path,table, no_of_values) => {
        e.preventDefault()
        //Array för vilka kolumner kommandot berör
        let columns = []
        //Array för vilka values som ska in i kolumnerna
        let values = []

    //Loopar igenom formuläret och sätter in värdena i kolumn- och values-arrays
    for (let i = 0; i < no_of_values; i++) {
        columns[i] = e.target[i].name
        values[i] = e.target[i].value
    }
        //Sätter parametrarna i useStaten så de kan skickas med i adminkommandot till servern
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
            {/* Från formuläret skickas: hela formuläret, sökvägen till serverns rest api, vilken tabell kommandot ska utföras på, hur många värden som skickas med */}
            <form className="register_form" onSubmit={(e) => prepareAdminCommand(e,'/add','books',3)}>
                <h3>Add a book</h3>
                <input type='text' name='title'/>&nbsp;title<br />
                <input type='text' name='isbn'/>&nbsp;isbn<br />
                <textarea name='description'></textarea>&nbsp;description<br />
                <input type='text'/>&nbsp;password<span className='uppercase_off'>(admin)</span><br />
                <button className="btn">
                    Add a book
                </button>
            </form>
            <form className="register_form" onSubmit={(e) => prepareAdminCommand(e,'/add','authors',2)}>
                <h3>Add an author</h3>
                <input type='text' name='name'/>&nbsp;name<br />
                <textarea name='biography'></textarea>&nbsp;biography<br />
                <input type='text'/>&nbsp;password<span className='uppercase_off'>(admin)</span><br />
                <button className="btn">
                    Add an author
                </button>
            </form>
            <form className="register_form" onSubmit={(e) => prepareAdminCommand(e,'/delete','books',1)}>
                <h3>Delete a book by id</h3>
                id:<input type='text' name='id' className='input_id'/>
                &nbsp;&nbsp;password:<input type='text'/>
                <button className="btn">
                    Delete
                </button>
            </form>
            <form className="register_form" onSubmit={(e) => prepareAdminCommand(e,'/delete','authors',1)}>
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