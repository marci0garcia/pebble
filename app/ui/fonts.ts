import { Inter, Lusitana } from 'next/font/google';

import { Audiowide } from 'next/font/google';

 
export const inter = Inter({ subsets: ['latin'] });

export const audiowide = Audiowide({
  weight: ['400'], 
  subsets: ['latin'],
});
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});