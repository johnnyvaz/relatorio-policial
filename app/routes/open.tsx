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
      <main className="flex h-full bg-white">
          {data.reportListItems.length === 0 ? (
           <div>Erro ,,,</div>
          ) : (
            <ol>
              {data.reportListItems.map((report) => (
                <li key={report.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={"/report/" + report.id}
                  >
                    📝 Abrir relatório 
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
      </main>
      <div className="flex-1 p-6">
          <Outlet />
        </div>
    </div>
  );
}
