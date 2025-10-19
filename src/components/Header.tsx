export default function Header() {
  return (
    <div className="bg-gb-screenMid/50 border-b-2 border-gb-screenLight/20 px-3 py-2 flex items-center justify-between">
      <h1 className="text-gb-screenLightest text-sm sm:text-base font-bold tracking-wider">
        POKEDEX GB
      </h1>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
        <span className="text-[8px] text-gb-screenLight/70">ONLINE</span>
      </div>
    </div>
  );
}

