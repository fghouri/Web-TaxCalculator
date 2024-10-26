// Define constants
const SS_TAX_RATE = 0.062; // Adjusted to decimal
const M_TAX_RATE = 0.0145; // Adjusted to decimal
const SALARY_MIN = 15080;

// Object to store taxes
const taxes = { incomeTax: 0.0, ssTax: 0.0, mTax: 0.0 };

// brackets - essential for the loop
const taxBrackets = [ 
    { upperLimit: 10275, rate: 0.12 },
    { upperLimit: 41775, rate: 0.12 },
    { upperLimit: 89075, rate: 0.24 },
    { upperLimit: 170050, rate: 0.32 },
    { upperLimit: 215950, rate: 0.35 },
    { upperLimit: 539900, rate: 0.37 }
];
  
function calculateTaxes() {
    const inputValue = document.getElementById('salary').value;
    const salary = parseFloat(inputValue);

    // Validate input
    if (isNaN(salary) || salary == null || salary < SALARY_MIN) {
        return alert(`ERROR: Invalid input (number must be > ${SALARY_MIN})`);
    }

    // Calculate social security and Medicare taxes
    taxes.ssTax = salary * SS_TAX_RATE;
    taxes.mTax = salary * M_TAX_RATE;

    let temp = salary;
    let incomeTax = 0.0;  // Initialize income tax accumulator

    // calculate tax brackets
    for(let i = 0; i < taxBrackets.length; i++) {
        if(temp > taxBrackets[i].upperLimit) {
            incomeTax += taxBrackets[i].rate * (temp - taxBrackets[i].upperLimit);
            temp = taxBrackets[i].upperLimit;
            console.log(`temp != upper, i:` + i + ", temp: " + temp + ", upperLimit: " + taxBrackets[i].upperLimit);
        }
    }

    incomeTax += 0.1 * temp;  // Final bracket 

    // Total tax
    let totalTax = (incomeTax + taxes.ssTax + taxes.mTax).toFixed(2);

    // format results
    let yearlySalaryAfterTax = (salary - totalTax).toFixed(2);

    let monthlySalaryPostTax = (yearlySalaryAfterTax/12).toFixed(2);
    monthlySalaryPostTax = parseFloat(monthlySalaryPostTax).toLocaleString('en-US');

    yearlySalaryAfterTax = parseFloat(yearlySalaryAfterTax).toLocaleString('en-US');

    totalTax = parseFloat(totalTax).toLocaleString('en-US');
    incomeTax = parseFloat(incomeTax).toLocaleString('en-US');

    let grossMonthly = (salary/12).toFixed(2);
    grossMonthly = parseFloat(grossMonthly).toLocaleString('en-US');

    let ssTax = taxes.ssTax.toFixed(2);
    ssTax = parseFloat(ssTax).toLocaleString('en-US');

    let mTax = taxes.mTax.toFixed(2);
    mTax = parseFloat(mTax).toLocaleString('en-US');

    alert(
        `Yearly Salary After Tax: $${yearlySalaryAfterTax}\n` +
        `Gross Monthly: $${grossMonthly}\n` +
        `Monthly After Tax: $${monthlySalaryPostTax}\n\n` +
        `Social Security Tax: $${ssTax}\n` +
        `Medicare Tax: $${mTax}\n` +
        `Federal Income Tax: $${incomeTax}`
    ); 
}
