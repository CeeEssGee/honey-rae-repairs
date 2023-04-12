import { Link } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ ticketObject, isStaff }) => {

    return <section className="ticketSection">
    <header>
        {
            isStaff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket ${ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
</section>
}