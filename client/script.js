// Define constants
const SS_TAX_RATE = 0.062; // Adjusted to decimal
const M_TAX_RATE = 0.0145; // Adjusted to decimal
const SALARY_MIN = 15080;

// Object to store taxes
let taxes = { incomeTax: 0.0, ssTax: 0.0, mTax: 0.0 };

function calculateTaxes() {
    const inputValue = document.getElementById('salary').value;
    const salary = parseFloat(inputValue);

    // Validate input
    if (isNaN(salary) || salary == null || salary < SALARY_MIN) {
        return alert(`ERROR: Invalid input (number must be > ${SALARY_MIN})`);
    }

    alert(`Value: ` + salary);

    // Calculate social security and Medicare taxes
    taxes.ssTax = salary * SS_TAX_RATE;
    taxes.mTax = salary * M_TAX_RATE;

    let temp = salary;
    let incomeTax = 0.0;  // Initialize income tax accumulator

    // Tax brackets (cumulative)
    if (temp > 539900) {
        incomeTax += 0.37 * (temp - 539900);
        temp = 539900;
    }
    if (temp > 215950) {
        incomeTax += 0.35 * (temp - 215950);
        temp = 215950;
    }
    if (temp > 170050) {
        incomeTax += 0.32 * (temp - 170050);
        temp = 170050;
    }
    if (temp > 89075) {
        incomeTax += 0.24 * (temp - 89075);
        temp = 89075;
    }
    if (temp > 41775) {
        incomeTax += 0.22 * (temp - 41775);
        temp = 41775;
    }
    if (temp > 10275) {
        incomeTax += 0.12 * (temp - 10275);
        temp = 10275;
    }
    incomeTax += 0.1 * temp;  // Final bracket

    // Total tax
    const totalTax = incomeTax + taxes.ssTax + taxes.mTax;

    // Display results
    const yearlySalaryAfterTax = salary - totalTax;
    alert(
        `Yearly Salary After Tax: ${yearlySalaryAfterTax.toFixed(2)}\n` +
        `Gross Monthly: ${(salary / 12).toFixed(2)}\n` +
        `Monthly After Tax: ${(yearlySalaryAfterTax / 12).toFixed(2)}\n\n` +
        `Social Security Tax: ${taxes.ssTax.toFixed(2)}\n` +
        `Medicare Tax: ${taxes.mTax.toFixed(2)}\n` +
        `Federal Income Tax: ${incomeTax.toFixed(2)}`
    );
}
