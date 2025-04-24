const calculationService = require('../src/services/calculationService');

describe('Loan EMI Calculations', () => {
  test('should calculate EMI for standard loan', () => {
    const result = calculationService.calculateEMI(100000, 10, 5);
    expect(result.emi).toBeCloseTo(2124.7, 1);
    expect(result.totalPayment).toBeCloseTo(127482, 0);
    expect(result.totalInterest).toBeCloseTo(27482, 0);
    expect(result.schedule.length).toBe(60);
  });

  test('should calculate EMI for short-term loan', () => {
    const result = calculationService.calculateEMI(50000, 8, 1);
    expect(result.emi).toBeCloseTo(4347.1, 1);
    expect(result.totalPayment).toBeCloseTo(52165.2, 0);
    expect(result.totalInterest).toBeCloseTo(2165.2, 0);
  });

  test('should handle zero interest loan', () => {
    const result = calculationService.calculateEMI(10000, 0, 1);
    expect(result.emi).toBeCloseTo(833.33, 2);
    expect(result.totalInterest).toBe(0);
  });
});