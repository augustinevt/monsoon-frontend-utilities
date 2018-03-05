# tmp invite script

put the input file in the input dir and make sure it is named 'input.txt'

cd into the src dir

run `node create_invites`

look in the output dir

sqlOutput:
  insert statements populated with the information from the input file

manifestOutput:
  markdown record of all the insert statements created

updatedInput:
  a copy of the input file, with the 'Invite URL' column filled in with the invite URL. !! USING THE TOKEN MOST RECENTLY CREATED !!


##### NOTES:
- input file must have headers 'TXN Id', 'Invite URL', and 'Company Name' to work properly.
- Take a look at ../test/test_user_data.txt if you need a template.
