import React, { FunctionComponent, ComponentClass } from 'react'
import classnames from 'classnames'
import { deprecationWarning } from '../../deprecation'

interface BaseButtonProps {
  children: React.ReactNode
  secondary?: boolean
  base?: boolean
  accent?: boolean
  outline?: boolean
  inverse?: boolean
  size?: 'big' | 'small'
  /**
   * @deprecated since 1.6.0, use size
   */
  big?: boolean
  /**
   * @deprecated since 1.6.0, use size
   */
  small?: boolean
  icon?: boolean
  unstyled?: boolean
}

type ButtonTagProps = BaseButtonProps &
  JSX.IntrinsicElements['button'] & {
    type: 'button' | 'submit' | 'reset'
  }

type CustomComponentProps = BaseButtonProps &
  React.HTMLAttributes<HTMLElement> & {
    as: React.ReactElement
  }

type ButtonProps = CustomComponentProps | ButtonTagProps // Order matters here, the last is default for type suggestions

const isCustomComponent = (
  props: ButtonProps
): props is CustomComponentProps => {
  return (props as CustomComponentProps).as !== undefined
}

export const Button = (props: ButtonProps): React.ReactElement => {
  const {
    children,
    secondary,
    base,
    accent,
    outline,
    inverse,
    size,
    big,
    small,
    icon,
    unstyled,
    className,
    ...restProps
  } = props

  if (big) {
    deprecationWarning('Button property big is deprecated.  Use size')
  }
  if (small) {
    deprecationWarning('Button property small is deprecated.  Use size')
  }

  const isBig = size ? size === 'big' : big
  const isSmall = size ? size === 'small' : small

  const classes = classnames(
    'usa-button',
    {
      'usa-button--secondary': secondary,
      'usa-button--base': base,
      'usa-button--accent-cool': accent,
      'usa-button--outline': outline,
      'usa-button--inverse': inverse,
      'usa-button--big': isBig,
      'usa-button--small': isSmall,
      'usa-button--icon': icon,
      'usa-button--unstyled': unstyled,
    },
    className
  )

  const updatedButtonProps = {
    'data-testid': 'button',
    ...restProps,
    className: classes,
  }

  return isCustomComponent(props) ? (
    React.cloneElement(props.as, updatedButtonProps, children)
  ) : (
    <button {...updatedButtonProps}>{children}</button>
  )
}

export default Button
