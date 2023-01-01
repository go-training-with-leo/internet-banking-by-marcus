import React from 'react';
import Selection from 'components/Select';

import { useForm, Controller } from 'react-hook-form';
import { ACB, DeleteIcon, PlusIcon } from 'assets/images';

const country = [
  { label: 'ACB', value: '1', icon: ACB },
  { label: 'India', value: '2', icon: PlusIcon },
  { label: 'China', value: '3', icon: DeleteIcon },
  { label: 'Finland', value: '4', icon: PlusIcon },
];

export default function PageNotFound() {
  const { handleSubmit, control } = useForm();

  const saveData = (form_data) => {
    console.warn('form_data', form_data);
  };

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <Controller
        name='country'
        control={control}
        // eslint-disable-next-line no-unused-vars
        render={({ field: { onChange, value, ref } }) => (
          <Selection
            value={value}
            options={country}
            placeholder='Label'
            onChange={onChange}
          />
        )}
      />

      <button type='submit'>Save</button>
    </form>
  );
}
