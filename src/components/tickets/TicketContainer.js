// parent component that maintains the state
// the TicketList and TicketSearch are going to get access to this state via props

import { useState } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer = () => {
    // set up the state variable for the search terms
    // value of the setSearchTerms variable is a function
    // searchTerms = state of search terms themselves 
    // setSearchTerms - fx to change the state of search terms
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    {/* search component needs the setter function - with onChange listener */}
    {/* props - passing a value down to a child component, similar to passing arguments from one block of code to another */}
    {/* to get access to the setSearchTerms in TicketSearch, we will access the key of setterFunction, which is on an object... React takes all of the props, in this case there is only one, and it brings them all together in a single object with a key of setterFunction with the value of setSearchTerms fx... we go to TicketSearch and extract that property through object deconstruction (go to the TicketSearch component/module now) */}
        <TicketSearch setterFunction={setSearchTerms} /> 
        <TicketList searchTermState={searchTerms} /> 
    </>
}