const calculationService = require('../services/calculationService');

exports.calculateFD = (req, res) => {
  try {
    const { principal, annualRate, tenureYears, compoundingFreq } = req.body;
    
    // Validate inputs
    if (!principal || !annualRate || !tenureYears || !compoundingFreq) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const result = calculationService.calculateFD(
      parseFloat(principal),
      parseFloat(annualRate),
      parseInt(tenureYears),
      parseInt(compoundingFreq)
    );
    
    res.json(result);
  } catch (error) {
    console.error('FD Calculation Error:', error);
    res.status(500).json({ error: 'Error in FD calculation' });
  }
};