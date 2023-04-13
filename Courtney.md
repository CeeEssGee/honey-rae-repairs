Per the instructions:
        Followed the project setup for honey-rae-repairs directory
        Followed the project setup for honey-raes-api
Moved the honey-raes-api directory into the honey-rae-repairs directory
Per the instructions for honey-raes-api:
        copied the data to database.json 
        started the API
        pushed initial commit to Github for honey-raes-api
TicketList.js
        copied given code
ApplicationViews.js
        copied given code
ApplicationViews.js
        updated code as per the video
        got an error, so I added a key to the section
                key={ticket.id}
TicketList.js - per video
        Updated the code as per the video
        also updated tickets.map to filteredTickets.map because it was showing ALL of the tickets regardless if it was an employee or customer
TicketList.js - per video
        Updated the code to add Emergency Button that filters tickets to show only emergency tickets
        Updated the code to show emergency button only when an EE is logged in
        Updated code to allow EE to switch back from Emergency tickets
TicketForm.js - per video and instructions
        Added to tickets folder
        Copied given code
TicketList.js - per video and instructions
        Copy button code for New Ticket Form to the empty string area for when we didn't want Show Emergency/All tickets for nonEmployees
ApplicationViews.js - per video and instructions
        Copied Route path 
TicketForm.js - per video and instructions
        get the submit ticket button to work
TicketList.js - per video and instructions
        button for customers to see open tickets 
        button for customres to see all tickets
<!-- 01-09 Employee: Find Tickets -->
TicketSearch.js - per video and instructions
        Create an input field
ApplicationViews.js - per video and instructions
        Update <Route path="tickets" element={ <TicketList /> } /> to include the TicketSearch box
TicketContainer.js - per video and instructions
        create another component whose job is to contain these 2 things so they can share state (parent component) which will contain the state for searching for tickets
        Copied/Moved TicketList and TicketSearch from ApplicationViews to TicketContainer
ApplicationViews.js  
        Replaced TicketList (child) and TicketSearch (child) with TicketContainer (parent)
More notes on TicketSearch.js and TicketContainer.js
Website
        Inspect Tools - TicketContainer
        By typing test in the search (the child), it modified the state on the parent (TicketContainer)
<!-- 01-10 Different Views per User Type -->
ApplicationViews.js  
        Routing logic for customers versus EE's
        Create CustomerViews.js and EmployeeViews.js
        Copy ApplicationViews.js to Customer and Employee
CustomerViews.js
        We do not want TicketContainer
EmployeeViews.js
        We do not want TicketForm
ApplicationViews = Higher order component - a component that returns other components
<!-- 01-11 Employee: Employee Directory -->
EmployeeList.js
        Create a new directory in components- employees
        Create a new file - EmployeeList.js
        export fx named EmployeeList
                responsiblity is to set up some initial state
                in initial state useEffect, fetch all of the EEs from the API and pull them in
                in JSX, render FullName and email (from users) 
NavBar.js
        <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Employees</Link>
        </li>
        the "to" attribute is the url
        which of the views is going to support it? EmployeeViews
EmployeeViews.js
        Create another route
                <Route path="employees" element={ <EmployeeList /> } />
<!-- We want NavBar to display certain things depending on user type -->
        We could create EE and Customer NavBars
        We could put if conditions or terniary statements in the NavBar itself
        Follow same strategy as we did for applicaiton views
Nav Folder
        create EmployeeNav.js and CustomerNav.js
        Copy NavBar.js code to EENav and CustNav
        Change the names of the functions
        Show only what we want
CustomerNav.js
        Get rid of the Employees link
EmployeeNav.js
        Keep both Tickets and Employees links
ApplicationViews.js
        Logic is going to be similar, so copy the logic from ApplicationViews
NavBar.js
        Replace the function with the logic from ApplicationViews
        Tweak the names to EmployeeNav and CustomerNav in my return statements
        Delete obsolete imports
<!-- It works! And I did the same for Kandy Korner -->

<!-- Employee Component With Props 1-11 B -->
In this section, you are going to practice sending component state from a parent to a child component. More practice using props in your React code.
Watch the Props for Employee Component video and then implement the code yourself.

        Create a child of EmployeeList called Employee to practice props (state passed from parent) a little more - when dealing with components in a list, the reason we may want to take this section (the employee name and email address from Employee List) and move it into a separate component is - let's say that the struture of this becomes quite complex or the functionality of how an individual EE should be rendered starts to get more sophisticated. There are state transitions, it depends on where it's rendered. Or let's say that you want the EE info rendered in more than 1 place instead of just in the list of all EEs
