import { useEffect, useState } from "react"
import Admin from "./components/Admin"
import './css/app.css'


function App() {

  const [queryParams, setQueryParams] = useState()
  const [results, setResults] = useState({})

  useEffect ( () => {
    if(queryParams) sendQueryParams()
  },[queryParams])

  const sendQueryParams = async () => {
      try {
          const res = await fetch(`http://127.0.0.1:8080/database${queryParams.path}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(queryParams)
          })
          const jres = await res.json()
          setResults(jres.result)
          console.log(jres)
      } catch (error) {
          console.log('error: ', error)
      }
  }

  const prepareQuery =  (e,path,table, search, search_value) => {
    e.preventDefault()
    setQueryParams({path, table, search, search_value})
  }

  return (
    <main className="app_main">
      <section className="sidebar_container">
        <section className="search_container">
          <form className="search_form top_margin" onSubmit={(e) => prepareQuery(e,'/','books','id','> 0')}>
            <button  className="btn btn_big">
              List all books
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/','authors','id','> 0')}>
            <button  className="btn btn_big">
              List all authors
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/','genres','id','> 0')}>
            <button  className="btn btn_big">
              List all genres
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,`/author`,'','', e.target[0].value)}>
            <input type='text' />
            <button  className="btn">
              Find the authors of a book
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/book','','', e.target[0].value)}>
            <input type='text'/>
            <button  className="btn">
              Find the books from an author
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/genre','','',e.target[0].value)}>
            <input type='text'/>
            <button  className="btn">
              Find the genre of a book
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/','books','id',`= "${e.target[0].value}"`)}>
            <input type='text'/>
            <button  className="btn">
              Find book by id
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/','authors','id',`= "${e.target[0].value}"`)}>
            <input type='text'/>
            <button  className="btn">
              Find author by id
            </button>
          </form>
          <form className="search_form" onSubmit={(e) => prepareQuery(e,'/','genres','id',`= "${e.target[0].value}"`)}>
            <input type='text'/>
            <button  className="btn">
              Find genre by id
            </button>
          </form>
          <Admin />
        </section>
      </section>
      <section className="display_results_container">
        <section className="results_container" >
          { results.length 
            ?
                results.map(result =>
                  <span className="search_img" key={result.id}>
                    {result.id ? `${result.id}.  ` : null}
                    {result.title ? result.title : null}
                    {result.name ? result.name : null}
                  </span>       
                )
            : <span>Tyvärr, sökningen gav inget resultat</span>
            }
        </section>
      </section>
    </main>
  );
}

export default App
