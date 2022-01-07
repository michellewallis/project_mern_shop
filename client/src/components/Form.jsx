import React,{ useState} from "react";

const Form = () => {
//estado

const [inputValue, setInputValue] = useState("")
const [error, setError] = useState(false);

// funcion para manejar el envio del formulario
  const handleSubmit = e => {
    e.preventDefault();

    //validar

    if(inputValue.trim() ===''){
      setError(true)
      return
    }

    // envio al componente padre (main)
  }



    return (
        <section className="d-flex  justify-content-center mb-5">
            <form className="d-flex col-md-6" onSubmit={handleSubmit}>
                <input
                    className="form-control me-sm-2 col-md-12"
                    type="text"
                    placeholder="buscar un producto"
                    // funcion que modifica el estado
                    onChange={e => setInputValue(e.target.value)}
                />
                <button className="btn btn-primary my-2 my-sm-0" type="submit">
                    buscar
                </button>
            </form>
            {error ? <p>debes introducir un producto</p> :  null}
        </section>
    );
};

export default Form;
