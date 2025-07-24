export default function FooterLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="#7C3AED" />
      <circle cx="16" cy="16" r="10" fill="#fff" />
      <path d="M16 11v10M11 16h10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
} 