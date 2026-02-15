import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { articleId: string } | Promise<{ articleId: string }>;
}) {
  const { articleId } = await Promise.resolve(params);
  redirect(`/read/${articleId}`);
}
