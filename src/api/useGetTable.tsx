import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Database } from "@/type/tableType";
import { getAllTable } from "./init";

export const useGetTable = <T extends Database>(tableName: string) => {
  const { data: tableData }: UseQueryResult<{ data: Array<T> }, Error> =
    useQuery({
      queryKey: ["table", tableName],
      queryFn: () => getAllTable(tableName).catch(console.error),
    });

  return { data: tableData ? tableData.data : undefined };
};
