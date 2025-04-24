class CalculationService {
    // Fixed Deposit Calculation
    calculateFD(principal, annualRate, tenureYears, compoundingFreq) {
      const rate = annualRate / 100;
      const periods = tenureYears * compoundingFreq;
      const periodicRate = rate / compoundingFreq;
      
      const maturityAmount = principal * Math.pow(1 + periodicRate, periods);
      const totalInterest = maturityAmount - principal;
      
      // Generate yearly breakdown
      const breakdown = [];
      for (let year = 1; year <= tenureYears; year++) {
        const yearPeriods = year * compoundingFreq;
        const yearAmount = principal * Math.pow(1 + periodicRate, yearPeriods);
        breakdown.push({
          year,
          principal: principal,
          interest: yearAmount - principal,
          total: yearAmount
        });
      }
      
      return {
        principal,
        annualRate,
        tenureYears,
        compoundingFreq,
        maturityAmount: parseFloat(maturityAmount.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        breakdown
      };
    }
  
    // Loan EMI Calculation
    calculateEMI(principal, annualRate, tenureYears) {
      const monthlyRate = annualRate / 100 / 12;
      const months = tenureYears * 12;
      
      const emi = principal * monthlyRate * 
                 Math.pow(1 + monthlyRate, months) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
      
      const totalPayment = emi * months;
      const totalInterest = totalPayment - principal;
      
      // Generate amortization schedule
      const schedule = [];
      let balance = principal;
      
      for (let month = 1; month <= months; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance -= principalPaid;
        
        schedule.push({
          month,
          emi: parseFloat(emi.toFixed(2)),
          principal: parseFloat(principalPaid.toFixed(2)),
          interest: parseFloat(interest.toFixed(2)),
          balance: Math.abs(parseFloat(balance.toFixed(2)))
        });
      }
      
      return {
        principal,
        annualRate,
        tenureYears,
        emi: parseFloat(emi.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        schedule
      };
    }
  }
  
  module.exports = new CalculationService();