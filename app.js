const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



function promptEmployee() {
    return inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "Please enter employees name: "
        },
        {
            type: "input",
            name: "id",
            message: "Please enter employees ID number: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter employees email: "
        },
        {
            type: "list",
            name: "role",
            message: "Please enter employees role: ",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
    ]).then((answer) => {
        if (answer.role === "Manager") {
            employee = new Employee(answer.name, answer.id, answer.email)
            function promptManager() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "Please enter employees office number "
                    },

                ]).then((answer) => {
                    manager = new Manager(employee.name, employee.id, employee.email, answer.officeNumber)
                    employeesArr.push(manager)
                    console.log(employeesArr)
                    anotherEmployee()
                })
            }
            promptManager();
        } else if (answer.role === "Engineer") {
            employee = new Employee(answer.name, answer.id, answer.email)
            function promptEngineer() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "Please enter employees GitHub account name "
                    },
                ]).then((answer) => {
                    engineer = new Engineer(employee.name, employee.id, employee.email, answer.github)
                    employeesArr.push(engineer)
                    anotherEmployee()
                })
            }
            promptEngineer();
        } else {
            employee = new Employee(answer.name, answer.id, answer.email)
            function promptIntern() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "Please enter employees school name: "
                    },
                ]).then((answer) => {
                    intern = new Intern(employee.name, employee.id, employee.email, answer.school)
                    employeesArr.push(intern)
                    anotherEmployee()
                })
            }
            promptIntern();
        }
    })
}


function anotherEmployee() {
    return inquirer.prompt([
        {
            type: "list",
            name: "anotherEmp",
            message: "Would you like to add another employee?",
            choices: ["yes",
                "no"]
        }
    ]).then((answer) => {
        console.log(answer.anotherEmp)
        if (answer.anotherEmp === "yes") {
            promptEmployee()
            console.log("Please enter in another employees information")
            console.log(employeesArr)
        } else {
            console.log("come one now")
            runRender();

        }

    })
}

let employeesArr = []


function runRender() {
    render(employeesArr)
}


promptEmployee();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
