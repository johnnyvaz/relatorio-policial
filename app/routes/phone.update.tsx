import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updatePhone } from "~/models/user.server";
import { requireUserId } from "~/session.server";


export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const updates = Object.fromEntries(await request.formData());
  invariant(userId, "sem id configurado" + JSON.stringify(updates));
  const phone = updates.phone
  await updatePhone( userId, phone);
  console.log(" result -> " + JSON.stringify(phone))
  return json(updates);
};
