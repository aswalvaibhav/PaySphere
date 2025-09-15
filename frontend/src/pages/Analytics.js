import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { mockChartData, mockTransactions } from "../data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Target,
  PieChart as PieChartIcon
} from "lucide-react";

const Analytics = () => {
  // Calculate analytics data
  const totalSpent = mockTransactions
    .filter(t => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalReceived = mockTransactions
    .filter(t => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const avgTransactionAmount = mockTransactions.length > 0 
    ? mockTransactions.reduce((sum, t) => sum + t.amount, 0) / mockTransactions.length 
    : 0;

  // Category spending calculation
  const categorySpending = mockTransactions
    .filter(t => t.type === "sent" && t.status === "completed")
    .reduce((acc, transaction) => {
      const category = transaction.category || "other";
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

  const categoryData = Object.entries(categorySpending).map(([category, amount], index) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount,
    color: mockChartData.categorySpending[index]?.color || "#8b5cf6"
  }));

  // Monthly trend data
  const monthlyData = mockChartData.monthlySpending.map(item => ({
    ...item,
    received: Math.floor(Math.random() * 2000) + 1500, // Mock received data
    sent: item.amount
  }));

  const StatCard = ({ title, value, change, icon: Icon, trend, description }) => (
    <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-slate-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {value}
        </div>
        {change && (
          <div className="flex items-center space-x-2">
            <Badge 
              variant={trend === 'up' ? 'default' : 'secondary'}
              className={`text-xs ${
                trend === 'up' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {change}
            </Badge>
          </div>
        )}
        {description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Insights into your spending patterns and financial trends.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Spent"
            value={`$${totalSpent.toLocaleString()}`}
            change="+12.3%"
            trend="up"
            icon={ArrowUpRight}
            description="This month"
          />
          <StatCard
            title="Total Received"
            value={`$${totalReceived.toLocaleString()}`}
            change="+8.7%"
            trend="up"
            icon={ArrowDownLeft}
            description="This month"
          />
          <StatCard
            title="Avg. Transaction"
            value={`$${avgTransactionAmount.toFixed(2)}`}
            change="-2.1%"
            trend="down"
            icon={DollarSign}
            description="Per transaction"
          />
          <StatCard
            title="Transactions"
            value={mockTransactions.length}
            change="+15.2%"
            trend="up"
            icon={Target}
            description="This month"
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Spending Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="balance">Balance History</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Monthly Spending vs Income</span>
                </CardTitle>
                <CardDescription>
                  Compare your monthly spending and received payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        className="text-slate-600 dark:text-slate-400"
                      />
                      <YAxis className="text-slate-600 dark:text-slate-400" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="sent" 
                        fill="#ef4444" 
                        name="Spent"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="received" 
                        fill="#22c55e" 
                        name="Received"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChartIcon className="w-5 h-5 text-emerald-600" />
                    <span>Spending by Category</span>
                  </CardTitle>
                  <CardDescription>
                    Breakdown of your expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="amount"
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>
                    Detailed spending by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => {
                      const percentage = (category.amount / totalSpent * 100).toFixed(1);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="font-medium text-slate-900 dark:text-white">
                              {category.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-slate-900 dark:text-white">
                              ${category.amount.toFixed(2)}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="balance" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Balance History</span>
                </CardTitle>
                <CardDescription>
                  Track your account balance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData.balanceHistory}>
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="date" 
                        className="text-slate-600 dark:text-slate-400"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis className="text-slate-600 dark:text-slate-400" />
                      <Tooltip 
                        content={<CustomTooltip />}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#balanceGradient)"
                        name="Balance"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;