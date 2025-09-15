import React, { useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../App";
import { mockUser, mockTransactions, mockChartData } from "../data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Plus,
  Eye,
  Send
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Calculate stats from mock data
  const completedPayments = mockTransactions.filter(t => t.status === "completed").length;
  const pendingPayments = mockTransactions.filter(t => t.status === "pending").length;
  const totalSent = mockTransactions
    .filter(t => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = mockTransactions
    .filter(t => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const recentTransactions = mockTransactions.slice(0, 5);

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="relative overflow-hidden border-0 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-slate-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
        {change && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            <span className={`inline-flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <ArrowDownLeft className="w-3 h-3 mr-1" />}
              {change}
            </span>
            {" "}from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          transaction.type === "sent" 
            ? "bg-red-100 dark:bg-red-900/20" 
            : "bg-green-100 dark:bg-green-900/20"
        }`}>
          {transaction.type === "sent" ? (
            <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
          ) : (
            <ArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            {transaction.type === "sent" ? "Sent to" : "Received from"} {transaction.recipient}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {transaction.description}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${
          transaction.type === "sent" 
            ? "text-red-600 dark:text-red-400" 
            : "text-green-600 dark:text-green-400"
        }`}>
          {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={transaction.status === "completed" ? "default" : "secondary"}
            className="text-xs"
          >
            {transaction.status}
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's what's happening with your finances today.
              </p>
            </div>
            <div className="hidden sm:flex space-x-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </Button>
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
                <Plus className="w-4 h-4 mr-2" />
                Request Payment
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={`$${mockUser.balance.toLocaleString()}`}
            change="+12.3%"
            trend="up"
            icon={DollarSign}
          />
          <StatCard
            title="Completed Payments"
            value={completedPayments}
            change="+8.2%"
            trend="up"
            icon={TrendingUp}
          />
          <StatCard
            title="Pending Payments"
            value={pendingPayments}
            change="-2.1%"
            trend="down"
            icon={Clock}
          />
          <StatCard
            title="Monthly Spending"
            value={`$${totalSent.toLocaleString()}`}
            change="+5.7%"
            trend="up"
            icon={ArrowUpRight}
          />
        </div>

        {/* Quick Actions & Recent Transactions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>
                Manage your payments and finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
                <Send className="w-4 h-4 mr-2" />
                Send Payment
              </Button>
              <Button variant="outline" className="w-full justify-start border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Request Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest payment activity
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                View all
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Balance Overview */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Balance Overview</CardTitle>
            <CardDescription>
              Your account balance and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  ${mockUser.balance.toLocaleString()}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Current Balance</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  +${totalReceived.toLocaleString()}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Money Received</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  -${totalSent.toLocaleString()}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Money Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;