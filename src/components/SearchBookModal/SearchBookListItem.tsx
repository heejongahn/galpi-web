import {
  HStack,
  StackProps,
  Text,
  VStack,
  Divider,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { BookPayload } from '../../model/Book';

interface Props extends StackProps {
  isSelected: boolean;
  book: BookPayload;
}

export default function SearchBookListItem({
  isSelected,
  book,
  ...props
}: Props) {
  return (
    <HStack as="li" overflow="visible" {...props}>
      <Button
        width="100%"
        height="80px"
        borderColor={isSelected ? 'gray.400' : 'gray.200'}
        borderStyle={isSelected ? 'solid' : 'dashed'}
        backgroundColor={isSelected ? 'rgba(0, 0, 0, 0.04)' : 'transparent'}
        variant="outline"
      >
        <HStack width="100%" spacing="8px" align="center">
          <Avatar borderRadius="4px" size="md" src={book.imageUri} />
          <VStack
            minWidth="0"
            flex="1 1 auto"
            align="stretch"
            spacing="4px"
            py="8px"
          >
            <Text
              fontSize="14"
              fontWeight={600}
              whiteSpace="pre-wrap"
              textAlign="left"
            >
              {book.title}
            </Text>
            <HStack
              minWidth="0"
              justify="flex-start"
              align="center"
              spacing="4px"
              height="16px"
            >
              <Text
                fontSize="12"
                fontWeight={400}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {book.author}
              </Text>
              <Divider orientation="vertical" />
              <Text fontWeight={400} fontSize="12">
                {book.publisher}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Button>
    </HStack>
  );
}
