import clsx from 'clsx';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

const getClasses = (variant: ButtonProps['variant'], fullWidth?: boolean) => {
  const classes = clsx(
    ['flex', 'items-center', 'justify-center', 'outline-offset-2'],
    fullWidth && [!variant?.includes('icon') && ['w-full']],
    variant === 'primary' && [
      'text-gray-0',
      'bg-primary',
      'heading-6',
      'rounded-[15px]',
      'px-[34px]',
      'py-[20px]',
      'disabled:cursor-not-allowed disabled:bg-primary-30',
      'hover-enabled:bg-[#125DCE] focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-dark-blue',
    ],
    variant === 'icon' && ['h-11 w-11 rounded-[10px] bg-gray-0 shadow-button'],
    variant === 'white' && [
      'heading-6 rounded-[15px] bg-gray-0 px-[34px] py-5 text-primary shadow-button',
      'disabled:cursor-not-allowed disabled:opacity-30',
      'hover-enabled:bg-[#CFE2FE]',
    ],
    variant === 'icon-round' && [
      'flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-0 shadow-button',
    ],
    variant === 'dark-blue' && [
      'heading-6 w-[118px] rounded-[15px] bg-dark-blue py-5 px-[34px] text-gray-0',
      'disabled:cursor-not-allowed disabled:bg-dark-blue-30',
      'hover-enabled:bg-gray-blue',
    ],
    variant === 'red' && [
      'heading-6 w-[118px] rounded-[15px] bg-red py-5 px-[34px] text-gray-0',
      'disabled:cursor-not-allowed disabled:opacity-30',
      'hover-enabled:bg-red-dark',
    ],
  );

  return classes;
};

export type ButtonProps = {
  variant?: 'primary' | 'white' | 'icon' | 'icon-round' | 'dark-blue' | 'red';
  fullWidth?: boolean;
} & (
  | ({
      href: string;
      type?: never;
      onClick?: never;
    } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'onClick'>)
  | ({
      href?: never;
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    } & ButtonHTMLAttributes<HTMLButtonElement>)
);

export const Button = (props: ButtonProps) => {
  const { variant = 'primary', children } = props;

  if (props.href) {
    const { href, fullWidth, ...rest } = props;

    return (
      <Link {...rest} className={getClasses(variant, fullWidth)} href={href}>
        {children}
      </Link>
    );
  }

  if (props.onClick) {
    const { type, fullWidth, ...rest } = props;

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        {...rest}
        className={getClasses(variant, fullWidth)}
        type={type ?? 'button'}
      >
        {children}
      </button>
    );
  }

  return null;
};
