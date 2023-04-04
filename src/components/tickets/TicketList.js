import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // useNavigate() hook
import "./Tickets.css"


// added the key from TicketContainer (parent) - its value is the actual state from the parent - the search terms themselves. That is now considered state of this component. It is not a direct state variable, but it is a state variable that we kind of inherited from the parent so we can also observe that. Remember, to observe state, we need a useEffect(). See my useEffect below the localHoneyUser and honeyUserObject variables.
export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([]) // state variable - we don't want to modify this initial array of tickets

    // another state variable - this will initialize as an empty array but below - in our second useEffect, we will modify it depending on whether the user is a customer or an employee
    const [filteredTickets, setFiltered] = useState([])

    // another state variable - by default, I don't want to show only emergency tickets, so we list useState(false) so all of the tickets are listed until we click the button - when we click the button, we will toggle to show only emergency tickets
    const [emergency, setEmergency] = useState(false)

    // another state variable that shows open tickets only
    const [openOnly, updateOpenOnly] = useState(false)


    // reassign useNavigate() hook to navigate to be used later
    const navigate = useNavigate()

    // get honey user object out of local storage
    const localHoneyUser = localStorage.getItem("honey_user") // a string
    const honeyUserObject = JSON.parse(localHoneyUser) // an object with 2 keys (id and staff)

    useEffect(
        () =>{
            // console.log(searchTermState); // ticket list is observing when the parent state is changing
            
            // our instructions - any time our search changes, we want to filter the list of tickets - does the ticket start the search term(s)? - we are going to filter the original ticket list we got from the API - const [tickets, setTickets] = useState([])
            // we are constantly modifying const [filteredTickets, setFiltered] = useState([]) because that is what is being displayed
            // searchedTix = all tickets .filter (for each ticket return if the ticket.description starts with the searchTermState we got from the parent) --> produces an array with the matches.... Filtered tickets is what is displaying so that is the state we need to update
            //adding .toLowerCase() on the ticket.description (object itself) AND search tearms
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [ searchTermState ] // observe state from the parent
    )

    // to filter emergency tickets, we need to run some code when the emergency button is clicked
    // updated
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
            [emergency] // which state do I want to observe?
        
    )

    useEffect(
        () => {
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets

            // write a fetch statement here (dofetch is my shortcut)

            // paste my URL from my JSON server within the (`URL`) - go get all of the tickets, especially since we are logged in as an employee by default

            // now I can use the setter function (setTickets) listed above - I want to update my tickets, whose initial value is an empty array and I want to change it to the entire array of service tickets that I got from the API. That is the purpose of the setter fx
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => { // add a parameter to capture all of the data after the JSON processing is done
                    setTickets(ticketArray) // call setTickets fx and pass it the parameter of what we want the new value to be, which is the ticketArray

                })

        },
        [] // When this array is empty, you are observing initial component state
    )

    // need to observe ticket state using useEffect() and modify it depending upon whether the user is a customer or an employee
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // for employees
                setFiltered(tickets)
            }
            else {
                // for customers, their userId is attached to the serviceTicket
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }

        },
        [tickets] // observing array will not be empty, watching for every time ticket state variable changes
    )

    // need to observe ticket state using useEffect() and what we're looking to observe within the array // if openOnly is true, we will filter down the tickets and update the filtered state variable like we did with setFiltered(myTickets), but our filter is going to be different
    useEffect(
    () => {
        if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
        }
    },
    [ openOnly ]
    )



/* if statement is between the curly brackets - ternary statement
    don't need "if"
    { 
        honeyUserObject.staff (if this is true)
        ? then do this
        : else do this
        "" do nothing
    }
*/
    return <>
    {
        honeyUserObject.staff
        // need to surround multiple buttons with <> and </> in order for this to work
        ? <>
                <button onClick={() => {setEmergency(true)}}>🧨 Emergency Only 🧨</button>

                <button onClick={() => {setEmergency(false)}}>Show All</button>
            </>
    // replaced "" with the new button for customers - this "navigate" feature is from react router dom, routes them to a new route in the browser - we will need to import useNavigate and then rename it to navigate above in order to use it 
    // need to surround multiple buttons with <> and </> in order for this to work
    // added a second button for customers to see only open tickets
    // added a third button for customers to see all of their tickets
    : <> 
    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
    </>



    }
         
        <h2>List of Tickets</h2>

        <article className="ticketArticle">
            {
                filteredTickets.map( // changed this to filteredTickets to show only the filteredTickets and not ALL of the tickets
                    (ticket) => {
                        return <section key={ticket.id} className="ticketSection">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}