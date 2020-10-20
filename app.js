const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const textValidation = async (input) => {
    if (input === "") {
        console.log(chalk.red("Input Required"))
        return false;
    } else {
        return true;
    }
}

const emailValidation = async (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return true;
    }
    else {
        console.log(chalk.red("Please enter a valid Email address"))
        return false;
    }
}

const numberValidation = async (input) => {
    if (isNaN(input)) {
        console.log(chalk.red("Please enter a number"))
        return false;

    } else {

        return true
    }
}

function promptEmployee() {
    return inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "Please enter employees name: ",
            validate: textValidation
        },
        {
            type: "input",
            name: "id",
            message: "Please enter employees ID number: ",
            validate: numberValidation
        },
        {
            type: "input",
            name: "email",
            message: "Please enter employees email: ",
            validate: emailValidation
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
                        message: "Please enter employees office number ",
                        validate: numberValidation
                    },

                ]).then((answer) => {
                    manager = new Manager(employee.name, employee.id, employee.email, answer.officeNumber)
                    employeesArr.push(manager)
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
                        message: "Please enter employees GitHub account name ",
                        validate: textValidation
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
                        message: "Please enter employees school name: ",
                        validate: textValidation
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
        } else {
            runRender();
        }
    })
}

let employeesArr = []

function runRender() {
    html = render(employeesArr)
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(chalk.green("Roster succesfully created"))
        }
    })
}
promptEmployee();

