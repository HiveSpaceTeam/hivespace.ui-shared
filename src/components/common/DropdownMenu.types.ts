export interface MenuItem {
  label: string
  to?: string
  onClick?: () => void
}

export interface DropdownMenuProps {
  menuItems?: MenuItem[]
  buttonClass?: string
  menuClass?: string
  itemClass?: string
}