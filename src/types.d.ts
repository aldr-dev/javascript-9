export interface Category {
  id: string;
  type: string;
  name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export type CategoryMutation = Omit<Category, 'type'>

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface Transaction extends ApiTransaction{
  id: string;
  amount: number;
  type: string;
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface TransactionMutate {
  type: string,
  name: string,
  amount: string;
}