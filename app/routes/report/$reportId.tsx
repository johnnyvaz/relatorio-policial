import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { updateReportHeader, getReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { Header } from "~/models/report.header.server";

type LoaderData = {
  report: Header;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.reportId, "Relatório não encontrado");
  const report = await getReportHeader({ userId, id: params.reportId });
  if (!report) {
    throw new Response("Não encontrado", { status: 404 });
  }

  return json({ report });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const id = params.reportId;
  const formData = await request.formData();
  const quartoDas = formData.get("quartoDas");
  const date = formData.get("date");
  const viatura = formData.get("viatura");
  const encarregado = formData.get("encarregado");
  return redirect(`/report/${id}`);

};

export default function ReportDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const fetcher = useFetcher();
  
  return (
    <div>

      {/* <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Quarto Das: </span>
          <input
            name="quartoDas"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Encarregado: </span>
          <input
            value={data.report.encarregado}
            defaultValue={data.report.encarregado}
            name="encarregado"
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
          ></input>
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form> */}

      <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Encarregado</th>
          </tr>
        </thead>
        <tbody>
          <tr key={data.report.id} className="bg-gray-100">
            <td className="px-4 py-2 ">
              <div
                className="text-xl p-1"
                onBlur={(e) => {
                  const address = String(e.currentTarget.textContent).trim();
                  if (address !== data.report.encarregado) {
                    fetcher.submit(
                      { encarregado: String(e.target.textContent) },
                      {
                        action: `/report/${data.report.id}/update`,
                        method: "post",
                      }
                    );
                  }
                }}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: fetcher.submission
                    ? (fetcher.submission.formData.get("encarregado") as string)
                    : data.report.encarregado,
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

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
