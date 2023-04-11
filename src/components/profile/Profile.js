import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {

        // get honey user object out of local storage
        const localHoneyUser = localStorage.getItem("honey_user") // a string
        const honeyUserObject = JSON.parse(localHoneyUser) // an object with 2 keys (id and staff)
    
        if (honeyUserObject.staff) {
            // return EmployeeProfile
            return < EmployeeForm />
        }
        else {
            // return CustomerProfile
            return < CustomerForm />
        }

}

