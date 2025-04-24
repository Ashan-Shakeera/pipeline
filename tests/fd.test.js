const calculationService = require('../src/services/calculationService');

describe('Fixed Deposit Calculations', () => {
  test('should calculate FD with annual compounding', () => {
    const result = calculationService.calculateFD(10000, 5, 2, 1);
    expect(result.maturityAmount).toBeCloseTo(11025, 2);
    expect(result.totalInterest).toBeCloseTo(1025, 2);
    expect(result.breakdown.length).toBe(2);
  });

  test('should calculate FD with monthly compounding', () => {
    const result = calculationService.calculateFD(10000, 5, 1, 12);
    expect(result.maturityAmount).toBeCloseTo(10511.62, 2);
    expect(result.totalInterest).toBeCloseTo(511.62, 2);
  });

  test('should handle zero principal', () => {
    const result = calculationService.calculateFD(0, 5, 1, 1);
    expect(result.maturityAmount).toBe(0);
    expect(result.totalInterest).toBe(0);
  });
});