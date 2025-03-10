import { PageCoreContainer } from "./CorePage";

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = (await params).noteId;
  return <PageCoreContainer noteId={noteId} />;
}
