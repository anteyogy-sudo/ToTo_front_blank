import { ReactNode } from "react";

interface Props<T> {
  items: T[];
  render: (item: T, index: number) => ReactNode;
}

export function ListItems<T>({ items, render }: Props<T>) {

  if(!items.length){
    return
  }

  return items.map((items, index) => render(items, index));
}
