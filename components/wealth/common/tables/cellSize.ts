// Default cell widths are 150px and cannot be overwritten to be auto-sizing
import { Cell, Header } from "@tanstack/react-table";

// Therefore, we must manually set auto-sizing if required
export const getHeaderWidthStyles = <T>(header: Header<T, unknown>) => {
  const { meta } = header.column.columnDef;

  if (meta && "size" in meta) {
    return meta.size === "auto" ? { flex: 1, minWidth: header.column.columnDef.minSize } : meta.size;
  }

  return { flex: 1 };
};

export const getCellWidthStyles = <T>(cell: Cell<T, unknown>) => {
  const { meta } = cell.column.columnDef;

  if (meta && "size" in meta) {
    return meta.size === "auto" ? { flex: 1, minWidth: cell.column.columnDef.minSize } : meta.size;
  }

  return { flex: 1 };
};
