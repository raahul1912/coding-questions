// tests/tracker.test.js

const FinancialTracker = require('./financial-tracker');

describe('FinancialTracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new FinancialTracker();
  });

  test('should add income and expense transactions correctly', () => {
    tracker.addTransaction(1000, 'income', 'Salary');
    tracker.addTransaction(200, 'expense', 'Groceries');

    const all = tracker.getAllTransactions();
    expect(all.length).toBe(2);
    expect(all[0]).toEqual({ amount: 1000, type: 'income', description: 'Salary' });
    expect(all[1]).toEqual({ amount: 200, type: 'expense', description: 'Groceries' });
  });

  test('should calculate total income and expenses correctly', () => {
    tracker.addTransaction(1500, 'income');
    tracker.addTransaction(500, 'expense');
    tracker.addTransaction(300, 'expense');
    tracker.addTransaction(200, 'income');

    expect(tracker.getTotalIncome()).toBe(1700);
    expect(tracker.getTotalExpense()).toBe(800);
  });

  test('should calculate balance correctly', () => {
    tracker.addTransaction(1000, 'income');
    tracker.addTransaction(400, 'expense');
    expect(tracker.getBalance()).toBe(600);
  });

  test('should return summary correctly', () => {
    tracker.addTransaction(2000, 'income');
    tracker.addTransaction(500, 'expense');
    tracker.addTransaction(200, 'expense');

    const summary = tracker.getSummary();
    expect(summary).toEqual({
      totalIncome: 2000,
      totalExpense: 700,
      balance: 1300
    });
  });

  test('should throw error for invalid type or amount', () => {
    expect(() => tracker.addTransaction('1000', 'income')).toThrow();
    expect(() => tracker.addTransaction(100, 'profit')).toThrow();
  });
});
