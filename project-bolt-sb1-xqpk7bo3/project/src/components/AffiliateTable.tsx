import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash, ExternalLink, Check, X } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface AffiliateTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationProps;
  actionButtons?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </div>
      <div className="flex">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center p-2 text-gray-500 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center justify-center h-8 w-8 mx-1 text-sm rounded-md ${
              currentPage === page
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center p-2 text-gray-500 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AffiliateTable<T extends { id: string | number }>({
  data,
  columns,
  pagination,
  actionButtons = { edit: false, delete: false, view: false },
  onEdit,
  onDelete,
  onView,
}: AffiliateTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);
  const itemsPerPage = pagination?.itemsPerPage || data.length;
  
  const paginatedData = pagination
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
            {(actionButtons.edit || actionButtons.delete || actionButtons.view) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((item) => (
            <tr key={item.id.toString()} className="hover:bg-gray-50 transition-colors">
              {columns.map((column, index) => (
                <td key={index} className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                  {typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : (item[column.accessor] as React.ReactNode)}
                </td>
              ))}
              {(actionButtons.edit || actionButtons.delete || actionButtons.view) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                  {actionButtons.view && (
                    <button
                      onClick={() => onView && onView(item)}
                      className="text-gray-500 hover:text-primary p-1 rounded-md hover:bg-gray-100"
                    >
                      <ExternalLink size={16} />
                    </button>
                  )}
                  {actionButtons.edit && (
                    <button
                      onClick={() => onEdit && onEdit(item)}
                      className="text-gray-500 hover:text-primary p-1 rounded-md hover:bg-gray-100"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {actionButtons.delete && (
                    <button
                      onClick={() => onDelete && onDelete(item)}
                      className="text-gray-500 hover:text-error p-1 rounded-md hover:bg-gray-100"
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actionButtons.edit || actionButtons.delete || actionButtons.view ? 1 : 0)}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && (
        <div className="px-6 py-3 border-t">
          <Pagination
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              pagination.onPageChange(page);
            }}
          />
        </div>
      )}
    </div>
  );
}

// Status badge component for tables
export const StatusBadge = ({ status }: { status: 'active' | 'pending' | 'inactive' | 'approved' | 'rejected' }) => {
  const statusStyles = {
    active: 'bg-green-100 text-success',
    pending: 'bg-yellow-100 text-warning',
    inactive: 'bg-gray-100 text-gray-600',
    approved: 'bg-green-100 text-success',
    rejected: 'bg-red-100 text-error'
  };

  const icons = {
    active: <Check size={12} className="mr-1" />,
    pending: null,
    inactive: <X size={12} className="mr-1" />,
    approved: <Check size={12} className="mr-1" />,
    rejected: <X size={12} className="mr-1" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default AffiliateTable;