export interface Loyalty_history {
  date: string,
  points: number,
  amount: number,
}

export interface UserProps {
  id: number;
  first_name: string | null;
  last_name: string | null;
  gender: boolean;
  phone: string;
  email: string | null;
  loyalty: {
    available: number;
    frozen: number;
    spent: number;
    burnt: number;
    burnup: number;
    expiry: number;
  };
  loyalty_code: string;
  birth_date: string | null;
  sms_agreement: boolean;
  email_agreement: boolean;
  push_agreement: boolean;
  loyalty_history: Loyalty_history[] | null;
}
