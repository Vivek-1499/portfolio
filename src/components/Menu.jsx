const Menu = ({ onSectionChange, section }) => {
  const menuItems = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-center gap-x-6 md:gap-x-8 rounded-full border border-white/20 bg-black/20 px-2 py-2 text-sm font-light text-white/80 shadow-lg shadow-black/20 backdrop-blur-lg">
        {menuItems.map((item, index) => (
          <button
            key={item}
            onClick={() => onSectionChange(index)}
            className={`shine-effect hover:text-white transition-colors duration-300 tracking-wide px-3 py-2 rounded-full cursor-pointer ${
              section === index
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}>
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Menu;