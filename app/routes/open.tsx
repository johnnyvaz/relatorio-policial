import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, Outlet, useLoaderData, useActionData } from "@remix-run/react";
import Menu from "~/components/menu";
import type { Header } from "~/models/report.header.server";
import { getReportHeaderListItems } from "~/models/report.header.server";
import { updatePhone } from "~/models/user.server";
import { requireUserId, getSessionFlash, getSession, sessionStorage } from "~/session.server"
import type { ActionArgs } from "@remix-run/node"
import { useEffect, useRef } from "react";
import type { FlashMessage as FlashMessageType } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  reportListItems: Header[];
  message: FlashMessageType;
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const reportListItems = await getReportHeaderListItems({ userId });
  const flash = await getSessionFlash(request);
  if (flash && flash.message) {
    return json({ message: flash.message }, { headers: flash.headers });
  }

  return json({ reportListItems, message: null });
};


export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.phone, "noteId not found");

  await updatePhone({ userId, id: params.phone });

  return redirect("/notes");
};

export default function ReportsPage() {
  const loaderData = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Menu />
      <main className="flex h-full bg-white">
        {loaderData.reportListItems.length === 0 ? (
          <div className="flex w-full flex-col gap-1 p-10">
            <div>
              <div>

           
              <label className="flex w-full flex-col gap-1">
                <span>Opa, Você não tem acesso, envie seu numero de whatsapp que entraremos em contato</span>
                <input

                  name="phone"
                  className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                ></input>
              </label>
            </div>
            <Form method="post">
              <button
                type="submit"
                className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Enviar
              </button>
            </Form>
            </div>
          </div>
        ) : (
          <ol>
            {loaderData.reportListItems.map((report) => (
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
