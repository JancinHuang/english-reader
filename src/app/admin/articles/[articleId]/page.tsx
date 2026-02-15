import { ArticleEditor } from "@/components/admin/ArticleEditor";

export default async function Page({
  params,
}: {
  params: { articleId: string } | Promise<{ articleId: string }>;
}) {
  const { articleId } = await Promise.resolve(params);
  return <ArticleEditor articleId={articleId} />;
}
