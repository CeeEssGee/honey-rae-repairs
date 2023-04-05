import { useState, useEffect } from "react"
import "./Employees.css"

export const EmployeeList = () => {
    // set up our state variable... will need to import useState from react
    const [employees, setEmployees] = useState([])

    // add our first useEffect which will observe with initial state is done and then go fetch permanent state and then update our component state... will need to import useEffect from react
    useEffect(
        () =>{
            // console.log("Intitial state of employees", employees) // view the initial state of employees

            // add fetch statement with query to get only staff users
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employeeArray) => { // a parameter to capture all of the data after the JSON processing is done

                    // now I can use the setter function (setEmployees) listed above - I want to update my employees, whose initial value is an empty array and I want to change it to the entire array of employees that I got from the API. That is the purpose of the setter fx
                    setEmployees(employeeArray) // call setEmployees and pass it the parameter of waht we want the new value to be, which is employeeArray
                })
        },
        [] // when this array is empty, we are observing initial component state
    )

    // write some JSX 
    // use curly braces when we iterate over the array using .map
    // when we are doing the same thing over and over, each one needs a unique key with this format:  key={`employee--${employee.id}`}
    return <article className="employees">
        {
            employees.map(
                (employee) => {
                    return <section className="employee" key={`employee--${employee.id}`}>
                        <div>Name: {employee.fullName}</div>
                        <div>Email: {employee.email}</div>
                    </section>
                }
            )
        }
    </article>
}