import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { deleteReport, getReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { Header } from "~/models/report.header.server";

type LoaderData = {
  report: Header;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.reportId, "Relatório não encontrado");
  console.log("aqui" + params.reportId)
  const report = await getReportHeader({ userId, id: params.reportId });
  if (!report) {
    throw new Response("Não encontrado", { status: 404 });
  }

  return json({ report });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.reportId, "relatório não encontrado");

  await deleteReport({ userId, id: params.reportId });

  return redirect("/report");
};

export default function ReportDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.report.encarregado}</h3>
      <p className="py-6">{data.report.date}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>Um erro inesperado ocorreu: <tr></tr><br />  {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Erro desconhecido</h1>;
  }

  if (error.status === 404) {
    return <div>ID não encontrao</div>;
  }

  return <div>Um erro inesperado ocorreu: <br /> {error.statusText}</div>;
}
