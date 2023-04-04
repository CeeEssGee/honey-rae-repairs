import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "", // default is empty string
        emergency: false // default is false emergency
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    // when the submit ticket button is clicked - note that it has a parameter, it wants the event - the instructions in this fx will run
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        /*
            {
                "userId": 3,
                "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
                "emergency": true,
                "dateCompleted": ""
            }
        */

        // create a JavaScript object with all the required properties
        const ticketToSendToAPI = {
            userId: honeyUserObject.id, // get the userId from the login information
            description: ticket.description, // get the ticket description from the input data
            emergency: ticket.emergency, // get the emergency check from the input data
            dateCompleted: "" // leave this blank
            // JSON will add an id for us
        }


        // TODO: Perform the fetch() to POST the object to the API (dofetch) but we need to return it
        // use the URL where our service tickets are stored
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST", // we are posting new data
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI) // our variable we defined earlier with the data outlined that we are sending and stringify it
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets") // where we are sending the user after submitting the ticket, we got this from application form - route path: tickets
                // <Route path="tickets" element={ <TicketList /> } />

            })

    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    {/* input form for the description, need default values in our initial state */}
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...ticket }
                                // modify the copy with new value of description from the change event, evt.target.value = whatever is in the input field
                                copy.description = evt.target.value
                                // now that we've captured the input, we need to update the state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    {/* input for clicking if it is an emergency, need default values in our initial state */}
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...ticket }
                                // modify the copy with new value of emergency from the change event, evt.target.checked = if checked, true / not, false
                                copy.emergency = evt.target.checked
                                // now that we've captured the input, we need to update the state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}