import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Header } from "~/models/report.header.server";
import { getReportHeaderListItems } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

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

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Novo Relatório
          </Link>

          <hr />

          {data.reportListItems.length === 0 ? (
            <p className="p-4">vazio</p>
          ) : (
            <ol>
              {data.reportListItems.map((report) => (
                <li key={report.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={report.id}
                  >
                    📝 {report.id}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Relatório</Link>
      </h1>
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Sair
        </button>
      </Form>
    </header>
  );
}
