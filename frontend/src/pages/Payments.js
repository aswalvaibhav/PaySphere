import React, { useState, useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { mockTransactions, mockPaymentActions } from "../data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  Plus, 
  Search,
  Filter,
  Calendar,
  DollarSign
} from "lucide-react";

const Payments = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    recipient: "",
    amount: "",
    description: ""
  });
  const [requestForm, setRequestForm] = useState({
    recipient: "",
    amount: "",
    description: ""
  });

  const { toast } = useToast();

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    const matchesType = filterType === "all" || transaction.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSendPayment = async (e) => {
    e.preventDefault();
    
    if (!paymentForm.recipient || !paymentForm.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = mockPaymentActions.sendPayment(
        paymentForm.recipient,
        paymentForm.amount,
        paymentForm.description
      );

      if (result.success) {
        setTransactions([result.transaction, ...transactions]);
        setPaymentForm({ recipient: "", amount: "", description: "" });
        setIsPaymentDialogOpen(false);
        
        toast({
          title: "Payment sent!",
          description: `Successfully sent $${paymentForm.amount} to ${paymentForm.recipient}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequestPayment = async (e) => {
    e.preventDefault();
    
    if (!requestForm.recipient || !requestForm.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = mockPaymentActions.requestPayment(
        requestForm.recipient,
        requestForm.amount,
        requestForm.description
      );

      if (result.success) {
        setTransactions([result.transaction, ...transactions]);
        setRequestForm({ recipient: "", amount: "", description: "" });
        setIsRequestDialogOpen(false);
        
        toast({
          title: "Payment requested!",
          description: `Successfully requested $${requestForm.amount} from ${requestForm.recipient}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 mb-3">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          transaction.type === "sent" 
            ? "bg-red-100 dark:bg-red-900/20" 
            : "bg-green-100 dark:bg-green-900/20"
        }`}>
          {transaction.type === "sent" ? (
            <ArrowUpRight className="w-6 h-6 text-red-600 dark:text-red-400" />
          ) : (
            <ArrowDownLeft className="w-6 h-6 text-green-600 dark:text-green-400" />
          )}
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {transaction.type === "sent" ? "Sent to" : "Received from"} {transaction.recipient}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {transaction.description}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-bold ${
          transaction.type === "sent" 
            ? "text-red-600 dark:text-red-400" 
            : "text-green-600 dark:text-green-400"
        }`}>
          {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
        </p>
        <Badge 
          variant={transaction.status === "completed" ? "default" : "secondary"}
          className="text-xs mt-1"
        >
          {transaction.status}
        </Badge>
      </div>
    </div>
  );

  const PaymentDialog = ({ type, isOpen, setIsOpen, form, setForm, onSubmit, title, description }) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient name or email"
              value={form.recipient}
              onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this payment for?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              {type === "send" ? (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Payment
                </>
              ) : (
                <>
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Request Payment
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payments</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Send money, request payments, and manage your transactions.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
                  <Plus className="w-4 h-4 mr-2" />
                  Request Payment
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Payment Dialogs */}
        <PaymentDialog
          type="send"
          isOpen={isPaymentDialogOpen}
          setIsOpen={setIsPaymentDialogOpen}
          form={paymentForm}
          setForm={setPaymentForm}
          onSubmit={handleSendPayment}
          title="Send Payment"
          description="Send money to anyone instantly"
        />

        <PaymentDialog
          type="request"
          isOpen={isRequestDialogOpen}
          setIsOpen={setIsRequestDialogOpen}
          form={requestForm}
          setForm={setRequestForm}
          onSubmit={handleRequestPayment}
          title="Request Payment"
          description="Request money from someone"
        />

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
            <CardDescription>
              View and manage all your payment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No transactions found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {searchTerm || filterStatus !== "all" || filterType !== "all"
                      ? "Try adjusting your search or filters"
                      : "Start by sending your first payment"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payments;