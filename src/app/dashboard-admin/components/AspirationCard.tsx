const formatTitle = (text: string): string => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

interface AspirationItem {
  id: number;
  title: string;
  value: number;
  percentage: number;
  color: 'green' | 'pink';
}

interface AspirationCardProps {
  item: AspirationItem;
}

export const AspirationCard = ({ item }: AspirationCardProps) => {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
      item.color === 'green' 
        ? 'border-green-200 bg-green-50/50 hover:bg-green-50'
        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
      }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {formatTitle(item.title)}
          </h4>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${
              item.color === 'green' ? 'text-green-600' : 'text-pink-600'
              }`}>
              {item.value}
            </span>
            <span className="text-sm text-gray-500">laporan</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          item.color === 'green'
            ? 'bg-green-100 text-green-700'
            : 'bg-pink-100 text-pink-700'
          }`}>
          {item.percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};