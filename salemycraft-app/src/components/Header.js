import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="absolute bg-gradient-to-t z-10">
      <img
        className=" left-8
      w-80  
      drop-shadow-md"
        src={logo}
        alt="logo"
      />
    </div>
  );
};
export default Header;
