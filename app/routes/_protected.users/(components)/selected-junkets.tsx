// External dependencies
import { type FC } from 'react';

// Types
import { Badge } from '@/components/ui/badge';
import { CrossCircledIcon } from '@radix-ui/react-icons';

export interface Junket {
  id: string;
  code: string;
  name: string;
}

interface ISelectedJunkets {
  junkets: Junket[];
  onRemove: (roleId: string) => void;
}

const SelectedJunkets: FC<ISelectedJunkets> = ({ junkets, onRemove }) => {
  if (junkets?.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-2 py-2"
      role="list"
      aria-label="Selected junkets"
    >
      {junkets?.map((junket) => (
        <div key={junket.id} className="relative" role="listitem">
          {/* Product image with tooltip */}
          <Badge className="flex gap-2">
            {junket?.name}
            <CrossCircledIcon
              className="h-3 w-3"
              onClick={() => onRemove(junket.id.toString())}
            />{' '}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default SelectedJunkets;
