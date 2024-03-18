listarUsuarios();
var modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'), {
    keyboard: false
  })


function limpiarFormulario() {
    document.getElementById('idusuario').value = '';
    document.getElementById('nombres').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('password').value = '';
}

function registrarUsuario(){
    
    var data = 
    {
        idusuario: document.getElementById('idusuario').value,
        nombres: document.getElementById('nombres').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        rol: document.getElementById('rol').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:3000/usuario/registrar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(data=>{
        modalUsuario.hide();
        if(data.status == 200){
            listarUsuarios();
            message("success", "top-center", `${data.message}`, 1500);
        }
        if(data.status == 403){
            listarUsuarios();
            message("warning", "top-center", `${data.message}`, 1500);
        }
        if(data.status == 500){
            listarUsuarios();
            message("warning", "top-center", `${data.message}`, 2000);
        }
    })
}

function actualizarUsuario(){
    
    var data = 
    {
        nombres: document.getElementById('idusuario').value,
        nombres: document.getElementById('nombres').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        rol: document.getElementById('rol').value,
        password: document.getElementById('password').value
    };
fetch(`http://localhost:3000/usuario/actualizar/${document.getElementById('idusuario').value}`,
{
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(result => result.json())
.then(data=>{
    listarUsuarios();
    if(data.status == 200){
        listarUsuarios();
        message("success", "top-center", `${data.message}`, 1500);
        modalUsuario.hide();
    }
    if(data.status == 403){
        listarUsuarios();
        message("warning", "top-center", `${data.message}`, 1500);
    }
    if(data.status == 500){
        listarUsuarios();
        message("warning", "top-center", `${data.message}`, 2000);
    }
})
}
function buscarUsuario(idusuario) {
    fetch(`http://localhost:3000/usuario/consultar/${idusuario}`,
    {
        method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {

                document.getElementById('nombres').value = element.nombres;
                document.getElementById('direccion').value = element.direccion;
                document.getElementById('telefono').value = element.telefono;
                document.getElementById('correo').value = element.correo;
                document.getElementById('rol').value = element.rol;
                document.getElementById('password').value = element.password;
                document.getElementById('idusuario').value = element.idusuario;
            });
        })
        modalUsuario.show();
    }

function listarUsuarios(){

    fetch('http://localhost:3000/usuario/listar')

    .then(response => response.json())
    .then(data => {
        let filas = '';
        data.forEach(element => {
            filas += `<tr>`;
            filas += `<td>${element.idusuario}</td>`;
            filas += `<td>${element.nombres}</td>`;
            filas += `<td>${element.direccion}</td>`;
            filas += `<td>${element.telefono}</td>`;
            filas += `<td>${element.correo}</td>`;
            filas += `<td>
                        <a class="btn btn-danger" href="javascript:eliminarUsuario(${element.idusuario})">Eliminar</a>
                    </td>`;
                    filas += `<td>
                    <a class="btn btn-primary" href="javascript:buscarUsuario(${element.idusuario})">Actualizar</a>
                </td>`;
            filas += `</tr>`;
        })
        document.getElementById('table-usuarios').innerHTML = filas;
    }
    );
}
function message(icon, position, title, timer){
    Swal.fire({
        title: title,
        icon: icon,
        position: position,
        showConfirmButton: false,
        timer: timer
    })
}

    function eliminarUsuario(idusuario) {
        fetch(`http://localhost:3000/usuario/eliminar/${idusuario}`,
        {
            method: 'DELETE', 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status==200){
               message("success", "top-center", `${data.message}`, 1500);
               listarUsuarios(); 
            }
            if (data.status==403){
                message("warning", "top-center", `${data.message}`, 1500);
                listarUsuarios(); 
             }
             if (data.status==500){
                message("error", "top-center", `${data.message}`, 2000);
                listarUsuarios(); 
             }
        });
    }
    function nuevoUsuario(){
        limpiarFormulario();
        document.getElementById('btnActualizar').style.display="none";
        document.getElementById('btnRegistrar').style.display="block";
        modalUsuario.show();
    }