/* eslint-disable react/prop-types */
import { Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";
// Language: typescript

export default function Card({ filename = "", obsidianURI = "" }) {
  return (
    <div>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" my="2">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <NextLink href={obsidianURI} passHref>
            <Link>{filename}</Link>
          </NextLink>
        </Box>
      </Box>
    </div>
  );
}
