const products = []
let invoiceNumber = Date.now()
let editIndex = null


// to get customer details 
function getCustomerDetails() {
    const details = {
        name: document.getElementById("cname").value,
        phone: document.getElementById("cphone").value
    };
    if (details.name.length > 6 && details.phone.length > 6){
        document.getElementById("pmsg").style.display = "none"
        return details
    }else{
        document.getElementById("pmsg").style.display = "block"
        document.getElementById("pmsg").style.color = "red"
    }
}


// to add product 
function addProduct(){
const pname_ele = document.getElementById("pname")
const pprice_ele = document.getElementById("pprice")
const pquantity_ele = document.getElementById("pquantity")
const total_product_price = Number(pprice_ele.value) * Number(pquantity_ele.value)
    let new_product = {
        prod_name: pname_ele.value,
        prod_price: pprice_ele.value,
        prod_quantity: pquantity_ele.value,
        total: total_product_price 
    }
    products.push(new_product)
    displayTable()
    pname_ele.value = ""
    pprice_ele.value = ""
    pquantity_ele.value = 1
    console.log(new_product)
}


// to display table 
function displayTable(){
    let sub_total = 0
    let tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    products.forEach((product,index)=>{
        let new_row = document.createElement("tr")
        new_row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.prod_name}</td>
        <td>₹ ${product.prod_price}</td>
        <td>${product.prod_quantity}</td>
        <td>₹ ${product.total}</td>
        <td><button onclick="editProduct(${index})">Edit</button><button onclick="removeProduct(${index})">Remove</button></td>
        `
        sub_total+=product.total
        tbody.appendChild(new_row)
    })
    document.getElementById("total_items").innerText = products.length
    document.getElementById("subtotal").innerText = sub_total.toFixed(2)
    const discount_value = document.getElementById("discount").value
    const gst_value = document.getElementById("gst").value
    const discount = (sub_total * discount_value) / 100
    document.getElementById("discountedamount").innerText = discount.toFixed(2)
    const final_total = sub_total - discount
    const gst = (final_total * gst_value) / 100
    document.getElementById("gstamount").innerText = gst.toFixed(2)
    document.getElementById("finaltotal").innerText = (final_total + (final_total * gst_value) / 100).toFixed(2)
    getCustomerDetails()
}


// to get edit product 
function editProduct(index){
    const product = products[index]
    editIndex = index
    const pname_ele = document.getElementById("pname")
    const pprice_ele = document.getElementById("pprice")
    const pquantity_ele = document.getElementById("pquantity")
    pname_ele.value = product.prod_name
    pprice_ele.value = product.prod_price
    pquantity_ele.value = product.prod_quantity
    document.getElementById("editbtn").style.display = "inline-block"
    document.getElementById("addbtn").style.display = "none"
}


// to update product 
function updateProduct(){
    const pname_ele = document.getElementById("pname")
    const pprice_ele = document.getElementById("pprice")
    const pquantity_ele = document.getElementById("pquantity")
    const total_product_price = pprice_ele.value * pquantity_ele.value
    const edited_product = {
        prod_name: pname_ele.value,
        prod_price: pprice_ele.value,
        prod_quantity: pquantity_ele.value,
        total: total_product_price 
    }
    products.splice(editIndex,1,edited_product)
    displayTable()
    pname_ele.value = ""
    pprice_ele.value = ""
    pquantity_ele.value = 1
    editIndex = null
    document.getElementById("editbtn").style.display = "none"
    document.getElementById("addbtn").style.display = "inline-block"
}

// to remove product
function removeProduct(index){
    products.splice(index,1)
    displayTable()
}

function handleDiscount(){
    const discount_value = document.getElementById("discount").value
    document.getElementById("discount_percentage").innerText = discount_value    
    displayTable()
}

function handleGst(){
    const gst_value = document.getElementById("gst").value
    document.getElementById("gst_percentage").innerText = gst_value
    displayTable()
}


function printBill() {
    const details = getCustomerDetails()
    if (!details) return alert("Enter valid customer details!")

    // Fill print section
    document.getElementById("p_invoice").innerText = Date.now()
    document.getElementById("p_name").innerText = details.name
    document.getElementById("p_phone").innerText = details.phone
    document.getElementById("p_subtotal").innerText = document.getElementById("subtotal").innerText
    document.getElementById("p_discount").innerText = document.getElementById("discountedamount").innerText
    document.getElementById("p_gst").innerText = document.getElementById("gstamount").innerText
    document.getElementById("p_final").innerText = document.getElementById("finaltotal").innerText

    // Fill product table
    let pbody = document.getElementById("p_tbody")
    pbody.innerHTML = ""
    products.forEach((p, i) => {
        pbody.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${p.prod_name}</td>
            <td>₹ ${p.prod_price}</td>
            <td>${p.prod_quantity}</td>
            <td>₹ ${p.total}</td>
        </tr>`
    })

    // Print only the section
    let original = document.body.innerHTML
    let printContent = document.getElementById("printSection").innerHTML
    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = original
    window.location.reload()
}


function downloadPDF(){
    alert("soon to be added")
}