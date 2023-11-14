import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";


export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const id:string = params.reportId;
  const updates = Object.fromEntries(await request.formData());
  invariant(id, "sem id configurado" + JSON.stringify(updates));
  const encarregado = updates.encarregado
  await updateReportHeader( id,userId, encarregado);
  console.log(" result -> " + JSON.stringify(encarregado))
  return json(updates);
};
