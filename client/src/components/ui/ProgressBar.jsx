export default function ProgressBar({ value, className = '', size = 'default' }) {
  const percentage = Math.min(100, Math.max(0, value));
  
  const getGradient = () => {
    if (percentage >= 100) {
      return 'bg-gradient-to-r from-green-400 to-emerald-500';
    } else if (percentage >= 75) {
      return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    } else if (percentage >= 50) {
      return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    } else if (percentage >= 25) {
      return 'bg-gradient-to-r from-orange-400 to-red-500';
    } else {
      return 'bg-gradient-to-r from-red-400 to-rose-500';
    }
  };

  const heightClass = size === 'large' ? 'h-3' : 'h-2';

  return (
    <div className={`${heightClass} bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`h-full ${getGradient()} transition-all duration-500 ease-out rounded-full relative`}
        style={{ width: `${percentage}%` }}
      >
        {percentage > 20 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        )}
      </div>
    </div>
  );
}
