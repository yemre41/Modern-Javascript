// listen for sumbit
document.getElementById('loan-form').addEventListener('submit',function(e){
  // Hide result
  document.getElementById('results').style.display='none'

  // Show Loader
  document.getElementById('loading').style.display='block'

  setTimeout(calculateResult,2000)

  e.preventDefault();
})

//Calculate Results
function calculateResult(){
  console.log('Calculating...')
  // UI Vars
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')
  
  
  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12

  //Compute monthly payment
  const x = Math.pow( 1 +  calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) /(x-1)

  if(isFinite(monthly)){
    monthlyPayment.value=monthly.toFixed(2)// to fixed = .dan sonra 2 hane
    totalPayment.value=(monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
 
    // HIDe RESULT
    document.getElementById('results').style.display='block'

    // HIDE LOADER
    document.getElementById('loading').style.display='none'
  }else{
    showError('Please Check Your Number')
  }
  
 
}


// Show Error
function showError(error){
  // SHOW RESULT
  document.getElementById('results').style.display='none'

  // HIDE LOADER
  document.getElementById('loading').style.display='none'

  // Create a div
  const errorDiv = document.createElement('div')

  // Get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')


  // Add class
  errorDiv.className = 'alert alert-danger'

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  // Insert above heading
  card.insertBefore(errorDiv,heading)


  // Clear error after 3 seconds
  setTimeout(clearError,3000)

}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove()
}