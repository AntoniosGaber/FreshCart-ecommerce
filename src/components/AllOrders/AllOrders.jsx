import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
 
export default function AllOrders() { 
  const[orders, setOrders] = useState([]); 
  const token = localStorage.getItem("userToken");
  

  const decoded = jwtDecode(token);
  const userId = decoded.id;

  async function userOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        
        
      );
      setOrders(data);

      console.log("hello my all orders", data);
    } catch (error) {
      console.log("userOrders error:", error?.response?.data || error);
    }
  }

  useEffect(() => {
    userOrders();
  }, []);

  return <> 
   
 <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
  {/* Header */}
  <div className="flex items-center justify-between gap-3">
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">My Orders</h2>
    <span className="text-xs sm:text-sm text-gray-500">
      {orders?.length || 0} orders
    </span>
  </div>

  <div className="space-y-4">
    {orders.map((order) => {
      const shortId = `${order._id?.slice(0, 8)}…${order._id?.slice(-6)}`;
      const created = new Date(order.createdAt).toLocaleString();

      return (
        <div
          key={order._id}
          className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Order</p>

                <div className="flex items-center gap-2 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {shortId}
                  </p>

                  {/* Optional: copy full id */}
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(order._id)}
                    className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
                    title="Copy full Order ID"
                  >
                    Copy
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {created}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <p className="text-sm text-gray-500 sm:hidden">Total</p>
                <p className="text-lg font-bold whitespace-nowrap">
                  {order.totalOrderPrice} EGP
                </p>
              </div>
            </div>

            {/* Badges + Payment */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Payment</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.paymentMethodType}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      order.isPaid
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>

                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      order.isDelivered
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-yellow-50 text-yellow-800 border-yellow-200"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-3 lg:col-span-1 sm:col-span-2">
                <p className="text-xs text-gray-500">Shipping</p>
                <p className="text-sm text-gray-900 break-words mt-1">
                  {order.shippingAddress?.city || "—"} —{" "}
                  {order.shippingAddress?.details || "—"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Phone: {order.shippingAddress?.phone || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Items (Collapsible on mobile = pro) */}
          <details className="group">
            <summary className="cursor-pointer select-none px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-gray-900">
                Items ({order.cartItems?.length || 0})
              </span>
              <span className="text-xs text-gray-500 group-open:hidden">
                Tap to expand
              </span>
              <span className="text-xs text-gray-500 hidden group-open:inline">
                Tap to collapse
              </span>
            </summary>

            <div className="px-4 sm:px-5 pb-4 space-y-3">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border p-3"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product?.imageCover}
                      alt={item.product?.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0 border"
                      loading="lazy"
                    />

                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.product?.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.price} EGP{" "}
                        <span className="text-gray-400">×</span> {item.count}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <p className="text-sm text-gray-500 sm:hidden">
                      Item total
                    </p>
                    <p className="font-semibold whitespace-nowrap">
                      {item.price * item.count} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      );
    })}
  </div>
</div>


  
  
  
  </>
}
