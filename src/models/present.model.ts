import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IPresent {
  _id: string;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  purchased: boolean;
  purchasedBy?: string;
}

export interface IPresentCategory {
  id: number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  items: IPresent[];
}
