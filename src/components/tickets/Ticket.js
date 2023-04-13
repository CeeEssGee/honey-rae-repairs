import { Link } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    // Find the assigned employee for the current ticket
    let assignedEmployee = null

    // if (an employee is assigned to a ticket)
    if (ticketObject.employeeTickets.length > 0) {
        // only 1 employee can be assigned to a ticket at a time, so our array.length can only be 0 or 1
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        // we passed down the entire employee array, and we can use the employeeTicket.employeeId to match the employee.id
        // .find (employee => here is our rule, does it pass this condition) 
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
        // After the logic is done, the value of assignedEmployee will either be an object or null
    }

    // Find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    //TODO: Function that determines if the current user can close the ticket
    const canClose = () => {
        // need an if statement
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finished</button>
        }
        else {
            return ""
        }

    }



    //TODO: Function that udpates the ticket with a new date completed, and we'll invoke this with an onClick() on the button for canClose
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        // Now that I have a copy of my new state, here is my initial (return) fetch (PUT) call
        // If I'm trying to update serviceTicket #2, then we need to identify that in our API URL, so we need the primary key of the serviceTicket
        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }) 
        .then(response => response.json())
        // The API state has been updated, so we need to turn around and get that updated API state, and if we are passing a function into a .then, we can just pass it between the parentheses
        .then(() => {
            // GET the state from the API again
            getAllTickets()
        })
    }



    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button className="ticket__claim"
            onClick={() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id, 
                        serviceTicketId: ticketObject.id 
                    })
                }) 
                .then(response => response.json())
                .then(() => {
                    // GET the state from the API again
                    getAllTickets()
                })
            }}
                >Claim</button>
        } else {
            return ""
        }
    }

    return <section className="ticketSection">
        <header className="ticket__header">
            {/* conditional logic for what is displayed in the header */}
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <div className="footer-div">
        <footer className="ticket__footer">
            {/* condiitional logic on whether a ticket is assigned to an employee or available to be claimed */}
            {
                ticketObject.employeeTickets.length
                    ? `Assigned to ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()                    
            }
            {
                canClose()
            }
        </footer>
        </div>
    </section>
}