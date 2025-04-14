export interface PlanFeature {
  title: string;
  items: string[];
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  token: string;
  description: string;
  features: PlanFeature[];
  isTrial?: boolean;
  type: 'brain' | 'service' | 'other';
}

export interface Order {
  id: string;
  planName: string;
  planType: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createTime: string;
  payTime?: string;
}