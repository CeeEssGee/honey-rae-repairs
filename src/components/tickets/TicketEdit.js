import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const TicketEdit = () => {

    // observe the initial state of tickets
    const [ticket, editTicket] = useState({
        description: "",
        emergency: false // should this be default false?
    })

    const navigate = useNavigate()
    const {ticketId} = useParams()


    
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`) 
        .then(response => response.json())
        .then((data) => {
            const employeeArray = data
            editTicket(employeeArray)
        
        })
    
    },
    [ticketId] 
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()




    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    }) 
    .then(response => response.json())
    .then(() => {
        navigate("/tickets")
    
    })

    }

    return <>
    
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    {/* input form for the description, need default values in our initial state */}
                    <textarea
	                    required autoFocus
	                    type="text"
	                    style={{
	                        height: "10rem"
	                    }}
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...ticket }
                                // modify the copy with new value of description from the change event, evt.target.value = whatever is in the input field
                                copy.description = evt.target.value
                                // now that we've captured the input, we need to editTicket the state
                                editTicket(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    {/* input for clicking if it is an emergency, need default values in our initial state */}
                    <input type="checkbox"
	                    checked={ticket.emergency}
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...ticket }
                                // modify the copy with new value of emergency from the change event, evt.target.checked = if checked, true / not, false
                                copy.emergency = evt.target.checked
                                // now that we've captured the input, we need to editTicket the state
                                editTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Ticket Changes
            </button>
        </form>
    
    
    </>
}