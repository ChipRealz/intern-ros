import { getTaskById } from "@/lib/actions/task.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const dynamic = 'force-dynamic';

const TaskPage = async ({ params }: { params: { id: string } }) => {
  const { userId: clerkId } = await auth();
   
  if (!clerkId) {
    redirect('/sign-in');
  }

  try {
    const result = await getTaskById(params.id);

    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{result.title}</CardTitle>
            {result.author && (
              <div className="flex items-center text-muted-foreground">
                <UserIcon className="w-4 h-4 mr-2" />
                <span>{result.author.name}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="font-semibold text-xl mb-2">Description</h2>
              <p className="text-muted-foreground">{result.description}</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{new Date(result.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
              <Badge 
                variant={
                  result.status === 'completed' ? 'secondary' :
                  result.status === 'pending' ? 'destructive' : 'default'
                }
              >
                {result.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error in TaskPage:', error);
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find the task you&apos;re looking for. Please try again later or contact support if the problem persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
} 

export default TaskPage;