import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      {isLoading && <div className="py-8 text-center text-lg">Loading your payment history...</div>}
      {isError && <div className="text-red-500 py-8 text-center">Error: {error?.message || "Failed to load payment history."}</div>}
      {!isLoading && payments.length === 0 && <div className="py-8 text-center text-gray-500">No payment history found.</div>}
      {!isLoading && payments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Payment Method(s)</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id} className="border-b">
                  <td className="font-mono text-xs">{payment.transactionId}</td>
                  <td>৳{payment.amount}</td>
                  <td>{Array.isArray(payment.paymentMethod) ? payment.paymentMethod.join(", ") : payment.paymentMethod}</td>
                  <td>{payment.paid_at ? new Date(payment.paid_at).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;