Employees directory
        Create Employee.js
Employee.js
        Create and export Employee component fx
                How many parameters should be defined if a child is expecting props from a parent? One for the props object
        Because we are dealing with props, this component is getting a single parameter, an object
        We are going to figure out what are the props that are going to be sent from the EEList to to EE when we are rendering it
        From EEList.js to the EE.js component itself
                Take what we are returning out of EEList.js 
                        return <section className="employee" key={`employee--${employee.id}`}>
                                <div>Name: {employee.fullName}</div>
                                <div>Email: {employee.email}</div>
                        </section>
        There are 3 bits of info that the EE component needs from the EEList component (because the data starts with employees.map which was left in EEList). For EE component to get it, we need id, fullName, and email.
        Get rid of employee. in all 3 places
                employee.id => id
                employee.fullName => fullName
                employee.email => email
        Resulting in 3 bits of info we need from the parent (EmployeeList.js)
EmployeeList.js
        Get rid of the curly braces within employees.map(employee => {}) and replace with the <Employee /> component AND make sure it imports
        It needs 3 props (id, fullName and email)
                <Employee id={} fullName={} email={} />
        These 3 values come from the parameter after the .map(), which is the individual object as we are iterating the employees
                <Employee id={employee.id} fullName={employee.fullName} email={employee.email} />
Employee.js
        Deconstruct all 3 of those props within the curly braces of the object parameter 
                export const Employee = ({ id, fullName, email }) =>
        ERROR - each must have a unique key on parent - added
                key={`employee--${employee.id}`}
EmployeeList.js 
        We can get rid of the key at the child level
        Key has to be in the component that is rendering multiple things, in this case, the parent - where the map is
This can be helpful to plan for future growth

<!-- Employee Details With Route Parameters 1-11C -->
In this section, you are going to see how to use route parameters to render a detailed representation of an employee.
        You will see the useParams() hook in React Router.
        You will be introduced to the optional chaining operator in JavaScript.
                https://javascript.info/optional-chaining
                ?. access nested object properties, even if an intermediate property doesn't exist
                        like our Kandy Korner - new candy doesn't have a location?
        Watch the Employee Details video and then implement the code yourself.
                https://watch.screencastify.com/v/XH5sKQui4SR2xSN8rlmt
TO DO
        Click on an EE's name and see name and email AND specialty and rate
        Create a new route to handle when we want to see the details for an employee with the id of #
EmployeeViews.js
        Duplicate the EmployeeList Route, "employees/#"
        For the Route path ="employees/#" - we could be looking at any number of employee, so we are going to create a variable to capture that number, we do that by using a colon and then the name of the variable
        Anytime the route matches employee/# (some number), it is going to capture that and store it in the variable
                <Route path="employees/:employeeId" element={ <></> } />
EmployeeDetails.js - create new component
        Create and Export EmployeeDetails fx and return <></> fragment
EmployeeViews.js
        replace the fragment placeholder with <EmployeeDetails />
        make sure it imported EmployeeDetails
EmployeeDetails.js 
        We'll capture employeeId from EEViews on this component
        hook is called useParams, and we're going to deconstruct that because there could be multiple route parameters so react-router-dom takes anything in the URL and puts it into an object, much like props from a parent to a child component - which is why we need to deconstruct it
        We'll deconstruct the employeeId variable that was defined in the Route on EEViews
        it pulls in the object created from the route parameters, and we extract any variable that we defined
        We want to display all of the details about an EE, so we need a state variable for the EE
        Now that the useState is set up, we go to the Employee component and use Link to turn the EE name into a hyperlink
Employee.js
        We are going to Use Link to turn the name of EE into a hyperlink that will change the Route to Employees/primaryKey of EE
        Don't forget to import Link
        Replace - Name: {fullName} - with 
                <Link to={`/employees/${id}`}>Name: {fullName}</Link>

When we click on the linked name, it shows EmployeeDetails in the tree because the route is now Employees/#. Now we flesh out the EmployeeDetails component to display all of the information. We need to go to the API to do that.

EmployeeDetails.js
        employeeId is the state we are getting from the route, and we want to observe when that state changes ==> useEffect, and we are going to observe employeeId // see notes on EEDetails.js
        Build JSX, copy section from Employee.js and build it out
