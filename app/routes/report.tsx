import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import Menu from "~/components/menu";
import type { Header } from "~/models/report.header.server";
import { getReportHeaderListItems } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import { useLocation } from "@remix-run/react";
import { createRelatorio } from "~/models/report.header.server";

type LoaderData = {
  reportListItems: Header[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const reportListItems = await getReportHeaderListItems({ userId });
  return json({ reportListItems });
};

export default function ReportsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const location = useLocation();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Menu />
      
      <div className="flex-1 p-6">
          <Outlet />
        </div>
    </div>
  );
}

