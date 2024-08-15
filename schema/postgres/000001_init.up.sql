-- Таблица пользователей
CREATE TABLE users
(
    id             serial PRIMARY KEY,
    name           varchar(255) NOT NULL,
    login       varchar(255) NOT NULL UNIQUE,
    password_hash  varchar(255) NOT NULL,
    likes_count    integer DEFAULT 0,
    dislikes_count integer DEFAULT 0
);

-- Таблица сообщений
CREATE TABLE messages
(
    id             BIGSERIAL PRIMARY KEY,
    event          varchar(200) NOT NULL,
    text           varchar(200) NOT NULL,
    author_id      integer REFERENCES users (id),
    author_name    varchar(255) NOT NULL,
    send_at        timestamp    NOT NULL,
    likes_count    integer DEFAULT 0,
    dislikes_count integer DEFAULT 0
);

-- Таблица лайков и дизлайков
CREATE TABLE likes_dislikes
(
    id         serial PRIMARY KEY,
    user_id    integer NOT NULL REFERENCES users (id),
    message_id bigint  NOT NULL REFERENCES messages (id),
    is_like    boolean NOT NULL
);

CREATE TABLE token_blacklist
(
    id         SERIAL PRIMARY KEY,
    token      VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP    NOT NULL
);