<!-- Completed 1-11c -->

<!-- 1-12-1 Create a navigation bar link titled "Customers" -->
EmployeeNav.js
        Duplicated Employees, currently sends you to Employee List

<!-- 1-12-2 Create a Customer module that contains a component function that accepts a single customer object as a prop. It should display the customer name, address, and phone number. -->
CustomerList.js
        Export fx CustomerList
                set up initial state
                useEffect and fetch all of the customers from API
                Write some JSX to show Customer's name and email
Customer.js
        Import Link from react-router-dom
        Export Customer fx
         Because we are dealing with props, this component is getting a single parameter, an object
        We are going to figure out what are the props that are going to be sent from the CustList to to Customer when we are rendering it
        From CustList.js to the Cust.js component itself
                Take what we are returning out of CustList.js 
                id, fullName, email

<!-- 1-12-3 Create a CustomerList module that contains a component function that fetches all customers and iterates the array in the JSX to display the name of each customer by passing each object to the Customer component as a prop. -->
        I think I completed this during 1-12-2 above
<!-- 1-12-4 Create a CustomerDetails component that should display the full name, email, phone number, and address of the customer when the customer's name is clicked in the list view. -->
CustomerDetails.js
        export fx CustomerDetails
EmployeeViews.js
        Update
<!-- It works! -->

<!-- 1-13-1 Employee Edit Profile -->
EmployeeNav.js - Add a profile link
EmployeeViews.js - Add a profile Route - React fragment
create profile folder
create Profile.js
create EmployeeForm.js
Profile.js - copy code from NavBar.js and tweak
EmployeeViews.js - update React fragment to Profile
EmployeeForm.js - write basic code with React fragment
Profile.js - replace fragments with CustomerForm and EmployeeForm
EmployeeForm.js - copy boilerplate code
        Update onClick for the Save Profile button
        Add event as the parameter for the handleSaveButtonClick
        create a state variable 
        Line 5:
                const [profile, updateProfile] = useState({
			// Since we are in a form, we are going to provide some properties that are needed on this with some default values - the initial state object needs specialty, rate, and userId with some initial values
				specialty: "",
				rate: 0,
				userId: 0
                })
        Create a useEffect and fetch to go to the API and get the profile state
                To get the employee profile, we need to get one of the employee objects based off of their userId because what we have stored in local storage is not the employeeID or customerId, but the userId
                Initial API URL is http://localhost:8088/employees?userId=4 
                having the userId hard coded doesn't make sense, so we'll need to figure out how to move from there. 
        Copy localHoneyUser and honeyUserObject from Profile.js
        the honeyUserObject has the userId
        replace userId=4 with a string interpolation 
                useEffect(() => {
                fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`) // do you need a return
                .then(response => response.json())
                .then((data) => {
                        const employeeObject = data[0]
                        updateProfile(employeeObject)
                })
                }, [])
        In the fieldsets, we need to update onChange, copy the state, modify the state, and the update the state with the copy
                const copy = { ...profile}
                copy.specialty = evt.target.value
                updateProfile(copy)
        for the rate, we need a parseFloat
                const copy = { ...profile}
                copy.rate = parseFloat(evt.target.value, 2)
                updateProfile(copy)
        Final step is to go back and update permanent state when they click on Save Profile button at the TODO: Perform PUT fetch() call to update the profile and navigate user to home
                return fetch(`http://localhost:8088/employees/${profile.id}`, {
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify(profile)
                }) 
                .then(response => response.json())
                .then(() => {
                        // do nothing
                })
                

        

<!-- 1-14-1 Customer Edit Profile -->
CustomerNav.Js - Add a porfile link
CustomerViews.js - Add a profile Route - React fragment
create CustomerForm.js
CustomerViews.js - update React fragment to Profile
CustomerForm.js - write basic code with React fragment
CustomerForm.js - copied boilerplate EmployeeForm code 

