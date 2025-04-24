const calculationService = require('../services/calculationService');

exports.calculateEMI = (req, res) => {
  try {
    const { principal, annualRate, tenureYears } = req.body;
    
    // Validate inputs
    if (!principal || !annualRate || !tenureYears) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const result = calculationService.calculateEMI(
      parseFloat(principal),
      parseFloat(annualRate),
      parseInt(tenureYears)
    );
    
    res.json(result);
  } catch (error) {
    console.error('EMI Calculation Error:', error);
    res.status(500).json({ error: 'Error in EMI calculation' });
  }
};