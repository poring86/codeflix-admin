import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { initialState, useCreateCastMemberMutation } from './castMembersSlice'
import { CastMember } from '../../types/CastMembers';
import { CastMembersForm } from './components/CastMembersForm';

export const CreateCastMembers = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [createCastMember, status] = useCreateCastMemberMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCastMember({ ...castMemberState });
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Cast member created successfully!`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Cast member not created!`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMembersForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          castMember={castMemberState}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
