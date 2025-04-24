document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-form`).classList.add('active');
      });
    });
    
    // FD Calculator
    const fdForm = document.getElementById('fd-calculator');
    fdForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const principal = parseFloat(document.getElementById('fd-principal').value);
      const rate = parseFloat(document.getElementById('fd-rate').value);
      const tenure = parseInt(document.getElementById('fd-tenure').value);
      const compounding = parseInt(document.getElementById('fd-compounding').value);
      
      try {
        const response = await fetch('/api/fd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            principal,
            annualRate: rate,
            tenureYears: tenure,
            compoundingFreq: compounding
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          displayFDResults(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while calculating FD');
      }
    });
    
    function displayFDResults(data) {
      document.getElementById('fd-maturity-amount').textContent = data.maturityAmount.toFixed(2);
      document.getElementById('fd-total-interest').textContent = data.totalInterest.toFixed(2);
      
      const tbody = document.querySelector('#fd-breakdown tbody');
      tbody.innerHTML = '';
      
      data.breakdown.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.year}</td>
          <td>${row.principal.toFixed(2)}</td>
          <td>${row.interest.toFixed(2)}</td>
          <td>${row.total.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });
      
      document.getElementById('fd-results').classList.remove('hidden');
    }
    
    // Loan Calculator
    const loanForm = document.getElementById('loan-calculator');
    loanForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const principal = parseFloat(document.getElementById('loan-principal').value);
      const rate = parseFloat(document.getElementById('loan-rate').value);
      const tenure = parseInt(document.getElementById('loan-tenure').value);
      
      try {
        const response = await fetch('/api/loan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            principal,
            annualRate: rate,
            tenureYears: tenure
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          displayLoanResults(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while calculating loan EMI');
      }
    });
    
    function displayLoanResults(data) {
      document.getElementById('loan-emi').textContent = data.emi.toFixed(2);
      document.getElementById('loan-total-payment').textContent = data.totalPayment.toFixed(2);
      document.getElementById('loan-total-interest').textContent = data.totalInterest.toFixed(2);
      
      const tbody = document.querySelector('#loan-schedule tbody');
      tbody.innerHTML = '';
      
      // Show only first 12 months for brevity
      const monthsToShow = data.schedule.slice(0, 12);
      
      monthsToShow.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.month}</td>
          <td>${row.emi.toFixed(2)}</td>
          <td>${row.principal.toFixed(2)}</td>
          <td>${row.interest.toFixed(2)}</td>
          <td>${row.balance.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });
      
      document.getElementById('loan-results').classList.remove('hidden');
    }
  });