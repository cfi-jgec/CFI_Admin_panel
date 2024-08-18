
type props = {
  children: React.ReactNode,
  header: string
}

const Layout = ({ children, header }: props) => {
  return (
    <div className="w-full h-full p-6">
      <h1 className="font-semibold text-lg capitalize mb-2">
        {header}
      </h1>
      {children}
    </div>
  );
};

export default Layout;
