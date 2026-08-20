export default async function TaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  return <main className="p-6">Task {taskId}</main>;
}
