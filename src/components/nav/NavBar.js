import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"


// Tickets link and logout link + event listener
export const NavBar = () => {

        // get honey user object out of local storage
        const localHoneyUser = localStorage.getItem("honey_user") // a string
        const honeyUserObject = JSON.parse(localHoneyUser) // an object with 2 keys (id and staff)
    
        if (honeyUserObject.staff) {
            // return employee views
            return <EmployeeNav />
        }
        else {
            // return customer views
            return <CustomerNav />
        }

}

