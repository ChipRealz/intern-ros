import LocalSearchbar from "@/components/Search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "@/components/Filter/FilterTask";
import NoResult from "@/components/NoResult/NoResult";
import TaskCard from "@/components/Cards/TaskCard";
import { getTasks } from "@/lib/actions/task.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getTasks({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  }); 

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-black font-serif text-xl font-semibold">All Tasks</h1>
        <Link href='/add-task' className="flex justify-end">
          <Button className="min-h-[46px] px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
            Add Task
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tasks"
        />
        <Filter
          filters={[
            { name: 'Latest Tasks', value: 'latest' },
            { name: 'Completed', value: 'completed' },
            { name: 'In Progress', value: 'in-progress' },
            { name: 'Pending', value: 'pending'},
            { name: 'Oldest Tasks', value: 'oldest' },
          ]}
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.tasks.length > 0 ? (
          result.tasks.map((task) => (
            <TaskCard
              key={task._id}
              _id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              author={task.author} 
            />
          ))
        ) : (
          <NoResult
            title="There’s no task to show"
            description="Create a new task to get started"
            link="/add-task"
            linkTitle="Add Task"
          />
        )}
      </div>
      <div className="mt-10">
      <Pagination 
        pageNumber = {searchParams?.page ? +searchParams.page : 1}
        isNext = {result.isNext}
      />
      </div>
    </>
  );
}
