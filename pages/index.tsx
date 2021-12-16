import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { NextPage, GetServerSidePropsResult } from "next";
import {
  Container,
  Flex,
  Heading,
  Text,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";

type Post = {
  id: string;
  title: string;
  author: string;
  body: string;
};

type HomePageProps = {
  initialPosts: Post[];
};

export function getServerSideProps(): GetServerSidePropsResult<HomePageProps> {
  return {
    props: {
      initialPosts: [
        {
          id: uuid(),
          title: "Hello World",
          author: "john.doe@example.com",
          body: "Lorem ipsum dolor sit amet",
        },
      ],
    },
  };
}

const Home: NextPage<HomePageProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  function addNewPost() {
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: uuid(), title, author, body },
    ]);
    setTitle("");
    setAuthor("");
    setBody("");
  }

  return (
    <Container padding="24px">
      <Flex direction="column" gap="16px">
        <Flex direction="column" gap="8px">
          <Input
            required
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            required
            value={author}
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Textarea
            required
            value={body}
            placeholder="body"
            onChange={(e) => setBody(e.target.value)}
          />
          <Button
            disabled={!title || !author || !body}
            onClick={() => addNewPost()}
          >
            Add new
          </Button>
        </Flex>
        <hr />
        <Flex direction="column" gap="32px">
          {posts.map((post) => {
            return (
              <Flex
                key={post.id}
                padding="16px"
                borderRadius="md"
                direction="column"
                border="1px solid #dddada"
              >
                <Heading size="xl" color="#0070f3">
                  {post.title}
                </Heading>
                <Text as="code" fontSize="xs">
                  {post.id}
                </Text>
                <Heading size="ml">{post.author}</Heading>
                <Text>{post.body}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
