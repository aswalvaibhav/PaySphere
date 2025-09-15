// Mock data for PaySphere application

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  balance: 12450.75,
  accountNumber: "****1234"
};

export const mockTransactions = [
  {
    id: 1,
    type: "sent",
    recipient: "Sarah Johnson",
    amount: 150.00,
    date: "2024-07-15",
    status: "completed",
    category: "food",
    description: "Dinner payment"
  },
  {
    id: 2,
    type: "received",
    recipient: "Mike Chen",
    amount: 320.50,
    date: "2024-07-14",
    status: "completed",
    category: "work",
    description: "Freelance payment"
  },
  {
    id: 3,
    type: "sent",
    recipient: "Netflix",
    amount: 15.99,
    date: "2024-07-13",
    status: "completed",
    category: "entertainment",
    description: "Monthly subscription"
  },
  {
    id: 4,
    type: "sent",
    recipient: "Uber",
    amount: 23.45,
    date: "2024-07-12",
    status: "completed",
    category: "transport",
    description: "Ride to airport"
  },
  {
    id: 5,
    type: "received",
    recipient: "Emma Wilson",
    amount: 75.00,
    date: "2024-07-11",
    status: "pending",
    category: "personal",
    description: "Split dinner bill"
  },
  {
    id: 6,
    type: "sent",
    recipient: "Amazon",
    amount: 89.99,
    date: "2024-07-10",
    status: "completed",
    category: "shopping",
    description: "Online purchase"
  },
  {
    id: 7,
    type: "sent",
    recipient: "Starbucks",
    amount: 12.50,
    date: "2024-07-09",
    status: "completed",
    category: "food",
    description: "Morning coffee"
  },
  {
    id: 8,
    type: "received",
    recipient: "David Kim",
    amount: 200.00,
    date: "2024-07-08",
    status: "completed",
    category: "personal",
    description: "Loan repayment"
  }
];

export const mockChartData = {
  monthlySpending: [
    { month: "Jan", amount: 2450 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 2800 },
    { month: "Apr", amount: 3500 },
    { month: "May", amount: 2900 },
    { month: "Jun", amount: 3800 },
    { month: "Jul", amount: 3200 }
  ],
  balanceHistory: [
    { date: "2024-07-01", balance: 10200 },
    { date: "2024-07-05", balance: 11500 },
    { date: "2024-07-10", balance: 12800 },
    { date: "2024-07-15", balance: 12450 }
  ],
  categorySpending: [
    { category: "Food", amount: 890, color: "#22c55e" },
    { category: "Transport", amount: 450, color: "#3b82f6" },
    { category: "Entertainment", amount: 320, color: "#f59e0b" },
    { category: "Shopping", amount: 650, color: "#ef4444" },
    { category: "Utilities", amount: 280, color: "#8b5cf6" }
  ]
};

export const mockAuth = {
  login: (email, password) => {
    // Simple mock authentication
    if (email === "john.doe@example.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }
    return { success: false, error: "Invalid credentials" };
  },
  
  signup: (name, email, password) => {
    // Mock signup - always succeeds
    const newUser = { ...mockUser, name, email };
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  },
  
  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  },
  
  isAuthenticated: () => {
    return localStorage.getItem("isAuthenticated") === "true";
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
};

export const mockPaymentActions = {
  sendPayment: (recipient, amount, description) => {
    const newTransaction = {
      id: Date.now(),
      type: "sent",
      recipient,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      status: "completed",
      category: "personal",
      description
    };
    
    // Update mock transactions
    mockTransactions.unshift(newTransaction);
    return { success: true, transaction: newTransaction };
  },
  
  requestPayment: (recipient, amount, description) => {
    const newTransaction = {
      id: Date.now(),
      type: "received",
      recipient,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      category: "personal",
      description
    };
    
    mockTransactions.unshift(newTransaction);
    return { success: true, transaction: newTransaction };
  }
};