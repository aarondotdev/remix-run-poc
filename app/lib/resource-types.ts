import { type LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";

export interface NavGroup {
  group_name: string;
  group_item: NavItem[];
  group_name: string;
  group_item: NavItem[];
}

export interface NavItem {
  title: string;
  url?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
  isVisible?: boolean;
  guard_name?: string;
  roles?: string[];
  title: string;
  url?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
  isVisible?: boolean;
  guard_name?: string;
  roles?: string[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type CurrentUser = {
  id: number | string;
  name: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  status: string;
  email: string;
  created_at?: string;
  updateed_at?: string | null;
  roles: string[];
  permissions: string[];
  id: number | string;
  name: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  status: string;
  email: string;
  created_at?: string;
  updateed_at?: string | null;
  roles: string[];
  permissions: string[];
};

export type Profile = {
  user_id: string | number;
  address: string;
  date_of_birth: string;
  first_name: string;
  gender: string;
  id: string | number;
  last_name: string;
  phone_number: string;
  avatar: Media;
  user_id: string | number;
  address: string;
  date_of_birth: string;
  first_name: string;
  gender: string;
  id: string | number;
  last_name: string;
  phone_number: string;
  avatar: Media;
};

export type Users = {
  id: number | string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  deleted_at: string;
  profile: Profile;
  roles: Role[];
  junketSites: Junket[];
  id: number | string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  deleted_at: string;
  profile: Profile;
  roles: Role[];
  junketSites: Junket[];
};

export type PermissionsGroup = {
  id: number | string;
  type: string;
  name: string;
  title: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
  id: number | string;
  type: string;
  name: string;
  title: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
};
export type Permission = {
  id: number | string;
  type: string;
  name: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  id: number | string;
  type: string;
  name: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Roles = {
  id: number | string;
  type: string;
  name: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
  id: number | string;
  type: string;
  name: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
};
export type Role = {
  id: string;
  type: string;
  name: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
};

export type SessionType = {
  user: CurrentUser;
  accessToken: string;
  expires: string;
  status?: string;
  update?: any;
  refreshToken?: string;
  user: CurrentUser;
  accessToken: string;
  expires: string;
  status?: string;
  update?: any;
  refreshToken?: string;
};

export type GetRequestConfigType = {
  method: string;
  headers: {
    Accept: string;
    "Content-type": string;
    Authorization: string;
  };
  method: string;
  headers: {
    Accept: string;
    "Content-type": string;
    Authorization: string;
  };
};

export type PostRequestConfigType = {
  method: string;
  headers: {
    Accept: string;
    "Content-type": string;
    Authorization: string;
  };
  body?: any;
  method: string;
  headers: {
    Accept: string;
    "Content-type": string;
    Authorization: string;
  };
  body?: any;
};

export type ShiftType = {
  id: string | number;
  name: string;
  default_start: string | Date;
  default_end: string | Date;
  created_at: string | Date;
  udpated_at: string | Date;
  id: string | number;
  name: string;
  default_start: string | Date;
  default_end: string | Date;
  created_at: string | Date;
  udpated_at: string | Date;
};

export type Cashier = {
  id: string | number;
  cashier_code: string;
  user: Users;
  shift_type: string;
  junket_site_id: string | number;
  junketSite: Junket;
  id: string | number;
  cashier_code: string;
  user: Users;
  shift_type: string;
  junket_site_id: string | number;
  junketSite: Junket;
};

export type Schedule = {
  id: string | number;
  cashier_name: string;
  shift_type_name: string;
  shift_start: string;
  shift_end: string;
  shift_date: string;
  cashier_status: string;
  id: string | number;
  cashier_name: string;
  shift_type_name: string;
  shift_start: string;
  shift_end: string;
  shift_date: string;
  cashier_status: string;
};

export type User = {
  id: string | number;
  links: string;
  meta: string;
  name: string;
  email: string;
  email_verified_at: string;
  phone_number: string;
  created_at: string;
  deleted_at: string;
  profile?: Profile;
  id: string | number;
  links: string;
  meta: string;
  name: string;
  email: string;
  email_verified_at: string;
  phone_number: string;
  created_at: string;
  deleted_at: string;
  profile?: Profile;
};

export type Guest = {
  id: string | number;
  player_code: string;
  user: User;
  agent: Agent;
  profile: {
    user_id: string | number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    address: string;
    phone_number: string;
  };
  wallets: Wallet[];
  internal_ref_code: string;
  id: string | number;
  player_code: string;
  user: User;
  agent: Agent;
  profile: {
    user_id: string | number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    address: string;
    phone_number: string;
  };
  wallets: Wallet[];
  internal_ref_code: string;
};

export type CashAccount = {
  id: string | number;
  code: string;
  user: User;
  agent: Agent;
  name: string;
  selectedItem: string;
  id: string | number;
  code: string;
  user: User;
  agent: Agent;
  name: string;
  selectedItem: string;
};

export type Chip = {
  id: string | number;
  denomination: number;
  color: string;
  initial_stock: number;
  current_stock: number;
  reorder_level: number;
  id: string | number;
  denomination: number;
  color: string;
  initial_stock: number;
  current_stock: number;
  reorder_level: number;
};

export type Agent = {
  id: string | number;
  name: string;
  email: string;
  contact: string;
  nationality: string;
  agent_code: string;
  is_active: boolean;
  default_commission: string;
  commission_rate: number;
  players: Guest[];
  id: string | number;
  name: string;
  email: string;
  contact: string;
  nationality: string;
  agent_code: string;
  is_active: boolean;
  default_commission: string;
  commission_rate: number;
  players: Guest[];
};

export type Roller = {
  id: string | number;
  name: string;
  email: string;
  contact: string;
  nationality: string;
  roller_code: string;
  is_active: boolean;
  default_commission: string;
  commission_rate: number;
  players: Guest[];
  id: string | number;
  name: string;
  email: string;
  contact: string;
  nationality: string;
  roller_code: string;
  is_active: boolean;
  default_commission: string;
  commission_rate: number;
  players: Guest[];
};

export type Membership = {
  id: string | number;
  level_name: string;
  min_points_required: number;
  rewards: number;
  id: string | number;
  level_name: string;
  min_points_required: number;
  rewards: number;
};

export type KYCDOcumentType = {
  id: string | number;
  name: string;
  label: string;
  description: string;
  id: string | number;
  name: string;
  label: string;
  description: string;
};

export type WithdrawalRequest = {
  id: string | number;
  type: string;
  status: string;
  request_code: string;
  remarks: string;
  validity: boolean;
  created_at: string;
  expires_at: string;
  code: string;
  id: string | number;
  type: string;
  status: string;
  request_code: string;
  remarks: string;
  validity: boolean;
  created_at: string;
  expires_at: string;
  code: string;
};

export type Wallet = {
  id: string | number;
  player_id: string | number;
  currency_id: string | number;
  name: string;
  wallet_code: string;
  balance: Money;
  status: string;
  created_at: string;
  player: Guest;
  currency?: Currency;
  id: string | number;
  player_id: string | number;
  currency_id: string | number;
  name: string;
  wallet_code: string;
  balance: Money;
  status: string;
  created_at: string;
  player: Guest;
  currency?: Currency;
};

export type Currency = {
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  default_fraction_digits: number;
  is_active: boolean;
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  default_fraction_digits: number;
  is_active: boolean;
};

export type GeneralLedger = {
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  is_active: boolean;
  journal_entry_number: string;
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  is_active: boolean;
  journal_entry_number: string;
};

export type JournalEntries = {
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  is_active: boolean;
  journal_entry_number: string;
  id: string | number;
  code: string;
  symbol: string;
  flag: string;
  label: string;
  status: boolean;
  is_active: boolean;
  journal_entry_number: string;
};

export type Withdrawal = {
  id: string | number;
  withdrawal_request_id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  player_bank_account_id: string | number;
  account_number: string | number;
  account_name: string | number;
  account_type: string;
  type: string;
  status: string;
  amount: Money;
  created_at: string;
  request_code: string;
  withdrawalRequest: WithdrawalRequest;
  playerBankAccount: PlayerBankAccount;
  isRequiredApproval: boolean;
  wallet: Wallet;
  currency: Currency;
  admin_notes: string;
  system_notes: string;
  remarks: string;
  requires_approval: boolean;
  id: string | number;
  withdrawal_request_id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  player_bank_account_id: string | number;
  account_number: string | number;
  account_name: string | number;
  account_type: string;
  type: string;
  status: string;
  amount: Money;
  created_at: string;
  request_code: string;
  withdrawalRequest: WithdrawalRequest;
  playerBankAccount: PlayerBankAccount;
  isRequiredApproval: boolean;
  wallet: Wallet;
  currency: Currency;
  admin_notes: string;
  system_notes: string;
  remarks: string;
  requires_approval: boolean;
};

export type WithdrawalDetailLogs = {
  id: string | number;
  previous_status: string;
  new_status: string;
  processed_by: string;
  created_at: string;
  id: string | number;
  previous_status: string;
  new_status: string;
  processed_by: string;
  created_at: string;
};

export type WithdrawaleOfficialReceiptDetail = {
  eOfficialReceipt: { e_official_receipt_no: "string" };
  eOfficialReceipt: { e_official_receipt_no: "string" };
};

export type WithdrawalDetail = {
  id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  junket_site_id: string | number;
  bank_account_id: string | number;
  bank_name: string;
  swift_code: string;
  account_name: string;
  account_number: string;
  account_type: string;
  type: string;
  status: string;
  amount: Money;
  fee: Money | string;
  total_amount: Money;
  is_required_approval: boolean;
  created_at: string;
  request_code: string;
  wallet: Wallet;
  withdrawalRequest?: WithdrawalRequest;
  reference_number: string;
  requestLogs: WithdrawalDetailLogs[];
  requires_approval: boolean;
  eOfficialReceiptDetail: WithdrawaleOfficialReceiptDetail;
  currency: Currency;
  id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  junket_site_id: string | number;
  bank_account_id: string | number;
  bank_name: string;
  swift_code: string;
  account_name: string;
  account_number: string;
  account_type: string;
  type: string;
  status: string;
  amount: Money;
  fee: Money | string;
  total_amount: Money;
  is_required_approval: boolean;
  created_at: string;
  request_code: string;
  wallet: Wallet;
  withdrawalRequest?: WithdrawalRequest;
  reference_number: string;
  requestLogs: WithdrawalDetailLogs[];
  requires_approval: boolean;
  eOfficialReceiptDetail: WithdrawaleOfficialReceiptDetail;
  currency: Currency;
};

export type PlayerBankAccount = {
  id: string | number;
  account_name: string | number;
  account_number: string | number;
  account_type: string;
  status: string;
  bank: Bank;
  id: string | number;
  account_name: string | number;
  account_number: string | number;
  account_type: string;
  status: string;
  bank: Bank;
};

export type Bank = {
  id: string | number;
  name: string;
  bank_code: string;
  branch: string;
  country: string;
  swift_code: string;
  icon_url: string;
  is_active: boolean;
  id: string | number;
  name: string;
  bank_code: string;
  branch: string;
  country: string;
  swift_code: string;
  icon_url: string;
  is_active: boolean;
};

export type Money = {
  value: string;
  currency: string;
  formatted: string;
  symbol: string;
  default_fraction_digits: number;
  value: string;
  currency: string;
  formatted: string;
  symbol: string;
  default_fraction_digits: number;
};

export type Media = {
  id: string | number;
  uuid: string;
  name: string;
  mime_type: string;
  order_column: number;
  size: number;
  created_at: string;
  file_name: string;
  updated_at: string;
  url: string;
  id: string | number;
  uuid: string;
  name: string;
  mime_type: string;
  order_column: number;
  size: number;
  created_at: string;
  file_name: string;
  updated_at: string;
  url: string;
};

export type Deposit = {
  id: string | number;
  withdrawal_request_id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  player_bank_account_id: string | number;
  account_number: string | number;
  account_type: string;
  type: string;
  status:
    | "new"
    | "in-progress"
    | "for verification"
    | "verified receipt"
    | "approved"
    | "rejected";
  amount: Money;
  created_at: string;
  request: WithdrawalRequest;
  wallet: Wallet;
  currency: Currency;
  media: Media;
  reference_number: string;
  requestLogs: WithdrawalDetailLogs[];
  id: string | number;
  withdrawal_request_id: string | number;
  wallet_id: string | number;
  currency_id: string | number;
  player_bank_account_id: string | number;
  account_number: string | number;
  account_type: string;
  type: string;
  status:
    | "new"
    | "in-progress"
    | "for verification"
    | "verified receipt"
    | "approved"
    | "rejected";
  amount: Money;
  created_at: string;
  request: WithdrawalRequest;
  wallet: Wallet;
  currency: Currency;
  media: Media;
  reference_number: string;
  requestLogs: WithdrawalDetailLogs[];
};

export type DocumentFile = {
  file_path: string;
  id: string | number;
  kyc_document_id: string | number;
  file_path: string;
  id: string | number;
  kyc_document_id: string | number;
};

export type KYC = {
  id: string | number;
  player_id: string | number;
  kyc_document_type_id: string | number;
  document_number: string | number;
  expiry_date: string;
  status: string;
  created_at: string;
  update_at: string;
  player: Guest;
  documentType: KYCDOcumentType;
  files: DocumentFile[];
  id: string | number;
  player_id: string | number;
  kyc_document_type_id: string | number;
  document_number: string | number;
  expiry_date: string;
  status: string;
  created_at: string;
  update_at: string;
  player: Guest;
  documentType: KYCDOcumentType;
  files: DocumentFile[];
};

export type BankAccount = {
  account_name: string;
  account_number: string;
  account_type: string;
  bank: Bank;
  bank_id: string | number;
  currency: Currency;
  currency_id: string | number;
  id: string | number;
  status: string;
  updated_at: string;
  is_active: boolean;
  account_name: string;
  account_number: string;
  account_type: string;
  bank: Bank;
  bank_id: string | number;
  currency: Currency;
  currency_id: string | number;
  id: string | number;
  status: string;
  updated_at: string;
  is_active: boolean;
};

export type Notification = {
  body: string;
  created_at: string;
  id: string | number;
  notification_code: string;
  read_at: string;
  status: string;
  title: string;
  transaction_title: string;
  transaction_type: string;
  updated_at: string;
  user: User;
  user_id: string | number;
  data: {
    id: string | number;
    model: string;
    request_code: string;
    user_id: string | number;
    wallet_id: string | number;
  };
  body: string;
  created_at: string;
  id: string | number;
  notification_code: string;
  read_at: string;
  status: string;
  title: string;
  transaction_title: string;
  transaction_type: string;
  updated_at: string;
  user: User;
  user_id: string | number;
  data: {
    id: string | number;
    model: string;
    request_code: string;
    user_id: string | number;
    wallet_id: string | number;
  };
};

export type Exchange = {
  id: string | number;
  base_currency: string;
  target_currency: string;
  actual_rate: string;
  buy_rate: string;
  buy_margin: string;
  sell_rate: string;
  sell_margin: string;
  change_rate: string;
  effective_date: string;
  date: string;
  id: string | number;
  base_currency: string;
  target_currency: string;
  actual_rate: string;
  buy_rate: string;
  buy_margin: string;
  sell_rate: string;
  sell_margin: string;
  change_rate: string;
  effective_date: string;
  date: string;
};

export type JournalEntry = {
  chartOfAccount: any;
  junket_site_code: string | number;
  code_id: string;
  account_code: string | number;
  account_name: string;
  debit: string | number;
  credit: string | number;
  dr_amount: { value: string };
  cr_amount: { value: string };
  id: string;
  chartOfAccount: any;
  junket_site_code: string | number;
  code_id: string;
  account_code: string | number;
  account_name: string;
  debit: string | number;
  credit: string | number;
  dr_amount: { value: string };
  cr_amount: { value: string };
  id: string;
};

export type Junket = {
  id: string | number;
  code: string;
  name: string;
  status: string;
  contact_info: {
    email: string;
    phone: string;
  }[];
  sharePercentage: JunketSharePercentage;
  sharePercentages: JunketSharePercentage[];
  is_active: boolean;
  is_head_office: boolean;
  currency: Currency;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: City;
    country: Country;
    postal_code: string;
  };
  id: string | number;
  code: string;
  name: string;
  status: string;
  contact_info: {
    email: string;
    phone: string;
  }[];
  sharePercentage: JunketSharePercentage;
  sharePercentages: JunketSharePercentage[];
  is_active: boolean;
  is_head_office: boolean;
  currency: Currency;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: City;
    country: Country;
    postal_code: string;
  };
};

export type AccountCode = {
  id: string | number;
  code: string;
  name: string;
  status: string;
  contact_info: {
    email: string;
    phone: string;
  }[];
  sharePercentage: JunketSharePercentage;
  sharePercentages: JunketSharePercentage[];
  is_active: boolean;
  is_head_office: boolean;
  currency: Currency;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: City;
    country: Country;
    postal_code: string;
  };
  id: string | number;
  code: string;
  name: string;
  status: string;
  contact_info: {
    email: string;
    phone: string;
  }[];
  sharePercentage: JunketSharePercentage;
  sharePercentages: JunketSharePercentage[];
  is_active: boolean;
  is_head_office: boolean;
  currency: Currency;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: City;
    country: Country;
    postal_code: string;
  };
};

