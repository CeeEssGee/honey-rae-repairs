// this will return an input field - to be placed above the list of tickets when the route is /tickets

// from TicketContainer, it does go in as a parameter, but it is all gathered together as a single object - {} - we'll deconstruct it, and this is the name of the key - setterFunction
// now this component (TicketSearch) has access to the setSearchTerms fx on the TicketContainer module/component via the property of setterFunction
// the value of this variable (setterFunction) is now the setterFunction for the state variable in the parent 
// what happens when we invoke that fx on change
export const TicketSearch = ({ setterFunction }) => {
    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms" />
        </div>
    )
}