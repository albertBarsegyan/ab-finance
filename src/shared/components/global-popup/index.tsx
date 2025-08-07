'use client';

import { useAlert } from '@/shared/hooks/alert.tsx';
import { CustomAlert } from '@/shared/components/custom/alert';

export function GlobalPopup() {
  const { message, clearAlert, variant } = useAlert();

  return (
    <>
      {Boolean(message) && (
        <CustomAlert
          onClose={clearAlert}
          variant={variant}
          message={message as string}
          onTimeout={clearAlert}
        />
      )}
    </>
  );
}
