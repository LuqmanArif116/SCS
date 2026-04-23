import { Product } from '../types';

export const DEPOSIT_KEYS: string[] = [
  '4847383686197933837',
  '38383978729900282878',
  '9384091786864868683686',
];

export const VERIFIED_KEYS: string[] = [
  '11223319739786307937878',
  '48474947383638518584647363',
  '4947484648463383628510072',
  '085947483624826285282528262',
  '384748474744',
];

export const CATEGORIES: string[] = [
  'All',
  'Instagram',
  'Facebook',
  'Google',
  'Telegram',
  'Twitter',
  'TikTok',
  'Other',
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Instagram Account - 10K Followers',
    price: 50,
    description: 'Aged Instagram account with 10K real followers. Perfect for influencers and businesses.',
    category: 'Instagram',
    image: '',
    sellerId: 'seller1',
    isVerified: true,
    credentials: {
      email: 'insta_user10k@gmail.com',
      password: 'SecurePass123!',
      additionalInfo: '2FA disabled, original email included',
    },
  },
  {
    id: '2',
    name: 'Facebook Business Page - 50K Likes',
    price: 120,
    description: 'Established Facebook business page with active engagement and 50K likes.',
    category: 'Facebook',
    image: '',
    sellerId: 'seller2',
    isVerified: true,
    credentials: {
      email: 'fbusiness50k@outlook.com',
      password: 'BizPage2024#',
      additionalInfo: 'Admin access included',
    },
  },
  {
    id: '3',
    name: 'Google Voice Number - Aged',
    price: 25,
    description: 'Aged Google Voice number with clean history. Perfect for verification.',
    category: 'Google',
    image: '',
    sellerId: 'seller3',
    isVerified: false,
    credentials: {
      email: 'gvnumber@gmail.com',
      password: 'VoiceAcc2024$',
      additionalInfo: 'US number, works worldwide',
    },
  },
  {
    id: '4',
    name: 'Telegram Premium Account',
    price: 35,
    description: 'Telegram Premium account with unlimited features and verified badge.',
    category: 'Telegram',
    image: '',
    sellerId: 'seller1',
    isVerified: true,
    credentials: {
      email: 'telepremium@proton.me',
      password: 'TelePrem2024!',
      additionalInfo: 'Premium active for 6 months',
    },
  },
  {
    id: '5',
    name: 'Twitter/X Account - 5K Followers',
    price: 45,
    description: 'Twitter account with organic followers and good engagement rate.',
    category: 'Twitter',
    image: '',
    sellerId: 'seller4',
    isVerified: false,
    credentials: {
      email: 'twitter5k@yahoo.com',
      password: 'XAccount2024@',
      additionalInfo: 'Blue eligible',
    },
  },
  {
    id: '6',
    name: 'TikTok Account - 100K Views',
    price: 80,
    description: 'TikTok account with viral videos and 100K total views. Great for content creators.',
    category: 'TikTok',
    image: '',
    sellerId: 'seller2',
    isVerified: true,
    credentials: {
      email: 'tiktok100k@gmail.com',
      password: 'TikViral2024#',
      additionalInfo: 'Creator fund eligible',
    },
  },
  {
    id: '7',
    name: 'Instagram Business Account - 25K',
    price: 150,
    description: 'Premium Instagram business account with 25K followers and high engagement.',
    category: 'Instagram',
    image: '',
    sellerId: 'seller5',
    isVerified: false,
    credentials: {
      email: 'instabiz25k@gmail.com',
      password: 'InstaBiz2024!',
      additionalInfo: 'Business tools enabled',
    },
  },
  {
    id: '8',
    name: 'Google Workspace Account',
    price: 60,
    description: 'Google Workspace account with custom domain and 30GB storage.',
    category: 'Google',
    image: '',
    sellerId: 'seller3',
    isVerified: true,
    credentials: {
      email: 'workspace@custom.com',
      password: 'WorkSpace2024$',
      additionalInfo: 'Admin console access',
    },
  },
];