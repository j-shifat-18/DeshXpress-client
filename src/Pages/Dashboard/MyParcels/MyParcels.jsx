import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch parcels
  const { data: parcels = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Cancel parcel mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/parcels/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Parcel cancelled!", timer: 1200, showConfirmButton: false });
      refetch();
    },
    onError: (err) => {
      Swal.fire({ icon: "error", title: "Failed to cancel parcel", text: err?.response?.data?.message || "Try again later." });
    }
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this parcel? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (parcel) => {
    Swal.fire({
      title: "Update Parcel",
      text: "Update functionality coming soon!",
      icon: "info"
    });
  };

  const handlePay = (parcel) => {
    navigate(`/dashboard/payment/${parcel._id}`)
  };

  return (
    <div className=" bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">My Parcels</h2>
      {isLoading && <div className="py-8 text-center text-lg">Loading your parcels...</div>}
      {isError && <div className="text-red-500 py-8 text-center">Error: {error?.message || "Failed to load parcels."}</div>}
      {!isLoading && parcels.length === 0 && <div className="py-8 text-center text-gray-500">No parcels found.</div>}
      {!isLoading && parcels.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>Tracking ID</th>
                <th>Type</th>
                <th>Title</th>
                <th>Sender District</th>
                <th>Receiver District</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel._id} className="border-b">
                  <td className="font-mono text-xs">{parcel.trackingId}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.parcelTitle}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>{parcel.status || "Pending"}</td>
                  <td>{parcel.created_at ? new Date(parcel.created_at).toLocaleString() : "-"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleCancel(parcel._id)}
                      disabled={cancelMutation.isLoading}
                    >
                      {cancelMutation.isLoading ? "Cancelling..." : "Cancel"}
                    </button>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleUpdate(parcel)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handlePay(parcel)}
                      disabled={parcel.status==='paid'}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels; 