export type JunketSharePercentage = {
  id: string | number;
  share_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  id: string | number;
  share_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type GameSession = {
  id: string | number;
  game_id: string | number;
  roller_id: string | number;
  started_at: string;
  finished_at: string;
  roller: Roller;
  id: string | number;
  game_id: string | number;
  roller_id: string | number;
  started_at: string;
  finished_at: string;
  roller: Roller;
};

export type GameType = {
  id: string | number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  update_at: string;
  id: string | number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  update_at: string;
};

export type GameTransaction = {
  id: string | number;
  chart_of_account_id: string | number;
  dr_amt: Money;
  cr_amt: Money;
  buyInRequest: BuyInRequest;
  id: string | number;
  chart_of_account_id: string | number;
  dr_amt: Money;
  cr_amt: Money;
  buyInRequest: BuyInRequest;
};

export type Game = {
  id: string | number;
  code: string;
  status: "waiting" | "playing" | "settled" | "completed";
  started_at: string;
  finished_at: string;
  player: Guest;
  agent: Agent;
  junketSite: Junket;
  gameType: GameType;
  gameTransactions: GameTransaction[];
  sharePercentage: JunketSharePercentage;
  initial_buy_in_amount: Money;
  capital_amount: Money;
  gameSettlement: GameSettlement;
  gameSessions: GameSession[];
  currency: Currency;
  commissionRate: CommissionRate;
  id: string | number;
  code: string;
  status: "waiting" | "playing" | "settled" | "completed";
  started_at: string;
  finished_at: string;
  player: Guest;
  agent: Agent;
  junketSite: Junket;
  gameType: GameType;
  gameTransactions: GameTransaction[];
  sharePercentage: JunketSharePercentage;
  initial_buy_in_amount: Money;
  capital_amount: Money;
  gameSettlement: GameSettlement;
  gameSessions: GameSession[];
  currency: Currency;
  commissionRate: CommissionRate;
};

export type CommissionRate = {
  id: string | number;
  game_id: string | number;
  commission_rate: number;
  id: string | number;
  game_id: string | number;
  commission_rate: number;
};

export type GameSettlement = {
  id: string | number;
  win_loss_amount: Money;
  total_capital_amount: Money;
  cash_out_amount: Money;
  total_rolling_amount: Money;
  commission_amount: Money;
  share_amount: Money;
  ngr_amount: Money;
  cost_amount: Money;
  adjustmentLogs: AdjustmentLog;
  id: string | number;
  win_loss_amount: Money;
  total_capital_amount: Money;
  cash_out_amount: Money;
  total_rolling_amount: Money;
  commission_amount: Money;
  share_amount: Money;
  ngr_amount: Money;
  cost_amount: Money;
  adjustmentLogs: AdjustmentLog;
};

export type Fee = {
  created_at: string | number | Date;
  id: string | number;
  name: string;
  type: string;
  minimum_amount: Money;
  maximum_amount: Money;
  amount: Money;
  is_percentage: boolean;
  is_active: boolean;
  create_at: string;
  updated_at: string;
  currency: Currency;
  created_at: string | number | Date;
  id: string | number;
  name: string;
  type: string;
  minimum_amount: Money;
  maximum_amount: Money;
  amount: Money;
  is_percentage: boolean;
  is_active: boolean;
  create_at: string;
  updated_at: string;
  currency: Currency;
};

export type JunketDetail = {
  id: string | number;
  share_percentage: string;
  is_active: boolean;
  junketSite: Junket;
  id: string | number;
  share_percentage: string;
  is_active: boolean;
  junketSite: Junket;
};

export type ChartOfAccount = {
  is_subsidiary: any;
  id: string | number;
  code: string;
  name: string;
  description: string;
  type: string;
  normal_balance: string;
  currency: Currency;
  is_active: boolean;
  junketSite: Junket;
  created_at: string;
  running_balance: Money;
  is_subsidiary: any;
  id: string | number;
  code: string;
  name: string;
  description: string;
  type: string;
  normal_balance: string;
  currency: Currency;
  is_active: boolean;
  junketSite: Junket;
  created_at: string;
  running_balance: Money;
};

export type WithdrawalLimit = {
  id: string | number;
  daily_limit: string | number;
  currency_code: string | number;
  transaction_limit: string;
  name: string;
  currency: Currency;
  is_active: boolean;
  junket: Junket;
  code: string;
  location: string;
  country: string;
  created_at: string;
  created_by: string;
  id: string | number;
  daily_limit: string | number;
  currency_code: string | number;
  transaction_limit: string;
  name: string;
  currency: Currency;
  is_active: boolean;
  junket: Junket;
  code: string;
  location: string;
  country: string;
  created_at: string;
  created_by: string;
};

export type Country = {
  id: string | number;
  name: string;
  code: string;
  id: string | number;
  name: string;
  code: string;
};

export type City = {
  id: string | number;
  name: string;
  id: string | number;
  name: string;
};

export type BuyInRequest = {
  id: number | string;
  reference_no: string;
  amount: Money;
  converted_amount: Money;
  status: string;
  remarks: string;
  id: number | string;
  reference_no: string;
  amount: Money;
  converted_amount: Money;
  status: string;
  remarks: string;
};

export type MerchantRegisterPayload = {
  merchant_avatar?: InstanceType<File>;
  merchant_name: string;
  merchant_service_name: string;
  merchant_business_type: string;
  merchant_address: string;
  merchant_address_coordinates_long: string;
  merchant_address_coordinates_lat: string;
  merchant_city_id: string;
  merchant_postal_code: string;
  merchant_email: string;
  merchant_social_media_links: string[];
  merchant_website_url: string;
  merchant_phone: string;
  user_name: string;
  user_email_address: string;
  user_phone_number: string;
  requirement_business_tin: string;
  requirement_business_tin_files: InstanceType<File>[];
  requirement_business_permit_number: string;
  requirement_business_permit_files: InstanceType<File>[];
  requirement_business_permit_type: string;
  requirement_business_expiration_date: string;
  wallet_name: string;
  wallet_currency_alias: string;
  wallet_currency_code: string;
  merchant_avatar?: InstanceType<File>;
  merchant_name: string;
  merchant_service_name: string;
  merchant_business_type: string;
  merchant_address: string;
  merchant_address_coordinates_long: string;
  merchant_address_coordinates_lat: string;
  merchant_city_id: string;
  merchant_postal_code: string;
  merchant_email: string;
  merchant_social_media_links: string[];
  merchant_website_url: string;
  merchant_phone: string;
  user_name: string;
  user_email_address: string;
  user_phone_number: string;
  requirement_business_tin: string;
  requirement_business_tin_files: InstanceType<File>[];
  requirement_business_permit_number: string;
  requirement_business_permit_files: InstanceType<File>[];
  requirement_business_permit_type: string;
  requirement_business_expiration_date: string;
  wallet_name: string;
  wallet_currency_alias: string;
  wallet_currency_code: string;
};

export type AdjustmentLog = {
  id: string | number;
  log_name: string;
  description: string;
  properties: {
    remarks?: string;
    description: string[];
  };
  create_at: string;
  updated_at: string;
  user: User;
  id: string | number;
  log_name: string;
  description: string;
  properties: {
    remarks?: string;
    description: string[];
  };
  create_at: string;
  updated_at: string;
  user: User;
};

export type HouseBalance = {
  id: string | number;
  junket_site_id: string | number;
  currency_id: string | number;
  code: string;
  name: string;
  balance: Money;
  junketSite: Junket;
  currency: Currency;
  type: string;
  is_active: boolean;
  holder: "guest_balance" | "house_balance";
  id: string | number;
  junket_site_id: string | number;
  currency_id: string | number;
  code: string;
  name: string;
  balance: Money;
  junketSite: Junket;
  currency: Currency;
  type: string;
  is_active: boolean;
  holder: "guest_balance" | "house_balance";
};
export type HouseBalanceTransaction = {
  id: string | number;
  house_balance_id: string | number;
  currency_id: string | number;
  transaction_ref: string;
  transaction_id: string | number;
  transaction_type: string;
  amount: Money;
  balance_before: Money;
  balance_after: Money;
  type: string;
  remarks: string;
  created_at: string;
  updated_at: string;
  currency: Currency;
  houseBalance: HouseBalance;
  id: string | number;
  house_balance_id: string | number;
  currency_id: string | number;
  transaction_ref: string;
  transaction_id: string | number;
  transaction_type: string;
  amount: Money;
  balance_before: Money;
  balance_after: Money;
  type: string;
  remarks: string;
  created_at: string;
  updated_at: string;
  currency: Currency;
  houseBalance: HouseBalance;
};

export type WalletTransaction = {
  id: string | number;
  amount: Money;
  balance_after: Money;
  balance_before: Money;
  converted_amount?: Money;
  created_at: string;
  player_internal_ref_code: string;
  status: string;
  transaction_ref: string;
  type: string;
  wallet_id: string | number;
  wallet: Wallet;
  id: string | number;
  amount: Money;
  balance_after: Money;
  balance_before: Money;
  converted_amount?: Money;
  created_at: string;
  player_internal_ref_code: string;
  status: string;
  transaction_ref: string;
  type: string;
  wallet_id: string | number;
  wallet: Wallet;
};
