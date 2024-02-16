import {
  FormStepProps,
  FormStepRef,
  StepComponent,
} from '@common/components/lib/navigation/FormStepper';
import { RHFSelect } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import { CurrentFormStepRef } from '@common/components/partials/UpsertCrudItemForm';
import Routes from '@common/defs/routes';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import { User } from '@modules/users/defs/types';
import useUsers, { CreateOneInput } from '@modules/users/hooks/api/useUsers';
import { MenuItem, Stack } from '@mui/material';
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import * as Yup from 'yup';

interface CreateUserStep2Props extends FormStepProps {}

const CreateUserStep2 = forwardRef((props: CreateUserStep2Props, ref: Ref<FormStepRef>) => {
  const { next, data } = props;
  const formRef = useRef<CurrentFormStepRef>();
  const schema = Yup.object().shape({
    role: Yup.mixed<ROLE>()
      .oneOf(Object.values(ROLE), (_values) => {
        return `Le champ doit avoir l'une des valeurs suivantes : ${ROLES_OPTIONS.map(
          (option) => option.label
        ).join(', ')}`;
      })
      .required('Le champ est obligatoire'),
  });
  const defaultValues: Omit<CreateOneInput, 'email' | 'password'> = {
    role: data?.role || ROLE.USER,
  };
  useImperativeHandle(ref, () => ({
    submit: async () => {
      const res = await formRef?.current?.submit();
      if (res && !res.hasErrors) {
        next(res?.data);
      }
    },
  }));
  return (
    <>
      <CreateCrudItemForm<User, CreateOneInput>
        routes={Routes.Users}
        useItems={useUsers}
        schema={schema}
        defaultValues={defaultValues}
        ref={formRef}
        displayCard
        displayFooter={false}
      >
        <Stack justifyContent="center" sx={{ padding: 6 }}>
          <RHFSelect name="role" label="Rôle" sx={{ width: 350, margin: '0 auto' }}>
            {ROLES_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
      </CreateCrudItemForm>
    </>
  );
});

export default CreateUserStep2 as StepComponent<FormStepRef, CreateUserStep2Props>;
