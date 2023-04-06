import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"

export const EmployeeViews = () => {
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
                {/* Employees need to see TicketContainer, so it shows on the EE view */}

                <Route path="tickets" element={ <TicketContainer /> } />

                {/* To be the customer list */}
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />

                <Route path="employees" element={ <EmployeeList /> } />

                {/* For the Route path ="employees/#" - we could be looking at any number of employee, so we are going to create a variable to capture that number, we do that by using a colon and then the name of the variable... Leaving blank react fragment until you've created and replaced with EmployeeDetails */}
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />

				
				
            </Route>
        </Routes>
    )
}

