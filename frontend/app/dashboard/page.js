import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import Loader from "@/components/ui/Loader";

export const metadata = {
  title: "My Dashboard & Bookings",
  description: "View and manage your tour reservations with Deshiyo Travels.",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader type="page" text="Loading your dashboard..." />}>
      <DashboardContent />
    </Suspense>
  );
}
