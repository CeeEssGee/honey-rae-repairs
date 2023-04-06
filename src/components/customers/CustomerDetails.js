import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


// here is where we are going to capture the customerId and extract it and the hook in react-router-dom is called useParams() and we are going to deconstruct that. There could be multiple route parameters, so react-router-dom takes anything in the URL and puts it into an object, much like props from a parent to a child component - which is why we need to deconstruct it
export const CustomerDetails = () => {
    
    // here is where we deconstruct the customerId variable that we defined in the route
    // it pulls in the object created from the route parameters, and we extract any variable that we defined
    const {customerId} = useParams()

    // we want to display all of the details about a customer, so we need a state variable for the customer
    const [customer, updatedCustomer] = useState({}) // returns an object
    // now that this is set up, we go to the Customer component and use Link to turn the Customer name into a hyperlink
    
    // using multiple queries, we can query the API and get all the details on the customer and use the variable customerId to show us everything for the individual customer, and the returning result will be an array ... Import UseEffect!!!
    useEffect(
    () => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`) 
        .then(response => response.json())
        .then((data) => { // capture the response as data
            // there will always only be 1 employee, so we can get the position 0
            const singleCustomer = data[0]
            // update our state variable (customer on line 13) with singleCustomer which is going to be an object
            updatedCustomer(singleCustomer)
        })
    },
    [customerId] // state we are going to observe
    )

    // this component should only be displayed when the route matches customer/# (some number) ... return <></> fragment as a placeholder so we can fill in EmployeeViews with CustomerDetails
    // We had to use optional chaining because user was showing as undefined. React renders the initial state first, then the useEffect kicks in, which fetches the data and updates the state and renders again. On initial state, there is no initial value for employee. One way around this is to use optional chaining. The error is around properties of a property (fullName and email). So we use the optional chaining (?.) which means that React should keep going down the path ONLY if these exist
    // our next error showed Objects are not valid as a React Child - employeeTickets - which is an array. Underlying an array is an object, and it doesn't like this. So we need optional chaining for that too
    return <section className="customer">
        <header className="customer__header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
        <div>Address: {customer.address}</div>
    </section>

}