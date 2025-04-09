
import React from 'react';

type OrderStatus = 'pending' | 'approved' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'approved':
        return 'status-badge bg-blue-100 text-blue-800';
      case 'preparing':
        return 'status-badge status-preparing';
      case 'ready':
        return 'status-badge status-ready';
      case 'delivered':
        return 'status-badge status-delivered';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown Status';
    }
  };

  return <span className={getStatusClasses()}>{getStatusText()}</span>;
};

export default OrderStatusBadge;
