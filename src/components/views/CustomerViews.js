import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title--main">Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                {/* Our original line on ApplicationViews was below */}
                    {/* <Route path="tickets" element={ <TicketList /> } /> */}
                {/* this will change because we want 2 components to be displayed when the route is tickets - we want TicketList and as a sibling, we want TicketSearch*/}
                {/* TicketList and TicketSearch are siblings, next to each other and one is not contained inside the other... both are inside of a Reach fragment */}
                {/* create another component whose job is to contain these 2 things so they can share state (parent component) which will contain the state for searching for tickets  */}
                {/* replaced TicketList (child) and TicketSearch (child) with TicketContainer (parent) */}
                {/* Customers need to see TicketList and TicketForm, so that shows on the CustomerViews */}

                <Route path="tickets" element={ < TicketList /> } />

				{/* had to let this TicketForm autocomplete in order to work */}
				<Route path="ticket/create" element={ <TicketForm /> } />
				
            </Route>
        </Routes>
    )
}

// export const ApplicationViews = () => {
// 	return <>
// 		<h1 className="title--main">Honey Rae Repairs</h1>
// 		<div>Your one-stop shop for repairing your tech</div>
// 	</>
// }


