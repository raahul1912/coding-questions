

class FinancialTracker {
  constructor() {
    this.transactions = [];
  }

  addTransaction(amount, type, description = '') {
    if (!['income', 'expense'].includes(type)) {
      throw new Error('Type must be "income" or "expense"');
    }
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Amount must be a valid number');
    }

    this.transactions.push({ amount, type, description });
  }

  getAllTransactions() {
    return this.transactions;
  }

  getTotalIncome() {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpense() {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  getSummary() {
    return {
      totalIncome: this.getTotalIncome(),
      totalExpense: this.getTotalExpense(),
      balance: this.getBalance()
    };
  }
}

module.exports = FinancialTracker;

// Example usage:
const t = new FinancialTracker();
t.addTransaction(500, 'income');
t.addTransaction(200, 'expense');
console.log(t.getSummary());

// { totalIncome: 500, totalExpense: 200, balance: 300 }