import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { initialState, useCreateCastMemberMutation } from './castMembersSlice'
import { v4 as uuidv4 } from 'uuid';
import { CastMember } from '../../types/CastMembers';
import CastMemberForm from './components/CastMemberForm';

export const CreateCastMember = () => {
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [createCastMember, status] = useCreateCastMemberMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('castMemberState', { ...castMemberState, id: uuidv4() })
    await createCastMember({ ...castMemberState, id: uuidv4() });
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Cast member created`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Cast member not created`, { variant: "error" });
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
        <CastMemberForm
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
