import { Database } from "@/type/tableType";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { filterContainTable } from "./init";

export const useFilterContainTable = <T extends Database>(
  tableName: string,
  columnName: string,
  columnValue: Array<string>,
) => {
  const { data: tableData }: UseQueryResult<{ data: Array<T> }, Error> =
    useQuery({
      queryKey: ["favorite", tableName, columnName, columnValue],
      queryFn: () =>
        filterContainTable(tableName, columnName, columnValue).catch(
          console.error,
        ),
    });

  return { data: tableData ? tableData.data : [] };
};
