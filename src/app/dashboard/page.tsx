import DashboardClient from "@/components/admin-panel/dashboard-client";
import { fetchAccountDetails } from "../actions/fetchAccountDetails";

export default async function DashboardPage() {
  const { user } = await fetchAccountDetails();

  return <DashboardClient username={user?.firstName ?? "Anonymous"} />;
}
