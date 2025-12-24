import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // External links or anchor fragments should be handled by the browser
    if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) {
      return;
    }

    // Support internal hash links on same page
    if (href.startsWith('/#')) {
        const hash = href.split('#')[1];
        const target = document.getElementById(hash);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            return;
        }
    }

    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default Link;