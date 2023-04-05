import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
// if statement for employee or customer to route them to the employee versus customer view

    // get honey user object out of local storage
    const localHoneyUser = localStorage.getItem("honey_user") // a string
    const honeyUserObject = JSON.parse(localHoneyUser) // an object with 2 keys (id and staff)

    if (honeyUserObject.staff) {
        // return employee views
        return <EmployeeViews />
    }
    else {
        // return customer views
        return <CustomerViews />
    }


}



