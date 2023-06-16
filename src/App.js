import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";


export default function App() {
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    function handleAddEmployee(employee) {
        setEmployees([...employees, employee]);
    }

    function handleUpdateEmployee(employee) {
        handleDeleteEmployee(employee.id);

        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmail(employee.email);

        setShow(true);
    }

    function handleDeleteEmployee(id) {
        setEmployees(employees.filter(employee => employee.id !== id));
    }

    return (
        <div className="container">
            <h1 className="text-center">Employee Directory</h1>
            {show ? <Form onAddEmployee={handleAddEmployee} onShow={setShow} firstName={firstName} lastName={lastName}
                          email={email} onSetFirstName={setFirstName} onSetLastName={setLastName}
                          onSetEmail={setEmail}/> :
                (
                    <>
                        <Button onClick={() => setShow(show => !show)} property={"btn-primary"}>Add Employee</Button>
                        <Table employees={employees} onDeleteEmployee={handleDeleteEmployee}
                               onUpdateEmployee={handleUpdateEmployee}/>
                    </>
                )
            }
        </div>
    );
}

function Button({children, onClick, property}) {
    return <button className={`btn ${property}`} onClick={onClick}>{children}</button>
}

function Table({employees, onDeleteEmployee, onUpdateEmployee}) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            {employees.map(employee => <Employee employee={employee} key={employee.id}
                                                 onDeleteEmployee={onDeleteEmployee}
                                                 onUpdateEmployee={onUpdateEmployee}/>)}
            </tbody>
        </table>
    );
}

function Employee({employee, onUpdateEmployee, onDeleteEmployee}) {
    return (
        <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>
                <Button property={"btn-primary"} onClick={() => onUpdateEmployee(employee)}>Update</Button>
                <span> </span>
                <Button property={"btn-danger"} onClick={() => onDeleteEmployee(employee.id)}>Delete</Button>
            </td>
        </tr>
    );
}

function Form({onAddEmployee, onShow, firstName, lastName, email, onSetFirstName, onSetLastName, onSetEmail}) {


    function handleSave(e) {
        e.preventDefault();

        // safe guard
        if(!firstName || !lastName || !email) return;

        const newEmployee = {
            id: Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email
        }

        onSetEmail("");
        onSetLastName("");
        onSetFirstName("");

        onAddEmployee(newEmployee);
        onShow(false);

    }

    return (
        <form onSubmit={handleSave}>
            <label>First Name</label>
            <input type="text" className="form-control" value={firstName}
                   onChange={e => onSetFirstName(e.target.value)}/>

            <label>Last Name</label>
            <input type="text" className="form-control" value={lastName} onChange={e => onSetLastName(e.target.value)}/>

            <label>Email Name</label>
            <input type="email" className="form-control" value={email} onChange={e => onSetEmail(e.target.value)}/>

            <Button property="btn-primary">Save</Button>
        </form>
    );
}

