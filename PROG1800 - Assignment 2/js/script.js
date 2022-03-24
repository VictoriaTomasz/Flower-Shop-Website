function FormSubmit(){

    // fetching all the values
    var firstName = document.getElementById('firstname').value;
    var lastName = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var province = document.getElementById('province').value;
    var city = document.getElementById('city').value;
    var postalCode = document.getElementById('postalcode').value;
    var product1 = document.getElementById('product1').value;
    var product2 = document.getElementById('product2').value;
    var product3 = document.getElementById('product3').value;
    var delivery = document.getElementById('delivery').value;

    // Error Handling

    var errorMessage = "";

    // First Name Input Validation
    if (firstName.length < 1){
        errorMessage += 'Please enter a valid First Name <br>';   
    }

    // Last Name Input Validation
    if(lastName.length < 1){
        errorMessage += 'Please enter a valid Last Name <br>';
    }

    // Email Input Validation
    if(email.length < 1){
        errorMessage += 'Please enter a valid Email Address <br>';
    }

    // Phone Number Input Validation with Regex
    var phoneRegex = /^\d\d\d[ -]?\d\d\d[ -]?\d\d\d\d$/gm;
    // Possible Phone Number Inputs: 5191234567 or 519 123 4567 or 519-123-4567

    if(!phoneRegex.test(phone) || phone.length < 1){
        errorMessage += 'Please enter a valid phone number <br>';
    }

    // Home Address Input Validation
    if(address.length < 1){
        errorMessage += 'Please enter a valid Home Address <br>';
    } 

    // Provice Selection Validation and Determining GST for each Province/Territory
    var tax = 0;
    if(province == "0"){
        errorMessage += 'Please select from the listed Provinces <br>'
        tax = 0;
    }

    if(province == "ON"){
        tax = 0.13;
    }
    else if(province == "NB" || province == "NL" || province == "NS" || province == "PE"){
        tax = 0.15;
    }
    else{
        tax = 0.05;
    }

    // City Input Validation
    if(city.length < 1){
        errorMessage += 'Please enter a valid City <br>';
    }

    // Postal Code Input Validation with Regex
    var postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/gm;
    // Possible Postal Code Inputs: N1H 6W5 or N1H6W5 or N1H-6W5 (both upper or lower case accepted)

    if(!postalCodeRegex.test(postalCode) || postalCode.length < 1){
        errorMessage += 'Please enter a valid Postal Code <br>';
    }

    // Product Input Validation
    if(product1.length < 1 && product2.length < 1 && product3.length < 1){
        errorMessage += 'Please purchase at least one product <br>';
        product1 = 0;
        product2 = 0;
        product3 = 0;
    }

    if (product1.length != null){

        if(isNaN(product1) || product1 < 0){
            errorMessage += 'Please enter a valid numeric value for your purchase of Winter Wonderland <br>';
        } 
    }
    
    if (product2.length != null){
        if(isNaN(product2) || product2 < 0){
            errorMessage += 'Please enter a valid numeric value for your purchase of Firey Paradise <br>';
        }
    }

    if (product3.length != null){
        if(isNaN(product3) || product3 < 0){
            errorMessage += 'Please enter a valid numeric value for your purchase of Summer Fields <br>'
        }
    }

    // Delivery Selection Validation and Determining cost of Delivery
    var deliveryCost = 0;
    if(delivery == "0"){
        errorMessage += 'Please select a Delivery Time <br>'
    }

    if(delivery == "1"){
        deliveryCost = 40;
    }
    else if(delivery == "2"){
        deliveryCost = 30;
    }
    else if(delivery == "3"){
        deliveryCost = 20;
    }
    else if(delivery == "4"){
        deliveryCost = 10;
    }

    // Calculations

    // Declaring variables
    const product1Price = 40;
    const product2Price = 35;
    const product3Price = 30;
    var product1Total;
    var product2Total;
    var product3Total;
    var subTotal;
    var totalTax;
    var totalCost;

    // Calculations of each product based on the amount the user inputted
    product1Total = product1Price * product1;
    product2Total = product2Price * product2;
    product3Total = product3Price * product3;

    subTotal = product1Total + product2Total + product3Total;

    // Calculation os total tax based on the Province or Territory the user has entered
    totalTax = parseFloat((Math.round(subTotal) * tax).toFixed(2));

    // Calculation of the total cost
    totalCost = parseFloat(subTotal + totalTax + deliveryCost).toFixed(2);

    // Once all inputs are validated, error messages are cleared and invoice is shown
    if(errorMessage != ''){
        document.getElementById('errorMessage').innerHTML = errorMessage;
        document.getElementById('result').innerHTML = "";
    }
    else{  
        document.getElementById('errorMessage').innerHTML = '';
        var output = "";
        output = `
        Name:   ${firstName}  ${lastName} <br>
        Email:  ${email} <br>
        Phone:  ${phone} <br>
        Home Address:   ${address} <br>
                        ${city}, ${province} <br>
                        ${postalCode} <br>
        Sub Total:      $${subTotal} <br>
        Delivery Charges:   $${deliveryCost} <br>
        Taxes:  $${totalTax} <br>
        Total:  $${totalCost}
        `;
        document.getElementById('result').innerHTML = output;
    }

    return false;
}