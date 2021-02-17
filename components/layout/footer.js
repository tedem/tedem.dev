import Holder from "../layout/holder";

export default function Footer() {
  return (
    <footer>
      <Holder>
        <div className="flex items-center py-8 border-t border-gray-700">
          <div>&copy; 2020 tedem.dev</div>
        </div>
      </Holder>
    </footer>
  );
}
