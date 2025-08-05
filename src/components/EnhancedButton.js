import React from 'react';
import { Link } from 'react-router-dom';

const EnhancedButton = ({ 
  children, 
  to, 
  onClick, 
  type = 'button',
  variant = 'primary', 
  icon, 
  disabled = false,
  className = '',
  size = 'normal',
  ...props 
}) => {
  const baseClasses = 'btn-action btn-icon';
  
  const variantClasses = {
    primary: 'btn-action-primary',
    create: 'btn-action-create',
    upload: 'btn-action-upload',
    success: 'btn-action-success',
    danger: 'btn-action-danger'
  };

  const sizeClasses = {
    small: 'btn-sm',
    normal: '',
    large: 'btn-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default EnhancedButton;