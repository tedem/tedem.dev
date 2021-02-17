export default function Holder({ children }) {
  return (
    <div className="max-w-screen-lg px-4 mx-auto sm:px-8 xl:max-w-screen-xl xl:px-32">
      {children}
    </div>
  );
}
