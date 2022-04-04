create TABLE version (
    version text
);

create TABLE userposts (
    id serial NOT NULL,
    userid text NOT NULL,
    post text NOT NULL,
    usermessage text NOT NULL
);


