import { Link } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ ticketObject, isStaff, employees }) => {

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

    return <section className="ticketSection">
    <header>
        {
            isStaff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket ${ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer>
			    {
			        ticketObject.employeeTickets.length
			        ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee.user.fullName : ""}`
			        : <button>Claim</button>
			    }
</footer>
</section>
}