import { useCallback, useState } from 'react';

export default function useBooleanState(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const onSetValueToTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onSetValueToFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, onSetValueToTrue, onSetValueToFalse] as const;
}
