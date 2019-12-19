import React from "react";
import { Pagination } from "antd";

export const SmartPagination = (): JSX.Element => {
  return (
    <div>
      <Pagination
        showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        // onChange={onSizeChange}
        defaultCurrent={3}
        total={500}
      />
    </div>
  );
};