Update onClick for the Save Profile button
        Add event as the parameter for the handleSaveButtonClick
        create a state variable 
        Line 5:
                const [profile, updateProfile] = useState({
			// Since we are in a form, we are going to provide some properties that are needed on this with some default values - the initial state object needs specialty, rate, and userId with some initial values
				specialty: "",
				rate: 0,
				userId: 0
                })
        Create a useEffect and fetch to go to the API and get the profile state
                To get the employee profile, we need to get one of the employee objects based off of their userId because what we have stored in local storage is not the employeeID or customerId, but the userId
                Initial API URL is http://localhost:8088/employees?userId=4 
                having the userId hard coded doesn't make sense, so we'll need to figure out how to move from there. 
        Copy localHoneyUser and honeyUserObject from Profile.js
        the honeyUserObject has the userId
        replace userId=4 with a string interpolation 
                useEffect(() => {
                fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`) // do you need a return
                .then(response => response.json())
                .then((data) => {
                        const employeeObject = data[0]
                        updateProfile(employeeObject)
                })
                }, [])
        In the fieldsets, we need to update onChange, copy the state, modify the state, and the update the state with the copy
                const copy = { ...profile}
                copy.specialty = evt.target.value
                updateProfile(copy)
        for the rate, we need a parseFloat
                const copy = { ...profile}
                copy.rate = parseFloat(evt.target.value, 2)
                updateProfile(copy)
        Final step is to go back and update permanent state when they click on Save Profile button at the TODO: Perform PUT fetch() call to update the profile and navigate user to home
                return fetch(`http://localhost:8088/employees/${profile.id}`, {
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify(profile)
                }) 
                .then(response => response.json())
                .then(() => {
                        // do nothing
                })
<!-- Employee Profile Form and Customer Profile Form work!!! -->
<!-- Ch 13&14 Success Message -->
        In this next section, after you have completed the functionality, you can implement a slide in message for the employee once the data is saved. It's always nice to provide some feedback to the user of your application when things work, or don't work.
index.css - add the boilerplate code
CustomerForm.js and EmployeeForm.js
        add the given code before the <form> element (needed a fragment to enclose JSX code)
        add state and observer code
        chain the given code to the PUT operation
<!-- It works!!! -->
<!-- Ch. 15 - Customer: Edit Ticket Details -->
TicketEdit.js 
        create and return a React fragment
TicketList.js 
        Update TicketList JSX so that the ticket id is in the header, and is a <Link> component that routes the user to /tickets/{id}/edit
                <header>
                        <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                </header>
                <section>{ticket.description}</section>
                <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
CustomerViews.js
        Add a route to the customer views that will render the TicketEdit component.
              <Route path="tickets/:ticketId/edit" element={ ??? } />
TicketEdit.js
        Create a new module src/components/tickets/TicketEdit.js.
        The edit form is, largely, the same as the TicketForm component. It has some important differences.
        1. You need to GET the data based on the route parameter
        2. The request to save the data is a PUT instead of a POST
        3. The checked attribute of the checkbox must be bound to the ticket.emergency property
I was able to edit the tickets, but I couldn't get it to show the original tickets information. There were 6 places in the code that were different, but I think 2-3 of them were just different ways to do things. 
<!-- It works!!! -->
<!-- Ch. 16a - Edit for Customers Only -->
Ticket.js
        Create Ticket
        move the returned section from TicketList.js to Ticket.js
        import Link from react-router-dom
TicketList.js
        remove { return }, will use implicit return 
        the Ticket component plus ticketObject={ticket}
Ticket.js
        deconstruct ticketObject
        replaced ticket.__ with ticketObject.__
        removed the key
TicketList.js
        Added the key just after the Ticket component in the map function/method(?)
<!-- It works!!! -->

<!-- Ch. 16b - Show current assignment -->
Ticket.js
        Move Emergency information from the footer into another section
TicketList.js
        update URL in original fetch with
                http://localhost:8088/serviceTickets?_embed=employeeTickets
Ticket.js
        in the footer, write some logic, if ticketObject.employeeTickets.length (meaning if this is truthy), 
TicketList.js
        fetch employees?_expand=user
        add employees as a state variable
        add employees as a prop
Ticket.js
        deconstruct employees
<!-- It works!!! -->
<!-- Ch. 17 - Employee: Close Ticket -->
Tickets.css
        tweak css to match Steve's
Ticket.js - need 2 functions
        canClose
                Is this ticket already closed?
                Is the logged-in user the one assigned to it?
                        If so, I want a button to show for that user to be able to close the ticket when it's completed.
        closeTicket
                Update the API with a new dateCompleted value for this ticket
        canClose
                need an if statement
                else return empty string
        closeTicket
                build our copy data
                fetch call
                get the state from the API again
<!-- It works!!! -->



<!-- To-Do -->


<!-- Question -->
