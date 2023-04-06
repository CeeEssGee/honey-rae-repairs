import { useState, useEffect } from "react"
import "./Employees.css"
import { Employee } from "./Employee"

/*
This code defines a functional component called "EmployeeList" that exports a constant.

The component uses React's "useState" hook to define a state variable called "employees" and sets its initial value as an empty array. It also uses the "useEffect" hook to execute a function after the initial rendering of the component.

Within the useEffect function, a fetch statement is used to make a GET request to the server's API endpoint for retrieving staff users. When the response is returned from the server, it is converted to a JSON object and then passed to the "setEmployees" function to update the state variable "employees" with the array of employees returned from the API.

The second argument to the useEffect hook is an empty array which means the effect will only be executed once, when the component is first mounted.

The component then returns some JSX which iterates over the "employees" array using the map function and returns a component called "Employee" for each employee object in the array. The "key" attribute is used to give each employee a unique identifier.

Overall, this component fetches data from a local server's API endpoint, sets the data as the state variable "employees" using React's "useState" and "useEffect" hooks, and then maps through the array of employees and returns a component for each employee object in the array.
*/

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
                (employee) => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}