import React,{ useState} from "react";

const Form = ({ setProducto}) => {
//estado

const [inputValue, setInputValue] = useState("")
const [error, setError] = useState(false);

// funcion para manejar el envio del formulario
  const handleSubmit = e => {
    e.preventDefault();

    //validar entra aqui si solo es vacio

    if(inputValue.trim() ===''){
      setError(true)
      return
    }
    // regresa estado error al estado falso. sino es vacio no lo hace
    setError(false)
    // envio al componente padre (main)
    setProducto(inputValue);
    setInputValue("")
    

  }



    return (
        <section className="d-flex flex-column align-items-center mb-5">
            <form className="d-flex col-md-6" onSubmit={handleSubmit}>
                <input
                    className="form-control me-sm-2 col-md-12"
                    type="text"
                    placeholder="buscar un producto"
                    // funcion que modifica el estado
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <button className="btn btn-primary my-2 my-sm-0" type="submit">
                    buscar
                </button>
            </form>
            {error ? <p className="text-danger mt-4">debes introducir un producto</p> :  null}
        </section>
    );
};

export default Form;
