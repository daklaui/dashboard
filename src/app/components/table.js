import { forwardRef, useRef, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableFooter from "@mui/material/TableFooter";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import clsx from "clsx";
import TablePaginationActions from "./pagination";
import styled from "styled-components";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useState } from "react";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest} />
		</>
	);
});

const EnhancedTable = ({ columns, data, onRowClick, totalDataCount, currentPageIndex, currentPageLength, setCurrentPageIndex, setCurrentPageLength }) => {
	const initialState = { hiddenColumns: ["ID","CategoryImgURL"] };

	const [selected, setSelected] = useState([]);
	const {
		getTableProps,
		headerGroups,
		footerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,

		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState,

			autoResetPage: true,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect
	);

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	useEffect(() => {
		currentPageLength && setPageSize(currentPageLength);
	}, []);
	useEffect(() => {}, [selected]);

	const handleChangePage = (event, newPage) => {
		if (setCurrentPageIndex) {
			if (newPage < currentPageIndex + 1) {
				setCurrentPageIndex(currentPageIndex - 1);
			} else {
				setCurrentPageIndex(currentPageIndex + 1);
			}
		} else {
			gotoPage(newPage);
		}
	};

	const handleChangeRowsPerPage = (event) => {
		if (setCurrentPageLength) {
			setCurrentPageLength(Number(event.target.value));
		} else {
			setPageSize(Number(event.target.value));
		}
	};

	// Render the UI for your table
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table {...getTableProps()} stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<TableCell
										className="whitespace-nowrap p-4 md:p-12"
										{...(!column.sortable ? column.getHeaderProps() : column.getHeaderProps(column.getSortByToggleProps()))}
									>
										{column.render("Header")}
										{column.sortable ? <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? "desc" : "asc"} /> : null}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow {...row.getRowProps()} onClick={(ev) => onRowClick(row)} className="truncate cursor-pointer">
									{row.cells.map((cell) => {
										return (
											<TableCell {...cell.getCellProps()} className={clsx("p-4 md:p-12", cell.column.className)}>
												{cell.render("Cell")}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						{footerGroups.map((group) => (
							<tr {...group.getFooterGroupProps()}>
								{group.headers.map((column) => (
									<td {...column.getFooterProps()}>{column.render("Footer")}</td>
								))}
							</tr>
						))}
					</TableFooter>
				</Table>
			</FuseScrollbars>
			<TablePagination
				component="div"
				classes={{
					root: "shrink-0 border-t-1",
				}}
				rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
				colSpan={20}
				count={totalDataCount ? totalDataCount : data.length}
				rowsPerPage={currentPageLength || pageSize}
				page={currentPageIndex || pageIndex}
				SelectProps={{
					inputProps: { "aria-label": "rows per page" },
					native: false,
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				ActionsComponent={TablePaginationActions}
			/>
		</div>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func,
};

export default EnhancedTable;
