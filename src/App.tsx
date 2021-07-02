import React, {useState} from 'react';

type elementoFormulario = React.FormEvent<HTMLFormElement>;

interface InterfaceTarea{
  descripcion: String;
  estado: boolean;
}

function App(): JSX.Element {

  const [nuevaTarea, setNuevaTarea]  = useState<string>('');
  const [tareas, setTareas] = useState<InterfaceTarea[]>([]);


  const enviarDatos = (e: elementoFormulario): void =>{
    e.preventDefault();
    agregarTarea(nuevaTarea);
    setNuevaTarea('');
  }

  const agregarTarea = (descripcion: String): void =>{
   const nuevasTareas: InterfaceTarea[] = [...tareas, {descripcion, estado:false}];
   setTareas(nuevasTareas)
  }

  const cambiarEstadoTarea = (indiceTarea: number): void =>{
    const nuevasTareas: InterfaceTarea[] = [...tareas];
    nuevasTareas[indiceTarea].estado = !nuevasTareas[indiceTarea].estado;
    setTareas(nuevasTareas);
  }

  const eliminarTarea = (indiceTarea: number): void =>{
    const nuevasTareas: InterfaceTarea[] = [...tareas];
    nuevasTareas.splice(indiceTarea, 1);
    setTareas(nuevasTareas);
  }

  return (
   <div className="container p-4">
     <div className="row">
      <div className="col-md-6 offset-md-3">


      <div className="card mb-5">
       <div className="card-body">
       <form onSubmit={enviarDatos} className="form">
        <input type="text" onChange={e => setNuevaTarea(e.target.value)} value={nuevaTarea} className="form-control" autoFocus required/>
        <button className="btn btn-success form-control mt-2">Guardar</button>
      </form>
       </div>
     </div>

      {
        tareas.map((t: InterfaceTarea, i:number)=>{
          let color = t.estado ? 'text-success' : 'text-primary';

          return <div className="container">
            <div className="card">
              <div className="card-body">
               <h1 className={color} key={i} style={{textDecoration: t.estado ? 'line-through' : ''}}> {t.descripcion} </h1>
               <button className="btn btn-outline-success" onClick={()=> cambiarEstadoTarea(i)}>✍</button>
               <button className="btn btn-outline-danger" onClick={()=> eliminarTarea(i)}>🗑</button>
              </div>
            </div>
          </div>
        })
      }
      </div>
     </div>
   </div>
  );
}

export default App;
