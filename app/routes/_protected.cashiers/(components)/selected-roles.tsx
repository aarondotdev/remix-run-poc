// External dependencies
import { type FC } from 'react';

// Types
import { Badge } from '@/components/ui/badge';
import { CrossCircledIcon } from '@radix-ui/react-icons';

export interface Role {
  id: string;
  label: string;
  name: string;
}

interface ISelectedRoles {
  roles: Role[];
  onRemove: (roleId: string) => void;
}

const SelectedRoles: FC<ISelectedRoles> = ({ roles, onRemove }) => {
  if (roles?.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-2 py-2"
      role="list"
      aria-label="Selected roles"
    >
      {roles?.map((role) => (
        <div key={role.id} className="relative" role="listitem">
          {/* Product image with tooltip */}
          <Badge className="flex gap-2">
            {role?.label}{' '}
            <CrossCircledIcon
              className="h-3 w-3"
              onClick={() => onRemove(role.id.toString())}
            />{' '}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default SelectedRoles;
