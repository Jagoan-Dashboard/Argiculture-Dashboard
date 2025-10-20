'use client'

import React, { useState, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'


interface Column<T = unknown> {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  className?: string
  headerClassName?: string
}

interface FilterOption {
  key: string
  label: string
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number'
  options?: { value: string; label: string }[]
  placeholder?: string
}

interface PaginationConfig {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
}

interface HeaderAction {
  label: string
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  icon?: React.ReactNode
  className?: string
}

interface RowAction<T = unknown> {
  label: string
  onClick: (row: T) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  icon?: React.ReactNode
  className?: string
}

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

interface UniversalTableProps<T = Record<string, unknown>> {
  
  data: T[]
  columns: Column<T>[]
  loading?: boolean

  
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void

  sortable?: boolean
  sortConfig?: SortConfig
  onSort?: (config: SortConfig) => void

  filterable?: boolean
  filterOptions?: FilterOption[]
  filters?: Record<string, unknown>
  onFilter?: (filters: Record<string, unknown>) => void

  
  pagination?: PaginationConfig
  onPaginationChange?: (page: number, pageSize: number) => void

  
  headerActions?: HeaderAction[]
  headerTitle?: string
  headerDescription?: string

  
  rowActions?: RowAction<T>[]

  
  scrollable?: boolean
  scrollHeight?: string | number

  
  className?: string
  tableClassName?: string
  headerClassName?: string
  emptyStateMessage?: string
  emptyStateIcon?: React.ReactNode

  
  selectable?: boolean
  selectedRows?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  getRowId?: (row: T) => string
}

export function UniversalTable<T = Record<string, unknown>>({
  data,
  columns,
  loading = false,
  
  searchable = false,
  searchPlaceholder = "Cari...",
  onSearch,
  
  sortable = false,
  sortConfig,
  onSort,
  
  filterable = false,
  filterOptions = [],
  filters = {},
  onFilter,
  
  pagination,
  onPaginationChange,
  
  headerActions = [],
  headerTitle,
  headerDescription,
  
  rowActions = [],
  
  scrollHeight,
  
  className = "",
  tableClassName = "",
  headerClassName = "",
  emptyStateMessage = "Tidak ada data yang ditemukan",
  emptyStateIcon,
  
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row: T) => (row as Record<string, unknown>).id as string || (row as Record<string, unknown>)._id as string || Math.random().toString(),
}: UniversalTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [localFilters, setLocalFilters] = useState<Record<string, unknown>>(filters)
  const [showFilters, setShowFilters] = useState(false)

  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (searchable && onSearch) {
      onSearch(query)
    }
  }, [searchable, onSearch])

  
  const handleSort = useCallback((key: string) => {
    if (!sortable || !onSort) return

    const direction =
      sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSort({ key, direction })
  }, [sortable, sortConfig, onSort])

  
  const handleFilterChange = useCallback((key: string, value: unknown) => {
    if (!filterable || !onFilter) return

    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }, [filterable, localFilters, onFilter])

  
  const handleRowSelection = useCallback((rowId: string, selected: boolean) => {
    if (!selectable || !onSelectionChange) return

    const newSelection = selected
      ? [...selectedRows, rowId]
      : selectedRows.filter(id => id !== rowId)

    onSelectionChange(newSelection)
  }, [selectable, selectedRows, onSelectionChange])

  const handleSelectAll = useCallback((selected: boolean) => {
    if (!selectable || !onSelectionChange) return

    const allIds = data.map(row => getRowId(row))
    onSelectionChange(selected ? allIds : [])
  }, [selectable, data, getRowId, onSelectionChange])

  
  const hasActions = rowActions && rowActions.length > 0
  const hasHeaderContent = headerTitle || headerDescription || (headerActions && headerActions.length > 0)
  const isAllSelected = selectable && data.length > 0 && selectedRows.length === data.length
  const isSomeSelected = selectable && selectedRows.length > 0 && selectedRows.length < data.length
  const showSearchAndFilter = searchable || (filterable && filterOptions && filterOptions.length > 0)

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Header Section - hanya tampil jika ada content */}
      {hasHeaderContent && (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${headerClassName}`}>
          <div>
            {headerTitle && (
              <h2 className="text-2xl font-bold tracking-tight">{headerTitle}</h2>
            )}
            {headerDescription && (
              <p className="text-muted-foreground">{headerDescription}</p>
            )}
          </div>

          {headerActions && headerActions.length > 0 && (
            <div className="flex items-center gap-2">
              {headerActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  onClick={action.onClick}
                  className={action.className}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search and Filter Section - hanya tampil jika ada fitur yang aktif */}
      {showSearchAndFilter && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search - hanya tampil jika searchable = true */}
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          )}

          {/* Filter Toggle - hanya tampil jika filterable = true dan ada filterOptions */}
          {filterable && filterOptions && filterOptions.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          )}
        </div>
      )}

      {/* Filter Section - hanya tampil jika filterable = true, showFilters = true dan ada filterOptions */}
      {filterable && showFilters && filterOptions && filterOptions.length > 0 && (
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-muted/10 sm:grid-cols-2 lg:grid-cols-3">
          {filterOptions.map((filter) => (
            <div key={filter.key} className="space-y-2">
              <label className="text-sm font-medium">{filter.label}</label>
              {filter.type === 'text' && (
                <Input
                  placeholder={filter.placeholder}
                  value={(localFilters[filter.key] as string) || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                />
              )}
              {filter.type === 'select' && (
                <Select
                  value={(localFilters[filter.key] as string) || ''}
                  onValueChange={(value) => handleFilterChange(filter.key, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filter.placeholder || 'Pilih...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Table Section - core table yang selalu ada dengan scrollable wrapper conditional */}
      <div className="rounded-md border flex flex-col">
        {/* Table Header - tetap di luar scroll */}
        <div className="overflow-hidden">
          <Table className={tableClassName}>
            <TableHeader>
              <TableRow>
                {/* Selection Header */}
                {selectable && (
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isSomeSelected
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                )}

                {/* Column Headers */}
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`${column.headerClassName || ''} ${sortable && column.sortable ? 'cursor-pointer select-none' : ''
                      } whitespace-nowrap`}
                    onClick={() => sortable && column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.label}</span>
                      {sortable && column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`h-3 w-3 ${sortConfig?.key === column.key && sortConfig.direction === 'asc'
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                              }`}
                          />
                          <ChevronDown
                            className={`h-3 w-3 -mt-1 ${sortConfig?.key === column.key && sortConfig.direction === 'desc'
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                              }`}
                          />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}

                {/* Actions Header */}
                {hasActions && (
                  <TableHead className="w-20 text-right whitespace-nowrap">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Table Body - scrollable */}
        <div
          className="overflow-auto flex-1 "
          style={{
            maxHeight: typeof scrollHeight === 'number' ? `${scrollHeight}px` : scrollHeight || 'auto'
          }}
        >
          <Table className={`${tableClassName} min-w-max`}>
            <TableBody>
              {loading ? (
                
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {selectable && <TableCell><div className="h-4 bg-muted animate-pulse rounded" /></TableCell>}
                    {columns.map((column) => (
                      <TableCell key={column.key} className="whitespace-nowrap">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell className="whitespace-nowrap">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0)}
                    className=" h-[32rem] text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      {emptyStateIcon}
                      <p className="text-muted-foreground text-lg">{emptyStateMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                
                data.map((row) => {
                  const rowId = getRowId(row)
                  const isSelected = selectable && selectedRows.includes(rowId)

                  return (
                    <TableRow key={rowId} className={isSelected ? 'bg-muted/50' : ''}>
                      {selectable && (
                        <TableCell className="whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleRowSelection(rowId, e.target.checked)}
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                      )}

                      {columns.map((column) => (
                        <TableCell
                          key={column.key}
                          className={`${column.className || ''} whitespace-nowrap`}
                        >
                          {column.render
                            ? column.render((row as Record<string, unknown>)[column.key], row) as React.ReactNode
                            : String((row as Record<string, unknown>)[column.key])
                          }
                        </TableCell>
                      ))}

                      {hasActions && (
                        <TableCell className="text-right whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {rowActions?.map((action, actionIndex) => (
                                <button
                                  key={actionIndex}
                                  onClick={() => action.onClick(row)}
                                  className={`flex w-full items-center px-2 py-1.5 text-sm hover:bg-muted ${action.className || ''}`}
                                >
                                  {action.icon}
                                  {action.label}
                                </button>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Section - hanya tampil jika pagination dan onPaginationChange ada */}
      {pagination && onPaginationChange && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={(value) => onPaginationChange(1, Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(pagination.pageSizeOptions || [10, 20, 50, 100]).map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">
                Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPaginationChange(1, pagination.pageSize)}
                disabled={pagination.page <= 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPaginationChange(pagination.page - 1, pagination.pageSize)}
                disabled={pagination.page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPaginationChange(pagination.page + 1, pagination.pageSize)}
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPaginationChange(Math.ceil(pagination.total / pagination.pageSize), pagination.pageSize)}
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}