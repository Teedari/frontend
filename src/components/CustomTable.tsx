import React, { useMemo } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  MenuProps,
  Pagination,
  Select,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetRowKey } from "antd/es/table/interface";

const periodSort = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last week", value: "last_week" },
  { label: "Last 20 days", value: "last_20_days" },
  { label: "Last 30 days", value: "last_30_days" },
];

interface TableColumsProps {
  key: React.Key;
}

export interface CustomTableProps {
  title?: string;
  dataSource: readonly never[] | undefined;
  columns: ColumnsType<never> | undefined;
  loading?: boolean;
  actionColumns?: {
    items: MenuProps["items"];
    handleActionChange: (props: { key: string; record: any }) => void;
  };
  // handleActionChange?: (props: { path: string; record: any }) => void;
  config?: {
    searchable?: {
      search: boolean;
      onSearch: (value?: any) => void;
    };
    sortable?: {
      sort: boolean;
      onSort: (value?: any) => void;
    };
  };
  rowKey?: (
    record?: any
  ) => string | number | symbol | GetRowKey<any> | undefined;
  handlePagination?: (value?: any) => void;
  queries?: {};
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  dataSource,
  columns,
  config,
  loading,
  rowKey,
  actionColumns,
  handlePagination,
  queries = {},
  // handleActionChange,
}) => {
  const getColumns = useMemo(() => {
    let _columns: ColumnsType<TableColumsProps> = actionColumns
      ? [
          ...(columns as never),
          {
            dataIndex: "action",
            key: "action",
            title: "Actions",
            render: (_, record) => {
              return (
                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: actionColumns.items,
                    onClick: (props) =>
                      actionColumns.handleActionChange({
                        ...props,
                        record,
                      } as never),
                    // onClick: (props) => actionColumns.onClick(props),
                  }}
                >
                  <Button>Actions</Button>
                </Dropdown>
              );
            },
          },
        ]
      : (columns as never);
    return _columns;
  }, [actionColumns, columns]);

  return (
    <>
      <Card className="rounded-3xl">
        {title && <h4 className="font-bold text-lg">{title}</h4>}
        {config && (
          <div className="flex gap-8 py-4">
            <Select
              placeholder="Today"
              className="custom-selector max-w-[200px] rounded-xl w-full"
              options={periodSort}
            />
            {/* <Select
          mode="multiple"
          placeholder="Today"
          className="custom-selector max-w-[200px] rounded-xl w-full"
          tagRender={({ value, label }) => <h2 className="text-ellipsis end-8 absolute h-full w-full top-0 left-0">FIlter</h2>}
          options={periodSort}
        /> */}
            <div>
              <Input.Search
                placeholder="Search by user"
                className="custom-search-input "
              />
            </div>
          </div>
        )}
        <Table
          rowKey={rowKey ? (record) => rowKey(record) as never : undefined}
          loading={loading}
          pagination={false}
          className="custom-table"
          columns={getColumns}
          dataSource={dataSource}
        />
      </Card>
    </>
  );
};

export default CustomTable;
