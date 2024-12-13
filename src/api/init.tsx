import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllTable = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select("*");
  const tableData = data || [];
  const sortData = [...tableData].sort((a, b) => {
    const createdAtA = dayjs(a.created_at);
    const createdAtB = dayjs(b.created_at);

    return createdAtB.diff(createdAtA);
  });

  return { data: sortData, error };
};

export const getPaginatedTable = async (
  tableName: string,
  startIndex: number,
  endIndex: number,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .range(startIndex, endIndex);

  return { data, error };
};

// filter

// 원하는 value 와 동일한 값을 가진 column 찾기
export const filterEqualTable = async (
  tableName: string,
  columnName: string,
  columnValue: unknown,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq(columnName, columnValue);

  return { data, error };
};

// 원하는 value를 포함한 값을 가진 column 찾기
// ex) 'click' => 'onClick (O) , 검색과 같은 기능
export const filterSearchTable = async (
  tableName: string,
  columnName: string,
  columnValue: string,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .ilike(columnName, columnValue);

  return { data, error };
};

// 여러개의 값을 보내고 그중에 포함되는지 검색
// ex) 'click' => ['click','drag'] (O)
export const filterContainTable = async (
  tableName: string,
  columnName: string,
  columnValue: Array<string>,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .in(columnName, columnValue);

  return { data, error };
};

// column값이 array일때 포함여부 찾기
// ex) ['click'] => ['click','drag'] (O)
// 위 메소드와 다른점은 이 부분은 data의 값이 array일 때 사용하는 메소드
export const filterContainArrayTable = async (
  tableName: string,
  columnName: string,
  columnValue: Array<string>,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .containedBy(columnName, columnValue);

  return { data, error };
};
