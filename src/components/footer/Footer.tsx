const Footer = () => {
  return (
    <footer className="w-full text-white p-4 flex justify-between bg-white/3 backdrop-blur-md">
      <p>
        &copy; {new Date().getFullYear()} Bevinco. Todos los derechos
        reservados.
      </p>
      <p
        className="
    flex items-center gap-2
    text-[#7ED957] font-semibold
    hover:text-[#6CC84A]
    hover:scale-105
    transition-transform duration-200 ease-in-out
    cursor-pointer
  "
      >
        Contacto
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-5 h-5 text-[#7ED957] hover:text-[#6CC84A] transition-colors"
        >
          <path d="M16 0C7.163 0 0 6.99 0 15.6c0 2.75.75 5.32 2.05 7.56L0 32l9.02-2.36c2.17 1.19 4.65 1.86 7.28 1.86 8.837 0 16-6.99 16-15.6S24.837 0 16 0zm0 28.8c-2.31 0-4.47-.63-6.34-1.73l-.45-.27-5.35 1.4 1.43-5.04-.29-.52C4.1 20.4 3.2 18.07 3.2 15.6 3.2 8.98 9.02 3.2 16 3.2s12.8 5.78 12.8 12.4-5.82 13.2-12.8 13.2zm7.07-9.5c-.39-.2-2.31-1.14-2.67-1.27-.36-.13-.62-.2-.88.2-.26.4-1.01 1.27-1.24 1.53-.23.26-.46.29-.85.1-.39-.2-1.64-.6-3.12-1.91-1.15-1.01-1.93-2.26-2.16-2.65-.23-.4-.02-.61.17-.8.18-.18.39-.46.59-.69.2-.23.26-.4.39-.66.13-.26.07-.49-.03-.69-.1-.2-.88-2.12-1.21-2.9-.32-.77-.65-.67-.88-.68h-.75c-.26 0-.69.1-1.05.49-.36.4-1.38 1.35-1.38 3.28 0 1.93 1.42 3.8 1.62 4.06.2.26 2.79 4.26 6.77 5.98.95.41 1.69.65 2.27.83.95.3 1.81.26 2.49.16.76-.11 2.31-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.1-.16-.36-.26-.75-.46z" />
        </svg>
      </p>
    </footer>
  );
};

export default Footer;
