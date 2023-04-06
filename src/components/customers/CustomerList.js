import { useState, useEffect } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    /*
    This code is defining a functional component called "CustomerList" which exports a constant.

    The component uses React's "useState" hook to declare a state variable "customers" and its initial value as an empty array.

    It also uses the "useEffect" hook to fetch data from a specific endpoint on a local server. The endpoint is a GET request to retrieve all users who are not staff and their associated customers. The response from the server is converted to a JSON object and set as the value of the "customers" state variable using the "setCustomers" function.

    The second argument to the "useEffect" hook is an array of dependencies that determine when the effect should be executed. In this case, an empty array is passed, which means the effect will only be executed once when the component mounts.

    Overall, this component retrieves customer data from a local server and sets it as the state variable "customers" using React's "useState" and "useEffect" hooks.
    */
    useEffect(
    () => {
    
        fetch(`http://localhost:8088/users?isStaff=false`) 
        .then(response => response.json())
        .then((customerArray) => {
            setCustomers(customerArray)
        })

    },
    [] 
    )

    return <article className="customers">
        {
            customers.map(
                (customer) => <Customer key={`customer--${customer.id}`}
                id={customer.id}
                fullName={customer.fullName}
                email={customer.email} />)
            
        }
    </article>

}