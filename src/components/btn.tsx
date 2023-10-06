import { ReactNode } from 'react';

import style from '../styles/btn.module.scss';

type Theme = 'primary' | 'secondary';

interface BtnProps {
  children: ReactNode;
  theme: Theme;
  url: string;
}

const Btn = ({children, url, theme}: BtnProps) => {
  
  return (
    <a
      href={url}
      className={`${style[`btn_${theme}`]}`}
    >
      {children}
    </a>
  )
}

export default Btn;