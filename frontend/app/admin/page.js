import { Suspense } from "react";
import AdminDashboardContent from "./AdminDashboardContent";
import Loader from "@/components/ui/Loader";

export const metadata = {
  title: "Admin Control Center",
  description: "Deshiyo Travels backoffice management dashboard for tour packages and bookings.",
};

export default function AdminPage() {
  return (
    <Suspense fallback={<Loader type="page" text="Loading admin control center..." />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
