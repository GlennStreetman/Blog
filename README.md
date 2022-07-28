Glenn's personal blog
python3-dotnev-cli must be installed to push build using SSH
dotenv-cli must be installed globaly to use it localy.

Blog relies upon remote login from standalone auth server.
.env file should be created with connection string for remote postgres server
DATABASE_URL = postgresql://user:password^@127.0.0.1:exposed port number

> npx prisma db pull

test.env is needed for development
prod.env is needed to build production docker image
