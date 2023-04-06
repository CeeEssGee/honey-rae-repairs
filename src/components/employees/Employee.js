import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email }) => {
    return <section className="employee">
        {/* Use Link to turn the name of EE into a hyperlink that will change the Route to Employees/primaryKey of EE */}
        {/* Don't forget to import Link */}
    <div>
        {/* Name: {fullName} REPLACING THIS WITH THE BELOW*/}
        <Link to={`/employees/${id}`}>Name: {fullName}</Link>
    </div>
    <div>Email: {email}</div>
</section>
}