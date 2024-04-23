import "bootstrap-icons/font/bootstrap-icons.css";

function Todo(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {props.todo.title}
          {
            props.todo.status ?
              <i class="bi bi-check2-circle text-success mx-2"></i> :
              <i class="bi bi-x-circle text-danger mx-2"></i>
          }
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.todo.descreption}</h6>
        <p>{new Date(props.todo.dueDate * 1000).toLocaleString()}</p>
        <i class="bi bi-trash"></i>
        <i class="bi bi-pencil-square mx-2"></i>
        <i class="bi bi-check-square mx-2"></i>
      </div>
    </div>
  )
}

export default Todo;