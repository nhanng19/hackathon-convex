import { SwipeButtonProps } from '@/types';

export default function SwipeButton({
  exit,
  removeCard,
  id,
}: SwipeButtonProps) {
  const handleSwipe = (action: 'left' | 'right') => {
    if (action === 'left') {
      exit(-200);
    } else if (action === 'right') {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="flex items-center space-x-8 absolute bottom-10">
      <button onClick={() => handleSwipe("left")} className="key_button">
        Left
      </button>
      <button onClick={() => handleSwipe("right")} className="key_button">
        Right
      </button>
    </div>
  );
}
