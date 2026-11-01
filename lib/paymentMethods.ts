export interface PaymentChannel {
  id: string;
  name: string;
  category: 'qris' | 'va' | 'retail';
  fee: number;
  icon: string;
  logoUrl: string;
  badge?: string;
  minPrice?: string;
}

export interface PreviewLogo {
  name: string;
  url: string;
}

export interface PaymentCategoryGroup {
  id: 'qris' | 'va' | 'retail';
  name: string;
  previewLogos: PreviewLogo[];
  channels: PaymentChannel[];
}

export const QRIS_CHANNEL: PaymentChannel = {
  id: 'qris',
  name: 'QRIS (All Payment)',
  category: 'qris',
  fee: 1000,
  badge: 'BEST PRICE',
  icon: '/payments/qris.png',
  logoUrl: '/payments/qris-banner.png',
};

export const PAYMENT_CATEGORIES: PaymentCategoryGroup[] = [
  {
    id: 'qris',
    name: 'QRIS',
    previewLogos: [
      { name: 'BNI', url: '/payments/bni.png' },
      { name: 'GoPay', url: '/payments/gopay.png' },
      { name: 'Mandiri', url: '/payments/mandiri.png' },
      { name: 'ShopeePay', url: '/payments/shopeepay.png' },
      { name: 'BCA', url: '/payments/bca.png' },
      { name: 'LinkAja', url: '/payments/linkaja.png' },
      { name: 'DANA', url: '/payments/dana.png' },
      { name: 'OVO', url: '/payments/ovo.png' },
      { name: 'BRI', url: '/payments/brimo.png' },
    ],
    channels: [
      {
        id: 'bni_qr',
        name: 'BNI',
        category: 'qris',
        fee: 1500,
        icon: '/payments/bni.png',
        logoUrl: '/payments/bni.png',
      },
      {
        id: 'gopay',
        name: 'GoPay',
        category: 'qris',
        fee: 1500,
        icon: '/payments/gopay.png',
        logoUrl: '/payments/gopay.png',
      },
      {
        id: 'mandiri_qr',
        name: 'Mandiri',
        category: 'qris',
        fee: 1500,
        icon: '/payments/mandiri.png',
        logoUrl: '/payments/mandiri.png',
      },
      {
        id: 'shopeepay',
        name: 'ShopeePay',
        category: 'qris',
        fee: 1500,
        icon: '/payments/shopeepay.png',
        logoUrl: '/payments/shopeepay.png',
      },
      {
        id: 'bca_qr',
        name: 'BCA',
        category: 'qris',
        fee: 1500,
        icon: '/payments/bca.png',
        logoUrl: '/payments/bca.png',
      },
      {
        id: 'linkaja',
        name: 'LinkAja',
        category: 'qris',
        fee: 1500,
        icon: '/payments/linkaja.png',
        logoUrl: '/payments/linkaja.png',
      },
      {
        id: 'dana',
        name: 'DANA',
        category: 'qris',
        fee: 1500,
        icon: '/payments/dana.png',
        logoUrl: '/payments/dana.png',
      },
      {
        id: 'ovo',
        name: 'OVO',
        category: 'qris',
        fee: 1500,
        icon: '/payments/ovo.png',
        logoUrl: '/payments/ovo.png',
      },
      {
        id: 'bri_qr',
        name: 'BRImo',
        category: 'qris',
        fee: 1500,
        icon: '/payments/brimo.png',
        logoUrl: '/payments/brimo.png',
      },
    ],
  },
  {
    id: 'va',
    name: 'Virtual Account',
    previewLogos: [
      { name: 'BCA', url: '/payments/bca.png' },
      { name: 'BNI', url: '/payments/bni-va.png' },
      { name: 'Mandiri', url: '/payments/mandiri-va.png' },
      { name: 'BRIVA', url: '/payments/bri-va.png' },
      { name: 'Permata', url: '/payments/permata-va.png' },
      { name: 'CIMB Niaga', url: '/payments/cimb-va.png' },
      { name: 'Danamon', url: '/payments/danamon-va.png' },
      { name: 'BSI', url: '/payments/bsi-va.png' },
      { name: 'Maybank', url: '/payments/maybank-va.png' },
      { name: 'Sinarmas', url: '/payments/sinarmas-va.png' },
    ],
    channels: [
      {
        id: 'bca',
        name: 'BCA Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/bca.png',
        logoUrl: '/payments/bca.png',
      },
      {
        id: 'bni',
        name: 'BNI Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/bni-va.png',
        logoUrl: '/payments/bni-va.png',
      },
      {
        id: 'mandiri',
        name: 'Mandiri Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/mandiri-va.png',
        logoUrl: '/payments/mandiri-va.png',
      },
      {
        id: 'bri',
        name: 'BRI Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/bri-va.png',
        logoUrl: '/payments/bri-va.png',
      },
      {
        id: 'permata',
        name: 'Permata Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/permata-va.png',
        logoUrl: '/payments/permata-va.png',
      },
      {
        id: 'cimb',
        name: 'CIMB Niaga Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/cimb-va.png',
        logoUrl: '/payments/cimb-va.png',
      },
      {
        id: 'danamon',
        name: 'Danamon Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/danamon-va.png',
        logoUrl: '/payments/danamon-va.png',
      },
      {
        id: 'bsi',
        name: 'BSI Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/bsi-va.png',
        logoUrl: '/payments/bsi-va.png',
      },
      {
        id: 'maybank',
        name: 'Maybank Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/maybank-va.png',
        logoUrl: '/payments/maybank-va.png',
      },
      {
        id: 'sinarmas',
        name: 'Sinarmas Virtual Account',
        category: 'va',
        fee: 2500,
        icon: '/payments/sinarmas-va.png',
        logoUrl: '/payments/sinarmas-va.png',
      },
    ],
  },
  {
    id: 'retail',
    name: 'Convenience Store',
    previewLogos: [
      { name: 'Alfamidi', url: '/payments/alfamidi.png' },
      { name: 'Alfamart', url: '/payments/alfamart.png' },
      { name: 'Indomaret', url: '/payments/indomaret.png' },
      { name: 'Super Indo', url: '/payments/superindo.png' },
      { name: 'Lawson', url: '/payments/lawson.png' },
    ],
    channels: [
      {
        id: 'alfamidi',
        name: 'Alfamidi',
        category: 'retail',
        fee: 3000,
        icon: '/payments/alfamidi.png',
        logoUrl: '/payments/alfamidi.png',
      },
      {
        id: 'alfamart',
        name: 'Alfamart',
        category: 'retail',
        fee: 3000,
        icon: '/payments/alfamart.png',
        logoUrl: '/payments/alfamart.png',
      },
      {
        id: 'indomaret',
        name: 'Indomaret',
        category: 'retail',
        fee: 3000,
        icon: '/payments/indomaret.png',
        logoUrl: '/payments/indomaret.png',
      },
      {
        id: 'superindo',
        name: 'Super Indo',
        category: 'retail',
        fee: 3000,
        icon: '/payments/superindo.png',
        logoUrl: '/payments/superindo.png',
      },
      {
        id: 'lawson',
        name: 'Lawson',
        category: 'retail',
        fee: 3000,
        icon: '/payments/lawson.png',
        logoUrl: '/payments/lawson.png',
      },
    ],
  },
];

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  QRIS_CHANNEL,
  ...PAYMENT_CATEGORIES.flatMap((group) => group.channels),
];

export const PAYMENT_METHODS = PAYMENT_CHANNELS;
