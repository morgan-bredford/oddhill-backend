import { useEffect, useState } from "react"
import Admin from "./components/Admin"
import './css/app.css'


function App() {
  const [queryParams, setQueryParams] = useState()
  const [results, setResults] = useState({})

  //Skickar en ny request till servern när sökparametrarna uppdateras
  useEffect ( () => {
    //Koll att parametrarna inte är undefined innan requesten skickas
    if(queryParams) sendQueryParams()
  },[queryParams])

  //Requesten skickas till servern
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
          //Sätter sökresultatet i useStaten så den kan visas
          setResults(jres.result)
      } catch (error) {
          console.log('error: ', error)
      }
  }

  //Tar emot sökparametrarna från formuläret och förbereder dem att skickas med requesten till servern
  const prepareQuery =  (e,path,table, column, search_value) => {
    e.preventDefault()
    //Sätter sökparametrarna i useStaten så de kan skickas med requesten
    setQueryParams({path, table, column, search_value})
  }

  return (
    <main className="app_main">
      {/* Vänstra fältet för sökningar och adminkommandon */}
      <section className="sidebar_container">
        <section className="search_container">
          {/* Från formulären skickas: hela formuläret, sökvägen till serverns rest api, tabellen för sökningen, kolumnen för sökningen, sökparameter som används i SQL */}
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
          {/* En component för adminkommandon */}
          <Admin />
        </section>
      </section>
      {/* Högra fältet där resultat av sökningarna visas */}
      <section className="display_results_container">
        <section className="results_container" >
          { results.length 
            ?
                // Loopar igenom sökresultatet och visar det på skärmen
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
