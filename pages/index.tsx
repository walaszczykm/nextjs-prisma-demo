import { useState } from "react";
import type { NextPage, GetServerSidePropsResult } from "next";
import { PrismaClient } from "@prisma/client";
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

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<HomePageProps>
> {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  return {
    props: {
      initialPosts: posts,
    },
  };
}

const Home: NextPage<HomePageProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function addNewPost() {
    setIsLoading(true);
    const resp = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, author, body }),
    });
    const post = await resp.json();

    setTitle("");
    setAuthor("");
    setBody("");
    setPosts((prevPosts) => [...prevPosts, , post]);
    setIsLoading(false);
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
            isLoading={isLoading}
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
