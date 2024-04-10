import { Box, Heading, Skeleton } from "@chakra-ui/react";

type Props = {
  title: string;
};

export default function ColumnSkeleton({ title }: Props) {
  return (
    <Box>
      <Heading
        fontSize="x-large"
        mb={4}
        letterSpacing="wide"
        textAlign="center"
      >
        {title}
      </Heading>
      <Skeleton h={600} rounded="md" />
    </Box>
  );
}
