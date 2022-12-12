import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()

// Function whose responsibility is to find the product for an order
const findProduct = (order, allProducts) => {
    let orderProduct = null

    for (const product of allProducts) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    let orderEmployee = null

    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    // failcase for employees that dont exist
    if (orderEmployee === null) {
        orderEmployee = {
            id: order.employeeId,
            name: "Unknown",
            email: "Uknown",
            hourlyRate: "Uknown"
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    html = "<ul>"

    for (const order of orders) {
        const employee = findEmployee(order, employees)
        const product = findProduct(order, products)

        html += `<li>${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }

    html += "</ul>"

    return html
}

// Function whose responsibility is to find the product amount for an employee
// define variable to store product amount in
// iterate through orders
// check if employee ID is listed
// add 1 to product amount
// return product amount
const findProductAmount = (employeeId) => {
    let productAmount = 0;

    for (const order of orders) {
        if (order.employeeId === employeeId) {
            productAmount++;
        }
    }

    return productAmount
}

document.addEventListener(
    "click",
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("employee")) {
            const [, employeeId] = itemClicked.id.split("--")

            for (const employee of employees) {
                if (employee.id === parseInt(employeeId)) {
                    window.alert(`${employee.name} sold ${findProductAmount(employee.id)} products`)
                }
            }
        }
    }
)