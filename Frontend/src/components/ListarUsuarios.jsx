import { useState, useEffect} from 'react'
import axios from 'axios'

let myModal;

function ListarUsuarios() {

    const [useUsuarios,setUsuarios] = useState([]);

    const [values,setValues] = useState(
        {
            idusuario: "",
            nombres: "",
            direccion: "",
            telefono: "",
            correo: "",
            rol: ""
        }
    )
    //funcion para ver cada dato ingresado
    const valorImput=(event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        //console.log(values);
    };
    //funcion para no refrescar la pagina
    const noUpdatePage = async(event) => {
        event.preventDefault();
        //console.log(values);
        const response= await axios({
            method: 'POST',
            url: 'http://localhost:3000/usuario/registrar',
            data: values
        }) 

        if(response.status==200){
            alert(response.data.message); 
        }
        myModal.hide
        ();
        listarTodosUsuarios();
        };
        

const listarTodosUsuarios=async()=>{
    await axios.get('http://localhost:3000/usuario/listar')
    .then(response=>{
        setUsuarios(response.data);
        console.log(useUsuarios);
    })
}
const ActualizarUsuarios = async(id) => {
    try {
        let data = {

        }
    } catch (error) {
        
    }
}

const EliminarUsuarios = async(id)=>{
    try{
        await axios.delete(`http://localhost:3000/usuario/eliminar/${id}`)
        console.log("user deleted");
        listarTodosUsuarios();
    } catch(error){
        console.log(error);
    }

    
}
useEffect(() => {
    myModal = new bootstrap.Modal('#myModal', {
        keyboard: false
      })
    listarTodosUsuarios();
}, []);
  return (
    <div className='container'>

    <button type='button' className='btn btn-primary' onClick={()=>{
    myModal.show();        
    }
    }>Nuevo</button>
        <h3>ListarUsuarios</h3>
        <div className='row'>
          
        </div>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>Id Usuario</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Rol</th>
            </tr>
        </thead>
        <tbody>
            {useUsuarios.map(user => (
                <tr key={user.idusuario}>
                    <td>{user.idusuario}</td>
                    <td>{user.nombres}</td>
                    <td>{user.direccion}</td>
                    <td>{user.telefono}</td>
                    <td>{user.correo}</td>
                    <td>{user.rol}</td>
                    <td>
                    <button className='btn btn-danger' onClick={()=>{EliminarUsuarios(user.idusuario)
                    }}>Eliminar</button>
                    <button className='btn btn-primary' onClick={()=>{alert(user.idusuario)
                    }}>Actualizar</button>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Registro de Usuario</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={noUpdatePage}>
                <label>ID</label>
                <input type="number" name='idusuario' className='form-control'placeholder='Ingrese su ID' value={values.idusuario} onChange={valorImput}/>
                <label>Nombres</label>
                <input type="text" name='nombres' className='form-control'placeholder='Ingrese su Nombre' value={values.nombres} onChange={valorImput}/>
                <label>Dirección</label>
                <input type="text" name='direccion' className='form-control'placeholder='Ingrese su Dirección' value={values.direccion} onChange={valorImput}/>
                <label>Teléfono</label>
                <input type="text" name='telefono' className='form-control'placeholder='Ingrese su Teléfono' value={values.telefono} onChange={valorImput}/>
                <label>Correo</label>
                <input type="text" name='correo' className='form-control'placeholder='Ingrese su Correo' value={values.correo} onChange={valorImput}/>
                <label>Rol</label>
                <select name="rol" className='form-control'placeholder='Ingrese su Rol' onChange={valorImput} >
                    <option value="0" disabled='true' selected='true'>Seleccione un Valor</option>
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuario</option>
                </select>
                <div className="modal-footer">
        <button type='submit' className='btn btn-primary mt-4 bt-4'>Registrar</button>
        </div>
        </form>
        
      </div>
            
      

      
    </div>
  </div>
</div>
    </div>
    
  )
}

export default ListarUsuarios