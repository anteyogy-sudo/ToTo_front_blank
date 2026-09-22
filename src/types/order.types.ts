export interface OrderProductProps {
  id: number;
  name: string;
  images: string[];
  amount: number;
  price: number;
}

export interface OrderProps {
    id: number;
    store: {
      id: number;
      address: string;
      phone: string;
      email: string;
      schedule: string;
      fullTime: boolean;
      properties: {
        showBrand: boolean;
        enabled: boolean;
      }
      location: {
        latitude: number;
        longitude: number;
      }
    }
    products: OrderProductProps[];
    status: {
      code: number;
      date: string;
    }
    created: string;
    storeUntil: string;
    total: {
      price: number;
      fullPrice: number;
      bonus: number;
      amount: number;
      available: number;
      needRecipe: boolean;
      hasDiscount: boolean;
      discount: number;
    }
}

export interface OrdersQueryProps {
  data: OrderProps[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  }
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: [
      {
        url: string;
        label: string;
        active: boolean;
      }
    ]
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
}