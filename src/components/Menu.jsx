const Menu = ({ onSectionChange, section }) => {
  const menuItems = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-center gap-x-6 md:gap-x-8 rounded-full border border-white/20 bg-black/20 px-6 py-3 text-sm font-light text-white/80 shadow-lg shadow-black/20 backdrop-blur-lg">
        {menuItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(index);
            }}
            className={`shine-effect hover:text-white transition-colors duration-100 tracking-wide px-2 py-1 rounded-full"
            ${
              section == index
                ? " text-white rounded-full"
                : "text-white hover:text-white rounded-full"
            }`}>
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
