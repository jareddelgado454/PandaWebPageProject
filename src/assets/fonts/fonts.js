import { Chakra_Petch, Jost } from 'next/font/google';

export const chakra_Petch = Chakra_Petch({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable : '--font-chakra_petch',
});

export const jost = Jost({
    subsets: ['latin'],
    display: 'swap',
    variable : '--font-jost',
});